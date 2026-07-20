"use client";

/**
 * /newsletter — monthly apartment newsletter builder.
 *
 * Two-pane on desktop, stacked on mobile:
 *   left  — editor: programme picker · month · checkboxes for what
 *           was done this month · "highlights" free text
 *   right — brochure-style preview, printable (Cmd+P → save PDF)
 *
 * Draft is auto-saved in localStorage keyed by
 * `newsletter-<programmeSlug>-<YYYY-MM>` so switching programmes /
 * months doesn't lose work. No database.
 *
 * Skill tagging is auto-derived from each activity's own `skillIds`
 * (see lib/newsletter-data.ts) — never invented.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Printer, ChevronLeft, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacher } from "@/components/TeacherGate";
import { TeacherGate } from "@/components/TeacherGate";
import {
  NEWSLETTER_PROGRAMME_SLUGS,
  getNewsletterProgramme,
  skillsBuiltFrom,
  type NewsletterProgramme,
} from "@/lib/newsletter-data";

/* ─── Draft state ──────────────────────────────────────────── */

interface Draft {
  selected: string[]; // item ids the teacher ticked
  highlights: string; // free-text
  apartment: string; // "openhouse jayanagar" — free text
}

function draftKey(slug: string, month: string) {
  return `newsletter-${slug}-${month}`;
}

function readDraft(slug: string, month: string): Draft {
  if (typeof window === "undefined")
    return { selected: [], highlights: "", apartment: "" };
  try {
    const raw = localStorage.getItem(draftKey(slug, month));
    if (raw) return JSON.parse(raw) as Draft;
  } catch {}
  return { selected: [], highlights: "", apartment: "" };
}

function writeDraft(slug: string, month: string, d: Draft) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(draftKey(slug, month), JSON.stringify(d));
  } catch {}
}

/* ─── Helpers ──────────────────────────────────────────────── */

function currentMonth(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function humanMonth(m: string): string {
  if (!/^\d{4}-\d{2}$/.test(m)) return m;
  const [y, mo] = m.split("-").map(Number);
  const d = new Date(y, mo - 1, 1);
  return d
    .toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    .toLowerCase();
}

const PROGRAMME_MOTIF: Record<string, string> = {
  "robotics-5-8": "🤖",
  "robotics-8-12": "🤖",
  "art-design-5-8": "🎨",
  "art-design-8-12": "🎨",
  "public-speaking-5-8": "🎤",
  "public-speaking-8-12": "🎤",
};

/* ─── Page ─────────────────────────────────────────────────── */

export default function NewsletterPage() {
  return (
    <TeacherGate>
      <NewsletterContent />
    </TeacherGate>
  );
}

function NewsletterContent() {
  const router = useRouter();
  const { teacher } = useTeacher();

  // Pick a default programme from the teacher's session — the first
  // eligible slug that matches their programme / category. Admins land
  // on robotics-5-8 as the pilot default.
  const defaultSlug = useMemo(() => {
    if (teacher?.programmeSlug && teacher.programmeSlug !== "*") {
      if ((NEWSLETTER_PROGRAMME_SLUGS as readonly string[]).includes(teacher.programmeSlug)) {
        return teacher.programmeSlug;
      }
    }
    if (teacher?.category) {
      const match = NEWSLETTER_PROGRAMME_SLUGS.find((s) =>
        s.startsWith(
          teacher.category === "art"
            ? "art-design"
            : teacher.category === "language"
              ? "public-speaking"
              : "robotics"
        )
      );
      if (match) return match;
    }
    return "robotics-5-8";
  }, [teacher]);

  const [slug, setSlug] = useState<string>(defaultSlug);
  const [month, setMonth] = useState<string>(currentMonth());
  const [draft, setDraft] = useState<Draft>(() => readDraft(slug, month));

  // Reload draft whenever programme or month changes.
  useEffect(() => {
    setDraft(readDraft(slug, month));
  }, [slug, month]);

  // Save on every change.
  useEffect(() => {
    writeDraft(slug, month, draft);
  }, [slug, month, draft]);

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
    if (!confirm("clear this month's draft?")) return;
    setDraft({ selected: [], highlights: "", apartment: draft.apartment });
  }

  function printPage() {
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
      {/* Top bar — hidden in print */}
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

          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border border-ink/15 bg-brand-white px-2 py-1.5 text-[12px] font-semibold text-ink focus:border-brand-orange focus:outline-none"
          />

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
            onClick={printPage}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange px-3 py-1.5 text-[12px] font-bold text-white shadow-card active:scale-[0.99]"
          >
            <Printer className="h-3.5 w-3.5" /> print / save pdf
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ─── Editor ─── */}
        <section className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5 print:hidden md:p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
            editor
          </p>
          <h2 className="mt-1 text-[18px] font-extrabold leading-tight text-ink">
            what did the children do this month?
          </h2>
          <p className="mt-1 text-[11.5px] text-ink-muted">
            tick each thing that happened. skills at the bottom are auto-derived from your selections — no need to fill.
          </p>

          {/* Apartment name */}
          <div className="mt-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
              apartment / centre
            </label>
            <input
              type="text"
              value={draft.apartment}
              onChange={(e) =>
                setDraft((d) => ({ ...d, apartment: e.target.value }))
              }
              placeholder="e.g. openhouse jayanagar"
              className="mt-1 w-full rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] outline-none focus:border-brand-orange"
            />
          </div>

          {/* Categorised checkboxes */}
          {programme.categories.map((cat) => (
            <div key={cat.id} className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
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
                          onChange={() => toggle(item.id)}
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

          {/* Highlights */}
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
              worth remembering (optional)
            </p>
            <textarea
              rows={4}
              value={draft.highlights}
              onChange={(e) =>
                setDraft((d) => ({ ...d, highlights: e.target.value }))
              }
              placeholder="one or two lines — e.g. the children built a working crane on their own for the first time."
              className="mt-1 w-full resize-none rounded-md border border-ink/15 bg-brand-cream px-3 py-2 text-[13px] italic outline-none focus:border-brand-orange"
            />
          </div>

          {/* Skills derived preview */}
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
              skills built this month · auto-generated
            </p>
            {skillsBuilt.length === 0 ? (
              <p className="mt-1 text-[11.5px] italic text-ink-muted">
                select things above and the skills will show up here.
              </p>
            ) : (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {skillsBuilt.map(({ skill }) => (
                  <span
                    key={skill.id}
                    className="rounded-chip bg-[#EDE5FA] px-2.5 py-1 text-[11px] font-bold text-[#4B2E83]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── Brochure preview ─── */}
        <section className="print:m-0 print:!shadow-none">
          <BrochurePreview
            programme={programme}
            month={month}
            draft={draft}
            skillsBuilt={skillsBuilt.map((s) => s.skill)}
          />
        </section>
      </div>

      {/* Print-only reset: hide everything except the preview */}
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

/* ─── Brochure preview ─────────────────────────────────────── */

function BrochurePreview({
  programme,
  month,
  draft,
  skillsBuilt,
}: {
  programme: NewsletterProgramme;
  month: string;
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
  const motif = PROGRAMME_MOTIF[programme.slug] ?? "";
  const apartment = draft.apartment.trim() || "openhouse · at-apartment";

  return (
    <article
      className="brochure mx-auto w-full max-w-[794px] bg-brand-white text-ink shadow-card ring-1 ring-ink/5 print:!shadow-none print:!ring-0"
      style={{ minHeight: "1123px" }}
    >
      {/* Coral header */}
      <header
        className="flex items-center justify-between px-8 py-3"
        style={{ background: "#F25E35", color: "#fff" }}
      >
        <p className="text-[13px] font-semibold italic">
          raising curious humans, together.
        </p>
        <p className="text-[13px] font-extrabold">openhouse</p>
      </header>

      {/* Title block */}
      <div className="px-8 pt-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
          at-apartment · {programme.ageLabel} · {humanMonth(month)}
        </p>
        <h1 className="mt-2 flex items-center gap-3 text-[42px] font-extrabold leading-none">
          {programme.title.toLowerCase()}
          {motif && (
            <span aria-hidden className="text-[36px]">
              {motif}
            </span>
          )}
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
          what the children at{" "}
          <span className="font-semibold text-ink">{apartment}</span> built,
          tried and played this month.
        </p>
      </div>

      {/* Empty state */}
      {totalPicked === 0 && (
        <div className="mx-8 mt-6 rounded-card bg-ink/[0.03] p-6 text-center">
          <p className="text-[13px] italic text-ink-muted">
            tick some items on the left to fill in the newsletter.
          </p>
        </div>
      )}

      {/* Per-category cards */}
      {perCategory.map((cat) => (
        <section key={cat.id} className="px-8 pt-6">
          <h2 className="text-[20px] font-extrabold text-ink">{cat.label}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {cat.items.map((item) => (
              <li
                key={item.id}
                className="rounded-card bg-[#FAF5EC] px-3 py-2.5 ring-1 ring-ink/5"
              >
                <p className="text-[13px] font-bold text-ink">{item.label}</p>
                {item.subtitle && (
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">
                    {item.subtitle}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Highlights */}
      {draft.highlights.trim() && (
        <section className="px-8 pt-6">
          <h2 className="text-[20px] font-extrabold text-ink">
            worth remembering
          </h2>
          <p className="mt-2 rounded-card bg-brand-orange/5 p-4 text-[13.5px] italic leading-relaxed text-ink ring-1 ring-brand-orange/15">
            &ldquo;{draft.highlights.trim()}&rdquo;
          </p>
        </section>
      )}

      {/* Skills built — the auto-derived section */}
      {skillsBuilt.length > 0 && (
        <section className="px-8 pt-6">
          <h2 className="text-[20px] font-extrabold text-ink">
            the skills they built{" "}
            <span className="text-[13px] font-medium italic text-ink-muted">
              and kept advancing
            </span>
          </h2>
          <div
            className="mt-3 grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${Math.min(
                skillsBuilt.length,
                3
              )}, minmax(0, 1fr))`,
            }}
          >
            {skillsBuilt.map((s) => (
              <div
                key={s.id}
                className="rounded-card px-4 py-4 text-center"
                style={{ background: "#EDE5FA", color: "#4B2E83" }}
              >
                <p className="text-[14px] font-extrabold">{s.name}</p>
                <p className="mt-1 text-[10.5px] font-semibold opacity-70">
                  level 1 → 2 → 3 → up
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11.5px] italic text-ink-muted">
            three skills children build at every level — and keep deepening as
            they climb.
          </p>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-10 flex items-end justify-between px-8 pb-6 pt-6 text-[11px] text-ink-subtle">
        <span>openhouse · at-apartment</span>
        <span>{programme.slug}</span>
      </footer>
    </article>
  );
}
