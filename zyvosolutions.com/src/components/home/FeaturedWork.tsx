import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { projectFilters, projectGroup } from "@/data/site";
import type { ProjectGroup } from "@/data/site";

export function FeaturedWork() {
  const { projects, loading } = usePortfolio({ featuredOnly: false });
  const [active, setActive] = useState<ProjectGroup>("All");

  const filtered = useMemo(
    () =>
      (active === "All" ? projects : projects.filter((p) => projectGroup(p.category) === active)).slice(0, 4),
    [projects, active],
  );

  return (
    <section id="work" className="py-20 lg:py-28 bg-white border-b border-slate-200/80" aria-labelledby="work-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <span className="eyebrow-pill">Our Work</span>
            <h2 id="work-heading" className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
              Selected Demonstration Studies
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl">
              Real architectural samples illustrating our technical standards across corporate consulting sites, e-commerce storefronts, and analytics SaaS platforms.
            </p>
          </div>

          {/* Group filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter case studies">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active === f
                    ? "bg-[#231E53] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Grid of Case Studies */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {!loading &&
            filtered.map((project, idx) => (
              <Link
                key={project.id}
                to={`/work#${project.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm transition-all duration-200 hover:border-[#231E53] hover:shadow-[0_12px_28px_rgba(35,30,83,0.08)]"
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

                  <h3 className="mt-5 font-display text-2xl font-bold text-[#0F172A] group-hover:text-[#231E53] transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-[#00A0E1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.project_url ? (
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#00A0E1] group-hover:text-[#231E53] transition-colors">
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="font-semibold text-[#231E53] group-hover:text-[#00A0E1] transition-colors">
                      Explore Architecture →
                    </span>
                  )}
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#231E53] hover:text-[#00A0E1] transition-colors"
          >
            <span>View all demonstration studies and technical roadmaps</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
