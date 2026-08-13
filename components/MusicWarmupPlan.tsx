"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MUSIC_WARMUPS, type MusicWarmup } from "@/content/programmes/music-levels";
import { PdfFlipbookModal } from "@/components/PdfFlipbookModal";

/**
 * Warm-up for the day plan — each class is ONE warm-up, either a vocal or a
 * rhythm one, picked from a single dropdown. Rotation: once picked it is
 * blocked until every other warm-up (vocal and rhythm) has been used, then the
 * pool resets. The selected warm-up shows its resource links (Spotify/apps open
 * a tab; OH game PDFs open the flip viewer).
 */

function GroupTag({ group }: { group: MusicWarmup["group"] }) {
  return (
    <span
      className={cn(
        "rounded-chip px-1.5 py-0.5 text-[9px] font-bold lowercase",
        group === "vocal"
          ? "bg-segment-green/25 text-ink"
          : "bg-segment-yellow/30 text-ink"
      )}
    >
      {group}
    </span>
  );
}

export function MusicWarmupPlan() {
  const items = MUSIC_WARMUPS;
  const [selected, setSelected] = useState<MusicWarmup>(items[0]);
  const [history, setHistory] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string } | null>(
    null
  );

  const isBlocked = (name: string) => {
    if (history.length === 0) return false;
    if (history.length >= items.length - 1) return false;
    return history.includes(name);
  };

  const pick = (w: MusicWarmup) => {
    setSelected(w);
    setOpen(false);
    setHistory((prev) => {
      const next = [...prev, w.name];
      return next.length >= items.length ? [] : next;
    });
  };

  return (
    <div className="mt-2">
      <p className="text-[11px] italic leading-relaxed text-ink-muted">
        each class is one warm-up — a vocal or a rhythm one. it rotates, and
        won&apos;t repeat until every warm-up has been used.
      </p>

      <div className="relative mt-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-ink/10 bg-ink/[0.02] px-3 py-2 text-left transition hover:bg-ink/[0.04]"
        >
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            <GroupTag group={selected.group} />
            <span className="truncate text-[12px] font-medium text-ink">
              {selected.name}
            </span>
          </span>
          <span className="shrink-0 rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-semibold tracking-normal text-ink-muted">
            rotates · {items.length}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-ink-subtle transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-card border border-ink/10 bg-brand-white shadow-float">
            <div className="border-b border-ink/5 px-3 py-1.5 text-[9px] text-ink-subtle">
              {items.length - history.length} of {items.length} available · once
              chosen it can&apos;t be picked again until every other one has been used
            </div>
            {items.map((w) => {
              const blocked = isBlocked(w.name);
              return (
                <button
                  key={w.name}
                  type="button"
                  onClick={() => !blocked && pick(w)}
                  disabled={blocked}
                  className={cn(
                    "flex w-full items-center gap-1.5 px-3 py-2 text-left text-[12px] transition",
                    blocked ? "cursor-not-allowed opacity-35" : "hover:bg-ink/[0.03]",
                    w.name === selected.name ? "font-semibold text-brand-orange" : "text-ink"
                  )}
                >
                  <GroupTag group={w.group} />
                  {w.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected warm-up — its how-to + resource links */}
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-muted">
        {selected.detail}
      </p>
      {selected.resources.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {selected.resources.map((r) =>
            r.pdf ? (
              <button
                key={r.label}
                type="button"
                onClick={() => setOpenPdf({ url: r.pdf!, title: selected.name })}
                className="rounded-md bg-brand-orange/10 px-2 py-0.5 text-[10.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
              >
                {r.label}
              </button>
            ) : r.url ? (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-brand-orange/10 px-2 py-0.5 text-[10.5px] font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white"
              >
                {r.label} ↗
              </a>
            ) : null
          )}
        </div>
      )}

      <PdfFlipbookModal pdf={openPdf} onClose={() => setOpenPdf(null)} />
    </div>
  );
}
