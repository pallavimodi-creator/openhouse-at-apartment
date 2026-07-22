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

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Send, ChevronLeft, RotateCcw, Camera, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import { getBuilding } from "@/lib/teacher-state";
import {
  NEWSLETTER_PROGRAMME_SLUGS,
  getNewsletterProgramme,
  type NewsletterProgramme,
} from "@/lib/newsletter-data";
import { NewsletterDocument } from "@/components/NewsletterDocument";
import { submitNewsletter } from "@/lib/newsletter-submissions";

/* ─── draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[];
  nextSelected: string[];
  building: string;
  photos: string[];
  from: string;
  to: string;
}

function draftKey(slug: string, from: string, to: string) {
  return `newsletter-${slug}-${from}-${to}`;
}
function readDraft(slug: string, from: string, to: string, buildingDefault: string): Draft {
  const base: Draft = {
    selected: [], nextSelected: [], building: buildingDefault, photos: [], from, to,
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
    setDraft({ selected: [], nextSelected: [], building: draft.building, photos: [], from, to });
  }

  function submit() {
    if (!programme) return;
    if (draft.selected.length === 0) {
      alert("tick at least one thing the children did before submitting.");
      return;
    }
    if (!draft.building.trim()) {
      alert("add your building name before submitting.");
      return;
    }
    submitNewsletter({
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
        from,
        to,
      },
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
            {NEWSLETTER_PROGRAMME_SLUGS.map((s) => {
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
          <button type="button" onClick={submit}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]",
              submitted ? "bg-green-600" : "bg-brand-orange"
            )}>
            {submitted ? (<><Check className="h-3.5 w-3.5" /> sent to openhouse</>) : (<><Send className="h-3.5 w-3.5" /> submit to openhouse</>)}
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
          <Editor
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
        />
      </div>
    </div>
  );
}

/* ─── editor ───────────────────────────────────────────────── */

function Editor({
  programme, draft, selectedSet, nextSet, onToggle, onToggleNext, onDraftChange,
}: {
  programme: NewsletterProgramme;
  draft: Draft;
  selectedSet: Set<string>;
  nextSet: Set<string>;
  onToggle: (id: string) => void;
  onToggleNext: (id: string) => void;
  onDraftChange: (u: (d: Draft) => Draft) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  function pickPhotos(files: FileList | null) {
    if (!files) return;
    const remaining = Math.max(0, 3 - draft.photos.length);
    Array.from(files).slice(0, remaining).forEach((file) => {
      const r = new FileReader();
      r.onload = () => onDraftChange((d) => ({ ...d, photos: [...d.photos, String(r.result)].slice(0, 3) }));
      r.readAsDataURL(file);
    });
  }

  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-6">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">fill in</p>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight text-ink">what happened in the classes?</h2>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
        tick what the children did. the newsletter writes itself. an item can be in <b>done</b> or <b>coming up</b> — not both. when it&apos;s ready, <b>submit to openhouse</b>.
      </p>

      {/* building */}
      <div className="mt-4">
        <label className="text-[11px] font-bold tracking-normal text-ink-subtle">building</label>
        <input type="text" value={draft.building}
          onChange={(e) => onDraftChange((d) => ({ ...d, building: e.target.value }))}
          placeholder="e.g. raheja vihar"
          className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange" />
        <p className="mt-0.5 text-[10.5px] italic text-ink-muted">this is what parents see — &quot;dear parents at {draft.building.trim().toLowerCase() || "your building"}&quot;.</p>
      </div>

      {/* photos */}
      <div className="mt-5">
        <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">photos (up to 3)</p>
        <p className="mt-0.5 text-[11px] font-semibold text-brand-orange">
          photos of models &amp; projects only — please do not add photos of children&apos;s faces.
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {draft.photos.map((src, i) => (
            <div key={i} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-brand-cream ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-contain" />
              <button type="button" onClick={() => onDraftChange((d) => ({ ...d, photos: d.photos.filter((_, j) => j !== i) }))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white" aria-label="remove"><X className="h-3 w-3" /></button>
            </div>
          ))}
          {draft.photos.length < 3 && (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-ink/20 text-[11px] font-semibold text-ink-muted hover:border-brand-orange hover:text-brand-orange">
              <Camera className="mr-1 h-3.5 w-3.5" /> add
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden
          onChange={(e) => { pickPhotos(e.target.files); e.target.value = ""; }} />
      </div>

      {/* what happened */}
      {programme.categories.map((cat) => (
        <div key={cat.id} className="mt-5">
          <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">{cat.label}</p>
          <ul className="mt-1.5 divide-y divide-ink/5 rounded-card bg-ink/[0.03]">
            {cat.items.map((item) => {
              const checked = selectedSet.has(item.id);
              const lockedByNext = nextSet.has(item.id);
              return (
                <li key={item.id}>
                  <label className={cn("flex items-start gap-2.5 px-3 py-2 text-[12.5px] leading-snug",
                    lockedByNext ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-ink/[0.03]")}>
                    <input type="checkbox" checked={checked} disabled={lockedByNext}
                      onChange={() => onToggle(item.id)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
                    <span className="min-w-0 flex-1">
                      <span className={cn("font-semibold text-ink", !checked && "opacity-90")}>{item.label}</span>
                      {item.subtitle && <span className="ml-1.5 text-[11.5px] text-ink-muted">— {item.subtitle}</span>}
                      {lockedByNext && <span className="ml-1 text-[10px] font-bold text-brand-orange">(in coming up)</span>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* coming up */}
      <div className="mt-6 rounded-card bg-brand-orange/5 p-4 ring-1 ring-brand-orange/15">
        <p className="text-[11.5px] font-bold tracking-normal text-brand-orange">coming up next</p>
        <p className="mt-0.5 text-[11px] italic text-ink-muted">the next things you&apos;ll do in the coming classes.</p>
        {programme.categories.map((cat) => (
          <div key={cat.id} className="mt-3">
            <p className="text-[10.5px] font-bold tracking-normal text-ink-subtle">next · {cat.label}</p>
            <ul className="mt-1 divide-y divide-ink/5 rounded-md bg-brand-white ring-1 ring-ink/5">
              {cat.items.map((item) => {
                const checked = nextSet.has(item.id);
                const lockedByDone = selectedSet.has(item.id);
                return (
                  <li key={item.id}>
                    <label className={cn("flex items-start gap-2.5 px-3 py-1.5 text-[12px] leading-snug",
                      lockedByDone ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-ink/[0.03]")}>
                      <input type="checkbox" checked={checked} disabled={lockedByDone}
                        onChange={() => onToggleNext(item.id)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
                      <span className="min-w-0 flex-1 font-semibold text-ink">
                        {item.label}
                        {lockedByDone && <span className="ml-1 text-[10px] font-bold text-brand-orange">(done)</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
