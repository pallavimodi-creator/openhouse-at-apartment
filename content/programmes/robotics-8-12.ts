import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  CurriculumSkillArea,
  CurriculumSegmentDef,
  ModelPairing,
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

  // ─── Gears (Copter, Bulldozer) ────────────────────────────
  "l1-gears-e1": {
    id: "l1-gears-e1",
    segment: "experiment",
    title: "l1 gears e1 — which way do gears turn",
    cardName: "L1 Gears e1",
    setupLine:
      "connect gear a and gear b two ways — side by side, then with a chain. which way does each one turn?",
    howToPlay:
      "Children connect Gear A and Gear B in two setups: (1) meshed side-by-side, and (2) linked with a chain. Turn Gear A and watch Gear B each time. Record the direction of Gear B for each setup. Meshed gears turn opposite ways; a chain makes them turn the same way. 8–12 children predict the direction before turning and explain why the chain reverses the relationship.",
    materials: [
      "Experiment Card: L1 Gears e1",
      "Gear A and Gear B — 1 of each per group",
      "Gear chain — 1 per group",
      "Baseplate with mounting points, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child builds both setups and records the direction of Gear B for each." },
      { level: "Medium", description: "Child predicts each direction before turning and checks." },
      { level: "Hard", description: "Child explains why meshed gears reverse but a chain keeps direction — generalising to any gear pair." },
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
      "Two gears — one small, one big — connected with a chain. Turn the small gear 3, 5, 8 times and count the turns on the big gear each time. Each child records both numbers and looks for the ratio. The big gear turns fewer times than the small gear — the first measured gear ratio.",
    materials: [
      "Experiment Card: L1 Gears e2",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child turns the small gear and records the big gear's turns each time." },
      { level: "Medium", description: "Child predicts the big gear's turns before counting and checks." },
      { level: "Hard", description: "Child works out the ratio between the gears and predicts the next reading from it." },
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
      "The same small and big gears joined by a chain, but now drive the big gear. Turn it 3, 5, 8 times and count the turns on the small gear each time. Each child records both numbers. The small gear turns more times than the big gear — the inverse of e2, confirming the ratio works both ways.",
    materials: [
      "Experiment Card: L1 Gears e3",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child turns the big gear and records the small gear's turns each time." },
      { level: "Medium", description: "Child predicts the small gear's turns and checks." },
      { level: "Hard", description: "Child explains why the ratio inverts and links it back to e2 with the numbers." },
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
      "Two equal-sized gears connected with a chain. Turn Gear A 4, 6, 9 times and count the turns on Gear B each time. Each child records both numbers. Equal gears turn one-to-one — a ratio of 1 that contrasts with the small/big pairs in e2 and e3.",
    materials: [
      "Experiment Card: L1 Gears e4",
      "Two equal-sized gears — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child turns Gear A and records Gear B's turns each time." },
      { level: "Medium", description: "Child predicts Gear B's turns before counting and checks." },
      { level: "Hard", description: "Child explains why equal gears give a one-to-one ratio, comparing to the unequal pairs." },
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
      "Two gears — one small, one big — connected with a chain. Turn the small gear 6, 9, 12 times and count the turns on the big gear each time. Each child records both numbers and calculates the ratio. Extends e2 to larger numbers so children can confirm the gear ratio precisely.",
    materials: [
      "Experiment Card: L2 Gears e1",
      "Small gear + big gear — 1 pair per group",
      "Gear chain — 1 per group",
      "Baseplate, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child turns the small gear and records the big gear's turns each time." },
      { level: "Medium", description: "Child calculates the ratio from each pair of readings." },
      { level: "Hard", description: "Child predicts the big gear's turns from the ratio before counting and records the error." },
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
      "Children build a cart with 4 wheels and 2 axles, then give it one steady push from A and measure how far it travels carrying 0.5kg, 1kg, and 1.5kg in turn. Each child records the distance for each load. The heavier the load, the shorter the distance from the same push.",
    materials: [
      "Experiment Card: L1 Wheel&Axle e2",
      "4 wheels + 2 axles + cart base — 1 set per group",
      "0.5kg, 1kg, 1.5kg weights",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child gives a steady push and reads the distance for each load." },
      { level: "Medium", description: "Child measures the distance for each load and orders them." },
      { level: "Hard", description: "Child predicts the relationship between load and distance before testing and explains it with the data." },
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
      { level: "Easy", description: "Child pushes for each position and reads the distance." },
      { level: "Medium", description: "Child measures the distance for all three positions and compares." },
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
      "Children build a cart and give it the same gentle push from A while carrying 2kg, 2.5kg, and 3kg. Each child measures and records the distance for each load. Extends the L1 idea to heavier weights so children can quantify how added load shortens the roll.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e2",
      "Cart (4 wheels, 2 axles) — 1 per group",
      "2kg, 2.5kg, 3kg weights",
      "Measuring tape, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child pushes and records the distance for each load." },
      { level: "Medium", description: "Child measures all three and describes the trend." },
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
      "Children build a cart whose front axle can be angled, then set it to the left, centre, and right and push it each time, recording the direction the cart travels. Each child notes the direction for each setup. The front axle angle steers the cart — the basis of how a steering axle works.",
    materials: [
      "Experiment Card: L2 Wheel&Axle e3",
      "Cart with a steerable front axle — 1 per group",
      "Open floor space, erasable marker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child sets each angle and says which way the cart went." },
      { level: "Medium", description: "Child records the direction for all three angles." },
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
      { level: "Easy", description: "Child pushes both carts and compares the two distances." },
      { level: "Medium", description: "Child measures and records each distance." },
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
      { level: "Easy", description: "Child pushes both carts and compares the two distances." },
      { level: "Medium", description: "Child measures and records each distance." },
      { level: "Hard", description: "Child predicts which spacing rolls further before testing and explains the result." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-wheel-axle-e5.pdf",
  },

  // ─── Extra pulley experiments (Wind Turbine, Tow Truck) ───
  "l1-pulleys-e5": {
    id: "l1-pulleys-e5",
    segment: "experiment",
    title: "l1 pulleys e5 — lifting with a double pulley",
    cardName: "L1 Pulleys e5",
    setupLine:
      "lift 0.5kg, 1kg, 1.5kg using a double pulley. how much effort does each one need?",
    howToPlay:
      "Children use a double pulley to lift 0.5kg, 1kg, and 1.5kg in turn, reading the spring scale each time. Each child records the effort for each weight. With a double pulley the effort is noticeably less than lifting by hand — a measured look at how more pulleys share the load.",
    materials: [
      "Experiment Card: L1 Pulleys e5",
      "Double pulley + mount · rope · spring scale",
      "0.5kg, 1kg, 1.5kg weights · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child lifts each weight and reads the effort." },
      { level: "Medium", description: "Child records the effort for each weight and compares to lifting by hand." },
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
      "Children lift 0.5kg, 1kg, and 1.5kg with a double pulley, reading and recording the spring-scale effort for each. Each child takes at least one reading and works out how the effort compares to the weight — the mechanical advantage of the double pulley.",
    materials: [
      "Experiment Card: L2 Pulleys e1",
      "Double pulley + mount · rope · spring scale",
      "0.5kg, 1kg, 1.5kg weights · cup with hook",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child lifts and reads the effort for each weight." },
      { level: "Medium", description: "Child records the effort and compares it to the weight." },
      { level: "Hard", description: "Child calculates the mechanical advantage and predicts the effort for a new weight." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/l2-pulley-e1.pdf",
  },
};

// ─── Build activities — 4 days per model ────────────────────

const buildActivities: Record<string, CurriculumActivity> = {
  "build-see-saw": {
    id: "build-see-saw",
    segment: "build",
    title: "see-saw build",
    setupLine:
      "each child builds their own see-saw from a personal kit. four sessions — day by day.",
    howToPlay:
      "The see-saw is a simple lever — a beam on a central fulcrum. Intuitive entry into lever concepts. Day 1 Explore + Make: read the full Model Manual, identify and name every component, lay them out in manual order, begin the build. Day 2 Make: continue the build, teacher uses only four questions. Day 3 Complete and Test: finish, run the full test sequence, record best result with actual measurement. Day 4 Improve and Disassemble: state what you expect to change before touching anything, make one deliberate change, test, record before-and-after — then sort the kit back from memory (no tray map). Teacher names each component as it goes back.",
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
      "Complex two-pan lever. Every lever experiment directly explains what the build is doing. Same 4-day cycle: Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test · Day 4 Improve and Disassemble (from memory).",
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
      "Crane uses a pulley system. Same 4-day cycle: Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test · Day 4 Improve and Disassemble (from memory).",
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
  "build-fishing-rod": {
    id: "build-fishing-rod",
    segment: "build",
    title: "fishing rod build",
    setupLine:
      "the lever-and-pulley model — a rod that bends like a lever and reels in line through a pulley. four sessions.",
    howToPlay:
      "The fishing rod combines a lever (the rod arm) with a pulley (the reel) — the lever and pulley experiments both explain what the build is doing. Day 1 Explore + Make: read the full Model Manual, identify and name every component, lay them out in manual order, begin the build. Day 2 Make: continue, teacher uses only four questions. Day 3 Complete and Test: finish, reel a load up, record the result with actual measurement. Day 4 Improve and Disassemble: state the expected change before touching anything, make one deliberate change, test, record before-and-after — then sort the kit back from memory.",
    materials: [
      "Personal Fishing Rod kit additions per child (distributed at Day 1)",
      "Model Manual — Fishing Rod.pdf (1 per child)",
      "Rod arm, reel, pulley, line (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, plans the next stage, and checks own work." },
      { level: "Hard", description: "Child proposes the Improve-day change before Day 4, states the expected effect, tests, measures." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/fishing-rod.pdf",
  },
  "build-copter": {
    id: "build-copter",
    segment: "build",
    title: "copter build",
    setupLine:
      "the gear model — a copter whose blades spin through a gear train. four sessions from kit to spinning rotor.",
    howToPlay:
      "The copter turns a hand crank into spinning blades through meshed gears — the gear experiments explain why the rotor spins faster or slower than the handle. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (how many blade turns per handle turn? record the ratio) · Day 4 Improve and Disassemble (one deliberate change to the gearing, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Copter kit additions per child (distributed at Day 1)",
      "Model Manual — Copter.pdf (1 per child)",
      "Gears, chain, crank handle (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names each gear's job, and checks own work." },
      { level: "Hard", description: "Child proposes a gearing change before Day 4, predicts the effect on rotor speed, tests, measures." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/copter.pdf",
  },
  "build-rickshaw": {
    id: "build-rickshaw",
    segment: "build",
    title: "rickshaw build",
    setupLine:
      "the wheel-and-axle model — a rickshaw that rolls on wheels and axles. four sessions from kit to rolling cart.",
    howToPlay:
      "The rickshaw rolls on wheels fixed to axles — the wheel-and-axle experiments explain how load and axle placement change the way it rolls. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (load it, push it, measure distance and straightness) · Day 4 Improve and Disassemble (one deliberate change, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Rickshaw kit additions per child (distributed at Day 1)",
      "Model Manual — Rickshaw.pdf (1 per child)",
      "Wheels, axles, cart frame (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names what each axle does, and checks own work." },
      { level: "Hard", description: "Child proposes a change before Day 4, predicts the effect on the roll, tests, measures." },
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
      "the pulley model — a wind turbine whose blades drive a pulley to lift a small load. four sessions.",
    howToPlay:
      "The wind turbine turns spinning blades into lifting power through a pulley — the pulley experiments explain how the lifting system works. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (spin the blades, does the pulley wind up and lift the load? record it) · Day 4 Improve and Disassemble (one deliberate change, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Wind Turbine kit additions per child (distributed at Day 1)",
      "Model Manual — Wind Turbine.pdf (1 per child)",
      "Blades, pulley, rope, mast (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names what the pulley does, and checks own work." },
      { level: "Hard", description: "Child proposes a change before Day 4, predicts the effect on lifting, tests, measures." },
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
      "the wheel, axle and pulley model — a drawbridge that raises and lowers on a pulley. four sessions.",
    howToPlay:
      "The drawbridge raises and lowers using axles and a pulley — the wheel-and-axle and pulley experiments both explain what the build is doing. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (raise and lower the bridge, does it hold and move smoothly? record it) · Day 4 Improve and Disassemble (one deliberate change, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Drawbridge kit additions per child (distributed at Day 1)",
      "Model Manual — Drawbridge.pdf (1 per child)",
      "Axles, pulley, rope, bridge deck (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names what the axle and pulley do, and checks own work." },
      { level: "Hard", description: "Child proposes a change before Day 4, predicts the effect, tests, measures." },
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
      "the wheel, axle and pulley model — a tow truck that rolls on axles and winches a load on a pulley. four sessions.",
    howToPlay:
      "The tow truck rolls on wheels and axles and winches a load with a pulley — the wheel-and-axle and pulley experiments both explain what the build is doing. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (drive it and winch a load, does it roll straight and pull the load up? record it) · Day 4 Improve and Disassemble (one deliberate change, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Tow Truck kit additions per child (distributed at Day 1)",
      "Model Manual — Tow Truck.pdf (1 per child)",
      "Wheels, axles, pulley, winch rope (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names what the axles and winch pulley do, and checks own work." },
      { level: "Hard", description: "Child proposes a change before Day 4, predicts the effect, tests, measures." },
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
      "the gear model — a bulldozer whose blade and tracks are driven through gears. four sessions.",
    howToPlay:
      "The bulldozer drives its blade and tracks through a gear train — the gear experiments explain how the gearing trades speed for force. Day 1 Explore + Make · Day 2 Make · Day 3 Complete and Test (run it, do the gears drive the blade and tracks? record it) · Day 4 Improve and Disassemble (one deliberate change to the gearing, state the expected effect, test, record before-and-after — then sort the kit back from memory).",
    materials: [
      "Personal Bulldozer kit additions per child (distributed at Day 1)",
      "Model Manual — Bulldozer.pdf (1 per child)",
      "Gears, chain, blade, tracks (included in kit)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Child reads and builds independently with occasional teacher check." },
      { level: "Medium", description: "Child reads ahead, names each gear's job, and checks own work." },
      { level: "Hard", description: "Child proposes a gearing change before Day 4, predicts the effect on speed and force, tests, measures." },
    ],
    debriefPrompts: [],
    type: "physical-game",
    pdfUrl: "/robotics-manuals/bulldozer.pdf",
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

// ─── Session table — 12 sessions (3 models × 4 continuous days) ────

// 4 days per model — Day 1 Explore + Make · Day 2 Make · Day 3 Complete
// and Test · Day 4 Improve and Disassemble.
const DAY_LABELS_8_12: Record<number, string> = {
  1: "Day 1 — Explore + Make",
  2: "Day 2 — Make",
  3: "Day 3 — Complete and Test",
  4: "Day 4 — Improve and Disassemble",
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
  // ─── See-saw · 4 days · L2 Levers e1 (d1) · L1 Levers e1 (d2) · L1 Levers e2 (d3–4)
  s(1, "l2-levers-e1", "See-saw", "build-see-saw", 1,
    "A see-saw is one of the oldest machines in the world, but also one of the most precisely engineered things on a playground. Lift a load directly, then with a lever — predict which needs less effort, then measure.",
    "What does a lever do that makes lifting easier — and by roughly how much?"),
  s(2, "l1-levers-e1", "See-saw", "build-see-saw", 2,
    "Yesterday a lever made lifting easier. Today — if we make the lever arm longer, can you predict the effort reading before you take it, then test?",
    "What is the relationship between lever length and the effort needed to lift?"),
  s(3, "l1-levers-e2", "See-saw", "build-see-saw", 3,
    "Architects designing a cantilever bridge use the same principle as a see-saw. If the load gets heavier, predict how the effort changes — is it proportional?",
    "Is the load-to-effort increase proportional? What does the calculation show?"),
  s(4, "l1-levers-e2", "See-saw", "build-see-saw", 4,
    "Yesterday we measured how the load changes the effort. Today, finish and test. Then make one change to your see-saw, predict the measurable improvement, test, and disassemble from memory.",
    "After two days with this experiment — by how much does a heavier load increase the effort?"),
  // ─── Weighing Scale · 4 days · L1 Levers e3 (d5) · L1 Levers e4 (d6) · L2 Levers e5 (d7–8)
  s(5, "l1-levers-e3", "Weighing Scale", "build-weighing-scale", 1,
    "Before digital scales existed, jewellers weighed gold using a balance lever accurate to a fraction of a gram. When two sides hold the same weight, what does the beam do — and why?",
    "How can any equal-weight object tell you when a lever is balanced?"),
  s(6, "l1-levers-e4", "Weighing Scale", "build-weighing-scale", 2,
    "Yesterday two equal weights balanced. Does it matter what the two objects are — a stone and a coin — as long as they weigh the same? Predict, then test.",
    "Do any two equal weights balance, no matter what they are?"),
  s(7, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 3,
    "A real scale weighs unequal things by sliding the balance point. If one side is heavier, predict where the fulcrum must move to balance both, then test.",
    "If one side is heavier, which way must the fulcrum move — and can you predict how far?"),
  s(8, "l2-levers-e5", "Weighing Scale", "build-weighing-scale", 4,
    "Yesterday you balanced unequal weights by moving the fulcrum. Today, finish and test. Then make one change to your scale, predict its effect, test, and disassemble from memory.",
    "After two days with this experiment — can you predict the fulcrum position that balances two unequal weights?"),
  // ─── Crane · 4 days · L1 Pulleys e2 (d9) · L1 Pulleys e1 (d10) · L1 Pulleys e3 (d11–12)
  s(9, "l1-pulleys-e2", "Crane", "build-crane", 1,
    "When you raise a flag on a flagpole, you pull the rope down and the flag goes up — the wrong direction. What does a fixed pulley actually change: the direction of pull, or the effort?",
    "What does a fixed pulley change — direction, effort, or both?"),
  s(10, "l1-pulleys-e1", "Crane", "build-crane", 2,
    "The Sky Crane that lowered NASA's Curiosity rover onto Mars used a pulley and cable system. If the load gets heavier through a single pulley, predict how the effort changes — is it proportional?",
    "What happens to effort when the load gets heavier through a single pulley — is it proportional?"),
  s(11, "l1-pulleys-e3", "Crane", "build-crane", 3,
    "Engineers can mount a crane's pulley at different heights. Predict: does raising the pulley higher change how hard you have to pull to lift the same load?",
    "Does the height of a fixed pulley change the effort to lift?"),
  s(12, "l1-pulleys-e3", "Crane", "build-crane", 4,
    "Yesterday you tested pulley height. Today, finish and test your crane. Then make one change, predict its measurable effect, test, and disassemble from memory.",
    "After two days with this experiment — does pulley height affect the effort at all? Explain why."),
  // ─── Fishing Rod · 4 days · Levers & Pulleys · L2 Levers e6 (d1–2) · L1 Pulleys e4 (d3–4)
  s(13, "l2-levers-e6", "Fishing Rod", "build-fishing-rod", 1,
    "A fishing rod bends right over with a big fish. With the fulcrum close to the load, which lever length do you predict lifts 2kg with the least effort — and why?",
    "With the fulcrum close to the load, how do lever length and fulcrum position combine to reduce effort?"),
  s(14, "l2-levers-e6", "Fishing Rod", "build-fishing-rod", 2,
    "If we doubled the fish's weight, would your chosen lever still be best, or would you change it? Predict, then check with the readings.",
    "After two days — state the rule linking lever length, fulcrum position, and effort."),
  s(15, "l1-pulleys-e4", "Fishing Rod", "build-fishing-rod", 3,
    "A reel lets you wind line in from any angle. Predict: does pulling from a different direction change the effort, or only the comfort?",
    "Does the direction of pull on a pulley change the effort, or only how it feels?"),
  s(16, "l1-pulleys-e4", "Fishing Rod", "build-fishing-rod", 4,
    "Your rod and reel are built. Make one change to the reel, predict its effect on winding, test it, record before and after — then disassemble from memory.",
    "How do the lever (rod) and the pulley (reel) each contribute to landing the catch?"),
  // ─── Copter · 4 days · Gears · L1 Gears e1 (d1) · e2 (d2) · e3 (d3–4)
  s(17, "l1-gears-e1", "Copter", "build-copter", 1,
    "A helicopter's blades spin fast from a slow engine. Predict: when two gears mesh side by side, do they turn the same way or opposite — and what changes with a chain?",
    "Why do meshed gears reverse direction while a chain keeps it the same?"),
  s(18, "l1-gears-e2", "Copter", "build-copter", 2,
    "A small gear drives a big gear. Predict the ratio: if you turn the small one 8 times, how many times does the big one turn?",
    "What is the ratio between a small driving gear and a big driven gear?"),
  s(19, "l1-gears-e3", "Copter", "build-copter", 3,
    "Your copter is taking shape. Predict: one full turn of the handle — how many blade turns? Then test and record the ratio.",
    "How does the gear ratio decide how many times the rotor spins per handle turn?"),
  s(20, "l1-gears-e3", "Copter", "build-copter", 4,
    "Make one change to the gearing, predict its effect on rotor speed, test, record before and after — then disassemble from memory.",
    "What is the one most important thing you found about how gears change speed?"),
  // ─── Rickshaw · 4 days · Wheels & Axles · L1 W&A e2 (d1) · e3 (d2) · L2 W&A e2 (d3–4)
  s(21, "l1-wheel-axle-e2", "Rickshaw", "build-rickshaw", 1,
    "A rickshaw with more passengers is harder to pull and stops sooner. Predict the relationship between load and rolling distance, then measure it.",
    "What is the relationship between the load on a cart and the distance it rolls from one push?"),
  s(22, "l1-wheel-axle-e3", "Rickshaw", "build-rickshaw", 2,
    "Predict: does moving the load to the front, back, or centre change the distance and how straight it rolls? Then test all three.",
    "How does load position change the roll of a wheel-and-axle cart?"),
  s(23, "l2-wheel-axle-e2", "Rickshaw", "build-rickshaw", 3,
    "Your rickshaw is nearly built. With heavier loads (2–3kg), predict the order of rolling distances, then complete and test.",
    "How does adding heavier load shorten the distance — and can you quantify it?"),
  s(24, "l2-wheel-axle-e2", "Rickshaw", "build-rickshaw", 4,
    "Make one change to help it carry a heavier load further, predict the effect, test, record before and after — then disassemble from memory.",
    "What is the one most important thing you found about wheels, axles, and load?"),
  // ─── Wind Turbine · 4 days · Pulleys · L2 Pul e1 (d1) · e4 (d2) · L1 Pul e5 (d3–4)
  s(25, "l2-pulleys-e1", "Wind Turbine", "build-wind-turbine", 1,
    "Spinning blades can lift a load through a pulley. With a double pulley, predict how the effort compares to the weight, then measure it.",
    "What mechanical advantage does a double pulley give when lifting?"),
  s(26, "l2-pulleys-e4", "Wind Turbine", "build-wind-turbine", 2,
    "Predict: if we raise the pulley higher, does the effort to lift change, or only the rope length? Then test at three heights.",
    "Does the height of a fixed pulley change the effort to lift?"),
  s(27, "l1-pulleys-e5", "Wind Turbine", "build-wind-turbine", 3,
    "Your turbine is nearly built. Predict how much easier the double pulley makes lifting versus by hand, then complete and test.",
    "How does adding more pulley reduce the effort to lift?"),
  s(28, "l1-pulleys-e5", "Wind Turbine", "build-wind-turbine", 4,
    "Make one change to the pulley system, predict its effect on lifting, test, record before and after — then disassemble from memory.",
    "What is the one most important thing you found about pulleys and lifting?"),
  // ─── Drawbridge · 4 days · Wheels, Axles & Pulleys · L2 W&A e2 (d1) · e3 (d2) · L2 Pul e4 (d3) · e5 (d4)
  s(29, "l2-wheel-axle-e2", "Drawbridge", "build-drawbridge", 1,
    "A drawbridge must hold its weight and still lift. Predict how a heavier deck changes how it moves, then measure with the cart.",
    "How does load change the way a wheel-and-axle mechanism moves?"),
  s(30, "l2-wheel-axle-e3", "Drawbridge", "build-drawbridge", 2,
    "A drawbridge swings on an axle. Predict: which axle angle makes it rise straight? Then test left, centre, right.",
    "How does the axle angle control the direction of movement?"),
  s(31, "l2-pulleys-e4", "Drawbridge", "build-drawbridge", 3,
    "Your drawbridge is nearly built. Predict whether a higher pulley makes it easier or harder to raise, then complete and test.",
    "Does pulley height change the effort to raise the bridge?"),
  s(32, "l2-pulleys-e5", "Drawbridge", "build-drawbridge", 4,
    "Make one change to the axle or pulley, predict its effect, test, record before and after — then disassemble from memory.",
    "How do axles and pulleys combine to raise and lower the bridge?"),
  // ─── Tow Truck · 4 days · Wheels, Axles & Pulleys · L2 Pul e5 (d1) · L2 W&A e4 (d2) · e5 (d3–4)
  s(33, "l2-pulleys-e5", "Tow Truck", "build-tow-truck", 1,
    "A tow truck's winch can hook from different sides. Predict whether the side you pull from changes the effort, then test three sides.",
    "When you pull a pulley rope from different sides, what changes — effort, or only comfort?"),
  s(34, "l2-wheel-axle-e4", "Tow Truck", "build-tow-truck", 2,
    "A car sits on the truck's back. Predict: load centred or at the back — which rolls further? Then test both.",
    "How does load position change the distance a cart rolls?"),
  s(35, "l2-wheel-axle-e5", "Tow Truck", "build-tow-truck", 3,
    "Your tow truck is nearly built. Predict whether wider-spaced axles roll further or shorter, then complete and test.",
    "How does axle spacing change the way a cart rolls?"),
  s(36, "l2-wheel-axle-e5", "Tow Truck", "build-tow-truck", 4,
    "Make one change to help it roll or winch better, predict the effect, test, record before and after — then disassemble from memory.",
    "How do wheels, axles, and pulleys work together in the tow truck?"),
  // ─── Bulldozer · 4 days · Gears · L1 Gears e3 (d1) · e4 (d2) · L2 Gears e1 (d3–4)
  s(37, "l1-gears-e3", "Bulldozer", "build-bulldozer", 1,
    "A bulldozer is slow but immensely strong. Predict: when a big gear drives a small gear, does the small gear turn more or fewer times — and why does that trade speed for force?",
    "When a big gear drives a small gear, how do speed and force trade off?"),
  s(38, "l1-gears-e4", "Bulldozer", "build-bulldozer", 2,
    "Predict: two equal gears joined by a chain — turn one 9 times, how many does the other turn? Then test.",
    "When two gears are equal, what is their ratio of turns?"),
  s(39, "l2-gears-e1", "Bulldozer", "build-bulldozer", 3,
    "Your bulldozer is nearly built. Predict the big gear's turns when the small one turns 12 times, then complete and test.",
    "How can you predict a gear's turns from the gear ratio?"),
  s(40, "l2-gears-e1", "Bulldozer", "build-bulldozer", 4,
    "Make one change to the gearing for more speed or more force, predict the effect, test, record before and after — then disassemble from memory.",
    "What is the one most important thing you found about how gearing trades speed for force?"),
];

// Checkpoint at the end of each 4-day model build (sessions 4, 8, 12)
sessionTable.forEach((entry) => {
  if ([4, 8, 12, 16, 20, 24, 28, 32, 36, 40].includes(entry.sessionNumber)) entry.isCheckpoint = true;
});

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 4,
    descriptors: [
      { skillArea: "B&M", beginning: "connects parts with teacher checks (Fit)", developing: "follows the card and notices when a step has not produced the expected result (Follow)", secure: "identifies the specific component that failed and fixes it without being told which part (Adjust)" },
      { skillArea: "PS", beginning: "names general failure", developing: "tries genuinely different approaches (Try)", secure: "names the specific part causing the failure and explains what it is failing to do (Change)" },
      { skillArea: "O&U", beginning: "records readings with gaps", developing: "records every reading correctly including units (Measure)", secure: "writes a specific prediction before testing — a value or a reason connected to prior data (Predict)" },
    ],
  },
  {
    afterSession: 8,
    descriptors: [
      { skillArea: "B&M", beginning: "adjusts within the design (Adjust)", developing: "makes a deliberate improvement and records before/after", secure: "states what they expect to change before testing, then verifies the result (Improve ★)" },
      { skillArea: "PS", beginning: "identifies the specific failing part (Change)", developing: "tries new approaches that go beyond the given steps", secure: "sets a measurable goal and keeps adjusting until the model reaches it (Persist ★)" },
      { skillArea: "O&U", beginning: "predicts a direction", developing: "predicts with a value or a reason (Predict)", secure: "explains what caused the result — names the cause and connects it to what the data shows (Explain ★)" },
    ],
  },
  {
    afterSession: 12,
    descriptors: [
      { skillArea: "B&M", beginning: "improves the design within the build", developing: "makes improvements that measurably change the result", secure: "designs a deliberate improvement, predicts the outcome with a value, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches", developing: "sets and reaches a measurable goal", secure: "persists across multiple attempts to a measurable goal across the year (Persist ★)" },
      { skillArea: "O&U", beginning: "predicts and explains results", developing: "explains causally using the data", secure: "explains causally and connects the explanation to the underlying mechanism (Explain ★)" },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the rod and reel with the manual", developing: "builds independently and adjusts", secure: "designs a deliberate change to the rod or reel, predicts the effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when the reel sticks", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "records lever and pulley readings", developing: "predicts before reading", secure: "explains how the lever and pulley combine — linked to the mechanism (Explain ★)" },
    ],
  },
  {
    afterSession: 20,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the gear train with the manual", developing: "builds independently and adjusts", secure: "designs a gearing change, predicts the rotor effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when gears slip", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "counts and records gear turns", developing: "predicts turns from the ratio", secure: "explains why gear size changes the turns — linked to the ratio (Explain ★)" },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the cart with the manual", developing: "builds independently and adjusts", secure: "designs a change to load or axles, predicts the effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when it veers", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "measures rolling distance", developing: "predicts which setup rolls furthest", secure: "explains why load and axle placement change the roll — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 28,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the pulley system with the manual", developing: "builds independently and adjusts", secure: "designs a pulley change, predicts the lifting effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when the rope slips", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "measures lifting effort", developing: "predicts the mechanical advantage", secure: "explains why more pulley reduces effort — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the drawbridge mechanism with the manual", developing: "builds independently and adjusts", secure: "designs an axle or pulley change, predicts the effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when it jams", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "measures direction and effort", developing: "predicts the axle and pulley behaviour", secure: "explains how axles and pulleys combine — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 36,
    descriptors: [
      { skillArea: "B&M", beginning: "builds wheels, axles and winch with the manual", developing: "builds independently and adjusts", secure: "designs a change to the build, predicts the effect, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when it stalls", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "measures distance and effort", developing: "predicts the best load position and pull", secure: "explains how wheels, axles and pulleys combine — linked to the data (Explain ★)" },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      { skillArea: "B&M", beginning: "builds the gear-driven bulldozer with the manual", developing: "builds independently and adjusts", secure: "designs a gearing change for speed or force, predicts, tests, and verifies (Improve ★)" },
      { skillArea: "PS", beginning: "tries new approaches when a gear slips", developing: "reaches a measurable goal", secure: "persists across attempts to a measurable goal (Persist ★)" },
      { skillArea: "O&U", beginning: "counts gear turns and records them", developing: "predicts turns from the ratio", secure: "explains why the gearing trades speed for force — linked to the data (Explain ★)" },
    ],
  },
];

// ─── Model ↔ experiment pairings (why they go together) ─────

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
    "level 1 — mechanics. across ten models — see-saw, weighing scale, crane, fishing rod, copter, rickshaw, wind turbine, drawbridge, tow truck, and bulldozer — children run experiments on levers, pulleys, gears, and wheels & axles, then build a machine that uses what they discovered. each build is four days (vs five for 5–8): explore + make · make · complete and test · improve and disassemble. children finish the year able to calculate mechanical advantage, predict before testing, and explain causally after.",
  totalSessions: 40,
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
  trialSession: ROBOTICS_TRIAL_SESSION_8_12,
};
