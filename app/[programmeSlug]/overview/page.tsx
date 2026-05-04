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
  Zap,
  Star,
  BookOpen,
  ChevronRight,
  ChevronDown,
  FlaskConical,
  Wrench,
  Droplet,
  Brush,
  Pencil,
  Hand,
  Layers,
  Sparkles,
  Lightbulb,
  PenTool,
  Moon,
  CirclePlus,
  Crosshair,
  PenLine,
  Eye,
  Heart,
  Wand2,
  Ear,
  MessageCircle,
  Music,
  type LucideIcon,
} from "lucide-react";
import { getCurriculumProgramme, getActivityImage, GYM_BOOK_IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TeacherGate } from "@/components/TeacherGate";
import { ArtiverseChapters } from "@/components/ArtiverseChapters";
import { ArtistotleChapters } from "@/components/ArtistotleChapters";
import { LanguageBooksGrid } from "@/components/LanguageBooksGrid";
import { SongsPlaylist } from "@/components/SongsPlaylist";
import { segmentPalette } from "@/components/segmentPalette";

// ─── Artiverse — how it works · sequence data ────────────────

const ARTIVERSE_SEQUENCE_5_8: {
  n: number;
  name: string;
  icon: typeof Palette;
  blurb: string;
  whyHere: string;
}[] = [
  {
    n: 1,
    name: "brush pen",
    icon: Brush,
    blurb: "dry. direct. no water. no mess. the child makes marks immediately and sees results immediately.",
    whyHere: "builds line confidence before any other variable is introduced.",
  },
  {
    n: 2,
    name: "colour pencil",
    icon: Pencil,
    blurb: "dry. slow. layerable. the child learns to combine shapes and fill the whole page.",
    whyHere: "still no water — two dry tools before anything more complex.",
  },
  {
    n: 3,
    name: "tempera · fingerprinting",
    icon: Hand,
    blurb: "first encounter with paint — but no brush. the child uses their hands directly on the material.",
    whyHere: "the child feels what paint is before they have to control a brush. hands first, tool second.",
  },
  {
    n: 4,
    name: "oil pastel",
    icon: CirclePlus,
    blurb: "waxy. bold. forgiving. no water. press hard and the colour fills the shape.",
    whyHere: "ready for a richer material but still without the variable of water.",
  },
  {
    n: 5,
    name: "watercolour",
    icon: Droplet,
    blurb: "first time with brush and water together. transparent. light. the colour moves on its own.",
    whyHere: "dry tools and hand printing have built enough confidence that water does not overwhelm. the child focuses on what the water does rather than fighting the brush.",
  },
  {
    n: 6,
    name: "mixed media",
    icon: Sparkles,
    blurb: "cut. tear. paint. stick. layer. everything learned so far works together in one artwork.",
    whyHere: "the child has enough experience with individual materials to combine them with intention rather than at random.",
  },
  {
    n: 7,
    name: "acrylic paint",
    icon: Palette,
    blurb: "opaque. covers completely. mixes richly. the most complex medium — it can correct, layer, and transform.",
    whyHere: "saved for when the child has enough experience across other materials to use it well rather than to fix mistakes.",
  },
];

const ARTIVERSE_SEQUENCE_8_12: {
  n: number;
  name: string;
  icon: typeof Palette;
  blurb: string;
  whyHere: string;
}[] = [
  {
    n: 1,
    name: "oil pastel and colour pencil",
    icon: Pencil,
    blurb: "bold and controlled. layerable and expressive. the child builds mark-making confidence and learns to layer colour before introducing water.",
    whyHere: "dry tools allow full focus on line, shape, proportion, and colour relationships.",
  },
  {
    n: 2,
    name: "watercolour",
    icon: Droplet,
    blurb: "transparent washes. light to dark. the most demanding colour discipline.",
    whyHere: "the child has colour understanding from step 1. watercolour demands working light to dark — you cannot paint over a mistake. this precision is only useful after the child has some colour experience.",
  },
  {
    n: 3,
    name: "acrylic paint",
    icon: Palette,
    blurb: "opaque. gestural. correctable.",
    whyHere: "after transparent watercolour, the child understands the difference between a medium that forgives and one that does not. acrylic becomes a deliberate choice, not a default.",
  },
  {
    n: 4,
    name: "oil pastel and colour pencil — at greater depth",
    icon: Layers,
    blurb: "the same tools as step 1, now used for tonal gradients, layered texture, complex surfaces.",
    whyHere: "the child now brings observational skill and tonal awareness that was not present at the start.",
  },
  {
    n: 5,
    name: "black paper and chalk pastel",
    icon: Moon,
    blurb: "the whole game reverses. you are painting with light, not colour.",
    whyHere: "working light on dark is a conceptual shift that requires a strong prior understanding of how tone and contrast work. it only makes sense after step 4.",
  },
  {
    n: 6,
    name: "mixed media",
    icon: Sparkles,
    blurb: "all tools. all techniques. one composition.",
    whyHere: "genuine creative combination is only possible when the child knows what each material does individually. mixed media at the end is not chaos — it is intentional.",
  },
];

// ─── Art 5-8 programme overview data ──────────────────────────

const dailyFlow = [
  {
    id: "art-gym",
    icon: Dumbbell,
    name: "art gym",
    time: "15–20 min",
    durationFlex: 17.5,
    meaning:
      "a structured opening segment using books, cue cards, and their extensions, where each session builds directly on the previous one. art gym books are laminated — children mark them with resources of choice: thread, clay, sequins, or erasable markers.",
    color: "bg-segment-yellow",
    textColor: "text-ink",
  },
  {
    id: "art-games",
    icon: Gamepad2,
    name: "art games",
    time: "15–20 min",
    durationFlex: 17.5,
    meaning:
      "openhouse art games using varied formats and materials. children experiment, create, and develop core art skills through playful exploration.",
    color: "bg-segment-green/30",
    textColor: "text-ink",
  },
  {
    id: "artiverse",
    icon: Palette,
    name: "artiverse",
    time: "40–45 min",
    durationFlex: 42.5,
    meaning:
      "a structured making programme combining medium, technique, and outcome over multiple sessions.",
    color: "bg-segment-blue/30",
    textColor: "text-ink",
  },
  {
    id: "log-book",
    icon: Notebook,
    name: "experience book",
    time: "10 min",
    durationFlex: 10,
    meaning:
      "children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? what you enjoyed? what you didn't? what to do again? every child speaks. after children leave, the teacher fills in the skill-assessment part privately. these daily notes compile into the monthly report card that goes home.",
    color: "bg-segment-pink/30",
    textColor: "text-ink",
  },
];

const skills = [
  {
    id: "lt",
    name: "line & texture",
    color: "bg-segment-yellow",
    accent: "border-segment-yellow",
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
    color: "bg-segment-blue",
    accent: "border-segment-blue",
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
    color: "bg-segment-pink",
    accent: "border-segment-pink",
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
    color: "bg-segment-green",
    accent: "border-segment-green",
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
    color: "bg-brand-orange",
    accent: "border-brand-orange",
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
    color: "bg-segment-yellow",
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
    color: "bg-segment-green/30",
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
    color: "bg-segment-blue/30",
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
    color: "bg-segment-pink/30",
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
  "brush pen": "bg-segment-blue/30",
  "colour pencil": "bg-segment-pink/30",
  tempera: "bg-segment-yellow/30",
  "oil pastel": "bg-brand-orange/15",
  watercolour: "bg-segment-green/30",
  "watercolour + collage": "bg-segment-green/45",
  "mixed media": "bg-segment-yellow/30",
  "acrylic paint": "bg-segment-yellow/60",
  "brush pen + accent": "bg-segment-blue/45",
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
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  // Accordion state for the SEGMENTS section — each segment's full
  // detail (game pool + dual-book / cycle / artiverse / build extras)
  // collapses by default and opens on click.
  const [openSegment, setOpenSegment] = useState<string | null>(null);
  // Skills are always-visible posters now — no toggle state needed.

  if (!programme) {
    notFound();
    return null;
  }

  const isArt = programme.category === "art";
  const isRobotics = programme.category === "stem";
  const isLanguage = programme.category === "language";

  // Every overview has the same four top-level sections now: daily flow
  // · skills · segments (each segment card contains its full info inline)
  // · checkpoints. No per-category overrides needed.
  const SECTION_NUM: Record<string, string> = {
    "daily-flow": "01",
    "skills": "02",
    "segment-logic": "03",
    "books": "04",
    "checkpoints": "05",
    // Language-specific section numbering — only used when the
    // category === "language" branch renders these sections.
    "how-it-works": "04",
    "six-day-arc": "05",
    "language-books": "06",
    "songs": "07",
    "why-it-works": "08",
  };
  const sectionNum = (key: string) => SECTION_NUM[key] ?? "—";

  // Build skills list from this programme's own skill areas so the abilities
  // match the age group & category.
  // Optional Lucide icons for skills + abilities. Currently used by the
  // Art & Design 3-5 programme; other programmes fall back to the numeric /
  // letter badge below.
  const skillIcon: Record<string, LucideIcon> = {
    // 3-5 art skill families
    fm: Hand,
    co: Palette,
    ce: Sparkles,
    // Language through Storytelling — 3-5 skill families
    listening: Ear,
    speaking: MessageCircle,
    reading: BookOpen,
    vocabulary: Sparkles,
    "play-writes": PenLine,
  };
  const abilityIcon: Record<string, LucideIcon> = {
    // Fine Motor abilities (4)
    "fm-0": Crosshair, // Tool Precision
    "fm-1": PenLine, // Tracing
    "fm-2": Pencil, // Drawing Figures and Patterns
    "fm-3": Sparkles, // Fine Motor Integration ★
    // Colour abilities (4)
    "co-0": Droplet, // Explores freely
    "co-1": Eye, // Names and recognises
    "co-2": Layers, // Mixes and notices
    "co-3": Palette, // Colour Integration ★
    // Creative Expression abilities (4)
    "ce-0": Layers, // Explores Artistic Concepts
    "ce-1": Heart, // Emotional Expression through Art
    "ce-2": Wand2, // Integrating Artistic Choices
    "ce-3": Sparkles, // Visual Arts Integration ★
    // Language — Listening (3 abilities, 3rd is north star)
    "listening-0": Ear,
    "listening-1": Eye,
    "listening-2": Sparkles,
    // Language — Speaking
    "speaking-0": MessageCircle,
    "speaking-1": MessageCircle,
    "speaking-2": Sparkles,
    // Language — Reading
    "reading-0": BookOpen,
    "reading-1": Lightbulb,
    "reading-2": Sparkles,
    // Language — Vocabulary
    "vocabulary-0": Eye,
    "vocabulary-1": Hand,
    "vocabulary-2": Sparkles,
    // Language — Play-Writes
    "play-writes-0": Brush,
    "play-writes-1": PenLine,
    "play-writes-2": Sparkles,
  };

  const skillStyle: Record<string, { color: string; accent: string }> = {
    // art skill families
    lt: { color: "bg-segment-yellow", accent: "border-segment-yellow" },
    sf: { color: "bg-segment-blue", accent: "border-segment-blue" },
    cp: { color: "bg-segment-pink", accent: "border-segment-pink" },
    bc: { color: "bg-segment-green", accent: "border-segment-green" },
    ic: { color: "bg-brand-orange", accent: "border-brand-orange" },
    // 3-5 art skill families
    fm: { color: "bg-segment-yellow", accent: "border-segment-yellow" },
    co: { color: "bg-segment-pink", accent: "border-segment-pink" },
    ce: { color: "bg-segment-blue", accent: "border-segment-blue" },
    // public speaking skill families
    cs: { color: "bg-segment-yellow", accent: "border-segment-yellow" },
    bl: { color: "bg-segment-blue", accent: "border-segment-blue" },
    vs: { color: "bg-segment-pink", accent: "border-segment-pink" },
    // robotics skill families (lt re-uses the art lt colour — not shown together on any page)
    bm: { color: "bg-segment-pink", accent: "border-segment-pink" },
    ps: { color: "bg-segment-blue", accent: "border-segment-blue" },
    ou: { color: "bg-segment-green", accent: "border-segment-green" },
    // language — five skill families, each with its own segment-tone colour
    listening: { color: "bg-segment-yellow", accent: "border-segment-yellow" },
    speaking: { color: "bg-brand-orange", accent: "border-brand-orange" },
    reading: { color: "bg-segment-blue", accent: "border-segment-blue" },
    vocabulary: { color: "bg-segment-pink", accent: "border-segment-pink" },
    "play-writes": { color: "bg-segment-green", accent: "border-segment-green" },
  };

  // Build daily flow dynamically from this programme's segment definitions.
  // Colour tokens come from segmentPalette so every segment-coloured surface
  // in the codebase reads from one source. Per-segment meaning + icon lives
  // here; meaning falls back to the programme's own segment.objective when
  // a programme-specific copy is needed (e.g. 3-5 art gym).
  const segmentMeta: Record<string, { icon: typeof Dumbbell; durationFlex: number; meaning: string }> = {
    "art-gym": {
      icon: Dumbbell,
      durationFlex: 17.5,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "art-gym")?.objective ??
        "A structured opening segment.",
    },
    "art-games": { icon: Gamepad2, durationFlex: 17.5, meaning: "One art game that builds a specific skill. All children play simultaneously." },
    artiverse: { icon: Palette, durationFlex: 42.5, meaning: "A structured making programme combining medium, technique, and outcome over multiple sessions." },
    "roll-call": { icon: Zap, durationFlex: 9, meaning: "A quick energetic start. Group games that wake up voice, body, and attention — every child playing simultaneously within 2 minutes." },
    playground: { icon: Gamepad2, durationFlex: 22, meaning: "One group game played deeply, with a full debrief. Children practise speaking through play." },
    showtime: { icon: Star, durationFlex: 32, meaning: "Children step into the spotlight. Structured formats that build performance, argument, and conviction." },
    "log-book": {
      icon: Notebook,
      durationFlex: 10,
      // Pull from the programme's own segmentDefinitions so 3-5 art
      // (where the teacher fills the book on behalf of the children)
      // and 5-8 / 8-12 (where children fill it themselves) each
      // surface their own canonical wording. Falls back to the
      // 5-8/8-12 paragraph if a programme has no objective set.
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "log-book")?.objective ??
        "Children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? What you enjoyed? What you didn't? What to do again? Every child speaks. After children leave, the teacher fills the skill-assessment part privately. The daily notes compile into the monthly report card that goes home.",
    },
    "art-care": {
      icon: Sparkles,
      durationFlex: 5,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "art-care")?.objective ??
        "Children take responsibility for materials and the shared space by putting everything back in place. The focus is on building care, independence, and respect for tools through consistent practice.",
    },
    experiment: { icon: FlaskConical, durationFlex: 40, meaning: "Groups of 2–4 children find the answer to one specific question. Every child takes at least one measurement independently. Teacher asks one question per group and never gives the answer. Tool orientation is embedded here — each tool introduced once, confirmed once, never revisited." },
    build: { icon: Wrench, durationFlex: 40, meaning: "Each child builds their own mechanical model using a personal kit and a step card. The teacher never fixes anything and never tells anyone what to do next. Four questions only. When something doesn't work, the child figures it out." },
    "experience-book": { icon: Notebook, durationFlex: 10, meaning: "Five marks per child per session — O&U and LT from the experiment, B&M and PS from the build, concept ticked when the child can explain it. One specific note per child. Compiles into a monthly robotics journey letter." },

    // Language through Storytelling — six segments. Meanings sourced
    // from the programme's segmentDefinitions when present so the
    // canonical copy stays in one place.
    "roll-rhyme": {
      icon: Music,
      durationFlex: 10,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "roll-rhyme")?.objective ??
        "A whole-class warm-up using a fixed playlist of five Barefoot Books songs.",
    },
    "book-o-clock": {
      icon: BookOpen,
      durationFlex: 25,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "book-o-clock")?.objective ??
        "The spine of the session — a read-aloud following the 6-day arc.",
    },
    wordsmiths: {
      icon: Sparkles,
      durationFlex: 10,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "wordsmiths")?.objective ??
        "One vocabulary resource matched to the current book — see → act → say.",
    },
    "play-writes": {
      icon: PenLine,
      durationFlex: 10,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "play-writes")?.objective ??
        "Independent A4 play-writes books. Every child works simultaneously.",
    },
  };
  const dailyFlow = programme.segmentDefinitions.map((s) => {
    const meta = segmentMeta[s.id] ?? segmentMeta["log-book"];
    const palette = segmentPalette(s.id);
    return {
      id: s.id,
      icon: meta.icon,
      name: (s.id === "log-book" || s.id === "experience-book") ? "experience book" : s.name.toLowerCase(),
      time: s.durationRange,
      durationFlex: meta.durationFlex,
      meaning: meta.meaning,
      color: palette.fill,
      textColor: palette.text,
    };
  });

  const skills = programme.skillAreas.map((s) => ({
    id: s.id,
    name: s.name.toLowerCase(),
    color: skillStyle[s.id]?.color ?? "bg-ink/10",
    accent: skillStyle[s.id]?.accent ?? "border-ink/20",
    // Brand voice: ability names are short labels (lowercase). The
    // description is body copy and stays as-written (sentence case from
    // the source content).
    abilities: s.abilities.map((a) =>
      typeof a === "string"
        ? a
        : { ...a, name: a.name.toLowerCase(), description: a.description }
    ),
  }));

  // Build the games table per segment from this programme's own activities
  // so each age group sees only its own games.
  const segmentGamesDynamic = [
    {
      segment: "art gym",
      icon: Dumbbell,
      color: "bg-segment-yellow",
      time: programme.ageGroup === "3-5" ? "15 min" : "15–20 min",
      // For 3-5, art gym rotates between the laminated art gym book
      // and the scribble book — the SEGMENTS chip should reflect that.
      // 5-8 / 8-12 still cycle book → ext → cue card → ext (also rotation).
      type: "rotating" as const,
      games:
        programme.ageGroup === "3-5"
          ? [
              { name: "art gym book", skills: ["fine motor", "creative expression"], rotation: "fixed" as const },
              { name: "scribble book", skills: ["fine motor", "creative expression"], rotation: "fixed" as const },
            ]
          : [
              { name: programme.ageGroup === "8-12" ? "art gym book 5 & 6" : "art gym book 3 & 4", skills: ["line & texture", "shape & form"], rotation: "fixed" as const },
              { name: "extension (sketchbook, book day)", skills: ["imagination & collaboration"], rotation: "fixed" as const },
              { name: programme.ageGroup === "8-12" ? "cue cards b1 & b2 + backgrounds" : "cue cards b1 & b2", skills: ["line & texture", "shape & form"], rotation: "fixed" as const },
              { name: "extension (sketchbook, cue card day)", skills: ["balance & composition"], rotation: "fixed" as const },
            ],
    },
    {
      segment: "art games",
      icon: Gamepad2,
      color: "bg-segment-green/30",
      time: programme.ageGroup === "3-5" ? "25 min" : "15–20 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "art-games")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: programme.ageGroup === "3-5" ? "artiverse / artistotle" : "artiverse",
      icon: Palette,
      color: "bg-segment-blue/30",
      time: programme.ageGroup === "3-5" ? "35 min" : "40–45 min",
      type: "fixed" as const,
      games: [{ name: `${programme.artiverseUnits?.length ?? 0} ${programme.ageGroup === "3-5" ? "projects" : "artiverse units"}`, skills: ["all five skills"], rotation: "fixed" as const }],
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-segment-pink/30",
      time: "10 min",
      type: "fixed" as const,
      games: [{ name: "personal experience book", skills: ["reflection"], rotation: "fixed" as const }],
    },
    // Art Care exists only on the 3-5 programme.
    ...(programme.ageGroup === "3-5"
      ? [
          {
            segment: "art care",
            icon: Sparkles,
            color: "bg-brand-orange/15",
            time: "5 min",
            type: "fixed" as const,
            games: [
              {
                name: "tidy + reset the making space",
                skills: ["responsibility"],
                rotation: "fixed" as const,
              },
            ],
          },
        ]
      : []),
  ];

  // Public-speaking games table — built dynamically per segment.
  const psSegmentGames = [
    {
      segment: "roll call",
      icon: Zap,
      color: "bg-segment-yellow",
      time: "8–10 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "roll-call")
        .map((a) => ({ name: a.title.toLowerCase(), skills: a.cardName ? [a.cardName.toLowerCase()] : [], rotation: "rotating" as const })),
    },
    {
      segment: "playground",
      icon: Gamepad2,
      color: "bg-segment-green/30",
      time: "20–25 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "playground")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: "showtime",
      icon: Star,
      color: "bg-segment-blue/30",
      time: "30–35 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "showtime")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-segment-pink/30",
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
      color: "bg-segment-yellow",
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
      color: "bg-segment-green/30",
      time: "40 min",
      type: "fixed" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "build")
        .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "fixed" as const })),
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-segment-pink/30",
      time: "10 min",
      type: "fixed" as const,
      games: [{ name: "daily five-mark log · monthly robotics journey letter", skills: ["reflection"], rotation: "fixed" as const }],
    },
  ];

  // Language games table — five language-programme segments plus the
  // experience book closing. Roll & Rhyme and Book'o'Clock have no
  // rotation pool (Roll & Rhyme uses a fixed song playlist; Book'o'Clock
  // follows the 6-day book arc). Wordsmiths and Playground rotate
  // through the activities defined in the programme file.
  const languageSegmentGames = [
    {
      segment: "roll & rhyme",
      icon: Zap,
      color: "bg-segment-yellow",
      time: "10 min",
      type: "fixed" as const,
      games: [
        {
          name: "five-song playlist",
          skills: ["listening", "speaking"],
          rotation: "fixed" as const,
        },
      ],
    },
    {
      segment: "book'o'clock",
      icon: BookOpen,
      color: "bg-segment-blue/30",
      time: "25 min",
      type: "fixed" as const,
      games: [
        {
          name: "8 books · 6-day arc each",
          skills: ["listening", "reading", "speaking"],
          rotation: "fixed" as const,
        },
      ],
    },
    {
      segment: "wordsmiths",
      icon: Sparkles,
      color: "bg-brand-orange/15",
      time: "10 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "wordsmiths")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: ["vocabulary", "speaking"],
          rotation: "rotating" as const,
        })),
    },
    {
      segment: "play-writes",
      icon: PenLine,
      color: "bg-segment-green/30",
      time: "10 min",
      type: "fixed" as const,
      games: [
        {
          name: "individual a4 play-writes book",
          skills: ["pre-writing"],
          rotation: "fixed" as const,
        },
      ],
    },
    {
      segment: "playground",
      icon: Gamepad2,
      color: "bg-segment-green/30",
      time: "15 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "playground")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: [] as string[],
          rotation: "rotating" as const,
        })),
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: "bg-segment-pink/30",
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

  const gamesTable = isRobotics
    ? roboticsSegmentGames
    : isArt
      ? segmentGamesDynamic
      : isLanguage
        ? languageSegmentGames
        : psSegmentGames;

  return (
    <div className="flex flex-col pb-6">
      {/* ─── Back link → programme page ─── */}
      <div className="px-4 pt-4 md:px-8">
        <Link
          href={`/${slug}`}
          className="flex items-center gap-1 text-[12px] font-bold text-brand-orange hover:underline"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          back to programme
        </Link>
      </div>

      {/* ─── HERO BAND ─── */}
      <section className="mt-4 px-4 md:px-8">
        <div className="overflow-hidden rounded-2xl bg-brand-cream ring-1 ring-ink/5">
          <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-7">
            <div>
              <p className="text-[11px] font-bold text-ink-subtle">programme overview</p>
              <h1 className="mt-2 text-[28px] font-extrabold lowercase leading-[1.05] tracking-tight text-ink md:text-[40px]">
                {programme.title}
              </h1>
              <p className="mt-2 text-[12px] font-semibold text-ink-muted md:text-[13px]">
                {programme.ageLabel.toLowerCase()}
              </p>
              <div className="mt-4 border-l-[3px] border-brand-orange pl-4">
                <p className="text-[13px] leading-relaxed text-ink md:text-[14px]">
                  {programme.description}
                </p>
              </div>
            </div>
            {programme.heroImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={programme.heroImageUrl}
                alt={programme.title}
                className="mx-auto h-32 w-auto rounded-xl bg-brand-white object-contain ring-1 ring-ink/10 md:h-40"
                style={{ mixBlendMode: "multiply" }}
              />
            )}
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 gap-px bg-ink/5 md:grid-cols-4">
            {[
              {
                // 3-5 art is an ongoing programme — call out that the 60
                // is what's authored so far rather than the curriculum's
                // total length.
                label: programme.slug === "art-design-3-5" ? "sessions uploaded" : "sessions",
                value: String(programme.totalSessions),
              },
              { label: "age group", value: programme.ageLabel.replace(/^ages?\s+/i, "") },
              {
                label: "session length",
                value: isRobotics ? "90 min" : isArt ? "90 min" : "90 min",
              },
              {
                label: "class size",
                value: programme.category === "art" ? "6–10" : programme.category === "stem" ? "6–10" : "6–10",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-brand-cream px-3 py-3 text-center"
              >
                <p className="text-[18px] font-extrabold leading-none text-ink md:text-[20px]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-ink-muted md:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {programme.slug === "art-design-3-5" && (
          <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
            this is an ongoing programme — new sessions are added regularly.
          </p>
        )}
      </section>

      {/* ─── WHY THIS PROGRAMME WORKS — 3-5 art only ─── */}
      {programme.slug === "art-design-3-5" && (
        <section className="mt-10 px-4 md:px-8">
          <SectionTitle num="·" label="the approach">
            How the segments build different skills — and why artiverse and artistotle alternate.
          </SectionTitle>

          {/* Segment → primary skill grid */}
          <div className="mt-5">
            <p className="text-[12px] font-bold text-ink">Each segment trains a different muscle</p>
            <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted">
              The 90 minutes are deliberately structured so that fine motor, creative expression, and reflection each get their own time and tool.
            </p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {[
                {
                  emoji: "🖐️",
                  label: "art gym",
                  skill: "Fine motor",
                  body: "The laminated book trains hand control through short, focused mark-making.",
                  ring: "ring-segment-yellow",
                  accent: "text-ink",
                },
                {
                  emoji: "✏️",
                  label: "scribble book",
                  skill: "Creative expression",
                  body: "Open prompts invite the child to invent — there is no correct answer.",
                  ring: "ring-segment-yellow",
                  accent: "text-ink",
                },
                {
                  emoji: "🎮",
                  label: "art games",
                  skill: "Art skills through play",
                  body: "One game per session — children practise a specific skill the way children practise: by playing.",
                  ring: "ring-segment-green",
                  accent: "text-ink",
                },
                {
                  emoji: "🌍",
                  label: "artiverse",
                  skill: "Material exploration",
                  body: "12 projects, 2 days each, 2 distinct artworks. Every project deepens command of one medium.",
                  ring: "ring-segment-blue",
                  accent: "text-ink",
                },
                {
                  emoji: "👴",
                  label: "artistotle",
                  skill: "Story narrative · cultural exposure",
                  body: "6 illustrators, 3 days each, 1 finished piece. Children meet an artist's voice and make in their spirit.",
                  ring: "ring-brand-orange",
                  accent: "text-ink",
                },
                {
                  emoji: "📓",
                  label: "experience book",
                  skill: "Reflection",
                  body: "The teacher records the day with the children — a daily mark of what was noticed and built.",
                  ring: "ring-segment-pink",
                  accent: "text-ink",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className={cn(
                    "rounded-xl bg-brand-white p-3 ring-2",
                    row.ring,
                  )}
                >
                  <p className={cn("text-[12px] font-extrabold lowercase", row.accent)}>
                    <span aria-hidden className="mr-1.5 text-[14px]">{row.emoji}</span>
                    {row.label}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold tracking-normal text-brand-orange">
                    {row.skill}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-muted">
                    {row.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Artiverse vs Artistotle distinction */}
          <div className="mt-7">
            <p className="text-[12px] font-bold text-ink">Two making modes that complement each other</p>
            <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted">
              Artiverse opens the materials. Artistotle gives them a story. They alternate so children grow on both fronts.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {/* Artiverse panel */}
              <div className="relative overflow-hidden rounded-2xl bg-brand-white p-4 ring-2 ring-segment-blue">
                <span aria-hidden className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-segment-blue/80 text-[18px] shadow-md ring-2 ring-white/70">
                  🌍
                </span>
                <p className="text-[10px] font-bold text-ink-subtle">mode 1</p>
                <h3 className="mt-0.5 text-[16px] font-extrabold lowercase text-ink">artiverse</h3>
                <p className="mt-1 text-[11px] font-semibold text-segment-blue/90">
                  12 projects · 2 continuous days · 2 distinct artworks
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Same medium and technique across both days.",
                    "Day 1 makes a complete artwork. Day 2 makes a brand new one — not a continuation.",
                    "Reference image is a starting point only — the subject is the child's choice.",
                    "Builds depth in a material before moving on.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-segment-blue/80" />
                      <span className="flex-1">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Artistotle panel */}
              <div className="relative overflow-hidden rounded-2xl bg-brand-white p-4 ring-2 ring-brand-orange">
                <span aria-hidden className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/85 text-[18px] shadow-md ring-2 ring-white/70">
                  👴
                </span>
                <p className="text-[10px] font-bold text-ink-subtle">mode 2</p>
                <h3 className="mt-0.5 text-[16px] font-extrabold lowercase text-ink">artistotle</h3>
                <p className="mt-1 text-[11px] font-semibold text-brand-orange">
                  6 illustrators · 3 continuous days · 1 finished project
                </p>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "One artwork built across three sessions.",
                    "Day 1 begins it. Day 2 deepens it. Day 3 finishes it.",
                    "Children meet a real illustrator's voice — Carle, Ehlert, Gomi — and make in that spirit.",
                    "Builds story narrative and cultural exposure alongside making.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
                      <span className="flex-1">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 text-[11px] italic leading-relaxed text-ink-muted">
              The two modes alternate across the year. By the time a child finishes the programme they have explored materials deeply (artiverse) AND made finished pieces in the spirit of three real illustrators (artistotle).
            </p>
          </div>
        </section>
      )}

      {/* ─── DAILY FLOW ─── */}
      <section className="mt-8 px-4 md:px-8">
        <SectionTitle num={sectionNum("daily-flow")} label="daily flow" />
        <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink md:text-[14px]">
          A 90-minute session — four segments, in this order.
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
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>


      {/* ─── SKILLS & ABILITIES ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num={sectionNum("skills")} label="skills & abilities">
          {skills.length} skills · {skills[0]?.abilities.length ?? 0} abilities each
        </SectionTitle>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="overflow-hidden rounded-xl bg-brand-white shadow-card ring-1 ring-ink/5"
            >
              <div className="flex items-center gap-3 p-4">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white",
                    skill.color
                  )}
                >
                  {(() => {
                    const SkillIcon = skillIcon[skill.id];
                    return SkillIcon ? (
                      <SkillIcon className="h-5 w-5" strokeWidth={2} />
                    ) : (
                      skill.id
                    );
                  })()}
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-extrabold lowercase text-ink">{skill.name}</p>
                  <p className="text-[10px] text-ink-muted">{skill.abilities.length} abilities</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-ink/5 bg-brand-cream/40 p-4">
                {skill.abilities.map((ability, i) => {
                  const locs = abilityLocations[`${skill.id}-${i}`] || [];
                  // Ability may be either a plain string (legacy) or a
                  // richer object with name + description + ★.
                  const isObj = typeof ability === "object" && ability !== null;
                  const abilityName = isObj ? (ability as { name: string }).name : null;
                  const abilityDesc = isObj ? (ability as { description: string }).description : (ability as string);
                  const isNorthStar = isObj && (ability as { isNorthStar?: boolean }).isNorthStar;
                  const AbilityIcon = abilityIcon[`${skill.id}-${i}`];
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold text-white",
                          skill.color
                        )}
                      >
                        {AbilityIcon ? (
                          <AbilityIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <div className="flex-1">
                        {abilityName && (
                          <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13.5px]">
                            {abilityName}
                            {isNorthStar && (
                              <span
                                aria-label="north star ability"
                                className="ml-1.5 text-brand-orange"
                              >
                                ★
                              </span>
                            )}
                          </p>
                        )}
                        <p className={cn("text-[12px] leading-relaxed md:text-[13px]", abilityName ? "mt-0.5 text-ink-muted" : "text-ink")}>
                          {abilityDesc}
                        </p>
                        {locs.length > 0 && (
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
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SEGMENTS (pool + all extras inlined per segment) ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num={sectionNum("segment-logic")} label="segments">
          what happens inside each segment — everything in one place
        </SectionTitle>

        <div className="mt-4 space-y-2">
          {gamesTable.map((seg) => {
            const Icon = seg.icon;
            const isOpen = openSegment === seg.segment;
            return (
              <div key={seg.segment} className="overflow-hidden rounded-xl bg-brand-white shadow-card">
                {/* Header — always visible. Click to expand the segment's
                    full detail (game pool + any extras). */}
                <button
                  type="button"
                  onClick={() => setOpenSegment(isOpen ? null : seg.segment)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-left transition",
                    seg.color
                  )}
                  aria-expanded={isOpen}
                >
                  <Icon className="h-4 w-4 text-ink" />
                  <p className="text-[13px] font-extrabold text-ink">{seg.segment}</p>
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-ink-muted">
                    {seg.type === "rotating" ? (
                      <><RotateCw className="h-3 w-3" /> {seg.games.length} games</>
                    ) : (
                      <><Lock className="h-3 w-3" /> fixed</>
                    )}
                    <span className="mx-1">·</span>
                    {seg.time}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-ink/60 transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Expanded body — pool list + extras */}
                {isOpen && (
                  <div className="space-y-3 border-t border-ink/5 p-3">
                    {/* Pool list */}
                    <div className="overflow-hidden rounded-lg bg-brand-cream/40">
                      <div className="divide-y divide-ink/5">
                        {seg.games.map((g) => {
                          const slug = g.name.toLowerCase().replace(/\s+/g, "-");
                          const img =
                            getActivityImage(slug) ??
                            getActivityImage(slug.replace(/s$/, ""));
                          return (
                            <div key={g.name} className="flex items-center gap-2.5 px-3 py-2">
                              {img ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={img}
                                  alt=""
                                  className="h-9 w-9 shrink-0 rounded-md bg-ink/[0.03] object-contain"
                                />
                              ) : (
                                <div
                                  className={cn(
                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                                    seg.color
                                  )}
                                >
                                  <Icon className="h-4 w-4 text-ink/70" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-[12px] font-bold text-ink">{g.name}</p>
                                {g.skills.length > 0 && (
                                  <div className="mt-0.5 flex flex-wrap gap-1">
                                    {g.skills.map((s) => (
                                      <span
                                        key={s}
                                        className="rounded-chip bg-brand-orange/10 px-1.5 py-0.5 text-[9px] font-medium text-brand-orange"
                                      >
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <span className="shrink-0 rounded-chip bg-ink/5 px-1.5 py-0.5 text-[9px] font-bold text-ink-muted">
                                {g.rotation}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                {/* Rotation rule note (rotating segments only) */}
                {seg.type === "rotating" && (
                  <div className="rounded-xl bg-brand-orange/5 p-4">
                    <p className="text-[12px] font-bold text-ink">How rotation works</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                      Rotates across {seg.games.length} games — each activity can only repeat after all others have been used. Variations change how children play. Levels adjust difficulty within the same game, without separating children.
                    </p>
                  </div>
                )}
                {seg.type === "fixed" && isRobotics && (seg.segment === "experiment" || seg.segment === "build") && (
                  <div className="rounded-xl bg-brand-orange/5 p-4">
                    <p className="text-[12px] font-bold text-ink">How it runs</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                      No rotation — every session is fixed. Experiments and build-day steps are set in advance so children can join at any session and pick up exactly where the class is.
                    </p>
                    {seg.segment === "build" && (
                      <p className="mt-2 text-[11px] italic leading-relaxed text-ink-muted">
                        At the end of the build, teacher says &ldquo;two minutes to tidy your kit.&rdquo; Children sort components back to the kit box before the experience book begins.
                      </p>
                    )}
                  </div>
                )}

                {/* Art Care — primary description sourced from the
                    programme's segment objective so the same canonical
                    text shows in the daily-session popup, the daily flow
                    accordion, and here. The artiverse-tidy line is a
                    smaller italic addendum that names the practical
                    transition moment. */}
                {seg.segment === "art care" && isArt && (
                  <div className="rounded-xl bg-brand-orange/5 p-4">
                    <p className="text-[12px] font-bold text-ink">How it runs</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                      {programme.segmentDefinitions.find((s) => s.id === "art-care")?.objective ??
                        "Children take responsibility for materials and the shared space by putting everything back in place. The focus is on building care, independence, and respect for tools through consistent practice."}
                    </p>
                    <p className="mt-2 text-[11px] italic leading-relaxed text-ink-muted">
                      At the end of artiverse, teacher says &ldquo;two minutes to put materials away.&rdquo; Children tidy before the experience book begins.
                    </p>
                  </div>
                )}

                {/* ═══ ART GYM — 3-5 simplified version (book + scribble book) ═══ */}
                {seg.segment === "art gym" && isArt && programme.ageGroup === "3-5" && (
                  <div className="space-y-3">
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                      art gym is a daily 15-minute warm-up that rotates between two resources on consecutive sessions. <span className="font-semibold text-ink">no cue cards, no extensions at this age</span> — just the laminated <span className="font-semibold text-ink">art gym book</span> and the <span className="font-semibold text-ink">scribble book</span>.
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {/* Art Gym Book */}
                      <div className="overflow-hidden rounded-xl bg-segment-yellow/15 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[12px] font-extrabold text-ink">art gym book</p>
                          <span className="rounded-chip bg-brand-orange text-white px-2.5 py-0.5 text-[10px] font-semibold">
                            rotates
                          </span>
                        </div>
                        <span className="mt-1 inline-block rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
                          builds fine motor
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/gym-books/3-5-book.png"
                          alt="art gym book — sample page"
                          className="mt-3 h-40 w-full rounded-lg bg-brand-white object-contain ring-1 ring-ink/5"
                        />
                        <p className="mt-3 text-[11px] text-ink-muted">
                          one page per session. each page shows a pattern, a path, or a mark sequence to complete or extend.
                        </p>
                        <div className="mt-3 rounded-lg bg-brand-white p-3 shadow-card">
                          <p className="text-[11px] font-semibold text-ink">book rotation</p>
                          <p className="mt-1 text-[11px] text-ink-muted">
                            <span className="font-semibold text-ink">sessions ~1–30:</span> book 1 — 1–2 pages a day
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink-muted">
                            <span className="font-semibold text-ink">once book 1 is done:</span> move to book 2
                          </p>
                          <p className="mt-2 text-[10px] italic text-ink-subtle">
                            child chooses material — erasable markers, play-doh, thread, sequins.
                          </p>
                        </div>
                      </div>

                      {/* Scribble Book */}
                      <div className="overflow-hidden rounded-xl bg-segment-yellow/15 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[12px] font-extrabold text-ink">scribble book</p>
                          <span className="rounded-chip bg-brand-orange text-white px-2.5 py-0.5 text-[10px] font-semibold">
                            rotates
                          </span>
                        </div>
                        <span className="mt-1 inline-block rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
                          builds creative expression — visual arts
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/gym-books/3-5-scribble.png"
                          alt="scribble book — sample page"
                          className="mt-3 h-40 w-full rounded-lg bg-brand-white object-contain ring-1 ring-ink/5"
                        />
                        <p className="mt-3 text-[11px] text-ink-muted">
                          a4 spiral-bound book with illustrated pages. each page shows a partially complete scene with a single prompt at the bottom.
                        </p>
                        <div className="mt-3 rounded-lg bg-brand-white p-3 shadow-card">
                          <p className="text-[11px] font-semibold text-ink">how it runs</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                            child draws their response in the open space. one page per session. there is no correct response. the teacher does not instruct what to draw.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] italic text-ink-subtle">
                      They alternate because they build complementary skills — the laminated book trains the hand; the scribble book opens the imagination. Sessions alternate book ↔ scribble. Teacher does not teach or correct during art gym — they circulate and name what they see.
                    </p>
                  </div>
                )}

                {/* ═══ ART GYM — 5-8 / 8-12 cycle with book + cue cards + extensions ═══ */}
                {seg.segment === "art gym" && isArt && programme.ageGroup !== "3-5" && (
                  <div className="space-y-3">
        <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
          art gym runs as two paired units. the <span className="font-semibold text-ink">book</span> and the <span className="font-semibold text-ink">cue card</span> each rotate; their extensions always follow the previous day — not independent.
        </p>

        <div className="mt-4 space-y-4">
          {/* PAIR 1: Book + Extension */}
          <div className="overflow-hidden rounded-xl bg-segment-yellow/15 p-4">
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
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-segment-yellow text-[11px] font-bold text-ink">1</span>
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
          <div className="overflow-hidden rounded-xl bg-segment-yellow/15 p-4">
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
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-segment-yellow text-[11px] font-bold text-ink">3</span>
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

        {/* Book-day note: 1–3 pages + sketchbook replication */}
        <div className="mt-4 rounded-xl bg-brand-white p-4 shadow-card ring-1 ring-segment-yellow/30">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-segment-yellow/30 text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
            </span>
            <div className="flex-1">
              <p className="text-[12px] font-extrabold text-ink">on a book day</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                children always complete <span className="font-semibold text-ink">1–3 pages</span> in their laminated art gym book, then <span className="font-semibold text-ink">replicate what they drew freely in their sketchbook</span> — materials of choice.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["crayons", "colour pencils", "brush pens", "yarn + glue"].map((m) => (
                  <span
                    key={m}
                    className="rounded-chip bg-segment-yellow/20 px-2 py-0.5 text-[10px] font-semibold text-ink"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Extension-day progression ladder — 4 stages with arrows */}
        <div className="mt-4 rounded-xl bg-brand-white p-4 shadow-card ring-1 ring-segment-yellow/30">
          <p className="text-[12px] font-extrabold text-ink">on an extension day — apply the same lines</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
            children replicate yesterday&apos;s lines inside a new form. the same ladder applies to book extensions and cue card extensions — the teacher picks the rung that matches the child.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-4 md:gap-1">
            {[
              { icon: "⬛", label: "shape", example: "e.g. a square", tone: "bg-segment-yellow/20 text-ink" },
              { icon: "🍦", label: "simple object", example: "e.g. ice cream", tone: "bg-brand-orange/15 text-brand-orange" },
              { icon: "🚀", label: "imaginary object", example: "e.g. a funny rocket", tone: "bg-segment-blue/20 text-ink" },
              { icon: "🏖️", label: "scene", example: "e.g. a beach scene", tone: "bg-segment-pink/30 text-ink" },
            ].map((step, i, arr) => (
              <div key={step.label} className="relative flex md:block">
                <div className="flex-1 rounded-lg bg-ink/[0.02] p-3 ring-1 ring-ink/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-[20px]"
                      style={{ filter: "saturate(1.1)" }}
                    >
                      {step.icon}
                    </span>
                    <span
                      className={cn(
                        "rounded-chip px-2 py-0.5 text-[10px] font-bold",
                        step.tone
                      )}
                    >
                      step {i + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-bold text-ink">{step.label}</p>
                  <p className="mt-0.5 text-[10.5px] italic text-ink-subtle">{step.example}</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-ink-muted">
                    draw a {step.label} and replicate the lines inside it.
                  </p>
                </div>
                {/* Arrow between steps — horizontal on md+, vertical on mobile */}
                {i < arr.length - 1 && (
                  <>
                    <div className="hidden flex-none self-center px-1 text-brand-orange md:block">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
                      </svg>
                    </div>
                    <div className="block text-brand-orange md:hidden" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mx-1 self-center">
                        <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10.5px] italic text-ink-subtle">
            each rung is more advanced than the last — teacher chooses the rung that fits the child.
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-segment-yellow/15 p-4">

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
                  className="rounded-chip bg-segment-yellow/30 px-2.5 py-1 text-[10px] font-semibold text-ink"
                >
                  {t}
                </span>
              ))}
              {programme.ageGroup === "8-12" && (
                <>
                  <span className="rounded-chip bg-segment-blue/25 px-2.5 py-1 text-[10px] font-semibold text-ink">
                    landscape backgrounds
                  </span>
                  <span className="rounded-chip bg-segment-blue/25 px-2.5 py-1 text-[10px] font-semibold text-ink">
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
                  </div>
                )}

                {/* ═══ ARTIVERSE + ARTISTOTLE — 3-5 only ═══
                    Two modes that share this segment slot. Rendered as
                    two stacked self-contained blocks (everything about
                    artiverse first, then everything about artistotle)
                    so a teacher can read each mode without jumping. */}
                {seg.segment === "artiverse / artistotle" && isArt && programme.ageGroup === "3-5" && (
                  <div className="space-y-6">
                    {/* ── ARTIVERSE block ── */}
                    <div className="relative rounded-2xl bg-brand-white p-5 ring-2 ring-segment-blue md:p-6">
                      <span
                        aria-hidden="true"
                        title="Artiverse — 2 days, 2 distinct artworks"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-segment-blue/80 text-[20px] shadow-md ring-2 ring-white/70"
                      >
                        🌍
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-3 pr-12">
                        <div>
                          <p className="text-[10px] font-bold text-ink-subtle">mode 1</p>
                          <h3 className="mt-0.5 text-[18px] font-extrabold lowercase text-ink md:text-[20px]">
                            artiverse
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-segment-blue/90">
                            12 projects · 2 continuous days each · 2 distinct artworks per project
                          </p>
                        </div>
                        <Link
                          href="/artiverse-book"
                          className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:opacity-90"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          open the artiverse book
                        </Link>
                      </div>
                      <p className="mt-3 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                        A structured making programme across three material families — <span className="font-semibold text-ink">colourful papers</span>, <span className="font-semibold text-ink">crayons</span>, and <span className="font-semibold text-ink">watercolour</span>. Each project runs across two continuous days. On both days the same medium and technique are set, but the child makes a distinct artwork each day. The picture in the book is a reference only — children pick their own subject and take both works home.
                      </p>
                      <div className="mt-4">
                        <ArtiverseChapters compact />
                      </div>
                    </div>

                    {/* ── ARTISTOTLE block ── */}
                    <div className="relative rounded-2xl bg-brand-white p-5 ring-2 ring-brand-orange md:p-6">
                      <span
                        aria-hidden="true"
                        title="Artistotle — 3 days, 1 finished project"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/85 text-[20px] shadow-md ring-2 ring-white/70"
                      >
                        👴
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-3 pr-12">
                        <div>
                          <p className="text-[10px] font-bold text-ink-subtle">mode 2</p>
                          <h3 className="mt-0.5 text-[18px] font-extrabold lowercase text-ink md:text-[20px]">
                            artistotle
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-brand-orange">
                            6 illustrators · 3 continuous days each · 1 finished project per project
                          </p>
                        </div>
                        <Link
                          href="/artistotle-book"
                          className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:opacity-90"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          open the artistotle book
                        </Link>
                      </div>
                      <p className="mt-3 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                        Illustrator-led projects. Children meet the work of <span className="font-semibold text-ink">Eric Carle</span>, <span className="font-semibold text-ink">Lois Ehlert</span>, and <span className="font-semibold text-ink">Taro Gomi</span>, then make in the same spirit — not copies, but pieces in their style. Each project is built across three continuous days: day 1 begins it, day 2 deepens it, day 3 finishes it. One finished artwork comes home per project.
                      </p>
                      <div className="mt-4">
                        <ArtistotleChapters compact />
                      </div>
                    </div>

                    <p className="text-[10.5px] italic text-ink-subtle">
                      The two modes alternate across the programme; within each mode activities are linear in difficulty.
                    </p>
                  </div>
                )}

                {/* ═══ ARTIVERSE — how it works + units ═══ */}
                {seg.segment === "artiverse" && isArt && (
                  <div className="space-y-3">

          {/* The three elements */}
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: Palette,
                tag: "element 1",
                name: "medium",
                blurb:
                  "what material you use. oil pastel · watercolour · acrylic · brush pen.",
                status: "mandatory · fixed sequence · same for every child",
                accent: "bg-segment-yellow/20 text-ink",
              },
              {
                icon: PenTool,
                tag: "element 2",
                name: "tool & technique",
                blurb:
                  "how you use that material. how to hold it. what marks it makes. what skill you are building.",
                status: "mandatory · fixed sequence · same for every child",
                accent: "bg-segment-blue/20 text-ink",
              },
              {
                icon: Lightbulb,
                tag: "element 3",
                name: "topic & theme",
                blurb:
                  "what you make with it. an animal · a food · a place. something real or something imagined.",
                status: "always the child's choice · always open",
                accent: "bg-segment-green/20 text-ink",
              },
            ].map((el) => {
              const Icon = el.icon;
              return (
                <div
                  key={el.name}
                  className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        el.accent
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="flex-1">
                      <p className="text-[9px] font-bold text-ink-subtle">
                        {el.tag}
                      </p>
                      <p className="mt-0.5 text-[14px] font-extrabold text-ink">
                        {el.name}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                    {el.blurb}
                  </p>
                  <p className="mt-2 text-[10.5px] italic leading-relaxed text-ink-subtle">
                    {el.status}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Topic examples */}
          <div className="mt-4 rounded-xl bg-brand-orange/5 p-4">
            <p className="text-[11px] font-bold text-brand-orange">
              topics — always the child's choice
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              drawn from the world the child knows and the worlds they invent.
              the stranger and more personal, the better.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                "an animal I have seen",
                "a food I love",
                "a creature that does not exist",
                "a place I want to go",
                "a machine I made up",
                "a feeling I can't explain in words",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-chip bg-brand-white px-2.5 py-1 text-[10.5px] font-medium text-ink shadow-sm ring-1 ring-ink/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Why fixed order */}
          <div className="mt-6 rounded-xl bg-ink/[0.03] p-4">
            <p className="text-[12px] font-bold text-ink">
              why the medium and technique follow a fixed order
            </p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
              the sequence is not arbitrary. each medium is introduced when the child is ready for it — because they have already built the skill the new medium requires.
            </p>
          </div>

          {/* The sequence — age-group specific */}
          <div className="mt-4">
            <p className="text-[11px] font-bold text-ink-subtle">
              the sequence · ages {programme.ageLabel.replace(/ages? /i, "")}
            </p>
            <div className="mt-2 space-y-2">
              {(programme.ageGroup === "8-12"
                ? ARTIVERSE_SEQUENCE_8_12
                : ARTIVERSE_SEQUENCE_5_8
              ).map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.n}
                    className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[12px] font-extrabold text-white">
                        {step.n}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Icon
                            className="h-4 w-4 text-brand-orange"
                            strokeWidth={2}
                          />
                          <p className="text-[14px] font-extrabold text-ink">
                            {step.name}
                          </p>
                        </div>
                        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                          {step.blurb}
                        </p>
                        <p className="mt-2 text-[11px] leading-relaxed text-ink">
                          <span className="font-semibold">why here: </span>
                          <span className="text-ink-muted">{step.whyHere}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The four principles */}
          <div className="mt-6">
            <p className="text-[11px] font-bold text-ink-subtle">
              the four principles behind both sequences
            </p>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {[
                {
                  icon: Droplet,
                  name: "dry before wet",
                  blurb:
                    "confidence is built before complexity is introduced. water adds a variable — only introduced once the child has established control without it.",
                },
                {
                  icon: Hand,
                  name: "hands before tools",
                  blurb:
                    "touching the material directly before managing a tool gives the child a physical understanding of what paint actually is. this cannot be achieved through a brush alone.",
                },
                {
                  icon: Layers,
                  name: "transparent before opaque",
                  blurb:
                    "watercolour demands that the child understand colour — there is no covering mistakes. opaque paint comes after, so it becomes a deliberate choice, not a shortcut.",
                },
                {
                  icon: Sparkles,
                  name: "one material before many",
                  blurb:
                    "mixed media only becomes creative when the child knows what each individual material contributes. introduced too early, it produces accidental results. at the right time, it produces intentional ones.",
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.name}
                    className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                        <Icon
                          className="h-4.5 w-4.5 text-brand-orange"
                          strokeWidth={2}
                        />
                      </span>
                      <div className="flex-1">
                        <p className="text-[13px] font-extrabold text-ink">
                          {p.name}
                        </p>
                        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                          {p.blurb}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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

        <p className="mt-4 rounded-lg bg-brand-orange/5 px-3 py-2 text-[11.5px] leading-relaxed text-ink-muted">
          each unit is defined by its <span className="font-semibold text-ink">medium</span>. the reference listed beside it is <span className="font-semibold text-ink">inspiration only</span> — the actual topic is the child&apos;s choice from the three options in the session.
        </p>

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
                    {unit.medium.toLowerCase()}
                  </p>
                  <span className="shrink-0 rounded-chip bg-ink/5 px-1.5 py-0.5 text-[9px] font-medium text-ink-muted">
                    {unit.days} {unit.days === 1 ? "day" : "days"}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted truncate">
                  reference: {unit.whatChildrenMake.toLowerCase()}
                </p>
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
                  </div>
                )}

                {/* ═══ ROBOTICS BUILD — three models + day cycle + 4 questions ═══ */}
                {seg.segment === "build" && isRobotics && (
                  <div className="space-y-3">

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
                  </div>
                )}

                {/* ═══ DEBRIEF APPROACHES — shown under playground (PS only) ═══ */}
                {seg.segment === "playground" && isLanguage && (
                  <div className="space-y-3">

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
                  </div>
                )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LANGUAGE-ONLY SECTIONS — only render for the language
          programme. Five core ideas, the 6-day book arc, the four
          group activity types, the 8 books grid, and the songs
          playlist. These plug in between the SEGMENTS accordion
          and the BOOKS ROW so the page reads top-to-bottom in the
          same order the user understands the programme.
          ═══════════════════════════════════════════════════════ */}
      {isLanguage && programme.languageBooks && programme.songs && (
        <>
          {/* ─── HOW THE PROGRAMME WORKS — five ideas ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("how-it-works")} label="how the programme works">
              Five ideas. Once you understand them, every other choice falls into place.
            </SectionTitle>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                {
                  n: 1,
                  title: "One book is the home for everything",
                  body:
                    "For 6 days, every segment of every session draws from the same book. Children meet a word in the story, hear it again in a song, act it out, use it in a game, and draw it. By the end of the book, the words are not memorised — they are known.",
                },
                {
                  n: 2,
                  title: "Every book runs across 6 days, with a gap in the middle",
                  body:
                    "Days 1–3 introduce the book. Two other books come in between. Days 4–6 return to it. The gap is what turns memorising into understanding — the most important design decision in the programme.",
                },
                {
                  n: 3,
                  title: "Skills are spiral, not linear",
                  body:
                    "All five skills grow together, all the time. Each skill has three observable abilities. The third is the ★ integration point — what excellent practice looks like by the end of the year. Children show different skills at different moments. That is normal.",
                },
                {
                  n: 4,
                  title: "Children learn through play, not instruction",
                  body:
                    "No worksheets, no drills, no testing. Skills are built through five things children love: stories, songs, games, marks, and being part of a group. The teacher sets up the activity, steps back, and names what they see.",
                },
                {
                  n: 5,
                  title: "The teacher's most important tool is observation",
                  body:
                    "There is no formal assessment. Teachers observe what each child shows during normal session circulation and record it briefly in the experience book. Over 48 sessions, a clear picture builds — and goes home to parents.",
                },
              ].map((idea) => (
                <div
                  key={idea.n}
                  className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[12px] font-extrabold text-brand-orange">
                      {idea.n}
                    </span>
                    <p className="text-[13px] font-extrabold lowercase leading-tight text-ink md:text-[14px]">
                      {idea.title.toLowerCase()}
                    </p>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                    {idea.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── BOOK READING — the 6-day arc ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("six-day-arc")} label="the 6-day book arc">
              How each book is read across 6 days, with a deliberate gap in the middle.
            </SectionTitle>

            <div className="mt-4 overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
              <div className="grid gap-px bg-ink/5 md:grid-cols-3">
                {[
                  {
                    day: 1,
                    title: "Print knowledge — first read",
                    body:
                      "Read aloud all the way through. Point to words. Count words in the title. Build word awareness.",
                  },
                  {
                    day: 2,
                    title: "Narrative — during and after",
                    body:
                      "Identify setting and characters. Summarise events. Recall what happened.",
                  },
                  {
                    day: 3,
                    title: "Group activity (easy)",
                    body:
                      "Children act, perform, or build using the story.",
                  },
                ].map((d) => (
                  <div key={d.day} className="bg-segment-blue/15 p-4">
                    <span className="inline-flex h-6 items-center rounded-chip bg-brand-white px-2 text-[10px] font-extrabold text-ink ring-1 ring-ink/10">
                      Day {d.day}
                    </span>
                    <p className="mt-2 text-[12.5px] font-extrabold leading-tight text-ink md:text-[13px]">
                      {d.title.toLowerCase()}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 bg-brand-orange/10 px-4 py-3 text-center">
                <span className="text-[10px] font-bold tracking-normal text-brand-orange">
                  Two-book interval
                </span>
                <span className="text-[11px] italic text-ink-muted">
                  Children read other books before this one returns
                </span>
              </div>
              <div className="grid gap-px bg-ink/5 md:grid-cols-3">
                {[
                  {
                    day: 4,
                    title: "Print knowledge — version 2",
                    body:
                      "Print directionality. Sight words. Environmental print.",
                  },
                  {
                    day: 5,
                    title: "Narrative — version 2",
                    body:
                      "Children produce stories with a beginning, middle, and end.",
                  },
                  {
                    day: 6,
                    title: "Group activity (hard)",
                    body:
                      "The same activity from day 3, deepened.",
                  },
                ].map((d) => (
                  <div key={d.day} className="bg-segment-blue/15 p-4">
                    <span className="inline-flex h-6 items-center rounded-chip bg-brand-white px-2 text-[10px] font-extrabold text-ink ring-1 ring-ink/10">
                      Day {d.day}
                    </span>
                    <p className="mt-2 text-[12.5px] font-extrabold leading-tight text-ink md:text-[13px]">
                      {d.title.toLowerCase()}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Four group activity types */}
            <div className="mt-5">
              <p className="text-[12px] font-bold text-ink">The four group activity types</p>
              <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted">
                Each book gets one group activity that runs in two variations across days 3 and 6.
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {[
                  {
                    title: "Story re-enactment",
                    body: "Children act out parts of the story as a group.",
                  },
                  {
                    title: "Change story endings",
                    body: "Children invent and act out new endings.",
                  },
                  {
                    title: "Vocabulary reproduction",
                    body: "Small teams use target words in a skit or short conversation.",
                  },
                  {
                    title: "Puppet character",
                    body: "Each child takes on a character through a puppet, with a 60-second presentation.",
                  },
                ].map((a) => (
                  <div
                    key={a.title}
                    className="rounded-xl bg-segment-yellow/15 p-3 ring-1 ring-ink/5"
                  >
                    <p className="text-[12px] font-extrabold lowercase text-ink">
                      {a.title.toLowerCase()}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 8 BOOKS IN ORDER ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("language-books")} label="the 8 books">
              In reading order. Tap a book to see why it sits in this position.
            </SectionTitle>
            <div className="mt-4">
              <LanguageBooksGrid books={programme.languageBooks} />
            </div>
            <p className="mt-4 text-[11px] italic leading-relaxed text-ink-muted">
              Books 1–2 build participation. Books 3–4 build describing and feeling language. Books 5–6 build
              complex character understanding. Books 7–8 build personal storytelling and dense vocabulary.
            </p>
          </section>

          {/* ─── ROLL & RHYME PLAYLIST ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("songs")} label="roll & rhyme playlist">
              Five Barefoot Books songs. Each does four things at once — rhyme, vocabulary, joining-in, concepts.
            </SectionTitle>
            <div className="mt-4">
              <SongsPlaylist songs={programme.songs} />
            </div>
            <div className="mt-5 space-y-2 rounded-xl bg-brand-cream p-4 ring-1 ring-ink/5">
              <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                How to introduce them
              </p>
              <p className="text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                Don't introduce all five at once. Begin with Mulberry Bush and Knick Knack Paddy Whack in the first
                weeks — they're easy to join. Add If You're Happy and You Know It when The Color Monster arrives. Add
                Walking Through the Jungle mid-programme. Save A Hole in the Bottom of the Sea for the second half — it's
                the most demanding and rewards children who have built strong listening across the year.
              </p>
              <p className="text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                <span className="font-semibold text-ink">A note on Knick Knack Paddy Whack:</span> the song has 10 verses.
                Don't sing all 10 in the first month. Start with verses 1–3, add 4–6 by mid-programme, and finish with all
                10 by the end of the year. The song scales with the child.
              </p>
            </div>
          </section>

          {/* ─── WHY WE BELIEVE THIS WORKS ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("why-it-works")} label="why we believe this works">
              Three convictions run through the design.
            </SectionTitle>
            <div className="mt-4 space-y-3">
              {[
                {
                  title: "Children learn language in chunks, not lists",
                  body:
                    "A child does not learn 50 words by being shown 50 flashcards. They learn 50 words by hearing them in stories, songs, and games — over and over, in different ways, until the words become theirs.",
                },
                {
                  title: "Repetition with variation is the engine of growth",
                  body:
                    "The same word, the same story, the same song — but met in different forms, on different days, with different children doing different things. The 6-day book arc, the rotating Wordsmiths resources, and the fixed song playlist are all repetition with variation in different shapes.",
                },
                {
                  title: "The teacher's role is to build the world, not to instruct in it",
                  body:
                    "Children do not need to be told to learn. They need a world that is rich, predictable, and joyful enough that learning happens inside it. The teacher's job is to set up that world every day, observe what each child does inside it, and make small adjustments to keep it rich.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5"
                >
                  <p className="text-[13px] font-extrabold lowercase text-ink md:text-[14px]">
                    {c.title.toLowerCase()}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ─── BOOKS ROW ─── */}
      {(() => {
        const books: { href: string; cover: string; title: string; subtitle: string }[] = [];
        if (programme.slug === "art-design-3-5") {
          books.push({
            href: "/artiverse-book",
            cover: "/artiverse-book/01-accordion.png",
            title: "the artiverse book",
            subtitle: "twelve projects · paper, crayon, paint",
          });
          books.push({
            href: "/artistotle-book",
            cover: "/artistotle-book/01-cover.png",
            title: "the artistotle book",
            subtitle: "three illustrators · six projects",
          });
        }
        // 5-8 / 8-12 art programmes — each has its own artiverse book
        // generated from programme.artiverseUnits via the shared
        // ArtiverseFlipbook component. Cover = the first unit's hero image.
        if (programme.slug === "art-design-5-8") {
          const firstUnit = programme.artiverseUnits?.[0];
          books.push({
            href: "/artiverse-book-5-8",
            cover: firstUnit?.heroImageUrl ?? "/artiverse/art-5-8/unit-1.png",
            title: "the artiverse book",
            subtitle: `${programme.artiverseUnits?.length ?? 0} units · brush pen, pencil, tempera, watercolour`,
          });
        }
        if (programme.slug === "art-design-8-12") {
          const firstUnit = programme.artiverseUnits?.[0];
          books.push({
            href: "/artiverse-book-8-12",
            cover: firstUnit?.heroImageUrl ?? "/artiverse/art-8-12/unit-1.png",
            title: "the artiverse book",
            subtitle: `${programme.artiverseUnits?.length ?? 0} units · medium-by-medium technique briefs`,
          });
        }
        // Experience book (programmes that have one wired)
        const expBookSlug: Record<string, string> = {
          "art-design-5-8": "art-5-8",
          "art-design-8-12": "art-8-12",
          "public-speaking-5-8": "speaking-5-8",
          "public-speaking-8-12": "speaking-8-12",
        };
        const expSlug = expBookSlug[programme.slug];
        const expCover: Record<string, string> = {
          "art-5-8": "/book-covers/art-5-8.png",
          "art-8-12": "/book-covers/art-8-12.png",
          "speaking-5-8": "/book-covers/speaking-5-8.png",
          "speaking-8-12": "/book-covers/speaking-8-12.png",
        };
        if (expSlug) {
          books.push({
            href: `/book/${expSlug}`,
            cover: expCover[expSlug],
            title: "experience book",
            subtitle: "the child's daily reflection book",
          });
        }
        if (books.length === 0) return null;
        return (
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("books")} label="books">
              flip through every book in this programme
            </SectionTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Link
                  key={book.href}
                  href={book.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl bg-brand-white p-5 shadow-card ring-1 ring-ink/5 transition hover:-translate-y-0.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-40 w-auto rounded-md bg-brand-cream object-contain shadow-[0_6px_18px_rgba(44,43,40,0.10)] transition group-hover:shadow-[0_10px_24px_rgba(44,43,40,0.16)]"
                  />
                  <div className="text-center">
                    <p className="text-[14px] font-extrabold lowercase text-ink">{book.title}</p>
                    <p className="mt-1 text-[11px] italic text-ink-muted">{book.subtitle}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange">
                      open the book →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ─── CHECKPOINTS ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num={sectionNum("checkpoints")} label="progression checkpoints">
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
  // Number chip is purely decorative — skip it when no number is
  // assigned so unnumbered sections (e.g. "the approach") don't show
  // a misaligned dot/bullet.
  const hasNum = num && num !== "·" && num !== "—";
  return (
    <div>
      <div className="flex items-center gap-2">
        {hasNum && (
          <span className="rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
            {num}
          </span>
        )}
        <span className="text-[11px] font-bold tracking-normal text-ink-subtle">
          {label}
        </span>
      </div>
      {children && (
        <h2 className="mt-1.5 text-[20px] font-extrabold leading-tight text-ink md:text-[24px]">
          {children}
        </h2>
      )}
    </div>
  );
}
