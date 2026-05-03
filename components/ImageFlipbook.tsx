"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Load HTMLFlipBook only on the client — the package touches the DOM at
// module load and crashes during SSR if imported eagerly.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

/**
 * Image flipbook — renders an ordered list of image URLs as a real
 * page-flipping book. Two-page spread with curl animation on desktop,
 * single-page portrait on phones.
 *
 * Reads the first image's natural aspect to size the book. Cover-style
 * chrome around the spread: rounded corners, soft inner shadow, cream
 * page background that matches the brand, centre gutter shadow.
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
  const [aspect, setAspect] = useState(1.414); // h / w; A4-ish default
  const [currentPage, setCurrentPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const flipRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount + container width tracking.
  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // First image's aspect ratio sets the book proportions.
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

  if (!pages.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-card bg-ink/[0.02] text-[12px] text-ink-muted">
        no pages to display
      </div>
    );
  }

  // Spread on wide viewports, portrait on phones. Width math leaves room for
  // the floating prev/next buttons that hang off the corners.
  const isSpread = containerWidth > 900;
  const maxBookWidth = isSpread ? 1000 : 540;
  const pageWidth = isSpread
    ? Math.min((containerWidth - 80) / 2, 480)
    : Math.min(containerWidth - 48, maxBookWidth);
  const pageHeight = pageWidth * aspect;

  const goPrev = () => flipRef.current?.pageFlip()?.flipPrev();
  const goNext = () => flipRef.current?.pageFlip()?.flipNext();
  const atStart = currentPage === 0;
  const atEnd = currentPage >= pages.length - 1;

  return (
    <div ref={containerRef} className="w-full">
      {/* Mounting placeholder so layout doesn't jump while the dynamic
          chunk loads. */}
      {!mounted ? (
        <div
          className="mx-auto flex w-full items-center justify-center rounded-2xl bg-brand-cream"
          style={{ height: 360 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
            <p className="text-[11px] text-ink-muted">loading flipbook…</p>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto" style={{ width: "fit-content" }}>
          {/* Book frame */}
          <div className="rounded-2xl bg-brand-cream p-3 ring-1 ring-ink/5 shadow-[0_8px_30px_rgba(44,43,40,0.12)] md:p-5">
            {/* @ts-expect-error react-pageflip's prop types are loose */}
            <HTMLFlipBook
              ref={flipRef}
              width={pageWidth}
              height={pageHeight}
              size="fixed"
              minWidth={240}
              maxWidth={520}
              minHeight={340}
              maxHeight={1500}
              showCover={true}
              mobileScrollSupport={true}
              usePortrait={!isSpread}
              maxShadowOpacity={0.32}
              drawShadow={true}
              flippingTime={600}
              className="bg-brand-cream"
              onFlip={(e: any) => setCurrentPage(e.data)}
            >
              {pages.map((src, i) => (
                <FlipPage key={src} src={src} alt={`${altPrefix} ${i + 1}`} />
              ))}
            </HTMLFlipBook>
          </div>

          {/* Floating prev / next buttons hanging off the book corners */}
          <button
            type="button"
            aria-label="previous page"
            onClick={goPrev}
            disabled={atStart}
            className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full bg-brand-white p-2 shadow-card ring-1 ring-ink/10 transition disabled:opacity-30 hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5 text-ink" />
          </button>
          <button
            type="button"
            aria-label="next page"
            onClick={goNext}
            disabled={atEnd}
            className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full bg-brand-white p-2 shadow-card ring-1 ring-ink/10 transition disabled:opacity-30 hover:scale-105"
          >
            <ChevronRight className="h-5 w-5 text-ink" />
          </button>
        </div>
      )}

      {/* Page counter + mobile prev/next */}
      <div className="mt-4 flex items-center justify-center gap-3 text-[12px]">
        <button
          type="button"
          onClick={goPrev}
          disabled={atStart}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted transition hover:bg-ink/10 disabled:opacity-40 md:hidden"
        >
          ← prev
        </button>
        <span className="font-semibold text-ink-muted">
          page {Math.min(currentPage + 1, pages.length)} of {pages.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={atEnd}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted transition hover:bg-ink/10 disabled:opacity-40 md:hidden"
        >
          next →
        </button>
      </div>
    </div>
  );
}

const FlipPage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  function FlipPage({ src, alt }, ref) {
    return (
      <div ref={ref} className="bg-brand-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="block h-full w-full select-none object-contain"
          draggable={false}
        />
      </div>
    );
  }
);
