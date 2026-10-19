import { Link } from "react-router-dom";
import { ArrowRight, Laptop, ShieldCheck, Zap, Sparkles, Code2, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCmsContent } from "@/hooks/useCmsContent";

export function Hero() {
  const cms = useCmsContent("hero");
  const subtitle = cms.subtitle || "Digital Engineering & Growth Agency · Colombo & Global";
  const lead = cms.content?.lead || "Zyvo Solutions is a full-service digital agency. We engineer bespoke web applications, enterprise commerce platforms, and data-backed performance marketing systems that drive measurable commercial growth.";
  const ctaPrimaryText = cms.content?.cta_primary_text || "Let's Build Together";
  const ctaPrimaryLink = cms.content?.cta_primary_link || "/contact";
  const ctaSecondaryText = cms.content?.cta_secondary_text || "Explore Verticals";
  const ctaSecondaryLink = cms.content?.cta_secondary_link || "/services";

  return (
    <section 
      className="relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28 bg-white border-b border-slate-200/80" 
      aria-labelledby="hero-heading"
    >
      {/* Decorative Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">


        {/* Soft atmospheric gradient glows */}
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#E8EBFF]/70 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-[480px] w-[480px] rounded-full bg-[#00A0E1]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: High-Authority Headline & Value Proposition */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-7">
            
            {/* Top eyebrow pill with live pulsing beacon */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#E8EBFF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#231E53] border border-[#231E53]/10 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A0E1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A0E1]"></span>
              </span>
              <span>{subtitle}</span>
            </div>

            {/* Bold, commanding headline with clean architectural styling */}
            <h1
              id="hero-heading"
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Minds That Build Solutions.{" "}
              <span className="relative inline-block text-[#231E53]">
                Defined by Impact.
                <span className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-gradient-to-r from-[#00A0E1] via-[#231E53] to-transparent" />
              </span>
            </h1>

            {/* Clear, confident editorial lead text */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              {lead}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-[#231E53] text-white hover:bg-[#1C0C4D] shadow-lg shadow-[#231E53]/20 font-bold px-7">
                <Link to={ctaPrimaryLink}>
                  {ctaPrimaryText} <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>

              <Button asChild variant="secondary" size="lg" className="border-slate-300 text-[#231E53] hover:bg-slate-50 font-bold px-7">
                <Link to={ctaSecondaryLink}>
                  {ctaSecondaryText}
                </Link>
              </Button>
            </div>

            {/* Guarantees & Credentials */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/90 w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  <Laptop className="h-3.5 w-3.5 text-[#00A0E1]" />
                  <span>Architecture</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">100% Bespoke Code</p>
                <p className="text-xs text-slate-500">Zero template bloat</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00A0E1]" />
                  <span>SLA Guarantee</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">Fixed Milestone Scope</p>
                <p className="text-xs text-slate-500">Agreed deliverables & timelines</p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  <Zap className="h-3.5 w-3.5 text-[#00A0E1]" />
                  <span>Access</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">Direct Engineer Access</p>
                <p className="text-xs text-slate-500">No account manager layers</p>
              </div>
            </div>

          </div>

          {/* Right Column: DEDICATED BRAND LOGO FOCUS & EMBLEM SHOWCASE */}
          <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Ambient Glow behind the logo showcase */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#231E53]/20 via-[#00A0E1]/30 to-[#231E53]/20 blur-2xl opacity-70" />

              {/* Main Brand Showcase Showcase Card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-white p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(35,30,83,0.12)] overflow-hidden">
                


                {/* Top status bar */}
                <div className="relative z-10 flex items-center justify-between pb-6 border-b border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono font-semibold text-slate-700">Official Brand Identity</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8EBFF] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#231E53]">
                    <Sparkles className="h-3 w-3 text-[#00A0E1]" />
                    <span>Est. Colombo</span>
                  </span>
                </div>

                {/* Center: Heroic Brand Logo Emblem Presentation */}
                <div className="relative z-10 py-10 sm:py-12 flex flex-col items-center text-center">
                  
                  {/* Outer glowing aura ring */}
                  <div className="relative group cursor-default">
                    <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#00A0E1] via-[#231E53] to-[#00A0E1] opacity-30 blur-lg transition duration-500 group-hover:opacity-60" />
                    
                    {/* Sculptural Brand Icon Tile */}
                    <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-[#231E53] via-[#1C0C4D] to-[#0E152E] shadow-2xl shadow-[#231E53]/40 border-2 border-white/20 transition-transform duration-300 group-hover:scale-105">
                      <svg viewBox="0 0 24 24" className="h-16 w-16 sm:h-18 sm:w-18 fill-none drop-shadow-md" aria-hidden="true">
                        <path
                          d="M4.5 5.5H19.5L9 15.5H19.5V18.5H4.5L15 8.5H4.5V5.5Z"
                          fill="url(#zyvo-hero-gradient)"
                        />
                        <defs>
                          <linearGradient id="zyvo-hero-gradient" x1="4.5" y1="5.5" x2="19.5" y2="18.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00A0E1" />
                            <stop offset="0.6" stopColor="#41AFAA" />
                            <stop offset="1" stopColor="#00A0E1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Brand Wordmark Display */}
                  <div className="mt-8">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="font-display text-2xl sm:text-4xl font-black tracking-tight text-[#231E53]">
                        ZYVO
                      </span>
                      <span className="font-display text-sm sm:text-base font-extrabold tracking-[0.24em] uppercase text-[#00A0E1]">
                        SOLUTIONS
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Software Engineering & Growth Systems
                    </p>
                  </div>

                </div>

                {/* Bottom Architectural Pillars Row */}
                <div className="relative z-10 pt-5 sm:pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 shadow-xs">
                    <Code2 className="h-4 w-4 text-[#00A0E1] mx-auto mb-1" />
                    <p className="font-mono text-[10px] font-bold text-slate-800 uppercase">Software</p>
                    <p className="text-[9px] text-slate-500">Custom Code</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 shadow-xs">
                    <Rocket className="h-4 w-4 text-[#00A0E1] mx-auto mb-1" />
                    <p className="font-mono text-[10px] font-bold text-slate-800 uppercase">Marketing</p>
                    <p className="text-[9px] text-slate-500">High ROAS</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 shadow-xs">
                    <Globe className="h-4 w-4 text-[#00A0E1] mx-auto mb-1" />
                    <p className="font-mono text-[10px] font-bold text-slate-800 uppercase">Delivery</p>
                    <p className="text-[9px] text-slate-500">Worldwide</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
