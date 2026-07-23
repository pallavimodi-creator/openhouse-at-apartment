"use client";

/**
 * LevelSwitcher — the progression strip for a multi-level track.
 *
 * Robotics runs level 1 (mechanics) and then level 2 (electronics). The
 * home grid shows only level 1, so this strip is how an educator discovers
 * and moves to the next level once they're inside the programme. Levels
 * read left → right in order, so "what comes after this" is obvious.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CurriculumProgramme } from "@/content/types";

export function LevelSwitcher({
  levels,
  currentSlug,
}: {
  levels: CurriculumProgramme[];
  currentSlug: string;
}) {
  if (levels.length < 2) return null;

  return (
    <div className="mt-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-subtle">
        levels
      </p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {levels.map((lv, i) => {
          const active = lv.slug === currentSlug;
          const levelNo = lv.level ?? i + 1;
          return (
            <div key={lv.slug} className="flex items-center gap-2 sm:flex-1">
              <Link
                href={`/${lv.slug}/overview`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 transition",
                  active
                    ? "bg-brand-orange/10 ring-1 ring-brand-orange/40"
                    : "bg-brand-white ring-1 ring-ink/10 hover:ring-brand-orange/40"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold",
                    active
                      ? "bg-brand-orange text-white"
                      : "bg-ink/[0.06] text-ink"
                  )}
                >
                  {levelNo}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink-subtle">
                    level {levelNo}
                  </span>
                  <span className="block truncate text-[13.5px] font-extrabold leading-tight text-ink">
                    {lv.levelName ?? lv.title}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  {active ? (
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-brand-orange">
                      you&apos;re here
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-ink-muted">
                      {lv.totalSessions} sessions
                    </span>
                  )}
                </span>
              </Link>
              {/* progression arrow between levels */}
              {i < levels.length - 1 && (
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-ink-subtle sm:block"
                  strokeWidth={2.2}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
