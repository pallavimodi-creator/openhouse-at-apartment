"use client";

import { cn } from "@/lib/utils";
import {
  MUSIC_SONGS,
  MUSIC_INSTRUMENTS,
  musicNotationUrl,
  type MusicSong,
} from "@/content/programmes/music-levels";

/**
 * Music — songs & sheet music.
 *
 * Two shelves:
 *  1. play together — the 6 "songs of the term". One song runs across a
 *     whole term (~3 months); the group performs it every three months, in a
 *     fixed order. Each child reads their own instrument's sheet at their level.
 *  2. extra practice — 6 harder songs for individual-instrument time, given to
 *     a child who has finished their level book (a harder song, or a harder
 *     level of a song they already know).
 *
 * Every song ships a notation sheet per instrument (keyboard · ukulele ·
 * drums) and per level (1–4) — files live in public/music/notation/.
 */

const TIER_STYLE: Record<MusicSong["tier"], string> = {
  easy: "bg-segment-green/20 text-ink",
  intermediate: "bg-segment-yellow/30 text-ink",
  hard: "bg-brand-orange/15 text-brand-orange",
};

const LEVELS = [1, 2, 3, 4] as const;

function SongCard({ song, order }: { song: MusicSong; order?: number }) {
  return (
    <div className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]">
      <div className="flex items-baseline justify-between gap-2">
        <p className="flex items-baseline gap-1.5 text-[14px] font-extrabold lowercase text-ink">
          {order != null && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-extrabold not-italic text-brand-orange">
              {order}
            </span>
          )}
          {song.title.toLowerCase()}
        </p>
        <span
          className={cn(
            "shrink-0 rounded-chip px-2 py-0.5 text-[10px] font-extrabold lowercase",
            TIER_STYLE[song.tier]
          )}
        >
          {song.tier}
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        {MUSIC_INSTRUMENTS.map((inst) => (
          <div key={inst.id} className="flex items-center gap-2">
            <span className="w-[68px] shrink-0 text-[11px] font-semibold text-ink-muted">
              {inst.label}
            </span>
            <div className="flex flex-wrap gap-1">
              {LEVELS.map((lvl) => (
                <a
                  key={lvl}
                  href={musicNotationUrl(song.slug, inst.id, lvl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${song.title} — ${inst.label}, level ${lvl}`}
                  className={cn(
                    "inline-flex h-6 min-w-[26px] items-center justify-center rounded-md px-1.5 text-[11px] font-extrabold transition",
                    lvl <= 3
                      ? "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white"
                      : "bg-ink/[0.05] text-ink-muted hover:bg-ink/10"
                  )}
                >
                  L{lvl}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MusicSongsSection() {
  const termSongs = MUSIC_SONGS.filter((s) => s.ensemble);
  const extraSongs = MUSIC_SONGS.filter((s) => !s.ensemble);

  return (
    <section className="mt-10 px-4 md:px-8">
      <h2 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
        songs &amp; sheet music
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
        every song has a notation sheet for each instrument (keyboard · ukulele
        · drums) and each level. tap a level to open that part.
      </p>

      {/* play together — songs of the term */}
      <div className="mt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
          play together — songs of the term
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          one song runs across a whole term (~3 months) and the group performs
          it every three months, in this order. each child plays their own
          instrument&apos;s sheet at their level.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {termSongs.map((song, i) => (
            <SongCard key={song.slug} song={song} order={i + 1} />
          ))}
        </div>
      </div>

      {/* extra practice — individual-instrument time */}
      <div className="mt-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
          extra practice — for your-instrument time
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
          once a child finishes their level book, hand them a harder song — or a
          harder level of a song they already know — to practise on their own
          instrument.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {extraSongs.map((song) => (
            <SongCard key={song.slug} song={song} />
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] italic leading-relaxed text-ink-muted">
        levels 1–3 follow the programme; level 4 (L4) sheets are the hardest —
        use them for extra practice once a child is secure at their level.
      </p>
    </section>
  );
}
