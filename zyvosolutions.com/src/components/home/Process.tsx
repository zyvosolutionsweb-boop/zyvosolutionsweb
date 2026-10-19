import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200/80" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="eyebrow-pill">Our Process</span>
            <h2
              id="process-heading"
              className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]"
            >
              From Initial Scope to Handover.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Five sequential phases keep communication direct, scopes honest, and timelines predictable. You are involved at every critical decision point.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#231E53] hover:text-[#00A0E1] transition-colors"
              >
                <span>Discuss a project timeline</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-slate-200">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-6 py-6 first:pt-0"
              >
                <span className="font-mono text-2xl font-black text-[#231E53]" aria-hidden="true">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
