import { Mail, MapPin, Clock3, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { InquiryForm } from "@/components/InquiryForm";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { isSupabaseConfigured } from "@/lib/supabase";

const expectations = [
  "A direct technical reply within 24 business hours",
  "A free 30-minute discovery & architectural consultation",
  "A fixed, itemized milestone proposal — zero hidden fees",
];

export default function Contact() {
  const settings = useSiteSettings();

  return (
    <>
      <Seo
        title="Contact Us — Start a Project | Zyvo Solutions"
        description="Schedule a consultation with Zyvo Solutions for tailored web development, custom software, UI/UX design, or ROI-focused digital marketing in Sri Lanka and worldwide."
        path="/contact"
      />

      <section className="pt-28 pb-24 md:pt-36 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
            
            {/* Left Column: Direct Agency Contact & Commitments */}
            <div className="lg:col-span-2">
              <span className="eyebrow-pill">
                Get in Touch
              </span>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                Let's Build Something{" "}
                <span className="text-[#231E53] underline decoration-[#00A0E1] decoration-2">
                  Special Together.
                </span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Share a few details about your business goals and technical requirements. We review every project personally with commercial and architectural clarity.
              </p>

              <div className="mt-8 space-y-3">
                {expectations.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8EBFF] text-[10px] font-bold text-[#231E53]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-700">
                <h4 className="font-display font-bold text-[#0F172A] text-sm uppercase tracking-wider">
                  Headquarters
                </h4>

                {settings.location && (
                  <p className="flex items-start gap-3 text-xs sm:text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00A0E1]" aria-hidden="true" />
                    <span>{settings.location} (Sri Lanka & Global)</span>
                  </p>
                )}

                {settings.contact_email && (
                  <p className="flex items-center gap-3 text-xs sm:text-sm">
                    <Mail className="h-4 w-4 text-[#00A0E1]" aria-hidden="true" />
                    <a href={`mailto:${settings.contact_email}`} className="text-[#231E53] hover:text-[#00A0E1] transition-colors font-semibold">
                      {settings.contact_email}
                    </a>
                  </p>
                )}

                <p className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Clock3 className="h-4 w-4 text-[#00A0E1]" aria-hidden="true" />
                  Mon – Fri, 9:00 – 18:00 (GMT+5:30) · Client calls across timezones
                </p>

                <p className="flex items-center gap-3 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-[#00A0E1]" aria-hidden="true" />
                  Protected by standard confidentiality and mutual NDA
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Form Card */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(35,30,83,0.06)]">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">Project Discovery Form</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Tell us about your project timeline and objectives.</p>
                </div>

                <InquiryForm />

                {!isSupabaseConfigured && (
                  <p className="mt-4 text-center text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    Demonstration mode active — configure Supabase credentials to enable live database submission.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
