"use client";

/**
 * /newsletter — the monthly apartment newsletter.
 *
 * one page, one flow: the teacher fills in what happened + what's coming
 * next + drops up to 3 class photos, and the parent-facing newsletter
 * writes itself alongside — concept-driven, expert-voice, personalised
 * to the apartment, printable to PDF.
 *
 * everything on this page is lowercase, per openhouse brand.
 */

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
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
import {
  humanRange,
  CATEGORY_ACCENT,
} from "@/lib/newsletter-voice";
import { getActivityImage } from "@/lib/content";
import {
  BUILD_MECHANISM,
  experimentMechanism,
  MECHANISM_STORY,
  MECHANISM_ORDER,
  PROGRAMME_ENGINEERING_STORY,
  PROGRAMME_SIGNATURE,
  type Mechanism,
} from "@/lib/newsletter-concepts";

/* ─── draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[];      // ticked in "what happened"
  nextSelected: string[];  // ticked in "coming up next"
  apartment: string;       // "openhouse jayanagar"
  photos: string[];        // up to 3 data-URL / http URLs
  from: string;            // "YYYY-MM-DD"
  to: string;              // "YYYY-MM-DD"
}

function draftKey(slug: string, from: string, to: string) {
  return `newsletter-${slug}-${from}-${to}`;
}

function readDraft(slug: string, from: string, to: string): Draft {
  const base: Draft = {
    selected: [],
    nextSelected: [],
    apartment: "",
    photos: [],
    from,
    to,
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
  try {
    localStorage.setItem(draftKey(slug, from, to), JSON.stringify(d));
  } catch {}
}

function isoToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isoMonthStart(): string {
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
    if (
      teacher?.programmeSlug &&
      teacher.programmeSlug !== "*" &&
      (NEWSLETTER_PROGRAMME_SLUGS as readonly string[]).includes(teacher.programmeSlug)
    ) return teacher.programmeSlug;
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

  useEffect(() => {
    setDraft(readDraft(slug, from, to));
  }, [slug, from, to]);
  useEffect(() => {
    writeDraft(slug, from, to, draft);
  }, [slug, from, to, draft]);

  const programme = useMemo<NewsletterProgramme | null>(
    () => getNewsletterProgramme(slug),
    [slug]
  );

  const selectedSet = useMemo(() => new Set(draft.selected), [draft.selected]);
  const nextSet = useMemo(() => new Set(draft.nextSelected), [draft.nextSelected]);
  const skillsBuilt = useMemo(
    () => (programme ? skillsBuiltFrom(programme, selectedSet) : []),
    [programme, selectedSet]
  );

  function toggle(id: string) {
    setDraft((d) => {
      const next = new Set(d.selected);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...d, selected: Array.from(next) };
    });
  }
  function toggleNext(id: string) {
    setDraft((d) => {
      const next = new Set(d.nextSelected);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...d, nextSelected: Array.from(next) };
    });
  }
  function reset() {
    if (!confirm("clear this newsletter draft?")) return;
    setDraft({
      selected: [],
      nextSelected: [],
      apartment: draft.apartment,
      photos: [],
      from,
      to,
    });
  }
  function downloadPdf() {
    window.print();
  }

  if (!programme) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 text-center">
        <p className="text-[13px] text-ink-muted">
          the newsletter isn&apos;t set up for <b>{slug}</b> yet.
        </p>
        <Link href="/" className="mt-3 text-[12px] font-semibold text-brand-orange underline underline-offset-2">
          back to home
        </Link>
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
              if (!p) return null;
              return <option key={s} value={s}>{p.title} · {p.ageLabel}</option>;
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
          <button type="button" onClick={downloadPdf}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]">
            <Download className="h-3.5 w-3.5" /> download as pdf
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
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
          skillsBuilt={skillsBuilt.map((s) => s.skill)}
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

/* ─── editor pane ──────────────────────────────────────────── */

function Editor({
  programme, draft, selectedSet, nextSet, onToggle, onToggleNext, onDraftChange,
}: {
  programme: NewsletterProgramme;
  draft: Draft;
  selectedSet: Set<string>;
  nextSet: Set<string>;
  onToggle: (id: string) => void;
  onToggleNext: (id: string) => void;
  onDraftChange: (updater: (d: Draft) => Draft) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function pickPhotos(files: FileList | null) {
    if (!files) return;
    const remaining = Math.max(0, 3 - draft.photos.length);
    const toRead = Array.from(files).slice(0, remaining);
    toRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = String(reader.result);
        onDraftChange((d) => ({ ...d, photos: [...d.photos, url].slice(0, 3) }));
      };
      reader.readAsDataURL(file);
    });
  }
  function removePhoto(i: number) {
    onDraftChange((d) => ({ ...d, photos: d.photos.filter((_, j) => j !== i) }));
  }

  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-6">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">fill in</p>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight text-ink">
        what happened in the classes this month?
      </h2>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
        the newsletter on the right writes itself from your ticks — the concepts, the skills, the closing lines. hit <b>download as pdf</b> when you&apos;re ready to share.
      </p>

      {/* apartment */}
      <div className="mt-4">
        <label className="text-[11px] font-bold tracking-normal text-ink-subtle">apartment / centre</label>
        <input
          type="text"
          value={draft.apartment}
          onChange={(e) => onDraftChange((d) => ({ ...d, apartment: e.target.value }))}
          placeholder="e.g. openhouse jayanagar"
          className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange"
        />
      </div>

      {/* photos */}
      <div className="mt-5">
        <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">
          class photos (optional · up to 3)
        </p>
        <p className="mt-1 text-[11px] italic text-ink-muted">
          drop 3 photos from class. if you skip, the newsletter uses model illustrations instead.
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {draft.photos.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-brand-cream ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button type="button" onClick={() => removePhoto(i)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                aria-label="remove photo">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {draft.photos.length < 3 && (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-ink/20 text-[11px] font-semibold text-ink-muted transition hover:border-brand-orange hover:text-brand-orange">
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
          <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">
            {cat.label}
          </p>
          <ul className="mt-1.5 divide-y divide-ink/5 rounded-card bg-ink/[0.03]">
            {cat.items.map((item) => {
              const checked = selectedSet.has(item.id);
              return (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-2.5 px-3 py-2 text-[12.5px] leading-snug hover:bg-ink/[0.03]">
                    <input type="checkbox" checked={checked} onChange={() => onToggle(item.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
                    <span className="min-w-0 flex-1">
                      <span className={cn("font-semibold text-ink", !checked && "opacity-90")}>
                        {item.label}
                      </span>
                      {item.subtitle && (
                        <span className="ml-1.5 text-[11.5px] text-ink-muted">— {item.subtitle}</span>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* coming up next */}
      <div className="mt-6 rounded-card bg-brand-orange/5 p-4 ring-1 ring-brand-orange/15">
        <p className="text-[11.5px] font-bold tracking-normal text-brand-orange">
          coming up next
        </p>
        <p className="mt-0.5 text-[11.5px] italic text-ink-muted">
          tick the next 3 models + 3 experiments you&apos;ll run in the coming classes. they show up in the &quot;coming up&quot; strip on page 2.
        </p>
        {programme.categories.map((cat) => (
          <div key={cat.id} className="mt-3">
            <p className="text-[10.5px] font-bold tracking-normal text-ink-subtle">
              next · {cat.label}
            </p>
            <ul className="mt-1 divide-y divide-ink/5 rounded-md bg-brand-white ring-1 ring-ink/5">
              {cat.items.map((item) => {
                const checked = nextSet.has(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-start gap-2.5 px-3 py-1.5 text-[12px] leading-snug hover:bg-ink/[0.03]">
                      <input type="checkbox" checked={checked} onChange={() => onToggleNext(item.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
                      <span className="min-w-0 flex-1 font-semibold text-ink">{item.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11.5px] italic text-ink-subtle">
        as you tick, the newsletter on the right updates in real time.
      </p>
    </div>
  );
}

/* ─── parent-view newsletter (concept-driven, 2 pages) ────── */

function ParentNewsletter({
  programme, from, to, draft, skillsBuilt,
}: {
  programme: NewsletterProgramme;
  from: string;
  to: string;
  draft: Draft;
  skillsBuilt: NewsletterProgramme["skillAreas"];
}) {
  const selectedSet = new Set(draft.selected);
  const nextSet = new Set(draft.nextSelected);
  const apartment = draft.apartment.trim();
  const apartmentSalute = apartment || "openhouse at-apartment";
  const rangeLabel = humanRange(from, to);
  const category = programme.categoryLabel;
  const accent = CATEGORY_ACCENT[category] ?? "#B8B5DD";
  const engineering = PROGRAMME_ENGINEERING_STORY[programme.slug];
  const signature = PROGRAMME_SIGNATURE[category] ?? "the openhouse team";

  const allItems: NewsletterItem[] = programme.categories.flatMap((c) => c.items);
  const pickedItems = allItems.filter((i) => selectedSet.has(i.id));
  const nextItems = allItems.filter((i) => nextSet.has(i.id));

  const isRoboticsMechanics =
    programme.slug === "robotics-5-8" || programme.slug === "robotics-8-12";

  // group picked items by mechanism (robotics only) — build+experiments together
  const conceptGroups = isRoboticsMechanics
    ? groupByMechanism(pickedItems)
    : null;

  // if no photos, fall back to model images from the picked items
  const photos = draft.photos.slice(0, 3);
  const fallbackImages = pickedItems
    .map((i) => getActivityImage(i.id))
    .filter((x): x is string => !!x)
    .slice(0, 3);
  const heroImages = photos.length > 0 ? photos : fallbackImages;

  return (
    <div className="parent-doc mx-auto w-full max-w-[794px] space-y-6 md:space-y-8 print:!space-y-0">
      {/* ─── PAGE 1 ─── */}
      <article
        className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
        style={{ minHeight: "1123px", overflow: "hidden" }}
      >
        <CoralRibbon />

        <div className="px-10 pt-6">
          <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>
            a note home · {programme.title} · {programme.ageLabel}
            {rangeLabel ? ` · ${rangeLabel}` : ""}
          </p>
          <h1 className="mt-2 text-[34px] font-extrabold leading-none">
            dear parents of {apartmentSalute.toLowerCase()},
          </h1>
          <Squiggle color={accent} />

          <p className="mt-4 text-[14px] leading-relaxed text-ink">
            here is what happened in the classes this window at{" "}
            <span className="font-extrabold">{apartmentSalute.toLowerCase()}</span>
            {rangeLabel ? ` (${rangeLabel})` : ""}. this note is written the same way we teach — from what the children actually did to what they learnt through it.
          </p>
        </div>

        {/* photo strip */}
        {heroImages.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 px-10">
            {heroImages.map((src, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-card ring-1 ring-ink/10" style={{ background: "#F9F2E8" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        {heroImages.length === 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 px-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-card text-[24px] ring-1 ring-ink/10" style={{ background: "#F9F2E8" }} aria-hidden>
                {["🔧", "🧩", "🔬"][i]}
              </div>
            ))}
          </div>
        )}

        {/* WHAT HAPPENED — concept-driven for robotics; category-driven for others */}
        {isRoboticsMechanics && conceptGroups && conceptGroups.length > 0 ? (
          <section className="mt-6 px-10">
            <h2 className="text-[20px] font-extrabold leading-tight text-ink"
                style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
              what the children learnt · by concept
            </h2>
            <div className="mt-3 space-y-4">
              {conceptGroups.map(({ mechanism, builds, experiments }) => {
                const story = MECHANISM_STORY[mechanism];
                return (
                  <div key={mechanism} className="rounded-card p-4" style={{ background: `${accent}12`, border: `1px solid ${accent}55` }}>
                    <p className="text-[15px] font-extrabold text-ink">
                      <span className="mr-1.5" aria-hidden>{story.icon}</span>
                      {story.label} — {story.what}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink">
                      {story.learnt}
                    </p>
                    {builds.length > 0 && (
                      <p className="mt-2 text-[12px] leading-snug text-ink-muted">
                        <span className="font-extrabold text-ink">built:</span>{" "}
                        {builds.map((b) => b.label).join(", ")}.
                      </p>
                    )}
                    {experiments.length > 0 && (
                      <p className="mt-1 text-[12px] leading-snug text-ink-muted">
                        <span className="font-extrabold text-ink">tested:</span>{" "}
                        {experiments.map((e) => (e.subtitle ?? e.label).replace(/\.$/, "")).join("; ")}.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <NonConceptCategories categories={programme.categories} selectedSet={selectedSet} accent={accent} />
        )}

        <PageFooter apartment={apartmentSalute} pageIndex={1} />
      </article>

      {/* ─── PAGE 2 ─── */}
      <article
        className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0 print:break-before-page"
        style={{ minHeight: "1123px", overflow: "hidden" }}
      >
        <CoralRibbon />

        {/* engineering foundation story */}
        {engineering && (
          <div className="px-10 pt-6">
            <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>
              {engineering.headline}
            </p>
            <h2 className="mt-2 text-[26px] font-extrabold leading-tight">
              {isRoboticsMechanics
                ? "mechanics — the foundation of engineering"
                : "the road we are walking together"}
            </h2>
            <Squiggle color={accent} />
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink">
              {engineering.body}
            </p>
          </div>
        )}

        {/* skills built — brochure-style */}
        {skillsBuilt.length > 0 && (
          <section className="mt-6 px-10">
            <h3 className="text-[16px] font-extrabold text-ink">
              the skills the children built{" "}
              <span className="text-[12.5px] font-medium italic text-ink-muted">and keep advancing</span>
            </h3>
            <div className="mt-3 grid gap-2"
                 style={{ gridTemplateColumns: `repeat(${Math.min(skillsBuilt.length, 3)}, minmax(0, 1fr))` }}>
              {skillsBuilt.map((s) => (
                <div key={s.id} className="rounded-card px-4 py-4 text-center" style={{ background: `${accent}33`, color: "#2C2B28" }}>
                  <p className="text-[14px] font-extrabold">{s.name}</p>
                  <p className="mt-1 text-[10.5px] font-semibold opacity-70">level 1 → 2 → 3 → up</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11.5px] italic text-ink-muted">
              three skills the children build at every level — and keep deepening as they climb.
            </p>
          </section>
        )}

        {/* coming up next */}
        {nextItems.length > 0 && (
          <section className="mt-6 px-10">
            <h3 className="text-[16px] font-extrabold text-ink">
              coming up in the next classes
            </h3>
            <ul className="mt-2 space-y-1.5">
              {nextItems.map((i) => (
                <li key={i.id} className="flex items-start gap-2 text-[13px] leading-snug text-ink">
                  <ArrowRight className="mt-1 h-3 w-3 shrink-0" style={{ color: accent }} />
                  <span>
                    <span className="font-extrabold">{i.label.toLowerCase()}</span>
                    {i.subtitle && (
                      <span className="ml-1 text-ink-muted">— {i.subtitle.toLowerCase()}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* introducing experience books */}
        <section className="mt-6 flex items-start gap-4 px-10">
          <div className="flex h-24 w-16 shrink-0 items-end justify-center overflow-hidden rounded-sm ring-1 ring-ink/15"
               style={{ background: "#B8B5DD" }}>
            <div className="w-full px-1 pb-1 text-center text-[7.5px] font-extrabold text-white">
              openhouse<br/>experience<br/>book
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-extrabold tracking-normal" style={{ color: "#F25E35" }}>
              new · introducing experience books
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink">
              each child now gets an <b>experience book</b> — a physical notebook that travels with them through the programme. every model they build, every experiment they run, every reflection they make lives inside it. the work IS the evidence — you&apos;ll see, session by session, how your child is growing as a young engineer.
            </p>
          </div>
        </section>

        {/* sign-off */}
        <section className="mt-6 px-10">
          <p className="text-[13px] leading-relaxed text-ink-muted">
            if you&apos;d like to keep the momentum going at home, ask the children to <span className="font-extrabold text-ink">show you one thing</span> they built or figured out this month, in their own words. that&apos;s the best possible review.
          </p>
          <p className="mt-3 text-[13px] italic text-ink-muted">
            thank you for trusting us with these curious humans.
          </p>
          <p className="mt-3 text-[13.5px] font-extrabold text-ink">
            — {signature}
          </p>
          <p className="text-[12px] text-ink-muted">at {apartmentSalute.toLowerCase()}</p>
        </section>

        <PageFooter apartment={apartmentSalute} pageIndex={2} />
      </article>

      <style jsx>{`
        .page { position: relative; }
        @media print {
          .parent-doc { gap: 0 !important; }
          .page { page-break-after: always; box-shadow: none !important; outline: none !important; }
          .page:last-child { page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}

/* ─── helpers ──────────────────────────────────────────────── */

function groupByMechanism(items: NewsletterItem[]) {
  const groups = new Map<Mechanism, { builds: NewsletterItem[]; experiments: NewsletterItem[] }>();
  for (const item of items) {
    if (item.category === "models") {
      const mechs = BUILD_MECHANISM[item.id] ?? [];
      for (const m of mechs) {
        if (!groups.has(m)) groups.set(m, { builds: [], experiments: [] });
        groups.get(m)!.builds.push(item);
      }
    } else if (item.category === "experiments") {
      const m = experimentMechanism(item.id);
      if (!m) continue;
      if (!groups.has(m)) groups.set(m, { builds: [], experiments: [] });
      groups.get(m)!.experiments.push(item);
    }
  }
  return MECHANISM_ORDER
    .filter((m) => groups.has(m))
    .map((m) => ({ mechanism: m, ...groups.get(m)! }));
}

function NonConceptCategories({
  categories, selectedSet, accent,
}: {
  categories: NewsletterProgramme["categories"];
  selectedSet: Set<string>;
  accent: string;
}) {
  const filtered = categories
    .map((c) => ({ ...c, items: c.items.filter((i) => selectedSet.has(i.id)) }))
    .filter((c) => c.items.length > 0);
  return (
    <>
      {filtered.map((cat) => (
        <section key={cat.id} className="mt-6 px-10">
          <h2 className="text-[20px] font-extrabold leading-tight text-ink"
              style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}>
            {cat.label}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink">
            {cat.items.map((i) => i.label).join(", ")}.
          </p>
        </section>
      ))}
    </>
  );
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
      <span>{apartment.toLowerCase()} · page {pageIndex} of 2</span>
    </footer>
  );
}
