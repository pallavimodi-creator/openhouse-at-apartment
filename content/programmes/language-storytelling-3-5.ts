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
      "Children learn to listen, recognise sounds, and speak clearly. Setup: children sit in a circle, sound cards in a pile. Turn order: one child plays at a time. On their turn, the child picks a card, looks at it (others should not see), and makes the sound — for example, dog → woof woof. Other children guess. If the guess is correct, the child keeps the card. If not, the next child plays. Game ends after a set time or a set number of rounds.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child picks a sound card and makes that sound so friends can guess what's on it.",
    steps: [
      "sit the children in a circle. keep the sound cards face-down in a pile in the middle.",
      "the first child picks the top card and looks at it — others should not see.",
      "the child makes the sound of what's on the card. e.g. dog → woof woof.",
      "the other children guess what it is.",
      "if the guess is right, the child keeps the card. if not, the next child plays.",
    ],
    endsWhen: "you reach a set time or every child has had a turn.",
    easierVariation:
      "you make the sound first; the children repeat it, then guess together. use only animal and body cards.",
    harderVariation:
      "the child makes the sound AND acts the thing out with their body. use every category and add a timer.",
    skillIds: ["listening", "speaking", "vocabulary"],
    materials: [
      "Sound cards:",
      "1. Animal cards",
      "2. Vehicle cards",
      "3. Daily objects",
      "4. Musical instruments cards",
      "5. Body cards",
      "6. Nature cards",
    ],
    variations: [
      { name: "Sound + act", description: "Child makes the sound and acts the thing out." },
      { name: "Educator leads", description: "Educator makes the sound and children guess. Children can also repeat the sound after the educator to learn the sounds." },
      { name: "One category", description: "Use only one category at a time — animals, vehicles, instruments. The educator can name the category before the play." },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator-led variation; use Animal and Body sound cards." },
      { level: "Medium", description: "Sound + act and one-category variation; use Daily objects and vehicle cards." },
      { level: "Hard", description: "Use all the cards with time constraints." },
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
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child opens two windows on the house and finds a rhyming pair.",
    steps: [
      "place all the window cards face-down on the house mat. sit the children around it.",
      "on the first child's turn, they pick any 2 windows and open them.",
      "the child says both words out loud.",
      "if the two words rhyme, they keep both windows and get another turn.",
      "if not, close the windows. the next child plays.",
    ],
    endsWhen: "every rhyming pair on the mat has been found.",
    easierVariation:
      "you say both words for the child. they repeat them and tell you if they rhyme.",
    harderVariation:
      "the child opens one window, says the word, and then names a rhyming word of their own.",
    skillIds: ["listening", "reading", "speaking"],
    materials: ["House mat", "Window cards"],
    variations: [
      { name: "Whole class", description: "The whole class says the two words together." },
      { name: "Rhyme Pair Hunt", description: "Place one deck on the windows of the Rhyme House mat and keep the matching rhyming-word cards face up in a separate pile. Children take turns opening a window card and finding its rhyming pair from the pile." },
      { name: "Say the Rhyme", description: "On their turn, the child opens a window card and says the word. They then say its rhyming word. If correct, they keep the window card; if not, the card stays on the mat. The game ends when all window cards have been played." },
    ],
    difficultyLevels: [
      { level: "Easier", description: "Educator says both words and introduces rhyming pairs by asking children to repeat them." },
      { level: "Medium", description: "Original gameplay; Rhyme Pair Hunt variation." },
      { level: "Harder", description: "Say the Rhyme variation; children name 2 rhyming words of their own." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-cube": {
    id: "story-cube",
    segment: "playground",
    title: "story cube",
    setupLine: "Roll the dice and build a story together.",
    howToPlay:
      "Children build stories by rolling picture dice. The game is played through the three variations below — Story Chain, Story Maker, and Story Shuffle.",
    // ─── structured manual (pilot) ─────────────────────────
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child rolls a picture die and adds one sentence to a shared story.",
    steps: [
      "sit the children in a circle. place all 6 picture dice in the middle.",
      "the first child picks one die and rolls it. they say one sentence using the picture that lands on top.",
      "the next child picks a different die and rolls it. they add one sentence that continues the same story.",
      "keep going around the circle. every child rolls once and adds a sentence.",
      "when everyone has had a turn, ask the group to give the story a name.",
    ],
    endsWhen: "every child has rolled a die and added a sentence to the story.",
    easierVariation:
      "the child points to the picture; you say the sentence they meant, then they repeat it back.",
    harderVariation:
      "one child rolls all six dice and tells the whole story alone, using every picture in order.",
    skillIds: ["speaking", "vocabulary", "listening"],
    // ───────────────────────────────────────────────────────
    materials: [
      "6 dice, each category stuck on a wooden dice (action, setting, object, character, problem, emotion)",
    ],
    variations: [
      { name: "Story Chain", description: "One child rolls a die and starts the story with a sentence based on the picture. The next child rolls another die and adds a new sentence to continue the story. Continue taking turns until every child has rolled a die and contributed. Extension: the educator can divide the children into 2 groups, and each group questions the opposite group after their story is complete. Story levels — Level 1: add a simple sentence · Level 2: add details to the sentence · Level 3: connect the sentence to previous events in the story." },
      { name: "Story Maker", description: "A child rolls all six dice, looks at the pictures shown, and tells a story using them. Other children act as audience and ask questions to the story maker. The game ends after all children contribute and complete a story. Levels — Level 1: name the pictures and use them in simple sentences · Level 2: connect two or more pictures into a short story · Level 3: use all the pictures to tell a detailed story with a beginning, middle, and end." },
      { name: "Story Shuffle", description: "Children take turns rolling the dice. Each child places their dice in sequence and says a sentence using that word, building a story step by step as turns progress. After the story is told, the educator asks the children to shuffle the dice or rearrange their order and create a new version of the story. The educator can also ask children to come up with a title for the story." },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Story Chain variation; educator helps or prompts the children with cues." },
      { level: "Medium", description: "Story Chain variation; children build sentences on their own." },
      { level: "Hard", description: "Story Maker variation; Story Shuffle." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "language-wheel": {
    id: "language-wheel",
    segment: "playground",
    title: "language wheel",
    setupLine: "Roll, move, and complete the challenge.",
    howToPlay:
      "Setup: place the game mat in the centre with the challenge cards. On their turn, the child rolls the dice, moves their piece on the wheel, picks the challenge card for that spot, and completes the task. If the task is complete, the child gets a token. The game ends after a set number of rounds or after each child completes their task. educator Note: Teachers may use cards from the Swat It, Snap It game or create a simple DIY version on a sheet to support challenge-card tasks such as reading, writing, word recognition, jumbled-word arrangement, and similar activities.",
    players: "3–6 children · 1 teacher",
    duration: "10 min",
    goal: "the child rolls the dice, moves on the wheel, and does the language task where they land.",
    steps: [
      "place the wheel mat in the middle. keep the challenge cards next to it.",
      "give every child a meeple. on their turn, the child rolls the dice.",
      "the child moves their meeple that many spots along the wheel.",
      "they pick the challenge card for the spot they land on and do the task.",
      "if the task is done, the child keeps a token.",
    ],
    endsWhen: "you reach the set number of rounds or every child has completed a task.",
    easierVariation:
      "sit next to the child and help them read the card. use the easy-level task.",
    harderVariation:
      "use the difficult-level task and set a timer for it.",
    skillIds: ["reading", "writing", "speaking", "listening"],
    materials: [
      "Dice",
      "Meeples",
      "Challenge cards (reading, writing, listening, speaking)",
      "Fortune cards",
      "Language wheel mat",
      "Swat it Snap it cards / DIY prompt sheets",
    ],
    difficultyLevels: [
      { level: "Easy", description: "educator supports children with tasks; easy-level task from the card." },
      { level: "Medium", description: "Medium-level task from the card." },
      { level: "Hard", description: "Difficult-level task from the card; timed challenge." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "guess-me-lang": {
    id: "guess-me-lang",
    segment: "playground",
    title: "guess me",
    setupLine: "Act it out or give clues — and guess.",
    howToPlay:
      "Guess Me is played through the two variations below.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child figures out what's on their card from what other children act out or describe.",
    steps: [
      "shuffle the Guess Me cards. sit the children in a circle.",
      "the first child picks a card and holds it on their forehead without looking at it.",
      "the other children act out or make sounds for the picture — no naming it out loud.",
      "the child in the middle guesses what it is.",
      "if the guess is right, the child keeps the card. next child plays.",
    ],
    endsWhen: "you reach a set time or every child has had a turn.",
    easierVariation:
      "children act out the picture without speaking. you can give a category cue if the guesser is stuck.",
    harderVariation:
      "children give spoken clues instead of acting — no naming the thing. the guesser uses the word in a sentence when they get it.",
    skillIds: ["speaking", "listening", "vocabulary"],
    materials: [
      "Guess Me cards — 7 categories (Actions, Objects, Emotions, Professions, Animals, Food, Vehicles)",
    ],
    variations: [
      { name: "Act it out", description: "A child picks a card and holds it on their head without looking at it. The other children act out or make sounds of the picture without saying its name. The child guesses what is on the card; if correct, they keep the card. Take turns and continue until a set time or set number of rounds." },
      { name: "Guess from Clues", description: "The educator gives clues about a picked card — \"I am yellow with black stripes and I make honey\" — and children guess." },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Act it out variation." },
      { level: "Medium", description: "Guess from Clues variation; educator names the category before describing." },
      { level: "Hard", description: "Guess from Clues — children give clues instead of the educator; the child makes a sentence with the guessed word." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "i-spy": {
    id: "i-spy",
    segment: "playground",
    title: "i spy",
    setupLine: "Look, find, and say.",
    howToPlay:
      "Observation and vocabulary. Setup: place the I Spy board in the centre. Turn order: educator leads. On a turn, the educator shows a card, children find the matching object on the board, and one child points to it, says its name, then uses it in a sentence.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child hears the clue, finds the object on the mat, and says its name in a sentence.",
    steps: [
      "place the i spy mat in the middle. sit the children around it.",
      "show a card from the easy deck. name or describe what's on it.",
      "the children look at the mat and find the matching object.",
      "one child points to it and says its name.",
      "the same child uses the name in a short sentence.",
    ],
    endsWhen: "every card in the day's deck has been found.",
    easierVariation:
      "use only the easy cards. give the children extra time to look.",
    harderVariation:
      "use the difficult cards. set a short timer for each find.",
    skillIds: ["listening", "vocabulary", "speaking"],
    materials: [
      "I Spy mat",
      "3 decks of cards (easy, medium, difficult)",
    ],
    variations: [
      { name: "Timed", description: "Set a short timer for each find." },
      { name: "Turn-based", description: "Each child takes a turn to find one object." },
      { name: "Team", description: "Two teams race to find first." },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Easy cards." },
      { level: "Medium", description: "Medium cards." },
      { level: "Hard", description: "Difficult cards; timed challenge." },
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
      "Movement and expression. Setup: place body cards in a pile so all children can see. Turn order: one child flips a card. All children use their bodies — alone, in pairs, or as a group — to form the thing on the card. The educator names what they see. The next child flips the next card.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child uses their body — alone or with friends — to make the thing shown on the card.",
    steps: [
      "keep the everybody-says cards face-up so all children can see.",
      "the first child flips the top card.",
      "all the children use their bodies — alone, in pairs, or as a group — to form the thing on the card.",
      "name out loud what the children have made.",
      "the next child flips the next card.",
    ],
    endsWhen: "the pile of cards is finished.",
    easierVariation:
      "children form the thing alone or in pairs — no group shapes yet.",
    harderVariation:
      "children come up with their own way of forming the thing — every child a different version.",
    skillIds: ["listening", "vocabulary", "speaking"],
    materials: ["Everybody says cards"],
    variations: [
      { name: "Solo", description: "Each child forms the object on their own." },
      { name: "Pair", description: "Two children form the object together." },
      { name: "Group", description: "The whole group forms one shared object." },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Children form the object as a pair or individually." },
      { level: "Medium", description: "Children form the object and also do the action, solo or in a pair, as instructed on the card." },
      { level: "Hard", description: "Children, as a group or individually, come up with their own versions of forming the object with their bodies." },
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
      "Spread the cards face up around the box. The educator calls out a target letter, word, or missing word from a sentence. Children race to find and swat the matching card, snap it into the box, and read it aloud. The game ends after each child finds a target word or letter. educator Note: Use a selection of cards that best matches the children's learning level and the focus of the activity. Teachers may add or remove card types and adapt the challenges in different ways to support various learning objectives, needs, and interests.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child hears a target and races to find the matching card and swat it.",
    steps: [
      "spread the letter or word cards face-up around the swat-it box.",
      "hand each child a swatter.",
      "call out a target — a letter, a word, or a missing word from a sentence.",
      "children look, find the matching card, swat it, and snap it into the box.",
      "the child who snapped it reads the card out loud.",
    ],
    endsWhen: "every child has found and read at least one target.",
    easierVariation:
      "use only the letter cards. call one letter at a time.",
    harderVariation:
      "use the sentence-maker cards. children swat the word that completes the sentence.",
    skillIds: ["reading", "listening", "vocabulary"],
    materials: [
      "Box",
      "Swatters",
      "Cards:",
      "3 Letters",
      "Blend and digraph Words",
      "Letters",
      "Punctuation marks + long-vowel Words",
      "Rhyming Words",
      "Sight Words",
      "Sentence Maker",
    ],
    variations: [
      { name: "Solo", description: "Each child plays at their own pace as the educator calls targets." },
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
  "story-construction": {
    id: "story-construction",
    segment: "playground",
    title: "story construction",
    setupLine: "Arrange the story cards and narrate the story.",
    howToPlay:
      "Shuffle the story cards and place them face up. Children work together to arrange the cards in the correct order and narrate the story.",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child helps arrange the picture cards in the right order and tells the story from them.",
    steps: [
      "shuffle the 8 story cards and place them face-up in the middle.",
      "the children look at the pictures together and decide what comes first.",
      "they arrange the cards in the correct order from left to right.",
      "one child at a time describes the picture on their card in one sentence.",
      "the group reads the story out loud from start to end.",
    ],
    endsWhen: "the cards are in order and the group has told the full story.",
    easierVariation:
      "you guide the children by asking 'what happens first? what happens next?' after each card.",
    harderVariation:
      "children rearrange the cards in a brand-new order to invent a different story, and act it out.",
    skillIds: ["reading", "speaking", "listening"],
    materials: ["8 story cards deck"],
    variations: [
      { name: "Story Trail", description: "Children/educators follow the story card by card, describing what is happening in each picture and linking it to the next one to narrate the story." },
      { name: "Story Squad", description: "Divide children into three teams: Story Makers — arrange the cards in the correct order · Story Stars — act out the story · Story Questioners — ask questions about the story and characters to the other two teams." },
      { name: "Story Twist", description: "Children, as groups or individuals, rearrange the cards in a different order to create a brand-new story. They then narrate or act out their new version. (Can be combined with Story Squad.)" },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Story Trail variation." },
      { level: "Medium", description: "Original gameplay." },
      { level: "Hard", description: "Story Squad; Story Twist variation." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
};

/* ─── Wordsmiths resource — a single fixed vocabulary game. The
 * "see → act → say" sequence drives every session. ──────────────── */

const wordsmithsResources: Record<string, CurriculumActivity> = {
  "vocabulary-cards": {
    id: "vocabulary-cards",
    segment: "wordsmiths",
    title: "vocabulary cards",
    setupLine: "Show the card. Act the word. Use it in a sentence.",
    howToPlay:
      "The educator shows a vocabulary card for a target word from the current book — a feeling, describing, action, or spatial word. All children act the word together with their faces and bodies. Then one child at a time uses the word in a sentence about the current book. The same see → act → say sequence runs every session. (Digital deck — to be added soon.)",
    players: "3–8 children · 1 teacher",
    duration: "10 min",
    goal: "the child sees a target word from the current book, acts it out with the group, and uses it in a sentence.",
    steps: [
      "pick a target word from the current book — a feeling, describing, action, or spatial word.",
      "show the matching vocabulary card so every child can see the picture and hear the word.",
      "say the word out loud together. all children act the word with their faces or bodies.",
      "one child at a time uses the word in a short sentence about the current book.",
      "move to the next target word. repeat the see → act → say loop.",
    ],
    endsWhen: "you have moved through the day's target words for the current book.",
    easierVariation:
      "model the sentence first — 'the bear is furry.' the child copies your sentence.",
    harderVariation:
      "the child says a brand-new sentence using the word — not a copy of yours — and connects it to the story.",
    skillIds: ["vocabulary", "speaking", "listening"],
    materials: ["Vocabulary cards — a digital deck (coming soon)"],
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
      wordsmiths: "vocabulary-cards",
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
      id: "writing",
      name: "writing",
      shortName: "writing",
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
        "The spine of the session. Day 1 is read without stopping — the story must be felt whole before it is examined. On days 3 and 6 children draw a response — these are the primary writing and vocabulary north star assessment moments. On days 4–6 the educator reads more fluently, pauses longer, and expects more — children already know the story and can carry more of the language. Book'o'Clock and Wordsmiths happen together as the central learning block.",
      type: "fixed",
    },
    {
      id: "wordsmiths",
      name: "Wordsmiths",
      durationRange: "10 min",
      objective:
        "A single fixed vocabulary game — Vocabulary cards — runs every session (it does not rotate). The see → act → say sequence is always the same: the educator shows the card for a target word from the current book, all children act the word together, then one child at a time uses it in a sentence. Acting is always whole-group — no child is singled out. The cards are a digital deck, to be added soon.",
      type: "fixed",
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
        "Each child has a personal experience book. The educator records what happened in the session and what the child built. The child adds one drawing of their own. The book goes home regularly so parents can see the child's growth.",
      type: "fixed",
    },
  ],
  sessionTable: buildLanguageSessionTable(),
  activities: { ...playgroundGames, ...wordsmithsResources },
  checkpoints: [],
  languageBooks,
  songs,
};
