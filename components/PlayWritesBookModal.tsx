"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ImageFlipbook, type FlipbookPage } from "@/components/ImageFlipbook";

/**
 * Play-writes workbook — full-screen popup that flips through every
 * page of the printed Play-writes Level 1 or Level 2 workbook used in
 * the language storytelling 3-5 programme. Image-only flipbook (no
 * captions side-panel — the workbook pages already carry their own
 * tracing prompts).
 */
const LEVEL_1_PAGE_COUNT = 27;
const LEVEL_2_PAGE_COUNT = 27;

function buildPages(level: 1 | 2): FlipbookPage[] {
  const dir = level === 1 ? "play-writes-1" : "play-writes-2";
  const count = level === 1 ? LEVEL_1_PAGE_COUNT : LEVEL_2_PAGE_COUNT;
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      kind: "image" as const,
      src: `/${dir}/page-${n}.png`,
      alt: `play-writes level ${level} page ${i + 1}`,
    };
  });
}

export function PlayWritesBookModal({
  level,
  isOpen,
  onClose,
}: {
  level: 1 | 2 | null;
  isOpen: boolean;
  onClose: () => void;
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

  if (!isOpen || level === null) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-segment-yellow/40 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
            teacher reference · level {level}
          </p>
          <h2 className="truncate text-[18px] font-extrabold leading-tight text-ink md:text-[22px]">
            play-writes — a play-based writing workbook
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink-muted transition hover:bg-ink/20"
          aria-label="close play-writes workbook"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              No letters yet — only marks. Each chapter pairs with one of the eight books. Read the book together first, then come back to the workbook page and use the tool the page asks for (or a different one, if the child prefers).
            </p>
            <ImageFlipbook
              pages={buildPages(level)}
              altPrefix={`play-writes level ${level}`}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
