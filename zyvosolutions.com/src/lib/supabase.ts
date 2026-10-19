import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/**
 * Whether Supabase credentials are present. When false, the app falls back to
 * clearly-identified local sample data (see src/data) so the site stays
 * presentable during development. Never fabricate success without credentials.
 */
export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey) && !supabaseUrl?.includes("example");

/**
 * Shared typed Supabase client (publishable/anon key only — the service-role
 * key must never live in frontend code).
 */
export const supabase = isSupabaseConfigured
  ? createClient<any>(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

/** The secure edge function that receives project inquiries with server-side validation. */
export const SUBMIT_INQUIRY_FUNCTION = "submit-inquiry";
