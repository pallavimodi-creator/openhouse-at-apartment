import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
  ArtiverseUnit,
} from "@/content/types";
import { ART_TRIAL_SESSION } from "./art-design-trial";

// ─── Artiverse units (18 units, 50 sessions) ────────────────

const PLACEHOLDER = "/artiverse/placeholder.svg";

const artiverseUnits: ArtiverseUnit[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    medium: "Oil pastels",
    technique: "Bold shapes, controlled filling — pressing firmly, filling shapes with deliberate colour, no blending between shapes",
    whatChildrenMake: "Tomato Composition",
    days: 2,
    abilitiesCovered: [
      "Uses different line types intentionally and with control",
      "Combines shapes to draw subjects with recognisable proportions",
      "Mixes primary and secondary colours to produce tertiary colours reliably",
      "Uses size and placement to create visual balance",
    ],
    topicOptions: [
      "A tomato I set up and look at",
      "Any fruit or vegetable I can see right now",
      "An invented edible thing with bold saturated colour",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-1.png",
  },
  {
    id: "unit-2",
    unitNumber: 2,
    medium: "Colour pencils",
    technique: "Expressive lines, simple proportions — using gestural confident lines to capture figures without overthinking proportion",
    whatChildrenMake: "Doodle Human Figures",
    days: 2,
    abilitiesCovered: [
      "Uses different line types intentionally and with control",
      "Combines shapes to draw subjects with recognisable proportions",
      "Creates detailed drawings from imagination — moves beyond the first obvious idea",
    ],
    topicOptions: [
      "A person doing something I saw today",
      "A figure caught mid-movement",
      "A figure doing something physically impossible",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-2.png",
  },
  {
    id: "unit-3",
    unitNumber: 3,
    medium: "Colour pencils",
    technique: "Observation + layering — looking closely and building up colour through careful repeated passes",
    whatChildrenMake: "Citrus Slices",
    days: 3,
    abilitiesCovered: [
      "Observes and draws textures from real objects",
      "Observes proportions carefully and adjusts rather than accepting first marks",
      "Uses layering to create gradients, highlights, and shadows",
      "Uses size and placement to create visual balance",
    ],
    topicOptions: [
      "A citrus fruit sliced in half that I set up",
      "Any cut fruit I can observe closely",
      "A cross-section of an invented fruit",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-3.png",
  },
  {
    id: "unit-4",
    unitNumber: 4,
    medium: "Watercolour",
    technique: "Light washes, colour placement — working with clean transparent washes and deliberate colour relationships",
    whatChildrenMake: "Flowers",
    days: 2,
    abilitiesCovered: [
      "Mixes primary and secondary colours to produce tertiary colours reliably",
      "Uses colour to show depth — warm advances, cool recedes",
      "Uses size and placement to create visual balance",
    ],
    topicOptions: [
      "A flower I can see up close",
      "A bouquet or arrangement of flowers",
      "An invented flower with unusual colour relationships",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-4.png",
  },
  {
    id: "unit-5",
    unitNumber: 5,
    medium: "Watercolour",
    technique: "Wash + stencil + collage layering — combining three separate techniques in one piece to build surface and depth",
    whatChildrenMake: "Orange Study",
    days: 3,
    abilitiesCovered: [
      "Observes and draws textures from real objects",
      "Uses layering to create gradients, highlights, and shadows",
      "Uses size and placement to create visual balance",
      "Combines materials and techniques intentionally within one artwork",
    ],
    topicOptions: [
      "A single orange I set up and observe",
      "A cluster of oranges or citrus in a still life",
      "An invented citrus form studied as carefully as a real thing",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-5.png",
  },
  {
    id: "unit-6",
    unitNumber: 6,
    medium: "Acrylic paint",
    technique: "Finger painting, movement — using hands to create gestural moving marks that feel alive",
    whatChildrenMake: "Abstract Waves",
    days: 2,
    abilitiesCovered: [
      "Uses different line types intentionally and with control",
      "Mixes primary and secondary colours to produce tertiary colours reliably",
      "Creates detailed drawings from imagination — moves beyond the first obvious idea",
    ],
    topicOptions: [
      "The movement of water I have seen",
      "The feeling of wind or motion expressed in abstract form",
      "An emotion expressed as movement and colour",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-6.png",
  },
  {
    id: "unit-7",
    unitNumber: 7,
    medium: "Acrylic paint",
    technique: "Flat fill, colour blocking — laying clean, deliberate areas of colour with clear edges between them",
    whatChildrenMake: "Donut Painting",
    days: 2,
    abilitiesCovered: [
      "Combines shapes to draw subjects with recognisable proportions",
      "Mixes primary and secondary colours to produce tertiary colours reliably",
      "Uses size and placement to create visual balance",
    ],
    topicOptions: [
      "A donut or pastry I set up and observe",
      "Any circular food with pattern and colour",
      "An invented food designed purely for colour and shape",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-7.png",
  },
  {
    id: "unit-8",
    unitNumber: 8,
    medium: "Watercolour",
    technique: "Paint + collage composition — combining flat painted shapes to build a scene (Paul Klee study)",
    whatChildrenMake: "Paul Klee City",
    days: 3,
    abilitiesCovered: [
      "Creates complex compositions with accurate forms that hold together as a whole",
      "Creates compositions with foreground, middle ground, and background placed with intention",
      "Combines materials and techniques intentionally within one artwork",
      "Makes intentional artistic choices and can articulate why they made each one",
    ],
    topicOptions: [
      "A city built from geometric shapes and colour",
      "A neighbourhood simplified to flat shapes",
      "An invented city where everything is coloured rectangles",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-8.png",
  },
  {
    id: "unit-9",
    unitNumber: 9,
    medium: "Watercolour",
    technique: "Monochrome tonal work — exploring a subject across a full value range in one colour family (Warhol study)",
    whatChildrenMake: "Warhol-style Cats",
    days: 2,
    abilitiesCovered: [
      "Uses layering to create gradients, highlights, and shadows",
      "Chooses and justifies a palette to create a specific mood",
      "Uses contrast to draw the viewer's eye to the focal point",
    ],
    topicOptions: [
      "A cat or animal rendered in monochrome",
      "Any animal studied in a single colour family",
      "An invented creature explored from lightest to darkest in one colour",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-9.png",
  },
  {
    id: "unit-10",
    unitNumber: 10,
    medium: "Acrylic paint",
    technique: "Layering, tonal build-up — building a painting in layers from dark to light, each layer adding volume and detail",
    whatChildrenMake: "Pomegranate Study",
    days: 4,
    abilitiesCovered: [
      "Observes and draws textures from real objects",
      "Observes proportions carefully and adjusts rather than accepting first marks",
      "Uses layering to create gradients, highlights, and shadows",
      "Creates compositions with foreground, middle ground, and background placed with intention",
    ],
    topicOptions: [
      "A pomegranate or complex fruit I set up",
      "Any natural object I can look at closely",
      "An invented natural object studied as carefully as a real thing",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-10.png",
  },
  {
    id: "unit-11",
    unitNumber: 11,
    medium: "Oil pastels",
    technique: "Layering, tonal build up — creating scenes",
    whatChildrenMake: "Scenery",
    days: 3,
    abilitiesCovered: [
      "Uses different line types intentionally and with control",
      "Creates multi-layered artworks where texture is a deliberate compositional choice",
      "Uses contrast to draw the viewer's eye to the focal point",
    ],
    topicOptions: [
      "A landscape scene I can see or remember",
      "A layered scene with distinct foreground and background",
      "An invented landscape with dramatic lighting",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-11.png",
  },
  {
    id: "unit-12",
    unitNumber: 12,
    medium: "Colour pencils",
    technique: "Observation, texture shading — looking at a complex surface and translating it into layered marks",
    whatChildrenMake: "Bird Study",
    days: 3,
    abilitiesCovered: [
      "Observes and draws textures from real objects",
      "Uses hatching, cross-hatching, and stippling to build texture that reads clearly",
      "Observes proportions carefully and adjusts rather than accepting first marks",
    ],
    topicOptions: [
      "A bird I can observe — from life or a clear reference",
      "A bird from a natural history illustration",
      "A bird I invented, drawn with the same careful observation as a real one",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-12.png",
  },
  {
    id: "unit-13",
    unitNumber: 13,
    medium: "Black paper + white pencil",
    technique: "Contrast, fine texture — working light on dark to reveal intricate natural form (Haeckel inspired)",
    whatChildrenMake: "Coral",
    days: 2,
    abilitiesCovered: [
      "Uses hatching, cross-hatching, and stippling to build texture that reads clearly",
      "Creates multi-layered artworks where texture is a deliberate compositional choice",
      "Uses contrast to draw the viewer's eye to the focal point",
    ],
    topicOptions: [
      "A coral or sea creature studied in light on dark",
      "Any natural structure with intricate branching or repeating detail",
      "An invented underwater or alien organism",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-13.png",
  },
  {
    id: "unit-14",
    unitNumber: 14,
    medium: "Oil pastels",
    technique: "Expressive blending — using bold directional marks to create movement and mood (Starry Night inspired)",
    whatChildrenMake: "Starry Night",
    days: 3,
    abilitiesCovered: [
      "Uses layering to create gradients, highlights, and shadows",
      "Chooses and justifies a palette to create a specific mood",
      "Makes intentional artistic choices and can articulate why they made each one",
    ],
    topicOptions: [
      "A night sky I have looked at or remember",
      "A view through a window at night",
      "A night scene from a world with different stars",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-14.png",
  },
  {
    id: "unit-15",
    unitNumber: 15,
    medium: "Oil pastels",
    technique: "Light, shadow, 3D form — understanding how one light source creates volume through graduated tone",
    whatChildrenMake: "3D Cube Study",
    days: 3,
    abilitiesCovered: [
      "Identifies and draws basic 3D forms — cube, cylinder, cone",
      "Uses layering to create gradients, highlights, and shadows",
      "Uses overlap, spacing, and simple perspective to show depth convincingly",
    ],
    topicOptions: [
      "A box or cube I set up with one light source",
      "A group of geometric objects with clear light and shadow",
      "An invented geometric form with imagined lighting",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-15.png",
  },
  {
    id: "unit-16",
    unitNumber: 16,
    medium: "Mixed media",
    technique: "Pattern + composition + personalisation — building a portrait using bold graphic pattern (Romero Britto inspired)",
    whatChildrenMake: "Self Portrait",
    days: 4,
    abilitiesCovered: [
      "Creates complex compositions with accurate forms that hold together as a whole",
      "Chooses and justifies a palette to create a specific mood",
      "Uses contrast to draw the viewer's eye to the focal point",
      "Combines materials and techniques intentionally within one artwork",
      "Makes intentional artistic choices and can articulate why they made each one",
    ],
    topicOptions: [
      "A self-portrait using pattern and bold colour",
      "A portrait of someone I know in this style",
      "A portrait of an invented person in this style",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-16.png",
  },
  {
    id: "unit-17",
    unitNumber: 17,
    medium: "Mixed media",
    technique: "Spatial composition — combining materials to build a scene with clear depth and scale across the page",
    whatChildrenMake: "Reach the Sky",
    days: 3,
    abilitiesCovered: [
      "Creates complex compositions with accurate forms that hold together as a whole",
      "Creates compositions with foreground, middle ground, and background placed with intention",
      "Uses overlap, spacing, and simple perspective to show depth convincingly",
      "Creates detailed drawings from imagination — moves beyond the first obvious idea",
      "Makes intentional artistic choices and can articulate why they made each one",
    ],
    topicOptions: [
      "A city with something reaching upward",
      "A landscape with a tall natural or built structure",
      "An invented world where everything strives to reach something",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-17.png",
  },
  {
    id: "unit-18",
    unitNumber: 18,
    medium: "Chalk pastels",
    technique: "Layering, blending, atmosphere — building luminous colour through pressure and blending across large areas",
    whatChildrenMake: "Aurora Landscape",
    days: 4,
    abilitiesCovered: [
      "Creates multi-layered artworks where texture is a deliberate compositional choice",
      "Uses layering to create gradients, highlights, and shadows",
      "Uses colour to show depth — warm advances, cool recedes",
      "Uses contrast to draw the viewer's eye to the focal point",
    ],
    topicOptions: [
      "An aurora or atmospheric sky I have seen or imagined",
      "A sky at a specific time of day with layered colour",
      "An invented sky on a planet with different atmospheric colours",
    ],
    heroImageUrl: "/artiverse/art-8-12/unit-18.png",
  },
];

// ─── Activities ─────────────────────────────────────────────

const artGamesActivities: Record<string, CurriculumActivity> = {
  "i-spot": {
    id: "i-spot",
    segment: "art-games",
    title: "i spot tool/medium",
    setupLine:
      "look at this finished artwork. name the tool or medium used. what specific mark tells you?",
    howToPlay:
      "Teacher shows image card of finished artwork. Children examine and name the tool/medium. Group discusses. Teacher confirms and names the mark characteristic.",
    variations: [
      {
        name: "Variation — Making",
        description:
          "After guessing, children make the drawing using the identified tool or medium.",
      },
    ],
    materials: [
      "Image cards showing finished artworks (A5, laminated)",
      "Drawing paper",
      "Pencils, crayons, and the identified tools/mediums",
    ],
    difficultyLevels: [
      { level: "Easy", description: "identify tool or medium only." },
      { level: "Medium", description: "use that tool or medium to replicate the drawing." },
      { level: "Hard", description: "use the tool or medium to draw creatively." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "cue-cards-game": {
    id: "cue-cards-game",
    segment: "art-games",
    title: "cue cards",
    setupLine:
      "follow step-by-step drawing instructions. then complete the extension challenge.",
    howToPlay:
      "Card placed centrally. Follow step-by-step. At 8-12, educator always adds extension challenge after completion — e.g. 'change angle by 45 degrees' or 'redraw at twice the scale.' Portrait and Landscape card sets available.",
    materials: [
      "Cue Card sets B1 and B2 including Portrait and Landscape",
      "Drawing paper",
      "Fine-line pens or pencils",
    ],
    difficultyLevels: [
      { level: "Easy", description: "B1 cards, visible throughout." },
      { level: "Medium", description: "B1 or B2, educator names one thing to observe." },
      { level: "Hard", description: "B2 card shown for a minute then removed, drawn from memory. Extension required." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "shape-fusion": {
    id: "shape-fusion",
    segment: "art-games",
    title: "shape fusion",
    setupLine:
      "build with transparent geometric pieces — either silently for your team to guess, or from a teacher cue, then sketch it capturing proportions and negative space.",
    howToPlay:
      "Two ways to play — see variations.",
    variations: [
      {
        name: "Variation 1 — Build and guess",
        description:
          "Each child builds a subject from geometric pieces silently while their team guesses what it is. Child's choice: the child picks which subject they want to create from the Shape Card and the other children guess. Relay / race: the group splits into teams and the teams compete to make the most subjects — whichever team finishes a card, or a set number of cards, first wins.",
      },
      {
        name: "Variation 2 — Composition from cues",
        description:
          "Each child builds a composition from transparent geometric pieces based on teacher cues (for example: teacher says \"build a composition with one dominant shape supported by two smaller ones\"). After building, sketch the arrangement on paper capturing proportions and negative space. Compare sketch to tile arrangement.",
      },
    ],
    materials: [
      "Two sets of 60 transparent geometric pieces",
      "Shape Cards B1 and B2",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Variation 1 — build and guess." },
      { level: "Medium", description: "Variation 2 — standard gameplay." },
      { level: "Hard", description: "The opposite team chooses specific geometric shapes to be used, or gives cues instead of the teacher." },
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
      "roll the dice, move your token, land on an art zone, draw a challenge card (draw, colour, build or mixed media), and complete it within the time limit. after completing the challenge, child gives one sentence explaining one decision they made.",
    howToPlay:
      "Set up board game. Roll dice, move, land on an art zone. Draw a challenge card (draw, colour, build or mixed media) and complete it within the time limit. After completing the challenge, the child gives one sentence explaining one decision they made.",
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
  "colour-flip": {
    id: "colour-flip",
    segment: "art-games",
    title: "colour flip",
    setupLine:
      "56 colour cards face-down. flip two. matching colour = keep the pair. most pairs wins.",
    howToPlay:
      "Children take turns flipping two cards. Match = keep pair. No match = flip back. Variation 2: each child has a Difficult Mixing Card primary and flips to find formula colours. Palette Build variation: educator names mood/time of day, children select 3-4 cards as palette.",
    materials: [
      "56 Colour Cards",
      "Easy Mixing Cards (14)",
      "Medium Mixing Cards (14)",
      "Difficult Mixing Cards (28)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "colour recognition only." },
      { level: "Medium", description: "Difficult cards." },
      { level: "Hard", description: "Palette Build, child names colour and explains behaviour in painting." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

// ─── Session Table ──────────────────────────────────────────

const sessionTable: CurriculumSessionEntry[] = [
  { sessionNumber: 0,  artGym: "book-5",        artGames: "i-spot",         artiverse: "unit-1",  artiverseUnit: 0,  artiverseDay: 0, artiverseUnitName: "trial session — art gym + extension combined, i spot tool/medium, oil pastels bold shapes tomato composition", topicLayer: 0 },
  { sessionNumber: 1,  artGym: "book-5",        artGames: "i-spot",         artiverse: "unit-1",  artiverseUnit: 1,  artiverseDay: 1, artiverseUnitName: "oil pastels — tomato composition", topicLayer: 0 },
  { sessionNumber: 2,  artGym: "ext-book",      artGames: "imagine-that",   artiverse: "unit-1",  artiverseUnit: 1,  artiverseDay: 2, artiverseUnitName: "oil pastels — tomato composition", topicLayer: 0 },
  { sessionNumber: 3,  artGym: "cue-card-b2",   artGames: "cue-cards-game", artiverse: "unit-2",  artiverseUnit: 2,  artiverseDay: 1, artiverseUnitName: "colour pencils — doodle human figures", topicLayer: 0 },
  { sessionNumber: 4,  artGym: "ext-cue-card",  artGames: "shape-fusion",   artiverse: "unit-2",  artiverseUnit: 2,  artiverseDay: 2, artiverseUnitName: "colour pencils — doodle human figures", topicLayer: 0 },
  { sessionNumber: 5,  artGym: "book-5",        artGames: "i-spy-i-make",   artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 1, artiverseUnitName: "colour pencils — citrus slices", topicLayer: 0 },
  { sessionNumber: 6,  artGym: "ext-book",      artGames: "artventure",     artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 2, artiverseUnitName: "colour pencils — citrus slices", topicLayer: 0 },
  { sessionNumber: 7,  artGym: "cue-card-b1",   artGames: "imagine-that",   artiverse: "unit-3",  artiverseUnit: 3,  artiverseDay: 3, artiverseUnitName: "colour pencils — citrus slices", topicLayer: 0 },
  { sessionNumber: 8,  artGym: "ext-cue-card",  artGames: "doodle-dash",    artiverse: "unit-4",  artiverseUnit: 4,  artiverseDay: 1, artiverseUnitName: "watercolour — flowers", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 9,  artGym: "book-5",        artGames: "colour-flip",    artiverse: "unit-4",  artiverseUnit: 4,  artiverseDay: 2, artiverseUnitName: "watercolour — flowers", topicLayer: 0 },
  { sessionNumber: 10, artGym: "ext-book",      artGames: "i-spot",         artiverse: "unit-5",  artiverseUnit: 5,  artiverseDay: 1, artiverseUnitName: "watercolour — orange study", topicLayer: 0 },
  { sessionNumber: 11, artGym: "cue-card-b2",   artGames: "artventure",     artiverse: "unit-5",  artiverseUnit: 5,  artiverseDay: 2, artiverseUnitName: "watercolour — orange study", topicLayer: 0 },
  { sessionNumber: 12, artGym: "ext-cue-card",  artGames: "cue-cards-game", artiverse: "unit-5",  artiverseUnit: 5,  artiverseDay: 3, artiverseUnitName: "watercolour — orange study", topicLayer: 0 },
  { sessionNumber: 13, artGym: "book-5",        artGames: "shape-fusion",   artiverse: "unit-6",  artiverseUnit: 6,  artiverseDay: 1, artiverseUnitName: "acrylic paint — abstract waves", topicLayer: 0 },
  { sessionNumber: 14, artGym: "ext-book",      artGames: "i-spy-i-make",   artiverse: "unit-6",  artiverseUnit: 6,  artiverseDay: 2, artiverseUnitName: "acrylic paint — abstract waves", topicLayer: 0 },
  { sessionNumber: 15, artGym: "cue-card-b1",   artGames: "artventure",     artiverse: "unit-7",  artiverseUnit: 7,  artiverseDay: 1, artiverseUnitName: "acrylic paint — donut painting", topicLayer: 0 },
  { sessionNumber: 16, artGym: "ext-cue-card",  artGames: "imagine-that",   artiverse: "unit-7",  artiverseUnit: 7,  artiverseDay: 2, artiverseUnitName: "acrylic paint — donut painting", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 17, artGym: "book-5",        artGames: "doodle-dash",    artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 1, artiverseUnitName: "watercolour — paul klee city", topicLayer: 0 },
  { sessionNumber: 18, artGym: "ext-book",      artGames: "colour-flip",    artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 2, artiverseUnitName: "watercolour — paul klee city", topicLayer: 0 },
  { sessionNumber: 19, artGym: "cue-card-b2",   artGames: "i-spot",         artiverse: "unit-8",  artiverseUnit: 8,  artiverseDay: 3, artiverseUnitName: "watercolour — paul klee city", topicLayer: 0 },
  { sessionNumber: 20, artGym: "ext-cue-card",  artGames: "doodle-dash",    artiverse: "unit-9",  artiverseUnit: 9,  artiverseDay: 1, artiverseUnitName: "watercolour — warhol-style cats", topicLayer: 0 },
  { sessionNumber: 21, artGym: "book-5",        artGames: "cue-cards-game", artiverse: "unit-9",  artiverseUnit: 9,  artiverseDay: 2, artiverseUnitName: "watercolour — warhol-style cats", topicLayer: 0 },
  { sessionNumber: 22, artGym: "ext-book",      artGames: "shape-fusion",   artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 1, artiverseUnitName: "acrylic paint — pomegranate study", topicLayer: 0 },
  { sessionNumber: 23, artGym: "cue-card-b2",   artGames: "i-spy-i-make",   artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 2, artiverseUnitName: "acrylic paint — pomegranate study", topicLayer: 0 },
  { sessionNumber: 24, artGym: "ext-cue-card",  artGames: "artventure",     artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 3, artiverseUnitName: "acrylic paint — pomegranate study", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 25, artGym: "book-5",        artGames: "imagine-that",   artiverse: "unit-10", artiverseUnit: 10, artiverseDay: 4, artiverseUnitName: "acrylic paint — pomegranate study", topicLayer: 0 },
  { sessionNumber: 26, artGym: "ext-book",      artGames: "doodle-dash",    artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 1, artiverseUnitName: "oil pastels — scenery", topicLayer: 0 },
  { sessionNumber: 27, artGym: "cue-card-b2",   artGames: "colour-flip",    artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 2, artiverseUnitName: "oil pastels — scenery", topicLayer: 0 },
  { sessionNumber: 28, artGym: "ext-cue-card",  artGames: "i-spot",         artiverse: "unit-11", artiverseUnit: 11, artiverseDay: 3, artiverseUnitName: "oil pastels — scenery", topicLayer: 0 },
  { sessionNumber: 29, artGym: "book-6",        artGames: "colour-flip",    artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 1, artiverseUnitName: "colour pencils — bird study", topicLayer: 0 },
  { sessionNumber: 30, artGym: "ext-book",      artGames: "cue-cards-game", artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 2, artiverseUnitName: "colour pencils — bird study", topicLayer: 0 },
  { sessionNumber: 31, artGym: "cue-card-b2",   artGames: "shape-fusion",   artiverse: "unit-12", artiverseUnit: 12, artiverseDay: 3, artiverseUnitName: "colour pencils — bird study", topicLayer: 0 },
  { sessionNumber: 32, artGym: "ext-cue-card",  artGames: "i-spy-i-make",   artiverse: "unit-13", artiverseUnit: 13, artiverseDay: 1, artiverseUnitName: "black paper + white pencil — coral", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 33, artGym: "book-6",        artGames: "artventure",     artiverse: "unit-13", artiverseUnit: 13, artiverseDay: 2, artiverseUnitName: "black paper + white pencil — coral", topicLayer: 0 },
  { sessionNumber: 34, artGym: "ext-book",      artGames: "imagine-that",   artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 1, artiverseUnitName: "oil pastels — starry night", topicLayer: 0 },
  { sessionNumber: 35, artGym: "cue-card-b2",   artGames: "doodle-dash",    artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 2, artiverseUnitName: "oil pastels — starry night", topicLayer: 0 },
  { sessionNumber: 36, artGym: "ext-cue-card",  artGames: "colour-flip",    artiverse: "unit-14", artiverseUnit: 14, artiverseDay: 3, artiverseUnitName: "oil pastels — starry night", topicLayer: 0 },
  { sessionNumber: 37, artGym: "book-6",        artGames: "i-spot",         artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 1, artiverseUnitName: "oil pastels — 3d cube study", topicLayer: 0 },
  { sessionNumber: 38, artGym: "ext-book",      artGames: "imagine-that",   artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 2, artiverseUnitName: "oil pastels — 3d cube study", topicLayer: 0 },
  { sessionNumber: 39, artGym: "cue-card-b2",   artGames: "cue-cards-game", artiverse: "unit-15", artiverseUnit: 15, artiverseDay: 3, artiverseUnitName: "oil pastels — 3d cube study", topicLayer: 0 },
  { sessionNumber: 40, artGym: "ext-cue-card",  artGames: "shape-fusion",   artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 1, artiverseUnitName: "mixed media — self portrait", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 41, artGym: "book-6",        artGames: "i-spy-i-make",   artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 2, artiverseUnitName: "mixed media — self portrait", topicLayer: 0 },
  { sessionNumber: 42, artGym: "ext-book",      artGames: "artventure",     artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 3, artiverseUnitName: "mixed media — self portrait", topicLayer: 0 },
  { sessionNumber: 43, artGym: "cue-card-b2",   artGames: "imagine-that",   artiverse: "unit-16", artiverseUnit: 16, artiverseDay: 4, artiverseUnitName: "mixed media — self portrait", topicLayer: 0 },
  { sessionNumber: 44, artGym: "ext-cue-card",  artGames: "doodle-dash",    artiverse: "unit-17", artiverseUnit: 17, artiverseDay: 1, artiverseUnitName: "mixed media — reach the sky", topicLayer: 0 },
  { sessionNumber: 45, artGym: "book-6",        artGames: "colour-flip",    artiverse: "unit-17", artiverseUnit: 17, artiverseDay: 2, artiverseUnitName: "mixed media — reach the sky", topicLayer: 0 },
  { sessionNumber: 46, artGym: "ext-book",      artGames: "i-spot",         artiverse: "unit-17", artiverseUnit: 17, artiverseDay: 3, artiverseUnitName: "mixed media — reach the sky", topicLayer: 0 },
  { sessionNumber: 47, artGym: "cue-card-b2",   artGames: "doodle-dash",    artiverse: "unit-18", artiverseUnit: 18, artiverseDay: 1, artiverseUnitName: "chalk pastels — aurora landscape", topicLayer: 0 },
  { sessionNumber: 48, artGym: "ext-cue-card",  artGames: "cue-cards-game", artiverse: "unit-18", artiverseUnit: 18, artiverseDay: 2, artiverseUnitName: "chalk pastels — aurora landscape", topicLayer: 0, isCheckpoint: true },
  { sessionNumber: 49, artGym: "book-6",        artGames: "shape-fusion",   artiverse: "unit-18", artiverseUnit: 18, artiverseDay: 3, artiverseUnitName: "chalk pastels — aurora landscape", topicLayer: 0 },
  { sessionNumber: 50, artGym: "ext-book",      artGames: "i-spy-i-make",   artiverse: "unit-18", artiverseUnit: 18, artiverseDay: 4, artiverseUnitName: "chalk pastels — aurora landscape", topicLayer: 0 },
];

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Makes marks freely but without control over line type.",
        developing: "Uses different line types with some control.",
        secure: "Uses different line types with control.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Draws shapes but not yet 3D forms.",
        developing: "Begins to identify basic 3D forms.",
        secure: "Identifies and draws basic 3D forms.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Mixes colours but results are unpredictable.",
        developing: "Mixes to produce some tertiary colours.",
        secure: "Mixes to produce tertiary colours.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Places elements without considering balance.",
        developing: "Begins to use size and placement for balance.",
        secure: "Uses size and placement for visual balance.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Draws from imagination with limited detail.",
        developing: "Creates drawings from imagination with some detail.",
        secure: "Creates detailed drawings from imagination.",
      },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Line types present but textures not yet observed.",
        developing: "Begins to observe and draw textures from real objects.",
        secure: "Observes and draws textures from real objects.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "3D forms drawn but proportions inconsistent.",
        developing: "Combines shapes with some recognisable proportions.",
        secure: "Combines shapes with recognisable proportions.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Layering attempted but not yet effective.",
        developing: "Uses layering for some gradients or highlights.",
        secure: "Uses layering for gradients/highlights/shadows.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Foreground/background not yet distinct.",
        developing: "Creates foreground and background with some intention.",
        secure: "Creates foreground/middle ground/background with intention.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Combines materials but not yet intentionally.",
        developing: "Begins to combine materials and techniques with some intention.",
        secure: "Combines materials and techniques intentionally.",
      },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Hatching attempted but not yet controlled.",
        developing: "Uses hatching or cross-hatching with some control.",
        secure: "Uses hatching/cross-hatching/stippling to build texture.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Proportions approximate but not yet observed.",
        developing: "Begins to observe proportions and adjust.",
        secure: "Observes proportions and adjusts.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Colour use confident but depth not yet shown.",
        developing: "Begins to use colour to show depth.",
        secure: "Uses colour to show depth (warm advances cool recedes).",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Depth attempted but not yet convincing.",
        developing: "Uses overlap or spacing for some depth.",
        secure: "Uses overlap/spacing/perspective for depth.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Works with others but avoids creative differences.",
        developing: "Begins to work through creative differences.",
        secure: "Works with others on creative differences.",
      },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Texture techniques present but not yet layered.",
        developing: "Begins to create multi-layered artworks with texture.",
        secure: "Creates multi-layered artworks where texture is a compositional choice.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Forms accurate but compositions simple.",
        developing: "Begins to create complex compositions.",
        secure: "Creates complex compositions with accurate forms.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Palette choices intuitive but not yet justified.",
        developing: "Begins to choose a palette for specific mood.",
        secure: "Chooses and justifies a palette for specific mood.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Focal point not yet established.",
        developing: "Begins to use contrast to draw eye.",
        secure: "Uses contrast to draw eye to focal point.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Makes choices but cannot yet articulate why.",
        developing: "Begins to articulate some choices.",
        secure: "Makes intentional choices and articulates why.",
      },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Individual skills developing but not yet integrated.",
        developing: "Two or more texture skills work together in at least one piece.",
        secure: "Uses line, texture, and layering together with intention.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Individual skills developing but not yet integrated.",
        developing: "Two or more form skills work together in at least one piece.",
        secure: "Uses form, proportion, and composition together with intention.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Individual skills developing but not yet integrated.",
        developing: "Two or more colour skills work together in at least one piece.",
        secure: "Uses colour mixing, layering, and palette together with intention.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Compositional thinking emerging but inconsistent.",
        developing: "Compositional decisions are deliberate in at least one piece.",
        secure: "Work shows compositional thinking throughout.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Generates ideas but doesn't extend them.",
        developing: "Extends ideas across sessions.",
        secure: "Chooses combination of tools and techniques that serves the vision.",
      },
    ],
  },
  {
    afterSession: 48,
    descriptors: [
      {
        skillArea: "Line & Texture",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference and control.",
        secure: "Uses all five skill areas together. Line and texture choices are deliberate.",
      },
      {
        skillArea: "Shape & Form",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference and control.",
        secure: "Uses all five skill areas together. Form and proportion choices are deliberate.",
      },
      {
        skillArea: "Colour & Painting",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference and control.",
        secure: "Uses all five skill areas together. Colour choices are deliberate and justified.",
      },
      {
        skillArea: "Balance & Composition",
        beginning: "Consistent maker. Needs prompts to extend.",
        developing: "Makes confidently across all mediums. Shows preference and control.",
        secure: "Uses all five skill areas together. Compositional decisions are intentional.",
      },
      {
        skillArea: "Imagination & Collaboration",
        beginning: "Consistent willing maker.",
        developing: "Shows personal voice and preference.",
        secure: "Makes choices independently. Talks about own work with specificity and intention.",
      },
    ],
  },
];

// ─── Programme export ───────────────────────────────────────

export const artDesign812: CurriculumProgramme = {
  id: "art-design-8-12",
  slug: "art-design-8-12",
  title: "art and design",
  category: "art",
  heroImageUrl: "/prog-art-8-12.gif",
  ageGroup: "8-12",
  ageLabel: "ages 8\u201312",
  tagline:
    "build real & advanced artistic skill and acumen.",
  description:
    "builds observation, proportion, layering, palette, and intentional choice \u2014 across multiple mediums, with children able to explain the thinking behind their work.",
  totalSessions: 50,
  skillAreas: [
    {
      id: "lt",
      name: "Line & Texture",
      shortName: "L&T",
      abilities: [
        "Uses different line types with control",
        "Observes and draws textures from real objects",
        "Uses hatching/cross-hatching/stippling to build texture",
        "Creates multi-layered artworks where texture is a compositional choice",
      ],
    },
    {
      id: "sf",
      name: "Shape & Form",
      shortName: "S&F",
      abilities: [
        "Identifies and draws basic 3D forms",
        "Combines shapes with recognisable proportions",
        "Observes proportions and adjusts",
        "Creates complex compositions with accurate forms",
      ],
    },
    {
      id: "cp",
      name: "Colour & Painting",
      shortName: "C&P",
      abilities: [
        "Mixes to produce tertiary colours",
        "Uses layering for gradients/highlights/shadows",
        "Uses colour to show depth (warm advances cool recedes)",
        "Chooses and justifies a palette for specific mood",
      ],
    },
    {
      id: "bc",
      name: "Balance & Composition",
      shortName: "B&C",
      abilities: [
        "Uses size and placement for visual balance",
        "Creates foreground/middle ground/background with intention",
        "Uses overlap/spacing/perspective for depth",
        "Uses contrast to draw eye to focal point",
      ],
    },
    {
      id: "ic",
      name: "Imagination & Collaboration",
      shortName: "I&C",
      abilities: [
        "Creates detailed drawings from imagination",
        "Combines materials and techniques intentionally",
        "Works with others on creative differences",
        "Makes intentional choices and articulates why",
      ],
    },
  ],
  segmentDefinitions: [
    {
      id: "art-gym",
      name: "Art Gym",
      durationRange: "15–20 min",
      objective:
        "4-session cycle: book → extension(book) → cue card → extension(cue card). each extension day follows directly from the preceding book or cue card day. educator always adds extension challenge after cue card steps. art gym books are laminated — children mark them with resources of choice: thread, clay, sequins, or erasable markers.",
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
        "i-spot", "cue-cards-game", "shape-fusion",
        "i-spy-i-make", "artventure", "imagine-that", "doodle-dash", "colour-flip",
      ],
    },
    {
      id: "artiverse",
      name: "Artiverse",
      durationRange: "40–45 min",
      objective: "children make on a3 paper. 3-minute thumbnail before each new piece. teacher reads brief and steps back. artwork goes home.",
      type: "fixed",
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective: "one-sentence share (60 sec). child fills in log book with teacher's help. book goes home.",
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
