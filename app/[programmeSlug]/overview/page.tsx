"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Dumbbell,
  Gamepad2,
  Palette,
  Notebook,
  RotateCw,
  Lock,
  ChevronDown,
  Zap,
  Star,
  BookOpen,
  ChevronRight,
  FlaskConical,
  Wrench,
} from "lucide-react";
import { getCurriculumProgramme, getActivityImage, GYM_BOOK_IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TeacherGate } from "@/components/TeacherGate";

// ─── Art 5-8 programme overview data ──────────────────────────

const dailyFlow = [
  {
    id: "art-gym",
    icon: Dumbbell,
    name: "art gym",
    time: "15–20 min",
    durationFlex: 17.5,
    meaning:
      "a structured opening segment using books, cue cards, and their extensions, where each session builds directly on the previous one.",
    color: "bg-[#F5D547]",
    textColor: "text-amber-900",
  },
  {
    id: "art-games",
    icon: Gamepad2,
    name: "art games",
    time: "15–20 min",
    durationFlex: 17.5,
    meaning:
      "openhouse art games using varied formats and materials. children experiment, create, and develop core art skills through playful exploration.",
    color: "bg-category-language/40",
    textColor: "text-green-900",
  },
  {
    id: "artiverse",
    icon: Palette,
    name: "artiverse",
    time: "40–45 min",
    durationFlex: 42.5,
    meaning:
      "a structured making programme combining medium, technique, and outcome over multiple sessions.",
    color: "bg-category-stem/40",
    textColor: "text-blue-900",
  },
  {
    id: "log-book",
    icon: Notebook,
    name: "experience book",
    time: "10 min",
    durationFlex: 10,
    meaning:
      "last 10 minutes — children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? what you enjoyed? what you didn't? what to do again? every child speaks. after children leave, the teacher fills in the skill-assessment part privately. these daily notes compile into the monthly report card that goes home.",
    color: "bg-category-movement/40",
    textColor: "text-pink-900",
  },
];

const skills = [
  {
    id: "lt",
    name: "line & texture",
    color: "bg-[#D4A88C]",
    accent: "border-[#D4A88C]",
    abilities: [
      "identifies the marks different tools make and experiments freely",
      "makes different line types with intention — straight, wavy, zigzag, curved",
      "combines line types to create texture",
      "draws objects and scenes using observed line and texture",
    ],
  },
  {
    id: "sf",
    name: "shape & form",
    color: "bg-[#7EB5D6]",
    accent: "border-[#7EB5D6]",
    abilities: [
      "traces and draws basic 2d shapes using any medium",
      "combines shapes to draw recognisable objects",
      "modifies and combines shapes creatively",
      "identifies and begins to draw simple 3d forms",
    ],
  },
  {
    id: "cp",
    name: "colour & painting",
    color: "bg-[#E8B5B8]",
    accent: "border-[#E8B5B8]",
    abilities: [
      "paints with reasonable control and makes early attempts at mixing",
      "mixes primary colours to produce secondary colours reliably",
      "identifies warm and cool colour families and uses them expressively",
      "creates tints by adding white and shades by adding black",
    ],
  },
  {
    id: "bc",
    name: "balance & composition",
    color: "bg-[#B8D4A8]",
    accent: "border-[#B8D4A8]",
    abilities: [
      "fills the whole page rather than drawing only in the centre",
      "understands foreground and background",
      "draws overlapping objects to show depth",
      "understands how colour and shape placement create visual balance",
    ],
  },
  {
    id: "ic",
    name: "imagination & collaboration",
    color: "bg-[#C4D8F0]",
    accent: "border-[#C4D8F0]",
    abilities: [
      "experiments freely with colours, materials, and marks",
      "generates new and unusual ideas",
      "listens to others' ideas, contributes their own, and makes decisions together",
      "describes an imagined world or creature with enough detail to draw it",
    ],
  },
];

// Where each ability lives (by skill id + ability index)
const abilityLocations: Record<string, string[]> = {
  "lt-0": ["art gym (book)", "shape stitch", "artiverse"],
  "lt-1": ["art gym (book)", "shape stitch", "artiverse"],
  "lt-2": ["artiverse"],
  "lt-3": ["cue cards", "artiverse"],
  "sf-0": ["art gym (book)"],
  "sf-1": ["art gym (cue card)", "shape fusion", "cue cards", "artventure"],
  "sf-2": ["shape fusion", "imagine that", "artventure"],
  "sf-3": ["artiverse"],
  "cp-0": ["artiverse"],
  "cp-1": ["colour flip", "artiverse"],
  "cp-2": ["colour flip", "match me", "artiverse"],
  "cp-3": ["artiverse"],
  "bc-0": ["cue cards", "artiverse"],
  "bc-1": ["art gym ext (cue card)", "artiverse"],
  "bc-2": ["art gym ext (cue card)", "artiverse"],
  "bc-3": ["artiverse"],
  "ic-0": ["art gym ext (book)", "artventure", "doodle dash", "artiverse"],
  "ic-1": ["art gym ext (book)", "imagine that", "doodle dash", "artiverse"],
  "ic-2": ["imagine that"],
  "ic-3": ["imagine that"],
};

const segmentGames = [
  {
    segment: "art gym",
    icon: Dumbbell,
    color: "bg-[#F5D547]",
    time: "15–20 min",
    type: "fixed" as const,
    games: [
      {
        name: "art gym book 3 & 4",
        skills: ["line & texture", "shape & form"],
        rotation: "fixed" as const,
      },
      {
        name: "extension (book)",
        skills: ["imagination & collaboration"],
        rotation: "fixed" as const,
      },
      {
        name: "cue cards drawing — b1 & b2",
        skills: ["line & texture", "shape & form"],
        rotation: "fixed" as const,
      },
      {
        name: "extension (cue cards)",
        skills: ["balance & composition"],
        rotation: "fixed" as const,
      },
    ],
  },
  {
    segment: "art games",
    icon: Gamepad2,
    color: "bg-category-language/40",
    time: "15–20 min",
    type: "rotating" as const,
    games: [
      { name: "match me", skills: ["colour & painting"], rotation: "rotating" as const },
      { name: "colour flip", skills: ["colour & painting"], rotation: "rotating" as const },
      { name: "shape stitch", skills: ["line & texture"], rotation: "rotating" as const },
      {
        name: "shape fusion",
        skills: ["imagination & collaboration", "shape & form"],
        rotation: "rotating" as const,
      },
      { name: "cue cards", skills: ["shape & form"], rotation: "rotating" as const },
      {
        name: "artventure",
        skills: ["shape & form", "colour & painting"],
        rotation: "rotating" as const,
      },
      {
        name: "imagine that",
        skills: ["imagination & collaboration"],
        rotation: "rotating" as const,
      },
      {
        name: "doodle dash",
        skills: ["imagination & collaboration"],
        rotation: "rotating" as const,
      },
    ],
  },
  {
    segment: "artiverse",
    icon: Palette,
    color: "bg-category-stem/40",
    time: "40–45 min",
    type: "fixed" as const,
    games: [
      {
        name: "artiverse units",
        skills: ["all five skills"],
        rotation: "fixed" as const,
      },
    ],
  },
  {
    segment: "experience book",
    icon: Notebook,
    color: "bg-category-movement/40",
    time: "10 min",
    type: "fixed" as const,
    games: [
      {
        name: "personal experience book",
        skills: ["reflection"],
        rotation: "fixed" as const,
      },
    ],
  },
];

const artiverseUnits = [
  { num: 1, medium: "brush pen", technique: "line exploration", outcome: "trees or cats", days: 1 },
  { num: 2, medium: "colour pencil", technique: "shape + composition", outcome: "flowers", days: 2 },
  { num: 3, medium: "brush pen", technique: "line flow", outcome: "waves", days: 2 },
  { num: 4, medium: "tempera", technique: "fingerprinting", outcome: "thumbprint art", days: 1 },
  { num: 5, medium: "brush pen", technique: "observation + structure", outcome: "self portrait", days: 2 },
  { num: 6, medium: "oil pastel", technique: "bold fill", outcome: "food", days: 1 },
  { num: 7, medium: "watercolour", technique: "brush control", outcome: "lines with watercolour", days: 2 },
  { num: 8, medium: "tempera", technique: "printing", outcome: "leaf printing sunflower", days: 2 },
  { num: 9, medium: "oil pastel", technique: "shape + texture", outcome: "animals", days: 1 },
  { num: 10, medium: "colour pencil", technique: "scene drawing", outcome: "sea world", days: 2 },
  { num: 11, medium: "brush pen", technique: "form + illusion", outcome: "3d drawing", days: 1 },
  { num: 12, medium: "watercolour", technique: "colour theory", outcome: "warm and cool colours", days: 2 },
  { num: 13, medium: "watercolour + collage", technique: "painted paper", outcome: "eric carle collage", days: 3 },
  { num: 14, medium: "mixed media", technique: "shape play", outcome: "shape monsters", days: 2 },
  { num: 15, medium: "mixed media", technique: "composition + imagination", outcome: "paul klee imaginary world", days: 3 },
  { num: 16, medium: "mixed media", technique: "collage", outcome: "pear collage", days: 2 },
  { num: 17, medium: "mixed media", technique: "story composition", outcome: "big fruit and ants", days: 3 },
  { num: 18, medium: "acrylic paint", technique: "colour blending", outcome: "abstract circles and shapes", days: 2 },
  { num: 19, medium: "acrylic paint", technique: "colour blocking", outcome: "rainbow art", days: 3 },
  { num: 20, medium: "acrylic paint", technique: "shape simplification", outcome: "animals", days: 2 },
  { num: 21, medium: "acrylic paint", technique: "collage + paint", outcome: "lemons and oranges", days: 4 },
  { num: 22, medium: "acrylic paint", technique: "composition", outcome: "flower pots", days: 2 },
  { num: 23, medium: "mixed media", technique: "construction + imagination", outcome: "robots", days: 3 },
  { num: 24, medium: "brush pen + accent", technique: "black and white with single accent", outcome: "black and white accent art", days: 2 },
  { num: 25, medium: "acrylic on black paper", technique: "painting with light", outcome: "firefly in a jar · dragonfly", days: 3 },
];

const mediumColor: Record<string, string> = {
  "brush pen": "bg-[#7EB5D6]/40",
  "colour pencil": "bg-[#E8B5B8]/40",
  tempera: "bg-[#D4A88C]/40",
  "oil pastel": "bg-[#C4D8F0]/40",
  watercolour: "bg-[#B8D4A8]/40",
  "watercolour + collage": "bg-[#B8D4A8]/60",
  "mixed media": "bg-[#F5D547]/40",
  "acrylic paint": "bg-[#F5D547]/60",
  "brush pen + accent": "bg-[#7EB5D6]/60",
  "acrylic on black paper": "bg-brand-charcoal/20",
};

// ─── Main component ───────────────────────────────────────────

export default function ProgrammeOverviewPage() {
  return (
    <TeacherGate>
      <ProgrammeOverviewContent />
    </TeacherGate>
  );
}

function ProgrammeOverviewContent() {
  const params = useParams();
  const slug = params.programmeSlug as string;
  const programme = getCurriculumProgramme(slug);
  const [activeSegment, setActiveSegment] = useState<string | null>("art-gym");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  if (!programme) {
    notFound();
    return null;
  }

  const isArt = programme.category === "art";
  const isRobotics = programme.category === "stem";

  // Build skills list from this programme's own skill areas so the abilities
  // match the age group & category.
  const skillStyle: Record<string, { color: string; accent: string }> = {
    // art skill families
    lt: { color: "bg-[#D4A88C]", accent: "border-[#D4A88C]" },
    sf: { color: "bg-[#7EB5D6]", accent: "border-[#7EB5D6]" },
    cp: { color: "bg-[#E8B5B8]", accent: "border-[#E8B5B8]" },
    bc: { color: "bg-[#B8D4A8]", accent: "border-[#B8D4A8]" },
    ic: { color: "bg-[#C4D8F0]", accent: "border-[#C4D8F0]" },
    // public speaking skill families
    cs: { color: "bg-[#D4A88C]", accent: "border-[#D4A88C]" },
    bl: { color: "bg-[#7EB5D6]", accent: "border-[#7EB5D6]" },
    vs: { color: "bg-[#E8B5B8]", accent: "border-[#E8B5B8]" },
    // robotics skill families (lt re-uses the art lt colour — not shown together on any page)
    bm: { color: "bg-[#E8B5B8]", accent: "border-[#E8B5B8]" },
    ps: { color: "bg-[#7EB5D6]", accent: "border-[#7EB5D6]" },
    ou: { color: "bg-[#B8D4A8]", accent: "border-[#B8D4A8]" },
  };

  // Build daily flow dynamically from this programme's segment definitions.
  const segmentStyle: Record<string, { color: string; textColor: string; icon: typeof Dumbbell; durationFlex: number; meaning: string }> = {
    "art-gym": { color: "bg-[#F5D547]", textColor: "text-amber-900", icon: Dumbbell, durationFlex: 17.5, meaning: "a structured opening segment using books, cue cards, and their extensions, where each session builds directly on the previous one." },
    "art-games": { color: "bg-category-language/40", textColor: "text-green-900", icon: Gamepad2, durationFlex: 17.5, meaning: "one art game that builds a specific skill. all children play simultaneously." },
    artiverse: { color: "bg-category-stem/40", textColor: "text-blue-900", icon: Palette, durationFlex: 42.5, meaning: "a structured making programme combining medium, technique, and outcome over multiple sessions." },
    "roll-call": { color: "bg-[#F5D547]", textColor: "text-amber-900", icon: Zap, durationFlex: 9, meaning: "a quick energetic start. group games that wake up voice, body, and attention — every child playing simultaneously within 2 minutes." },
    playground: { color: "bg-category-language/40", textColor: "text-green-900", icon: Gamepad2, durationFlex: 22, meaning: "one group game played deeply, with a full debrief. children practise speaking through play." },
    showtime: { color: "bg-category-stem/40", textColor: "text-blue-900", icon: Star, durationFlex: 32, meaning: "children step into the spotlight. structured formats that build performance, argument, and conviction." },
    "log-book": { color: "bg-category-movement/40", textColor: "text-pink-900", icon: Notebook, durationFlex: 10, meaning: "last 10 minutes — children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? what you enjoyed? what you didn't? what to do again? every child speaks. after children leave, the teacher fills the skill-assessment part privately. the daily notes compile into the monthly report card that goes home." },
    // Robotics segments — no rotation; every session is fixed.
    experiment: { color: "bg-[#F5D547]", textColor: "text-amber-900", icon: FlaskConical, durationFlex: 40, meaning: "groups of 2–4 children find the answer to one specific question. every child takes at least one measurement independently. teacher asks one question per group and never gives the answer. tool orientation is embedded here — each tool introduced once, confirmed once, never revisited." },
    build: { color: "bg-category-language/40", textColor: "text-green-900", icon: Wrench, durationFlex: 40, meaning: "each child builds their own mechanical model using a personal kit and a step card. the teacher never fixes anything and never tells anyone what to do next. four questions only. when something doesn't work, the child figures it out." },
    "experience-book": { color: "bg-category-movement/40", textColor: "text-pink-900", icon: Notebook, durationFlex: 10, meaning: "five marks per child per session — O&U and LT from the experiment, B&M and PS from the build, concept ticked when the child can explain it. one specific note per child. compiles into a monthly robotics journey letter." },
  };
  const dailyFlow = programme.segmentDefinitions.map((s) => {
    const style = segmentStyle[s.id] ?? segmentStyle["log-book"];
    return {
      id: s.id,
      icon: style.icon,
      name: (s.id === "log-book" || s.id === "experience-book") ? "experience book" : s.name.toLowerCase(),
      time: s.durationRange,
      durationFlex: style.durationFlex,
      meaning: style.meaning,
      color: style.color,
      textColor: style.textColor,
    };
  });

  const skills = programme.skillAreas.map((s) => ({
    id: s.id,
    name: s.name.toLowerCase(),
    color: skillStyle[s.id]?.color ?? "bg-ink/10",
    accent: skillStyle[s.id]?.accent ?? "border-ink/20",
    abilities: s.abilities.map((a) => a.toLowerCase()),
  }));

  // Build the games table per segment from this programme's own activities
  // so each age group sees only its own games.
  const segmentGamesDynamic = [
    {
      segment: "art gym",
      icon: Dumbbell,
      color: "bg-[#F5D547]",
      time: "15–20 min",
      type: "fixed" as const,
      games: [
        { name: programme.ageGroup === "8-12" ? "art gym book 5 & 6" : "art gym book 3 & 4", skills: ["line & texture", "shape & form"], rotation: "fixed" as const },
        { name: "extension (sketchbook, book day)", skills: ["imagination & collaboration"], rotation: "fixed" as const },
        { name: programme.ageGroup === "8-12" ? "cue cards b1 & b2 + backgrounds" : "cue cards b1 & b2", skills: ["line & texture", "shape & form"], rotation: "fixed" as const },
        { name: "extension (sketchbook, cue card day)", skills: ["balance & composition"], rotation: "fixed" as const },
      ],
    },
    {
      segment: "art games",
      icon: Gamepad2,
      color: "bg-category-language/40",
      time: "15–20 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "art-games")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: "artiverse",
      icon: Palette,
      color: "bg-category-stem/40",
      time: "40–45 min",
      type: "fixed" as const,
      games: [{ name: `${programme.artiverseUnits?.length ?? 0} artiverse units`, skills: ["all five skills"], rotation: "fixed" as const }],
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-category-movement/40",
      time: "10 min",
      type: "fixed" as const,
      games: [{ name: "personal experience book", skills: ["reflection"], rotation: "fixed" as const }],
    },
  ];

  // Public-speaking games table — built dynamically per segment.
  const psSegmentGames = [
    {
      segment: "roll call",
      icon: Zap,
      color: "bg-[#F5D547]",
      time: "8–10 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "roll-call")
        .map((a) => ({ name: a.title.toLowerCase(), skills: a.cardName ? [a.cardName.toLowerCase()] : [], rotation: "rotating" as const })),
    },
    {
      segment: "playground",
      icon: Gamepad2,
      color: "bg-category-language/40",
      time: "20–25 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "playground")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: "showtime",
      icon: Star,
      color: "bg-category-stem/40",
      time: "30–35 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "showtime")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-category-movement/40",
      time: "8–10 min",
      type: "fixed" as const,
      games: [{ name: "personal experience book", skills: ["reflection"], rotation: "fixed" as const }],
    },
  ];

  // Robotics games table — no rotation; every session is fixed.
  // Lists every experiment card and every model build so teachers see the full
  // content pool at a glance, even though the sessionTable already hard-wires
  // which one runs in which session.
  const roboticsSegmentGames = [
    {
      segment: "experiment",
      icon: FlaskConical,
      color: "bg-[#F5D547]",
      time: "40 min",
      type: "fixed" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "experiment")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: a.cardName ? [a.cardName.toLowerCase()] : [],
          rotation: "fixed" as const,
        })),
    },
    {
      segment: "build",
      icon: Wrench,
      color: "bg-category-language/40",
      time: "40 min",
      type: "fixed" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "build")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "fixed" as const })),
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-category-movement/40",
      time: "10 min",
      type: "fixed" as const,
      games: [{ name: "daily five-mark log · monthly robotics journey letter", skills: ["reflection"], rotation: "fixed" as const }],
    },
  ];

  const gamesTable = isRobotics
    ? roboticsSegmentGames
    : isArt
      ? segmentGamesDynamic
      : psSegmentGames;

  return (
    <div className="flex flex-col pb-6">
      {/* ─── Back link ─── */}
      <div className="px-4 pt-4 md:px-8">
        <Link
          href={`/${slug}`}
          className="flex items-center gap-1 text-[12px] font-bold text-brand-orange hover:underline"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          back to programme
        </Link>
      </div>

      {/* ─── HEADER ─── */}
      <section className="mt-4 px-4 md:px-8">
        <p className="text-[11px] font-bold text-ink-subtle">programme overview</p>
        <h1 className="mt-1 text-[28px] font-extrabold leading-tight text-ink md:text-[36px]">
          {programme.title}
        </h1>
        <p className="mt-1 text-[12px] font-medium text-ink-muted md:text-[13px]">
          {programme.ageLabel} · 90 minutes per session
        </p>
        <div className="mt-4 rounded-card bg-brand-orange/5 p-4 md:p-5">
          <p className="text-[13px] leading-relaxed text-ink md:text-[14px]">
            {programme.description}
          </p>
        </div>
      </section>

      {/* ─── DAILY FLOW ─── */}
      <section className="mt-8 px-4 md:px-8">
        <SectionTitle num="01" label="daily flow" />
        <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink md:text-[14px]">
          a 90-minute session — four segments, in this order.
        </p>

        {/* Proportional timeline with segment symbols + duration */}
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-brand-white">
          <div className="flex h-12">
            {dailyFlow.map((seg) => {
              const Icon = seg.icon;
              return (
                <div
                  key={seg.id}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 border-r border-white/40 px-1 last:border-r-0",
                    seg.color,
                    seg.textColor
                  )}
                  style={{ flex: seg.durationFlex }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  <span className="truncate text-[9px] font-bold leading-none md:text-[10px]">
                    {seg.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indented numbered list */}
        <ol className="mt-4 space-y-2">
          {dailyFlow.map((seg, i) => {
            const Icon = seg.icon;
            const isActive = activeSegment === seg.id;
            return (
              <li key={seg.id}>
                <button
                  onClick={() => setActiveSegment(isActive ? null : seg.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-3 text-left transition",
                    isActive ? seg.color : "bg-ink/[0.03] hover:bg-ink/[0.05]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold",
                      isActive ? "bg-white/70 text-ink" : "bg-brand-orange/10 text-brand-orange"
                    )}
                  >
                    {i + 1}
                  </span>
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? seg.textColor : "text-ink-muted"
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 text-[14px] font-extrabold",
                      isActive ? seg.textColor : "text-ink"
                    )}
                  >
                    {seg.name}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      isActive ? seg.textColor : "text-ink-subtle"
                    )}
                  >
                    {seg.time}
                  </span>
                </button>
                {isActive && (
                  <div className="mt-1 pl-[3.75rem]">
                    <p className="text-[12px] leading-relaxed text-ink-muted">
                      {seg.meaning}
                    </p>
                    {/* Art-gym reference: one book thumbnail per age group */}
                    {seg.id === "art-gym" && (
                      <div className="mt-2 flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            programme.ageGroup === "8-12"
                              ? GYM_BOOK_IMAGES[5]
                              : GYM_BOOK_IMAGES[3]
                          }
                          alt="art gym book reference"
                          className="h-16 w-16 rounded-md bg-ink/[0.03] object-contain ring-1 ring-ink/10"
                        />
                        <p className="text-[10.5px] italic leading-relaxed text-ink-subtle">
                          reference — art gym book{" "}
                          {programme.ageGroup === "8-12" ? "5 / 6" : "3 / 4"}.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-4 text-[11px] italic leading-relaxed text-ink-muted">
          {isRobotics
            ? "at the end of the build, teacher says \"two minutes to tidy your kit.\" children sort components back to the kit box before the experience book begins."
            : "at the end of artiverse, teacher says \"two minutes to put materials away.\" children tidy before the experience book begins."}
        </p>
      </section>

      {/* ─── ART GYM CYCLE (art only) ─── */}
      {isArt && (
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num="02" label="art gym cycle" />
        <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
          art gym runs as two paired units. the <span className="font-semibold text-ink">book</span> and the <span className="font-semibold text-ink">cue card</span> each rotate; their extensions always follow the previous day — not independent.
        </p>

        <div className="mt-4 space-y-4">
          {/* PAIR 1: Book + Extension */}
          <div className="overflow-hidden rounded-xl bg-[#F5D547]/15 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-extrabold text-ink">
                unit 1 · book + extension
              </p>
              <span className="rounded-chip bg-brand-orange text-white px-2.5 py-0.5 text-[10px] font-semibold">
                rotates
              </span>
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">
              the book rotates across the cycle. its extension always follows the same book the next day.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-brand-white p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5D547] text-[11px] font-bold text-amber-900">1</span>
                  <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[9px] font-semibold text-brand-orange">book</span>
                </div>
                <p className="mt-2 text-[13px] font-bold text-ink">art gym book</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  child works in their personal laminated art gym book, at their own pace.
                </p>
                <div className="mt-2 flex gap-1.5">
                  {(programme.ageGroup === "8-12" ? [5, 6] : [3, 4]).map((n) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={n}
                      src={GYM_BOOK_IMAGES[n]}
                      alt={`art gym book ${n}`}
                      className="h-20 flex-1 rounded-md bg-ink/[0.03] object-contain ring-1 ring-ink/10"
                    />
                  ))}
                </div>
                <p className="mt-2 text-[10px] italic text-brand-orange">
                  rotates: {programme.ageGroup === "8-12" ? "book 5 · book 6" : "book 3 · book 4"}
                </p>
              </div>
              <div className="rounded-lg bg-brand-white p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 text-[11px] font-bold text-ink-muted">2</span>
                  <span className="rounded-chip bg-ink/10 px-2 py-0.5 text-[9px] font-semibold text-ink-muted">paired extension</span>
                </div>
                <p className="mt-2 text-[13px] font-bold text-ink">extension (sketchbook)</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  child extends yesterday&apos;s book technique into the sketchbook.
                </p>
                <p className="mt-2 text-[10px] italic text-ink-subtle">always follows day 1 — never independent.</p>
              </div>
            </div>
          </div>

          {/* PAIR 2: Cue card + Extension */}
          <div className="overflow-hidden rounded-xl bg-[#F5D547]/15 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-extrabold text-ink">
                unit 2 · cue card + extension
              </p>
              <span className="rounded-chip bg-brand-orange text-white px-2.5 py-0.5 text-[10px] font-semibold">
                rotates
              </span>
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">
              the teacher picks the cue card type from the pool. its extension always follows the same cue card the next day.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-brand-white p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5D547] text-[11px] font-bold text-amber-900">3</span>
                  <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[9px] font-semibold text-brand-orange">cue card</span>
                </div>
                <p className="mt-2 text-[13px] font-bold text-ink">cue card (teacher picks)</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  child follows a step-by-step illustrated cue card of the teacher&apos;s choice.
                </p>
                <p className="mt-2 text-[10px] italic text-brand-orange">
                  rotates across types (see pool below)
                </p>
              </div>
              <div className="rounded-lg bg-brand-white p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 text-[11px] font-bold text-ink-muted">4</span>
                  <span className="rounded-chip bg-ink/10 px-2 py-0.5 text-[9px] font-semibold text-ink-muted">paired extension</span>
                </div>
                <p className="mt-2 text-[13px] font-bold text-ink">extension (sketchbook)</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  child extends yesterday&apos;s cue card drawing into the sketchbook.
                </p>
                <p className="mt-2 text-[10px] italic text-ink-subtle">always follows day 3 — never independent.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-[#F5D547]/15 p-4">

          {/* Cue card types — rotating */}
          <div className="mt-4 rounded-lg bg-white/60 p-3.5">
            <p className="text-[11px] font-bold text-ink">cue card pool — rotates</p>
            <p className="mt-1 text-[11px] text-ink-muted">
              {programme.ageGroup === "8-12" ? (
                <>
                  uses <span className="font-semibold text-ink">B1 + B2</span> sets across all six types, plus landscape &amp; portrait backgrounds.
                </>
              ) : (
                <>
                  uses the <span className="font-semibold text-ink">B1</span> set across all six types.
                </>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["animals", "birds", "buildings", "food", "nature", "vehicles"].map((t) => (
                <span
                  key={t}
                  className="rounded-chip bg-[#F5D547]/40 px-2.5 py-1 text-[10px] font-semibold text-amber-900"
                >
                  {t}
                </span>
              ))}
              {programme.ageGroup === "8-12" && (
                <>
                  <span className="rounded-chip bg-category-stem/30 px-2.5 py-1 text-[10px] font-semibold text-blue-900">
                    landscape backgrounds
                  </span>
                  <span className="rounded-chip bg-category-stem/30 px-2.5 py-1 text-[10px] font-semibold text-blue-900">
                    portrait backgrounds
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-white/60 p-3">
            <p className="text-[11px] font-bold text-ink">book rotation</p>
            {programme.ageGroup === "8-12" ? (
              <>
                <p className="mt-1 text-[11px] text-ink-muted">
                  <span className="font-semibold text-ink">months 1–3:</span> book 5
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  <span className="font-semibold text-ink">months 4–6:</span> book 6
                </p>
              </>
            ) : (
              <>
                <p className="mt-1 text-[11px] text-ink-muted">
                  <span className="font-semibold text-ink">months 1–3:</span> book 3 · cue cards B1
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  <span className="font-semibold text-ink">months 4–6:</span> book 4 · cue cards B2
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ─── SKILLS & ABILITIES ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num="03" label="skills & abilities">
          {skills.length} skills · {skills[0]?.abilities.length ?? 0} abilities each
        </SectionTitle>

        <div className="mt-4 space-y-3">
          {skills.map((skill) => {
            const isOpen = activeSkill === skill.id;
            return (
              <div
                key={skill.id}
                className={cn(
                  "overflow-hidden rounded-xl bg-brand-white shadow-card transition",
                  isOpen && "ring-2 ring-offset-2",
                  isOpen && skill.accent
                )}
              >
                <button
                  onClick={() => setActiveSkill(isOpen ? null : skill.id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white",
                      skill.color
                    )}
                  >
                    {skill.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-[14px] font-extrabold text-ink">{skill.name}</p>
                    <p className="text-[10px] text-ink-muted">4 abilities</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-ink-subtle transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-ink/5 bg-bg/30 p-4">
                    {skill.abilities.map((ability, i) => {
                      const locs = abilityLocations[`${skill.id}-${i}`] || [];
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold text-white",
                              skill.color
                            )}
                          >
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-[12px] leading-relaxed text-ink md:text-[13px]">
                              {ability}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {locs.map((loc) => (
                                <span
                                  key={loc}
                                  className="rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-medium text-ink-muted"
                                >
                                  {loc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── WHERE SKILLS LIVE ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num="04" label="segment logic">
          what happens inside each segment
        </SectionTitle>

        <div className="mt-4 space-y-3">
          {gamesTable.map((seg) => {
            const Icon = seg.icon;
            return (
              <div key={seg.segment} className="overflow-hidden rounded-xl bg-brand-white shadow-card">
                <div className={cn("flex items-center gap-2 px-4 py-3", seg.color)}>
                  <Icon className="h-4 w-4 text-ink" />
                  <p className="text-[14px] font-extrabold text-ink">{seg.segment}</p>
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-ink-muted">
                    {seg.type === "rotating" ? (
                      <><RotateCw className="h-3 w-3" /> rotating</>
                    ) : (
                      <><Lock className="h-3 w-3" /> fixed</>
                    )}
                    <span className="mx-1">·</span>
                    {seg.time}
                  </span>
                </div>
                <div className="divide-y divide-ink/5">
                  {seg.games.map((g) => {
                    const slug = g.name.toLowerCase().replace(/\s+/g, "-");
                    const img =
                      getActivityImage(slug) ??
                      getActivityImage(slug.replace(/s$/, ""));
                    return (
                      <div key={g.name} className="flex items-center gap-3 px-4 py-3">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-lg bg-ink/[0.03] object-contain"
                          />
                        ) : (
                          <div
                            className={cn(
                              "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                              seg.color
                            )}
                          >
                            <Icon className="h-5 w-5 text-ink/70" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-ink">{g.name}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {g.skills.map((s) => (
                              <span
                                key={s}
                                className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-medium text-brand-orange"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-chip bg-ink/5 px-2 py-0.5 text-[9px] font-bold text-ink-muted">
                          {g.rotation}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-brand-orange/5 p-4">
          <p className="text-[12px] font-bold text-ink">
            {isRobotics ? "how it runs" : "how rotation works"}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
            {isRobotics
              ? "robotics has no rotation — every session is fixed. the experiment and build for each session are set in advance so children can join at any session and pick up exactly where the class is. the four teacher questions work identically regardless of which build day each child is on."
              : "art games rotate across 8 games — each activity can only repeat after all others have been used. variations change how children play. levels adjust difficulty for each child within the same game, without separating them."}
          </p>
        </div>
      </section>

      {/* ─── ROBOTICS MODELS (stem only) ─── */}
      {isRobotics && (
        <section className="mt-10 px-4 md:px-8">
          <SectionTitle num="04" label="the three models">
            built in order, all year long
          </SectionTitle>

          <div className="mt-4 space-y-3">
            {[
              {
                n: 1,
                name: "See-saw",
                runs: "lever experiments",
                blurb:
                  "a simple lever — beam balancing on a central fulcrum. introduces lever ideas in the most physical way a child can feel.",
              },
              {
                n: 2,
                name: "Weighing Scale",
                runs: "lever experiments continue",
                blurb:
                  "a more complex lever. two pan arms that must balance when equal weights are placed. every lever experiment directly explains something being built.",
              },
              {
                n: 3,
                name: "Crane",
                runs: "pulley experiments",
                blurb:
                  "a pulley-based model. the crane lifts a load using rope and pulley. pulley experiments explain the lifting system directly.",
              },
            ].map((m) => (
              <div key={m.n} className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[12px] font-extrabold text-white">
                    {m.n}
                  </span>
                  <p className="text-[14px] font-extrabold text-ink">{m.name.toLowerCase()}</p>
                  <span className="ml-auto rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[9px] font-semibold text-brand-orange">
                    {m.runs}
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">{m.blurb}</p>
                <p className="mt-2 text-[11px] font-semibold text-ink">
                  {programme.ageGroup === "8-12" ? "6 build sessions" : "8 build sessions"}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-brand-orange/5 p-4">
            <p className="text-[12px] font-bold text-ink">the build day cycle</p>
            <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-ink-muted">
              <li>
                <span className="font-semibold text-ink">day 1 — explore.</span> read the full model manual, lay every component out in manual order, begin first build stage.
              </li>
              <li>
                <span className="font-semibold text-ink">{programme.ageGroup === "8-12" ? "days 2–3" : "days 2–5"} — make.</span> open the manual where you left off, build, the teacher uses only four questions.
              </li>
              <li>
                <span className="font-semibold text-ink">{programme.ageGroup === "8-12" ? "day 4" : "day 6"} — complete and test.</span> finish, run the test, record the best result.
              </li>
              <li>
                <span className="font-semibold text-ink">{programme.ageGroup === "8-12" ? "day 5" : "day 7"} — improve.</span> one deliberate change, state the expected effect, test, record before and after.
              </li>
              <li>
                <span className="font-semibold text-ink">{programme.ageGroup === "8-12" ? "day 6" : "day 8"} — disassemble.</span> {programme.ageGroup === "8-12" ? "from memory — teacher names each component as it goes back." : "sorted back using the tray map. teacher names each component."}
              </li>
            </ul>
          </div>

          <div className="mt-3 rounded-xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
            <p className="text-[12px] font-bold text-ink">the four teacher questions — build only</p>
            <ol className="mt-2 space-y-1 text-[11px] leading-relaxed text-ink-muted">
              <li>1. &ldquo;what is not working? what will you try?&rdquo;</li>
              <li>2. &ldquo;what did you change? what happened?&rdquo;</li>
              <li>3. &ldquo;which change made the bigger difference?&rdquo;</li>
              <li>4. &ldquo;point to the part that did the most important job.&rdquo;</li>
            </ol>
            <p className="mt-2 text-[10px] italic text-ink-subtle">
              one per child per session. move on immediately. never fix. never tell.
            </p>
          </div>
        </section>
      )}

      {/* ─── STANDARDISED DEBRIEF APPROACHES (public speaking only) ─── */}
      {programme.category === "language" && (
        <section className="mt-10 px-4 md:px-8">
          <SectionTitle num="04" label="debrief approaches">
            always conduct debriefs for playground and showtime — every session
          </SectionTitle>

          <p className="mt-3 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
            four approaches a teacher can reach for after any playground or showtime game. each takes under 2 minutes. they are not all used every session — the teacher picks one that fits what actually happened in that particular round.
          </p>

          <div className="mt-4 space-y-3">
            {[
              {
                n: 1,
                name: "Spotlight one moment",
                blurb:
                  "point to or name one specific observable moment from the game — not a general feeling about how it went. the question must be precise enough that only a child who was paying attention can answer it.",
                when: "when a specific moment visibly changed the direction or outcome of the game.",
                example:
                  "\"which one card changed the whole direction of the story — point to it on the mat. why did that card change things?\"",
              },
              {
                n: 2,
                name: "What happened when you got stuck",
                blurb:
                  "ask what was genuinely hard and specifically what the child did in that moment. this is different from asking what they enjoyed — it requires children to notice their own thinking rather than their feeling.",
                when: "after any game where children had to push through a difficult moment in real time.",
                example:
                  "\"was there a moment when you couldn't think of how to connect your card to the story? what did you actually do in that moment?\"",
              },
              {
                n: 3,
                name: "What would you change",
                blurb:
                  "ask one forward-looking question — not general reflection but a specific named change. keeps it brief and actionable.",
                when: "after any game the group will play again in future sessions.",
                example:
                  "\"if we played this again right now — one thing you would do differently with your card. one thing.\"",
              },
              {
                n: 4,
                name: "Peer spotlight",
                blurb:
                  "ask children to name one specific thing a peer did that made the game stronger. not a general compliment — a specific observable action. this builds the listening habit alongside the speaking habit.",
                when: "after any game where children were both contributing and watching others contribute.",
                example:
                  "\"whose sentence surprised you the most — not the best one, the most unexpected one. what did it do to the story?\"",
              },
            ].map((a) => (
              <div key={a.n} className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[12px] font-extrabold text-white">
                    {a.n}
                  </span>
                  <div className="flex-1">
                    <p className="text-[14px] font-extrabold text-ink">
                      approach {a.n} — {a.name.toLowerCase()}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                      {a.blurb}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink">
                      <span className="font-semibold">when to use: </span>
                      {a.when}
                    </p>
                    <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted">
                      <span className="font-semibold not-italic">example for tale trail — </span>
                      {a.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── ARTIVERSE TIMELINE (art only) ─── */}
      {isArt && programme.artiverseUnits && programme.artiverseUnits.length > 0 && (
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num="05" label="the artiverse units">
          a progression from simple marks to layered compositions
        </SectionTitle>

        {/* Flipbook link — opens the artiverse portfolio as a page-turn book */}
        <Link
          href={`/${slug}/portfolio`}
          className="group mt-3 flex items-center gap-3 overflow-hidden rounded-card bg-gradient-to-br from-brand-orange to-[#C44017] px-4 py-3 text-white shadow-card transition hover:shadow-float active:scale-[0.99]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
            <BookOpen className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p
              className="text-[16px] font-extrabold leading-tight"
              style={{ fontFamily: "'Caveat', 'Kalam', cursive" }}
            >
              open the artiverse flipbook
            </p>
            <p className="mt-0.5 text-[10.5px] font-medium text-white/85">
              flip through all {programme.artiverseUnits?.length ?? 0} artworks, page by page
            </p>
          </div>
          <ChevronRight
            className="h-5 w-5 shrink-0 text-white transition group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
        </Link>

        <div className="mt-4 space-y-2">
          {(programme.artiverseUnits ?? []).map((unit) => (
            <div
              key={unit.id}
              className="flex items-center gap-3 rounded-lg bg-brand-white p-2.5 shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={unit.heroImageUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg bg-ink/[0.03] object-contain"
              />
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-[11px] font-extrabold text-brand-orange">
                {unit.unitNumber}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold text-ink truncate">
                    {unit.whatChildrenMake.toLowerCase()}
                  </p>
                  <span className="shrink-0 rounded-chip bg-ink/5 px-1.5 py-0.5 text-[9px] font-medium text-ink-muted">
                    {unit.days} {unit.days === 1 ? "day" : "days"}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span
                    className={cn(
                      "rounded-chip px-1.5 py-0.5 text-[9px] font-bold text-ink",
                      mediumColor[unit.medium.toLowerCase()] || "bg-ink/5"
                    )}
                  >
                    {unit.medium.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-brand-orange/5 p-4">
          <p className="text-[12px] font-bold text-ink">why this order</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
            units progress from simple single-mark techniques to complex layered compositions. each unit builds on the last — children don't see the progression, they just feel ready for the next challenge.
          </p>
        </div>
      </section>
      )}

      {/* ─── CHECKPOINTS ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num="06" label="progression checkpoints">
          every 8 sessions, a note home
        </SectionTitle>

        <div className="mt-4 rounded-xl bg-brand-white p-4 shadow-card">
          <div className="flex flex-wrap items-center gap-2">
            {[8, 16, 24, 32, 40, 48].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10 text-[11px] font-extrabold text-brand-orange">
                  {n}
                </div>
                <span className="text-ink-subtle">→</span>
              </div>
            ))}
            <div
              className="flex h-9 items-center justify-center rounded-full border-2 border-dashed border-brand-orange/30 px-3 text-[10px] font-bold text-brand-orange/70"
              aria-label="journey continues"
            >
              ··· journey continues
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
            after every 8 sessions, the teacher writes a brief progress note directly in the child's experience book. three descriptors per skill area: <span className="font-bold text-ink">starting out</span> · <span className="font-bold text-ink">getting there</span> · <span className="font-bold text-ink">going strong</span>. always forward-looking, always specific.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mt-10 px-4 md:px-8">
        <Link
          href={`/${slug}`}
          className="block rounded-card bg-brand-orange p-5 text-center text-white shadow-float transition hover:opacity-95 active:scale-[0.99]"
        >
          <p className="text-[14px] font-extrabold">view the daily plan</p>
          <p className="mt-0.5 text-[11px] opacity-90">see exactly what happens each session</p>
        </Link>
      </section>
    </div>
  );
}

// ─── helper components ───

function SectionTitle({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
          {num}
        </span>
        <span className="text-[11px] font-bold text-ink-muted">{label}</span>
      </div>
      {children && (
        <h2 className="mt-1 text-[18px] font-extrabold leading-tight text-ink md:text-[22px]">
          {children}
        </h2>
      )}
    </div>
  );
}
