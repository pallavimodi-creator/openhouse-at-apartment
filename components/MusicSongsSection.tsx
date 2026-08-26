"use client";

import { useState } from "react";
import { Piano, Guitar, Drum } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MUSIC_BAND_SONGS_BY_LEVEL,
  MUSIC_PRACTICE_SONGS,
  MUSIC_INSTRUMENTS,
  MUSIC_ENSEMBLE_CYCLE,
  musicNotationUrl,
  type MusicInstrumentId,
} from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Music — songs & sheet music (per level).
 *
 * Two things are deliberately separate:
 *  • the level BOOK → used in individual "instrument rotation" time (each
 *    child works through their own book on their instrument).
 *  • the SHEET MUSIC below → used in "ensemble / band" time.
 *
 * Rule: a child performs the band song at the SAME level they are on in
 * their book, so the sheets shown here are for THIS level. Sheets open in an
 * in-page flip viewer — nothing to download.
 */

const INSTRUMENT_ICON: Record<MusicInstrumentId, LucideIcon> = {
  keys: Piano,
  ukulele: Guitar,
  drums: Drum,
};

export function MusicSongsSection({ level }: { level: number }) {
  const bandSongs = MUSIC_BAND_SONGS_BY_LEVEL[level] ?? [];
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );

  function InstrumentSheets({ slug, title }: { slug: string; title: string }) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {MUSIC_INSTRUMENTS.map((inst) => {
          const Icon = INSTRUMENT_ICON[inst.id];
          return (
            <button
              key={inst.id}
              type="button"
              onClick={() =>
                setOpenPdf({
                  url: musicNotationUrl(slug, inst.id, level),
                  title: `${title} · ${inst.label} · level ${level}`,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-orange/10 px-2.5 py-1 text-[11.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
              {inst.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section className="mt-10 px-4 md:px-8">
      <h2 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
        songs &amp; sheet music
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
        the <span className="font-semibold text-ink">level book</span> is what a
        child works through in individual instrument time. the{" "}
        <span className="font-semibold text-ink">sheet music</span> below is for
        band (ensemble) time — and each child plays their part at{" "}
        <span className="font-semibold text-ink">level {level}</span>, the level
        they&apos;re on in their book. tap an instrument to flip through the sheet.
      </p>

      {/* play together — the band */}
      <div className="mt-6">
        <p className="text-[11px] font-bold tracking-[0.06em] text-brand-orange">
          play together — the band
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          the group learns the song across the term and performs it — as a band
          and with individual performances — roughly every two months.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {bandSongs.map((song) => (
            <div
              key={song.slug}
              className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-extrabold lowercase text-ink">
                  {song.title.toLowerCase()}
                </p>
                <span
                  className={
                    song.perform
                      ? "shrink-0 rounded-chip bg-brand-orange/15 px-2 py-0.5 text-[10px] font-extrabold lowercase text-brand-orange"
                      : "shrink-0 rounded-chip bg-ink/[0.06] px-2 py-0.5 text-[10px] font-extrabold lowercase text-ink-muted"
                  }
                >
                  {song.perform ? "performed" : "practice only"}
                </span>
              </div>
              <p className="mt-1 text-[12px] italic leading-relaxed text-ink-muted">
                {song.performLabel}
              </p>
              <InstrumentSheets slug={song.slug} title={song.title} />
            </div>
          ))}
        </div>
      </div>

      {/* how the band song is built, week by week */}
      <div className="mt-8">
        <p className="text-[11px] font-bold tracking-[0.06em] text-brand-orange">
          how the band song comes together
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          in the ~25 minutes of ensemble time each class, the group builds one
          song up in layers — voice first, then keys, then ukulele &amp; drums,
          then everyone together — across roughly eight weeks, closing with a
          performance.
        </p>
        <ol className="mt-4 space-y-3">
          {MUSIC_ENSEMBLE_CYCLE.map((wk) => (
            <li
              key={wk.weeks}
              className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="shrink-0 rounded-chip bg-brand-orange/15 px-2 py-0.5 text-[10px] font-extrabold lowercase text-brand-orange">
                  {wk.weeks}
                </span>
                <span className="text-[13.5px] font-extrabold lowercase text-ink">
                  {wk.focus}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {wk.activities.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-muted"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-orange/70" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              {wk.teacherNote && (
                <p className="mt-2 text-[12px] italic leading-relaxed text-ink-muted">
                  {wk.teacherNote}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* extra practice */}
      <div className="mt-8">
        <p className="text-[11px] font-bold tracking-[0.06em] text-brand-orange">
          extra practice
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          for individual-instrument time, once a child has finished their book
          work — two extra songs to enjoy.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {MUSIC_PRACTICE_SONGS.map((song) => (
            <div
              key={song.slug}
              className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
            >
              <p className="text-[14px] font-extrabold lowercase text-ink">
                {song.title.toLowerCase()}
              </p>
              <InstrumentSheets slug={song.slug} title={song.title} />
            </div>
          ))}
        </div>
      </div>

      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </section>
  );
}
