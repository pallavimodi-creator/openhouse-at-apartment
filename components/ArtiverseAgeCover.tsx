"use client";

/**
 * Artiverse cover for the 5–8 and 8–12 art programmes — same JSX
 * pattern as the 3-5 ArtiverseCoverArt component (dashed circle, "oh."
 * brand mark, sprinkled glyphs). Shows the materials list specific to
 * each age group.
 *
 * Usage:
 *   <ArtiverseAgeCover ageLabel="5–8" mediums={["tempera", ...]} />
 *
 * Reused as both the books-row thumbnail (size="thumb") and as the
 * flipbook's first page (size="full").
 */
export function ArtiverseAgeCover({
  size = "full",
  ageLabel,
  mediums,
  unitCount,
}: {
  size?: "full" | "thumb";
  ageLabel: string;
  mediums: string[];
  unitCount: number;
}) {
  const isThumb = size === "thumb";
  return (
    <div
      className={
        isThumb
          ? "relative flex h-full w-full flex-col bg-brand-cream p-2"
          : "relative flex h-full w-full flex-col overflow-hidden bg-brand-cream p-3 md:p-5"
      }
    >
      {/* Top-left brand mark */}
      <div className="z-10">
        <p
          className={
            isThumb
              ? "text-[8px] font-extrabold lowercase tracking-tight text-brand-orange"
              : "text-[11px] font-extrabold lowercase tracking-tight text-brand-orange md:text-[12px]"
          }
        >
          openhouse
        </p>
        <p
          className={
            isThumb
              ? "mt-0.5 text-[6px] italic text-ink/55"
              : "mt-0.5 text-[8px] italic text-ink/55 md:text-[9px]"
          }
        >
          art &amp; design · ages {ageLabel}
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-1">
        <div
          className={
            isThumb
              ? "relative flex aspect-square w-[80%] items-center justify-center"
              : "relative flex aspect-square w-[42%] max-w-[150px] items-center justify-center"
          }
        >
          <div
            className={
              isThumb
                ? "absolute inset-0 rounded-full border-[1.5px] border-dashed border-ink/55"
                : "absolute inset-0 rounded-full border-[2px] border-dashed border-ink/55"
            }
          />
          {/* Art-medium sprinkles */}
          <span aria-hidden className={isThumb ? "absolute -top-0.5 left-[26%] text-[8px]" : "absolute -top-1 left-[26%] text-[12px]"}>✷</span>
          <span aria-hidden className={isThumb ? "absolute top-[14%] right-[10%] text-[7px]" : "absolute top-[14%] right-[10%] text-[11px]"}>⊿</span>
          <span aria-hidden className={isThumb ? "absolute right-[-3%] top-[44%] text-[7px]" : "absolute right-[-3%] top-[44%] text-[11px]"}>⌘</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[10%] right-[16%] text-[7px]" : "absolute bottom-[10%] right-[16%] text-[11px]"}>✶</span>
          <span aria-hidden className={isThumb ? "absolute -bottom-0.5 left-[34%] text-[7px]" : "absolute -bottom-1 left-[34%] text-[11px]"}>❀</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[18%] left-[-2%] text-[7px]" : "absolute bottom-[18%] left-[-2%] text-[11px]"}>◐</span>
          <span aria-hidden className={isThumb ? "absolute top-[22%] left-[-2%] text-[7px]" : "absolute top-[22%] left-[-2%] text-[11px]"}>⌇</span>

          <div
            className={
              isThumb
                ? "relative flex h-[58%] w-[58%] items-center justify-center rounded-full bg-brand-orange shadow-[0_2px_6px_rgba(242,100,61,0.35)]"
                : "relative flex h-[58%] w-[58%] items-center justify-center rounded-full bg-brand-orange shadow-[0_4px_12px_rgba(242,100,61,0.35)]"
            }
          >
            <span
              className={
                isThumb
                  ? "text-[16px] font-extrabold leading-none text-white"
                  : "text-[20px] font-extrabold leading-none text-white md:text-[24px]"
              }
            >
              oh.
            </span>
          </div>
        </div>
      </div>

      <div className="z-10 text-center">
        <h2
          className={
            isThumb
              ? "text-[10px] font-extrabold lowercase leading-tight text-ink"
              : "text-[15px] font-extrabold lowercase leading-tight text-ink md:text-[18px]"
          }
        >
          the artiverse book
        </h2>
        {!isThumb && (
          <>
            <p className="mx-auto mt-1 max-w-xs text-[10px] leading-relaxed text-ink/70 md:text-[11px]">
              a making book — {unitCount} units across the year
            </p>
            <div className="mx-auto mt-2 max-w-sm rounded-lg bg-brand-white/70 px-3 py-1.5 ring-1 ring-ink/10">
              <p className="text-[8px] font-bold tracking-normal text-brand-orange">
                core materials
              </p>
              <p className="mt-0.5 text-[9.5px] leading-relaxed text-ink/80 md:text-[10px]">
                {mediums.join(" · ")}
              </p>
              <p className="mt-1 text-[8.5px] italic leading-relaxed text-ink-muted md:text-[9px]">
                always on A3 paper · the picture is a reference, children pick their own subject
              </p>
            </div>
          </>
        )}
        <p
          className={
            isThumb
              ? "mt-1 text-[6px] font-bold lowercase tracking-tight text-ink/45"
              : "mt-1.5 text-[8px] font-bold lowercase tracking-tight text-ink/45"
          }
        >
          teacher reference
        </p>
      </div>
    </div>
  );
}
