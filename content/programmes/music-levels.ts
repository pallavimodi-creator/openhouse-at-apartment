import type {
  CurriculumProgramme,
  CurriculumSkillArea,
  CurriculumSegmentDef,
  CurriculumSessionEntry,
  CurriculumActivity,
  CurriculumCheckpoint,
} from "@/content/types";

/**
 * MUSIC — "music as a band". A multi-instrument, choice-based programme:
 * children learn keyboard, ukulele, drums and vocals, and play together
 * like a band. It is banded by LEVEL (1 → 2 → 3), ability-gated (a monthly
 * assessment moves a child up), not by age — 5–8 and 8–12 do the same work.
 *
 * Class flow every session: warm-up → your instrument → play together.
 * Song-of-the-month is the ensemble repertoire, played in a linear rotation.
 *
 * Levels share `trackSlug: "music"`; only level 1 shows on the home grid,
 * levels 2–3 are reached via the level switcher. Skills climb each level.
 */

// ─── The class flow (same every session) ────────────────────
const segmentDefinitions: CurriculumSegmentDef[] = [
  {
    id: "warm-up",
    name: "warm-up",
    durationRange: "10 min",
    objective:
      "a short whole-group warm-up to open every class — a pitch, rhythm, voice or music-theory exercise that wakes up the ear and the body before the instruments come out.",
    type: "rotating",
    rotationPool: ["warmup-pitch", "warmup-rhythm"],
  },
  {
    id: "your-instrument",
    name: "your instrument",
    durationRange: "25 min",
    objective:
      "each child plays their chosen instrument — keyboard, ukulele, drums or vocals — working through their level book at their own pace. the educator moves between children; a monthly assessment on this work moves a child up a level.",
    type: "fixed",
  },
  {
    id: "ensemble",
    name: "play together",
    durationRange: "15 min",
    objective:
      "the whole group plays the song of the term together — every instrument at once — learning to listen, keep time and perform like a band. one song runs across a whole term and the group performs it every three months; the term songs follow a fixed order, and each child reads their own instrument's sheet at their level.",
    type: "rotating",
    rotationPool: ["sotm-1", "sotm-2", "sotm-3", "sotm-4", "sotm-5", "sotm-6"],
  },
];

// ─── Song of the month — the ensemble rotation, in linear order ──
const SONGS_OF_THE_MONTH = [
  "You Are My Sunshine",
  "Can't Help Falling in Love",
  "Opalite",
  "500 Miles",
  "Yellow Submarine",
  "Count On Me",
];

// ─── The full song library ───────────────────────────────────
// 6 ensemble "songs of the term" (play together) + 6 harder songs for
// extra practice in individual-instrument time. Every song ships a notation
// sheet per instrument (keyboard · ukulele · drums) and per level (1–4),
// matched to each child's part. Titles + order come from the OH "Songs of
// the Month" source folder (public/music/notation/<slug>-<inst>-l<n>.pdf).
export type MusicInstrumentId = "keys" | "ukulele" | "drums";
export interface MusicSong {
  slug: string;
  title: string;
  tier: "easy" | "intermediate" | "hard";
  ensemble: boolean; // true = a play-together "song of the term"
}
export const MUSIC_SONGS: MusicSong[] = [
  { slug: "yams", title: "You Are My Sunshine", tier: "easy", ensemble: true },
  { slug: "chfil", title: "Can't Help Falling in Love", tier: "easy", ensemble: true },
  { slug: "opalite", title: "Opalite", tier: "easy", ensemble: true },
  { slug: "500m", title: "500 Miles", tier: "easy", ensemble: true },
  { slug: "ys", title: "Yellow Submarine", tier: "easy", ensemble: true },
  { slug: "com", title: "Count On Me", tier: "intermediate", ensemble: true },
  { slug: "got", title: "Game of Thrones", tier: "intermediate", ensemble: false },
  { slug: "oo", title: "Ob-La-Di, Ob-La-Da", tier: "intermediate", ensemble: false },
  { slug: "edelweiss", title: "Edelweiss", tier: "intermediate", ensemble: false },
  { slug: "potc", title: "He's a Pirate", tier: "hard", ensemble: false },
  { slug: "qss", title: "Que Sera Sera", tier: "hard", ensemble: false },
  { slug: "sf", title: "Scarborough Fair", tier: "hard", ensemble: false },
];
export const MUSIC_INSTRUMENTS: { id: MusicInstrumentId; label: string }[] = [
  { id: "keys", label: "keyboard" },
  { id: "ukulele", label: "ukulele" },
  { id: "drums", label: "drums" },
];
export function musicNotationUrl(
  slug: string,
  inst: MusicInstrumentId,
  level: number
): string {
  return `/music/notation/${slug}-${inst}-l${level}.pdf`;
}

// ─── Activities ─────────────────────────────────────────────
const warmupActivities: Record<string, CurriculumActivity> = {
  "warmup-pitch": {
    id: "warmup-pitch",
    segment: "warm-up",
    title: "pitch & voice warm-up",
    setupLine: "everyone standing, teacher at the keyboard or with a ukulele.",
    howToPlay:
      "the educator sings or plays a single note; the children sing it back and match it. move between high and low, loud and soft, so children hear pitch and dynamics with their own voices before playing.",
    type: "facilitated",
    debriefPrompts: [
      { questions: ["was that note high or low?", "did we match it — or is it still climbing?"] },
    ],
  },
  "warmup-rhythm": {
    id: "warmup-rhythm",
    segment: "warm-up",
    title: "rhythm & tempo warm-up",
    setupLine: "everyone in a circle, hands free.",
    howToPlay:
      "clap and count a steady beat together — slow, then medium, then fast (snail · rabbit · cheetah). the educator changes tempo and the group follows, keeping the count steady in 3s and 4s.",
    type: "facilitated",
    debriefPrompts: [
      { questions: ["did the beat stay steady when we sped up?", "how many beats were we counting?"] },
    ],
  },
};

const instrumentActivity: Record<string, CurriculumActivity> = {
  "inst-choice": {
    id: "inst-choice",
    segment: "your-instrument",
    title: "your instrument",
    setupLine: "each child at their chosen instrument with their level book.",
    howToPlay:
      "children work individually on keyboard, ukulele, drums or vocals, moving through their level book page by page — the notation scaffold changes as levels rise (level 1 colour-coded keys → level 2 finger numbers → level 3 real note names). the educator circulates, and a monthly check on this work decides when a child moves up.",
    type: "facilitated",
    debriefPrompts: [
      { questions: ["which page did you get to today?", "what is the one thing you can now do that you couldn't last week?"] },
    ],
  },
};

const ensembleActivities: Record<string, CurriculumActivity> = Object.fromEntries(
  SONGS_OF_THE_MONTH.map((title, i) => [
    `sotm-${i + 1}`,
    {
      id: `sotm-${i + 1}`,
      segment: "ensemble",
      title: `song of the month · ${title}`,
      setupLine: "the whole group together, each on their instrument, notation on the stand.",
      howToPlay:
        "the group learns and plays this month's song together, reading from the notation for their instrument and level. play it slowly first, then up to tempo — everyone at once, listening to each other. every three months the group performs what they've built.",
      pdfUrl: `/music/sotm-scores-${i + 1}.pdf`,
      type: "facilitated",
      debriefPrompts: [
        { questions: ["did we stay together?", "which part do we need to practise before we can perform it?"] },
      ],
    } as CurriculumActivity,
  ])
);

const activities: Record<string, CurriculumActivity> = {
  ...warmupActivities,
  ...instrumentActivity,
  ...ensembleActivities,
};

// ─── Session flow — one term of song-of-the-month, class flow repeats ──
const sessionTable: CurriculumSessionEntry[] = SONGS_OF_THE_MONTH.map((_, i) => ({
  sessionNumber: i + 1,
  warmUp: i % 2 === 0 ? "warmup-pitch" : "warmup-rhythm",
  yourInstrument: "inst-choice",
  ensemble: `sotm-${i + 1}`,
  topicLayer: 1,
}));

// ─── Monthly level-up assessment (ability-gated, not age-gated) ──
const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 6,
    descriptors: [
      { skillArea: "rp", beginning: "keeps a beat with help", developing: "counts a steady beat and matches a single pitch", secure: "plays the level's rhythms and sings back short phrases in tune" },
      { skillArea: "mt", beginning: "hears fast vs slow", developing: "counts and names the level's beats/time", secure: "reads and applies the level's theory while playing" },
      { skillArea: "sr", beginning: "follows the colour/visual cues with help", developing: "reads the level's notation for their instrument", secure: "reads and plays a new piece at the level unaided" },
      { skillArea: "tech", beginning: "sets up with reminders", developing: "holds correct posture and technique through a piece", secure: "plays cleanly with the level's technique and dynamics" },
    ],
  },
];

// ─── The four skills — one ladder each, climbing every level ──
function skillAreas(level: 1 | 2 | 3 | 4): CurriculumSkillArea[] {
  const rp: Record<number, string[]> = {
    1: [
      "identify and play slow, medium and fast tempos",
      "count steadily with 3 or 4 beats",
      "sing and match pitches between C4 and C5",
      "identify high and low, loud and soft sounds",
    ],
    2: [
      "clap and play rhythms combining whole, half and quarter notes",
      "identify dynamics — soft (p) and loud (f)",
      "hear pitch direction across large intervals (over 2 octaves)",
      "sing back single notes and short call-and-response melodies",
    ],
    3: [
      "play rhythms combining whole, half, quarter notes and rests",
      "sing 4–8 note phrases and the major scale from any note",
      "identify pitch direction in medium intervals (1–2 octaves), and whether two notes are the same or different",
    ],
    4: [
      "clap and play rhythms combining eighth notes, dotted quarter notes and rests",
      "sing 5th and octave (8ve) intervals within the C4–C5 range",
      "identify pitch direction in small intervals — half steps and whole steps",
      "identify and sing harmonic intervals (5ths and octaves)",
    ],
  };
  const mt: Record<number, string[]> = {
    1: ["an introduction to beats and speed — counting to 4 and to 3"],
    2: ["identify 4/4, 3/4 and 2/4 time signatures"],
    3: ["identify and play C, F and G major and D, E and A minor chords"],
    4: [
      "identify and play the 6/4 time signature",
      "identify and demonstrate half steps and whole steps",
      "identify and demonstrate how a major diatonic scale is built",
    ],
  };
  const sr: Record<number, string[]> = {
    1: [
      "keyboard: press the colour-coded keys in order, holding each for 1–4 beats; find the groups of 2 and 3 black keys",
      "ukulele: follow visual patterns of up- and down-strokes",
      "drums: follow visual patterns of right and left hands",
    ],
    2: [
      "keyboard: follow 7 colour-coded keys with note values and finger numbers",
      "ukulele: read strumming patterns and play the C major chord",
      "drums: follow hi-hat and snare notation",
    ],
    3: [
      "keyboard: read notes by name (incl. accidentals) with the correct fingers and note values",
      "ukulele: shift between chords with basic strumming",
      "drums: read hi-hat, kick and snare staff notation with fills",
    ],
    4: [
      "keyboard: identify notes on both the treble and bass clef (the grand staff)",
      "ukulele: read and play from tabs across all 4 strings, and read and follow strumming patterns",
      "drums: follow staff notation for all drums",
    ],
  };
  const tech: Record<number, string[]> = {
    1: [
      "sit and stand with correct posture at every instrument",
      "hold the ukulele and pick, and hold the drumsticks, correctly",
      "vocals: steady breathing for 4 counts in and out",
    ],
    2: [
      "play with dynamic variation — soft (p) and loud (f)",
      "ukulele: strum any string without looking; drums: hi-hat and snare combinations",
      "vocals: match single-note pitch and sustain notes for 4–6 seconds",
    ],
    3: [
      "keyboard: play with both hands — left-hand chords, right-hand melody",
      "ukulele: switch smoothly between chords and mute with either hand",
      "vocals: controlled breathing, sustaining notes for 10–12 seconds",
    ],
    4: [
      "keyboard: play with both hands together, using the correct finger numbers for the song and wider dynamics (crescendo, decrescendo, mezzo forte)",
      "ukulele: play eighth-note strumming with accurate down- and up-strokes, switch chords smoothly, and shape wider dynamics",
      "drums: perform hi-hat, snare and kick combination rhythm patterns and fills",
      "vocals: sustain notes for 14–18 seconds, shaping crescendo and decrescendo",
    ],
  };
  return [
    { id: "rp", name: "rhythm & pitch", shortName: "R&P", abilities: rp[level] },
    { id: "mt", name: "music theory", shortName: "MT", abilities: mt[level] },
    { id: "sr", name: "sight reading", shortName: "SR", abilities: sr[level] },
    { id: "tech", name: "technique", shortName: "TECH", abilities: tech[level] },
  ];
}

// ─── Shared base across the three levels ────────────────────
const shared = {
  title: "music",
  category: "music" as const,
  ageGroup: "5-8",
  ageLabel: "ages 5–12",
  trackSlug: "music",
  tagline:
    "play every instrument — keys, strings, percussion and voice — and learn to perform like a band from day one.",
  totalSessions: 36,
  segmentDefinitions,
  sessionTable,
  activities,
  checkpoints,
  foundationalConcepts: [
    { name: "warm-up → your instrument → play together", body: "every class opens the ear, then individual play on your chosen instrument, then the whole group plays the song of the month as a band." },
    { name: "one child, one instrument — but everyone plays together", body: "children choose keyboard, ukulele, drums or vocals and go deep on it, while learning to play in an ensemble." },
    { name: "the notation scaffold fades as you climb", body: "level 1 uses colour-coded keys, level 2 adds finger numbers, level 3 reads real note names — the crutch is removed as reading grows." },
    { name: "you move up when you're ready, not when you're older", body: "a monthly assessment on your instrument work moves you up the levels; the group performs every three months." },
  ],
  ageBandComparison: {
    younger: ["works through the same level books and songs", "moves up by a monthly assessment, not by age"],
    older: ["works through the same level books and songs", "moves up by a monthly assessment, not by age"],
    note: "music is banded by level and ability, not age — 5–8 and 8–12 do the same work at their own pace.",
  },
};

const DESCRIPTION_BASE =
  "a multi-instrument, choice-based music programme.\n" +
  "children learn keyboard, ukulele, drums and vocals — and from day one, play together like a band.\n" +
  "every class runs warm-up → your instrument → play together, with a song of the month as the ensemble piece.\n" +
  "children move up the levels by a monthly assessment on their own instrument, and the group performs every three months.";

export const musicL1: CurriculumProgramme = {
  ...shared,
  id: "music-l1",
  slug: "music-l1",
  level: 1,
  levelName: "level 1",
  durationLabel: "~1–2 months",
  skillAreas: skillAreas(1),
  description:
    DESCRIPTION_BASE +
    "\nlevel 1 starts from the very beginning — colour-coded keys, first tempos and steady counting, matching pitch with the voice, and correct posture at every instrument, through first songs like Jingle Bells and Baby Shark.",
};

export const musicL2: CurriculumProgramme = {
  ...shared,
  id: "music-l2",
  slug: "music-l2",
  level: 2,
  levelName: "level 2",
  durationLabel: "~2–4 months",
  skillAreas: skillAreas(2),
  description:
    DESCRIPTION_BASE +
    "\nlevel 2 adds finger numbers and technique — whole/half/quarter-note rhythms, time signatures (4/4, 3/4, 2/4), dynamics (soft/loud), the C major chord on ukulele, and reading 7 colour-coded keys.",
};

export const musicL3: CurriculumProgramme = {
  ...shared,
  id: "music-l3",
  slug: "music-l3",
  level: 3,
  levelName: "level 3",
  durationLabel: "~4–6 months",
  skillAreas: skillAreas(3),
  description:
    DESCRIPTION_BASE +
    "\nlevel 3 moves to real notation — reading note names A–G with accidentals, rhythms with rests, C/F/G major and D/E/A minor chords, both hands on the keyboard, and switching chords on the ukulele.",
};
