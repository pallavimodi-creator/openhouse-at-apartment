"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Image flipbook — renders an ordered list of image URLs as a horizontal
 * carousel with prev/next arrows, dot indicators, swipe support, and a
 * subtle page-turn shadow. Designed for pre-rendered book pages.
 *
 * Pure CSS + React — no external dependencies (react-pageflip kept giving
 * SSR / hydration trouble). Reliable, fast, works on every device.
 */
interface ImageFlipbookProps {
  /** Page image URLs in reading order. Page 1 = first item. */
  pages: string[];
  /** Alt-text prefix for screen readers, e.g. "artistotle book". */
  altPrefix?: string;
}

export function ImageFlipbook({
  pages,
  altPrefix = "page",
}: ImageFlipbookProps) {
  const [index, setIndex] = useState(0);
  const [aspect, setAspect] = useState(1.414); // h / w; A4-ish default
  const trackRef = useRef<HTMLDivElement>(null);

  // Read first image's natural aspect to size the frame.
  useEffect(() => {
    if (!pages.length) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0) {
        setAspect(img.naturalHeight / img.naturalWidth);
      }
    };
    img.src = pages[0];
  }, [pages]);

  // Keyboard nav (←/→).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  // Touch / drag swipe.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX: number | null = null;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      if (startX == null) return;
      const endX = e.changedTouches[0]?.clientX ?? startX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) setIndex((i) => Math.min(i + 1, pages.length - 1));
        else setIndex((i) => Math.max(i - 1, 0));
      }
      startX = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [pages.length]);

  if (!pages.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-card bg-ink/[0.02] text-[12px] text-ink-muted">
        no pages to display
      </div>
    );
  }

  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setIndex((i) => Math.min(i + 1, pages.length - 1));
  const atStart = index === 0;
  const atEnd = index === pages.length - 1;

  return (
    <div className="w-full">
      {/* Stage */}
      <div className="relative mx-auto" style={{ maxWidth: 720 }}>
        <div
          ref={trackRef}
          className="relative w-full select-none overflow-hidden rounded-card bg-white shadow-card ring-1 ring-ink/5"
          style={{ paddingBottom: `${aspect * 100}%` }}
        >
          {pages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              className={cn(
                "absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-out",
                i === index
                  ? "opacity-100 scale-100"
                  : i < index
                    ? "-translate-x-2 opacity-0 scale-[0.98]"
                    : "translate-x-2 opacity-0 scale-[0.98]"
              )}
              draggable={false}
              loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
            />
          ))}

          {/* Soft gutter shadow down the middle for a book feel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent"
          />

          {/* Edge tap zones */}
          <button
            aria-label="previous page"
            onClick={goPrev}
            disabled={atStart}
            className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize bg-transparent disabled:cursor-default"
          />
          <button
            aria-label="next page"
            onClick={goNext}
            disabled={atEnd}
            className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize bg-transparent disabled:cursor-default"
          />
        </div>

        {/* Side arrows (visible on tablet/desktop) */}
        <button
          aria-label="previous page"
          onClick={goPrev}
          disabled={atStart}
          className={cn(
            "absolute -left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-card ring-1 ring-ink/10 transition md:flex",
            atStart ? "opacity-30" : "hover:scale-105"
          )}
        >
          <ChevronLeft className="h-5 w-5 text-ink" />
        </button>
        <button
          aria-label="next page"
          onClick={goNext}
          disabled={atEnd}
          className={cn(
            "absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-card ring-1 ring-ink/10 transition md:flex",
            atEnd ? "opacity-30" : "hover:scale-105"
          )}
        >
          <ChevronRight className="h-5 w-5 text-ink" />
        </button>
      </div>

      {/* Controls + counter */}
      <div className="mt-4 flex items-center justify-center gap-3 text-[12px]">
        <button
          onClick={goPrev}
          disabled={atStart}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted hover:bg-ink/10 disabled:opacity-40"
        >
          ← prev
        </button>
        <span className="font-semibold text-ink-muted">
          page {index + 1} / {pages.length}
        </span>
        <button
          onClick={goNext}
          disabled={atEnd}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted hover:bg-ink/10 disabled:opacity-40"
        >
          next →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {pages.map((_, i) => (
          <button
            key={i}
            aria-label={`go to page ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-brand-orange" : "w-1.5 bg-ink/20 hover:bg-ink/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
