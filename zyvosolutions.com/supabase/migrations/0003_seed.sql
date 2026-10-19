-- ============================================================================
-- Zyvo — Supabase schema 0003
-- Seed data: the two service lines (web development + digital marketing),
-- demonstration portfolio concepts and public site settings. All portfolio
-- entries are explicitly CONCEPTS — clearly labeled in the UI — never
-- presented as completed client work, testimonials or performance results.
-- If run before 0004, ensure the category column exists first (idempotent).
-- ============================================================================
alter table public.services
  add column if not exists category text
    check (category in ('web-development', 'digital-marketing'));

insert into public.services (title, slug, short_description, full_description, icon_name, category, is_published, display_order)
values
  -- ---- Web Development ----
  ('Business Website Development', 'business-website-development',
   'Professional company, corporate and service-based websites — plus personal and professional portfolios.',
   'We design and build websites that make your business look as credible as it is — responsive, accessible, technically sound and fast, with content structured for both humans and search engines.',
   'Briefcase', 'web-development', true, 1),
  ('E-commerce Development', 'e-commerce-development',
   'Online stores with product catalogs, cart and checkout, payment gateways, and inventory and order integrations.',
   'We build e-commerce experiences that make buying effortless: clear product catalogs, streamlined carts and checkout, and integrated payment gateways including PayHere for Sri Lanka and Stripe or PayPal internationally.',
   'ShoppingBag', 'web-development', true, 2),
  ('Custom Web Applications', 'custom-web-applications',
   'Business dashboards, customer portals, internal systems, API integrations, and custom interactive applications.',
   'When off-the-shelf tools run out of road, we design and build custom web applications — dashboards, portals and internal systems with secure authentication and clean typed architecture.',
   'Code2', 'web-development', true, 3),
  ('Landing Page Development', 'landing-page-development',
   'Campaign landing pages, lead-generation pages, product launch pages, and conversion-focused layouts.',
   'A campaign is only as good as its destination. We build conversion-focused landing pages for campaigns, lead generation and launches — fast, clear and tracking-ready from launch day.',
   'MousePointerClick', 'web-development', true, 4),
  ('UI/UX Design', 'ui-ux-design',
   'User interface design, responsive layouts, wireframes and prototypes, and focused UX improvements.',
   'We design interfaces that communicate value quickly — mapping real user flows, then building design systems with strong hierarchy, accessibility and consistency.',
   'PenTool', 'web-development', true, 5),
  ('Website Maintenance & Optimization', 'maintenance-and-optimization',
   'Website updates, bug fixes, performance improvements, technical maintenance, and security-conscious development.',
   'A website isn''t finished at launch. Our maintenance service covers updates, bug fixes, performance improvements and technical upkeep with security in mind.',
   'Wrench', 'web-development', true, 6),
  -- ---- Digital Marketing ----
  ('Search Engine Optimization (SEO)', 'seo',
   'Technical SEO, on-page optimization, keyword research, content optimization, and search visibility improvements.',
   'We build search visibility systematically: technical fundamentals first, then on-page and content optimization driven by real keyword research — with transparent, verifiable reporting.',
   'Search', 'digital-marketing', true, 7),
  ('Social Media Marketing', 'social-media-marketing',
   'Social media strategy, content planning, post and campaign management, brand consistency, and audience engagement.',
   'We turn scattered posting into a coherent program: strategy, planned content, managed campaigns and consistent brand presentation across the platforms where your audience spends time.',
   'Share2', 'digital-marketing', true, 8),
  ('Paid Advertising', 'paid-advertising',
   'Google Ads and Meta Ads campaign management, campaign planning and optimization, and performance tracking.',
   'We plan, manage and continuously optimize paid campaigns across Google and Meta — with conversion tracking from day one and honest guidance on what each channel can realistically deliver.',
   'Megaphone', 'digital-marketing', true, 9),
  ('Content Marketing', 'content-marketing',
   'Website content, blog articles, campaign content, content calendars, and brand-focused messaging.',
   'Content is how your business earns attention between campaigns. We plan, write and publish website copy, blog articles and campaign content on a managed calendar.',
   'FileText', 'digital-marketing', true, 10),
  ('Creative & Visual Content', 'creative-visual-content',
   'Social media creatives, digital advertising graphics, campaign visuals, and branded promotional materials.',
   'We produce the scroll-stopping creative layer of your marketing: social media creatives, advertising graphics and campaign visuals that hold together as one brand.',
   'ImageIcon', 'digital-marketing', true, 11),
  ('Analytics & Conversion Optimization', 'analytics-conversion-optimization',
   'Website analytics setup, campaign performance reporting, conversion tracking, and data-informed optimization.',
   'Marketing without measurement is guesswork. We set up analytics and conversion tracking, report performance honestly, and recommend improvements based on what the data shows.',
   'ChartLine', 'digital-marketing', true, 12)
on conflict (slug) do update set
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  icon_name = excluded.icon_name,
  category = excluded.category,
  display_order = excluded.display_order;

-- Retire the old single-offering slugs on installs that ran the previous seed,
-- so only the new taxonomy is published.
update public.services
   set is_published = false
 where slug in ('website-development', 'web-application-development', 'saas-and-digital-products');

insert into public.portfolio_projects (title, slug, description, category, technologies, is_featured, is_published)
values
  ('Aurora Consulting — Corporate Website', 'aurora-consulting-concept',
   'A minimal, high-contrast corporate website concept for a consultancy: sharp typography, case-study-led architecture and a conversion-first layout for a board-level audience.',
   'Corporate Website', array['React','TypeScript','Tailwind CSS','Framer Motion'], true, true),
  ('Verdant Home — E-commerce Storefront', 'verdant-home-concept',
   'A commerce storefront concept for premium home goods: editorial product storytelling, streamlined filtering and a three-step checkout designed for mobile-first shoppers.',
   'E-commerce', array['React','TypeScript','Tailwind CSS','Stripe'], true, true),
  ('Pulsemetric — SaaS Analytics Dashboard', 'pulsemetric-concept',
   'A dark, data-dense analytics dashboard concept for a SaaS platform: real-time metric cards, drill-down charts, role-based layouts and keyboard-first navigation.',
   'SaaS Dashboard', array['React','TypeScript','Supabase','Recharts'], true, true),
  ('Northline — Lead-Gen Landing Page', 'northline-concept',
   'A campaign landing page concept for a service business: above-the-fold value proposition, social-proof module, lead form and a thank-you conversion flow.',
   'Landing Page', array['React','TypeScript','Tailwind CSS'], false, true),
  ('Ceylon Organics — SEO Strategy Sample', 'ceylon-organics-seo-concept',
   'A technical-and-content SEO roadmap sample for a food brand: keyword clusters, technical audit checklist and a staged content plan. An illustrative framework — not measured results.',
   'SEO Strategy', array['Keyword Research','Technical SEO','Content Plan'], false, true),
  ('Studio Lumen — Social Campaign Concept', 'studio-lumen-social-concept',
   'A social media campaign concept for a design studio: multi-platform content calendar, creative refresh rhythm and engagement playbook. Illustrative planning work.',
   'Social Media Campaign', array['Content Calendar','Creative Direction','Meta'], false, true),
  ('KindleTravel — Paid Ads Mockup', 'kindletravel-ads-concept',
   'A paid advertising campaign mockup for a travel platform: ad-structure hypotheses, audience segments and a tracking plan. A demonstration of our planning approach — no real campaign data.',
   'Paid Advertising', array['Google Ads','Meta Ads','Tracking Plan'], false, true),
  ('Basecamp Dental — Content Plan Example', 'basecamp-dental-content-concept',
   'A content marketing plan example for a service clinic: pillar-page topics, blog publishing cadence and a brand voice guide. Illustrative sample work.',
   'Content Marketing', array['Content Strategy','Editorial Calendar','Copywriting'], false, true)
on conflict (slug) do update set
  description = excluded.description,
  category = excluded.category,
  technologies = excluded.technologies,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published;
