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
    setupLine: "Sort, spot the pattern, and match candies by colour, shape, or pattern.",
    howToPlay:
      "Candy Sort is played through three gameplay areas — Sort, Pattern, and Match/Find. Each area contains several games that progress in the order listed. Educators pick one game per session and lead children through the setup and rules for that game.",
    players: "6–9 children · 1 educator",
    duration: "20 min",
    goal: "the child groups, identifies, or predicts candies by colour, shape, or pattern.",
    steps: [
      "pick one gameplay area for the session — Sort, Pattern, or Match/Find.",
      "pick one game inside that area and gather the candy cards needed.",
      "explain the rule of the game to the children before starting.",
      "children take turns following the rule — sorting, matching, or predicting candies.",
      "when the round finishes, choose the next game in the area or move to a new area next session.",
    ],
    endsWhen: "the round of the chosen game is over.",
    easierVariation:
      "the educator demonstrates first and assists whenever required.",
    harderVariation:
      "children take on the level-up version — a second sorting rule, two dice, child-given clues, or a time limit.",
    skillIds: ["logic", "problem-solving", "number-sense"],
    materials: [
      "Candy cards — colour, shape, and pattern varieties",
      "Two dice (for Roll & Hunt)",
      "Sorting plates or team trays",
      "Timer (optional)",
    ],
    variations: [
      {
        name: "Sort · Venn Sort",
        description:
          "Divide the class into 2–3 groups.\nGive each group a pile of candy cards and place it in the centre.\nThe educator shows one sorting rule, such as: colour (red candies), shape (round candies), or pattern (striped candies).\nThe educator first picks and sorts 3–4 candies that follow the rule.\nChildren look through the pile and take turns picking one candy at a time.\nEach child checks if their candy matches the sorting rule.\nIf the candy matches the rule, the child places it in the correct group.\nContinue until all children have had a turn or the pile is sorted.",
      },
      {
        name: "Sort · Candy Sort",
        description:
          "Divide the class into small groups of 2–3 children.\nGive each group a pile of candy cards and place it in the centre.\nThe educator gives each child or group one sorting rule — colour (red / blue / yellow), shape (round / wavy / umbrella), or pattern (striped / dotted / plain).\nChildren look through their pile and find all the candies that match their rule.\nOnce sorting is complete, each child or group counts how many matching candies they found.\nThe educator can also ask children to count the candies that do not match their rule.\nIf a group finds candies that belong to another group's rule, they can exchange them with that group.\nTo make it harder, the educator adds a second rule within the sorted set — e.g. \"from your blue candies, now find only the wavy blue candies.\"\nStart with simple sorting by colour, then move to shape, and finally introduce patterns.",
      },
      {
        name: "Sort · Secret Rule",
        description:
          "Divide the class into small groups of 2–3 children.\nPlace a small group of candy cards in front of each group.\nMake sure all the candies follow one secret rule — colour (all red), shape (all round), or pattern (all striped).\nAsk children to look carefully at the candy cards.\nChildren try to guess what is the same about all the candies.\nEach child takes a turn to share their idea.\nChildren name the rule aloud, such as \"the rule is red candies.\"\nEducator can guide by asking: \"What do you notice? What is the same?\"",
      },
      {
        name: "Sort · Odd Candy Out",
        description:
          "Divide the class into small groups of 2–3 children.\nPlace a small group of candy cards in a row in front of each group.\nMost candies should share one trait — colour, shape, or pattern.\nAdd one candy that is different from the rest.\nAsk children to look carefully at all the candy cards.\nChildren find the candy that does not belong.\nEach child takes a turn to point to the odd candy.\nChildren can say why it is different, such as \"this one is not round\" or \"this one is a different colour.\"",
      },
      {
        name: "Pattern · What's Next?",
        description:
          "Divide the class into small groups of 2–3 children.\nPlace a few candy cards in a simple pattern in front of each group.\nStart with an easy pattern — colour (red, blue, red, blue) or shape (round, wavy, round, wavy).\nAsk children to observe the pattern carefully.\nChildren guess what candy should come next.\nEach child takes a turn to pick one candy card and add it to the pattern chain.\nContinue until every child gets a turn or the pattern is complete.\nStart with colour patterns, then shape, then pattern-based sequences.",
      },
      {
        name: "Match / Find · Roll & Hunt",
        description:
          "Divide the class into small groups of 2–3 children.\nGive each group a pile of candy cards and place it in the centre.\nEach child takes a turn to roll the die.\nThe child picks candies from the pile based on the number shown on the die.\nFor a challenge, children can roll two dice.\nChildren pick candies based on the dice result, up to a maximum of 6 candies.\nContinue until every child gets a turn.",
      },
      {
        name: "Match / Find · Sweet Relay",
        description:
          "Divide the class into small groups of 2–3 children.\nGive each group a pile of candy cards and place it in the centre.\nOne child picks any candy from the pile.\nThe next child picks another candy that has one matching trait.\nThe child says the matching trait aloud, such as \"my candy is red too.\"\nContinue the relay until no more matching candies are left.\nEducator can start a new relay with a different candy and trait.",
      },
      {
        name: "Match / Find · I Spy Candy",
        description:
          "Divide the class into small groups of 2–3 children.\nPlace all candy cards where everyone can see them.\nEducator or one child secretly chooses one candy.\nThey give a clue, such as \"I spy a candy that is shaped like an umbrella.\"\nOther children look carefully and try to find the matching candy.\nChildren take turns guessing the candy.\nContinue with a new candy and a new clue.",
      },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator demonstrates first and assists whenever required." },
      { level: "Medium", description: "Children play the game independently." },
      { level: "Hard", description: "Children take on the level-up version of the game — e.g. a second sorting rule, two dice, child-given clues, or a time limit." },
    ],
    educatorNote:
      "Each gameplay area (Sort, Pattern, Match/Find) contains several games that progress in the order listed — work through them in sequence. Within any one game, the educator sets the support level (Easy / Medium / Hard) to match the child. So a child might be at \"Easy\" on a new Pattern game while already at \"Hard\" on a familiar Sort game.",
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-stitch-me": {
    id: "ll-stitch-me",
    segment: "logic-lab",
    title: "stitch me",
    setupLine: "Lace beads onto the base by following the pattern card.",
    howToPlay:
      "Each child is given one base template card (start with Level Easy) along with a shoelace and beads. The kids can start lacing according to the pattern in the card. All kids have to start from Level Easy then gradually progress to Level Hard.",
    players: "3–6 children · 1 educator",
    duration: "20 min",
    goal: "the child laces beads onto the base by following the pattern on the card.",
    steps: [
      "give each child one base template card (start with Level Easy), a shoelace, and beads.",
      "the child laces the beads onto the base following the pattern shown on the card.",
      "when the child completes the card, move them up to the next level.",
      "all children start from Level Easy and gradually progress to Level Hard.",
    ],
    endsWhen: "every child has completed at least one Level Easy card and progressed to their next level.",
    easierVariation:
      "the educator sits with the child and points to the next bead on the card each time.",
    harderVariation:
      "the child laces from a verbal riddle instead of a card — see Variation 3 below.",
    skillIds: ["logic", "problem-solving", "number-sense"],
    materials: [
      "Stitch me pattern cards (easy, medium, difficult)",
      "Sewing bases (beads, numbers)",
      "Shoelaces",
    ],
    variations: [
      {
        name: "Variation 1: Free pattern",
        description:
          "The educator can increase the difficulty level. In the difficulty the kids are free to make their own pattern.",
      },
      {
        name: "Variation 2: Verbal prompt scavenger",
        description:
          "The educator will give a verbal prompt including colour and number and the kids will find them in the scavenger bin (box). Example: \"Blue 2, yellow 1…\".",
      },
      {
        name: "Variation 3: Riddle relay",
        description:
          "The whole class is divided into two groups. Each group has their own lace.\nThe educator reads a riddle.\nThe child from both groups races and picks the matching bead or number, and laces it.\nExamples: \"I'm the same colour as a strawberry\" → red bead. \"I'm what comes after 2 and before 5\" → number 3 or 4.",
      },
    ],
    educatorNote:
      "Since there is only one set of number cards, the educator's riddles should allow for multiple possible answers.",
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-dot-grid": {
    id: "ll-dot-grid",
    segment: "logic-lab",
    title: "dot grid",
    setupLine: "Pick a card, follow the puzzle type, place disks on the mat.",
    howToPlay:
      "Set up: Place the play mat in the centre with the four colour disks beside it. Sort the cards by level. One child picks a card. Observe the puzzle type and follow the instructions and recreate it on the mat. Children take turns placing the colour disks on the mat to solve the puzzle. After completing the card, try the bonus challenge on the other side of the card as an added task.",
    players: "2–4 children · 1 educator",
    duration: "20 min",
    goal: "the child picks a card, follows its puzzle type, and places disks on the mat to solve it.",
    steps: [
      "place the play mat in the centre with the four colour disks beside it.",
      "sort the cards by level.",
      "one child picks a card. observe the puzzle type and follow the instructions.",
      "children take turns placing the colour disks on the mat to solve the puzzle.",
      "after completing the card, try the bonus challenge on the other side of the card as an added task.",
    ],
    endsWhen: "every child has completed at least one card and its bonus challenge.",
    easierVariation:
      "use the easy cards — the child builds exactly what they see on the card.",
    harderVariation:
      "use the hard cards with the team challenge variation.",
    skillIds: ["logic", "number-sense", "problem-solving"],
    namedBlocks: [
      {
        title: "Game Types",
        body: "Copy — Direct visual replication. Children build exactly what they see on the card.\nFinish the Pattern — Pattern recognition + completion. Children continue an existing pattern into the next row or column.\nMirror It Across — Spatial reflection (left → right). Children build the mirror image on the next half, matching the first half.\nCount How Many? — Counting and comparison (more/less). Children arrange the dot pattern on the mat and count to answer \"how many?\"\nWhat Comes Next? — Identifying rules and predicting. Children look at a sequence and place disks to show what comes next in a given cell.",
      },
    ],
    materials: [
      "Dot grid mat",
      "See and predict cards — 16",
      "See and match cards — 16",
      "Coloured disks",
    ],
    variations: [
      {
        name: "Variation 1: Team Challenge",
        description:
          "One team creates a pattern on their mat. The other team observes it and recreates or completes the pattern on their own mat.\nThis variation can be used with all gameplays except Copy the Pattern.\nFor example, one team can build half of a mirror pattern and the other team completes the reflection. Similarly, one team can create the beginning of a What Comes Next? pattern, and the other team finishes the sequence.",
      },
      {
        name: "Variation 2: Create & Challenge",
        description:
          "A child creates a pattern or arrangement on the grid. Their partner then solves the puzzle.\nThis variation can be used with card types — Mirror It Across, How Many?, Finish the Pattern, or What Comes Next?",
      },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Easy cards." },
      { level: "Medium", description: "Medium cards; Variation 2 (Create & Challenge)." },
      { level: "Hard", description: "Hard cards; Variation 1 (Team Challenge)." },
    ],
    educatorNote:
      "The bonus round prompts are provided as examples. Educators may create similar prompts based on the children's learning level and interests to extend gameplay.",
    debriefPrompts: [],
    type: "physical-game",
  },

  "ll-logical-road-builder": {
    id: "ll-logical-road-builder",
    segment: "logic-lab",
    title: "logical road builder",
    setupLine: "Build a connected road from start to end using straight and curved tiles.",
    howToPlay:
      "Place tiles on the board one by one to create a connected road from the starting point to the end point. Choose between straight and curved tiles to make the path fit and flow without any gaps or dead ends. Educators can initially start with just one or two base boards, then add more base boards. Educators can add a timer to increase difficulty in later variations.",
    players: "1–2 children · 1 educator",
    duration: "20 min",
    goal: "the child builds a connected road from the starting point to the end point using straight and curved tiles.",
    steps: [
      "place the base board(s) in front of the child. mark a starting point and an end point.",
      "spread the straight and curved tiles beside the board.",
      "the child places one tile at a time to make the road flow from start to end.",
      "when a tile doesn't fit, swap it for a curved or straight one so the road connects without gaps.",
      "when the road connects start to end, add another base board or a timer to raise the challenge.",
    ],
    endsWhen: "the child has connected the road from start to end without gaps.",
    easierVariation:
      "start with a single base board and a short path so the child feels the connection quickly.",
    harderVariation:
      "add a timer and use two or more base boards with multiple destinations.",
    skillIds: ["logic", "problem-solving"],
    materials: [
      "Logic Road Builder game board",
      "Road tiles",
    ],
    variations: [
      {
        name: "Variation 1: Limited tiles",
        description:
          "The educator can give the child a limited number of tiles (example: 6 straight, 4 straight and 1 curved) and the child has to build the road using the given pieces only.",
      },
      {
        name: "Variation 2: Multiple destinations",
        description:
          "Educators can give more than 2 final points and the child has to build a path where they reach destination 1 then travel to destination 2.",
      },
      {
        name: "Variation 3: Relay race",
        description:
          "Educators can ask two kids to start from opposite ends of the board and have one final destination, and both kids race to reach the destination first in a relay race.",
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
      "Children build using Magna-Tiles. The educator shows a prompt flashcard (laminated for reuse). Each card specifies the level — children match colours, count tiles, copy structure, fill borders, or invent freely. Five levels run in sequence: 3D Build → 2D Match → 2D Stack → Border Fill → Open-ended.",
    players: "3–8 children · 1 educator",
    duration: "20 min",
    goal: "the child looks at a flashcard prompt and builds the matching shape with magna-tiles.",
    steps: [
      "spread the magna-tiles out where every child can reach them.",
      "show one prompt flashcard and read the level's instruction aloud.",
      "let the child count the tiles shown and pick that many from the pile.",
      "children can play individually or as a group, depending on the child's level of understanding.",
      "once built, show the next flashcard or move up a level.",
    ],
    endsWhen: "the child's build matches the flashcard prompt for the current level.",
    easierVariation:
      "start at level 1 — show a 3d prompt like a tower or bridge and help the child build it vertically with support to balance.",
    harderVariation:
      "run level 5 open-ended — give a tile limit or design challenge with no fixed picture, and let the child experiment freely and describe their build.",
    skillIds: ["problem-solving", "logic", "number-sense"],
    namedBlocks: [
      {
        title: "Free Play",
        body: "Children use the Magna-Tiles to explore, create, and build freely — their own shapes, structures, objects, or designs — following their imagination, with no set rules.",
      },
    ],
    materials: [
      "Magna-Tiles set",
      "Prompt cards (level 1 to 5)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Level 1 cards; free play." },
      { level: "Medium", description: "Level 2 and Level 3 cards." },
      { level: "Hard", description: "Level 4 and Level 5 cards." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── Imagine Playground — 11 core build projects + 4 maker fillers ─
 * Each project listed here is a CurriculumActivity so it can be
 * surfaced via the library / segment popups. Lesson-plan detail
 * lives in components/ImaginePlaygroundBookModal.tsx (used as the
 * educator reference book on the overview page). ───────────────── */

const imaginePlaygroundProjects: Record<string, CurriculumActivity> = {
  "ip-train-time": {
    id: "ip-train-time",
    segment: "imagine-playground",
    title: "train time",
    setupLine: "Build a track and number the train cars.",
    howToPlay:
      "Children join track pieces, attach train cars, count pieces as they connect, and stick numbers on each car in order. Low-stakes entry to the block system; counting while building makes Number Sense visible from Day 1.",
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds a track, attaches train cars, and numbers each car in order.",
    steps: [
      "spread the track pieces, train cars, and number sticky notes in the middle.",
      "the child joins track pieces one by one, counting each piece as they connect it.",
      "the child attaches the train cars to the finished track.",
      "the child sticks a number on each car in order.",
      "run the train along the track once it is fully numbered.",
    ],
    endsWhen: "every car on the train has a number sticky note in order.",
    easierVariation:
      "you name the numbers aloud as the child sticks them on each car.",
    harderVariation:
      "the child counts the total number of track pieces used and finds the matching number.",
    skillIds: ["number-sense", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds a double-ended track and uses action bricks to change what the train does.",
    steps: [
      "the child builds a station at one end and a destination at the other end of a straight track.",
      "the child places the train on the track and sends it across.",
      "you place a red action brick on the track. the child sends the train again and watches what changes.",
      "swap the red brick for a green action brick. the child sends the train again and compares.",
      "the child talks about which brick did what.",
    ],
    endsWhen: "the child has taken the train across the track with each action brick and can say what each colour did.",
    easierVariation:
      "you place the bricks on the track for the child and name each colour before the train runs.",
    harderVariation:
      "the child mixes red and green action bricks along the track and predicts what the train will do before sending it.",
    skillIds: ["curiosity", "logic", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child reads a number on a card and loads that many bricks onto the train car.",
    steps: [
      "line up the train cars in front of the child.",
      "show the child one number card.",
      "the child says the number out loud.",
      "the child counts out that many bricks or objects and loads them onto the car.",
      "move on to the next car with a new number card.",
    ],
    endsWhen: "every train car is loaded with the number of bricks shown on its card.",
    easierVariation:
      "you count out loud with the child as they load each brick.",
    harderVariation:
      "the child picks two cards, adds them together, and loads that total onto one car.",
    skillIds: ["number-sense", "logic"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds the longest track they can and measures it.",
    steps: [
      "start the child's track against a wall so it grows outwards.",
      "the child joins track pieces one at a time, going as far as they can.",
      "the child measures the finished track with a tape measure.",
      "the child measures the same track again using number bricks laid end to end.",
      "the child then builds a tower and measures its height the same way.",
    ],
    endsWhen: "the child has measured both the longest track and a tower using tape and bricks.",
    easierVariation:
      "you hold the tape at one end and read the number aloud while the child stretches it.",
    harderVariation:
      "two children build side-by-side and compare whose track is longer, by how many bricks.",
    skillIds: ["number-sense", "logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child plans a train journey using yellow, blue, and white bricks before the train moves.",
    steps: [
      "build a track with a tunnel section in the middle.",
      "the child plans the journey — where to put each yellow, blue, and white brick — before touching the train.",
      "the child places every action brick on the track along the plan.",
      "the child sends the train and watches what happens at each brick.",
      "the child checks if the journey matched the plan, especially the white brick lighting up inside the tunnel.",
    ],
    endsWhen: "the train has run the full planned journey and every action brick has done its job.",
    easierVariation:
      "start with just one colour of action brick — the child plans a journey using only yellow bricks.",
    harderVariation:
      "the child plans a journey using all three colours in a specific sequence and tells the group what will happen at each brick before the train moves.",
    skillIds: ["logic", "problem-solving", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds a looping o-shaped track and notices the same journey repeating.",
    steps: [
      "the child joins curved and straight track pieces into a closed o-shape.",
      "the child places the train on the track and sends it around.",
      "the child watches the train pass the same spot again and again.",
      "you also build a straight double-ended track next to it.",
      "the child compares the two — one repeats forever, the other stops.",
    ],
    endsWhen: "the child has run the train around the o-track more than once and can say which track repeats.",
    easierVariation:
      "you help the child snap the last curved piece so the o-track closes properly.",
    harderVariation:
      "the child adds action bricks around the o-track so a specific event repeats every loop.",
    skillIds: ["logic", "curiosity", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child uses a coloured ticket to decide which branch the train takes at the switch.",
    steps: [
      "the child builds a y-shaped track with a switch where the two branches meet.",
      "the child places a coloured brick as a stop at the end of each branch.",
      "the child picks a coloured ticket brick.",
      "the child sets the switch so the train goes to the stop matching the ticket colour.",
      "the child sends the train and checks it reaches the right stop.",
    ],
    endsWhen: "the train reaches the stop whose colour matches the ticket the child picked.",
    easierVariation:
      "start with just two ticket colours and say 'if red then go to red' out loud with the child.",
    harderVariation:
      "the child draws a ticket without looking and has to set the switch correctly before sending the train.",
    skillIds: ["logic", "problem-solving"],
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
      "Children apply route planning to solve traffic problems. The educator places action bricks randomly along the track — children identify the problem and choose the right traffic sign to fix it.",
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child reads the trouble on the track and picks the right traffic sign to fix it.",
    steps: [
      "the child builds a y-shaped track using the building cards.",
      "you place action bricks randomly along the track to create a problem.",
      "the child looks at the track and says what the trouble is.",
      "the child picks the traffic sign that will fix it and places it on the track.",
      "the child sends the train through and checks that the sign solved the problem.",
    ],
    endsWhen: "the train can travel the track without hitting the trouble you placed.",
    easierVariation:
      "you point to the trouble and offer two traffic signs — the child picks the right one.",
    harderVariation:
      "place two or three troubles at once — the child has to pick and place the right sign for each.",
    skillIds: ["problem-solving", "logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds a ramp, predicts how far a car will roll, then rolls it and records where it stopped.",
    steps: [
      "the child builds a ramp with magna tiles pointing at a number track.",
      "the child picks a car and predicts on the number track where it will stop.",
      "the child releases the car from the top of the ramp.",
      "the child marks the actual stopping point on the number track.",
      "the child records the result on the graph and compares prediction to reality.",
    ],
    endsWhen: "the child has rolled the car several times and filled in the result graph.",
    easierVariation:
      "the child predicts using only 'short' or 'far' — you place the number marker for them.",
    harderVariation:
      "the child changes the ramp height between rolls, predicts each time, and notices how the height changes the distance.",
    skillIds: ["curiosity", "logic", "number-sense"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child builds a trigger sequence where one event sets off the next.",
    steps: [
      "pair the children up and give each pair building pieces and moving objects.",
      "each pair builds a small trigger sequence — one object that pushes, falls, or triggers the next.",
      "line up all the pairs' work so the end of one sequence starts the next.",
      "the first child pushes the very first object to start the chain.",
      "the group names the first cause, the first event, and the last event.",
    ],
    endsWhen: "the whole chain has fired from first push to last event.",
    easierVariation:
      "each pair builds only two objects in a row — you help line them up.",
    harderVariation:
      "each pair adds an extra step to their sequence, and the group has to fix any breaks in the combined chain.",
    skillIds: ["problem-solving", "logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child predicts a colour, spins the wheel, and records what comes up over many rounds.",
    steps: [
      "set up the wheel with coloured sections and place the result graph beside it.",
      "the child looks at the wheel and predicts which colour will come up.",
      "the child spins the wheel and watches where it lands.",
      "the child records the outcome on the result graph.",
      "keep going for many rounds and notice which colour comes up most.",
    ],
    endsWhen: "the child has spun the wheel enough rounds to fill the result graph.",
    easierVariation:
      "use a wheel with only two colours so the prediction is simpler.",
    harderVariation:
      "add more coloured sections and, after several rounds, ask the child which colour has the best chance and why.",
    skillIds: ["curiosity", "logic", "number-sense"],
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
  // The Little Kitchen kit — one kit, four repeatable games that grow with the
  // child (played two ways: easy 3–4 · medium 4–5). Replaces the earlier
  // one-off tiffin activities. No scores, no winners — the educator reads the
  // play as observation. Source: lexagod little_kitchen game design.
  "kg-sort-guess": {
    id: "kg-sort-guess",
    segment: "wonder-world",
    title: "little kitchen · sort & guess",
    setupLine: "Sort real foods by a true rule, then guess a hidden one by ruling out.",
    howToPlay:
      "Children sort the food cards into two piles by a true rule, count each pile, then one child hides a card and gives clues while the others rule cards out until they name it.",
    players: "2–4 children · 1 educator",
    duration: "15–20 min",
    goal: "the child sorts food cards by a true rule, then names a hidden card from clues.",
    steps: [
      "lay out the food cards face-up.",
      "name a true rule — fruit / vegetable, or grows underground / above ground (by the part we eat).",
      "sort the cards into two piles on the table.",
      "count each pile and find its number on the mat's number track — which has more?",
      "one child hides a card and gives clues in their own words; the others turn ruled-out cards face-down, then name the card and say the \"because…\".",
    ],
    endsWhen: "the hidden card is named.",
    easierVariation:
      "one rule, teacher-named; sort and count one pile; skip the guess (level a, 3–4).",
    harderVariation:
      "the child chooses the rule, compares both piles, then gives free spoken clues for the guess (level b, 4–5).",
    skillIds: ["logic", "number-sense", "curiosity"],
    materials: [
      "Fruit cards (10) + vegetable cards (10)",
      "The cooking mat's number track (1–20)",
    ],
    educatorNote:
      "A rule must be TRUE. Underground foods are potato, carrot, radish, onion, beetroot — everything else grows above ground. Never sort by colour (apple, grapes come in more than one).",
    variations: [
      { name: "Two children", description: "One sorts, one checks and counts." },
      { name: "Small group", description: "Each child owns a pile." },
      { name: "Level up", description: "Sort by both rules in turn." },
      { name: "Level down", description: "The teacher places the first card." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "kg-cooking": {
    id: "kg-cooking",
    segment: "wonder-world",
    title: "little kitchen · cooking",
    setupLine: "Follow a picture recipe — count with dots and put the steps in order.",
    howToPlay:
      "Children pick a dish card, count one play-dough portion per dot on the recipe, lay the action cards in order, then cook the dish on the mat's plate.",
    players: "2–4 children · 1 educator",
    duration: "15–20 min",
    goal: "the child cooks a dish by counting play-dough portions to the dots and sequencing the action cards.",
    steps: [
      "pick a dish card and turn it over to the recipe (count-dots, a ½-glass, numbered steps).",
      "place one play-dough portion per dot and find the total on the mat's number track.",
      "lay the action cards in a row to match the numbered steps.",
      "cook on the plate — mould the dish, halve on the ½ / ¼ lines, fill the glass to ½.",
      "check and re-do any step that misfired.",
    ],
    endsWhen: "the dish is cooked and served.",
    easierVariation:
      "a 2–3 ingredient ★ dish (fruit bowl, lassi); count to ~10, one portion per dot (level a).",
    harderVariation:
      "a 3–4 ingredient ★★ dish; add two dot-groups within 10 and place the number token for the total, then halve on the ½ line (level b).",
    skillIds: ["number-sense", "problem-solving", "logic"],
    materials: [
      "Dish / recipe cards (18 dishes, ★ and ★★ rings)",
      "Ingredient + action cards",
      "The cooking mat (number track + ½ / ¼ plate + glass)",
      "Play-dough + number tokens (1–10)",
    ],
    namedBlocks: [
      {
        title: "how to read a recipe — no words",
        body:
          "Pick a dish by its front picture, then turn it over: the dots tell you how many of each ingredient (one play-dough portion per dot), a ½-glass means fill to half, and the numbered little pictures show the order of the actions.",
      },
    ],
    variations: [
      { name: "Kitchen line", description: "Each child does one action in turn." },
      { name: "Read & cook", description: "One child reads the dots, one cooks." },
      { name: "Level up", description: "Halve or share a portion." },
      { name: "Level down", description: "The teacher pre-places the portions, the child counts." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "kg-restaurant": {
    id: "kg-restaurant",
    segment: "wonder-world",
    title: "little kitchen · restaurant",
    setupLine: "Run a café — take orders, cook, bill and make change with pretend money.",
    howToPlay:
      "Children take roles (customer, chef, cashier), order off the menu, cook the dish, then bill and make change with pretend money on the invoice mat.",
    players: "2–4 children · 1 educator",
    duration: "15–20 min",
    goal: "the child runs a café off the menu and invoice — ordering, cooking, billing and making change.",
    steps: [
      "set up — flip one mat to its menu | invoice back; take roles customer · chef · cashier (with two children, one is chef and cashier).",
      "the customer orders off the menu by pointing, and sets the table.",
      "the chef cooks the dish on the plate (as in cooking).",
      "bill by token — drop each dish's price-coin into an invoice row and stack the coins in the total box.",
      "pay, then put the change in the change box.",
    ],
    endsWhen: "the bill is paid and change is given.",
    easierVariation:
      "order, cook and serve; count the plates — no money (level a).",
    harderVariation:
      "menu ₹1–₹10; pay and make change within 10 — a ₹6 bill paid with ₹10 gives ₹4 change (level b).",
    skillIds: ["number-sense", "problem-solving", "curiosity"],
    materials: [
      "Two cooking mats (one on its menu | invoice back)",
      "Dish cards",
      "Pretend money — ₹1 · ₹2 · ₹5 · ₹10",
    ],
    variations: [
      { name: "Swap roles", description: "Change roles each order." },
      { name: "Busy café", description: "More orders come in at once." },
      { name: "Level up", description: "A 2-dish bill, total ≤ ₹10." },
      { name: "Level down", description: "Every dish costs ₹1." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "kg-recipe-dev": {
    id: "kg-recipe-dev",
    segment: "wonder-world",
    title: "little kitchen · recipe development",
    setupLine: "Invent your own dish from the cards, predict it, then say why it works.",
    howToPlay:
      "Children choose ingredients into the tray, sequence their own action cards toward a goal, predict an observable, make and name the dish, then say why it works.",
    players: "2–4 children · 1 educator",
    duration: "15–20 min",
    goal: "the child invents a dish, predicts an observable, makes it, and says the \"because…\".",
    steps: [
      "choose ingredients into the tray (no recipe card).",
      "lay your own action cards in order toward a goal (\"make it drinkable in the glass\").",
      "predict an observable — colour, count, pieces, halves or shape (\"it'll be 3 yellow pieces\").",
      "make it on the plate, name it, and check — did the prediction hold?",
      "say the \"because…\"; the teacher notes it.",
    ],
    endsWhen: "the child names the dish and says why it works.",
    easierVariation:
      "combine 2–3 cards and name it; the teacher prompts one sense (level a).",
    harderVariation:
      "order the actions, predict an observable and check it, then justify the \"because\" (level b).",
    skillIds: ["curiosity", "problem-solving", "logic"],
    materials: [
      "Ingredient + action cards",
      "The small tray + the cooking mat",
      "Play-dough",
    ],
    variations: [
      { name: "Why-taster", description: "One invents, one keeps asking \"why?\"." },
      { name: "Menu of the day", description: "Invent a dish to add to the café menu." },
      { name: "Level up", description: "Add a constraint — \"use a vegetable\"." },
      { name: "Level down", description: "\"What could these two make?\"" },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

const buildWonderWorld = (n: number): string => {
  // Little Kitchen — the four games rotate in a fixed order and are replayed
  // across the Session-B slots. Re-playing a game is the point: the same game
  // runs easy (3–4) then medium (4–5), deepening every time; 18 dishes mean a
  // class can cook for months without repeating.
  const cycle = ["kg-sort-guess", "kg-cooking", "kg-restaurant", "kg-recipe-dev"];
  return cycle[(n - 1) % cycle.length];
};

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
        "Imagination through building. Children meet stem concepts — math, physics, sequencing, conditionals, probability — through stories and hands-on building. Materials are blocks of different kinds: Math Train, Coding Express, STEAM Park, ramp materials, magna tiles, general blocks. The educator sets a challenge, lays out materials, and steps back. 11 core projects run in a fixed order, each met 2–3 times across the year — deeper every time. Why it alternates with WonderWorld: both build curiosity, problem solving, and creation, but Imagine Playground works in the language of blocks and structures, while WonderWorld works in the language of everyday things. Children need both. Runs on Session A only.",
      type: "rotating",
      rotationPool: Object.keys(imaginePlaygroundProjects),
    },
    {
      id: "wonder-world",
      name: "WonderWorld",
      durationRange: "35 min",
      objective:
        "Imagination through everyday things. Children meet stem concepts — sorting, sequencing, fractions, classification — through the Little Kitchen kit — a repeatable kitchen board game played with food cards, two cooking mats and play-dough (no blocks). One kit, four games that grow with the child: sort & guess (logic), cooking (number sense), restaurant (money) and recipe development (invention). The same game is played two ways — easy for 3–4, medium for 4–5 — so it deepens across the year; 18 dishes mean a class can cook for months without repeating. No scores, no winners — the educator reads the play as observation. Why it alternates with Imagine Playground: both are creation- and curiosity-driven, but WonderWorld grounds learning in daily life while Imagine Playground stretches it through imaginary worlds. Runs on Session B only.",
      type: "rotating",
      rotationPool: Object.keys(wonderWorldActivities),
    },
    {
      id: "logic-lab",
      name: "Logic Lab",
      durationRange: "20 min",
      objective:
        "One game per session — rules explained once at first play, by the third session children know the rules and the educator only observes. 6 games rotate (Candy Sort, Stitch Me, Dot Grid, Logical Road Builder, Where Does It Go?, Magna Tiles). Each game has 4 difficulty layers built in so the same game runs deeper across the year.",
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
        "Each child has a personal Experience Book. The educator writes one specific sentence about what the child did that day — a project they built, a question they asked, a number they counted, a 'because' they explained. The child adds a drawing or stamp. The book goes home regularly so parents can see growth. This is also where Number Sense level transitions are recorded.",
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
