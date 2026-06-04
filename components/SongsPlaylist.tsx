"use client";

import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgrammeSong } from "@/content/types";

/**
 * Songs list — collapsed accordion rows by default. Tap a row to
 * expand and see the YouTube player and the teacher-facing meta.
 */
export function SongsPlaylist({ songs }: { songs: ProgrammeSong[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
      <ul className="divide-y divide-ink/5">
        {songs.map((song) => (
          <li key={song.youtubeId}>
            <SongRow
              song={song}
              isOpen={openId === song.youtubeId}
              onToggle={() =>
                setOpenId(openId === song.youtubeId ? null : song.youtubeId)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SongRow({
  song,
  isOpen,
  onToggle,
}: {
  song: ProgrammeSong;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${song.youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0&modestbranding=1&autoplay=1`;
  const thumbUrl = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center gap-3 px-3 py-2.5 text-left transition",
          isOpen ? "bg-segment-yellow/15" : "hover:bg-ink/[0.03]"
        )}
      >
        {/* Compact thumb */}
        <div className="relative h-[44px] w-[68px] shrink-0 overflow-hidden rounded bg-ink/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/15">
            <Play className="h-4 w-4 fill-white text-white" strokeWidth={0} />
          </span>
        </div>

        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-extrabold text-brand-orange">
          {song.order}
        </span>

        <p className="min-w-0 flex-1 truncate text-[13px] font-extrabold leading-tight text-ink">
          {song.title.toLowerCase()}
        </p>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-ink/50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="space-y-3 bg-segment-yellow/15 px-4 pb-4 pt-1">
          {/* Player or click-to-play poster */}
          {playing ? (
            <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingBottom: "56.25%" }}>
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
              className="group relative block w-full overflow-hidden rounded-xl bg-black/5"
              style={{ paddingBottom: "56.25%" }}
              aria-label={`Play ${song.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg ring-4 ring-white/40 transition group-hover:scale-105 group-active:scale-95">
                  <Play className="h-5 w-5 fill-white" strokeWidth={0} />
                </span>
              </span>
              <span className="absolute bottom-2 right-2 rounded-chip bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
                tap to play
              </span>
            </button>
          )}

          <div>
            <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
              What it builds
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
              {song.whatItBuilds}
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
              <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
                Pairs with
              </p>
              <p className="mt-1 text-[11.5px] font-semibold text-ink">
                {song.pairsWith}
              </p>
            </div>
            <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
              <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
                When to introduce
              </p>
              <p className="mt-1 text-[11.5px] font-semibold text-ink">
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
      )}
    </div>
  );
}
