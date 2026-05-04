import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoryChip } from "./CategoryChip";
import { AgeChip } from "./AgeChip";
import type { CurriculumProgramme, Category } from "@/content/types";

const cardAccent: Record<Category, string> = {
  art: "from-category-art/30 via-brand-orange/5 to-brand-cream",
  language: "from-category-language/30 via-brand-orange/5 to-brand-cream",
  music: "from-category-music/30 via-brand-orange/5 to-brand-cream",
  movement: "from-category-movement/30 via-brand-orange/5 to-brand-cream",
  stem: "from-category-stem/30 via-brand-orange/5 to-brand-cream",
};

const topBar: Record<Category, string> = {
  art: "bg-category-art",
  language: "bg-category-language",
  music: "bg-category-music",
  movement: "bg-category-movement",
  stem: "bg-category-stem",
};

export function ProgrammeCard({
  programme,
  desktop,
}: {
  programme: CurriculumProgramme;
  desktop?: boolean;
}) {
  const hasContent = programme.totalSessions > 0;

  return (
    <div className={cn(
      "flex flex-col overflow-hidden rounded-card bg-brand-white shadow-card",
      desktop ? "w-full" : "w-[240px] shrink-0 snap-start"
    )}>
      {/* Top color bar — removed per brand feedback */}

      {/* Image area */}
      <div
        className={cn(
          "relative flex items-end overflow-hidden p-3",
          desktop ? "h-[180px]" : "h-[140px]",
          programme.heroImageUrl ? "" : "bg-gradient-to-br",
          !programme.heroImageUrl && cardAccent[programme.category]
        )}
      >
        {programme.heroImageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={programme.heroImageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top saturate-[0.85] brightness-[1.02]"
            />
            {/* Warm overlay to sync with hero video tones */}
            <div className="absolute inset-0 bg-brand-orange/[0.06] mix-blend-multiply" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        )}
        <div className="relative z-10 flex gap-1.5">
          <CategoryChip
            category={programme.category}
            label={
              programme.category === "stem"
                ? programme.slug === "robotics-3-5"
                  ? "stem"
                  : "robotics"
                : programme.category
            }
          />
          <AgeChip label={programme.ageLabel} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-[15px] font-bold leading-tight text-ink">
          {programme.title}
        </h3>
        <p className="mt-1 flex-1 text-[12px] font-medium leading-relaxed text-ink-muted">
          {programme.tagline}
        </p>
        {hasContent ? (
          <Link
            href={`/${programme.slug}`}
            className="mt-3 block rounded-card border border-ink/10 bg-brand-white py-2 text-center text-[12px] font-semibold text-ink transition hover:bg-ink/5 active:scale-[0.98]"
          >
            dive in
          </Link>
        ) : (
          <span className="mt-3 block rounded-card border border-ink/5 bg-bg-subtle py-2 text-center text-[11px] font-medium text-ink-subtle">
            coming soon
          </span>
        )}
      </div>
    </div>
  );
}
