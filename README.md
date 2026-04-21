# openhouse · teacher tool

A mobile-first, daily-use tool for teachers and trainers running Openhouse sessions. Not a marketing site — a runnable playbook.

Prototype v1 ships with the full **Art & Design Level 1** programme (50 sessions, ~30 resources) seeded from the approved content document.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

The app is fully static — no database, no auth, no backend.

---

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with Openhouse brand tokens in `tailwind.config.ts`
- **shadcn/ui** primitives (added only as needed)
- **lucide-react** for icons

---

## Project structure

```
app/                     Pages (App Router)
  page.tsx               Home / Dashboard
  programmes/[id]/       Programme overview
    sessions/            Sessions list + detail
    resources/           Resource library + detail (hero screen)
components/              Reusable UI
content/
  types.ts               Canonical data types
  programmes/            One programme per folder
    art-design-l1.ts           Programme record
    art-design-l1.skills.ts    Skills (L&T, S&F, C&P, I&E)
    art-design-l1.resources.ts All ~30 resources, verbatim from doc
    art-design-l1.sessions.ts  All 50 sessions
  generated/
    assets.json          Written by sync:assets — committed
lib/
  content.ts             Loaders + filters
  utils.ts               cn() helper
scripts/
  sync-drive-assets.ts   Local asset sync (see below)
public/
  assets/                Synced asset files (gitignored except .gitkeep)
```

---

## Adding or editing a resource

Open `content/programmes/art-design-l1.resources.ts` and add a new `Resource` object to the array. Type checks catch everything. Fields that are `undefined` or empty arrays will simply not render sections on the detail page — no empty state pollution.

Rules of the content:
- **No invented resources.** Source everything from the approved content doc.
- Use lowercase titles (the brand requires it).
- Skill tags are canonical: `L&T` · `S&F` · `C&P` · `I&E` · `Responsibility`.

---

## Digital assets

Each `Resource` owns its own `DigitalAsset[]` — assets are never browsed standalone. The brand rule is "every resource = one complete unit, physical + digital."

### v1 local workflow

1. Create a folder at `assets-source/art-design-l1/resources/{resource-id}/`
2. Drop files into it. Supported types: PDF, PNG/JPG/WEBP/SVG, MP3/WAV/M4A, MP4/MOV, PPTX.
3. Run `npm run sync:assets`.
4. The script copies files into `public/assets/...` and writes metadata to `content/generated/assets.json`.
5. Resources automatically pick up their assets on the next build.

Folder name must match `Resource.id` exactly (kebab-case).

### Drive pipeline (TODO)

The script's walk function can be swapped for a Google Drive API call using a service account. Output format stays identical, so nothing else changes. When you're ready to connect Drive, share the folder with a service account and we'll wire it up.

### Claude artifacts

Never reference claude.ai URLs directly. Export artifacts as PNG/SVG, drop them into the `assets-source` folder, and run sync. That way they're versioned, downloadable, and stable.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run sync:assets` | Walk `/assets-source`, copy to `/public/assets`, write `content/generated/assets.json` |

---

## Design principles

- **Mobile-first.** Design at 375px, scale up. Max content width is 480px — the desktop view is just a centred column.
- **5-second rule.** A teacher glancing at a phone on a classroom floor should understand how to run the resource in 5 seconds.
- **One thing per screen.** One primary action. One hero piece of content. Everything else is below the fold.
- **Brand discipline.** Lowercase titles always. Avenir Next Rounded (with rounded sans fallbacks). Cream background, charcoal text, orange for primary actions.

---

## Roadmap (post-v1)

- Drive API integration for asset sync
- Second programme (Language L1) seeded — tests the multi-programme shell
- Teacher profile / favourites
- Offline-capable PWA for classroom wifi gaps
- Plan authoring (if needed — v1 is read-only)
