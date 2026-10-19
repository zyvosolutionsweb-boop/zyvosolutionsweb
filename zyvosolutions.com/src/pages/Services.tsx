import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Megaphone, Code2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import { serviceIcons, serviceDetails, serviceCategories } from "@/data/site";
import type { ServiceCategory } from "@/types";
import { cn } from "@/lib/utils";

const categoryIntros: Record<
  ServiceCategory,
  { title: string; description: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "web-development": {
    title: "Software & Web Solutions",
    description:
      "We design and engineer modern, responsive, and performance-focused web platforms that establish credibility, automate operations, and scale with your business.",
    icon: Code2,
  },
  "digital-marketing": {
    title: "Marketing Solutions",
    description:
      "We help businesses maximize their online visibility, capture high-intent search traffic, and turn qualified visitors into long-term commercial customers.",
    icon: Megaphone,
  },
};

export default function Services() {
  const { services, loading, error } = useServices();

  return (
    <>
      <Seo
        title="Services — Web Development & Digital Marketing | Zyvo Solutions"
        description="Business websites, e-commerce, custom web apps, landing pages and UI/UX design — plus SEO, social media, Google & Meta Ads, content marketing and analytics."
        path="/services"
      />

      {/* Page Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="eyebrow-pill">Capabilities & Verticals</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A]">
            Two Powerful Verticals.{" "}
            <span className="text-[#231E53] underline decoration-[#00A0E1] decoration-2">
              One Standard of Impact.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
            From bespoke corporate websites and custom applications to technical search engine optimization and high-converting paid campaigns. Everything your business needs to build a commanding digital presence.
          </p>

          {/* Quick jump pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary" size="sm">
              <Link to="/services#web-development">
                <Code2 className="h-4 w-4 text-[#00A0E1]" /> Software & Web Solutions
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link to="/services#digital-marketing">
                <Megaphone className="h-4 w-4 text-[#00A0E1]" /> Marketing Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex justify-center py-20" role="status">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#231E53]" />
          <span className="sr-only">Loading services…</span>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Service Categories Sections */}
      {!loading &&
        serviceCategories.map((cat) => {
          const intro = categoryIntros[cat.key];
          const categoryServices = services.filter((s) => s.category === cat.key);

          return (
            <section
              key={cat.key}
              id={cat.key}
              className="py-20 lg:py-24 border-b border-slate-200/80 first-of-type:bg-white last-of-type:bg-slate-50/50"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Category Header */}
                <div className="max-w-3xl mb-14">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A0E1]">
                    <intro.icon className="h-4 w-4" />
                    <span>Vertical Division</span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                    {intro.title}
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    {intro.description}
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const Icon = serviceIcons[service.icon_name ?? "Globe"] ?? serviceIcons.Globe;
                    const detail = serviceDetails[service.slug];

                    return (
                      <div
                        key={service.id}
                        id={service.slug}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:border-[#231E53] hover:shadow-[0_12px_28px_rgba(35,30,83,0.08)]"
                      >
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8EBFF] text-[#231E53]">
                            <Icon className="h-6 w-6" />
                          </div>

                          <h3 className="mt-5 font-display text-xl font-bold text-[#0F172A] group-hover:text-[#231E53] transition-colors">
                            {service.title}
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                            {service.short_description}
                          </p>

                          {detail && (
                            <div className="mt-6 pt-5 border-t border-slate-100">
                              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
                                Included Deliverables:
                              </p>
                              <ul className="space-y-2">
                                {detail.deliverables.map((d) => (
                                  <li key={d} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00A0E1] mt-0.5" />
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
                                <span className="font-semibold text-slate-900">Ideal for: </span>
                                <span>{detail.idealFor}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-8 pt-5 border-t border-slate-100">
                          <Button asChild size="sm" className="w-full">
                            <Link
                              to={{
                                pathname: "/contact",
                                search: `?category=${cat.key === "digital-marketing" ? "Digital Marketing" : "Web Development"}&service=${encodeURIComponent(service.title)}`,
                              }}
                            >
                              Inquire About {service.title} <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

      {/* Scope Finder Bottom Section */}
      <section className="py-20 bg-white border-t border-slate-200" aria-labelledby="finder-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow-pill">Not Sure Where to Start?</span>
          <h3 id="finder-heading" className="mt-4 font-display text-3xl font-extrabold text-[#0F172A]">
            Choose Your Primary Objective
          </h3>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
            Tell us what you are leaning towards. We will confirm the right architecture on your discovery call, with zero sales pressure.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                title: "Software & Web",
                desc: "Websites, portals, stores, and custom applications.",
                to: "/contact?category=Web%20Development",
              },
              {
                title: "Digital Marketing",
                desc: "SEO, paid search, social media, and content.",
                to: "/contact?category=Digital%20Marketing",
              },
              {
                title: "Both Services",
                desc: "Engineer the platform, then scale traffic and leads.",
                to: "/contact?category=Both%20Services",
                featured: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border p-6 text-center transition-all",
                  item.featured
                    ? "border-[#231E53] bg-[#F0F3FF] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div>
                  <h4 className="font-display text-lg font-bold text-[#0F172A]">{item.title}</h4>
                  <p className="mt-2 text-xs text-slate-600">{item.desc}</p>
                </div>
                <div className="mt-6">
                  <Button asChild size="sm" variant={item.featured ? "default" : "secondary"} className="w-full">
                    <Link to={item.to}>Select in Form <ArrowRight className="h-3 w-3" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
