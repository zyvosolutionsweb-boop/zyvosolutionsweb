import { Link } from "react-router-dom";
import { ArrowRight, Check, Code2, Megaphone, ArrowUpRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const verticals = [
  {
    number: "01",
    title: "Software & Web Solutions",
    subtitle: "Build smart. Scale fast.",
    desc: "From bespoke web applications to high-converting commerce platforms, we engineer reliable digital software tailored to your specific business workflows.",
    icon: Code2,
    badge: "Core Engineering",
    services: [
      { name: "Business Websites", slug: "business-website-development" },
      { name: "E-commerce Platforms", slug: "e-commerce-development" },
      { name: "Custom Web Applications", slug: "custom-web-applications" },
      { name: "UI/UX Architecture", slug: "ui-ux-design" },
      { name: "Website Maintenance & SLAs", slug: "maintenance-and-optimization" },
    ],
    accent: "bg-[#E8EBFF] text-[#231E53]",
    border: "hover:border-[#231E53]",
  },
  {
    number: "02",
    title: "Marketing Solutions",
    subtitle: "Drive reach. Maximize ROI.",
    desc: "Craft compelling brands, launch high-performance search and social campaigns, and capture qualified demand through data-backed marketing systems.",
    icon: Megaphone,
    badge: "Growth Engine",
    services: [
      { name: "Search Engine Optimization (SEO)", slug: "seo" },
      { name: "Paid Search & Meta Ads", slug: "paid-advertising" },
      { name: "Social Media Strategy", slug: "social-media-marketing" },
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "Analytics & Conversion Tracking", slug: "analytics-and-reporting" },
    ],
    accent: "bg-[#E0F2FE] text-[#0284C7]",
    border: "hover:border-[#00A0E1]",
  },
  {
    number: "03",
    title: "Tech-Enabled Operations",
    subtitle: "Dependable upkeep. Measurable uptime.",
    desc: "Continuous technical maintenance, security updates, Core Web Vitals audits, and database optimization sized to your actual operational needs.",
    icon: Wrench,
    badge: "Maintenance & SLA",
    services: [
      { name: "Core Web Vitals Optimization", slug: "maintenance-and-optimization" },
      { name: "Database & Cloud Backups", slug: "custom-web-applications" },
      { name: "Security Patches & Bug Fixes", slug: "maintenance-and-optimization" },
      { name: "API & Payment Gateway Monitoring", slug: "e-commerce-development" },
    ],
    accent: "bg-[#E6F4EA] text-[#137333]",
    border: "hover:border-[#137333]",
  },
];

const packages = [
  {
    name: "Launchpad Website",
    badge: "Fast-Track",
    tagline: "For modern companies seeking an authoritative, high-credibility digital foundation.",
    timeline: "2 – 3 Weeks",
    deliverables: [
      "Custom responsive design (no bloated pre-made templates)",
      "Engineered with React / Next.js and Tailwind CSS",
      "Semantic HTML & structured on-page SEO metadata",
      "Lead capture inquiry form with email notifications",
      "Performance audited for 95+ PageSpeed Mobile",
      "14 days post-launch warranty & handover session",
    ],
    bestFor: "Corporate firms, consultancies, boutique brands",
    cta: "Inquire About Launchpad",
  },
  {
    name: "Custom Web Application",
    badge: "Most Popular",
    tagline: "For businesses with custom workflows, member portals, or complex commerce.",
    timeline: "4 – 8 Weeks",
    featured: true,
    deliverables: [
      "Everything in Launchpad, plus:",
      "Custom authentication, user roles & dashboard workflows",
      "Database schema & API integrations (Supabase / REST)",
      "Payment processing (PayHere / Stripe / PayPal)",
      "Transactional emails & webhook integrations",
      "Full TypeScript strict testing & documentation",
      "30 days post-launch dedicated support warranty",
    ],
    bestFor: "SaaS products, portals, specialized commerce",
    cta: "Discuss Custom Application",
  },
  {
    name: "Growth & SEO Retainer",
    badge: "Monthly Growth",
    tagline: "For teams ready to scale organic search rankings and qualified customer leads.",
    timeline: "Monthly Retainer",
    deliverables: [
      "Technical SEO audit & keyword intent architecture",
      "Structured data schema implementation (JSON-LD)",
      "Targeted Google Ads & Meta campaign management",
      "Conversion rate optimization (CRO) & landing page tweaks",
      "Server-side event tracking (GA4 & Meta CAPI)",
      "Monthly performance reporting with direct engineering sync",
    ],
    bestFor: "Companies seeking steady, compounding lead flow",
    cta: "Inquire About Growth",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200/80" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Revocare Our Verticals style */}
        <div className="text-center max-w-3xl mx-auto pb-14">
          <span className="eyebrow-pill">
            Our Verticals
          </span>
          <h2 id="services-heading" className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Powerhouses of Tech, Strategy & Growth.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Each vertical is purpose-built to elevate brands, power business outcomes, and deliver standout digital experiences in a connected world.
          </p>
        </div>

        {/* 3 Core Verticals Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {verticals.map((v) => (
            <div
              key={v.title}
              className={`flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_20px_rgba(35,30,83,0.04)] transition-all duration-200 ${v.border}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${v.accent}`}>
                    {v.badge}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {v.number}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#231E53] text-white">
                    <v.icon className="h-5 w-5 text-[#00A0E1]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F172A]">
                      {v.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#00A0E1]">{v.subtitle}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {v.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                    In-House Capabilities:
                  </p>
                  <ul className="space-y-2">
                    {v.services.map((s) => (
                      <li key={s.name}>
                        <Link
                          to={`/services#${s.slug}`}
                          className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#231E53] transition-colors"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00A0E1] group-hover:scale-125 transition-transform" />
                          <span>{s.name}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A0E1]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#231E53] hover:text-[#00A0E1] transition-colors"
                >
                  <span>Explore all {v.title.toLowerCase()}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Structured Packages & Scope Comparison */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow-pill">
              Scope & Engagements
            </span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Clear Deliverables. Predictable Outcomes.
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Every project begins with a free discovery call and a fixed, itemized scope. Here is how our most common project engagements are structured.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-7 sm:p-8 transition-all ${
                  pkg.featured
                    ? "border-[#231E53] bg-white shadow-[0_12px_36px_rgba(35,30,83,0.12)] ring-1 ring-[#231E53]"
                    : "border-slate-200/90 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#231E53] px-3.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#00A0E1] uppercase tracking-wider">
                      {pkg.timeline}
                    </span>
                    {!pkg.featured && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-4 font-display text-xl font-bold text-[#0F172A]">
                    {pkg.name}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {pkg.tagline}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                      Included Deliverables:
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="h-4 w-4 text-[#00A0E1] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <div className="mb-4 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Recommended for: </span>
                    <span>{pkg.bestFor}</span>
                  </div>

                  <Button asChild variant={pkg.featured ? "default" : "secondary"} className="w-full">
                    <Link to="/contact">
                      {pkg.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
