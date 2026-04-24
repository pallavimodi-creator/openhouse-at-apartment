"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

/**
 * PDF flipbook — renders a PDF file as flippable pages.
 *
 * Uses pdfjs-dist to render each page to a canvas and react-pageflip to
 * animate the page turns. Sizes itself to the container's width and keeps
 * the PDF's native aspect ratio on each page.
 */
interface PdfFlipbookProps {
  pdfUrl: string;
  /** Whether to show single or two-page spreads. Defaults to single on
   *  narrow viewports and spreads on wide ones. */
  preferSpread?: boolean;
}

export function PdfFlipbook({ pdfUrl, preferSpread }: PdfFlipbookProps) {
  const [pages, setPages] = useState<string[] | null>(null);
  const [aspect, setAspect] = useState<number>(1.414); // A4 default (h/w)
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const flipRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  // Render all PDF pages to data URLs on mount.
  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        // Dynamic import so pdfjs is only pulled in on the client.
        const pdfjs: any = await import("pdfjs-dist");
        // The worker file was copied into /public at dev time so it ships
        // with the version-matched library.
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const imgs: string[] = [];
        // Use the first page's viewport for aspect ratio.
        const firstPage = await pdf.getPage(1);
        const vp1 = firstPage.getViewport({ scale: 1 });
        setAspect(vp1.height / vp1.width);

        // Target render width — at most 1200px, keeps things sharp without
        // blowing memory on huge PDFs.
        const targetWidth = 1200;
        const scale = targetWidth / vp1.width;

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const vp = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvasContext: ctx, viewport: vp, canvas }).promise;
          imgs.push(canvas.toDataURL("image/jpeg", 0.85));
        }
        if (!cancelled) {
          setPages(imgs);
          setTotalPages(imgs.length);
        }
      } catch (e: any) {
        console.error("PDF render failed", e);
        if (!cancelled) setError(e?.message ?? "failed to render pdf");
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card bg-ink/[0.02] p-6 text-center">
        <p className="text-[12px] text-ink-muted">
          couldn&apos;t load the flipbook. you can still open the pdf directly.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brand-orange px-4 py-2 text-[12px] font-bold text-white"
        >
          open pdf
        </a>
      </div>
    );
  }

  if (!pages) {
    return (
      <div className="flex h-64 items-center justify-center rounded-card bg-ink/[0.02]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
          <p className="text-[11px] text-ink-muted">loading experience book…</p>
        </div>
      </div>
    );
  }

  // Sizing: pick sensible dimensions that fit the container and respect the
  // PDF's aspect ratio.
  const maxSingleWidth = Math.min(containerWidth || 560, 560);
  const isSpread = preferSpread ?? containerWidth > 900;
  const pageWidth = isSpread
    ? Math.min((containerWidth - 32) / 2, 500)
    : maxSingleWidth;
  const pageHeight = pageWidth * aspect;

  return (
    <div ref={containerRef} className="w-full">
      <div className="mx-auto flex w-full justify-center">
        {/* HTMLFlipBook typings are loose; cast as any to avoid friction. */}
        {/* @ts-expect-error — react-pageflip's types are loose */}
        <HTMLFlipBook
          ref={flipRef}
          width={pageWidth}
          height={pageHeight}
          size="stretch"
          minWidth={240}
          maxWidth={1000}
          minHeight={340}
          maxHeight={1400}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={!isSpread}
          maxShadowOpacity={0.25}
          className="shadow-card"
          onFlip={(e: any) => setCurrentPage(e.data)}
        >
          {pages.map((src, i) => (
            <FlipPage key={i} src={src} pageNumber={i + 1} />
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
          page {Math.min(currentPage + 1, totalPages)} / {totalPages}
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

const FlipPage = forwardRef<HTMLDivElement, { src: string; pageNumber: number }>(
  function FlipPage({ src, pageNumber }, ref) {
    return (
      <div ref={ref} className="bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`page ${pageNumber}`}
          className="block h-full w-full select-none object-contain"
          draggable={false}
        />
      </div>
    );
  }
);
