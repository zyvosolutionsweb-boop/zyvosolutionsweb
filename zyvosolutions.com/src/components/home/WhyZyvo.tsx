import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Terminal, Cpu, Clock, GitBranch } from "lucide-react";
import { useCmsContent } from "@/hooks/useCmsContent";

const pillars = [
  {
    icon: Terminal,
    title: "Complete Code Ownership",
    text: "You own 100% of your code, repository, designs, and database. Clean typed architecture with thorough handover documentation so any engineer can maintain it.",
  },
  {
    icon: Cpu,
    title: "Engineering Over Templates",
    text: "We build bespoke React and Next.js applications tailored to your specific commercial workflows — not slow, generic WordPress themes.",
  },
  {
    icon: Clock,
    title: "Fixed Milestone Scopes",
    text: "Transparent milestone quotes with agreed deliverable dates. If a proposed feature is outside the agreed scope, we discuss it openly before writing code.",
  },
  {
    icon: GitBranch,
    title: "Direct Senior Access",
    text: "Communicate directly with the engineers and technical marketers building your project. No layers of non-technical account managers.",
  },
];

export function WhyZyvo() {
  const cms = useCmsContent("why_zyvo");
  const subtitle = cms.subtitle || "Our Philosophy";
  const title = cms.title || "{title}";
  const lead = cms.content?.lead || "Most businesses do not need another agency pushing generic themes or selling buzzwords. They need a disciplined partner that understands commercial goals, builds dependable software, and communicates with straight answers.";
  const commitment = cms.content?.commitment || "If a proposed feature will not measurably advance your revenue, user experience, or operational efficiency, we will tell you directly — even if it means less billable scope for us.";

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Revocare-Inspired Philosophy */}
          <div className="lg:col-span-5">
            <span className="eyebrow-pill">{subtitle}</span>
            <h2 id="why-heading" className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              {title}
            </h2>
            
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {lead}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#231E53] font-bold text-sm">
                <ShieldCheck className="h-5 w-5 text-[#00A0E1]" />
                <span>The Zyvo Commercial Commitment</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {commitment}
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#231E53] hover:text-[#00A0E1] transition-colors"
              >
                <span>Read our full agency story & background</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Key Pillars */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all hover:border-[#231E53] hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EBFF] text-[#231E53]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-[#0F172A]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
