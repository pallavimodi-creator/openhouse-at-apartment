"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Load HTMLFlipBook lazily (client-only) via a state-based import rather
// than next/dynamic — next/dynamic wraps the component in a way that
// breaks ref forwarding to the underlying class instance, so methods
// like flipPrev/flipNext become unreachable from the parent's ref.

/**
 * Image flipbook — renders an ordered list of flipbook pages as a real
 * page-flipping book. Two-page spread with curl animation on desktop,
 * single-page portrait on phones.
 *
 * Pages are a heterogeneous list of image pages and text pages. To render
 * a "real picture book" with image-on-one-side and text-on-the-other,
 * pass pages as alternating pairs: [img1, txt1, img2, txt2, ...]. With
 * showCover=false react-pageflip pairs them as [L,R][L,R]... so each
 * spread becomes image | text.
 */
export interface FlipbookCaption {
  /** Small uppercase eyebrow above the title (e.g. "paper chapter"). */
  eyebrow?: string;
  /** Big lowercase title (e.g. "accordions"). */
  title: string;
  /** One- or two-sentence description. */
  description?: string;
}

export type FlipbookPage =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "text"; caption: FlipbookCaption };

interface ImageFlipbookProps {
  /** Pages in reading order. Page 1 = first item. */
  pages: FlipbookPage[];
  /** Alt-text prefix for screen readers, e.g. "artistotle book". */
  altPrefix?: string;
}

export function ImageFlipbook({ pages, altPrefix = "page" }: ImageFlipbookProps) {
  const [aspect, setAspect] = useState(1.414); // h / w; A4-ish default
  const [currentPage, setCurrentPage] = useState(0);
  const [HTMLFlipBook, setHTMLFlipBook] = useState<any>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const flipRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-import the flipbook on the client. This pattern keeps the ref
  // forwarding intact (next/dynamic breaks it) while still avoiding SSR
  // because the import only runs in useEffect.
  useEffect(() => {
    let cancelled = false;
    import("react-pageflip").then((mod) => {
      if (!cancelled) setHTMLFlipBook(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Container width tracking.
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Wait for BOTH the lazy HTMLFlipBook component AND a real container
  // width before rendering the book. Without this, page-flip throws
  // "Invalid width or height" on the very first paint because the
  // ResizeObserver hasn't yet reported a containerWidth and pageWidth
  // computes to 0.
  const ready = !!HTMLFlipBook && containerWidth > 0;

  // First image's aspect ratio sets the book proportions. Look for the
  // first image page (text pages don't have a natural aspect).
  useEffect(() => {
    const firstImage = pages.find((p) => p.kind === "image") as
      | Extract<FlipbookPage, { kind: "image" }>
      | undefined;
    if (!firstImage) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0) {
        setAspect(img.naturalHeight / img.naturalWidth);
      }
    };
    img.src = firstImage.src;
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

  const totalSpreads = Math.ceil(pages.length / 2);
  const currentSpread = Math.floor(currentPage / 2) + 1;

  return (
    <div ref={containerRef} className="w-full">
      {/* Mounting placeholder so layout doesn't jump while the dynamic
          chunk loads. */}
      {!ready ? (
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
            <HTMLFlipBook
              ref={flipRef}
              width={pageWidth}
              height={pageHeight}
              size="fixed"
              minWidth={240}
              maxWidth={520}
              minHeight={340}
              maxHeight={1500}
              showCover={false}
              mobileScrollSupport={true}
              usePortrait={!isSpread}
              maxShadowOpacity={0.32}
              drawShadow={true}
              flippingTime={600}
              className="bg-brand-cream"
              onFlip={(e: any) => setCurrentPage(e.data)}
            >
              {pages.map((page, i) =>
                page.kind === "image" ? (
                  <FlipImagePage
                    key={`img-${i}-${page.src}`}
                    src={page.src}
                    alt={page.alt ?? `${altPrefix} ${i + 1}`}
                  />
                ) : (
                  <FlipTextPage
                    key={`txt-${i}-${page.caption.title}`}
                    caption={page.caption}
                  />
                )
              )}
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

      {/* Page counter + mobile prev/next.
          On desktop spread mode: "spread N of M" (each spread = 2 pages).
          On portrait mobile: "page N of total" (one page at a time). */}
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
          {isSpread
            ? `spread ${Math.min(currentSpread, totalSpreads)} of ${totalSpreads}`
            : `page ${Math.min(currentPage + 1, pages.length)} of ${pages.length}`}
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

const FlipImagePage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  function FlipImagePage({ src, alt }, ref) {
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

const FlipTextPage = forwardRef<HTMLDivElement, { caption: FlipbookCaption }>(
  function FlipTextPage({ caption }, ref) {
    return (
      <div
        ref={ref}
        className="flex h-full w-full flex-col justify-center bg-brand-cream p-6 md:p-10"
      >
        <div className="mx-auto w-full max-w-md">
          {caption.eyebrow && (
            <p className="text-[11px] font-bold lowercase tracking-tight text-brand-orange md:text-[12px]">
              {caption.eyebrow}
            </p>
          )}
          <h3 className="mt-2 text-[22px] font-extrabold lowercase leading-tight text-ink md:text-[28px]">
            {caption.title}
          </h3>
          {caption.description && (
            <p className="mt-4 text-[13px] leading-relaxed text-ink-muted md:text-[15px]">
              {caption.description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
