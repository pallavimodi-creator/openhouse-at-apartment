import { cn } from "@/lib/utils";
import type { Category } from "@/content/types";

const chipStyles: Record<Category, string> = {
  art: "bg-brand-white/80 text-amber-800 backdrop-blur-sm",
  language: "bg-brand-white/80 text-green-800 backdrop-blur-sm",
  music: "bg-brand-white/80 text-blue-800 backdrop-blur-sm",
  movement: "bg-brand-white/80 text-pink-800 backdrop-blur-sm",
  stem: "bg-brand-white/80 text-blue-900 backdrop-blur-sm",
};

export function CategoryChip({
  category,
  label,
  className,
}: {
  category: Category;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-chip px-2.5 py-0.5 text-[10px] font-semibold tracking-normal",
        chipStyles[category],
        className
      )}
    >
      {label}
    </span>
  );
}
