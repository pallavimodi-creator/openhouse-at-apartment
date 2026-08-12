"use client";

import { useState } from "react";
import { MUSIC_WARMUPS, type MusicWarmup } from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Music — warm-up games (they rotate).
 *
 * Every class opens with a short vocal warm-up and a short rhythm warm-up;
 * the educator picks one from each group and rotates them across classes.
 * Each resource is either an external link (opens in a new tab) or an OH game
 * PDF (opens in the in-page flip viewer). Games with only spoken instructions
 * carry no link — the description IS the how-to.
 */

function WarmupGroup({
  label,
  items,
  onOpenPdf,
}: {
  label: string;
  items: MusicWarmup[];
  onOpenPdf: (pdf: { url: string; title: string }) => void;
}) {
  return (
    <div className="mt-5">
      <p className="text-[11px] font-bold tracking-[0.06em] text-brand-orange">
        {label}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((w) => (
          <div
            key={w.name}
            className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
          >
            <p className="text-[13.5px] font-extrabold lowercase text-ink">
              {w.name}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              {w.detail}
            </p>
            {w.resources.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {w.resources.map((r) =>
                  r.pdf ? (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => onOpenPdf({ url: r.pdf!, title: w.name })}
                      className="inline-flex items-center gap-1 rounded-md bg-brand-orange/10 px-2 py-0.5 text-[10.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                    >
                      {r.label}
                    </button>
                  ) : r.url ? (
                    <a
                      key={r.label}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-brand-orange/10 px-2 py-0.5 text-[10.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                    >
                      {r.label} ↗
                    </a>
                  ) : (
                    <span
                      key={r.label}
                      className="rounded-md bg-ink/[0.05] px-2 py-0.5 text-[10.5px] font-semibold text-ink-muted"
                    >
                      {r.label}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MusicWarmupsSection() {
  const vocal = MUSIC_WARMUPS.filter((w) => w.group === "vocal");
  const rhythm = MUSIC_WARMUPS.filter((w) => w.group === "rhythm");
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );

  return (
    <section className="mt-10 px-4 md:px-8">
      <h2 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
        warm-ups
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
        every class opens with a short vocal warm-up and a short rhythm warm-up —
        the educator picks one from each group and rotates them across classes.
      </p>
      <p className="mt-2 rounded-lg bg-brand-orange/8 px-3 py-2 text-[12px] leading-relaxed text-ink-muted">
        <span aria-hidden className="mr-1">📱</span>
        <span className="font-semibold text-ink">when a resource is a video,</span>{" "}
        play it on your phone for the sound and to lead the exercise — don&apos;t
        show the screen to the children.
      </p>
      <WarmupGroup label="vocal — pick one" items={vocal} onOpenPdf={setOpenPdf} />
      <WarmupGroup label="rhythm — pick one" items={rhythm} onOpenPdf={setOpenPdf} />

      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </section>
  );
}
