import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Inbox, 
  Sparkles, 
  Layers, 
  FolderGit2, 
  Settings, 
  Database, 
  LogOut, 
  ExternalLink, 
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { Logo } from "@/components/Logo";

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ activeTab, onTabChange, onLogout, children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userLabel = sessionStorage.getItem("zyvo_admin_user") || "Admin";

  const navigation = [
    { id: "inquiries", label: "Client Inquiries", icon: Inbox },
    { id: "cms", label: "Content Studio (CMS)", icon: Sparkles },
    { id: "services", label: "Services & Verticals", icon: Layers },
    { id: "portfolio", label: "Case Studies & Work", icon: FolderGit2 },
    { id: "settings", label: "Site Settings & Branding", icon: Settings },
    { id: "sql", label: "Supabase & Database SQL", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1C0C4D] text-white border-b border-white/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <Logo tone="light" />

              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A0E1] border border-white/10">
                <ShieldCheck className="h-3 w-3" />
                <span>Admin Studio</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>Live Website</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#00A0E1]" />
              </Link>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/25 px-3.5 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/25 transition-colors"
                title="Sign out of Admin"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop & Mobile Sidebar Navigation */}
          <aside className={`lg:col-span-3 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <nav className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs space-y-1">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100 mb-2">
                Studio Modules
              </div>

              {navigation.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all text-left ${
                      isActive
                        ? "bg-[#231E53] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#00A0E1]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 mt-3 border-t border-slate-100 px-3 pb-1 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Logged in as:</span>
                <span className="font-bold text-slate-700">{userLabel}</span>
              </div>
            </nav>
          </aside>

          {/* Active Module Panel */}
          <main className="lg:col-span-9 w-full">
            {children}
          </main>

        </div>
      </div>

    </div>
  );
}
