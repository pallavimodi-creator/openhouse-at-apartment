import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
} from "@/content/types";

const COMMON_DEBRIEF = [
  {
    notice: "which children wrote a specific prediction before touching anything — a number or a reason, not just a direction.",
    name: "that is the shift we want at 8–12 — prediction with reasoning.",
    connect:
      "ask the child: how close was your prediction? if you were off — what does the gap tell you about what you thought was true?",
  },
];

// ─── Experiment activities (16 cards) ───────────────────────

const experimentActivities: Record<string, CurriculumActivity> = {
  "l1-levers-e1": {
    id: "l1-levers-e1",
    segment: "experiment",
    title: "l1 levers e1 — longer arm, less effort (qualitative)",
    cardName: "L1 Levers e1",
    setupLine:
      "same load, three lever lengths. how does effort change as the arm grows?",
    howToPlay:
      "Hang 1kg at the load end. Pull spring scale at the effort end. Take readings for 20cm, 30cm, 40cm arms. Each child takes at least one reading independently. Record every reading. Pair with L2 e1 next session — same concept, heavier weights, calculate the exact reduction.",
    materials: [
      "Experiment Card: L1 Levers e1",
      "PVC pipes 20/30/40cm · T-connector · spring scale 2kg · 1kg weight · plastic cup · measuring tape",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child sets up and records every reading." },
      { level: "Medium", description: "Child reads the card, predicts a direction before each reading, checks." },
      { level: "Hard", description: "Child predicts the ratio of the three readings before testing — \"I expect the 40cm to be about half the 20cm\" — and checks." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l2-levers-e1": {
    id: "l2-levers-e1",
    segment: "experiment",
    title: "l2 levers e1 — calculate the reduction",
    cardName: "L2 Levers e1",
    setupLine:
      "same concept, heavier weights. if the arm doubles, does the effort actually halve?",
    howToPlay:
      "Repeat the lever setup at 20cm, 30cm, 40cm with 2kg load. Fulcrum sits at one-third of lever length from the load end (not the centre — correction). Read the spring scale at each arm length. Calculate the ratio reading-to-reading. Does doubling the arm length halve the effort reading? Record each calculation in the result table.",
    materials: [
      "Experiment Card: L2 Levers e1 (fulcrum position specified as 1/3 from load end)",
      "PVC pipes · T-connector · spring scale 3kg · 2kg weight · measuring tape · calculator (allowed)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child takes readings. Teacher helps with the arithmetic." },
      { level: "Medium", description: "Child measures and calculates the ratio for each pair of readings." },
      { level: "Hard", description: "Child predicts the 40cm reading from the 20cm reading using the ratio rule before measuring. Records the error." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-levers-e2": {
    id: "l1-levers-e2",
    segment: "experiment",
    title: "l1 levers e2 — heavier load, more effort",
    cardName: "L1 Levers e2",
    setupLine:
      "same arm length. change the load. how does effort change?",
    howToPlay:
      "Fix the 30cm arm. Take readings at 0.5kg, 1kg, 2kg. Pair with L2 e2 next session — calculate whether the increase is proportional.",
    materials: ["Experiment Card: L1 Levers e2", "PVC pipe 30cm · fulcrum · spring scale · 0.5/1/2kg weights"],
    difficultyLevels: [
      { level: "Easy", description: "Child records every reading." },
      { level: "Medium", description: "Child predicts a direction and checks." },
      { level: "Hard", description: "Child predicts the exact reading using doubling — \"if 0.5kg reads X, 1kg should read 2X.\"" },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    materials: ["Experiment Card: L2 Levers e3 (result column for fulcrum position)", "PVC pipe 40cm · fulcrum · 1kg + 2kg weights · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher shows the calculation. Child places fulcrum and checks." },
      { level: "Medium", description: "Child does the calculation and tests." },
      { level: "Hard", description: "Child solves for three different weight pairs and records predicted vs actual for each." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    materials: ["Experiment Card: L2 Levers e5 (includes column for fulcrum position from left end)", "PVC pipe 40cm · fulcrum · 0.5kg + 1kg weights · cups · measuring tape · masking tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Child follows the calculation steps guided by teacher." },
      { level: "Medium", description: "Child solves independently." },
      { level: "Hard", description: "Child solves for three weight pairs and records prediction error for each." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l2-levers-e6": {
    id: "l2-levers-e6",
    segment: "experiment",
    title: "l2 levers e6 — fulcrum near load, dramatic effort drop",
    cardName: "L2 Levers e6",
    setupLine:
      "fulcrum at 5cm from the load end. how much less effort?",
    howToPlay:
      "Place fulcrum at exactly 5cm from the load end (specified correction) on a 40cm lever. Hang 1kg at the load end. Read the spring scale. Calculate the expected reduction using the balance equation. Compare to the actual reading. Discuss class-of-lever (this is a second-class lever — bottle opener, wheelbarrow).",
    materials: ["Experiment Card: L2 Levers e6 (fulcrum at 5cm from load end for all lever lengths)", "PVC pipe 40cm · fulcrum · 1kg weight · spring scale · measuring tape · calculator"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher sets fulcrum. Child reads and names the everyday machine this matches." },
      { level: "Medium", description: "Child sets fulcrum, reads, calculates expected value." },
      { level: "Hard", description: "Child compares to L1 e2 reading and explains the principle of mechanical advantage." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-pulleys-e2": {
    id: "l1-pulleys-e2",
    segment: "experiment",
    title: "l1 pulleys e2 — pulley changes direction",
    cardName: "L1 Pulleys e2",
    setupLine:
      "lift without the pulley. lift with the pulley. direction of pull changes — does effort?",
    howToPlay:
      "Read the spring scale lifting 1kg straight up by hand. Then lift 1kg through a fixed pulley, pulling down. Compare readings. They should be equal — a fixed pulley changes direction, not effort. Record.",
    materials: ["Experiment Card: L1 Pulleys e2", "Pulley · rope · spring scale · 1kg · cup"],
    difficultyLevels: [
      { level: "Easy", description: "Child measures both scenarios." },
      { level: "Medium", description: "Child predicts whether the readings will match before measuring." },
      { level: "Hard", description: "Child explains why they match — the rope carries the same tension on both sides." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-pulleys-e3": {
    id: "l1-pulleys-e3",
    segment: "experiment",
    title: "l1 pulleys e3 — pulley height does not change effort",
    cardName: "L1 Pulleys e3",
    setupLine:
      "raise the pulley. does the spring scale read a different number?",
    howToPlay:
      "Take reading with pulley at low position. Raise pulley (use a riser). Take reading again with same 1kg load. They match. Raising the pulley changes the rope length pulled, not the force.",
    materials: ["Experiment Card: L1 Pulleys e3", "Pulley · rope · spring scale · 1kg · riser"],
    difficultyLevels: [
      { level: "Easy", description: "Child reads in both positions." },
      { level: "Medium", description: "Child predicts whether the reading will change." },
      { level: "Hard", description: "Child explains why height does not change effort using tension." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-pulleys-e4": {
    id: "l1-pulleys-e4",
    segment: "experiment",
    title: "l1 pulleys e4 — pull direction changes comfort, not effort",
    cardName: "L1 Pulleys e4",
    setupLine:
      "pull straight down. pull at 45°. same reading?",
    howToPlay:
      "Record reading pulling straight down. Record reading pulling at an angle. Match — effort reading is the same. Comfort (how easy it feels on the arm) is different.",
    materials: ["Experiment Card: L1 Pulleys e4", "Pulley · rope · spring scale · 1kg · cup"],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in two directions, records." },
      { level: "Medium", description: "Child tries three angles and records all readings." },
      { level: "Hard", description: "Child explains why only comfort changes — the weight is constant, so the tension must be too." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
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
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
};

// ─── Build activities (3 models) ────────────────────────────

const buildActivities: Record<string, CurriculumActivity> = {
  "build-see-saw": {
    id: "build-see-saw",
    segment: "build",
    title: "see-saw build",
    setupLine:
      "each child builds their own see-saw from a personal kit. six sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever — a beam on a central fulcrum. Intuitive entry into lever concepts. · Day 1 Explore: read the full Model Manual, identify every component, lay them out in manual order, begin first build stage. · Days 2–3 Make: open manual to where you left off, build, teacher uses only four questions. · Day 4 Complete and test: finish, test balance behaviour, record best result. · Day 5 Improve: state a specific expected change, make one deliberate change, test, record before-and-after with numbers. · Day 6 Disassemble: at 8–12 this is done from memory, not the tray map. Teacher names each component as it goes back.",
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
    debriefPrompts: [
      {
        notice: "which child, when something did not fit, paused and named what was wrong before trying again.",
        name: "that is diagnosis before action — the engineering habit at 8–12.",
        connect: "ask: what part was failing? what was it failing to do?",
      },
    ],
    type: "physical-game",
  },
  "build-weighing-scale": {
    id: "build-weighing-scale",
    segment: "build",
    title: "weighing scale build",
    setupLine:
      "same cycle, more complex lever. two pan arms that must balance perfectly.",
    howToPlay:
      "Complex two-pan lever. Every lever experiment directly explains what the build is doing. Same 6-day cycle: Explore · Make · Make · Complete and test · Improve · Disassemble (from memory).",
    materials: [
      "Weighing Scale kit additions per child (distributed at Day 1)",
      "Model Manual — Weighing Scale.pdf",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds with teacher checks." },
      { level: "Medium", description: "Child builds independently and checks connections as they go." },
      { level: "Hard", description: "Child anticipates each sub-assembly's function and predicts issues before they occur." },
    ],
    debriefPrompts: [
      {
        notice: "whether the child linked their current lever experiment result to what they are building today.",
        name: "that is connecting theory to practice — the bridge we want them to walk on their own.",
        connect: "ask: which experiment explains what you built today? which reading told you why?",
      },
    ],
    type: "physical-game",
  },
  "build-crane": {
    id: "build-crane",
    segment: "build",
    title: "crane build",
    setupLine:
      "pulley model. the crane lifts a load through a rope and pulley system.",
    howToPlay:
      "Crane uses a pulley system. Same 6-day cycle: Explore · Make · Make · Complete and test · Improve · Disassemble (from memory). At 8–12 the Improve day can include tweaking rope angle, repositioning the pulley, or adding a second rope segment for mechanical advantage.",
    materials: [
      "Crane kit additions per child (distributed at Day 1)",
      "Model Manual — L1_Crane.pdf",
      "Pulleys, rope, couplers (in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds with teacher check per step." },
      { level: "Medium", description: "Child builds independently, tests each subsystem." },
      { level: "Hard", description: "Child proposes the Improve-day change before Day 5, states expected effect, tests, measures." },
    ],
    debriefPrompts: [
      {
        notice: "which child explained the function of a pulley without being asked.",
        name: "that is applying the experiment to the build — the skill we want at 8–12.",
        connect: "ask: which principle from the pulley experiments is inside your crane? how does it make the lift easier?",
      },
    ],
    type: "physical-game",
  },
};

// ─── Experience book ────────────────────────────────────────

const experienceBookActivity: CurriculumActivity = {
  id: "rob-experience-book",
  segment: "experience-book",
  title: "experience book",
  setupLine:
    "ten minutes. five marks. one specific note per child. goes home every day.",
  howToPlay:
    "Teacher fills five things per child: experiment name, build day, four ability marks (O&U and LT from the experiment · B&M and PS from the build · concept understood when asked a causal question), and one specific note (\"worth remembering\"). At 8–12 the most valuable notes capture reasoning — predicting a value and checking it. The book also carries the Ability Reference, Concept Tracker, and six monthly Robotics Journey letters at sessions 8, 16, 24, 32, 40, 48.",
  materials: [
    "My Robotics Experience Book (ages 8–12) — per child, hardbound",
    "Ability Reference card (glued inside cover)",
    "Tray map (reference inside back cover)",
  ],
  debriefPrompts: [
    {
      notice: "which children can explain a result causally — name the cause, connect it to the data.",
      name: "that is concept understanding at 8–12, not just memorisation.",
      connect: "if the child only describes what happened, ask 'why?' — if they still cannot explain the cause, the concept is not yet learnt.",
    },
  ],
  type: "facilitated",
};

// ─── Skills (8-12 version — quantitative, deliberate) ───────

const skillAreas: CurriculumSkillArea[] = [
  {
    id: "bm",
    name: "building & making",
    shortName: "B&M",
    abilities: [
      "puts parts together deliberately — checks each connection works before moving on",
      "follows the step card and notices when a step has not worked as expected",
      "finds the exact part that failed and fixes it without being told",
      "improves the model deliberately — states what they expect to change before testing",
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      "notices when the model is not working and names what it should be doing",
      "tries genuinely different approaches — does not repeat what already failed",
      "names the specific part that is failing and explains what it is failing to do",
      "sets a measurable goal and keeps adjusting until the model reaches it",
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      "names one specific thing that changed — what moved, shifted, or read differently",
      "takes measurements accurately and records every reading correctly",
      "writes a specific prediction before testing — a value or a reason, not just a direction",
      "explains what caused the result — names the cause and connects it to what the data shows",
    ],
  },
  {
    id: "lt",
    name: "logical thinking",
    shortName: "LT",
    abilities: [
      "understands that results come from specific causes — not from everything changing at once",
      "identifies which specific change caused the result",
      "applies what they found in one situation to reason about a different one",
      "plans what to test, how to test it, and what a good result looks like — before starting",
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
      "groups of 2–4. every child takes at least one measurement independently. teacher asks one question per group. at 8–12, predictions are specific values or reasoned statements — not just directions.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "each child builds their own model from a personal kit. at 8–12 the teacher asks four questions only and the child diagnoses before acting.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "experience-book",
    name: "experience book",
    durationRange: "10 min",
    objective:
      "five marks per child. specific notes that capture reasoning. compiles into six monthly robotics journey letters through the year.",
    type: "fixed",
  },
];

// ─── Session table — 18 sessions ────────────────────────────

const DAY_LABELS_8_12: Record<number, string> = {
  1: "Day 1 — Explore",
  2: "Day 2 — Make",
  3: "Day 3 — Make",
  4: "Day 4 — Complete and test",
  5: "Day 5 — Improve",
  6: "Day 6 — Disassemble",
};

function s(
  sessionNumber: number,
  experiment: string,
  buildModel: string,
  buildId: string,
  buildDay: number
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
  };
}

const sessionTable: CurriculumSessionEntry[] = [
  // See-saw · L1 & L2 Levers paired
  s(1, "l1-levers-e1", "See-saw", "build-see-saw", 1),
  s(2, "l2-levers-e1", "See-saw", "build-see-saw", 2),
  s(3, "l1-levers-e2", "See-saw", "build-see-saw", 3),
  s(4, "l2-levers-e2", "See-saw", "build-see-saw", 4),
  s(5, "l1-levers-e3", "See-saw", "build-see-saw", 5),
  s(6, "l2-levers-e3", "See-saw", "build-see-saw", 6),
  // Weighing Scale · L1 e4, L2 e4, L2 e5, L2 e6, repeats
  s(7, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 1),
  s(8, "l2-levers-e4", "Weighing Scale", "build-weighing-scale", 2),
  s(9, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 3),
  s(10, "l2-levers-e6", "Weighing Scale", "build-weighing-scale", 4),
  s(11, "l2-levers-e3", "Weighing Scale", "build-weighing-scale", 5),
  s(12, "l2-levers-e4", "Weighing Scale", "build-weighing-scale", 6),
  // Crane · L1 & L2 Pulleys
  s(13, "l1-pulleys-e1", "Crane", "build-crane", 1),
  s(14, "l1-pulleys-e2", "Crane", "build-crane", 2),
  s(15, "l1-pulleys-e3", "Crane", "build-crane", 3),
  s(16, "l1-pulleys-e4", "Crane", "build-crane", 4),
  s(17, "l2-pulleys-e4", "Crane", "build-crane", 5),
  s(18, "l2-pulleys-e5", "Crane", "build-crane", 6),
];

sessionTable.forEach((e) => {
  if ([8, 16].includes(e.sessionNumber)) e.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      { skillArea: "B&M", beginning: "follows with teacher check", developing: "checks each connection before moving on", secure: "fixes the exact part that failed without being told" },
      { skillArea: "PS", beginning: "stops when stuck", developing: "tries genuinely different approaches", secure: "names the specific part that is failing and what it should do" },
      { skillArea: "O&U", beginning: "measures with support", developing: "records every reading correctly", secure: "writes a specific prediction — a value or reason — before testing" },
      { skillArea: "LT", beginning: "identifies causes with prompting", developing: "identifies which specific change caused the result", secure: "applies prior findings to a different situation" },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      { skillArea: "B&M", beginning: "builds independently", developing: "diagnoses before fixing", secure: "improves deliberately — states expected change before testing" },
      { skillArea: "PS", beginning: "reaches the goal", developing: "keeps adjusting", secure: "sets a measurable goal and keeps adjusting until the model reaches it" },
      { skillArea: "O&U", beginning: "prediction is a value", developing: "prediction has a reason", secure: "explanation names the cause and connects it to the data" },
      { skillArea: "LT", beginning: "plans in outline", developing: "plans what to test and how", secure: "plans what to test, how to test, and what a good result looks like — before starting" },
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
    "calculate it. predict it. build it. explain why it works — every time.",
  description:
    "level 1 — mechanics. same three models as 5–8 but each build is six days and every experiment is quantitative. children finish the year able to calculate mechanical advantage, predict before testing, and explain causally after.",
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
};
