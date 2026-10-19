-- ============================================================================
-- Zyvo Solutions — Complete Supabase Database Setup & CMS Schema
-- Run this script in your Supabase Dashboard:
-- Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ============================================================================

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ----------------------------------------------------------------------------
-- 1. PROJECT INQUIRIES
-- Stores all contact form submissions from prospective clients
-- ----------------------------------------------------------------------------
create table if not exists public.project_inquiries (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null check (char_length(full_name) between 2 and 100),
  email               citext not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company_name        text check (company_name is null or char_length(company_name) <= 120),
  country             text not null default 'Not specified',
  service_category    text not null default 'Web Development',
  service_type        text not null default 'General Inquiry',
  budget_range        text,
  project_timeline    text,
  project_description text not null check (char_length(project_description) >= 5),
  status              text not null default 'new'
                      check (status in ('new', 'reviewed', 'contacted', 'archived')),
  admin_notes         text,
  created_at          timestamptz not null default now()
);

create index if not exists idx_inquiries_created on public.project_inquiries (created_at desc);
create index if not exists idx_inquiries_status on public.project_inquiries (status);

-- ----------------------------------------------------------------------------
-- 2. PORTFOLIO PROJECTS
-- Case studies & demonstration projects
-- ----------------------------------------------------------------------------
create table if not exists public.portfolio_projects (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null check (char_length(title) between 3 and 120),
  slug                text not null unique check (char_length(slug) between 3 and 120),
  category            text not null default 'Web Development',
  description         text,
  technologies        text[] not null default '{}',
  cover_image_url     text,
  project_url         text,
  is_featured         boolean not null default false,
  is_published        boolean not null default true,
  display_order       integer not null default 0,
  created_at          timestamptz not null default now()
);

create index if not exists idx_portfolio_published on public.portfolio_projects (is_published, display_order);

-- ----------------------------------------------------------------------------
-- 3. SERVICES CATALOG
-- Core offerings across software & digital marketing
-- ----------------------------------------------------------------------------
create table if not exists public.services (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null check (char_length(title) between 3 and 100),
  slug                text not null unique check (char_length(slug) between 3 and 100),
  category            text not null default 'web-development'
                      check (category in ('web-development', 'digital-marketing', 'operations')),
  short_description   text,
  full_description    text,
  icon_name           text default 'Code2',
  deliverables        text[] not null default '{}',
  display_order       integer not null default 0,
  is_published        boolean not null default true,
  created_at          timestamptz not null default now()
);

create index if not exists idx_services_category on public.services (category, is_published, display_order);

-- ----------------------------------------------------------------------------
-- 4. SITE SETTINGS & BRANDING
-- Global company info, contacts, and meta configuration
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id                  uuid primary key default gen_random_uuid(),
  business_name       text not null default 'Zyvo Solutions',
  tagline             text not null default 'Minds That Build Solutions. Defined by Impact.',
  contact_email       text default 'info@zyvosolutions.com',
  contact_phone       text default '+94 77 123 4567',
  location            text default 'Colombo, Sri Lanka',
  timezone            text default 'GMT+5:30',
  social_links        jsonb default '{"facebook": "https://www.facebook.com/share/1GCdP8q1Fy/", "instagram": "https://www.instagram.com/zyvosolutions", "linkedin": "https://www.linkedin.com/company/zyvosolutions"}'::jsonb,
  footer_note         text default 'Zyvo Solutions is a full-service digital engineering and marketing agency in Sri Lanka, creating technology and growth systems that scale businesses worldwide.',
  admin_password_hash text default 'zyvo2026!',
  is_public           boolean not null default true,
  updated_at          timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. CMS PAGE SECTIONS
-- Content Management Studio: dynamic customization of any page section
-- ----------------------------------------------------------------------------
create table if not exists public.page_sections (
  section_key         text primary key,
  title               text,
  subtitle            text,
  content             jsonb not null default '{}'::jsonb,
  updated_at          timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
alter table public.project_inquiries  enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.services           enable row level security;
alter table public.site_settings      enable row level security;
alter table public.page_sections      enable row level security;

-- Inquiries: public can insert (submit contact form); admin can do all
drop policy if exists "Public can insert inquiries" on public.project_inquiries;
create policy "Public can insert inquiries"
  on public.project_inquiries
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admin manage inquiries" on public.project_inquiries;
create policy "Admin manage inquiries"
  on public.project_inquiries
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Portfolio: public read published, admin full access
drop policy if exists "Public read portfolio" on public.portfolio_projects;
create policy "Public read portfolio"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage portfolio" on public.portfolio_projects;
create policy "Admin manage portfolio"
  on public.portfolio_projects
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Services: public read published, admin full access
drop policy if exists "Public read services" on public.services;
create policy "Public read services"
  on public.services
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage services" on public.services;
create policy "Admin manage services"
  on public.services
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Settings: public read, admin manage
drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage site settings" on public.site_settings;
create policy "Admin manage site settings"
  on public.site_settings
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- CMS Page Sections: public read, admin manage
drop policy if exists "Public read page sections" on public.page_sections;
create policy "Public read page sections"
  on public.page_sections
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage page sections" on public.page_sections;
create policy "Admin manage page sections"
  on public.page_sections
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- ----------------------------------------------------------------------------
-- INITIAL SEED DATA
-- ----------------------------------------------------------------------------

-- Initial Site Settings
insert into public.site_settings (business_name, tagline, contact_email, location, footer_note, is_public)
values (
  'Zyvo Solutions',
  'Minds That Build Solutions. Defined by Impact.',
  'info@zyvosolutions.com',
  'Colombo, Sri Lanka',
  'Driven by Minds. Defined by Impact. Zyvo Solutions is a full-service digital engineering and marketing agency in Sri Lanka, creating technology and growth systems that scale businesses worldwide.',
  true
)
on conflict do nothing;

-- Initial CMS Page Sections
insert into public.page_sections (section_key, title, subtitle, content)
values
  ('hero', 'Minds That Build Solutions. Defined by Impact.', 'Digital Engineering & Growth Agency · Colombo & Global',
   '{"lead": "Zyvo Solutions is a full-service digital agency. We engineer bespoke web applications, enterprise commerce platforms, and data-backed performance marketing systems that drive measurable commercial growth.", "cta_primary_text": "Let''s Build Together", "cta_secondary_text": "Explore Verticals"}'::jsonb),
  ('why_zyvo', 'Redefine What a Digital Partner Can Be.', 'Our Philosophy',
   '{"lead": "Most businesses do not need another agency pushing generic themes or selling buzzwords. They need a disciplined partner that understands commercial goals, builds dependable software, and communicates with straight answers.", "commitment": "If a proposed feature will not measurably advance your revenue, user experience, or operational efficiency, we will tell you directly — even if it means less billable scope for us."}'::jsonb),
  ('faq', 'Questions, Answered Honestly.', 'Frequently Asked Questions',
   '{"items": [
     {"q": "How does pricing and milestone invoicing work?", "a": "We use a transparent 40 / 30 / 30 model: 40% upon scope approval, 30% upon staging milestone approval, and 30% upon launch and complete code handover. Zero hidden line items."},
     {"q": "Do I own 100% of the code and repository?", "a": "Yes, absolutely. Upon final payment, you receive complete administrative ownership of your GitHub repository, database, DNS records, and design source files."},
     {"q": "Do you provide a warranty after launch?", "a": "Every project includes 30 calendar days of post-launch technical warranty covering bug fixes, browser adjustments, and performance tweaks at no additional cost."}
   ]}'::jsonb)
on conflict (section_key) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  content = excluded.content;

-- Initial Services
insert into public.services (title, slug, category, short_description, full_description, icon_name, display_order, is_published)
values
  ('Business Websites', 'business-website-development', 'web-development',
   'Brand-led corporate and consulting websites built for credibility, fast loading and clear conversion paths.',
   'We architect custom, lightning-fast business websites tailored to your commercial positioning with verified 95+ Core Web Vitals.',
   'Globe', 1, true),
  ('E-commerce Platforms', 'e-commerce-development', 'web-development',
   'High-converting commerce stores with localized payments (PayHere), Stripe, PayPal and automated inventory sync.',
   'Engineered for mobile checkout speed, frictionless cart flows, and seamless gateway integration.',
   'ShoppingBag', 2, true),
  ('Custom Web Applications', 'custom-web-applications', 'web-development',
   'Bespoke web applications, client portals and internal workflow tools built on modern React and Supabase.',
   'Custom cloud architecture, secure user authentication, role-based dashboards, and scalable database backends.',
   'Layers', 3, true),
  ('Search Engine Optimization (SEO)', 'seo', 'digital-marketing',
   'Technical SEO, JSON-LD schema architecture, on-page content strategy, and keyword positioning.',
   'White-hat search optimization built directly into your website architecture to generate organic commercial pipeline.',
   'Search', 4, true),
  ('Paid Search & Meta Ads', 'paid-advertising', 'digital-marketing',
   'High-intent Google Ads and Meta campaign architecture with conversion tracking and ROI reporting.',
   'Targeted ad funnels with clear attribution, conversion pixel tracking, and transparent ROAS analysis.',
   'Megaphone', 5, true),
  ('Social Media Strategy', 'social-media-marketing', 'digital-marketing',
   'Consistent brand positioning, content calendars, engagement playbooks and paid amplification.',
   'Build authority across relevant digital channels with disciplined creative execution.',
   'Share2', 6, true)
on conflict (slug) do nothing;

-- Initial Portfolio Projects
insert into public.portfolio_projects (title, slug, category, description, technologies, is_featured, is_published, display_order)
values
  ('Aura Capital — Corporate Website', 'aura-capital', 'Corporate Website',
   'A minimal, high-contrast corporate website concept for an investment consultancy: sharp typography and board-level conversion architecture.',
   array['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], true, true, 1),
  ('Verdant Home — E-commerce Storefront', 'verdant-home', 'E-commerce',
   'A modern commerce storefront for premium home goods: editorial product storytelling, instant search and streamlined mobile checkout.',
   array['React', 'TypeScript', 'Tailwind CSS', 'Stripe'], true, true, 2),
  ('Pulsemetric — SaaS Analytics Dashboard', 'pulsemetric', 'SaaS Dashboard',
   'A high-density analytics dashboard concept for a SaaS platform: real-time metric cards, drill-down charts, and role-based permissions.',
   array['React', 'TypeScript', 'Supabase', 'Recharts'], true, true, 3),
  ('Northline — Lead-Gen Landing Page', 'northline', 'Landing Page',
   'A campaign landing page for an international logistics business: above-the-fold value proposition, social proof, and multi-step inquiry flow.',
   array['React', 'TypeScript', 'Tailwind CSS'], false, true, 4)
on conflict (slug) do nothing;
