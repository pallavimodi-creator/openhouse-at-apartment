/**
 * Robotics · Level 2 — Electronics (ages 5–8 and 8–12).
 *
 * Authored from the operator's at-apartment website copy. Both age groups
 * share the same 23-day spine (5 models, one cue card alongside each
 * build session — repeated to fill a model's remaining days); they differ
 * in how far observing & understanding is pushed: at 8–12 it becomes
 * comparing, proving, and drawing circuits as schematics.
 *
 * Source-true notes:
 *  - The experiment cards are the real Electronic Cue Cards deck; the
 *    session order + repeats follow the operator's model↔card table.
 *  - Each build links its real model manual (crane included).
 *  - Card + model images are extracted per page and shown in the library.
 *  - ✚ marks an optional early-finisher extension, flagged in the
 *    activity's educatorNote; spare cards sit in the library, unscheduled.
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

const CUE_CARDS = "/robotics-manuals/elec-cue-cards.pdf";
const COMPONENT_GALLERY = "/robotics-manuals/elec-component-gallery.pdf";
const TEACHER_REFERENCE = "/robotics-manuals/elec-teacher-reference.pdf";

/** Every card is a "make it work" task, not a worksheet. */
const HOW_A_CARD_RUNS =
  "Children work in small groups of 2–4 on this one card while today's build waits. The card is a \"make it work\" task, not a worksheet — the children connect the blocks until the thing actually happens. Most cards carry a missing-wire challenge (a \"?\"): the connection is left out on purpose and the children work it out themselves. The educator asks one question per group and never gives the answer — the child tries, tests, and fixes. Every child gets hands on the blocks.";

/**
 * One entry per printed card in the Electronic Cue Cards deck. `task` is
 * the card's own wording, kept verbatim so what the educator reads on
 * screen matches the laminated card in their hand.
 */
function card(o: {
  id: string;
  name: string;
  tier: "easy" | "medium" | "difficult";
  circuit: number;
  task: string;
  goal: string;
  blocks: string[];
  skillIds: string[];
  note?: string;
}): CurriculumActivity {
  return {
    id: o.id,
    segment: "experiment",
    title: `${o.name} · ${o.tier} · circuit ${o.circuit}`,
    cardName: o.name,
    setupLine: o.task,
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
    materials: ["Electronic cue card — " + o.name, ...o.blocks],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads the card and names the blocks. Child connects and says what happened." },
      { level: "Medium", description: "Child reads the card, builds the circuit, and works out the missing wire themselves." },
      { level: "Hard", description: "Child predicts before connecting — \"this will happen because…\" — then tests and explains the result in real electronics words." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: CUE_CARDS,
    referenceLinks: [
      { label: "component gallery — name every block", url: COMPONENT_GALLERY },
      { label: "electronics teacher reference", url: TEACHER_REFERENCE },
    ],
    educatorNote: o.note,
  };
}

const POWER = "Power block (battery & holder)";
const WIRES = "Jumper wires";
const LED = "LED block";
const RES = "Resistor block";
const SW = "Switch block";
const MOTOR = "Motor block";
const DPDT = "Direction (DPDT) block";
const POT = "Speed (potentiometer) block";
const IR = "IR sensor block";
const DRIVER = "Motor driver block";
const LDR = "LDR sensor block";
const SERVO = "Servo motor + tester";
const CLAMP = "Motor clamp";

// ─── Experiment cards — the real Electronic Cue Cards deck ──
// 21 printed cards. Safety is taught aloud from the teacher reference on
// day one (see the railway barrier build note), not as a card.

const experimentActivities: Record<string, CurriculumActivity> = {
  // ── easy ──
  "elec-c-resistor-led": card({
    id: "elec-c-resistor-led", name: "resistor block & led block", tier: "easy", circuit: 1,
    task: "Connect all blocks as per the circuit below such that the LED lights up when it gets safe power.",
    goal: "the child completes the loop so the LED lights, with the resistor protecting it.",
    blocks: [POWER, WIRES, LED, RES], skillIds: ["bm", "ou", "ps"],
  }),
  "elec-c-switch": card({
    id: "elec-c-switch", name: "switch block", tier: "easy", circuit: 2,
    task: "Connect all blocks in a circuit and place the switch such that the LED turns on when the switch is ON.",
    goal: "the child places a switch in the loop so the LED can be turned on and off on demand.",
    blocks: [POWER, WIRES, LED, RES, SW], skillIds: ["bm", "ou"],
  }),
  "elec-c-motor": card({
    id: "elec-c-motor", name: "motor block", tier: "easy", circuit: 3,
    task: "Task A: Connect the battery to the motor and observe the motor spin. Task B: Reverse the wire connections and observe how the motor spins in the opposite direction.",
    goal: "the child runs the motor, then reverses the wires and sees it spin the other way.",
    blocks: [POWER, WIRES, MOTOR, CLAMP], skillIds: ["ou", "bm"],
  }),
  "elec-c-dpdt": card({
    id: "elec-c-dpdt", name: "dpdt block", tier: "easy", circuit: 4,
    task: "Connect the battery and motor through the DPDT block. Press the DPDT switch to change the direction of the motor.",
    goal: "the child reverses the motor with one press — no rewiring.",
    blocks: [POWER, WIRES, MOTOR, DPDT, CLAMP], skillIds: ["bm", "ou"],
  }),
  "elec-c-dual-dpdt": card({
    id: "elec-c-dual-dpdt", name: "dual dpdt circuit", tier: "easy", circuit: 5,
    task: "Connect each motor to its own DPDT switch and to the battery. Press each DPDT switch to control each motor's direction.",
    goal: "the child gives each motor its own direction switch and drives them independently.",
    blocks: [POWER, WIRES, "Motor block — 2", "Direction (DPDT) block — 2", CLAMP], skillIds: ["bm", "ps"],
  }),
  "elec-c-pot": card({
    id: "elec-c-pot", name: "potentiometer block", tier: "easy", circuit: 6,
    task: "Connect the battery and motor through the potentiometer block. Turn the knob to control the speed of the motor.",
    goal: "the child dials the motor faster and slower without changing the battery.",
    blocks: [POWER, WIRES, MOTOR, POT, CLAMP], skillIds: ["bm", "ou"],
  }),
  "elec-c-driver-ir": card({
    id: "elec-c-driver-ir", name: "motor driver + ir sensor", tier: "easy", circuit: 7,
    task: "Connect the IR sensor to the motor driver and connect the motor to the driver outputs. The IR sensor's signal will tell the motor driver when to run the motor, such that the motor moves only when the IR sensor is activated.",
    goal: "the child wires a sensor (input) through the driver to a motor (output) so it runs only when the sensor sees something.",
    blocks: [POWER, WIRES, IR, DRIVER, MOTOR], skillIds: ["bm", "ou"],
  }),

  // ── medium ──
  "elec-c-dpdt-motor": card({
    id: "elec-c-dpdt-motor", name: "dpdt block + motor block", tier: "medium", circuit: 1,
    task: "Control motor block (A) using a dpdt block while motor block (B) should remain ON. Can you complete the missing wire in the circuit?",
    goal: "the child flips one motor's direction while a second motor keeps running.",
    blocks: [POWER, WIRES, "Motor block — 2", DPDT, CLAMP], skillIds: ["bm", "ps"],
  }),
  "elec-c-series": card({
    id: "elec-c-series", name: "series circuit", tier: "medium", circuit: 5,
    task: "Make a series circuit with the following and find the missing block and missing wire to complete the circuit.",
    goal: "the child builds one shared path and finds that breaking it stops everything.",
    blocks: [POWER, WIRES, "Lamp block — 3", "Resistor block — 2", SW], skillIds: ["ou", "ps"],
  }),
  "elec-c-parallel": card({
    id: "elec-c-parallel", name: "parallel circuit", tier: "medium", circuit: 4,
    task: "Make a parallel circuit with the following and find the missing block and missing wires to complete the circuit.",
    goal: "the child gives each part its own path and sees the others keep working when one is removed.",
    blocks: [POWER, WIRES, "LED block — 2", "Resistor block — 3"], skillIds: ["ou", "bm"],
  }),
  "elec-c-pot-dual-motor-series": card({
    id: "elec-c-pot-dual-motor-series", name: "potentiometer + dual motor blocks", tier: "medium", circuit: 2,
    task: "A circuit uses a pot block to control the speed of 2 motor blocks connected in series. Can you complete missing wire in the circuit and adjust the speed?",
    goal: "the child controls the speed of two motors sharing one path.",
    blocks: [POWER, WIRES, "Motor block — 2", POT, CLAMP], skillIds: ["bm", "ou"],
  }),
  "elec-c-pot-switch-parallel": card({
    id: "elec-c-pot-switch-parallel", name: "potentiometer + switch block", tier: "medium", circuit: 3,
    task: "Use a potentiometer block to control the speed of 2 motor blocks connected in parallel. The circuit needs to be turned ON/OFF using a switch block. Can you complete missing wire in the circuit and adjust the speed?",
    goal: "the child runs two motors on their own paths, dials their speed, and switches the whole thing on and off.",
    blocks: [POWER, WIRES, "Motor block — 2", POT, SW, CLAMP], skillIds: ["bm", "ps", "ou"],
  }),
  "elec-c-motor-led-generator": card({
    id: "elec-c-motor-led-generator", name: "motor + led", tier: "medium", circuit: 6,
    task: "Connect the Motor to the LED. Rotate the wheel to light up the LED!",
    goal: "the child turns the wheel by hand and generates enough power to light the LED — a motor working backwards.",
    blocks: [WIRES, MOTOR, LED, "Wheel"], skillIds: ["ou", "pe"],
    note: "This is the generating card — it is what makes the wind turbine an energy-generating model.",
  }),
  "elec-c-servo": card({
    id: "elec-c-servo", name: "servo motor + servo controller", tier: "medium", circuit: 7,
    task: "Control servo motor(a) using Servo controller(a) in manual mode and Servo motor (b) using servo controller(b) in Auto mode.",
    goal: "the child moves a servo to an exact position in manual mode, then lets it run in auto.",
    blocks: [POWER, WIRES, SERVO, "Servo controller — 2", DRIVER], skillIds: ["bm", "ou"],
    note: "✚ extension card — not on the timetable. Hand it to a group that finishes the crane's sensing cards early. Optional, never required.",
  }),

  // ── difficult ──
  "elec-c-ir-motor-direction": card({
    id: "elec-c-ir-motor-direction", name: "ir sensor + motor block", tier: "difficult", circuit: 1,
    task: "Use a motor driver to control a motor block. Control the direction of motor by swapping the Out PIN of the sensor with IN1 and IN2 of the motor driver. Can you complete the missing wire in the circuit and change the direction of the motor using the sensor?",
    goal: "the child makes the sensor decide which way the motor turns, not just whether it runs.",
    blocks: [POWER, WIRES, IR, DRIVER, MOTOR], skillIds: ["bm", "ps"],
  }),
  "elec-c-ir-range": card({
    id: "elec-c-ir-range", name: "ir sensor + motor block — range", tier: "difficult", circuit: 4,
    task: "Send a signal to the motor driver block using an IR sensor block. Adjust the range of the IR Sensor to detect objects that are close enough. Complete the missing wires in the circuit.",
    goal: "the child tunes the sensor so it triggers only when something is close enough.",
    blocks: [POWER, WIRES, IR, DRIVER, MOTOR, "Measuring tape"], skillIds: ["ou", "ps", "pe"],
  }),
  "elec-c-dual-ir-fwd-back": card({
    id: "elec-c-dual-ir-fwd-back", name: "dual ir sensor + motor", tier: "difficult", circuit: 5,
    task: "Use a motor driver to control a motor block. The signal to the motor block is sent through the IR Sensor block (A) to move forward and IR sensor block (B) to move backward. Can you complete the missing wire in the circuit and control the motors using the sensors?",
    goal: "the child uses two sensors — one drives the motor forward, the other drives it back.",
    blocks: [POWER, WIRES, "IR sensor block — 2", DRIVER, MOTOR], skillIds: ["bm", "ps", "ou"],
  }),
  "elec-c-dual-ir-circuit": card({
    id: "elec-c-dual-ir-circuit", name: "dual ir sensor circuit", tier: "difficult", circuit: 2,
    task: "Use a motor driver to control 2 motor blocks. The signal to the motor block (A) is sent through the IR sensor block(A) and the signal to the motor block (B) is sent through the IR sensor block(B). Can you complete the missing wire in the circuit and control the motors using the sensors?",
    goal: "the child wires two sensor–motor pairs so each sensor drives its own motor.",
    blocks: [POWER, WIRES, "IR sensor block — 2", DRIVER, "Motor block — 2"], skillIds: ["bm", "ps"],
    note: "Spare card — use it as a challenge for a group that finishes the scheduled sensing cards early.",
  }),
  "elec-c-dual-motor-ir-turn": card({
    id: "elec-c-dual-motor-ir-turn", name: "dual motor blocks + ir sensors", tier: "difficult", circuit: 3,
    task: "Use a motor driver to control 2 motor blocks. Motor block (A) must turn Right and Motor block (b) must turn left. Use the Sensor OUT pins to control the direction of the motors and complete the missing wires in the circuit.",
    goal: "the child drives two motors in opposite directions so the bot turns on the spot.",
    blocks: [POWER, WIRES, "IR sensor block — 2", DRIVER, "Motor block — 2"], skillIds: ["ps", "bm", "pe"],
  }),
  "elec-c-ldr-led": card({
    id: "elec-c-ldr-led", name: "ldr sensor + motor driver + led & resistor", tier: "difficult", circuit: 6,
    task: "Connect the LED to the Motor Driver. The input signal to the motor driver is sent using a LDR Sensor to turn LED ON/OFF.",
    goal: "the child makes the light sensor switch the LED — an automatic light.",
    blocks: [POWER, WIRES, LDR, DRIVER, LED, RES], skillIds: ["bm", "ou", "pe"],
    note: "✚ extension card — for children who finish early. Optional, never required.",
  }),
  "elec-c-ldr-ir-led": card({
    id: "elec-c-ldr-ir-led", name: "ldr sensor + ir sensor + motor driver + led & resistor", tier: "difficult", circuit: 7,
    task: "Connect the LED to the Motor Driver. The input signal to the motor driver is sent using a LDR Sensor to turn LED ON/OFF.",
    goal: "the child combines a light sensor and an IR sensor into one driver, switching two LEDs.",
    blocks: [POWER, WIRES, LDR, IR, DRIVER, "LED block — 2", "Resistor block — 2"], skillIds: ["bm", "ps", "pe"],
    note: "Spare card — the hardest in the deck. Use it as a challenge for a group that is fully secure on the sensing cards.",
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
  manual?: string;
  note?: string;
}): CurriculumActivity {
  return {
    id: o.id,
    segment: "build",
    title: o.title,
    cardName: o.model,
    setupLine: `${o.what} built over ${o.days} sessions — one stage a day, from a personal kit and the model manual.`,
    howToPlay:
      "A 5-minute engage question opens the segment, then each child builds their own model from their personal kit, following the model manual one stage a day. The educator never fixes and never tells — they ask, and let the child find it. The model is completed, tested, improved, and taken apart across the day arc.",
    players: "each child builds their own · 1 educator",
    duration: "40 min",
    goal: `the child builds a working ${o.model.toLowerCase()} and can explain the ${o.concept} that makes it work.`,
    endsWhen:
      "the model does its job, and the child can point to the part of the circuit that makes it happen.",
    skillIds: ["bm", "ps", "pe"],
    materials: [
      `Model manual — ${o.model}`,
      "Personal electronics kit — one per child",
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: o.manual,
    referenceLinks: [
      { label: "component gallery — name every block", url: COMPONENT_GALLERY },
      { label: "electronics teacher reference", url: TEACHER_REFERENCE },
    ],
    educatorNote:
      o.note ??
      (o.manual
        ? undefined
        : "The printed model manual for this build is still to come. Until it arrives, run the build from the kit's own stage sequence and keep the day arc below."),
  };
}

const buildActivities: Record<string, CurriculumActivity> = {
  "elec-build-railway-barrier": buildModel({
    id: "elec-build-railway-barrier",
    title: "railway barrier build",
    model: "Railway Barrier",
    concept: "open & closed circuit",
    days: 4,
    what: "a barrier that raises and lowers on a switch —",
    manual: "/robotics-manuals/elec-model-railway-barrier.pdf",
    note: "Day one of the whole level: before any building, say the safety points aloud from the teacher reference — the kit's battery blocks are safe, but never put anything in a wall socket, and never join + straight to − with nothing in between. Then start the switch cue card.",
  }),
  "elec-build-wind-turbine": buildModel({
    id: "elec-build-wind-turbine",
    title: "wind turbine build",
    model: "Wind Turbine",
    concept: "polarity",
    days: 4,
    what: "an energy-generating wind turbine whose spinning wheel lights an led —",
    manual: "/robotics-manuals/elec-model-wind-turbine.pdf",
  }),
  "elec-build-soccer-bot": buildModel({
    id: "elec-build-soccer-bot",
    title: "soccer bot build",
    model: "Soccer Bot",
    concept: "polarity reversal",
    days: 4,
    what: "a two-motor soccer bot you can drive and steer —",
    manual: "/robotics-manuals/elec-model-soccer-bot.pdf",
  }),
  "elec-build-cleaning-bot": buildModel({
    id: "elec-build-cleaning-bot",
    title: "cleaning bot build",
    model: "Cleaning Bot",
    concept: "sharing power between many jobs",
    days: 6,
    what: "a cleaning bot that runs several motors from one battery —",
    manual: "/robotics-manuals/elec-model-cleaning-bot.pdf",
  }),
  "elec-build-sensor-crane": buildModel({
    id: "elec-build-sensor-crane",
    title: "sensor-controlled crane build",
    model: "Sensor-controlled Crane",
    concept: "input and output",
    days: 5,
    what: "a crane that senses what is near it and responds —",
    manual: "/robotics-manuals/elec-model-crane.pdf",
  }),
};

// ─── Experience book (child-facing, 6 steps per machine) ────
// The electronics book is the CHILD's own portfolio — they explore,
// experiment, complete, build, solve and present largely on their own.
// The educator's job is to open the right page each day, prompt, and
// check the "present & reflect" page. Instructions below render in the
// day-plan popup so every educator fills it the same way.

const EB_STEPS = [
  { title: "1 · explore", body: "the child reads the machine's story, meets the words to know, does a quick 'your turn' tick, and reads the 'did you know'. open this on the first day of a new machine." },
  { title: "2 · experiment & observe", body: "the child runs the real circuit from today's cue card, circles their answer, and draws what they saw. this is the observing & understanding page — prompt, don't tell." },
  { title: "3 · complete the circuit", body: "the child finishes a circuit on paper — picks the missing block or draws the missing wire. check their choice against the loop." },
  { title: "4 · build & name", body: "the child builds the real model from their kit and cue card, ticks 'when it works', then draws their circuit and labels the named blocks. this is the building & making page." },
  { title: "5 · solve", body: "the child fixes a circuit that won't work and draws the fix — and you reinforce the safety line. this is the problem solving page." },
  { title: "6 · show", body: "the child shows the machine to a friend and says three things — what it is, its blocks, what it does — then writes what each new word means. this present & reflect page is your best check of real understanding." },
];

function experienceBook(ageSlug: "5-8" | "8-12"): CurriculumActivity {
  return {
    id: "elec-experience-book",
    segment: "experience-book",
    title: "experience book",
    setupLine:
      "the child's own portfolio — six pages per machine they complete themselves. ten minutes at the end of every session to move it forward.",
    howToPlay:
      "This book is the child's, not yours — the pages are written so a child can do them independently. Each machine has the same six steps (below), spread across its build days: explore on day one, then experiment, complete, build & name, solve and show as the machine progresses. Your job each session: open to the step that matches today, read the story or safety line aloud where needed, prompt with one question, and never give the answer. The four skills — observing & understanding, building & making, problem solving, and presenting & explaining — each climb one rung per machine, and the pages are named by skill so you can see the growth. The 'show' (present & reflect) page is the real assessment: listen to the child explain their machine and read what they wrote each word means.",
    namedBlocks: EB_STEPS,
    materials: [
      `My Robotics Experience Book — level 2, electronics (ages ${ageSlug === "5-8" ? "5–8" : "8–12"}), per child`,
      "Their circuit card and kit for the day",
    ],
    educatorNote: [
      "It is the child's book — guide and check, don't fill it in for them.",
      "5–8 completes circuits and answers by circling; 8–12 designs its own circuits and draws them as schematics.",
      "Close every session with the 3-move debrief: name what you saw · name the next rung up · ask one concept question to the group.",
      "The 'show' page is where you see real understanding — make time for it on each machine's last day.",
    ],
    debriefPrompts: [],
    type: "facilitated",
    pdfUrl: `/robotics-manuals/elec-experience-book-${ageSlug}.pdf`,
    referenceLinks: [
      { label: "electronics teacher reference", url: TEACHER_REFERENCE },
      { label: "component gallery — name every block", url: COMPONENT_GALLERY },
    ],
  };
}

// ─── Skills — the four ladders, matched to the experience book ─
// The child's book climbs each skill one rung per machine; the outcome
// wording here is the book's, so the tool and the book agree.

const skillAreas: CurriculumSkillArea[] = [
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      { name: "Notice", description: "notices when the circuit works and when it doesn't" },
      { name: "Describe", description: "describes the pattern in words" },
      { name: "Compare", description: "compares two circuits — brighter or dimmer, faster or slower" },
      { name: "Predict", description: "predicts whether a circuit will work, and says why", isNorthStar: true },
    ],
  },
  {
    id: "bm",
    name: "building & making",
    shortName: "B&M",
    abilities: [
      { name: "Snap", description: "snaps the blocks together from the card" },
      { name: "Complete", description: "completes the loop so it works" },
      { name: "Name", description: "builds it and names each block's job" },
      { name: "Change", description: "adds or swaps a block to change what it does", isNorthStar: true },
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      { name: "Notice", description: "notices the circuit isn't working" },
      { name: "Try", description: "tries a fix instead of repeating what failed" },
      { name: "Adjust", description: "changes one thing and sees if it helps" },
      { name: "Fix", description: "finds the break and gets the circuit working", isNorthStar: true },
    ],
  },
  {
    id: "pe",
    name: "presenting & explaining",
    shortName: "P&E",
    abilities: [
      { name: "Name", description: "names their circuit and its blocks in real words" },
      { name: "Say", description: "says what it does" },
      { name: "Explain", description: "says why it works" },
      { name: "Answer", description: "shows it and answers a question about it", isNorthStar: true },
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
  // ── Railway Barrier · 4 days ──
  s(1, "elec-c-switch", "Railway Barrier", "elec-build-railway-barrier", 1, 4,
    "what is the switch doing to the loop — and when does the light come on?"),
  s(2, "elec-c-switch", "Railway Barrier", "elec-build-railway-barrier", 2, 4,
    "revisit — predict what will happen before you connect, then prove it: what is the switch doing to the loop — and when does the light come on?"),
  s(3, "elec-c-switch", "Railway Barrier", "elec-build-railway-barrier", 3, 4,
    "revisit — predict what will happen before you connect, then prove it: what is the switch doing to the loop — and when does the light come on?"),
  s(4, "elec-c-switch", "Railway Barrier", "elec-build-railway-barrier", 4, 4,
    "revisit — predict what will happen before you connect, then prove it: what is the switch doing to the loop — and when does the light come on?"),

  // ── Wind Turbine · 4 days ──
  s(5, "elec-c-motor", "Wind Turbine", "elec-build-wind-turbine", 1, 4,
    "what did reversing the wires change about the motor?"),
  s(6, "elec-c-dpdt", "Wind Turbine", "elec-build-wind-turbine", 2, 4,
    "how did you make the motor change direction without swapping any wires?"),
  s(7, "elec-c-motor", "Wind Turbine", "elec-build-wind-turbine", 3, 4,
    "revisit — predict what will happen before you connect, then prove it: what did reversing the wires change about the motor?"),
  s(8, "elec-c-dpdt", "Wind Turbine", "elec-build-wind-turbine", 4, 4,
    "revisit — predict what will happen before you connect, then prove it: how did you make the motor change direction without swapping any wires?"),

  // ── Soccer Bot · 4 days ──
  s(9, "elec-c-dpdt", "Soccer Bot", "elec-build-soccer-bot", 1, 4,
    "how did you make the motor change direction without swapping any wires?"),
  s(10, "elec-c-dual-dpdt", "Soccer Bot", "elec-build-soccer-bot", 2, 4,
    "what did the two motors have to be doing for the bot to turn?"),
  s(11, "elec-c-dpdt", "Soccer Bot", "elec-build-soccer-bot", 3, 4,
    "revisit — predict what will happen before you connect, then prove it: how did you make the motor change direction without swapping any wires?"),
  s(12, "elec-c-dual-dpdt", "Soccer Bot", "elec-build-soccer-bot", 4, 4,
    "revisit — predict what will happen before you connect, then prove it: what did the two motors have to be doing for the bot to turn?"),

  // ── Cleaning Bot · 6 days ──
  s(13, "elec-c-dpdt-motor", "Cleaning Bot", "elec-build-cleaning-bot", 1, 6,
    "how did you flip one motor while the other kept running?"),
  s(14, "elec-c-dpdt", "Cleaning Bot", "elec-build-cleaning-bot", 2, 6,
    "how did you make the motor change direction without swapping any wires?"),
  s(15, "elec-c-dual-dpdt", "Cleaning Bot", "elec-build-cleaning-bot", 3, 6,
    "what did the two motors have to be doing for the bot to turn?"),
  s(16, "elec-c-dpdt-motor", "Cleaning Bot", "elec-build-cleaning-bot", 4, 6,
    "revisit — predict what will happen before you connect, then prove it: how did you flip one motor while the other kept running?"),
  s(17, "elec-c-dpdt", "Cleaning Bot", "elec-build-cleaning-bot", 5, 6,
    "revisit — predict what will happen before you connect, then prove it: how did you make the motor change direction without swapping any wires?"),
  s(18, "elec-c-dual-dpdt", "Cleaning Bot", "elec-build-cleaning-bot", 6, 6,
    "revisit — predict what will happen before you connect, then prove it: what did the two motors have to be doing for the bot to turn?"),

  // ── Sensor-controlled Crane · 5 days ──
  s(19, "elec-c-driver-ir", "Sensor-controlled Crane", "elec-build-sensor-crane", 1, 5,
    "which part was the input, and which was the output?"),
  s(20, "elec-c-ir-motor-direction", "Sensor-controlled Crane", "elec-build-sensor-crane", 2, 5,
    "what decision is the driver making for the motor?"),
  s(21, "elec-c-dual-ir-fwd-back", "Sensor-controlled Crane", "elec-build-sensor-crane", 3, 5,
    "how does the driver know which sensor is talking?"),
  s(22, "elec-c-driver-ir", "Sensor-controlled Crane", "elec-build-sensor-crane", 4, 5,
    "revisit — predict what will happen before you connect, then prove it: which part was the input, and which was the output?"),
  s(23, "elec-c-ir-motor-direction", "Sensor-controlled Crane", "elec-build-sensor-crane", 5, 5,
    "revisit — predict what will happen before you connect, then prove it: what decision is the driver making for the motor?"),
];

// ─── Checkpoints ────────────────────────────────────────────
// Land on the model boundaries: after Railway Barrier (4), after Soccer
// Bot (12), after the Sensor-controlled Crane (23).

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 4,
    descriptors: [
      { skillArea: "B&M", beginning: "needs help to snap the blocks from the card", developing: "snaps the blocks together from the card (Snap)", secure: "completes the loop so it works (Complete)" },
      { skillArea: "O&U", beginning: "watches without noticing specifics", developing: "notices when it works and when it doesn't (Notice)", secure: "describes the pattern in words (Describe)" },
      { skillArea: "PS", beginning: "waits to be told what is wrong", developing: "notices the circuit isn't working (Notice)", secure: "tries a fix instead of repeating what failed (Try)" },
      { skillArea: "P&E", beginning: "shows the circuit without words", developing: "names their circuit and its blocks (Name)", secure: "says what it does (Say)" },
    ],
  },
  {
    afterSession: 12,
    descriptors: [
      { skillArea: "B&M", beginning: "completes the loop (Complete)", developing: "builds it and names each block's job (Name)", secure: "adds or swaps a block to change what it does (Change ★)" },
      { skillArea: "O&U", beginning: "describes the pattern (Describe)", developing: "compares two circuits (Compare)", secure: "predicts whether it will work and says why (Predict ★)" },
      { skillArea: "PS", beginning: "tries a fix (Try)", developing: "changes one thing and sees if it helps (Adjust)", secure: "finds the break and gets it working (Fix ★)" },
      { skillArea: "P&E", beginning: "says what it does (Say)", developing: "says why it works (Explain)", secure: "shows it and answers a question (Answer ★)" },
    ],
  },
  {
    afterSession: 23,
    descriptors: [
      { skillArea: "B&M", beginning: "names each block's job (Name)", developing: "changes one block on purpose (Change)", secure: "builds a machine that senses and responds, and improves it deliberately (Change ★)" },
      { skillArea: "O&U", beginning: "compares two circuits (Compare)", developing: "predicts before testing (Predict)", secure: "predicts and proves how a circuit behaves — with a reason (Predict ★)" },
      { skillArea: "PS", beginning: "changes one thing to help (Adjust)", developing: "finds and fixes a break (Fix)", secure: "works through several faults to get the machine going (Fix ★)" },
      { skillArea: "P&E", beginning: "says why it works (Explain)", developing: "answers a question about it (Answer)", secure: "shows the machine, explains how and why, and answers a question (Answer ★)" },
    ],
  },
];

// ─── Model ↔ experiment pairings ────────────────────────────

const modelPairings: ModelPairing[] = [
  { model: "Railway Barrier", topic: "Open & closed circuits",
    why: "A railway barrier is a loop that is deliberately broken and rejoined — which is exactly what a switch does. Its cards build the first complete circuit, add the switch, and protect the LED with a resistor." },
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
  totalSessions: 23,
  skillAreas,
  segmentDefinitions,
  sessionTable,
  checkpoints,
  modelPairings,
  foundationalConcepts,
  glossary,
  components,
  ageBandComparison: {
    younger: [
      "builds and completes the circuit, and answers by circling",
      "observes what happens — works or doesn't, which way it spins, brighter or dimmer",
      "explains why it works in their own words",
    ],
    older: [
      "designs their own circuit and draws it as a schematic",
      "compares and proves — brighter or dimmer, faster or slower, at what distance the sensor triggers",
      "explains with a clear reason; there's no multimeter in the kit, so “measuring” means structured comparison, not voltage numbers",
    ],
    note: "same five machines, same four skills — it's the depth of observing, measuring and designing that climbs.",
  },
};

/** Activities differ only by which age's experience book is attached. */
function activitiesFor(ageSlug: "5-8" | "8-12") {
  return {
    ...experimentActivities,
    ...buildActivities,
    "elec-experience-book": experienceBook(ageSlug),
  };
}

const DESCRIPTION =
  "level 2 — electronics. across five models — railway barrier, wind turbine, soccer bot, cleaning bot, and sensor-controlled crane — children run experiments on circuits, polarity, sharing power, and sensors, then build a machine that uses what they just discovered. they finish able to look at a circuit and explain why it works — and build one that senses and responds. no mechanics background is needed: this level starts from the very first circuit.";

export const roboticsElectronics58: CurriculumProgramme = {
  ...shared,
  id: "robotics-electronics-5-8",
  slug: "robotics-electronics-5-8",
  trackSlug: "robotics-5-8",
  ageGroup: "5-8",
  ageLabel: "ages 5–8",
  description: DESCRIPTION,
  activities: activitiesFor("5-8"),
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
  activities: activitiesFor("8-12"),
};
