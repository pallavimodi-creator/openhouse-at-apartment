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
        {/* Cover — full image visible (object-contain), padded so the
            book "sits" inside a tinted frame instead of being cropped. */}
        <div className="flex h-[150px] w-[110px] shrink-0 items-center justify-center bg-segment-blue/15 p-2">
          {book.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.heroImageUrl}
              alt={`${book.title} cover`}
              className="max-h-full max-w-full object-contain shadow-md"
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

          {/* Target vocabulary — the words children will encounter
              across the 6-day arc. */}
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
        </div>
      )}
    </div>
  );
}
