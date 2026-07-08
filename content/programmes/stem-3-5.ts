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
      "Educator gives clues ('I am round and flat. I puff on the pan'). Children point to the matching picture or playdough bread. Then children invent their own clues.",
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child listens to a clue and points to the bread it describes.",
    steps: [
      "lay the picture cards or playdough breads out where every child can see them.",
      "give one clue at a time — for example 'i am round and flat. i puff on the pan.'",
      "the child listens and points to the matching bread.",
      "confirm the answer and name the bread together.",
      "once children have caught on, let each child invent their own clue for the group to guess.",
    ],
    endsWhen: "every child has both guessed a clue and invented one for the group.",
    easierVariation:
      "give a very simple clue with the shape word — 'i am round' — and point roughly at the cards.",
    harderVariation:
      "the child invents a two-part clue that names shape and how it is cooked, and the group has to guess.",
    skillIds: ["logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child puts the 5 bread journey cards in order and acts each step out.",
    steps: [
      "spread the 5 cards face up in a mixed order in front of the child.",
      "the child looks at each card and picks which one comes first.",
      "the child lays the cards left to right in the order they think is right.",
      "check the order together — seed, wheat, flour, dough, bread.",
      "the child acts out each step with their body — tiny seed, tall wheat, grinding, kneading, eating.",
    ],
    endsWhen: "the child has laid the 5 cards in the right order and acted every step.",
    easierVariation:
      "give the child only the first and last card and ask which comes first.",
    harderVariation:
      "the child adds their own sixth card — what happens after the bread — and acts it out.",
    skillIds: ["logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child sorts grains from stones into 'food' and 'not food' bowls.",
    steps: [
      "fill a tray with a mix of grains and stones or beads.",
      "place two bowls next to the tray — one labelled 'food', one 'not food'.",
      "the child picks pieces out one at a time, deciding which bowl each belongs in.",
      "keep going until the tray is empty and everything is sorted.",
      "then give the child a sieve and let them try sorting the same mix again — compare which was faster.",
    ],
    endsWhen: "the tray is empty and every piece has landed in the right bowl, both by hand and with the sieve.",
    easierVariation:
      "use only two clearly different items — big pebbles and rice — so the choice is obvious.",
    harderVariation:
      "mix in items of similar size and race a friend to see who sorts fastest with the sieve.",
    skillIds: ["logic", "problem-solving", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child sorts foods into 'yes with cheese' and 'not with cheese' piles.",
    steps: [
      "the child shapes a pretend cheese piece from yellow playdough.",
      "lay two sorting mats — one 'yes with cheese', one 'not with cheese'.",
      "the child picks one food card or plastic food at a time.",
      "the child places it on the mat they think fits and says why.",
      "keep going until every food is sorted onto one of the two mats.",
    ],
    endsWhen: "every food card has been placed on one of the two sorting mats and explained.",
    easierVariation:
      "use only three or four very obvious foods — the child sorts and you name the group.",
    harderVariation:
      "add tricky foods where the child has to argue why they belong on their chosen mat.",
    skillIds: ["logic", "problem-solving"],
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
      "Educator reads a food name. If it comes from milk (butter, paneer, cheese, yoghurt), children clap. If not, hands stay still. Builds categorisation and listening control.",
    players: "whole class · 1 educator",
    duration: "35 min",
    goal: "the child claps only when the food you name comes from milk.",
    steps: [
      "gather the children in a circle where everyone can see you.",
      "explain the rule — clap if it comes from milk, hands still if it doesn't.",
      "read a food name aloud, one at a time.",
      "pause and check who clapped and who kept still.",
      "confirm the answer and keep going through the list.",
    ],
    endsWhen: "you have read through the whole food list and every food has been clap-checked.",
    easierVariation:
      "hold up a picture card as you say each food so the child can see what it is.",
    harderVariation:
      "read faster and mix in tricky foods like ice cream or ghee — the child has to decide quickly.",
    skillIds: ["logic", "curiosity"],
    materials: ["Educator-read food list (optional picture cards)"],
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
      "Memory and sequencing game. First child names one ingredient. Next child adds another. Each child must repeat the full sandwich so far. Educator uses picture cards if support is needed.",
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child adds one ingredient to a shared sandwich after repeating everything that came before.",
    steps: [
      "sit the children in a circle. lay the picture cards out for backup.",
      "the first child names one ingredient — 'i am putting bread'.",
      "the next child repeats the first and adds one more — 'i am putting bread and cheese'.",
      "keep going around the circle, each child repeating the whole sandwich and adding one new ingredient.",
      "if a child forgets, they check the picture cards to recover.",
    ],
    endsWhen: "every child has taken a turn and the sandwich has grown one ingredient per child.",
    easierVariation:
      "the child picks and names an ingredient from a picture card — they don't need to repeat the full sandwich.",
    harderVariation:
      "no picture cards — the child holds the full sandwich in their head and adds one more.",
    skillIds: ["logic", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child fills a 4-section tiffin with one food per colour.",
    steps: [
      "place the tiffin tray or 4-section mat in front of the child.",
      "spread out the plastic foods or coloured picture cards.",
      "the child picks one red food and places it in one section.",
      "the child picks a green, an orange, and a yellow food and fills the other three sections.",
      "the child names each food and colour, and says which colours are missing.",
    ],
    endsWhen: "the child's tiffin has one food in every section, one per colour.",
    easierVariation:
      "you name the colour and the child just finds a food to match.",
    harderVariation:
      "add more colours or rules — like 'no colour can repeat and each food has to grow above the soil'.",
    skillIds: ["logic", "number-sense", "curiosity"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child sorts food cards above or below the soil line by where they grow.",
    steps: [
      "lay the brown paper sheet flat — this is the soil.",
      "stack the picture cards face down beside it.",
      "the child takes one card from the top of the stack.",
      "the child places it above or below the soil line and says why — 'tomato grows above because…'.",
      "keep going until the whole stack is placed.",
    ],
    endsWhen: "every food card is placed above or below the soil line with a reason.",
    easierVariation:
      "you hold up two clear examples first — potato and tomato — and let the child copy the idea.",
    harderVariation:
      "add tricky cards like carrot leaves and onions where part grows above and part below — the child decides and defends the choice.",
    skillIds: ["logic", "curiosity"],
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
      "Educator gives a salad recipe one step at a time — base, vegetables, topping, mix. Children follow in order, then a second round where they choose their own order and compare results. Sequencing and decision-making.",
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child follows a salad recipe step by step, then chooses their own order.",
    steps: [
      "place a bowl or plate in front of the child with the salad ingredients spread beside it.",
      "call the first step — 'first, add the base'. the child adds it.",
      "call the next steps in order — vegetables, topping, mix — one at a time.",
      "the child finishes the first salad in the given order.",
      "run a second round where the child picks their own order and compares the two salads.",
    ],
    endsWhen: "the child has made one salad following your recipe and one salad in their own chosen order.",
    easierVariation:
      "run only two steps — base and topping — so the child holds a shorter sequence.",
    harderVariation:
      "the child plans the full recipe before touching anything and only starts once they can say every step in order.",
    skillIds: ["logic", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child answers a food detective question each round and explains why.",
    steps: [
      "spread the picture cards or toy foods on a tray in the middle.",
      "round 1 — colour: ask 'find something red' and the child picks a card and says why.",
      "round 2 — texture: ask 'which is crunchy?' and the child picks and explains.",
      "round 3 — growing place: ask 'which grows below?' and the child picks and explains.",
      "round 4 — odd one out: lay a small group and ask 'which doesn't belong?' — the child picks and says the rule.",
    ],
    endsWhen: "the child has answered all four rounds with a reason.",
    easierVariation:
      "you name only the colour round with obvious foods and skip the odd-one-out.",
    harderVariation:
      "the child invents their own round and asks the group a food detective question of their own.",
    skillIds: ["logic", "curiosity", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child asks yes/no questions to guess the hidden food card.",
    steps: [
      "one child picks a food card from the deck and keeps it hidden from the group.",
      "the other children take turns asking one yes/no question at a time.",
      "the card holder answers only yes or no.",
      "the group tracks how many questions they have used out of ten.",
      "when the group thinks they know the food, they guess it out loud.",
    ],
    endsWhen: "the group guesses the food correctly or reaches ten yes/no questions.",
    easierVariation:
      "show three possible cards face up — the child holds one hidden and the group narrows it down from three.",
    harderVariation:
      "drop the question limit to five — the group has to ask smarter, wider questions.",
    skillIds: ["curiosity", "logic", "problem-solving"],
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
    players: "3–8 children · 1 educator",
    duration: "35 min",
    goal: "the child joins a food tile to the chain by matching one shared attribute.",
    steps: [
      "lay one food tile in the middle to start the chain.",
      "spread the rest of the 40 tiles in front of the children.",
      "the first child rolls the dice — the dice picks the attribute to match on (colour, texture, food group, or shape).",
      "the child finds a tile that shares that attribute with the last tile in the chain and joins it.",
      "pass the dice to the next child and keep going.",
    ],
    endsWhen: "the children run out of matchable tiles or every child has taken several turns.",
    easierVariation:
      "use the easiest level only — the child joins by colour, texture, food group, or shape, whichever they can spot fastest.",
    harderVariation:
      "the child must justify each match with a sentence — 'i'm joining this because it also grows below the soil'.",
    skillIds: ["logic", "curiosity", "problem-solving"],
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
        "Imagination through building. Children meet stem concepts — math, physics, sequencing, conditionals, probability — through stories and hands-on building. Materials are blocks of different kinds: Math Train, Coding Express, STEAM Park, ramp materials, magna tiles, general blocks. The educator sets a challenge, lays out materials, and steps back. 11 core projects run in a fixed order, each met 2–3 times across the year — deeper every time. Why it alternates with WonderWorld: both build curiosity, problem solving, and creation, but Imagine Playground works in the language of blocks and structures, while WonderWorld works in the language of everyday things. Children need both. Runs on Session A only.",
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
