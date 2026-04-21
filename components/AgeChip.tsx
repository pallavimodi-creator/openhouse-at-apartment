import { cn } from "@/lib/utils";

export function AgeChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-chip bg-brand-white/80 px-2.5 py-0.5 text-[10px] font-medium text-ink-muted backdrop-blur-sm",
        className
      )}
    >
      {label}
    </span>
  );
}
