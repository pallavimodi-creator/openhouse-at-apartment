import { cn } from "@/lib/utils";
import { SEGMENT_COLORS } from "@/lib/content";
import {
  Dumbbell,
  Palette,
  Notebook,
  Zap,
  Gamepad2,
  Star,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export interface ArtiverseUnitInfo {
  medium: string;
  technique: string;
  whatChildrenMake: string;
  days: number;
  topicOptions: string[];
  heroImageUrl: string;
  /** Optional reference images shown in a small thumbnail strip below the
   *  hero — e.g. day-2 spreads or alternates. */
  extraImages?: string[];
}

/**
 * Split a description paragraph into readable bullet points.
 * Each sentence becomes its own line. Short strings (one sentence) are
 * returned as-is in a single-item array so the caller can still render
 * a list unconditionally.
 */
function descriptionToBullets(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  // Split on sentence boundary — period/question/exclamation followed by
  // whitespace + a capital letter or an opening quote/dash.
  const parts = trimmed
    .split(/(?<=[.?!])\s+(?=["“”A-Z—])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [trimmed];
}

export interface SegmentInfo {
  segmentId: string;
  segmentName: string;
  title: string;
  description: string;
  subText?: string;
  bookLinkSlug?: string;
  /** Generic call-to-action for primers that don't fit the experience-book
   *  pattern — e.g. the Artistotle book lives at /artistotle-book, not at
   *  /book/[slug]. */
  externalLink?: { href: string; label: string };
  artiverseUnit?: ArtiverseUnitInfo;
  /**
   * Optional hero image for non-artiverse segments (e.g. the art-gym primer
   * shows a gym book cover; the log-book primer shows the experience-book
   * cover for the programme). Falls back to the gradient + icon panel when
   * undefined.
   */
  heroImageUrl?: string;
}

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  "roll-call": <Zap className="h-10 w-10" strokeWidth={1.6} />,
  playground: <Gamepad2 className="h-10 w-10" strokeWidth={1.6} />,
  showtime: <Star className="h-10 w-10" strokeWidth={1.6} />,
  "log-book": <Notebook className="h-10 w-10" strokeWidth={1.6} />,
  "art-gym": <Dumbbell className="h-10 w-10" strokeWidth={1.6} />,
  "art-games": <Gamepad2 className="h-10 w-10" strokeWidth={1.6} />,
  artiverse: <Palette className="h-10 w-10" strokeWidth={1.6} />,
};

const SEGMENT_PANEL: Record<string, string> = {
  "roll-call":
    "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
  playground:
    "linear-gradient(135deg, #A3C996 0%, #6DA35A 100%)",
  showtime:
    "linear-gradient(135deg, #F3C520 0%, #E89A4E 100%)",
  "log-book":
    "linear-gradient(135deg, #FFE1B8 0%, #F8B074 100%)",
  "art-gym":
    "linear-gradient(135deg, #FFD69A 0%, #E89A4E 100%)",
  "art-games":
    "linear-gradient(135deg, #F3C520 0%, #F25E35 100%)",
  artiverse:
    "linear-gradient(135deg, #F8B074 0%, #C44017 100%)",
};

export function SegmentInfoPopup({ info }: { info: SegmentInfo }) {
  const unit = info.artiverseUnit;
  const heroSrc = unit?.heroImageUrl ?? info.heroImageUrl;

  return (
    <div className="flex flex-col gap-5">
      {/* Image panel — shows artwork image if artiverse unit available, else
          any hero image provided (book cover, gym book), else icon panel */}
      {heroSrc ? (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt={unit?.whatChildrenMake ?? info.title}
              className="max-h-64 w-full bg-ink/[0.02] object-contain"
            />
            <span className="absolute left-4 top-4 rounded-chip bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white backdrop-blur-sm">
              {info.segmentName}
            </span>
          </div>
          {unit?.extraImages && unit.extraImages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {unit.extraImages.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={`${unit.medium} reference ${i + 2}`}
                  className="h-24 flex-none rounded-md bg-ink/[0.02] object-contain ring-1 ring-ink/10"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative flex h-44 items-center justify-center overflow-hidden rounded-card text-white"
          style={{
            background:
              SEGMENT_PANEL[info.segmentId] ??
              "linear-gradient(135deg, #F8B074 0%, #F25E35 100%)",
          }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            {SEGMENT_ICONS[info.segmentId] ?? (
              <Star className="h-10 w-10" strokeWidth={1.6} />
            )}
          </div>
          <span className="absolute left-4 top-4 rounded-chip bg-white/25 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-white">
            {info.segmentName}
          </span>
        </div>
      )}

      {/* Title + description */}
      <div>
        <span
          className={cn(
            "inline-block rounded-chip px-2 py-0.5 text-[10px] font-semibold tracking-normal",
            SEGMENT_COLORS[info.segmentId] ?? "bg-ink/10 text-ink-muted"
          )}
        >
          {info.segmentName}
        </span>
        <h2 className="mt-2 text-[22px] font-bold leading-tight text-ink">
          {info.title}
        </h2>
        {info.subText && (
          <p className="mt-1 text-[12px] font-medium text-ink-subtle">
            {info.subText}
          </p>
        )}
        {(() => {
          const bullets = descriptionToBullets(info.description);
          if (bullets.length <= 1) {
            return (
              <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                {info.description}
              </p>
            );
          }
          return (
            <ul className="mt-3 space-y-1.5">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                  <span className="flex-1">{b}</span>
                </li>
              ))}
            </ul>
          );
        })()}
      </div>

      {/* Artiverse-specific details: medium, technique, what-children-make, topic options */}
      {unit && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-card bg-ink/[0.03] p-3">
              <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
                Medium
              </p>
              <p className="mt-1 text-[13px] font-medium text-ink">{unit.medium}</p>
            </div>
            <div className="rounded-card bg-ink/[0.03] p-3">
              <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
                Days
              </p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {unit.days} {unit.days === 1 ? "session" : "sessions"}
              </p>
            </div>
          </div>
          <div className="rounded-card bg-ink/[0.03] p-3">
            <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
              Technique
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              {unit.technique}
            </p>
          </div>
          <div className="rounded-card bg-brand-orange/5 p-3">
            <p className="text-[10px] font-semibold tracking-wider text-brand-orange">
              Reference topic
            </p>
            <p className="mt-1 text-[13px] font-medium text-ink">
              {unit.whatChildrenMake}
            </p>
            <p className="mt-1 text-[11px] italic leading-relaxed text-ink-subtle">
              The picture is a reference only — children pick their own subject.
            </p>
          </div>
          {unit.days > 1 && (
            <div className="rounded-card bg-segment-yellow/40 p-3 ring-1 ring-ink/5">
              <p className="text-[10px] font-semibold tracking-wider text-ink">
                Two days · two different artworks
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                The same medium and technique runs across both sessions, but each
                child makes a new artwork on day 2 — not a continuation of day 1.
              </p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-ink-subtle">
              Reference images
            </p>
            <p className="mt-2 rounded-lg bg-ink/[0.03] px-3 py-2 text-[12px] leading-relaxed text-ink-muted">
              Use cue card of choice to assist with drawing.
            </p>
          </div>
        </div>
      )}

      {info.bookLinkSlug && (
        <Link
          href={`/book/${info.bookLinkSlug}`}
          className="flex items-center justify-center gap-2 rounded-card bg-brand-orange py-3 text-[13px] font-bold text-white shadow-card transition hover:opacity-95 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4" />
          Open experience book
        </Link>
      )}

      {info.externalLink && (
        <Link
          href={info.externalLink.href}
          className="flex items-center justify-center gap-2 rounded-card bg-brand-orange py-3 text-[13px] font-bold text-white shadow-card transition hover:opacity-95 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4" />
          {info.externalLink.label}
        </Link>
      )}
    </div>
  );
}
