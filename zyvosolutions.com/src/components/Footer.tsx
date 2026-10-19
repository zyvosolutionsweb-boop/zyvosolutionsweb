import { Link } from "react-router-dom";
import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const softwareLinks = [
  { label: "Business Websites", to: "/services#business-website-development" },
  { label: "E-commerce Platforms", to: "/services#e-commerce-development" },
  { label: "Custom Web Applications", to: "/services#custom-web-applications" },
  { label: "Landing Pages", to: "/services#landing-page-development" },
  { label: "Website Maintenance & SLAs", to: "/services#maintenance-and-optimization" },
];

const marketingLinks = [
  { label: "Search Engine Optimization (SEO)", to: "/services#seo" },
  { label: "Paid Search & Meta Ads", to: "/services#paid-advertising" },
  { label: "Social Media Strategy", to: "/services#social-media-marketing" },
  { label: "Content Marketing", to: "/services#content-marketing" },
  { label: "Analytics & Conversion Tracking", to: "/services#analytics-and-reporting" },
];



export function Footer() {
  const settings = useSiteSettings();
  const social = settings.social_links ?? {
    facebook: "https://www.facebook.com/share/1GCdP8q1Fy/",
    instagram: "https://www.instagram.com/zyvosolutions",
    linkedin: "https://www.linkedin.com/company/zyvosolutions",
  };

  return (
    <footer className="bg-[#1C0C4D] text-slate-300 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 pb-14 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">
              Driven by Minds. Defined by Impact. Zyvo Solutions is a full-service digital engineering and marketing agency in Sri Lanka, creating technology and growth systems that scale businesses worldwide.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={social.facebook ?? "https://www.facebook.com/share/1GCdP8q1Fy/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zyvo on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#00A0E1] transition-all hover:scale-105"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={social.instagram ?? "https://www.instagram.com/zyvosolutions"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zyvo on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#00A0E1] transition-all hover:scale-105"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={social.linkedin ?? "https://www.linkedin.com/company/zyvosolutions"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zyvo on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#00A0E1] transition-all hover:scale-105"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Software Solutions */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Software Solutions</h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              {softwareLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-slate-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing Solutions */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Marketing Solutions</h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              {marketingLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-slate-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Headquarters</h4>
            <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#00A0E1] mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </p>
              {settings.contact_email && (
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#00A0E1]" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-white transition-colors">
                    {settings.contact_email}
                  </a>
                </p>
              )}
              <div className="pt-2 text-xs font-mono text-slate-400">
                Timezone: GMT+5:30
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Zyvo Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
