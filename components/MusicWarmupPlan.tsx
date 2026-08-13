"use client";

import { useState } from "react";
import { MUSIC_WARMUPS, type MusicWarmup } from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Compact warm-up picker for the day plan — every warm-up format (vocal +
 * rhythm) with its resource links (Spotify / apps open in a new tab; OH game
 * PDFs open in the flip viewer). The educator picks one from each group.
 */
export function MusicWarmupPlan() {
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );
  const vocal = MUSIC_WARMUPS.filter((w) => w.group === "vocal");
  const rhythm = MUSIC_WARMUPS.filter((w) => w.group === "rhythm");

  const Group = ({ label, items }: { label: string; items: MusicWarmup[] }) => (
    <div className="mt-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-orange">
        {label}
      </p>
      <ul className="mt-1 space-y-1">
        {items.map((w) => (
          <li key={w.name} className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
            <span className="text-[12px] font-semibold text-ink">{w.name}</span>
            <span className="text-[11px] text-ink-muted">— {w.detail}</span>
            {w.resources.map((r) =>
              r.pdf ? (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setOpenPdf({ url: r.pdf!, title: w.name })}
                  className="rounded-md bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                >
                  {r.label}
                </button>
              ) : r.url ? (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                >
                  {r.label} ↗
                </a>
              ) : null
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mt-2">
      <p className="text-[11px] italic leading-relaxed text-ink-muted">
        pick one vocal + one rhythm warm-up — they rotate across classes.
      </p>
      <Group label="vocal" items={vocal} />
      <Group label="rhythm" items={rhythm} />
      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </div>
  );
}
