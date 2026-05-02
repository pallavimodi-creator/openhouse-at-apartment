// Core content types for the Openhouse Teacher Tool.
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
  trialSession?: TrialSession;
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
  // Shared
  topicLayer: number;
  isCheckpoint?: boolean;
  isFlex?: boolean;
  // Art-specific metadata
  artiverseUnit?: number;
  artiverseDay?: number;
  artiverseUnitName?: string;
  // Robotics-specific metadata
  buildModel?: string; // "See-saw" | "Weighing Scale" | "Crane"
  buildDay?: number; // 1..6 for 5-8, 1..4 for 8-12
  buildDayLabel?: string; // "Day 1 — Explore", "Day 6 — Disassemble", etc.
  /**
   * Engage question — asked at the start of the 40-min Build segment.
   * Short, curiosity-opening; teacher takes 3-4 answers and moves on.
   */
  engageQuestion?: string;
  /**
   * Concept question — asked in the closing debrief. One direct question
   * about today's concept; one child answers; teacher confirms.
   */
  conceptQuestion?: string;
}

export interface CurriculumActivity {
  id: string;
  segment: "roll-call" | "playground" | "showtime" | "sign-off" | "log-book" | "art-gym" | "art-games" | "artiverse" | "art-care" | "experiment" | "build" | "experience-book";
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
