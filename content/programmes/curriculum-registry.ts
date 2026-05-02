import type { CurriculumProgramme } from "@/content/types";
import { publicSpeaking58 } from "./public-speaking-5-8";
import { publicSpeaking812 } from "./public-speaking-8-12";
import { artDesign35 } from "./art-design-3-5";
import { artDesign58 } from "./art-design-5-8";
import { artDesign812 } from "./art-design-8-12";
import { robotics58 } from "./robotics-5-8";
import { robotics812 } from "./robotics-8-12";

// Registry of all 8 programmes for the homepage cards.
// Ordered: all art first (youngest → oldest), then language/speaking (youngest → oldest), then robotics (youngest → oldest).

export const curriculumProgrammes: CurriculumProgramme[] = [
  // ── Art & Design ──
  artDesign35,
  artDesign58,
  artDesign812,

  // ── Language & Public Speaking ──
  {
    id: "language-storytelling-3-5",
    slug: "language-storytelling-3-5",
    title: "language through storytelling",
    category: "language",
    ageGroup: "3-5",
    ageLabel: "ages 3–5",
    heroImageUrl: "/prog-language-3-5.gif",
    tagline: "a pre-reading and pre-writing programme to learn English through play and story.",
    description:
      "children build vocabulary, phonemic awareness, and early literacy through immersive storytelling, dramatic play, and hands-on language games. every session is a story. every story is a door.",
    totalSessions: 0,
    skillAreas: [],
    segmentDefinitions: [],
    sessionTable: [],
    activities: {},
    checkpoints: [],
  },
  publicSpeaking58,
  publicSpeaking812,

  // ── Robotics ──
  robotics58,
  robotics812,
];
