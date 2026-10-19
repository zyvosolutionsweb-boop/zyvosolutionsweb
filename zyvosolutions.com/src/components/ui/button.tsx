import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231E53] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#231E53] text-white hover:bg-[#1C0C4D] shadow-sm hover:shadow active:scale-[0.98]",
        primary:
          "bg-[#00A0E1] text-white hover:bg-[#0089C4] shadow-sm hover:shadow active:scale-[0.98]",
        secondary:
          "border border-[#231E53] text-[#231E53] bg-transparent hover:bg-[#231E53] hover:text-white active:scale-[0.98]",
        outlineWhite:
          "border border-white/30 text-white bg-transparent hover:bg-white hover:text-[#231E53] active:scale-[0.98]",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-[#231E53]",
        link: "text-[#231E53] underline-offset-4 hover:underline hover:text-[#00A0E1]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs font-semibold",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
