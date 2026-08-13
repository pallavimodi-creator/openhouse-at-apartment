"use client";

import { useState } from "react";
import { Piano, Guitar, Drum } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MUSIC_BAND_SONGS_BY_LEVEL,
  MUSIC_INSTRUMENTS,
  musicNotationUrl,
  type MusicInstrumentId,
} from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Ensemble (play-together) for the day plan — the band song(s) for this level,
 * each with its notation openable in the flip viewer (per instrument, at the
 * child's level). Nothing to download.
 */

const INSTRUMENT_ICON: Record<MusicInstrumentId, LucideIcon> = {
  keys: Piano,
  ukulele: Guitar,
  drums: Drum,
};

export function MusicEnsemblePlan({ level }: { level: number }) {
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );
  const songs = MUSIC_BAND_SONGS_BY_LEVEL[level] ?? [];

  return (
    <div className="mt-2 space-y-2.5">
      {songs.map((song) => (
        <div key={song.slug}>
          <p className="flex items-baseline gap-1.5 text-[12.5px] font-semibold text-ink">
            {song.title}
            <span
              className={
                song.perform
                  ? "rounded-chip bg-brand-orange/15 px-1.5 py-0.5 text-[9px] font-bold lowercase text-brand-orange"
                  : "rounded-chip bg-ink/[0.06] px-1.5 py-0.5 text-[9px] font-bold lowercase text-ink-muted"
              }
            >
              {song.perform ? "performed" : "practice"}
            </span>
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {MUSIC_INSTRUMENTS.map((inst) => {
              const Icon = INSTRUMENT_ICON[inst.id];
              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() =>
                    setOpenPdf({
                      url: musicNotationUrl(song.slug, inst.id, level),
                      title: `${song.title} · ${inst.label} · level ${level}`,
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-md bg-brand-orange/10 px-2 py-0.5 text-[10.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                >
                  <Icon className="h-3 w-3" strokeWidth={2.2} />
                  {inst.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </div>
  );
}
