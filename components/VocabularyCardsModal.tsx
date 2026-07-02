"use client";

/**
 * Flippable vocabulary cards modal.
 *
 * Inspired by Mrs Wordsmith — large playful scene image as the hero, the
 * word as title, tier badge (light yellow = easy, dark yellow = harder).
 * Tap the card to flip; the back surfaces the 5 ways a 3–5 year old can
 * "play" the word: emote, enact, sentence, word-pairs, what·why·how.
 *
 * One deck per book. Left/right arrows step through the deck; the dot
 * row shows progress. Modal closes on Escape or backdrop click.
 */

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  RotateCw,
  Smile,
  Footprints,
  MessageCircle,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type VocabBook,
  type VocabCard,
  type VocabMode,
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

const MODES: {
  id: VocabMode;
  label: string;
  Icon: typeof Smile;
  bg: string;
  accent: string;
}[] = [
  {
    id: "emote",
    label: "emote",
    Icon: Smile,
    bg: "bg-[#FFE9DB]",
    accent: "text-[#B5471F]",
  },
  {
    id: "enact",
    label: "enact",
    Icon: Footprints,
    bg: "bg-[#E4F1E1]",
    accent: "text-[#3D6E36]",
  },
  {
    id: "sentence",
    label: "use in a sentence",
    Icon: MessageCircle,
    bg: "bg-[#E5EEF8]",
    accent: "text-[#2F5985]",
  },
  {
    id: "word-pairs",
    label: "word pairs",
    Icon: Sparkles,
    bg: "bg-[#F0E8FA]",
    accent: "text-[#5A3D9A]",
  },
  {
    id: "what-why-how",
    label: "what · why · how",
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
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Reset deck position whenever a new book opens
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [book?.slug]);

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
  }, [isOpen, book?.slug, index]);

  if (!isOpen || !book) return null;

  const card = book.cards[index];
  const total = book.cards.length;

  function next() {
    if (!book) return;
    setFlipped(false);
    setIndex((i) => (i + 1) % book.cards.length);
  }
  function prev() {
    if (!book) return;
    setFlipped(false);
    setIndex((i) => (i - 1 + book.cards.length) % book.cards.length);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-brand-cream md:h-[92vh] md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-ink/5 px-4 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.coverUrl}
            alt=""
            className="h-10 w-8 rounded-sm object-cover ring-1 ring-ink/10"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-normaltext-ink/40">
              vocabulary cards
            </p>
            <p className="truncate text-[13px] font-extrabold text-ink">
              {book.title}
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

        {/* Card stage */}
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-4">
          <FlipCard
            book={book}
            card={card}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />

          {/* Hint */}
          <p className="mt-3 text-center text-[11px] text-ink/50">
            tap card to {flipped ? "see the word" : "play with the word"}
          </p>
        </div>

        {/* Footer: deck navigation */}
        <footer className="border-t border-ink/5 bg-brand-white/40 px-4 py-3">
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
              {book.cards.map((c, i) => (
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
            {index + 1} of {total} · {card.tier === "easy" ? "easy" : "harder"}
          </p>
        </footer>
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

function CardFront({ book, card }: { book: VocabBook; card: VocabCard }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-brand-white shadow-xl ring-1 ring-ink/10",
        "[transform:rotateY(0deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      )}
    >
      {/* Tier ribbon */}
      <div
        className={cn(
          "absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-normal",
          TIER_STYLE[card.tier]
        )}
      >
        {card.tier}
      </div>

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

      {/* Bottom info strip */}
      <div className="border-t border-ink/5 bg-brand-white px-4 py-3">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[26px] font-extrabold leading-none text-ink">
              {card.word}
            </p>
            <p className="mt-1 text-[10px] font-semibold tracking-normaltext-brand-orange">
              {TYPE_LABEL[card.type]}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.coverUrl}
            alt=""
            className="h-9 w-7 shrink-0 rounded-sm object-cover ring-1 ring-ink/10"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
          {card.meaning}
        </p>
        {(card.synonym || card.antonym) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {card.synonym && (
              <span className="rounded-chip bg-[#E4F1E1] px-2 py-0.5 text-[10px] font-semibold text-[#3D6E36]">
                like · {card.synonym}
              </span>
            )}
            {card.antonym && (
              <span className="rounded-chip bg-[#FAEEF0] px-2 py-0.5 text-[10px] font-semibold text-[#923957]">
                opposite · {card.antonym}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CardBack({ book, card }: { book: VocabBook; card: VocabCard }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-brand-white shadow-xl ring-1 ring-ink/10",
        "[transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-ink/5 bg-brand-cream/60 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-normaltext-ink/40">
            play with
          </p>
          <p className="truncate text-[18px] font-extrabold leading-tight text-ink">
            {card.word}
          </p>
        </div>
        <div
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-normal",
            TIER_STYLE[card.tier]
          )}
        >
          {card.tier}
        </div>
      </div>

      {/* Mode prompts — only those that have a hand-written prompt for
          this word; generic templates are deliberately not shown. */}
      <ul className="flex flex-1 flex-col divide-y divide-ink/5 overflow-y-auto">
        {MODES.filter((m) => card.prompts?.[m.id]).map((m) => {
          const Icon = m.Icon;
          const prompt = card.prompts![m.id]!;
          return (
            <li
              key={m.id}
              className={cn(
                "flex items-start gap-3 px-4 py-3 transition",
                m.bg
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-white ring-1 ring-ink/10",
                  m.accent
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "flex items-center gap-1.5 text-[10px] font-extrabold tracking-normal",
                    m.accent
                  )}
                >
                  {m.label}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink">
                  {prompt}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer flip cue */}
      <div className="flex items-center justify-center gap-1.5 border-t border-ink/5 bg-brand-cream/40 px-4 py-2 text-[10px] font-semibold text-ink/50">
        <RotateCw className="h-3 w-3" />
        tap to flip back
      </div>
    </div>
  );
}
