import type {
  CurriculumProgramme,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
} from "@/content/types";
import {
  chessSegmentDefinitions,
  chessActivities,
  chessAgeBandComparison,
} from "./chess-5-8";

// ─── Chess 8–12 (intermediate) ──────────────────────────────
// Same four-part class and the same game library as 5–8 — the
// skill ladders, session focus and checkpoints go deeper. The
// intermediate foundation topics (chess notation · opening
// principles · stalemate · two-rook & queen checkmates · mate in
// one→two · converting an advantage) come from the OH chess
// curriculum; they are mapped onto the shared segments/games here.

const skillAreas812 = [
  {
    id: "gm",
    name: "Game Mechanics",
    shortName: "GM",
    abilities: [
      {
        name: "records a game in chess notation",
        description: "writes down each move in algebraic notation while playing.",
      },
      {
        name: "opens with sound principles and a named opening",
        description:
          "controls the centre, develops pieces and castles early, and can play a named opening such as the italian.",
      },
      {
        name: "knows the draw and end-game rules",
        description:
          "explains stalemate, threefold repetition, the 50-move rule and insufficient material.",
      },
      {
        name: "plays a full game with clock and tournament etiquette",
        description:
          "handles a chess clock, touch-move and fair play in a full timed game.",
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
        name: "reads and sets up positions from notation",
        description:
          "reconstructs a position from written notation, a diagram, or spoken coordinates.",
      },
      {
        name: "spots weak squares and loose pieces",
        description:
          "identifies undefended pieces and key squares on both sides of the board.",
      },
      {
        name: "sees tactical patterns on the board",
        description:
          "recognises forks, pins, skewers and discovered attacks as they appear.",
      },
      {
        name: "reads the whole position and plans around its weaknesses",
        description:
          "assesses the full position and targets the opponent's weaknesses.",
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
        name: "calculates a two-to-three move tactic",
        description: "works out a forcing line of a few moves that wins material.",
      },
      {
        name: "solves mate in one and mate in two",
        description: "finds forced checkmates in one and two moves.",
      },
      {
        name: "delivers the standard checkmates",
        description:
          "gives mate with two rooks and with the queen against a lone king.",
      },
      {
        name: "calculates a forced win of material or a mate in two-to-three",
        description: "reads a longer forcing sequence to a decisive advantage.",
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
        name: "names the plan behind the opening",
        description: "explains why they develop, castle and fight for the centre.",
      },
      {
        name: "creates threats to steer the game",
        description:
          "makes threats that force the opponent to react to their plan.",
      },
      {
        name: "converts a material advantage",
        description:
          "trades down and uses an extra piece to win a winning position.",
      },
      {
        name: "forms a long-term plan and follows it to a win",
        description:
          "builds and executes a multi-stage plan across a whole game.",
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
        name: "plays with full tournament etiquette",
        description:
          "handles wins, losses and the clock with composure and fair play.",
      },
      {
        name: "stays composed under pressure",
        description: "keeps calm in a tight position or in time trouble.",
      },
      {
        name: "analyses their own games",
        description:
          "reviews a finished game and names the turning points and mistakes.",
      },
      {
        name: "learns from every game and keeps improving",
        description:
          "turns each game — won or lost — into something they practise next.",
        isNorthStar: true,
      },
    ],
  },
];

// ─── Chess 8–12 · the 12-session map (intermediate focus) ───
const sessionTable812: CurriculumSessionEntry[] = [
  { sessionNumber: 1, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "chess notation & board vision (board architect) · paired gameplay (placement game)", topicLayer: 1 },
  { sessionNumber: 2, chessiverse: "chain-capture", risingPawns: "pawn-wars", chessFocus: "opening principles — centre, develop, castle · chain capture · pawn wars", topicLayer: 1 },
  { sessionNumber: 3, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "reading positions from notation (board architect) · paired gameplay (the opening)", topicLayer: 1 },
  { sessionNumber: 4, chessiverse: "lava-lilies", risingPawns: "squad-relay", chessFocus: "tactics — forks & pins (lava & lillies) · squad relay", topicLayer: 2 },
  { sessionNumber: 5, chessiverse: "last-man-standing", risingPawns: "paired-gameplay", chessFocus: "calculation — forcing captures (last man standing) · paired gameplay", topicLayer: 2 },
  { sessionNumber: 6, chessiverse: "board-architect", risingPawns: "board-reporter", chessFocus: "stalemate vs checkmate (board architect) · board reporter (record your game)", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 7, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "two-rook checkmate (board architect) · paired gameplay", topicLayer: 2 },
  { sessionNumber: 8, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "queen checkmate (board architect) · paired gameplay (convert the win)", topicLayer: 3 },
  { sessionNumber: 9, chessiverse: "lava-lilies", risingPawns: "squad-relay", chessFocus: "tactics in your own games — skewers & discovered attacks (lava & lillies) · squad relay", topicLayer: 3 },
  { sessionNumber: 10, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "mate in two (board architect) · paired gameplay", topicLayer: 3 },
  { sessionNumber: 11, chessiverse: "last-man-standing", risingPawns: "board-reporter", chessFocus: "converting a material advantage (last man standing) · board reporter (analyse your game)", topicLayer: 3 },
  { sessionNumber: 12, chessiverse: "board-architect", risingPawns: "paired-gameplay", chessFocus: "mate in two / three (challenge) · paired gameplay (full game + clock)", topicLayer: 4, isCheckpoint: true },
];

const checkpoints812: CurriculumCheckpoint[] = [
  {
    afterSession: 6,
    descriptors: [
      {
        skillArea: "Game Mechanics",
        beginning: "Records some moves in notation with help.",
        developing: "Records a game in notation and opens with sound principles.",
        secure: "Opens with a named opening and explains stalemate and the draw rules.",
      },
      {
        skillArea: "Board Vision",
        beginning: "Reads a simple position from a diagram.",
        developing: "Sets up positions from notation and spots loose pieces.",
        secure: "Recognises forks and pins as they appear on the board.",
      },
      {
        skillArea: "Calculation",
        beginning: "Finds a one-move tactic.",
        developing: "Solves mate in one and simple two-move tactics.",
        secure: "Solves mate in two and a short forcing line.",
      },
    ],
  },
  {
    afterSession: 12,
    descriptors: [
      {
        skillArea: "Calculation",
        beginning: "Delivers the two-rook mate with support.",
        developing: "Delivers the two-rook and queen mates.",
        secure: "Solves mate in two/three and calculates a forced win of material.",
      },
      {
        skillArea: "Synthesis",
        beginning: "Follows opening principles but drifts after.",
        developing: "Creates threats and converts a clear material advantage.",
        secure: "Forms a long-term plan and follows it to a win.",
      },
      {
        skillArea: "Resilience",
        beginning: "Handles the clock with reminders.",
        developing: "Plays with tournament etiquette and stays composed.",
        secure: "Analyses their own games and turns mistakes into practice.",
      },
    ],
  },
];

export const chess812: CurriculumProgramme = {
  id: "chess-8-12",
  slug: "chess-8-12",
  title: "chess",
  category: "chess",
  ageGroup: "8-12",
  ageLabel: "ages 8–12",
  tagline: "notation, openings, tactics and checkmates — think deeper and steer the game.",
  description:
    "the intermediate year deepens the same five skills — children record games in notation, open with real principles and named openings, use tactics (forks, pins, skewers, discovered attacks) in their own games, deliver the standard checkmates, and handle a clock and tournament etiquette while steering a game with a plan they can explain.",
  totalSessions: 12,
  skillAreas: skillAreas812,
  segmentDefinitions: chessSegmentDefinitions,
  sessionTable: sessionTable812,
  activities: chessActivities,
  checkpoints: checkpoints812,
  ageBandComparison: chessAgeBandComparison,
};
