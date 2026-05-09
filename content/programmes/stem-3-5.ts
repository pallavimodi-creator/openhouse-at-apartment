import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
} from "@/content/types";

/* ─── STEM 3–5 — programme spec ────────────────────────────────────
 * Ages 3–5 · 90 minutes per session · 2 sessions per week
 * 60 sessions across ~7.5 months.
 *
 * Session structure (A and B alternate; Imagine Playground and
 * WonderWorld are exploration-based segments that swap places):
 *
 *   imagine-playground / wonder-world    35 min
 *   logic-lab                            20 min
 *   numbers-gym                          25 min
 *   experience-book                      10 min
 * ----------------------------------------------------------------- */

/* ─── Logic Lab games ─────────────────────────────────────────────
 * 6 games rotate across all 60 sessions. Each game has 4 difficulty
 * layers built in so the same game can run in Month 1 and Month 6,
 * deeper each time. ───────────────────────────────────────────── */

const logicLabGames: Record<string, CurriculumActivity> = {
  "ll-candy-sort": {
    id: "ll-candy-sort",
    segment: "logic-lab",
    title: "candy sort",
    setupLine: "Roll the dice, spot the matching candy, win it for your team.",
    howToPlay:
      "Two teams race. The facilitator rolls two dice (colour, shape, or pattern). Teams scan the Candy Field — first hand to touch the candy whose traits match both dice claims it. No match visible? Both dice are rerolled. After several rounds, gather teams with their trays for an end-game math quiz: counting, more/less, add/take-away, comparing sets, simple equality — each correct answer = 1 bonus point.",
    materials: [
      "4 dice — Colour Die A (6 colours) · Colour Die B (same 6 colours) · Shape Die (6 shapes) · Pattern Die (6 patterns)",
      "36 single-trait candies — each shows one colour + one shape + one pattern (e.g. red-triangle-stripes)",
      "30 double-trait candies (2 sets of 15) — each shows two colours + two shapes + two patterns (e.g. blue-yellow / square-circle / dots-zigzags)",
      "Two sorting plates — team trays for collected candies",
      "Play Mat — the 'Candy Field' where all 66 candies sit picture-side up",
      "Timer or sand-glass (optional) — 30 sec per round keeps it zippy",
    ],
    variations: [
      {
        name: "Setup",
        description:
          "Scatter all 66 candies picture-side up on the Candy Field. Divide children into two teams (3–4 players per team). Place a tray beside each team for their winnings.",
      },
      {
        name: "How a round works",
        description:
          "Facilitator says 'Ready… roll!' and rolls the two chosen dice. Teams scan the field. First hand to touch the correct candy claims it and pops it in their tray. No match visible? Say 'Pass!' — both dice are rerolled.",
      },
      {
        name: "Single-trait round",
        description:
          "Use the 36 single-trait candies. Roll one die at a time (colour OR shape OR pattern) — children find a candy matching that single trait.",
      },
      {
        name: "Double-trait round",
        description:
          "Use the 30 double-trait candies. Roll two dice at once — children find a candy whose two trait values both match.",
      },
    ],
    difficultyLevels: [
      {
        level: "End-game · Counting",
        description:
          "Team Sunshine, count your red candies. How many do you have?",
      },
      {
        level: "End-game · More / Less",
        description:
          "Who has more striped candies, Team Sunshine or Team Rainbow?",
      },
      {
        level: "End-game · Add & Take Away",
        description:
          "Team Rainbow, if you eat two star candies, how many star candies are left?",
      },
      {
        level: "End-game · Compare Sets",
        description:
          "Put your circle candies in a line. Does the line look shorter or longer than Team Sunshine's?",
      },
      {
        level: "End-game · Simple Equality",
        description:
          "Can each team give me three candies? Do you both still have some left?",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-stitch-me": {
    id: "ll-stitch-me",
    segment: "logic-lab",
    title: "stitch me",
    setupLine: "Pair up. Solve the prompt. Lace the bead.",
    howToPlay:
      "Divide the children into pairs. Set up stations or scavenger bins around the room — one for beads, one for numbers, one for shapes. Give each pair a laminated template, a sewing base, and a shoelace. The teacher calls out one prompt at a time. The current player runs to the right station, finds the matching bead, comes back, and laces it onto the template. The lace is passed to the next child. The round ends when every bead is sewn into the template.",
    materials: [
      "Laminated templates (beads · numbers · shapes)",
      "Sewing bases",
      "Shoelaces with a stiff tip",
      "Bead, number, and shape stations scattered around the room",
    ],
    difficultyLevels: [
      {
        level: "Easy — colour pattern beads",
        description:
          "Prompt: \"Sew a necklace with this ABAB pattern — red, yellow, red, yellow.\" The child finds beads of the two colours and laces them in the alternating sequence shown on the template.",
      },
      {
        level: "Medium — beads + numbers",
        description:
          "Prompt: \"Colour + number pattern — blue 1, yellow 2, orange + blue 3, ___\". The child finds the beads and numbers shown on the template and laces them in order.",
      },
      {
        level: "Hard — verbal riddles",
        description:
          "The teacher reads a riddle. The child runs, picks the matching bead or number, and laces it. Examples: \"I'm as red as a strawberry on a sunny day\" → red bead. \"I'm what comes after 2 and before 4\" → number 3. \"Mix red and yellow, I'll show. I shine like the sunset's glow\" → orange bead. \"Double 2, that's me\" → number 4.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-dot-grid": {
    id: "ll-dot-grid",
    segment: "logic-lab",
    title: "dot grid",
    setupLine: "Pick a card, place disks, check by laying the card on top.",
    howToPlay:
      "Two children per board. One picks a card. They read the card type and follow the rule for that puzzle type. They take turns placing disks. When done, they check their work by placing the card on top of the board — the cut-out windows let them see if disks line up underneath.",
    materials: [
      "5 play boards (one per pair of children)",
      "240 disks — 60 each in red, yellow, blue, green",
      "32 pattern cards — 16 see-and-match (blue-backed) + 16 see-and-predict (green-backed)",
      "How-to-play booklet (8 pages, A5)",
      "Answer key (1 sheet, A4 — for teacher only)",
      "Storage box (A3 footprint with compartments)",
    ],
    variations: [
      {
        name: "Setup",
        description:
          "Place each play board flat on a table. Open the four colour pouches and spread disks beside the boards. Sort cards by game mode into two stacks (blue-backed for see-and-match, green-backed for see-and-predict).",
      },
      {
        name: "Game 1 · See and Match (16 cards)",
        description:
          "Children build what they see — direct visual replication, pattern recognition, symmetry, and mirror-image puzzles.",
      },
      {
        name: "Game 2 · See and Predict (16 cards)",
        description:
          "Children think and answer — counting, subitising, comparison, and identifying rules to predict what comes next.",
      },
    ],
    difficultyLevels: [
      {
        level: "Easy · Copy (4 cards · See and Match)",
        description:
          "Direct visual replication — children build exactly what they see on the card.",
      },
      {
        level: "Easy · Continue (4 cards · See and Match)",
        description:
          "Pattern recognition + completion — children continue an existing pattern.",
      },
      {
        level: "Medium · Symmetry (4 cards · See and Match)",
        description:
          "Recognising symmetrical structure — children build the matching half.",
      },
      {
        level: "Hard · Mirror (4 cards · See and Match)",
        description:
          "Spatial reflection (left → right) — children build the mirror image.",
      },
      {
        level: "Easy + Hard · Count (8 cards · See and Predict · 4 easy + 4 hard)",
        description:
          "Counting, subitising, comparison — children answer 'how many?' from the dot pattern.",
      },
      {
        level: "Medium + Hard · Pattern Predict (8 cards · See and Predict · 4 medium + 4 hard)",
        description:
          "Identifying rules, predicting next — children look at a sequence and place disks to show what comes next.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-logical-road-builder": {
    id: "ll-logical-road-builder",
    segment: "logic-lab",
    title: "logical road builder",
    setupLine: "Build straight, then curvy paths — graduate to the puzzle book.",
    howToPlay:
      "Refer to the instruction book for understanding how the game is used. Start by introducing children to making straight and curvy paths using only half of the board. Give children puzzles using half the board. Once they are comfortable, let them graduate to puzzles from the starter level of the book.",
    materials: [
      "Logical Road Builder game board",
      "Road tiles",
      "Instruction book + puzzle book (Starter / Junior / Expert levels)",
    ],
    variations: [
      {
        name: "Modes",
        description:
          "There are 3 gameplay modes as given in the book. Start with the single-player mode. Only once players have completed all levels of this mode, move to the next mode and so on.",
      },
    ],
    difficultyLevels: [
      {
        level: "Half-board warm-up",
        description:
          "Children build straight, then curvy paths using only half of the board. Once comfortable with both, graduate to the book.",
      },
      {
        level: "Starter",
        description:
          "First level of the puzzle book. Single-player mode. Complete all Starter puzzles before moving on.",
      },
      {
        level: "Junior",
        description:
          "Second level of the puzzle book — more complex constraints. Stay in single-player mode until all Junior puzzles are done.",
      },
      {
        level: "Expert",
        description:
          "Third level. Once all Expert single-player puzzles are complete, move to the next mode in the book.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-magna-tiles": {
    id: "ll-magna-tiles",
    segment: "logic-lab",
    title: "magna tiles",
    setupLine: "Match a flashcard, build the shape — five levels of difficulty.",
    howToPlay:
      "Children build using Magna-Tiles. The teacher shows a prompt flashcard (laminated for reuse). Each card specifies the level — children match colours, count tiles, copy structure, fill borders, or invent freely. Five levels run in sequence: 3D Build → 2D Match → 2D Stack → Border Fill → Open-ended.",
    materials: [
      "Magna-Tiles (variety of shapes and colours)",
      "Prompt flashcards (laminated):",
      "  · Level 1 — 3D shaped prompts + number of tiles",
      "  · Level 2 — 2D flat shapes + number of tiles",
      "  · Level 3 — 2D double-layered prompts + number of tiles",
      "  · Level 4 — Outlined borders + number of tiles",
      "  · Level 5 — Open-ended prompts",
    ],
    difficultyLevels: [
      {
        level: "Level 1 — Build It Tall! (3D Structures)",
        description:
          "Show the 3D prompt (tower, bridge, cube house). Say 'Can you make this shape that stands up? Let's build it standing!'. Let them build vertically with your support to balance. Encourage 'strong and steady'. Builds: fine motor, stability, early engineering, 3D thinking.",
      },
      {
        level: "Level 2 — Match & Build (2D Single Layer)",
        description:
          "Show the flashcard (a flat shape — house, rocket, fish — made with Magna-Tiles, with number of tiles + colours visible). Ask: 'Can you match and make this shape using Magna-Tiles?' Count the tiles. Complete the shape flat on the floor. Builds: colour & shape matching, tile counting, visual copying.",
      },
      {
        level: "Level 3 — Stack & Copy (2D Double Layer)",
        description:
          "Show the layered flashcard (two distinct layers). Say: 'This one has two parts! Let's build the bottom first and then add the top.' Guide them to build the two layers one at a time, using the given number of tiles. Builds: sequencing, understanding structure, spatial layering.",
      },
      {
        level: "Level 4 — Fill the Frame (Border with Tile Count)",
        description:
          "Place the border prompt card on the floor or table. Say: 'Here's your space. You get exactly ___ tiles. Can you fill this up?' Let them explore how to fill the shape using the right number of tiles. Offer help only if they run out or go over the tile count. Builds: problem-solving, estimation, planning, number sense.",
      },
      {
        level: "Level 5 — Creative Builders (Open-Ended Challenges)",
        description:
          "Show a playful challenge — a goal but no fixed picture, just a tile limit or design challenge. Read the challenge aloud or show the prompt card. Give the set number of tiles (or let them pick). Encourage them to experiment freely, then describe their build. Builds: creativity, engineering thinking, experimentation, storytelling, resilience.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── Imagine Playground — 11 core build projects + 4 maker fillers ─
 * Each project listed here is a CurriculumActivity so it can be
 * surfaced via the library / segment popups. Lesson-plan detail
 * lives in components/ImaginePlaygroundBookModal.tsx (used as the
 * teacher reference book on the overview page). ───────────────── */

const imaginePlaygroundProjects: Record<string, CurriculumActivity> = {
  "ip-train-time": {
    id: "ip-train-time",
    segment: "imagine-playground",
    title: "train time",
    setupLine: "Build a track and number the train cars.",
    howToPlay:
      "Children join track pieces, attach train cars, count pieces as they connect, and stick numbers on each car in order. Low-stakes entry to the block system; counting while building makes Number Sense visible from Day 1.",
    materials: ["Track pieces", "Train cars", "Number sticky notes"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-first-trip": {
    id: "ip-first-trip",
    segment: "imagine-playground",
    title: "first trip",
    setupLine: "Build a station, build a destination, take the train across.",
    howToPlay:
      "Children build a double-ended track and discover that a coloured action brick (red) changes the train's behaviour — first exposure to cause-and-effect bricks.",
    materials: ["Track pieces", "Train", "Red action bricks", "Red stop brick", "Green action bricks"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-load-the-train": {
    id: "ip-load-the-train",
    segment: "imagine-playground",
    title: "load the train",
    setupLine: "Pick a number card, load that many bricks.",
    howToPlay:
      "Direct number-to-quantity mapping. Children see 5 on a card, count 5 bricks, and load them. Number Sense made physical.",
    materials: ["Train cars", "Number bricks or notes", "Small loadable objects"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-longest-track": {
    id: "ip-longest-track",
    segment: "imagine-playground",
    title: "longest track",
    setupLine: "Build the longest track and measure it.",
    howToPlay:
      "Standard and non-standard measurement. Children build a track from a wall outwards, measure with a tape, and compare. Then they build towers and measure height.",
    materials: ["Track pieces", "Tape measure", "Number bricks for non-standard measuring"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-train-sound": {
    id: "ip-train-sound",
    segment: "imagine-playground",
    title: "train sound",
    setupLine: "Plan a journey using yellow, blue, and white bricks.",
    howToPlay:
      "Yellow, blue, and white action bricks change the train's behaviour. Children plan a journey before the train moves — first experience of forward planning and sequencing. White bricks light up inside a tunnel.",
    materials: ["Track pieces", "Train", "Action bricks (yellow, blue, white)", "Tunnel cutout"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-o-shaped-track": {
    id: "ip-o-shaped-track",
    segment: "imagine-playground",
    title: "o-shaped track",
    setupLine: "Build a looping track.",
    howToPlay:
      "Introduces looping — the same journey repeated. Children compare the O-track with a double-ended track. Foundation of computational thinking.",
    materials: ["Curved track pieces", "Straight track pieces", "Train", "Action bricks"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-y-shaped-track": {
    id: "ip-y-shaped-track",
    segment: "imagine-playground",
    title: "y-shaped track",
    setupLine: "Coloured tickets decide the path.",
    howToPlay:
      "First if-then thinking. If red ticket, then go to red stop. Children build a Y-track with a switch and use coloured bricks as tickets. Foundation of conditional logic.",
    materials: ["Y-shaped track", "Track switch", "Coloured bricks (tickets and stops)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-trouble-on-the-road": {
    id: "ip-trouble-on-the-road",
    segment: "imagine-playground",
    title: "trouble on the road",
    setupLine: "Read the traffic signs and solve the route problem.",
    howToPlay:
      "Children apply route planning to solve traffic problems. The teacher places action bricks randomly along the track — children identify the problem and choose the right traffic sign to fix it.",
    materials: ["Y-shaped track", "Building cards", "Action bricks", "Traffic sign set"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-ramps": {
    id: "ip-ramps",
    segment: "imagine-playground",
    title: "ramps",
    setupLine: "Build a ramp with magna tiles. Predict and measure how far cars roll.",
    howToPlay:
      "Children build ramps using magna tiles and other materials, then roll cars down. Before each roll they predict where the car will stop, then mark the actual stopping point on a number track and record results on a graph. Introduces motion, gravity, prediction.",
    materials: ["Magna Tiles", "Cars or rolling objects", "Track template pages", "Number bricks", "Result graphs"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-chain-reaction": {
    id: "ip-chain-reaction",
    segment: "imagine-playground",
    title: "chain reaction",
    setupLine: "One event triggers the next.",
    howToPlay:
      "Cause-and-effect at its richest. Children build trigger sequences in pairs, then combine all the pairs' work into one long chain reaction. They explain first cause, first event, and last event.",
    materials: ["Building pieces", "Objects that move, fall, push, or trigger"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ip-probability": {
    id: "ip-probability",
    segment: "imagine-playground",
    title: "probability",
    setupLine: "Predict, spin, record. Build a prize from what you collect.",
    howToPlay:
      "A spinner with coloured sections. Children predict, spin, and record outcomes across many rounds. They notice that more spaces of one colour means a better chance — but never a guarantee. Foundation of statistical thinking.",
    materials: ["Wheel model", "Coloured bricks (red, yellow, blue, turquoise)", "Result graphs"],
    debriefPrompts: [],
    type: "physical-game",
  },

};

/* ─── WonderWorld — workbook activities (one book all year) ────────
 * One book — "What Is In Your Tiffin?" — runs across 30 Session-Bs.
 * 14 activities cycle twice each + 4 game support sessions.
 * Lesson-plan detail lives in components/WonderWorldBookModal.tsx. */

const wonderWorldActivities: Record<string, CurriculumActivity> = {
  // Chapter 1 — The Bread (5 activities)
  "ww-bread-1-punch-and-squish": {
    id: "ww-bread-1-punch-and-squish",
    segment: "wonder-world",
    title: "punch and squish",
    setupLine: "Knead playdough — count the presses, feel the change.",
    howToPlay:
      "Children press and knead beige playdough, counting from 1 to 10 each round. They notice how dough changes — flat, soft, warm, smooth. Material transformation, hand strength, counting, observation.",
    materials: ["Beige/yellow playdough", "Tiffin mat or A4 sheet"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-bread-2-make-a-bread": {
    id: "ww-bread-2-make-a-bread",
    segment: "wonder-world",
    title: "make a bread from somewhere in the world",
    setupLine: "Each child shapes one kind of bread.",
    howToPlay:
      "Bread comes in many shapes. Each child chooses one — round chapati, long loaf, tiny bun, or square slice — and makes it from playdough. Children compare biggest, smallest, round, long.",
    materials: ["Beige/yellow playdough", "4-section tiffin mat"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-bread-3-bread-riddles": {
    id: "ww-bread-3-bread-riddles",
    segment: "wonder-world",
    title: "bread riddles",
    setupLine: "Listen to the clue — guess the bread.",
    howToPlay:
      "Teacher gives clues ('I am round and flat. I puff on the pan'). Children point to the matching picture or playdough bread. Then children invent their own clues.",
    materials: ["Picture cards (chapati, loaf, bun, toast)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-bread-4-what-comes-next": {
    id: "ww-bread-4-what-comes-next",
    segment: "wonder-world",
    title: "what comes next?",
    setupLine: "Put the bread journey in order.",
    howToPlay:
      "5 cards — seed, wheat, flour, dough, bread. Children arrange them in order, then act out the sequence with their bodies (tiny seed → tall wheat → grinding → kneading → eating).",
    materials: ["5 picture cards (seed, wheat, flour, dough, bread)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-bread-5-sieve": {
    id: "ww-bread-5-sieve",
    segment: "wonder-world",
    title: "sieve the wheat & stone",
    setupLine: "Sort the food from the not-food.",
    howToPlay:
      "Children pick out grains and stones/beads from a mixed tray, placing them in 'food' and 'not food' bowls. Then they try a sieve and compare.",
    materials: ["Rice/wheat/lentils", "Pebbles or large beads", "Tray", "2 bowls", "Sieve (optional)"],
    debriefPrompts: [],
    type: "physical-game",
  },

  // Chapter 2 — Say Cheese (5 activities)
  "ww-cheese-1-make-a-pretend-cheese": {
    id: "ww-cheese-1-make-a-pretend-cheese",
    segment: "wonder-world",
    title: "make a pretend cheese",
    setupLine: "Sort foods into 'yes with cheese' / 'not with cheese'.",
    howToPlay:
      "Children make a pretend cheese piece from yellow playdough, then sort foods into two piles — what tastes good with cheese, what doesn't. They explain their choice each time.",
    materials: ["Yellow playdough", "Plastic foods or picture cards", "2 sorting mats"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-cheese-2-does-it-come-from-milk": {
    id: "ww-cheese-2-does-it-come-from-milk",
    segment: "wonder-world",
    title: "does it come from milk?",
    setupLine: "Clap if it comes from milk.",
    howToPlay:
      "Teacher reads a food name. If it comes from milk (butter, paneer, cheese, yoghurt), children clap. If not, hands stay still. Builds categorisation and listening control.",
    materials: ["Teacher-read food list (optional picture cards)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-cheese-3-spread-your-butter": {
    id: "ww-cheese-3-spread-your-butter",
    segment: "wonder-world",
    title: "spread your butter",
    setupLine: "Spread the butter all over the toast.",
    howToPlay:
      "Children get a brown craft-paper 'toast' and a small playdough 'butter'. They spread it from the centre to every corner using one finger, then thumb, then a child-safe spreader. They compare which tool worked best.",
    materials: ["Brown craft paper squares", "Small yellow playdough pieces", "Child-safe spreaders (optional)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-cheese-4-cut-your-cheese": {
    id: "ww-cheese-4-cut-your-cheese",
    segment: "wonder-world",
    title: "cut your cheese into pieces",
    setupLine: "Cut a whole into halves, quarters, cubes.",
    howToPlay:
      "Starting with one playdough cheese block, children cut into 2, then 4, then tiny cubes. They count after each cut and compare: 'are 4 pieces bigger or smaller than 2?' Early fractions and size comparison.",
    materials: ["Yellow playdough", "Clay tools or blunt plastic knives"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-cheese-5-sandwich-game": {
    id: "ww-cheese-5-sandwich-game",
    segment: "wonder-world",
    title: "the cheese sandwich game",
    setupLine: "Build the sandwich one ingredient at a time.",
    howToPlay:
      "Memory and sequencing game. First child names one ingredient. Next child adds another. Each child must repeat the full sandwich so far. Teacher uses picture cards if support is needed.",
    materials: ["Picture cards (bread, cheese, vegetables, sandwich ingredients)"],
    debriefPrompts: [],
    type: "physical-game",
  },

  // Chapter 3 — Salad Days (5 activities)
  "ww-salad-1-cut-your-tomato": {
    id: "ww-salad-1-cut-your-tomato",
    segment: "wonder-world",
    title: "cut your tomato",
    setupLine: "Cut the tomato many ways and compare.",
    howToPlay:
      "Children roll a red playdough tomato and cut it into halves, quarters, slices, then tiny cubes. They compare which has the most pieces, which has the smallest pieces, and discuss why smaller pieces cook faster.",
    materials: ["Red playdough", "Clay tools or blunt plastic knives"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-salad-2-rainbow-tiffin": {
    id: "ww-salad-2-rainbow-tiffin",
    segment: "wonder-world",
    title: "the rainbow tiffin",
    setupLine: "Fill the tiffin with one food per colour.",
    howToPlay:
      "Children pick one red food, one green, one orange, one yellow — and place each in its tiffin section. They name the food and the colour, count the colours, and notice what's missing.",
    materials: ["Plastic foods or coloured picture cards", "Tiffin tray or 4-section mat"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-salad-3-above-or-below": {
    id: "ww-salad-3-above-or-below",
    segment: "wonder-world",
    title: "above or below the soil?",
    setupLine: "Sort foods by where they grow.",
    howToPlay:
      "A brown paper sheet marks the soil line. Children take cards one at a time and place each above or below the line. Each placement is explained — 'tomato grows above because…'. Plant awareness and reasoning.",
    materials: ["Picture cards (foods that grow above and below)", "Brown paper sheet"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-salad-4-follow-the-recipe": {
    id: "ww-salad-4-follow-the-recipe",
    segment: "wonder-world",
    title: "follow the salad recipe",
    setupLine: "First, next, last — follow the steps.",
    howToPlay:
      "Teacher gives a salad recipe one step at a time — base, vegetables, topping, mix. Children follow in order, then a second round where they choose their own order and compare results. Sequencing and decision-making.",
    materials: ["Bowl or plate", "Pretend or real salad ingredients", "Spoon/tongs"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-salad-5-salad-quiz": {
    id: "ww-salad-5-salad-quiz",
    segment: "wonder-world",
    title: "the salad quiz",
    setupLine: "Be a food detective — find the answer.",
    howToPlay:
      "Four rounds — colour ('find something red'), texture ('which is crunchy?'), growing place ('which grows below?'), and odd one out ('which doesn't belong?'). Children explain their reasoning each time.",
    materials: ["Picture cards or toy foods", "Basket or tray"],
    debriefPrompts: [],
    type: "physical-game",
  },

  // 2 food games — used as game support on select WonderWorld days
  "ww-game-food-guess": {
    id: "ww-game-food-guess",
    segment: "wonder-world",
    title: "food guess",
    setupLine: "Ask up to 10 yes/no questions to guess the food.",
    howToPlay:
      "Picture-only Guider Tiles deck. One child holds a hidden food card; the others ask up to 10 yes/no questions to guess what it is. Builds questioning and visual deduction. Runs twice — mid-year and end-of-year.",
    materials: ["Food Guess card deck (Guider Tiles · picture only)"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ww-game-food-connect": {
    id: "ww-game-food-connect",
    segment: "wonder-world",
    title: "food connect",
    setupLine: "Join tiles by colour, texture, food group, or shape.",
    howToPlay:
      "40 food tiles + dice. Children join tiles based on a shared attribute. Used at the easiest difficulty level only at this age. Runs twice — once after Chapter 2 and once after Chapter 4.",
    materials: ["40 food tiles", "Dice"],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── 60-session table — Imagine Playground / WonderWorld alternate
 * Sessions 1, 3, 5… are Session A (Imagine Playground).
 * Sessions 2, 4, 6… are Session B (WonderWorld).
 * Logic Lab and NumbersGym run every session. ──────────────────── */

const buildPlayground = (n: number): string => {
  // 30 Session-A slots covering 11 core projects in fixed order.
  // Sessions 1–11 introduce each project once; the remaining 19
  // Session-As cycle revisits in fixed order so children meet each
  // project 2–3 times across the year, deeper each time.
  const order = [
    "ip-train-time",
    "ip-first-trip",
    "ip-load-the-train",
    "ip-longest-track",
    "ip-train-sound",
    "ip-o-shaped-track",
    "ip-y-shaped-track",
    "ip-trouble-on-the-road",
    "ip-ramps",
    "ip-chain-reaction",
    "ip-probability",
  ];
  return order[(n - 1) % order.length];
};

const buildWonderWorld = (n: number): string => {
  // 30 Session-B slots: 14 activities × 2 (28) + 4 game days,
  // then revisits with extensions. Map by index.
  const cycle = [
    "ww-bread-1-punch-and-squish",
    "ww-bread-2-make-a-bread",
    "ww-bread-3-bread-riddles",
    "ww-bread-4-what-comes-next",
    "ww-bread-5-sieve",
    "ww-cheese-1-make-a-pretend-cheese",
    "ww-cheese-2-does-it-come-from-milk",
    "ww-cheese-3-spread-your-butter",
    "ww-cheese-4-cut-your-cheese",
    "ww-cheese-5-sandwich-game",
    "ww-game-food-connect",
    "ww-salad-1-cut-your-tomato",
    "ww-salad-2-rainbow-tiffin",
    "ww-salad-3-above-or-below",
    "ww-salad-4-follow-the-recipe",
    "ww-salad-5-salad-quiz",
    "ww-game-food-guess",
    // Second cycle — revisited, deepened
    "ww-bread-1-punch-and-squish",
    "ww-bread-2-make-a-bread",
    "ww-bread-3-bread-riddles",
    "ww-bread-4-what-comes-next",
    "ww-cheese-1-make-a-pretend-cheese",
    "ww-cheese-3-spread-your-butter",
    "ww-cheese-4-cut-your-cheese",
    "ww-cheese-5-sandwich-game",
    "ww-game-food-connect",
    "ww-salad-1-cut-your-tomato",
    "ww-salad-3-above-or-below",
    "ww-salad-5-salad-quiz",
    "ww-game-food-guess",
  ];
  return cycle[(n - 1) % cycle.length];
};

const LOGIC_LAB_CYCLE = [
  "ll-candy-sort",
  "ll-stitch-me",
  "ll-dot-grid",
  "ll-logical-road-builder",
  "ll-magna-tiles",
];

const buildSessionTable = (): CurriculumSessionEntry[] => {
  const out: CurriculumSessionEntry[] = [];
  let aIndex = 1;
  let bIndex = 1;
  for (let i = 1; i <= 60; i++) {
    const isSessionA = i % 2 === 1;
    const entry: CurriculumSessionEntry = {
      sessionNumber: i,
      sessionType: isSessionA ? "A" : "B",
      logicLab: LOGIC_LAB_CYCLE[(i - 1) % LOGIC_LAB_CYCLE.length],
      numbersGym: `ng-l1-pg-${i}`, // placeholder marker — children pace themselves
      experienceBook: "experience-book",
      topicLayer: 1,
    };
    if (isSessionA) {
      entry.imaginePlayground = buildPlayground(aIndex);
      aIndex += 1;
    } else {
      entry.wonderWorld = buildWonderWorld(bIndex);
      bIndex += 1;
    }
    out.push(entry);
  }
  return out;
};

/* ─── Programme ──────────────────────────────────────────────────── */

export const stem35: CurriculumProgramme = {
  id: "stem-3-5",
  slug: "robotics-3-5",
  title: "stem",
  category: "stem",
  ageGroup: "3-5",
  ageLabel: "ages 3–5",
  heroImageUrl: "/prog-stem-3-5.gif",
  tagline:
    "build curiosity, problem solving, logic, and number sense — through hands-on play.",
  description:
    "Children between 3 and 5 are natural scientists. They observe, question, test, and try again without being taught to. This programme takes that instinct seriously. Every session gives children something to build, something to investigate, something to figure out logically, and a number concept to hold in their hands. Four skills — Curiosity, Problem Solving, Logic, and Number Sense — grow across every session.",
  totalSessions: 60,
  skillAreas: [
    {
      id: "curiosity",
      name: "curiosity",
      shortName: "curiosity",
      abilities: [
        { name: "notices", description: "Pays attention to a specific detail or change — without being told what to look at." },
        { name: "wonders", description: "Asks a why or how question about something they observed — unprompted." },
        { name: "predicts", description: "Makes a guess about what will happen before testing — if I do this, then that." },
        { name: "investigates", description: "Tries something deliberately to find out — and connects what happened to something they already knew.", isNorthStar: true },
      ],
    },
    {
      id: "problem-solving",
      name: "problem solving",
      shortName: "problem solving",
      abilities: [
        { name: "recognises", description: "Notices that something is not working or a problem exists — without being told." },
        { name: "tries", description: "Attempts a different approach when the first one fails." },
        { name: "persists", description: "Keeps going through difficulty — returns to the problem without giving up." },
        { name: "solves", description: "Names the specific cause of the problem and explains what they changed to fix it.", isNorthStar: true },
      ],
    },
    {
      id: "logic",
      name: "logic",
      shortName: "logic",
      abilities: [
        { name: "sorts", description: "Groups objects or events by one clear rule — colour, shape, size, or type." },
        { name: "patterns", description: "Recognises, continues, or creates a repeating sequence." },
        { name: "predicts from a rule", description: "Uses a pattern or rule to say what comes next — before seeing it." },
        { name: "reasons", description: "Explains why something happened using because — connects cause to effect.", isNorthStar: true },
      ],
    },
    {
      id: "number-sense",
      name: "number sense",
      shortName: "number sense",
      abilities: [
        { name: "connects", description: "Counts to 10, matches numbers to quantities, recognises small quantities, understands in/on/under, arranges by size, sequences 1–4 steps." },
        { name: "relates", description: "Counts to 20, before/after/between, groups into sets, compares more/less/equal, arranges smallest to largest, continues patterns, sorts using rules." },
        { name: "applies", description: "Adds within 10, uses tens and ones up to 50, identifies odd/even, counts in 2s and 10s, measures with non-standard units, identifies 2D shapes by sides and corners.", isNorthStar: true },
      ],
    },
  ],
  segmentDefinitions: [
    {
      id: "imagine-playground",
      name: "Imagine Playground",
      durationRange: "35 min",
      objective:
        "Imagination through building. Children meet stem concepts — math, physics, sequencing, conditionals, probability — through stories and hands-on building. Materials are blocks of different kinds: Math Train, Coding Express, STEAM Park, ramp materials, magna tiles, general blocks. The teacher sets a challenge, lays out materials, and steps back. 11 core projects run in a fixed order, each met 2–3 times across the year — deeper every time. Why it alternates with WonderWorld: both build curiosity, problem solving, and creation, but Imagine Playground works in the language of blocks and structures, while WonderWorld works in the language of everyday things. Children need both. Runs on Session A only.",
      type: "rotating",
      rotationPool: Object.keys(imaginePlaygroundProjects),
    },
    {
      id: "wonder-world",
      name: "WonderWorld",
      durationRange: "35 min",
      objective:
        "Imagination through everyday things. Children meet stem concepts — sorting, sequencing, fractions, classification — through food, families, and the world around them. The book this year is What Is In Your Tiffin? — covering bread, cheese, butter, salad. Materials are basic art supplies (playdough, crayons, paper, plastic foods) and DIY food games (Food Connect, Food Guess) — no blocks. 15 activities run in a fixed order, each met twice across the year — deeper every time. Why it alternates with Imagine Playground: both are creation- and curiosity-driven, but WonderWorld grounds learning in daily life while Imagine Playground stretches it through imaginary worlds. Runs on Session B only.",
      type: "rotating",
      rotationPool: Object.keys(wonderWorldActivities),
    },
    {
      id: "logic-lab",
      name: "Logic Lab",
      durationRange: "20 min",
      objective:
        "One game per session — rules explained once at first play, by the third session children know the rules and the teacher only observes. 6 games rotate (Candy Sort, Stitch Me, Dot Grid, Logical Road Builder, Where Does It Go?, Magna Tiles). Each game has 4 difficulty layers built in so the same game runs deeper across the year.",
      type: "rotating",
      rotationPool: Object.keys(logicLabGames),
    },
    {
      id: "numbers-gym",
      name: "NumbersGym",
      durationRange: "25 min",
      objective:
        "Every child works in their personal gamebook at their own level. Three level books (1 → 2 → 3); a child moves up when they demonstrate the current level confidently across two independent sessions. The gamebook is a surface for thinking with objects — every page uses physical materials (coloured tiles, threading beads, balance scales, number tracks, counters, sorting trays).",
      type: "fixed",
    },
    {
      id: "experience-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "Each child has a personal Experience Book. The teacher writes one specific sentence about what the child did that day — a project they built, a question they asked, a number they counted, a 'because' they explained. The child adds a drawing or stamp. The book goes home regularly so parents can see growth. This is also where Number Sense level transitions are recorded.",
      type: "fixed",
    },
  ],
  sessionTable: buildSessionTable(),
  activities: {
    ...imaginePlaygroundProjects,
    ...wonderWorldActivities,
    ...logicLabGames,
  },
  checkpoints: [],
};
