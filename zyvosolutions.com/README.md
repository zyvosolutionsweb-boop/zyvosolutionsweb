# Zyvo — Agency Website

> "Your Vision. Our Code."

A production-ready, premium agency website for **Zyvo** — a digital engineering agency serving clients in Sri Lanka and worldwide. Built with **React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion**, backed by **Supabase (PostgreSQL + Edge Functions)**.

## Features

- Fully responsive marketing site: **Home, Services, Work, About, Contact, Privacy, Terms, 404**
- Premium dark brand design (midnight navy, electric blue/cyan, violet gradients) with reduced-motion support
- Animated hero with floating interface visuals, timeline process, FAQ accordion
- Portfolio grid with category filters, loading/error/empty states, clearly-labeled demonstration concepts
- Dynamic content from Supabase (`portfolio_projects`, `services`, `site_settings`) with RLS-protected public reads; falls back to clearly-identified local sample data when Supabase isn't configured
- Full project-inquiry workflow: React Hook Form + Zod validation → **secure Edge Function** (revalidates server-side, rate limits, honeypot spam checks) → Supabase storage → email notifications (business + client confirmation) via Resend
- SEO: per-page titles/descriptions, canonical URLs, Open Graph, JSON-LD structured data, `sitemap.xml` and `robots.txt`
- SPA deployment configs for Vercel (`vercel.json`) and Netlify (`netlify.toml`)

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the two VITE_ Supabase values (see below)
npm run dev                    # → http://localhost:5173
```

The site runs fully without Supabase credentials using local sample data — but **form submissions are disabled** and a notice is shown until you connect the backend.

### Environment variables (frontend)

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL (Project Settings → API) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key — safe for browsers; **never** the service-role key |
| `VITE_SITE_URL` | Production domain, used for canonical/OG URLs. Also copy as `SITE_URL` for deploy tools |

---

## Supabase setup (database)

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL migrations in order **(SQL Editor → paste & run)**:
   1. `supabase/migrations/0001_schema.sql` — tables, constraints, indexes
   2. `supabase/migrations/0002_rls.sql` — RLS policies (least privilege)
   3. `supabase/migrations/0003_seed.sql` — services, demonstration concepts, public site settings
   4. `supabase/migrations/0004_service_category.sql` — adds `service_category` to inquiries and the `category` split (web-development / digital-marketing) to services, backfilled safely without touching existing records
3. Copy your project URL and **publishable key** into `.env.local`.
4. Manage portfolio/services/settings content directly in the Supabase dashboard (Table editor). Public visitors can only read published/public rows — writes require the dashboard or service-role access.

### Security model (RLS)

| Table | Public read | Public write | Notes |
|---|---|---|---|
| `project_inquiries` | ❌ none | ❌ none | Written only by the Edge Function via service-role key |
| `submission_log` | ❌ none | ❌ none | Rate-limit data (hashed IPs/emails) |
| `portfolio_projects` | ✅ `is_published = true` only | ❌ | Admin edits via dashboard |
| `services` | ✅ `is_published = true` only | ❌ | Admin edits via dashboard |
| `site_settings` | ✅ `is_public = true` row only | ❌ | **Never store secrets here** |

---

## Edge Function — `submit-inquiry`

Backend for the contact form. Deploy:

```bash
supabase functions deploy submit-inquiry
```

Set server-side secrets (never in the frontend):

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
supabase secrets set RESEND_FROM_EMAIL="Zyvo <hello@yourdomain.com>"
supabase secrets set NOTIFY_EMAIL=hello@yourdomain.com
supabase secrets set ALLOWED_ORIGINS="https://yourdomain.com,http://localhost:5173"
```

What it enforces:

- **Server-side Zod validation** (mirrors the client schema) with length limits and email format checks
- **Rate limiting** — 8 submissions/hour per IP hash, 3/hour per email hash (`submission_log` table)
- **Spam protection** — required empty honeypot field; silent success for bots
- **Least privilege** — the anon user has *no* direct insert access to `project_inquiries`; the function uses the service-role key server-side only
- **Safe errors** — generic messages, no internal leakage; email sending is best-effort and never blocks a saved inquiry
- **Emails via Resend** — notification to `NOTIFY_EMAIL` + confirmation to the client. The form reports success **only** after the inquiry is stored; a missing email config does not fake success (status is reported back).

## Testing checklist

```bash
npm run typecheck   # strict TypeScript
npm run build       # production build
npm run preview     # verify routes: / /services /work /about /contact /privacy /terms /anything-else(404)
```

Manual checks: mobile nav, category filters (Work), form validation errors, honeypot behavior, duplicate-submit prevention, 404 page, reduced-motion (OS setting), keyboard/focus navigation.

## Deployment

- **Vercel:** import repo → framework auto-detected (Vite). `vercel.json` handles SPA rewrites.
- **Netlify:** import repo → `netlify.toml` provides build command + SPA redirect.
- Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SITE_URL` in the host's environment settings.
- Update `public/sitemap.xml` and `public/robots.txt` with the production domain.
- Add `ALLOWED_ORIGINS` (Edge Function secret) with your production origin.

---

## Implementation checklist — what still needs manual setup

- [ ] Create a Supabase project and run migrations `0001` → `0004`
- [ ] **If the database was created before the rebrand from "Nexora Digital" → "Zyvo"**, update the stored settings row manually (seed files only apply on first run):
  ```sql
  update public.site_settings
  set business_name = 'Zyvo',
      tagline = 'Your Vision. Our Code.',
      contact_email = 'hello@zyvo.example.com'
  where is_public = true;
  ```
- [ ] Set `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` in local env and host
- [ ] Deploy the `submit-inquiry` Edge Function and set its secrets (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFY_EMAIL`, `ALLOWED_ORIGINS`)
- [ ] Verify a domain in Resend (or configure another provider) so emails come from your domain, not `onboarding@resend.dev`
- [ ] Replace `zyvo.example.com` in `public/sitemap.xml`, `public/robots.txt`, and `VITE_SITE_URL` with the real domain
- [ ] Replace demo social URLs in `site_settings` with real profiles
- [ ] Add real client projects to `portfolio_projects` and remove the demonstration concepts when ready
- [ ] Review Privacy Policy + Terms pages with legal counsel for jurisdiction-specific language
# zyvosolutions.com
# zyvosolutions.com
# zyvosolutions.com
