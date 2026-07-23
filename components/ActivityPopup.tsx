import { cn } from "@/lib/utils";
import { SEGMENT_COLORS, getActivityImage, getActivityVideo } from "@/lib/content";
import type { CurriculumActivity, CurriculumSkillArea } from "@/content/types";
import {
  Zap,
  Gamepad2,
  Star,
  Notebook,
  Dumbbell,
  Palette,
  Users,
  Clock,
  Target,
  Flag,
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
  skillAreas,
}: {
  activity: CurriculumActivity;
  /**
   * Skill areas from the parent programme, used to resolve
   * `activity.skillIds` into chip labels. Omit when the caller
   * doesn't know the programme — the skills chip row simply
   * won't render.
   */
  skillAreas?: CurriculumSkillArea[];
}) {
  // Manual mode is on whenever a game has been authored into the
  // structured shape (goal + steps). Legacy games without these
  // fields keep rendering the parsed how-to-play paragraph.
  const hasManual = !!(activity.goal && activity.steps && activity.steps.length > 0);
  const resolvedSkills =
    activity.skillIds && skillAreas
      ? activity.skillIds
          .map((id) => skillAreas.find((s) => s.id === id))
          .filter((s): s is CurriculumSkillArea => !!s)
      : [];
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

        {/* At-a-glance chip row — only when manual metadata is set */}
        {(activity.players || activity.duration) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {activity.players && (
              <span className="inline-flex items-center gap-1.5 rounded-chip bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                <Users className="h-3 w-3" strokeWidth={2} />
                {activity.players}
              </span>
            )}
            {activity.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-chip bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {activity.duration}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Goal — the one-sentence what-the-child-does. Rendered when
          the game has been authored into the structured manual shape;
          otherwise the classic Setup line still leads. */}
      {activity.goal ? (
        <div className="rounded-card bg-brand-orange/5 p-4">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-normal text-brand-orange">
            <Target className="h-3 w-3" strokeWidth={2.5} />
            the goal
          </p>
          <p className="mt-1.5 text-[13.5px] font-medium leading-relaxed text-ink">
            {activity.goal}
          </p>
        </div>
      ) : (
        <div className="rounded-card bg-brand-orange/5 p-4">
          <p className="text-[10px] font-semibold tracking-normal text-brand-orange">
            Setup line
          </p>
          <p className="mt-1.5 text-[13px] italic leading-relaxed text-ink">
            &ldquo;{activity.setupLine}&rdquo;
          </p>
        </div>
      )}

      {/* How to play — structured numbered steps when the game has
          a hand-written manual; else parse the dense howToPlay
          paragraph the way legacy games do. */}
      <div>
        <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
          how to play
        </h3>
        {hasManual ? (
          <ol className="mt-2 space-y-2 rounded-card bg-ink/[0.03] px-4 py-3">
            {activity.steps!.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[11px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="flex-1">{s}</span>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-2 space-y-2 rounded-card bg-ink/[0.03] px-4 py-3">
            {parseHowToPlay(activity.howToPlay).map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                <div className="flex-1">
                  {step.bullets ? (
                    <>
                      {step.lead && <p>{step.lead}</p>}
                      <ul className="mt-1.5 space-y-1">
                        {step.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-[12.5px] text-ink-muted"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/60" />
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
          </ul>
        )}
      </div>

      {/* Ends when — one-sentence callout right after the steps. */}
      {activity.endsWhen && (
        <div className="flex items-start gap-3 rounded-card bg-category-language/10 p-3">
          <Flag className="mt-0.5 h-4 w-4 shrink-0 text-green-800" strokeWidth={2} />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-normal text-green-800">
              ends when
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink">
              {activity.endsWhen}
            </p>
          </div>
        </div>
      )}

      {/* Easier · Harder — quick classroom-floor pivot for the teacher. */}
      {(activity.easierVariation || activity.harderVariation) && (
        <div className="grid gap-2 md:grid-cols-2">
          {activity.easierVariation && (
            <div className="rounded-card bg-green-50 p-3 ring-1 ring-green-200/60">
              <p className="text-[10px] font-bold tracking-normal text-green-700">
                make it easier
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink">
                {activity.easierVariation}
              </p>
            </div>
          )}
          {activity.harderVariation && (
            <div className="rounded-card bg-amber-50 p-3 ring-1 ring-amber-200/60">
              <p className="text-[10px] font-bold tracking-normal text-amber-700">
                make it harder
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink">
                {activity.harderVariation}
              </p>
            </div>
          )}
        </div>
      )}

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

      {/* Variations — descriptions split on \n render as bullets so
          multi-step variations read cleanly. Single-line descriptions
          keep the original paragraph render. */}
      {activity.variations && activity.variations.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            Variations
          </h3>
          <div className="mt-2 space-y-2">
            {activity.variations.map((v, i) => {
              const lines = v.description.split(/\n+/).map((l) => l.trim()).filter(Boolean);
              const isMultiline = lines.length > 1;
              return (
                <div key={i} className="rounded-card bg-ink/[0.03] p-3">
                  <p className="text-[12px] font-semibold text-ink">
                    {v.name}
                  </p>
                  {isMultiline ? (
                    <ul className="mt-1.5 space-y-1">
                      {lines.map((line, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-muted"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/50" />
                          <span className="flex-1">{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                      {v.description}
                    </p>
                  )}
                </div>
              );
            })}
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
          // Derive a readable label that matches what the educator is
          // holding — "L1 Levers cue card (PDF)" for an experiment,
          // "Soccer Bot model manual (PDF)" for a build.
          const kind =
            activity.segment === "build"
              ? "model manual"
              : activity.segment === "experience-book"
                ? "experience book"
                : "cue card";
          const label = activity.cardName
            ? `${activity.cardName} ${kind} (PDF)`
            : `${kind} (PDF)`;
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

      {/* Reference links — external URLs (tutorials, videos) */}
      {activity.referenceLinks && activity.referenceLinks.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            reference links
          </h3>
          <ul className="mt-2 space-y-1">
            {activity.referenceLinks.map((ref, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-ink"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/60" />
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 font-medium text-brand-orange underline underline-offset-2 hover:opacity-80"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Named blocks — custom titled info blocks (e.g. "wild cards",
          "free play"). Rendered before variations. */}
      {activity.namedBlocks && activity.namedBlocks.length > 0 && (
        <div className="space-y-2">
          {activity.namedBlocks.map((block, i) => {
            const bodyLines = Array.isArray(block.body)
              ? block.body
              : block.body.split(/\n+/).map((l) => l.trim()).filter(Boolean);
            const isMulti = bodyLines.length > 1;
            return (
              <div key={i} className="rounded-card bg-brand-orange/5 p-3 ring-1 ring-brand-orange/15">
                <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                  {block.title}
                </p>
                {isMulti ? (
                  <ul className="mt-1.5 space-y-1">
                    {bodyLines.map((line, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/60" />
                        <span className="flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink">
                    {bodyLines[0]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* educator's note — grouped guidance below variations */}
      {activity.educatorNote && (
        <div className="rounded-card bg-blue-50 p-3 ring-1 ring-blue-200/60">
          <p className="text-[10px] font-bold tracking-normal text-blue-700">
            educator's note
          </p>
          {Array.isArray(activity.educatorNote) ? (
            <ul className="mt-1.5 space-y-1">
              {activity.educatorNote.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500/60" />
                  <span className="flex-1">{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink">
              {activity.educatorNote}
            </p>
          )}
        </div>
      )}

      {/* Skills built — chip footer. Renders only when the caller
          passed skillAreas AND the activity has skillIds that
          resolve. Never invented; empty when unknown. */}
      {resolvedSkills.length > 0 && (
        <div>
          <h3 className="text-[12px] font-semibold tracking-normal text-ink-muted">
            skills built
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {resolvedSkills.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center gap-1.5 rounded-chip bg-brand-orange/10 px-2.5 py-1 text-[11px] font-semibold text-brand-orange ring-1 ring-brand-orange/20"
                title={s.name}
              >
                {s.shortName || s.name}
              </span>
            ))}
          </div>
        </div>
      )}

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
