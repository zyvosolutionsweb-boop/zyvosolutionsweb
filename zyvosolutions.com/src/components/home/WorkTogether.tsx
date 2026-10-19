import { ShieldCheck, FileCheck, RefreshCw, GitCommit } from "lucide-react";

const guarantees = [
  {
    icon: FileCheck,
    title: "Fixed Milestone Invoicing",
    text: "40% upon scope approval, 30% upon staging milestone approval, and 30% upon launch and repository transfer. Zero hidden line items.",
  },
  {
    icon: GitCommit,
    title: "Weekly Staging Releases",
    text: "You receive a password-protected live staging URL from Week 2 onward. You inspect working features as they are built, not just static mockups.",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Launch Warranty",
    text: "Every build comes with 30 calendar days of post-launch technical warranty covering any bug fixes, browser adjustments, or performance tweaks.",
  },
  {
    icon: RefreshCw,
    title: "Complete Handover & IP Transfer",
    text: "Upon completion, you receive full administrative ownership of your GitHub repository, database, DNS records, and design source files.",
  },
];

export function WorkTogether() {
  return (
    <section
      className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      aria-labelledby="work-together-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <span className="eyebrow-pill">Collaboration SLA</span>
          <h2
            id="work-together-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]"
          >
            How Engagements Are Run
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Professional digital engineering requires operational discipline. Here are the exact commercial and technical standards applied to every client engagement.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-[#231E53]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EBFF] text-[#231E53]">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-[#0F172A]">
                {g.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                {g.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
