"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LanguageBook } from "@/content/types";

const ACTIVITY_LABEL: Record<LanguageBook["groupActivityType"], string> = {
  "story-re-enactment": "story re-enactment",
  "change-story-endings": "change story endings",
  "vocabulary-reproduction": "vocabulary reproduction",
  "puppet-character": "puppet character",
};

/**
 * 8-book grid for the language programme. Each card shows the cover,
 * order number, title, author, and an age/lexile chip. Tap a card to
 * expand the "why this position" rationale + group activity type.
 */
export function LanguageBooksGrid({ books }: { books: LanguageBook[] }) {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {books.map((book) => (
        <BookCard
          key={book.order}
          book={book}
          isOpen={openOrder === book.order}
          onToggle={() =>
            setOpenOrder(openOrder === book.order ? null : book.order)
          }
        />
      ))}
    </div>
  );
}

function BookCard({
  book,
  isOpen,
  onToggle,
}: {
  book: LanguageBook;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-stretch text-left transition active:scale-[0.99]"
      >
        {/* Cover */}
        <div className="flex h-[120px] w-[90px] shrink-0 items-center justify-center bg-segment-blue/20">
          {book.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.heroImageUrl}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-[10px] font-bold text-ink/40">cover</span>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          <div className="flex items-start gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
              {book.order}
            </span>
            <p className="flex-1 text-[13.5px] font-extrabold leading-tight text-ink">
              {book.title.toLowerCase()}
            </p>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-ink/50 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
          <p className="text-[11px] font-semibold text-ink-muted">
            {book.author}
          </p>
          <p className="text-[10px] leading-snug text-ink-subtle">
            {book.ageRange}
          </p>
          <div className="mt-auto flex flex-wrap gap-1">
            {book.themes.map((t) => (
              <span
                key={t}
                className="rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Expandable detail */}
      {isOpen && (
        <div className="space-y-3 border-t border-ink/5 bg-segment-yellow/15 p-4">
          <p className="text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
            {book.summary}
          </p>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-brand-orange">
              Why this position
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {book.whyThisPosition}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-subtle">
              Group activity
            </span>
            <span className="rounded-chip bg-brand-white px-2 py-0.5 text-[11px] font-bold text-ink ring-1 ring-ink/10">
              {ACTIVITY_LABEL[book.groupActivityType]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
