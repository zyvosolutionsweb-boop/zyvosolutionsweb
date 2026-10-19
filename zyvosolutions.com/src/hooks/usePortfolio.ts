import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { demoProjects } from "@/data/site";
import type { PortfolioProject } from "@/types";

interface PortfolioState {
  projects: PortfolioProject[];
  loading: boolean;
  error: string | null;
  isDemo: boolean;
}

function demoFallback(featuredOnly: boolean): PortfolioProject[] {
  // Check if admin saved custom projects in localStorage first
  try {
    const local = localStorage.getItem("zyvo_admin_portfolio");
    if (local) {
      const parsed: PortfolioProject[] = JSON.parse(local);
      if (parsed.length > 0) {
        return parsed.filter((p) => p.is_published && (featuredOnly ? p.is_featured : true));
      }
    }
  } catch {
    // ignore
  }

  return demoProjects.filter(
    (p) => p.is_published && (featuredOnly ? p.is_featured : true)
  );
}

/**
 * Fetches published portfolio projects (optionally only featured ones).
 * Falls back to local sample data when Supabase is not yet initialized or returns empty.
 */
export function usePortfolio(options?: { featuredOnly?: boolean }) {
  const featuredOnly = options?.featuredOnly ?? false;
  const [state, setState] = useState<PortfolioState>(() => ({
    projects: demoFallback(featuredOnly),
    loading: false,
    error: null,
    isDemo: !isSupabaseConfigured,
  }));

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured || !supabase) {
      setState({ projects: demoFallback(featuredOnly), loading: false, error: null, isDemo: true });
      return;
    }

    const fetchProjects = async () => {
      try {
        if (!supabase) return;
        let query = supabase
          .from("portfolio_projects")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (featuredOnly) {
          query = query.eq("is_featured", true).limit(4);
        }

        const { data, error } = await query;
        if (cancelled) return;

        if (error || !data || data.length === 0) {
          // Table doesn't exist yet or is empty: gracefully use demo/local projects
          setState({
            projects: demoFallback(featuredOnly),
            loading: false,
            error: null,
            isDemo: true,
          });
        } else {
          setState({
            projects: data as PortfolioProject[],
            loading: false,
            error: null,
            isDemo: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            projects: demoFallback(featuredOnly),
            loading: false,
            error: null,
            isDemo: true,
          });
        }
      }
    };

    void fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [featuredOnly]);

  return state;
}
