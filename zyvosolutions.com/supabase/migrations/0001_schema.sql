-- ============================================================================
-- Zyvo — Supabase schema 0001
-- Core tables: project_inquiries, portfolio_projects, services, site_settings,
-- and a rate_limit_hits log table used by the submit-inquiry Edge Function.
-- ============================================================================
create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ----------------------------------------------------------------------------
-- project_inquiries
-- Protected: NO public access. Reads/writes happen only via the service-role
-- key inside the submit-inquiry Edge Function and by the admin team.
-- ----------------------------------------------------------------------------
create table if not exists public.project_inquiries (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null check (char_length(full_name) between 2 and 80),
  email               citext not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company_name        text check (company_name is null or char_length(company_name) <= 100),
  country             text not null check (char_length(country) between 1 and 60),
  service_type        text not null check (char_length(service_type) between 1 and 60),
  budget_range        text check (budget_range is null or char_length(budget_range) <= 120),
  project_timeline    text check (project_timeline is null or char_length(project_timeline) <= 120),
  project_description text not null check (char_length(project_description) between 10 and 2000),
  status              text not null default 'new'
                      check (status in ('new', 'reviewed', 'contacted', 'archived')),
  created_at          timestamptz not null default now()
);

create index if not exists idx_project_inquiries_created_at
  on public.project_inquiries (created_at desc);
create index if not exists idx_project_inquiries_status
  on public.project_inquiries (status);
create index if not exists idx_project_inquiries_email
  on public.project_inquiries (email);

-- ----------------------------------------------------------------------------
-- submission_log
-- Powers per-IP/email rate limiting in the submit-inquiry Edge Function.
-- Timed out automatically; no public access.
-- ----------------------------------------------------------------------------
create table if not exists public.submission_log (
  id         uuid primary key default gen_random_uuid(),
  ip_hash    text,           -- sha-256 hash of requester IP (raw IP never stored)
  email_hash text,           -- sha-256 hash of submitted email
  created_at timestamptz not null default now()
);

create index if not exists idx_submission_log_ip_time
  on public.submission_log (ip_hash, created_at desc);
create index if not exists idx_submission_log_email_time
  on public.submission_log (email_hash, created_at desc);

-- ----------------------------------------------------------------------------
-- portfolio_projects
-- Public reads restricted to published rows via RLS in 0002_rls.sql.
-- ----------------------------------------------------------------------------
create table if not exists public.portfolio_projects (
  id              uuid primary key default gen_random_uuid(),
  title           text not null check (char_length(title) between 2 and 120),
  slug            text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description     text check (description is null or char_length(description) <= 2000),
  category        text not null check (char_length(category) between 1 and 60),
  technologies    text[] not null default '{}',
  cover_image_url text check (cover_image_url is null or cover_image_url ~* '^https://'),
  project_url     text check (project_url is null or project_url ~* '^https://'),
  is_featured     boolean not null default false,
  is_published    boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists idx_portfolio_projects_published
  on public.portfolio_projects (is_published, is_featured, created_at desc);
create index if not exists idx_portfolio_projects_category
  on public.portfolio_projects (category);

-- ----------------------------------------------------------------------------
-- services
-- Public reads restricted to published rows via RLS in 0002_rls.sql.
-- ----------------------------------------------------------------------------
create table if not exists public.services (
  id               uuid primary key default gen_random_uuid(),
  title            text not null check (char_length(title) between 2 and 80),
  slug             text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  short_description text,
  full_description text,
  icon_name        text,
  is_published     boolean not null default true,
  display_order    integer not null default 0
);

create index if not exists idx_services_published_order
  on public.services (is_published, display_order);

-- ----------------------------------------------------------------------------
-- site_settings
-- Single public row of business configuration. is_public controls visibility;
-- secrets must NEVER be stored here — use Edge Function secrets instead.
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id            uuid primary key default gen_random_uuid(),
  business_name text not null check (char_length(business_name) between 1 and 100),
  tagline       text check (tagline is null or char_length(tagline) <= 160),
  contact_email text check (contact_email is null or contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  location      text check (location is null or char_length(location) <= 200),
  social_links  jsonb not null default '{}'::jsonb,
  footer_note   text check (footer_note is null or char_length(footer_note) <= 500),
  is_public     boolean not null default false,
  created_at    timestamptz not null default now()
);
