import type { CurriculumProgramme } from "@/content/types";
import { publicSpeaking58 } from "./public-speaking-5-8";
import { publicSpeaking812 } from "./public-speaking-8-12";
import { artDesign35 } from "./art-design-3-5";
import { artDesign58 } from "./art-design-5-8";
import { artDesign812 } from "./art-design-8-12";
import { robotics58 } from "./robotics-5-8";
import { robotics812 } from "./robotics-8-12";
import {
  roboticsElectronics58,
  roboticsElectronics812,
} from "./robotics-electronics";
import { languageStorytelling35 } from "./language-storytelling-3-5";
import { stem35 } from "./stem-3-5";
import { musicL1, musicL2, musicL3, musicL4 } from "./music-levels";

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
  // Robotics runs as a track: level 1 (mechanics) then level 2
  // (electronics). Only level 1 shows on the home grid — level 2 is
  // reached from inside the programme, via the level switcher.
  stem35,
  robotics58,
  roboticsElectronics58,
  robotics812,
  roboticsElectronics812,

  // ── Music ──
  // Level-based track (music-l1/l2/l3, ages 5–12, ability-gated). Only
  // level 1 shows on the home grid; levels 2–3 via the level switcher.
  musicL1,
  musicL2,
  musicL3,
  musicL4,
];
