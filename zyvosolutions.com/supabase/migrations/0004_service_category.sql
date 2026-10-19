-- ============================================================================
-- Zyvo — Supabase schema 0004
-- Adds service_category to project_inquiries to support the two service
-- lines (Web Development / Digital Marketing) without touching existing
-- records. Preserves all RLS policies and constraints.
-- ============================================================================

alter table public.project_inquiries
  add column if not exists service_category text
    check (service_category is null or char_length(service_category) <= 40);

-- Backfill: existing rows keep full meaning via service_type and are marked
-- as legacy, so nothing is lost or assumed.
update public.project_inquiries
   set service_category = 'Not specified'
 where service_category is null;

create index if not exists idx_project_inquiries_service_category
  on public.project_inquiries (service_category);

-- ----------------------------------------------------------------------------
-- services: add the two service lines as a category attribute.
-- Old rows are backfilled from their existing slugs so public listings
-- keep working with no downtime and no data loss.
-- ----------------------------------------------------------------------------

alter table public.services
  add column if not exists category text
    check (category in ('web-development', 'digital-marketing'));

update public.services
   set category = 'web-development'
 where category is null
   and slug in ('website-development', 'business-website-development',
                'web-application-development', 'e-commerce-development',
                'ui-ux-design', 'maintenance-and-optimization');

update public.services
   set category = 'digital-marketing'
 where category is null
   and slug in ('seo', 'social-media-marketing', 'paid-advertising',
                'content-marketing', 'creative-visual-content',
                'analytics-conversion-optimization');

-- Any service created before this migration that matches neither list is
-- treated as web development (the site's original offering).
update public.services
   set category = 'web-development'
 where category is null;

alter table public.services
  alter column category set default 'web-development';
alter table public.services
  alter column category set not null;

create index if not exists idx_services_category_order
  on public.services (category, is_published, display_order);
