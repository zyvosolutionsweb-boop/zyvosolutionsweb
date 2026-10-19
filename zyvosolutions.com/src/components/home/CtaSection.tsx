import { Link } from "react-router-dom";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function CtaSection() {
  const settings = useSiteSettings();

  return (
    <section aria-labelledby="cta-heading" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#231E53] via-[#1C0C4D] to-[#0E152E] p-6 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle ambient light glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#00A0E1]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#231E53]/40 blur-3xl" />
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A0E1] border border-white/10">
                Let's Build Together
              </span>
              
              <h2
                id="cta-heading"
                className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                Let&apos;s Build Something Special Together.
              </h2>
              
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
                Partner with us to create real business impact through powerful ideas, modern digital technology, and high-velocity execution.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-6 text-xs sm:text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00A0E1]" />
                  <span>Free 30-min discovery call</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00A0E1]" />
                  <span>Fixed milestone proposal</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#00A0E1]" />
                  <span>Direct senior engineer communication</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-start lg:justify-end">
              <Button asChild size="lg" className="w-full bg-white text-[#231E53] hover:bg-slate-100 font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                <Link to="/contact">
                  Start a Project Inquiry <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>

              {settings.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/15 transition-all"
                >
                  <Mail className="h-4 w-4 text-[#00A0E1]" />
                  <span>{settings.contact_email}</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
