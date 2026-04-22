"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Palette,
  Calendar,
  Layers,
} from "lucide-react";
import { getCurriculumProgramme } from "@/lib/content";
import { getTeacher } from "@/lib/teacher-state";
import type { ArtiverseUnit, CurriculumProgramme } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Flipbook portfolio.
 *
 * Structure:
 * - Page 0: Cover (handwritten title + stats + dedication)
 * - Pages 1..N: one artiverse unit per page
 * - Page N+1: Back cover ("to be continued")
 *
 * Transitions are driven by a `flipDir` state so the outgoing page slides out
 * to the opposite side while the incoming page slides in — giving a subtle
 * page-turn feel without heavy 3D maths.
 */
export default function PortfolioPage() {
  const params = useParams<{ programmeSlug: string }>();
  const router = useRouter();
  const slug = params.programmeSlug;
  const programme = getCurriculumProgramme(slug);
  const units = programme?.artiverseUnits ?? [];

  const [page, setPage] = useState(0);
  const [flipDir, setFlipDir] = useState<"next" | "prev" | null>(null);
  const [teacherName, setTeacherName] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  // Auth
  useEffect(() => {
    const t = getTeacher();
    if (!t) {
      router.replace("/login");
      return;
    }
    setTeacherName(t.teacherName ?? "");
    setLoaded(true);
  }, [router]);

  // Total pages = cover + units + back cover
  const total = units.length > 0 ? units.length + 2 : 0;

  const goNext = useCallback(() => {
    setPage((p) => {
      if (p >= total - 1) return p;
      setFlipDir("next");
      return p + 1;
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setPage((p) => {
      if (p <= 0) return p;
      setFlipDir("prev");
      return p - 1;
    });
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -50) goNext();
    else if (dx > 50) goPrev();
  };

  // Clear direction after animation
  useEffect(() => {
    if (!flipDir) return;
    const id = setTimeout(() => setFlipDir(null), 450);
    return () => clearTimeout(id);
  }, [flipDir, page]);

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[12px] font-medium text-ink-subtle">loading...</p>
      </div>
    );
  }

  if (!programme || programme.category !== "art" || units.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-[14px] font-semibold text-ink">
          the flipbook is only available for art programmes.
        </p>
        <button
          onClick={() => router.back()}
          className="rounded-chip bg-brand-orange px-4 py-1.5 text-[12px] font-semibold text-white"
        >
          go back
        </button>
      </div>
    );
  }

  const isCover = page === 0;
  const isBackCover = page === total - 1;
  const currentUnit: ArtiverseUnit | null =
    !isCover && !isBackCover ? units[page - 1] : null;

  return (
    <div
      className="relative min-h-screen pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #FBF3E3 0%, #F5E9D3 55%, #E9D9B7 100%)",
      }}
    >
      {/* Subtle paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-5 md:px-8 md:pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-muted transition hover:text-brand-orange"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          back to overview
        </button>
        <p className="text-[11px] font-semibold text-ink-subtle">
          {isCover
            ? "cover"
            : isBackCover
              ? "end"
              : `page ${page} of ${units.length}`}
        </p>
      </div>

      {/* Stage */}
      <div
        className="relative z-10 mx-auto mt-6 max-w-3xl px-4 md:mt-10 md:px-8"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Book wrapper with spine shadow */}
        <div
          className="relative mx-auto overflow-hidden rounded-[14px] bg-white shadow-[0_24px_48px_-16px_rgba(44,43,40,0.35),0_4px_12px_-4px_rgba(44,43,40,0.18)]"
          style={{
            minHeight: "min(82vh, 680px)",
            // inner left-edge shadow = binding
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 4%, rgba(0,0,0,0) 96%, rgba(0,0,0,0.08) 100%)",
          }}
        >
          {/* Page — keyed so React replaces on change, triggering enter animation */}
          <div
            key={page}
            className={cn(
              "relative h-full min-h-[inherit] w-full",
              flipDir === "next" && "animate-page-in-right",
              flipDir === "prev" && "animate-page-in-left"
            )}
          >
            {isCover ? (
              <CoverPage
                programme={programme}
                teacherName={teacherName}
                totalUnits={units.length}
              />
            ) : isBackCover ? (
              <BackCoverPage />
            ) : currentUnit ? (
              <UnitPage unit={currentUnit} index={page} total={units.length} />
            ) : null}
          </div>

          {/* Prev / next chevrons */}
          {page > 0 && (
            <button
              onClick={goPrev}
              aria-label="previous page"
              className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md ring-1 ring-ink/10 backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-ink" strokeWidth={2.4} />
            </button>
          )}
          {page < total - 1 && (
            <button
              onClick={goNext}
              aria-label="next page"
              className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md ring-1 ring-ink/10 backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5 text-ink" strokeWidth={2.4} />
            </button>
          )}
        </div>

        {/* Progress dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFlipDir(i > page ? "next" : "prev");
                setPage(i);
              }}
              aria-label={`go to page ${i}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === page
                  ? "w-6 bg-brand-orange"
                  : "w-1.5 bg-ink/15 hover:bg-ink/30"
              )}
            />
          ))}
        </div>

        {/* Helper hint */}
        <p className="mt-3 text-center text-[10px] font-medium text-ink-subtle">
          swipe or use ← → to turn the page
        </p>
      </div>

      {/* Page-turn keyframes */}
      <style jsx global>{`
        @keyframes page-in-right {
          0% {
            opacity: 0;
            transform: translateX(24px);
            filter: brightness(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: brightness(1);
          }
        }
        @keyframes page-in-left {
          0% {
            opacity: 0;
            transform: translateX(-24px);
            filter: brightness(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: brightness(1);
          }
        }
        .animate-page-in-right {
          animation: page-in-right 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-page-in-left {
          animation: page-in-left 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

/* ─── Pages ────────────────────────────────────────────── */

function CoverPage({
  programme,
  teacherName,
  totalUnits,
}: {
  programme: CurriculumProgramme;
  teacherName: string;
  totalUnits: number;
}) {
  const mediums = new Set(
    (programme.artiverseUnits ?? []).map((u) => u.medium)
  ).size;
  const days = (programme.artiverseUnits ?? []).reduce(
    (sum, u) => sum + u.days,
    0
  );

  return (
    <div className="flex min-h-[inherit] flex-col items-center justify-between gap-8 px-8 py-12 md:px-16 md:py-20">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
          the portfolio
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
        </p>
        <h1
          className="mt-4 text-[44px] font-extrabold leading-[0.95] text-ink md:text-[64px] lg:text-[72px]"
          style={{ fontFamily: "'Caveat', 'Kalam', cursive" }}
        >
          my year of making.
        </h1>
        <p className="mt-3 text-[13px] italic leading-relaxed text-ink-muted md:text-[14px]">
          every medium I met. every technique I tried. every thing I made.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-cream px-4 py-1.5 text-[11px] font-semibold text-ink-muted shadow-sm ring-1 ring-ink/5">
          <span>{programme.title}</span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>{programme.ageLabel}</span>
        </div>
      </div>

      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        {[
          { icon: Palette, label: "artworks", value: totalUnits },
          { icon: Layers, label: "mediums", value: mediums },
          { icon: Calendar, label: "days", value: days },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-lg border border-ink/10 bg-brand-cream/50 px-3 py-3 text-center"
            >
              <Icon
                className="mx-auto h-4 w-4 text-brand-orange"
                strokeWidth={2}
              />
              <p className="mt-1 text-[22px] font-extrabold leading-none text-ink">
                {s.value}
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-subtle">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {teacherName && (
        <p
          className="text-center text-[16px] italic text-ink-muted"
          style={{ fontFamily: "'Caveat', 'Kalam', cursive" }}
        >
          kept by {teacherName.toLowerCase()}.
        </p>
      )}
    </div>
  );
}

function UnitPage({
  unit,
  index,
  total,
}: {
  unit: ArtiverseUnit;
  index: number;
  total: number;
}) {
  return (
    <div className="grid min-h-[inherit] grid-cols-1 gap-0 md:grid-cols-2">
      {/* Left: artwork */}
      <div className="relative flex items-center justify-center overflow-hidden bg-brand-cream px-6 py-10 md:px-8 md:py-14">
        {/* unit number badge */}
        <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-[14px] font-extrabold text-white shadow-md">
          {unit.unitNumber}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unit.heroImageUrl}
          alt={unit.whatChildrenMake}
          className="max-h-[50vh] w-full object-contain md:max-h-[58vh]"
        />
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
          {index} · {total}
        </p>
      </div>

      {/* Right: caption */}
      <div className="relative flex flex-col justify-center gap-5 px-6 py-10 md:px-10 md:py-14">
        {/* binding-style faux stitch line */}
        <div
          aria-hidden
          className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent md:block"
        />

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">
            unit {unit.unitNumber}
          </p>
          <h2
            className="mt-2 text-[34px] font-extrabold leading-[0.95] text-ink md:text-[42px]"
            style={{ fontFamily: "'Caveat', 'Kalam', cursive" }}
          >
            {unit.medium.toLowerCase()}
          </h2>
          <p className="mt-2 text-[12px] italic leading-relaxed text-ink-muted">
            reference: {unit.whatChildrenMake.toLowerCase()}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
            {unit.technique}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-brand-orange/10 px-2.5 py-1 text-[11px] font-semibold text-brand-orange">
            <Layers className="h-3 w-3" strokeWidth={2.4} />
            {unit.medium}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink-muted">
            <Calendar className="h-3 w-3" strokeWidth={2.4} />
            {unit.days} {unit.days === 1 ? "day" : "days"}
          </span>
        </div>

        {unit.abilitiesCovered.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
              what this work grew in me
            </h3>
            <ul className="mt-2 space-y-1.5">
              {unit.abilitiesCovered.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12px] leading-relaxed text-ink"
                >
                  <Sparkles
                    className="mt-0.5 h-3 w-3 shrink-0 text-brand-orange"
                    strokeWidth={2.2}
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
            reference images
          </h3>
          <p className="mt-2 rounded-md bg-ink/[0.03] px-2.5 py-1.5 text-[11.5px] italic leading-relaxed text-ink">
            use cue card of choice to assist with drawing.
          </p>
        </div>
      </div>
    </div>
  );
}

function BackCoverPage() {
  return (
    <div className="flex min-h-[inherit] flex-col items-center justify-center px-8 py-16 text-center md:px-16">
      <div className="mx-auto h-px w-16 bg-ink/20" />
      <p
        className="mt-6 text-[34px] font-extrabold leading-tight text-ink md:text-[44px]"
        style={{ fontFamily: "'Caveat', 'Kalam', cursive" }}
      >
        to be continued.
      </p>
      <p className="mt-4 max-w-sm text-[12px] italic leading-relaxed text-ink-muted md:text-[13px]">
        a portfolio is never finished. every new piece makes sense of the ones that came before it.
      </p>
      <div className="mx-auto mt-6 h-px w-16 bg-ink/20" />
    </div>
  );
}
