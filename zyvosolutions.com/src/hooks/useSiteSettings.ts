import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { SiteSettings } from "@/types";

/** Static defaults shown when Supabase isn't configured or the row is missing. */
export const defaultSettings: SiteSettings = {
  business_name: "Zyvo Solutions",
  tagline: "Transforming Ideas Into Digital Success",
  contact_email: "info@zyvosolutions.com",
  location: "Colombo, Sri Lanka",
  social_links: {
    facebook: "https://www.facebook.com/share/1GCdP8q1Fy/",
    instagram: "https://www.instagram.com/zyvosolutions",
    linkedin: "https://www.linkedin.com/company/zyvosolutions",
  },
  footer_note:
    "A full-service digital engineering and marketing agency delivering tailored web development, custom applications, and ROI-focused digital marketing for local and global brands.",
  is_public: true,
};

/**
 * Reads the single public row from `site_settings` (RLS restricts reads to
 * is_public = true). Returns the defaults whenever Supabase data is absent.
 */
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase
      .from("site_settings")
      .select("*")
      .eq("is_public", true)
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setSettings({ ...defaultSettings, ...(data[0] as Partial<SiteSettings>) });
        }
      });
  }, []);

  return settings;
}
