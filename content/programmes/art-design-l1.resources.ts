import type { Resource } from "../types";

// All resources for Art & Design Level 1.
// Content is lifted verbatim from the approved source document.
// No invented resources. No filler. Each record maps 1:1 to the doc.

const PROG = "art-design-l1";

export const artDesignL1Resources: Resource[] = [
  // ─────────────────────────────────────────────────────────────
  // ART GYM RESOURCES
  // ─────────────────────────────────────────────────────────────
  {
    id: "art-gym-book-1",
    programmeId: PROG,
    type: "art-gym",
    title: "art gym · book 1",
    subtitle: "Art Gym · L&T",
    description:
      "A consumable exercise book that builds hand control through line-following and pattern-completion. Children work through it page by page, 1–3 pages per session.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 10,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Art Gym Level 3 Book", "Erasable markers"],
    skillNote:
      "Skill — L&T: Following lines and completing patterns trains children to make controlled, deliberate marks — foundational to intentional mark-making.",
    steps: [
      "Child opens the book to their current page.",
      "Child chooses one of the five formats to work with.",
      "Child works through 1–3 pages, always moving forward.",
      "Educator circulates and names what they see. No correction. No instruction.",
    ],
    variations: [
      {
        id: "markers",
        name: "Markers",
        description: "Draws directly on the page · can wipe and retry.",
      },
      {
        id: "play-doh",
        name: "Play-Doh",
        description:
          "Rolls or shapes Play-Doh to match the line or pattern · placed beside the book.",
      },
      {
        id: "thread",
        name: "Thread",
        description: "Lays thread along the printed lines or shapes.",
      },
      {
        id: "sequins",
        name: "Sequins",
        description: "Places sequins to trace the pattern or line edge.",
      },
      {
        id: "sand",
        name: "Sand",
        description:
          "Traces the line or pattern from the book in a small sand tray beside it.",
      },
    ],
    tips: [
      "Child chooses the format freely — the educator does not assign a material.",
      "Always moves forward through the book, never back.",
    ],
    digitalAssets: [],
  },
  {
    id: "art-gym-book-2",
    programmeId: PROG,
    type: "art-gym",
    title: "art gym · book 2",
    subtitle: "Art Gym · L&T",
    description:
      "A consumable exercise book that builds hand control through dot-connection and more complex pattern completion. Used when Book 1 is complete.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 10,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Art Gym Level 4 Book", "Erasable markers"],
    skillNote:
      "Skill — L&T: Children work between printed anchor points rather than along a continuous guide — each mark is a decision, not a trace.",
    variations: [
      {
        id: "markers",
        name: "Markers",
        description: "Draws directly on the page · can wipe and retry.",
      },
      { id: "play-doh", name: "Play-Doh", description: "Rolls or shapes Play-Doh to match." },
      { id: "thread", name: "Thread", description: "Lays thread along the printed lines." },
      { id: "sequins", name: "Sequins", description: "Places sequins to trace the pattern." },
      { id: "sand", name: "Sand", description: "Traces the pattern in a sand tray." },
    ],
    tips: ["Same five formats as Book 1.", "Child chooses freely. Always moves forward."],
    digitalAssets: [],
  },
  {
    id: "scribble-book",
    programmeId: PROG,
    type: "art-gym",
    title: "scribble book",
    subtitle: "Art Gym · I&E",
    description:
      "A programme-designed consumable book with 30 illustrated pages. Each page shows a partially complete scene with an open space for the child to complete. One prompt sentence at the bottom of each page.",
    ageGroup: "3-5",
    skills: ["I&E"],
    durationMinutes: 10,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "programme-designed",
    components: [
      "Scribble Book (A4 portrait · 30 pages · spiral-bound at top · 160gsm cartridge · 350gsm printed board cover)",
      "Crayons",
      "Markers",
      "Pencils",
    ],
    skillNote:
      "Skill — I&E: Every prompt invites the child to decide what to draw. There is no correct response. This is the primary source of I&E development in the Art Gym segment.",
    steps: [
      "Child opens to their current page.",
      "Child reads the prompt at the bottom (or has it read to them).",
      "Child draws their response in the open space on the page.",
      "The educator does not instruct what to draw — the prompt on the page is the instruction.",
    ],
    tips: [
      "Pages follow a consistent style: hand-drawn ink lines, selective watercolour wash on 1–3 elements, white space as the drawing invitation.",
      "Example pages: Monster's Mouth · The Empty Plate · The Fishbowl · The Bird's Nest · The Open Bag · The Birthday Cake · The Bare Tree · The Window · The Pond · Flower Stems.",
    ],
    digitalAssets: [],
  },

  // ─────────────────────────────────────────────────────────────
  // ARTGAMES
  // ─────────────────────────────────────────────────────────────
  {
    id: "match-me",
    programmeId: PROG,
    type: "artgame",
    title: "match me",
    subtitle: "ArtGames · C&P",
    description:
      "A colour recognition and matching game. Children match coloured beads to the correct grid squares using pattern cards.",
    ageGroup: "3-5",
    skills: ["C&P"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Grid template", "Coloured beads (assorted)", "Pattern cards", "Timer"],
    skillNote:
      "Skill — C&P: Identifying, comparing, and matching colours accurately — building attentive colour recognition.",
    variations: [
      {
        id: "colour-match",
        name: "Variation 1 — Colour Match",
        description:
          "Pattern cards placed face-up on the grid. Children pick beads from a shared pool and place each on the matching grid square. Complete when all squares have a matching bead. All children play simultaneously on their own grid.",
      },
      {
        id: "pattern-memory",
        name: "Variation 2 — Pattern Memory",
        description:
          "Cards placed face-down in a grid. Children take turns flipping two cards. Matching colour pair — child keeps them. No match — both face-down again. Complete when all pairs are found.",
      },
      {
        id: "speed-match",
        name: "Variation 3 — Speed Match",
        description:
          "Same as Variation 1 with a timer running. Children race to fill their grid correctly before time is called.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Finish line", "Timing"],
        description:
          "Educator reduces the card spread to 8–10 cards. No timer.",
      },
      {
        level: "medium",
        mechanism: ["Finish line"],
        description: "Full grid. No timer. Child works independently.",
      },
      {
        level: "hard",
        mechanism: ["Timing"],
        description:
          "Full grid with timer. In Variation 2, child has 5 seconds from touching the first card to decide.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "shape-stitch",
    programmeId: PROG,
    type: "artgame",
    title: "shape stitch",
    subtitle: "ArtGames · S&F",
    description:
      "A stitching game where children sew through templates using shoelaces, learning progressively more complex stitch types.",
    ageGroup: "3-5",
    skills: ["S&F"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Sewing templates (shapes and outlines)", "Shoelaces"],
    skillNote:
      "Skill — S&F: Tracking a shape's boundary through stitching builds physical and visual understanding of how a shape is defined.",
    variations: [
      {
        id: "running-stitch",
        name: "Variation 1 — Running Stitch",
        description:
          "Alternating in-out stitch creating a dashed line. Used along simple paths and shape outlines.",
        ageMin: 3,
      },
      {
        id: "whip-stitch",
        name: "Variation 2 — Whip Stitch",
        description:
          "Shoelace wraps over the template edge in a loop — creates a neat wrapped border around a shape.",
        ageMin: 3,
      },
      {
        id: "backstitch",
        name: "Variation 3 — Backstitch or Chain Stitch",
        description:
          "Backstitch creates a continuous joined line. Chain stitch creates a linked loop at each hole. Used on more complex outlines.",
        ageMin: 4,
      },
      {
        id: "double-stitch",
        name: "Variation 4 — Double Stitch",
        description:
          "Same hole stitched twice. Used to join two parts of a template together.",
        ageMin: 4,
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Scaffolding"],
        description:
          "Running Stitch on a simple shape with large holes. Educator demonstrates first two stitches.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description:
          "Running Stitch or Whip Stitch on a standard template. No demonstration.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty"],
        description:
          "Backstitch, Chain, or Double Stitch on a complex template. No indicated starting point.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "stitch-me",
    programmeId: PROG,
    type: "artgame",
    title: "stitch me",
    subtitle: "ArtGames · L&T",
    description:
      "A bead-sequencing and threading game. Children solve riddles or follow prompt cards to find the correct beads and thread them in order.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: [
      "Beads (assorted colours and shapes)",
      "Number and shape templates",
      "Shoelaces",
    ],
    skillNote:
      "Skill — L&T: Creating repeating bead sequences is physical pattern-making — a line built mark by mark in the correct order.",
    variations: [
      {
        id: "colour-pattern",
        name: "Variation 1 — Colour and Pattern Stitching",
        description:
          "Educator gives a prompt card showing a colour pattern (e.g. red · yellow · red · yellow). Child threads the correct beads in sequence. Complete when the full pattern is threaded.",
      },
      {
        id: "number-colour",
        name: "Variation 2 — Number and Colour Stitching",
        description:
          "Prompt card shows a combined colour and number sequence (e.g. blue 1, yellow 2, orange 3). Child threads beads and number templates in order.",
      },
      {
        id: "riddle",
        name: "Variation 3 — Riddle Stitching",
        description:
          "Educator reads riddles aloud one at a time (e.g. 'I am as red as a strawberry'). Child listens, finds the correct bead, and threads it. Educator reads the next riddle when all children have threaded their current bead.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Scaffolding"],
        description:
          "Variation 1 with short two-element patterns. Educator places the first bead in the child's hand.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description: "Variation 1 or 2. Child reads the prompt card independently.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty", "Scaffolding"],
        description:
          "Variation 3. Harder riddles used. Child holds the answer in memory while retrieving the bead.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "magna-tiles",
    programmeId: PROG,
    type: "artgame",
    title: "magna tiles",
    subtitle: "ArtGames · S&F",
    description:
      "A building game where children construct objects and structures using Magna-Tiles guided by prompt flashcards at five levels of complexity.",
    ageGroup: "3-5",
    skills: ["S&F"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "Magna-Tiles (variety of shapes and colours)",
      "Prompt flashcards — Level 1 (2D flat shapes + tile count)",
      "Level 2 (2D double-layered + tile count)",
      "Level 3 (border and tile-count challenge)",
      "Level 4 (3D structure)",
      "Level 5 (open-ended challenge)",
    ],
    skillNote:
      "Skill — S&F: Translating a visual image into a physical construction — identifying shapes, understanding how they connect, and organising them spatially.",
    variations: [
      {
        id: "match-build",
        name: "Variation 1 — Match and Build",
        description:
          "Educator shows a Level 1 or 2 card. Children recreate it flat on the floor using Magna-Tiles. Tile count shown on the card. Complete when the build matches the image.",
      },
      {
        id: "fill-frame",
        name: "Variation 2 — Fill the Frame",
        description:
          "Educator shows a Level 3 card showing only an outline and a tile count. Children use exactly that number of tiles to fill the frame. No fixed image to copy — children problem-solve the arrangement.",
      },
      {
        id: "free-build",
        name: "Variation 3 — Free Build",
        description:
          "Educator reads a Level 5 open-ended challenge aloud (e.g. 'Build something that can stand on its own'). Children build freely. Complete when each child can name and describe what they built.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Finish line"],
        description:
          "Level 1 cards only. Tile count not required to match exactly. Educator may place the first tile.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description: "Level 1 and 2 cards. Tile count matched. Image recognisably replicated.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty", "Finish line", "Timing"],
        description:
          "Level 3, 4, or 5 cards. Build must be stable. Child explains one decision they made. Timing may be added: 3-minute limit.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "i-spy-i-make",
    programmeId: PROG,
    type: "artgame",
    title: "i spy i make",
    subtitle: "ArtGames · I&E",
    description:
      "A game where children spot an object on a mat and then draw it.",
    ageGroup: "3-5",
    skills: ["I&E"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Object mat", "Drawing paper", "Pencils and crayons"],
    skillNote:
      "Skill — I&E: Looking carefully then turning an observation into a mark — one of the earliest forms of imaginative expression.",
    variations: [
      {
        id: "spy-draw",
        name: "Variation 1 — Spy and Draw",
        description:
          "Mat in the centre. Educator says 'I spy a [name].' All children find it and draw it simultaneously. New object named after most children have finished.",
      },
      {
        id: "spy-remember-draw",
        name: "Variation 2 — Spy, Remember, and Draw",
        description:
          "Mat shown for 30 seconds, then turned face-down. Educator names an object. Children draw from memory. Mat revealed for comparison after.",
      },
      {
        id: "spy-tell",
        name: "Variation 3 — Spy and Tell",
        description:
          "Educator says 'I spy something that is [colour / shape / texture].' Children decide which object fits and draw what they think it is. Multiple correct answers welcomed.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Finish line", "Scaffolding"],
        description:
          "Direct, clear object name. Finish line: basic shape — one or two marks. Educator may point to the object first.",
      },
      {
        level: "medium",
        mechanism: ["Finish line"],
        description:
          "Standard. Mat visible. Child draws as much detail as they choose.",
      },
      {
        level: "hard",
        mechanism: ["Finish line", "Prompt difficulty"],
        description:
          "Variation 2 — mat removed. Finish line raised: one identifying detail added. Or Variation 3 with a more abstract description.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "miniartventure",
    programmeId: PROG,
    type: "artgame",
    title: "miniartventure",
    subtitle: "ArtGames · I&E",
    description:
      "A board game where children roll, move, land on a zone, draw a challenge card, and complete the art challenge in 2 minutes.",
    ageGroup: "3-5",
    skills: ["I&E"],
    durationMinutes: 20,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "Game board",
      "Player tokens",
      "Challenge cards (Draw ×15 · Colour ×15 · Mold ×15 · Build ×15)",
      "Fortune cards ×10",
      "Dice",
      "Reward tokens",
      "Art zone materials",
    ],
    skillNote:
      "Skill — I&E: Surprise landings and a time limit train children to begin immediately and commit to a making decision — core habits of imaginative expression.",
    variations: [
      {
        id: "individual",
        name: "Variation 1 — Individual Play",
        description:
          "Each child has their own token. They roll, move, draw a zone challenge card, and complete it independently within 2 minutes. Reward token given on completion.",
      },
      {
        id: "cooperative",
        name: "Variation 2 — Cooperative Play",
        description:
          "Group plays as one team. One child rolls for all. Whole group goes to the landed zone and completes the challenge collaboratively.",
      },
      {
        id: "zone-sprint",
        name: "Variation 3 — Zone Sprint",
        description:
          "No board or dice. Educator calls a zone name. All children draw a card from that zone and complete it simultaneously within 2 minutes. New zone called when the round ends.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Timing"],
        description:
          "Draw and Colour zone cards only. Timer extended to 3 minutes. Educator names one thing the card could mean before the timer starts.",
      },
      {
        level: "medium",
        mechanism: ["Timing"],
        description:
          "All four zones in play. Standard 2-minute timer. Children begin immediately on hearing the card.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty", "Timing"],
        description:
          "All four zones. Timer reduced to 90 seconds. Fortune cards shuffled into zone decks — child responds to the Fortune card before beginning their art challenge.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "i-spot-texture",
    programmeId: PROG,
    type: "artgame",
    title: "i spot texture",
    subtitle: "ArtGames · L&T",
    description:
      "A texture recognition game. Children look at 24 image cards showing real-world objects and surfaces, and identify, sort, or draw different textures.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "programme-designed",
    components: [
      "24 texture cards — 12 textures × 2 real-world manifestations each",
      "rough: tree bark + cracked earth",
      "smooth: marble + glass",
      "bumpy: bubble wrap + cobblestones",
      "spiky: cactus + hedgehog",
      "soft: cloud + sheep",
      "hard: brick + rocks",
      "crinkly: scrunched paper + corrugated card",
      "fluffy: dandelion + cotton ball",
      "grainy: sand + brown sugar",
      "shiny: foil + mirror",
      "matte: wood grain + chalk",
      "sticky: honey + tape",
    ],
    skillNote:
      "Skill — L&T: Seeing and naming the visual and tactile qualities of surfaces — foundational to understanding that different marks create different textures.",
    variations: [
      {
        id: "texture-match",
        name: "Variation 1 — Texture Match",
        description:
          "All 24 cards spread face-up. Educator calls a texture name. Children race to find and tap both cards showing that texture. After each round, educator names one thing in the room with that texture.",
      },
      {
        id: "texture-sort",
        name: "Variation 2 — Texture Sort",
        description:
          "Children sort all 24 cards into two groups (rough / smooth · hard / soft · bumpy / flat). Group discusses disagreements. Re-sort with a new category.",
      },
      {
        id: "texture-draw",
        name: "Variation 3 — Texture Draw",
        description:
          "One card shown face-up for 30 seconds, then turned face-down. Children draw the texture — not the object, just the surface quality — using pencils or crayons. Card revealed and compared.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Scaffolding", "Timing"],
        description:
          "In Variation 1, educator gives a clue before calling the texture name. Card stays visible during drawing in Variation 3.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description: "Standard play in any variation. No clues.",
      },
      {
        level: "hard",
        mechanism: ["Timing"],
        description:
          "In Variation 3, card is turned face-down immediately — no viewing time. In Variation 1, 5-second limit to find both cards after the name is called.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "mix-it-up",
    programmeId: PROG,
    type: "artgame",
    title: "mix it up",
    subtitle: "ArtGames · C&P",
    description:
      "A colour recognition and sorting game. Children sort object cards by colour using swatch cards as category markers. A variation card introduces a drawing activity using multiple real-world colours.",
    ageGroup: "3-5",
    skills: ["C&P"],
    durationMinutes: 20,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "programme-designed",
    components: [
      "30 object cards (5 objects × 6 colours: red · yellow · blue · orange · green · purple)",
      "6 colour swatch cards",
      "1 variation card",
    ],
    skillNote:
      "Skill — C&P: Identifying and categorising colours as they appear on real-world objects — building colour recognition in context, moving from knowing colour names to understanding colour as a property of real things.",
    variations: [
      {
        id: "colour-sort",
        name: "Variation 1 — Colour Sort",
        description:
          "Six swatch cards laid out as category markers. Object cards shuffled face-down in a pile. Children take turns drawing a card, naming the colour, and placing it under the matching swatch. Complete when all 30 cards are sorted. Group checks each category together at the end.",
      },
      {
        id: "memory-sort",
        name: "Variation 2 — Memory Sort",
        description:
          "All 30 object cards placed face-down in a grid. Children take turns flipping two cards. Same colour — child keeps the pair and places both under the matching swatch. Different colours — both face-down. Complete when all cards are paired and sorted.",
      },
      {
        id: "real-colours",
        name: "Variation 3 — Draw It in Real Colours",
        description:
          "One object card drawn and placed face-up. Children look at the single-colour card illustration and draw the object using its real-world colours — a strawberry is red but its leaves are green, a lemon is yellow but its stalk is brown. New card drawn after most children have finished.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Finish line"],
        description:
          "Variation 1 only. Educator names the colour aloud as each card is drawn. Reduced set of 10 cards.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description: "Variation 1. All 30 cards. Child names the colour independently.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty", "Finish line"],
        description:
          "Variation 3. Child draws with all real-world colours without being told what they are. Finish line: child also names one colour they used and points to where that colour appears in the room.",
      },
    ],
    digitalAssets: [],
  },
  {
    id: "game-of-red-yellow-blue",
    programmeId: PROG,
    type: "artgame",
    title: "the game of red, yellow & blue",
    subtitle: "ArtGames · C&P + S&F",
    description:
      "A colour mixing discovery game with two components. Shape tiles in primary and secondary colours teach how primaries combine to make secondaries through physical building. Story cards narrate each colour mix as a simple three-step story.",
    ageGroup: "3-5",
    skills: ["C&P", "S&F"],
    durationMinutes: 20,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "programme-designed",
    components: [
      "Shape tiles — primary colour squares/triangles/circles in multiples (red, yellow, blue)",
      "Secondary colour tiles in single quantity (orange, green, purple)",
      "Structure cue cards",
      "30 step-by-step story cards",
    ],
    skillNote:
      "Skill — C&P + S&F: Combining primary tiles to produce a secondary makes colour mixing physical and playful. Simultaneously builds S&F through spatial manipulation of shape tiles.",
    variations: [
      {
        id: "build-mix",
        name: "Variation 1 — Build the Mix",
        description:
          "A structure cue card is placed face-up showing a tile equation (e.g. 2 red squares + 1 yellow triangle). Children select and arrange the primary tiles as shown. Educator reveals the secondary tile alongside — showing what the combination produces. Children build each equation in sequence.",
      },
      {
        id: "story-mix",
        name: "Variation 2 — Story Mix",
        description:
          "A story card is drawn. Educator reads the three-step story aloud — one sentence per step. After each sentence, children place the matching tile. After the three steps, the secondary tile is revealed. Children then mix the real colours on scrap paper to confirm.",
      },
      {
        id: "predict-build",
        name: "Variation 3 — Predict and Build",
        description:
          "Cue card placed face-up with the secondary tile result covered. Children build the primary tile structure. Educator asks: 'What colour do you think will appear?' Children name their prediction. Secondary tile revealed. Children paint the mix on scrap paper to confirm.",
      },
    ],
    difficultyLevels: [
      {
        level: "easy",
        mechanism: ["Prompt difficulty", "Scaffolding"],
        description:
          "Variation 1 only. Educator names each tile colour as children handle it.",
      },
      {
        level: "medium",
        mechanism: ["Prompt difficulty"],
        description: "Variations 1 and 2. Children identify tile colours independently.",
      },
      {
        level: "hard",
        mechanism: ["Prompt difficulty", "Scaffolding"],
        description:
          "Variation 3. Children predict before the reveal. After confirmation, children paint the actual mix and compare their painted colours to the tile.",
      },
    ],
    digitalAssets: [],
  },

  // ─────────────────────────────────────────────────────────────
  // ARTISTOTLE BOOKS
  // ─────────────────────────────────────────────────────────────
  {
    id: "press-here",
    programmeId: PROG,
    type: "artistotle",
    title: "press here",
    subtitle: "Artistotle · L&T",
    description:
      "Hervé Tullet · Chronicle Books. Pressing creates marks — teaches mark-making through the body.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 15,
    setupEffort: "low",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["Press Here · Hervé Tullet · Chronicle Books", "A4 paper", "Paints or markers"],
    skillNote:
      "Skill — L&T: Pressing creates marks — teaches mark-making through the body.",
    steps: [
      "Day 1 — Introduce: Educator reads cover to cover. Children look and listen. No making.",
      "Day 2 — Read and Draw Together: Educator reads again. Children draw alongside — any response.",
      "Day 3 — Draw from Imagination: Book closed. Educator names one concept. Children draw from imagination.",
      "Day 4 — Practise: Same as Day 3 with a different concept. Freer session — children know the book now.",
      "Day 5 — Final Artwork: Children press fingers, palms, and knuckles into paint on A3 — body prints in different colours and pressures.",
    ],
    tips: [
      "From Day 2 onward, every child has paper and a marking tool before the book opens.",
      "Children make simultaneously — no turns, no comparison.",
    ],
    digitalAssets: [],
  },
  {
    id: "mix-it-up-book",
    programmeId: PROG,
    type: "artistotle",
    title: "mix it up",
    subtitle: "Artistotle · C&P",
    description:
      "Hervé Tullet · Chronicle Books. Explicitly about colour mixing — shows what happens when colours meet.",
    ageGroup: "3-5",
    skills: ["C&P"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "Mix It Up · Hervé Tullet · Chronicle Books",
      "Primary tempera paints",
      "A3 paper",
      "Brushes",
    ],
    skillNote:
      "Skill — C&P: Explicitly about colour mixing — shows what happens when colours meet.",
    steps: [
      "Day 1 — Introduce: Educator reads cover to cover. Children look and listen.",
      "Day 2 — Read and Draw Together: Children draw alongside — any response.",
      "Day 3 — Draw from Imagination: concept — what happens when two colours meet.",
      "Day 4 — Practise: concept — a colour you make, not from the pot.",
      "Day 5 — Final Artwork: Children mix secondary colours and paint a page using only colours they made — at least three mixed colours.",
    ],
    digitalAssets: [],
  },
  {
    id: "very-hungry-caterpillar",
    programmeId: PROG,
    type: "artistotle",
    title: "the very hungry caterpillar",
    subtitle: "Artistotle · C&P + S&F",
    description:
      "Eric Carle · Penguin. Carle's collage technique is an art lesson — layered colour, shape, sequence.",
    ageGroup: "3-5",
    skills: ["C&P", "S&F"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "The Very Hungry Caterpillar · Eric Carle · Penguin",
      "Tempera paints",
      "Tissue paper",
      "A3 paper",
      "Hole punch",
    ],
    skillNote:
      "Skill — C&P + S&F: Carle's collage technique is an art lesson — layered colour, shape, sequence.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — layers of colour and texture.",
      "Day 4 — Practise: concept — a shape moving through a world.",
      "Day 5 — Final Artwork: Carle collage — paint paper, tear circles, layer in a row, hole-punch each circle.",
    ],
    digitalAssets: [],
  },
  {
    id: "colour-monster",
    programmeId: PROG,
    type: "artistotle",
    title: "the colour monster",
    subtitle: "Artistotle · C&P + I&E",
    description:
      "Anna Llenas · Templar. Colour used to express emotion — not just to label.",
    ageGroup: "3-5",
    skills: ["C&P", "I&E"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["The Colour Monster · Anna Llenas · Templar", "Tempera paints", "A3 paper"],
    skillNote:
      "Skill — C&P + I&E: Colour used to express emotion — not just to label.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — a colour that matches a feeling.",
      "Day 4 — Practise: concept — what colour would today feel like?",
      "Day 5 — Final Artwork: A3 divided into colour zones — each zone filled with the colour of a different feeling from the book.",
    ],
    digitalAssets: [],
  },
  {
    id: "lets-play",
    programmeId: PROG,
    type: "artistotle",
    title: "let's play",
    subtitle: "Artistotle · I&E",
    description:
      "Hervé Tullet · Chronicle Books. Most open-ended Tullet book — imagination drives every response.",
    ageGroup: "3-5",
    skills: ["I&E"],
    durationMinutes: 15,
    setupEffort: "low",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["Let's Play · Hervé Tullet · Chronicle Books", "Crayons", "Paints", "A3 paper"],
    skillNote:
      "Skill — I&E: Most open-ended Tullet book — imagination drives every response.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — a dot going on adventures.",
      "Day 4 — Practise: concept — what adventure would I send a dot on?",
      "Day 5 — Final Artwork: an adventure map for a dot — crayons and paint, the dot must appear somewhere on the map.",
    ],
    digitalAssets: [],
  },
  {
    id: "mr-sea-horse",
    programmeId: PROG,
    type: "artistotle",
    title: "mr. sea horse",
    subtitle: "Artistotle · S&F + I&E",
    description:
      "Eric Carle · Penguin. Carle's layered ocean world teaches shape-building and world-making.",
    ageGroup: "3-5",
    skills: ["S&F", "I&E"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["Mr. Sea Horse · Eric Carle · Penguin", "Tempera paints", "Coloured paper", "A3 paper"],
    skillNote:
      "Skill — S&F + I&E: Carle's layered ocean world teaches shape-building and world-making.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — a creature hidden in plain sight.",
      "Day 4 — Practise: concept — an ocean world made of layered shapes.",
      "Day 5 — Final Artwork: underwater Carle collage — painted paper torn into creatures and plants, layered on A3, Mr. Sea Horse must appear.",
    ],
    digitalAssets: [],
  },
  {
    id: "say-zoop",
    programmeId: PROG,
    type: "artistotle",
    title: "say zoop",
    subtitle: "Artistotle · L&T",
    description:
      "Hervé Tullet · Chronicle Books. Sound becomes mark — children translate what they hear into lines.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["Say Zoop · Hervé Tullet · Chronicle Books", "Tempera paints", "A3 paper"],
    skillNote:
      "Skill — L&T: Sound becomes mark — children translate what they hear into lines.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — what does a big sound look like as a mark?",
      "Day 4 — Practise: concept — a tiny sound vs a huge sound.",
      "Day 5 — Final Artwork: educator makes five sounds one at a time — children paint the mark each sound makes in a new colour, page fills with five zones.",
    ],
    digitalAssets: [],
  },
  {
    id: "the-dot",
    programmeId: PROG,
    type: "artistotle",
    title: "the dot",
    subtitle: "Artistotle · I&E + C&P",
    description:
      "Peter Reynolds · Candlewick. One mark is enough — teaches confidence in making and the value of beginning.",
    ageGroup: "3-5",
    skills: ["I&E", "C&P"],
    durationMinutes: 15,
    setupEffort: "low",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["The Dot · Peter Reynolds · Candlewick", "Paints", "Crayons", "A3 paper"],
    skillNote:
      "Skill — I&E + C&P: One mark is enough — teaches confidence in making and the value of beginning.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — one mark made with confidence.",
      "Day 4 — Practise: concept — what would you make if you knew it was good enough?",
      "Day 5 — Final Artwork: educator paints one dot in the centre of each child's page — child continues from that dot, original dot must remain visible.",
    ],
    digitalAssets: [],
  },
  {
    id: "bear-hunt",
    programmeId: PROG,
    type: "artistotle",
    title: "we're going on a bear hunt",
    subtitle: "Artistotle · L&T",
    description:
      "Rosen/Oxenbury · Walker. Dense texture language — swishy, squelchy, thick, oozy — supports texture mark-making.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 15,
    setupEffort: "medium",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "We're Going on a Bear Hunt · Rosen/Oxenbury · Walker",
      "Coloured paper",
      "Tinker materials",
      "A3 paper",
    ],
    skillNote:
      "Skill — L&T: Dense texture language — swishy, squelchy, thick, oozy — supports texture mark-making.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — thick oozy mud, what marks does it make?",
      "Day 4 — Practise: concept — swirling snowstorm, what marks?",
      "Day 5 — Final Artwork: terrain collage — child picks one terrain (grass, mud, river, snow, cave) and recreates it in torn paper and Tinker materials across A3.",
    ],
    digitalAssets: [],
  },
  {
    id: "the-gruffalo",
    programmeId: PROG,
    type: "artistotle",
    title: "the gruffalo",
    subtitle: "Artistotle · S&F",
    description:
      "Donaldson/Scheffler · Macmillan. Rich character with specific described features — ideal for observational drawing.",
    ageGroup: "3-5",
    skills: ["S&F"],
    durationMinutes: 15,
    setupEffort: "low",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["The Gruffalo · Donaldson/Scheffler · Macmillan", "Crayons", "Coloured paper", "A3 paper"],
    skillNote:
      "Skill — S&F: Rich character with specific described features — ideal for observational drawing.",
    steps: [
      "Day 1 — Introduce.",
      "Day 2 — Read and Draw Together.",
      "Day 3 — Draw from Imagination: concept — a feature that is truly extraordinary.",
      "Day 4 — Practise: draw the Gruffalo from memory.",
      "Day 5 — Final Artwork: children draw their own Gruffalo using the book as a visual reference — all described features, working slowly.",
    ],
    digitalAssets: [],
  },

  // ─────────────────────────────────────────────────────────────
  // ARTIVERSE MATERIAL COMBINATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "artiverse-painting",
    programmeId: PROG,
    type: "artiverse",
    title: "painting",
    subtitle: "Artiverse · C&P",
    description:
      "Children paint freely using tempera and brushes on A3 paper. Every artwork runs across 2 sessions: Day 1 starts and explores, Day 2 continues and completes.",
    ageGroup: "3-5",
    skills: ["C&P"],
    durationMinutes: 35,
    setupEffort: "high",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "Tempera paints",
      "Brushes (fine, medium, broad)",
      "A3 paper",
      "Mixing trays",
      "Water containers",
      "Aprons",
    ],
    skillNote:
      "Skill — C&P: Free exploration of paint and colour on a generous surface — the primary way children build confidence with colour mixing and flow.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make.",
      "Day 1: explore. Day 2: continue and complete from where Day 1 ended.",
      "No demonstration before making. No correction during.",
    ],
    tips: [
      "Day 2 continues from Day 1 — work is kept and returned.",
      "A child who missed Day 1 simply starts their own Day 1 on the same material.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-dot-dab",
    programmeId: PROG,
    type: "artiverse",
    title: "dot & dab",
    subtitle: "Artiverse · L&T",
    description:
      "Children make marks with cotton swabs, earbuds, and sponge sticks dipped in tempera paint.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 35,
    setupEffort: "medium",
    facilitationLevel: "easy",
    status: "existing",
    components: [
      "Tempera paints",
      "Cotton swabs",
      "Earbuds",
      "Sponge sticks",
      "A4 paper",
    ],
    skillNote:
      "Skill — L&T: Repeated dot and dab marks build awareness of how a single mark, repeated, becomes a texture or pattern.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make.",
      "Day 1: explore. Day 2: continue and complete.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-stamping",
    programmeId: PROG,
    type: "artiverse",
    title: "stamping",
    subtitle: "Artiverse · S&F",
    description:
      "Children stamp shapes onto paper using assorted stamping tools — cork, sponge, cardboard tube sections, bottle caps.",
    ageGroup: "3-5",
    skills: ["S&F"],
    durationMinutes: 35,
    setupEffort: "medium",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Tempera paints", "Stamping tools", "A4 paper"],
    skillNote:
      "Skill — S&F: Stamping isolates shape — each press is a pure shape on the page.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make.",
      "Day 1: explore. Day 2: continue and complete.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-drawing",
    programmeId: PROG,
    type: "artiverse",
    title: "drawing",
    subtitle: "Artiverse · L&T",
    description:
      "Children draw on A4 with crayons and washable markers.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 35,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: ["Crayons", "Washable markers", "A4 paper"],
    skillNote:
      "Skill — L&T: Drawing is the most direct form of mark-making — every line is a decision.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make.",
      "Day 1: explore. Day 2: continue and complete.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-mixed-media",
    programmeId: PROG,
    type: "artiverse",
    title: "mixed media",
    subtitle: "Artiverse · I&E",
    description:
      "Children combine crayons, any tool, and any Tinker material on A3 paper.",
    ageGroup: "3-5",
    skills: ["I&E"],
    durationMinutes: 35,
    setupEffort: "high",
    facilitationLevel: "moderate",
    status: "existing",
    components: ["Crayons", "Any tool", "Any Tinker material", "A3 paper"],
    skillNote:
      "Skill — I&E: Open material choice forces the child to decide — the purest Artiverse format for building imagination and expression.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make and which materials to use.",
      "Day 1: explore. Day 2: continue and complete.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-collage",
    programmeId: PROG,
    type: "artiverse",
    title: "collage",
    subtitle: "Artiverse · S&F",
    description:
      "Children cut, tear, and assemble coloured paper with yarn and beads on A3 paper.",
    ageGroup: "3-5",
    skills: ["S&F"],
    durationMinutes: 35,
    setupEffort: "high",
    facilitationLevel: "moderate",
    status: "existing",
    components: [
      "Coloured paper",
      "Child-sized scissors",
      "Yarn",
      "Beads",
      "Glue sticks",
      "A3 paper",
    ],
    skillNote:
      "Skill — S&F: Cutting and assembling paper pieces is shape-making made physical — children build whole scenes from discrete shapes.",
    steps: [
      "Educator offers 2–3 suggested artworks before making begins.",
      "Children decide what they make.",
      "Day 1: explore. Day 2: continue and complete.",
    ],
    digitalAssets: [],
  },
  {
    id: "artiverse-texture-brush",
    programmeId: PROG,
    type: "artiverse",
    title: "texture brush making",
    subtitle: "Artiverse · L&T",
    description:
      "Children build their own texture brushes from wooden paper clips and Tinker materials, then paint with them.",
    ageGroup: "3-5",
    skills: ["L&T"],
    durationMinutes: 35,
    setupEffort: "high",
    facilitationLevel: "advanced",
    status: "existing",
    components: [
      "Wooden paper clips",
      "Cotton",
      "Pom poms",
      "Foil strips",
      "Bubble wrap",
      "Tempera paints",
      "A3 paper",
    ],
    skillNote:
      "Skill — L&T: Building a brush teaches children that the tool determines the mark — every texture starts with a different surface.",
    steps: [
      "Day 1: build a brush · test it · name the texture.",
      "Day 2: fill the page with the brush you made.",
    ],
    digitalAssets: [],
  },

  // ─────────────────────────────────────────────────────────────
  // ART CARE
  // ─────────────────────────────────────────────────────────────
  {
    id: "art-care",
    programmeId: PROG,
    type: "art-care",
    title: "art care",
    subtitle: "Responsibility",
    description:
      "Children sort all materials back to the correct shelf sections and prepare the space for the next session.",
    ageGroup: "3-5",
    skills: ["Responsibility"],
    durationMinutes: 10,
    setupEffort: "low",
    facilitationLevel: "easy",
    status: "existing",
    components: [
      "Water container and cleaning cloth (permanent on table corner)",
      "The five labelled shelf sections: Colours · Tools · Tinkers · Books · Games",
    ],
    skillNote:
      "Skill — Responsibility: Children care for the space they used today. No prior knowledge needed.",
    steps: [
      "Children sort all materials back to the correct shelf sections.",
      "Children clean their table space.",
      "Children return aprons and seats.",
      "If a brush has not been cleaned, the educator shows how once — without making it a correction.",
    ],
    tips: ["The standard is care, not speed."],
    digitalAssets: [],
  },
];
