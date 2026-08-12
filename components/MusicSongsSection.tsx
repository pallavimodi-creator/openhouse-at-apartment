"use client";

import {
  MUSIC_BAND_SONGS_BY_LEVEL,
  MUSIC_PRACTICE_SONGS,
  MUSIC_INSTRUMENTS,
  musicNotationUrl,
} from "@/content/programmes/music-levels";

/**
 * Music — songs & sheet music (per level).
 *
 * Two things are deliberately separate:
 *  • the level BOOK → used in individual "instrument rotation" time (each
 *    child works through their own book on their instrument).
 *  • the SHEET MUSIC below → used in "ensemble / band" time.
 *
 * Rule: a child performs the band song at the SAME level they are on in
 * their book, so the sheets shown here are for THIS level.
 *
 * Play-together (band) songs are assigned per level; performances happen
 * roughly every two months (group + individual). The only extra-practice
 * songs at levels 1–3 are Yellow Submarine and Count On Me.
 */

function InstrumentSheets({ slug, level }: { slug: string; level: number }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {MUSIC_INSTRUMENTS.map((inst) => (
        <a
          key={inst.id}
          href={musicNotationUrl(slug, inst.id, level)}
          target="_blank"
          rel="noopener noreferrer"
          title={`${inst.label} sheet — level ${level}`}
          className="inline-flex items-center gap-1 rounded-md bg-brand-orange/10 px-2.5 py-1 text-[11.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
        >
          {inst.label} sheet →
        </a>
      ))}
    </div>
  );
}

export function MusicSongsSection({ level }: { level: number }) {
  const bandSongs = MUSIC_BAND_SONGS_BY_LEVEL[level] ?? [];

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
        they&apos;re on in their book.
      </p>

      {/* play together — the band */}
      <div className="mt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
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
              <p className="text-[14px] font-extrabold lowercase text-ink">
                {song.title.toLowerCase()}
              </p>
              <p className="mt-1 text-[12px] italic leading-relaxed text-ink-muted">
                {song.performLabel}
              </p>
              <InstrumentSheets slug={song.slug} level={level} />
            </div>
          ))}
        </div>
      </div>

      {/* extra practice */}
      <div className="mt-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
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
              <InstrumentSheets slug={song.slug} level={level} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
