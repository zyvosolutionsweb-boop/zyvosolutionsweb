import { Link } from "react-router-dom";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Compass,
    title: "Commercial-First Engineering",
    description:
      "We build software that measurably drives sales, operational efficiency, and customer lifetime value — not just pretty visuals or template themes.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Scoping & Direct Accountability",
    description:
      "Fixed milestone pricing, transparent deliverables, and straight answers. If an idea will not serve your business objectives, we will tell you directly.",
  },
  {
    icon: Sparkles,
    title: "World-Class Velocity & Craft",
    description:
      "Senior engineer attention on every sprint — from initial cloud database architecture to animations, SEO metadata, and Core Web Vitals optimization.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us — Zyvo Solutions | Driven by Minds. Defined by Impact"
        description="Zyvo Solutions is a full-service digital engineering and growth marketing agency delivering websites, web apps, UI/UX, and performance marketing in Sri Lanka and globally."
        path="/about"
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="eyebrow-pill">
            About Zyvo Solutions
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A]">
            Driven by Minds.{" "}
            <span className="text-[#231E53] underline decoration-[#00A0E1] decoration-2">
              Defined by Impact.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Zyvo Solutions brings custom software engineering, modern web applications, and data-driven marketing together under one roof. We help ambitious companies launch modern online experiences, expand customer reach, and scale in Sri Lanka and worldwide.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 sm:p-12">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#00A0E1]">01 / FOUNDATION</span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0F172A]">Why We Exist</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Most companies do not need another generic template agency. They need an engineering partner that asks the tough commercial questions, understands technical scalability, and executes with precision.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#00A0E1]">02 / EXECUTION</span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0F172A]">How We Build</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Agile sprints, modern React/Next.js and cloud stacks, modular components, and automated CI/CD. Discovery before design, design before code — with fixed budgets and complete clarity.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#00A0E1]">03 / HORIZON</span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0F172A]">Global Reach</h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  Headquartered in Colombo, Sri Lanka, serving regional clients and global brands across North America, Europe, the UK, Australia, and the Middle East with seamless cross-timezone workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200/80" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow-pill">Core Principles</span>
            <h2 id="values-heading" className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Standards We Never Compromise
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-[#231E53]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8EBFF] text-[#231E53]">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-[#0F172A]">{v.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-bold text-[#0F172A]">
              Ready to partner with a team that delivers?
            </h3>
            <div className="mt-6">
              <Button asChild size="lg" className="shadow-md">
                <Link to="/contact">
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
