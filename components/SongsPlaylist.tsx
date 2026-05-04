"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { ProgrammeSong } from "@/content/types";

/**
 * Songs playlist — renders an ordered list of YouTube-backed songs as
 * click-to-play cards. The thumbnail loads first; tapping replaces it
 * with the embedded `youtube-nocookie.com` iframe so the page doesn't
 * spawn five players on first paint.
 */
export function SongsPlaylist({
  songs,
  channelLabel = "Barefoot Books",
}: {
  songs: ProgrammeSong[];
  /** Small attribution under each card. */
  channelLabel?: string;
}) {
  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <SongCard key={song.youtubeId} song={song} channelLabel={channelLabel} />
      ))}
    </div>
  );
}

function SongCard({
  song,
  channelLabel,
}: {
  song: ProgrammeSong;
  channelLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${song.youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0&modestbranding=1&autoplay=1`;
  const thumbUrl = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;

  return (
    <div className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
      {/* Top-of-card index + title strip */}
      <div className="flex items-center gap-3 bg-segment-yellow/30 px-4 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-[12px] font-extrabold text-ink">
          {song.order}
        </span>
        <p className="flex-1 text-[14px] font-extrabold leading-tight text-ink">
          {song.title.toLowerCase()}
        </p>
        <span className="text-[10px] font-bold tracking-normal text-ink-muted">
          {channelLabel.toLowerCase()}
        </span>
      </div>

      {/* Player or click-to-play poster */}
      {playing ? (
        <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            title={song.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block w-full bg-black/5"
          style={{ paddingBottom: "56.25%" }}
          aria-label={`Play ${song.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg ring-4 ring-white/40 transition group-hover:scale-105 group-active:scale-95">
              <Play className="h-6 w-6 fill-white" strokeWidth={0} />
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded-chip bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
            tap to play
          </span>
        </button>
      )}

      {/* Card body — sentence-case body copy per brand guide */}
      <div className="space-y-2 p-4">
        <div>
          <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
            What it builds
          </p>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
            {song.whatItBuilds}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
              Pairs with
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {song.pairsWith}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
              When to introduce
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {song.introHint}
            </p>
          </div>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] font-semibold text-brand-orange hover:underline"
        >
          Open on YouTube ↗
        </a>
      </div>
    </div>
  );
}
