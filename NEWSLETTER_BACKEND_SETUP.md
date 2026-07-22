# Newsletter backend — one-time setup

The educator → admin approval flow works across devices once a small
Supabase backend is configured. Until then it falls back to per-device
localStorage automatically (nothing breaks).

## 1 · Create a Supabase project

1. Go to https://supabase.com → **New project** (free tier is fine; pick a
   region near your users — Mumbai / Singapore for India).
2. When it's ready, open **Settings → API** for the values in step 3.

## 2 · Run the schema

1. Supabase dashboard → **SQL Editor → New query**.
2. Paste all of `supabase/newsletter-schema.sql` (in this repo) and **Run**.
   It creates the `newsletter_submissions` table. Idempotent — safe to re-run.

## 3 · Set env vars

Set these in **Vercel → Project → Settings → Environment Variables** (and in
`.env.local` for local dev):

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase → Settings → API → **Project URL**
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Settings → API → **service_role**
  (⚠ server-only secret — treat like a password)
- `NEWSLETTER_ADMIN_KEY` — any strong secret you choose; the admin types it
  once in `/admin/newsletters` to review submissions

Redeploy after setting them (Vercel needs a rebuild to pick up new env vars).

## 4 · How it works

- **Educator** (`/newsletter`): fills the newsletter, taps **submit to
  openhouse**. The submission is stored in the backend, tagged with their
  building. Educators cannot download.
- **Admin** (`/admin/newsletters`): enters the `NEWSLETTER_ADMIN_KEY` once,
  sees all submissions grouped by building, taps **approve**, then **open +
  download** to save the PDF.

## Notes

- Photos are downscaled to ~1000px JPEG before submitting, so rows stay small.
- No per-user accounts are involved — the existing society/building login is
  untouched. This backend only stores newsletter submissions.
- If the env vars aren't set, the app quietly uses localStorage (single
  device). The admin dashboard shows a banner when it's in that mode.
