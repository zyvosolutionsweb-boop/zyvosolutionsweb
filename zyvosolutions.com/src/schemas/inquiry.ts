import { z } from "zod";

export const SERVICE_CATEGORIES = [
  "Web Development",
  "Digital Marketing",
  "Both Services",
  "Other / Not Sure Yet",
] as const;

/** Specific services grouped by category — used by the form's dependent select. */
export const SERVICES_BY_CATEGORY: Record<string, readonly string[]> = {
  "Web Development": [
    "Business Website Development",
    "E-commerce Development",
    "Custom Web Application",
    "Landing Page Development",
    "UI/UX Design",
    "Website Maintenance & Optimization",
  ],
  "Digital Marketing": [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Paid Advertising",
    "Content Marketing",
    "Creative & Visual Content",
    "Analytics & Conversion Optimization",
  ],
  "Both Services": [
    "Not sure yet — let's discuss the right mix",
    "Business Website Development",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Paid Advertising",
  ],
  "Other / Not Sure Yet": ["Not sure yet — let's discuss the right mix"],
};

export const SERVICE_TYPES = Array.from(
  new Set(Object.values(SERVICES_BY_CATEGORY).flat()),
);

export const BUDGET_RANGES = [
  "Under LKR 250,000 (≈ USD 750)",
  "LKR 250,000 – 1,000,000 (≈ USD 750 – 3,000)",
  "USD 3,000 – 7,500",
  "USD 7,500 – 15,000",
  "USD 15,000 – 50,000",
  "USD 50,000+",
] as const;

export const TIMELINES = [
  "ASAP / Urgent",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible / Not sure yet",
] as const;

export const inquirySchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(80, "Name must be under 80 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your business email.")
      .max(120, "Email must be under 120 characters.")
      .email("Please enter a valid email address."),
    company_name: z
      .string()
      .trim()
      .max(100, "Company name must be under 100 characters.")
      .optional()
      .or(z.literal("")),
    country: z.string().trim().min(1, "Please select your country.").max(60),
    service_category: z
      .string()
      .trim()
      .min(1, "Please choose a service category.")
      .max(40),
    service_type: z
      .string()
      .trim()
      .max(80)
      .optional()
      .or(z.literal("")),
    budget_range: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),
    project_timeline: z
      .string()
      .trim()
      .max(120)
      .optional()
      .or(z.literal("")),
    project_description: z
      .string()
      .trim()
      .min(30, "Please describe your project in at least 30 characters (30 min).")
      .max(2000, "Description must be under 2,000 characters."),
    consent: z.boolean().refine((v) => v === true, {
      message: "Please accept the privacy policy so we can contact you.",
    }),
    // Honeypot — humans never see or fill this field. Leave empty string.
    company_size_hint: z.string().max(0).optional(),
  })
  .superRefine((values, ctx) => {
    // A specific service is required unless the visitor chose "Other / Not Sure Yet".
    if (
      values.service_category &&
      values.service_category !== "Other / Not Sure Yet"
    ) {
      const specific = values.service_type ?? "";
      const allowed = SERVICES_BY_CATEGORY[values.service_category] ?? [];
      if (!specific || !allowed.includes(specific)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["service_type"],
          message: "Please choose the specific service you're interested in.",
        });
      }
    } else if (values.service_category === "Other / Not Sure Yet") {
      const specific = values.service_type ?? "";
      if (specific && !(SERVICES_BY_CATEGORY["Other / Not Sure Yet"] ?? []).includes(specific)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["service_type"],
          message: "Please pick the listed option or leave this empty.",
        });
      }
    }
  });

export type InquiryPayload = Omit<z.infer<typeof inquirySchema>, "consent"> & {
  consent: true;
  company_size_hint?: string;
};

export type InquiryFormData = z.infer<typeof inquirySchema>;
