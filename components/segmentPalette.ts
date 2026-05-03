/**
 * Segment palette — single source of truth for segment-coloured surfaces.
 *
 * Every overview, day plan, library card, and segment popup that needs to
 * tint a surface by segment should call segmentPalette(segmentId) and read
 * from the returned tonal pack. No more hex literals, no more random
 * Tailwind palette utilities (bg-violet-200 / text-amber-900 / etc).
 *
 * Mapping uses the brand colours defined in tailwind.config.ts under
 * colors.segment.* — same hex values as the original category-* tokens
 * but named by the segment role they play across all programmes.
 *
 *   yellow → art-gym · roll-call · experiment
 *   green  → art-games · playground · build
 *   blue   → artiverse · artistotle · showtime
 *   pink   → log-book · experience-book
 *   orange → art-care · accents
 *
 * The same segment id can mean different things across programmes (e.g.
 * "experiment" only exists in robotics) — but the tone we paint it stays
 * consistent so a teacher can read the page without learning new colours.
 */

export type SegmentTone = "yellow" | "green" | "blue" | "pink" | "orange";

export interface SegmentPalette {
  /** Tailwind class for the saturated fill — used on small chips. */
  fill: string;
  /** Tailwind class for the soft tinted background — used on card bodies. */
  soft: string;
  /** Tailwind class for the subtle ring/border. */
  ring: string;
  /** Tailwind class for high-contrast ink (paragraph + heading text on soft bg). */
  text: string;
  /** Tailwind class for muted ink (secondary copy). */
  textMuted: string;
  /** Inline style colour string when the className path won't work. */
  hex: string;
  /** The named tone this id resolves to, useful for grouping in UI. */
  tone: SegmentTone;
}

const HEX: Record<SegmentTone, string> = {
  yellow: "#F3C520",
  green: "#A3C996",
  blue: "#7DBBE2",
  pink: "#EDAAB0",
  orange: "#F2643D",
};

const TONE: Record<SegmentTone, Omit<SegmentPalette, "tone">> = {
  yellow: {
    fill: "bg-segment-yellow",
    soft: "bg-segment-yellow/15",
    ring: "ring-segment-yellow/40",
    text: "text-ink",
    textMuted: "text-ink-muted",
    hex: HEX.yellow,
  },
  green: {
    fill: "bg-segment-green",
    soft: "bg-segment-green/20",
    ring: "ring-segment-green/45",
    text: "text-ink",
    textMuted: "text-ink-muted",
    hex: HEX.green,
  },
  blue: {
    fill: "bg-segment-blue",
    soft: "bg-segment-blue/20",
    ring: "ring-segment-blue/45",
    text: "text-ink",
    textMuted: "text-ink-muted",
    hex: HEX.blue,
  },
  pink: {
    fill: "bg-segment-pink",
    soft: "bg-segment-pink/30",
    ring: "ring-segment-pink/50",
    text: "text-ink",
    textMuted: "text-ink-muted",
    hex: HEX.pink,
  },
  orange: {
    fill: "bg-brand-orange",
    soft: "bg-brand-orange/10",
    ring: "ring-brand-orange/30",
    text: "text-ink",
    textMuted: "text-ink-muted",
    hex: HEX.orange,
  },
};

const SEGMENT_TO_TONE: Record<string, SegmentTone> = {
  // Yellow — opening / warm-up / discovery
  "art-gym": "yellow",
  "roll-call": "yellow",
  experiment: "yellow",

  // Green — making / playing / hands-on
  "art-games": "green",
  playground: "green",
  build: "green",

  // Blue — main body of the session, deep work
  artiverse: "blue",
  artistotle: "blue",
  showtime: "blue",

  // Pink — closing / log book / reflection
  "log-book": "pink",
  "experience-book": "pink",

  // Orange — accents, art care
  "art-care": "orange",
  "sign-off": "orange",
};

const FALLBACK: SegmentPalette = { ...TONE.pink, tone: "pink" };

export function segmentPalette(segmentId: string): SegmentPalette {
  const tone = SEGMENT_TO_TONE[segmentId];
  if (!tone) return FALLBACK;
  return { ...TONE[tone], tone };
}

export function segmentToneHex(segmentId: string): string {
  return segmentPalette(segmentId).hex;
}
