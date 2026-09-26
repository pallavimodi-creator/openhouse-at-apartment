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
      "play curated games to learn the core concepts of chess. rotates between five games — chain capture, board architect, piece patrol, last man standing, and bees & lilies.",
    type: "rotating",
    rotationPool: [
      "chain-capture",
      "board-architect",
      "piece-patrol",
      "last-man-standing",
      "bees-lilies",
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
  // ── Tempo — mind & movement warm-ups (2 min, one per class) ──
  "mind-game-1": {
    id: "mind-game-1",
    segment: "tempo",
    title: "mind game 1 · silent board scan",
    setupLine:
      "arms folded, scan the whole board with your eyes only for 30 seconds — no touching.",
    howToPlay:
      "students sit with their arms folded or held behind their backs and silently scan their chessboards using only their eyes for thirty seconds — without touching any pieces or the table. they then take a deep breath and rest their hands flat to begin play.",
    skillIds: ["bv", "re"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "mind-game-2": {
    id: "mind-game-2",
    segment: "tempo",
    title: "mind game 2 · picture the board",
    setupLine:
      "eyes closed, build the starting position in your mind, then open to check it.",
    howToPlay:
      "students sit tall with their eyes closed and silently visualise an empty chessboard with its edge coordinates, then mentally arrange the complete starting army and hold the image in total focus. they open their eyes to verify their mental map against the physical board.",
    skillIds: ["bv", "gm"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "movement-game-1": {
    id: "movement-game-1",
    segment: "tempo",
    title: "movement game 1 · piece poses",
    setupLine:
      "stand behind your chair and strike the pose for each piece the instructor calls.",
    howToPlay:
      "students stand behind their chairs and follow the instructor's count, executing synchronised poses that represent the different chess pieces called out — transitioning between each posture, then freezing on the final beat to take a deep breath and sit down in total silence with hands flat on the table.",
    skillIds: ["re", "gm"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "movement-game-2": {
    id: "movement-game-2",
    segment: "tempo",
    title: "movement game 2 · clap-back rhythm",
    setupLine:
      "clap the instructor's rhythm back in unison — faster and trickier each round.",
    howToPlay:
      "students listen closely to a distinct rhythmic pattern clapped by the instructor and repeat it back together in unison, advancing through progressively faster and more complex sequences to lock in collective focus.",
    skillIds: ["re"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "movement-game-3": {
    id: "movement-game-3",
    segment: "tempo",
    title: "movement game 3 · mirror moves",
    setupLine:
      "mirror the instructor's slow hand movements, then flow into your seat on the cue.",
    howToPlay:
      "students stand facing the instructor in complete silence, mirroring a sequence of slow, deliberate hand and arm movements with zero delay, before following a final visual cue that guides them smoothly into a seated posture at their chessboards.",
    skillIds: ["bv", "re"],
    debriefPrompts: [],
    type: "physical-game",
  },
  // ── Tempo — chess-centric warm-up drills (5 min, one per class; choose one tied to the last lesson) ──
  "warmup-coordinate-laser-snap": {
    id: "warmup-coordinate-laser-snap",
    segment: "tempo",
    title: "coordinate laser snap",
    setupLine:
      "hear a square, find it with your eyes, then on “snap!” hover a finger just above it.",
    howToPlay:
      "students sit facing their board (empty or set up) with hands flat on their laps. the teacher calls a target coordinate (e.g. “square d4!”); students locate it using only their eyes. on the command “snap!”, they reach out and hover an index finger one inch above the square without touching the board. the teacher scans for 100% accuracy, calls “reset!”, and repeats with 3–4 rapid coordinates across different files and ranks. (target: pawn & knight levels — builds rapid coordinate literacy a1–h8 and rank/file orientation.)",
    skillIds: ["bv", "gm"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "warmup-colour-radar": {
    id: "warmup-colour-radar",
    segment: "tempo",
    title: "colour radar",
    setupLine:
      "track a called square in your mind, then shout its colour — light or dark.",
    howToPlay:
      "students sit back with arms crossed. the teacher calls a coordinate (e.g. “c1!”); without moving their hands, students track the square mentally with their eyes for two seconds. on the count of three the class shouts the square’s colour in unison — “dark!” or “light!”. the teacher then layers a single-step path (“step one square up to c2 — what colour?”). (target: pawn & knight levels — mental coordinate visualisation and square-colour awareness, priming bishop diagonals and knight colour-alternation.)",
    skillIds: ["bv"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "warmup-invisible-laser-ray": {
    id: "warmup-invisible-laser-ray",
    segment: "tempo",
    title: "the invisible laser ray",
    setupLine:
      "trace every square a long-range piece controls with your eyes, then flag safe vs danger squares.",
    howToPlay:
      "the teacher places a single long-range piece (rook or bishop) on an open demo board (e.g. a black rook on d4). on “activate laser beams!”, students silently trace every rank and file (or diagonal) the piece controls using their eyes only. the teacher points to 3 random squares one by one (e.g. d7, f5, b4); for each, students instantly flash a thumbs-up (safe square) or thumbs-down (danger zone). (target: knight & bishop levels — spotting attack trajectories and telling safe squares from danger squares before touching a piece.)",
    skillIds: ["bv", "ca"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "warmup-hanging-target-freeze-frame": {
    id: "warmup-hanging-target-freeze-frame",
    segment: "tempo",
    title: "hanging target freeze-frame",
    setupLine:
      "scan a small position in silence and spot the one undefended piece.",
    howToPlay:
      "the teacher sets a 4-to-6 piece position on the demo board containing exactly one undefended (“hanging”) piece. on “scan, don’t touch!”, students silently scan the board for fifteen seconds to find it. on the teacher’s clap they raise hands; the chosen student names the piece and its coordinate in proper terms (e.g. “free black knight on b5!”), and the class confirms by pointing out why no enemy piece protects it. (target: pawn & knight levels — builds the habit of scanning for undefended pieces and reduces piece-dropping blunders.)",
    skillIds: ["bv", "ca"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "warmup-cpr-escape-sprint": {
    id: "warmup-cpr-escape-sprint",
    segment: "tempo",
    title: "the c.p.r. escape sprint",
    setupLine:
      "king in check — run the C-P-R protocol: capture, protect, or run.",
    howToPlay:
      "the teacher displays a position where the white king is in check and calls “king in check! run code CPR!”, then steps through the three letters rapidly with the class: C — capture (“can we capture the attacker?” — thumbs up/down, then name the piece); P — protect/block (“can we block the attack line with a shield?” — check the intervening squares); R — run (“where can the king run safely?” — identify all safe escape squares). (target: knight & bishop levels — replaces panic with a systematic 3-step response whenever a check or threat appears.)",
    skillIds: ["ca"],
    debriefPrompts: [],
    type: "physical-game",
  },
  // ── Chessiverse — learn the concepts ──
  "chain-capture": {
    id: "chain-capture",
    segment: "chessiverse",
    title: "chain capture",
    setupLine:
      "capture every target on the board in one continuous chain — a legal capture on every single move until all targets are removed.",
    howToPlay:
      "set up the challenge position. the child must capture every target piece in a continuous sequence — making a legal capture on every single move. if they make a non-capturing move or run out of legal captures before clearing the board, the chain breaks and they reset and try again.",
    goal: "the child clears the board by making a legal capture on every move until all target pieces are removed.",
    materials: ["standard chess board and pieces"],
    skillIds: ["ca", "sy"],
    difficultyLevels: [
      { level: "Intro", description: "fewer pieces with no constraints — capture all the targets along a clear route." },
      { level: "Practice", description: "a full chain with obvious choices; any non-capturing move triggers an immediate reset." },
      { level: "Challenge", description: "more pieces with crossroads of choices — only one accurate sequence clears the board without running out of captures." },
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
    promptHeading: "clue question bank — read a clue; the child walks to that piece's station (illustrative, not a rigid script)",
    prompts: [
      "— level 1 · pawn milestone (movement geometry & visual basics) —",
      "which piece moves only along diagonal lines? → bishop",
      "which piece hops over other pieces in the shape of the letter “L”? → knight",
      "which piece glides along ranks and files like a train on tracks? → rook",
      "which piece is the tallest on the board and wears a cross at the top of its crown? → king",
      "which piece is worth 1 point and marches one single step straight forward? → pawn",
      "which piece can slide in any direction — straight or diagonally — as far as an open path allows? → queen",
      "which piece is the smallest on the board and starts with an army of 8? → pawn",
      "which piece stands in the four corners of the board at the very start of every game? → rook",
      "which piece is carved with the head and mane of a proud horse? → knight",
      "which piece can step only one single square in any direction at a time? → king",
      "which piece starts beside the king and queen on the back rank and slices diagonally through the board? → bishop",
      "which piece is worth 9 points and is the most powerful attacker in the army? → queen",
      "which piece is worth 5 points and looks like a castle tower fortress? → rook",
      "which piece is worth 3 points and is the only piece permitted to jump over friends and foes? → knight",
      "which piece combines the full moving powers of both the rook and the bishop into one force? → queen",
      "— level 2 · knight milestone (piece personalities, values & board roles) —",
      "which piece is locked onto one colour for the entire game and can never visit the other 32 squares? → bishop",
      "which is the most important piece in the entire army? → king",
      "which piece specialises in attacking two or more enemy pieces at once with a fork? → knight",
      "which heavy piece coordinates with its partner along open files and ranks to make an attacking battery? → rook",
      "which piece is so valuable that developing it too early usually gets it chased and trapped by enemy pawns? → queen",
      "which minor piece is worth 3 points and prefers crowded, locked positions where it can hop into enemy territory? → knight",
      "which piece can never be physically captured and removed from the board throughout the game? → king",
      "which heavy piece teams up with the queen to execute the “roller checkmate” across ranks and files? → rook (queen also acceptable)",
      "which pair of pieces is dedicated one to light squares and the other to dark squares? → bishop",
      "which humble piece may choose between a two-square leap or a single step on its very first move? → pawn",
      "which piece moves straight but captures enemy pieces diagonally? → pawn",
      "which long-range piece acts like a silent sniper, controlling open diagonals corner to corner? → bishop",
      "which piece hides behind pawns in the opening but steps boldly into the centre as an active attacker in the endgame? → king",
      "which heavy piece commands open files and is worth more than a knight or a bishop? → rook",
      "which pieces lock together to build shields and structures that decide whether the centre is open or closed? → pawn",
      "— level 3 · bishop milestone (rules, advanced mechanics & invariants) —",
      "which piece moves and captures in different directions? → pawn",
      "which piece inevitably changes its square colour on every single move it makes? → knight",
      "which piece initiates the only special move in chess where two pieces move in a single turn? → king",
      "which corner piece takes part in castling by the king leaping over it to the adjacent central square? → rook",
      "which piece possesses the power of promotion upon reaching the opposite edge of the board? → pawn",
      "which piece is legally forbidden from stepping onto an attacked square under any circumstances? → king",
      "which piece excels at pinning an enemy piece directly to its king along long open diagonals? → bishop",
      "which piece can be captured using the special en passant rule right after it makes a two-square leap? → pawn",
      "which piece delivers the “kiss of death” checkmate in front of the enemy king with the close support of its own king? → queen",
      "which piece is immune to being blocked because its movement does not travel along a continuous line? → knight",
      "which heavy piece invades the 7th rank in the endgame to sweep pawns and trap the king on the back rank? → rook",
      "which piece is called “bad” when its own pawns are locked on squares of its own colour, limiting its mobility? → bishop",
      "which piece can never legally stand on a square directly touching its enemy counterpart? → king",
      "which piece is most often brought out prematurely in early mate attempts like scholar's mate, then counterattacked? → queen",
      "which piece thrives on an advanced central outpost square where no enemy pawn can ever drive it away? → knight",
    ],
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
  "bees-lilies": {
    id: "bees-lilies",
    segment: "chessiverse",
    title: "bees & lilies",
    setupLine:
      "route the hero piece to the lily marker in the exact number of moves — never landing on a bee token, never stepping into an enemy's attack line.",
    howToPlay:
      "place the hero piece on its start square and the lily flower marker on its target square, with physical bee tokens and stationary enemy pieces on the board. the child moves the hero to the lily in exactly the move par printed on the challenge card — never landing on a bee token (that would be a sting), and never stepping into a stationary enemy's attack line.",
    goal: "the child routes the hero piece to the lily marker in the exact move count, avoiding bee tokens without getting stung and dodging enemy attack lines.",
    materials: [
      "hero piece + lily flower marker",
      "bee hazard tokens",
      "stationary enemy pieces",
      "boundary framers",
      "100 challenge flashcards",
      "master study game question bank",
    ],
    skillIds: ["bv", "ca"],
    difficultyLevels: [
      { level: "Intro", description: "short routes with a couple of bee tokens." },
      { level: "Practice", description: "an expanded board area and more bee tokens to navigate, without any enemy pieces." },
      { level: "Progression", description: "stationary enemy pieces are introduced alongside dense bee hazards to test calculation through active attack lines." },
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
      "two teams take turns at a central board — one legal move each, then tag the next teammate.",
    howToPlay:
      "students divide into two teams and take alternating turns stepping up to a central board in a fixed sequential line-up. each player makes exactly one legal move before tagging the next teammate — so the team collaboratively coordinates opening development, tactical attacks and checkmate defence under strict team discipline.",
    goal: "teams coordinate a single game together, one move per player, under team discipline.",
    players: "teams",
    materials: ["standard chess board and pieces"],
    skillIds: ["gm", "sy", "re"],
    educatorNote:
      "squad relay turns a game into a team sport — game mechanics (every move must be legal), synthesis (coordinating one shared plan) and resilience (waiting your turn, backing your team).",
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
    skillIds: ["gm", "re"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "board-reporter": {
    id: "board-reporter",
    segment: "rising-pawns",
    title: "board reporter",
    setupLine: "present a short recap of a game at the demo board, then take peer questions.",
    howToPlay:
      "a student steps up to the demonstration board to present a brief recap of a selected game — walking through the key positions and the decisions made — before answering questions from their peers.",
    goal: "the child presents and explains a game at the demo board and fields peer questions.",
    materials: ["demonstration board"],
    skillIds: ["re", "sy"],
    educatorNote:
      "board reporter builds resilience (speaking up and taking questions) and synthesis (explaining why the moves were made).",
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
    "record games in notation and open with sound principles",
    "deliver the standard checkmates (two-rook, queen) and solve mate in one and two",
    "spot and use tactics — forks, pins, skewers, discovered attacks — in their own games",
    "handle a clock and tournament etiquette, and steer a game with a plan they can explain",
  ],
  note:
    "the same four-part class and the same five skills — the games and challenges simply go deeper for the older band.",
};

// ─── Chess L1 milestones (shared) — Pawn → Knight → Bishop ───
// The named ranks a child climbs across the Level-1 beginner year (12 months).
// Same for both age bands; sourced from the OH L1 curriculum framework.
export const chessMilestones = [
  {
    rank: "Pawn",
    duration: "3 months",
    objective:
      "the first purposeful steps into the chess universe — building foundational board awareness, basic piece movements, and patient discipline, and understanding the primary goal of checkmate.",
    learnings: [
      "sets up the board, explains piece movements, and applies their relative point values (game mechanics)",
      "identifies hanging pieces and captures them in a given setup (calculation)",
      "recognises and demonstrates the core concepts of check and checkmate (game mechanics)",
      "scans the board to identify safe versus unsafe squares before moving (board vision)",
      "follows teacher instructions during exercises, puzzles and mini-games (resilience)",
    ],
    progression: [
      "challenges Stockfish Level 1 in a full game that ends in checkmate or stalemate (milestone challenge 1)",
      "completes starting-position setup, puzzle-position setup and piece-movement drills with 100% accuracy (continuous)",
      "plays the mini-games — chain capture, board architect (visual), bees & lilies and last man standing — with confidence (continuous)",
      "solves mate-in-one and hanging-piece puzzles, clearly telling check from checkmate and hanging from protected pieces (continuous)",
    ],
  },
  {
    rank: "Knight",
    duration: "4 months",
    objective:
      "leaping into active play and clever tactics — navigating threats, mastering core opening development, and building sharp gameplay habits, plus the basics of algebraic notation.",
    learnings: [
      "demonstrates core opening principles: controls the centre, develops pieces early, and castles the king (synthesis)",
      "identifies and responds to checks using CPR — capture, protect/block, run away (calculation)",
      "demonstrates and recognises the concept of stalemate, and executes pawn promotions correctly (game mechanics)",
      "solves easy and medium mate-in-1 puzzles (calculation)",
      "demonstrates elementary checkmate with queen and rook (synthesis)",
      "understands legal versus illegal moves during active play (game mechanics)",
      "displays courtesy by taking turns and respecting the opponent (resilience)",
    ],
    progression: [
      "beats Stockfish Level 2 in a full game while adhering to competitive rules (milestone challenge 1)",
      "participates in the mandatory showcase event and optional online tournaments for match experience (continuous)",
      "demonstrates core opening principles while correctly applying castling and pawn-promotion rules (continuous)",
      "confidently solves time-bound mate-in-1 and hanging-piece challenges with high accuracy (milestone challenge 2)",
      "executes a clean queen & rook roller checkmate, finishing efficiently without stalemate (milestone challenges 3 & 4)",
      "reads and writes basic algebraic notation to record moves — e.g. the first 10 moves of a game (continuous)",
    ],
  },
  {
    rank: "Bishop",
    duration: "5 months",
    objective:
      "looking deep across the board and calculating ahead — long-range vision, decisive tactics, heavy-piece endgame mates, and stepping into the competitive arena.",
    learnings: [
      "identifies and flags illegal moves or setups during play (game mechanics)",
      "demonstrates and recognises single-move tactics (calculation)",
      "demonstrates elementary checkmate with two rooks and with a queen (synthesis)",
      "solves harder mate-in-1 and easy mate-in-2 puzzles (calculation)",
      "plans candidate moves instead of simply reacting to the opponent (calculation)",
      "stays focused throughout the game and shows sportsmanship in victory and defeat (resilience)",
    ],
    progression: [
      "plays 5 full competitive games in complete algebraic notation, consciously practising the touch-move rule (milestone challenge 1)",
      "identifies illegal moves accurately and reports each as it occurs, ending the game if either player commits 3 (continuous)",
      "executes clean two-rook roller and solo-queen checkmates efficiently without stalemate (milestone challenges 2 & 3)",
      "understands minimum checkmating material and two draws — stalemate and insufficient material, two kings (continuous)",
      "solves time-bound medium mate-in-1 puzzles and basic tactical patterns (milestone challenges 4 & 5)",
      "participates in a mandatory intra/inter-Openhouse showcase plus regular online practice (continuous)",
      "crosses a Lichess Rapid rating of 800 once — dropping below later does not break this (milestone challenge 6)",
    ],
  },
];

// ─── Chess 5–8 · skill ladders (LOs, ★ = milestone) ─────────
const skillAreas58 = [
  {
    id: "gm",
    name: "Game Mechanics",
    shortName: "GM",
    abilities: [
      {
        name: "knows the basic rules",
        description:
          "board setup, how each piece moves, the coordinates, and the piece values.",
      },
      {
        name: "understands check, capture, checkmate & stalemate",
        description:
          "knows checkmate is the primary objective, and recognises a stalemate.",
      },
      {
        name: "castles and promotes correctly",
        description: "executes castling and pawn promotion by the rules.",
      },
      {
        name: "flags illegal moves during play",
        description: "identifies and flags moves that break the rules as they happen.",
      },
      {
        name: "implements the rules and game-completion criteria",
        description:
          "plays by the rules and the ending conditions, and flags moves that break them as illegal — developing integrity, attention to detail, conflict resolution and accountability.",
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
        name: "maps every piece's range",
        description:
          "sees the full range of each piece to spot hanging targets instantly.",
      },
      {
        name: "talks through a position",
        description:
          "communicates ideas clearly about a static position under discussion.",
      },
      {
        name: "reconstructs a position",
        description: "rebuilds a position shown visually, verbally, or in writing.",
      },
      {
        name: "tracks the spatial balance",
        description:
          "tracks how every move shifts control — some squares won, some left behind.",
      },
      {
        name: "turns the board into a map",
        description:
          "sees the immediate threats of every piece — unlocking awareness, observation, spatial control and visualisation.",
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
        name: "tracks material balance",
        description:
          "watches the material during exchanges to make profitable trades.",
      },
      {
        name: "escapes check with CPR",
        description:
          "applies the CPR framework — capture, protect/block, run away — to get out of check.",
      },
      {
        name: "holds the movement rules in mind",
        description: "keeps the legal-movement rules active while playing.",
      },
      {
        name: "evaluates who is ahead",
        description:
          "reads the current position to judge who has the upper hand.",
      },
      {
        name: "applies working memory & one-step logic",
        description:
          "uses piece rules, piece values and single-step conditional logic — building decision-making, problem-solving, critical thinking and pattern recognition.",
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
        name: "follows the opening rules",
        description:
          "controls the central squares, develops minor pieces, and castles early.",
      },
      {
        name: "avoids early-game pitfalls",
        description:
          "sidesteps Scholar's Mate, an early queen, and unnecessary pawn moves.",
      },
      {
        name: "gives each piece a role",
        description:
          "coordinates pieces by assigning each a specific role in a plan.",
      },
      {
        name: "recalls checkmate patterns",
        description: "remembers checkmate patterns at the moment of execution.",
      },
      {
        name: "develops, plans & executes cleanly",
        description:
          "follows sound sequential rules and techniques for clean development, planning and execution.",
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
        name: "plays courteously",
        description: "takes turns and respects the other players.",
      },
      {
        name: "manages reactions after a blunder",
        description: "handles the immediate feelings after a mistake or blunder.",
      },
      {
        name: "stays fully focused",
        description: "keeps complete focus during instruction and gameplay alike.",
      },
      {
        name: "accepts the result gracefully",
        description:
          "accepts outcomes calmly — “all the best!” before and “good game!” after.",
      },
      {
        name: "self-regulates with good etiquette",
        description:
          "practises emotional self-regulation and respectful etiquette — for focused decisions, patience and good sportsmanship.",
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
  { sessionNumber: 6, chessiverse: "bees-lilies", risingPawns: "squad-relay", chessFocus: "bees & lilies (intro & practice) · squad relay (20 moves)", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 7, chessiverse: "last-man-standing", risingPawns: "pawn-wars", chessFocus: "last man standing (intro & practice) · pawn wars", topicLayer: 2 },
  { sessionNumber: 8, chessiverse: "bees-lilies", risingPawns: "squad-relay", chessFocus: "bees & lilies + last man standing (challenge) · squad relay (full game)", topicLayer: 2 },
  { sessionNumber: 9, chessiverse: "bees-lilies", risingPawns: "paired-gameplay", chessFocus: "bees & lilies (progression) · paired gameplay (first 20 moves)", topicLayer: 3 },
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
  milestones: chessMilestones,
  ageBandComparison: chessAgeBandComparison,
};
