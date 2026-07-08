import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  ArtiverseUnit,
} from "@/content/types";

/* ─── Art Games (3-5) ────────────────────────────────────────
 * 8 games — 4 Fine Motor, 3 Colour, 1 Creative Expression.
 * Rules are explained once; educator sets up, steps back, observes.
 */

const artGamesActivities: Record<string, CurriculumActivity> = {
  // ── Fine Motor ──
  "shape-stitch-3-5": {
    id: "shape-stitch-3-5",
    segment: "art-games",
    title: "shape stitch",
    setupLine:
      "sew through templates using shoelaces. running stitch, backstitch, or a pattern combining stitches of your choice.",
    howToPlay:
      "Children sew through templates using shoelaces. Running Stitch = dashed line. Backstitch = continuous joined line. Whip stitch = over the edges in a loop. Pattern Stitching = combines stitch types in a design of the child's choosing.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child sews through a template with a shoelace using one chosen stitch.",
    steps: [
      "give each child a sewing template and a shoelace.",
      "show the stitch for the round — running stitch, backstitch, or whip stitch.",
      "the child threads the shoelace through the holes to make the stitch.",
      "when they finish one template, they pick another and try the next stitch.",
      "at the end, each child shows the stitches they made.",
    ],
    endsWhen: "every child has completed at least one stitched template.",
    easierVariation:
      "the child does running stitch or whip stitch on a large-hole template.",
    harderVariation:
      "the child combines stitch types in a pattern of their own choosing.",
    skillIds: ["fm"],
    materials: [
      "Sewing templates (numbers, alphabets, and object outlines)",
      "Shoelaces",
    ],
    referenceLinks: [
      { label: "Running stitch (Jennifer's Sewing Board tutorial)", url: "#running-stitch" },
      { label: "Whip stitch", url: "https://youtube.com/shorts/4Z0qfHVjWQw?si=dC3Ib0D3rmSl7o9d" },
      { label: "Back stitch (Jennifer's Sewing Board tutorial)", url: "#back-stitch" },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Running Stitch and Whip stitch." },
      { level: "Medium", description: "Backstitch." },
      { level: "Hard", description: "Pattern stitching." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  // ── stitch-me moved to STEM 3-5 Logic Lab (it's a logic / pattern game,
  // not an art game). See content/programmes/stem-3-5.ts. ──
  "shape-art": {
    id: "shape-art",
    segment: "art-games",
    title: "shape art",
    setupLine:
      "Match shapes to their outlines and colours on the mat.",
    howToPlay:
      "The objective of this game is to identify and match shapes by placing each foam or paper shape onto its corresponding outline and colour on the mat. The game develops shape recognition, colour recognition, visual discrimination, fine motor skills, and hand-eye coordination.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child matches shapes to their outlines and colours on the mat.",
    steps: [
      "lay the mat where all children can see it.",
      "place the shape pieces in a central pile.",
      "children take turns picking a piece and matching it to its outline and colour on the mat.",
      "continue until every space on the mat is filled.",
    ],
    endsWhen: "every space on the mat is matched with the correct shape.",
    easierVariation:
      "the educator calls out colour or shape one at a time and helps children spot the right piece.",
    harderVariation:
      "introduce the shape puzzle variation with whole, half, and quarter pieces.",
    skillIds: ["fm", "ce"],
    variations: [
      {
        name: "Variation 1: Mat Match Makers",
        description:
          "Lay the mat on the floor and place all the shape pieces in a central pile.\nThe educator calls out a colour, a shape, or a shape-and-colour combination.\nChildren search through the pile, find the matching piece, and place it in the correct position on the mat.",
      },
      {
        name: "Variation 2: Shape Focus",
        description:
          "Choose one shape mat from the set of four (Circle, Square, Rectangle, or Triangle).\nAssign 2–3 children to each mat.\nChildren search the central pile for the required shapes and place them in the correct spaces on their mat.",
      },
      {
        name: "Variation 3: Shape Puzzle",
        description:
          "Once children are familiar with matching shapes and colours on the Medium mat, introduce whole, half, and quarter shapes.\nEncourage children to complete each shape by finding and placing the correct matching pieces.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "imagine-that-3-5": {
    id: "imagine-that-3-5",
    segment: "art-games",
    title: "imagine that",
    setupLine:
      "Build the object on the card using shape tiles — and guess.",
    howToPlay:
      "Each child takes a turn picking a card and making the object using the shape tiles. Children join the shape tiles by following the picture on the card. The other children guess what it is. Children can also give verbal clues to describe the object or animal.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child builds the object on the card using shape tiles while others guess what it is.",
    steps: [
      "keep the object and animal card decks face-down. spread the shape tiles in the middle.",
      "on their turn, the child picks a card without showing it to the others.",
      "the child joins the shape tiles to make the object, following the picture on the card.",
      "the other children guess what it is.",
      "the child can add verbal clues to describe the object or animal if needed.",
    ],
    endsWhen: "every child has had a turn making a card.",
    easierVariation:
      "use only the easy cards; support the child in picking and placing shapes wherever required.",
    harderVariation:
      "the child draws the object on paper instead of using shape tiles, or plays draw relay against a timer.",
    skillIds: ["fm", "ce"],
    educatorNote: "Use easy cards initially and support children wherever required.",
    materials: [
      "Imagine that object cards (easy)",
      "Imagine that animal cards (easy)",
      "Shape tiles (from shape art game)",
      "Paper and pencil (optional)",
      "Timer",
    ],
    variations: [
      {
        name: "Draw & Guess",
        description:
          "The child looks at the card and draws the shapes by tracing or drawing them independently. The other children guess what it is.",
      },
      {
        name: "Team play — dumb charades",
        description:
          "Children split into groups and each group guesses what the other group has made; teams score points.",
      },
      {
        name: "Draw Relay",
        description:
          "Divide children into two groups. Each group gets a card.\nThe first child draws one part of the picture and passes it to the next child, who adds another part.\nThis continues until the drawing is complete.\nThe last child can add extra clues to help others guess the object or animal.",
      },
      {
        name: "Time challenge",
        description:
          "Set a short timer for the round to add pace and focus.",
      },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Original gameplay and team play with educator's support." },
      { level: "Medium", description: "Children make on their own." },
      { level: "Hard", description: "Draw & guess, draw relay, timed challenge." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Colour ──
  "mix-it-up": {
    id: "mix-it-up",
    segment: "art-games",
    title: "mix it up",
    setupLine: "Mix and match colours.",
    howToPlay:
      "This game builds colour matching, mixing, and naming. It is played through the five variations below — the educator picks one per round and lays out the cards needed for it. Children can play as individuals, pairs, or groups.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child matches, mixes, or names colours through one chosen variation.",
    steps: [
      "pick one variation for the round (colour flip, match the colour, colour set, mix and match, or colour detective).",
      "lay out the cards needed for that variation.",
      "explain the rule of the variation to the children.",
      "children take turns playing the round.",
      "when the round ends, pick another variation and go again.",
    ],
    endsWhen: "the round of the chosen variation is over (all cards flipped, set number of rounds done, or target colour mixed).",
    easierVariation:
      "play match the colour or colour set using easy object cards.",
    harderVariation:
      "play mix and match using complex object cards, or play colour detective with colour-formula questions.",
    skillIds: ["co"],
    materials: [
      "Colour cards — 12, 2 of each (24 total)",
      "Connector cards",
      "Simple object cards & complex object cards",
    ],
    variations: [
      {
        name: "Colour flip",
        description:
          "educator places pairs of colour cards facing down. Children take turns to flip any 2 cards. If they match, they keep it and name the colour. If they do not match, they place them back. The game ends when all the cards have been flipped and played.",
      },
      {
        name: "Match the colour",
        description:
          "educator picks and places an object card. The child picks the colour card/cards matching the object and places them near it. educator places the next object card and the next child continues. The same can be repeated with educator placing colour card/cards and children picking up the object cards matching it and placing them near. The game ends after a set number of rounds.",
      },
      {
        name: "Colour set",
        description:
          "educator gives each child a set number of object cards. Each child then takes turns picking up the matching colours from the pile. The game ends once each child has had a turn.",
      },
      {
        name: "Mix and match",
        description:
          "educator gives each child a secondary colour card (orange, purple, green) and asks them to mix 2 colours to obtain the colour on their card. Children choose the 2 colours and try it out; the educator can suggest two colours to try and match with the card. The game ends once the children have mixed the colours to create the target colour. Extension: the educator adds a colour paint and asks children to add white or black and check if the colour is lighter or darker than the colour card.",
      },
      {
        name: "Colour detective",
        description:
          "educator makes a colour-formula question using a connector and colour cards (for example, red card + blue card = ?). The child places the resultant colour card in place of the question mark, and can also place an object of the resultant colour. The game ends after a set number of rounds.",
      },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Match the colour and Colour set variations — easy object cards." },
      { level: "Medium", description: "Colour flip; use of medium object cards." },
      { level: "Difficult", description: "Mix and match variation; use of complex object cards; Colour detective." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "colour-riddles": {
    id: "colour-riddles",
    segment: "art-games",
    title: "colour friends",
    setupLine: "Choose colour friends and tools to colour.",
    howToPlay:
      "Each child picks one colour card and one tool card. They are then given an artwork along with the selected material and tool. Once the educator has set up all the material, the children can start their artwork. The game ends once the children complete the artwork using the chosen tool and colour. Once the children are familiar with the colours, the educator can introduce wild cards.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child completes an artwork using the colour and tool they picked.",
    steps: [
      "spread the colour friend cards and tool cards face down.",
      "each child picks one colour card and one tool card.",
      "hand each child their worksheet along with the matching material and tool.",
      "the children start their artwork using only the chosen colour and tool.",
      "when everyone finishes, look at the finished pieces together.",
    ],
    endsWhen: "the children complete the artwork using the chosen tool and colour.",
    easierVariation:
      "the child uses just one colour and one tool on a familiar worksheet.",
    harderVariation:
      "the child picks more than one colour and more than one tool on the same worksheet, or picks the colours, tools, and challenges for another child.",
    skillIds: ["co", "ce"],
    namedBlocks: [
      {
        title: "wild cards",
        body: "Wild Cards introduce concepts of colour schemes. Initially, the educator introduces each concept one at a time and guides children through it. As children become familiar, they can choose and apply them independently. The colour wheel can be used as a reference for this.",
      },
    ],
    educatorNote: [
      "The educator can place the colour wheel on the table for the children to observe.",
      "This gameplay doesn't depend on the worksheets — the educator can also swap in cards from other games (e.g. I Shop Texture, DIY sheets) to trace or directly work on.",
    ],
    materials: [
      "Colour Friend cards",
      "Tool cards",
      "Colour Wild cards",
      "Colour Friend worksheets",
      "Colour wheel poster — 2",
      "General art supplies (A4 paper, pencil, paint, crayons, cotton, etc.)",
    ],
    variations: [
      {
        name: "Multiple colours and tools",
        description:
          "Children pick more than one colour and more than one tool to use on the same worksheet.",
      },
      {
        name: "Children choose for each other",
        description:
          "Children pick the colours, tools, and challenges for each other instead of for themselves.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Texture / Observation ──
  "i-spot-texture": {
    id: "i-spot-texture",
    segment: "art-games",
    title: "i shop texture",
    setupLine: "Learn how to create textures in this fun shopping-for-textures game.",
    howToPlay:
      "Children learn how to create diverse textures with different materials. Each child gets a limited number of tokens. The educator decides the price of both objects and textures, written on the cards in erasable marker. Children buy objects and textures of their choice within their token budget, then create the chosen texture on the object — directly on the card using clay or erasable marker. The game ends once all the children finish the task/artwork or after a set time.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child buys an object and a texture and then creates that texture on the object.",
    steps: [
      "write a price on each object card and each texture card in erasable marker.",
      "give each child a limited number of tokens.",
      "the child spends their tokens to buy one object card and one texture card of their choice.",
      "the child creates the chosen texture on the object card using clay or erasable marker.",
      "when everyone finishes, look at each child's textured object together.",
    ],
    endsWhen: "all the children finish the task/artwork or the set time is up.",
    easierVariation:
      "the child works directly on the card with clay or erasable marker.",
    harderVariation:
      "the child recreates the textured object on an A4 sheet with more art materials, and adds a background and colour — or works against a timer.",
    skillIds: ["fm", "ce"],
    materials: [
      "Texture cards",
      "Object cards — mall, cafe, garden",
      "Tokens",
      "Erasable marker (to write prices and to draw textures)",
      "Clay (to create textures by hand)",
    ],
    variations: [
      {
        name: "Draw and add texture",
        description:
          "Instead of working directly on the card, children trace/draw the object on a paper and then add the chosen texture.",
      },
      {
        name: "Recreate",
        description:
          "Children buy a card, then recreate it on an A4 sheet and add details to the image (background, colour).",
      },
      {
        name: "Timed challenges",
        description:
          "Set a timer for the buy-and-create round to add pace.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Creative Expression ──
  "mini-artventure": {
    id: "mini-artventure",
    segment: "art-games",
    title: "mini artventure",
    setupLine: "A board game where you roll the dice, do art tasks, and move ahead — an art-task adventure for the minis.",
    howToPlay:
      "Children learn drawing, colouring, moulding, and building in a board-game task format — the more tasks they complete, the more tokens they collect. Place the game board on a play mat, shuffle and sort challenge cards by zone colour, shuffle Fortune cards into their own mini-deck, and set up material trays for each zone. Each child picks a meeple and starts at the Start space. Decide on the number of rounds (6–8 is a good range) and keep a 2-minute timer ready. On their turn, each player rolls the dice and moves forward. The space they land on tells them what to do — Green Zone — Draw, Blue Zone — Colour, Purple Zone — Mould, Yellow Zone — Build. After all players have picked a challenge card, they head to the matching zone tray and start the 2-minute timer. On successful completion, the educator hands out a reward token. After all rounds, players count their tokens — everyone is a winner, the group celebrates participation and effort. The game ends when the set number of rounds is over.",
    players: "3–8 children · 1 educator",
    duration: "25 min",
    goal: "the child rolls the dice, lands on a zone, and completes an art task from that zone.",
    steps: [
      "put the board on a play mat. sort challenge cards by zone colour and set up the material tray for each zone.",
      "each child picks a meeple and starts at the start space.",
      "on their turn, the child rolls the dice, moves forward, and picks a challenge card from the zone they land on (draw, colour, mould, or build).",
      "the child heads to the matching zone tray and completes the task before the 2-minute timer runs out. on success, they collect a reward token.",
      "after all the rounds, count the tokens together and celebrate everyone.",
    ],
    endsWhen: "the set number of rounds (6–8) is over.",
    easierVariation:
      "the educator helps the child pick a simpler challenge card from the same zone.",
    harderVariation:
      "play the team task — one player rolls and moves the meeple, and the whole group completes the designated task together.",
    skillIds: ["fm", "co", "ce"],
    materials: [
      "Game board with 4 colour-coded zones (Draw · Colour · Mould · Build) and Fortune squares",
      "Player tokens (chunky animal or shape tokens, easy to grip)",
      "Challenge cards — Draw · Colour · Mould · Build (15 each, 60 total)",
      "Fortune cards — toddler-friendly surprises (extra turn · skip · help a friend)",
      "6-sided die",
      "Reward tokens",
      "Draw zone — A5 paper, pencils, erasers, sharpeners",
      "Colour zone — wax crayons only (no pastels)",
      "Mould zone — playdough or clay, rollers, shape cutters",
      "Build zone — 2D wooden shapes (triangle, square, circle) and plastic connectors",
      "2-minute timer",
    ],
    variations: [
      {
        name: "Team task",
        description:
          "One player from each team rolls the dice and moves the meeple, and the group completes the designated task.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── Artiverse / Artistotle units ────────────────────────────
 * 12 Artiverse projects (2 sessions each = 24) + 6 Artistotle
 * illustrator projects (3 sessions each = 18) = 42 sessions.
 * Sessions 43-60 are reserved.
 */

const PLACEHOLDER = "/artiverse/placeholder.svg";
const AV = "/artiverse/art-3-5";

// Final structure — 16 artiverse sub-units (10 paper + 15 crayon + 12
// paint = 37 artworks) and 14 artistotle projects (Carle 4 + Ehlert 4
// + Gomi 6). Each sub-unit's `days` field equals its artwork count.
// IDs are stable strings (e.g. av-paper-accordion) so the session
// table can reference them clearly.
const artiverseUnits: ArtiverseUnit[] = [
  // ── Chapter 1 — Paper folding & sticking (10 artworks) ──
  {
    id: "av-paper-accordion",
    unitNumber: 1,
    medium: "Paper — Accordion folding",
    technique: "Fold paper strips back and forth to make and transform forms — building coordination, control, and spatial awareness.",
    whatChildrenMake: "Two accordion artworks: an animal body with an added face, then a creature of choice.",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Tracing", "Integrating Artistic Choices"],
    topicOptions: ["A giraffe with an accordion body", "A fish with patterned strip fins", "An accordion creature of my own"],
    heroImageUrl: `${AV}/av35-1-accordion.png`,
  },
  {
    id: "av-paper-circles",
    unitNumber: 2,
    medium: "Paper — Circles folding",
    technique: "Fold pre-cut circles into halves or flaps; stick some flat, leave some open; arrange to form objects.",
    whatChildrenMake: "Three circle-fold artworks across three sessions.",
    days: 3,
    abilitiesCovered: ["Tool Precision", "Drawing Figures and Patterns", "Integrating Artistic Choices"],
    topicOptions: ["A fishbowl with circle fish", "Ladybugs on a leaf", "A bird made of stacked circles"],
    heroImageUrl: `${AV}/av35-2-circles.png`,
    extraImages: [`${AV}/av35-2-circles-day-2.png`],
  },
  {
    id: "av-paper-mosaics",
    unitNumber: 3,
    medium: "Paper — Mosaics",
    technique: "Tear paper into more pieces and fill outline shapes — building precision, planning, and colour selection.",
    whatChildrenMake: "Two mosaic artworks filling outline sheets with pre-torn pieces.",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Names and recognises", "Explores Artistic Concepts"],
    topicOptions: ["A patchwork elephant", "A rainbow snail with a mosaic shell", "An animal of my choice in mosaic"],
    heroImageUrl: `${AV}/av35-3-mosaic.png`,
  },
  {
    id: "av-paper-loops",
    unitNumber: 4,
    medium: "Paper — Loops & chains",
    technique: "Make loops from paper strips, join them into chains, attach faces — building finger control, sequencing, and repetition.",
    whatChildrenMake: "One paper-chain artwork: a chain creature with an added face.",
    days: 1,
    abilitiesCovered: ["Tool Precision", "Names and recognises", "Explores Artistic Concepts"],
    topicOptions: ["A bunny / sheep / chick with a chain body", "A rainbow chain caterpillar", "A celebration chain in two colours"],
    heroImageUrl: `${AV}/av35-4-loops-and-chains.png`,
  },
  {
    id: "av-paper-origami",
    unitNumber: 5,
    medium: "Paper — Simple origami",
    technique: "Teach one fold at a time, assist where needed, stick the finished piece, decorate the background.",
    whatChildrenMake: "Two simple origami artworks across two sessions.",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Tracing", "Fine Motor Integration"],
    topicOptions: ["An origami animal of my choice", "A simple origami flower", "A scene with my origami creature"],
    heroImageUrl: `${AV}/av35-1-accordion.png`,
  },

  // ── Chapter 2 — Crayons (15 artworks) ──
  {
    id: "av-crayon-shapes-solid",
    unitNumber: 6,
    medium: "Crayons — Solid colours in shapes",
    technique: "Draw simple shapes; children fill them with solid colour.",
    whatChildrenMake: "Two solid-colour-shape artworks.",
    days: 2,
    abilitiesCovered: ["Tracing", "Names and recognises", "Fine Motor Integration"],
    topicOptions: ["A grid of solid-coloured shapes", "Filled circles in a row", "Solid-colour squares of my choice"],
    heroImageUrl: "/artiverse-book/crayon/solid-shapes.png",
  },
  {
    id: "av-crayon-scenery-solid",
    unitNumber: 7,
    medium: "Crayons — Solid colours in scenery",
    technique: "Draw simple scenery; children colour large areas in solid colours.",
    whatChildrenMake: "Two simple scenery artworks coloured in solid blocks.",
    days: 2,
    abilitiesCovered: ["Tracing", "Names and recognises", "Fine Motor Integration"],
    topicOptions: ["A simple field with a tree", "A house with a sky", "A road with hills"],
    heroImageUrl: "/artiverse-book/crayon/solid-scenery.png",
  },
  {
    id: "av-crayon-intricate",
    unitNumber: 8,
    medium: "Crayons — Intricate colouring",
    technique: "Draw simple detailed objects; children colour them carefully within the lines.",
    whatChildrenMake: "Two intricate-detail artworks coloured carefully.",
    days: 2,
    abilitiesCovered: ["Tracing", "Fine Motor Integration", "Integrating Artistic Choices"],
    topicOptions: ["A detailed object of my choice", "A patterned animal", "A small character with detail"],
    heroImageUrl: "/artiverse-book/crayon/intricate.png",
  },
  {
    id: "av-crayon-doodling",
    unitNumber: 9,
    medium: "Crayons — Doodling",
    technique: "Make lines, dots, and patterns with crayons; use the page for texture.",
    whatChildrenMake: "Two doodle artworks with lines, dots, and patterns.",
    days: 2,
    abilitiesCovered: ["Drawing Figures and Patterns", "Explores freely", "Explores Artistic Concepts"],
    topicOptions: ["A scribble sheep", "A wagon full of doodle creatures", "A cloud of swirly lines"],
    heroImageUrl: "/artiverse-book/crayon/doodling-1.png",
  },
  {
    id: "av-crayon-mixing-shapes",
    unitNumber: 10,
    medium: "Crayons — Colour mixing in shapes",
    technique: "Use 2 colours in one shape; overlap and observe the new colour.",
    whatChildrenMake: "Two artworks layering 2 colours inside simple shapes.",
    days: 2,
    abilitiesCovered: ["Mixes and notices", "Colour Integration", "Integrating Artistic Choices"],
    topicOptions: ["A circle of overlapping rainbows", "Two-colour stars", "Squares with mixed centres"],
    heroImageUrl: "/artiverse-book/crayon/mixing-shapes.png",
  },
  {
    id: "av-crayon-mixing-objects",
    unitNumber: 11,
    medium: "Crayons — Colour mixing in objects",
    technique: "Colour objects using blended colours so the new colour appears within the form.",
    whatChildrenMake: "Three artworks of objects coloured with blended crayons.",
    days: 3,
    abilitiesCovered: ["Mixes and notices", "Colour Integration", "Integrating Artistic Choices"],
    topicOptions: ["Mixed-colour planets", "Two hugging hearts", "A fruit with blended colour"],
    heroImageUrl: "/artiverse-book/crayon/mixing-objects.png",
  },
  {
    id: "av-crayon-mixing-scenery",
    unitNumber: 12,
    medium: "Crayons — Colour mixing in scenery",
    technique: "Create colourful backgrounds using mixed crayon strokes.",
    whatChildrenMake: "Two scenery artworks with mixed-colour backgrounds.",
    days: 2,
    abilitiesCovered: ["Mixes and notices", "Colour Integration", "Visual Arts Integration"],
    topicOptions: ["A sunset with blended colours", "A garden background", "A sea with mixed greens and blues"],
    heroImageUrl: "/artiverse-book/crayon/mixing-scenery.png",
  },

  // ── Chapter 3 — Paint (12 artworks) ──
  {
    id: "av-paint-hand",
    unitNumber: 13,
    medium: "Paint — Hand painting",
    technique: "Children dip hands in paint, press on paper, observe prints, build images from prints.",
    whatChildrenMake: "Three hand-print artworks turned into images.",
    days: 3,
    abilitiesCovered: ["Explores freely", "Names and recognises", "Emotional Expression through Art"],
    topicOptions: ["A flowerpot with handprint flowers", "A handprint hot-air balloon", "A handprint jellyfish"],
    heroImageUrl: `${AV}/av35-8-hand-printing.png`,
  },
  {
    id: "av-paint-finger",
    unitNumber: 14,
    medium: "Paint — Finger painting",
    technique: "Use fingers to make swirls, dots, and spreads. Allow free mixing on the page.",
    whatChildrenMake: "Three finger-painted artworks.",
    days: 3,
    abilitiesCovered: ["Tool Precision", "Mixes and notices", "Emotional Expression through Art"],
    topicOptions: ["Berries scattered on a leaf", "A swarm of bees in dots", "Confetti creatures"],
    heroImageUrl: `${AV}/av35-9-finger-painting.png`,
    extraImages: [`${AV}/av35-9-finger-painting-day-2.png`],
  },
  {
    id: "av-paint-sponge",
    unitNumber: 15,
    medium: "Paint — Sponge painting",
    technique: "Dip sponge lightly, dab repeatedly, create patterns or objects.",
    whatChildrenMake: "Three sponge-painted artworks.",
    days: 3,
    abilitiesCovered: ["Tool Precision", "Mixes and notices", "Integrating Artistic Choices"],
    topicOptions: ["Sponge chicks in grass", "A bunch of grapes", "A flower bouquet in sponge texture"],
    heroImageUrl: `${AV}/av35-10-sponge.png`,
    extraImages: [`${AV}/av35-10-sponge-day-2.png`],
  },
  {
    id: "av-paint-qtip",
    unitNumber: 16,
    medium: "Paint — Q-tip painting",
    technique: "Dip tip in paint, make dots and patterns, build images using dots.",
    whatChildrenMake: "Three q-tip-painted artworks.",
    days: 3,
    abilitiesCovered: ["Tool Precision", "Drawing Figures and Patterns", "Integrating Artistic Choices"],
    topicOptions: ["A daisy on a dotted sky", "A pom-pom flower", "A polka-dot fish or tree"],
    heroImageUrl: `${AV}/av35-11-qtip.png`,
  },

  // ── Artistotle illustrators (13 projects across 3 artists) ──
  // Eric Carle — collage and texture
  {
    id: "atl-carle-stripes",
    unitNumber: 17,
    medium: "Eric Carle — Stripes collage",
    technique: "Children arrange paper strips, overlap freely, stick after arranging.",
    whatChildrenMake: "A stripes collage built from layered paper strips.",
    days: 1,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A rainbow stripes scene", "A striped landscape", "A striped creature of my own"],
    heroImageUrl: "/artistotle-book/carle-project-1-stripes.png",
  },
  {
    id: "atl-carle-caterpillar",
    unitNumber: 18,
    medium: "Eric Carle — Caterpillar collage (round shape)",
    technique: "Arrange circles in a line, stick, add details — single medium, round shape.",
    whatChildrenMake: "A textured-paper caterpillar over two sessions.",
    days: 2,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["The caterpillar from the book", "A round-shape creature of my own", "A line of circle creatures"],
    heroImageUrl: "/artistotle-book/carle-project-2-caterpillar.png",
  },
  {
    id: "atl-carle-fruit-veg",
    unitNumber: 19,
    medium: "Eric Carle — Fruit & vegetable collage (irregular shape)",
    technique: "Tear paper, arrange into shapes, stick freely — single medium, irregular shape.",
    whatChildrenMake: "A torn-paper fruit or vegetable collage.",
    days: 1,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A torn-paper fruit", "A torn-paper vegetable", "A bowl of mixed fruit / veg"],
    heroImageUrl: "/artistotle-book/carle-project-3-fruit-veg.png",
  },
  {
    id: "atl-carle-jellyfish",
    unitNumber: 20,
    medium: "Eric Carle — Jellyfish collage (multi-medium, multi-shape)",
    technique: "Use a circle for the head, add strips for tentacles, layer materials — multi-medium and multi-shape.",
    whatChildrenMake: "A layered jellyfish collage built across two sessions.",
    days: 2,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A jellyfish from the book", "An underwater scene with jellyfish", "A jellyfish creature of my own"],
    heroImageUrl: "/artistotle-book/carle-project-4-jellyfish.png",
  },
  // Lois Ehlert — bold colour and layering
  {
    id: "atl-ehlert-sponge",
    unitNumber: 21,
    medium: "Lois Ehlert — Sponge dabbling flowers",
    technique: "Dab sponge, repeat for petals — building a flower from sponge marks.",
    whatChildrenMake: "A sponge-dabbed flower artwork.",
    days: 1,
    abilitiesCovered: ["Integrating Artistic Choices", "Mixes and notices", "Visual Arts Integration"],
    topicOptions: ["A sponge daisy", "A sponge sunflower", "A sponge flower bouquet"],
    heroImageUrl: "/artistotle-book/ehlert-project-1.png",
  },
  {
    id: "atl-ehlert-brush",
    unitNumber: 22,
    medium: "Lois Ehlert — Brush flowers",
    technique: "Use brush strokes to create simple flowers.",
    whatChildrenMake: "A flower artwork made with paintbrush strokes.",
    days: 1,
    abilitiesCovered: ["Integrating Artistic Choices", "Colour Integration", "Visual Arts Integration"],
    topicOptions: ["A simple painted flower", "A row of brush flowers", "A flower with leaves and stem"],
    heroImageUrl: "/artistotle-book/ehlert-project-2.png",
  },
  {
    id: "atl-ehlert-swirling",
    unitNumber: 23,
    medium: "Lois Ehlert — Swirling flowers",
    technique: "Move the brush in circles to create loose, swirling flower shapes.",
    whatChildrenMake: "A swirling-flower artwork built across two sessions.",
    days: 2,
    abilitiesCovered: ["Integrating Artistic Choices", "Colour Integration", "Visual Arts Integration"],
    topicOptions: ["A loose swirling flower", "A field of swirly flowers", "A swirling sky with flowers"],
    heroImageUrl: "/artistotle-book/ehlert-project-3.png",
  },
  {
    id: "atl-ehlert-garden",
    unitNumber: 24,
    medium: "Lois Ehlert — Two-layer flower garden",
    technique: "Paint a background first, then add flowers on top — building depth in two layers.",
    whatChildrenMake: "A two-layer flower garden over two sessions.",
    days: 2,
    abilitiesCovered: ["Integrating Artistic Choices", "Colour Integration", "Visual Arts Integration"],
    topicOptions: ["A garden of mixed flowers", "A sunset with flowers in front", "A flower field with sky behind"],
    heroImageUrl: "/artistotle-book/ehlert-project-4.png",
  },
  // Taro Gomi — playful drawing and expression
  {
    id: "atl-gomi-colour-1",
    unitNumber: 25,
    medium: "Taro Gomi — Simple colouring",
    technique: "Colour the animal outline; add fun details and backgrounds.",
    whatChildrenMake: "Two simple-colouring worksheets — bear and tiger — coloured with playful details and a background.",
    days: 2,
    abilitiesCovered: ["Explores freely", "Names and recognises", "Emotional Expression through Art"],
    topicOptions: ["A bear with a hat and a forest", "A tiger in tall grass", "An animal of my choice with surroundings"],
    heroImageUrl: "/artistotle-book/gomi-colour-1-bear.png",
  },
  {
    id: "atl-gomi-lines-1",
    unitNumber: 26,
    medium: "Taro Gomi — Line making 1",
    technique: "Fill the umbrella worksheet with line patterns — dots, dashes, zigzags, waves.",
    whatChildrenMake: "An umbrella worksheet filled with line-pattern textures.",
    days: 2,
    abilitiesCovered: ["Drawing Figures and Patterns", "Tracing", "Visual Arts Integration"],
    topicOptions: ["An umbrella filled with line patterns", "Patterned umbrellas in the rain", "Umbrella worksheets with my own patterns"],
    heroImageUrl: "/artistotle-book/gomi-lines-1-umbrella-girl.png",
  },
  {
    id: "atl-gomi-lines-2",
    unitNumber: 27,
    medium: "Taro Gomi — Add filling inside burger through lines",
    technique: "Each layer of the burger gets a different line pattern.",
    whatChildrenMake: "A burger worksheet with each layer filled by a different line pattern.",
    days: 2,
    abilitiesCovered: ["Drawing Figures and Patterns", "Tracing", "Visual Arts Integration"],
    topicOptions: ["A burger with bun, lettuce, cheese, patty", "A burger with my own layers", "A double burger with extra patterns"],
    heroImageUrl: "/artistotle-book/gomi-lines-2-burger.png",
  },
  {
    id: "atl-gomi-draw-1",
    unitNumber: 28,
    medium: "Taro Gomi — Draw & colour 1",
    technique: "Colour the character; add a background world around them.",
    whatChildrenMake: "A character with a background scene — day 1.",
    days: 1,
    abilitiesCovered: ["Drawing Figures and Patterns", "Names and recognises", "Integrating Artistic Choices"],
    topicOptions: ["A character with bubbles", "A character with a sky", "A character with surroundings of my choice"],
    heroImageUrl: "/artistotle-book/gomi-draw-1-lady.png",
  },
  {
    id: "atl-gomi-draw-2",
    unitNumber: 29,
    medium: "Taro Gomi — Draw & colour 2",
    technique: "Colour the character; build a fuller world with extra elements.",
    whatChildrenMake: "A character with a fuller scene — day 2.",
    days: 2,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["An astronaut in space", "A character on a journey", "A scene I imagine"],
    heroImageUrl: "/artistotle-book/gomi-draw-2-astronaut.png",
  },
];

/* ─── Session Table — 60 sessions ────────────────────────────
 * Art Gym alternates Book ↔ Scribble. Book 1 for S1-25, Book 2 for S26+.
 * ArtGames cycle through 8 games (FM × 4, Colour × 3, CE × 1).
 * Artiverse / Artistotle alternate as long blocks; 42 sessions covered;
 * S43-60 reserved.
 */

const ART_GAMES_CYCLE = [
  "shape-stitch-3-5",
  "mix-it-up",
  "colour-riddles",
  "shape-art",
  "i-spot-texture",
  "imagine-that-3-5",
  "mini-artventure",
];

function gameForSession(n: number): string {
  return ART_GAMES_CYCLE[(n - 1) % ART_GAMES_CYCLE.length];
}

function gymForSession(n: number): string {
  // Alternate book day ↔ scribble book day. The art gym book switches from
  // book-1 to book-2 once book-1 is finished — the rule of thumb is around
  // session 30 (15 book days × 2 pages each).
  const isBookDay = n % 2 === 1;
  if (isBookDay) return n <= 30 ? "ag-book-1" : "ag-book-2";
  return "scribble-book";
}

/**
 * Plan for sessions 1-58 — alternating artiverse chapters with
 * artistotle artists, in the order the books and the spec lay out.
 *
 *   S1-10   · paper (chapter 1)         — 10 artworks
 *   S11-16  · eric carle (artist 1)     — 4 projects, 6 sessions
 *   S17-31  · crayons (chapter 2)        — 15 artworks
 *   S32-37  · lois ehlert (artist 2)    — 4 projects, 6 sessions
 *   S38-49  · paint (chapter 3)          — 12 artworks
 *   S50-58  · taro gomi (artist 3)      — 5 projects, 9 sessions
 *   S59-60  · buffer / no artiverse-artistotle assignment yet
 */
const planned: Array<{ unitId: string; day: number; name: string }> = [
  // ── Paper (10 days) ──
  { unitId: "av-paper-accordion", day: 1, name: "Paper — Accordion" },
  { unitId: "av-paper-accordion", day: 2, name: "Paper — Accordion" },
  { unitId: "av-paper-circles", day: 1, name: "Paper — Circles" },
  { unitId: "av-paper-circles", day: 2, name: "Paper — Circles" },
  { unitId: "av-paper-circles", day: 3, name: "Paper — Circles" },
  { unitId: "av-paper-mosaics", day: 1, name: "Paper — Mosaics" },
  { unitId: "av-paper-mosaics", day: 2, name: "Paper — Mosaics" },
  { unitId: "av-paper-loops", day: 1, name: "Paper — Loops & chains" },
  { unitId: "av-paper-origami", day: 1, name: "Paper — Simple origami" },
  { unitId: "av-paper-origami", day: 2, name: "Paper — Simple origami" },
  // ── Eric Carle (6 days) ──
  { unitId: "atl-carle-stripes", day: 1, name: "Eric Carle — Stripes collage" },
  { unitId: "atl-carle-caterpillar", day: 1, name: "Eric Carle — Caterpillar collage" },
  { unitId: "atl-carle-caterpillar", day: 2, name: "Eric Carle — Caterpillar collage" },
  { unitId: "atl-carle-fruit-veg", day: 1, name: "Eric Carle — Fruit & vegetable collage" },
  { unitId: "atl-carle-jellyfish", day: 1, name: "Eric Carle — Jellyfish collage" },
  { unitId: "atl-carle-jellyfish", day: 2, name: "Eric Carle — Jellyfish collage" },
  // ── Crayons (15 days) ──
  { unitId: "av-crayon-shapes-solid", day: 1, name: "Crayons — Solid in shapes" },
  { unitId: "av-crayon-shapes-solid", day: 2, name: "Crayons — Solid in shapes" },
  { unitId: "av-crayon-scenery-solid", day: 1, name: "Crayons — Solid in scenery" },
  { unitId: "av-crayon-scenery-solid", day: 2, name: "Crayons — Solid in scenery" },
  { unitId: "av-crayon-intricate", day: 1, name: "Crayons — Intricate" },
  { unitId: "av-crayon-intricate", day: 2, name: "Crayons — Intricate" },
  { unitId: "av-crayon-doodling", day: 1, name: "Crayons — Doodling" },
  { unitId: "av-crayon-doodling", day: 2, name: "Crayons — Doodling" },
  { unitId: "av-crayon-mixing-shapes", day: 1, name: "Crayons — Mixing in shapes" },
  { unitId: "av-crayon-mixing-shapes", day: 2, name: "Crayons — Mixing in shapes" },
  { unitId: "av-crayon-mixing-objects", day: 1, name: "Crayons — Mixing in objects" },
  { unitId: "av-crayon-mixing-objects", day: 2, name: "Crayons — Mixing in objects" },
  { unitId: "av-crayon-mixing-objects", day: 3, name: "Crayons — Mixing in objects" },
  { unitId: "av-crayon-mixing-scenery", day: 1, name: "Crayons — Mixing in scenery" },
  { unitId: "av-crayon-mixing-scenery", day: 2, name: "Crayons — Mixing in scenery" },
  // ── Lois Ehlert (6 days) ──
  { unitId: "atl-ehlert-sponge", day: 1, name: "Lois Ehlert — Sponge dabbling flowers" },
  { unitId: "atl-ehlert-brush", day: 1, name: "Lois Ehlert — Brush flowers" },
  { unitId: "atl-ehlert-swirling", day: 1, name: "Lois Ehlert — Swirling flowers" },
  { unitId: "atl-ehlert-swirling", day: 2, name: "Lois Ehlert — Swirling flowers" },
  { unitId: "atl-ehlert-garden", day: 1, name: "Lois Ehlert — Two-layer garden" },
  { unitId: "atl-ehlert-garden", day: 2, name: "Lois Ehlert — Two-layer garden" },
  // ── Paint (12 days) ──
  { unitId: "av-paint-hand", day: 1, name: "Paint — Hand painting" },
  { unitId: "av-paint-hand", day: 2, name: "Paint — Hand painting" },
  { unitId: "av-paint-hand", day: 3, name: "Paint — Hand painting" },
  { unitId: "av-paint-finger", day: 1, name: "Paint — Finger painting" },
  { unitId: "av-paint-finger", day: 2, name: "Paint — Finger painting" },
  { unitId: "av-paint-finger", day: 3, name: "Paint — Finger painting" },
  { unitId: "av-paint-sponge", day: 1, name: "Paint — Sponge painting" },
  { unitId: "av-paint-sponge", day: 2, name: "Paint — Sponge painting" },
  { unitId: "av-paint-sponge", day: 3, name: "Paint — Sponge painting" },
  { unitId: "av-paint-qtip", day: 1, name: "Paint — Q-tip painting" },
  { unitId: "av-paint-qtip", day: 2, name: "Paint — Q-tip painting" },
  { unitId: "av-paint-qtip", day: 3, name: "Paint — Q-tip painting" },
  // ── Taro Gomi (9 days) ──
  { unitId: "atl-gomi-colour-1", day: 1, name: "Taro Gomi — Simple colouring (bear)" },
  { unitId: "atl-gomi-colour-1", day: 2, name: "Taro Gomi — Simple colouring (tiger)" },
  { unitId: "atl-gomi-lines-1", day: 1, name: "Taro Gomi — Line making 1" },
  { unitId: "atl-gomi-lines-1", day: 2, name: "Taro Gomi — Line making 1" },
  { unitId: "atl-gomi-lines-2", day: 1, name: "Taro Gomi — Line making 2" },
  { unitId: "atl-gomi-lines-2", day: 2, name: "Taro Gomi — Line making 2" },
  { unitId: "atl-gomi-draw-1", day: 1, name: "Taro Gomi — Draw & colour 1" },
  { unitId: "atl-gomi-draw-2", day: 1, name: "Taro Gomi — Draw & colour 2" },
  { unitId: "atl-gomi-draw-2", day: 2, name: "Taro Gomi — Draw & colour 2" },
];

const sessionTable: CurriculumSessionEntry[] = Array.from({ length: 60 }, (_, i) => {
  const sessionNumber = i + 1;
  const slot = planned[i];
  // Read the unit number directly from the artiverseUnits source — the
  // earlier shortcut that stripped non-digits from the slot id ("av35-1")
  // was producing "351" instead of 1.
  const unit = slot
    ? artiverseUnits.find((u) => u.id === slot.unitId)
    : undefined;
  return {
    sessionNumber,
    artGym: gymForSession(sessionNumber),
    artGames: gameForSession(sessionNumber),
    artiverse: slot?.unitId,
    artiverseUnit: unit?.unitNumber,
    artiverseDay: slot?.day,
    artiverseUnitName: slot?.name ?? "to be planned (S43–60 reserved)",
    topicLayer: 0,
    isCheckpoint: [8, 16, 24, 32, 40].includes(sessionNumber),
  };
});

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 16,
    descriptors: [
      {
        skillArea: "Fine Motor",
        beginning: "Tool grip emerging. Marks made but not yet directed.",
        developing: "Tracing visible. Marks beginning to represent things.",
        secure: "Adjusts tool, pressure, direction during making.",
      },
      {
        skillArea: "Colour",
        beginning: "Uses any colour, anywhere.",
        developing: "Names colours correctly in art and in books.",
        secure: "Mixes and notices new colours that emerge.",
      },
      {
        skillArea: "Creative Expression",
        beginning: "Makes marks freely, without specific intent.",
        developing: "Pattern and repetition emerging without prompting.",
        secure: "Selects tool / colour / technique on purpose.",
      },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      {
        skillArea: "Fine Motor",
        beginning: "Tracing improving but figure-drawing still emerging.",
        developing: "Recognisable drawings; pattern repeats deliberately.",
        secure: "Fine motor integration ★ — adjusts mid-stroke for the result they want.",
      },
      {
        skillArea: "Colour",
        beginning: "Names confidently.",
        developing: "Mixes deliberately; notices the new colour.",
        secure: "Colour integration ★ — reaches for a specific colour to match a subject or effect.",
      },
      {
        skillArea: "Creative Expression",
        beginning: "Repetition and pattern visible spontaneously.",
        developing: "Shows action or moment from a shared experience.",
        secure: "Visual arts integration ★ — represents a character or moment intentionally.",
      },
    ],
  },
];

/* ─── Programme export ────────────────────────────────────── */

export const artDesign35: CurriculumProgramme = {
  id: "art-design-3-5",
  slug: "art-design-3-5",
  title: "art",
  category: "art",
  heroImageUrl: "/prog-art-3-5.gif",
  ageGroup: "3-5",
  ageLabel: "ages 3–5",
  tagline:
    "build fine motor control, colour awareness, and the ability to express visually.",
  description:
    "Art & design at Openhouse is built to help children develop two essential skills at this age — fine motor control and creative expression — through curated artworks, the right mediums and techniques, and play-based exploration that feels personal and meaningful.",
  totalSessions: 60,
  skillAreas: [
    {
      id: "fm",
      name: "Fine Motor",
      shortName: "FM",
      abilities: [
        {
          name: "Tool Precision",
          description:
            "Picks up and places small objects accurately using fingers, tweezers, or tongs — beads, sequins, tiles, small paper pieces.",
        },
        {
          name: "Tracing",
          description:
            "Follows a line, shape, or path with a tool — stays close to the guide, adjusts when drifting.",
        },
        {
          name: "Drawing Figures and Patterns",
          description:
            "Makes marks that represent something (a circle for a face, lines for legs), or repeats a mark or shape deliberately across the page.",
        },
        {
          name: "Fine Motor Integration",
          description:
            "Uses a tool to create a recognisable drawing or pattern — adjusts grip, pressure, or direction during making to get the result they want.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "co",
      name: "Colour",
      shortName: "CO",
      abilities: [
        {
          name: "Explores freely",
          description:
            "Uses colour without plan — any colour, anywhere, in any combination.",
        },
        {
          name: "Names and recognises",
          description:
            "Names colours correctly in art materials, in the room, and in books.",
        },
        {
          name: "Mixes and notices",
          description:
            "Puts two colours together and sees what happens — points to or names the new colour.",
        },
        {
          name: "Colour Integration",
          description:
            "Reaches for a specific colour deliberately — uses it consistently to match a subject or effect rather than using whatever is nearest.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "ce",
      name: "Creative Expression",
      shortName: "CE",
      abilities: [
        {
          name: "Explores Artistic Concepts",
          description:
            "Creates artwork using repetition, pattern, or symmetry spontaneously — without being instructed to.",
        },
        {
          name: "Emotional Expression through Art",
          description:
            "Creates artwork that shows an action, interaction, or moment from a shared session experience.",
        },
        {
          name: "Integrating Artistic Choices",
          description:
            "Selects a specific tool, colour, or technique on purpose to create the artwork they have in mind.",
        },
        {
          name: "Visual Arts Integration",
          description:
            "Uses tools and techniques intentionally to represent a character, moment, or experience from a shared experience — and indicates what it shows when asked.",
          isNorthStar: true,
        },
      ],
    },
  ],
  segmentDefinitions: [
    {
      id: "art-gym",
      name: "Art Gym",
      durationRange: "15 min",
      objective:
        "A daily warm-up that builds fine motor control and creative confidence through short, focused mark-making. Children work through the art gym and scribble books on alternate days, choosing their own materials each time. The focus is on preparing the hands and mind for making, not on correctness.",
      type: "rotating",
      rotationPool: ["ag-book-1", "ag-book-2", "scribble-book"],
    },
    {
      id: "art-games",
      name: "Art Games",
      durationRange: "25 min",
      objective:
        "One structured game that builds a specific art skill through play. All children engage at the same time, using clear rules that stay consistent across sessions. The focus is on practising a skill through repetition without direct teaching.",
      type: "rotating",
      rotationPool: Object.keys(artGamesActivities),
    },
    {
      id: "artiverse",
      name: "Artiverse / Artistotle",
      durationRange: "35 min",
      objective:
        "The core making segment where children build all three skills through sustained work. Artiverse focuses on free, choice-based making across materials and techniques, while Artistotle introduces the work of illustrators and invites children to create in that spirit. The two modes rotate, giving both freedom and depth.",
      type: "fixed",
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "Coming soon — a record of the child's learning and an opportunity for the educator to debrief and plan how to help the child. Also used for communication to parents.",
      type: "fixed",
    },
    {
      id: "art-care",
      name: "Art Care",
      durationRange: "5 min",
      objective:
        "Children take responsibility for materials and the shared space by putting everything back in place. The focus is on building care, independence, and respect for tools through consistent practice.",
      type: "fixed",
    },
  ],
  sessionTable,
  activities: { ...artGamesActivities },
  checkpoints,
  artiverseUnits,
};
