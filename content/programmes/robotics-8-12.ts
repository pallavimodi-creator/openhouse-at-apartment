import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
} from "@/content/types";
import { ROBOTICS_TRIAL_SESSION_8_12 } from "./robotics-trial";

// ─── Experiment activities — L1 + L2 Levers, L1 + L2 Pulleys ─

const experimentActivities: Record<string, CurriculumActivity> = {
  "l1-levers-e1": {
    id: "l1-levers-e1",
    segment: "experiment",
    title: "l1 levers e1 — longer arm, less effort (qualitative)",
    cardName: "L1 Levers e1",
    setupLine:
      "same load, three lever lengths. how does effort change as the arm grows?",
    howToPlay:
      "Hang 1kg at the load end. Pull spring scale at the effort end. Take readings for 20cm, 30cm, 40cm arms. Each child takes at least one reading independently. Record every reading. Pair with L2 e1 within the same session — heavier weights, calculate the exact reduction.",
    materials: [
      "Experiment Card: L1 Levers e1",
      "PVC pipes 20/30/40cm · T-connector · spring scale 2kg · 1kg weight · plastic cup · measuring tape",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child sets up and records every reading." },
      { level: "Medium", description: "Child reads the card, predicts a direction before each reading, checks." },
      { level: "Hard", description: "Child predicts the ratio of the three readings before testing — \"I expect the 40cm to be about half the 20cm\" — and checks." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l2-levers-e1": {
    id: "l2-levers-e1",
    segment: "experiment",
    title: "l2 levers e1 — calculate the reduction",
    cardName: "L2 Levers e1",
    setupLine:
      "same concept, heavier weights. if the arm doubles, does the effort actually halve?",
    howToPlay:
      "Repeat the lever setup at 20cm, 30cm, 40cm with 2kg load. Fulcrum sits at one-third of lever length from the load end. Read the spring scale at each arm length. Calculate the ratio reading-to-reading. Does doubling the arm length halve the effort reading? Record each calculation in the result table.",
    materials: [
      "Experiment Card: L2 Levers e1",
      "PVC pipes · T-connector · spring scale 3kg · 2kg weight · measuring tape · calculator (allowed)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child takes readings. Teacher helps with the arithmetic." },
      { level: "Medium", description: "Child measures and calculates the ratio for each pair of readings." },
      { level: "Hard", description: "Child predicts the 40cm reading from the 20cm reading using the ratio rule before measuring. Records the error." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l1-levers-e2": {
    id: "l1-levers-e2",
    segment: "experiment",
    title: "l1 levers e2 — heavier load, more effort",
    cardName: "L1 Levers e2",
    setupLine:
      "same arm length. change the load. how does effort change?",
    howToPlay:
      "Fix the 30cm arm. Take readings at 0.5kg, 1kg, 2kg. Pair with L2 e2 within the same session — calculate whether the increase is proportional.",
    materials: ["Experiment Card: L1 Levers e2", "PVC pipe 30cm · fulcrum · spring scale · 0.5/1/2kg weights"],
    difficultyLevels: [
      { level: "Easy", description: "Child records every reading." },
      { level: "Medium", description: "Child predicts a direction and checks." },
      { level: "Hard", description: "Child predicts the exact reading using doubling — \"if 0.5kg reads X, 1kg should read 2X.\"" },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l2-levers-e2": {
    id: "l2-levers-e2",
    segment: "experiment",
    title: "l2 levers e2 — is the increase proportional?",
    cardName: "L2 Levers e2",
    setupLine:
      "heavier weights. is load-to-effort a straight-line relationship?",
    howToPlay:
      "Same arm as L1 e2. Add 1kg, 2kg, 3kg, 4kg loads (use 2kg weights available). Take readings. Plot or tabulate load vs effort. Is the relationship proportional — does effort double when load doubles? Calculate the ratio row-by-row.",
    materials: ["Experiment Card: L2 Levers e2", "PVC pipe · fulcrum · spring scale 3kg · 2kg weights (×2) · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Record readings. Teacher calculates ratios." },
      { level: "Medium", description: "Child measures and calculates each ratio." },
      { level: "Hard", description: "Child predicts the full table from the first reading using proportional reasoning." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l1-levers-e3": {
    id: "l1-levers-e3",
    segment: "experiment",
    title: "l1 levers e3 — equal weights balance",
    cardName: "L1 Levers e3",
    setupLine:
      "two equal weights on an evenly-placed fulcrum. does it balance?",
    howToPlay:
      "Fulcrum at centre of 30cm lever. 0.5kg on each side — balance. 1kg on each side — balance. Record.",
    materials: ["Experiment Card: L1 Levers e3", "PVC pipe 30cm · fulcrum · two 0.5kg + two 1kg weights · two cups"],
    difficultyLevels: [
      { level: "Easy", description: "Child hangs weights and observes balance." },
      { level: "Medium", description: "Child sets up and writes the rule in their own words." },
      { level: "Hard", description: "Child explains why balance happens using the concept of equal torque (age-appropriate language)." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l2-levers-e3": {
    id: "l2-levers-e3",
    segment: "experiment",
    title: "l2 levers e3 — calculate the balance point",
    cardName: "L2 Levers e3",
    setupLine:
      "unequal weights. can you calculate where the fulcrum must sit?",
    howToPlay:
      "Hang 1kg on left at fixed distance. Hang 2kg on right — where must the fulcrum sit for the lever to balance? Calculate before testing using weight × distance on each side. Test. Record prediction and measured position.",
    materials: ["Experiment Card: L2 Levers e3", "PVC pipe 40cm · fulcrum · 1kg + 2kg weights · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher shows the calculation. Child places fulcrum and checks." },
      { level: "Medium", description: "Child does the calculation and tests." },
      { level: "Hard", description: "Child solves for three different weight pairs and records predicted vs actual for each." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l1-levers-e4": {
    id: "l1-levers-e4",
    segment: "experiment",
    title: "l1 levers e4 — any equal weight balances",
    cardName: "L1 Levers e4",
    setupLine:
      "shape and size do not matter — only the weight.",
    howToPlay:
      "0.5kg weight on one side. Try objects of similar weight on the other — a filled bottle, a book, a bag of rice. Which balances? Record.",
    materials: ["Experiment Card: L1 Levers e4", "PVC pipe 30cm · fulcrum · cups · 0.5kg weight · 3–4 everyday objects of roughly equal weight"],
    difficultyLevels: [
      { level: "Easy", description: "Child tests each object, records result." },
      { level: "Medium", description: "Child predicts before testing, explains why shape does not matter." },
      { level: "Hard", description: "Child weighs each object on a real scale first, then predicts using the balance rule." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l2-levers-e4": {
    id: "l2-levers-e4",
    segment: "experiment",
    title: "l2 levers e4 — calculate an unknown weight",
    cardName: "L2 Levers e4",
    setupLine:
      "use the lever to measure a weight you do not know.",
    howToPlay:
      "Hang a known weight (1kg) at a fixed distance on one side. Hang the unknown object on the other side. Move the fulcrum until the lever balances. Measure the two distances. Calculate the unknown weight using the ratio of arm lengths: unknown = known × (known-arm ÷ unknown-arm). Verify on a real scale. Record the error.",
    materials: ["Experiment Card: L2 Levers e4", "PVC pipe 40cm · fulcrum · 1kg weight · measuring tape · 2–3 unknown objects · calculator · real scale for verification"],
    difficultyLevels: [
      { level: "Easy", description: "Child balances and measures distances. Teacher helps with the calculation." },
      { level: "Medium", description: "Child does the calculation independently and checks against a real scale." },
      { level: "Hard", description: "Child predicts the unknown weight before balancing using a rough estimate, then refines using the measurement." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l2-levers-e5": {
    id: "l2-levers-e5",
    segment: "experiment",
    title: "l2 levers e5 — unequal weights, move the fulcrum",
    cardName: "L2 Levers e5",
    setupLine:
      "1kg on one side, 0.5kg on the other. calculate how far to move the fulcrum.",
    howToPlay:
      "Use the balance equation to calculate the fulcrum position. Mark the predicted position. Test. How close was the prediction? Repeat with a second weight pair.",
    materials: ["Experiment Card: L2 Levers e5", "PVC pipe 40cm · fulcrum · 0.5kg + 1kg weights · cups · measuring tape · masking tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Child follows the calculation steps guided by teacher." },
      { level: "Medium", description: "Child solves independently." },
      { level: "Hard", description: "Child solves for three weight pairs and records prediction error for each." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l2-levers-e6": {
    id: "l2-levers-e6",
    segment: "experiment",
    title: "l2 levers e6 — fulcrum near load, dramatic effort drop",
    cardName: "L2 Levers e6",
    setupLine:
      "fulcrum at 5cm from the load end. how much less effort?",
    howToPlay:
      "Place fulcrum at exactly 5cm from the load end on a 40cm lever. Hang 1kg at the load end. Read the spring scale. Calculate the expected reduction using the balance equation. Compare to the actual reading. Discuss class-of-lever (this is a second-class lever — bottle opener, wheelbarrow).",
    materials: ["Experiment Card: L2 Levers e6", "PVC pipe 40cm · fulcrum · 1kg weight · spring scale · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher sets fulcrum. Child reads and names the everyday machine this matches." },
      { level: "Medium", description: "Child sets fulcrum, reads, calculates expected value." },
      { level: "Hard", description: "Child compares to L1 e2 reading and explains the principle of mechanical advantage." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers.pdf",
  },
  "l1-pulleys-e1": {
    id: "l1-pulleys-e1",
    segment: "experiment",
    title: "l1 pulleys e1 — heavier load, more effort through a pulley",
    cardName: "L1 Pulleys e1",
    setupLine:
      "a single fixed pulley — how does effort scale with load?",
    howToPlay:
      "Thread rope over a tabletop-clamped pulley. Hang 0.5kg, 1kg, 2kg in turn. Read the spring scale for each. Is the relationship proportional? Record and check.",
    materials: ["Experiment Card: L1 Pulleys e1", "Pulley + clamp · rope · spring scale · 0.5/1/2kg weights · cup"],
    difficultyLevels: [
      { level: "Easy", description: "Child lifts slowly, takes readings." },
      { level: "Medium", description: "Child takes readings and checks proportionality." },
      { level: "Hard", description: "Child predicts the 2kg reading from the 0.5kg reading before testing." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
  "l1-pulleys-e2": {
    id: "l1-pulleys-e2",
    segment: "experiment",
    title: "l1 pulleys e2 — pulley changes direction",
    cardName: "L1 Pulleys e2",
    setupLine:
      "lift without the pulley. lift with the pulley. direction of pull changes — does effort?",
    howToPlay:
      "Read the spring scale lifting 1kg straight up by hand. Then lift 1kg through a fixed pulley, pulling down. Compare readings. They should be equal — a fixed pulley changes direction, not effort.",
    materials: ["Experiment Card: L1 Pulleys e2", "Pulley · rope · spring scale · 1kg · cup"],
    difficultyLevels: [
      { level: "Easy", description: "Child measures both scenarios." },
      { level: "Medium", description: "Child predicts whether the readings will match before measuring." },
      { level: "Hard", description: "Child explains why they match — the rope carries the same tension on both sides." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
  "l1-pulleys-e3": {
    id: "l1-pulleys-e3",
    segment: "experiment",
    title: "l1 pulleys e3 — pulley height does not change effort",
    cardName: "L1 Pulleys e3",
    setupLine:
      "raise the pulley. does the spring scale read a different number?",
    howToPlay:
      "Take reading with pulley at low position. Raise pulley. Take reading again with same 1kg load. They match. Raising the pulley changes the rope length pulled, not the force.",
    materials: ["Experiment Card: L1 Pulleys e3", "Pulley · rope · spring scale · 1kg · riser"],
    difficultyLevels: [
      { level: "Easy", description: "Child reads in both positions." },
      { level: "Medium", description: "Child predicts whether the reading will change." },
      { level: "Hard", description: "Child explains why height does not change effort using tension." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
  "l1-pulleys-e4": {
    id: "l1-pulleys-e4",
    segment: "experiment",
    title: "l1 pulleys e4 — pull direction changes comfort, not effort",
    cardName: "L1 Pulleys e4",
    setupLine:
      "pull straight down. pull at 45°. same reading?",
    howToPlay:
      "Record reading pulling straight down. Record reading pulling at an angle. Match — effort reading is the same. Comfort is different.",
    materials: ["Experiment Card: L1 Pulleys e4", "Pulley · rope · spring scale · 1kg · cup"],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in two directions, records." },
      { level: "Medium", description: "Child tries three angles and records all readings." },
      { level: "Hard", description: "Child explains why only comfort changes — the weight is constant, so the tension must be too." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
  "l2-pulleys-e4": {
    id: "l2-pulleys-e4",
    segment: "experiment",
    title: "l2 pulleys e4 — compound pulley, calculate effort reduction",
    cardName: "L2 Pulleys e4",
    setupLine:
      "two pulleys in a compound system. calculate the mechanical advantage.",
    howToPlay:
      "Set up a compound pulley using two pulleys — one fixed to the mount, one free on the load. Thread rope through both. Lift 2kg. Measure the effort reading and the rope distance pulled. Calculate mechanical advantage (load ÷ effort) and verify it matches the rope-ratio (distance pulled ÷ distance lifted).",
    materials: ["Experiment Card: L2 Pulleys e4", "Two pulleys · mount · rope 2m · spring scale · 2kg · cup · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher sets up. Child reads and calculates with support." },
      { level: "Medium", description: "Child sets up and calculates the ratio." },
      { level: "Hard", description: "Child predicts the mechanical advantage from the pulley count before measuring." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley.pdf",
  },
  "l2-pulleys-e5": {
    id: "l2-pulleys-e5",
    segment: "experiment",
    title: "l2 pulleys e5 — multi-pulley mechanical advantage",
    cardName: "L2 Pulleys e5",
    setupLine:
      "more pulleys = less effort. but rope distance goes up. how far does it go?",
    howToPlay:
      "Extend the compound setup to three or four pulley points using available pulleys and couplers. Lift 2kg. Record effort, record rope distance pulled to lift the load 10cm. Calculate mechanical advantage both ways. Discuss: the trade-off is real — less effort, more rope.",
    materials: ["Experiment Card: L2 Pulleys e5", "All pulleys available · mount · 2m+ rope · spring scale · 2kg · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Child follows teacher's setup, reads, calculates with support." },
      { level: "Medium", description: "Child sets up and calculates mechanical advantage." },
      { level: "Hard", description: "Child predicts the ratio from the number of rope segments and checks against measurement." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley.pdf",
  },
};

// ─── Build activities — 4 days per model ────────────────────

const buildActivities: Record<string, CurriculumActivity> = {
  "build-see-saw": {
    id: "build-see-saw",
    segment: "build",
    title: "see-saw build",
    setupLine:
      "each child builds their own see-saw from a personal kit. six sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever — a beam on a central fulcrum. Intuitive entry into lever concepts. Day 1 Explore: read the full Model Manual, identify and name every component, lay them out in manual order, begin first build stage. Days 2–3 Make: open manual to where you left off, build, teacher uses only four questions. Day 4 Complete and Test: finish, run the full test sequence, record best result with actual measurement. Day 5 Improve: state what you expect to change before touching anything, make one deliberate change, test, record before-and-after. Day 6 Disassemble: sort back from memory — no tray map. Teacher names each component as it goes back.",
    materials: [
      "Personal See-saw kit per child",
      "Model Manual — See Saw.pdf (1 per child)",
      "Child-sized spanner",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads the manual and builds with teacher check per step." },
      { level: "Medium", description: "Child reads and builds independently, tests build-as-you-go." },
      { level: "Hard", description: "Child anticipates the function of each sub-assembly before building, predicts failure modes." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/see-saw.pdf",
  },
  "build-weighing-scale": {
    id: "build-weighing-scale",
    segment: "build",
    title: "weighing scale build",
    setupLine:
      "same cycle, more complex lever. two pan arms that must balance perfectly.",
    howToPlay:
      "Complex two-pan lever. Every lever experiment directly explains what the build is doing. Same 6-day cycle: Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test · Day 5 Improve · Day 6 Disassemble (from memory).",
    materials: [
      "Weighing Scale kit additions per child (distributed at Day 1)",
      "Model Manual — Weighing Scale.pdf",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds with teacher checks." },
      { level: "Medium", description: "Child builds independently and checks connections as they go." },
      { level: "Hard", description: "Child anticipates each sub-assembly's function and predicts issues before they occur." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/weighing-scale.pdf",
  },
  "build-crane": {
    id: "build-crane",
    segment: "build",
    title: "crane build",
    setupLine:
      "pulley model. the crane lifts a load through a rope and pulley system.",
    howToPlay:
      "Crane uses a pulley system. Same 6-day cycle: Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test · Day 5 Improve · Day 6 Disassemble (from memory).",
    materials: [
      "Crane kit additions per child (distributed at Day 1)",
      "Model Manual — Crane.pdf",
      "Pulleys, rope, couplers (in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds with teacher check per step." },
      { level: "Medium", description: "Child builds independently, tests each subsystem." },
      { level: "Hard", description: "Child proposes the Improve-day change before Day 4, states expected effect, tests, measures." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/crane.pdf",
  },
};

// ─── Experience book ────────────────────────────────────────

const experienceBookActivity: CurriculumActivity = {
  id: "rob-experience-book",
  segment: "experience-book",
  title: "experience book",
  setupLine:
    "ten minutes. circle the ability seen clearly today for each skill. one specific note per child. goes home every day.",
  howToPlay:
    "Teacher fills four things per child: experiment name, build day, three ability rows (B&M, PS, O&U — one circled per row), and one specific note (\"worth remembering\"). At 8–12 the most valuable notes capture reasoning. The book also carries the Ability Reference and six monthly Robotics Journey letters. Always conduct a 3-move closing debrief: name what you saw · name the next step · one concept question.",
  materials: [
    "My Robotics Experience Book (ages 8–12) — per child, hardbound",
    "Ability Reference card (inside cover)",
    "Tray map (reference inside back cover)",
  ],
  debriefPrompts: [],
  type: "facilitated",
};

// ─── Skills — 3 skills, 4 named abilities each, one North Star per skill ─

const skillAreas: CurriculumSkillArea[] = [
  {
    id: "bm",
    name: "building & making",
    shortName: "B&M",
    abilities: [
      { name: "Fit", description: "connects parts deliberately — checks that each connection is secure and functional before moving on" },
      { name: "Follow", description: "builds in the correct sequence using the step card — and notices when a step has not produced the expected result" },
      { name: "Adjust", description: "identifies the specific connection or component that is not working and corrects it within the given design" },
      { name: "Improve", description: "makes a deliberate change to improve performance — states what they expect to change before testing, then records the before and after", isNorthStar: true },
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      { name: "Notice", description: "recognises that the model is not working and names specifically what it should be doing but is not" },
      { name: "Try", description: "attempts a genuinely different approach — does not repeat what already failed" },
      { name: "Change", description: "identifies the specific part that is failing, explains what it is failing to do, and tries a new approach that goes beyond the given steps" },
      { name: "Persist", description: "sets a measurable goal for the model's performance and keeps adjusting until that goal is reached", isNorthStar: true },
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      { name: "Observe", description: "names one specific thing that changed — what moved, shifted, or read differently — without being prompted" },
      { name: "Measure", description: "takes measurements accurately and records every reading correctly, including units, with no gaps in the result table" },
      { name: "Predict", description: "states a specific prediction before testing — includes a value or a reason connected to what was found in a prior session, not just a direction" },
      { name: "Explain", description: "explains what caused the result — names the specific cause and connects it to what the data shows", isNorthStar: true },
    ],
  },
];

// ─── Segments ───────────────────────────────────────────────

const segmentDefinitions: CurriculumSegmentDef[] = [
  {
    id: "experiment",
    name: "experiment",
    durationRange: "40 min",
    objective:
      "groups of 2–4. every child takes at least one measurement independently. teacher asks one question per group. at 8–12, L1 and L2 cards pair within the same session — L1 first (qualitative), L2 next (calculate). tool orientation is embedded for any new child in the first 3–4 experiment segments.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "5-minute engage question opens the segment — one question, 3–4 answers, connect to today's build. then each child builds their own model from a personal kit. the teacher never fixes and never tells. four questions only.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "experience-book",
    name: "experience book",
    durationRange: "10 min",
    objective:
      "circle the ability seen clearly today for each of the three skills. specific notes that capture reasoning. three-move closing debrief.",
    type: "fixed",
  },
];

// ─── Session table — 12 sessions ────────────────────────────

const DAY_LABELS_8_12: Record<number, string> = {
  1: "Day 1 — Explore",
  2: "Day 2 — Make",
  3: "Day 3 — Make",
  4: "Day 4 — Complete and Test",
  5: "Day 5 — Improve",
  6: "Day 6 — Disassemble",
};

/**
 * 8-12 uses a "primary experiment" field — the L1 card the session opens
 * with. The paired L2 card runs within the same 40-minute segment but is
 * not modelled in the session table today (activities fire one at a time
 * in DayPlan). Teachers see the pairing through the experiment-card popup's
 * how-to-play copy which names the L2 pair explicitly.
 */
function s(
  sessionNumber: number,
  experiment: string,
  buildModel: string,
  buildId: string,
  buildDay: number,
  engageQuestion: string,
  conceptQuestion: string
): CurriculumSessionEntry {
  return {
    sessionNumber,
    experiment,
    build: buildId,
    experienceBook: "rob-experience-book",
    buildModel,
    buildDay,
    buildDayLabel: DAY_LABELS_8_12[buildDay],
    topicLayer: 1,
    engageQuestion,
    conceptQuestion,
  };
}

const sessionTable: CurriculumSessionEntry[] = [
  // ─── Trial session (day 0) — Crane preview ─────────────────
  s(0, "l1-pulleys-e1", "Crane", "build-crane", 1,
    "Today we're going to build a real crane model. You'll use parts to make something that actually works. It may not work the first time — that's expected. You'll figure out what to change and improve it. By the end, you'll understand how cranes work in real life.",
    "Where do you see cranes in real life — and which part of your crane is doing the main job?"),
  // ─── See-saw build · L1 + L2 levers paired ─ Sessions 1–6 ──
  s(1, "l1-levers-e1", "See-saw", "build-see-saw", 1,
    "A see-saw is one of the oldest machines in the world. But it is also one of the most precisely engineered things on a playground. What makes a see-saw actually balance — not tip — when two people of different weights sit on it?",
    "What does a lever do that makes lifting easier — in one sentence?"),
  s(2, "l2-levers-e1", "See-saw", "build-see-saw", 2,
    "If arm length halves the effort in one experiment — does it halve it again if we halve the arm again? Or does the relationship change as you push further?",
    "When arm length doubles, what happens to effort? Can you calculate it?"),
  s(3, "l1-levers-e2", "See-saw", "build-see-saw", 3,
    "Architects designing a cantilever bridge — a bridge that extends out with no support underneath — use the same principle as a see-saw. How do you think they calculate where to put the counterweight?",
    "How does the load-to-effort relationship change across our readings?"),
  s(4, "l2-levers-e2", "See-saw", "build-see-saw", 4,
    "Is the increase in effort proportional to the load? Exactly double load = exactly double effort — or not quite? What does the data say?",
    "Is the load-to-effort increase proportional? What does the calculation show?"),
  s(5, "l1-levers-e3", "See-saw", "build-see-saw", 5,
    "Your see-saw balances when weights are equal. What one change could you make to make it balance better or more accurately? Name the change and the measurable improvement you expect.",
    "When does a lever balance perfectly? What exact condition has to be true?"),
  s(6, "l2-levers-e3", "See-saw", "build-see-saw", 6,
    "Before we disassemble — if you were designing a better see-saw, what would you change about the structure to make it more precise? Name one specific improvement and what you would expect it to do.",
    "Can you calculate the exact balance point for two different weights?"),
  // ─── Weighing Scale build · L2 levers + repeats ─ Sessions 7–12
  s(7, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 1,
    "Before digital scales existed, jewellers weighed gold using a balance lever accurate to a fraction of a gram. What aspect of the design had to be perfect for that accuracy?",
    "How can any equal-weight object tell you when a lever is balanced?"),
  s(8, "l2-levers-e4", "Weighing Scale", "build-weighing-scale", 2,
    "A balance scale and a see-saw use the same mechanical principle. But a weighing scale is used to measure — it needs to give a number. What has to be true about the design for it to give you a reliable number every time?",
    "Can you calculate an unknown weight using the ratio of arm lengths?"),
  s(9, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 3,
    "A wheelbarrow carries a heavy load near the wheel — close to the fulcrum. The handles extend far back. Why is it designed that way? What would happen if the load were at the back?",
    "How does moving the fulcrum change the required effort — can you calculate where to place it?"),
  s(10, "l2-levers-e6", "Weighing Scale", "build-weighing-scale", 4,
    "A bottle opener, a nutcracker, a pair of pliers — all levers. But they work differently from a see-saw. The fulcrum is at the end, not the middle. Why does that change everything?",
    "Why does a fulcrum near the load dramatically reduce effort — and by how much?"),
  s(11, "l2-levers-e3", "Weighing Scale", "build-weighing-scale", 5,
    "Your Weighing Scale is complete. What is the one part that makes the biggest difference to accuracy — and how would you verify that before your next session?",
    "Can you use your weighing scale arm to calculate an exact balance point?"),
  s(12, "l2-levers-e4", "Weighing Scale", "build-weighing-scale", 6,
    "If you were manufacturing this Weighing Scale for real — to be sold in a market — what would you change about the design to make it more robust, more accurate, or easier to use? Name one change and the expected result.",
    "Can your weighing scale find the weight of something unknown — accurately?"),
  // ─── Crane build · Pulley experiments ─ Sessions 13–18 ─────
  s(13, "l1-pulleys-e1", "Crane", "build-crane", 1,
    "The Sky Crane — the system NASA used to lower the Curiosity rover onto Mars — was a hovering rocket with a pulley and cable system that lowered the rover slowly. Why would engineers design something that complex instead of just dropping the rover with a parachute?",
    "What happens to effort when the load gets heavier through a single pulley — is it proportional?"),
  s(14, "l1-pulleys-e2", "Crane", "build-crane", 2,
    "When you raise a flag on a flagpole — you pull the rope down and the flag goes up. You are pulling the wrong direction. How does that work? What does the pulley actually change?",
    "What does a fixed pulley change — direction or mechanical advantage?"),
  s(15, "l1-pulleys-e3", "Crane", "build-crane", 3,
    "Your crane has a pulley — the small wheel with a groove for the rope. What do you think that pulley is doing that the crane couldn't do without it?",
    "Does pulley height change the effort reading — yes or no, and why?"),
  s(16, "l1-pulleys-e4", "Crane", "build-crane", 4,
    "On a construction site, a crane lifts a steel beam that weighs several tons. The operator does not exert several tons of force. The pulley system multiplies what they can do. If you added a second pulley — what do you predict would happen to the effort needed?",
    "Does pull direction change the effort reading — or only the comfort?"),
  s(17, "l2-pulleys-e4", "Crane", "build-crane", 5,
    "Your crane is complete. Before you test it — what is the maximum load you predict it will lift? If you had to improve the lifting capacity without rebuilding the whole model, what would you change first?",
    "Can you calculate the exact effort reduction from a compound pulley system?"),
  s(18, "l2-pulleys-e5", "Crane", "build-crane", 6,
    "Engineers who designed the cranes that built the Burj Khalifa had to solve one problem: as the building gets taller, the crane has to climb the building itself. What mechanical principle would you use to design a crane that can lift itself?",
    "What is the mechanical advantage of a multi-pulley system — and how does rope distance relate to effort?"),
];

// Monthly checkpoints — after 8 and 16
sessionTable.forEach((entry) => {
  if ([8, 16].includes(entry.sessionNumber)) entry.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      { skillArea: "B&M", beginning: "connects parts with teacher checks (Fit)", developing: "follows the card and notices when a step has not produced the expected result (Follow)", secure: "identifies the specific component that failed and fixes it without being told which part (Adjust)" },
      { skillArea: "PS", beginning: "names general failure", developing: "tries genuinely different approaches (Try)", secure: "names the specific part causing the failure and explains what it is failing to do (Change)" },
      { skillArea: "O&U", beginning: "records readings with gaps", developing: "records every reading correctly including units (Measure)", secure: "writes a specific prediction before testing — a value or a reason connected to prior data (Predict)" },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      { skillArea: "B&M", beginning: "adjusts within the design (Adjust)", developing: "makes a deliberate improvement and records before/after", secure: "states what they expect to change before testing, then verifies the result (Improve ★)" },
      { skillArea: "PS", beginning: "identifies the specific failing part (Change)", developing: "tries new approaches that go beyond the given steps", secure: "sets a measurable goal and keeps adjusting until the model reaches it (Persist ★)" },
      { skillArea: "O&U", beginning: "predicts a direction", developing: "predicts with a value or a reason (Predict)", secure: "explains what caused the result — names the cause and connects it to what the data shows (Explain ★)" },
    ],
  },
];

// ─── Programme ──────────────────────────────────────────────

export const robotics812: CurriculumProgramme = {
  id: "robotics-8-12",
  slug: "robotics-8-12",
  title: "robotics",
  category: "stem",
  heroImageUrl: "/prog-stem-8-12.gif",
  ageGroup: "8-12",
  ageLabel: "ages 8–12",
  tagline:
    "design, build, and explain systems with knowledge and precision.",
  description:
    "level 1 — mechanics. same three models as 5–8 but each build is six days and every experiment runs L1 and L2 on consecutive sessions — qualitative first, quantitative next. children finish the year able to calculate mechanical advantage, predict before testing, and explain causally after.",
  totalSessions: 18,
  skillAreas,
  segmentDefinitions,
  sessionTable,
  activities: {
    ...experimentActivities,
    ...buildActivities,
    "rob-experience-book": experienceBookActivity,
  },
  checkpoints,
  trialSession: ROBOTICS_TRIAL_SESSION_8_12,
};
