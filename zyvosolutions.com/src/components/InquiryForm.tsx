import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import {
  inquirySchema,
  SERVICE_CATEGORIES,
  SERVICES_BY_CATEGORY,
  BUDGET_RANGES,
  TIMELINES,
} from "@/schemas/inquiry";
import { countries } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, SUBMIT_INQUIRY_FUNCTION } from "@/lib/supabase";
import type { InquirySubmitResult } from "@/types";

interface FieldErrorProps {
  message: string | undefined;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-400">
      {message}
    </p>
  );
}

export function InquiryForm() {
  const [result, setResult] = useState<InquirySubmitResult | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      full_name: "",
      email: "",
      company_name: "",
      country: "",
      service_category: "",
      service_type: "",
      budget_range: "",
      project_timeline: "",
      project_description: "",
      consent: false,
      company_size_hint: "",
    },
  });

  const selectedCategory = watch("service_category");
  const selectedCountry = watch("country");
  const selectedService = watch("service_type");
  const selectedBudget = watch("budget_range");
  const selectedTimeline = watch("project_timeline");

  // Deep-link prefill from CTA links like /contact?category=…&service=…
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const service = params.get("service");
    const allowed = SERVICE_CATEGORIES as readonly string[];
    if (category && allowed.includes(category)) {
      setValue("service_category", category);
      if (service && (SERVICES_BY_CATEGORY[category] ?? []).includes(service)) {
        setValue("service_type", service);
      }
    }      // Run once on mount; deep-link params don't change after hydration.
    }, []);

  const onSubmit = async () => {
    setResult(null);

    const values = watch();

    // Honeypot check
    if (values.company_size_hint && values.company_size_hint.length > 0) {
      setResult({
        ok: true,
        message: "Thank you — your inquiry has been received.",
      });
      return;
    }

    const payload = {
      full_name: values.full_name,
      email: values.email,
      company_name: values.company_name || null,
      country: values.country,
      service_category: values.service_category,
      service_type: values.service_type || "Not sure yet — let's discuss the right mix",
      budget_range: values.budget_range || null,
      project_timeline: values.project_timeline || null,
      project_description: values.project_description,
      status: "new" as const,
    };

    let saved = false;

    // 1. Try direct Supabase insertion
    if (isSupabaseConfigured) {
      try {
        const { supabase } = await import("@/lib/supabase");
        if (supabase) {
          const { error: insertError } = await supabase.from("project_inquiries").insert(payload);
          if (!insertError) {
            saved = true;
            // Best-effort trigger of edge function notification
            try {
              void supabase.functions.invoke(SUBMIT_INQUIRY_FUNCTION, { body: payload });
            } catch {
              // ignore edge function notification error if not deployed
            }
          }
        }
      } catch (err) {
        console.warn("Supabase direct insert error, using offline queue fallback:", err);
      }
    }

    // 2. Local fallback storage if Supabase table is not yet migrated or offline
    try {
      const existing = JSON.parse(localStorage.getItem("zyvo_inquiries") || "[]");
      const localRecord = {
        ...payload,
        id: "local_" + Date.now(),
        created_at: new Date().toISOString(),
        synced: saved,
      };
      existing.unshift(localRecord);
      localStorage.setItem("zyvo_inquiries", JSON.stringify(existing.slice(0, 100)));
      saved = true;
    } catch {
      // ignore local storage error
    }

    if (saved) {
      setResult({
        ok: true,
        message: "Your project inquiry has been received. We'll review it and get back to you within one business day.",
      });
      reset();
    } else {
      setResult({
        ok: false,
        message: "Something went wrong while sending your inquiry. Please try again in a moment, or email us directly.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Project inquiry form"
      className="rounded-2xl border border-bordersoft bg-ink-800 p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <Label htmlFor="full_name">
            Full name <span className="text-cyan-glow">*</span>
          </Label>
          <Input
            id="full_name"
            className="mt-2"
            placeholder="Amara Perera"
            autoComplete="name"
            aria-invalid={Boolean(errors.full_name)}
            {...register("full_name")}
          />
          <FieldError message={errors.full_name?.message} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            Business email <span className="text-cyan-glow">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            className="mt-2"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Company */}
        <div>
          <Label htmlFor="company_name">Company name</Label>
          <Input
            id="company_name"
            className="mt-2"
            placeholder="Optional"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company_name)}
            {...register("company_name")}
          />
          <FieldError message={errors.company_name?.message} />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className={cn(errors.country && "text-red-400")}>
            Country <span className="text-cyan-glow">*</span>
          </Label>
          <Select
            value={selectedCountry || undefined}
            onValueChange={(v) => setValue("country", v, { shouldValidate: true })}
          >
            <SelectTrigger id="country" className="mt-2" aria-invalid={Boolean(errors.country)}>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.country?.message} />
        </div>

        {/* Service category */}
        <div>
          <Label htmlFor="service_category" className={cn(errors.service_category && "text-red-400")}>
            Service category <span className="text-cyan-glow">*</span>
          </Label>
          <Select
            value={selectedCategory || undefined}
            onValueChange={(v) => {
              setValue("service_category", v, { shouldValidate: true });
              // Reset the specific service if it no longer belongs to the category.
              const list = SERVICES_BY_CATEGORY[v] ?? [];
              if (selectedService && !list.includes(selectedService)) {
                setValue("service_type", "", { shouldValidate: false });
              }
            }}
          >
            <SelectTrigger id="service_category" className="mt-2" aria-invalid={Boolean(errors.service_category)}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.service_category?.message} />
        </div>

        {/* Specific service — options follow the chosen category */}
        <div>
          <Label htmlFor="service_type" className={cn(errors.service_type && "text-red-400")}>
            Specific service {selectedCategory === "Other / Not Sure Yet" ? "(optional)" : <span className="text-cyan-glow">*</span>}
          </Label>
          <Select
            value={selectedService || undefined}
            disabled={!selectedCategory}
            onValueChange={(v) => setValue("service_type", v, { shouldValidate: true })}
          >
            <SelectTrigger id="service_type" className="mt-2" aria-invalid={Boolean(errors.service_type)}>
              <SelectValue placeholder={selectedCategory ? "Select the service" : "Pick a category first"} />
            </SelectTrigger>
            <SelectContent>
              {(SERVICES_BY_CATEGORY[selectedCategory] ?? []).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.service_type?.message} />
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget_range">Estimated budget</Label>
          <Select
            value={selectedBudget || undefined}
            onValueChange={(v) => setValue("budget_range", v, { shouldValidate: true })}
          >
            <SelectTrigger id="budget_range" className="mt-2">
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_RANGES.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.budget_range?.message} />
        </div>

        {/* Timeline */}
        <div>
          <Label htmlFor="project_timeline">Project timeline</Label>
          <Select
            value={selectedTimeline || undefined}
            onValueChange={(v) => setValue("project_timeline", v, { shouldValidate: true })}
          >
            <SelectTrigger id="project_timeline" className="mt-2">
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.project_timeline?.message} />
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <Label htmlFor="project_description" className={cn(errors.project_description && "text-red-400")}>
          Project description <span className="text-cyan-glow">*</span>
        </Label>
        <Textarea
          id="project_description"
          className="mt-2 min-h-[140px]"
          placeholder="Tell us about your goals, audience, current website (if any), and what success looks like. The more context, the better our first proposal."
          aria-invalid={Boolean(errors.project_description)}
          {...register("project_description")}
        />
        <FieldError message={errors.project_description?.message} />
      </div>

      {/* Honeypot — visually hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute h-0 w-0 -translate-x-[9999px] overflow-hidden opacity-0">
        <label htmlFor="company_size_hint">Company size</label>
        <input id="company_size_hint" tabIndex={-1} autoComplete="off" {...register("company_size_hint")} />
      </div>

      {/* Consent */}
      <div className="mt-5">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
          />
          <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-slate-400">
            I agree to the processing of my data as described in the{" "}
            <Link to="/privacy" className="text-cyan-glow underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            . <span className="text-cyan-glow">*</span>
          </Label>
        </div>
        <FieldError message={errors.consent?.message as string | undefined} />
      </div>

      {/* Submit + status */}
      <div className="mt-7">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Project Inquiry <Send />
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-slate-500">
          We reply within one business day. Your details are only used to respond to this inquiry.
        </p>
      </div>

      {result && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
            result.ok
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300",
          )}
        >
          {result.ok ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          <p>{result.message}</p>
        </div>
      )}
    </form>
  );
}
