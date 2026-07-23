// Core content types for the Openhouse Educator Tool.
// All content is statically typed and loaded at build time — no DB in v1.

export type SkillTag = "L&T" | "S&F" | "C&P" | "I&E" | "Responsibility";

export type AgeGroup = "3-5" | "5-7" | "5-8" | "7-9" | "8-12";

export type AssetType =
  | "pdf"
  | "printable"
  | "image"
  | "audio"
  | "slide"
  | "video";

export type SetupEffort = "low" | "medium" | "high";
export type FacilitationLevel = "easy" | "moderate" | "advanced";

export type ResourceType =
  | "art-gym"
  | "artgame"
  | "artistotle"
  | "artiverse"
  | "art-care";

export type ResourceStatus =
  | "existing"
  | "programme-designed"
  | "in-production"
  | "procurement-only";

export type Category = "art" | "language" | "music" | "movement" | "stem";

export interface Skill {
  id: string;
  tag: SkillTag;
  name: string; // "Lines & Texture"
  shortName: string; // for chips
  description: string;
  abilities: string[]; // the four progression levels
}

export interface Programme {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  ageGroup: AgeGroup;
  sessionCount: number;
  classSize: string;
  durationMinutes: number;
  objective: string;
  skillIds: string[]; // references Skill.id
  segments: {
    name: string;
    durationMinutes: number;
    builds: string;
    howItRuns: string;
  }[];
}

export interface Variation {
  id: string;
  name: string;
  description: string;
  ageMin?: number;
}

export interface DifficultyLevel {
  level: "easy" | "medium" | "hard";
  mechanism: string[];
  description: string;
}

export interface DigitalAsset {
  id: string;
  title: string;
  type: AssetType;
  thumbnailUrl: string;
  previewUrl?: string;
  fileUrl: string;
  linkedResourceId: string;
  driveFileId?: string;
  sizeBytes?: number;
}

export interface Resource {
  id: string;
  programmeId: string;
  type: ResourceType;
  title: string;
  subtitle?: string;
  description: string; // "What it is"
  ageGroup: AgeGroup;
  skills: SkillTag[];
  durationMinutes?: number;
  setupEffort: SetupEffort;
  facilitationLevel: FacilitationLevel;
  status: ResourceStatus;
  components: string[];
  skillNote: string; // "Skill — L&T: ..."
  variations?: Variation[];
  difficultyLevels?: DifficultyLevel[];
  steps?: string[];
  tips?: string[];
  differentiation?: string[];
  digitalAssets: DigitalAsset[];
}

export type SegmentName =
  | "Art Gym"
  | "ArtGames"
  | "Artistotle"
  | "Artiverse"
  | "Art Care";

export interface SessionSegment {
  order: number;
  name: SegmentName;
  durationMinutes: number;
  resourceId: string;
  mode?: string;
  note?: string;
}

export interface Session {
  id: string; // "s01"
  programmeId: string;
  index: number;
  name: string;
  term: 1 | 2;
  durationMinutes: number;
  segments: SessionSegment[];
}

// ─── Curriculum website types ───

export interface CurriculumProgramme {
  id: string;
  slug: string;
  title: string;
  category: Category;
  ageGroup: string;
  ageLabel: string;
  tagline: string;
  description: string;
  heroImageUrl?: string;
  totalSessions: number;
  skillAreas: CurriculumSkillArea[];
  segmentDefinitions: CurriculumSegmentDef[];
  sessionTable: CurriculumSessionEntry[];
  activities: Record<string, CurriculumActivity>;
  checkpoints: CurriculumCheckpoint[];
  artiverseUnits?: ArtiverseUnit[];
  /**
   * Books used as the spine of a language programme. Each book runs
   * across 6 days with a deliberate two-book gap between days 3 and 4.
   */
  languageBooks?: LanguageBook[];
  /**
   * Songs used as the warm-up playlist (e.g. Roll & Rhyme in the
   * language programme). Each song embeds an existing YouTube video
   * so educators can play it directly inside the overview.
   */
  songs?: ProgrammeSong[];
  trialSession?: TrialSession;
  /**
   * Documents which experiments pair with each model build and why — the
   * "experiment + build" logic where the experiment tests a part the model
   * actually uses. Rendered as a dedicated overview section. The experiment
   * list per model is derived from the sessionTable; `why` is the rationale.
   */
  modelPairings?: ModelPairing[];
  /**
   * Level within a multi-level track — robotics runs level 1 (mechanics)
   * and then level 2 (electronics). Programmes without a level are
   * single-level and behave exactly as before.
   */
  level?: number;
  /** Short level name for the level switcher — "mechanics", "electronics". */
  levelName?: string;
  /**
   * Slug of the level-1 programme this level belongs to. Levels sharing a
   * trackSlug are shown together by the level switcher; only level 1 (or a
   * programme with no level) appears on the home grid.
   */
  trackSlug?: string;
  /** The big ideas a level is built on — each discovered by building. */
  foundationalConcepts?: { name: string; body: string }[];
  /** Concepts a child can explain, phrased in a child's words. */
  glossary?: { term: string; inChildsWords: string }[];
  /** The component blocks a child can name and hold. */
  components?: { block: string; whatItIs: string }[];
  /**
   * How the same programme differs across its two age bands — same content,
   * different depth. Rendered as a two-column comparison in the overview.
   */
  ageBandComparison?: {
    younger: string[]; // what ages 5–8 do
    older: string[]; // what ages 8–12 do
    note?: string; // one line on what stays the same
  };
}

export interface ModelPairing {
  /** Matches CurriculumSessionEntry.buildModel. */
  model: string;
  /** Machine type(s) the model uses, e.g. "Levers", "Gears", "Levers & Pulleys". */
  topic: string;
  /** Why these experiments pair with this model. */
  why: string;
}

export interface LanguageBook {
  /** 1-indexed reading order. */
  order: number;
  title: string;
  author: string;
  /** Free text — e.g. "Ages 4+", "Ages 3–7, Lexile AD510L". */
  ageRange: string;
  /** One sentence that opens the card. */
  summary: string;
  /** Why this book sits in this position in the reading order. */
  whyThisPosition: string;
  /** Theme keywords — pair with vocabulary type / songs. */
  themes: string[];
  /** Target vocabulary words pulled from the book — used in Wordsmiths. */
  vocabulary: string[];
  /**
   * The kind of vocabulary the book is built around — drives which
   * Wordsmiths resource pairs with the book.
   */
  vocabularyType: "emotion-tiles" | "story-calendar";
  /** One of the four group activity types from the programme spec. */
  groupActivityType:
    | "story-re-enactment"
    | "change-story-endings"
    | "vocabulary-reproduction"
    | "puppet-character";
  /** Cover image — falls back to placeholder if missing. */
  heroImageUrl?: string;
}

export interface ProgrammeSong {
  /** 1-indexed playlist order. */
  order: number;
  title: string;
  /** YouTube video id (the part after "v=" in the URL). */
  youtubeId: string;
  /** What the song builds — short phrase, sentence case. */
  whatItBuilds: string;
  /** Which book or programme moment this song pairs with. */
  pairsWith: string;
  /** Hint to the educator about when to introduce this song. */
  introHint: string;
}

export interface TrialSession {
  intro: string;
  segments: TrialSessionSegment[];
}

export interface TrialSessionSegment {
  name: string;
  time: string;
  objective?: string;
  setupLine?: string;
  howToPlay?: string;
  variations?: string[];
  materials?: string[];
  difficulty?: string[];
  debrief?: string;
  example?: string;
  heroImageUrl?: string;
  speakingTable?: { speakingTime: string; stepsMoved: string }[];
  activities?: TrialSessionActivity[];
}

export interface TrialSessionActivity {
  heroImageUrl?: string;
  name: string;
  setupLine?: string;
  howToPlay: string;
  materials?: string;
  extra?: string;
}

export interface ArtiverseUnit {
  id: string;
  unitNumber: number;
  medium: string;
  technique: string;
  whatChildrenMake: string;
  days: number;
  abilitiesCovered: string[];
  topicOptions: string[];
  heroImageUrl: string;
  /**
   * Additional reference images for this unit (e.g. a "day 2" or alternate
   * spread). Renderers can show these alongside the hero in a small gallery.
   */
  extraImages?: string[];
}

/**
 * Richer ability representation used by programmes (like robotics) that
 * present each ability as a named, described, potentially north-star item.
 * Simpler programmes can still pass bare strings — renderers handle both.
 */
export interface CurriculumAbility {
  name: string;
  description: string;
  isNorthStar?: boolean;
}

export interface CurriculumSkillArea {
  id: string;
  name: string;
  shortName: string;
  abilities: (string | CurriculumAbility)[];
}

export interface CurriculumSegmentDef {
  id: string;
  name: string;
  durationRange: string;
  objective: string;
  type: "rotating" | "fixed";
  rotationPool?: string[];
}

export interface CurriculumSessionEntry {
  sessionNumber: number;
  // Public Speaking segments
  rollCall?: string;
  playground?: string;
  showtime?: string;
  signOff?: string;
  // Art & Design segments
  artGym?: string;
  artGames?: string;
  artiverse?: string;
  // Robotics segments
  experiment?: string;
  build?: string;
  experienceBook?: string;
  // STEM 3-5 segments
  imaginePlayground?: string; // Build project id (e.g. "ip-train-time") or maker filler id, on Session A
  wonderWorld?: string; // workbook activity id (e.g. "ww-bread-1-punch-and-squish") or food game, on Session B
  logicLab?: string; // logic game id (e.g. "ll-magna-tiles", "ll-dot-grid") — every session
  numbersGym?: string; // level + page marker (e.g. "ng-l1-pg-3") — every session, self-paced
  sessionType?: "A" | "B"; // alternates across the 60-session sequence
  // Shared
  topicLayer: number;
  isCheckpoint?: boolean;
  isFlex?: boolean;
  // Art-specific metadata
  artiverseUnit?: number;
  artiverseDay?: number;
  artiverseUnitName?: string;
  // Language Through Storytelling segments
  rollRhyme?: string; // song id — what plays in Roll & Rhyme today
  bookOClock?: string; // book id (e.g. "book-1") — book read today
  wordsmiths?: string; // wordsmiths resource id (rotates per book)
  playWrites?: string; // material rotated for Play-Writes today
  // Language-specific metadata — anchors Book'o'Clock to its 6-day arc
  bookOrder?: number; // 1..8 — which book is being read
  bookDay?: number; // 1..6 — day in the 6-day arc
  bookTitle?: string; // resolved title for quick render
  // Robotics-specific metadata
  buildModel?: string; // "See-saw" | "Weighing Scale" | "Crane"
  buildDay?: number; // 1..6 for 5-8, 1..4 for 8-12
  buildDayLabel?: string; // "Day 1 — Explore", "Day 6 — Disassemble", etc.
  /**
   * Engage question — asked at the start of the 40-min Build segment.
   * Short, curiosity-opening; educator takes 3-4 answers and moves on.
   */
  engageQuestion?: string;
  /**
   * Concept question — asked in the closing debrief. One direct question
   * about today's concept; one child answers; educator confirms.
   */
  conceptQuestion?: string;
}

export interface CurriculumActivity {
  id: string;
  segment: "roll-call" | "playground" | "showtime" | "sign-off" | "log-book" | "art-gym" | "art-games" | "artiverse" | "art-care" | "experiment" | "build" | "experience-book" | "roll-rhyme" | "book-o-clock" | "wordsmiths" | "play-writes" | "imagine-playground" | "wonder-world" | "logic-lab" | "numbers-gym";
  title: string;
  cardName?: string;
  setupLine: string;
  howToPlay: string;
  example?: string;
  variations?: CurriculumVariation[];
  difficultyLevels?: CurriculumDifficulty[];
  materials?: string[];
  debriefPrompts: CurriculumDebrief[];
  type: "physical-game" | "digital-game" | "facilitated";
  prompts?: string[];
  promptHeading?: string;
  /**
   * Optional PDF the activity references (e.g. an experiment cue card or a
   * model manual). Auto-injected into the materials list as a clickable
   * link by `ActivityPopup`.
   */
  pdfUrl?: string;

  /* ─── structured game-manual fields ─────────────────────────
   * When present, ActivityPopup renders these directly as a
   * world-class rulebook (goal, players, setup, numbered steps,
   * ends-when, variations, skills). When absent, it falls back
   * to parsing the dense `howToPlay` paragraph.
   * All fields are optional so legacy activities keep working.
   * ─────────────────────────────────────────────────────────── */

  /** "1–6 children + educator" — quick at-a-glance chip. */
  players?: string;
  /** "10 min" — displayed alongside players. */
  duration?: string;
  /**
   * One sentence describing what the CHILD does — not what they
   * learn. e.g. "the child re-tells the story using picture cards."
   */
  goal?: string;
  /**
   * Numbered play steps in imperative voice, one action per step.
   * Preferred over the dense `howToPlay` paragraph.
   */
  steps?: string[];
  /** One sentence saying how the round finishes. */
  endsWhen?: string;
  /** Single-sentence easier variation. */
  easierVariation?: string;
  /** Single-sentence harder variation. */
  harderVariation?: string;
  /**
   * Ids that reference this programme's `CurriculumSkillArea[].id`.
   * Rendered as a small chip row in the footer of the manual.
   */
  skillIds?: string[];

  /**
   * educator's note — a short block of guidance for the educator.
   * If a single string: renders as one paragraph.
   * If a string array: renders as a bulleted list.
   */
  educatorNote?: string | string[];

  /**
   * Reference links — external URLs (e.g. tutorial videos) shown as a
   * "reference links" section below the how-to-play. Never inserted
   * into materials.
   */
  referenceLinks?: { label: string; url: string }[];

  /**
   * Custom titled blocks for game-specific info (e.g. "wild cards" or
   * "free play"). Rendered as titled cards between the play steps and
   * the variations. Use sparingly.
   */
  namedBlocks?: { title: string; body: string | string[] }[];
}

export interface CurriculumVariation {
  name: string;
  description: string;
}

export interface CurriculumDifficulty {
  level: string;
  description: string;
}

export interface CurriculumDebrief {
  notice?: string;
  name?: string;
  connect?: string;
  /**
   * Richer, programme-specific debrief content.
   * Each string is rendered on its own line in the popup. A line that ends
   * with a colon (e.g. "Tone Awareness:") or is all-uppercase is treated as
   * a section heading; all other lines render as bulleted questions.
   */
  questions?: string[];
}

export interface CurriculumCheckpoint {
  afterSession: number;
  descriptors: CurriculumCheckpointDescriptor[];
}

export interface CurriculumCheckpointDescriptor {
  skillArea: string;
  beginning: string;
  developing: string;
  secure: string;
}
