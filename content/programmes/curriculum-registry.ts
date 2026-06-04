import type { CurriculumProgramme } from "@/content/types";
import { publicSpeaking58 } from "./public-speaking-5-8";
import { publicSpeaking812 } from "./public-speaking-8-12";
import { artDesign35 } from "./art-design-3-5";
import { artDesign58 } from "./art-design-5-8";
import { artDesign812 } from "./art-design-8-12";
import { robotics58 } from "./robotics-5-8";
import { robotics812 } from "./robotics-8-12";
import { languageStorytelling35 } from "./language-storytelling-3-5";
import { stem35 } from "./stem-3-5";

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
  stem35,
  robotics58,
  robotics812,
];
