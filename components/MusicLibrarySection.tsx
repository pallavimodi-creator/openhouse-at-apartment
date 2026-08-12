"use client";

import { useState } from "react";
import { Piano, Guitar, Drum, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MUSIC_SONGS,
  MUSIC_INSTRUMENTS,
  MUSIC_WARMUPS,
  musicNotationUrl,
  type MusicInstrumentId,
} from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Music library — every music book (levels 1–3) and every notation sheet
 * (6 songs × keyboard/ukulele/drums × levels 1–3), all opening in the in-page
 * flip viewer. Rendered on the library page for music/admin scope.
 */

const INSTRUMENT_ICON: Record<MusicInstrumentId, LucideIcon> = {
  keys: Piano,
  ukulele: Guitar,
  drums: Drum,
};
const LEVELS = [1, 2, 3] as const;

export function MusicLibrarySection() {
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );

  return (
    <section className="space-y-4">
      <h2 className="text-[15px] font-extrabold lowercase text-ink">
        music — books &amp; sheet music
      </h2>

      {/* Level books */}
      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.06em] text-brand-orange">
          level books
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() =>
                setOpenPdf({
                  url: `/music/music-book-l${lvl}.pdf`,
                  title: `music book · level ${lvl}`,
                })
              }
              className="flex items-center gap-3 rounded-2xl bg-brand-white p-3 text-left shadow-card ring-1 ring-ink/[0.06] transition hover:ring-brand-orange/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/experience-books/covers/music-book-l${lvl}.png`}
                alt={`music book level ${lvl}`}
                className="h-16 w-auto rounded bg-brand-cream object-contain"
              />
              <span className="flex-1">
                <span className="block text-[13px] font-extrabold lowercase text-ink">
                  music book · level {lvl}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange">
                  <BookOpen className="h-3.5 w-3.5" /> flip through
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notation sheets */}
      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.06em] text-brand-orange">
          sheet music — tap an instrument &amp; level
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MUSIC_SONGS.map((song) => (
            <div
              key={song.slug}
              className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
            >
              <p className="text-[13.5px] font-extrabold lowercase text-ink">
                {song.title.toLowerCase()}
              </p>
              <div className="mt-2.5 space-y-1.5">
                {MUSIC_INSTRUMENTS.map((inst) => {
                  const Icon = INSTRUMENT_ICON[inst.id];
                  return (
                    <div key={inst.id} className="flex items-center gap-2">
                      <Icon
                        className="h-3.5 w-3.5 shrink-0 text-ink-muted"
                        strokeWidth={2.2}
                      />
                      <span className="w-[62px] shrink-0 text-[11px] font-semibold text-ink-muted">
                        {inst.label}
                      </span>
                      <div className="flex gap-1">
                        {LEVELS.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() =>
                              setOpenPdf({
                                url: musicNotationUrl(song.slug, inst.id, lvl),
                                title: `${song.title} · ${inst.label} · level ${lvl}`,
                              })
                            }
                            className="inline-flex h-6 min-w-[26px] items-center justify-center rounded-md bg-brand-orange/10 px-1.5 text-[11px] font-extrabold text-brand-orange transition hover:bg-brand-orange hover:text-white"
                          >
                            L{lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board games (OH game PDFs used in warm-ups) */}
      {(() => {
        const games = MUSIC_WARMUPS.flatMap((w) =>
          w.resources
            .filter((r) => r.pdf)
            .map((r) => ({ name: w.name, label: r.label, pdf: r.pdf! }))
        );
        if (games.length === 0) return null;
        return (
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.06em] text-brand-orange">
              warm-up games
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((g) => (
                <button
                  key={g.pdf}
                  type="button"
                  onClick={() => setOpenPdf({ url: g.pdf, title: g.name })}
                  className="flex items-center gap-2 rounded-2xl bg-brand-white p-4 text-left shadow-card ring-1 ring-ink/[0.06] transition hover:ring-brand-orange/40"
                >
                  <Piano className="h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />
                  <span className="text-[12.5px] font-bold text-ink">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </section>
  );
}
