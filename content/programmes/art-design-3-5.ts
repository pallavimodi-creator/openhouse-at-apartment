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
    setupLine:
      "Sew through the stitching template using shoelaces. Running stitch, whip stitch, or chain stitch.",
    howToPlay:
      "Children sew through stitching templates using shoelaces. Running Stitch = dashed line. Whip Stitch = over the edge in a loop. Chain Stitch = each stitch loops through the previous one. Templates range from simple outlines to more complex forms.",
    materials: [
      "Sewing templates (numbers, alphabets, simple object outlines)",
      "Shoelaces",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Running stitch on a simple template — educator demonstrates first." },
      { level: "Medium", description: "Whip stitch — child works around the edge of the template." },
      { level: "Hard", description: "Chain stitch — each loop threads through the previous one." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "stitch-me": {
    id: "stitch-me",
    segment: "art-games",
    title: "stitch me",
    setupLine: "Thread the beads in the right sequence — colour, number, or riddle.",
    howToPlay:
      "Children thread beads onto a shoelace following a specific sequence. The sequence is given as a prompt card or spoken by the teacher. Three difficulty levels — pure colour sequence, colour + count combinations, and riddle prompts where the answer is the next bead.",
    materials: [
      "Coloured beads in a tray",
      "Shoelaces with a stiff tip",
      "Sequence prompt cards",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Colour sequence — match the order on the prompt card." },
      { level: "Medium", description: "Colour + count — e.g. \"3 red, 2 blue, 1 yellow.\"" },
      { level: "Hard", description: "Riddle prompts — the teacher gives a clue and the child threads the bead that fits." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "magna-tiles": {
    id: "magna-tiles",
    segment: "art-games",
    title: "magna tiles",
    setupLine: "Build using Magna-Tiles — match the prompt card, or build something of your own.",
    howToPlay:
      "Children build structures using Magna-Tiles, guided by prompt cards across five levels of difficulty — from flat 2D matching to free 3D building.",
    materials: [
      "Magna-Tiles set",
      "Prompt cards (5 levels)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Flat 2D — copy the shape on the card using single tiles laid flat." },
      { level: "Medium", description: "2D into 3D — fold flat shapes up into simple 3D forms (cube, pyramid)." },
      { level: "Hard", description: "Free 3D — build a structure of the child's choice without a card." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "shape-mats": {
    id: "shape-mats",
    segment: "art-games",
    title: "shape mats — tile placement",
    setupLine: "Place the shape tiles onto the mat outlines, or build your own arrangement.",
    howToPlay:
      "Large illustrated shape mats are placed on the table. Children either place matching shape tiles onto the printed mat outlines, or arrange tiles freely to build their own composition.",
    materials: [
      "Large illustrated shape mats",
      "Shape tiles in matching shapes and colours",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Place tiles onto the matching outlines printed on the mat." },
      { level: "Medium", description: "Place tiles on the mat using only the shape clue (no outline)." },
      { level: "Hard", description: "Free arrangement — child builds their own composition on the mat." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Colour ──
  "match-me-3-5": {
    id: "match-me-3-5",
    segment: "art-games",
    title: "match me",
    setupLine: "Match the coloured beads or pictures to the right squares on the grid.",
    howToPlay:
      "Children match coloured beads or object cards to the correct grid squares. Three variations — simultaneous Colour Match, Pattern Memory (flip and remember), and timed Speed Match.",
    variations: [
      {
        name: "Variation 1 — Colour match",
        description: "Place beads onto the grid square that matches their colour.",
      },
      {
        name: "Variation 2 — Pattern memory",
        description: "Cards face-down — flip two; if they match, keep the pair.",
      },
      {
        name: "Variation 3 — Speed match",
        description: "On a timer — match as many beads as possible before the time runs out.",
      },
    ],
    materials: [
      "9-grid template card",
      "Coloured beads",
      "Picture cards (Pattern Memory variation)",
      "Timer (Speed Match variation)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Colour match — no time limit." },
      { level: "Medium", description: "Pattern Memory — find matching pairs from face-down cards." },
      { level: "Hard", description: "Speed Match — beat the timer." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "mix-it-up": {
    id: "mix-it-up",
    segment: "art-games",
    title: "mix it up",
    setupLine: "Sort the object cards by colour. Use the swatch cards as your guide.",
    howToPlay:
      "30 object cards are spread on the table. 6 colour swatch cards act as category markers. Children sort each object card under the colour it most closely matches. The third variation asks each child to draw an object in its real-world colours.",
    variations: [
      {
        name: "Variation 1 — Sort",
        description: "Sort all 30 object cards under the 6 colour swatches.",
      },
      {
        name: "Variation 2 — Hunt",
        description:
          "Teacher names a colour; children find every object card of that colour as fast as they can.",
      },
      {
        name: "Variation 3 — Draw",
        description:
          "Child picks an object card and draws the same object in its real-world colours.",
      },
    ],
    materials: [
      "30 object cards",
      "6 colour swatch cards",
      "Drawing paper + crayons (variation 3)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Sort — match objects to swatches." },
      { level: "Medium", description: "Hunt — race to find objects of a named colour." },
      { level: "Hard", description: "Draw — reproduce a chosen object in its real-world colours." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "ryb-tiles": {
    id: "ryb-tiles",
    segment: "art-games",
    title: "the game of red, yellow and blue",
    setupLine: "Build colour mixtures with the tiles. Discover what new colour comes out.",
    howToPlay:
      "Shape tiles in primary and secondary colours sit in the centre. Children build tile equations — for example, 2 red + 1 yellow — to discover or predict the secondary colour produced. Three variations across difficulty levels.",
    variations: [
      {
        name: "Variation 1 — Build the mix",
        description:
          "Teacher names a target colour (e.g. \"orange\") and children build an equation that produces it.",
      },
      {
        name: "Variation 2 — Story mix",
        description:
          "Teacher reads a colour story; children pick the tile combination that matches each beat of the story.",
      },
      {
        name: "Variation 3 — Predict and build",
        description:
          "Child picks any two primary tiles, predicts the secondary colour aloud, then builds and checks.",
      },
    ],
    materials: [
      "Primary colour tiles (red, yellow, blue)",
      "Secondary colour tiles (orange, green, purple)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Build the mix — known target." },
      { level: "Medium", description: "Story mix — listen and respond." },
      { level: "Hard", description: "Predict and build — child commits to a prediction first." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Creative Expression ──
  "mini-artventure": {
    id: "mini-artventure",
    segment: "art-games",
    title: "miniartventure",
    setupLine:
      "Roll, move your token, land on a zone, and complete the art challenge from that zone's card.",
    howToPlay:
      "A board game in which children roll, move, land on a zone (Draw, Colour, Mould, or Build), and complete a 2-minute art challenge from that zone's card deck.",
    variations: [
      {
        name: "Individual play",
        description: "Each child plays with their own token. Their roll, their challenge.",
      },
      {
        name: "Cooperative variation",
        description:
          "The whole group plays as a team. One child rolls and draws the card; everyone does the same challenge together.",
      },
    ],
    materials: [
      "Game board (Draw / Colour / Mould / Build zones)",
      "Player tokens",
      "Dice",
      "Timer",
      "Challenge card decks per zone",
      "Pencils, crayons, clay, blocks or pipe cleaners",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Simpler cards, 3-minute timer." },
      { level: "Medium", description: "All zones, 2-minute timer." },
      { level: "Hard", description: "All zones, 90-second timer." },
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
  {
    id: "atl35-1",
    unitNumber: 13,
    medium: "Artistotle — Illustrator 1",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
  },
  {
    id: "atl35-2",
    unitNumber: 14,
    medium: "Artistotle — Illustrator 2",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
  },
  {
    id: "atl35-3",
    unitNumber: 15,
    medium: "Artistotle — Illustrator 3",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
  },
  {
    id: "atl35-4",
    unitNumber: 16,
    medium: "Artistotle — Illustrator 4",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
  },
  {
    id: "atl35-5",
    unitNumber: 17,
    medium: "Artistotle — Illustrator 5",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
  },
  {
    id: "atl35-6",
    unitNumber: 18,
    medium: "Artistotle — Illustrator 6",
    technique: "Look at the illustrator's characters and palette · make in their spirit",
    whatChildrenMake: "A piece in the style of the chosen illustrator",
    days: 3,
    abilitiesCovered: ["Integrating Artistic Choices", "Emotional Expression through Art", "Visual Arts Integration"],
    topicOptions: ["A character from the illustrator's world", "A scene I would add to their world", "A version of myself in their world"],
    heroImageUrl: PLACEHOLDER,
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
  "match-me-3-5",
  "shape-stitch-3-5",
  "mix-it-up",
  "magna-tiles",
  "ryb-tiles",
  "shape-mats",
  "mini-artventure",
];

function gameForSession(n: number): string {
  return ART_GAMES_CYCLE[(n - 1) % ART_GAMES_CYCLE.length];
}

function gymForSession(n: number): string {
  // Alternate book ↔ scribble. Book switches from book-1 to book-2 at S26.
  const isBookDay = n % 2 === 1;
  if (isBookDay) return n <= 25 ? "ag-book-1" : "ag-book-2";
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
  return {
    sessionNumber,
    artGym: gymForSession(sessionNumber),
    artGames: gameForSession(sessionNumber),
    artiverse: slot?.unitId,
    artiverseUnit: slot ? Number(slot.unitId.replace(/[^0-9]/g, "")) : undefined,
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
    "60 sessions across five segments — art gym warm-up, art games, artiverse / artistotle making, experience book, and art care. children encounter every idea three ways: through a structured game, through the work of a famous illustrator, and through making something of their own.",
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
        "daily warm-up that builds fine motor control and creative confidence through short, focused mark-making. rotates between art gym book and scribble book on consecutive sessions. book 1 runs for s1-25, book 2 for s26-60. children choose their own material — erasable markers, play-doh, thread, sequins.",
      type: "rotating",
      rotationPool: ["ag-book-1", "ag-book-2", "scribble-book"],
    },
    {
      id: "art-games",
      name: "Art Games",
      durationRange: "25 min",
      objective:
        "one game per session. rules explained once; teacher sets up, steps back, observes. games rotate across the 8 games — 4 fine motor, 3 colour, 1 creative expression — so each skill is touched regularly.",
      type: "rotating",
      rotationPool: Object.keys(artGamesActivities),
    },
    {
      id: "artiverse",
      name: "Artiverse / Artistotle",
      durationRange: "35 min",
      objective:
        "alternates between artiverse (free making across colourful papers, crayons, watercolour) and artistotle (illustrator-led projects). within each mode activities are linear in difficulty. each artiverse project runs 2 sessions; each artistotle illustrator runs 3 sessions.",
      type: "fixed",
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "teacher records the session and what the child learnt. child adds one drawing of their own. notes go home to parents.",
      type: "fixed",
    },
    {
      id: "art-care",
      name: "Art Care",
      durationRange: "5 min",
      objective:
        "children sort all materials back to the correct shelf sections and clean the making space. the standard is care, not speed. caring for tools is a skill built the same way art skills are built — through repetition.",
      type: "fixed",
    },
  ],
  sessionTable,
  activities: { ...artGamesActivities },
  checkpoints,
  artiverseUnits,
};
