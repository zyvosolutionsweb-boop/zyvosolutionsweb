import { useState, useEffect } from "react";
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  KeyRound,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { defaultSettings } from "@/hooks/useSiteSettings";
import type { SiteSettings } from "@/types";

export function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check local storage
    try {
      const local = localStorage.getItem("zyvo_site_settings");
      if (local) {
        setSettings({ ...defaultSettings, ...JSON.parse(local) });
      }
    } catch {
      // ignore
    }

    // 2. Fetch from Supabase
    if (isSupabaseConfigured && supabase) {
      supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setSettings({ ...defaultSettings, ...(data[0] as SiteSettings) });
          }
        });
    }
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setError(null);

    try {
      localStorage.setItem("zyvo_site_settings", JSON.stringify(settings));

      if (isSupabaseConfigured && supabase) {
        await supabase.from("site_settings").upsert({
          ...settings,
          updated_at: new Date().toISOString(),
        });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to save settings.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("zyvo_admin_password", newPassword);
    setPwSuccess(true);
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPwSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-[#231E53]" />
            <span>Site Settings & Global Branding</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Configure contact information, company headquarters, and admin credentials.
          </p>
        </div>

        {success && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-display font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
          Company & Contact Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
              Business Name
            </label>
            <Input
              value={settings.business_name}
              onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
              Agency Tagline
            </label>
            <Input
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-[#00A0E1]" /> Official Contact Email
            </label>
            <Input
              type="email"
              value={settings.contact_email || ""}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-[#00A0E1]" /> Contact Phone (Optional)
            </label>
            <Input
              value={settings.contact_phone || ""}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              placeholder="+94 77 123 4567"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#00A0E1]" /> Location / Headquarters
            </label>
            <Input
              value={settings.location || ""}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              placeholder="Colombo, Sri Lanka"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
              Operating Timezone
            </label>
            <Input
              value={settings.timezone || "GMT+5:30"}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              placeholder="GMT+5:30"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
            Footer Bio & Narrative Note
          </label>
          <Textarea
            value={settings.footer_note || ""}
            onChange={(e) => setSettings({ ...settings, footer_note: e.target.value })}
            rows={3}
            className="text-xs sm:text-sm"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" disabled={saveLoading} className="bg-[#231E53] text-white font-bold text-xs flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>{saveLoading ? "Saving…" : "Save Site Settings"}</span>
          </Button>
        </div>
      </form>

      {/* Admin Password Management */}
      <form onSubmit={handleChangePassword} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-[#231E53]" />
            <h3 className="font-display font-extrabold text-slate-900 text-base">
              Change Admin Master Password
            </h3>
          </div>

          {pwSuccess && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Password Changed!</span>
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
              New Password
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-semibold text-slate-600 mb-1.5">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">Current Default: zyvo2026!</span>
          <Button type="submit" variant="secondary" size="sm" className="font-bold text-xs">
            Update Admin Password
          </Button>
        </div>
      </form>

    </div>
  );
}
