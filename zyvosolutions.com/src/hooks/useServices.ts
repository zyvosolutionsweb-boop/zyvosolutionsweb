import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { demoServices } from "@/data/site";
import type { Service } from "@/types";

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

function getInitialServices(): Service[] {
  try {
    const local = localStorage.getItem("zyvo_admin_services");
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return demoServices;
}

export function useServices() {
  const [state, setState] = useState<ServicesState>(() => ({
    services: getInitialServices(),
    loading: false,
    error: null,
    isDemo: !isSupabaseConfigured,
  }));

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    let cancelled = false;

    const fetchServices = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_published", true)
          .order("display_order", { ascending: true });

        if (cancelled) return;
        if (error || !data || data.length === 0) {
          setState({
            services: getInitialServices(),
            loading: false,
            error: null,
            isDemo: true,
          });
        } else {
          setState({
            services: data as Service[],
            loading: false,
            error: null,
            isDemo: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            services: getInitialServices(),
            loading: false,
            error: null,
            isDemo: true,
          });
        }
      }
    };

    void fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
