"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Load HTMLFlipBook only on the client — the package touches the DOM at
// module load and crashes during SSR if imported eagerly.
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

/**
 * Image flipbook — renders an ordered list of image URLs as flippable pages.
 *
 * Works for any book that's a stack of full-page images (e.g. the Artistotle
 * book pages). Reads the natural aspect ratio of the first image so pages
 * render at the right shape, and switches between portrait (single page) and
 * spread (two pages) based on the container width.
 */
interface ImageFlipbookProps {
  /** Page image URLs in reading order. Page 1 = first item. */
  pages: string[];
  /** Force single-page portrait or two-page spread regardless of width. */
  preferSpread?: boolean;
  /** Alt-text prefix for screen readers, e.g. "artistotle book". */
  altPrefix?: string;
}

export function ImageFlipbook({
  pages,
  preferSpread,
  altPrefix = "page",
}: ImageFlipbookProps) {
  const [aspect, setAspect] = useState<number>(1.414); // h/w; A4-ish default
  const [currentPage, setCurrentPage] = useState(0);
  // HTMLFlipBook touches the DOM on first render — defer until after mount so
  // SSR doesn't crash trying to access window.
  const [mounted, setMounted] = useState(false);
  const flipRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track container width for responsive sizing.
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

  // Read first image's natural aspect on mount.
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

  // Skip rendering HTMLFlipBook on the server — it touches the DOM at import
  // time. Show a sized placeholder so layout doesn't jump on hydration.
  if (!mounted) {
    return (
      <div ref={containerRef} className="flex h-96 w-full items-center justify-center rounded-card bg-ink/[0.02]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
          <p className="text-[11px] text-ink-muted">loading flipbook…</p>
        </div>
      </div>
    );
  }

  // Sizing: pick sensible dimensions that fit the container and respect the
  // image's aspect ratio.
  const maxSingleWidth = Math.min(containerWidth || 560, 600);
  const isSpread = preferSpread ?? containerWidth > 900;
  const pageWidth = isSpread
    ? Math.min((containerWidth - 32) / 2, 540)
    : maxSingleWidth;
  const pageHeight = pageWidth * aspect;

  return (
    <div ref={containerRef} className="w-full">
      <div className="mx-auto flex w-full justify-center">
        {/* @ts-expect-error react-pageflip's prop types are loose */}
        <HTMLFlipBook
          ref={flipRef}
          width={pageWidth}
          height={pageHeight}
          size="stretch"
          minWidth={240}
          maxWidth={1100}
          minHeight={340}
          maxHeight={1500}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={!isSpread}
          maxShadowOpacity={0.3}
          className="shadow-card"
          onFlip={(e: any) => setCurrentPage(e.data)}
        >
          {pages.map((src, i) => (
            <FlipPage
              key={src}
              src={src}
              alt={`${altPrefix} ${i + 1}`}
            />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3 text-[12px]">
        <button
          onClick={() => flipRef.current?.pageFlip()?.flipPrev()}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted hover:bg-ink/10"
          aria-label="previous page"
        >
          ← prev
        </button>
        <span className="font-semibold text-ink-muted">
          page {Math.min(currentPage + 1, pages.length)} / {pages.length}
        </span>
        <button
          onClick={() => flipRef.current?.pageFlip()?.flipNext()}
          className="rounded-full bg-ink/5 px-3 py-1.5 font-semibold text-ink-muted hover:bg-ink/10"
          aria-label="next page"
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
      <div ref={ref} className="bg-white">
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
