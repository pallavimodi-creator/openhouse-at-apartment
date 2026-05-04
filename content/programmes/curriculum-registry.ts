import type { CurriculumProgramme } from "@/content/types";
import { publicSpeaking58 } from "./public-speaking-5-8";
import { publicSpeaking812 } from "./public-speaking-8-12";
import { artDesign35 } from "./art-design-3-5";
import { artDesign58 } from "./art-design-5-8";
import { artDesign812 } from "./art-design-8-12";
import { robotics58 } from "./robotics-5-8";
import { robotics812 } from "./robotics-8-12";
import { languageStorytelling35 } from "./language-storytelling-3-5";

// Registry of all 8 programmes for the homepage cards.
// Ordered: all art first (youngest → oldest), then language/speaking (youngest → oldest), then robotics (youngest → oldest).

export const curriculumProgrammes: CurriculumProgramme[] = [
  // ── Art & Design ──
  artDesign35,
  artDesign58,
  artDesign812,

  // ── Language & Public Speaking ──
  languageStorytelling35,
  publicSpeaking58,
  publicSpeaking812,

  // ── Robotics / STEM ──
  // Stub for 3–5 STEM. Content is still being authored — totalSessions = 0
  // so ProgrammeCard renders the "coming soon" state on the homepage.
  {
    id: "robotics-3-5",
    slug: "robotics-3-5",
    title: "stem",
    category: "stem",
    ageGroup: "3-5",
    ageLabel: "ages 3–5",
    heroImageUrl: "/prog-stem-3-5.gif",
    tagline: "an early-years stem programme that builds curiosity through hands-on play.",
    description:
      "children explore cause and effect, simple tools, and basic systems through guided play and discovery. early experiments invite observation, prediction, and questioning — building the foundations of how things work.",
    totalSessions: 0,
    skillAreas: [],
    segmentDefinitions: [],
    sessionTable: [],
    activities: {},
    checkpoints: [],
  },
  robotics58,
  robotics812,
];
