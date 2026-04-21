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
}: {
  title: string;
  ageLabel: string;
  description: string;
  category: Category;
}) {
  return (
    <section className="-mx-4 px-4">
      <div className={cn("rounded-b-[24px] px-4 pb-6 pt-4 md:px-8 md:pb-8 md:pt-6", heroBg[category])}>
        <div className="rounded-card bg-brand-white p-5 shadow-card md:p-8">
          <p className="text-[11px] font-semibold text-ink-subtle md:text-[13px]">
            {ageLabel}
          </p>
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
