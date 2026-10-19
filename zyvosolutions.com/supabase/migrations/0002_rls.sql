-- ============================================================================
-- Zyvo — Supabase schema 0002
-- Row Level Security: least-privilege access for public visitors.
--
-- Access model
--   anon / authenticated  ->  read published portfolio projects only
--   anon / authenticated  ->  read published services only
--   anon / authenticated  ->  read public site settings only
--   anon / authenticated  ->  NO access at all to project_inquiries
--                             (inquiries are written exclusively by the
--                              submit-inquiry Edge Function using the
--                              service-role key, which bypasses RLS)
--   anon / authenticated  ->  NO write access to portfolio/services/settings;
--                             admin edits happen via the dashboard or the
--                             service-role key.
-- ============================================================================

alter table public.project_inquiries   enable row level security;
alter table public.submission_log      enable row level security;
alter table public.portfolio_projects  enable row level security;
alter table public.services            enable row level security;
alter table public.site_settings       enable row level security;

-- project_inquiries: no policies created at all => deny everything to
-- anon/authenticated. Service role bypasses RLS by design.

-- submission_log: no policies => deny public access entirely.

-- portfolio_projects: public may read only published rows.
drop policy if exists "Public read published portfolio projects" on public.portfolio_projects;
create policy "Public read published portfolio projects"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (is_published = true);

-- services: public may read only published rows.
drop policy if exists "Public read published services" on public.services;
create policy "Public read published services"
  on public.services
  for select
  to anon, authenticated
  using (is_published = true);

-- site_settings: public may read only the public row(s).
drop policy if exists "Public read public site settings" on public.site_settings;
create policy "Public read public site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (is_public = true);
