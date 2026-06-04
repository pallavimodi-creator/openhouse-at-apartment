"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LanguageBook } from "@/content/types";
import { LanguageBookPlanModal } from "@/components/LanguageBookPlanModal";
import { getBookPlan } from "@/content/programmes/language-book-plans";

const ACTIVITY_LABEL: Record<LanguageBook["groupActivityType"], string> = {
  "story-re-enactment": "story re-enactment",
  "change-story-endings": "change story endings",
  "vocabulary-reproduction": "vocabulary reproduction",
  "puppet-character": "puppet character",
};

const VOCAB_TYPE_LABEL: Record<LanguageBook["vocabularyType"], string> = {
  "emotion-tiles": "emotion tiles",
  "story-calendar": "story calendar",
};

/**
 * 8-book grid for the language programme. Each card shows the cover,
 * order number, title, author, and an age/lexile chip. Tap a card to
 * expand the "why this position" rationale + group activity type.
 */
export function LanguageBooksGrid({ books }: { books: LanguageBook[] }) {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  const [planBook, setPlanBook] = useState<LanguageBook | null>(null);
  const planBookPlan = planBook ? getBookPlan(planBook.order) ?? null : null;
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
        <ul className="divide-y divide-ink/5">
          {books.map((book) => (
            <li key={book.order}>
              <BookRow
                book={book}
                isOpen={openOrder === book.order}
                onToggle={() =>
                  setOpenOrder(openOrder === book.order ? null : book.order)
                }
                onOpenPlan={() => setPlanBook(book)}
              />
            </li>
          ))}
        </ul>
      </div>
      <LanguageBookPlanModal
        isOpen={planBook !== null}
        onClose={() => setPlanBook(null)}
        book={planBook}
        plan={planBookPlan}
      />
    </>
  );
}

function BookRow({
  book,
  isOpen,
  onToggle,
  onOpenPlan,
}: {
  book: LanguageBook;
  isOpen: boolean;
  onToggle: () => void;
  onOpenPlan: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center gap-3 px-3 py-2.5 text-left transition",
          isOpen ? "bg-segment-yellow/15" : "hover:bg-ink/[0.03]"
        )}
      >
        {/* Compact cover thumb */}
        <div className="flex h-[52px] w-[40px] shrink-0 items-center justify-center rounded bg-segment-blue/15 p-1">
          {book.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.heroImageUrl}
              alt=""
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : null}
        </div>

        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-extrabold text-brand-orange">
          {book.order}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-extrabold leading-tight text-ink">
            {book.title.toLowerCase()}
          </p>
          <p className="mt-0.5 truncate text-[11px] font-medium text-ink-muted">
            {book.author}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-ink/50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="space-y-3 bg-segment-yellow/15 px-4 pb-4 pt-1">
          <p className="text-[10px] leading-snug text-ink-subtle">
            {book.ageRange}
          </p>
          <p className="text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
            {book.summary}
          </p>

          {/* Themes — chips, only shown when expanded to keep collapsed
              row tight. */}
          <div className="flex flex-wrap gap-1">
            {book.themes.map((t) => (
              <span
                key={t}
                className="rounded-chip bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
              Target vocabulary
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {book.vocabulary.map((word) => (
                <span
                  key={word}
                  className="rounded-chip bg-brand-white px-2 py-0.5 text-[11px] font-semibold text-ink ring-1 ring-ink/10"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
              Why this position
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {book.whyThisPosition}
            </p>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
              <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
                Wordsmiths resource
              </p>
              <p className="mt-1 text-[11.5px] font-bold text-ink">
                {VOCAB_TYPE_LABEL[book.vocabularyType]}
              </p>
            </div>
            <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
              <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
                Group activity
              </p>
              <p className="mt-1 text-[11.5px] font-bold text-ink">
                {ACTIVITY_LABEL[book.groupActivityType]}
              </p>
            </div>
          </div>

          {/* View full lesson plan — opens the Day 1/2/3 + Version 2.0
              popup with all teacher steps. */}
          <button
            type="button"
            onClick={onOpenPlan}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-card bg-brand-orange py-2.5 text-[12px] font-bold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
          >
            <BookOpen className="h-3.5 w-3.5" />
            view full lesson plan
          </button>
        </div>
      )}
    </div>
  );
}
