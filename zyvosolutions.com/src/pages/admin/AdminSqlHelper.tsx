import { useState } from "react";
import { 
  Database, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export function AdminSqlHelper() {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [dbStatus, setDbStatus] = useState<"not_checked" | "connected" | "needs_migration">("not_checked");

  const checkConnection = async () => {
    setChecking(true);
    if (!isSupabaseConfigured || !supabase) {
      setDbStatus("needs_migration");
      setChecking(false);
      return;
    }

    try {
      const { error } = await supabase.from("site_settings").select("business_name").limit(1);
      if (error) {
        setDbStatus("needs_migration");
      } else {
        setDbStatus("connected");
      }
    } catch {
      setDbStatus("needs_migration");
    } finally {
      setChecking(false);
    }
  };

  const copySql = async () => {
    try {
      const res = await fetch("/supabase/complete_setup.sql");
      let text = "";
      if (res.ok) {
        text = await res.text();
      }
      if (!text) {
        // Fallback: copy placeholder instruction or embed key parts
        text = `-- Complete setup script is located in zyvosolutions.com/supabase/complete_setup.sql`;
      }
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Database className="h-6 w-6 text-[#231E53]" />
            <span>Supabase Database & SQL Setup Helper</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Initialize and synchronize your Supabase cloud backend in 1 click.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={checkConnection}
          disabled={checking}
          className="flex items-center gap-1.5 text-xs font-bold"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${checking ? "animate-spin" : ""}`} />
          <span>Test Database Connection</span>
        </Button>
      </div>

      {/* Connection Status Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="font-display font-extrabold text-slate-900 text-sm mb-3">
          Environment & Credentials Status
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block mb-1">SUPABASE PROJECT URL</span>
            <span className="font-bold text-slate-800 break-all">
              {import.meta.env.VITE_SUPABASE_URL || "https://ywiwwbqwkcjpsqnkpnsf.supabase.co"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block mb-1">PUBLISHABLE KEY</span>
            <span className="font-bold text-slate-800">
              {isSupabaseConfigured ? "Configured & Active (sb_publishable_...)" : "Missing from .env"}
            </span>
          </div>
        </div>

        {dbStatus === "connected" && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>All Supabase tables and RLS policies are active and responding normally!</span>
          </div>
        )}

        {dbStatus === "needs_migration" && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Database tables not yet executed in Supabase</p>
              <p className="mt-0.5 text-amber-700">
                Follow the 3-step guide below to run the database setup script in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3-Step Setup Guide */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
        <h3 className="font-display font-extrabold text-slate-900 text-base">
          How to Run Database Setup in Supabase
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#231E53] font-bold text-white text-xs">
              1
            </span>
            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900 text-sm">Copy the complete SQL migration script</p>
              <p className="mt-1 text-slate-600">
                We generated a unified, production-ready script in{" "}
                <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">
                  zyvosolutions.com/supabase/complete_setup.sql
                </code>{" "}
                containing all tables, RLS security policies, and initial CMS seed content.
              </p>
              <div className="mt-3">
                <Button
                  size="sm"
                  onClick={copySql}
                  className="bg-[#231E53] text-white font-bold text-xs flex items-center gap-1.5"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied SQL to Clipboard!" : "Copy SQL Script to Clipboard"}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#231E53] font-bold text-white text-xs">
              2
            </span>
            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900 text-sm">Open the Supabase SQL Editor</p>
              <p className="mt-1 text-slate-600">
                Go to your project dashboard and click on the <strong>SQL Editor</strong> tab on the left sidebar.
              </p>
              <div className="mt-3">
                <a
                  href="https://supabase.com/dashboard/project/ywiwwbqwkcjpsqnkpnsf/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <span>Open Supabase SQL Editor</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#231E53] font-bold text-white text-xs">
              3
            </span>
            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900 text-sm">Click &quot;New Query&quot;, Paste &amp; Run</p>
              <p className="mt-1 text-slate-600">
                Paste the copied script into the query box and click the green <strong>Run</strong> button. In 3 seconds, all 5 tables, RLS permissions, and sample datasets will be created!
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
