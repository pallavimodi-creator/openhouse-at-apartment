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
import { Download, ChevronLeft, RotateCcw } from "lucide-react";
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
  humanRange,
  CATEGORY_ACCENT,
  PARENT_DESTINATION,
  PARENT_WHY,
} from "@/lib/newsletter-voice";
import { getActivityImage } from "@/lib/content";

/* ─── draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[]; // item ids the teacher ticked
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
      apartment: draft.apartment,
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

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-md bg-ink/5 px-2 py-1.5 text-[11px] font-semibold text-ink-muted hover:bg-ink/10"
          >
            <RotateCcw className="h-3 w-3" /> clear
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]"
          >
            <Download className="h-3.5 w-3.5" /> download as pdf
          </button>
        </div>
      </div>

      {/* Fill the form on the left · newsletter preview on the right.
          Stacks on mobile — form first, then newsletter below.
          Print CSS hides the form so only the newsletter is on the PDF. */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="print:hidden">
          <Editor
            programme={programme}
            draft={draft}
            selectedSet={selectedSet}
            onToggle={toggle}
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
  onToggle,
  onDraftChange,
}: {
  programme: NewsletterProgramme;
  draft: Draft;
  selectedSet: Set<string>;
  onToggle: (id: string) => void;
  onDraftChange: (updater: (d: Draft) => Draft) => void;
}) {
  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 print:hidden md:p-6">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        fill in
      </p>
      <h2 className="mt-1 text-[20px] font-extrabold leading-tight text-ink">
        what did the children do?
      </h2>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
        tick each thing that happened between the dates you picked. the
        newsletter on the right writes itself from your ticks — the
        skills, the prose, all of it. hit <b>download as pdf</b> when
        you&apos;re ready to share.
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

      <p className="mt-5 text-[11.5px] italic text-ink-subtle">
        as you tick, the newsletter on the right updates in real time.
      </p>
    </div>
  );
}

/* ─── parent-view newsletter (image-first, 2 pages) ───────── */
/*
 * two A4 portrait pages, mirroring the openhouse-onepager brand rules.
 *
 * page 1 — what they did:
 *   coral ribbon · header + destination line · value-prop band · hero
 *   "why" line · image grid of every ticked item (image = the thing they
 *   built/made/played, caption = its name + a short parent-voice line).
 *
 * page 2 — what they grew into:
 *   coral ribbon (repeat) · per-skill prose with icon + at-home nudge ·
 *   the road ahead · warm sign-off with coral footer.
 *
 * category accent (yellow / sage / periwinkle) is used only for the
 * title dot, the squiggle and the section stripes — never on body text.
 */

const CATEGORY_HEADING: Record<string, string> = {
  models: "what they built",
  experiments: "what they tested",
  artworks: "what they made",
  games: "what they played",
};

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

  const apartment = draft.apartment.trim() || "openhouse · at-apartment";
  const rangeLabel = humanRange(from, to);
  const totalPicked = perCategory.reduce((s, c) => s + c.items.length, 0);
  const category = programme.categoryLabel;
  const accent = CATEGORY_ACCENT[category] ?? "#B8B5DD";
  const destination = PARENT_DESTINATION[category] ?? "";
  const why = PARENT_WHY[category] ?? "";

  return (
    <div className="parent-doc mx-auto w-full max-w-[794px] space-y-6 md:space-y-8 print:!space-y-0">
      {/* ─── PAGE 1 — what they did ─────────────────── */}
      <article
        className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
        style={{ minHeight: "1123px", overflow: "hidden" }}
      >
        <CoralRibbon />

        {/* header: kicker · title with accent dot + squiggle · destination */}
        <div className="px-10 pt-6">
          <p
            className="text-[11px] font-extrabold tracking-normal"
            style={{ color: "#F25E35" }}
          >
            {programme.title} · {programme.ageLabel}
            {rangeLabel ? ` · ${rangeLabel}` : ""}
          </p>
          <h1 className="mt-2 flex items-baseline gap-2 text-[38px] font-extrabold leading-none">
            <span>a note home from {apartment.toLowerCase()}</span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
          </h1>
          <Squiggle color={accent} />
          {destination && (
            <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              see your child <span className="font-extrabold text-ink">{destination}</span>
            </p>
          )}
        </div>

        {/* value-prop / hero-why band */}
        {why && (
          <div className="mx-10 mt-5 rounded-card px-5 py-4" style={{ background: `${accent}22` }}>
            <p className="text-[17px] font-extrabold leading-snug text-ink">
              this window,{" "}
              <span style={{ color: "#F25E35" }}>{why}</span>
            </p>
          </div>
        )}

        {/* opening — one warm main-idea line */}
        <p className="mx-10 mt-5 text-[13.5px] leading-relaxed text-ink-muted">
          {totalPicked === 0
            ? "your educator will fill this in once the window's classes are done."
            : `here is what your children built, tried and played this window at ${apartment.toLowerCase()} — every moment shown is one that actually happened in class.`}
        </p>

        {/* image grid — one card per ticked item */}
        {perCategory.map((cat) => (
          <section key={cat.id} className="mt-6 px-10">
            <h2
              className="text-[18px] font-extrabold leading-tight text-ink"
              style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 10 }}
            >
              {CATEGORY_HEADING[cat.id] ?? cat.label}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {cat.items.map((item) => {
                const img = getActivityImage(item.id);
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-card bg-[#FAF5EC] ring-1 ring-ink/5"
                  >
                    <div
                      className="relative flex h-28 items-center justify-center"
                      style={{ background: "#F9F2E8" }}
                    >
                      {img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span
                          className="text-[11px] font-bold text-ink-subtle"
                          style={{ color: "#6b6457" }}
                        >
                          {cat.id === "models" ? "🔧" : cat.id === "experiments" ? "🔬" : cat.id === "artworks" ? "🎨" : "🎯"}{" "}
                          {item.label.toLowerCase()}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-[12.5px] font-extrabold leading-tight text-ink">
                        {item.label.toLowerCase()}
                      </p>
                      {item.subtitle && (
                        <p className="mt-0.5 text-[10.5px] leading-snug text-ink-muted">
                          {item.subtitle.toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <PageFooter apartment={apartment} pageIndex={1} />
      </article>

      {/* ─── PAGE 2 — what they grew into ────────────── */}
      <article
        className="page bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0 print:break-before-page"
        style={{ minHeight: "1123px", overflow: "hidden" }}
      >
        <CoralRibbon />

        <div className="px-10 pt-6">
          <p
            className="text-[11px] font-extrabold tracking-normal"
            style={{ color: "#F25E35" }}
          >
            {programme.title} · {programme.ageLabel}
          </p>
          <h1 className="mt-2 flex items-baseline gap-2 text-[34px] font-extrabold leading-none">
            <span>what your children grew into</span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
          </h1>
          <Squiggle color={accent} />
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
            here&apos;s what your children practised this window — not tests, just what they got more sure about. each one includes a small nudge for how to keep it going at home.
          </p>
        </div>

        {skillsBuilt.length === 0 ? (
          <p className="mx-10 mt-6 text-[13px] italic text-ink-muted">
            once your educator ticks off what happened, the skills your children grew into will appear here.
          </p>
        ) : (
          <div className="mx-10 mt-5 space-y-3">
            {skillsBuilt.map((skill) => {
              const copy = parentSkillCopy(skill.id, category);
              return (
                <div
                  key={skill.id}
                  className="rounded-card p-4"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}55` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[18px]"
                      style={{ background: "#fff", boxShadow: `0 1px 0 ${accent}55` }}
                      aria-hidden
                    >
                      {copy.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-extrabold text-ink">
                        {copy.label}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink">
                        {copy.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* the road ahead */}
        <section className="mx-10 mt-6 rounded-card p-4" style={{ background: "#F9F2E8" }}>
          <p
            className="text-[10.5px] font-extrabold tracking-normal"
            style={{ color: "#F25E35" }}
          >
            the road ahead
          </p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-ink">
            your children are on a long, steady journey. the next window brings more building, more asking, more trying. we work one small step at a time — that&apos;s the pace that lasts.
          </p>
        </section>

        {/* warm sign-off */}
        <section className="mx-10 mt-6">
          <p className="text-[13.5px] leading-relaxed text-ink-muted">
            if you want to keep the momentum going at home, ask your child to <span className="font-extrabold text-ink">show you one thing</span> they built or said this month, in their own words. that&apos;s the best possible review.
          </p>
          <p className="mt-4 text-[13.5px] italic text-ink-muted">
            thank you for trusting us with these curious humans.
          </p>
          <p className="mt-2 text-[14px] font-extrabold text-ink">
            — the openhouse team
          </p>
        </section>

        <PageFooter apartment={apartment} pageIndex={2} />
      </article>

      <style jsx>{`
        .page {
          position: relative;
        }
        @media print {
          .parent-doc {
            gap: 0 !important;
          }
          .page {
            page-break-after: always;
            box-shadow: none !important;
            outline: none !important;
          }
          .page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
}

/* small brand primitives — used by both pages */

function CoralRibbon() {
  return (
    <>
      <header
        className="flex items-center justify-between px-10 py-3"
        style={{ background: "#F25E35", color: "#fff" }}
      >
        <p className="text-[13px] font-extrabold">openhouse</p>
        <p className="text-[12.5px] font-semibold italic">
          raising curious humans, together.
        </p>
      </header>
      {/* cream wave under the ribbon, per the onepager brand */}
      <svg
        viewBox="0 0 800 24"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: 18, marginTop: -1 }}
        aria-hidden
      >
        <path
          d="M0,10 C120,24 260,0 400,10 C540,20 660,0 800,10 L800,24 L0,24 Z"
          fill="#F9F2E8"
        />
      </svg>
    </>
  );
}

function Squiggle({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 220 10"
      preserveAspectRatio="none"
      className="mt-1"
      style={{ height: 8, width: 220 }}
      aria-hidden
    >
      <path
        d="M2,6 Q30,-2 60,6 T120,6 T180,6 T216,6"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PageFooter({
  apartment,
  pageIndex,
}: {
  apartment: string;
  pageIndex: number;
}) {
  return (
    <footer className="mt-10 flex items-end justify-between px-10 pb-5 pt-6 text-[10.5px] text-ink-subtle">
      <span className="font-extrabold" style={{ color: "#F25E35" }}>
        openhouse · at-apartment
      </span>
      <span>
        {apartment.toLowerCase()} · page {pageIndex} of 2
      </span>
    </footer>
  );
}
