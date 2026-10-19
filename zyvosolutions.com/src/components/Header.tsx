import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        elevated
          ? "border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-[0_2px_16px_rgba(35,30,83,0.06)]"
          : "border-b border-transparent bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-semibold transition-colors duration-150",
                  isActive
                    ? "text-[#231E53] underline decoration-[#00A0E1] decoration-2 underline-offset-8"
                    : "text-slate-600 hover:text-[#231E53]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Button: Revocare Let's Build Together style */}
        <div className="hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-2 rounded-full bg-[#E8EBFF] px-3 py-1 text-xs font-semibold text-[#231E53]">
            <span className="h-2 w-2 rounded-full bg-[#00A0E1]" />
            <span>Sri Lanka & Global</span>
          </div>

          <Button asChild size="default" className="shadow-sm">
            <Link to="/contact">
              Let's Build Together <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#231E53] transition-colors hover:bg-slate-50 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-slate-200 bg-white px-5 pb-6 pt-3 shadow-lg md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-[#E8EBFF] text-[#231E53]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#231E53]",
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </NavLink>
              ))}

              <Button asChild className="mt-4 w-full">
                <Link to="/contact">
                  Let's Build Together <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
