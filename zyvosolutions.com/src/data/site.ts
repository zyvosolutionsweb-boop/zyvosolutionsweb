import type { Service, PortfolioProject, ServiceCategory } from "@/types";
import {
  Briefcase,
  ShoppingBag,
  Code2,
  MousePointerClick,
  PenTool,
  Wrench,
  Search,
  Share2,
  Megaphone,
  FileText,
  ImageIcon,
  ChartLine,
  Globe,
  Layers,
  Rocket,
  Bot,
  Gauge,
  Repeat,
  Waypoints,
} from "lucide-react";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const countries = [
  "Sri Lanka",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "Germany",
  "Netherlands",
  "France",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Spain",
  "Italy",
  "Switzerland",
  "Singapore",
  "Malaysia",
  "Japan",
  "South Korea",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "India",
  "Bangladesh",
  "Maldives",
  "South Africa",
  "Other",
];

/** Maps icon_name values stored in Supabase `services.icon_name` to Lucide components. */
export const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  ShoppingBag,
  Code2,
  MousePointerClick,
  PenTool,
  Wrench,
  Search,
  Share2,
  Megaphone,
  FileText,
  ImageIcon,
  ChartLine,
  Globe,
  Layers,
  Rocket,
  Bot,
  Gauge,
  Repeat,
  Waypoints,
};

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We start by understanding your business and goals — what you sell, who you serve and how you want to be seen.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "We define the right solution and priorities — scope, timeline and budget — so you always know exactly what's being built or grown, and why.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "We shape the experience and visual direction with deliberate, unhurried design decisions that reflect your brand.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "We develop and test with care — clean, reliable code and (for marketing) properly set up tracking from day one.",
  },
  {
    step: "05",
    title: "Launch & Grow",
    description:
      "We publish, measure and keep improving. Marketing engagements clarify upfront that meaningful results need agreed objectives, proper tracking and sufficient data.",
  },
];

export const faqs = [
  {
    question: "Do you do web development, digital marketing, or both?",
    answer:
      "Both. Zyvo is built as one cohesive digital agency: our web team designs and builds websites, stores, landing pages and custom applications, and our marketing team runs SEO, social media, paid advertising, content and analytics programs — together or à la carte.",
  },
  {
    question: "How much does a website or digital marketing engagement cost?",
    answer:
      "It depends on scope. A focused business website typically starts around LKR 250,000 (≈ USD 750), while custom applications scale with complexity. Marketing retainers are sized to the channels and effort involved. We provide a fixed, itemized quote after a short discovery call — no hourly surprises.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Marketing websites usually ship in 2–4 weeks; custom web applications take longer depending on scope. Marketing is ongoing: early steps like technical SEO fixes or creative production move fast, while search rankings and campaign optimization build over time with sufficient data.",
  },
  {
    question: "Do you redesign existing websites?",
    answer:
      "Yes. We start by auditing what you have — content, performance, SEO and analytics — then redesign around what works and rebuild what doesn't, with a migration plan so you don't lose search visibility.",
  },
  {
    question: "How do you measure digital marketing results?",
    answer:
      "We start with agreed objectives and proper conversion tracking. We report transparently on the metrics we can measure — and we never over-promise: meaningful results require appropriate tracking and enough data, which we confirm with you before drawing conclusions.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes — we collaborate remotely with clients across the UK, USA, Canada, Australia, Europe and the Middle East. Clear communication, overlapping hours for key calls, and transparent progress tracking are part of every engagement.",
  },
  {
    question: "Do you offer maintenance after launch?",
    answer:
      "Yes. For websites we offer maintenance and optimization plans covering updates, security-conscious upkeep, backups and performance work. For marketing engagements we continue refining campaigns and creatives as data comes in.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Send us your project brief through our contact form, telling us whether you need web development, digital marketing, or both. We reply within one business day and schedule a free discovery call.",
  },
];

export const serviceCategories: { key: ServiceCategory; label: string }[] = [
  { key: "web-development", label: "Web Development" },
  { key: "digital-marketing", label: "Digital Marketing" },
];

/** Static details (deliverables + ideal customers) merged with service records for detail pages. */
export const serviceDetails: Record<
  string,
  { deliverables: string[]; idealFor: string }
> = {
  "business-website-development": {
    deliverables: [
      "Professional company and corporate websites",
      "Service-based business websites",
      "Personal and professional portfolios",
      "Technical SEO and analytics setup",
      "Sub-second load targets on every page",
    ],
    idealFor:
      "Companies establishing or upgrading their online credibility — from service businesses in Colombo to international consultancies.",
  },
  "e-commerce-development": {
    deliverables: [
      "Online stores and product catalogs",
      "Shopping cart and checkout integration",
      "Payment gateway integration (PayHere, Stripe, PayPal)",
      "Inventory and order management integrations",
      "Admin dashboard for your team",
    ],
    idealFor:
      "Product-focused businesses who need a storefront that converts — including Sri Lankan sellers and cross-border brands.",
  },
  "custom-web-applications": {
    deliverables: [
      "Business dashboards and customer portals",
      "Internal business systems",
      "API and third-party integrations",
      "Typed, tested codebase with clean architecture",
      "Authentication, roles and permissions",
    ],
    idealFor:
      "Organizations whose workflows deserve software of their own, not spreadsheets held together by hope.",
  },
  "landing-page-development": {
    deliverables: [
      "Campaign landing pages",
      "Lead-generation pages",
      "Product launch pages",
      "Conversion-focused layouts",
      "A/B-testing-ready structure",
    ],
    idealFor:
      "Businesses running campaigns who need high-converting destinations for their traffic.",
  },
  "ui-ux-design": {
    deliverables: [
      "User interface design",
      "Responsive layouts across devices",
      "Wireframes and prototypes",
      "User experience improvements",
      "Developer-ready specs and handover",
    ],
    idealFor:
      "Teams who want design decisions grounded in real user flows rather than guesswork.",
  },
  "maintenance-and-optimization": {
    deliverables: [
      "Website updates and bug fixes",
      "Performance improvements",
      "Technical maintenance",
      "Security-conscious development",
      "Monthly health reporting",
    ],
    idealFor:
      "Anyone with a live website who wants it fast, secure and reliable without babysitting it.",
  },
  seo: {
    deliverables: [
      "Technical SEO and on-page optimization",
      "Keyword research",
      "Content optimization",
      "Search visibility improvements",
      "Transparent, data-informed reporting",
    ],
    idealFor:
      "Businesses who want qualified organic traffic — with no promised rankings, only measurable process.",
  },
  "social-media-marketing": {
    deliverables: [
      "Social media strategy",
      "Content planning and calendars",
      "Post and campaign management",
      "Brand consistency across platforms",
      "Audience engagement support",
    ],
    idealFor:
      "Brands who need a consistent, professional presence where their customers actually spend time.",
  },
  "paid-advertising": {
    deliverables: [
      "Google Ads campaign management",
      "Meta Ads campaign management",
      "Campaign planning and optimization",
      "Conversion tracking setup",
      "Advertising performance reporting",
    ],
    idealFor:
      "Businesses who want controlled, measurable paid reach — with honest guidance on what a channel can and cannot do.",
  },
  "content-marketing": {
    deliverables: [
      "Website content",
      "Blog articles",
      "Campaign content",
      "Content calendars",
      "Brand-focused messaging",
    ],
    idealFor:
      "Businesses who need authority-building content — planned, written and published consistently.",
  },
  "creative-visual-content": {
    deliverables: [
      "Social media creatives",
      "Digital advertising graphics",
      "Campaign visuals",
      "Branded promotional materials",
      "Consistent visual identity",
    ],
    idealFor:
      "Brands who need scroll-stopping visuals that stay on-brand across every placement.",
  },
  "analytics-conversion-optimization": {
    deliverables: [
      "Website analytics setup",
      "Campaign performance reporting",
      "Conversion tracking",
      "Landing page improvement recommendations",
      "Data-informed optimization",
    ],
    idealFor:
      "Businesses who want decisions driven by data — and a clear view of what's actually working.",
  },
};

export const growServicesSection = {
  title: "Everything You Need to Grow Online.",
  description:
    "We combine thoughtful design, reliable development, and effective marketing to help your business succeed in a digital-first world.",
};

export const groupCopy: Record<ServiceCategory, { intro: string }> = {
  "web-development": {
    intro:
      "Thoughtful design and reliable build quality, for websites that earn credibility and keep working as your business grows.",
  },
  "digital-marketing": {
    intro:
      "Strategic marketing that connects you with the right audience — measured honestly, improved continuously.",
  },
};


/**
 * Local sample data used when Supabase credentials are not configured.
 * These are DEMONSTRATION concepts — clearly labeled in the UI — never
 * presented as completed client work, testimonials or performance results.
 */
export const demoServices: Service[] = [
  // ---- Web Development ----
  {
    id: "w1",
    title: "Business Website Development",
    slug: "business-website-development",
    short_description:
      "Professional company, corporate and service-based websites — plus personal and professional portfolios.",
    full_description:
      "We design and build websites that make your business look as credible as it is — from corporate sites to service-business pages and polished personal portfolios. Every build is responsive, accessible, technically sound and fast, with content structured for both humans and search engines.",
    icon_name: "Briefcase",
    category: "web-development",
    is_published: true,
    display_order: 1,
  },
  {
    id: "w2",
    title: "E-commerce Development",
    slug: "e-commerce-development",
    short_description:
      "Online stores with product catalogs, cart and checkout, payment gateways, and inventory and order integrations.",
    full_description:
      "We build e-commerce experiences that make buying effortless: clear product catalogs, streamlined carts and checkout, and integrated payment gateways including PayHere for Sri Lanka and Stripe or PayPal internationally — with inventory and order management connected to how your business actually runs.",
    icon_name: "ShoppingBag",
    category: "web-development",
    is_published: true,
    display_order: 2,
  },
  {
    id: "w3",
    title: "Custom Web Applications",
    slug: "custom-web-applications",
    short_description:
      "Business dashboards, customer portals, internal systems, API integrations, and custom interactive applications.",
    full_description:
      "When off-the-shelf tools run out of road, we design and build custom web applications — dashboards, customer portals and internal systems with secure authentication, clean typed architecture and the integrations your operations need.",
    icon_name: "Code2",
    category: "web-development",
    is_published: true,
    display_order: 3,
  },
  {
    id: "w4",
    title: "Landing Page Development",
    slug: "landing-page-development",
    short_description:
      "Campaign landing pages, lead-generation pages, product launch pages, and conversion-focused layouts.",
    full_description:
      "A campaign is only as good as its destination. We build conversion-focused landing pages for campaigns, lead generation and launches — fast to load, clear in message and structure, and built to work with your tracking from launch day.",
    icon_name: "MousePointerClick",
    category: "web-development",
    is_published: true,
    display_order: 4,
  },
  {
    id: "w5",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    short_description:
      "User interface design, responsive layouts, wireframes and prototypes, and focused UX improvements.",
    full_description:
      "We design interfaces that communicate value quickly — mapping real user flows, then building design systems with strong hierarchy, accessibility and consistency so your product feels considered at every screen and breakpoint.",
    icon_name: "PenTool",
    category: "web-development",
    is_published: true,
    display_order: 5,
  },
  {
    id: "w6",
    title: "Website Maintenance & Optimization",
    slug: "maintenance-and-optimization",
    short_description:
      "Website updates, bug fixes, performance improvements, technical maintenance, and security-conscious development.",
    full_description:
      "A website isn't finished at launch. Our maintenance service covers updates, bug fixes, performance improvements and technical upkeep with security in mind — so your site stays fast, reliable and healthy long after launch day.",
    icon_name: "Wrench",
    category: "web-development",
    is_published: true,
    display_order: 6,
  },
  // ---- Digital Marketing ----
  {
    id: "m1",
    title: "Search Engine Optimization (SEO)",
    slug: "seo",
    short_description:
      "Technical SEO, on-page optimization, keyword research, content optimization, and search visibility improvements.",
    full_description:
      "We build search visibility systematically: technical fundamentals first, then on-page and content optimization driven by real keyword research. We report on the metrics we can verify — and we never promise rankings we can't guarantee.",
    icon_name: "Search",
    category: "digital-marketing",
    is_published: true,
    display_order: 7,
  },
  {
    id: "m2",
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    short_description:
      "Social media strategy, content planning, post and campaign management, brand consistency, and audience engagement.",
    full_description:
      "We turn scattered posting into a coherent program: strategy, planned content, managed campaigns and consistent brand presentation across the platforms where your audience actually spends time.",
    icon_name: "Share2",
    category: "digital-marketing",
    is_published: true,
    display_order: 8,
  },
  {
    id: "m3",
    title: "Paid Advertising",
    slug: "paid-advertising",
    short_description:
      "Google Ads and Meta Ads campaign management, campaign planning and optimization, and performance tracking.",
    full_description:
      "We plan, manage and continuously optimize paid campaigns across Google and Meta — with conversion tracking from day one and reporting that puts budget next to outcomes. We give honest guidance on what each channel can realistically deliver for your goals.",
    icon_name: "Megaphone",
    category: "digital-marketing",
    is_published: true,
    display_order: 9,
  },
  {
    id: "m4",
    title: "Content Marketing",
    slug: "content-marketing",
    short_description:
      "Website content, blog articles, campaign content, content calendars, and brand-focused messaging.",
    full_description:
      "Content is how your business earns attention between campaigns. We plan, write and publish website copy, blog articles and campaign content on a managed calendar — messaging that stays unmistakably you.",
    icon_name: "FileText",
    category: "digital-marketing",
    is_published: true,
    display_order: 10,
  },
  {
    id: "m5",
    title: "Creative & Visual Content",
    slug: "creative-visual-content",
    short_description:
      "Social media creatives, digital advertising graphics, campaign visuals, and branded promotional materials.",
    full_description:
      "We produce the scroll-stopping creative layer of your marketing: social media creatives, advertising graphics and campaign visuals that hold together as one brand across every placement.",
    icon_name: "ImageIcon",
    category: "digital-marketing",
    is_published: true,
    display_order: 11,
  },
  {
    id: "m6",
    title: "Analytics & Conversion Optimization",
    slug: "analytics-conversion-optimization",
    short_description:
      "Website analytics setup, campaign performance reporting, conversion tracking, and data-informed optimization.",
    full_description:
      "Marketing without measurement is guesswork. We set up website analytics and conversion tracking, report campaign performance honestly, and recommend landing page and funnel improvements based on what the data actually shows.",
    icon_name: "ChartLine",
    category: "digital-marketing",
    is_published: true,
    display_order: 12,
  },
];

export const demoProjects: PortfolioProject[] = [
  // ---- Web Development concepts ----
  {
    id: "d1",
    title: "Aurora Consulting — Corporate Website",
    slug: "aurora-consulting-concept",
    description:
      "A minimal, high-contrast corporate website concept for a consultancy: sharp typography, case-study-led architecture and a conversion-first layout for a board-level audience.",
    category: "Corporate Website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    cover_image_url: null,
    project_url: null,
    is_featured: true,
    is_published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "d2",
    title: "Verdant Home — E-commerce Storefront",
    slug: "verdant-home-concept",
    description:
      "A commerce storefront concept for premium home goods: editorial product storytelling, streamlined filtering and a three-step checkout designed for mobile-first shoppers.",
    category: "E-commerce",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
    cover_image_url: null,
    project_url: null,
    is_featured: true,
    is_published: true,
    created_at: "2026-09-05T00:00:00Z",
  },
  {
    id: "d3",
    title: "Pulsemetric — SaaS Analytics Dashboard",
    slug: "pulsemetric-concept",
    description:
      "A dark, data-dense analytics dashboard concept for a SaaS platform: real-time metric cards, drill-down charts, role-based layouts and keyboard-first navigation.",
    category: "SaaS Dashboard",
    technologies: ["React", "TypeScript", "Supabase", "Recharts"],
    cover_image_url: null,
    project_url: null,
    is_featured: true,
    is_published: true,
    created_at: "2026-09-10T00:00:00Z",
  },
  {
    id: "d4",
    title: "Northline — Lead-Gen Landing Page",
    slug: "northline-concept",
    description:
      "A campaign landing page concept for a service business: above-the-fold value proposition, social-proof module, lead form and a thank-you conversion flow.",
    category: "Landing Page",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    cover_image_url: null,
    project_url: null,
    is_featured: false,
    is_published: true,
    created_at: "2026-09-12T00:00:00Z",
  },
  // ---- Digital Marketing concepts ----
  {
    id: "d5",
    title: "Ceylon Organics — SEO Strategy Sample",
    slug: "ceylon-organics-seo-concept",
    description:
      "A technical-and-content SEO roadmap sample for a food brand: keyword clusters, technical audit checklist and a staged content plan. An illustrative framework — not measured results.",
    category: "SEO Strategy",
    technologies: ["Keyword Research", "Technical SEO", "Content Plan"],
    cover_image_url: null,
    project_url: null,
    is_featured: false,
    is_published: true,
    created_at: "2026-09-14T00:00:00Z",
  },
  {
    id: "d6",
    title: "Studio Lumen — Social Campaign Concept",
    slug: "studio-lumen-social-concept",
    description:
      "A social media campaign concept for a design studio: multi-platform content calendar, creative refresh rhythm and engagement playbook. Illustrative planning work.",
    category: "Social Media Campaign",
    technologies: ["Content Calendar", "Creative Direction", "Meta"],
    cover_image_url: null,
    project_url: null,
    is_featured: false,
    is_published: true,
    created_at: "2026-09-16T00:00:00Z",
  },
  {
    id: "d7",
    title: "KindleTravel — Paid Ads Mockup",
    slug: "kindletravel-ads-concept",
    description:
      "A paid advertising campaign mockup for a travel platform: ad-structure hypotheses, audience segments and a tracking plan. A demonstration of our planning approach — no real campaign data.",
    category: "Paid Advertising",
    technologies: ["Google Ads", "Meta Ads", "Tracking Plan"],
    cover_image_url: null,
    project_url: null,
    is_featured: false,
    is_published: true,
    created_at: "2026-09-18T00:00:00Z",
  },
  {
    id: "d8",
    title: "Basecamp Dental — Content Plan Example",
    slug: "basecamp-dental-content-concept",
    description:
      "A content marketing plan example for a service clinic: pillar-page topics, blog publishing cadence and a brand voice guide. Illustrative sample work.",
    category: "Content Marketing",
    technologies: ["Content Strategy", "Editorial Calendar", "Copywriting"],
    cover_image_url: null,
    project_url: null,
    is_featured: false,
    is_published: true,
    created_at: "2026-09-20T00:00:00Z",
  },
];

export type ProjectGroup = "All" | "Web Development" | "Digital Marketing";

/** Maps granular project categories to the two service groups for filtering. */
export const categoryGroup: Record<string, Exclude<ProjectGroup, "All">> = {
  "Corporate Website": "Web Development",
  "E-commerce": "Web Development",
  "SaaS Dashboard": "Web Development",
  "Landing Page": "Web Development",
  "Web Application": "Web Development",
  "SEO Strategy": "Digital Marketing",
  "Social Media Campaign": "Digital Marketing",
  "Paid Advertising": "Digital Marketing",
  "Content Marketing": "Digital Marketing",
};

export function projectGroup(category: string): ProjectGroup {
  return categoryGroup[category] ?? "Web Development";
}

export const projectFilters: ProjectGroup[] = ["All", "Web Development", "Digital Marketing"];
