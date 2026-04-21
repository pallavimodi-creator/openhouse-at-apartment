"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgrammeCard } from "./ProgrammeCard";
import type { CurriculumProgramme } from "@/content/types";

export function ProgrammeCarousel({
  programmes,
}: {
  programmes: CurriculumProgramme[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Mobile: horizontal scroll */}
      <div
        ref={scrollRef}
        className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto scroll-smooth px-4 pb-2 md:hidden"
      >
        {programmes.map((p) => (
          <ProgrammeCard key={p.id} programme={p} />
        ))}
        <div className="w-1 shrink-0" />
      </div>

      {/* Mobile nav arrows */}
      <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-white shadow-card ring-1 ring-ink/10 transition hover:shadow-float active:scale-95 disabled:opacity-30"
          aria-label="scroll left"
        >
          <ChevronLeft className="h-4 w-4 text-ink" />
        </button>
        <div className="flex gap-1.5">
          {programmes.map((p) => (
            <div key={p.id} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-white shadow-card ring-1 ring-ink/10 transition hover:shadow-float active:scale-95 disabled:opacity-30"
          aria-label="scroll right"
        >
          <ChevronRight className="h-4 w-4 text-ink" />
        </button>
      </div>

      {/* Desktop: grid layout */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p) => (
          <ProgrammeCard key={p.id} programme={p} desktop />
        ))}
      </div>
    </div>
  );
}
