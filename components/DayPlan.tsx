"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SEGMENT_COLORS, GYM_BOOK_IMAGES, getActivityImage } from "@/lib/content";
import { ChevronDown } from "lucide-react";
import { Modal } from "./Modal";
import { ActivityPopup } from "./ActivityPopup";
import { SegmentInfoPopup, type SegmentInfo } from "./SegmentInfoPopup";
import {
  Brain, Eye, Ear, Hand, Mic, Zap, Gamepad2, Star,
  Dumbbell, Palette, Sparkles, PenTool, Notebook,
  FlaskConical, Wrench, Ribbon,
} from "lucide-react";
import type {
  CurriculumProgramme,
  CurriculumSessionEntry,
  CurriculumActivity,
  ArtiverseUnit,
} from "@/content/types";

const CARD_ICONS: Record<string, React.ReactNode> = {
  Brain: <Brain className="h-3.5 w-3.5" />,
  Body: <Hand className="h-3.5 w-3.5" />,
  Voice: <Mic className="h-3.5 w-3.5" />,
  Eyes: <Eye className="h-3.5 w-3.5" />,
  Ears: <Ear className="h-3.5 w-3.5" />,
};

const PROGRAMME_BOOK_MAP: Record<string, string> = {
  "public-speaking-5-8": "speaking-5-8",
  "public-speaking-8-12": "speaking-8-12",
  "art-design-5-8": "art-5-8",
  "art-design-8-12": "art-8-12",
  "robotics-5-8": "robotics-5-8",
  "robotics-8-12": "robotics-8-12",
};

const PROGRAMME_BOOK_COVER_URL: Record<string, string> = {
  "public-speaking-5-8": "/book-covers/speaking-5-8.png",
  "public-speaking-8-12": "/book-covers/speaking-8-12.png",
  "art-design-5-8": "/book-covers/art-5-8.png",
  "art-design-8-12": "/book-covers/art-8-12.png",
};

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  "roll-call": <Zap className="h-3.5 w-3.5" />,
  playground: <Gamepad2 className="h-3.5 w-3.5" />,
  showtime: <Star className="h-3.5 w-3.5" />,
  "log-book": <Notebook className="h-3.5 w-3.5" />,
  "art-gym": <Dumbbell className="h-3.5 w-3.5" />,
  "art-games": <Gamepad2 className="h-3.5 w-3.5" />,
  artiverse: <Palette className="h-3.5 w-3.5" />,
  experiment: <FlaskConical className="h-3.5 w-3.5" />,
  build: <Wrench className="h-3.5 w-3.5" />,
  "experience-book": <Notebook className="h-3.5 w-3.5" />,
};

// Labels for art-gym cycle positions
const ART_GYM_LABELS: Record<string, string> = {
  "book-3": "book 3 — laminated art gym book",
  "book-4": "book 4 — laminated art gym book",
  "book-5": "book 5 — laminated art gym book",
  "book-6": "book 6 — laminated art gym book",
  "ext-book": "extension (sketchbook) — technique to sketchbook",
  "cue-card-b1": "cue card b1 — step-by-step drawing",
  "cue-card-b2": "cue card b2 — step-by-step drawing",
  "cue-cards": "cue cards — step-by-step drawing",
  "ext-cue-card": "extension (sketchbook) — extend cue card drawing in sketchbook",
  // Ages 3-5 — no cue cards or extensions; just book + scribble book.
  "ag-book-1": "art gym book 1 — laminated, child's choice of material",
  "ag-book-2": "art gym book 2 — laminated, child's choice of material",
  "scribble-book": "scribble book — illustrated prompt page, child draws response",
  flex: "flex — child's choice",
};

interface ResolvedSegment {
  segmentId: string;
  segmentName: string;
  durationRange: string;
  type: "rotating" | "fixed";
  /**
   * One-paragraph description from the programme's segment definition. Read
   * by the day-plan popup so the copy stays in sync with the source of
   * truth (content/programmes/<programme>.ts) without having to update the
   * day-plan component every time a programme tweaks its objective.
   */
  objective: string;
  assignedActivity: CurriculumActivity | null;
  rotationPool: CurriculumActivity[];
  artiverseUnit?: number;
  artiverseDay?: number;
  artiverseUnitName?: string;
  artiverseUnitData?: ArtiverseUnit;
  artGymLabel?: string;
  buildModel?: string;
  buildDay?: number;
  buildDayLabel?: string;
  // Language Through Storytelling — book + day of the 6-day arc
  // for the Book'o'Clock segment, set on the resolved entry only when
  // the session belongs to a language programme.
  bookOrder?: number;
  bookDay?: number;
  bookTitle?: string;
}

// Maps segment IDs to session entry fields
const SEGMENT_FIELD_MAP: Record<string, keyof CurriculumSessionEntry> = {
  "roll-call": "rollCall",
  playground: "playground",
  showtime: "showtime",
  "sign-off": "signOff",
  "art-gym": "artGym",
  "art-games": "artGames",
  artiverse: "artiverse",
  experiment: "experiment",
  build: "build",
  "experience-book": "experienceBook",
  // Language Through Storytelling segments
  "roll-rhyme": "rollRhyme",
  "book-o-clock": "bookOClock",
  wordsmiths: "wordsmiths",
  "play-writes": "playWrites",
};

function resolveSegments(
  programme: CurriculumProgramme,
  session: CurriculumSessionEntry
): ResolvedSegment[] {
  return programme.segmentDefinitions.map((segDef) => {
    const actMap = programme.activities;
    const fieldKey = SEGMENT_FIELD_MAP[segDef.id];
    const assignedId = fieldKey ? (session[fieldKey] as string | undefined) : undefined;

    // For fixed segments (log-book, art-care) or segments without a rotation pool
    if (segDef.type === "fixed") {
      const unitData =
        segDef.id === "artiverse" && session.artiverseUnit !== undefined
          ? programme.artiverseUnits?.find(
              (u) => u.unitNumber === session.artiverseUnit
            )
          : undefined;
      return {
        segmentId: segDef.id,
        segmentName: segDef.name,
        durationRange: segDef.durationRange,
        type: "fixed" as const,
        objective: segDef.objective,
        assignedActivity: null,
        rotationPool: [],
        artiverseUnit: session.artiverseUnit,
        artiverseDay: session.artiverseDay,
        artiverseUnitName: session.artiverseUnitName,
        artiverseUnitData: unitData,
        // Language Book'o'Clock — pass book metadata so the renderer
        // can show "Day N of 6 — [Book Title]" inside the card.
        bookOrder: session.bookOrder,
        bookDay: session.bookDay,
        bookTitle: session.bookTitle,
      };
    }

    // Art Gym is a structural cycle, not activity-based
    if (segDef.id === "art-gym") {
      return {
        segmentId: segDef.id,
        segmentName: segDef.name,
        durationRange: segDef.durationRange,
        type: "fixed" as const,
        objective: segDef.objective,
        assignedActivity: null,
        rotationPool: [],
        artGymLabel: assignedId ? (ART_GYM_LABELS[assignedId] ?? assignedId) : undefined,
      };
    }

    // Robotics "build" segment — thread through session's model/day metadata
    const isBuild = segDef.id === "build";
    return {
      segmentId: segDef.id,
      segmentName: segDef.name,
      durationRange: segDef.durationRange,
      type: segDef.type,
      objective: segDef.objective,
      assignedActivity: assignedId ? (actMap[assignedId] ?? null) : null,
      rotationPool: (segDef.rotationPool ?? []).map((id) => actMap[id]).filter(Boolean),
      buildModel: isBuild ? session.buildModel : undefined,
      buildDay: isBuild ? session.buildDay : undefined,
      buildDayLabel: isBuild ? session.buildDayLabel : undefined,
    };
  });
}

function SegmentRow({
  segment,
  onTapActivity,
  onTapSegmentInfo,
  isTrial,
  bookSlug,
  bookCoverUrl,
  gymBookUrl,
  programmeSlug,
}: {
  segment: ResolvedSegment;
  onTapActivity: (activity: CurriculumActivity) => void;
  onTapSegmentInfo: (info: SegmentInfo) => void;
  isTrial?: boolean;
  bookSlug?: string;
  bookCoverUrl?: string;
  gymBookUrl?: string;
  /** Used to disambiguate 3-5 art's artiverse / artistotle modes from
   *  other programmes' artiverse-only units when building popup info. */
  programmeSlug?: string;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewingActivity, setViewingActivity] = useState<CurriculumActivity | null>(
    segment.assignedActivity
  );
  // Rotation blocking: track which activities have been selected from the dropdown
  // Rule: once selected, cannot be selected again until all others have been used
  const [selectionHistory, setSelectionHistory] = useState<string[]>([]);

  const currentActivity = viewingActivity ?? segment.assignedActivity;

  const isBlocked = (actId: string) => {
    if (selectionHistory.length === 0) return false;
    // If all activities have been used, reset — nothing blocked
    if (selectionHistory.length >= segment.rotationPool.length - 1) return false;
    // Block if already in selection history
    return selectionHistory.includes(actId);
  };

  const handleSelectActivity = (act: CurriculumActivity) => {
    setViewingActivity(act);
    setDropdownOpen(false);
    setSelectionHistory((prev) => {
      const next = [...prev, act.id];
      // If all activities have now been selected, reset history
      if (next.length >= segment.rotationPool.length) {
        return [];
      }
      return next;
    });
  };

  return (
    <div className="rounded-card bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5">
      {/* Segment header */}
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-chip px-2 py-0.5 text-[9px] font-semibold tracking-normal",
              SEGMENT_COLORS[segment.segmentId] ?? "bg-ink/10 text-ink-muted"
            )}
          >
            {SEGMENT_ICONS[segment.segmentId] && (
              <span className="mr-1 inline-flex">{SEGMENT_ICONS[segment.segmentId]}</span>
            )}
            {segment.segmentName}
          </span>
          <span className="text-[11px] text-ink-subtle">
            {segment.durationRange}
          </span>
          {/* Lanyard + debrief reminder — public-speaking ONLY. The
              lanyard system (one ability per segment, child wears
              the focus chip) is a PS programme tool; other
              programmes don't use it. */}
          {programmeSlug?.startsWith("public-speaking") &&
            (segment.segmentId === "playground" ||
              segment.segmentId === "showtime") && (
              <span className="inline-flex items-center gap-1 rounded-chip bg-segment-green/30 px-2 py-0.5 text-[10px] font-semibold text-ink">
                <Ribbon className="h-3 w-3" strokeWidth={2.2} />
                use lanyard + debrief time
              </span>
            )}
        </div>
      </div>

      {/* Activity content */}
      {segment.type === "fixed" ? (
        <button
          onClick={() => {
            let info: SegmentInfo;
            // Description always reads from the programme's segment.objective
            // so updating the source-of-truth in content/programmes/*.ts
            // propagates automatically to this popup.
            const description = segment.objective;
            if (segment.segmentId === "art-gym") {
              info = {
                segmentId: segment.segmentId,
                segmentName: segment.segmentName,
                title: segment.artGymLabel ?? "art gym warm-up",
                description,
                heroImageUrl: gymBookUrl,
              };
            } else if (segment.segmentId === "artiverse") {
              const unit = segment.artiverseUnitData;
              // Use a UNIT-specific description (not the generic
              // segment objective) so the popup says what THIS class
              // is — the technique on the table today, the topic
              // children pick from, and a one-line frame for "what
              // we're making".
              const isArtistotle =
                programmeSlug === "art-design-3-5" && unit?.days === 3;
              const unitDescription = unit
                ? `Today's session uses ${unit.medium.toLowerCase()}. Technique: ${unit.technique.toLowerCase()}. Children make their own piece — reference topic: ${unit.whatChildrenMake.toLowerCase()}.`
                : segment.objective;
              info = {
                segmentId: segment.segmentId,
                segmentName: isArtistotle ? "Artistotle" : "Artiverse",
                title: unit?.medium ?? segment.artiverseUnitName ?? "artiverse",
                subText:
                  segment.artiverseUnit !== undefined && segment.artiverseDay !== undefined && unit
                    ? `${isArtistotle ? "project" : "unit"} ${segment.artiverseUnit} · day ${segment.artiverseDay} of ${unit.days}`
                    : undefined,
                description: unitDescription,
                artiverseUnit: unit
                  ? {
                      medium: unit.medium,
                      technique: unit.technique,
                      whatChildrenMake: unit.whatChildrenMake,
                      days: unit.days,
                      topicOptions: unit.topicOptions,
                      heroImageUrl: unit.heroImageUrl,
                      extraImages: unit.extraImages,
                      // 3-5 art puts artiverse + artistotle in the same
                      // segment slot, distinguished by days === 3. Other
                      // programmes have artiverse only.
                      mode:
                        programmeSlug === "art-design-3-5" && unit.days === 3
                          ? "artistotle"
                          : "artiverse",
                    }
                  : undefined,
              };
            } else if (segment.segmentId === "log-book" || segment.segmentId === "experience-book") {
              info = {
                segmentId: segment.segmentId,
                segmentName: segment.segmentName,
                title: "experience book",
                description,
                bookLinkSlug: bookSlug,
                heroImageUrl: bookCoverUrl,
              };
            } else {
              info = {
                segmentId: segment.segmentId,
                segmentName: segment.segmentName,
                title: segment.segmentName,
                description,
              };
            }
            onTapSegmentInfo(info);
          }}
          className="mt-2 w-full rounded-lg text-left transition active:scale-[0.99]"
        >
          {segment.segmentId === "art-gym" && segment.artGymLabel ? (
            (() => {
              // Pick the right thumb for this art-gym day:
              // · book N  → GYM_BOOK_IMAGES[N]
              // · cue card → cue-cards-game hero
              // · extension (sketchbook) → fall back to the supplied gymBookUrl
              //   which the parent has already resolved for this session
              const label = segment.artGymLabel.toLowerCase();
              const bookMatch = label.match(/book\s*(\d+)/);
              const bookNum = bookMatch ? parseInt(bookMatch[1], 10) : null;
              let thumb: string | undefined;
              if (bookNum && GYM_BOOK_IMAGES[bookNum]) {
                thumb = GYM_BOOK_IMAGES[bookNum];
              } else if (label.includes("cue card")) {
                thumb = "/games/art/cue-cards-game.png";
              } else {
                thumb = gymBookUrl;
              }
              // 3-5 art programme rotates the laminated art gym book
              // with the scribble book on consecutive sessions. Surface
              // the rotation so teachers don't have to open the popup
              // to figure out which book is paired with today's.
              const isArtGymBook = label.startsWith("art gym book");
              const isScribbleBook = label.startsWith("scribble book");
              const rotationNote = isArtGymBook
                ? "rotates with the scribble book"
                : isScribbleBook
                  ? "rotates with the art gym book"
                  : null;
              // 3-5 art rule: every art-gym session does 1–2 pages
              // from whichever book is today's. Surface this as a
              // short cue under the rotation note so the teacher knows
              // the volume at a glance.
              const pagesNote =
                programmeSlug === "art-design-3-5" && (isArtGymBook || isScribbleBook)
                  ? "1–2 pages today"
                  : null;
              return (
                <div className="flex items-start gap-2.5">
                  {thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-md bg-ink/[0.03] object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-[12px] font-medium leading-snug text-ink">
                      {segment.artGymLabel}
                    </p>
                    {rotationNote && (
                      <p className="mt-0.5 text-[12px] italic leading-relaxed text-ink-subtle">
                        {rotationNote}
                      </p>
                    )}
                    {pagesNote && (
                      <p className="mt-0.5 text-[12px] font-semibold leading-relaxed text-brand-orange">
                        {pagesNote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })()
          ) : segment.segmentId === "artiverse" &&
            (segment.artiverseUnitData || segment.artiverseUnitName) ? (
            <div className="flex items-start gap-2.5">
              {segment.artiverseUnitData?.heroImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={segment.artiverseUnitData.heroImageUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-md bg-ink/[0.03] object-contain"
                />
              )}
              <div className="flex-1">
                {(() => {
                  // Distinguish artiverse (2 days · 2 distinct artworks)
                  // from artistotle (3 days · 1 finished project) using
                  // the unit's `days` field. Falls back to "artiverse"
                  // when no unit data is loaded.
                  const days = segment.artiverseUnitData?.days;
                  const mode = days === 3 ? "artistotle" : "artiverse";
                  const emoji = days === 3 ? "👴" : "🌍";
                  const dayCue = days
                    ? `day ${segment.artiverseDay} of ${days}`
                    : `day ${segment.artiverseDay}`;
                  return (
                    <>
                      <p className="text-[12px] font-medium text-ink">
                        <span aria-hidden className="mr-1">{emoji}</span>
                        {mode} · unit {segment.artiverseUnit} · {dayCue}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        {segment.artiverseUnitData
                          ? `${segment.artiverseUnitData.medium.toLowerCase()} — reference: ${segment.artiverseUnitData.whatChildrenMake.toLowerCase()}`
                          : segment.artiverseUnitName}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : segment.segmentId === "book-o-clock" && segment.bookTitle ? (
            <div className="flex items-start gap-2.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-segment-blue/30 text-[16px] font-extrabold text-ink">
                {segment.bookOrder}
              </span>
              <div className="flex-1">
                <p className="text-[12px] font-medium text-ink">
                  Day {segment.bookDay} of 6 · book {segment.bookOrder}
                </p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                  {segment.bookTitle.toLowerCase()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-[12px] leading-relaxed text-ink-muted">
              {segment.objective}
            </p>
          )}
          <p className="mt-1.5 text-[11px] font-medium text-brand-orange">
            tap for full details →
          </p>
        </button>
      ) : currentActivity ? (
        <div className="mt-2">
          {/* Rotating selector */}
          {segment.rotationPool.length > 1 && !isTrial && (
            <div className="relative mb-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-ink/10 bg-ink/[0.02] px-3 py-2 text-left transition hover:bg-ink/[0.04]"
              >
                <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium text-ink">
                  {currentActivity.cardName && CARD_ICONS[currentActivity.cardName] && (
                    <span className="text-ink-muted">{CARD_ICONS[currentActivity.cardName]}</span>
                  )}
                  <span className="truncate">
                    {currentActivity.cardName
                      ? `${currentActivity.cardName}: ${currentActivity.title}`
                      : currentActivity.title}
                  </span>
                </span>
                {/* Pool-size chip — rotates through N games before any can repeat */}
                <span className="shrink-0 rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-semibold tracking-normal text-ink-muted">
                  rotates · {segment.rotationPool.length} games
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 text-ink-subtle transition-transform",
                    dropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-card border border-ink/10 bg-brand-white shadow-float">
                  <div className="border-b border-ink/5 px-3 py-1.5 text-[9px] text-ink-subtle">
                    {segment.rotationPool.length - selectionHistory.length} of {segment.rotationPool.length} available · once a game is chosen it cannot be picked again until every other game in this pool has been used
                  </div>
                  {segment.rotationPool.map((act) => {
                    const blocked = isBlocked(act.id);
                    return (
                      <button
                        key={act.id}
                        onClick={() => !blocked && handleSelectActivity(act)}
                        disabled={blocked}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition",
                          blocked
                            ? "opacity-35 cursor-not-allowed"
                            : "hover:bg-ink/[0.03]",
                          act.id === currentActivity?.id
                            ? "font-semibold text-brand-orange"
                            : "text-ink"
                        )}
                      >
                        {act.cardName && CARD_ICONS[act.cardName] && (
                          <span className="text-ink-subtle">{CARD_ICONS[act.cardName]}</span>
                        )}
                        {act.cardName
                          ? `${act.cardName}: ${act.title}`
                          : act.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Build-segment meta strip — shows model + build day */}
          {segment.segmentId === "build" && (segment.buildModel || segment.buildDayLabel) && (
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {segment.buildModel && (
                <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-brand-orange">
                  {segment.buildModel.toLowerCase()}
                </span>
              )}
              {segment.buildDayLabel && (
                <span className="rounded-chip bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                  {segment.buildDayLabel.toLowerCase()}
                </span>
              )}
            </div>
          )}

          {/* Tappable activity preview */}
          <button
            onClick={() => currentActivity && onTapActivity(currentActivity)}
            className="flex w-full items-start gap-2.5 text-left transition active:scale-[0.99]"
          >
            {(() => {
              const img = getActivityImage(currentActivity.id);
              return img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-md bg-ink/[0.03] object-contain"
                />
              ) : null;
            })()}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] italic leading-relaxed text-ink-muted">
                &ldquo;{currentActivity.setupLine}&rdquo;
              </p>
              <p className="mt-1.5 text-[11px] font-medium text-brand-orange">
                tap for full details →
              </p>
            </div>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function DayPlan({
  programme,
  session,
}: {
  programme: CurriculumProgramme;
  session: CurriculumSessionEntry;
}) {
  const [modalActivity, setModalActivity] = useState<CurriculumActivity | null>(null);
  const [segmentInfo, setSegmentInfo] = useState<SegmentInfo | null>(null);
  const segments = resolveSegments(programme, session);
  const bookSlug = PROGRAMME_BOOK_MAP[programme.slug];
  const bookCoverUrl = PROGRAMME_BOOK_COVER_URL[programme.slug];
  // Pick the right art-gym hero image for this session's assigned position
  // in the 4-day cycle. Book days show the laminated gym book cover; cue card
  // days show the cue-card game hero; extension days currently fall back to
  // the gym book (there is no dedicated sketchbook asset yet).
  const defaultGymBookUrl =
    programme.ageGroup === "8-12"
      ? GYM_BOOK_IMAGES[5]
      : GYM_BOOK_IMAGES[3];
  const artGymAssignedId = session.artGym;
  let gymBookUrl = defaultGymBookUrl;
  if (artGymAssignedId === "book-3") gymBookUrl = GYM_BOOK_IMAGES[3];
  else if (artGymAssignedId === "book-4") gymBookUrl = GYM_BOOK_IMAGES[4];
  else if (artGymAssignedId === "book-5") gymBookUrl = GYM_BOOK_IMAGES[5];
  else if (artGymAssignedId === "book-6") gymBookUrl = GYM_BOOK_IMAGES[6];
  // 3-5 books — dedicated thumbnails (covers + scribble book) live in
  // public/gym-books/.
  else if (artGymAssignedId === "ag-book-1") gymBookUrl = "/gym-books/3-5-book.png";
  else if (artGymAssignedId === "ag-book-2") gymBookUrl = "/gym-books/3-5-book.png";
  else if (artGymAssignedId === "scribble-book") gymBookUrl = "/gym-books/3-5-scribble.png";
  else if (artGymAssignedId && artGymAssignedId.startsWith("cue-card"))
    gymBookUrl = "/games/art/cue-cards-game.png";
  // ext-book / ext-cue-card keep the default (sketchbook — visual continuity
  // with the gym book until a dedicated sketchbook asset exists).

  return (
    <div>
      {/* Session header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-[13px] font-semibold text-ink">
          session {session.sessionNumber} plan
        </h3>
        <div className="flex items-center gap-2">
          {session.isCheckpoint && (
            <span className="rounded-chip bg-brand-orange/15 px-2 py-0.5 text-[9px] font-semibold tracking-normal text-brand-orange">
              checkpoint
            </span>
          )}
          {session.isFlex && (
            <span className="rounded-chip bg-ink/10 px-2 py-0.5 text-[9px] font-semibold tracking-normal text-ink-muted">
              flex
            </span>
          )}
        </div>
      </div>

      {/* Engage question — shown when the session carries one (robotics) */}
      {session.engageQuestion && (
        <div className="mb-3 rounded-card bg-brand-orange/5 p-3.5 ring-1 ring-brand-orange/10">
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* lightbulb — curiosity / opening the mind */}
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.4 1 2.3v1h6v-1c0-.9.3-1.7 1-2.3A7 7 0 0 0 12 2Z" />
                {/* spark */}
                <path d="M19 4l.8 1.6L21.5 6.3 19.9 7 19.2 8.6 18.5 7 17 6.3 18.5 5.6 19 4Z" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-brand-orange">
                engage · 5 min · start of build
              </p>
              <p className="mt-1 text-[12px] italic leading-relaxed text-ink">
                &ldquo;{session.engageQuestion}&rdquo;
              </p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-ink-subtle">
                take 3–4 answers. connect the last answer to today&apos;s build or experiment. no instruction — only curiosity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Concept question — asked in the closing debrief (robotics) */}
      {session.conceptQuestion && (
        <div className="mb-3 rounded-card bg-category-language/10 p-3.5 ring-1 ring-green-800/15">
          <p className="text-[10px] font-bold text-green-800">
            concept question · closing debrief
          </p>
          <p className="mt-1 text-[12px] italic leading-relaxed text-ink">
            &ldquo;{session.conceptQuestion}&rdquo;
          </p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-ink-subtle">
            one direct question. one child answers. teacher confirms in one sentence.
          </p>
        </div>
      )}

      {/* Segment rows — for the language programme, Book'o'Clock and
          Wordsmiths are intentionally paired (they happen as one
          continuous central block). When we encounter the first one,
          we render BOTH inside a single bracketed frame so it's
          visually obvious they go together. */}
      <div className="space-y-2">
        {(() => {
          const rendered: React.ReactNode[] = [];
          for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            const next = segments[i + 1];
            const pairCheck =
              programme.category === "language" &&
              ((seg.segmentId === "book-o-clock" && next?.segmentId === "wordsmiths") ||
                (seg.segmentId === "wordsmiths" && next?.segmentId === "book-o-clock"));
            if (pairCheck) {
              rendered.push(
                <div
                  key={`${seg.segmentId}+pair`}
                  className="overflow-hidden rounded-2xl bg-segment-blue/10 p-2.5 ring-2 ring-segment-blue/60"
                >
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <span className="text-[10px] font-bold tracking-normal text-segment-blue/90">
                      central learning block
                    </span>
                    <span className="text-[10px] italic text-ink-subtle">
                      these two run together
                    </span>
                  </div>
                  <div className="space-y-2">
                    <SegmentRow
                      key={seg.segmentId}
                      segment={seg}
                      onTapActivity={setModalActivity}
                      onTapSegmentInfo={setSegmentInfo}
                      isTrial={session.sessionNumber === 0}
                      bookSlug={bookSlug}
                      bookCoverUrl={bookCoverUrl}
                      gymBookUrl={gymBookUrl}
                      programmeSlug={programme.slug}
                    />
                    <div className="flex items-center justify-center gap-2 px-2 text-[11px] font-bold tracking-normal text-segment-blue/85">
                      <span aria-hidden className="h-px flex-1 bg-segment-blue/30" />
                      <span>+</span>
                      <span aria-hidden className="h-px flex-1 bg-segment-blue/30" />
                    </div>
                    <SegmentRow
                      key={next!.segmentId}
                      segment={next!}
                      onTapActivity={setModalActivity}
                      onTapSegmentInfo={setSegmentInfo}
                      isTrial={session.sessionNumber === 0}
                      bookSlug={bookSlug}
                      bookCoverUrl={bookCoverUrl}
                      gymBookUrl={gymBookUrl}
                      programmeSlug={programme.slug}
                    />
                  </div>
                </div>
              );
              i += 1; // we consumed the next segment
              continue;
            }
            rendered.push(
              <SegmentRow
                key={seg.segmentId}
                segment={seg}
                onTapActivity={setModalActivity}
                onTapSegmentInfo={setSegmentInfo}
                isTrial={session.sessionNumber === 0}
                bookSlug={bookSlug}
                bookCoverUrl={bookCoverUrl}
                gymBookUrl={gymBookUrl}
                programmeSlug={programme.slug}
              />
            );
          }
          return rendered;
        })()}
      </div>

      {/* Activity modal */}
      <Modal isOpen={!!modalActivity} onClose={() => setModalActivity(null)}>
        {modalActivity && <ActivityPopup activity={modalActivity} />}
      </Modal>

      {/* Segment info modal */}
      <Modal isOpen={!!segmentInfo} onClose={() => setSegmentInfo(null)}>
        {segmentInfo && <SegmentInfoPopup info={segmentInfo} />}
      </Modal>
    </div>
  );
}
