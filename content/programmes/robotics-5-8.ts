import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
} from "@/content/types";

// ─── Shared helpers ─────────────────────────────────────────

const COMMON_DEBRIEF = [
  {
    notice: "which children measured and recorded independently — without being prompted.",
    name: "that is the habit we want — children doing, not just watching.",
    connect:
      "ask the child: what did you find today that you did not expect? why do you think it happened that way?",
  },
];

// ─── Experiment activities (10 cards) ───────────────────────

const experimentActivities: Record<string, CurriculumActivity> = {
  "l1-levers-e1": {
    id: "l1-levers-e1",
    segment: "experiment",
    title: "l1 levers e1 — longer lever, less effort",
    cardName: "L1 Levers e1",
    setupLine:
      "same load, different lever lengths. does it get easier to lift when the lever is longer?",
    howToPlay:
      "children set up a simple lever across a T-connector fulcrum. They hang a fixed load on one side and pull down on the other using a spring scale — first with a short arm (20cm), then a medium arm (30cm), then a long arm (40cm). Each child takes at least one reading. They write every reading in the result table. · First use: children discover the pattern. · Second use: children predict before reading — \"I think the 40cm will need less force because last time it was the smallest number.\"",
    materials: [
      "Experiment Card: L1 Levers e1 (laminated, wipe-clean)",
      "PVC pipe cut to 20cm, 30cm, 40cm — 1 of each per group",
      "T-connector — 1 per group, used as fulcrum",
      "Spring scale 2kg — 1 per group",
      "1kg weight + plastic cup with hook to hang it — 1 set per group",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child hangs load, child pulls the spring scale and reads the number. Teacher writes." },
      { level: "Medium", description: "Child reads the card step by step, does the setup, and writes their own reading in the result table." },
      { level: "Hard", description: "Child predicts before each reading — \"this one will be smaller/bigger because…\" — and checks whether the prediction was right." },
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
      "same lever length, different loads. does lifting a heavier load need more effort?",
    howToPlay:
      "Lever stays at the medium 30cm arm. Children hang a 0.5kg load, take a reading. Swap to 1kg, take a reading. Swap to 2kg if available, take a reading. They compare — is the spring scale number bigger when the load is heavier? · First use: discover the pattern. · Second use: predict before every reading.",
    materials: [
      "Experiment Card: L1 Levers e2",
      "PVC pipe 30cm — 1 per group · T-connector · Spring scale 2kg",
      "0.5kg and 1kg weights · plastic cup",
      "Erasable marker, measuring tape",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child hangs the load. Child reads one number aloud." },
      { level: "Medium", description: "Child sets up and records every reading in the table." },
      { level: "Hard", description: "Child predicts the reading within 100g before measuring. Checks how close the prediction was." },
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
      "two equal weights, one on each side, fulcrum in the middle. does the lever balance?",
    howToPlay:
      "Place fulcrum at the centre of the 30cm lever. Hang 0.5kg on the left. Hang 0.5kg on the right. Does the lever sit flat? Now try 1kg each side. Still balanced? · First use: children see balance as a pattern. · Second use: before hanging, children say \"I predict it will balance\" and explain why.",
    materials: [
      "Experiment Card: L1 Levers e3",
      "PVC pipe 30cm · T-connector · two plastic cups with hooks",
      "Two 0.5kg weights + two 1kg weights (both needed simultaneously)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher demonstrates. Child hangs the second weight and watches." },
      { level: "Medium", description: "Child sets up and checks if the lever is level using the table edge as a reference." },
      { level: "Hard", description: "Child predicts balance before hanging each weight and explains why balance happens." },
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
      "you do not need a weighing set — any two things that weigh the same will balance a lever.",
    howToPlay:
      "Hang a known 0.5kg weight on one side. On the other side, try objects of different sizes but roughly equal weight — a filled water bottle, a book, a bag of rice. Which makes the lever balance? Children feel that shape and size do not matter — only weight does. · First use: discover the idea. · Second use: predict which object will balance before trying.",
    materials: [
      "Experiment Card: L1 Levers e4",
      "PVC pipe 30cm · T-connector · plastic cups",
      "0.5kg weight + 3–4 everyday objects of roughly equal weight (teacher-supplied)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher hangs the comparison objects. Child names which balanced." },
      { level: "Medium", description: "Child tests each object and writes the result in the table." },
      { level: "Hard", description: "Child predicts for each object before testing and explains why shape does not matter." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l2-levers-e5": {
    id: "l2-levers-e5",
    segment: "experiment",
    title: "l2 levers e5 — unequal weights balance when fulcrum moves",
    cardName: "L2 Levers e5",
    setupLine:
      "unequal weights can still balance — if you move the fulcrum to the right place.",
    howToPlay:
      "Hang 1kg on the left, 0.5kg on the right. Fulcrum at centre — it tips toward the heavier side. Move the fulcrum toward the heavier side one centimetre at a time until the lever balances. Mark the position. Repeat with different weight pairs. · Optional / run only if See-saw + Weighing Scale build sessions allow.",
    materials: [
      "Experiment Card: L2 Levers e5 (includes result column for fulcrum position in cm)",
      "PVC pipe 40cm · T-connector · plastic cups · 0.5kg and 1kg weights",
      "Measuring tape, masking tape for marking fulcrum position",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher moves the fulcrum. Child names when it is balanced." },
      { level: "Medium", description: "Child moves the fulcrum and records the balance point distance." },
      { level: "Hard", description: "Child predicts whether the fulcrum needs to move toward the heavy or light side before testing." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l2-levers-e6": {
    id: "l2-levers-e6",
    segment: "experiment",
    title: "l2 levers e6 — fulcrum near load, effort drops",
    cardName: "L2 Levers e6",
    setupLine:
      "put the fulcrum close to the load and watch the effort shrink.",
    howToPlay:
      "Place fulcrum 5cm from the load end of a 40cm lever. Hang 1kg at the load end. Pull the spring scale at the far end. Compare the reading to e2 from earlier — the load is the same but the reading is much smaller. Explain: the fulcrum is now very close to the load, and it takes much less effort at the long end. · Optional / run only if session count allows.",
    materials: [
      "Experiment Card: L2 Levers e6 (specifies fulcrum at 5cm from load end)",
      "PVC pipe 40cm · T-connector · plastic cup · 1kg weight · spring scale",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher sets the fulcrum. Child reads the number." },
      { level: "Medium", description: "Child sets the fulcrum at the marked position and reads independently." },
      { level: "Hard", description: "Child compares this reading to the e2 reading and explains why it is so much smaller." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-pulleys-e1": {
    id: "l1-pulleys-e1",
    segment: "experiment",
    title: "l1 pulleys e1 — heavier load, more pulley effort",
    cardName: "L1 Pulleys e1",
    setupLine:
      "a single pulley does not make things lighter — heavier loads still need more effort.",
    howToPlay:
      "Clamp the pulley to the table. Thread the rope over it. Tie one end to the load cup, attach the spring scale to the other end. Lift 0.5kg, read the spring scale. Lift 1kg, read again. Compare. · First use: discover. · Second use: predict before every lift.",
    materials: [
      "Experiment Card: L1 Pulleys e1",
      "Pulley + tabletop clamp mount · 1m rope · spring scale 2kg · 0.5kg and 1kg weights · plastic cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher lifts. Child reads the number." },
      { level: "Medium", description: "Child lifts slowly and steadily, takes two readings, writes the average." },
      { level: "Hard", description: "Child predicts the reading before every lift and explains why it will be bigger or smaller." },
    ],
    debriefPrompts: COMMON_DEBRIEF,
    type: "physical-game",
  },
  "l1-pulleys-e2": {
    id: "l1-pulleys-e2",
    segment: "experiment",
    title: "l1 pulleys e2 — changes direction of pull",
    cardName: "L1 Pulleys e2",
    setupLine:
      "without the pulley you lift up. with the pulley you pull down. same load, different direction.",
    howToPlay:
      "First, lift the 1kg load straight up by hand using the spring scale — note the direction (pulling up). Then thread rope over the pulley, hook load on one end, pull the other end down. Child feels: now I pull down to lift the load up. The pulley changes direction. · First use: discover the direction switch. · Second use: predict \"which direction will I pull this time?\" before setting up.",
    materials: [
      "Experiment Card: L1 Pulleys e2",
      "Pulley mount · rope · spring scale · 1kg weight · cup",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in the direction shown by the teacher." },
      { level: "Medium", description: "Child sets up the pulley and names the direction of pull each time." },
      { level: "Hard", description: "Child predicts and explains why the direction changes." },
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
      "raise the pulley higher. does the spring scale read a bigger number?",
    howToPlay:
      "Clamp the pulley at table-edge height. Lift 1kg, take the reading. Move the pulley to a raised position (use a stack of books under the mount, or raise the clamp). Lift the same 1kg. Compare readings. They are the same. Height does not change effort — only the rope length you pull. · First use: discover. · Second use: predict before the second height.",
    materials: [
      "Experiment Card: L1 Pulleys e3",
      "Pulley mount · rope · spring scale · 1kg weight · stack of books or riser to raise pulley height",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher raises the pulley. Child reads the new number aloud." },
      { level: "Medium", description: "Child raises the pulley position and re-measures." },
      { level: "Hard", description: "Child predicts whether the reading will change before lifting and explains why." },
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
      "pull straight down. pull sideways. does the number on the spring scale change?",
    howToPlay:
      "With load hanging from the pulley rope, child pulls the free end straight down — reads the spring scale. Then pulls at an angle (sideways, 45°). Reads again. The spring scale reading is the same — but one feels more comfortable than the other. Effort is about the weight; comfort is about how you use your body. · First use: discover. · Second use: predict whether the numbers will match.",
    materials: [
      "Experiment Card: L1 Pulleys e4",
      "Pulley mount · rope · spring scale · 1kg weight · cup",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in the two directions shown by the teacher." },
      { level: "Medium", description: "Child tries three directions and records all three readings." },
      { level: "Hard", description: "Child predicts whether the readings will match before each pull and explains why comfort is different from effort." },
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
      "each child builds their own see-saw from a personal kit and a step card. eight sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever model — a beam balancing on a central fulcrum. It introduces lever concepts in the most physical way children can feel: the balance, the tip, the shift in weight. Each child works from their own kit box using the Model Manual. · Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin first build stage. · Days 2–5 Make: open the manual to where you left off, build, do not ask for help unless stuck — the teacher asks four questions but never tells. · Day 6 Complete and test: finish the build, run the test (balance two known weights, does the beam stay level?), record the best result. · Day 7 Improve: each child makes one deliberate change, states what they expect to happen, tests it, records before and after. Brief group chat: \"What was hardest?\" \"Which part did the most important job?\" · Day 8 Disassemble: sorted back using the tray map. Teacher names each component as it goes in.",
    materials: [
      "Personal See-saw kit per child — all components in a labelled box",
      "Model Manual — See Saw.pdf (1 per child, laminated)",
      "Tray map — See-saw (1 per child)",
      "Child-sized spanner, spare bolts and nuts",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads each manual step aloud. Child fits each component and the teacher checks." },
      { level: "Medium", description: "Child reads independently and does each step without verbal confirmation — teacher watches." },
      { level: "Hard", description: "Child works ahead of the manual — reads two steps, plans, then builds. Checks own work before moving on." },
    ],
    debriefPrompts: [
      {
        notice: "which child, when something did not fit, paused and looked rather than forcing.",
        name: "that is the building habit we want.",
        connect: "ask: what told you it was wrong? what did you try next?",
      },
    ],
    type: "physical-game",
  },
  "build-weighing-scale": {
    id: "build-weighing-scale",
    segment: "build",
    title: "weighing scale build",
    setupLine:
      "same cycle, new model — a two-pan lever. eight sessions from kit to finished scale.",
    howToPlay:
      "The weighing scale is a more complex lever. Two pan arms must balance when equal weights are placed. Every lever experiment directly explains something the child is building. · Day 1 Explore · Days 2–5 Make · Day 6 Complete and test (place equal weights in both pans — does it balance? place unequal — which way does it tip?) · Day 7 Improve (child makes one change, measures before and after) · Day 8 Disassemble using the tray map.",
    materials: [
      "Personal Weighing Scale kit additions per child — distributed at Day 1",
      "Model Manual — Weighing Scale.pdf (1 per child)",
      "Tray map — Weighing Scale (1 per child)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads steps. Child fits each component with teacher check." },
      { level: "Medium", description: "Child reads and builds independently." },
      { level: "Hard", description: "Child anticipates the next step before reading and checks own work as they go." },
    ],
    debriefPrompts: [
      {
        notice: "whether the child connected what they were building to the lever experiment of the day.",
        name: "that is the bridge between experiment and build — the one we want them to notice themselves.",
        connect: "ask: where is the lever in what you built today? where is the fulcrum?",
      },
    ],
    type: "physical-game",
  },
  "build-crane": {
    id: "build-crane",
    segment: "build",
    title: "crane build",
    setupLine:
      "the pulley model — a crane that lifts a load with rope and wheel. eight sessions.",
    howToPlay:
      "The crane uses a pulley system to lift loads. Pulley experiments explain directly how the lifting system works. · Day 1 Explore · Days 2–5 Make · Day 6 Complete and test (lift a known load — did it work? how heavy can it lift before it tips?) · Day 7 Improve (one deliberate change — try a different rope angle, reposition the pulley) · Day 8 Disassemble using the tray map. Teacher names each component as it goes in.",
    materials: [
      "Personal Crane kit additions per child — distributed at Day 1",
      "Model Manual — L1_Crane.pdf (1 per child)",
      "Tray map — Crane (1 per child)",
      "Pulleys, rope, couplers (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads steps. Child fits components with check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the part is for, builds and checks." },
    ],
    debriefPrompts: [
      {
        notice: "which child stepped back and tested their build before moving on — without being asked.",
        name: "that is test-as-you-go — the habit that prevents big rebuilds later.",
        connect: "ask: what told you the part was working? what would you change if you built it again?",
      },
    ],
    type: "physical-game",
  },
};

// ─── Experience book activity ───────────────────────────────

const experienceBookActivity: CurriculumActivity = {
  id: "rob-experience-book",
  segment: "experience-book",
  title: "experience book",
  setupLine:
    "ten minutes at the end of every session. five marks. one specific note. goes home every day.",
  howToPlay:
    "The teacher fills in five things per child: the experiment name, the build day, four ability marks (O&U and LT from the experiment · B&M and PS from the build · concept understood when asked), and one specific note (\"worth remembering\"). The book also carries the Ability Reference, the Concept Tracker, and the six monthly Robotics Journey letters that go home at sessions 8, 16, 24, 32, 40, and 48.",
  materials: [
    "My Robotics Experience Book (ages 5–8) — per child, hardbound",
    "Ability Reference card (glued inside cover)",
    "Tray map (reference inside back cover)",
  ],
  debriefPrompts: [
    {
      notice: "which children could explain today's concept in their own words — not by repeating the teacher.",
      name: "that is when a concept is learnt, not memorised.",
      connect: "if the child cannot explain it today, ask the same question next session — two consecutive sessions is how we mark a concept learnt.",
    },
  ],
  type: "facilitated",
};

// ─── Skills ─────────────────────────────────────────────────

const skillAreas: CurriculumSkillArea[] = [
  {
    id: "bm",
    name: "building & making",
    shortName: "B&M",
    abilities: [
      "puts parts together so they fit and work",
      "follows the step card one step at a time",
      "finds what is broken and fixes it",
      "improves the model on purpose and checks if it worked",
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      "notices when something is not working — without being told",
      "tries a different approach when the first one fails",
      "finds the exact part causing the problem",
      "keeps going until the model reaches a clear goal",
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      "spots one specific thing that changed — without being asked",
      "measures carefully and writes the number in the right place",
      "thinks about what will happen before trying",
      "explains why a result happened — not just what happened",
    ],
  },
  {
    id: "lt",
    name: "logical thinking",
    shortName: "LT",
    abilities: [
      "understands that results have causes — things don't just happen",
      "knows which specific change made the difference",
      "draws on what they found before when approaching something new",
      "thinks through what to test and how they will know if it worked",
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
      "children work in groups of 2–4 to find the answer to one specific question. every child takes at least one measurement independently. teacher asks one question per group — never gives the answer.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "each child builds their own model from a personal kit and a step card. the teacher never fixes and never tells. four questions only.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "experience-book",
    name: "experience book",
    durationRange: "10 min",
    objective:
      "five marks per child per session. one specific note. goes home every day and compiles into a monthly robotics journey letter.",
    type: "fixed",
  },
];

// ─── Session table — 24 sessions (sessions 25–48 to be added) ─

const DAY_LABELS_5_8: Record<number, string> = {
  1: "Day 1 — Explore",
  2: "Day 2 — Make",
  3: "Day 3 — Make",
  4: "Day 4 — Make",
  5: "Day 5 — Make",
  6: "Day 6 — Complete and test",
  7: "Day 7 — Improve",
  8: "Day 8 — Disassemble",
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
    buildDayLabel: DAY_LABELS_5_8[buildDay],
    topicLayer: 1,
  };
}

const sessionTable: CurriculumSessionEntry[] = [
  // See-saw · L1 Levers
  s(1, "l1-levers-e1", "See-saw", "build-see-saw", 1),
  s(2, "l1-levers-e1", "See-saw", "build-see-saw", 2),
  s(3, "l1-levers-e2", "See-saw", "build-see-saw", 3),
  s(4, "l1-levers-e2", "See-saw", "build-see-saw", 4),
  s(5, "l1-levers-e3", "See-saw", "build-see-saw", 5),
  s(6, "l1-levers-e3", "See-saw", "build-see-saw", 6),
  s(7, "l1-levers-e4", "See-saw", "build-see-saw", 7),
  s(8, "l1-levers-e4", "See-saw", "build-see-saw", 8),
  // Weighing Scale · L2 Levers then L1 reruns
  s(9, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 1),
  s(10, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 2),
  s(11, "l2-levers-e6", "Weighing Scale", "build-weighing-scale", 3),
  s(12, "l2-levers-e6", "Weighing Scale", "build-weighing-scale", 4),
  s(13, "l1-levers-e3", "Weighing Scale", "build-weighing-scale", 5),
  s(14, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 6),
  s(15, "l1-levers-e2", "Weighing Scale", "build-weighing-scale", 7),
  s(16, "l1-levers-e1", "Weighing Scale", "build-weighing-scale", 8),
  // Crane · L1 Pulleys
  s(17, "l1-pulleys-e1", "Crane", "build-crane", 1),
  s(18, "l1-pulleys-e1", "Crane", "build-crane", 2),
  s(19, "l1-pulleys-e2", "Crane", "build-crane", 3),
  s(20, "l1-pulleys-e2", "Crane", "build-crane", 4),
  s(21, "l1-pulleys-e3", "Crane", "build-crane", 5),
  s(22, "l1-pulleys-e3", "Crane", "build-crane", 6),
  s(23, "l1-pulleys-e4", "Crane", "build-crane", 7),
  s(24, "l1-pulleys-e4", "Crane", "build-crane", 8),
];

// Mark each checkpoint session
sessionTable.forEach((entry) => {
  if ([8, 16, 24].includes(entry.sessionNumber)) entry.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      { skillArea: "B&M", beginning: "needs help with most steps", developing: "follows the step card one step at a time", secure: "puts parts together so they fit and work — independently" },
      { skillArea: "PS", beginning: "waits to be told what is wrong", developing: "notices when something is not working — without being told", secure: "tries a different approach when the first one fails" },
      { skillArea: "O&U", beginning: "watches but does not notice", developing: "spots one specific thing that changed — without being asked", secure: "measures carefully and writes the number in the right place" },
      { skillArea: "LT", beginning: "treats results as random", developing: "understands that results have causes", secure: "knows which specific change made the difference" },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      { skillArea: "B&M", beginning: "follows with teacher support", developing: "builds independently and fixes what breaks", secure: "improves the model on purpose and checks if it worked" },
      { skillArea: "PS", beginning: "stops when stuck", developing: "tries different approaches", secure: "finds the exact part causing the problem" },
      { skillArea: "O&U", beginning: "measures with prompting", developing: "records readings in the right place", secure: "thinks about what will happen before trying" },
      { skillArea: "LT", beginning: "identifies causes with prompting", developing: "knows which change made the difference", secure: "draws on what they found before when approaching something new" },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      { skillArea: "B&M", beginning: "building is consistent", developing: "improves deliberately", secure: "improves the model on purpose, states the change, and checks if it worked" },
      { skillArea: "PS", beginning: "works toward the goal", developing: "keeps adjusting", secure: "keeps going until the model reaches a clear goal" },
      { skillArea: "O&U", beginning: "predicts a direction", developing: "predicts with a reason", secure: "explains why a result happened — not just what happened" },
      { skillArea: "LT", beginning: "connects to prior learning", developing: "applies prior findings", secure: "thinks through what to test and how they will know if it worked" },
    ],
  },
];

// ─── Programme ──────────────────────────────────────────────

export const robotics58: CurriculumProgramme = {
  id: "robotics-5-8",
  slug: "robotics-5-8",
  title: "robotics",
  category: "stem",
  heroImageUrl: "/prog-stem-5-8.gif",
  ageGroup: "5-8",
  ageLabel: "ages 5–8",
  tagline:
    "build real machines. run real experiments. figure out why things work.",
  description:
    "level 1 — mechanics. children build a see-saw, a weighing scale, and a crane while running paired experiments on levers and pulleys. they finish the year able to look at a machine and explain why it works.",
  totalSessions: 24,
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
