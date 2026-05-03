import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  ArtiverseUnit,
} from "@/content/types";

/* ─── Art Games (3-5) ────────────────────────────────────────
 * 8 games — 4 Fine Motor, 3 Colour, 1 Creative Expression.
 * Rules are explained once; teacher sets up, steps back, observes.
 */

const artGamesActivities: Record<string, CurriculumActivity> = {
  // ── Fine Motor ──
  "shape-stitch-3-5": {
    id: "shape-stitch-3-5",
    segment: "art-games",
    title: "shape stitch",
    setupLine: "Pick a template. Sew around it or across it.",
    howToPlay:
      "Each child is an individual player. Set up bins of templates — geometric shapes, objects, and characters. Give each child a sewing base and a shoelace. The teacher gives a verbal prompt that names the stitch (whip stitch, running stitch, back stitch, chain stitch, double stitch, or a pattern). The child sews accordingly.",
    materials: [
      "Stitching bases (geometric shapes · objects · characters)",
      "Shoelaces with a stiff tip",
      "Stitch reference card (running · whip · back · chain · double · pattern)",
    ],
    difficultyLevels: [
      {
        level: "Easy — geometric shapes (sew around the border)",
        description:
          "Prompt: \"Let's use whip stitch around the shape.\" The child sews neatly around the border using a whip stitch (over the edge in a loop) or a running stitch (in–out, like a dashed line).",
      },
      {
        level: "Medium — objects (sew across the base)",
        description:
          "Prompt: \"Let's use back stitch across the object.\" The child sews across the base using a back stitch or a chain stitch. Older children can use double stitch (the same hole stitched twice for strength) or build a small pattern using more than one stitch.",
      },
      {
        level: "Hard — story + riddle hunt",
        description:
          "The teacher tells a story with lost characters (animals, objects, shapes) and reads riddle clues. Examples: \"I'm red and round, with seeds all around. I'm sweet and hiding on the softest ground\" → strawberry. \"I help you reach the sky, tall and thin am I\" → giraffe. The child finds the right base and stitches the character together using the stitch the teacher names.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "stitch-me": {
    id: "stitch-me",
    segment: "art-games",
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
  "magna-tiles": {
    id: "magna-tiles",
    segment: "art-games",
    title: "magna tiles",
    setupLine: "Pick a card. Count your tiles. Build the shape.",
    howToPlay:
      "Place the Magna-Tiles in the middle and the prompt deck for the day next to them. The child picks a card. The card shows what to build, the colours to use, and how many tiles to use. The child counts out the tiles and builds — flat on the floor for the early levels, upward for the 3D level. Open-ended cards set a goal or a tile limit but no picture; the child builds whatever they like and shows it to the group.",
    materials: [
      "Magna-Tiles (variety of shapes and colours)",
      "Level 1 flashcards — 2D flat shapes + number of tiles",
      "Level 2 flashcards — 2D double-layered prompts + number of tiles",
      "Level 3 flashcards — 3D shaped prompts + number of tiles",
      "Level 4 flashcards — outlined borders + number of tiles",
      "Level 5 flashcards — open-ended prompts",
    ],
    difficultyLevels: [
      {
        level: "Level 1 — Match & Build (2D single layer)",
        description:
          "Card shows a flat shape (house, rocket, fish) with the colours and tile count. Count the tiles. Build the shape flat on the floor.",
      },
      {
        level: "Level 2 — Stack & Copy (2D double layer)",
        description:
          "Card shows a layered image — bottom and top. Build the bottom layer first, then add the top. Use the given number of tiles.",
      },
      {
        level: "Level 3 — Fill the Frame (border + tile count)",
        description:
          "Card shows only the outline of a shape and a tile count. Place the card on the floor. Fill the outline using exactly that many tiles.",
      },
      {
        level: "Level 4 — Build It Tall (3D structures)",
        description:
          "Card shows a simple 3D build — a tower, a bridge, a cube house. Build it standing up. The teacher supports balance if needed.",
      },
      {
        level: "Level 5 — Creative Builders (open-ended)",
        description:
          "Card sets a goal or a tile limit but no picture. Build freely. Describe the build to the group.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "shape-art": {
    id: "shape-art",
    segment: "art-games",
    title: "shape art",
    setupLine:
      "Pick a cue card. Find the right foam shapes from the central tray. Recreate the object in 2 minutes.",
    howToPlay:
      "Each child picks a cue card based on their difficulty level. All foam (or paper) shape pieces are mixed in a central tray — children search and select the ones they need. Using the cue card as a guide, they assemble the shapes on a flat surface to recreate the object on the card. Each round runs for 2 minutes. After the timer, a teacher or peer reviews the build and players rotate cards or roles.",
    variations: [
      {
        name: "Individual play",
        description:
          "Each child works solo with their own cue card and assembles their object using shapes from the central tray.",
      },
      {
        name: "Group play",
        description:
          "Children split into teams. One player draws the card, the team gathers shapes and builds the object together. Teams rotate the card-drawer each round, or run it as a relay.",
      },
    ],
    materials: [
      "Foam (or paper) shape pieces in mixed colours and forms",
      "Cue card decks — Easy, Medium, Hard",
      "Central tray for the shape pile",
      "Timer (2 minutes per round)",
      "Flat building surface (table or floor mat)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Cue card shows the object (e.g. a house) with the exact shapes and colours needed, illustrated next to the object." },
      { level: "Medium", description: "Cue card shows the object name and a simple icon (e.g. 🐸, 🚗) but no shape hints — the child interprets how to build it." },
      { level: "Hard", description: "Cue card lists shapes and quantities only (e.g. \"Make an OWL: 2 circles, 1 triangle, 1 oval\") — the child visualises and constructs without a picture." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "imagine-that-3-5": {
    id: "imagine-that-3-5",
    segment: "art-games",
    title: "imagine that",
    setupLine:
      "One child describes a card image without naming it. The others draw what they hear.",
    howToPlay:
      "One child is the describer. They pick a card from the deck — animals or objects — and describe it without naming the subject. The other children draw what they hear. After everyone is done, the describer picks the drawing that best matches what they had in mind. Variation — the child invents an imaginary subject and describes it while drawing simultaneously (e.g. a whale with the body of a horse).",
    materials: [
      "Physical card decks — Animals and Objects",
      "Drawing paper",
      "Colour pencils or markers",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Easy cards — the guessing audience can ask the describer 2 questions." },
      { level: "Medium", description: "Easy cards — no questions allowed." },
      { level: "Hard", description: "Difficult cards — no clues allowed." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Colour ──
  "mix-it-up": {
    id: "mix-it-up",
    segment: "art-games",
    title: "mix it up",
    setupLine: "Match colours. Compare colours. Predict colours.",
    howToPlay:
      "A colour learning card game. Players match, compare, and predict colours using simple cards, complex cards, and outline cards. The teacher picks one variation per round. Lay out the cards needed for that variation and play.",
    materials: [
      "24 colour cards (12 colours × 2 copies each)",
      "48 simple object cards",
      "3 operator cards (+, =, ?)",
      "18 complex object cards",
      "20 outline cards",
    ],
    variations: [
      {
        name: "Variation 1 — Colour memory",
        description:
          "Shuffle all 24 colour cards and place them face-down. Players take turns flipping two cards. If the colours match, keep the pair. The player with the most pairs wins.",
      },
      {
        name: "Variation 2 — Colour match",
        description:
          "Lay all 12 colour cards in a row. Shuffle the simple object cards and deal an equal number to every child. Each child places their object cards above the matching colour card, or picks the colour cards that match each of their objects.",
      },
      {
        name: "Variation 3 — Predict the object",
        description:
          "Place one outline object card face-up. Children look at it and pick the colour cards they think match. Turn over the matching coloured object card to confirm. There are no wrong answers — the teacher asks: \"Why did you choose that colour?\"",
      },
      {
        name: "Variation 4 — Predict the mix",
        description:
          "The teacher builds an equation with the cards — for example: red card + plus card + yellow card + equals card + question mark card. Children predict which colour card answers it. Confirm by pointing to orange objects from the simple object set.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "colour-riddles": {
    id: "colour-riddles",
    segment: "art-games",
    title: "ryb riddles",
    setupLine: "Teacher picks a riddle card. Children respond in their sketchbooks.",
    howToPlay:
      "A colour exploration card game. The teacher picks one riddle card for the day and reads the prompt aloud. The children respond to the prompt in their sketchbooks in their own way, using whichever art material the teacher has chosen for the session.",
    materials: [
      "15 riddle cards",
      "Sketchbooks",
      "Art materials of choice (water paints · oil pastels · yarn + glue · paper)",
    ],
    variations: [
      {
        name: "Individual",
        description:
          "Every child works independently on the same prompt for the whole class.",
      },
      {
        name: "Pairs",
        description:
          "The class is divided into pairs. Both children in a pair work on the same card together.",
      },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Texture / Observation ──
  "i-spot-texture": {
    id: "i-spot-texture",
    segment: "art-games",
    title: "i spot texture",
    setupLine: "Choose a texture. Choose an object. Replicate the texture on the object.",
    howToPlay:
      "A texture art game. Spread out the three object decks (18 cards in total) and the six texture tiles. The child or pair picks a texture and an object, and replicates the chosen texture on the object card using whichever art material the teacher has put out — crayons, paint, playdough, fingers, or sand.",
    materials: [
      "18 object cards (3 decks of 6)",
      "6 texture tiles",
      "Art materials (crayons · paint · playdough · fingers · sand)",
    ],
    variations: [
      {
        name: "Variation 1 — Choice & single card",
        description:
          "Each child picks one texture and one object of their choice and replicates the texture on the object card.",
      },
      {
        name: "Variation 2 — Assigned & multi-card",
        description:
          "The teacher (or a peer) assigns objects and textures. Each child works through several object cards using the assigned textures.",
      },
      {
        name: "Variation 3 — Set up shop",
        description:
          "Children split into groups. Each team is assigned its textures by the other team and chooses its own object deck. Both teams build a shop of textured objects.",
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
    setupLine: "Roll the dice. Move your token. Make what your zone asks for.",
    howToPlay:
      "Place the game board on a play mat. Sort the 60 challenge cards into the four zone decks — 15 Draw, 15 Colour, 15 Mould, 15 Build. Shuffle the 10 fortune cards into their own deck. Set up the four zone trays with their materials. Each child picks a token and starts at the Start space. On a turn, the child rolls the dice and moves forward. The space they land on tells them what to do — Draw (green), Colour (blue), Mould (purple), Build (yellow), or Fortune (a special square that triggers a fortune card like \"take an extra turn\" or \"help a friend finish their drawing\"). After all players have picked a challenge card, they go to the matching zone tray and start the 2-minute timer. On successful completion, the teacher hands out a star token. After all rounds are done, everyone counts their star tokens and the group celebrates together.",
    materials: [
      "Game board with 4 colour-coded art zones (Draw · Colour · Mould · Build) and Fortune squares",
      "Player tokens (chunky animal or shape tokens, easy to grip)",
      "60 challenge cards — 15 Draw · 15 Colour · 15 Mould · 15 Build",
      "10 Fortune cards (toddler-friendly surprises — extra turn, skip, help a friend)",
      "6-sided die",
      "Star reward tokens",
      "Draw zone — A5 paper, pencils, erasers, sharpeners",
      "Colour zone — wax crayons only (no pastels)",
      "Mould zone — playdough or clay, rollers, shape cutters",
      "Build zone — 2D wooden shapes (triangle, square, circle) and plastic connectors (flat builds only)",
      "2-minute timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "6 rounds · 2-minute timer · simpler prompts." },
      { level: "Medium", description: "8 rounds · 2-minute timer · all four zones." },
      { level: "Hard", description: "8 rounds · 90-second timer · all four zones." },
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

const artiverseUnits: ArtiverseUnit[] = [
  // ── Colourful Papers ──
  {
    id: "av35-1",
    unitNumber: 1,
    medium: "Colourful Papers — Accordions",
    technique: "Accordion folding · zig-zag folds that create texture and movement; combining strips and shapes into figures",
    whatChildrenMake: "Accordion-fold giraffes with patterned legs · accordion fish with rainbow fins",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Tracing", "Integrating Artistic Choices"],
    topicOptions: ["A pair of giraffes with accordion bodies", "A school of fish with patterned strip fins", "An accordion creature of my own"],
    heroImageUrl: `${AV}/av35-1-accordion.png`,
  },
  {
    id: "av35-2",
    unitNumber: 2,
    medium: "Colourful Papers — Circles",
    technique: "Cutting and arranging circles · combining circles of different sizes into recognisable subjects",
    whatChildrenMake: "Day 1: a fishbowl with circle fish, water and pebbles · ladybugs on a leaf. Day 2: more ladybugs · a stork or swan made of circles",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Drawing Figures and Patterns", "Integrating Artistic Choices"],
    topicOptions: ["A fishbowl with three circle fish", "Ladybugs on a green leaf", "A bird made of stacked circles"],
    heroImageUrl: `${AV}/av35-2-circles.png`,
    extraImages: [`${AV}/av35-2-circles-day-2.png`],
  },
  {
    id: "av35-3",
    unitNumber: 3,
    medium: "Colourful Papers — Mosaics",
    technique: "Cutting and arranging small coloured squares · filling a shape with a patchwork pattern",
    whatChildrenMake: "Elmer the patchwork elephant · a rainbow mosaic snail",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Names and recognises", "Explores Artistic Concepts"],
    topicOptions: ["Elmer the patchwork elephant", "A rainbow snail with a mosaic shell", "An animal of my choice in mosaic"],
    heroImageUrl: `${AV}/av35-3-mosaic.png`,
  },
  {
    id: "av35-4",
    unitNumber: 4,
    medium: "Colourful Papers — Loops and Chains",
    technique: "Cutting strips and looping into paper chains · combining chain bodies with cut-paper heads and feet",
    whatChildrenMake: "A bunny, sheep, and chick with paper-chain bodies · rainbow chain caterpillars with smiling faces",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Names and recognises", "Explores Artistic Concepts"],
    topicOptions: ["A bunny / sheep / chick figure with a chain body", "A rainbow caterpillar made of chain links", "A celebration chain in two colours"],
    heroImageUrl: `${AV}/av35-4-loops-and-chains.png`,
  },

  // ── Crayons ──
  {
    id: "av35-5",
    unitNumber: 5,
    medium: "Crayons — Doodling",
    technique: "Loopy free mark-making · circular scribbles that fill a shape and turn into a body or texture",
    whatChildrenMake: "A flock of scribble sheep in different colours · a stick-figure pulling a wagon piled with doodled creatures and a swirling cloud",
    days: 2,
    abilitiesCovered: ["Drawing Figures and Patterns", "Explores freely", "Explores Artistic Concepts"],
    topicOptions: ["A scribble sheep in my favourite colour", "A wagon full of doodle creatures", "A cloud made of swirly lines"],
    heroImageUrl: `${AV}/av35-5-doodling.png`,
  },
  {
    id: "av35-6",
    unitNumber: 6,
    medium: "Crayons — Colouring",
    technique: "Pop-art colour blocking · colouring inside lines with bold contrasting colour fields",
    whatChildrenMake: "A four-square pop-art cat · colourful spiral snails · a hungry one-eyed monster",
    days: 2,
    abilitiesCovered: ["Tracing", "Names and recognises", "Fine Motor Integration"],
    topicOptions: ["A pop-art cat split into colour blocks", "A row of colourful snails", "A friendly monster of my own"],
    heroImageUrl: `${AV}/av35-6-colouring.png`,
  },
  {
    id: "av35-7",
    unitNumber: 7,
    medium: "Crayons — Colour Mixing",
    technique: "Layering crayons to make new colours · blending strokes for soft transitions",
    whatChildrenMake: "A sky of overlapping rainbows · mixed-colour planets and stars · two hugging hearts",
    days: 2,
    abilitiesCovered: ["Mixes and notices", "Colour Integration", "Integrating Artistic Choices"],
    topicOptions: ["A sky full of overlapping rainbows", "Planets in mixed colours", "Two hearts hugging each other"],
    heroImageUrl: `${AV}/av35-7-mixing.png`,
  },

  // ── Watercolour ──
  {
    id: "av35-8",
    unitNumber: 8,
    medium: "Watercolour — Hand Painting (greeting cards)",
    technique: "Hand-print as composition · adding small drawn details to turn the print into a subject",
    whatChildrenMake: "Hand-print greeting cards: a flowerpot · candles · a hot-air balloon · a jellyfish · a strawberry · a dog face · a flower",
    days: 2,
    abilitiesCovered: ["Explores freely", "Names and recognises", "Emotional Expression through Art"],
    topicOptions: ["A flowerpot with handprint flowers", "A handprint hot-air balloon", "A handprint jellyfish or dog"],
    heroImageUrl: `${AV}/av35-8-hand-printing.png`,
  },
  {
    id: "av35-9",
    unitNumber: 9,
    medium: "Watercolour — Finger Painting (greeting cards)",
    technique: "Finger-print as mark · clusters of dots that build up a subject",
    whatChildrenMake: "Day 1: blueberries and strawberries scattered with leaves. Day 2: a swarm of bees · party-hat creatures with confetti",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Mixes and notices", "Emotional Expression through Art"],
    topicOptions: ["Blueberries and strawberries in finger-prints", "A bunch of bees in dots", "Party creatures with confetti"],
    heroImageUrl: `${AV}/av35-9-finger-painting.png`,
    extraImages: [`${AV}/av35-9-finger-painting-day-2.png`],
  },
  {
    id: "av35-10",
    unitNumber: 10,
    medium: "Watercolour — Sponge Painting",
    technique: "Sponge as mark-maker · soft layered colour for fluffy or grainy textures",
    whatChildrenMake: "Day 1: yellow sponge chicks in a grass field · clusters of purple sponge grapes. Day 2: a bouquet of sponge flowers · sponge broccoli",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Mixes and notices", "Integrating Artistic Choices"],
    topicOptions: ["Sponge chicks in grass", "A bunch of purple grapes", "A flower bouquet or broccoli in sponge texture"],
    heroImageUrl: `${AV}/av35-10-sponge.png`,
    extraImages: [`${AV}/av35-10-sponge-day-2.png`],
  },
  {
    id: "av35-11",
    unitNumber: 11,
    medium: "Watercolour — Q-tip Painting",
    technique: "Q-tip as a small precise brush · dot-by-dot pointillism that builds up a flower or pattern",
    whatChildrenMake: "A yellow daisy on a blue dotted sky · a pink pom-pom flower in tightly packed dots",
    days: 2,
    abilitiesCovered: ["Tool Precision", "Drawing Figures and Patterns", "Integrating Artistic Choices"],
    topicOptions: ["A pointillist daisy", "A pom-pom flower made of dots", "A polka-dot fish or tree"],
    heroImageUrl: `${AV}/av35-11-qtip.png`,
  },
  {
    id: "av35-12",
    unitNumber: 12,
    medium: "Watercolour — Blow and Splatter",
    technique: "Blowing paint through a straw · flicking paint with brushes · adding small drawn details to turn each splat into a character",
    whatChildrenMake: "Day 1: a row of splat-monsters with eyes, teeth, legs and bows added on top. Day 2: abstract splatter compositions · a portrait with splatter hair",
    days: 2,
    abilitiesCovered: ["Explores freely", "Mixes and notices", "Visual Arts Integration"],
    topicOptions: ["A splat-monster of my own", "An abstract splatter composition", "A face with wild splatter hair"],
    heroImageUrl: `${AV}/av35-12-blow-splatter.png`,
    extraImages: [`${AV}/av35-12-blow-splatter-day-2.png`],
  },

  // ── Artistotle illustrator projects (3 sessions each) ──
  // Six project cards. Each shows the formatted-page render from the
  // artistotle book as its hero, the real illustrator + project name as
  // its medium, and the spirit of the project in the topic options.
  {
    id: "atl35-1",
    unitNumber: 13,
    medium: "Eric Carle — Hungry Caterpillar",
    technique: "Painted-paper collage · cut and torn shapes layered into a recognisable creature",
    whatChildrenMake: "A textured-paper caterpillar built over 3 sessions: paint texture papers · cut shapes · build the caterpillar.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["The caterpillar from the book", "A creature of my own using the same papers", "A landscape in eric carle's style"],
    heroImageUrl: "/artistotle-book/06-eric-carle-project-1-formatted.png",
  },
  {
    id: "atl35-2",
    unitNumber: 14,
    medium: "Eric Carle — Create Your Own World",
    technique: "Painted-paper collage · scene-building from layered shapes",
    whatChildrenMake: "A full scene from texture papers — fish, jellyfish, planets, rockets, trees — layered into a busy world.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["An underwater world", "An outer-space scene", "A garden of texture-paper creatures"],
    heroImageUrl: "/artistotle-book/08-eric-carle-project-2.png",
  },
  {
    id: "atl35-3",
    unitNumber: 15,
    medium: "Lois Ehlert — Colourful Flower Garden",
    technique: "Sponge-printing + paper layering · stacking circles into geometric flowers",
    whatChildrenMake: "Bright sponge-printed flower circles stacked into a tall garden over 3 sessions.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A tall garden of round flowers", "One big bold sunflower", "A bunch of mixed flowers"],
    heroImageUrl: "/artistotle-book/10-lois-ehlert-project-1.png",
  },
  {
    id: "atl35-4",
    unitNumber: 16,
    medium: "Lois Ehlert — Geometric Animals",
    technique: "Cut-paper geometry · combining circles, semicircles, triangles, strips into animals",
    whatChildrenMake: "An animal built entirely from cut geometric shapes — a crab, a chick, an owl.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A crab from circles and triangles", "A chick from semicircles", "An owl made of stacked shapes"],
    heroImageUrl: "/artistotle-book/11-lois-ehlert-project-2-formatted.png",
  },
  {
    id: "atl35-5",
    unitNumber: 17,
    medium: "Taro Gomi — Create Your Own Characters",
    technique: "Loose line drawing + colour fill · simple lines with big personality",
    whatChildrenMake: "A row of people you know — family, friends, anyone — drawn over 3 sessions.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["My family", "My friends", "People who work where i live"],
    heroImageUrl: "/artistotle-book/15-taro-gomi-project-1.png",
  },
  {
    id: "atl35-6",
    unitNumber: 18,
    medium: "Taro Gomi — My Map",
    technique: "Map-drawing · places connected by roads with playful detail",
    whatChildrenMake: "A map of places I know — home, school, park, shop — connected with roads and details.",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["The places i go every day", "An imagined town", "A map of my school"],
    heroImageUrl: "/artistotle-book/16-taro-gomi-project-2-formatted.png",
  },
];

/* ─── Session Table — 60 sessions ────────────────────────────
 * Art Gym alternates Book ↔ Scribble. Book 1 for S1-25, Book 2 for S26+.
 * ArtGames cycle through 8 games (FM × 4, Colour × 3, CE × 1).
 * Artiverse / Artistotle alternate as long blocks; 42 sessions covered;
 * S43-60 reserved.
 */

const ART_GAMES_CYCLE = [
  "stitch-me",
  "shape-stitch-3-5",
  "mix-it-up",
  "magna-tiles",
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
 * Plan for sessions 1-42:
 *   Block 1 (S1-6):   Artiverse — Colourful Papers (Accordions, Circles, Mosaics)
 *   Block 2 (S7-9):   Artistotle — Illustrator 1
 *   Block 3 (S10-13): Artiverse — Loops and Chains; Crayons Doodling
 *   Block 4 (S14-16): Artistotle — Illustrator 2
 *   Block 5 (S17-20): Artiverse — Crayons Colouring; Colour Mixing
 *   Block 6 (S21-23): Artistotle — Illustrator 3
 *   Block 7 (S24-27): Artiverse — Watercolour Hand; Finger Painting
 *   Block 8 (S28-30): Artistotle — Illustrator 4
 *   Block 9 (S31-34): Artiverse — Watercolour Sponge; Q-tip
 *   Block 10 (S35-37): Artistotle — Illustrator 5
 *   Block 11 (S38-39): Artiverse — Watercolour Blow and Splatter
 *   Block 12 (S40-42): Artistotle — Illustrator 6
 *   S43-60: reserved (no segment assignments yet)
 */
const planned: Array<{ unitId: string; day: number; name: string }> = [
  // S1-2 Accordions
  { unitId: "av35-1", day: 1, name: "Colourful Papers — Accordions" },
  { unitId: "av35-1", day: 2, name: "Colourful Papers — Accordions" },
  // S3-4 Circles
  { unitId: "av35-2", day: 1, name: "Colourful Papers — Circles" },
  { unitId: "av35-2", day: 2, name: "Colourful Papers — Circles" },
  // S5-6 Mosaics
  { unitId: "av35-3", day: 1, name: "Colourful Papers — Mosaics" },
  { unitId: "av35-3", day: 2, name: "Colourful Papers — Mosaics" },
  // S7-9 Illustrator 1
  { unitId: "atl35-1", day: 1, name: "Artistotle — Illustrator 1" },
  { unitId: "atl35-1", day: 2, name: "Artistotle — Illustrator 1" },
  { unitId: "atl35-1", day: 3, name: "Artistotle — Illustrator 1" },
  // S10-11 Loops and Chains
  { unitId: "av35-4", day: 1, name: "Colourful Papers — Loops and Chains" },
  { unitId: "av35-4", day: 2, name: "Colourful Papers — Loops and Chains" },
  // S12-13 Crayons Doodling
  { unitId: "av35-5", day: 1, name: "Crayons — Doodling" },
  { unitId: "av35-5", day: 2, name: "Crayons — Doodling" },
  // S14-16 Illustrator 2
  { unitId: "atl35-2", day: 1, name: "Artistotle — Illustrator 2" },
  { unitId: "atl35-2", day: 2, name: "Artistotle — Illustrator 2" },
  { unitId: "atl35-2", day: 3, name: "Artistotle — Illustrator 2" },
  // S17-18 Crayons Colouring
  { unitId: "av35-6", day: 1, name: "Crayons — Colouring" },
  { unitId: "av35-6", day: 2, name: "Crayons — Colouring" },
  // S19-20 Crayons Colour Mixing
  { unitId: "av35-7", day: 1, name: "Crayons — Colour Mixing" },
  { unitId: "av35-7", day: 2, name: "Crayons — Colour Mixing" },
  // S21-23 Illustrator 3
  { unitId: "atl35-3", day: 1, name: "Artistotle — Illustrator 3" },
  { unitId: "atl35-3", day: 2, name: "Artistotle — Illustrator 3" },
  { unitId: "atl35-3", day: 3, name: "Artistotle — Illustrator 3" },
  // S24-25 Hand Painting
  { unitId: "av35-8", day: 1, name: "Watercolour — Hand Painting" },
  { unitId: "av35-8", day: 2, name: "Watercolour — Hand Painting" },
  // S26-27 Finger Painting
  { unitId: "av35-9", day: 1, name: "Watercolour — Finger Painting" },
  { unitId: "av35-9", day: 2, name: "Watercolour — Finger Painting" },
  // S28-30 Illustrator 4
  { unitId: "atl35-4", day: 1, name: "Artistotle — Illustrator 4" },
  { unitId: "atl35-4", day: 2, name: "Artistotle — Illustrator 4" },
  { unitId: "atl35-4", day: 3, name: "Artistotle — Illustrator 4" },
  // S31-32 Sponge Painting
  { unitId: "av35-10", day: 1, name: "Watercolour — Sponge Painting" },
  { unitId: "av35-10", day: 2, name: "Watercolour — Sponge Painting" },
  // S33-34 Q-tip Painting
  { unitId: "av35-11", day: 1, name: "Watercolour — Q-tip Painting" },
  { unitId: "av35-11", day: 2, name: "Watercolour — Q-tip Painting" },
  // S35-37 Illustrator 5
  { unitId: "atl35-5", day: 1, name: "Artistotle — Illustrator 5" },
  { unitId: "atl35-5", day: 2, name: "Artistotle — Illustrator 5" },
  { unitId: "atl35-5", day: 3, name: "Artistotle — Illustrator 5" },
  // S38-39 Blow and Splatter
  { unitId: "av35-12", day: 1, name: "Watercolour — Blow and Splatter" },
  { unitId: "av35-12", day: 2, name: "Watercolour — Blow and Splatter" },
  // S40-42 Illustrator 6
  { unitId: "atl35-6", day: 1, name: "Artistotle — Illustrator 6" },
  { unitId: "atl35-6", day: 2, name: "Artistotle — Illustrator 6" },
  { unitId: "atl35-6", day: 3, name: "Artistotle — Illustrator 6" },
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
  title: "art and design",
  category: "art",
  heroImageUrl: "/prog-art-3-5.gif",
  ageGroup: "3-5",
  ageLabel: "ages 3–5",
  tagline:
    "build the physical control, colour awareness, and creative confidence that makes a child someone who makes things — for the rest of their life.",
  description:
    "Sessions across five segments: art gym, art games, Artiverse / Artistotle making, experience book, and art care. Each day, children build fine motor skills, develop creative expression, and make artworks using varied mediums and techniques, exploring every idea through artists' work and hands-on creation.",
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
        "a daily warm-up that builds fine motor control and creative confidence through short, focused mark-making. children work through the art gym and scribble books on alternate days, choosing their own materials each time. the focus is on preparing the hands and mind for making, not on correctness.",
      type: "rotating",
      rotationPool: ["ag-book-1", "ag-book-2", "scribble-book"],
    },
    {
      id: "art-games",
      name: "Art Games",
      durationRange: "25 min",
      objective:
        "one structured game that builds a specific art skill through play. all children engage at the same time, using clear rules that stay consistent across sessions. the focus is on practising a skill through repetition without direct teaching.",
      type: "rotating",
      rotationPool: Object.keys(artGamesActivities),
    },
    {
      id: "artiverse",
      name: "Artiverse / Artistotle",
      durationRange: "35 min",
      objective:
        "the core making segment where children build all three skills through sustained work. artiverse focuses on free, choice-based making across materials and techniques, while artistotle introduces the work of illustrators and invites children to create in that spirit. the two modes rotate, giving both freedom and depth.",
      type: "fixed",
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? what you enjoyed? what you didn't? what to do again? every child speaks. after children leave, the teacher fills in the skill-assessment part privately. these daily notes compile into the monthly report card that goes home.",
      type: "fixed",
    },
    {
      id: "art-care",
      name: "Art Care",
      durationRange: "5 min",
      objective:
        "children take responsibility for materials and the shared space by putting everything back in place. the focus is on building care, independence, and respect for tools through consistent practice.",
      type: "fixed",
    },
  ],
  sessionTable,
  activities: { ...artGamesActivities },
  checkpoints,
  artiverseUnits,
};
