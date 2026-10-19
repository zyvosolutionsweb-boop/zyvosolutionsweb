import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [useEmailAuth, setUseEmailAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (useEmailAuth && isSupabaseConfigured && supabase) {
        // Supabase Auth
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }
        sessionStorage.setItem("zyvo_admin_auth", "true");
        sessionStorage.setItem("zyvo_admin_user", email);
        onSuccess();
        return;
      }

      // Master Password Check
      // Check stored custom password in localStorage or default
      const customPass = localStorage.getItem("zyvo_admin_password") || "zyvo2026!";
      if (password === customPass || password === "zyvo2026!") {
        sessionStorage.setItem("zyvo_admin_auth", "true");
        sessionStorage.setItem("zyvo_admin_user", "Admin Master");
        onSuccess();
      } else {
        setError("Invalid admin password. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo tone="dark" />
        </div>
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EBFF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#231E53]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00A0E1]" />
            <span>Admin Console & CMS</span>
          </span>
          <h2 className="mt-3 font-display text-2xl font-black text-slate-900 tracking-tight">
            Sign in to Zyvo Studio
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Manage inquiries, customize web content, and configure services.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white py-8 px-6 shadow-xl sm:px-10">
          
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {useEmailAuth && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zyvosolutions.com"
                  required
                  className="w-full"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {useEmailAuth ? "Password" : "Admin Master Password"}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="pl-9 w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#231E53] hover:bg-[#1C0C4D] text-white font-bold mt-2"
            >
              {loading ? "Authenticating…" : "Access Admin Studio"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setUseEmailAuth(!useEmailAuth)}
              className="font-semibold text-[#00A0E1] hover:underline"
            >
              {useEmailAuth ? "Switch to Master Password" : "Sign in with Supabase Email"}
            </button>
            <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Default: zyvo2026!
            </span>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-500 hover:text-[#231E53] transition-colors"
            >
              ← Return to public website
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
