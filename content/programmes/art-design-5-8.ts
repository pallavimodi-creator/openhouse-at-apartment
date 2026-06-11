import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  ArtiverseUnit,
} from "@/content/types";
import { ART_TRIAL_SESSION_5_8 } from "./art-design-trial";

// ─── Artiverse units (25 units, 50 sessions) ────────────────

const PLACEHOLDER = "/artiverse/placeholder.svg";

const artiverseUnits: ArtiverseUnit[] = [
  {
    id: "unit-4",
    unitNumber: 1,
    medium: "Tempera",
    technique: "Fingerprinting — pressing thumb and fingers into paint and onto paper, exploring what each finger makes",
    whatChildrenMake: "Thumbprint art",
    days: 2,
    abilitiesCovered: [
      "Identifies the marks different tools make and experiments freely",
      "Experiments freely with colours, materials, and marks",
    ],
    topicOptions: [
      "Fingerprint animals",
      "Fingerprint flowers and plants",
      "A fingerprint world I invented",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-4.png",
  },
  {
    id: "unit-6",
    unitNumber: 2,
    medium: "Oil pastel",
    technique: "Bold fill — pressing firmly to fill shapes with strong, rich colour",
    whatChildrenMake: "Food",
    days: 2,
    abilitiesCovered: [
      "Combines shapes to draw recognisable objects",
      "Paints with reasonable control and makes early attempts at mixing",
    ],
    topicOptions: [
      "A fruit I love",
      "A meal I had recently",
      "A food I invented that does not exist",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-6.png",
  },
  {
    id: "unit-7",
    unitNumber: 3,
    medium: "Watercolour",
    technique: "Brush control — making deliberate clean marks with a loaded brush, varying line direction",
    whatChildrenMake: "Lines with watercolour",
    days: 2,
    abilitiesCovered: [
      "Makes different line types with intention — straight, wavy, zigzag, curved",
      "Paints with reasonable control and makes early attempts at mixing",
    ],
    topicOptions: [
      "A landscape using only lines",
      "A building drawn with watercolour lines",
      "A creature made entirely of coloured lines",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-7.png",
  },
  {
    id: "unit-8",
    unitNumber: 4,
    medium: "Tempera",
    technique: "Printing — pressing a natural object into paint and stamping it repeatedly on paper",
    whatChildrenMake: "Leaf printing sunflower",
    days: 2,
    abilitiesCovered: [
      "Combines line types to create texture",
      "Identifies warm and cool colour families and uses them expressively",
    ],
    topicOptions: [
      "A sunflower using leaf prints",
      "A garden scene using leaf prints",
      "An invented creature made from leaf prints",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-8.png",
  },
  {
    id: "unit-9",
    unitNumber: 5,
    medium: "Oil pastel",
    technique: "Shape + texture — building up a shape using marks that describe its surface and texture",
    whatChildrenMake: "Animals",
    days: 2,
    abilitiesCovered: [
      "Combines shapes to draw recognisable objects",
      "Combines line types to create texture",
      "Draws objects and scenes using observed line and texture",
    ],
    topicOptions: [
      "An animal with fur or feathers",
      "An animal with scales or a shell",
      "An animal with a surface I invented",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-9.png",
  },
  {
    id: "unit-12",
    unitNumber: 6,
    medium: "Watercolour",
    technique: "Colour theory — mixing and placing warm and cool colour families deliberately",
    whatChildrenMake: "Warm and cool colours",
    days: 2,
    abilitiesCovered: [
      "Identifies warm and cool colour families and uses them expressively",
    ],
    topicOptions: [
      "Something made only from warm colours",
      "Something made only from cool colours",
      "A world split in half — warm on one side, cool on the other",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-12.png",
  },
  {
    id: "unit-13",
    unitNumber: 7,
    medium: "Watercolour + collage",
    technique: "Painted paper — painting large sheets, then tearing and layering to build an image (Eric Carle style)",
    whatChildrenMake: "Eric Carle collage",
    days: 2,
    abilitiesCovered: [
      "Modifies and combines shapes creatively",
      "Draws overlapping objects to show depth · places a horizon line",
      "Experiments freely with colours, materials, and marks",
    ],
    topicOptions: [
      "An animal in its natural habitat",
      "A creature I see outside",
      "A creature from my imagination with a painted paper coat",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-13.png",
  },
  {
    id: "unit-14",
    unitNumber: 8,
    medium: "Mixed media",
    technique: "Shape play — building images by cutting and tearing shapes and assembling them on the page",
    whatChildrenMake: "Shape monsters",
    days: 2,
    abilitiesCovered: [
      "Modifies and combines shapes creatively",
      "Generates new and unusual ideas",
    ],
    topicOptions: [
      "A monster made entirely from circles",
      "A monster made from sharp shapes",
      "A monster using every shape I know",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-14.png",
  },
  {
    id: "unit-15",
    unitNumber: 9,
    medium: "Mixed media",
    technique: "Composition + imagination — arranging shapes and colour to build a world (Paul Klee style)",
    whatChildrenMake: "Paul Klee imaginary world",
    days: 2,
    abilitiesCovered: [
      "Modifies and combines shapes creatively",
      "Understands how colour and shape placement create visual balance",
      "Describes an imagined world or creature with enough detail to draw it",
    ],
    topicOptions: [
      "A town built from geometric shapes",
      "A landscape made of pattern and colour",
      "A world where everything is made of shapes",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-15.png",
  },
  {
    id: "unit-16",
    unitNumber: 10,
    medium: "Mixed media",
    technique: "Collage — layering cut and torn shapes to build a still life with depth",
    whatChildrenMake: "Pear collage",
    days: 2,
    abilitiesCovered: [
      "Understands foreground (close, bigger) and background (far, smaller)",
      "Draws overlapping objects to show depth · places a horizon line",
    ],
    topicOptions: [
      "A pear or fruit",
      "A still life I set up on the table",
      "A fruit that does not exist",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-16.png",
  },
  {
    id: "unit-17",
    unitNumber: 11,
    medium: "Mixed media",
    technique: "Story composition — building a scene with deliberate size contrast between close and far elements",
    whatChildrenMake: "Big fruit and ants",
    days: 2,
    abilitiesCovered: [
      "Understands how colour and shape placement create visual balance",
      "Describes an imagined world or creature with enough detail to draw it",
    ],
    topicOptions: [
      "A big fruit with tiny ants exploring it",
      "An enormous food with small creatures around it",
      "A giant invented food with tiny invented creatures",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-17.png",
  },
  {
    id: "unit-18",
    unitNumber: 12,
    medium: "Acrylic paint",
    technique: "Colour blending — mixing colours directly on the paper as they are applied, wet into wet",
    whatChildrenMake: "Abstract circles and shapes",
    days: 2,
    abilitiesCovered: [
      "Paints with reasonable control and makes early attempts at mixing",
      "Experiments freely with colours, materials, and marks",
    ],
    topicOptions: [
      "A butterfly with blended wings",
      "A pattern of circles blending into each other",
      "An abstract composition using blended colour shapes",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-18.png",
  },
  {
    id: "unit-19",
    unitNumber: 13,
    medium: "Acrylic paint",
    technique: "Colour blocking — filling areas of the page with flat, bold, deliberate colour",
    whatChildrenMake: "Rainbow art",
    days: 2,
    abilitiesCovered: [
      "Identifies warm and cool colour families and uses them expressively",
      "Understands how colour and shape placement create visual balance",
    ],
    topicOptions: [
      "A rainbow over a landscape",
      "A scene using all the colours of the rainbow",
      "A world with unexpected rainbow colours — green sky, orange sea",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-19.png",
  },
  {
    id: "unit-20",
    unitNumber: 14,
    medium: "Acrylic paint",
    technique: "Shape simplification — reducing a subject to its most essential shapes",
    whatChildrenMake: "Animals",
    days: 2,
    abilitiesCovered: [
      "Combines shapes to draw recognisable objects",
    ],
    topicOptions: [
      "An animal simplified into 5 shapes or fewer",
      "A group of animals simplified",
      "An invented animal built from simple shapes",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-20.png",
  },
  {
    id: "unit-21",
    unitNumber: 15,
    medium: "Acrylic paint",
    technique: "Collage + paint — combining cut paper shapes with painted detail to build a layered composition",
    whatChildrenMake: "Lemons and oranges",
    days: 2,
    abilitiesCovered: [
      "Draws overlapping objects to show depth · places a horizon line",
      "Mixes primary colours to produce secondary colours reliably",
    ],
    topicOptions: [
      "Lemons and oranges on a table",
      "Citrus fruit I set up and look at",
      "An invented citrus fruit with unusual colours",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-21.png",
  },
  {
    id: "unit-22",
    unitNumber: 16,
    medium: "Acrylic paint",
    technique: "Composition — arranging a group of objects deliberately across the full page",
    whatChildrenMake: "Flower pots",
    days: 2,
    abilitiesCovered: [
      "Fills the whole page rather than drawing only in the centre",
      "Understands how colour and shape placement create visual balance",
    ],
    topicOptions: [
      "Three flower pots in a row",
      "Flower pots I can see or arrange",
      "A collection of invented plants in pots",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-22.png",
  },
  {
    id: "unit-23",
    unitNumber: 17,
    medium: "Mixed media",
    technique: "Construction + imagination — building a complex subject from multiple materials with deliberate choices",
    whatChildrenMake: "Robots",
    days: 2,
    abilitiesCovered: [
      "Generates new and unusual ideas",
      "Describes an imagined world or creature with enough detail to draw it",
    ],
    topicOptions: [
      "A robot that does one specific job",
      "A robot designed to help me",
      "A robot from a world I invented",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-23.png",
  },
  {
    id: "unit-25",
    unitNumber: 18,
    medium: "Acrylic paint on black paper",
    technique: "Painting with light — working on a dark ground, building from dark to light using white and light colours to create a glowing effect",
    whatChildrenMake: "Firefly in a jar · Dragonfly",
    days: 2,
    abilitiesCovered: [
      "Creates tints by adding white and shades by adding black",
      "Paints with reasonable control and makes early attempts at mixing",
      "Experiments freely with colours, materials, and marks",
    ],
    topicOptions: [
      "A firefly glowing inside a glass jar",
      "A dragonfly with translucent wings catching the light",
      "An invented small glowing creature in a dark setting",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-25.png",
  },
];

// ─── Activities ─────────────────────────────────────────────

const artGamesActivities: Record<string, CurriculumActivity> = {
  "match-me": {
    id: "match-me",
    segment: "art-games",
    title: "match me",
    setupLine:
      "each child has a 9-grid template. pick a bead from the bowl without looking. if it matches a square on your grid, place it.",
    howToPlay:
      "Coloured beads sit in a bowl or box in the centre. On their turn, a child picks one bead without looking, compares it to their grid, and places it if it matches. No match = bead goes back. First to finish a row or grid wins.",
    variations: [
      {
        name: "Variation 1 — Picture matching",
        description:
          "Child draws a picture card from a deck and places it on the matching colour grid. If no match, discard. First to finish a row or grid wins.",
      },
      {
        name: "Variation 2 — Pattern Bingo",
        description:
          "Teacher calls out a colour + pattern combination (e.g. \"yellow straight lines\"). Children mark if present. First to finish a row or grid wins.",
      },
    ],
    materials: [
      "9-grid template card",
      "Coloured beads in a bowl or box",
      "Coloured object cards",
      "Timer",
      "Dry-erase markers (optional)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "match colours only — with beads or picture cards." },
      { level: "Medium", description: "Pattern Bingo — teacher calls out a colour + pattern combination and children mark if present." },
      { level: "Hard", description: "children play Bingo without teacher's cues — each child takes a turn to call out a colour + pattern." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "colour-flip": {
    id: "colour-flip",
    segment: "art-games",
    title: "colour flip",
    setupLine:
      "56 colour cards face-down. flip two. matching colour = keep the pair. most pairs wins.",
    howToPlay:
      "Shuffle cards and place them face down. Children take turns flipping two cards on each turn.",
    variations: [
      {
        name: "Variation 1 — Colour matching",
        description:
          "Each player flips two Colour Cards on their turn. If both cards are the same colour, they keep the pair. If not, they flip the cards back. The player with the most pairs at the end wins.",
      },
      {
        name: "Variation 2 — Colour Mixing cards",
        description:
          "Each player starts with an Easy Mixing Card. On their turn, flip two Colour Cards from the grid. If the flipped colours match the formula on the Mixing Card, they keep the cards — if not, they place them back.",
      },
      {
        name: "Variation 3 — Missing mixing card",
        description:
          "The teacher gives a Medium or Difficult Mixing Card with either 1 or 2 colours missing. Children find the matching pair by flipping 2 cards.",
      },
    ],
    materials: [
      "56 Colour Cards",
      "Easy Mixing Cards (14)",
      "Medium Mixing Cards (14)",
      "Difficult Mixing Cards (28)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Colour matching only." },
      { level: "Medium", description: "Easy and Medium Mixing Cards." },
      { level: "Hard", description: "Difficult Mixing Cards. Timer can be used to limit time." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "shape-stitch": {
    id: "shape-stitch",
    segment: "art-games",
    title: "shape stitch",
    setupLine:
      "sew through templates using shoelaces. running stitch, backstitch, or a pattern combining stitches of your choice.",
    howToPlay:
      "Children sew through templates using shoelaces. Running Stitch = dashed line. Backstitch = continuous joined line. Whip stitch = over the edges in a loop. Pattern Stitching = combines stitch types in a design of the child's choosing.",
    materials: [
      "Sewing templates (numbers, alphabets, and object outlines)",
      "Shoelaces",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Running Stitch and Whip stitch." },
      { level: "Medium", description: "Backstitch." },
      { level: "Hard", description: "Pattern stitching." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "shape-fusion": {
    id: "shape-fusion",
    segment: "art-games",
    title: "shape fusion",
    setupLine:
      "build a subject from geometric pieces without speaking. your team guesses what you are making.",
    howToPlay:
      "Each child builds a subject from geometric pieces silently while their team guesses what it is.",
    variations: [
      {
        name: "Variation 1 — Child's choice",
        description:
          "The child picks which subject they want to create from the Shape Card and the other children guess.",
      },
      {
        name: "Variation 2 — Relay / race",
        description:
          "The group splits into teams and the teams compete to make the most subjects — whichever team finishes a card, or a set number of cards, first wins.",
      },
    ],
    materials: [
      "Two sets of 60 transparent geometric pieces",
      "Shape Cards B1 and B2",
    ],
    difficultyLevels: [
      { level: "Easy", description: "B1 cards, educator names category." },
      { level: "Medium", description: "B1 or B2, no hints." },
      { level: "Hard", description: "B2 cards, relay format." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "cue-cards-game": {
    id: "cue-cards-game",
    segment: "art-games",
    title: "cue cards",
    setupLine:
      "follow step-by-step drawing instructions from the card. then complete the extension challenge.",
    howToPlay:
      "One card placed centrally. Children follow step-by-step instructions simultaneously. Educator gives extension challenge after completion.",
    materials: [
      "Cue Card sets B1 and B2",
      "Drawing paper",
      "Fine-line markers or pencils",
    ],
    difficultyLevels: [
      { level: "Easy", description: "B1 cards, visible throughout, no timer." },
      { level: "Medium", description: "B1 or B2, educator names one thing to observe." },
      { level: "Hard", description: "B2 card shown for a minute then removed, drawn from memory." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "i-spy-i-make": {
    id: "i-spy-i-make",
    segment: "art-games",
    title: "i spy i make",
    setupLine:
      "scene card in the centre. i name an object — you find and draw it.",
    howToPlay:
      "Teacher shows a scene card or places multiple line/texture cards in a row. Educator names a texture, line/shape, or texture. Child finds it, then draws.",
    materials: [
      "Scene cards (A5)",
      "Line / shape / texture cards",
      "Blank drawing sheets",
      "Pencils or crayons",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Easy cards (scene cards) shown — child draws chosen object." },
      { level: "Medium", description: "Use of Texture or lines/shapes cards." },
      { level: "Hard", description: "Any card shown 30 seconds then removed, drawn from memory." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  artventure: {
    id: "artventure",
    segment: "art-games",
    title: "artventure",
    setupLine:
      "roll the dice, move your token, land on an art zone, draw a challenge card (draw, colour, build or mixed media), and complete it within the time limit.",
    howToPlay:
      "Set up board game. Roll dice, move, land on an art zone. Draw a challenge card (draw, colour, build or mixed media) and complete it within the time limit.",
    variations: [
      {
        name: "Cooperative variation",
        description:
          "The whole group plays as a team. Each child takes a turn rolling the dice, and all the children do the same challenge as on the card drawn by that child. Then the next player rolls.",
      },
    ],
    materials: [
      "Game board",
      "Player tokens",
      "Dice",
      "Timer",
      "Challenge card decks per zone",
      "Pencils or crayons",
      "Clay",
      "Blocks or pipe cleaners",
      "Colour sheets",
    ],
    difficultyLevels: [
      { level: "Easy", description: "B1 challenges from challenge cards." },
      { level: "Medium", description: "B2 challenges from challenge cards." },
      { level: "Hard", description: "B2 challenges with limited time." },
    ],
    promptHeading: "art zones",
    prompts: [
      "Sketch zone (Yellow tile/card) — children complete a simple sketch activity.",
      "Colour zone (Teal tile/card) — children complete a colouring activity on given sheets.",
      "Build zone (Pink tile/card) — children build a structure using blocks or pipe cleaners.",
      "Mixed media zone (Light blue tile/card) — children complete the given activity using mixed mediums.",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "imagine-that": {
    id: "imagine-that",
    segment: "art-games",
    title: "imagine that",
    setupLine:
      "one child describes a card image without naming it. others draw what they hear.",
    howToPlay:
      "One child is the describer. The describer describes the card without naming the subject. The other children draw what they hear. After everyone is done, the describer picks the drawing that best matches what they had in mind. Variation — the child invents an imaginary subject and describes it while drawing simultaneously — for example, a whale with the body of a horse.",
    materials: [
      "Physical card decks — Animals and Objects",
      "Drawing paper",
      "Colour pencils or markers",
    ],
    difficultyLevels: [
      { level: "Easy", description: "easy cards — the guessing audience can ask the describer 2 questions." },
      { level: "Medium", description: "easy cards — no questions allowed." },
      { level: "Hard", description: "difficult cards — no clues allowed." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "doodle-dash": {
    id: "doodle-dash",
    segment: "art-games",
    title: "doodle dash",
    setupLine:
      "teacher reads a prompt. everyone draws. unique drawings score a point, duplicates score zero.",
    howToPlay:
      "The teacher reads out the prompt to draw. All children draw simultaneously for a set time, then reveal. Example prompt — \"something that starts with the letter C.\" If two or more children draw the same thing, they each score 0; a unique drawing scores a point. Bonus points for the funniest or most artistic drawing, voted by the group. Variation — children draw individually or as a team taking turns.",
    materials: [
      "Drawing prompts — https://wordwall.net/resource/86438051/sketch-it-up-deck-2",
      "Drawing paper or whiteboards",
      "Pencils or markers",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "no time limit — take as long as you need." },
      { level: "Medium", description: "a set time per prompt — draw before the timer runs out." },
      { level: "Hard", description: "rapid sketching — a set number of prompts in a limited time, team or individual. must complete every drawing before time is up." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  // Art Gym entries — folded into the Art Games + Gym slot at this age.
  // Each runs as one of the 1–2 games per session (see segment objective).
  // No separate art-gym segment, no extension-day follow-on, no scribble book.
  "art-gym-book": {
    id: "art-gym-book",
    segment: "art-games",
    title: "art gym book",
    setupLine:
      "each child works in their own laminated art gym book at their own pace. 1–3 pages per session, then a free replication on a sketch sheet.",
    howToPlay:
      "Children open the laminated art gym book to their next page and complete 1–3 pages with thread, clay, sequins, or erasable markers. Pages progress in order — page 1 to last — challenge increases page by page. Once the page is done, the child copies the same line / shape / pattern freely on a sketch sheet using a material of choice (crayon, colour pencil, brush pen, yarn + glue). No extension-day follow-on — the page and the sketch happen in the same slot.",
    materials: [
      "Laminated Art Gym Book (book 3 for 5-8, book 4 alternates)",
      "Erasable markers, thread, clay, sequins",
      "A4 sketch sheet",
      "Crayons, colour pencils, brush pens, yarn + glue (child's pick)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "1 page from the book — child traces and replicates with the simplest material." },
      { level: "Medium", description: "2 pages — child picks from two materials and combines them on the sketch sheet." },
      { level: "Hard", description: "3 pages — child invents an extension on the sketch sheet (an object built from the practised line type)." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "art-gym-cue-card": {
    id: "art-gym-cue-card",
    segment: "art-games",
    title: "art gym cue card",
    setupLine:
      "teacher picks one cue card from the pool. children follow the step-by-step illustrated prompt to draw on a fresh sketch sheet.",
    howToPlay:
      "Cue cards are illustrated step-by-step prompts the teacher selects (rotates across types — animals, birds, buildings, food, nature, vehicles). Children read or follow the steps and complete a drawing on a sketch sheet. The teacher walks around prompting each child to add one more detail their cue card didn't show. No extension-day follow-on — the cue card and any extension happen in the same slot.",
    materials: [
      "Cue card deck (laminated, age-appropriate)",
      "A4 sketch sheets",
      "Crayons, colour pencils, brush pens",
    ],
    difficultyLevels: [
      { level: "Easy", description: "child copies the cue card step by step." },
      { level: "Medium", description: "child completes the cue card then adds a background of their choice." },
      { level: "Hard", description: "child completes the cue card then invents one new step beyond it." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

// ─── Session Table ──────────────────────────────────────────

const sessionTable: CurriculumSessionEntry[] = [
  { sessionNumber: 0,  artGym: "book-3",        artGames: "match-me",       artiverse: "unit-4",  artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "trial session — art gym + extension combined, match me, poster paints flat colour donut", topicLayer: 0 },
  { sessionNumber: 1,  artGym: "book-3",        artGames: "match-me",       artiverse: "unit-4",  artiverseUnit: 1,  artiverseDay: 1, artiverseUnitName: "tempera — thumbprint art", topicLayer: 0 },
  { sessionNumber: 2,  artGym: "ext-book",       artGames: "colour-flip",    artiverse: "unit-4",  artiverseUnit: 1,  artiverseDay: 2, artiverseUnitName: "tempera — thumbprint art", topicLayer: 0 },
  { sessionNumber: 3,  artGym: "cue-card-b1",    artGames: "shape-stitch",   artiverse: "unit-6",  artiverseUnit: 2,  artiverseDay: 1, artiverseUnitName: "oil pastel — food", topicLayer: 0 },
  { sessionNumber: 4,  artGym: "ext-cue-card",   artGames: "shape-fusion",   artiverse: "unit-6",  artiverseUnit: 2,  artiverseDay: 2, artiverseUnitName: "oil pastel — food", topicLayer: 0 },
  { sessionNumber: 5,  artGym: "book-3",        artGames: "cue-cards-game", artiverse: "unit-7",  artiverseUnit: 3,  artiverseDay: 1, artiverseUnitName: "watercolour — lines with watercolour", topicLayer: 0 },
  { sessionNumber: 6,  artGym: "ext-book",       artGames: "i-spy-i-make",   artiverse: "unit-7",  artiverseUnit: 3,  artiverseDay: 2, artiverseUnitName: "watercolour — lines with watercolour", topicLayer: 0 },
  { sessionNumber: 7,  artGym: "cue-card-b1",    artGames: "artventure",     artiverse: "unit-8",  artiverseUnit: 4,  artiverseDay: 1, artiverseUnitName: "tempera — leaf printing sunflower", topicLayer: 0 },
  { sessionNumber: 8,  artGym: "ext-cue-card",   artGames: "imagine-that",   artiverse: "unit-8",  artiverseUnit: 4,  artiverseDay: 2, artiverseUnitName: "tempera — leaf printing sunflower", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 9,  artGym: "book-3",        artGames: "doodle-dash",    artiverse: "unit-9",  artiverseUnit: 5,  artiverseDay: 1, artiverseUnitName: "oil pastel — animals", topicLayer: 0 },
  { sessionNumber: 10, artGym: "ext-book",       artGames: "match-me",       artiverse: "unit-9",  artiverseUnit: 5,  artiverseDay: 2, artiverseUnitName: "oil pastel — animals", topicLayer: 0 },
  { sessionNumber: 11, artGym: "cue-card-b1",    artGames: "colour-flip",    artiverse: "unit-12",  artiverseUnit: 6,  artiverseDay: 1, artiverseUnitName: "watercolour — warm and cool colours", topicLayer: 0 },
  { sessionNumber: 12, artGym: "ext-cue-card",   artGames: "shape-stitch",   artiverse: "unit-12",  artiverseUnit: 6,  artiverseDay: 2, artiverseUnitName: "watercolour — warm and cool colours", topicLayer: 0 },
  { sessionNumber: 13, artGym: "book-3",        artGames: "shape-fusion",   artiverse: "unit-13",  artiverseUnit: 7,  artiverseDay: 1, artiverseUnitName: "watercolour + collage — eric carle collage", topicLayer: 0 },
  { sessionNumber: 14, artGym: "ext-book",       artGames: "cue-cards-game", artiverse: "unit-13",  artiverseUnit: 7,  artiverseDay: 2, artiverseUnitName: "watercolour + collage — eric carle collage", topicLayer: 0 },
  { sessionNumber: 15, artGym: "cue-card-b1",    artGames: "i-spy-i-make",   artiverse: "unit-14",  artiverseUnit: 8,  artiverseDay: 1, artiverseUnitName: "mixed media — shape monsters", topicLayer: 0 },
  { sessionNumber: 16, artGym: "ext-cue-card",   artGames: "artventure",     artiverse: "unit-14",  artiverseUnit: 8,  artiverseDay: 2, artiverseUnitName: "mixed media — shape monsters", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 17, artGym: "book-3",        artGames: "imagine-that",   artiverse: "unit-15",  artiverseUnit: 9,  artiverseDay: 1, artiverseUnitName: "mixed media — paul klee imaginary world", topicLayer: 0 },
  { sessionNumber: 18, artGym: "ext-book",       artGames: "doodle-dash",    artiverse: "unit-15",  artiverseUnit: 9,  artiverseDay: 2, artiverseUnitName: "mixed media — paul klee imaginary world", topicLayer: 0 },
  { sessionNumber: 19, artGym: "cue-card-b1",    artGames: "match-me",       artiverse: "unit-16",  artiverseUnit: 10,  artiverseDay: 1, artiverseUnitName: "mixed media — pear collage", topicLayer: 0 },
  { sessionNumber: 20, artGym: "ext-cue-card",   artGames: "colour-flip",    artiverse: "unit-16",  artiverseUnit: 10,  artiverseDay: 2, artiverseUnitName: "mixed media — pear collage", topicLayer: 0 },
  { sessionNumber: 21, artGym: "book-3",        artGames: "shape-stitch",   artiverse: "unit-17",  artiverseUnit: 11,  artiverseDay: 1, artiverseUnitName: "mixed media — big fruit and ants", topicLayer: 0 },
  { sessionNumber: 22, artGym: "ext-book",       artGames: "shape-fusion",   artiverse: "unit-17",  artiverseUnit: 11,  artiverseDay: 2, artiverseUnitName: "mixed media — big fruit and ants", topicLayer: 0 },
  { sessionNumber: 23, artGym: "cue-card-b1",    artGames: "cue-cards-game", artiverse: "unit-18",  artiverseUnit: 12,  artiverseDay: 1, artiverseUnitName: "acrylic paint — abstract circles and shapes", topicLayer: 0 },
  { sessionNumber: 24, artGym: "ext-cue-card",   artGames: "i-spy-i-make",   artiverse: "unit-18", artiverseUnit: 12, artiverseDay: 2, artiverseUnitName: "acrylic paint — abstract circles and shapes", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 25, artGym: "book-3",        artGames: "artventure",     artiverse: "unit-19", artiverseUnit: 13, artiverseDay: 1, artiverseUnitName: "acrylic paint — rainbow art", topicLayer: 0 },
  { sessionNumber: 26, artGym: "ext-book",       artGames: "imagine-that",   artiverse: "unit-19", artiverseUnit: 13, artiverseDay: 2, artiverseUnitName: "acrylic paint — rainbow art", topicLayer: 0 },
  { sessionNumber: 27, artGym: "cue-card-b2",    artGames: "doodle-dash",    artiverse: "unit-20", artiverseUnit: 14, artiverseDay: 1, artiverseUnitName: "acrylic paint — animals", topicLayer: 0 },
  { sessionNumber: 28, artGym: "ext-cue-card",   artGames: "match-me",       artiverse: "unit-20", artiverseUnit: 14, artiverseDay: 2, artiverseUnitName: "acrylic paint — animals", topicLayer: 0 },
  { sessionNumber: 29, artGym: "book-4",        artGames: "colour-flip",    artiverse: "unit-21", artiverseUnit: 15, artiverseDay: 1, artiverseUnitName: "acrylic paint — lemons and oranges", topicLayer: 0 },
  { sessionNumber: 30, artGym: "ext-book",       artGames: "shape-stitch",   artiverse: "unit-21", artiverseUnit: 15, artiverseDay: 2, artiverseUnitName: "acrylic paint — lemons and oranges", topicLayer: 0 },
  { sessionNumber: 31, artGym: "cue-card-b2",    artGames: "shape-fusion",   artiverse: "unit-22", artiverseUnit: 16, artiverseDay: 1, artiverseUnitName: "acrylic paint — flower pots", topicLayer: 0 },
  { sessionNumber: 32, artGym: "ext-cue-card",   artGames: "cue-cards-game", artiverse: "unit-22", artiverseUnit: 16, artiverseDay: 2, artiverseUnitName: "acrylic paint — flower pots", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 33, artGym: "book-4",        artGames: "i-spy-i-make",   artiverse: "unit-23", artiverseUnit: 17, artiverseDay: 1, artiverseUnitName: "mixed media — robots", topicLayer: 0 },
  { sessionNumber: 34, artGym: "ext-book",       artGames: "artventure",     artiverse: "unit-23", artiverseUnit: 17, artiverseDay: 2, artiverseUnitName: "mixed media — robots", topicLayer: 0 },
  { sessionNumber: 35, artGym: "cue-card-b2",    artGames: "imagine-that",   artiverse: "unit-25", artiverseUnit: 18, artiverseDay: 1, artiverseUnitName: "acrylic paint on black paper — firefly in a jar · dragonfly", topicLayer: 0 },
  { sessionNumber: 36, artGym: "ext-cue-card",   artGames: "doodle-dash",    artiverse: "unit-25", artiverseUnit: 18, artiverseDay: 2, artiverseUnitName: "acrylic paint on black paper — firefly in a jar · dragonfly", topicLayer: 0 },
  { sessionNumber: 37, artGym: "book-4",        artGames: "match-me",       artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 38, artGym: "ext-book",       artGames: "colour-flip",    artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 39, artGym: "cue-card-b2",    artGames: "shape-stitch",   artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 40, artGym: "ext-cue-card",   artGames: "shape-fusion",   artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 41, artGym: "book-4",        artGames: "cue-cards-game", artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 42, artGym: "ext-book",       artGames: "i-spy-i-make",   artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 43, artGym: "cue-card-b2",    artGames: "artventure",     artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 44, artGym: "ext-cue-card",   artGames: "imagine-that",   artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 45, artGym: "book-4",        artGames: "doodle-dash",    artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 46, artGym: "ext-book",       artGames: "match-me",       artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 47, artGym: "cue-card-b2",    artGames: "colour-flip",    artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0 },
  { sessionNumber: 48, artGym: "ext-cue-card",   artGames: "shape-stitch",   artiverse: "review", artiverseUnit: 0, artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 49, artGym: "book-4",        artGames: "flex",           artiverse: "review",    artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0, isFlex: true },
  { sessionNumber: 50, artGym: "ext-book",       artGames: "flex",           artiverse: "review",    artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "free making · revisit any technique from earlier", topicLayer: 0, isFlex: true },
];

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Makes marks freely but without intention.",
        developing: "Uses different line types occasionally with intention.",
        secure: "Uses different line types intentionally.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Draws shapes only when prompted.",
        developing: "Begins to combine shapes.",
        secure: "Combines two shapes to make something recognisable.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Uses colours without decision-making.",
        developing: "Chooses a colour because they want it.",
        secure: "Picks a colour and can say why.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Draws in a small area of the page.",
        developing: "Begins to fill more of the page.",
        secure: "Fills the whole page.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Experiments only when prompted.",
        developing: "Experiments freely with colours and marks.",
        secure: "Experiments freely and makes deliberate choices.",
      },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Line types present but not varied.",
        developing: "Begins to use repeated marks.",
        secure: "Uses repeated marks to build texture.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Shapes drawn but not combined.",
        developing: "Overlaps two shapes to build a subject.",
        secure: "Combines and overlaps shapes deliberately.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Colour mixing results accidental.",
        developing: "Notices when a mix works and tries to repeat.",
        secure: "Identifies warm and cool colours and makes deliberate choice.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Things placed randomly on page.",
        developing: "Begins to think about placement.",
        secure: "Uses foreground and background in at least one piece.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Ideas are conventional.",
        developing: "Makes at least one unexpected choice.",
        secure: "Generates original ideas.",
      },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Marks are confident but not yet controlled for texture.",
        developing: "Beginning to use marks to suggest texture.",
        secure: "Uses different marks deliberately to create texture.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Shapes are recognisable but not yet combined with variety.",
        developing: "Modifies shapes to create new forms.",
        secure: "Combines and modifies shapes creatively.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Colour use is confident but not yet expressive.",
        developing: "Uses colour to express feeling in at least one piece.",
        secure: "Uses warm and cool colour families expressively.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Composition not yet considered.",
        developing: "Uses foreground and background.",
        secure: "Draws overlapping shapes to show depth. Describes one specific decision about placement.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Ideas are conventional.",
        developing: "Says one thing about their own work.",
        secure: "Describes one specific decision they made.",
      },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Line work is steady but predictable.",
        developing: "Varies line intentionally across mediums.",
        secure: "Uses observed line and texture in drawing.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Shape use is adequate but not yet creative.",
        developing: "Combines shapes in unexpected ways.",
        secure: "Builds complex subjects from shapes deliberately.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Mixing is adequate but not yet controlled.",
        developing: "Creates tints and shades.",
        secure: "Uses tints, shades, and colour families with control.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Composition is present but not yet balanced.",
        developing: "Places objects with visual weight in mind.",
        secure: "Understands how colour and shape placement create balance.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Ideas conventional.",
        developing: "Makes unexpected choices.",
        secure: "Describes imagined subject before starting and follows through.",
      },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Individual skills developing but not working together.",
        developing: "Two skills work together in at least one piece.",
        secure: "Uses line, shape, and colour together with intention.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Individual skills developing but not working together.",
        developing: "Two skills work together in at least one piece.",
        secure: "Uses line, shape, and colour together with intention.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Individual skills developing but not working together.",
        developing: "Two skills work together in at least one piece.",
        secure: "Uses line, shape, and colour together with intention.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Compositional thinking emerging.",
        developing: "Things placed deliberately.",
        secure: "Work shows compositional thinking throughout.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Generates ideas but doesn't extend.",
        developing: "Extends ideas across sessions.",
        secure: "Chooses combination of tools that serves the marks.",
      },
    ],
  },
  {
    afterSession: 48,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference.",
        secure: "Uses all five skill areas together.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference.",
        secure: "Uses all five skill areas together.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference.",
        secure: "Uses all five skill areas together.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference.",
        secure: "Uses all five skill areas together.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Consistent willing maker.",
        developing: "Shows personal preference.",
        secure: "Makes choices independently. Talks about own work specifically.",
      },
    ],
  },
];

// ─── Programme export ───────────────────────────────────────

export const artDesign58: CurriculumProgramme = {
  id: "art-design-5-8",
  slug: "art-design-5-8",
  title: "art and design",
  category: "art",
  heroImageUrl: "/prog-art-5-8.gif",
  ageGroup: "5-8",
  ageLabel: "ages 5\u20138",
  tagline:
    "explore materials and techniques while building core artistic skills.",
  description:
    "builds line control, shape-making, colour mixing, composition, and imagination — through hands-on making across seven mediums.",
  totalSessions: 50,
  skillAreas: [
    {
      id: "lt",
      name: "Line & Texture",
      shortName: "L&T",
      abilities: [
        "Identifies marks different tools make",
        "Makes different line types with intention",
        "Combines line types to create texture",
        "Draws using observed line and texture",
      ],
    },
    {
      id: "sf",
      name: "Shape & Form",
      shortName: "S&F",
      abilities: [
        "Traces and draws basic 2D shapes",
        "Combines shapes to draw recognisable objects",
        "Modifies and combines shapes creatively",
        "Identifies and draws simple 3D forms",
      ],
    },
    {
      id: "cp",
      name: "Colour & Painting",
      shortName: "C&P",
      abilities: [
        "Paints with control and early mixing",
        "Mixes primary to secondary reliably",
        "Identifies warm and cool families",
        "Creates tints and shades",
      ],
    },
    {
      id: "bc",
      name: "Balance & Composition",
      shortName: "B&C",
      abilities: [
        "Fills whole page",
        "Understands foreground/background",
        "Draws overlapping for depth and horizon line",
        "Understands colour/shape placement for balance",
      ],
    },
    {
      id: "ic",
      name: "Imagination & Collaboration",
      shortName: "I&C",
      abilities: [
        "Experiments freely",
        "Generates unusual ideas",
        "Listens/contributes/decides together",
        "Describes imagined world with enough detail",
      ],
    },
  ],
  segmentDefinitions: [
    // Two-segment daily flow: Art Games + Gym (combined) → Artiverse
    // (the making block, longest slot) → Experience Book.
    // Total session = 25 + 55 + 10 = 90 min.
    // The laminated art-gym book pages and cue-card prompts are folded
    // into this combined segment as part of the rotation pool — they are
    // played as games, not as a separate segment. No scribble book and
    // no "extension" follow-on day at this age.
    {
      id: "art-games",
      name: "Art Games + Gym",
      durationRange: "25 min · 1–2 games per day",
      objective:
        "Build art skills through games. The teacher picks 1–2 games per session from the combined pool — art games and the laminated art-gym book pages and cue-card prompts. They are all played as games (no separate art-gym segment, no extension-day follow-on, no scribble book). Each game has its own debrief; the segment closes once 1 or 2 games are done.",
      type: "rotating",
      // Pool: 9 art games plus 2 art-gym entries (book + cue card). The
      // art-gym entries are real activities — see artGymActivities below
      // — so the daily plan shows them when the session table assigns
      // one. They are played as games here, not as a separate segment.
      rotationPool: [
        "match-me", "colour-flip", "shape-stitch", "shape-fusion",
        "cue-cards-game", "i-spy-i-make", "artventure", "imagine-that", "doodle-dash",
        "art-gym-book", "art-gym-cue-card",
      ],
    },
    {
      id: "artiverse",
      name: "Artiverse",
      durationRange: "55 min",
      objective:
        "Children make on A3 paper. Teacher reads brief and steps back. Artwork goes home. Time runs 55 min so the artwork is the centre of the session. Each unit runs 2 days per artwork — Day 1 sets up the piece, Day 2 completes and refines it. After all 18 units finish, leftover calendar sessions become free-making days where children revisit any earlier technique.",
      type: "fixed",
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "Children fill in \"what happened in class today\" with the teacher, who opens a short discussion: favourite part? What you enjoyed? What you didn't? What to do again? Every child speaks. After children leave, the teacher fills in the skill-assessment part privately. These daily notes compile into the monthly report card that goes home.",
      type: "fixed",
    },
  ],
  sessionTable,
  activities: {
    ...artGamesActivities,
  },
  checkpoints,
  artiverseUnits,
  trialSession: ART_TRIAL_SESSION_5_8,
};
