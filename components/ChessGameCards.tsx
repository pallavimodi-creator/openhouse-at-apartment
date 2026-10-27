"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChessGameCards } from "@/lib/content";

/**
 * Renders a printed chess game set as it looks in the kit:
 *  · the playing board (the "mat")
 *  · a double-sided challenge card the child taps to flip
 *    (front = the game cover · back = a challenge position)
 *
 * Shown at the top of the ActivityPopup for chessiverse games that
 * have a board + cards set (see CHESS_GAME_CARDS in lib/content.ts).
 */
export function ChessGameCards({
  cards,
  title,
}: {
  cards: ChessGameCards;
  title: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-[1.15fr_1fr]">
      {/* The board / mat */}
      <div>
        <p className="mb-1.5 text-[10px] font-semibold tracking-normal text-ink-muted">
          the board
        </p>
        <div className="overflow-hidden rounded-card bg-ink/[0.02] ring-1 ring-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cards.board}
            alt={`${title} board`}
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* The flippable card */}
      <div>
        <p className="mb-1.5 text-[10px] font-semibold tracking-normal text-ink-muted">
          the card — tap to flip
        </p>
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="group relative aspect-[619/875] w-full [perspective:1400px]"
          aria-label={`flip the ${title} card`}
        >
          <div
            className={cn(
              "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
              flipped && "[transform:rotateY(180deg)]"
            )}
          >
            {/* Front */}
            <div
              className={cn(
                "absolute inset-0 overflow-hidden rounded-card bg-brand-white shadow-xl ring-1 ring-ink/10",
                "[transform:rotateY(0deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cards.front}
                alt={`${title} card front`}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Back */}
            <div
              className={cn(
                "absolute inset-0 overflow-hidden rounded-card bg-brand-white shadow-xl ring-1 ring-ink/10",
                "[transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cards.back}
                alt={`${title} card back`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </button>
        <p className="mt-2 text-center text-[11px] font-medium text-ink-subtle">
          tap the card to {flipped ? "see the cover" : "see a challenge"}
        </p>
      </div>
    </div>
  );
}
