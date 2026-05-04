import type {
  CurriculumProgramme,
  CurriculumActivity,
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
    setupLine: "Listen to a sound. Guess what made it.",
    howToPlay:
      "Children sit in a circle with their eyes closed. The teacher plays a familiar sound — a bell, a clap, paper crumpling, water pouring. Children open their eyes and name the sound. Repeat with a few sounds, then layer two sounds together for a harder round.",
    materials: ["A small set of everyday objects that make distinct sounds"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "rhyming-house": {
    id: "rhyming-house",
    segment: "playground",
    title: "rhyming house",
    setupLine: "Pick a word. Find another word that rhymes.",
    howToPlay:
      "The teacher names a word that lives in the rhyming house — say, \"cat\". Each child takes a turn adding another word that rhymes — \"hat, mat, bat\". When the rhymes run out, a new word moves in and the round restarts.",
    materials: ["A laminated \"rhyming house\" card to anchor the round"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "syllable-sprint": {
    id: "syllable-sprint",
    segment: "playground",
    title: "syllable sprint",
    setupLine: "Clap each part of the word. Take that many steps forward.",
    howToPlay:
      "Children stand at one end of the room. The teacher says a word from the current book. Children clap each syllable together (cat = 1 clap, ti-ger = 2 claps, but-ter-fly = 3 claps) and step forward that many times. The first child to reach the wall wins the round.",
    materials: ["Open floor space or a marked start line"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-cube": {
    id: "story-cube",
    segment: "playground",
    title: "story cube",
    setupLine: "Roll the cube. Use the picture in your story.",
    howToPlay:
      "Children sit in a circle. One child rolls the story cube. Whatever picture lands face-up becomes the next event in a shared story. The next child rolls again and adds the new picture to the story. The story is silly and that's part of the fun.",
    materials: ["A story cube with picture sides — characters, places, objects"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "language-wheel": {
    id: "language-wheel",
    segment: "playground",
    title: "language wheel",
    setupLine: "Spin the wheel. Answer the question about the story.",
    howToPlay:
      "The wheel has six sectors — who, what, where, when, why, how. A child spins. Whatever sector the wheel lands on becomes the question the child answers about the current book — for example, \"who was scared in the story?\" Children take turns spinning and answering.",
    materials: ["A spinner wheel with six question sectors"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "think-fast": {
    id: "think-fast",
    segment: "playground",
    title: "think fast",
    setupLine: "Hear the prompt. Answer in three seconds.",
    howToPlay:
      "The teacher reads a prompt connected to the current book — \"name something the bear ate\", \"what did Gerald the giraffe wish he could do?\". The first child to answer in three seconds gets the next prompt. Wrong answers are fine — the energy is the game, not the answer.",
    materials: ["A short list of book-linked prompts for the day"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-construction": {
    id: "story-construction",
    segment: "playground",
    title: "story construction",
    setupLine: "Order the picture cards. Tell the story together.",
    howToPlay:
      "The teacher hands out three to five picture cards from the current book, shuffled. Children work as a group to put them in story order. Once they agree, each child says one sentence about one card so the whole story is told together.",
    materials: ["Three to five picture cards from each book"],
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
    setupLine: "Spy something in the room. Give the colour or shape.",
    howToPlay:
      "A classic round. The teacher (or a child) says \"I spy with my little eye, something that is red\". Children look around the room and call out red things until someone names the right one. Then they take the next turn.",
    materials: ["No materials — relies on the room"],
    debriefPrompts: [],
    type: "physical-game",
  },
  "swat-it-snap-it": {
    id: "swat-it-snap-it",
    segment: "playground",
    title: "swat it snap it",
    setupLine: "Hear the word. Swat the matching card. Snap a pair.",
    howToPlay:
      "Spread the word cards face-up on the floor — letters, sentence-maker words, sight words, rhyming words, blend and digraph words, and punctuation cards. The teacher calls out a word or category from the current book. Children race to swat the matching card with a flyswatter (or hand). Once a card is swatted, the child reads it aloud. In the snap variation, two children compete to be first to snap a matching pair (e.g. two rhyming words, or a letter and a word that starts with it).",
    materials: [
      "Word card decks — letters · sentence-maker words · sight words · rhyming words · blend and digraph words · punctuation marks",
      "Two soft flyswatters or paddles",
    ],
    variations: [
      {
        name: "Swat",
        description:
          "Cards spread face-up. Teacher calls a word or category. Children race to swat the matching card and read it aloud.",
      },
      {
        name: "Snap",
        description:
          "Two children draw cards from the deck one at a time. When two matching cards land (rhyming pair, letter + matching-sound word, etc.), the first child to snap their hand on top keeps both.",
      },
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
  "word-workout-calendar": {
    id: "word-workout-calendar",
    segment: "wordsmiths",
    title: "word workout calendar",
    setupLine: "Show the action card. Act it. Say it in a sentence.",
    howToPlay:
      "The teacher shows the action card for the day (skip, hop, stretch, wiggle, stomp, tiptoe). All children do the action together. Then one child at a time uses the action word in a sentence about the current book — \"the bear stomped through the cave\".",
    materials: ["Word workout calendar — one action card per day"],
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
    vocabularyType: "word-workout-calendar",
    groupActivityType: "story-re-enactment",
    heroImageUrl: "/language-books/01-bear-hunt.jpg",
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
    heroImageUrl: "/language-books/02-mixed.jpg",
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
    heroImageUrl: "/language-books/03-giraffes-cant-dance.jpg",
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
    heroImageUrl: "/language-books/04-color-monster.jpg",
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
    heroImageUrl: "/language-books/05-lion-inside.jpg",
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
    vocabularyType: "word-workout-calendar",
    groupActivityType: "change-story-endings",
    heroImageUrl: "/language-books/06-dinosaurs-school.jpg",
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
    heroImageUrl: "/language-books/07-gruffalo.jpg",
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
    vocabularyType: "word-workout-calendar",
    groupActivityType: "vocabulary-reproduction",
    heroImageUrl: "/language-books/08-bunny-cakes.jpg",
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
    "A pre-reading and pre-writing programme that builds language through play, story, song, and mark-making.",
  description:
    "Across 8 books and 48 sessions, children build all five language skills — listening, speaking, reading, vocabulary, and pre-writing — through one structure: the story. Every segment of every session draws from the same book, so words come back again and again until children own them.",
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
        "One vocabulary resource per session, matched to the current book's vocabulary type — emotion tiles for feeling words, word workout calendar for action words, story calendar for describing and spatial words. The see → act → say sequence is always the same: the educator shows the tile or card, all children act the word together, then one child at a time uses it in a sentence. Acting is always whole-group — no child is singled out.",
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
  sessionTable: [],
  activities: { ...playgroundGames, ...wordsmithsResources },
  checkpoints: [],
  languageBooks,
  songs,
};
