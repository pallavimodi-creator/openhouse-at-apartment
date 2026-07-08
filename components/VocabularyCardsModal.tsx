"use client";

/**
 * Vocabulary cards deck modal — refactored to the new spec.
 *
 * Layout:
 *  - Filter row (story → difficulty tabs) at the top
 *  - Flippable card in the middle:
 *      · Front: minimal — scene image + word.
 *      · Back : story icon (top-left) + word-type chip (top-right)
 *               + meaning + "in the story" phrase + 3 word-pair chips.
 *  - Deck navigation (prev / dots / next) below the card.
 *  - Four task blocks below the deck (Emote / Enact / Use It / Talk It)
 *    with a short description each — the fixed play modes for ages 3–5.
 *
 * Modal closes on Escape or backdrop click.
 */

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  RotateCw,
  Smile,
  Footprints,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  VOCAB_BOOKS,
  type VocabBook,
  type VocabCard,
  vocabImageUrl,
  vocabImageFallbackUrl,
} from "@/content/programmes/vocab-cards";

const TYPE_LABEL: Record<VocabCard["type"], string> = {
  action: "action word",
  describing: "describing word",
  feeling: "feeling word",
  naming: "naming word",
  position: "position word",
};

const TIER_STYLE: Record<VocabCard["tier"], string> = {
  easy: "bg-[#FFF3B0] text-[#7a5b00]",
  harder: "bg-[#F4B400] text-[#3d2a00]",
};

type Tier = VocabCard["tier"];

const TASKS: {
  id: string;
  label: string;
  body: string;
  Icon: typeof Smile;
  bg: string;
  accent: string;
}[] = [
  {
    id: "emote",
    label: "emote",
    body: "Show the word with your face. What feeling does it have?",
    Icon: Smile,
    bg: "bg-[#FFE9DB]",
    accent: "text-[#B5471F]",
  },
  {
    id: "enact",
    label: "enact",
    body: "Act out the word in a situation. What would you do?",
    Icon: Footprints,
    bg: "bg-[#E4F1E1]",
    accent: "text-[#3D6E36]",
  },
  {
    id: "use-it",
    label: "use it",
    body: "Use the word in your own sentence. (You can use the word pairs for help.)",
    Icon: MessageCircle,
    bg: "bg-[#E5EEF8]",
    accent: "text-[#2F5985]",
  },
  {
    id: "talk-it",
    label: "talk it",
    body: "Talk about the word by asking and answering: What? Why? Where? How?",
    Icon: HelpCircle,
    bg: "bg-[#FAEEF0]",
    accent: "text-[#923957]",
  },
];

export function VocabularyCardsModal({
  isOpen,
  onClose,
  book,
}: {
  isOpen: boolean;
  onClose: () => void;
  book: VocabBook | null;
}) {
  // Which book is currently active in the filter row. Defaults to the
  // book that was opened from the language grid; can be switched.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier>("easy");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Sync active book to the book prop when the modal is opened for a
  // different book from the outside.
  useEffect(() => {
    if (book?.slug) setActiveSlug(book.slug);
    setTier("easy");
    setIndex(0);
    setFlipped(false);
  }, [book?.slug]);

  const activeBook = useMemo<VocabBook | null>(() => {
    if (!activeSlug) return book;
    return VOCAB_BOOKS.find((b) => b.slug === activeSlug) ?? book;
  }, [activeSlug, book]);

  // Deck filtered by the active tier — easy or hard.
  const filteredDeck = useMemo(() => {
    if (!activeBook) return [];
    return activeBook.cards.filter((c) => c.tier === tier);
  }, [activeBook, tier]);

  // Keep index in range whenever the deck changes.
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [filteredDeck.length, activeBook?.slug, tier]);

  // Esc closes; arrow keys navigate
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeBook?.slug, tier, index]);

  if (!isOpen || !activeBook) return null;

  const card = filteredDeck[index];
  const total = filteredDeck.length;

  function next() {
    if (total === 0) return;
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  }
  function prev() {
    if (total === 0) return;
    setFlipped(false);
    setIndex((i) => (i - 1 + total) % total);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-md flex-col bg-brand-cream md:my-6 md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-ink/5 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-normal text-ink/40">
              vocabulary cards
            </p>
            <p className="truncate text-[13px] font-extrabold text-ink">
              {activeBook.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="rounded-full p-1.5 text-ink/60 transition hover:bg-ink/5"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Story filter row — horizontal scroller so all 5 covers fit */}
        <div className="border-b border-ink/5 px-3 py-3">
          <p className="mb-1.5 text-[10px] font-semibold tracking-normal text-ink/50">
            choose a story
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {VOCAB_BOOKS.map((b) => {
              const isActive = b.slug === activeBook.slug;
              return (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => setActiveSlug(b.slug)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-chip border px-2.5 py-1 text-[11px] font-semibold transition",
                    isActive
                      ? "border-brand-orange bg-brand-orange/10 text-ink"
                      : "border-ink/10 bg-brand-white text-ink-muted hover:border-ink/25"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.coverUrl}
                    alt=""
                    className="h-6 w-5 rounded-[2px] object-cover ring-1 ring-ink/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span>{b.title}</span>
                </button>
              );
            })}
          </div>

          {/* Difficulty tabs — easy (light yellow) / hard (dark yellow) */}
          <div className="mt-3 flex gap-2">
            {(["easy", "harder"] as Tier[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-[11px] font-extrabold ring-1 transition",
                  tier === t
                    ? cn(TIER_STYLE[t], "ring-transparent")
                    : "bg-brand-white text-ink-muted ring-ink/10 hover:ring-ink/25"
                )}
              >
                {t === "easy" ? "easy" : "hard"}
              </button>
            ))}
          </div>
        </div>

        {/* Card stage */}
        <div className="flex flex-col items-center justify-center px-5 py-4">
          {card ? (
            <FlipCard
              book={activeBook}
              card={card}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
            />
          ) : (
            <div className="flex h-64 w-full max-w-[340px] items-center justify-center rounded-3xl bg-brand-white text-[12px] text-ink-muted ring-1 ring-ink/10">
              no {tier === "easy" ? "easy" : "hard"} cards for this story yet.
            </div>
          )}

          {card && (
            <p className="mt-3 text-center text-[11px] text-ink/50">
              tap card to {flipped ? "see the word" : "see the meaning"}
            </p>
          )}
        </div>

        {/* Deck navigation */}
        {card && (
          <div className="border-t border-ink/5 bg-brand-white/40 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="previous card"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-white text-ink shadow-sm ring-1 ring-ink/10 transition active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex flex-1 flex-wrap items-center justify-center gap-1">
                {filteredDeck.map((c, i) => (
                  <button
                    type="button"
                    key={c.slug}
                    onClick={() => {
                      setFlipped(false);
                      setIndex(i);
                    }}
                    aria-label={`go to ${c.word}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index
                        ? "w-5 bg-brand-orange"
                        : "w-1.5 bg-ink/15 hover:bg-ink/30"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="next card"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-white text-ink shadow-sm ring-1 ring-ink/10 transition active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-ink/40">
              {index + 1} of {total} · {tier === "easy" ? "easy" : "hard"}
            </p>
          </div>
        )}

        {/* 4 task blocks — the four ways children can play with the word */}
        <div className="border-t border-ink/5 bg-brand-cream/40 px-4 py-4">
          <p className="mb-2 text-[10px] font-semibold tracking-normal text-ink/50">
            ways to play the word
          </p>
          <div className="grid gap-2">
            {TASKS.map((t) => {
              const Icon = t.Icon;
              return (
                <div
                  key={t.id}
                  className={cn(
                    "flex items-start gap-3 rounded-card p-3",
                    t.bg
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-white ring-1 ring-ink/10",
                      t.accent
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-[11px] font-extrabold tracking-normal",
                        t.accent
                      )}
                    >
                      {t.label}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-ink">
                      {t.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Flippable card ───────────────────────────────────────── */

function FlipCard({
  book,
  card,
  flipped,
  onFlip,
}: {
  book: VocabBook;
  card: VocabCard;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onFlip}
      className="group relative aspect-[3/4] w-full max-w-[340px] [perspective:1400px]"
      aria-label={`flip ${card.word} card`}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <CardFront book={book} card={card} />
        <CardBack book={book} card={card} />
      </div>
    </button>
  );
}

/* Front — image + word only. */
function CardFront({ book, card }: { book: VocabBook; card: VocabCard }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-brand-white shadow-xl ring-1 ring-ink/10",
        "[transform:rotateY(0deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      )}
    >
      {/* Scene image */}
      <div className="relative flex-1 overflow-hidden bg-[#FAF5EC]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={vocabImageUrl(book, card)}
          alt={`scene from ${book.title} showing ${card.word}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = vocabImageFallbackUrl(book, card);
            } else {
              img.style.display = "none";
            }
          }}
        />
      </div>

      {/* Word only */}
      <div className="border-t border-ink/5 bg-brand-white px-4 py-4 text-center">
        <p className="text-[30px] font-extrabold leading-none text-ink">
          {card.word}
        </p>
      </div>
    </div>
  );
}

/* Back — story icon + word-type + meaning + in-story + word pairs. */
function CardBack({ book, card }: { book: VocabBook; card: VocabCard }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-brand-white shadow-xl ring-1 ring-ink/10",
        "[transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      )}
    >
      {/* Header — story icon top-left, word-type top-right */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.coverUrl}
          alt=""
          title={book.title}
          className="h-10 w-8 rounded-sm object-cover ring-1 ring-ink/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="rounded-chip bg-brand-orange/10 px-2.5 py-1 text-[10px] font-extrabold tracking-normal text-brand-orange ring-1 ring-brand-orange/20">
          {TYPE_LABEL[card.type]}
        </span>
      </div>

      {/* Word */}
      <div className="mt-3 px-4">
        <p className="text-[22px] font-extrabold leading-none text-ink">
          {card.word}
        </p>
      </div>

      {/* Meaning */}
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto px-4">
        <div>
          <p className="text-[10px] font-semibold tracking-normal text-ink/40">
            meaning
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink">
            {card.meaning}
          </p>
        </div>

        {/* In the story */}
        {card.inStory && (
          <div>
            <p className="text-[10px] font-semibold tracking-normal text-ink/40">
              in the story
            </p>
            <p className="mt-0.5 text-[13px] italic leading-relaxed text-ink">
              &ldquo;{card.inStory}&rdquo;
            </p>
          </div>
        )}

        {/* Word pairs */}
        {card.wordPairs && card.wordPairs.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold tracking-normal text-ink/40">
              word pairs
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {card.wordPairs.slice(0, 3).map((pair) => (
                <span
                  key={pair}
                  className="rounded-chip bg-[#F0E8FA] px-2 py-0.5 text-[11px] font-semibold text-[#5A3D9A]"
                >
                  {pair}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer flip cue */}
      <div className="flex items-center justify-center gap-1.5 border-t border-ink/5 bg-brand-cream/40 px-4 py-2 text-[10px] font-semibold text-ink/50">
        <RotateCw className="h-3 w-3" />
        tap to flip back
      </div>
    </div>
  );
}
