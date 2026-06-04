"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { BookPlan, BookDayPlan, BookDay3Plan } from "@/content/programmes/language-book-plans";
import type { LanguageBook } from "@/content/types";

/**
 * Full-screen lesson plan popup for a language book.
 *
 * Layout: header with the book title + author, then a column listing
 * Block A (days 1-3), an interval marker, and Block B (Version 2.0,
 * days 1-3). Each day card shows when, learning objective, vocabulary,
 * and the numbered teacher steps.
 */
export function LanguageBookPlanModal({
  isOpen,
  onClose,
  book,
  plan,
}: {
  isOpen: boolean;
  onClose: () => void;
  book: LanguageBook | null;
  plan: BookPlan | null;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book || !plan) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-segment-blue/30 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
            book {plan.order} · lesson plan
          </p>
          <h2 className="truncate text-[18px] font-extrabold leading-tight text-ink md:text-[22px]">
            {plan.title}
          </h2>
          <p className="truncate text-[11px] font-medium text-ink-muted md:text-[12px]">
            {plan.author}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink-muted transition hover:bg-ink/20"
          aria-label="close lesson plan"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl space-y-4 px-3 py-5 md:px-6 md:py-8">
          {/* Optional cover */}
          {book.heroImageUrl && (
            <div className="flex justify-center">
              <div className="rounded-xl bg-segment-blue/15 p-3 ring-1 ring-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.heroImageUrl}
                  alt=""
                  className="max-h-32 max-w-[110px] object-contain"
                />
              </div>
            </div>
          )}

          {/* Block A — first read */}
          <BlockHeader
            label="block 1 · days 1–3 · book introduced"
            tone="block-a"
          />
          <DayCard day={1} dayPlan={plan.blockA.day1} />
          <DayCard day={2} dayPlan={plan.blockA.day2} />
          <Day3Card day={3} dayPlan={plan.blockA.day3} />

          {/* Interval */}
          <div className="rounded-2xl border-2 border-dashed border-ink/15 bg-brand-cream p-4 text-center">
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              interval
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
              Two other books come in between. The gap before the book returns is what turns memorising into understanding.
            </p>
          </div>

          {/* Block B — Version 2.0 */}
          <BlockHeader
            label="block 2 · days 4–6 · version 2.0 (advanced)"
            tone="block-b"
          />
          <DayCard day={1} dayPlan={plan.blockB.day1} prefix="v2 · " />
          <DayCard day={2} dayPlan={plan.blockB.day2} prefix="v2 · " />
          <Day3Card day={3} dayPlan={plan.blockB.day3} prefix="v2 · " />
        </div>
      </div>
    </div>,
    document.body
  );
}

function BlockHeader({
  label,
  tone,
}: {
  label: string;
  tone: "block-a" | "block-b";
}) {
  const bg = tone === "block-a" ? "bg-segment-blue/30" : "bg-segment-yellow/40";
  return (
    <div className={`rounded-xl px-4 py-2 ${bg}`}>
      <p className="text-[11.5px] font-extrabold lowercase text-ink">{label}</p>
    </div>
  );
}

function DayCard({
  day,
  dayPlan,
  prefix = "",
}: {
  day: number;
  dayPlan: BookDayPlan;
  prefix?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
      <header className="flex items-center gap-2 border-b border-ink/5 px-4 py-2.5 md:px-5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
          {day}
        </span>
        <p className="text-[12.5px] font-extrabold lowercase text-ink">
          {prefix}day {day}
        </p>
        {dayPlan.when && (
          <span className="ml-auto truncate text-[10.5px] font-semibold text-ink-muted">
            {dayPlan.when.toLowerCase()}
          </span>
        )}
      </header>
      <div className="space-y-3 px-4 py-3 md:px-5 md:py-4">
        {dayPlan.learningObjective && (
          <div>
            <p className="text-[10px] font-bold tracking-normal text-brand-orange">
              learning objective
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
              {dayPlan.learningObjective}
            </p>
          </div>
        )}
        {dayPlan.vocabulary && (
          <div>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              vocabulary
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {dayPlan.vocabulary.split(/,\s*/).map((w) => (
                <span
                  key={w}
                  className="rounded-chip bg-brand-cream px-2 py-0.5 text-[11px] font-semibold text-ink"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
            teacher steps
          </p>
          <ol className="mt-1.5 space-y-2">
            {dayPlan.steps.map((s, i) => (
              <li
                key={`${day}-${i}`}
                className="flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/8 text-[10px] font-extrabold text-ink">
                  {i + 1}
                </span>
                <span className="flex-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function Day3Card({
  day,
  dayPlan,
  prefix = "",
}: {
  day: number;
  dayPlan: BookDay3Plan;
  prefix?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
      <header className="flex items-center gap-2 border-b border-ink/5 px-4 py-2.5 md:px-5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
          {day}
        </span>
        <p className="text-[12.5px] font-extrabold lowercase text-ink">
          {prefix}day {day} · narration + activity
        </p>
      </header>
      <div className="space-y-3 px-4 py-3 md:px-5 md:py-4">
        <div>
          <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
            what to do
          </p>
          <ol className="mt-1.5 space-y-2">
            {dayPlan.steps.map((s, i) => (
              <li
                key={`d3-${i}`}
                className="flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/8 text-[10px] font-extrabold text-ink">
                  {i + 1}
                </span>
                <span className="flex-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        {dayPlan.vocabulary && (
          <div>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              vocabulary
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {dayPlan.vocabulary.split(/,\s*|\sand\s/).map((w) => (
                <span
                  key={w}
                  className="rounded-chip bg-brand-cream px-2 py-0.5 text-[11px] font-semibold text-ink"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="rounded-xl bg-segment-yellow/25 p-3">
          <p className="text-[10px] font-bold tracking-normal text-brand-orange">
            activity for the day
          </p>
          <p className="mt-1 text-[12.5px] font-bold text-ink md:text-[13px]">
            {dayPlan.activity.name}
          </p>
          <p className="mt-0.5 text-[11px] font-semibold text-ink-muted">
            {dayPlan.activity.level} level
          </p>
        </div>
      </div>
    </article>
  );
}
