import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { PageSection } from "@/types";

const defaultSections: Record<string, PageSection> = {
  hero: {
    section_key: "hero",
    title: "Minds That Build Solutions. Defined by Impact.",
    subtitle: "Digital Engineering & Growth Agency · Colombo & Global",
    content: {
      lead: "Zyvo Solutions is a full-service digital agency. We engineer bespoke web applications, enterprise commerce platforms, and data-backed performance marketing systems that drive measurable commercial growth.",
      cta_primary_text: "Let's Build Together",
      cta_primary_link: "/contact",
      cta_secondary_text: "Explore Verticals",
      cta_secondary_link: "/services",
    },
  },
  why_zyvo: {
    section_key: "why_zyvo",
    title: "Redefine What a Digital Partner Can Be.",
    subtitle: "Our Philosophy",
    content: {
      lead: "Most businesses do not need another agency pushing generic themes or selling buzzwords. They need a disciplined partner that understands commercial goals, builds dependable software, and communicates with straight answers.",
      commitment: "If a proposed feature will not measurably advance your revenue, user experience, or operational efficiency, we will tell you directly — even if it means less billable scope for us.",
    },
  },
  faq: {
    section_key: "faq",
    title: "Questions, Answered Honestly.",
    subtitle: "Frequently Asked Questions",
    content: {
      items: [
        {
          q: "How does pricing and milestone invoicing work?",
          a: "We use a transparent 40 / 30 / 30 model: 40% upon scope approval, 30% upon staging milestone approval, and 30% upon launch and complete code handover. Zero hidden line items.",
        },
        {
          q: "Do I own 100% of the code and repository?",
          a: "Yes, absolutely. Upon final payment, you receive complete administrative ownership of your GitHub repository, database, DNS records, and design source files.",
        },
        {
          q: "Do you provide a warranty after launch?",
          a: "Every project includes 30 calendar days of post-launch technical warranty covering bug fixes, browser adjustments, and performance tweaks at no additional cost.",
        },
      ],
    },
  },
};

export function useCmsContent(sectionKey: string) {
  const [section, setSection] = useState<PageSection>(() => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(`zyvo_cms_${sectionKey}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }
    return defaultSections[sectionKey] || {
      section_key: sectionKey,
      title: null,
      subtitle: null,
      content: {},
    };
  });

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    let cancelled = false;

    supabase
      .from("page_sections")
      .select("*")
      .eq("section_key", sectionKey)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setSection(data as PageSection);
        try {
          localStorage.setItem(`zyvo_cms_${sectionKey}`, JSON.stringify(data));
        } catch {
          // ignore
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sectionKey]);

  return section;
}
