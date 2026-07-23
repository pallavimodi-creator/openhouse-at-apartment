/**
 * Robotics · Level 2 — Electronics (ages 5–8 and 8–12).
 *
 * Authored from the operator's at-apartment website copy. Both age groups
 * share the same 25-day spine (5 models × the experiment card that sits
 * alongside each build session); they differ in how far the observing &
 * understanding skill is pushed — at 8–12 it becomes comparing, proving,
 * and drawing circuits as schematics.
 *
 * Source-true notes:
 *  - The experiment cards are the real Circuit Cards deck, split by tier
 *    (easy / medium / difficult). Each card links to its tier PDF.
 *  - Build step-cards for the five models are not in the asset set yet —
 *    the operator is adding them. Build activities therefore carry the
 *    model, its concept and the day arc, and deliberately do NOT invent
 *    step-by-step instructions.
 *  - ⚑ marks a card still to be created for the deck; ✚ marks an
 *    optional extension for early finishers. Both are flagged in the
 *    activity's educatorNote rather than hidden.
 */

import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
  ModelPairing,
} from "@/content/types";

const CARD_PDF = {
  easy: "/robotics-manuals/elec-cards-easy.pdf",
  medium: "/robotics-manuals/elec-cards-medium.pdf",
  difficult: "/robotics-manuals/elec-cards-difficult.pdf",
} as const;

/** Every card is a "make it work" task, not a worksheet. */
const HOW_A_CARD_RUNS =
  "Children work in small groups of 2–4 on this one card while the rest of the session's build waits. The card is a \"make it work\" task, not a worksheet — the children connect the blocks until the thing actually happens. Many cards carry a missing-wire challenge (a \"?\"): the connection is left out on purpose and the children work it out themselves. The educator asks one question per group and never gives the answer — the child tries, tests, and fixes. Every child gets hands on the blocks.";

const BLOCKS = {
  circuit: [
    "Circuit Card (laminated, wipe-clean)",
    "Power block (battery & holder)",
    "Jumper wires",
    "LED block",
    "Resistor block",
    "Switch block",
  ],
  polarity: [
    "Circuit Card (laminated, wipe-clean)",
    "Power block (battery & holder)",
    "Jumper wires",
    "Motor block",
    "LED block",
    "Motor clamp",
  ],
  control: [
    "Circuit Card (laminated, wipe-clean)",
    "Power block (battery & holder)",
    "Jumper wires",
    "Motor block — 2",
    "Direction (DPDT) block",
    "Motor clamp",
  ],
  power: [
    "Circuit Card (laminated, wipe-clean)",
    "Power block (battery & holder)",
    "Jumper wires",
    "Motor block — 3",
    "Speed (potentiometer) block",
    "LED block",
  ],
  sensing: [
    "Circuit Card (laminated, wipe-clean)",
    "Power block (battery & holder)",
    "Jumper wires",
    "IR sensor block",
    "Motor driver block",
    "Motor block",
  ],
};

/** Shorthand for an experiment card — keeps the 25 entries readable. */
function card(o: {
  id: string;
  cardName: string;
  title: string;
  question: string;
  goal: string;
  tier: "easy" | "medium" | "difficult";
  materials: string[];
  skillIds: string[];
  conceptQuestion: string;
  note?: string;
}): CurriculumActivity {
  return {
    id: o.id,
    segment: "experiment",
    title: o.title,
    cardName: o.cardName,
    setupLine: o.question,
    howToPlay: HOW_A_CARD_RUNS,
    players: "2–4 children · 1 educator",
    duration: "40 min",
    goal: o.goal,
    endsWhen:
      "the circuit does what the card asked, and every child in the group can point to the part that made it happen.",
    easierVariation:
      "you read the card and name the blocks; the child makes the connections and says what happened.",
    harderVariation:
      "the child predicts what the circuit will do before connecting, then proves it — and draws the circuit afterwards.",
    skillIds: o.skillIds,
    materials: o.materials,
    difficultyLevels: [
      {
        level: "Easy",
        description:
          "Educator reads the card and names the blocks. Child connects and says what happened.",
      },
      {
        level: "Medium",
        description:
          "Child reads the card, builds the circuit, and works out the missing connection themselves.",
      },
      {
        level: "Hard",
        description:
          "Child predicts before connecting — \"this will happen because…\" — then tests, and explains the result in real electronics words.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: CARD_PDF[o.tier],
    educatorNote: o.note,
  };
}

// ─── Experiment cards (25 — the Circuit Cards deck) ─────────

const experimentActivities: Record<string, CurriculumActivity> = {
  // ── circuits · easy · runs alongside the parking barrier ──
  "elec-circuits-e1": card({
    id: "elec-circuits-e1",
    cardName: "Staying safe",
    title: "circuits — staying safe: never join + to −",
    question:
      "what must we never do with the power block, and how do we handle it safely?",
    goal: "the child learns the one safety rule — never join + straight to − — and shows they can set up the power block correctly.",
    tier: "easy",
    materials: BLOCKS.circuit,
    skillIds: ["bm", "ou"],
    conceptQuestion: "why must we never join + straight to −?",
    note: "⚑ this card is still to be created for the deck. Until it is printed, run it as a short educator-led safety briefing using the power block and the safety rule.",
  }),
  "elec-circuits-e2": card({
    id: "elec-circuits-e2",
    cardName: "Conductors vs insulators",
    title: "circuits — conductors vs insulators",
    question:
      "which materials let the electricity through, and which ones block it?",
    goal: "the child tests everyday objects in the gap of a circuit and sorts them into things that carry electricity and things that block it.",
    tier: "easy",
    materials: [...BLOCKS.circuit, "Test objects — metal spoon, paperclip, plastic ruler, rubber band, pencil lead"],
    skillIds: ["ou", "bm"],
    conceptQuestion: "which things carried the electricity, and what did they all have in common?",
    note: "⚑ this card is still to be created for the deck. Until it is printed, run it with the LED circuit and a gap the children drop each test object into.",
  }),
  "elec-circuits-e3": card({
    id: "elec-circuits-e3",
    cardName: "A complete loop",
    title: "circuits — a complete loop lights the led",
    question: "what has to be true before the led will light?",
    goal: "the child connects the blocks into a complete ring so the LED lights, then breaks the ring and sees it stop.",
    tier: "easy",
    materials: BLOCKS.circuit,
    skillIds: ["bm", "ou", "ps"],
    conceptQuestion: "what happens to the led if we break the loop anywhere?",
  }),
  "elec-circuits-e4": card({
    id: "elec-circuits-e4",
    cardName: "The switch",
    title: "circuits — a switch opens and closes the loop",
    question: "how do we turn the circuit on and off without pulling a wire out?",
    goal: "the child puts a switch into the loop and uses it to open and close the circuit on demand.",
    tier: "easy",
    materials: BLOCKS.circuit,
    skillIds: ["bm", "ou"],
    conceptQuestion: "what is the switch actually doing to the loop when you press it?",
  }),
  "elec-circuits-e5": card({
    id: "elec-circuits-e5",
    cardName: "The resistor",
    title: "circuits — the resistor keeps the led safe",
    question: "why does the led need a resistor next to it?",
    goal: "the child adds the resistor block to the LED circuit and can say what it protects the LED from.",
    tier: "easy",
    materials: BLOCKS.circuit,
    skillIds: ["ou", "bm"],
    conceptQuestion: "what would happen to the led without the resistor?",
  }),

  // ── polarity · easy · runs alongside the wind turbine ──
  "elec-polarity-e1": card({
    id: "elec-polarity-e1",
    cardName: "Swap the wires",
    title: "polarity — swap the wires, the motor reverses",
    question: "what happens to the motor when we swap the two wires around?",
    goal: "the child runs the motor, swaps + and −, and sees the motor spin the other way.",
    tier: "easy",
    materials: BLOCKS.polarity,
    skillIds: ["ou", "bm"],
    conceptQuestion: "what did swapping the wires change about the motor?",
  }),
  "elec-polarity-e2": card({
    id: "elec-polarity-e2",
    cardName: "The led only lights one way",
    title: "polarity — the led only lights one way",
    question: "does the led care which way round it is connected?",
    goal: "the child connects the LED both ways round and finds that it only lights in one direction.",
    tier: "easy",
    materials: BLOCKS.polarity,
    skillIds: ["ou", "ps"],
    conceptQuestion: "why does the led light one way round but not the other?",
  }),
  "elec-polarity-e3": card({
    id: "elec-polarity-e3",
    cardName: "Predict the spin",
    title: "polarity — predict which way it will spin",
    question: "looking at the wires, can you say which way the motor will turn before you switch it on?",
    goal: "the child predicts the motor's direction from how the wires are connected, then tests the prediction.",
    tier: "easy",
    materials: BLOCKS.polarity,
    skillIds: ["ou", "pe"],
    conceptQuestion: "what did you look at to decide which way it would spin?",
  }),
  "elec-polarity-e4": card({
    id: "elec-polarity-e4",
    cardName: "Make it spin the way i ask",
    title: "polarity — make it spin the way i ask",
    question: "can you wire the motor so it spins the exact way i ask for?",
    goal: "the child is given a direction and wires the motor to spin that way on the first try.",
    tier: "easy",
    materials: BLOCKS.polarity,
    skillIds: ["bm", "ou", "pe"],
    conceptQuestion: "how did you decide which wire went where?",
  }),

  // ── control · medium · runs alongside the soccer bot ──
  "elec-control-e1": card({
    id: "elec-control-e1",
    cardName: "The direction switch",
    title: "control — a switch flips the motor's direction",
    question: "can we reverse the motor without pulling any wires out?",
    goal: "the child wires the direction (DPDT) block so one press reverses the motor with no rewiring.",
    tier: "medium",
    materials: BLOCKS.control,
    skillIds: ["bm", "ou"],
    conceptQuestion: "what is the direction switch doing to the electricity?",
  }),
  "elec-control-e2": card({
    id: "elec-control-e2",
    cardName: "One switch each",
    title: "control — each motor gets its own direction switch",
    question: "how do we control two motors separately?",
    goal: "the child gives each motor its own direction switch and drives them independently.",
    tier: "medium",
    materials: BLOCKS.control,
    skillIds: ["bm", "ps"],
    conceptQuestion: "why does each motor need its own switch?",
  }),
  "elec-control-e3": card({
    id: "elec-control-e3",
    cardName: "Steer with two motors",
    title: "control — steer with two motors",
    question: "how do two motors make the bot turn instead of going straight?",
    goal: "the child runs the two motors in different directions to make the bot turn on the spot.",
    tier: "medium",
    materials: BLOCKS.control,
    skillIds: ["ou", "ps", "bm"],
    conceptQuestion: "what did the two motors have to be doing for it to turn?",
  }),
  "elec-control-e4": card({
    id: "elec-control-e4",
    cardName: "Drive a set path",
    title: "control — drive a set path: forward, reverse, turn",
    question: "can you drive the bot along a path we mark out — forward, reverse, and a turn?",
    goal: "the child plans and drives a marked path using the direction switches, correcting as they go.",
    tier: "medium",
    materials: [...BLOCKS.control, "Floor tape to mark the path"],
    skillIds: ["ps", "bm", "pe"],
    conceptQuestion: "which switch did what, at each part of the path?",
  }),

  // ── power-sharing · medium · runs alongside the cleaning bot ──
  "elec-power-e1": card({
    id: "elec-power-e1",
    cardName: "Flip direction with three motors",
    title: "power-sharing — flip direction with three motors running",
    question: "can we still reverse the motors once three of them are running together?",
    goal: "the child runs three motors from one battery and reverses them together with the direction block.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["bm", "ps"],
    conceptQuestion: "did adding more motors change what the direction switch does?",
  }),
  "elec-power-e2": card({
    id: "elec-power-e2",
    cardName: "Parallel — its own path",
    title: "power-sharing — a parallel circuit gives each part its own path",
    question: "what happens when each part gets its own path back to the battery?",
    goal: "the child wires parts in parallel and sees each one keep working when another is removed.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["ou", "bm"],
    conceptQuestion: "what happened to the others when you took one part out?",
  }),
  "elec-power-e3": card({
    id: "elec-power-e3",
    cardName: "Series — one shared path",
    title: "power-sharing — a series circuit shares one path",
    question: "what happens when all the parts have to share one single path?",
    goal: "the child wires parts in series and finds that breaking the line stops everything.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["ou", "ps"],
    conceptQuestion: "why did everything stop when you removed just one part?",
  }),
  "elec-power-e4": card({
    id: "elec-power-e4",
    cardName: "The speed dial",
    title: "power-sharing — a dial changes the motor's speed",
    question: "can we make the motor run faster and slower without changing the battery?",
    goal: "the child uses the speed (potentiometer) block to dial the motor faster and slower.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["bm", "ou"],
    conceptQuestion: "what is the dial changing about the electricity reaching the motor?",
  }),
  "elec-power-e5": card({
    id: "elec-power-e5",
    cardName: "Three motors, one battery",
    title: "power-sharing — run three motors from one battery",
    question: "can one battery do three jobs at once?",
    goal: "the child powers three motors from a single battery and keeps all three running.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["bm", "ps", "ou"],
    conceptQuestion: "how did you share one battery between three motors?",
  }),
  "elec-power-e6": card({
    id: "elec-power-e6",
    cardName: "Series vs parallel",
    title: "power-sharing — compare series vs parallel",
    question: "which arrangement keeps the parts brighter and stronger — series or parallel?",
    goal: "the child builds the same parts both ways, compares the result, and explains the difference.",
    tier: "medium",
    materials: BLOCKS.power,
    skillIds: ["ou", "pe"],
    conceptQuestion: "which way was brighter, and why?",
    note: "Pitched at ages 8–12 — the comparison is the point. At 5–8 run it as a simpler \"which one looks brighter?\" observation.",
  }),

  // ── sensing · difficult · runs alongside the sensor-controlled crane ──
  "elec-sensing-e1": card({
    id: "elec-sensing-e1",
    cardName: "The sensor tells the driver",
    title: "sensing — a sensor tells the driver when to run the motor",
    question: "how does the machine know when to start on its own?",
    goal: "the child wires the IR sensor to the motor driver so the motor runs only when the sensor sees something.",
    tier: "difficult",
    materials: BLOCKS.sensing,
    skillIds: ["bm", "ou"],
    conceptQuestion: "which part was the input, and which was the output?",
  }),
  "elec-sensing-e2": card({
    id: "elec-sensing-e2",
    cardName: "The sensor changes direction",
    title: "sensing — a sensor changes the motor's direction",
    question: "can the sensor decide which way the motor turns?",
    goal: "the child sets up the driver so the sensor reverses the motor instead of just starting it.",
    tier: "difficult",
    materials: BLOCKS.sensing,
    skillIds: ["bm", "ps"],
    conceptQuestion: "what decision is the driver making for the motor?",
  }),
  "elec-sensing-e3": card({
    id: "elec-sensing-e3",
    cardName: "Two sensors",
    title: "sensing — two sensors drive forward and back",
    question: "what can the machine do when it has two sets of eyes?",
    goal: "the child wires two sensors so one drives the motor forward and the other drives it back.",
    tier: "difficult",
    materials: [...BLOCKS.sensing, "IR sensor block — 2nd"],
    skillIds: ["bm", "ps", "ou"],
    conceptQuestion: "how does the driver know which sensor is talking?",
  }),
  "elec-sensing-e4": card({
    id: "elec-sensing-e4",
    cardName: "Tune the distance",
    title: "sensing — tune how close the sensor must be",
    question: "how close does something have to get before the sensor notices?",
    goal: "the child adjusts the sensor and measures the distance at which it reliably triggers.",
    tier: "difficult",
    materials: [...BLOCKS.sensing, "Measuring tape"],
    skillIds: ["ou", "ps", "pe"],
    conceptQuestion: "at what distance did it trigger every single time?",
  }),
  "elec-sensing-e5": card({
    id: "elec-sensing-e5",
    cardName: "Servo to an exact position",
    title: "sensing — a servo moves to an exact position",
    question: "can a motor stop at exactly the place we choose?",
    goal: "the child uses the servo and its tester to move the arm to an exact position and hold it there.",
    tier: "difficult",
    materials: [
      "Circuit Card (laminated, wipe-clean)",
      "Power block (battery & holder)",
      "Jumper wires",
      "Servo motor + tester",
    ],
    skillIds: ["bm", "ou"],
    conceptQuestion: "how is the servo different from the motors you used before?",
    note: "✚ extension card — for children who finish early. Optional, never required.",
  }),
  "elec-sensing-e6": card({
    id: "elec-sensing-e6",
    cardName: "Light sensor switches an led",
    title: "sensing — a light sensor switches an led",
    question: "can the circuit switch itself on when the room goes dark?",
    goal: "the child wires the LDR so the LED comes on in the dark, like an automatic street light.",
    tier: "difficult",
    materials: [
      "Circuit Card (laminated, wipe-clean)",
      "Power block (battery & holder)",
      "Jumper wires",
      "LDR sensor block",
      "LED block",
      "Resistor block",
    ],
    skillIds: ["bm", "ou", "pe"],
    conceptQuestion: "what is the ldr telling the circuit?",
    note: "✚ extension card — for children who finish early. Optional, never required.",
  }),
};

// ─── Build models (5) ───────────────────────────────────────
// Step-cards for these models are being added by the operator. These
// entries deliberately carry the model, its concept and the day arc —
// and do not invent step-by-step build instructions.

function buildModel(o: {
  id: string;
  title: string;
  model: string;
  concept: string;
  days: number;
  what: string;
}): CurriculumActivity {
  return {
    id: o.id,
    segment: "build",
    title: o.title,
    cardName: o.model,
    setupLine: `${o.what} built over ${o.days} sessions — one stage a day, from a personal kit and a step card.`,
    howToPlay:
      "A 5-minute engage question opens the segment, then each child builds their own model from their personal kit and the step card, one stage a day. The educator never fixes and never tells — they ask, and let the child find it. The model is completed, tested, improved, and taken apart across the day arc.",
    players: "each child builds their own · 1 educator",
    duration: "40 min",
    goal: `the child builds a working ${o.model.toLowerCase()} and can explain the ${o.concept} that makes it work.`,
    endsWhen:
      "the model does its job, and the child can point to the part of the circuit that makes it happen.",
    skillIds: ["bm", "ps", "pe"],
    materials: [
      `Step card — ${o.model} (one stage per session)`,
      "Personal electronics kit — one per child",
    ],
    debriefPrompts: [],
    type: "physical-game",
    educatorNote:
      "The printed step card and model manual for this build are being added. Until they arrive, run the build from the kit's own stage sequence and keep the day arc below.",
  };
}

const buildActivities: Record<string, CurriculumActivity> = {
  "elec-build-parking-barrier": buildModel({
    id: "elec-build-parking-barrier",
    title: "parking barrier build",
    model: "Parking Barrier",
    concept: "open & closed circuit",
    days: 5,
    what: "a parking barrier that raises and lowers on a switch —",
  }),
  "elec-build-wind-turbine": buildModel({
    id: "elec-build-wind-turbine",
    title: "wind turbine build",
    model: "Wind Turbine",
    concept: "polarity",
    days: 4,
    what: "a wind turbine whose blades spin the way you wire them —",
  }),
  "elec-build-soccer-bot": buildModel({
    id: "elec-build-soccer-bot",
    title: "soccer bot build",
    model: "Soccer Bot",
    concept: "polarity reversal",
    days: 4,
    what: "a two-motor soccer bot you can drive and steer —",
  }),
  "elec-build-cleaning-bot": buildModel({
    id: "elec-build-cleaning-bot",
    title: "cleaning bot build",
    model: "Cleaning Bot",
    concept: "sharing power between many jobs",
    days: 6,
    what: "a cleaning bot that runs three motors from one battery —",
  }),
  "elec-build-sensor-crane": buildModel({
    id: "elec-build-sensor-crane",
    title: "sensor-controlled crane build",
    model: "Sensor-controlled Crane",
    concept: "input and output",
    days: 6,
    what: "a crane that senses what is near it and responds —",
  }),
};

// ─── Experience book ────────────────────────────────────────

const experienceBookActivity: CurriculumActivity = {
  id: "elec-experience-book",
  segment: "experience-book",
  title: "experience book",
  setupLine:
    "ten minutes at the end of every session. each child records what they discovered and ticks off the words and skills they can now use.",
  howToPlay:
    "The educator fills in four things per child: the experiment card name, the build day, the ability seen clearly today for each of the four skills (B&M, O&U, PS, P&E), and one specific note. The child ticks the electronics words they can now use — circuit, open & closed, conductor, insulator, resistance, polarity, series, parallel, input, output. Always close with the 3-move debrief: name what you saw (linked to an ability) · name the next step (the next ability up) · ask one concept question to the group.",
  materials: [
    "My Robotics Experience Book — level 2, electronics (per child)",
    "Ability Reference card (inside cover)",
    "Electronics word list (inside back cover)",
  ],
  debriefPrompts: [],
  type: "facilitated",
};

// ─── Skills — the same ladders as level 1, plus presenting & explaining ─
// "the same skills run through every robotics level, so progress carries
// across" — so the B&M / PS / O&U ability ladders are unchanged. P&E is
// newly added at this level.

const skillAreas: CurriculumSkillArea[] = [
  {
    id: "bm",
    name: "building & making",
    shortName: "B&M",
    abilities: [
      { name: "Fit", description: "connects the blocks so they sit correctly and the circuit carries power" },
      { name: "Follow", description: "reads the circuit card and builds it in the right order" },
      { name: "Adjust", description: "fixes a connection that isn't working — reseats, reroutes, reconnects" },
      { name: "Improve", description: "makes one deliberate change to make the circuit work better — and checks whether it worked", isNorthStar: true },
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      { name: "Observe", description: "looks closely and identifies what the circuit is actually doing" },
      { name: "Trace", description: "follows the path of the electricity around the loop, block by block" },
      { name: "Predict", description: "says what the circuit will do before switching it on — without being prompted" },
      { name: "Explain", description: "explains why the circuit behaves that way, using a clear reason", isNorthStar: true },
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      { name: "Notice", description: "recognises that the circuit isn't working — without being told" },
      { name: "Isolate", description: "narrows the fault down to one part of the loop instead of guessing" },
      { name: "Fix", description: "finds the break in the circuit and repairs it" },
      { name: "Persist", description: "keeps working through a stubborn fault without giving up", isNorthStar: true },
    ],
  },
  {
    id: "pe",
    name: "presenting & explaining",
    shortName: "P&E",
    abilities: [
      { name: "Show", description: "shows their circuit to the group and points out the parts" },
      { name: "Name", description: "names the blocks and the concepts using the real electronics words" },
      { name: "Explain", description: "explains how and why the circuit works — not just what it does" },
      { name: "Answer", description: "answers a question about their circuit with a clear reason", isNorthStar: true },
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
      "children work in small groups of 2–4 on one game card, finding the answer to a single question. every child gets hands on the blocks. cards run easy → medium → difficult, and a child only moves up a tier when the one below is secure. the educator asks one question per group and never gives the answer.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "a 5-minute engage question opens the segment, then each child builds their own model from a personal kit and a step card — one stage a day. a model runs over several days, with one game card sitting alongside each build session.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "experience-book",
    name: "experience book",
    durationRange: "10 min",
    objective:
      "each child records what they discovered and ticks off the words and skills they can now use. close with the three-move debrief: name what you saw · name the next step · one concept question.",
    type: "fixed",
  },
];

// ─── Session table — 25 days across five models ─────────────

/** Day arc: explore → make → complete and test → improve and disassemble. */
function dayLabel(day: number, total: number): string {
  if (day === 1) return "Day 1 — Explore";
  if (day === total) return `Day ${day} — Improve and Disassemble`;
  if (day === total - 1) return `Day ${day} — Complete and Test`;
  return `Day ${day} — Make`;
}

function s(
  sessionNumber: number,
  experiment: string,
  buildModel: string,
  buildId: string,
  buildDay: number,
  totalDays: number,
  conceptQuestion: string
): CurriculumSessionEntry {
  return {
    sessionNumber,
    experiment,
    build: buildId,
    experienceBook: "elec-experience-book",
    buildModel,
    buildDay,
    buildDayLabel: dayLabel(buildDay, totalDays),
    topicLayer: 2,
    conceptQuestion,
  };
}

const sessionTable: CurriculumSessionEntry[] = [
  // ── Parking Barrier · 5 days · open & closed circuits ──
  s(1, "elec-circuits-e1", "Parking Barrier", "elec-build-parking-barrier", 1, 5,
    "why must we never join + straight to −?"),
  s(2, "elec-circuits-e2", "Parking Barrier", "elec-build-parking-barrier", 2, 5,
    "which things carried the electricity, and what did they all have in common?"),
  s(3, "elec-circuits-e3", "Parking Barrier", "elec-build-parking-barrier", 3, 5,
    "what happens to the led if we break the loop anywhere?"),
  s(4, "elec-circuits-e4", "Parking Barrier", "elec-build-parking-barrier", 4, 5,
    "what is the switch actually doing to the loop?"),
  s(5, "elec-circuits-e5", "Parking Barrier", "elec-build-parking-barrier", 5, 5,
    "what would happen to the led without the resistor?"),

  // ── Wind Turbine · 4 days · polarity ──
  s(6, "elec-polarity-e1", "Wind Turbine", "elec-build-wind-turbine", 1, 4,
    "what did swapping the wires change about the motor?"),
  s(7, "elec-polarity-e2", "Wind Turbine", "elec-build-wind-turbine", 2, 4,
    "why does the led light one way round but not the other?"),
  s(8, "elec-polarity-e3", "Wind Turbine", "elec-build-wind-turbine", 3, 4,
    "what did you look at to decide which way it would spin?"),
  s(9, "elec-polarity-e4", "Wind Turbine", "elec-build-wind-turbine", 4, 4,
    "how did you decide which wire went where?"),

  // ── Soccer Bot · 4 days · polarity reversal ──
  s(10, "elec-control-e1", "Soccer Bot", "elec-build-soccer-bot", 1, 4,
    "what is the direction switch doing to the electricity?"),
  s(11, "elec-control-e2", "Soccer Bot", "elec-build-soccer-bot", 2, 4,
    "why does each motor need its own switch?"),
  s(12, "elec-control-e3", "Soccer Bot", "elec-build-soccer-bot", 3, 4,
    "what did the two motors have to be doing for it to turn?"),
  s(13, "elec-control-e4", "Soccer Bot", "elec-build-soccer-bot", 4, 4,
    "which switch did what, at each part of the path?"),

  // ── Cleaning Bot · 6 days · one battery, many jobs ──
  s(14, "elec-power-e1", "Cleaning Bot", "elec-build-cleaning-bot", 1, 6,
    "did adding more motors change what the direction switch does?"),
  s(15, "elec-power-e2", "Cleaning Bot", "elec-build-cleaning-bot", 2, 6,
    "what happened to the others when you took one part out?"),
  s(16, "elec-power-e3", "Cleaning Bot", "elec-build-cleaning-bot", 3, 6,
    "why did everything stop when you removed just one part?"),
  s(17, "elec-power-e4", "Cleaning Bot", "elec-build-cleaning-bot", 4, 6,
    "what is the dial changing about the electricity reaching the motor?"),
  s(18, "elec-power-e5", "Cleaning Bot", "elec-build-cleaning-bot", 5, 6,
    "how did you share one battery between three motors?"),
  s(19, "elec-power-e6", "Cleaning Bot", "elec-build-cleaning-bot", 6, 6,
    "which way was brighter — series or parallel — and why?"),

  // ── Sensor-controlled Crane · 6 days · input & output ──
  s(20, "elec-sensing-e1", "Sensor-controlled Crane", "elec-build-sensor-crane", 1, 6,
    "which part was the input, and which was the output?"),
  s(21, "elec-sensing-e2", "Sensor-controlled Crane", "elec-build-sensor-crane", 2, 6,
    "what decision is the driver making for the motor?"),
  s(22, "elec-sensing-e3", "Sensor-controlled Crane", "elec-build-sensor-crane", 3, 6,
    "how does the driver know which sensor is talking?"),
  s(23, "elec-sensing-e4", "Sensor-controlled Crane", "elec-build-sensor-crane", 4, 6,
    "at what distance did it trigger every single time?"),
  s(24, "elec-sensing-e5", "Sensor-controlled Crane", "elec-build-sensor-crane", 5, 6,
    "how is the servo different from the motors you used before?"),
  s(25, "elec-sensing-e6", "Sensor-controlled Crane", "elec-build-sensor-crane", 6, 6,
    "what is the light sensor telling the circuit?"),
];

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 5,
    descriptors: [
      { skillArea: "B&M", beginning: "needs help to seat the blocks so power flows (Fit)", developing: "reads the circuit card and builds it in order (Follow)", secure: "fixes a connection that isn't working without being told (Adjust)" },
      { skillArea: "O&U", beginning: "watches but does not notice specifics", developing: "identifies what the circuit is doing (Observe)", secure: "follows the path of the electricity around the loop (Trace)" },
      { skillArea: "PS", beginning: "waits to be told what is wrong", developing: "notices the circuit isn't working (Notice)", secure: "narrows the fault to one part of the loop (Isolate)" },
      { skillArea: "P&E", beginning: "shows the circuit without words", developing: "shows and points out the parts (Show)", secure: "names the blocks using the real words (Name)" },
    ],
  },
  {
    afterSession: 13,
    descriptors: [
      { skillArea: "B&M", beginning: "builds from the card in order (Follow)", developing: "adjusts a failing connection independently (Adjust)", secure: "makes a deliberate change to make the circuit work better and checks it (Improve ★)" },
      { skillArea: "O&U", beginning: "traces the loop with prompts (Trace)", developing: "says what the circuit will do before switching on (Predict)", secure: "explains why the circuit behaves that way (Explain ★)" },
      { skillArea: "PS", beginning: "isolates the fault to one area (Isolate)", developing: "finds the break and repairs it (Fix)", secure: "keeps going through a stubborn fault (Persist ★)" },
      { skillArea: "P&E", beginning: "names some blocks (Name)", developing: "explains how the circuit works (Explain)", secure: "answers a question about it with a clear reason (Answer ★)" },
    ],
  },
  {
    afterSession: 25,
    descriptors: [
      { skillArea: "B&M", beginning: "adjusts independently (Adjust)", developing: "improves the circuit deliberately (Improve)", secure: "builds a machine that senses and responds, and improves it on purpose (Improve ★)" },
      { skillArea: "O&U", beginning: "predicts before switching on (Predict)", developing: "gives a reason for what happened (Explain)", secure: "predicts and proves how a circuit behaves — linked to what was observed (Explain ★)" },
      { skillArea: "PS", beginning: "finds and fixes a break (Fix)", developing: "fixes faults across a multi-part circuit (Fix)", secure: "persists through repeated faults to get the machine working (Persist ★)" },
      { skillArea: "P&E", beginning: "explains with prompting (Explain)", developing: "explains in real electronics words (Explain)", secure: "explains how and why it works, then answers a question about it (Answer ★)" },
    ],
  },
];

// ─── Model ↔ experiment pairings ────────────────────────────

const modelPairings: ModelPairing[] = [
  { model: "Parking Barrier", topic: "Open & closed circuits",
    why: "A parking barrier is a loop that is deliberately broken and rejoined — which is exactly what a switch does. Its cards build the first complete circuit, add the switch, and protect the LED with a resistor." },
  { model: "Wind Turbine", topic: "Polarity",
    why: "A turbine's blades spin whichever way the wires say. Its cards are the polarity cards — swap the wires and the motor reverses — so the child wires the spin they want on purpose." },
  { model: "Soccer Bot", topic: "Polarity reversal",
    why: "A soccer bot has to go forward, back and turn on demand. Its cards give each motor a direction switch and then steer with two motors — the exact control the bot is driven with." },
  { model: "Cleaning Bot", topic: "One battery, many jobs",
    why: "A cleaning bot runs several motors at once from one battery. Its cards are the power-sharing cards — series, parallel, and a speed dial — which is how the bot shares its power." },
  { model: "Sensor-controlled Crane", topic: "Input & output",
    why: "A sensing crane reacts to what is near it. Its cards wire a sensor (input) through the driver to a motor (output) — the decision-making the crane is built on." },
];

// ─── Level 2 reference — concepts, glossary, components ─────

const foundationalConcepts = [
  { name: "a circuit is a complete loop", body: "electricity only flows when the ring is joined; break it anywhere and it stops." },
  { name: "a switch opens and closes the loop", body: "on purpose, on demand." },
  { name: "a resistor keeps the flow safe", body: "parts like the LED need protecting or they burn out." },
  { name: "conductors carry, insulators block", body: "metal lets electricity through; plastic and rubber don't — that's why wires wear a coat." },
  { name: "electricity has a direction (polarity)", body: "swap + and −, and the motor reverses, the LED stops lighting." },
  { name: "you can flip the direction on demand", body: "a direction switch reverses a motor with no rewiring; two motors let you steer." },
  { name: "one battery can do many jobs", body: "run several outputs, sharing power in parallel (each its own path) or series (one shared path)." },
  { name: "you can dial how much power flows", body: "a speed dial changes how fast a motor runs." },
  { name: "machines can sense and respond", body: "a sensor is the input, the motor or LED is the output, and the driver decides between them." },
];

const glossary = [
  { term: "circuit / loop", inChildsWords: "the complete ring electricity travels around" },
  { term: "open & closed", inChildsWords: "closed = joined and working; open = a gap, nothing flows" },
  { term: "conductor / insulator", inChildsWords: "metal carries electricity; plastic and rubber block it" },
  { term: "resistance", inChildsWords: "slows the flow; protects parts like the LED" },
  { term: "polarity", inChildsWords: "electricity's direction — the + side and the − side" },
  { term: "polarity reversal", inChildsWords: "swapping the direction so the motor spins the other way" },
  { term: "series / parallel", inChildsWords: "joined in one shared line, or each part given its own path" },
  { term: "input / output", inChildsWords: "what a machine senses (sensor) · what a machine does (motor, LED)" },
];

const components = [
  { block: "power block (battery & holder)", whatItIs: "gives power; the holder keeps the battery safe and connected" },
  { block: "jumper wires", whatItIs: "roads for electricity — connect the parts so power can travel" },
  { block: "LED block", whatItIs: "lights up when it gets safe power" },
  { block: "resistor block", whatItIs: "reduces the power to keep the LED safe" },
  { block: "switch block", whatItIs: "turns the circuit on and off" },
  { block: "motor block", whatItIs: "changes electricity into movement — spins wheels, fans, robots" },
  { block: "direction (DPDT) block", whatItIs: "a direction button — motor forward or backward, no coding" },
  { block: "speed (potentiometer) block", whatItIs: "controls the speed of the motor" },
  { block: "motor clamp", whatItIs: "a strong hand that holds the motor while it spins" },
  { block: "IR sensor block", whatItIs: "the robot's eyes — sees objects or follows a path without touching" },
  { block: "motor driver block", whatItIs: "like the brain — listens to sensors and tells motors and LEDs when to go" },
  { block: "LDR sensor block", whatItIs: "a light detector — tells the robot bright or dark; used in automatic lights" },
  { block: "servo motor + tester", whatItIs: "a smart motor that stops at an exact position; the tester moves it to try it out" },
];

// ─── Programmes ─────────────────────────────────────────────

const shared = {
  title: "robotics",
  category: "stem" as const,
  level: 2,
  levelName: "electronics",
  heroImageUrl: "/prog-stem-5-8.gif",
  tagline: "build real circuits and make machines light up, move, and sense the world.",
  totalSessions: 25,
  skillAreas,
  segmentDefinitions,
  sessionTable,
  activities: {
    ...experimentActivities,
    ...buildActivities,
    "elec-experience-book": experienceBookActivity,
  },
  checkpoints,
  modelPairings,
  foundationalConcepts,
  glossary,
  components,
};

const DESCRIPTION =
  "level 2 — electronics. across five models — parking barrier, wind turbine, soccer bot, cleaning bot, and sensor-controlled crane — children run experiments on circuits, polarity, sharing power, and sensors, then build a machine that uses what they just discovered. they finish able to look at a circuit and explain why it works — and build one that senses and responds. no mechanics background is needed: this level starts from the very first circuit.";

export const roboticsElectronics58: CurriculumProgramme = {
  ...shared,
  id: "robotics-electronics-5-8",
  slug: "robotics-electronics-5-8",
  trackSlug: "robotics-5-8",
  ageGroup: "5-8",
  ageLabel: "ages 5–8",
  description: DESCRIPTION,
};

export const roboticsElectronics812: CurriculumProgramme = {
  ...shared,
  id: "robotics-electronics-8-12",
  slug: "robotics-electronics-8-12",
  trackSlug: "robotics-8-12",
  ageGroup: "8-12",
  ageLabel: "ages 8–12",
  heroImageUrl: "/prog-stem-8-12.gif",
  description:
    DESCRIPTION +
    " at 8–12, observing & understanding becomes comparing and proving — brighter or dimmer, faster or slower, at what distance it triggers — and children draw their circuits as schematics.",
};
