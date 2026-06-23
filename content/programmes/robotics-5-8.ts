import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
  ModelPairing,
} from "@/content/types";
import { ROBOTICS_TRIAL_SESSION_5_8 } from "./robotics-trial";

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
      { level: "Easy", description: "Educator reads the card. Child hangs load, pulls the spring scale and reads the number. Educator writes." },
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
      { level: "Easy", description: "Educator reads the card. Child hangs the load. Child reads one number aloud." },
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
      { level: "Easy", description: "Educator demonstrates. Child hangs the second weight and watches." },
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
      "0.5kg weight + 3–4 everyday objects of roughly equal weight (educator-supplied)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator hangs the comparison objects. Child names which balanced." },
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
      { level: "Easy", description: "Educator lifts. Child reads the number." },
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
      { level: "Easy", description: "Child pulls in the direction shown by the educator." },
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
      { level: "Easy", description: "Educator raises the pulley. Child reads the new number aloud." },
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
      { level: "Easy", description: "Child pulls in the two directions shown by the educator." },
      { level: "Medium", description: "Child tries three directions and records all three readings." },
      { level: "Hard", description: "Child predicts whether the readings will match before each pull and explains why comfort is different from effort." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley.pdf",
  },

  // ─── Extra levers (See-saw, Weighing Scale) ──────────────
  "l2-levers-e1": {
    id: "l2-levers-e1",
    segment: "experiment",
    title: "l2 levers e1 — a lever makes lifting easier",
    cardName: "L2 Levers e1",
    setupLine:
      "lift 1kg, 1.5kg, 2kg two ways — straight up by hand, then using a lever. which way needs less effort?",
    howToPlay:
      "Children lift 1kg, 1.5kg, and 2kg two ways: Setup A — straight up with a spring scale; Setup B — with a medium lever, fulcrum at the centre. They read the effort for each setup and weight. Each child records both. The lever (Setup B) needs less effort than lifting directly — the core reason a see-saw beam helps.",
    materials: [
      "Experiment Card: L2 Levers e1",
      "Medium PVC pipe lever + T-connector fulcrum",
      "Spring scale 2kg · 1kg, 1.5kg, 2kg weights · cup with hook",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets each setup; child lifts and reads the effort." },
      { level: "Medium", description: "Child runs both setups for each weight and records the effort." },
      { level: "Hard", description: "Child predicts how much the lever will save before testing and explains why." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers-e1.pdf",
  },
  "l2-levers-e5": {
    id: "l2-levers-e5",
    segment: "experiment",
    title: "l2 levers e5 — balancing unequal weights",
    cardName: "L2 Levers e5",
    setupLine:
      "0.5kg on one end, 1.5kg on the other. move the fulcrum until both sides balance — where does it sit?",
    howToPlay:
      "With 0.5kg on one end of the lever and 1.5kg on the other, children try different fulcrum positions until the beam balances level. Each child records where the fulcrum had to sit. The fulcrum moves closer to the heavier weight — how a weighing scale can balance unequal loads.",
    materials: [
      "Experiment Card: L2 Levers e5",
      "Medium PVC pipe lever + movable fulcrum",
      "0.5kg and 1.5kg weights",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator moves the fulcrum; child says when it balances." },
      { level: "Medium", description: "Child moves the fulcrum to find the balance point and records its position." },
      { level: "Hard", description: "Child predicts which way the fulcrum must move before testing and explains why." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers-e5.pdf",
  },

  // ─── Gears (Copter, Bulldozer) ────────────────────────────
  "l1-gears-e1": {
    id: "l1-gears-e1",
    segment: "experiment",
    title: "l1 gears e1 — which way do gears turn",
    cardName: "L1 Gears e1",
    setupLine:
      "connect gear a and gear b two ways — side by side, then with a chain. which way does each one turn?",
    howToPlay:
      "Children connect Gear A and Gear B in two setups: (1) meshed side-by-side, and (2) linked with a chain. Turn Gear A and watch Gear B each time. Record the direction of Gear B for each setup. First use: children discover the pattern. Second use: children predict the direction before turning. Side-by-side gears turn opposite ways; a chain makes them turn the same way.",
    materials: [
      "Experiment Card: L1 Gears e1",
      "Gear A and Gear B — 1 of each per group",
      "Gear chain — 1 per group",
      "Baseplate with mounting points, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets up both arrangements; child turns Gear A and says which way Gear B goes." },
      { level: "Medium", description: "Child builds both setups and records the direction of Gear B for each." },
      { level: "Hard", description: "Child predicts the direction for each setup before turning and explains why the chain changes it." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-gears-e1.pdf",
  },
  "l1-gears-e2": {
    id: "l1-gears-e2",
    segment: "experiment",
    title: "l1 gears e2 — small gear drives big gear",
    cardName: "L1 Gears e2",
    setupLine:
      "a small gear and a big gear, joined by a chain. turn the small one 3, 5, 8 times — how many times does the big one turn?",
    howToPlay:
      "Two gears — one small, one big — connected with a chain. Turn the small gear 3 times, then 5, then 8, and count the turns on the big gear each time. Each child records both numbers. The big gear turns fewer times than the small gear — the first feel of a gear ratio.",
    materials: [
      "Experiment Card: L1 Gears e2",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator turns the small gear a set number of times; child counts the big gear's turns." },
      { level: "Medium", description: "Child turns the small gear 3, 5, 8 times and records the big gear's turns each time." },
      { level: "Hard", description: "Child predicts the big gear's turns before counting and explains why it turns fewer times." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-gears-e2.pdf",
  },
  "l1-gears-e3": {
    id: "l1-gears-e3",
    segment: "experiment",
    title: "l1 gears e3 — big gear drives small gear",
    cardName: "L1 Gears e3",
    setupLine:
      "same two gears, the other way round. turn the big one 3, 5, 8 times — how many times does the small one turn?",
    howToPlay:
      "The same small and big gears joined by a chain, but now drive the big gear. Turn it 3 times, then 5, then 8, and count the turns on the small gear each time. Each child records both numbers. The small gear turns more times than the big gear — the reverse of e2.",
    materials: [
      "Experiment Card: L1 Gears e3",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator turns the big gear a set number of times; child counts the small gear's turns." },
      { level: "Medium", description: "Child turns the big gear 3, 5, 8 times and records the small gear's turns each time." },
      { level: "Hard", description: "Child predicts the small gear's turns first and explains why it now turns more — comparing back to e2." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-gears-e3.pdf",
  },
  "l1-gears-e4": {
    id: "l1-gears-e4",
    segment: "experiment",
    title: "l1 gears e4 — equal gears turn equally",
    cardName: "L1 Gears e4",
    setupLine:
      "two gears exactly the same size, joined by a chain. turn one 4, 6, 9 times — how many times does the other turn?",
    howToPlay:
      "Two equal-sized gears connected with a chain. Turn Gear A 4 times, then 6, then 9, and count the turns on Gear B each time. Each child records both numbers. When the gears are the same size, B turns the same number of times as A — a one-to-one ratio that contrasts with the small/big pairs in e2 and e3.",
    materials: [
      "Experiment Card: L1 Gears e4",
      "Two equal-sized gears — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator turns Gear A a set number of times; child counts Gear B's turns." },
      { level: "Medium", description: "Child turns Gear A 4, 6, 9 times and records Gear B's turns each time." },
      { level: "Hard", description: "Child predicts Gear B's turns first and explains why equal gears turn one-to-one." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-gears-e4.pdf",
  },
  "l2-gears-e1": {
    id: "l2-gears-e1",
    segment: "experiment",
    title: "l2 gears e1 — bigger gear ratio",
    cardName: "L2 Gears e1",
    setupLine:
      "a small gear and a big gear, chained together. turn the small one 6, 9, 12 times — how many times does the big one turn?",
    howToPlay:
      "Two gears — one small, one big — connected with a chain. Turn the small gear 6 times, then 9, then 12, and count the turns on the big gear each time. Each child records both numbers and works out the relationship — the big gear turns a predictable fraction of the small gear's turns. Extends e2 to larger numbers so children can spot the ratio.",
    materials: [
      "Experiment Card: L2 Gears e1",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator turns the small gear; child counts and records the big gear's turns." },
      { level: "Medium", description: "Child turns the small gear 6, 9, 12 times and records the big gear's turns each time." },
      { level: "Hard", description: "Child predicts the big gear's turns from the ratio before counting and explains the pattern." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-gears-e1.pdf",
  },

  // ─── Wheel & Axle (Rickshaw, Drawbridge, Tow Truck) ───────
  "l1-wheel-axle-e2": {
    id: "l1-wheel-axle-e2",
    segment: "experiment",
    title: "l1 wheel & axle e2 — heavier load, shorter distance",
    cardName: "L1 Wheel&Axle e2",
    setupLine:
      "build a 4-wheel cart. load it with 0.5kg, then 1kg, then 1.5kg. one push from a to b — how far does it roll each time?",
    howToPlay:
      "Children build a cart with 4 wheels and 2 axles, then give it one steady push from point A and measure how far it travels carrying 0.5kg, 1kg, and 1.5kg in turn. Each child records the distance for each load. The heavier the load, the shorter the distance from the same push.",
    materials: [
      "Experiment Card: L1 Wheel&Axle e2",
      "4 wheels + 2 axles + cart base — 1 set per group",
      "0.5kg, 1kg, 1.5kg weights",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator pushes the cart; child marks where it stops and reads the distance." },
      { level: "Medium", description: "Child gives a steady push and measures the distance for each load." },
      { level: "Hard", description: "Child predicts which load goes furthest before pushing and explains the result." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-wheel-axle-e2.pdf",
  },
  "l1-wheel-axle-e3": {
    id: "l1-wheel-axle-e3",
    segment: "experiment",
    title: "l1 wheel & axle e3 — where the load sits",
    cardName: "L1 Wheel&Axle e3",
    setupLine:
      "put 1.5kg in the centre, then the back, then the front of the cart. does where it sits change how it rolls?",
    howToPlay:
      "Children place the same 1.5kg weight in three positions on the cart — centre, back, front — and push it the same way each time, watching the balance and measuring the distance. Each child records the distance for each setup. Where the load sits changes how steadily and how far the cart travels.",
    materials: [
      "Experiment Card: L1 Wheel&Axle e3",
      "Cart (4 wheels, 2 axles) — 1 per group",
      "1.5kg weight",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets the load position; child pushes and marks the distance." },
      { level: "Medium", description: "Child sets all three positions and measures the distance for each." },
      { level: "Hard", description: "Child predicts which position rolls furthest/straightest and explains why." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-wheel-axle-e3.pdf",
  },
  "l2-wheel-axle-e2": {
    id: "l2-wheel-axle-e2",
    segment: "experiment",
    title: "l2 wheel & axle e2 — heavier loads, measured roll",
    cardName: "L2 Wheel&Axle e2",
    setupLine:
      "build a cart and carry 2kg, 2.5kg, 3kg one at a time. a gentle push from a to b — measure how far it rolls.",
    howToPlay:
      "Children build a cart and give it the same gentle push from A while carrying 2kg, then 2.5kg, then 3kg. Each child measures and records the distance for each load. Extends the L1 idea to heavier weights so children can quantify how added load shortens the roll.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e2",
      "Cart (4 wheels, 2 axles) — 1 per group",
      "2kg, 2.5kg, 3kg weights",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator pushes; child reads and records the distance for each load." },
      { level: "Medium", description: "Child gives an even push and measures the distance for all three loads." },
      { level: "Hard", description: "Child predicts the distances in order before testing and explains the pattern with numbers." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-wheel-axle-e2.pdf",
  },
  "l2-wheel-axle-e3": {
    id: "l2-wheel-axle-e3",
    segment: "experiment",
    title: "l2 wheel & axle e3 — steering with the front axle",
    cardName: "L2 Wheel&Axle e3",
    setupLine:
      "point the front axle left, then centre, then right. push the cart each time — which way does it go?",
    howToPlay:
      "Children build a cart whose front axle can be angled, then set it to the left, centre, and right and push it each time, recording the direction the cart travels. Each child notes the direction for each setup. The front axle angle steers the cart — the first feel of how a steering axle works.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e3",
      "Cart with a steerable front axle — 1 per group",
      "Open floor space, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets the axle angle; child pushes and says which way it went." },
      { level: "Medium", description: "Child sets all three angles and records the direction for each." },
      { level: "Hard", description: "Child predicts the direction for each angle before pushing and explains how the axle steers." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-wheel-axle-e3.pdf",
  },
  "l2-wheel-axle-e4": {
    id: "l2-wheel-axle-e4",
    segment: "experiment",
    title: "l2 wheel & axle e4 — load centred vs at the back",
    cardName: "L2 Wheel&Axle e4",
    setupLine:
      "two carts, 1.5kg on each — one centred, one at the back. push both. which rolls further?",
    howToPlay:
      "Children build two carts and add 1.5kg to each — one with the load centred, one with it at the back — then push both the same way and measure the distance for each. Each child records both distances. Where the load sits changes how far the cart rolls from the same push.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e4",
      "Two carts (4 wheels, 2 axles each) — 1 pair per group",
      "1.5kg weight × 2",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator pushes both carts; child marks and compares the two distances." },
      { level: "Medium", description: "Child pushes both carts evenly and records each distance." },
      { level: "Hard", description: "Child predicts which cart rolls further before testing and explains why." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-wheel-axle-e4.pdf",
  },
  "l2-wheel-axle-e5": {
    id: "l2-wheel-axle-e5",
    segment: "experiment",
    title: "l2 wheel & axle e5 — axles close vs far apart",
    cardName: "L2 Wheel&Axle e5",
    setupLine:
      "two carts — one with axles close together, one with axles far apart. push both. which rolls further?",
    howToPlay:
      "Children build two carts that differ only in axle spacing — one with axles close together (2 pipes), one far apart (3 pipes) — then push both the same way and measure the distance for each. Each child records both distances. Axle spacing changes how steadily and how far the cart travels.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e5",
      "Two carts with different axle spacing — 1 pair per group",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator pushes both carts; child compares the two distances." },
      { level: "Medium", description: "Child pushes both carts evenly and records each distance." },
      { level: "Hard", description: "Child predicts which spacing rolls further before testing and explains the result." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-wheel-axle-e5.pdf",
  },

  // ─── Extra pulley & lever experiments (Wind Turbine, Tow Truck, Fishing Rod) ─
  "l1-pulleys-e5": {
    id: "l1-pulleys-e5",
    segment: "experiment",
    title: "l1 pulleys e5 — lifting with a double pulley",
    cardName: "L1 Pulleys e5",
    setupLine:
      "lift 0.5kg, 1kg, 1.5kg using a double pulley. how much effort does each one need?",
    howToPlay:
      "Children use a double pulley to lift 0.5kg, 1kg, and 1.5kg in turn, reading the spring scale each time. Each child records the effort for each weight. With a double pulley the effort is noticeably less than lifting by hand — a first look at how more pulleys share the load.",
    materials: [
      "Experiment Card: L1 Pulleys e5",
      "Double pulley + mount · rope · spring scale",
      "0.5kg, 1kg, 1.5kg weights · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets up the double pulley; child lifts each weight and reads the scale." },
      { level: "Medium", description: "Child rigs the double pulley and records the effort for each weight." },
      { level: "Hard", description: "Child predicts how the effort compares to a single pulley and explains why." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l1-pulley-e5.pdf",
  },
  "l2-pulleys-e1": {
    id: "l2-pulleys-e1",
    segment: "experiment",
    title: "l2 pulleys e1 — double pulley, measured effort",
    cardName: "L2 Pulleys e1",
    setupLine:
      "lift 0.5kg, 1kg, 1.5kg with a double pulley and measure the effort needed for each.",
    howToPlay:
      "Children lift 0.5kg, 1kg, and 1.5kg with a double pulley, reading and recording the spring-scale effort for each. Each child takes at least one reading. Builds on the L1 double-pulley idea with careful measurement so children can compare effort across weights.",
    materials: [
      "Experiment Card: L2 Pulleys e1",
      "Double pulley + mount · rope · spring scale",
      "0.5kg, 1kg, 1.5kg weights · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator rigs the pulley; child lifts and reads the effort for each weight." },
      { level: "Medium", description: "Child sets up the double pulley and records the effort for all three weights." },
      { level: "Hard", description: "Child predicts the effort order before lifting and explains the pattern with the readings." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley-e1.pdf",
  },
  "l2-pulleys-e4": {
    id: "l2-pulleys-e4",
    segment: "experiment",
    title: "l2 pulleys e4 — does pulley height change effort",
    cardName: "L2 Pulleys e4",
    setupLine:
      "lift 3kg with a fixed pulley three times, each time at a different pulley height. does the effort change?",
    howToPlay:
      "Children use a fixed pulley to lift a 3kg load three times, varying the height of the pulley each try, and read the spring scale each time. Each child records the effort for each height. The effort stays the same regardless of pulley height — a fixed pulley changes direction, not effort.",
    materials: [
      "Experiment Card: L2 Pulleys e4",
      "Fixed pulley + adjustable-height mount · rope · spring scale",
      "3kg load · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets each height; child lifts and reads the effort." },
      { level: "Medium", description: "Child sets all three heights and records the effort for each." },
      { level: "Hard", description: "Child predicts whether height will change the effort before testing and explains the result." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley-e4.pdf",
  },
  "l2-pulleys-e5": {
    id: "l2-pulleys-e5",
    segment: "experiment",
    title: "l2 pulleys e5 — pulling from different sides",
    cardName: "L2 Pulleys e5",
    setupLine:
      "lift 3kg with a pulley, pulling the rope from three different sides. find the effort for each.",
    howToPlay:
      "Children lift a 3kg load with a pulley, pulling the rope from three different directions, and read the spring scale each time. Each child records the effort for each pull. The effort reading is the same from every side — the pulley redirects the pull without changing how hard it is.",
    materials: [
      "Experiment Card: L2 Pulleys e5",
      "Pulley + mount · rope · spring scale",
      "3kg load · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets each pull direction; child lifts and reads the effort." },
      { level: "Medium", description: "Child pulls from all three sides and records the effort for each." },
      { level: "Hard", description: "Child predicts whether direction changes the effort before testing and explains why comfort differs from effort." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley-e5.pdf",
  },
  "l2-levers-e6": {
    id: "l2-levers-e6",
    segment: "experiment",
    title: "l2 levers e6 — best lever size near the load",
    cardName: "L2 Levers e6",
    setupLine:
      "with the fulcrum close to the load, try short, medium, long levers. which size lifts 2kg with the least effort?",
    howToPlay:
      "With the fulcrum placed close to the load, children lift 2kg using a short (1 pipe), medium (2 pipe), and long (3 pipe) lever, reading the spring scale each time. Each child records the effort for each size. The long lever with the fulcrum near the load needs the least effort — combining lever length and fulcrum position.",
    materials: [
      "Experiment Card: L2 Levers e6",
      "PVC pipe levers — short, medium, long",
      "T-connector fulcrum · spring scale · 2kg load",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator sets each lever; child lifts and reads the effort." },
      { level: "Medium", description: "Child tries all three lever sizes and records the effort for each." },
      { level: "Hard", description: "Child predicts the best lever size before testing and explains how length and fulcrum position combine." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-levers-e6.pdf",
  },
};

// ─── Build activities (3 models, 5 days each) ───────────────

const buildActivities: Record<string, CurriculumActivity> = {
  "build-see-saw": {
    id: "build-see-saw",
    segment: "build",
    title: "see-saw build",
    setupLine:
      "each child builds their own see-saw from a personal kit and a step card. five sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever model — a beam balancing on a central fulcrum. Introduces lever concepts in the most physical way a child can feel. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin first build stage. Days 2–3 Make: open manual where you left off, build, educator uses four questions only. Day 4 Complete and Test: finish, run the test (balance two known weights — does the beam stay level?), record the best result. Day 5 Improve and Disassemble: each child makes one deliberate change, states expected outcome, tests, records before and after — then sorts every component back using the tray map.",
    materials: [
      "Personal See-saw kit per child — all components in a labelled box",
      "Model Manual — See Saw.pdf (1 per child, laminated)",
      "Tray map — See-saw (1 per child)",
      "Child-sized spanner, spare bolts and nuts",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads each manual step aloud. Child fits each component and the educator checks." },
      { level: "Medium", description: "Child reads independently and does each step without verbal confirmation — educator watches." },
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
      "same cycle, new model — a two-pan lever. five sessions from kit to calibrated scale.",
    howToPlay:
      "The weighing scale is a more precise lever. The scale must balance — not just assemble. Children calibrate rather than just build. Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test (place equal weights in both pans — does it balance? place unequal — which way does it tip?) · Day 5 Improve and Disassemble (child makes one change, measures before and after, then sorts the kit back using the tray map).",
    materials: [
      "Personal Weighing Scale kit additions per child — distributed at Day 1",
      "Model Manual — Weighing Scale.pdf (1 per child)",
      "Tray map — Weighing Scale (1 per child)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
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
      "the pulley model — a crane that lifts a load with rope and pulley. five sessions.",
    howToPlay:
      "The crane uses a pulley system to lift loads. Pulley experiments explain directly how the lifting system works. Day 1 Explore · Days 2–3 Make · Day 4 Complete and Test (lift a known load — did it work? how heavy can it lift before it tips?) · Day 5 Improve and Disassemble (one deliberate change — try a different rope angle, reposition the pulley — then sort the kit back using the tray map).",
    materials: [
      "Personal Crane kit additions per child — distributed at Day 1",
      "Model Manual — L1_Crane.pdf (1 per child)",
      "Tray map — Crane (1 per child)",
      "Pulleys, rope, couplers (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits components with check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the part is for, builds and checks." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/crane.pdf",
  },
  "build-copter": {
    id: "build-copter",
    segment: "build",
    title: "copter build",
    setupLine:
      "the gear model — a copter whose blades spin through a gear train. five sessions from kit to spinning rotor.",
    howToPlay:
      "The copter turns a hand crank into spinning blades through meshed gears — the gear experiments explain directly why the rotor spins faster or slower than the handle. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: open the manual where you left off, build, educator uses four questions only. Day 4 Complete and Test: finish, turn the crank — do the blades spin? how many blade turns for one handle turn? Day 5 Improve and Disassemble: each child makes one deliberate change (swap a gear, change the handle), states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Copter kit additions per child — distributed at Day 1",
      "Model Manual — Copter.pdf (1 per child)",
      "Tray map — Copter (1 per child)",
      "Gears, chain, crank handle (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what each gear is for, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/copter.pdf",
  },
  "build-fishing-rod": {
    id: "build-fishing-rod",
    segment: "build",
    title: "fishing rod build",
    setupLine:
      "the lever-and-pulley model — a rod that bends like a lever and reels in line through a pulley. five sessions.",
    howToPlay:
      "The fishing rod combines a lever (the rod arm) with a pulley (the reel) — the lever and pulley experiments both explain what the build is doing. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, reel a small load up — does the rod lift it? how does the reel make it easier? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Fishing Rod kit additions per child — distributed at Day 1",
      "Model Manual — Fishing Rod.pdf (1 per child)",
      "Tray map — Fishing Rod (1 per child)",
      "Rod arm, reel, pulley, line (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the rod and reel each do, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/fishing-rod.pdf",
  },
  "build-rickshaw": {
    id: "build-rickshaw",
    segment: "build",
    title: "rickshaw build",
    setupLine:
      "the wheel-and-axle model — a rickshaw that rolls on wheels and axles. five sessions from kit to rolling cart.",
    howToPlay:
      "The rickshaw rolls on wheels fixed to axles — the wheel-and-axle experiments explain directly how load and axle placement change the way it rolls. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, load it and give it a push — how far and how straight does it go? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Rickshaw kit additions per child — distributed at Day 1",
      "Model Manual — Rickshaw.pdf (1 per child)",
      "Tray map — Rickshaw (1 per child)",
      "Wheels, axles, cart frame (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what each axle does, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/rickshaw.pdf",
  },
  "build-wind-turbine": {
    id: "build-wind-turbine",
    segment: "build",
    title: "wind turbine build",
    setupLine:
      "the pulley model — a wind turbine whose blades drive a pulley to lift a small load. five sessions.",
    howToPlay:
      "The wind turbine turns its spinning blades into lifting power through a pulley — the pulley experiments explain how the lifting system works. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, spin the blades — does the pulley wind up and lift the load? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Wind Turbine kit additions per child — distributed at Day 1",
      "Model Manual — Wind Turbine.pdf (1 per child)",
      "Tray map — Wind Turbine (1 per child)",
      "Blades, pulley, rope, mast (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the pulley does, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/wind-turbine.pdf",
  },
  "build-drawbridge": {
    id: "build-drawbridge",
    segment: "build",
    title: "drawbridge build",
    setupLine:
      "the wheel, axle and pulley model — a drawbridge that raises and lowers on a pulley. five sessions.",
    howToPlay:
      "The drawbridge raises and lowers using axles and a pulley — the wheel-and-axle and pulley experiments both explain what the build is doing. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, raise and lower the bridge — does it hold and move smoothly? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Drawbridge kit additions per child — distributed at Day 1",
      "Model Manual — Drawbridge.pdf (1 per child)",
      "Tray map — Drawbridge (1 per child)",
      "Axles, pulley, rope, bridge deck (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the axle and pulley each do, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/drawbridge.pdf",
  },
  "build-tow-truck": {
    id: "build-tow-truck",
    segment: "build",
    title: "tow truck build",
    setupLine:
      "the wheel, axle and pulley model — a tow truck that rolls on axles and winches a load on a pulley. five sessions.",
    howToPlay:
      "The tow truck rolls on wheels and axles and winches a load with a pulley — the wheel-and-axle and pulley experiments both explain what the build is doing. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, drive it and winch a load — does it roll straight and pull the load up? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Tow Truck kit additions per child — distributed at Day 1",
      "Model Manual — Tow Truck.pdf (1 per child)",
      "Tray map — Tow Truck (1 per child)",
      "Wheels, axles, pulley, winch rope (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what the axles and winch pulley each do, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/tow-truck.pdf",
  },
  "build-bulldozer": {
    id: "build-bulldozer",
    segment: "build",
    title: "bulldozer build",
    setupLine:
      "the gear model — a bulldozer whose blade and tracks are driven through gears. five sessions.",
    howToPlay:
      "The bulldozer drives its blade and tracks through a gear train — the gear experiments explain directly how the gearing changes speed and turning. Day 1 Explore: read the manual cover to cover, lay out every component in manual order, begin the build. Days 2–3 Make: continue, educator uses four questions only. Day 4 Complete and Test: finish, run it — do the gears drive the blade and tracks? Day 5 Improve and Disassemble: each child makes one deliberate change, states the expected effect, tests, records before and after — then sorts the kit back using the tray map.",
    materials: [
      "Personal Bulldozer kit additions per child — distributed at Day 1",
      "Model Manual — Bulldozer.pdf (1 per child)",
      "Tray map — Bulldozer (1 per child)",
      "Gears, chain, blade, tracks (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator reads steps. Child fits each component with educator check." },
      { level: "Medium", description: "Child reads and builds independently, asks only when genuinely stuck." },
      { level: "Hard", description: "Child plans the next stage, names what each gear does, builds and checks own work." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/bulldozer.pdf",
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
    "The educator fills in four things per child: the experiment name, the build day, three ability rows (one per skill — B&M, PS, O&U — circling the ability seen clearly today), and one specific note (\"worth remembering\"). The book also carries the Ability Reference, and six monthly Robotics Journey letters that go home at sessions 8, 16, 24, 32, 40, and 48. Always conduct a 3-move debrief: name what you saw (linked to an ability name) · name the next step (next ability up) · ask one concept question to the group.",
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
      { name: "Fit", description: "connects parts so they sit correctly and function as intended" },
      { name: "Follow", description: "builds in the correct order by following the step card" },
      { name: "Adjust", description: "fixes a connection within the given design — tightens, repositions, or reconnects" },
      { name: "Improve", description: "makes one deliberate change to make the model work better — and checks whether it worked", isNorthStar: true },
    ],
  },
  {
    id: "ps",
    name: "problem solving",
    shortName: "PS",
    abilities: [
      { name: "Notice", description: "recognises that something is not working — without being told" },
      { name: "Try", description: "attempts a different approach instead of repeating the same action" },
      { name: "Change", description: "tries a new way that goes beyond the given steps to solve the problem" },
      { name: "Persist", description: "keeps working through difficulty without giving up", isNorthStar: true },
    ],
  },
  {
    id: "ou",
    name: "observing & understanding",
    shortName: "O&U",
    abilities: [
      { name: "Observe", description: "looks closely and identifies what is happening during the test" },
      { name: "Measure", description: "takes accurate readings and records them correctly" },
      { name: "Predict", description: "states what will happen before testing — without being prompted" },
      { name: "Explain", description: "explains why something happened using a clear reason — not just what happened", isNorthStar: true },
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
      "children work in groups of 2–4 to find the answer to one specific question. every child takes at least one measurement independently. educator asks one question per group — never gives the answer. tool orientation is embedded for any new child in the first 3–4 experiment segments.",
    type: "rotating",
    rotationPool: [],
  },
  {
    id: "build",
    name: "build",
    durationRange: "40 min",
    objective:
      "5-minute engage question opens the segment — one question, 3–4 answers, connect to today's build. then each child builds their own model from a personal kit and a step card. the educator never fixes and never tells. four questions only.",
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

// ─── Session table — 15 sessions (3 models × 5 continuous days) ────

// 5 days per model — Day 1 Explore · Days 2–3 Make · Day 4 Complete and
// Test · Day 5 Improve and Disassemble.
const DAY_LABELS_5_8: Record<number, string> = {
  1: "Day 1 — Explore",
  2: "Day 2 — Make",
  3: "Day 3 — Make",
  4: "Day 4 — Complete and Test",
  5: "Day 5 — Improve and Disassemble",
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
  // ─── Trial session (day 0) — Crane preview ─────────────────
  s(0, "l1-pulleys-e1", "Crane", "build-crane", 1,
    "Did you know we're going to play building games today? We'll try things with our body first, and then build a real crane. You'll use real parts to make something that moves. You can try again if it doesn't work. By the end, you'll have made your own crane.",
    "What part of your crane did the most important job today?"),
  // ─── See-saw · 5 days · L2 Levers e1 (day 1) · L1 Levers e1 (days 2–3) · L1 Levers e2 (days 4–5)
  s(1, "l2-levers-e1", "See-saw", "build-see-saw", 1,
    "Has anyone played on a see-saw? When you sit on one end and your friend sits on the other — what makes it go up and what makes it go down?",
    "What does a lever do that makes lifting easier — in one sentence?"),
  s(2, "l1-levers-e1", "See-saw", "build-see-saw", 2,
    "Yesterday we saw a lever makes lifting easier. Today — if we make the lever longer, do you think it gets even easier, or harder?",
    "Does a longer lever make lifting easier or harder?"),
  s(3, "l1-levers-e1", "See-saw", "build-see-saw", 3,
    "If you are lighter than your friend on a see-saw — what could you do to make your side go down? Where would you sit?",
    "After two days with this experiment — what is the rule between lever length and effort?"),
  s(4, "l1-levers-e2", "See-saw", "build-see-saw", 4,
    "Your see-saw is nearly complete. Before we test it — if you put a heavier weight on one end, do you think it needs more effort or less to lift?",
    "When the load gets heavier, what happens to the effort needed to lift it?"),
  s(5, "l1-levers-e2", "See-saw", "build-see-saw", 5,
    "Your see-saw works. What one change would you make to improve it — and how will you know whether your change actually helped? Then we will take it apart together.",
    "What is the one most important thing you found out about levers across these five days?"),
  // ─── Weighing Scale · 5 days · L1 Levers e3 (days 6–7) · L1 Levers e4 (day 8) · L2 Levers e5 (days 9–10)
  s(6, "l1-levers-e3", "Weighing Scale", "build-weighing-scale", 1,
    "When a shopkeeper at a market weighs vegetables using a balance scale — how does she know when the weight is exactly right? What is she looking for?",
    "When the two sides hold the same weight — what does the beam do?"),
  s(7, "l1-levers-e3", "Weighing Scale", "build-weighing-scale", 2,
    "Yesterday you watched the scale balance. Today — if I put a mango on one side and an apple on the other, what has to be true for the pans to be level?",
    "After two days with this experiment — how does a balance scale tell you two things weigh the same?"),
  s(8, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 3,
    "We balanced two equal weights yesterday. Does it matter what the two things are — a stone and a toy — as long as they weigh the same?",
    "Do any two equal weights balance, no matter what they are?"),
  s(9, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 4,
    "Your Weighing Scale is nearly complete. If one side is heavier than the other, where do you think the middle point has to move so it still balances?",
    "If one side is heavier, which way must the fulcrum move to balance both sides?"),
  s(10, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 5,
    "What would make your Weighing Scale more accurate? Pick one change, predict what it will do, then we will test and take it apart.",
    "What is the one most important thing you found out about balancing with a lever?"),
  // ─── Crane · 5 days · L1 Pulleys e2 (day 11) · L1 Pulleys e1 (days 12–13) · L1 Pulleys e3 (days 14–15)
  s(11, "l1-pulleys-e2", "Crane", "build-crane", 1,
    "When you raise a flag on a flagpole — you pull the rope down and the flag goes up. You are pulling the wrong direction. How does that work?",
    "What does a pulley do to the direction you pull?"),
  s(12, "l1-pulleys-e1", "Crane", "build-crane", 2,
    "Think about a construction crane at a building site. It lifts huge heavy things with one operator. If the load gets heavier, do you think pulling gets harder?",
    "What happens to the effort when the load gets heavier on a pulley?"),
  s(13, "l1-pulleys-e1", "Crane", "build-crane", 3,
    "Yesterday we measured the effort to lift with a pulley. Today — do you predict a heavier load always needs more effort, or does the pulley keep it the same?",
    "After two days with this experiment — what is the rule for effort and load on a single pulley?"),
  s(14, "l1-pulleys-e3", "Crane", "build-crane", 4,
    "Your crane is taking shape. Before we test it — if we raise the pulley higher up, do you think it gets easier or harder to lift the same load?",
    "Does raising the pulley higher change the effort to lift?"),
  s(15, "l1-pulleys-e3", "Crane", "build-crane", 5,
    "Your crane lifts something today. What one change would you make to help it lift more — or lift more smoothly? Test it, then we will take it apart together.",
    "What is the one most important thing you found out about pulleys across these five days?"),
  // ─── Fishing Rod · 5 days · Levers & Pulleys · L2 Levers e6 (days 1–2) · L1 Pulleys e4 (days 3–5 incl. improve)
  s(16, "l2-levers-e6", "Fishing Rod", "build-fishing-rod", 1,
    "When you catch a big fish, the rod bends right over. Why does a long bendy rod help more than a short stiff stick?",
    "With the fulcrum close to the load — which lever size lifts with the least effort?"),
  s(17, "l2-levers-e6", "Fishing Rod", "build-fishing-rod", 2,
    "Yesterday we found the best lever size. Today — if the fish is heavier, would you want a longer rod or a shorter one to lift it?",
    "After two days with this experiment — how do lever length and the fulcrum together make lifting easier?"),
  s(18, "l1-pulleys-e4", "Fishing Rod", "build-fishing-rod", 3,
    "A fishing reel lets you wind the line in from any angle. Does it feel easier to wind when you pull from a different direction?",
    "Does the direction you pull change the effort, or only how comfortable it feels?"),
  s(19, "l1-pulleys-e4", "Fishing Rod", "build-fishing-rod", 4,
    "Your rod and reel are nearly done. Before we test — when you reel in, does the pulley change how hard you pull, or just where you pull from?",
    "After two days with this experiment — what does the reel's pulley actually change?"),
  s(20, "l1-pulleys-e4", "Fishing Rod", "build-fishing-rod", 5,
    "Your fishing rod reels a load today. What one change would make it reel more smoothly? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about how a lever and a pulley work together?"),
  // ─── Copter · 5 days · Gears · L1 Gears e1 (days 1–2) · e2 (days 3–4) · e3 (day 5 improve)
  s(21, "l1-gears-e1", "Copter", "build-copter", 1,
    "Have you seen a helicopter's blades spin? They go round really fast — but a person is just sitting inside. What do you think is making them turn?",
    "When two gears touch side by side — do they turn the same way or opposite ways?"),
  s(22, "l1-gears-e1", "Copter", "build-copter", 2,
    "Yesterday we saw gears turn each other. Today — if I join two gears with a chain instead of touching them, do you think they still turn opposite ways?",
    "After two days with this experiment — what is the rule for which way connected gears turn?"),
  s(23, "l1-gears-e2", "Copter", "build-copter", 3,
    "A small gear is turning a big gear. If I spin the small one all the way around once — do you think the big one goes all the way around too, or less?",
    "When a small gear drives a big gear — does the big gear turn more or fewer times?"),
  s(24, "l1-gears-e2", "Copter", "build-copter", 4,
    "Your copter is nearly built. Before we test it — when you turn the handle once, do you think the blades will spin once, or more than once?",
    "After two days with this experiment — how does gear size change how many times a gear turns?"),
  s(25, "l1-gears-e3", "Copter", "build-copter", 5,
    "Your blades spin today. What one change would make them spin faster or smoother? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about gears across these five days?"),
  // ─── Rickshaw · 5 days · Wheels & Axles · L1 W&A e2 (days 1–2) · e3 (days 3–4) · L2 W&A e2 (day 5)
  s(26, "l1-wheel-axle-e2", "Rickshaw", "build-rickshaw", 1,
    "A rickshaw carries one person, sometimes two or three. Is it easier or harder to pull when more people climb on? Why?",
    "When the cart carries a heavier load — does it roll further or shorter from the same push?"),
  s(27, "l1-wheel-axle-e2", "Rickshaw", "build-rickshaw", 2,
    "Yesterday a heavier load rolled a shorter way. Today — if you wanted the rickshaw to go further, would you load it more or less?",
    "After two days with this experiment — what is the rule between load and how far the cart rolls?"),
  s(28, "l1-wheel-axle-e3", "Rickshaw", "build-rickshaw", 3,
    "If you put all the bags at the very front of a cart, does it roll the same as when they're in the middle? What might change?",
    "Does where the load sits change how the cart rolls?"),
  s(29, "l1-wheel-axle-e3", "Rickshaw", "build-rickshaw", 4,
    "Your rickshaw is nearly built. Before we test — where should the passenger sit so it rolls straightest: front, back, or middle?",
    "After two days with this experiment — which load position rolls best, and why?"),
  s(30, "l2-wheel-axle-e2", "Rickshaw", "build-rickshaw", 5,
    "Your rickshaw rolls today. What one change would help it carry a heavier load further? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about wheels and axles across these five days?"),
  // ─── Wind Turbine · 5 days · Pulleys · L2 Pul e1 (days 1–2) · e4 (day 3) · L1 Pul e5 (days 4–5)
  s(31, "l2-pulleys-e1", "Wind Turbine", "build-wind-turbine", 1,
    "A wind turbine's blades spin in the wind and that spinning can lift things. How could spinning blades pull a weight up?",
    "With a double pulley — how does the effort to lift compare across different weights?"),
  s(32, "l2-pulleys-e1", "Wind Turbine", "build-wind-turbine", 2,
    "Yesterday we measured the effort with a double pulley. Today — do you think a heavier weight always needs more effort, even with a pulley helping?",
    "After two days with this experiment — what does a double pulley do to the effort needed?"),
  s(33, "l2-pulleys-e4", "Wind Turbine", "build-wind-turbine", 3,
    "If we raise the pulley higher up the mast, do you think it gets easier or harder to lift the same load? Or does nothing change?",
    "Does the height of a fixed pulley change the effort to lift?"),
  s(34, "l1-pulleys-e5", "Wind Turbine", "build-wind-turbine", 4,
    "Your turbine is nearly built. Before we test — when the blades wind up the rope through the pulley, will it feel easier than lifting the weight by hand?",
    "How does adding more pulley make lifting easier?"),
  s(35, "l1-pulleys-e5", "Wind Turbine", "build-wind-turbine", 5,
    "Your turbine lifts a load today. What one change would help it lift more, or lift more smoothly? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about pulleys across these five days?"),
  // ─── Drawbridge · 5 days · Wheels, Axles & Pulleys · L2 W&A e2 (day 1) · e3 (days 2–3) · L2 Pul e4 (day 4) · e5 (day 5)
  s(36, "l2-wheel-axle-e2", "Drawbridge", "build-drawbridge", 1,
    "A castle drawbridge has to hold its weight and still lift up. What do you think has to be strong for it to work?",
    "When a cart carries a heavier load — how does that change the distance it rolls?"),
  s(37, "l2-wheel-axle-e3", "Drawbridge", "build-drawbridge", 2,
    "A drawbridge swings on an axle to go up and down. If the axle points a different way, does the bridge move differently?",
    "How does the angle of the axle change the direction of movement?"),
  s(38, "l2-wheel-axle-e3", "Drawbridge", "build-drawbridge", 3,
    "Yesterday we steered with the axle. Today — to make your bridge rise straight, which way should the axle point?",
    "After two days with this experiment — how does the axle control the way the bridge moves?"),
  s(39, "l2-pulleys-e4", "Drawbridge", "build-drawbridge", 4,
    "Your drawbridge is nearly built. Before we test — if the pulley is higher up, will the bridge be easier or harder to raise?",
    "Does the pulley height change the effort to raise the bridge?"),
  s(40, "l2-pulleys-e5", "Drawbridge", "build-drawbridge", 5,
    "Your drawbridge raises and lowers today. What one change would make it move more smoothly? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about how axles and pulleys work together?"),
  // ─── Tow Truck · 5 days · Wheels, Axles & Pulleys · L2 Pul e5 (day 1) · L2 W&A e4 (days 2–3) · e5 (days 4–5)
  s(41, "l2-pulleys-e5", "Tow Truck", "build-tow-truck", 1,
    "A tow truck has a winch that pulls a broken-down car up onto it. You can hook the rope from different sides — does that change how hard it is to pull?",
    "When you pull a pulley rope from different sides — does the effort change, or just the comfort?"),
  s(42, "l2-wheel-axle-e4", "Tow Truck", "build-tow-truck", 2,
    "A tow truck carries a heavy car on its back. Should the load sit over the middle or at the very back? Which do you think rolls better?",
    "When the load is centred versus at the back — which cart rolls further?"),
  s(43, "l2-wheel-axle-e4", "Tow Truck", "build-tow-truck", 3,
    "Yesterday we compared load positions. Today — for your tow truck to roll straight with a car on it, where should the load sit?",
    "After two days with this experiment — why does load position change the distance?"),
  s(44, "l2-wheel-axle-e5", "Tow Truck", "build-tow-truck", 4,
    "Your tow truck is nearly built. Before we test — if the axles are further apart, do you think it rolls further or shorter?",
    "How does the spacing between the axles change how the cart rolls?"),
  s(45, "l2-wheel-axle-e5", "Tow Truck", "build-tow-truck", 5,
    "Your tow truck rolls and winches today. What one change would help it pull or roll better? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about wheels, axles and pulleys working together?"),
  // ─── Bulldozer · 5 days · Gears · L1 Gears e3 (day 1) · e4 (days 2–3) · L2 Gears e1 (days 4–5)
  s(46, "l1-gears-e3", "Bulldozer", "build-bulldozer", 1,
    "A bulldozer pushes huge piles of earth. It moves slowly but with enormous force. How could gears make a machine slow but very strong?",
    "When a big gear drives a small gear — does the small gear turn more or fewer times?"),
  s(47, "l1-gears-e4", "Bulldozer", "build-bulldozer", 2,
    "Two gears the same size are joined by a chain. If I turn one all the way around, what do you think the other one does?",
    "When two gears are equal in size — how do their turns compare?"),
  s(48, "l1-gears-e4", "Bulldozer", "build-bulldozer", 3,
    "Yesterday equal gears turned together. Today — to make your bulldozer's blade move at the same speed as the handle, what size gears would you choose?",
    "After two days with this experiment — when do two gears turn one-to-one?"),
  s(49, "l2-gears-e1", "Bulldozer", "build-bulldozer", 4,
    "Your bulldozer is nearly built. Before we test — if a small gear turns a big gear many times, will the big gear be fast or slow?",
    "When a small gear drives a big gear over many turns — what is the pattern in the numbers?"),
  s(50, "l2-gears-e1", "Bulldozer", "build-bulldozer", 5,
    "Your bulldozer drives today. What one change to the gears would make it faster or stronger? Pick it, say what you expect, then test — and we will take it apart together.",
    "What is the one most important thing you found out about gears across these five days?"),
];

// Checkpoint at the end of each 5-day model build (sessions 5, 10, 15, 20, …)
sessionTable.forEach((entry) => {
  if ([5, 10, 15, 20, 25, 30, 35, 40, 45, 50].includes(entry.sessionNumber)) entry.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 5,
    descriptors: [
      { skillArea: "B&M", beginning: "still needs educator help to connect parts correctly (Fit)", developing: "follows the step card one step at a time (Follow)", secure: "adjusts a failing connection within the design without being told (Adjust)" },
      { skillArea: "PS", beginning: "waits to be told what is wrong", developing: "notices when something is not working — without being told (Notice)", secure: "tries a different approach instead of repeating what already failed (Try)" },
      { skillArea: "O&U", beginning: "watches but does not notice specifics", developing: "looks closely and identifies what is happening (Observe)", secure: "takes accurate readings and records them correctly (Measure)" },
    ],
  },
  {
    afterSession: 10,
    descriptors: [
      { skillArea: "B&M", beginning: "adjusts one failing part with prompts", developing: "adjusts and fixes independently (Adjust)", secure: "makes one deliberate change to make the model work better and checks whether it worked (Improve ★)" },
      { skillArea: "PS", beginning: "tries different approaches (Try)", developing: "tries a new way that goes beyond the given steps (Change)", secure: "keeps working through difficulty without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "records readings in the right place (Measure)", developing: "states what will happen before testing — without being prompted (Predict)", secure: "explains why something happened using a clear reason (Explain ★)" },
    ],
  },
  {
    afterSession: 15,
    descriptors: [
      { skillArea: "B&M", beginning: "adjusts independently (Adjust)", developing: "makes a deliberate improvement (Improve)", secure: "makes a deliberate improvement, checks the before and after, and names the change that made the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries genuinely different approaches (Try)", developing: "goes beyond the given steps to solve the problem (Change)", secure: "persists through multiple attempts to reach the goal (Persist ★)" },
      { skillArea: "O&U", beginning: "predicts before testing (Predict)", developing: "gives a reason for what happened (Explain)", secure: "explains why something happened using a clear reason — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 20,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the fishing-rod steps with prompts", developing: "builds the rod and reel independently (Follow/Adjust)", secure: "makes a deliberate change to the rod or reel, checks before and after, and names the change that helped most (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when the reel sticks (Try)", developing: "goes beyond the steps to fix the rod or reel (Change)", secure: "persists through repeated problems without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "records lever and pulley readings (Measure)", developing: "predicts before reading (Predict)", secure: "explains how the lever and pulley work together — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 25,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the gear-train steps with prompts", developing: "builds the gear train independently (Follow/Adjust)", secure: "makes a deliberate change to the gearing, checks before and after, and names what made the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when a gear slips (Try)", developing: "goes beyond the steps to fix the gear train (Change)", secure: "persists through repeated meshing problems without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "counts gear turns and records them (Measure)", developing: "predicts the turns before counting (Predict)", secure: "explains why gear size changes the number of turns — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 30,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the cart-build steps with prompts", developing: "builds the wheel-and-axle cart independently (Follow/Adjust)", secure: "makes a deliberate change to load or axles, checks before and after, and names the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when the cart veers (Try)", developing: "goes beyond the steps to make it roll straight (Change)", secure: "persists through repeated runs without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "measures the distance rolled (Measure)", developing: "predicts which load/position rolls furthest (Predict)", secure: "explains why load and axle placement change the roll — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 35,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the pulley-build steps with prompts", developing: "builds the turbine's pulley system independently (Follow/Adjust)", secure: "makes a deliberate change to the pulley, checks before and after, and names the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when the rope slips (Try)", developing: "goes beyond the steps to make it lift (Change)", secure: "persists through repeated lifts without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "measures the lifting effort (Measure)", developing: "predicts how a pulley changes the effort (Predict)", secure: "explains why more pulley makes lifting easier — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the axle-and-pulley steps with prompts", developing: "builds the drawbridge mechanism independently (Follow/Adjust)", secure: "makes a deliberate change to the axle or pulley, checks before and after, and names the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when the bridge jams (Try)", developing: "goes beyond the steps to make it raise smoothly (Change)", secure: "persists through repeated attempts without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "measures direction and effort (Measure)", developing: "predicts how the axle and pulley behave (Predict)", secure: "explains how axles and pulleys combine — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 45,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the tow-truck steps with prompts", developing: "builds the wheels, axles and winch independently (Follow/Adjust)", secure: "makes a deliberate change to the build, checks before and after, and names the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when it veers or stalls (Try)", developing: "goes beyond the steps to make it roll and winch (Change)", secure: "persists through repeated runs without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "measures distance and effort (Measure)", developing: "predicts the best load position and pull (Predict)", secure: "explains how wheels, axles and pulleys combine — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 50,
    descriptors: [
      { skillArea: "B&M", beginning: "follows the bulldozer gear-train steps with prompts", developing: "builds the gear-driven bulldozer independently (Follow/Adjust)", secure: "makes a deliberate change to the gearing, checks before and after, and names the biggest difference (Improve ★)" },
      { skillArea: "PS", beginning: "tries a different approach when a gear slips (Try)", developing: "goes beyond the steps to drive the blade and tracks (Change)", secure: "persists through repeated problems without giving up (Persist ★)" },
      { skillArea: "O&U", beginning: "counts gear turns and records them (Measure)", developing: "predicts the turns from the ratio (Predict)", secure: "explains why the gearing trades speed for force — linked to the data (Explain ★)" },
    ],
  },
];

// ─── Model ↔ experiment pairings (why they go together) ─────
// The "experiment + build" logic: every model is built from the same
// machine parts the experiments test. The experiment list per model is
// derived from the sessionTable; these lines explain the pairing.

const modelPairings: ModelPairing[] = [
  { model: "See-saw", topic: "Levers",
    why: "A see-saw is a lever balancing on a central fulcrum. Its experiments explore how lever length and load change the effort to lift — exactly what the see-saw beam does." },
  { model: "Weighing Scale", topic: "Levers",
    why: "A weighing scale is a two-pan lever that must balance, not just assemble. Its experiments are the balance experiments — equal weights level the beam — which is precisely how the scale works." },
  { model: "Crane", topic: "Pulleys",
    why: "A crane lifts a load with a rope over a pulley. Its experiments measure pulley effort and how a pulley changes the direction of pull — the lifting system the crane is built from." },
  { model: "Fishing Rod", topic: "Levers & Pulleys",
    why: "A fishing rod is a lever (the rod arm) joined to a pulley (the reel). It pairs a lever experiment with a pulley experiment because the build uses both parts together." },
  { model: "Copter", topic: "Gears",
    why: "A copter turns a hand crank into spinning blades through a gear train. Its gear experiments — turn direction and gear ratio — explain why the rotor spins faster or slower than the handle." },
  { model: "Rickshaw", topic: "Wheels & Axles",
    why: "A rickshaw rolls on wheels fixed to axles. Its experiments test how load and load-position change the distance it rolls — the wheel-and-axle behaviour the rickshaw is built on." },
  { model: "Wind Turbine", topic: "Pulleys",
    why: "A wind turbine turns spinning blades into lifting power through a pulley. Its experiments measure double-pulley effort and pulley height — the lifting system the turbine drives." },
  { model: "Drawbridge", topic: "Wheels, Axles & Pulleys",
    why: "A drawbridge swings on an axle and is raised by a pulley. It pairs a steering/axle experiment with a pulley experiment because the build uses both to move the deck." },
  { model: "Tow Truck", topic: "Wheels, Axles & Pulleys",
    why: "A tow truck rolls on wheels and axles and winches a load with a pulley. Its experiments combine rolling (wheel-and-axle) with winching (pulley) — the two jobs the truck does." },
  { model: "Bulldozer", topic: "Gears",
    why: "A bulldozer drives its blade and tracks through a gear train. Its gear experiments — ratio and equal gears — explain how the gearing trades speed for the force it needs to push." },
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
    "build simple machines and understand how things work.",
  description:
    "level 1 — mechanics. across ten models — see-saw, weighing scale, crane, fishing rod, copter, rickshaw, wind turbine, drawbridge, tow truck, and bulldozer — children run experiments on levers, pulleys, gears, and wheels & axles, then build a machine that uses what they just discovered. they finish the year able to look at a machine and explain why it works.",
  totalSessions: 50,
  skillAreas,
  segmentDefinitions,
  sessionTable,
  activities: {
    ...experimentActivities,
    ...buildActivities,
    "rob-experience-book": experienceBookActivity,
  },
  checkpoints,
  modelPairings,
  trialSession: ROBOTICS_TRIAL_SESSION_5_8,
};
