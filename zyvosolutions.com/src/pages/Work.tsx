import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/usePortfolio";
import { projectFilters, projectGroup, type ProjectGroup } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Work() {
  const { projects, loading, error } = usePortfolio();
  const [active, setActive] = useState<ProjectGroup>("All");

  const filtered = useMemo(
    () =>
      active === "All" ? projects : projects.filter((p) => projectGroup(p.category) === active),
    [projects, active],
  );

  return (
    <>
      <Seo
        title="Our Work & Portfolio — Zyvo Solutions | Driven by Minds. Defined by Impact"
        description="Explore selected web development and digital marketing case studies and demonstration concepts by Zyvo Solutions in Sri Lanka and worldwide."
        path="/work"
      />

      <section className="pt-28 pb-12 md:pt-36 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow-pill">Portfolio & Case Studies</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Selected Work.{" "}
            <span className="text-[#231E53] underline decoration-[#00A0E1] decoration-2">
              Defined by Execution.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
            A transparent look at our architectural standards across corporate consulting portals, e-commerce storefronts, and analytics SaaS platforms.
          </p>

          {/* Group filter pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-10" role="group" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-semibold transition-all",
                  active === f
                    ? "bg-[#231E53] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center py-16" role="status">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#231E53]" />
              <span className="sr-only">Loading projects…</span>
            </div>
          )}

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
              No projects in this group yet — try another filter.
            </p>
          )}

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {!loading &&
              filtered.map((project, idx) => (
                <article
                  key={project.id}
                  id={project.slug}
                  className="group flex h-full scroll-mt-24 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-200 hover:border-[#231E53] hover:shadow-[0_12px_28px_rgba(35,30,83,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#E8EBFF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#231E53]">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        Case 0{idx + 1}
                      </span>
                    </div>

                    <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold text-[#0F172A] group-hover:text-[#231E53] transition-colors">
                      {project.title}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.project_url ? (
                      <div className="flex items-center justify-between pt-1">
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#231E53] px-4 py-2 text-xs font-bold text-white hover:bg-[#00A0E1] transition-all shadow-xs"
                        >
                          <span>Visit Live Website</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          to="/contact"
                          className="text-xs font-semibold text-slate-500 hover:text-[#231E53]"
                        >
                          Inquire
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-between text-xs font-bold text-[#231E53] hover:text-[#00A0E1] transition-colors pt-1"
                      >
                        <span>Discuss Architecture & Scope</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="font-display text-2xl font-bold text-[#0F172A] mb-2">Want to build something similar?</h3>
            <p className="text-sm text-slate-600 mb-6">Let's discuss your requirements and draft an itemized milestone scope.</p>
            <Button asChild size="lg" className="shadow-md">
              <Link to="/contact">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
