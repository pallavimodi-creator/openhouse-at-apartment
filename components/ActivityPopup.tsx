import { cn } from "@/lib/utils";
import { SEGMENT_COLORS, getActivityImage, getActivityVideo } from "@/lib/content";
import type { CurriculumActivity } from "@/content/types";
import {
  Zap,
  Gamepad2,
  Star,
  Notebook,
  Dumbbell,
  Palette,
} from "lucide-react";

const SEGMENT_PANEL_BG: Record<string, string> = {
  "roll-call": "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
  playground: "linear-gradient(135deg, #A3C996 0%, #6DA35A 100%)",
  showtime: "linear-gradient(135deg, #F3C520 0%, #E89A4E 100%)",
  "log-book": "linear-gradient(135deg, #FFE1B8 0%, #F8B074 100%)",
  "art-gym": "linear-gradient(135deg, #FFD69A 0%, #E89A4E 100%)",
  "art-games": "linear-gradient(135deg, #F3C520 0%, #F25E35 100%)",
  artiverse: "linear-gradient(135deg, #F8B074 0%, #C44017 100%)",
};

function SegmentIcon({ segment }: { segment: string }) {
  const c = "h-12 w-12 text-white";
  switch (segment) {
    case "roll-call":
      return <Zap className={c} strokeWidth={1.6} />;
    case "playground":
      return <Gamepad2 className={c} strokeWidth={1.6} />;
    case "showtime":
      return <Star className={c} strokeWidth={1.6} />;
    case "log-book":
      return <Notebook className={c} strokeWidth={1.6} />;
    case "art-gym":
      return <Dumbbell className={c} strokeWidth={1.6} />;
    case "art-games":
      return <Gamepad2 className={c} strokeWidth={1.6} />;
    case "artiverse":
      return <Palette className={c} strokeWidth={1.6} />;
    default:
      return <Star className={c} strokeWidth={1.6} />;
  }
}

/**
 * Extract a YouTube video id from any of the common URL shapes:
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://www.youtube.com/shorts/ID
 *   https://www.youtube.com/embed/ID
 * Returns null if the URL is not a YouTube link we recognise.
 */
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "v") {
        return parts[1] ?? null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Render a materials-list string with any http(s) URLs turned into clickable
 * links. Keeps the rest of the text as plain text. Splits on the URL regex so
 * the result is an alternating sequence of [text, url, text, url, ...].
 */
function linkifyMaterial(text: string): React.ReactNode {
  const urlRe = /https?:\/\/[^\s)]+/g;
  const parts = text.split(urlRe);
  const matches = text.match(urlRe) ?? [];
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, idx) => {
    if (part) nodes.push(<span key={`t${idx}`}>{part}</span>);
    if (idx < matches.length) {
      const url = matches[idx];
      // Detect whether the URL has a human label preceding it in the same line.
      // If the text before the URL ends with "— " or ": " or " " preceded by
      // other words, we treat it as already-labelled and show "open link". If
      // the URL is truly bare (no prefix text), also show "open link" — the
      // raw URL is never a useful label.
      nodes.push(
        <a
          key={`u${idx}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-orange underline underline-offset-2 hover:opacity-80"
        >
          open link
        </a>
      );
    }
  });
  return nodes;
}

type HowToStep = {
  text?: string;
  lead?: string;
  bullets?: string[];
};

/**
 * Parse a dense howToPlay paragraph into numbered steps for readable rendering.
 *
 * Heuristics:
 * 1. Split the paragraph on sentence boundaries (.?! followed by a space and a
 *    capital letter or quote). Preserves sentences that live inside quotes.
 * 2. If any resulting sentence contains " · " (middle-dot separators used in
 *    the content to enumerate sub-items), split that sentence into a lead
 *    clause + bullet list so the reader sees each item on its own line.
 */
function parseHowToPlay(paragraph: string): HowToStep[] {
  const raw = paragraph.trim();
  if (!raw) return [];

  // Split on sentence boundaries — end punctuation + whitespace + capital/quote.
  const sentences = raw
    .split(/(?<=[.?!])\s+(?=["“”A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences.map((sentence): HowToStep => {
    // Middle-dot bullet-style list inside a single sentence.
    if (sentence.includes(" · ")) {
      const parts = sentence.split(" · ").map((p) => p.trim()).filter(Boolean);
      // First part may contain a lead clause like "Ad structure: Hook — ..."
      // Detect lead by presence of a trailing ":" in the first part.
      const first = parts[0];
      const colonIdx = first.indexOf(":");
      if (colonIdx > -1 && colonIdx < first.length - 1) {
        const lead = first.slice(0, colonIdx + 1).trim();
        const firstBullet = first.slice(colonIdx + 1).trim();
        return {
          lead,
          bullets: [firstBullet, ...parts.slice(1)].filter(Boolean),
        };
      }
      return { bullets: parts };
    }
    return { text: sentence };
  });
}

export function ActivityPopup({
  activity,
}: {
  activity: CurriculumActivity;
}) {
  const img = getActivityImage(activity.id);
  const video = getActivityVideo(activity.id);
  // Detect YouTube URLs so we can render a responsive embed instead of a
  // <video> tag. Accepts watch?v=ID, youtu.be/ID, shorts/ID, and embed/ID.
  const youTubeId = video ? extractYouTubeId(video) : null;

  return (
    <div className="flex flex-col gap-5">
      {/* Activity hero — YouTube embed > self-hosted video > image > gradient */}
      {youTubeId ? (
        <div className="relative overflow-hidden rounded-card bg-black">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youTubeId}?rel=0&modestbranding=1`}
              title={activity.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <span className="absolute left-4 top-4 z-10 rounded-chip bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
            {activity.segment.replace("-", " ")}
          </span>
        </div>
      ) : video ? (
        <div className="relative overflow-hidden rounded-card bg-black">
          <video
            src={video}
            poster={img}
            controls
            playsInline
            preload="metadata"
            className="max-h-72 w-full bg-ink/[0.02] object-contain"
          />
          <span className="absolute left-4 top-4 rounded-chip bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
            {activity.segment.replace("-", " ")}
          </span>
        </div>
      ) : img ? (
        <div className="relative overflow-hidden rounded-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={activity.title}
            className="max-h-64 w-full bg-ink/[0.02] object-contain"
          />
          <span className="absolute left-4 top-4 rounded-chip bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
            {activity.segment.replace("-", " ")}
          </span>
        </div>
      ) : (
        <div
          className="relative flex h-44 items-center justify-center overflow-hidden rounded-card text-white"
          style={{
            background:
              SEGMENT_PANEL_BG[activity.segment] ??
              "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
          }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <SegmentIcon segment={activity.segment} />
          </div>
          <span className="absolute left-4 top-4 rounded-chip bg-white/25 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white">
            {activity.segment.replace("-", " ")}
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-chip px-2.5 py-0.5 text-[10px] font-semibold tracking-normal",
              SEGMENT_COLORS[activity.segment] ?? "bg-ink/10 text-ink-muted"
            )}
          >
            {activity.segment.replace("-", " ")}
          </span>
          {activity.cardName && (
            <span className="text-[11px] font-medium text-ink-subtle">
              {activity.cardName} card
            </span>
          )}
        </div>
        <h2 className="mt-2 text-[22px] font-bold leading-tight text-ink">
          {activity.title}
        </h2>
      </div>

      {/* Setup line */}
      <div className="rounded-card bg-brand-orange/5 p-4">
        <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
          Setup line
        </p>
        <p className="mt-1.5 text-[13px] italic leading-relaxed text-ink">
          &ldquo;{activity.setupLine}&rdquo;
        </p>
      </div>

      {/* How to play — parsed into numbered steps for readability */}
      <div>
        <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
          How to play
        </h3>
        <ol className="mt-2 space-y-2">
          {parseHowToPlay(activity.howToPlay).map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-card bg-ink/[0.03] px-3.5 py-2.5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <div className="flex-1 text-[13px] leading-relaxed text-ink">
                {step.bullets ? (
                  <>
                    {step.lead && <p>{step.lead}</p>}
                    <ul className="mt-1.5 space-y-1">
                      {step.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-[12.5px] text-ink-muted"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>{step.text}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Example */}
      {activity.example && (
        <div className="rounded-card bg-ink/[0.03] p-4">
          <p className="text-[10px] font-semibold tracking-normal text-ink-subtle">
            Example
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
            {activity.example}
          </p>
        </div>
      )}

      {/* Variations */}
      {activity.variations && activity.variations.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            Variations
          </h3>
          <div className="mt-2 space-y-2">
            {activity.variations.map((v, i) => (
              <div
                key={i}
                className="rounded-card bg-ink/[0.03] p-3"
              >
                <p className="text-[12px] font-semibold text-ink">
                  {v.name}
                </p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty levels */}
      {activity.difficultyLevels && activity.difficultyLevels.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            Difficulty levels
          </h3>
          <div className="mt-2 space-y-2">
            {activity.difficultyLevels.map((d, i) => {
              // Split on "·" so labels like "Easy · Add an Emotion" render cleanly:
              // the base level goes in the pill, the qualifier goes bold inline
              // in the description. Keeps pill shapes uniform even with long labels.
              const [rawBase, ...rest] = d.level.split("·");
              const base = (rawBase ?? d.level).trim();
              const qualifier = rest.join("·").trim();
              const tone = base.startsWith("Easy")
                ? {
                    pill: "bg-green-100 text-green-700 ring-green-200/60",
                    dot: "bg-green-500",
                  }
                : base.startsWith("Medium")
                  ? {
                      pill: "bg-amber-100 text-amber-700 ring-amber-200/60",
                      dot: "bg-amber-500",
                    }
                  : {
                      pill: "bg-red-100 text-red-700 ring-red-200/60",
                      dot: "bg-red-500",
                    };
              const dots = base.startsWith("Easy")
                ? 1
                : base.startsWith("Medium")
                  ? 2
                  : 3;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-px inline-flex h-6 w-[76px] shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-[10px] font-bold lowercase ring-1 ring-inset",
                      tone.pill
                    )}
                  >
                    <span className="flex gap-[2px]" aria-hidden="true">
                      {Array.from({ length: dots }).map((_, j) => (
                        <span
                          key={j}
                          className={cn("h-[4px] w-[4px] rounded-full", tone.dot)}
                        />
                      ))}
                    </span>
                    <span>{base}</span>
                  </span>
                  <p className="pt-0.5 text-[12px] leading-relaxed text-ink-muted">
                    {qualifier && (
                      <span className="font-semibold text-ink">
                        {qualifier}
                        {" — "}
                      </span>
                    )}
                    {d.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompts */}
      {activity.prompts && activity.prompts.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            {activity.promptHeading ?? "Prompt bank"}
          </h3>
          <ol className="mt-2 space-y-1.5">
            {activity.prompts.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-lg bg-ink/[0.03] px-3 py-2 text-[12px] leading-relaxed text-ink"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-bold text-brand-orange">
                  {i + 1}
                </span>
                <span className="flex-1">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Materials — pdfUrl auto-appended as a clickable reference link */}
      {(() => {
        const materials = [...(activity.materials ?? [])];
        if (activity.pdfUrl) {
          // Derive a readable label — "L1 Levers cue cards (PDF)"
          const label = activity.cardName
            ? `${activity.cardName} cue card (PDF)`
            : `reference (PDF)`;
          materials.push(`${label} — ${activity.pdfUrl}`);
        }
        if (materials.length === 0) return null;
        return (
          <div>
            <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
              Materials
            </h3>
            <ul className="mt-2 space-y-1">
              {materials.map((m, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12px] text-ink-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-subtle" />
                  <span className="flex-1">{linkifyMaterial(m)}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })()}

      {/* Debrief */}
      {activity.debriefPrompts.length > 0 && (
        <div className="rounded-card bg-category-language/10 p-4">
          <h3 className="text-[10px] font-semibold tracking-normal text-green-800">
            Debrief
          </h3>
          {activity.debriefPrompts.map((d, i) => (
            <div key={i} className="mt-2 space-y-1.5">
              {d.questions && d.questions.length > 0 ? (
                <ul className="space-y-1">
                  {d.questions.map((q, j) => {
                    const trimmed = q.trim();
                    // Section heading heuristic: ends in ":" or is short ALL-CAPS
                    const isHeading =
                      trimmed.endsWith(":") ||
                      (trimmed.length <= 40 &&
                        trimmed === trimmed.toUpperCase() &&
                        /[A-Z]/.test(trimmed));
                    if (isHeading) {
                      return (
                        <li
                          key={j}
                          className="mt-2 text-[11px] font-bold lowercase text-brand-orange first:mt-0"
                        >
                          {trimmed.replace(/:$/, "")}
                        </li>
                      );
                    }
                    return (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[12px] leading-relaxed text-ink"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-800/40" />
                        <span className="flex-1">{trimmed}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <>
                  {d.notice && (
                    <p className="text-[12px] leading-relaxed text-ink">
                      <span className="font-semibold">notice:</span> {d.notice}
                    </p>
                  )}
                  {d.name && (
                    <p className="text-[12px] leading-relaxed text-ink">
                      <span className="font-semibold">name:</span> {d.name}
                    </p>
                  )}
                  {d.connect && (
                    <p className="text-[12px] leading-relaxed text-ink">
                      <span className="font-semibold">connect:</span> {d.connect}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
