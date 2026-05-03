import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  ArtiverseUnit,
} from "@/content/types";
import { ART_TRIAL_SESSION } from "./art-design-trial";

// ─── Artiverse units (25 units, 50 sessions) ────────────────

const PLACEHOLDER = "/artiverse/placeholder.svg";

const artiverseUnits: ArtiverseUnit[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    medium: "Brush pen",
    technique: "Line exploration — making many different types of lines freely, discovering what the tool can do",
    whatChildrenMake: "Trees or cats",
    days: 1,
    abilitiesCovered: [
      "Identifies the marks different tools make and experiments freely",
      "Experiments freely with colours, materials, and marks",
    ],
    topicOptions: [
      "A tree I see every day",
      "A cat in a position I have watched",
      "A creature made entirely of lines I invented",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-1.png",
  },
  {
    id: "unit-2",
    unitNumber: 2,
    medium: "Colour pencil",
    technique: "Shape + composition — combining shapes to fill the whole page with a subject",
    whatChildrenMake: "Flowers",
    days: 2,
    abilitiesCovered: [
      "Traces and draws basic 2D shapes using any medium",
      "Combines shapes to draw recognisable objects",
      "Fills the whole page rather than drawing only in the centre",
    ],
    topicOptions: [
      "A flower I know",
      "A flower I have seen up close",
      "A flower I made up that has never existed",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-2.png",
  },
  {
    id: "unit-3",
    unitNumber: 3,
    medium: "Brush pen",
    technique: "Line flow — continuous flowing marks, using the brush pen to make deliberately varied line types",
    whatChildrenMake: "Waves",
    days: 2,
    abilitiesCovered: [
      "Makes different line types with intention — straight, wavy, zigzag, curved",
      "Combines line types to create texture",
    ],
    topicOptions: [
      "A sea or river I know",
      "The sea on a calm day and a stormy day",
      "A wave in a world where water moves differently",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-3.png",
  },
  {
    id: "unit-4",
    unitNumber: 4,
    medium: "Tempera",
    technique: "Fingerprinting — pressing thumb and fingers into paint and onto paper, exploring what each finger makes",
    whatChildrenMake: "Thumbprint art",
    days: 1,
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
    id: "unit-5",
    unitNumber: 5,
    medium: "Brush pen",
    technique: "Observation + structure — looking carefully at a subject and building its form with shapes and lines",
    whatChildrenMake: "Self portrait",
    days: 2,
    abilitiesCovered: [
      "Combines shapes to draw recognisable objects",
      "Draws objects and scenes using observed line and texture",
      "Generates new and unusual ideas",
    ],
    topicOptions: [
      "My face right now",
      "My face doing one specific expression",
      "A portrait of who I want to be",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-5.png",
  },
  {
    id: "unit-6",
    unitNumber: 6,
    medium: "Oil pastel",
    technique: "Bold fill — pressing firmly to fill shapes with strong, rich colour",
    whatChildrenMake: "Food",
    days: 1,
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
    unitNumber: 7,
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
    unitNumber: 8,
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
    unitNumber: 9,
    medium: "Oil pastel",
    technique: "Shape + texture — building up a shape using marks that describe its surface and texture",
    whatChildrenMake: "Animals",
    days: 1,
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
    id: "unit-10",
    unitNumber: 10,
    medium: "Colour pencil",
    technique: "Scene drawing — placing objects near and far in a full picture, using size to show distance",
    whatChildrenMake: "Sea world",
    days: 2,
    abilitiesCovered: [
      "Understands foreground (close, bigger) and background (far, smaller)",
      "Understands how colour and shape placement create visual balance",
    ],
    topicOptions: [
      "An underwater scene with creatures I know",
      "An underwater scene from a depth I imagine",
      "An underwater world that does not follow any rules",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-10.png",
  },
  {
    id: "unit-11",
    unitNumber: 11,
    medium: "Brush pen",
    technique: "Form + illusion — drawing flat shapes so they appear three-dimensional on the page",
    whatChildrenMake: "3D drawing",
    days: 1,
    abilitiesCovered: [
      "Identifies and begins to draw simple 3D forms",
    ],
    topicOptions: [
      "A box or cube I can see",
      "A stack of objects on the art table",
      "A 3D shape I made up",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-11.png",
  },
  {
    id: "unit-12",
    unitNumber: 12,
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
    unitNumber: 13,
    medium: "Watercolour + collage",
    technique: "Painted paper — painting large sheets, then tearing and layering to build an image (Eric Carle style)",
    whatChildrenMake: "Eric Carle collage",
    days: 3,
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
    unitNumber: 14,
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
    unitNumber: 15,
    medium: "Mixed media",
    technique: "Composition + imagination — arranging shapes and colour to build a world (Paul Klee style)",
    whatChildrenMake: "Paul Klee imaginary world",
    days: 3,
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
    unitNumber: 16,
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
    unitNumber: 17,
    medium: "Mixed media",
    technique: "Story composition — building a scene with deliberate size contrast between close and far elements",
    whatChildrenMake: "Big fruit and ants",
    days: 3,
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
    unitNumber: 18,
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
    unitNumber: 19,
    medium: "Acrylic paint",
    technique: "Colour blocking — filling areas of the page with flat, bold, deliberate colour",
    whatChildrenMake: "Rainbow art",
    days: 3,
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
    unitNumber: 20,
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
    unitNumber: 21,
    medium: "Acrylic paint",
    technique: "Collage + paint — combining cut paper shapes with painted detail to build a layered composition",
    whatChildrenMake: "Lemons and oranges",
    days: 4,
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
    unitNumber: 22,
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
    unitNumber: 23,
    medium: "Mixed media",
    technique: "Construction + imagination — building a complex subject from multiple materials with deliberate choices",
    whatChildrenMake: "Robots",
    days: 3,
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
    id: "unit-24",
    unitNumber: 24,
    medium: "Brush pen + single accent colour",
    technique: "Black and white with single colour accent — bold marks in black brush pen on white paper, then one deliberate accent colour added as a highlight or focal point",
    whatChildrenMake: "Black and white accent art",
    days: 2,
    abilitiesCovered: [
      "Makes different line types with intention — straight, wavy, zigzag, curved",
      "Draws objects and scenes using observed line and texture",
      "Paints with reasonable control and makes early attempts at mixing",
    ],
    topicOptions: [
      "A jungle or forest in black and white with one coloured creature",
      "A busy city in black and white with one coloured window or light",
      "An imagined creature in black and white with one glowing colour",
    ],
    heroImageUrl: "/artiverse/art-5-8/unit-24.png",
  },
  {
    id: "unit-25",
    unitNumber: 25,
    medium: "Acrylic paint on black paper",
    technique: "Painting with light — working on a dark ground, building from dark to light using white and light colours to create a glowing effect",
    whatChildrenMake: "Firefly in a jar · Dragonfly",
    days: 3,
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
};

// ─── Session Table ──────────────────────────────────────────

const sessionTable: CurriculumSessionEntry[] = [
  { sessionNumber: 0,  artGym: "book-3",        artGames: "match-me",       artiverse: "unit-1",  artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "trial session — art gym + extension combined, match me, poster paints flat colour simple animals", topicLayer: 0 },
  { sessionNumber: 1,  artGym: "book-3",        artGames: "match-me",       artiverse: "unit-1",  artiverseUnit: 1,  artiverseDay: 1, artiverseUnitName: "poster paints — flat colour — simple animals", topicLayer: 0 },
  { sessionNumber: 2,  artGym: "ext-book",       artGames: "colour-flip",    artiverse: "unit-1",  artiverseUnit: 1,  artiverseDay: 2, artiverseUnitName: "poster paints — flat colour — simple animals", topicLayer: 0 },
  { sessionNumber: 3,  artGym: "cue-card-b1",    artGames: "shape-stitch",   artiverse: "unit-2",  artiverseUnit: 2,  artiverseDay: 1, artiverseUnitName: "poster paints — colour mixing — warm or cool world", topicLayer: 0 },
  { sessionNumber: 4,  artGym: "ext-cue-card",   artGames: "shape-fusion",   artiverse: "unit-2",  artiverseUnit: 2,  artiverseDay: 2, artiverseUnitName: "poster paints — colour mixing — warm or cool world", topicLayer: 0 },
  { sessionNumber: 5,  artGym: "book-3",        artGames: "cue-cards-game", artiverse: "unit-2",  artiverseUnit: 2,  artiverseDay: 3, artiverseUnitName: "poster paints — colour mixing — warm or cool world", topicLayer: 0 },
  { sessionNumber: 6,  artGym: "ext-book",       artGames: "i-spy-i-make",   artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 1, artiverseUnitName: "torn paper collage — tearing — big and small", topicLayer: 0 },
  { sessionNumber: 7,  artGym: "cue-card-b1",    artGames: "artventure",     artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 2, artiverseUnitName: "torn paper collage — tearing — big and small", topicLayer: 0 },
  { sessionNumber: 8,  artGym: "ext-cue-card",   artGames: "imagine-that",   artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 3, artiverseUnitName: "torn paper collage — tearing — big and small", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 9,  artGym: "book-3",        artGames: "doodle-dash",    artiverse: "unit-4",  artiverseUnit: 4,  artiverseDay: 1, artiverseUnitName: "wax crayons — pressing hard and soft", topicLayer: 0 },
  { sessionNumber: 10, artGym: "ext-book",       artGames: "match-me",       artiverse: "unit-4",  artiverseUnit: 4,  artiverseDay: 2, artiverseUnitName: "wax crayons — pressing hard and soft", topicLayer: 0 },
  { sessionNumber: 11, artGym: "cue-card-b1",    artGames: "colour-flip",    artiverse: "unit-5",  artiverseUnit: 5,  artiverseDay: 1, artiverseUnitName: "soft pastels — smudging — big open spaces", topicLayer: 0 },
  { sessionNumber: 12, artGym: "ext-cue-card",   artGames: "shape-stitch",   artiverse: "unit-5",  artiverseUnit: 5,  artiverseDay: 2, artiverseUnitName: "soft pastels — smudging — big open spaces", topicLayer: 0 },
  { sessionNumber: 13, artGym: "book-3",        artGames: "shape-fusion",   artiverse: "unit-6",  artiverseUnit: 6,  artiverseDay: 1, artiverseUnitName: "brush pens — thick and thin — busy place", topicLayer: 0 },
  { sessionNumber: 14, artGym: "ext-book",       artGames: "cue-cards-game", artiverse: "unit-6",  artiverseUnit: 6,  artiverseDay: 2, artiverseUnitName: "brush pens — thick and thin — busy place", topicLayer: 0 },
  { sessionNumber: 15, artGym: "cue-card-b1",    artGames: "i-spy-i-make",   artiverse: "unit-7",  artiverseUnit: 7,  artiverseDay: 1, artiverseUnitName: "oil pastels — layering — close-up", topicLayer: 0 },
  { sessionNumber: 16, artGym: "ext-cue-card",   artGames: "artventure",     artiverse: "unit-7",  artiverseUnit: 7,  artiverseDay: 2, artiverseUnitName: "oil pastels — layering — close-up", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 17, artGym: "book-3",        artGames: "imagine-that",   artiverse: "unit-7",  artiverseUnit: 7,  artiverseDay: 3, artiverseUnitName: "oil pastels — layering — close-up", topicLayer: 0 },
  { sessionNumber: 18, artGym: "ext-book",       artGames: "doodle-dash",    artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 1, artiverseUnitName: "poster paints — near and far", topicLayer: 0 },
  { sessionNumber: 19, artGym: "cue-card-b1",    artGames: "match-me",       artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 2, artiverseUnitName: "poster paints — near and far", topicLayer: 0 },
  { sessionNumber: 20, artGym: "ext-cue-card",   artGames: "colour-flip",    artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 3, artiverseUnitName: "poster paints — near and far", topicLayer: 0 },
  { sessionNumber: 21, artGym: "book-3",        artGames: "shape-stitch",   artiverse: "unit-9",  artiverseUnit: 9,  artiverseDay: 1, artiverseUnitName: "watercolours — wet-on-wet", topicLayer: 0 },
  { sessionNumber: 22, artGym: "ext-book",       artGames: "shape-fusion",   artiverse: "unit-9",  artiverseUnit: 9,  artiverseDay: 2, artiverseUnitName: "watercolours — wet-on-wet", topicLayer: 0 },
  { sessionNumber: 23, artGym: "cue-card-b1",    artGames: "cue-cards-game", artiverse: "unit-9",  artiverseUnit: 9,  artiverseDay: 3, artiverseUnitName: "watercolours — wet-on-wet", topicLayer: 0 },
  { sessionNumber: 24, artGym: "ext-cue-card",   artGames: "i-spy-i-make",   artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 1, artiverseUnitName: "brush pens — pattern — covered in pattern", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 25, artGym: "book-3",        artGames: "artventure",     artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 2, artiverseUnitName: "brush pens — pattern — covered in pattern", topicLayer: 0 },
  { sessionNumber: 26, artGym: "ext-book",       artGames: "imagine-that",   artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 3, artiverseUnitName: "brush pens — pattern — covered in pattern", topicLayer: 0 },
  { sessionNumber: 27, artGym: "cue-card-b2",    artGames: "doodle-dash",    artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 1, artiverseUnitName: "colour pencils — hatching", topicLayer: 0 },
  { sessionNumber: 28, artGym: "ext-cue-card",   artGames: "match-me",       artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 2, artiverseUnitName: "colour pencils — hatching", topicLayer: 0 },
  { sessionNumber: 29, artGym: "book-4",        artGames: "colour-flip",    artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 3, artiverseUnitName: "colour pencils — hatching", topicLayer: 0 },
  { sessionNumber: 30, artGym: "ext-book",       artGames: "shape-stitch",   artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 1, artiverseUnitName: "wax crayon + watercolour — resist — night-time", topicLayer: 0 },
  { sessionNumber: 31, artGym: "cue-card-b2",    artGames: "shape-fusion",   artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 2, artiverseUnitName: "wax crayon + watercolour — resist — night-time", topicLayer: 0 },
  { sessionNumber: 32, artGym: "ext-cue-card",   artGames: "cue-cards-game", artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 3, artiverseUnitName: "wax crayon + watercolour — resist — night-time", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 33, artGym: "book-4",        artGames: "i-spy-i-make",   artiverse: "unit-13", artiverseUnit: 13, artiverseDay: 1, artiverseUnitName: "torn paper collage — three layers — landscapes", topicLayer: 0 },
  { sessionNumber: 34, artGym: "ext-book",       artGames: "artventure",     artiverse: "unit-13", artiverseUnit: 13, artiverseDay: 2, artiverseUnitName: "torn paper collage — three layers — landscapes", topicLayer: 0 },
  { sessionNumber: 35, artGym: "cue-card-b2",    artGames: "imagine-that",   artiverse: "unit-13", artiverseUnit: 13, artiverseDay: 3, artiverseUnitName: "torn paper collage — three layers — landscapes", topicLayer: 0 },
  { sessionNumber: 36, artGym: "ext-cue-card",   artGames: "doodle-dash",    artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 1, artiverseUnitName: "oil pastels — colour blending — faces", topicLayer: 0 },
  { sessionNumber: 37, artGym: "book-4",        artGames: "match-me",       artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 2, artiverseUnitName: "oil pastels — colour blending — faces", topicLayer: 0 },
  { sessionNumber: 38, artGym: "ext-book",       artGames: "colour-flip",    artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 3, artiverseUnitName: "oil pastels — colour blending — faces", topicLayer: 0 },
  { sessionNumber: 39, artGym: "cue-card-b2",    artGames: "shape-stitch",   artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 4, artiverseUnitName: "oil pastels — colour blending — faces", topicLayer: 0 },
  { sessionNumber: 40, artGym: "ext-cue-card",   artGames: "shape-fusion",   artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 1, artiverseUnitName: "poster paints + brush pens — imaginary worlds", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 41, artGym: "book-4",        artGames: "cue-cards-game", artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 2, artiverseUnitName: "poster paints + brush pens — imaginary worlds", topicLayer: 0 },
  { sessionNumber: 42, artGym: "ext-book",       artGames: "i-spy-i-make",   artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 3, artiverseUnitName: "poster paints + brush pens — imaginary worlds", topicLayer: 0 },
  { sessionNumber: 43, artGym: "cue-card-b2",    artGames: "artventure",     artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 1, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0 },
  { sessionNumber: 44, artGym: "ext-cue-card",   artGames: "imagine-that",   artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 2, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0 },
  { sessionNumber: 45, artGym: "book-4",        artGames: "doodle-dash",    artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 3, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0 },
  { sessionNumber: 46, artGym: "ext-book",       artGames: "match-me",       artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 4, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0 },
  { sessionNumber: 47, artGym: "cue-card-b2",    artGames: "colour-flip",    artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 5, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0 },
  { sessionNumber: 48, artGym: "ext-cue-card",   artGames: "shape-stitch",   artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 6, artiverseUnitName: "mixed media — combining — a place that matters", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 49, artGym: "book-4",        artGames: "flex",           artiverse: "flex",    artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "flex — child returns to any unit", topicLayer: 0, isFlex: true },
  { sessionNumber: 50, artGym: "ext-book",       artGames: "flex",           artiverse: "flex",    artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "flex — child picks any medium", topicLayer: 0, isFlex: true },
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
    "explore mediums and techniques in art and take your first step towards building artistic abilities.",
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
    {
      id: "art-gym",
      name: "Art Gym",
      durationRange: "15–20 min",
      objective:
        "4-session cycle: book → extension(book) → cue card → extension(cue card). each extension day follows directly from the preceding book or cue card day. art gym books are laminated — children mark them with resources of choice: thread, clay, sequins, or erasable markers. every book day children do 1–3 pages, then replicate what they drew in their sketchbook freely with materials of choice (crayons, colour pencils, brush pens, yarn + glue, etc.). on extension days children apply the same lines onto simple daily objects or shapes — progression goes shape → simple object → imaginary object → scene.",
      type: "rotating",
      rotationPool: ["book", "extension-book", "cue-card", "extension-cue-card"],
    },
    {
      id: "art-games",
      name: "Art Games",
      durationRange: "15–20 min",
      objective: "build one art skill through a game. debrief closes.",
      type: "rotating",
      rotationPool: [
        "match-me", "colour-flip", "shape-stitch", "shape-fusion",
        "cue-cards-game", "i-spy-i-make", "artventure", "imagine-that", "doodle-dash",
      ],
    },
    {
      id: "artiverse",
      name: "Artiverse",
      durationRange: "40–45 min",
      objective: "children make on a3 paper. teacher reads brief and steps back. artwork goes home.",
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
  trialSession: ART_TRIAL_SESSION,
};
