import { artDesignL1 } from "@/content/programmes/art-design-l1";
import { artDesignL1Skills } from "@/content/programmes/art-design-l1.skills";
import { artDesignL1Resources } from "@/content/programmes/art-design-l1.resources";
import { artDesignL1Sessions } from "@/content/programmes/art-design-l1.sessions";
import generatedAssets from "@/content/generated/assets.json";
import type {
  Programme,
  Resource,
  Session,
  Skill,
  SkillTag,
  ResourceType,
  DigitalAsset,
} from "@/content/types";

const PROGRAMMES: Programme[] = [artDesignL1];

// Merge synced assets into resources at module-load time.
const assetMap = generatedAssets as Record<string, Record<string, DigitalAsset[]>>;
const RESOURCES: Resource[] = artDesignL1Resources.map((r) => {
  const fromAssets = assetMap[r.programmeId]?.[r.id];
  return fromAssets && fromAssets.length > 0
    ? { ...r, digitalAssets: fromAssets }
    : r;
});
const SESSIONS: Session[] = artDesignL1Sessions;
const SKILLS: Skill[] = artDesignL1Skills;

export function listProgrammes(): Programme[] {
  return PROGRAMMES;
}

export function getProgramme(id: string): Programme | undefined {
  return PROGRAMMES.find((p) => p.id === id);
}

export function getSkillsForProgramme(programmeId: string): Skill[] {
  // v1: only Art & Design L1 has skills seeded
  if (programmeId === "art-design-l1") return SKILLS;
  return [];
}

export function getSkillByTag(tag: SkillTag): Skill | undefined {
  return SKILLS.find((s) => s.tag === tag);
}

export function listResources(programmeId: string): Resource[] {
  return RESOURCES.filter((r) => r.programmeId === programmeId);
}

export function getResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function listResourcesByType(
  programmeId: string,
  type: ResourceType
): Resource[] {
  return RESOURCES.filter(
    (r) => r.programmeId === programmeId && r.type === type
  );
}

export function listSessions(programmeId: string): Session[] {
  return SESSIONS.filter((s) => s.programmeId === programmeId);
}

export function getSession(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export interface ResourceFilters {
  types?: ResourceType[];
  skills?: SkillTag[];
  query?: string;
}

export function filterResources(
  resources: Resource[],
  filters: ResourceFilters
): Resource[] {
  const q = filters.query?.trim().toLowerCase();
  return resources.filter((r) => {
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(r.type)) return false;
    }
    if (filters.skills && filters.skills.length > 0) {
      if (!r.skills.some((s) => filters.skills!.includes(s))) return false;
    }
    if (q) {
      const hay = [r.title, r.subtitle ?? "", r.description]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function searchAll(query: string, programmeId: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { resources: [], sessions: [] };
  const resources = listResources(programmeId).filter((r) =>
    [r.title, r.subtitle ?? "", r.description]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
  const sessions = listSessions(programmeId).filter((s) =>
    [s.name, `s${s.index}`].join(" ").toLowerCase().includes(q)
  );
  return { resources, sessions };
}

export const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = {
  "art-gym": "Art Gym",
  artgame: "ArtGames",
  artistotle: "Artistotle",
  artiverse: "Artiverse",
  "art-care": "Art Care",
};

export const SKILL_COLOR_CLASS: Record<SkillTag, string> = {
  "L&T": "bg-skill-lt/10 text-skill-lt ring-skill-lt/20",
  "S&F": "bg-skill-sf/10 text-skill-sf ring-skill-sf/20",
  "C&P": "bg-skill-cp/10 text-skill-cp ring-skill-cp/20",
  "I&E": "bg-skill-ie/10 text-skill-ie ring-skill-ie/20",
  Responsibility: "bg-skill-resp/10 text-skill-resp ring-skill-resp/20",
};

export const SKILL_DOT_CLASS: Record<SkillTag, string> = {
  "L&T": "bg-skill-lt",
  "S&F": "bg-skill-sf",
  "C&P": "bg-skill-cp",
  "I&E": "bg-skill-ie",
  Responsibility: "bg-skill-resp",
};

// ─── Curriculum website accessors ───────────────────────────

import { curriculumProgrammes } from "@/content/programmes/curriculum-registry";
import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  Category,
} from "@/content/types";

export function listCurriculumProgrammes(): CurriculumProgramme[] {
  return curriculumProgrammes;
}

export function getCurriculumProgramme(
  slug: string
): CurriculumProgramme | undefined {
  return curriculumProgrammes.find((p) => p.slug === slug);
}

export function getSessionPlan(
  slug: string,
  sessionNumber: number
): CurriculumSessionEntry | undefined {
  const prog = getCurriculumProgramme(slug);
  if (!prog) return undefined;
  return prog.sessionTable.find((s) => s.sessionNumber === sessionNumber);
}

export function getActivity(
  slug: string,
  activityId: string
): CurriculumActivity | undefined {
  const prog = getCurriculumProgramme(slug);
  if (!prog) return undefined;
  return prog.activities[activityId];
}

export function getAllActivities(slug: string): CurriculumActivity[] {
  const prog = getCurriculumProgramme(slug);
  if (!prog) return [];
  return Object.values(prog.activities);
}

export const CATEGORY_COLOR_CLASS: Record<Category, string> = {
  art: "bg-category-art",
  language: "bg-category-language",
  music: "bg-category-music",
  movement: "bg-category-movement",
  stem: "bg-category-stem",
};

export const CATEGORY_TEXT_CLASS: Record<Category, string> = {
  art: "text-category-art",
  language: "text-category-language",
  music: "text-category-music",
  movement: "text-category-movement",
  stem: "text-category-stem",
};

// ─── Activity image lookup ─────────────────────────────────
// Maps CurriculumActivity.id → static image URL. If no entry, the activity
// popup falls back to the gradient + icon placeholder.
export const ACTIVITY_IMAGES: Record<string, string> = {
  // Public Speaking games
  "script-flip": "/games/ps/script-flip.png",
  "tale-trail": "/games/ps/tale-trail.png",
  "body-talk": "/games/ps/body-talk.png",
  "watch-your-step": "/games/ps/watch-your-step.png",
  "train-of-thoughts": "/games/ps/train-of-thoughts.png",
  "guess-me": "/games/ps/guess-me.png",
  spaggle: "/games/ps/spaggle.png",
  "pitch-perfect": "/games/ps/pitch-perfect.png",
  "speech-a-palooza": "/games/ps/speech-a-palooza.png",
  "debate-duel": "/games/ps/debate-duel.png",
  "improv-survival": "/games/ps/improv-survival.png",
  "whats-that-sound": "/games/ps/whats-that-sound.png",
  body: "/games/ps/every-body-says.png",
  shuffle: "/games/ps/shuffle.png",
  "magic-box": "/games/ps/magic-box.svg",
  // Art games
  "match-me": "/games/art/match-me.png",
  "colour-flip": "/games/art/colour-flip.png",
  "shape-stitch": "/games/art/shape-stitch.png",
  "shape-fusion": "/games/art/shape-fusion.png",
  "cue-cards-game": "/games/art/cue-cards-game.png",
  // Alias for slug derived from title "cue cards" (used on the overview tab).
  "cue-cards": "/games/art/cue-cards-game.png",
  "i-spy-i-make": "/games/art/i-spy-i-make.png",
  "i-spot": "/games/art/i-spot.png",
  // Alias for slug derived from title "i spot tool/medium".
  "i-spot-tool/medium": "/games/art/i-spot.png",
  artventure: "/games/art/artventure.png",
  "imagine-that": "/games/art/imagine-that.png",
  "doodle-dash": "/games/art/doodle-dash.png",
  // Art & Design 3-5 game placeholders (replace with real artwork later)
  "shape-stitch-3-5": "/games/art-3-5/shape-stitch.svg",
  "stitch-me": "/games/art-3-5/stitch-me.svg",
  "magna-tiles": "/games/art-3-5/magna-tiles.svg",
  "shape-mats": "/games/art-3-5/shape-mats.svg",
  "match-me-3-5": "/games/art-3-5/match-me.svg",
  "mix-it-up": "/games/art-3-5/mix-it-up.svg",
  "ryb-tiles": "/games/art-3-5/ryb-tiles.svg",
  "mini-artventure": "/games/art-3-5/mini-artventure.svg",
  // Robotics — experiment cue cards (thumbnail = first page of the PDF)
  "l1-levers-e1": "/robotics-manuals/l1-levers.png",
  "l1-levers-e2": "/robotics-manuals/l1-levers.png",
  "l1-levers-e3": "/robotics-manuals/l1-levers.png",
  "l1-levers-e4": "/robotics-manuals/l1-levers.png",
  "l2-levers-e1": "/robotics-manuals/l2-levers.png",
  "l2-levers-e2": "/robotics-manuals/l2-levers.png",
  "l2-levers-e3": "/robotics-manuals/l2-levers.png",
  "l2-levers-e4": "/robotics-manuals/l2-levers.png",
  "l2-levers-e5": "/robotics-manuals/l2-levers.png",
  "l2-levers-e6": "/robotics-manuals/l2-levers.png",
  "l1-pulleys-e1": "/robotics-manuals/l1-pulley.png",
  "l1-pulleys-e2": "/robotics-manuals/l1-pulley.png",
  "l1-pulleys-e3": "/robotics-manuals/l1-pulley.png",
  "l1-pulleys-e4": "/robotics-manuals/l1-pulley.png",
  "l2-pulleys-e4": "/robotics-manuals/l2-pulley.png",
  "l2-pulleys-e5": "/robotics-manuals/l2-pulley.png",
  // Robotics — model manuals (thumbnail = first page of the PDF)
  "build-see-saw": "/robotics-manuals/see-saw.png",
  "build-weighing-scale": "/robotics-manuals/weighing-scale.png",
  "build-crane": "/robotics-manuals/crane.png",
};

// Art gym book images, keyed by book number.
export const GYM_BOOK_IMAGES: Record<number, string> = {
  3: "/gym-books/book-3.png",
  4: "/gym-books/book-4.png",
  5: "/gym-books/book-5.png",
  6: "/gym-books/book-6.png",
};

export function getActivityImage(id: string): string | undefined {
  return ACTIVITY_IMAGES[id];
}

// ─── Activity video lookup ─────────────────────────────────
// Maps CurriculumActivity.id → video URL. Two kinds are supported:
//   · YouTube URL — rendered as a responsive youtube-nocookie iframe
//   · Self-hosted /public/…mp4 — rendered with the HTML <video> tag
// The popup auto-detects YouTube URLs via extractYouTubeId().
export const ACTIVITY_VIDEOS: Record<string, string> = {
  // Public Speaking
  "tale-trail": "https://youtu.be/i4uz_IFvLpU",
  "watch-your-step": "https://youtu.be/AoDBt-FEi5w",
  "speech-a-palooza": "https://youtu.be/bEZCo9Ay0Lk",
  spaggle: "https://youtu.be/bvpnvWKhhws",
  "improv-survival": "https://youtu.be/QoufaYiNAmE",
  // Art & Design
  "colour-flip": "https://youtu.be/Um9c5L71xGE",
};

export function getActivityVideo(id: string): string | undefined {
  return ACTIVITY_VIDEOS[id];
}

export const SEGMENT_COLORS: Record<string, string> = {
  "roll-call": "bg-brand-orange/12 text-brand-orange",
  playground: "bg-brand-orange/12 text-brand-orange",
  showtime: "bg-brand-orange/12 text-brand-orange",
  "sign-off": "bg-brand-orange/12 text-brand-orange",
  "log-book": "bg-brand-orange/12 text-brand-orange",
  "art-gym": "bg-brand-orange/12 text-brand-orange",
  "art-games": "bg-brand-orange/12 text-brand-orange",
  artiverse: "bg-brand-orange/12 text-brand-orange",
  "art-care": "bg-brand-orange/12 text-brand-orange",
  experiment: "bg-brand-orange/12 text-brand-orange",
  build: "bg-brand-orange/12 text-brand-orange",
  "experience-book": "bg-brand-orange/12 text-brand-orange",
};
