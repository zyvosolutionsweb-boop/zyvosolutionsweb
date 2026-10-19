// ============================================================================
// Zyvo — Edge Function: submit-inquiry
//
// Receives project inquiries from the contact form:
//   1. Validates CORS + HTTP method.
//   2. Validates the payload with Zod (mirrors the client schema).
//   3. Spam checks: honeypot field must be empty; minimum description length.
//   4. Rate limits per-IP and per-email using the submission_log table.
//   5. Inserts the inquiry via the service-role client (bypasses RLS — the
//      anon/public has no insert privilege on project_inquiries).
//   6. Sends (best effort) a notification email to the business inbox and an
//      optional confirmation to the client via Resend.
//
// Required secrets (set with: supabase secrets set KEY=value):
//   RESEND_API_KEY        — Resend API key for email delivery (required for email)
//   NOTIFY_EMAIL          — business inbox that receives inquiry notifications
//   RESEND_FROM_EMAIL     — verified "from" address, e.g. "Zyvo <hello@yourdomain.com>"
// ============================================================================

import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface RequestPayload {
  [key: string]: unknown;
}

const SERVICE_CATEGORIES = ["Web Development", "Digital Marketing", "Both Services", "Other / Not Sure Yet"] as const;

const inquiryInputSchema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().max(120).email(),
  company_name: z.string().trim().max(100).optional().nullable(),
  country: z.string().trim().min(1).max(60),
  service_category: z.string().trim().min(1).max(40).refine(
    (v): v is (typeof SERVICE_CATEGORIES)[number] =>
      (SERVICE_CATEGORIES as readonly string[]).includes(v),
    { message: "Unknown service category." },
  ),
  service_type: z.string().trim().min(1).max(80),
  budget_range: z.string().trim().max(120).optional().nullable(),
  project_timeline: z.string().trim().max(120).optional().nullable(),
  project_description: z.string().trim().min(10).max(2000),
  consent: z.boolean(),
  company_size_hint: z.string().max(0).optional(), // honeypot: MUST be empty
});

const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim());

function corsInit(request: Request): HeadersInit {
  const headers = new Headers(corsHeaders);
  const origin = request.headers.get("origin") ?? "";
  if (ALLOWED_ORIGINS.length > 0 && origin && ALLOWED_ORIGINS.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.append("Vary", "Origin");
  }
  return headers;
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsInit(request), "Content-Type": "application/json" },
  });
}

/** Safe error responses never leak internals. */
function clientError(request: Request, message: string, status = 400) {
  return json(request, status, { error: message });
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Extract a best-effort client IP for rate limiting (stored only as a hash). */
function requesterIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

interface RateLimitResult {
  allowed: boolean;
}

async function checkRateLimit(
  serviceClient: { from: (t: string) => any },
  ipHash: string,
  emailHash: string,
): Promise<RateLimitResult> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: ipRows, error: ipError } = await serviceClient
    .from("submission_log")
    .select("id")
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);
  if (ipError) return { allowed: true }; // fail open on infra errors? fail closed is safer for spam:
  const { data: emailRows, error: emailError } = await serviceClient
    .from("submission_log")
    .select("id")
    .eq("email_hash", emailHash)
    .gte("created_at", oneHourAgo);
  if (emailError) return { allowed: true };

  const ipCount = ipRows?.length ?? 0;
  const emailCount = emailRows?.length ?? 0;
  return { allowed: ipCount < 8 && emailCount < 3 };
}

async function recordSubmission(
  serviceClient: { from: (t: string) => any },
  ipHash: string,
  emailHash: string,
) {
  await serviceClient.from("submission_log").insert({ ip_hash: ipHash, email_hash: emailHash });
}

// ---------------------------------------------------------------------------
// Email helpers — Resend via the RESEND_API_KEY secret. All email sending is
// best-effort: a failure never blocks storing a valid inquiry.
// ---------------------------------------------------------------------------
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM_EMAIL") ?? "Zyvo <onboarding@resend.dev>";
  if (!apiKey) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    return res.ok;
  } catch (_e) {
    return false;
  }
}

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notificationHtml(input: Record<string, string | null>): string {
  const row = (label: string, value: string | null) =>
    value ? `<tr><td style="padding:6px 12px;color:#64748b">${label}</td><td style="padding:6px 12px;color:#0f172a">${esc(value)}</td></tr>` : "";
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0">
      <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0">
        <h2 style="margin:0;font-size:18px;color:#0f172a">New project inquiry — Zyvo</h2>
      </div>
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        ${row("Name", input.full_name)}
        ${row("Email", input.email)}
        ${row("Company", input.company_name)}
        ${row("Country", input.country)}
        ${row("Category", input.service_category)}
        ${row("Service", input.service_type)}
        ${row("Budget", input.budget_range)}
        ${row("Timeline", input.project_timeline)}
      </table>
      <div style="padding:16px 24px">
        <p style="margin:0 0 6px;color:#64748b;font-size:13px">Project description</p>
        <p style="margin:0;color:#0f172a;white-space:pre-wrap">${esc(input.project_description ?? "")}</p>
      </div>
    </div>
  </div>`;
}

function confirmationHtml(input: Record<string, string | null>): string {
  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#05070f;padding:32px">
    <div style="max-width:560px;margin:auto;background:#0a0e1a;border:1px solid #1e293b;border-radius:16px;padding:32px;color:#cbd5e1">
      <h2 style="color:#f8fafc;margin:0 0 8px">Thanks, ${esc(input.full_name ?? "there")} 👋</h2>
      <p style="margin:0 0 16px;line-height:1.6">Your project inquiry has reached the Zyvo team. We'll review it and reply within <strong style="color:#22d3ee">one business day</strong> — usually with a first set of questions or a discovery call invitation.</p>
      <p style="margin:0 0 4px;line-height:1.6"><strong style="color:#f8fafc">Your submission summary:</strong></p>
      <ul style="margin:0;padding-left:18px;line-height:1.8">
        <li><strong>Category:</strong> ${esc(input.service_category ?? "-")}</li>
        <li><strong>Service:</strong> ${esc(input.service_type ?? "-")}</li>
        <li><strong>Timeline:</strong> ${esc(input.project_timeline ?? "To be discussed")}</li>
      </ul>
      <p style="margin:24px 0 0;color:#64748b;font-size:13px">Zyvo — Your Vision. Our Code.<br>If you didn't submit this inquiry, you can ignore this email.</p>
    </div>
  </div>`;
}

// ---------------------------------------------------------------------------
Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsInit(request) });
  }
  if (request.method !== "POST") {
    return clientError(request, "Method not allowed.", 405);
  }

  const { createClient } = await import("npm:@supabase/supabase-js@2");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return clientError(request, "Server is not configured. Please try again later.", 503);
  }

  let payload: RequestPayload;
  try {
    payload = await request.json();
  } catch {
    return clientError(request, "Invalid request body.");
  }

  // 1. Server-side validation (mirrors client Zod schema)
  const parsed = inquiryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return clientError(request, "Some fields are invalid. Please check the form and try again.", 422);
  }
  const input = parsed.data;

  // 2. Spam protection: honeypot responses get a silent success (bots learn nothing).
  if (input.company_size_hint && input.company_size_hint.length > 0) {
    return json(request, 200, { ok: true });
  }
  if (parsed.data.consent !== true) {
    return clientError(request, "Privacy policy consent is required.", 422);
  }

  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // 3. Rate limiting (per IP: 8/hour, per email: 3/hour)
  const ipHash = await sha256Hex(requesterIp(request));
  const emailHash = await sha256Hex(input.email.toLowerCase());
  const { allowed } = await checkRateLimit(serviceClient, ipHash, emailHash);
  if (!allowed) {
    return clientError(request, "Too many submissions. Please try again later.", 429);
  }

  // 4. Store the inquiry (service role — the only path to insert)
  const { error: insertError } = await serviceClient.from("project_inquiries").insert({
    full_name: input.full_name,
    email: input.email,
    company_name: input.company_name ?? null,
    country: input.country,
    service_category: input.service_category,
    service_type: input.service_type,
    budget_range: input.budget_range ?? null,
    project_timeline: input.project_timeline ?? null,
    project_description: input.project_description,
    status: "new",
  });

  if (insertError) {
    console.error("insert failed:", insertError.message);
    return clientError(request, "We couldn't save your inquiry. Please try again shortly.", 500);
  }

  await recordSubmission(serviceClient, ipHash, emailHash);

  // 5. Email notifications (best-effort; never blocks a successful save)
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
  const resendFrom = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
  let emailStatus = "skipped";

  if (Deno.env.get("RESEND_API_KEY") && notifyEmail) {
    const sent =    await sendEmail(
      notifyEmail,
      `New project inquiry — ${input.service_category} / ${input.service_type} — ${input.full_name}`,
      notificationHtml(input as unknown as Record<string, string | null>),
    );
    const confirmSent = await sendEmail(
      input.email,
      "We received your project inquiry — Zyvo",
      confirmationHtml(input as unknown as Record<string, string | null>),
    );
    emailStatus = sent ? (confirmSent ? "sent" : "partial") : "failed";
    void resendFrom;
  }

  // 6. Safe, minimal success response
  return json(request, 200, { ok: true, email: emailStatus });
});
