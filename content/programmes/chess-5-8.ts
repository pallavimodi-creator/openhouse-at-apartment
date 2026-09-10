import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSegmentDef,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
} from "@/content/types";

// ─── Chess · shared class structure ─────────────────────────
// The four-segment class flow is identical across both age bands
// (5–8 beginner · 8–12 intermediate). Exported so chess-8-12 reuses
// the exact same segments + game library and only differs in the
// skill ladders, the session focus, and the checkpoints.
//
// Source: the Openhouse chess class structure —
//   tempo (10m) → chessiverse (35m) → rising pawns arena (35m) → reflect & log (10m)
// plus the game library (how-to-play · scaffolds · skills) supplied by OH.

export const chessSegmentDefinitions: CurriculumSegmentDef[] = [
  {
    id: "tempo",
    name: "Tempo",
    durationRange: "10 min",
    objective:
      "mind & movement exercises to get focused and ready for the day, then a chess-centric warm-up. rotates: one of 2 mind or 3 movement exercises (2 min) + one of 6 chess-centric warm-ups (5 min).",
    type: "fixed",
  },
  {
    id: "chessiverse",
    name: "Chessiverse",
    durationRange: "35 min",
    objective:
      "play curated games to learn the core concepts of chess. rotates between five games — chain capture, board architect, piece patrol, last man standing, and lava & lillies.",
    type: "rotating",
    rotationPool: [
      "chain-capture",
      "board-architect",
      "piece-patrol",
      "last-man-standing",
      "lava-lilies",
    ],
  },
  {
    id: "rising-pawns",
    name: "Rising Pawns Arena",
    durationRange: "35 min",
    objective:
      "play actual games and mini-games to apply the concepts in real play. rotates between the arena games — pawn wars, squad relay, paired gameplay, and board reporter.",
    type: "rotating",
    rotationPool: ["pawn-wars", "squad-relay", "paired-gameplay", "board-reporter"],
  },
  {
    id: "reflect-log",
    name: "Reflect & Log",
    durationRange: "10 min",
    objective:
      "the student records their learning in their journal, to refer back to in the next class.",
    type: "fixed",
  },
];

// ─── Chess · game library (shared) ──────────────────────────
// Each game is authored verbatim from the OH source: how-to-play,
// digital scaffolds, and the skills it supports. Games without a
// how-to-play in the source (squad relay, board reporter) are kept
// as honest placeholders flagged in the educator note.

export const chessActivities: Record<string, CurriculumActivity> = {
  // ── Chessiverse — learn the concepts ──
  "chain-capture": {
    id: "chain-capture",
    segment: "chessiverse",
    title: "chain capture",
    setupLine:
      "capture every target on the board in one continuous chain — a legal capture on every move, never landing on an attacked square.",
    howToPlay:
      "set up the challenge position. the child must capture every target piece in a continuous sequence — making a legal capture on every single move, and never landing on a square that is attacked. if they land on an attacked square or run out of legal captures, the chain breaks and they reset and try again.",
    goal: "the child clears the board by making a legal capture on every move without ever landing on an attacked square.",
    materials: ["standard chess board and pieces"],
    skillIds: ["ca", "sy"],
    difficultyLevels: [
      { level: "Intro", description: "fewer pieces, with the captures lined up in a clear route." },
      { level: "Practice", description: "a full chain with one clear path to find." },
      { level: "Challenge", description: "more pieces and more attacked squares to route around." },
    ],
    educatorNote:
      "chain capture builds calculation (seeing the whole capture sequence) and synthesis (choosing the one order that works).",
    debriefPrompts: [],
    type: "physical-game",
  },
  "board-architect": {
    id: "board-architect",
    segment: "chessiverse",
    title: "board architect",
    setupLine:
      "rebuild the position you're shown — from a diagram, spoken coordinates, or written notation.",
    howToPlay:
      "the educator presents a position visually (a digital diagram), verbally (coordinate cues), or in writing (chess notation). the child reconstructs the exact position on their own board. the scaffolds are generated for the day's topic — so the same game teaches coordinates one day and check, checkmate or mate-in-one the next.",
    goal: "the child reconstructs a chess position from a diagram, spoken coordinates, or notation.",
    materials: [
      "standard chess board and pieces",
      "digital diagrams / coordinate cues / written notation (generated for the day's topic)",
    ],
    skillIds: ["bv", "gm"],
    educatorNote:
      "board architect is the flexible teaching game — choose positions that match today's focus (coordinates · check & checkmate · mate in one).",
    debriefPrompts: [],
    type: "physical-game",
  },
  "piece-patrol": {
    id: "piece-patrol",
    segment: "chessiverse",
    title: "piece patrol",
    setupLine:
      "listen to the clue, walk to the matching piece station, and strike that piece's pose before time runs out.",
    howToPlay:
      "piece stations are set around the room. the educator reads a level-based clue from the clue question bank. the child works out which piece the clue describes, walks to that piece's station, and strikes that piece's pose before the timer ends.",
    goal: "the child identifies the piece from a clue and gets to its station in time, striking its pose.",
    players: "whole group",
    materials: ["piece stations", "teacher's level-based clue question bank"],
    skillIds: ["gm", "re"],
    educatorNote:
      "a moving, whole-body game — it builds piece knowledge (game mechanics) and keeps children resilient under a friendly time pressure.",
    debriefPrompts: [],
    type: "physical-game",
  },
  "last-man-standing": {
    id: "last-man-standing",
    segment: "chessiverse",
    title: "last man standing",
    setupLine:
      "make a continuous chain of legal captures until exactly one piece is left standing.",
    howToPlay:
      "set up the challenge position. the child executes a continuous chain of legal captures — every move is a capture — until exactly one piece remains on the board. if the chain breaks before one piece is left, they reset and try again.",
    goal: "the child captures down to exactly one remaining piece using an unbroken chain of legal captures.",
    materials: ["standard chess board and pieces", "100 challenge flashcards"],
    skillIds: ["bv", "ca"],
    difficultyLevels: [
      { level: "Intro", description: "a short chain with an obvious first capture." },
      { level: "Practice", description: "a full flashcard challenge to solve." },
      { level: "Progression", description: "positions where the order of captures really matters." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "lava-lilies": {
    id: "lava-lilies",
    segment: "chessiverse",
    title: "lava & lillies",
    setupLine:
      "move the hero piece to the lily marker in the exact number of moves — no landing on lava, no stepping into an enemy's attack line.",
    howToPlay:
      "place the hero piece on its start square and the lily flower marker on its target square, with physical lava tokens and stationary enemy pieces on the board. the child moves the hero to the lily in exactly the move par printed on the challenge card — never landing on a lava token, and never stepping into a stationary enemy's attack line.",
    goal: "the child routes the hero piece to the lily marker in the exact move count, avoiding lava tokens and enemy attack lines.",
    materials: [
      "hero piece + lily flower marker",
      "lava tokens",
      "100 challenge flashcards",
      "master study game question bank",
    ],
    skillIds: ["bv", "ca"],
    difficultyLevels: [
      { level: "Intro", description: "short routes with a couple of lava tokens." },
      { level: "Practice", description: "the exact move par with a few enemy attack lines to avoid." },
      { level: "Progression", description: "longer routes, a tighter par, and more attack lines to read." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },

  // ── Rising Pawns Arena — apply in real play ──
  "intro-to-chess": {
    id: "intro-to-chess",
    segment: "rising-pawns",
    title: "intro to chess",
    setupLine:
      "a warm, hands-on first meeting with the board, the pieces, and how a game works.",
    howToPlay:
      "an opening group discussion and guided exploration — what chess is, the board and its squares, the pieces and how each one moves. children handle the pieces and try moves on their own board as the educator introduces each one. this replaces a competitive game for the first two sessions, while children meet the game.",
    goal: "the child meets the board and pieces and tries out how each piece moves.",
    players: "whole group",
    materials: ["standard chess board and pieces"],
    skillIds: ["gm", "bv"],
    debriefPrompts: [],
    type: "facilitated",
  },
  "pawn-wars": {
    id: "pawn-wars",
    segment: "rising-pawns",
    title: "pawn wars",
    setupLine:
      "8 pawns vs 8 pawns with the kings on their starting squares — first to promote a pawn or capture all enemy pawns wins.",
    howToPlay:
      "set up 8 pawns each, with both kings on their starting squares. players take turns making legal pawn (and king) moves. the first player to legally promote a pawn, or to capture all of the opponent's pawns, wins.",
    goal: "the child races to promote a pawn or capture all the enemy pawns.",
    players: "2 players",
    materials: ["standard chess board and pieces"],
    skillIds: ["gm", "sy"],
    educatorNote:
      "the first real contest — it turns piece movement (game mechanics) into a simple plan (synthesis): make a pawn, stop theirs.",
    debriefPrompts: [],
    type: "physical-game",
  },
  "squad-relay": {
    id: "squad-relay",
    segment: "rising-pawns",
    title: "squad relay",
    setupLine:
      "a team relay game that applies the day's concepts together — grows from 20 moves to a full game.",
    howToPlay:
      "squad relay is one of the rising pawns arena team games. it runs in stages across sessions — the first 20 moves, then a full game — so teams apply the class's concepts together. the detailed rules and scaffolds are not yet in the current OH source and will be added.",
    goal: "teams apply the class's concepts together in a relay format.",
    players: "teams",
    skillIds: ["sy", "re"],
    educatorNote: [
      "SOURCE PENDING: squad relay's full how-to-play and scaffolds are not in the current curriculum source — this is a faithful placeholder to be completed once OH supplies the rules.",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "paired-gameplay": {
    id: "paired-gameplay",
    segment: "rising-pawns",
    title: "paired gameplay",
    setupLine:
      "two children play a real game against each other — growing from the first 20 moves to a full game.",
    howToPlay:
      "children are paired to play an actual game on a full board. the scope grows across sessions — first the opening 20 moves, then a first full game, then complete games — so they practise applying everything from chessiverse in real play. the educator circulates, watching for the day's concept rather than directing moves.",
    goal: "the child plays a real game against a partner, applying the day's concept.",
    players: "2 players",
    materials: ["standard chess board and pieces"],
    skillIds: ["sy", "ca", "re"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "board-reporter": {
    id: "board-reporter",
    segment: "rising-pawns",
    title: "board reporter",
    setupLine: "record and report on a game as it is played.",
    howToPlay:
      "board reporter is one of the rising pawns arena games — children observe, record and report on a game. the detailed rules and scaffolds are not yet in the current OH source and will be added.",
    goal: "the child observes, records and reports a game.",
    skillIds: ["bv", "re"],
    educatorNote: [
      "SOURCE PENDING: board reporter's full how-to-play and scaffolds are not in the current curriculum source — this is a faithful placeholder to be completed once OH supplies the rules.",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

// ─── How the two age bands differ (shared block) ────────────
export const chessAgeBandComparison = {
  younger: [
    "learn how every piece moves, captures and defends",
    "set up the board, name the squares, and play a full legal game",
    "meet check, checkmate and the draw — and find mate in one",
    "play with good chess manners — shake hands, praise a good move",
  ],
  older: [
    "record games in notation and open with sound principles and a named opening",
    "deliver the standard checkmates (two-rook, queen) and solve mate in one and two",
    "spot and use tactics — forks, pins, skewers, discovered attacks — in their own games",
    "handle a clock and tournament etiquette, and steer a game with a plan they can explain",
  ],
  note:
    "the same four-part class and the same five skills — the games and challenges simply go deeper for the older band.",
};

// ─── Chess 5–8 · skill ladders (LOs, ★ = milestone) ─────────
const skillAreas58 = [
  {
    id: "gm",
    name: "Game Mechanics",
    shortName: "GM",
    abilities: [
      {
        name: "names each piece and shows how it moves",
        description:
          "points to the king, queen, rook, bishop, knight and pawn and shows each one's move on the board.",
      },
      {
        name: "captures and defends pieces legally",
        description:
          "takes an enemy piece with a legal move and protects a piece that is under attack.",
      },
      {
        name: "sets up the board and plays a full legal game",
        description:
          "places every piece on the right square and plays a whole game following the rules.",
      },
      {
        name: "plays a complete game with good chess manners",
        description:
          "finishes a full legal game, shakes hands before and after, and praises a good move.",
        isNorthStar: true,
      },
    ],
  },
  {
    id: "bv",
    name: "Board Vision",
    shortName: "BV",
    abilities: [
      {
        name: "names squares by their coordinate",
        description: "finds and names a square such as e4 or d5 on the board.",
      },
      {
        name: "spots which pieces attack a square",
        description:
          "looks at a square and says which pieces are attacking or defending it.",
      },
      {
        name: "sees a threat before it lands",
        description:
          "notices when a piece is about to be captured and finds it a safe square.",
      },
      {
        name: "reads the whole board and keeps their king safe",
        description: "scans the board each move and keeps their king out of danger.",
        isNorthStar: true,
      },
    ],
  },
  {
    id: "ca",
    name: "Calculation",
    shortName: "CA",
    abilities: [
      {
        name: "finds a one-move capture",
        description: "spots a piece they can take in a single legal move.",
      },
      {
        name: "plans a two-move sequence",
        description: "works out 'if i go here, then i can go there' before moving.",
      },
      {
        name: "follows a short forced line",
        description:
          "calculates a line of checks and captures the opponent must answer.",
      },
      {
        name: "calculates a short sequence to win material or give mate",
        description:
          "looks a few moves ahead to win a piece or deliver checkmate.",
        isNorthStar: true,
      },
    ],
  },
  {
    id: "sy",
    name: "Synthesis",
    shortName: "SY",
    abilities: [
      {
        name: "names one good idea",
        description:
          "says a simple plan out loud — control the centre, develop a piece, or castle.",
      },
      {
        name: "follows a simple plan in a guided game",
        description:
          "sticks to one idea across several moves with the educator's nudges.",
      },
      {
        name: "chooses between two ideas",
        description: "weighs two plans and picks the one that helps their position.",
      },
      {
        name: "forms and follows a plan across a whole game",
        description: "makes a plan of their own and steers the game toward it.",
        isNorthStar: true,
      },
    ],
  },
  {
    id: "re",
    name: "Resilience",
    shortName: "RE",
    abilities: [
      {
        name: "follows the class manners and shakes hands",
        description:
          "greets their opponent, plays fair, and shakes hands before and after.",
      },
      {
        name: "keeps playing calmly after a mistake",
        description: "stays settled after losing a piece and plays the next move.",
      },
      {
        name: "wins and loses gracefully",
        description:
          "congratulates their opponent whether they win or lose.",
      },
      {
        name: "reflects on their games and plays on with a growth mindset",
        description:
          "looks back at what they would do differently and keeps improving.",
        isNorthStar: true,
      },
    ],
  },
];

// ─── Chess 5–8 · the 12-session map ─────────────────────────
// Verbatim from the OH chess session table. chessiverse + rising
// pawns carry the day's game; `chessFocus` carries the day's
// teaching headline (concept + game mode) shown above the plan.
const sessionTable58: CurriculumSessionEntry[] = [
  { sessionNumber: 1, chessiverse: "chain-capture", risingPawns: "intro-to-chess", chessFocus: "meet the board & pieces · chain capture · intro-to-chess discussion", topicLayer: 1 },
  { sessionNumber: 2, chessiverse: "chain-capture", risingPawns: "intro-to-chess", chessFocus: "how pieces move & capture · chain capture · intro-to-chess discussion", topicLayer: 1 },
  { sessionNumber: 3, chessiverse: "piece-patrol", risingPawns: "pawn-wars", chessFocus: "piece patrol (intro & practice) · pawn wars", topicLayer: 1 },
  { sessionNumber: 4, chessiverse: "chain-capture", risingPawns: "pawn-wars", chessFocus: "chain capture + piece patrol (challenge) · pawn wars", topicLayer: 1 },
  { sessionNumber: 5, chessiverse: "board-architect", risingPawns: "pawn-wars", chessFocus: "learn check & checkmate (board architect) · pawn wars", topicLayer: 2 },
  { sessionNumber: 6, chessiverse: "lava-lilies", risingPawns: "squad-relay", chessFocus: "lava & lillies (intro & practice) · squad relay (20 moves)", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 7, chessiverse: "last-man-standing", risingPawns: "pawn-wars", chessFocus: "last man standing (intro & practice) · pawn wars", topicLayer: 2 },
  { sessionNumber: 8, chessiverse: "lava-lilies", risingPawns: "squad-relay", chessFocus: "lava & lillies + last man standing (challenge) · squad relay (full game)", topicLayer: 2 },
  { sessionNumber: 9, chessiverse: "lava-lilies", risingPawns: "paired-gameplay", chessFocus: "lava & lillies (progression) · paired gameplay (first 20 moves)", topicLayer: 3 },
  { sessionNumber: 10, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "board architect — mate in one · paired gameplay (first 20 moves)", topicLayer: 3 },
  { sessionNumber: 11, chessiverse: "last-man-standing", risingPawns: "paired-gameplay", chessFocus: "last man standing (progression) · paired gameplay (first full game)", topicLayer: 3 },
  { sessionNumber: 12, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "board architect — mate in one (challenge) · paired gameplay", topicLayer: 3, isCheckpoint: true },
];

const checkpoints58: CurriculumCheckpoint[] = [
  {
    afterSession: 6,
    descriptors: [
      {
        skillArea: "Game Mechanics",
        beginning: "Needs help remembering how some pieces move.",
        developing: "Moves and captures with all pieces legally, with reminders.",
        secure: "Sets up the board and plays a legal game without prompts.",
      },
      {
        skillArea: "Board Vision",
        beginning: "Focuses only on their own piece.",
        developing: "Names squares and notices an obvious attack.",
        secure: "Spots a threat to their piece before it is captured.",
      },
      {
        skillArea: "Resilience",
        beginning: "Gets upset when a piece is lost.",
        developing: "Plays on after a mistake with a reminder.",
        secure: "Shakes hands and plays on calmly, win or lose.",
      },
    ],
  },
  {
    afterSession: 12,
    descriptors: [
      {
        skillArea: "Game Mechanics",
        beginning: "Plays a legal game but forgets check now and then.",
        developing: "Recognises check, checkmate and a draw.",
        secure: "Plays a full legal game and finds mate in one.",
      },
      {
        skillArea: "Calculation",
        beginning: "Sees only one move at a time.",
        developing: "Plans a two-move capture with support.",
        secure: "Calculates a short forced sequence to win a piece or give mate.",
      },
      {
        skillArea: "Synthesis",
        beginning: "Moves without a plan.",
        developing: "Follows one idea (centre, develop, castle) when reminded.",
        secure: "Chooses a plan and follows it across a game.",
      },
    ],
  },
];

// ─── Programme export ───────────────────────────────────────
export const chess58: CurriculumProgramme = {
  id: "chess-5-8",
  slug: "chess-5-8",
  title: "chess",
  category: "chess",
  ageGroup: "5-8",
  ageLabel: "ages 5–8",
  tagline: "learn chess through games — think ahead, plan, and play with confidence.",
  description:
    "chess as playful, intuitive discovery — children learn the board, the pieces and the core ideas through curated mini-games and real play, not rote memorisation. the beginner year builds every piece's movement, capture and defence, check and checkmate, and a full legal game with good chess manners.",
  totalSessions: 12,
  skillAreas: skillAreas58,
  segmentDefinitions: chessSegmentDefinitions,
  sessionTable: sessionTable58,
  activities: chessActivities,
  checkpoints: checkpoints58,
  ageBandComparison: chessAgeBandComparison,
};
