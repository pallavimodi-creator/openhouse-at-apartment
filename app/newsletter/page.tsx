"use client";

/**
 * /newsletter — the monthly apartment newsletter.
 *
 * one flow: the teacher fills in what happened + what's coming next +
 * up to 3 class photos; the parent-facing newsletter writes itself
 * alongside — concept-led, light on text, personal, image-first.
 *
 * lowercase throughout, per openhouse brand. handwritten accents use
 * the Caveat font (font-hand).
 */

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Download, ChevronLeft, RotateCcw, Camera, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import {
  NEWSLETTER_PROGRAMME_SLUGS,
  getNewsletterProgramme,
  skillsBuiltFrom,
  type NewsletterItem,
  type NewsletterProgramme,
} from "@/lib/newsletter-data";
import { humanRange, CATEGORY_ACCENT } from "@/lib/newsletter-voice";
import { getActivityImage } from "@/lib/content";
import {
  BUILD_MECHANISM,
  experimentMechanism,
  MECHANISM_STORY,
  MECHANISM_ORDER,
  PROGRAMME_ENGINEERING_STORY,
  PROGRAMME_SIGNATURE,
  SEGMENT_PHRASING,
  type Mechanism,
} from "@/lib/newsletter-concepts";

/* ─── draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[];
  nextSelected: string[];
  apartment: string;
  teacherName: string;
  photos: string[];
  from: string;
  to: string;
}

function draftKey(slug: string, from: string, to: string) {
  return `newsletter-${slug}-${from}-${to}`;
}
function readDraft(slug: string, from: string, to: string): Draft {
  const base: Draft = {
    selected: [], nextSelected: [], apartment: "", teacherName: "",
    photos: [], from, to,
  };
  if (typeof window === "undefined") return base;
  try {
    const raw = localStorage.getItem(draftKey(slug, from, to));
    if (raw) return { ...base, ...(JSON.parse(raw) as Draft) };
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
  const [draft, setDraft] = useState<Draft>(() => readDraft(slug, from, to));

  useEffect(() => { setDraft(readDraft(slug, from, to)); }, [slug, from, to]);
  useEffect(() => { writeDraft(slug, from, to, draft); }, [slug, from, to, draft]);

  const programme = useMemo(() => getNewsletterProgramme(slug), [slug]);
  const selectedSet = useMemo(() => new Set(draft.selected), [draft.selected]);
  const nextSet = useMemo(() => new Set(draft.nextSelected), [draft.nextSelected]);
  const skillsBuilt = useMemo(
    () => (programme ? skillsBuiltFrom(programme, selectedSet) : []),
    [programme, selectedSet]
  );

  // a done item can't also be a "coming up" item, and vice versa
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
    setDraft({ selected: [], nextSelected: [], apartment: draft.apartment,
      teacherName: draft.teacherName, photos: [], from, to });
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
          <button type="button" onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]">
            <Download className="h-3.5 w-3.5" /> download as pdf
          </button>
        </div>
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
        <ParentNewsletter
          programme={programme}
          from={from}
          to={to}
          draft={draft}
          skillsBuilt={skillsBuilt}
        />
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
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
        tick what the children did. the newsletter writes itself. an item can be in <b>done</b> or <b>coming up</b> — not both.
      </p>

      {/* apartment + teacher */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-bold tracking-normal text-ink-subtle">apartment</label>
          <input type="text" value={draft.apartment}
            onChange={(e) => onDraftChange((d) => ({ ...d, apartment: e.target.value }))}
            placeholder="openhouse jayanagar"
            className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange" />
        </div>
        <div>
          <label className="text-[11px] font-bold tracking-normal text-ink-subtle">your name (optional)</label>
          <input type="text" value={draft.teacherName}
            onChange={(e) => onDraftChange((d) => ({ ...d, teacherName: e.target.value }))}
            placeholder="e.g. arjun"
            className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange" />
        </div>
      </div>

      {/* photos */}
      <div className="mt-5">
        <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">class photos (up to 3)</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {draft.photos.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-brand-cream ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
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
        <p className="mt-0.5 text-[11px] italic text-ink-muted">the next models + experiments you&apos;ll run.</p>
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

/* ─── parent newsletter ────────────────────────────────────── */

const EB_COVER: Record<string, string> = {
  "robotics-5-8": "/newsletter/eb-robotics-5-8.png",
  "robotics-8-12": "/newsletter/eb-robotics-8-12.png",
};

function ParentNewsletter({
  programme, from, to, draft, skillsBuilt,
}: {
  programme: NewsletterProgramme;
  from: string;
  to: string;
  draft: Draft;
  skillsBuilt: { skill: NewsletterProgramme["skillAreas"][number]; through: string[] }[];
}) {
  const selectedSet = new Set(draft.selected);
  const nextSet = new Set(draft.nextSelected);
  const apartment = (draft.apartment.trim() || "openhouse at-apartment").toLowerCase();
  const rangeLabel = humanRange(from, to);
  const category = programme.categoryLabel;
  const accent = CATEGORY_ACCENT[category] ?? "#B8B5DD";
  const engineering = PROGRAMME_ENGINEERING_STORY[programme.slug];
  const signature = PROGRAMME_SIGNATURE[category] ?? "the openhouse team";

  const allItems = programme.categories.flatMap((c) => c.items);
  const pickedItems = allItems.filter((i) => selectedSet.has(i.id));
  const nextItems = allItems.filter((i) => nextSet.has(i.id));

  const isRobotics = programme.slug.startsWith("robotics");
  const isGamesProgramme =
    programme.slug.startsWith("public-speaking") || programme.slug.startsWith("art-design");

  const conceptGroups = isRobotics ? groupByMechanism(pickedItems) : null;
  const segmentGroups = isGamesProgramme ? groupBySegment(pickedItems) : null;

  const photos = draft.photos.slice(0, 3);
  const fallback = pickedItems.map((i) => getActivityImage(i.id)).filter((x): x is string => !!x).slice(0, 3);
  const heroImages = photos.length > 0 ? photos : fallback;
  const ebCover = EB_COVER[programme.slug];

  return (
    <div className="parent-doc mx-auto w-full max-w-[794px] space-y-6 md:space-y-8 print:!space-y-0">
      {/* ─── PAGE 1 ─── */}
      <article className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
        style={{ minHeight: "1123px", overflow: "hidden" }}>
        <CoralRibbon />

        <div className="px-10 pt-5">
          {/* date on top */}
          {rangeLabel && (
            <p className="font-hand text-[20px] leading-none" style={{ color: "#F25E35" }}>
              {rangeLabel}
            </p>
          )}
          <p className="mt-1 text-[11px] font-extrabold tracking-normal text-ink-subtle">
            a note home · {programme.title} · {programme.ageLabel}
          </p>
          <h1 className="mt-2 font-hand text-[40px] font-bold leading-none" style={{ letterSpacing: 0 }}>
            dear parents of {apartment},
          </h1>
          <Squiggle color={accent} />
        </div>

        {/* photo strip — image first */}
        <div className="mt-4 grid grid-cols-3 gap-2 px-10">
          {(heroImages.length > 0 ? heroImages : [null, null, null]).slice(0, 3).map((src, i) => (
            <div key={i} className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card text-[26px] ring-1 ring-ink/10" style={{ background: "#F9F2E8" }}>
              {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt="" className="h-full w-full object-cover" />
              ) : (<span aria-hidden>{["🔧", "🧩", "🔬"][i] ?? "✨"}</span>)}
            </div>
          ))}
        </div>
        <p className="mt-1.5 px-10 font-hand text-[16px]" style={{ color: "#6b6457" }}>
          a peek into our classes this month ✎
        </p>

        {/* WHAT HAPPENED — concept (robotics) or segment (games) grouped, light text */}
        {conceptGroups && conceptGroups.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              what we explored
            </h2>
            <div className="mt-3 space-y-2.5">
              {conceptGroups.map(({ mechanism, builds, experiments }) => {
                const s = MECHANISM_STORY[mechanism];
                const built = builds.map((b) => b.parentLabel);
                return (
                  <div key={mechanism} className="rounded-card p-3.5" style={{ background: `${accent}14`, border: `1px solid ${accent}55` }}>
                    <p className="text-[14.5px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{s.icon}</span>{s.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted">{s.what}</p>
                    {built.length > 0 && (
                      <p className="mt-1.5 text-[12.5px] text-ink">
                        we built <span className="font-bold">{joinNice(built)}</span>
                        {experiments.length > 0 && `, then tested ${experiments.length} ${experiments.length === 1 ? "idea" : "ideas"} to find out why it works.`}
                        {experiments.length === 0 && "."}
                      </p>
                    )}
                    {built.length === 0 && experiments.length > 0 && (
                      <p className="mt-1.5 text-[12.5px] text-ink">
                        we ran <span className="font-bold">{experiments.length}</span> experiments to discover how it works.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {segmentGroups && segmentGroups.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              what we did in class
            </h2>
            <div className="mt-3 space-y-2.5">
              {segmentGroups.map(({ segment, segmentName, items }) => {
                const phrasing = SEGMENT_PHRASING[segment] ?? { icon: "✨", lead: "we did" };
                return (
                  <div key={segment} className="rounded-card p-3.5" style={{ background: `${accent}14`, border: `1px solid ${accent}55` }}>
                    <p className="text-[14.5px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{phrasing.icon}</span>{segmentName.toLowerCase()}
                    </p>
                    <p className="mt-1 text-[12.5px] text-ink">
                      {phrasing.lead} <span className="font-bold">{joinNice(items.map((i) => i.parentLabel))}</span>.
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* fallback for programmes with no grouping */}
        {!conceptGroups && !segmentGroups && pickedItems.length > 0 && (
          <section className="mt-5 px-10">
            <h2 className="text-[19px] font-extrabold text-ink" style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>what we did</h2>
            <p className="mt-2 text-[13px] text-ink">{joinNice(pickedItems.map((i) => i.parentLabel))}.</p>
          </section>
        )}

        <PageFooter apartment={apartment} pageIndex={1} />
      </article>

      {/* ─── PAGE 2 ─── */}
      <article className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0 print:break-before-page"
        style={{ minHeight: "1123px", overflow: "hidden" }}>
        <CoralRibbon />

        {/* skills linked to what was done — light */}
        {skillsBuilt.length > 0 && (
          <section className="px-10 pt-6">
            <h2 className="text-[22px] font-extrabold text-ink">what the children got better at</h2>
            <Squiggle color={accent} />
            <div className="mt-3 space-y-2">
              {skillsBuilt.map(({ skill, through }) => (
                <div key={skill.id} className="flex items-baseline gap-2 rounded-card px-3.5 py-2.5" style={{ background: `${accent}14` }}>
                  <span className="text-[13.5px] font-extrabold text-ink">{skill.name}</span>
                  <span className="text-[12px] text-ink-muted">— through {joinNice(through.slice(0, 3))}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* engineering foundation — ONE short line, not a paragraph */}
        {engineering && (
          <section className="mx-10 mt-6 rounded-card p-4" style={{ background: `${accent}12` }}>
            <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>{engineering.headline}</p>
            <p className="mt-1 text-[14px] font-extrabold leading-snug text-ink">
              {isRobotics
                ? "mechanics — levers, pulleys, gears, wheels — are the simple machines every bigger machine is built from. this is where engineering begins."
                : engineering.body.split(". ")[0] + "."}
            </p>
          </section>
        )}

        {/* coming up */}
        {nextItems.length > 0 && (
          <section className="mt-6 px-10">
            <h3 className="font-hand text-[24px] leading-none text-ink">coming up next ✎</h3>
            <ul className="mt-2 space-y-1">
              {nextItems.map((i) => (
                <li key={i.id} className="flex items-start gap-2 text-[13px] text-ink">
                  <ArrowRight className="mt-1 h-3 w-3 shrink-0" style={{ color: accent }} />
                  <span className="font-semibold">{i.parentLabel}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* experience book — real cover image, image-first */}
        <section className="mt-6 px-10">
          <div className="overflow-hidden rounded-card ring-1 ring-ink/10" style={{ background: `${accent}12` }}>
            <div className="flex items-stretch gap-0">
              {ebCover && (
                <div className="w-[34%] shrink-0 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ebCover} alt="the openhouse experience book" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1 p-4">
                <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>new for your child</p>
                <p className="mt-1 font-hand text-[24px] leading-none text-ink">their very own book!</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink">
                  every child now has a book that travels home and back — where they draw, note, and keep everything they build and discover. flip through it any time to see how they are growing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* sign-off — personal, handwritten */}
        <section className="mt-8 px-10">
          <p className="text-[13px] leading-relaxed text-ink-muted">
            ask the children to show you one thing they built or figured out this month — in their own words. that&apos;s the best review of all.
          </p>
          <p className="mt-4 font-hand text-[26px] leading-none text-ink">
            with warmth,
          </p>
          <p className="mt-1 font-hand text-[24px] leading-none" style={{ color: "#F25E35" }}>
            {draft.teacherName.trim() ? draft.teacherName.trim().toLowerCase() + " · " : ""}{signature}
          </p>
          <p className="mt-1 text-[12px] text-ink-muted">{apartment}</p>
        </section>

        <PageFooter apartment={apartment} pageIndex={2} />
      </article>

      <style jsx>{`
        .page { position: relative; }
        @media print {
          .parent-doc { gap: 0 !important; }
          .page { page-break-after: always; box-shadow: none !important; }
          .page:last-child { page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}

/* ─── helpers ──────────────────────────────────────────────── */

function joinNice(labels: string[]): string {
  const c = labels.map((l) => l.trim()).filter(Boolean);
  if (c.length === 0) return "";
  if (c.length === 1) return c[0];
  if (c.length === 2) return `${c[0]} and ${c[1]}`;
  return `${c.slice(0, -1).join(", ")}, and ${c[c.length - 1]}`;
}

function groupByMechanism(items: NewsletterItem[]) {
  const g = new Map<Mechanism, { builds: NewsletterItem[]; experiments: NewsletterItem[] }>();
  for (const item of items) {
    if (item.category === "models") {
      for (const m of BUILD_MECHANISM[item.id] ?? []) {
        if (!g.has(m)) g.set(m, { builds: [], experiments: [] });
        g.get(m)!.builds.push(item);
      }
    } else if (item.category === "experiments") {
      const m = experimentMechanism(item.id);
      if (!m) continue;
      if (!g.has(m)) g.set(m, { builds: [], experiments: [] });
      g.get(m)!.experiments.push(item);
    }
  }
  return MECHANISM_ORDER.filter((m) => g.has(m)).map((m) => ({ mechanism: m, ...g.get(m)! }));
}

function groupBySegment(items: NewsletterItem[]) {
  // keep the segment order as it appears (roll-call, playground, showtime, sign-off)
  const order = ["roll-call", "art-gym", "playground", "art-games", "showtime", "sign-off"];
  const g = new Map<string, { segmentName: string; items: NewsletterItem[] }>();
  for (const item of items) {
    if (item.category !== "games") continue;
    if (!g.has(item.segment)) g.set(item.segment, { segmentName: item.segmentName, items: [] });
    g.get(item.segment)!.items.push(item);
  }
  return order.filter((s) => g.has(s)).map((s) => ({ segment: s, ...g.get(s)! }));
}

function CoralRibbon() {
  return (
    <>
      <header className="flex items-center justify-between px-10 py-3" style={{ background: "#F25E35", color: "#fff" }}>
        <p className="text-[13px] font-extrabold">openhouse</p>
        <p className="text-[12.5px] font-semibold italic">raising curious humans, together.</p>
      </header>
      <svg viewBox="0 0 800 24" preserveAspectRatio="none" className="block w-full" style={{ height: 18, marginTop: -1 }} aria-hidden>
        <path d="M0,10 C120,24 260,0 400,10 C540,20 660,0 800,10 L800,24 L0,24 Z" fill="#F9F2E8" />
      </svg>
    </>
  );
}
function Squiggle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 10" preserveAspectRatio="none" className="mt-1" style={{ height: 8, width: 220 }} aria-hidden>
      <path d="M2,6 Q30,-2 60,6 T120,6 T180,6 T216,6" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function PageFooter({ apartment, pageIndex }: { apartment: string; pageIndex: number }) {
  return (
    <footer className="mt-10 flex items-end justify-between px-10 pb-5 pt-6 text-[10.5px] text-ink-subtle">
      <span className="font-extrabold" style={{ color: "#F25E35" }}>openhouse · at-apartment</span>
      <span>{apartment} · page {pageIndex} of 2</span>
    </footer>
  );
}
