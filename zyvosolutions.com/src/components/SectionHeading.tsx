import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-3.5 md:mb-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <div>
          <span className="eyebrow-pill">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.14]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
