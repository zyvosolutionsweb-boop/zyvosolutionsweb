import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-mono font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.04] text-slate-300",
        accent: "border-sky-500/20 bg-sky-500/10 text-sky-400",
        violet: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
