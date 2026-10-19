import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus-visible:border-[#231E53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231E53]/15 disabled:cursor-not-allowed disabled:opacity-50 shadow-xs",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/10",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus-visible:border-[#231E53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231E53]/15 disabled:cursor-not-allowed disabled:opacity-50 shadow-xs",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/10",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
