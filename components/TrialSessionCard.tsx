"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import type { TrialSession, TrialSessionSegment } from "@/content/types";

function Segment({ segment }: { segment: TrialSessionSegment }) {
  return (
    <div className="rounded-card bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-extrabold text-ink">{segment.name}</p>
        <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
          {segment.time}
        </span>
      </div>

      {segment.heroImageUrl && (
        <div className="mt-3 flex h-44 items-center justify-center overflow-hidden rounded-lg bg-ink/[0.02]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={segment.heroImageUrl}
            alt={segment.name}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      {segment.objective && (
        <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
          {segment.objective}
        </p>
      )}

      {segment.setupLine && (
        <div className="mt-3 rounded-lg bg-brand-orange/5 p-3">
          <p className="text-[10px] font-semibold tracking-wider text-brand-orange">
            setup line
          </p>
          <p className="mt-1 text-[12px] italic leading-relaxed text-ink">
            &ldquo;{segment.setupLine}&rdquo;
          </p>
        </div>
      )}

      {segment.howToPlay && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            how to play
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink">
            {segment.howToPlay}
          </p>
        </div>
      )}

      {segment.example && (
        <div className="mt-3 rounded-lg bg-ink/[0.03] p-3">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            example
          </p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
            {segment.example}
          </p>
        </div>
      )}

      {segment.activities && segment.activities.length > 0 && (
        <div className="mt-3 space-y-3">
          {segment.activities.map((a, i) => (
            <div key={i} className="rounded-lg bg-ink/[0.03] p-3">
              <p className="text-[13px] font-bold text-ink">{a.name}</p>
              {a.heroImageUrl && (
                <div className="mt-2 flex h-44 items-center justify-center overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.heroImageUrl}
                    alt={a.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              {a.setupLine && (
                <p className="mt-2 text-[11px] italic leading-relaxed text-ink-muted">
                  &ldquo;{a.setupLine}&rdquo;
                </p>
              )}
              <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink/70">how to play: </span>
                {a.howToPlay}
              </p>
              {a.extra && (
                <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
                  {a.extra}
                </p>
              )}
              {a.materials && (
                <p className="mt-1.5 text-[10px] text-ink-subtle">
                  <span className="font-semibold">materials: </span>
                  {a.materials}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {segment.variations && segment.variations.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            variations
          </p>
          <ul className="mt-1 space-y-1">
            {segment.variations.map((v, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-subtle" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      {segment.difficulty && segment.difficulty.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            difficulty
          </p>
          <ul className="mt-1 space-y-1">
            {segment.difficulty.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-subtle" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {segment.speakingTable && segment.speakingTable.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-lg bg-ink/[0.02]">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-ink/10 text-left text-ink/50">
                <th className="px-3 py-1.5 font-semibold">speaking time</th>
                <th className="px-3 py-1.5 font-semibold">steps moved</th>
              </tr>
            </thead>
            <tbody>
              {segment.speakingTable.map((row, i) => (
                <tr key={i} className="border-b border-ink/5 last:border-0">
                  <td className="px-3 py-1.5 text-ink-muted">{row.speakingTime}</td>
                  <td className="px-3 py-1.5 font-medium text-ink">{row.stepsMoved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {segment.materials && segment.materials.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
            materials
          </p>
          <ul className="mt-1 space-y-1">
            {segment.materials.map((m, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-subtle" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {segment.debrief && (
        <div className="mt-3 rounded-lg bg-category-language/10 p-3">
          <p className="text-[10px] font-semibold tracking-wider text-green-800">
            debrief
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink">
            {segment.debrief}
          </p>
        </div>
      )}
    </div>
  );
}

export function TrialSessionCard({ trial }: { trial: TrialSession }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-card bg-gradient-to-br from-brand-orange to-[#C44017] p-4 text-left text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
      >
        <Sparkles className="h-6 w-6 shrink-0" strokeWidth={2} />
        <div className="flex-1">
          <p className="text-[10px] font-bold tracking-widest text-white/80">
            trial session · 60 minutes
          </p>
          <p className="text-[14px] font-extrabold">full first-class walkthrough</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <p className="px-1 text-[12px] leading-relaxed text-ink-muted">
            {trial.intro}
          </p>
          <div className="space-y-2">
            {trial.segments.map((s, i) => (
              <Segment key={i} segment={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
