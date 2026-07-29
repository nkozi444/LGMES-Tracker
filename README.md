# LGMES Report Tracker

A Next.js + Supabase app that replaces the 2026 LGMES Report Tracer
spreadsheet. It covers **16 report types** across 4 categories — all
sharing one grid UI, since every report is fundamentally the same shape:
an LGU x period grid of (date submitted, status, remarks).

## Report types

| Category | Reports | Period |
|---|---|---|
| Anti-Illegal Drugs | Drug Watch List, BADAC Monitoring, BIDA Accomplishment | Monthly |
| Anti-Illegal Drugs | Community-Based Drug Rehab Program | Quarterly |
| Public Safety & Compliance | BaRCO, ICAD PPAs, DILG MC 2022-025, ASF, RCSP, CUCPD, POGO Certification | Monthly |
| CSO Engagement | CSO Desk Related Reports | Monthly |
| CSO Engagement | CSO Funds Transferred, Accredited & Certified CSOs | Quarterly |
| Labor & Social Welfare | First-Time Jobseekers, Kasambahay | Monthly |

Most reports are monthly (12 columns); a few are quarterly (4 columns) —
`report_types.period_type` controls which, and the grid component reads
that automatically.

## How it's organized

- `supabase/schema.sql` — tables, seeded 25 LGUs, seeded all 16 report types
- `app/reports/[code]/page.js` — one dynamic route serves every report
  (e.g. `/reports/drug_watch_list`, `/reports/cso_funds_transferred`)
- `components/SubmissionsGrid.jsx` — shared grid + KPI cards + edit modal,
  renders 12 month columns or 4 quarter columns based on `period_type`
- `app/page.js` — landing page (post-login), reports grouped by category
- `lib/reportHelpers.js` — the `REPORT_TYPES` catalog (name, category,
  periodType) that drives the landing page and route validation
- `app/login`, `app/signup` — Supabase Auth email/password pages
- `middleware.js` — redirects anyone without a session to `/login`
- `components/SiteHeader.jsx` — the navy/gold masthead shown on every page

## Setup

### 1. Create a Supabase project
[supabase.com](https://supabase.com) → new project → note your Project
URL and anon/publishable key (Project Settings > API).

### 2. Run the schema
Supabase dashboard → SQL Editor → New query → paste `supabase/schema.sql`
→ Run. Safe to re-run (uses `on conflict ... do nothing`).

### 3. Configure environment variables
```
cp .env.local.example .env.local
```
Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(if your project shows a "publishable key" instead of "anon key", use
that value here — same thing, newer name).

### 4. Install and run
```
npm install
npm run dev
```
Visit http://localhost:3000 — you'll be redirected to `/login`.

### 5. Create your admin account
Skip `/signup` if you can — Supabase's free email service has a low
send-rate limit and signup can hit it. Easiest: Supabase dashboard →
Authentication → Users → **Add user** → enter email/password directly
(no email sent). Then go to Authentication → Settings and turn off
"Allow new users to sign up" so `/signup` can't be used by anyone else.

### 6. Deploy (optional)
Push to GitHub, import on [vercel.com](https://vercel.com), add the same
two env vars in the Vercel project settings.

## Notes / next steps
- **Auth gates the app, not the data.** Login controls who can load the
  pages, but the database RLS policies are wide open (anyone with the
  anon key could call the Supabase API directly). Fine for a small
  internal tool with one trusted login; tighten RLS policies before this
  handles anything sensitive or has multiple distinct user roles.
- Status (On time / Late / Not submitted) is entered manually. The
  `deadlines` table is there if you want to later auto-compute status
  from `date_submitted` once deadline rules per report type are confirmed.
- To add another report type later: insert a row into `report_types` in
  `schema.sql` (set `period_type`), then add a matching entry to
  `REPORT_TYPES` in `lib/reportHelpers.js` (with `category` and
  `periodType`) — no other code changes needed.
- The masthead uses an original abstract mark (`components/Mark.jsx`),
  not an official DILG or Philippine government seal — using the real
  seal is a trademark/identity matter to clear separately if wanted.
