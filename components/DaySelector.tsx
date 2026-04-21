"use client";

import { useRef, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/content/types";

const selectedBg: Record<Category, string> = {
  art: "bg-category-art text-amber-900",
  language: "bg-category-language text-green-900",
  music: "bg-category-music text-blue-900",
  movement: "bg-category-movement text-pink-900",
  stem: "bg-category-stem text-white",
};

export function DaySelector({
  totalDays,
  selectedDay,
  onSelectDay,
  category,
  checkpointDays,
  hasTrialSession,
  completedDays,
}: {
  totalDays: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  category: Category;
  checkpointDays: number[];
  hasTrialSession?: boolean;
  completedDays?: number[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const el = itemRefs.current.get(selectedDay);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [selectedDay]);

  const handleClick = useCallback(
    (day: number) => {
      onSelectDay(day);
    },
    [onSelectDay]
  );

  // Build the list of day numbers
  const days: number[] = [];
  if (hasTrialSession) days.push(0);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-bg to-transparent" />

      <div
        ref={scrollRef}
        className="no-scrollbar snap-center-scroll flex gap-2 overflow-x-auto px-[calc(50%-28px)] py-2"
      >
        {days.map((day) => {
          const isSelected = day === selectedDay;
          const isCheckpoint = checkpointDays.includes(day);
          const isTrial = day === 0;
          const isFlex = day > 48;
          const isCompleted = completedDays?.includes(day) ?? false;
          return (
            <button
              key={day}
              ref={(el) => {
                if (el) itemRefs.current.set(day, el);
                else itemRefs.current.delete(day);
              }}
              onClick={() => handleClick(day)}
              className={cn(
                "relative flex shrink-0 flex-col items-center justify-center rounded-full transition-all duration-200",
                isTrial ? "h-14 w-16" : "h-14 w-14",
                isSelected
                  ? cn(
                      "scale-110 shadow-float",
                      isTrial ? "bg-brand-orange text-white" : selectedBg[category]
                    )
                  : isCompleted
                    ? "bg-category-language/30 text-green-900"
                    : "bg-ink/5 text-ink-muted hover:bg-ink/10"
              )}
            >
              <span
                className={cn(
                  "text-[9px] font-medium leading-none",
                  isSelected || isCompleted ? "" : "text-ink-subtle"
                )}
              >
                {isTrial ? "trial" : isFlex ? "flex" : "day"}
              </span>
              <span className={cn("text-[18px] font-bold leading-none")}>
                {isTrial ? "0" : day}
              </span>
              {/* Completion check mark */}
              {isCompleted && !isSelected && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-category-language text-white shadow-sm">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              )}
              {isCheckpoint && (
                <span
                  className={cn(
                    "absolute -bottom-0.5 h-1.5 w-1.5 rounded-full",
                    isSelected ? "bg-white/60" : "bg-brand-orange"
                  )}
                />
              )}
            </button>
          );
        })}

        {/* "more coming" indicator after the last session */}
        <div
          className="flex h-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-dashed border-ink/15 bg-transparent px-4 text-center"
          aria-label="more sessions coming soon"
        >
          <span className="text-[18px] font-bold leading-none text-ink-subtle">
            ···
          </span>
          <span className="text-[8px] font-semibold leading-none text-ink-subtle">
            more
            <br />
            coming
          </span>
        </div>
      </div>
    </div>
  );
}
