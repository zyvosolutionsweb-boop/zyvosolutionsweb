import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  compact?: boolean;
  tone?: "dark" | "light";
}

export function Logo({ className, compact = false, tone = "dark" }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      to="/"
      aria-label="Zyvo Solutions — home"
      className={cn("group inline-flex items-center gap-2.5 select-none", className)}
    >
      {/* Revocare-inspired Royal Indigo & Electric Blue emblem */}
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-sm",
          isLight ? "bg-white text-[#231E53]" : "bg-[#231E53] text-white"
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none" aria-hidden="true">
          <path
            d="M4.5 5.5H19.5L9 15.5H19.5V18.5H4.5L15 8.5H4.5V5.5Z"
            fill={isLight ? "#231E53" : "#00A0E1"}
          />
        </svg>
      </div>

      {!compact && (
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight transition-colors",
              isLight ? "text-white" : "text-[#231E53]"
            )}
          >
            ZYVO
          </span>
          <span
            className={cn(
              "font-display text-xs font-bold tracking-[0.18em] uppercase",
              isLight ? "text-[#00A0E1]" : "text-[#00A0E1]"
            )}
          >
            SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
}
