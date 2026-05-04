import { cn } from "@/lib/utils";
import type { Category } from "@/content/types";

const heroBg: Record<Category, string> = {
  art: "bg-category-art/30",
  language: "bg-category-language/30",
  music: "bg-category-music/30",
  movement: "bg-category-movement/30",
  stem: "bg-category-stem/30",
};

export function ProgrammeHero({
  title,
  ageLabel,
  description,
  category,
  /**
   * Optional small chip rendered next to the age label. Used by the
   * 3-5 art programme to flag that the programme is ongoing — the
   * 60-session count is what's authored so far, not the total length.
   */
  badge,
}: {
  title: string;
  ageLabel: string;
  description: string;
  category: Category;
  badge?: string;
}) {
  return (
    <section className="-mx-4 px-4">
      <div className={cn("rounded-b-[24px] px-4 pb-6 pt-4 md:px-8 md:pb-8 md:pt-6", heroBg[category])}>
        <div className="rounded-card bg-brand-white p-5 shadow-card md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold text-ink-subtle md:text-[13px]">
              {ageLabel}
            </p>
            {badge && (
              <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange md:text-[11px]">
                {badge}
              </span>
            )}
          </div>
          <h1 className="mt-1 text-[24px] font-bold leading-tight text-ink md:text-[32px]">
            {title}
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-muted md:text-[15px] md:max-w-xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
