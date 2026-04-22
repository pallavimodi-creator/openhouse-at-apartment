import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
} from "@/content/types";
import { ROBOTICS_TRIAL_SESSION } from "./robotics-trial";

// ─── Experiment activities (8 cards — L1 only) ──────────────

const experimentActivities: Record<string, CurriculumActivity> = {
  "l1-levers-e1": {
    id: "l1-levers-e1",
    segment: "experiment",
    title: "l1 levers e1 — longer lever, less effort",
    cardName: "L1 Levers e1",
    setupLine:
      "same load, different lever lengths. does it get easier to lift when the lever is longer?",
    howToPlay:
      "Set up a simple lever across a T-connector fulcrum. Hang a fixed load on one side and pull down on the other using a spring scale — first with a short arm (20cm), then a medium arm (30cm), then a long arm (40cm). Each child takes at least one reading. Record every reading in the result table. First use: children discover the pattern. Second use: children predict before reading — \"I think the 40cm will need less force because last time it was the smallest number.\"",
    materials: [
      "Experiment Card: L1 Levers e1 (laminated, wipe-clean)",
      "PVC pipe cut to 20cm, 30cm, 40cm — 1 of each per group",
      "T-connector — 1 per group, used as fulcrum",
      "Spring scale 2kg — 1 per group",
      "1kg weight + plastic cup with hook",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child hangs load, pulls the spring scale and reads the number. Teacher writes." },
      { level: "Medium", description: "Child reads the card step by step, does the setup, and writes their own reading in the result table." },
      { level: "Hard", description: "Child predicts before each reading — \"this one will be smaller/bigger because…\" — and checks whether the prediction was right." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l1-levers-e2": {
    id: "l1-levers-e2",
    segment: "experiment",
    title: "l1 levers e2 — heavier load, more effort",
    cardName: "L1 Levers e2",
    setupLine:
      "same lever length, different loads. does lifting a heavier load need more effort?",
    howToPlay:
      "Lever stays at the medium 30cm arm. Children hang a 0.5kg load, take a reading. Swap to 1kg, take a reading. Compare — is the spring scale number bigger when the load is heavier? First use: discover the pattern. Second use: predict before every reading.",
    materials: [
      "Experiment Card: L1 Levers e2",
      "PVC pipe 30cm · T-connector · Spring scale 2kg",
      "0.5kg and 1kg weights · plastic cup",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads the card. Child hangs the load. Child reads one number aloud." },
      { level: "Medium", description: "Child sets up and records every reading in the table." },
      { level: "Hard", description: "Child predicts the reading within 100g before measuring. Checks how close the prediction was." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l1-levers-e3": {
    id: "l1-levers-e3",
    segment: "experiment",
    title: "l1 levers e3 — equal weights balance",
    cardName: "L1 Levers e3",
    setupLine:
      "two equal weights, one on each side, fulcrum in the middle. does the lever balance?",
    howToPlay:
      "Place fulcrum at the centre of the 30cm lever. Hang 0.5kg on the left. Hang 0.5kg on the right. Does the lever sit flat? Now try 1kg each side. Still balanced? First use: children see balance as a pattern. Second use: before hanging, children say \"I predict it will balance\" and explain why.",
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
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l1-levers-e4": {
    id: "l1-levers-e4",
    segment: "experiment",
    title: "l1 levers e4 — any equal weight balances",
    cardName: "L1 Levers e4",
    setupLine:
      "you do not need a weighing set — any two things that weigh the same will balance a lever.",
    howToPlay:
      "Hang a known 0.5kg weight on one side. On the other side, try objects of different sizes but roughly equal weight — a filled water bottle, a book, a bag of rice. Which makes the lever balance? Children feel that shape and size do not matter — only weight does. First use: discover the idea. Second use: predict which object will balance before trying.",
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
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-levers.pdf",
  },
  "l1-pulleys-e1": {
    id: "l1-pulleys-e1",
    segment: "experiment",
    title: "l1 pulleys e1 — heavier load, more pulley effort",
    cardName: "L1 Pulleys e1",
    setupLine:
      "a single pulley does not make things lighter — heavier loads still need more effort.",
    howToPlay:
      "Clamp the pulley to the table. Thread the rope over it. Tie one end to the load cup, attach the spring scale to the other end. Lift 0.5kg, read the spring scale. Lift 1kg, read again. Compare. First use: discover. Second use: predict before every lift.",
    materials: [
      "Experiment Card: L1 Pulleys e1",
      "Pulley + tabletop clamp mount · 1m rope · spring scale 2kg · 0.5kg and 1kg weights · plastic cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher lifts. Child reads the number." },
      { level: "Medium", description: "Child lifts slowly and steadily, takes two readings, writes the average." },
      { level: "Hard", description: "Child predicts the reading before every lift and explains why it will be bigger or smaller." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
  "l1-pulleys-e2": {
    id: "l1-pulleys-e2",
    segment: "experiment",
    title: "l1 pulleys e2 — changes direction of pull",
    cardName: "L1 Pulleys e2",
    setupLine:
      "without the pulley you lift up. with the pulley you pull down. same load, different direction.",
    howToPlay:
      "First, lift the 1kg load straight up by hand using the spring scale. Then thread rope over the pulley, hook load on one end, pull the other end down. Child feels: now I pull down to lift the load up. The pulley changes direction. First use: discover the direction switch. Second use: predict \"which direction will I pull this time?\" before setting up.",
    materials: [
      "Experiment Card: L1 Pulleys e2",
      "Pulley mount · rope · spring scale · 1kg weight · cup",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in the direction shown by the teacher." },
      { level: "Medium", description: "Child sets up the pulley and names the direction of pull each time." },
      { level: "Hard", description: "Child predicts and explains why the direction changes." },
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
      "raise the pulley higher. does the spring scale read a bigger number?",
    howToPlay:
      "Clamp the pulley at table-edge height. Lift 1kg, take the reading. Move the pulley to a raised position (use a stack of books under the mount, or raise the clamp). Lift the same 1kg. Compare readings. They are the same. Height does not change effort — only the rope length you pull.",
    materials: [
      "Experiment Card: L1 Pulleys e3",
      "Pulley mount · rope · spring scale · 1kg weight · stack of books or riser to raise pulley height",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher raises the pulley. Child reads the new number aloud." },
      { level: "Medium", description: "Child raises the pulley position and re-measures." },
      { level: "Hard", description: "Child predicts whether the reading will change before lifting and explains why." },
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
      "pull straight down. pull sideways. does the number on the spring scale change?",
    howToPlay:
      "With load hanging from the pulley rope, child pulls the free end straight down — reads the spring scale. Then pulls at an angle (sideways, 45°). Reads again. The spring scale reading is the same — but one feels more comfortable than the other.",
    materials: [
      "Experiment Card: L1 Pulleys e4",
      "Pulley mount · rope · spring scale · 1kg weight · cup",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child pulls in the two directions shown by the teacher." },
      { level: "Medium", description: "Child tries three directions and records all three readings." },
      { level: "Hard", description: "Child predicts whether the readings will match before each pull and explains why comfort is different from effort." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },
};

// ─── Build activities (3 models, 6 days each) ───────────────

const buildActivities: Record<string, CurriculumActivity> = {
  "build-see-saw": {
    id: "build-see-saw",
    segment: "build",
    title: "see-saw build",
    setupLine:
      "each child builds their own see-saw from a personal kit and a step card. six sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever model — a beam balancing on a central fulcrum. Introduces lever concepts in the most physical way a child can feel. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin first build stage. Days 2–3 Make: open manual where you left off, build, teacher uses four questions only. Day 4 Complete and Test: finish, run the test (balance two known weights — does the beam stay level?), record the best result. Day 5 Improve: each child makes one deliberate change, states expected outcome, tests, records before and after. Day 6 Disassemble: sorted back using the tray map. Teacher names each component as it goes in.",
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
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/see-saw.pdf",
  },
  "build-weighing-scale": {
    id: "build-weighing-scale",
    segment: "build",
    title: "weighing scale build",
    setupLine:
      "same cycle, new model — a two-pan lever. six sessions from kit to calibrated scale.",
    howToPlay:
      "The weighing scale is a more precise lever. The scale must balance — not just assemble. Children calibrate rather than just build. Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test (place equal weights in both pans — does it balance? place unequal — which way does it tip?) · Day 5 Improve (child makes one change, measures before and after) · Day 6 Disassemble using the tray map.",
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
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/weighing-scale.pdf",
  },
  "build-crane": {
    id: "build-crane",
    segment: "build",
    title: "crane build",
    setupLine:
      "the pulley model — a crane that lifts a load with rope and pulley. six sessions.",
    howToPlay:
      "The crane uses a pulley system to lift loads. Pulley experiments explain directly how the lifting system works. Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test (lift a known load — did it work? how heavy can it lift before it tips?) · Day 5 Improve (one deliberate change — try a different rope angle, reposition the pulley) · Day 6 Disassemble using the tray map.",
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
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/crane.pdf",
  },
};

// ─── Experience book activity ───────────────────────────────

const experienceBookActivity: CurriculumActivity = {
  id: "rob-experience-book",
  segment: "experience-book",
  title: "experience book",
  setupLine:
    "ten minutes at the end of every session. circle the ability seen clearly today for each skill. one specific note. goes home every day.",
  howToPlay:
    "The teacher fills in four things per child: the experiment name, the build day, three ability rows (one per skill — B&M, PS, O&U — circling the ability seen clearly today), and one specific note (\"worth remembering\"). The book also carries the Ability Reference, and six monthly Robotics Journey letters that go home at sessions 8, 16, 24, 32, 40, and 48. Always conduct a 3-move debrief: name what you saw (linked to an ability name) · name the next step (next ability up) · ask one concept question to the group.",
  materials: [
    "My Robotics Experience Book (ages 5–8) — per child, hardbound",
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
      { name: "fits and functions", description: "puts parts together so they fit and work" },
      { name: "follows the card", description: "follows the step card one step at a time" },
      { name: "adjusts and fixes", description: "adjusts a part that is not working — tightens, repositions, or reconnects it" },
      { name: "improves deliberately", description: "makes one deliberate change to improve the model and checks whether it worked", isNorthStar: true },
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      { name: "notices independently", description: "notices when the model is not doing what it should — without being told" },
      { name: "tries differently", description: "tries a genuinely different approach when the first one fails" },
      { name: "locates the cause", description: "points to the specific part causing the problem before touching anything" },
      { name: "reaches the goal", description: "keeps trying until the model does what it is supposed to do", isNorthStar: true },
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      { name: "spots what changed", description: "watches and names one specific thing that changed — without being asked" },
      { name: "measures and records", description: "measures carefully and writes the number in the right place" },
      { name: "predicts before trying", description: "writes what they think will happen before trying" },
      { name: "explains why", description: "says what happened and gives a reason why", isNorthStar: true },
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
      "children work in groups of 2–4 to find the answer to one specific question. every child takes at least one measurement independently. teacher asks one question per group — never gives the answer. tool orientation is embedded for any new child in the first 3–4 experiment segments.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "5-minute engage question opens the segment — one question, 3–4 answers, connect to today's build. then each child builds their own model from a personal kit and a step card. the teacher never fixes and never tells. four questions only.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "experience-book",
    name: "experience book",
    durationRange: "10 min",
    objective:
      "circle the ability seen clearly today for each of the three skills. one specific note per child. three-move closing debrief: name what you saw · name the next step · one concept question.",
    type: "fixed",
  },
];

// ─── Session table — 18 sessions ────────────────────────────

const DAY_LABELS_5_8: Record<number, string> = {
  1: "Day 1 — Explore",
  2: "Day 2 — Make",
  3: "Day 3 — Make",
  4: "Day 4 — Complete and Test",
  5: "Day 5 — Improve",
  6: "Day 6 — Disassemble",
};

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
    buildDayLabel: DAY_LABELS_5_8[buildDay],
    topicLayer: 1,
    engageQuestion,
    conceptQuestion,
  };
}

const sessionTable: CurriculumSessionEntry[] = [
  s(1, "l1-levers-e1", "See-saw", "build-see-saw", 1,
    "Has anyone been to a market where the shopkeeper uses a balance scale — two pans hanging on either side? How does the shopkeeper know when the weight is right?",
    "What does a lever do that makes lifting easier — in one sentence?"),
  s(2, "l1-levers-e1", "See-saw", "build-see-saw", 2,
    "Yesterday we found that where you push changes how hard you have to push. Can anyone remember what happened when we moved further from the middle?",
    "When we moved further from the middle — did the effort go up or down? Why?"),
  s(3, "l1-levers-e2", "See-saw", "build-see-saw", 3,
    "If you carry a heavy school bag on one shoulder all day — what happens to that shoulder? What does that tell you about weight and effort?",
    "If the load doubles — does the effort double? What did our numbers show?"),
  s(4, "l1-levers-e2", "See-saw", "build-see-saw", 4,
    "A crane at a construction site lifts containers all day — some small, some enormous. Does the crane need the same amount of effort for each one?",
    "Can a lever find the weight of something unknown — how?"),
  s(5, "l1-levers-e3", "See-saw", "build-see-saw", 5,
    "Has anyone played on a see-saw with someone much heavier than you? What happened? What did you do to make it balance?",
    "When does a lever balance perfectly? What has to be true on both sides?"),
  s(6, "l1-levers-e3", "See-saw", "build-see-saw", 6,
    "Before we take apart the See-saw — which single part did the most important job? If you removed just that one part, what would stop working?",
    "What happens to effort when the fulcrum moves very close to the load?"),
  s(7, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 1,
    "If there was no weighing scale in the room — how would you figure out how heavy that bag is using only what is on this table?",
    "Which part of the Weighing Scale does the most important job?"),
  s(8, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 2,
    "Your Weighing Scale is starting to take shape. Before we test it — if I put the same weight on both pans, what do you predict will happen?",
    "What does a pulley do — what is the one thing it changes?"),
  s(9, "l1-pulleys-e1", "Weighing Scale", "build-weighing-scale", 3,
    "When you raise a flag on a flagpole — you pull the rope down and the flag goes up. You are pulling the wrong direction. How does that work?",
    "Does changing pulley height change the effort needed?"),
  s(10, "l1-pulleys-e1", "Weighing Scale", "build-weighing-scale", 4,
    "Your Weighing Scale is complete. Before we test it — what do you predict will happen if one pan has slightly more weight than the other?",
    "Does the direction you pull change the effort — or only the comfort?"),
  s(11, "l1-pulleys-e2", "Weighing Scale", "build-weighing-scale", 5,
    "Which one change would make your Weighing Scale more accurate? And how would you know it had improved?",
    "What job does the pulley do inside the crane that the crane couldn't do without it?"),
  s(12, "l1-pulleys-e2", "Weighing Scale", "build-weighing-scale", 6,
    "Before we take apart the Weighing Scale — what is the most surprising thing about how it works?",
    "What is the one most important thing you found out across all these sessions?"),
  s(13, "l1-pulleys-e3", "Crane", "build-crane", 1,
    "Your crane is starting to take shape. It uses a pulley to lift things. What do you think the pulley is doing that makes lifting possible?",
    "If the crane arm is longer — does the effort to lift go up or down?"),
  s(14, "l1-pulleys-e3", "Crane", "build-crane", 2,
    "Yesterday we tested how a pulley behaves. Can you predict what will happen today before touching any equipment?",
    "What does the counterweight do — and what would happen without it?"),
  s(15, "l1-pulleys-e4", "Crane", "build-crane", 3,
    "Real cranes have a big heavy block on the back — a counterweight. Why is that there? What would happen to the crane if you removed it?",
    "How does pull direction affect what you feel when you use the crane?"),
  s(16, "l1-pulleys-e4", "Crane", "build-crane", 4,
    "Your crane is complete. What load do you predict it will lift cleanly? What do you think might stop it from lifting more?",
    "What load does your crane lift cleanly — and why is that the limit?"),
  s(17, "l1-pulleys-e2", "Crane", "build-crane", 5,
    "You have been building this crane for several sessions. What is one part you are most proud of — and one thing you would change if you could?",
    "Which one change made the biggest improvement to your crane?"),
  s(18, "l1-levers-e4", "Crane", "build-crane", 6,
    "Before we take apart everything — what is the most surprising thing you found out across all these sessions?",
    "What is the one most important thing you found out this year?"),
];

// Monthly checkpoints — every 8 sessions
sessionTable.forEach((entry) => {
  if ([8, 16].includes(entry.sessionNumber)) entry.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      { skillArea: "B&M", beginning: "still needs teacher help to connect parts correctly", developing: "follows the step card one step at a time", secure: "adjusts a failing part — tightens, repositions, or reconnects it without being told" },
      { skillArea: "PS", beginning: "waits to be told what is wrong", developing: "notices when something is not working — without being told", secure: "tries a genuinely different approach when the first one fails" },
      { skillArea: "O&U", beginning: "watches but does not notice specifics", developing: "spots what changed — names something specific without being asked", secure: "writes what they think will happen before trying" },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      { skillArea: "B&M", beginning: "fixes one failing part with prompts", developing: "adjusts and fixes independently", secure: "improves the model deliberately — makes one change and checks whether it worked" },
      { skillArea: "PS", beginning: "tries different approaches", developing: "points to the specific part causing the problem before touching it", secure: "keeps trying until the model does what it is supposed to do" },
      { skillArea: "O&U", beginning: "records readings in the right place", developing: "writes a prediction before testing", secure: "says what happened and gives a reason why" },
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
    "level 1 — mechanics. children build a see-saw, a weighing scale, and a crane while running experiments on levers and pulleys. they finish the year able to look at a machine and explain why it works.",
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
  trialSession: ROBOTICS_TRIAL_SESSION,
};
