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
  Search,
  Hash,
  Puzzle,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { getCurriculumProgramme, getActivityImage, GYM_BOOK_IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TeacherGate } from "@/components/TeacherGate";
import { ArtiverseChapters } from "@/components/ArtiverseChapters";
import { ArtistotleChapters } from "@/components/ArtistotleChapters";
import { ArtiverseBookModal, ArtiverseCoverArt } from "@/components/ArtiverseBookModal";
import { ArtiverseAgeCover } from "@/components/ArtiverseAgeCover";
import { ArtistotleBookModal } from "@/components/ArtistotleBookModal";
import {
  ImaginePlaygroundBookModal,
  ImaginePlaygroundCoverArt,
} from "@/components/ImaginePlaygroundBookModal";
import {
  WonderWorldBookModal,
  WonderWorldCoverArt,
} from "@/components/WonderWorldBookModal";
import {
  NumbersGymBookModal,
  NumbersGymCoverArt,
} from "@/components/NumbersGymBookModal";
import { PlayWritesBookModal } from "@/components/PlayWritesBookModal";
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
    name: "tempera · fingerprinting",
    icon: Hand,
    blurb: "first encounter with paint — no brush. the child uses their hands directly on the material.",
    whyHere: "the child feels what paint is before they have to control a tool. hands first.",
  },
  {
    n: 2,
    name: "oil pastel",
    icon: CirclePlus,
    blurb: "waxy. bold. forgiving. no water. press hard and the colour fills the shape.",
    whyHere: "a rich, dry material that builds confidence without the variable of water.",
  },
  {
    n: 3,
    name: "watercolour",
    icon: Droplet,
    blurb: "transparent. light. the colour moves on its own.",
    whyHere: "after dry tools and hand printing, the child has enough confidence that water does not overwhelm.",
  },
  {
    n: 4,
    name: "mixed media",
    icon: Sparkles,
    blurb: "cut. tear. paint. stick. layer. everything learned so far works together in one artwork.",
    whyHere: "the child has enough experience with individual materials to combine them with intention rather than at random.",
  },
  {
    n: 5,
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
    name: "oil pastel",
    icon: CirclePlus,
    blurb: "bold and controlled. layerable and expressive. the child builds mark-making confidence and learns to layer colour before introducing water.",
    whyHere: "a dry tool that allows full focus on line, shape, proportion, and colour relationships.",
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
    name: "oil pastel — at greater depth",
    icon: Layers,
    blurb: "the same tool as step 1, now used for tonal gradients, layered texture, complex surfaces.",
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
      "Coming soon — a record of the child's learning and an opportunity for the teacher to debrief and plan how to help the child. Also used for communication to parents.",
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

// Where each ability lives (by skill id + ability index).
// NOTE: 5-8 / 8-12 art now folds the laminated art-gym book pages and
// cue-card prompts into the Art Games segment — there is no separate
// "art gym" segment and no "extension" follow-on day at this age. The
// chips below say "art gym book (in art games)" to make that explicit
// to a teacher reading the abilities table.
const abilityLocations: Record<string, string[]> = {
  "lt-0": ["art gym book (in art games)", "shape stitch", "artiverse"],
  "lt-1": ["art gym book (in art games)", "shape stitch", "artiverse"],
  "lt-2": ["artiverse"],
  "lt-3": ["cue cards", "artiverse"],
  "sf-0": ["art gym book (in art games)"],
  "sf-1": ["art gym cue card (in art games)", "shape fusion", "cue cards", "artventure"],
  "sf-2": ["shape fusion", "imagine that", "artventure"],
  "sf-3": ["artiverse"],
  "cp-0": ["artiverse"],
  "cp-1": ["colour flip", "artiverse"],
  "cp-2": ["colour flip", "match me", "artiverse"],
  "cp-3": ["artiverse"],
  "bc-0": ["cue cards", "artiverse"],
  "bc-1": ["artiverse"],
  "bc-2": ["artiverse"],
  "bc-3": ["artiverse"],
  "ic-0": ["artventure", "doodle dash", "artiverse"],
  "ic-1": ["imagine that", "doodle dash", "artiverse"],
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
  // Artiverse + Artistotle books — open as full-screen popups from the
  // books row.
  const [artiverseBookOpen, setArtiverseBookOpen] = useState(false);
  const [artistotleBookOpen, setArtistotleBookOpen] = useState(false);
  const [imaginePlaygroundBookOpen, setImaginePlaygroundBookOpen] = useState(false);
  const [wonderWorldBookOpen, setWonderWorldBookOpen] = useState(false);
  const [numbersGymBookOpen, setNumbersGymBookOpen] = useState(false);
  // Play-writes (language 3-5) — Level 1 / Level 2 workbook flipbooks.
  const [playWritesLevel, setPlayWritesLevel] = useState<1 | 2 | null>(null);

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
    // STEM 3-5 — four skill families
    curiosity: Search,
    "problem-solving": Wrench,
    logic: Puzzle,
    "number-sense": Hash,
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
    // STEM 3-5 — Curiosity (4 abilities · 4th is north star)
    "curiosity-0": Eye, // notices
    "curiosity-1": Lightbulb, // wonders
    "curiosity-2": Compass, // predicts
    "curiosity-3": Sparkles, // investigates ★
    // STEM 3-5 — Problem Solving (4 abilities · 4th is north star)
    "problem-solving-0": Eye, // recognises
    "problem-solving-1": Wrench, // tries
    "problem-solving-2": Heart, // persists
    "problem-solving-3": Sparkles, // solves ★
    // STEM 3-5 — Logic (4 abilities · 4th is north star)
    "logic-0": Layers, // sorts
    "logic-1": Puzzle, // patterns
    "logic-2": Compass, // predicts from a rule
    "logic-3": Sparkles, // reasons ★
    // STEM 3-5 — Number Sense (3 abilities · 3rd is north star)
    "number-sense-0": Hash, // connects
    "number-sense-1": Layers, // relates
    "number-sense-2": Sparkles, // applies ★
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
    // STEM 3-5 — four skill families, each with its own segment-tone
    // colour so the cards on the overview match the programme's
    // visual language. Curiosity (yellow) is the warm-up energy;
    // problem solving (green) is the hands-on making energy; logic
    // (blue) is the focused work; number sense (orange) is the
    // dedicated daily workout.
    curiosity: { color: "bg-segment-yellow", accent: "border-segment-yellow" },
    "problem-solving": { color: "bg-segment-green", accent: "border-segment-green" },
    logic: { color: "bg-segment-blue", accent: "border-segment-blue" },
    "number-sense": { color: "bg-brand-orange", accent: "border-brand-orange" },
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
        "Coming soon — a record of the child's learning and an opportunity for the teacher to debrief and plan how to help the child. Also used for communication to parents.",
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

    // STEM 3-5 segments — Imagine Playground and WonderWorld alternate
    // (Session A vs Session B); the others run every session.
    "imagine-playground": {
      icon: Wrench,
      durationFlex: 35,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "imagine-playground")?.objective ??
        "Children build imaginary worlds with construction blocks. Runs on Session A — alternates with WonderWorld.",
    },
    "wonder-world": {
      icon: BookOpen,
      durationFlex: 35,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "wonder-world")?.objective ??
        "Children build thematic knowledge through stories, workbook activities, and materials. Runs on Session B — alternates with Imagine Playground.",
    },
    "logic-lab": {
      icon: Gamepad2,
      durationFlex: 20,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "logic-lab")?.objective ??
        "One game per session. Six games rotate; each has four difficulty layers built in so the same game runs deeper across the year.",
    },
    "numbers-gym": {
      icon: Sparkles,
      durationFlex: 25,
      meaning:
        programme.segmentDefinitions.find((s) => s.id === "numbers-gym")?.objective ??
        "Every child works in their personal gamebook at their own level. Three level books — children move up at their own pace.",
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
  // Art Gym is only a separate segment on the 3-5 programme. On 5-8 and
  // 8-12, art gym book pages and cue-card prompts are folded into the Art
  // Games rotation pool (no separate segment, no extension follow-on day,
  // no scribble book).
  const segmentGamesDynamic = [
    ...(programme.ageGroup === "3-5"
      ? [
          {
            segment: "art gym",
            icon: Dumbbell,
            color: "bg-segment-yellow",
            time: "15 min",
            type: "rotating" as const,
            games: [
              { name: "art gym book", skills: ["fine motor", "creative expression"], rotation: "fixed" as const },
              { name: "scribble book", skills: ["fine motor", "creative expression"], rotation: "fixed" as const },
            ],
          },
        ]
      : []),
    {
      segment: programme.ageGroup === "3-5" ? "art games" : "art games + gym",
      icon: Gamepad2,
      color: "bg-segment-green/30",
      time: programme.ageGroup === "3-5" ? "25 min" : "25 min · 1–2 games",
      type: "rotating" as const,
      games:
        programme.ageGroup === "3-5"
          ? Object.values(programme.activities)
              .filter((a) => a.segment === "art-games")
              .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const }))
          : [
              ...Object.values(programme.activities)
                .filter((a) => a.segment === "art-games")
                .map((a) => ({ name: a.title.toLowerCase(), skills: [] as string[], rotation: "rotating" as const })),
              { name: "art gym book (folded into rotation)", skills: ["line & texture", "shape & form"], rotation: "rotating" as const },
              { name: "art gym cue cards (folded into rotation)", skills: ["line & texture", "shape & form"], rotation: "rotating" as const },
            ],
    },
    {
      segment: programme.ageGroup === "3-5" ? "artiverse / artistotle" : "artiverse",
      icon: Palette,
      color: "bg-segment-blue/30",
      time: programme.ageGroup === "3-5" ? "35 min" : "55 min",
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
  // Canonical robotics experiment list — shown identically in both age bands
  // (5–8 and 8–12) so the overview is consistent. Order is intentional.
  const ROBOTICS_EXPERIMENT_ORDER = [
    "l1-levers-e1", "l1-levers-e2", "l1-levers-e3", "l1-levers-e4",
    "l2-levers-e1", "l2-levers-e5", "l2-levers-e6",
    "l1-pulleys-e1", "l1-pulleys-e2", "l1-pulleys-e3", "l1-pulleys-e4", "l1-pulleys-e5",
    "l2-pulleys-e1", "l2-pulleys-e4", "l2-pulleys-e5",
    "l1-gears-e1", "l1-gears-e2", "l1-gears-e3", "l1-gears-e4",
    "l2-gears-e1",
    "l1-wheel-axle-e2", "l1-wheel-axle-e3",
    "l2-wheel-axle-e2", "l2-wheel-axle-e3", "l2-wheel-axle-e4", "l2-wheel-axle-e5",
  ];
  const roboticsSegmentGames = [
    {
      segment: "experiment",
      icon: FlaskConical,
      color: "bg-segment-yellow",
      time: "40 min",
      type: "fixed" as const,
      games: ROBOTICS_EXPERIMENT_ORDER
        .map((id) => programme.activities[id])
        .filter(Boolean)
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

  // STEM 3-5 has a completely different segment shape from robotics 5-8 / 8-12 —
  // four segments rotate through their own activity pool, plus the
  // experience book. Imagine Playground and WonderWorld swap places
  // between Session A and Session B (never both in the same session).
  const isStem35 = programme.slug === "robotics-3-5";
  // STEM 3-5 has 5 segments. Imagine Playground (Session A only) and
  // WonderWorld (Session B only) alternate — they never run in the
  // same session. Both are rotating internally: 11 core projects + 4
  // 11 core projects revisited 2–3 times for IP, 15 activities × 2 + 2 game days for WW.
  // Logic Lab and NumbersGym run every session. Experience Book is
  // fixed reflection. Colours come from the segment palette so the
  // chart reads consistently with other programmes.
  const stem35SegmentGames = [
    {
      segment: "imagine playground",
      icon: Wrench,
      color: segmentPalette("imagine-playground").soft,
      time: "35 min · session a",
      type: "rotating" as const,
      // 11 core projects run in fixed order, each met 2–3 times. Mark
      // the order with a "fixed order" hint and surface (re-visit) tags
      // on activities that have already appeared earlier in the year.
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "imagine-playground")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: ["fixed order"],
          rotation: "rotating" as const,
        })),
    },
    {
      segment: "wonderworld",
      icon: BookOpen,
      color: segmentPalette("wonder-world").soft,
      time: "35 min · session b",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "wonder-world")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: ["fixed order"],
          rotation: "rotating" as const,
        })),
    },
    {
      segment: "logic lab",
      icon: Gamepad2,
      color: segmentPalette("logic-lab").soft,
      time: "20 min",
      type: "rotating" as const,
      games: Object.values(programme.activities)
        .filter((a) => a.segment === "logic-lab")
        .map((a) => ({
          name: a.title.toLowerCase(),
          skills: [] as string[],
          rotation: "rotating" as const,
        })),
    },
    {
      segment: "numbersgym",
      icon: Sparkles,
      color: segmentPalette("numbers-gym").soft,
      time: "25 min",
      type: "fixed" as const,
      games: [
        {
          name: "personal gamebook · 3 levels (self-paced)",
          skills: ["number sense"],
          rotation: "fixed" as const,
        },
      ],
    },
    {
      segment: "experience book",
      icon: Notebook,
      color: segmentPalette("experience-book").soft,
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

  // public-speaking-5-8 / public-speaking-8-12 share category="language"
  // with language-storytelling-3-5 but have their OWN segments (roll call,
  // playground, showtime, log book — not roll & rhyme, book'o'clock,
  // wordsmiths, play-writes). Route by slug, not category, so they don't
  // pick up the 3-5 storytelling segments table.
  const isStorytelling35 = programme.slug === "language-storytelling-3-5";
  const gamesTable = isStem35
    ? stem35SegmentGames
    : isRobotics
      ? roboticsSegmentGames
      : isArt
        ? segmentGamesDynamic
        : isStorytelling35
          ? languageSegmentGames
          : psSegmentGames;

  return (
    <div className="flex flex-col pb-6">

      {/* ─── HERO BAND ─── */}
      <section className="mt-4 px-4 md:px-8">
        <div className="overflow-hidden rounded-2xl bg-brand-cream ring-1 ring-ink/5">
          <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:p-7">
            {programme.heroImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={programme.heroImageUrl}
                alt={programme.title}
                className="mx-auto h-32 w-auto rounded-xl bg-brand-white object-contain ring-1 ring-ink/10 md:h-40"
                style={{ mixBlendMode: "multiply" }}
              />
            )}
            <div>
              <p className="text-[11px] font-bold text-ink-subtle">programme overview</p>
              <h1 className="mt-2 text-[28px] font-extrabold lowercase leading-[1.05] tracking-tight text-ink md:text-[40px]">
                {programme.title}
              </h1>
              {programme.slug !== "art-design-3-5" &&
                programme.slug !== "language-storytelling-3-5" && (
                  <div className="mt-4 border-l-[3px] border-brand-orange pl-4">
                    <p className="text-[13px] leading-relaxed text-ink md:text-[14px]">
                      {programme.description}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Stat strip — every programme is ongoing. The session count
              shown here is what's uploaded so far; more sessions will be
              uploaded over time. */}
          <div className="grid grid-cols-2 gap-px bg-ink/5 md:grid-cols-4">
            {[
              {
                label: "sessions uploaded",
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
        <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
          this is an ongoing programme — {programme.totalSessions} sessions are uploaded so far, more will be uploaded over time.
        </p>
      </section>

      {/* ─── WELCOME — 3-5 art only ─── */}
      {programme.slug === "art-design-3-5" && (
        <section className="mt-10 px-4 md:px-8">
          <h2 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
            welcome to openhouse art &amp; design
          </h2>

          <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
            <p>
              At Openhouse, art &amp; design is built to help children develop two essential skills at this age:{" "}
              <span className="font-semibold text-ink">fine motor control</span> and{" "}
              <span className="font-semibold text-ink">creative expression</span>. Every experience is designed to strengthen how children use their hands and fingers with greater control, while also helping them express their own ideas visually.
            </p>
            <p>
              Children explore curated artworks, learn through the right mediums and techniques, and draw inspiration from artists and illustrators known for deeply understanding children&apos;s art and imagination.
            </p>
            <p>
              What makes the programme uniquely play-based is that there is{" "}
              <span className="font-semibold text-ink">no fixed, instruction-led final product</span>. Children learn through games, choices, exploration, and creating artworks that feel personal and meaningful to them.
            </p>
          </div>
        </section>
      )}

      {/* ─── HOW THE CLASS LOOKS & FEELS — 3-5 art only ─── */}
      {programme.slug === "art-design-3-5" && (
        <section className="mt-10 px-4 md:px-8">
          <SectionTitle num="·" label="class look &amp; feel">
            how the openhouse art &amp; design class looks &amp; feels
          </SectionTitle>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              {
                emoji: "🎨",
                title: "like an atelier",
                body: "Always spread out the resources children will need, hand them their aprons, keep water in wash glasses, keep pencils sharpened. Set up the class like a real-life art studio.",
                ring: "ring-segment-yellow",
              },
              {
                emoji: "🌿",
                title: "open &amp; free-spirited",
                body: "Keep the class moving — play the game on a mat on the floor, do the artwork on chairs and tables. Movement is part of how the class feels.",
                ring: "ring-segment-green",
              },
              {
                emoji: "🤝",
                title: "involving children",
                body: "Involve children in setting up and putting things back. Let them pick materials. Before each activity, tell them what you have planned and ask how they feel about it. After, ask how it went.",
                ring: "ring-segment-pink",
              },
              {
                emoji: "✨",
                title: "usable &amp; accessible",
                body: "Keep materials laid out so children can see and pick them on their own. Nothing important should be out of reach.",
                ring: "ring-brand-orange",
              },
            ].map((row) => (
              <div
                key={row.title}
                className={cn("rounded-2xl bg-brand-white p-4 ring-2", row.ring)}
              >
                <p className="text-[14px] font-extrabold lowercase text-ink">
                  <span aria-hidden className="mr-1.5 text-[16px]">{row.emoji}</span>
                  <span dangerouslySetInnerHTML={{ __html: row.title }} />
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
                  <span dangerouslySetInnerHTML={{ __html: row.body }} />
                </p>
              </div>
            ))}
          </div>

          {/* Clean & uncluttered — has its own bullet list */}
          <div className="mt-3 rounded-2xl bg-brand-white p-4 ring-2 ring-segment-blue">
            <p className="text-[14px] font-extrabold lowercase text-ink">
              <span aria-hidden className="mr-1.5 text-[16px]">🧺</span>
              clean &amp; uncluttered
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
              Encourage children — and model — cleanliness:
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                "Always keep bags at a particular place.",
                "Don't litter — always throw in the dustbin.",
                "Make sure there is a dustbin and tissue paper close at hand.",
                "Keep things back at their place when done.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-segment-blue/80" />
                  <span className="flex-1">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Class rules — co-created with children */}
          <div className="mt-3 rounded-2xl bg-brand-white p-4 ring-2 ring-segment-yellow">
            <p className="text-[14px] font-extrabold lowercase text-ink">
              <span aria-hidden className="mr-1.5 text-[16px]">📜</span>
              the class has rules
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">
              Lay simple rules for the class and involve children in making them and agreeing to them. Start with simple yes/no questions:
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                "Will we all put our bags back?",
                "Will we all use our polite voices?",
                "Will we all keep our hands and legs to ourselves?",
                "Will we all try to be helpful and nice to each other?",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-segment-yellow/80" />
                  <span className="flex-1">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-brand-cream p-2.5 text-[12px] leading-relaxed text-ink">
              And in the end — always be smiling and kind yourself.
            </p>
          </div>
        </section>
      )}

      {/* ─── WELCOME — language storytelling 3-5 only ─── */}
      {programme.slug === "language-storytelling-3-5" && (
        <section className="mt-10 px-4 md:px-8">
          <h2 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
            welcome to openhouse language through storytelling
          </h2>

          <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
            <p>
              At Openhouse, language is learnt through{" "}
              <span className="font-semibold text-ink">the world of stories</span>.
            </p>
            <p>
              This is a holistic language programme that builds all core skills —{" "}
              <span className="font-semibold text-ink">listening, speaking, reading, and early writing</span> — through the formats that children learn best from: books, songs, games, and playful practice.
            </p>
            <p>
              Every part of the programme is rooted in context. Children don&apos;t learn words in isolation — they meet them in stories, use them in conversation, revisit them through games, and gradually make them their own. Our writing work is also meaning-driven, with children expressing ideas from stories through drawing, mark-making, and early writing.
            </p>
            <p className="rounded-xl bg-brand-white p-3 ring-1 ring-ink/10">
              This is an{" "}
              <span className="font-semibold text-ink">emergent literacy programme</span>. Children first understand what reading is — how books work, how print carries meaning, and how language flows — before learning to decode it.
            </p>
            <p>
              We intentionally do not begin with phonics or alphabet-led reading at this stage. At ages 3–5, children learn language best through rich exposure, repetition, and meaningful use. This approach builds strong vocabulary, confident expression, and a deep connection to books — forming the foundation for formal reading and writing that follows.
            </p>
            <p>
              Across sessions, stories act as the anchor. Words, ideas, and expressions are encountered again and again, until they are{" "}
              <span className="font-semibold text-ink">understood, used, and truly owned</span>.
            </p>
          </div>
        </section>
      )}

      {/* ─── DAILY FLOW ─── */}
      <section className="mt-8 px-4 md:px-8">
        <SectionTitle num={sectionNum("daily-flow")} label="daily flow" />
        <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink md:text-[14px]">
          A 90-minute session — {dailyFlow.length} segments, in this order. Tap a segment to see what is used, why it sits here, and the rules for using it.
        </p>
        {isArt && programme.ageGroup === "3-5" && (
          <p className="mt-2 rounded-lg bg-brand-orange/8 px-3 py-2 text-[12px] leading-relaxed text-ink-muted">
            <span aria-hidden className="mr-1">⏱️</span>
            <span className="font-semibold text-ink">Art games can last 15–25 minutes.</span> If a game wraps up earlier, give the extra minutes to artiverse / artistotle so children get more time to make.
          </p>
        )}
        {isArt && programme.ageGroup !== "3-5" && (
          <p className="mt-2 rounded-lg bg-brand-orange/8 px-3 py-2 text-[12px] leading-relaxed text-ink-muted">
            <span aria-hidden className="mr-1">🎯</span>
            <span className="font-semibold text-ink">1–2 games can be played in a day.</span> Art Games and the laminated art-gym book pages and cue-card prompts share one combined slot — the educator picks 1 or 2 from the pool. No separate art-gym segment, no scribble book, no extension-day follow-on. If only one game runs, give the extra minutes to artiverse so children get more time to make.
          </p>
        )}
        {programme.slug === "stem-3-5" && (
          <p className="mt-2 rounded-lg bg-brand-orange/8 px-3 py-2 text-[12px] leading-relaxed text-ink-muted">
            <span aria-hidden className="mr-1">⏱️</span>
            <span className="font-semibold text-ink">Scheduling note:</span> The duration of Imagine Playground / Wonderworld sessions may be adjusted based on the scope of the activity. If a project needs more time, educators may shorten Number Gym, Logic Lab by choosing an easier gameplay, or other components to ensure meaningful engagement and completion of the project.
          </p>
        )}

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

        {/* ─── WHY THIS ORDER — programme-specific session flow rationale ─── */}
        {(() => {
          // Art programmes — flow differs by age group.
          // 3-5: 4 steps including art gym / scribble book + art care.
          // 5-8 / 8-12: 3 steps. Art gym is folded into art games (no
          // separate segment, no scribble book, no extension day).
          if (isArt) {
            const steps =
              programme.ageGroup === "3-5"
                ? [
                    {
                      label: "we begin with art gym / scribble book",
                      body: "A quiet start where children work individually to warm up their hands and imagination.",
                    },
                    {
                      label: "next is art games",
                      body: "Children learn an art concept through play and shared activity.",
                    },
                    {
                      label: "then comes artiverse / artistotle",
                      body: "The artwork making part.",
                    },
                    {
                      label: "we end with art care",
                      body: "Children clean up, take responsibility for materials, and slow down after creating.",
                    },
                  ]
                : [
                    {
                      label: "we begin with art games + gym",
                      body: "Children learn art skills through games. 1–2 games are played per session — the teacher picks from the combined pool of art games plus the laminated art-gym book pages and cue-card prompts (folded into this rotation, no longer a separate segment, no extension day, no scribble book).",
                    },
                    {
                      label: "then comes artiverse",
                      body: "The making block — the longest segment. Each unit runs 2 days per artwork — Day 1 sets up the piece, Day 2 completes and refines it.",
                    },
                    {
                      label: "we close with the experience book",
                      body: "Children write up what they made and how it felt, then the teacher closes with a short discussion.",
                    },
                  ];
            return (
              <div className="mt-4 rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
                <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                  why this order
                </p>
                <ol className="mt-2 space-y-2.5">
                  {steps.map((s, i) => (
                    <li key={s.label} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          }

          // Language storytelling 3-5 — 4 steps with bookoclock + wordsmiths
          // visually paired as one block (they go together).
          if (programme.slug === "language-storytelling-3-5") {
            return (
              <div className="mt-4 rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
                <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                  why this order
                </p>
                <ol className="mt-2 space-y-2.5">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      1
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        we begin with music in roll &amp; rhyme
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        Songs help children open up and get comfortable expressing themselves.
                      </p>
                    </div>
                  </li>
                  {/* Paired block: book'o'clock + wordsmiths run as one
                      two-part unit. Same number, single bracketed card. */}
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      2
                    </span>
                    <div className="flex-1 rounded-xl bg-segment-blue/15 p-3 ring-1 ring-segment-blue/30">
                      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
                        paired · two parts together
                      </p>
                      <div className="mt-1.5 space-y-2">
                        <div>
                          <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                            book&apos;o&apos;clock
                          </p>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                            A focused reading time anchored in the day&apos;s book.
                          </p>
                        </div>
                        <div className="border-t border-segment-blue/40 pt-2">
                          <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                            wordsmiths
                          </p>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                            Immediately after — children learn and use new words from the story.
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      3
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        then comes play-writes
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        Children express their ideas individually through drawing, mark-making, or early writing.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      4
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        we end with playground games
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        Lively group games that build speaking, listening, and thinking skills.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            );
          }

          // STEM 3-5 — pair Imagine Playground + WonderWorld so the
          // alternation (and why both are needed) is visible at a glance.
          if (isStem35) {
            return (
              <div className="mt-4 rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
                <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                  why this order — and why imagine playground + wonderworld alternate
                </p>
                <div className="mt-3 rounded-xl bg-segment-yellow/15 p-3 ring-1 ring-segment-yellow/40">
                  <p className="text-[10px] font-bold tracking-normal text-brand-orange">
                    paired · two halves of the same idea
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]">
                    Both are exploration segments that build the same four skills — curiosity, problem solving, logic, number sense — through creation and play. They alternate (one per session) so children get the same kind of work in two different forms each week.
                  </p>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
                      <p className="text-[11.5px] font-extrabold lowercase text-ink">
                        imagine playground · session a
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                        STEM concepts — math, physics, sequencing, conditionals — through stories and imaginary worlds.
                      </p>
                      <p className="mt-2 text-[10px] font-bold tracking-normal text-ink-subtle">
                        materials
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
                        Blocks of different kinds — Math Train, Coding Express, STEAM Park, ramps, magna tiles.
                      </p>
                    </div>
                    <div className="rounded-lg bg-brand-white p-3 ring-1 ring-ink/5">
                      <p className="text-[11.5px] font-extrabold lowercase text-ink">
                        wonderworld · session b
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                        STEM concepts — sorting, sequencing, fractions, classification — through everyday things like food and the home.
                      </p>
                      <p className="mt-2 text-[10px] font-bold tracking-normal text-ink-subtle">
                        materials
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
                        Basic art supplies (playdough, paper, crayons, plastic foods) + DIY food games — no blocks.
                      </p>
                    </div>
                  </div>
                </div>
                <ol className="mt-3 space-y-2.5">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      2
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        next is logic lab
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        One game per session — sorting, patterning, reasoning. Builds the rules-based thinking the exploration segments use.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      3
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        then numbersgym
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        Each child works in their personal gamebook at their own level — three levels, self-paced.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      4
                    </span>
                    <div className="flex-1">
                      <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                        we end with the experience book
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                        Each child reflects in their personal book — the teacher writes one specific sentence, the child adds a drawing or stamp.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            );
          }

          // Public speaking 5-8 and 8-12 — 4-step rationale that walks
          // teachers through the warm-up → group game → performance →
          // reflection arc that makes the session work.
          if (programme.slug === "public-speaking-5-8" || programme.slug === "public-speaking-8-12") {
            const steps = [
              {
                label: "we begin with roll call",
                body: "A quick energetic start. Group games that wake up voice, body, and attention — every child playing simultaneously within 2 minutes. No one waits their turn.",
              },
              {
                label: "next is playground",
                body: "One group game played deeply, with a full debrief. Children practise speaking through play before being asked to perform.",
              },
              {
                label: "then comes showtime",
                body: "Children step into the spotlight. Structured formats that build performance, argument, and conviction. The teacher tracks who speaks so no one is invisible.",
              },
              {
                label: "we end with the experience book",
                body: "Children fill in what they did and how it felt. The teacher closes with a short debrief — what worked, what to try next time.",
              },
            ];
            return (
              <div className="mt-4 rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5">
                <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                  why this order
                </p>
                <ol className="mt-2 space-y-2.5">
                  {steps.map((s, i) => (
                    <li key={s.label} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-[12.5px] font-extrabold lowercase text-ink md:text-[13px]">
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          }

          return null;
        })()}
      </section>


      {/* ─── SEGMENT DETAIL — merged into the daily flow above. Each
          segment expands to show its games, materials, rules, and
          alteration notes. ─── */}
      <section className="mt-3 px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-bold tracking-normal text-ink-subtle">
            what happens inside each segment
          </p>
          {/* Key — explains the rotating / fixed badges shown on each
              segment header below. */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1 rounded-chip bg-ink/5 px-2 py-0.5">
              <RotateCw className="h-3 w-3" /> rotating
            </span>
            <span className="text-ink-subtle">
              — no fixed order; play any · come back to one only after the rest are done
            </span>
            <span className="inline-flex items-center gap-1 rounded-chip bg-ink/5 px-2 py-0.5">
              <Lock className="h-3 w-3" /> fixed
            </span>
            <span className="text-ink-subtle">— follow the prescribed order</span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
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
                      // STEM 3-5: imagine playground / wonderworld run their
                      // activities in fixed order, each revisited deeper —
                      // distinct from a true random rotation. Surface that
                      // distinction in the chip so the model is clear.
                      seg.games[0]?.skills?.includes("fixed order") ? (
                        <><RotateCw className="h-3 w-3" /> fixed order · {seg.games.length} {seg.games.length === 1 ? "activity" : "activities"} · revisited</>
                      ) : (
                        <><RotateCw className="h-3 w-3" /> rotating · {seg.games.length} games</>
                      )
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

                {/* Art Games — 15-25 min flexibility note. Art games can
                    wrap up faster than the time slot. The extra time
                    flows directly into artiverse/artistotle, which is
                    where the bulk of the making time lives. */}
                {seg.segment === "art games" && isArt && (
                  <div className="rounded-xl bg-brand-orange/5 p-4">
                    <p className="text-[12px] font-bold text-ink">How long this segment runs</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                      Each game can last <span className="font-semibold text-ink">15–25 minutes</span>. Some wrap up faster than others — that&apos;s expected.
                    </p>
                    <p className="mt-2 text-[11px] italic leading-relaxed text-ink-muted">
                      If a game finishes early, give the extra minutes to the next segment — artiverse or artistotle — so children get more time to make.
                    </p>
                  </div>
                )}

                {/* Art Care — primary description sourced from the
                    programme's segment objective so the same canonical
                    text shows in the daily-session popup, the daily flow
                    accordion, and here. The artiverse-tidy line is a
                    smaller italic addendum that names the practical
                    transition moment. */}
                {seg.segment === "art care" && isArt && (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-brand-orange/5 p-4">
                      <p className="text-[12px] font-bold text-ink">art care + i care</p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
                        Keeping the space clean — and the mind happy and calm. This section helps children care for their classroom, materials, and emotional state after making art. It lets them end class feeling calm, responsible, connected to the shared space, and proud of the environment they create together.
                      </p>
                      <p className="mt-2 text-[11px] italic leading-relaxed text-ink-muted">
                        At the end of artiverse, teacher says &ldquo;two minutes to put materials away.&rdquo; Children tidy before the experience book begins.
                      </p>
                    </div>

                    {/* I Care Rituals — prompts the teacher uses at the
                        end of class to help children practise the habit. */}
                    <div className="rounded-xl bg-brand-white p-4 ring-1 ring-ink/10">
                      <p className="text-[12px] font-bold text-ink">i care rituals</p>
                      <p className="mt-1 text-[11px] italic leading-relaxed text-ink-muted">
                        Pick one or two of these prompts at the end of class — say them gently, encourage every child to take part.
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {[
                          "Let's make our classroom beautiful again together.",
                          "Can we help every material get back to its place?",
                          "Artists take care of their tools carefully.",
                          "Can we check if anything is left on the floor?",
                          "Did we use kind and gentle hands today?",
                          "Can we help a friend before we leave?",
                          "Let's leave the classroom calm and ready for the next artists.",
                          "Thank you for taking care of our classroom together.",
                          "What was your favourite part of creating today?",
                          "How did you help the classroom or a friend today?",
                        ].map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
                            <span className="flex-1">&ldquo;{line}&rdquo;</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ═══ ART GYM — 3-5 simplified version (book + scribble book) ═══ */}
                {seg.segment === "art gym" && isArt && programme.ageGroup === "3-5" && (
                  <div className="space-y-3">
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                      <span className="font-semibold text-ink">A quick warm-up for fine motor skills and imagination</span> — through two in-house Openhouse resources: the <span className="font-semibold text-ink">ArtGym book</span> and the <span className="font-semibold text-ink">Scribble book</span>.
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {/* Art Gym Book */}
                      <div className="overflow-hidden rounded-xl bg-segment-yellow/15 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[12px] font-extrabold text-ink">artgym book</p>
                          <span className="rounded-chip bg-brand-orange text-white px-2.5 py-0.5 text-[10px] font-semibold">
                            rotates
                          </span>
                        </div>
                        <span className="mt-1 inline-block rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
                          fine motor
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/gym-books/3-5-book.png"
                          alt="art gym book — sample page"
                          className="mt-3 h-40 w-full rounded-lg bg-brand-white object-contain ring-1 ring-ink/5"
                        />
                        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
                          Fine motor books that can be used with materials of choice — erasable markers, clay, yarn. Reusable and laminated. Offer children a choice in what to use.
                        </p>
                        <div className="mt-3 rounded-lg bg-brand-white p-3 shadow-card">
                          <p className="text-[11px] font-semibold text-ink">mediums of use</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                            Because the pages are laminated, anything that wipes off works — erasable markers, clay, yarn. No paint or anything that stains.
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
                          imagination
                        </span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/gym-books/3-5-scribble.png"
                          alt="scribble book — sample page"
                          className="mt-3 h-40 w-full rounded-lg bg-brand-white object-contain ring-1 ring-ink/5"
                        />
                        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
                          A book of imagination — every page is a unique, open-ended story. The teacher prompts the children about what the scene sets, but does not give the solution. Children scribble freely from their imagination.
                        </p>
                        <div className="mt-3 rounded-lg bg-brand-white p-3 shadow-card">
                          <p className="text-[11px] font-semibold text-ink">mediums of use</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                            Not laminated — fill only with dry mediums: crayons, yarn, glue. <span className="font-semibold text-ink">No paint or clay.</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Rules — single block for both resources */}
                    <div className="mt-3 rounded-xl bg-brand-orange/5 p-4">
                      <p className="text-[12px] font-bold text-ink">Rules</p>
                      <ul className="mt-2 space-y-1.5">
                        {[
                          "These two resources rotate — do one, then the next day, the other.",
                          "There are 2 ArtGym books — start every child on level 1, then move to level 2.",
                          "Use the prescribed resources only.",
                          "1–2 pages of ArtGym a day; only 1 artwork a day in the Scribble book.",
                          "Use the books in linear order — first page to last — challenge increases page by page.",
                        ].map((line) => (
                          <li key={line} className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
                            <span className="flex-1">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                    {/* What's the difference? */}
                    <div className="rounded-2xl bg-brand-cream p-4 ring-1 ring-ink/10">
                      <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                        artiverse vs artistotle — what&apos;s the difference?
                      </p>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                        Both are about making artworks. <span className="font-semibold text-ink">Artiverse</span> focuses on art{" "}
                        <span className="font-semibold text-ink">materials</span> — building confidence using paper, crayon, and paint in different ways. The imagery stays neutral, so children pick their own subject. <span className="font-semibold text-ink">Artistotle</span> focuses on{" "}
                        <span className="font-semibold text-ink">illustrators</span> known for understanding children&apos;s art and imagination, with imagery specific to each artist.
                      </p>
                    </div>

                    {/* ── ARTIVERSE block ── */}
                    <div className="relative rounded-2xl bg-brand-white p-5 ring-2 ring-segment-blue md:p-6">
                      <span
                        aria-hidden="true"
                        title="Artiverse — 3 mediums, ~40 sessions"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-segment-blue/80 text-[20px] shadow-md ring-2 ring-white/70"
                      >
                        🌍
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-3 pr-12">
                        <div>
                          <p className="text-[10px] font-bold text-ink-subtle">mode 1 · materials</p>
                          <h3 className="mt-0.5 text-[18px] font-extrabold lowercase text-ink md:text-[20px]">
                            artiverse
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-segment-blue/90">
                            3 mediums · ~40 artworks across the year (5–10 per medium)
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

                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {[
                          {
                            medium: "paper folding & sticking",
                            total: 10,
                            items: [
                              "accordion — 2 artworks",
                              "circles — 3 artworks",
                              "mosaics — 2 artworks",
                              "loops — 1 artwork",
                              "origami (simple) — 2 artworks",
                            ],
                          },
                          {
                            medium: "crayons",
                            total: 15,
                            items: [
                              "filling solid colours in shapes — 2",
                              "filling solid colours in simple scenery — 2",
                              "filling solid colours in intricate objects — 2",
                              "doodling using crayons — 2",
                              "colour mixing in simple shapes — 2",
                              "colour mixing in simple objects — 3",
                              "colour mixing in simple scenery — 2",
                            ],
                          },
                          {
                            medium: "paint",
                            total: 15,
                            items: [
                              "filling solid colours in shapes — 2",
                              "filling solid colours in simple scenery — 2",
                              "filling solid colours in intricate objects — 2",
                              "doodling with paint — 2",
                              "colour mixing in simple shapes — 2",
                              "colour mixing in simple objects — 3",
                              "colour mixing in simple scenery — 2",
                            ],
                          },
                        ].map((m) => (
                          <div key={m.medium} className="rounded-xl bg-segment-blue/10 p-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="text-[12.5px] font-extrabold lowercase text-ink">
                                {m.medium}
                              </p>
                              <span className="rounded-chip bg-white/70 px-1.5 py-0.5 text-[10px] font-bold text-ink-muted">
                                {m.total} artworks
                              </span>
                            </div>
                            <ul className="mt-2 space-y-1">
                              {m.items.map((it) => (
                                <li
                                  key={it}
                                  className="text-[11px] leading-relaxed text-ink-muted"
                                >
                                  · {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── ARTISTOTLE block ── */}
                    <div className="relative rounded-2xl bg-brand-white p-5 ring-2 ring-brand-orange md:p-6">
                      <span
                        aria-hidden="true"
                        title="Artistotle — 3 artists, 13 projects (~21 days)"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/85 text-[20px] shadow-md ring-2 ring-white/70"
                      >
                        👴
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-3 pr-12">
                        <div>
                          <p className="text-[10px] font-bold text-ink-subtle">mode 2 · illustrators</p>
                          <h3 className="mt-0.5 text-[18px] font-extrabold lowercase text-ink md:text-[20px]">
                            artistotle
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-brand-orange">
                            3 artists · 4–5 projects each · 1–2 days per project (~21 days)
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

                      <div className="mt-4 grid gap-3 md:grid-cols-3">
                        {[
                          {
                            artist: "eric carle",
                            focus:
                              "exploring coloured paper — tearing by hand, layering and pasting paper to create collages.",
                            projects: [
                              "very simple stripes collages",
                              "caterpillar collage — single medium, round shape",
                              "fruit / vegetable collage — single medium, irregular shape",
                              "multi-medium, multi-shape collage — jellyfish",
                            ],
                          },
                          {
                            artist: "lois ehlert",
                            focus:
                              "watercolour and using many colours together.",
                            projects: [
                              "sponge dabbling — flowers",
                              "flowers with paintbrush",
                              "flowers by swirling paintbrush",
                              "two-layer flower garden with background",
                            ],
                          },
                          {
                            artist: "taro gomi",
                            focus:
                              "controlled lines with dry mediums and fun, imaginative drawings.",
                            projects: [
                              "simple drawing & colouring",
                              "simple drawing & colouring",
                              "making lines with colour pencils on simple drawings",
                              "using single colours on worksheets",
                            ],
                          },
                        ].map((a) => (
                          <div key={a.artist} className="rounded-xl bg-brand-orange/10 p-3">
                            <p className="text-[12.5px] font-extrabold lowercase text-ink">
                              {a.artist}
                            </p>
                            <p className="mt-1 text-[10.5px] italic leading-relaxed text-ink-muted">
                              {a.focus}
                            </p>
                            <ul className="mt-2 space-y-1">
                              {a.projects.map((p, i) => (
                                <li
                                  key={`${p}-${i}`}
                                  className="text-[11px] leading-relaxed text-ink-muted"
                                >
                                  · {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <p className="mt-4 text-[11px] leading-relaxed text-ink-muted">
                        At the end of the year, each child has a series of artworks inspired by these illustrators — the teacher tells the child and parent about the artist behind each project, and the works are assembled together on a separate page.
                      </p>
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
                  programme.ageGroup === "8-12"
                    ? "what material you use. watercolour · acrylic · oil pastels · chalk pastels · mixed media."
                    : "what material you use. tempera/watercolour · oil pastel · acrylic · mixed media.",
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
            {(() => {
              // Derive the model list (and each model's experiments) from the
              // sessionTable so every model shows — not just the first three.
              // Overlay the modelPairings "why they pair" rationale per model.
              const builds = programme.sessionTable.filter(
                (s) => s.sessionNumber >= 1 && s.buildModel
              );
              const order: string[] = [];
              const seen = new Set<string>();
              builds.forEach((s) => {
                const m = s.buildModel as string;
                if (!seen.has(m)) {
                  seen.add(m);
                  order.push(m);
                }
              });
              const pairingByModel = Object.fromEntries(
                (programme.modelPairings ?? []).map((p) => [p.model, p])
              );
              return order.map((model, i) => {
                const rows = builds.filter((s) => s.buildModel === model);
                const expNames = Array.from(
                  new Set(rows.map((s) => s.experiment).filter(Boolean) as string[])
                ).map((id) => programme.activities[id]?.cardName || id);
                const pairing = pairingByModel[model];
                return (
                  <div key={model} className="rounded-xl bg-brand-white p-3.5 shadow-card ring-1 ring-ink/5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[12px] font-extrabold text-white">
                        {i + 1}
                      </span>
                      <p className="text-[14px] font-extrabold text-ink">{model.toLowerCase()}</p>
                      {pairing && (
                        <span className="ml-auto rounded-chip bg-brand-orange/10 px-2 py-0.5 text-[9px] font-semibold text-brand-orange">
                          {pairing.topic.toLowerCase()}
                        </span>
                      )}
                    </div>
                    {pairing && (
                      <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">{pairing.why}</p>
                    )}
                    {expNames.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {expNames.map((n) => (
                          <span
                            key={n}
                            className="rounded-chip bg-segment-yellow/20 px-2 py-0.5 text-[9px] font-semibold text-ink-muted"
                          >
                            {n.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-[11px] font-semibold text-ink">{rows.length} build sessions</p>
                  </div>
                );
              });
            })()}
          </div>

          <div className="mt-4 rounded-xl bg-brand-orange/5 p-4">
            <p className="text-[12px] font-bold text-ink">the build day cycle</p>
            <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-ink-muted">
              {programme.ageGroup === "8-12" ? (
                <>
                  <li>
                    <span className="font-semibold text-ink">day 1 — explore + make.</span> read the full model manual, identify every component, lay them out in manual order, begin the build.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">day 2 — make.</span> continue the build, the teacher uses only four questions.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">day 3 — complete and test.</span> finish, run the full test sequence, record the best result with actual measurement.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">day 4 — improve and disassemble.</span> one deliberate change, state expected effect, test, record before-and-after — then sort the kit back from memory (no tray map).
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="font-semibold text-ink">day 1 — explore.</span> read the full model manual, lay every component out in manual order, begin first build stage.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">days 2–3 — make.</span> open the manual where you left off, build, the teacher uses only four questions.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">day 4 — complete and test.</span> finish, run the test, record the best result.
                  </li>
                  <li>
                    <span className="font-semibold text-ink">day 5 — improve and disassemble.</span> one deliberate change, state the expected effect, test, record before and after — then sort the kit back using the tray map.
                  </li>
                </>
              )}
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

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SKILLS & ABILITIES ─── */}
      <section className="mt-10 px-4 md:px-8">
        <SectionTitle num={sectionNum("skills")} label="skills & abilities">
          {skills.length} skills · {skills[0]?.abilities.length ?? 0} abilities each
        </SectionTitle>

        {/* Explainer — for the 3-5 art programme only. Why these
            skills matter, how the class builds them, and how to
            explain it to children and parents. */}
        {programme.slug === "art-design-3-5" && (
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5">
              <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                why we observe skills &amp; abilities
              </p>
              <div className="mt-2 space-y-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                <p>
                  At Openhouse, we don&apos;t only look at the final artwork a child creates. We also observe the smaller skills and abilities children build consistently through repeated experiences in class.
                </p>
                <p>
                  <span className="font-semibold text-ink">Skills</span> are the larger areas of development children are building through art. <span className="font-semibold text-ink">Abilities</span> are the smaller observable actions within each skill that help us understand how a child is progressing over time.
                </p>
                <p>
                  For example, &ldquo;fine motor&rdquo; is a skill, while &ldquo;holding and controlling a tool carefully&rdquo; is an ability within that skill.
                </p>
                <p className="rounded-lg bg-brand-cream p-3 text-[12px] leading-relaxed text-ink">
                  The goal is not perfection or making all children create the same artwork. The goal is for children to gradually become more <span className="font-semibold">confident, expressive, independent, intentional, and capable</span> in how they create and communicate through art.
                </p>
              </div>
            </div>

            {/* How each segment of class builds these abilities */}
            {/* Plain skills + abilities explainer (no heading) */}
            <div className="rounded-2xl bg-segment-yellow/15 p-4 ring-1 ring-segment-yellow/40 md:p-5">
              <div className="space-y-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                <p>
                  <span className="font-semibold text-ink">Skills</span> are the big things we are learning to get better at. <span className="font-semibold text-ink">Abilities</span> are the small things we practise every day that help us build those skills.
                </p>
                <p>
                  For example, if drawing is a big skill, then holding a pencil carefully, making lines, colouring with control, and choosing colours intentionally are all smaller abilities that help us get better at drawing.
                </p>
                <p>
                  We build these abilities slowly by practising them again and again — through games, making, experimenting, and trying in different ways.
                </p>
              </div>
            </div>
          </div>
        )}

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

        {/* Debrief lines — teacher-friendly phrases for noticing
            skills + abilities with 3-5 year olds. Art programme only. */}
        {programme.slug === "art-design-3-5" && (
          <div className="mt-5 rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="text-[11px] font-bold tracking-normal text-brand-orange">
              talking to children about what they&apos;re building
            </p>
            <p className="mt-1 text-[12px] italic leading-relaxed text-ink-muted">
              Speak about skills and abilities simply and naturally — encouraging and conversational, not like testing. Pick one or two of these in passing during class.
            </p>
            <ul className="mt-3 grid gap-1.5 md:grid-cols-2">
              {[
                "Today we practised controlling our fingers carefully.",
                "I noticed you made your lines very slowly and carefully.",
                "You kept trying even when it felt tricky.",
                "You chose your colours very thoughtfully today.",
                "I saw you using your imagination.",
                "You made something in your own special way.",
                "Your hands are getting stronger with tools.",
                "You remembered how to use the material independently.",
                "You tried a new idea today.",
                "You worked very patiently on your artwork.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
                  <span className="flex-1">&ldquo;{line}&rdquo;</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
              The focus of these conversations: helping children notice effort, encouraging independence, appreciating creative choices, building confidence, and helping children feel proud of learning and trying.
            </p>
          </div>
        )}
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
          {/* ─── BOOK READING FORMAT — 3 days, interval, 3 days ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("how-it-works")} label="book reading format" />

            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink md:text-[14px]">
              Each book runs across two 3-day blocks with two other books in between. The first block introduces the book; the gap turns memorising into understanding; the second block returns to it as Version 2.0.
            </p>

            {/* Visual: 3 days · interval (2 books) · 3 days */}
            <div className="mt-4 overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
              <div className="flex flex-col gap-px bg-ink/5 md:flex-row">
                <div className="flex-1 bg-segment-blue/15 p-4">
                  <p className="text-[10px] font-bold tracking-normal text-brand-orange">block 1 · days 1–3</p>
                  <p className="mt-1 text-[13px] font-extrabold lowercase text-ink md:text-[14px]">
                    book introduced
                  </p>
                  <ul className="mt-2 space-y-1 text-[11.5px] leading-relaxed text-ink-muted">
                    <li>· Day 1 — print knowledge (before &amp; during reading)</li>
                    <li>· Day 2 — narrative (during &amp; after reading)</li>
                    <li>· Day 3 — narration + group activity (easy level)</li>
                  </ul>
                </div>
                <div className="bg-brand-cream p-4 md:w-[180px]">
                  <p className="text-[10px] font-bold tracking-normal text-ink-subtle">interval</p>
                  <p className="mt-1 text-[13px] font-extrabold lowercase text-ink md:text-[14px]">
                    two other books
                  </p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-muted">
                    The gap before the book returns is what turns memorising into understanding.
                  </p>
                </div>
                <div className="flex-1 bg-segment-yellow/20 p-4">
                  <p className="text-[10px] font-bold tracking-normal text-brand-orange">block 2 · days 4–6</p>
                  <p className="mt-1 text-[13px] font-extrabold lowercase text-ink md:text-[14px]">
                    book returns — version 2.0
                  </p>
                  <ul className="mt-2 space-y-1 text-[11.5px] leading-relaxed text-ink-muted">
                    <li>· Day 1 — directionality of print (revisited vocabulary)</li>
                    <li>· Day 2 — major actions / events (deeper narrative)</li>
                    <li>· Day 3 — group reconstruction + activity (hard level)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] italic leading-relaxed text-ink-muted">
              Tap a book in section {sectionNum("language-books")} below to open its full plan — both blocks, day-by-day.
            </p>
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

          {/* ─── COMMUNITY SINGING ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("songs")} label="community singing">
              A whole-class warm-up — each song builds rhyme, vocabulary, joining-in, and concepts at once.
            </SectionTitle>
            <div className="mt-4">
              <SongsPlaylist songs={programme.songs} />
            </div>
            {/* How to introduce — simple rule + the order in which
                the songs are added. */}
            <div className="mt-5 rounded-xl bg-brand-cream p-4 ring-1 ring-ink/5">
              <p className="text-[11px] font-bold tracking-normal text-brand-orange">
                How to introduce them
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                Sing one song for <span className="font-semibold text-ink">5 sessions</span>. Then add the next song — sing both together for the next <span className="font-semibold text-ink">5 sessions</span>. Continue adding one song every 5 sessions in this order.
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]">
                Knick Knack Paddy Whack returns three times — first verses 1–3, then verses 4–6, then all 10 — so the song scales with the child.
              </p>
            </div>

            {/* The order — numbered list of songs in the sequence
                they should be introduced. */}
            <div className="mt-4 overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5">
              <p className="border-b border-ink/5 bg-segment-yellow/30 px-4 py-2.5 text-[12px] font-extrabold lowercase text-ink">
                order to add the songs
              </p>
              <ol className="divide-y divide-ink/5">
                {[
                  "mulberry bush",
                  "knick knack paddy whack — verses 1–3",
                  "if you're happy and you know it",
                  "walking through the jungle",
                  "a hole in the bottom of the sea",
                ].map((song, i) => (
                  <li
                    key={song}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                      {i + 1}
                    </span>
                    <span className="text-[12.5px] font-semibold text-ink">
                      {song}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-ink/5 bg-brand-cream/50 px-4 py-2.5 text-[11px] italic leading-relaxed text-ink-muted">
                Each new song joins after 5 sessions of the song before it. Knick Knack returns at verses 1–3 → 4–6 → all 10.
              </p>
            </div>
          </section>

          {/* ─── PLAY-WRITES WORKBOOKS — teacher reference ─── */}
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num="·" label="teacher reference books">
              the play-writes workbook
            </SectionTitle>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink md:text-[14px]">
              A play-based writing workbook used in the play-writes segment. Two levels — children move from level 1 to level 2 as they grow. Each chapter pairs with one of the eight books.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[1, 2].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPlayWritesLevel(lvl as 1 | 2)}
                  className="group flex flex-col items-center gap-3 rounded-2xl bg-brand-white p-5 shadow-card ring-1 ring-ink/[0.05] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift hover:ring-ink/[0.08]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/play-writes-${lvl}/page-01.png`}
                    alt={`play-writes level ${lvl} cover`}
                    className="h-44 w-auto rounded-md bg-brand-cream object-contain shadow-[0_6px_18px_rgba(44,43,40,0.10)] transition group-hover:shadow-[0_10px_24px_rgba(44,43,40,0.16)]"
                  />
                  <div className="text-center">
                    <p className="text-[14px] font-extrabold lowercase text-ink">
                      play-writes · level {lvl}
                    </p>
                    <p className="mt-1 text-[11px] italic text-ink-muted">
                      teacher reference · 27 pages · 8 chapters
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange">
                      open the book →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ─── BOOKS ROW ─── */}
      {(() => {
        type BookEntry = {
          cover: string;
          title: string;
          subtitle: string;
        } & (
          | { kind: "route"; href: string }
          | {
              kind: "modal";
              modalKey:
                | "artiverse-3-5"
                | "artistotle-3-5"
                | "imagine-playground-3-5"
                | "wonderworld-3-5"
                | "numbersgym-3-5";
            }
        );
        const books: BookEntry[] = [];
        if (programme.slug === "art-design-3-5") {
          books.push({
            kind: "modal",
            modalKey: "artiverse-3-5",
            cover: "/artiverse-book/01-accordion.png",
            title: "the artiverse book",
            subtitle: "teacher reference · 3 chapters · ~37 artworks",
          });
          books.push({
            kind: "modal",
            modalKey: "artistotle-3-5",
            cover: "/artistotle-book/01-cover.png",
            title: "the artistotle book",
            subtitle: "teacher reference · 3 artists · 13 projects",
          });
        }
        // 5-8 / 8-12 art programmes — each has its own artiverse book
        // generated from programme.artiverseUnits via the shared
        // ArtiverseFlipbook component. Cover = the first unit's hero image.
        if (programme.slug === "art-design-5-8") {
          const firstUnit = programme.artiverseUnits?.[0];
          books.push({
            kind: "route",
            href: "/artiverse-book-5-8",
            cover: firstUnit?.heroImageUrl ?? "/artiverse/art-5-8/unit-1.png",
            title: "the artiverse book",
            subtitle: `teacher reference · ${programme.artiverseUnits?.length ?? 0} units`,
          });
        }
        if (programme.slug === "art-design-8-12") {
          const firstUnit = programme.artiverseUnits?.[0];
          books.push({
            kind: "route",
            href: "/artiverse-book-8-12",
            cover: firstUnit?.heroImageUrl ?? "/artiverse/art-8-12/unit-1.png",
            title: "the artiverse book",
            subtitle: `teacher reference · ${programme.artiverseUnits?.length ?? 0} units`,
          });
        }
        // STEM 3–5 — two teacher reference books built like the
        // artiverse / artistotle books.
        if (programme.slug === "robotics-3-5") {
          books.push({
            kind: "modal",
            modalKey: "imagine-playground-3-5",
            cover: "/prog-stem-3-5.png",
            title: "the imagine playground book",
            subtitle: "teacher reference · 11 build projects",
          });
          books.push({
            kind: "modal",
            modalKey: "wonderworld-3-5",
            cover: "/prog-stem-3-5.png",
            title: "the wonderworld book",
            subtitle: "teacher reference · 3 chapters · 15 activities",
          });
          books.push({
            kind: "modal",
            modalKey: "numbersgym-3-5",
            cover: "/prog-stem-3-5.png",
            title: "the numbersgym book",
            subtitle: "teacher reference · 3 levels · self-paced",
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
            kind: "route",
            href: `/book/${expSlug}`,
            cover: expCover[expSlug],
            title: "experience book",
            subtitle: "the child's daily reflection book",
          });
        }
        if (books.length === 0) return null;
        return (
          <section className="mt-10 px-4 md:px-8">
            <SectionTitle num={sectionNum("books")} label="teacher reference books">
              flip through every reference book — for teachers, not children
            </SectionTitle>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => {
                const cardClasses =
                  "group flex flex-col items-center gap-3 rounded-2xl bg-brand-white p-5 shadow-card ring-1 ring-ink/[0.05] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift hover:ring-ink/[0.08]";
                // Artiverse uses a built JSX cover for its modal — render
                // the same artwork as the card thumbnail so the preview
                // matches what opens. Other books still show their cover
                // image file.
                // For books with a JSX cover, render the cover component
                // as the thumbnail so the card matches what opens. Modal
                // books use their own cover components; the route-based
                // 5-8 / 8-12 artiverse books share ArtiverseAgeCover.
                let thumbInner: React.ReactNode = null;
                if (book.kind === "modal") {
                  if (book.modalKey === "artiverse-3-5") {
                    thumbInner = <ArtiverseCoverArt size="thumb" />;
                  } else if (book.modalKey === "imagine-playground-3-5") {
                    thumbInner = <ImaginePlaygroundCoverArt size="thumb" />;
                  } else if (book.modalKey === "wonderworld-3-5") {
                    thumbInner = <WonderWorldCoverArt size="thumb" />;
                  } else if (book.modalKey === "numbersgym-3-5") {
                    thumbInner = <NumbersGymCoverArt size="thumb" />;
                  }
                } else if (book.kind === "route") {
                  if (book.href === "/artiverse-book-5-8") {
                    thumbInner = (
                      <ArtiverseAgeCover
                        size="thumb"
                        ageLabel="5–8"
                        unitCount={programme.artiverseUnits?.length ?? 0}
                        mediums={["tempera", "oil pastel", "watercolour", "acrylic", "mixed media"]}
                      />
                    );
                  } else if (book.href === "/artiverse-book-8-12") {
                    thumbInner = (
                      <ArtiverseAgeCover
                        size="thumb"
                        ageLabel="8–12"
                        unitCount={programme.artiverseUnits?.length ?? 0}
                        mediums={["watercolour", "acrylic", "oil pastels", "chalk pastels", "mixed media"]}
                      />
                    );
                  }
                }
                const thumb = thumbInner ? (
                  <div className="h-40 w-[110px] overflow-hidden rounded-md ring-1 ring-ink/10 shadow-[0_6px_18px_rgba(44,43,40,0.10)] transition group-hover:shadow-[0_10px_24px_rgba(44,43,40,0.16)]">
                    {thumbInner}
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-40 w-auto rounded-md bg-brand-cream object-contain shadow-[0_6px_18px_rgba(44,43,40,0.10)] transition group-hover:shadow-[0_10px_24px_rgba(44,43,40,0.16)]"
                  />
                );
                const inner = (
                  <>
                    {thumb}
                    <div className="text-center">
                      <p className="text-[14px] font-extrabold lowercase text-ink">{book.title}</p>
                      <p className="mt-1 text-[11px] italic text-ink-muted">{book.subtitle}</p>
                      <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange">
                        open the book →
                      </p>
                    </div>
                  </>
                );
                if (book.kind === "modal") {
                  const onClick =
                    book.modalKey === "artistotle-3-5"
                      ? () => setArtistotleBookOpen(true)
                      : book.modalKey === "imagine-playground-3-5"
                        ? () => setImaginePlaygroundBookOpen(true)
                        : book.modalKey === "wonderworld-3-5"
                          ? () => setWonderWorldBookOpen(true)
                          : book.modalKey === "numbersgym-3-5"
                            ? () => setNumbersGymBookOpen(true)
                            : () => setArtiverseBookOpen(true);
                  return (
                    <button
                      key={book.modalKey}
                      type="button"
                      onClick={onClick}
                      className={cardClasses}
                    >
                      {inner}
                    </button>
                  );
                }
                return (
                  <Link key={book.href} href={book.href} className={cardClasses}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* ─── ARTIVERSE BOOK MODAL — opens from the books row ─── */}
      <ArtiverseBookModal
        isOpen={artiverseBookOpen}
        onClose={() => setArtiverseBookOpen(false)}
      />
      <ArtistotleBookModal
        isOpen={artistotleBookOpen}
        onClose={() => setArtistotleBookOpen(false)}
      />
      <ImaginePlaygroundBookModal
        isOpen={imaginePlaygroundBookOpen}
        onClose={() => setImaginePlaygroundBookOpen(false)}
      />
      <WonderWorldBookModal
        isOpen={wonderWorldBookOpen}
        onClose={() => setWonderWorldBookOpen(false)}
      />
      <NumbersGymBookModal
        isOpen={numbersGymBookOpen}
        onClose={() => setNumbersGymBookOpen(false)}
      />
      <PlayWritesBookModal
        level={playWritesLevel}
        isOpen={playWritesLevel !== null}
        onClose={() => setPlayWritesLevel(null)}
      />

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
