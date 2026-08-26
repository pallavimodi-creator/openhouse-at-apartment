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
    name: "warm up",
    durationRange: "10 min",
    objective:
      "a short whole-group warm-up — vocal training (breathing and pitch-matching games) then rhythm training (tempo and counting games) — waking up the ear, voice and body before the instruments come out.",
    type: "rotating",
    rotationPool: ["warmup-pitch", "warmup-rhythm"],
  },
  {
    id: "your-instrument",
    name: "instrument rotation",
    durationRange: "50 min",
    objective:
      "the heart of the class — each child rotates through two instruments a class, chosen by their own interest, working through their level book on each (keyboard, ukulele, drums or vocals), 2–4 weeks per exercise or song. the instrument a child isn't playing in the band is practised here too. children take turns playing for the educator, who moves between them and marks progress; a monthly assessment on this work moves a child up a level, per instrument. trying a different instrument is only ever a gentle nudge — never a requirement: a child is encouraged to explore more instruments as one way to keep growing, but they can go as deep as they like on the instrument they love and move up the levels on that alone.",
    type: "fixed",
  },
  {
    id: "ensemble",
    name: "ensemble play",
    durationRange: "30 min",
    objective:
      "the whole group learns and plays the band song together. each child is given one instrument for the performance — chosen by interest, ability and rotation — and reads their part at their book level. children learn each part over 2–3 weeks, then perform as a band, with individual performances too, roughly every two months.",
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
// The 6 songs that ship notation on the site (levels 1–3). The harder songs
// and level-4 sheets were removed; add them back here if level 4 returns.
export const MUSIC_SONGS: MusicSong[] = [
  { slug: "yams", title: "You Are My Sunshine", tier: "easy", ensemble: true },
  { slug: "chfil", title: "Can't Help Falling in Love", tier: "easy", ensemble: true },
  { slug: "opalite", title: "Opalite", tier: "easy", ensemble: true },
  { slug: "500m", title: "500 Miles", tier: "easy", ensemble: true },
  { slug: "ys", title: "Yellow Submarine", tier: "easy", ensemble: false },
  { slug: "com", title: "Count On Me", tier: "intermediate", ensemble: false },
];
// ── Play-together (band) songs, per level ──
// Each child performs the band song at the SAME level they are on in their
// book. Performances happen roughly every two months (level 1 is one month,
// its single beginner song), as a group AND with individual performances.
export interface MusicBandSong {
  slug: string;
  title: string;
  perform: boolean; // performed at the end of the level, vs practised only
  performLabel: string;
}
export const MUSIC_BAND_SONGS_BY_LEVEL: Record<number, MusicBandSong[]> = {
  1: [
    {
      slug: "yams",
      title: "You Are My Sunshine",
      perform: true,
      performLabel:
        "performed at the end of month 1 — as a band, plus individual performances",
    },
  ],
  2: [
    {
      slug: "chfil",
      title: "Can't Help Falling in Love",
      perform: true,
      performLabel:
        "performed at the end of month 2 — as a band, plus individual performances",
    },
    {
      slug: "opalite",
      title: "Opalite",
      perform: false,
      performLabel: "practised this level — performed later, at level 3",
    },
  ],
  3: [
    {
      slug: "opalite",
      title: "Opalite",
      perform: true,
      performLabel:
        "performed at the end of month 2 — as a band, plus individual performances",
    },
    {
      slug: "500m",
      title: "500 Miles",
      perform: true,
      performLabel:
        "performed at the end of month 4 — as a band, plus individual performances",
    },
  ],
};

// ── How a band song is built, week by week (ensemble-play time) ──
// The principle every ensemble cycle follows: about 25 minutes of each
// class, the group builds ONE song of the month up in layers — voice
// first, then keys, then ukulele & drums, then everyone together — and
// closes the cycle with a performance. Roughly an 8-week arc per song.
export interface MusicEnsembleWeek {
  weeks: string; // "week 1" / "weeks 2–4" / "week 8 · end of class"
  focus: string;
  activities: string[];
  teacherNote?: string;
}
export const MUSIC_ENSEMBLE_CYCLE: MusicEnsembleWeek[] = [
  {
    weeks: "week 1",
    focus: "listening & vocal training",
    activities: [
      "introduce the song of the month through active listening",
      "sing the melody using child-friendly methods — call & response, humming",
    ],
    teacherNote:
      "the teacher uses lyric-based prompts so children memorise the song naturally.",
  },
  {
    weeks: "weeks 2–4",
    focus: "keyboard training",
    activities: [
      "introduce the keyboard notation for the song",
      "play the notes in sequence while keeping the rhythm",
    ],
    teacherNote:
      "the teacher gradually builds up to playing along with the vocalists and the drummer.",
  },
  {
    weeks: "weeks 5–6",
    focus: "ukulele & drums",
    activities: [
      "introduce the ukulele or drum part for the song — choose from generic 3/4 or 4/4 patterns",
      "strum or drum in time with the song",
      "on the drum part, children take turns on the kit while the rest count out loud or clap in time",
    ],
    teacherNote:
      "the teacher gradually builds up to playing along with the vocalists.",
  },
  {
    weeks: "weeks 7–8",
    focus: "rehearsal & instrument assignments",
    activities: [
      "children are assigned their parts on a rotation basis",
      "rehearse all instruments with vocals together, holding the rhythm",
    ],
  },
  {
    weeks: "week 8 · end of class",
    focus: "performance",
    activities: [
      "reserve the last 15–20 minutes of the class for the performance",
    ],
  },
];

// ── Approx. class counts per level, by age band ──
// Classes run roughly weekly. 5–8 year-olds take ~20% more classes than
// 8–12 to reach the same level, so each level is calibrated by age.
export const MUSIC_CLASS_COUNTS: Record<
  number,
  { younger: number; older: number }
> = {
  1: { younger: 5, older: 4 },
  2: { younger: 10, older: 8 },
  3: { younger: 19, older: 16 },
};

// ── Extra practice songs (levels 1–3) — the only practice songs at these
// levels. Given during individual-instrument time once a child has finished
// their book work. ──
export const MUSIC_PRACTICE_SONGS: { slug: string; title: string }[] = [
  { slug: "ys", title: "Yellow Submarine" },
  { slug: "com", title: "Count On Me" },
];

// ── Warm-up games (they rotate) ──
// Every class opens with a short vocal warm-up and a short rhythm warm-up;
// the educator picks one from each group and rotates them. Names + resources
// come from the OH music sheet. Only "dancing tempos" ships an embedded link
// in the sheet; the rest are named resources (apps / Spotify / OH games).
export interface MusicWarmup {
  group: "vocal" | "rhythm";
  name: string;
  detail: string;
  // A resource is either an external link (url → opens in a new tab) or a
  // local OH game PDF (pdf → opens in the in-page flip viewer).
  resources: { label: string; url?: string; pdf?: string }[];
}
export const MUSIC_WARMUPS: MusicWarmup[] = [
  {
    group: "vocal",
    name: "breathing",
    detail: "steady breathing in and out to settle and open the voice.",
    resources: [
      { label: "breathing track 1 (Spotify)", url: "https://open.spotify.com/track/00ZvV86YTswzJU8bjvmwzA" },
      { label: "breathing track 2 (Spotify)", url: "https://open.spotify.com/track/6BZkIMe6dqCnCgfhOfDAtG" },
    ],
  },
  {
    group: "vocal",
    name: "pitch matching",
    detail: "sing back single notes and short phrases — match the pitch.",
    resources: [
      { label: "sing-back 1 (Spotify)", url: "https://open.spotify.com/track/5noggtKIruVMNmJej37SFI" },
      { label: "sing-back 2 (Spotify)", url: "https://open.spotify.com/track/3hgSFCw3VVRwhtrOzDXP1H" },
      { label: "sing-back 3 (Spotify)", url: "https://open.spotify.com/track/575K9PfmTnXX9eMyjTqs0O" },
      { label: "Pitchy Ninja", url: "https://pitchy.ninja/" },
      { label: "Vocal Match", url: "https://trainer.thetamusic.com/index.php/en/content/html5-vocal-match" },
    ],
  },
  {
    group: "vocal",
    name: "pitch direction",
    detail: "a note goes up or down — name the direction.",
    resources: [
      { label: "Musicca", url: "https://www.musicca.com/exercises/circle/12" },
      { label: "Speed Pitch", url: "https://trainer.thetamusic.com/en/content/html5-speed-pitch" },
    ],
  },
  {
    group: "rhythm",
    name: "tempo quiz",
    detail: "slow, medium or fast — identify the tempo.",
    resources: [
      { label: "Dancing Tempos", url: "https://kids.carnegiehall.org/quiz/dancing-tempos" },
    ],
  },
  {
    group: "rhythm",
    name: "rhythm bingo",
    detail: "match the rhythm you hear on your bingo card.",
    resources: [
      { label: "Rhythm Bingo — open the game", pdf: "/music/games/rhythm-bingo.pdf" },
    ],
  },
  {
    group: "rhythm",
    name: "change the time signature",
    detail:
      "the educator sets a time signature; clap the counts in time for 4 bars.",
    resources: [],
  },
  {
    group: "rhythm",
    name: "musical hide & seek",
    detail: "louder = warmer, softer = colder — hear the dynamics.",
    resources: [],
  },
  {
    group: "rhythm",
    name: "composition game",
    detail: "build and play a short pattern of your own — for older children (8–12).",
    resources: [
      { label: "Composition Game (8–12) — open the game", pdf: "/music/games/composition-game.pdf" },
    ],
  },
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
    title: "vocal warm-up",
    setupLine: "everyone standing, educator at the keyboard or with a ukulele.",
    howToPlay:
      "open the voice with breathing, then a pitch game — sing back single notes and short phrases (5-note major scale, single-note matching), and name whether a note goes up or down. rotate through the vocal warm-ups so it stays fresh.",
    type: "facilitated",
    debriefPrompts: [
      { questions: ["was that note high or low?", "did we match it — or is it still climbing?"] },
    ],
  },
  "warmup-rhythm": {
    id: "warmup-rhythm",
    segment: "warm-up",
    title: "rhythm warm-up",
    setupLine: "everyone in a circle, hands free.",
    howToPlay:
      "pick one rhythm game and rotate them across classes — a tempo quiz (slow/medium/fast), rhythm bingo, counting games, musical hide & seek for loud/soft, or setting a time signature and clapping the counts.",
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
    title: "instrument rotation",
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
      title: `band song · ${title}`,
      setupLine: "the whole group together, each on their instrument, notation on the stand.",
      howToPlay:
        "the group learns and plays the band song together, each child reading the notation for their instrument at their own level (see songs & sheet music). play it slowly first, then up to tempo — everyone at once, listening to each other. roughly every two months the group performs what they've built, as a band and with individual performances.",
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
  const rhythm: Record<number, string[]> = {
    1: [
      "identify and play slow, medium and fast tempos",
      "demonstrate steady counting with 3 or 4 beats",
    ],
    2: ["identify, clap and play rhythms combining whole, half and quarter notes"],
    3: [
      "identify, clap and play rhythms combining whole, half and quarter notes and rests",
    ],
    4: [
      "identify, clap and play rhythms combining eighth notes, dotted quarter notes and rests",
    ],
  };
  const et: Record<number, string[]> = {
    1: [
      "sing and match pitches with single notes between C4 and C5",
      "identify high and low pitches",
      "identify loud and soft sounds",
    ],
    2: [
      "identify dynamics — soft (p) and loud (f)",
      "identify pitch direction in large intervals (over 2 octaves)",
      "sing back individual notes, and short melodies with call and response",
    ],
    3: [
      "sing phrases of 4–8 notes, and the major scale starting on any note",
      "identify whether two played notes are the same or different",
      "identify pitch direction in medium intervals (1–2 octaves)",
    ],
    4: [
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
      "keyboard: press the five colour-coded keys in order, holding each for 1–4 beats; find the groups of 2 and 3 black keys",
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
      "vocals: maintain correct posture, match single-note pitch and sing simple songs, sustaining notes for 4–6 seconds",
    ],
    3: [
      "keyboard: play with both hands — left-hand chords, right-hand melody",
      "ukulele: play left-hand exercises for note clarity, switch between chords, and mute with either hand",
      "drums: play hi-hat, kick and snare combination rhythms",
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
    { id: "rhythm", name: "rhythm", shortName: "RHY", abilities: rhythm[level] },
    { id: "mt", name: "music theory", shortName: "MT", abilities: mt[level] },
    { id: "et", name: "ear training", shortName: "EAR", abilities: et[level] },
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
    { name: "warm up → instrument rotation → ensemble play", body: "every class opens the ear, then each child works through their own level book on their instrument (playing for the educator, who marks progress), and finally the whole group plays the band song together." },
    { name: "one child, one instrument — but everyone plays together", body: "children choose keyboard, ukulele, drums or vocals and go deep on it, while learning to play in an ensemble." },
    { name: "the notation scaffold fades as you climb", body: "level 1 uses colour-coded keys, level 2 adds finger numbers, level 3 reads real note names — the crutch is removed as reading grows." },
    { name: "you move up when you're ready, not when you're older", body: "a monthly assessment on your instrument work moves you up the levels; the group performs roughly every two months." },
  ],
  ageBandComparison: {
    younger: ["works through the same level books and songs", "moves up by a monthly assessment, not by age"],
    older: ["works through the same level books and songs", "moves up by a monthly assessment, not by age"],
    note: "music is banded by level and ability, not age — 5–8 and 8–12 do the same work at their own pace.",
  },
};

const DESCRIPTION_BASE =
  "a multi-instrument, choice-based programme — children learn keyboard, ukulele, drums and vocals.\n" +
  "from day one, they play together like a band.\n" +
  "every class runs warm up → instrument rotation → ensemble play.\n" +
  "children move up by a monthly assessment on their own instrument.\n" +
  "the group performs roughly every two months — as a band and with individual performances.";

// ── Two age bands (5–8 · 8–12) ──
// Music is banded by level & ability, but 5–8 and 8–12 are PACED differently
// (5–8 take ~20% more classes to reach the same level, per the OH music sheet).
// So each age band is its own track — its own home-page card, durations, class
// counts and plans — while the content of each level is identical.
const MUSIC_AGE_BANDS = [
  {
    key: "5-8" as const,
    label: "ages 5–8",
    track: "music-5-8",
    older: false,
    hero: "/prog-music-young.jpg",
    durations: { 1: "~2 months", 2: "~4 months", 3: "~6 months" } as Record<number, string>,
  },
  {
    key: "8-12" as const,
    label: "ages 8–12",
    track: "music-8-12",
    older: true,
    hero: "/prog-music.jpg",
    durations: { 1: "~1 month", 2: "~2–3 months", 3: "~4–5 months" } as Record<number, string>,
  },
];

function makeMusicLevel(
  band: (typeof MUSIC_AGE_BANDS)[number],
  level: 1 | 2 | 3
): CurriculumProgramme {
  const counts = MUSIC_CLASS_COUNTS[level];
  return {
    ...shared,
    id: `${band.track}-l${level}`,
    slug: `${band.track}-l${level}`,
    level,
    levelName: `level ${level}`,
    ageGroup: band.key,
    ageLabel: band.label,
    trackSlug: band.track,
    durationLabel: band.durations[level],
    totalSessions: band.older ? counts.older : counts.younger,
    skillAreas: skillAreas(level),
    description: DESCRIPTION_BASE,
    heroImageUrl: band.hero,
  };
}

export const musicProgrammes: CurriculumProgramme[] = MUSIC_AGE_BANDS.flatMap(
  (band) => ([1, 2, 3] as const).map((level) => makeMusicLevel(band, level))
);
