import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  LanguageBook,
  ProgrammeSong,
} from "@/content/types";

/* ─── Playground games — 9 skill-tagged language games that rotate
 * across sessions so all five skills are covered each week. ─────── */

const playgroundGames: Record<string, CurriculumActivity> = {
  "whats-that-sound-lang": {
    id: "whats-that-sound-lang",
    segment: "playground",
    title: "what's that sound",
    setupLine: "Make a sound and let your friends guess.",
    howToPlay:
      "Children learn to listen, recognise sounds, and speak clearly. Setup: children sit in a circle, sound cards in a pile. Turn order: one child plays at a time. On their turn, the child picks a card, looks at it (others should not see), and makes the sound — for example, dog → woof woof. Other children guess. If the guess is correct, the child keeps the card. If not, the next child plays.",
    materials: ["Sound cards"],
    variations: [
      { name: "Sound + act", description: "Child makes the sound and acts the thing out." },
      { name: "Teacher leads", description: "Teacher makes the sound and children guess." },
      { name: "One category", description: "Use only one category at a time — animals, vehicles, instruments." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Children repeat the sound after the teacher." },
      { level: "Medium", description: "Children guess the sound." },
      { level: "Harder", description: "Child names the source and uses it in a sentence." },
      { level: "Hardest", description: "Child creates a short story around the sound." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "rhyming-house": {
    id: "rhyming-house",
    segment: "playground",
    title: "rhyme house",
    setupLine: "Open windows and find rhyming pairs.",
    howToPlay:
      "Children learn to identify rhyming sounds. Setup: place all window cards face down on the house mat; children sit around. Turn order: one child at a time. On their turn, the child picks any 2 windows, opens them, and says both words. If the words rhyme, they keep both windows and get another turn. If not, the windows close and the next child plays. The game ends when all rhyming pairs are found.",
    materials: ["House mat", "Window cards"],
    variations: [
      { name: "Whole class", description: "The whole class says the two words together." },
      { name: "Teacher prompt", description: "Teacher helps after 5 seconds if the child is stuck." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Teacher says both words." },
      { level: "Medium", description: "Child repeats after the teacher." },
      { level: "Harder", description: "Child reads and identifies independently." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "rhyming-ornaments": {
    id: "rhyming-ornaments",
    segment: "playground",
    title: "rhyming ornaments",
    setupLine: "Say a rhyming word and collect.",
    howToPlay:
      "Children produce rhyming words. Setup: place ornaments on the tree. Turn order: one child at a time. On their turn, the child picks one ornament, says the word on it, and says a rhyming word back. If correct, they keep the ornament. If not, the ornament goes back on the tree. The game ends when the ornaments finish.",
    materials: ["Ornament cards"],
    variations: [
      { name: "Group help", description: "Other children help after the first attempt." },
      { name: "Two rhymes", description: "Child has to say two rhyming words instead of one." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Teacher gives the rhyme." },
      { level: "Medium", description: "Child gives one rhyme." },
      { level: "Harder", description: "Child gives two rhymes." },
      { level: "Hardest", description: "Child uses the rhyme in a sentence." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "syllable-sprint": {
    id: "syllable-sprint",
    segment: "playground",
    title: "syllable sprint",
    setupLine: "Clap the word and move forward.",
    howToPlay:
      "Children learn syllables. Setup: each child gets a meeple on the board. Turn order: one child at a time. On their turn, the child gets a word, says it, claps each syllable, and moves their meeple forward by that many spaces. Special cards trigger extra moves: water bowl → go back 2; ledge → skip a turn; see & say → pick a nearby object and clap that. The first child to finish wins.",
    materials: ["Board", "Meeples", "Special cards"],
    variations: [
      { name: "Teacher word bank", description: "Teacher gives all the words." },
      { name: "Child choice", description: "Children pick their own words to clap." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Teacher claps and the child copies." },
      { level: "Medium", description: "Child repeats and claps." },
      { level: "Harder", description: "Child claps independently." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-cube": {
    id: "story-cube",
    segment: "playground",
    title: "story cube",
    setupLine: "Roll and build a story.",
    howToPlay:
      "Children learn storytelling. Story Maker version: one child at a time rolls the cubes, looks at the pictures that land face-up, and speaks. Level 1 — name + 1 sentence. Level 2 — connect 2-3 ideas. Level 3 — full story with beginning, middle, and end. Chain version: each child adds 1 sentence so a story builds together. The game ends after the story is told.",
    materials: ["6 cubes"],
    variations: [
      { name: "Story Maker", description: "Each child rolls and tells their own story." },
      { name: "Chain", description: "Children build one shared story, one sentence at a time." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Name the picture only." },
      { level: "Medium", description: "One sentence." },
      { level: "Harder", description: "Full story." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "language-wheel": {
    id: "language-wheel",
    segment: "playground",
    title: "language wheel",
    setupLine: "Roll, move, and answer the task.",
    howToPlay:
      "Mixed language practice. Turn order: one child at a time. On their turn, the child rolls the dice, moves their piece on the wheel, picks the task card for that spot, and answers. If the answer is correct, the child gets a token.",
    materials: ["Wheel", "Dice", "Task cards"],
    variations: [
      { name: "Team", description: "Children play in teams; the team confers before answering." },
      { name: "Timed", description: "Set a timer for each turn to keep pace." },
      { name: "Goal-based", description: "First child to N tokens wins." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Short answer." },
      { level: "Medium", description: "Sentence." },
      { level: "Harder", description: "Explanation." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "think-fast": {
    id: "think-fast",
    segment: "playground",
    title: "think fast",
    setupLine: "Listen and answer fast.",
    howToPlay:
      "Quick thinking and speaking. Turn order: teacher gives the prompt. The child answers as fast as they can. Correct answers earn a point.",
    materials: ["Prompt cards"],
    variations: [
      { name: "Fastest answer", description: "First child to answer correctly gets the point." },
      { name: "Turn by turn", description: "Each child gets a fresh prompt in order." },
      { name: "Team", description: "Children play as teams; team scores points together." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Answer in 1 word." },
      { level: "Medium", description: "Answer in 2 words." },
      { level: "Harder", description: "Answer in a sentence." },
      { level: "Hardest", description: "Answer with a short explanation." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "guess-me-lang": {
    id: "guess-me-lang",
    segment: "playground",
    title: "guess me",
    setupLine: "Hear three clues. Guess the character or object.",
    howToPlay:
      "The teacher gives three clues about a character or object from the current book — \"I am tall, I am yellow, I cannot dance\". Children guess. The child who guesses correctly gives the next set of three clues.",
    materials: ["A bank of clue sets per book"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "i-spy": {
    id: "i-spy",
    segment: "playground",
    title: "i spy",
    setupLine: "Look, find, and say.",
    howToPlay:
      "Observation and vocabulary. Setup: place the I Spy board in the centre. Turn order: teacher leads. On a turn, the teacher shows a card, children find the matching object on the board, and one child points to it, says its name, then uses it in a sentence.",
    materials: ["I Spy board", "3 decks of cards"],
    variations: [
      { name: "Timed", description: "Set a short timer for each find." },
      { name: "Turn-based", description: "Each child takes a turn to find one object." },
      { name: "Team", description: "Two teams race to find first." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Card shows the picture." },
      { level: "Medium", description: "Card shows the word." },
      { level: "Harder", description: "Card gives a riddle." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "every-body-says-lang": {
    id: "every-body-says-lang",
    segment: "playground",
    title: "every body says",
    setupLine: "Use your body to make things.",
    howToPlay:
      "Movement and expression. Setup: place body cards in a pile so all children can see. Turn order: one child flips a card. All children use their bodies — alone, in pairs, or as a group — to form the thing on the card. The teacher names what they see. The next child flips the next card.",
    materials: ["Body cards"],
    variations: [
      { name: "Solo", description: "Each child forms the object on their own." },
      { name: "Pair", description: "Two children form the object together." },
      { name: "Group", description: "The whole group forms one shared object." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Object — form just the thing on the card." },
      { level: "Medium", description: "Object + action — show the object doing something." },
      { level: "Harder", description: "Object + interaction — two or more objects acting together." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "swat-it-snap-it": {
    id: "swat-it-snap-it",
    segment: "playground",
    title: "swat it snap it",
    setupLine: "Find it fast and hit it.",
    howToPlay:
      "Reading and recognition. Setup: spread the cards face-up around the buckets. Turn order: the teacher calls a target — a letter, a word, or a sentence. Children race to swat the matching card with their swatter, then snap it into the correct bucket and read it aloud. The next round begins on the teacher's call.",
    materials: ["Cards", "Buckets", "Swatters"],
    variations: [
      { name: "Solo", description: "Each child plays at their own pace as the teacher calls targets." },
      { name: "Race", description: "Two children swat at the same time — first to the correct card keeps it." },
      { name: "Team", description: "Children play in teams; team scores points together." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Letter — swat the matching letter card." },
      { level: "Medium", description: "Word — swat the matching word card." },
      { level: "Harder", description: "Sentence — swat the card that completes the sentence." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── Wordsmiths resources — three vocabulary tools that pair with
 * different books. The "see → act → say" sequence is the same across
 * all three. ─────────────────────────────────────────────────────── */

const wordsmithsResources: Record<string, CurriculumActivity> = {
  "emotion-tiles": {
    id: "emotion-tiles",
    segment: "wordsmiths",
    title: "emotion tiles",
    setupLine: "Show the tile. Act the feeling. Use it in a sentence.",
    howToPlay:
      "The teacher holds up an emotion tile (happy, sad, angry, calm, afraid, loving). All children act the feeling together with their faces and bodies. Then one child at a time uses the word in a sentence about the current book — \"the monster felt happy when he sorted his colours\".",
    materials: ["Emotion tile deck — one tile per feeling word"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-calendar": {
    id: "story-calendar",
    segment: "wordsmiths",
    title: "story calendar",
    setupLine: "Show the card. Act the word. Use it in a sentence.",
    howToPlay:
      "The teacher shows a card with a describing or spatial word (clumsy, splendid, under, beside, behind). All children act it out together. Then one child at a time uses the word in a sentence about the current book — \"the giraffe was clumsy on the dance floor\".",
    materials: ["Story calendar — one describing or spatial word per card"],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── 8 books — the spine of the programme.
 * Each runs across 6 days with a deliberate two-book gap. ────────── */

const languageBooks: LanguageBook[] = [
  {
    order: 1,
    title: "We're Going on a Bear Hunt",
    author: "Michael Rosen & Helen Oxenbury",
    ageRange: "Ages 4+ · simple repeating refrains · large font",
    summary:
      "A family sets out to find a bear and meets long grass, a river, mud, a forest, a snowstorm, and a cave along the way.",
    whyThisPosition:
      "The most repetitive and predictable book in the set. Refrains like \"we can't go over it, we can't go under it, we've got to go through it!\" invite children to join in from the very first page. Onomatopoeia (swishy swashy, splash splosh, squelch squerch) builds listening and the foundation of phonological awareness. The right book to begin with — children feel competent immediately.",
    themes: ["onomatopoeia", "repetition", "joining in"],
    vocabulary: [
      "swishy swashy",
      "splash splosh",
      "squelch squerch",
      "stumble trip",
      "tiptoe",
      "hooo woooo",
      "long",
      "wavy",
      "thick",
      "deep",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "story-re-enactment",
    heroImageUrl: "/language-books/01-bear-hunt.png",
  },
  {
    order: 2,
    title: "Mixed: A Colorful Story",
    author: "Arree Chung",
    ageRange: "Ages 4–6 · pre-K to grade 2 · 40 pages",
    summary:
      "Three colours live happily together until they fall out, separate into rival camps, and then mix to create new colours and a richer world.",
    whyThisPosition:
      "Short sentences, strong visual storytelling, and simple spatial vocabulary (under, beside, over). The story has a clear arc — colours together, then apart, then back together — which makes the recalls and sequences ★ observation possible early in the programme.",
    themes: ["colours", "spatial vocabulary", "story arc"],
    vocabulary: [
      "under",
      "beside",
      "over",
      "between",
      "above",
      "below",
      "mix",
      "blend",
      "together",
      "apart",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "change-story-endings",
    heroImageUrl: "/language-books/02-mixed.png",
  },
  {
    order: 3,
    title: "Giraffes Can't Dance",
    author: "Giles Andreae & Guy Parker-Rees",
    ageRange: "Ages 3–7 · rhyming text",
    summary:
      "Gerald the giraffe is sad because he can't dance like the other animals. A wise cricket helps him find his own rhythm.",
    whyThisPosition:
      "A single clear character arc — Gerald is sad, Gerald finds his rhythm, Gerald dances. The rhyming text supports phonological awareness. Introduces describing words like clumsy, slim, and splendid at a manageable density. Group re-enactment is ideal here — Gerald's dancing is physical and easy to act out.",
    themes: ["describing words", "rhyme", "character feelings"],
    vocabulary: [
      "clumsy",
      "slim",
      "splendid",
      "graceful",
      "shy",
      "twirl",
      "swayed",
      "wobble",
      "rhythm",
      "wonderful",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "story-re-enactment",
    heroImageUrl: "/language-books/03-giraffes-cant-dance.png",
  },
  {
    order: 4,
    title: "The Color Monster",
    author: "Anna Llenas",
    ageRange: "Ages 3–7 · simple emotion vocabulary",
    summary:
      "A monster's feelings get jumbled up. With a friend's help, he sorts each emotion into its own colour.",
    whyThisPosition:
      "Emotion vocabulary as the central subject (happy, sad, angry, calm, fear, love). Each emotion gets its own page and colour, so the structure is tightly repetitive. Children now have enough listening confidence to handle a book about feelings, and the vocabulary north star can be reliably observed because the emotion words are clear and concrete.",
    themes: ["emotions", "colour-feeling pairs", "self-regulation"],
    vocabulary: [
      "happy",
      "sad",
      "angry",
      "calm",
      "afraid",
      "loving",
      "jumbled",
      "tangled",
      "sorted",
      "feeling",
    ],
    vocabularyType: "emotion-tiles",
    groupActivityType: "vocabulary-reproduction",
    heroImageUrl: "/language-books/04-color-monster.png",
  },
  {
    order: 5,
    title: "The Lion Inside",
    author: "Rachel Bright & Jim Field",
    ageRange: "Ages 4–7 · rhyming text with emotional arc",
    summary:
      "A small mouse decides to find his roar by climbing up to ask the lion. He discovers that the lion is afraid of him too — and that bravery is bigger than size.",
    whyThisPosition:
      "A more complex emotional journey — small mouse becomes brave mouse becomes small-but-mighty mouse. Best placed mid-programme: children now have enough confidence for the puppet character activity, which asks a child to speak as someone else for sixty seconds.",
    themes: ["bravery", "perspective", "rhyming verse"],
    vocabulary: [
      "tiny",
      "timid",
      "brave",
      "mighty",
      "fierce",
      "afraid",
      "roar",
      "scuttle",
      "tremble",
      "fearless",
    ],
    vocabularyType: "emotion-tiles",
    groupActivityType: "puppet-character",
    heroImageUrl: "/language-books/05-lion-inside.png",
  },
  {
    order: 6,
    title: "How Do Dinosaurs Go to School?",
    author: "Jane Yolen & Mark Teague",
    ageRange: "Ages 4–7 · longer text with rich vocabulary",
    summary:
      "A class of dinosaurs shows all the wrong ways and the right ways to behave at school — interrupt, fidget, stir up, tease … or listen, share, tidy.",
    whyThisPosition:
      "School-behaviour vocabulary (interrupt, fidget, stir up, tease, tidy). Children are now ready to think about social and behavioural concepts. The book invites them to write their own school story — perfect for the day-5 narrative-production activity.",
    themes: ["social vocabulary", "school routines", "longer text"],
    vocabulary: [
      "interrupt",
      "fidget",
      "stir up",
      "tease",
      "tidy",
      "share",
      "listen",
      "polite",
      "patient",
      "kind",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "change-story-endings",
    heroImageUrl: "/language-books/06-dinosaurs-school.png",
  },
  {
    order: 7,
    title: "The Gruffalo",
    author: "Julia Donaldson & Axel Scheffler",
    ageRange: "Ages 3–7 · Lexile AD510L · 32 pages",
    summary:
      "A clever mouse outwits a fox, an owl, and a snake by inventing a fearsome creature called the gruffalo — and then meets the gruffalo for real.",
    whyThisPosition:
      "The most linguistically demanding book in the set. Lexile 510 (adult-directed) is high for this age — children rely on the rhyming structure, the repetition, and the read-aloud adult to access vocabulary like tusks, claws, knobbly knees, poisonous wart, and purple prickles. Children need full vocabulary scaffolding by this point — which they now have, after thirty-six sessions of vocabulary work.",
    themes: ["rich vocabulary", "rhyming verse", "trickster tale"],
    vocabulary: [
      "tusks",
      "claws",
      "knobbly knees",
      "poisonous wart",
      "purple prickles",
      "terrible tusks",
      "scrambled",
      "scurried",
      "stalked",
      "sly",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "puppet-character",
    heroImageUrl: "/language-books/07-gruffalo.png",
  },
  {
    order: 8,
    title: "Bunny Cakes",
    author: "Rosemary Wells",
    ageRange: "Ages 4+ · language-dense · written grocery lists",
    summary:
      "Max wants red-hot marshmallow squirters for his cake, but his sister Ruby keeps misreading his shopping list. Max tries again, and again, until he finds a way to be understood.",
    whyThisPosition:
      "Most demanding for personal storytelling. The \"try, try again\" arc is sophisticated — Max keeps trying different ways to communicate his ingredient. Comes last because the vocabulary reproduction activity and the day-5 personal-storytelling task both ask children to draw on their full speaking and vocabulary base.",
    themes: ["communication", "persistence", "narrative voice"],
    vocabulary: [
      "ingredients",
      "list",
      "icing",
      "scribble",
      "marshmallow",
      "earthworm",
      "bake",
      "spill",
      "scribble",
      "again",
    ],
    vocabularyType: "story-calendar",
    groupActivityType: "vocabulary-reproduction",
    heroImageUrl: "/language-books/08-bunny-cakes.png",
  },
];

/* ─── 5 songs — Roll & Rhyme playlist (Barefoot Books). ───────────── */

const songs: ProgrammeSong[] = [
  {
    order: 1,
    title: "Here We Go Round the Mulberry Bush",
    youtubeId: "LjlwUnVXQ4U",
    whatItBuilds:
      "Routine vocabulary and daily-action verbs (wash, brush, comb). The predictable refrain invites early joining-in.",
    pairsWith: "Settling-in weeks",
    introHint: "Introduce in week 1 — the easiest song to join.",
  },
  {
    order: 2,
    title: "Knick Knack Paddy Whack (This Old Man)",
    youtubeId: "VEHKQCtrHHw",
    whatItBuilds:
      "Counting one to ten, rhyme as the structural game (one — thumb, two — shoe, three — knee), body-part vocabulary, and a cumulative refrain. It does four things at once.",
    pairsWith: "Number sense and general vocabulary",
    introHint:
      "Introduce in week 2 alongside Mulberry Bush. Start with verses 1–3, add 4–6 by mid-programme, finish all 10 verses by the end of the year.",
  },
  {
    order: 3,
    title: "If You're Happy and You Know It",
    youtubeId: "71hqRT9U0wg",
    whatItBuilds:
      "Emotion vocabulary, with the see → act → say pattern built right into the song. Children act out each emotion with their bodies.",
    pairsWith: "The Color Monster",
    introHint: "Introduce when book 4 (The Color Monster) arrives.",
  },
  {
    order: 4,
    title: "Walking Through the Jungle",
    youtubeId: "plvY0quSyJg",
    whatItBuilds:
      "Animal vocabulary, onomatopoeia (roar, hiss, squawk), and a cumulative journey structure that mirrors Bear Hunt.",
    pairsWith: "Bear Hunt and Giraffes Can't Dance",
    introHint: "Introduce mid-programme — once children are confident joining in.",
  },
  {
    order: 5,
    title: "There's a Hole in the Bottom of the Sea",
    youtubeId: "R1Qn2bcZRTo",
    whatItBuilds:
      "Cumulative working memory, sustained sequencing, and a rhyming chain that grows verse by verse. The most demanding song — children rise to meet it across the year.",
    pairsWith: "The Gruffalo and Bunny Cakes",
    introHint:
      "Save for the second half — children need strong listening before they can hold the chain.",
  },
];

/* ─── 48-session schedule ─────────────────────────────────────────
 * 8 books × 6 days = 48 sessions. Each book is taught in two halves:
 * days 1–3 introduce, then a two-book gap, then days 4–6 deepen.
 * The schedule below is the canonical 6-3-2 spiral for an 8-book set.
 */

const BOOK_SCHEDULE: Array<{ bookOrder: number; bookDay: number }> = [
  // Sessions 1–9: introduce books 1, 2, 3
  { bookOrder: 1, bookDay: 1 }, { bookOrder: 1, bookDay: 2 }, { bookOrder: 1, bookDay: 3 },
  { bookOrder: 2, bookDay: 1 }, { bookOrder: 2, bookDay: 2 }, { bookOrder: 2, bookDay: 3 },
  { bookOrder: 3, bookDay: 1 }, { bookOrder: 3, bookDay: 2 }, { bookOrder: 3, bookDay: 3 },
  // Sessions 10–12: book 1 returns (gap = 2 books)
  { bookOrder: 1, bookDay: 4 }, { bookOrder: 1, bookDay: 5 }, { bookOrder: 1, bookDay: 6 },
  // Sessions 13–15: introduce book 4
  { bookOrder: 4, bookDay: 1 }, { bookOrder: 4, bookDay: 2 }, { bookOrder: 4, bookDay: 3 },
  // Sessions 16–18: book 2 returns
  { bookOrder: 2, bookDay: 4 }, { bookOrder: 2, bookDay: 5 }, { bookOrder: 2, bookDay: 6 },
  // Sessions 19–21: introduce book 5
  { bookOrder: 5, bookDay: 1 }, { bookOrder: 5, bookDay: 2 }, { bookOrder: 5, bookDay: 3 },
  // Sessions 22–24: book 3 returns
  { bookOrder: 3, bookDay: 4 }, { bookOrder: 3, bookDay: 5 }, { bookOrder: 3, bookDay: 6 },
  // Sessions 25–27: introduce book 6
  { bookOrder: 6, bookDay: 1 }, { bookOrder: 6, bookDay: 2 }, { bookOrder: 6, bookDay: 3 },
  // Sessions 28–30: book 4 returns
  { bookOrder: 4, bookDay: 4 }, { bookOrder: 4, bookDay: 5 }, { bookOrder: 4, bookDay: 6 },
  // Sessions 31–33: introduce book 7
  { bookOrder: 7, bookDay: 1 }, { bookOrder: 7, bookDay: 2 }, { bookOrder: 7, bookDay: 3 },
  // Sessions 34–36: book 5 returns
  { bookOrder: 5, bookDay: 4 }, { bookOrder: 5, bookDay: 5 }, { bookOrder: 5, bookDay: 6 },
  // Sessions 37–39: introduce book 8
  { bookOrder: 8, bookDay: 1 }, { bookOrder: 8, bookDay: 2 }, { bookOrder: 8, bookDay: 3 },
  // Sessions 40–42: book 6 returns
  { bookOrder: 6, bookDay: 4 }, { bookOrder: 6, bookDay: 5 }, { bookOrder: 6, bookDay: 6 },
  // Sessions 43–45: book 7 returns
  { bookOrder: 7, bookDay: 4 }, { bookOrder: 7, bookDay: 5 }, { bookOrder: 7, bookDay: 6 },
  // Sessions 46–48: book 8 returns
  { bookOrder: 8, bookDay: 4 }, { bookOrder: 8, bookDay: 5 }, { bookOrder: 8, bookDay: 6 },
];

// Songs in the order they get introduced across the 48 sessions.
// Mulberry Bush (1) and Knick Knack (2) come in week 1, then If You're
// Happy (3) when book 4 (The Color Monster) arrives, then Walking
// Through the Jungle (4) mid-programme, then Hole in the Bottom of the
// Sea (5) for the second half. The picker uses the *latest available*
// song id and rotates among the introduced ones.
const SONG_INTRO_AT_SESSION: Record<number, number> = {
  1: 1, // Mulberry Bush from session 1
  2: 1, // Knick Knack from session 1
  3: 13, // If You're Happy when book 4 (The Color Monster) starts
  4: 19, // Walking Through the Jungle when book 5 starts
  5: 31, // Hole in the Bottom of the Sea second half (when book 7 starts)
};

const PLAY_WRITES_MATERIALS = [
  "crayons",
  "yarn",
  "clay",
  "sequins",
  "stamp pad",
];

const PLAYGROUND_ROTATION = Object.keys(playgroundGames);

function pickSong(sessionNumber: number): string {
  const introduced: number[] = [];
  for (const [songOrder, intro] of Object.entries(SONG_INTRO_AT_SESSION)) {
    if (sessionNumber >= intro) introduced.push(Number(songOrder));
  }
  // Rotate among introduced songs by sessionNumber so the playlist
  // cycles, but always favours the newest song right after it joins.
  const ordered = introduced.sort((a, b) => a - b);
  const id = ordered[(sessionNumber - 1) % ordered.length];
  return `song-${id}`;
}

function buildLanguageSessionTable(): CurriculumSessionEntry[] {
  return BOOK_SCHEDULE.map((slot, i) => {
    const sessionNumber = i + 1;
    const book = languageBooks.find((b) => b.order === slot.bookOrder);
    return {
      sessionNumber,
      topicLayer: 1,
      // Language segment assignments
      rollRhyme: pickSong(sessionNumber),
      bookOClock: `book-${slot.bookOrder}`,
      wordsmiths: book?.vocabularyType ?? "story-calendar",
      playWrites: PLAY_WRITES_MATERIALS[(sessionNumber - 1) % PLAY_WRITES_MATERIALS.length],
      playground: PLAYGROUND_ROTATION[(sessionNumber - 1) % PLAYGROUND_ROTATION.length],
      experienceBook: "experience-book",
      // Book metadata for the day-plan renderer
      bookOrder: slot.bookOrder,
      bookDay: slot.bookDay,
      bookTitle: book?.title,
    };
  });
}

/* ─── Programme ───────────────────────────────────────────────────── */

export const languageStorytelling35: CurriculumProgramme = {
  id: "language-storytelling-3-5",
  slug: "language-storytelling-3-5",
  title: "language through storytelling",
  category: "language",
  ageGroup: "3-5",
  ageLabel: "ages 3–5",
  heroImageUrl: "/prog-language-3-5.gif",
  tagline:
    "build listening, speaking, reading, and writing through stories, songs, and mark-making.",
  description:
    "At Openhouse, language is learnt through the world of stories — a holistic emergent-literacy programme that builds listening, speaking, reading, and early writing through books, songs, games, and playful practice.",
  totalSessions: 48,
  skillAreas: [
    {
      id: "listening",
      name: "listening",
      shortName: "listening",
      abilities: [
        {
          name: "attends and joins in",
          description:
            "Listens to a story or rhyme. Joins in with repeated words, phrases, or song lines when prompted.",
        },
        {
          name: "follows and responds",
          description:
            "Carries out two- or three-step instructions during a familiar activity. Answers what, who, and where questions about a story without prompting.",
        },
        {
          name: "recalls and sequences",
          description:
            "Recalls key events from a story without being prompted. Retells or places events in sequence.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "speaking",
      name: "speaking",
      shortName: "speaking",
      abilities: [
        {
          name: "names and describes",
          description:
            "Uses words or short phrases to name a character, object, or feeling from the story.",
        },
        {
          name: "speaks in sentences",
          description:
            "Uses complete sentences to describe what is happening in a picture or story with minimal adult prompting.",
        },
        {
          name: "retells and connects",
          description:
            "Retells a story event in their own words. Connects it to a personal experience or to another book.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "reading",
      name: "reading",
      shortName: "reading",
      abilities: [
        {
          name: "follows a story",
          description:
            "Points to or names characters, objects, or places while listening. Identifies how a character feels using pictures.",
        },
        {
          name: "predicts and infers",
          description:
            "Predicts what happens next using visual clues. Orders two or three story pictures. Identifies why a character acted in a certain way.",
        },
        {
          name: "retells with comprehension",
          description:
            "Retells a familiar story naming characters and key events. Shares and explains a preference or opinion about a character or story.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "vocabulary",
      name: "vocabulary",
      shortName: "vocabulary",
      abilities: [
        {
          name: "recognises the word",
          description:
            "Points to or selects the correct picture or tile when the word is said aloud. Understands the word receptively.",
        },
        {
          name: "uses the word with support",
          description:
            "Uses the target word correctly when prompted — in a sentence frame, a see → act → say sequence, or a game.",
        },
        {
          name: "uses the word independently",
          description:
            "Uses the target word accurately in conversation, retelling, or play without being asked to.",
          isNorthStar: true,
        },
      ],
    },
    {
      id: "play-writes",
      name: "play-writes",
      shortName: "play-writes",
      abilities: [
        {
          name: "makes marks freely",
          description:
            "Uses tools to make large marks — swirls, dots, free lines — using whole-arm movements.",
        },
        {
          name: "makes controlled strokes",
          description:
            "Draws straight lines, curves, and circular shapes with deliberate hand movement. Combines strokes into simple patterns.",
        },
        {
          name: "represents with marks",
          description:
            "Uses drawings or marks intentionally to represent a character, object, or event from the current book. Names what it shows when asked.",
          isNorthStar: true,
        },
      ],
    },
  ],
  segmentDefinitions: [
    {
      id: "roll-rhyme",
      name: "Roll & Rhyme",
      durationRange: "10 min",
      objective:
        "A whole-class warm-up using a fixed playlist of five Barefoot Books songs. The same songs return throughout the year so children build full mastery — joining in, leading, and inventing variations.",
      type: "rotating",
      rotationPool: [],
    },
    {
      id: "book-o-clock",
      name: "Book'o'Clock",
      durationRange: "25 min",
      objective:
        "The spine of the session. Day 1 is read without stopping — the story must be felt whole before it is examined. On days 3 and 6 children draw a response — these are the primary play-writes and vocabulary north star assessment moments. On days 4–6 the educator reads more fluently, pauses longer, and expects more — children already know the story and can carry more of the language. Book'o'Clock and Wordsmiths happen together as the central learning block.",
      type: "fixed",
    },
    {
      id: "wordsmiths",
      name: "Wordsmiths",
      durationRange: "10 min",
      objective:
        "One vocabulary resource per session, matched to the current book's vocabulary type — emotion tiles for feeling words, story calendar for describing, action, and spatial words. The see → act → say sequence is always the same: the educator shows the tile or card, all children act the word together, then one child at a time uses it in a sentence. Acting is always whole-group — no child is singled out.",
      type: "rotating",
      rotationPool: Object.keys(wordsmithsResources),
    },
    {
      id: "play-writes",
      name: "Play-Writes",
      durationRange: "10 min",
      objective:
        "Individual A4 play-writes books. Every child works simultaneously and independently. Materials rotate across sessions — crayons, yarn, clay or play-doh, sequins or stickers, stamp pad. Pages are open enough that any child at any level finds meaningful work. The educator circulates and names what they see — no correcting. The last page of each book section connects to the current book.",
      type: "fixed",
    },
    {
      id: "playground",
      name: "Playground",
      durationRange: "15 min",
      objective:
        "One game per session, rotating by skill tag so all five skills are covered across the week. Games are connected to the current book — children play with characters, words, and events they already know.",
      type: "rotating",
      rotationPool: Object.keys(playgroundGames),
    },
    {
      id: "experience-book",
      name: "Experience Book",
      durationRange: "10 min",
      objective:
        "Each child has a personal experience book. The teacher records what happened in the session and what the child built. The child adds one drawing of their own. The book goes home regularly so parents can see the child's growth.",
      type: "fixed",
    },
  ],
  sessionTable: buildLanguageSessionTable(),
  activities: { ...playgroundGames, ...wordsmithsResources },
  checkpoints: [],
  languageBooks,
  songs,
};
