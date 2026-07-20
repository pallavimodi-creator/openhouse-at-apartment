"use client";

/**
 * /newsletter — monthly apartment newsletter builder.
 *
 * two views, one route:
 *   editor  — teacher ticks what happened this window + writes highlights
 *   parent  — auto-generated parent-facing newsletter, warm prose,
 *             printable via Cmd+P
 *
 * draft persists in localStorage keyed by (programmeSlug, from, to)
 * so switching programmes / date ranges keeps their work safe.
 *
 * everything on this page is lowercase, per openhouse brand.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Printer, ChevronLeft, RotateCcw, Eye, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher, TeacherGate } from "@/components/TeacherGate";
import {
  NEWSLETTER_PROGRAMME_SLUGS,
  getNewsletterProgramme,
  skillsBuiltFrom,
  type NewsletterProgramme,
} from "@/lib/newsletter-data";
import {
  parentSkillCopy,
  joinParentList,
  humanRange,
} from "@/lib/newsletter-voice";

/* ─── draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[]; // item ids the teacher ticked
  highlights: string; // free text — one or two moments worth naming
  apartment: string; // "openhouse jayanagar"
  from: string; // "YYYY-MM-DD"
  to: string; // "YYYY-MM-DD"
}

function draftKey(slug: string, from: string, to: string) {
  return `newsletter-${slug}-${from}-${to}`;
}

function readDraft(slug: string, from: string, to: string): Draft {
  const base: Draft = {
    selected: [],
    highlights: "",
    apartment: "",
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

/* ─── date helpers ─────────────────────────────────────────── */

function isoToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
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
      (NEWSLETTER_PROGRAMME_SLUGS as readonly string[]).includes(
        teacher.programmeSlug
      )
    ) {
      return teacher.programmeSlug;
    }
    if (teacher?.category) {
      const prefix =
        teacher.category === "art"
          ? "art-design"
          : teacher.category === "language"
            ? "public-speaking"
            : "robotics";
      const match = NEWSLETTER_PROGRAMME_SLUGS.find((s) => s.startsWith(prefix));
      if (match) return match;
    }
    return "robotics-5-8";
  }, [teacher]);

  const [slug, setSlug] = useState<string>(defaultSlug);
  const [from, setFrom] = useState<string>(isoMonthStart());
  const [to, setTo] = useState<string>(isoToday());
  const [view, setView] = useState<"editor" | "parent">("editor");
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
  const skillsBuilt = useMemo(
    () => (programme ? skillsBuiltFrom(programme, selectedSet) : []),
    [programme, selectedSet]
  );

  function toggle(id: string) {
    setDraft((d) => {
      const next = new Set(d.selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...d, selected: Array.from(next) };
    });
  }

  function reset() {
    if (!confirm("clear this newsletter draft?")) return;
    setDraft({
      selected: [],
      highlights: "",
      apartment: draft.apartment,
      from,
      to,
    });
  }

  function printPage() {
    setView("parent");
    setTimeout(() => window.print(), 100);
  }

  if (!programme) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-6 text-center">
        <p className="text-[13px] text-ink-muted">
          the newsletter isn&apos;t set up for <b>{slug}</b> yet.
        </p>
        <Link
          href="/"
          className="mt-3 text-[12px] font-semibold text-brand-orange underline underline-offset-2"
        >
          back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 pb-24 md:px-6">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden">
        <div className="flex flex-wrap items-center gap-3 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-muted hover:text-ink"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> home
          </Link>

          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none"
          >
            {NEWSLETTER_PROGRAMME_SLUGS.map((s) => {
              const p = getNewsletterProgramme(s);
              if (!p) return null;
              return (
                <option key={s} value={s}>
                  {p.title} · {p.ageLabel}
                </option>
              );
            })}
          </select>

          <div className="flex items-center gap-1.5 text-[12px] text-ink-muted">
            <span>from</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none"
            />
            <span>to</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none"
            />
          </div>

          <span className="flex-1" />

          {/* view toggle */}
          <div className="flex overflow-hidden rounded-md border border-ink/15 bg-brand-white text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setView("editor")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 transition",
                view === "editor"
                  ? "bg-brand-orange text-white"
                  : "text-ink-muted hover:bg-ink/5"
              )}
            >
              <Pencil className="h-3 w-3" /> editor
            </button>
            <button
              type="button"
              onClick={() => setView("parent")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 transition",
                view === "parent"
                  ? "bg-brand-orange text-white"
                  : "text-ink-muted hover:bg-ink/5"
              )}
            >
              <Eye className="h-3 w-3" /> parent view
            </button>
          </div>

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-md bg-ink/5 px-2 py-1.5 text-[11px] font-semibold text-ink-muted hover:bg-ink/10"
          >
            <RotateCcw className="h-3 w-3" /> clear
          </button>
          <button
            type="button"
            onClick={printPage}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]"
          >
            <Printer className="h-3.5 w-3.5" /> print / save pdf
          </button>
        </div>
      </div>

      {/* View — editor OR parent-view */}
      {view === "editor" ? (
        <Editor
          programme={programme}
          draft={draft}
          selectedSet={selectedSet}
          skillsBuilt={skillsBuilt.map((s) => s.skill)}
          onToggle={toggle}
          onDraftChange={setDraft}
        />
      ) : (
        <ParentNewsletter
          programme={programme}
          from={from}
          to={to}
          draft={draft}
          skillsBuilt={skillsBuilt.map((s) => s.skill)}
        />
      )}

      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── editor pane ──────────────────────────────────────────── */

function Editor({
  programme,
  draft,
  selectedSet,
  skillsBuilt,
  onToggle,
  onDraftChange,
}: {
  programme: NewsletterProgramme;
  draft: Draft;
  selectedSet: Set<string>;
  skillsBuilt: NewsletterProgramme["skillAreas"];
  onToggle: (id: string) => void;
  onDraftChange: (updater: (d: Draft) => Draft) => void;
}) {
  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 print:hidden md:p-6">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        newsletter · editor
      </p>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight text-ink">
        what did the children do?
      </h2>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
        tick each thing that happened between the dates you picked. the
        parent view below writes itself from your ticks — the skills, the
        prose, all of it. no captions to fill.
      </p>

      {/* apartment */}
      <div className="mt-4">
        <label className="text-[11px] font-bold tracking-normal text-ink-subtle">
          apartment / centre
        </label>
        <input
          type="text"
          value={draft.apartment}
          onChange={(e) =>
            onDraftChange((d) => ({ ...d, apartment: e.target.value }))
          }
          placeholder="e.g. openhouse jayanagar"
          className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange"
        />
      </div>

      {/* categorised checkboxes */}
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
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(item.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "font-semibold text-ink",
                          !checked && "opacity-90"
                        )}
                      >
                        {item.label}
                      </span>
                      {item.subtitle && (
                        <span className="ml-1.5 text-[11.5px] text-ink-muted">
                          — {item.subtitle}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* worth remembering */}
      <div className="mt-5">
        <p className="text-[11.5px] font-bold tracking-normal text-ink-subtle">
          worth remembering (optional)
        </p>
        <textarea
          rows={4}
          value={draft.highlights}
          onChange={(e) =>
            onDraftChange((d) => ({ ...d, highlights: e.target.value }))
          }
          placeholder="one or two moments worth naming — e.g. the children built a working crane on their own for the first time this month."
          className="mt-1 w-full resize-none rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] italic outline-none focus:border-brand-orange"
        />
      </div>

      {/* skills preview — auto */}
      <div className="mt-5 rounded-card bg-brand-orange/5 p-3 ring-1 ring-brand-orange/15">
        <p className="text-[11px] font-bold tracking-normal text-brand-orange">
          skills the newsletter will name · auto-generated
        </p>
        {skillsBuilt.length === 0 ? (
          <p className="mt-1 text-[11.5px] italic text-ink-muted">
            tick things above and the skills will show up here.
          </p>
        ) : (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {skillsBuilt.map((skill) => (
              <span
                key={skill.id}
                className="rounded-chip bg-[#EDE5FA] px-2.5 py-1 text-[11px] font-semibold text-[#4B2E83]"
              >
                {parentSkillCopy(skill.id, programme.categoryLabel).label}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="mt-5 text-[11.5px] italic text-ink-subtle">
        tap <b>parent view</b> in the toolbar to see the newsletter your
        parents will read.
      </p>
    </div>
  );
}

/* ─── parent-view newsletter (the generated output) ───────── */

function ParentNewsletter({
  programme,
  from,
  to,
  draft,
  skillsBuilt,
}: {
  programme: NewsletterProgramme;
  from: string;
  to: string;
  draft: Draft;
  skillsBuilt: NewsletterProgramme["skillAreas"];
}) {
  const selectedSet = new Set(draft.selected);
  const perCategory = programme.categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => selectedSet.has(i.id)),
    }))
    .filter((c) => c.items.length > 0);

  const totalPicked = perCategory.reduce((s, c) => s + c.items.length, 0);
  const apartment = draft.apartment.trim() || "openhouse · at-apartment";
  const rangeLabel = humanRange(from, to);

  // build the opening paragraph as parent prose — main-idea-first,
  // concrete, warm. no comparison, no jargon.
  const opening =
    totalPicked === 0
      ? `this month's ${programme.title} at ${apartment} is still being written — check back once your educator ticks off what the children did.`
      : `this is what your children built, tried and played in ${programme.title} at ${apartment}. every moment named here actually happened in class.`;

  return (
    <article
      className="brochure mx-auto w-full max-w-[794px] bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
      style={{ minHeight: "1123px" }}
    >
      {/* coral header — same tagline & wordmark as the reference brochure */}
      <header
        className="flex items-center justify-between px-8 py-3"
        style={{ background: "#F25E35", color: "#fff" }}
      >
        <p className="text-[13px] font-semibold italic">
          raising curious humans, together.
        </p>
        <p className="text-[13px] font-extrabold">openhouse</p>
      </header>

      {/* title block */}
      <div className="px-8 pt-6">
        <p className="text-[11px] font-bold tracking-normal text-brand-orange">
          a note home · {programme.ageLabel}
          {rangeLabel ? ` · ${rangeLabel}` : ""}
        </p>
        <h1 className="mt-2 text-[36px] font-extrabold leading-none">
          {programme.title.toLowerCase()} at {apartment.toLowerCase()}
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-ink">
          {opening}
        </p>
      </div>

      {/* per-category prose */}
      {perCategory.map((cat) => (
        <section key={cat.id} className="px-8 pt-6">
          <h2 className="text-[19px] font-extrabold text-ink">
            {catToParentHeading(cat.id)}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-ink">
            {catToParentSentence(cat.id, cat.items.map((i) => i.label))}
          </p>
        </section>
      ))}

      {/* worth remembering — warm pull */}
      {draft.highlights.trim() && (
        <section className="px-8 pt-6">
          <h2 className="text-[19px] font-extrabold text-ink">
            a moment worth naming
          </h2>
          <p className="mt-2 rounded-card bg-brand-orange/5 p-4 text-[14px] italic leading-relaxed text-ink ring-1 ring-brand-orange/15">
            &ldquo;{draft.highlights.trim()}&rdquo;
          </p>
        </section>
      )}

      {/* skills — parent voice, not chips */}
      {skillsBuilt.length > 0 && (
        <section className="px-8 pt-6">
          <h2 className="text-[19px] font-extrabold text-ink">
            the skills that grew
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
            here&apos;s what your children practised — not tests, just what
            they got more sure about this window.
          </p>
          <div className="mt-3 space-y-3">
            {skillsBuilt.map((skill) => {
              const copy = parentSkillCopy(skill.id, programme.categoryLabel);
              return (
                <div
                  key={skill.id}
                  className="rounded-card bg-[#F6F0FE] p-4 ring-1 ring-[#EDE5FA]"
                >
                  <p className="text-[13.5px] font-extrabold text-[#4B2E83]">
                    {copy.label}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink">
                    {copy.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* what's next — always renders, warm sign-off */}
      <section className="px-8 pt-8">
        <h2 className="text-[19px] font-extrabold text-ink">
          the road ahead
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink">
          next window brings more of the same — one small step at a time.
          your children are on a long, steady journey, and every session is
          a rung on it. if you want to keep the momentum going at home, ask
          your child to <b>show</b> you one thing they built or said this
          month, in their own words. that&apos;s the best possible review.
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
          thank you for trusting us with these curious humans.
        </p>
        <p className="mt-4 text-[13.5px] font-extrabold text-ink">
          — the openhouse team
        </p>
      </section>

      {/* footer */}
      <footer className="mt-10 flex items-end justify-between px-8 pb-6 pt-6 text-[11px] text-ink-subtle">
        <span>openhouse · at-apartment</span>
        <span>{apartment.toLowerCase()}</span>
      </footer>
    </article>
  );
}

/* ─── parent-prose helpers ─────────────────────────────────── */

function catToParentHeading(id: string): string {
  switch (id) {
    case "models":
      return "what they built";
    case "experiments":
      return "what they tested";
    case "artworks":
      return "what they made";
    case "games":
      return "what they played";
    default:
      return "what they did";
  }
}

function catToParentSentence(id: string, labels: string[]): string {
  const list = joinParentList(labels);
  switch (id) {
    case "models":
      return `your children built ${list}. each one is a real working machine — parts fitted, pieces held together, moving when it should. not a plastic toy — the real thing.`;
    case "experiments":
      return `your children ran ${list}. they predicted first, tested with their own hands, and said what actually happened. this is what science looks like when it's a habit, not a subject.`;
    case "artworks":
      return `your children made ${list}. each artwork is their own choice — the medium, the colour, the subject. we set the technique; they brought the idea.`;
    case "games":
      return `your children played ${list}. the games look playful because they are — and every one is a workout for listening, thinking, speaking, or working with a friend.`;
    default:
      return `your children took part in ${list}.`;
  }
}
