"use client";

/**
 * /newsletter — the monthly building newsletter (educator side).
 *
 * one flow: the educator ticks what happened + what's coming next +
 * adds up to 3 model/project photos; the parent-facing newsletter
 * writes itself alongside. the educator SUBMITS it to openhouse — they
 * cannot download it. the admin reviews + downloads (see /admin/newsletters).
 *
 * lowercase throughout, per openhouse brand.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Send, ChevronLeft, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import { getBuilding } from "@/lib/teacher-state";
import {
  NEWSLETTER_PROGRAMME_SLUGS,
  getNewsletterProgramme,
} from "@/lib/newsletter-data";
import { NewsletterDocument } from "@/components/NewsletterDocument";
import { NewsletterEditor, type Draft } from "@/components/NewsletterEditor";
import { submitNewsletter } from "@/lib/newsletter-submissions";

/* ─── draft state ──────────────────────────────────────────── */

function draftKey(slug: string, from: string, to: string) {
  return `newsletter-${slug}-${from}-${to}`;
}
function readDraft(slug: string, from: string, to: string, buildingDefault: string): Draft {
  const base: Draft = {
    selected: [], nextSelected: [], building: buildingDefault, photos: [], customArtworks: [], from, to,
  };
  if (typeof window === "undefined") return base;
  try {
    const raw = localStorage.getItem(draftKey(slug, from, to));
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Draft>;
      return { ...base, ...parsed, building: parsed.building || buildingDefault };
    }
  } catch {}
  return base;
}
function writeDraft(slug: string, from: string, to: string, d: Draft) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(draftKey(slug, from, to), JSON.stringify(d)); } catch {}
}
function isoToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isoMonthStart() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

/* ─── page ─────────────────────────────────────────────────── */

export default function NewsletterPage() {
  return (
    <TeacherGate>
      <NewsletterContent />
    </TeacherGate>
  );
}

function NewsletterContent() {
  const { teacher } = useTeacher();

  const defaultSlug = useMemo(() => {
    if (teacher?.programmeSlug && teacher.programmeSlug !== "*" &&
      (NEWSLETTER_PROGRAMME_SLUGS as readonly string[]).includes(teacher.programmeSlug))
      return teacher.programmeSlug;
    if (teacher?.category) {
      const prefix = teacher.category === "art" ? "art-design"
        : teacher.category === "language" ? "public-speaking" : "robotics";
      const match = NEWSLETTER_PROGRAMME_SLUGS.find((s) => s.startsWith(prefix));
      if (match) return match;
    }
    return "robotics-5-8";
  }, [teacher]);

  // Which programmes this educator may write a newsletter for. An admin
  // sees all; a category educator (art / language / stem) sees only their
  // category; a single-programme educator sees only that programme.
  const isAdmin = teacher?.role === "admin" || teacher?.programmeSlug === "*";
  const visibleSlugs = useMemo(() => {
    if (isAdmin) return [...NEWSLETTER_PROGRAMME_SLUGS];
    if (teacher?.category) {
      const prefix = teacher.category === "art" ? "art-design"
        : teacher.category === "language" ? "public-speaking" : "robotics";
      return NEWSLETTER_PROGRAMME_SLUGS.filter((s) => s.startsWith(prefix));
    }
    return NEWSLETTER_PROGRAMME_SLUGS.filter((s) => s === teacher?.programmeSlug);
  }, [teacher, isAdmin]);

  const [slug, setSlug] = useState<string>(defaultSlug);
  const [from, setFrom] = useState<string>(isoMonthStart());
  const [to, setTo] = useState<string>(isoToday());
  const [buildingDefault, setBuildingDefault] = useState("");
  const [draft, setDraft] = useState<Draft>(() => readDraft(slug, from, to, ""));
  const [submitted, setSubmitted] = useState(false);

  // read the building the educator picked at login (client-only)
  useEffect(() => {
    setBuildingDefault(getBuilding() ?? "");
  }, []);

  // If the current slug isn't one this educator may write for (e.g. the
  // teacher loaded after the initial fallback), snap to their first allowed
  // programme — so the preview always matches their category.
  useEffect(() => {
    if (visibleSlugs.length && !(visibleSlugs as readonly string[]).includes(slug)) {
      setSlug(visibleSlugs[0]);
    }
  }, [visibleSlugs, slug]);

  useEffect(() => { setDraft(readDraft(slug, from, to, buildingDefault)); }, [slug, from, to, buildingDefault]);
  useEffect(() => { writeDraft(slug, from, to, draft); }, [slug, from, to, draft]);

  const programme = useMemo(() => getNewsletterProgramme(slug), [slug]);
  const selectedSet = useMemo(() => new Set(draft.selected), [draft.selected]);
  const nextSet = useMemo(() => new Set(draft.nextSelected), [draft.nextSelected]);

  function toggle(id: string) {
    setDraft((d) => {
      const next = new Set(d.selected);
      const nextUp = new Set(d.nextSelected);
      if (next.has(id)) next.delete(id);
      else { next.add(id); nextUp.delete(id); }
      return { ...d, selected: Array.from(next), nextSelected: Array.from(nextUp) };
    });
  }
  function toggleNext(id: string) {
    setDraft((d) => {
      const nextUp = new Set(d.nextSelected);
      const next = new Set(d.selected);
      if (nextUp.has(id)) nextUp.delete(id);
      else { nextUp.add(id); next.delete(id); }
      return { ...d, nextSelected: Array.from(nextUp), selected: Array.from(next) };
    });
  }
  function reset() {
    if (!confirm("clear this newsletter draft?")) return;
    setDraft({ selected: [], nextSelected: [], building: draft.building, photos: [], customArtworks: [], from, to });
  }

  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!programme || submitting) return;
    if (draft.selected.length === 0) {
      alert("tick at least one thing the children did before submitting.");
      return;
    }
    if (!draft.building.trim()) {
      alert("add your building name before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      await submitNewsletter({
        building: draft.building.trim(),
        programmeSlug: programme.slug,
        programmeTitle: programme.title,
        ageLabel: programme.ageLabel,
        from,
        to,
        draft: {
          selected: draft.selected,
          nextSelected: draft.nextSelected,
          photos: draft.photos,
          building: draft.building.trim(),
          customArtworks: draft.customArtworks,
          from,
          to,
        },
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      alert("could not submit — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!programme) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 text-center">
        <p className="text-[13px] text-ink-muted">the newsletter isn&apos;t set up for <b>{slug}</b> yet.</p>
        <Link href="/" className="mt-3 text-[12px] font-semibold text-brand-orange underline underline-offset-2">back to home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 pb-24 md:px-6">
      <div className="print:hidden">
        <div className="flex flex-wrap items-center gap-3 py-3">
          <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted hover:text-ink">
            <ChevronLeft className="h-3.5 w-3.5" /> home
          </Link>
          <select value={slug} onChange={(e) => setSlug(e.target.value)}
            className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none">
            {visibleSlugs.map((s) => {
              const p = getNewsletterProgramme(s);
              return p ? <option key={s} value={s}>{p.title} · {p.ageLabel}</option> : null;
            })}
          </select>
          <div className="flex items-center gap-1.5 text-[12px] text-ink-muted">
            <span>from</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
              className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none" />
            <span>to</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
              className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none" />
          </div>
          <span className="flex-1" />
          <button type="button" onClick={reset}
            className="inline-flex items-center gap-1 rounded-md bg-ink/5 px-2 py-1.5 text-[11px] font-semibold text-ink-muted hover:bg-ink/10">
            <RotateCcw className="h-3 w-3" /> clear
          </button>
          <button type="button" onClick={submit} disabled={submitting}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99] disabled:opacity-60",
              submitted ? "bg-green-600" : "bg-brand-orange"
            )}>
            {submitted ? (<><Check className="h-3.5 w-3.5" /> sent to openhouse</>)
              : submitting ? "sending…"
              : (<><Send className="h-3.5 w-3.5" /> submit to openhouse</>)}
          </button>
        </div>
        {submitted && (
          <p className="mb-2 rounded-md bg-green-50 px-3 py-2 text-[12px] text-green-800 ring-1 ring-green-200/60">
            sent for approval. once openhouse reviews it, it can be shared with parents — you&apos;ll be notified. you can keep editing and re-submit any time.
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="print:hidden">
          <NewsletterEditor
            programme={programme}
            draft={draft}
            selectedSet={selectedSet}
            nextSet={nextSet}
            onToggle={toggle}
            onToggleNext={toggleNext}
            onDraftChange={setDraft}
          />
        </div>
        <NewsletterDocument
          programmeSlug={programme.slug}
          building={draft.building}
          from={from}
          to={to}
          selected={draft.selected}
          nextSelected={draft.nextSelected}
          photos={draft.photos}
          customArtworks={draft.customArtworks}
        />
      </div>
    </div>
  );
}

