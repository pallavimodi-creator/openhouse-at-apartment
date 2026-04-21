// ─── Experience Book Data ───────────────────────────────────
// Content configuration for the four experience books:
//   art-5-8, art-8-12, speaking-5-8, speaking-8-12

export interface BookConfig {
  slug: string;
  type: "art" | "speaking" | "robotics";
  ageGroup: "5-8" | "8-12";
  title: string;
  subtitle: string;
  tagline: string;
  coverColor: string;
  coverImageUrl?: string;
  nameFields: { label: string; placeholder: string }[];
  preferences: string[];
  segments: { icon: string; name: string; desc: string }[];
  skills: {
    tag: string;
    name: string;
    color: string;
    desc: string;
    abilities: string[];
  }[];
  dailyLogFields: { label: string; placeholder: string }[];
  dailyLogTracker: {
    label: string;
    levels: string[];
  };
  journeyLabel: string;
  journeys: {
    number: number;
    sessionRange: string;
    monthIntro: string;
    atHomeTitle: string;
    atHomeTips: string[];
  }[];
  lanyardExplanation?: string;
  backCoverPrompts: string[];
}

// ─── Art 5-8 ────────────────────────────────────────────────

const art58: BookConfig = {
  slug: "art-5-8",
  type: "art",
  ageGroup: "5-8",
  title: "my art experience book",
  subtitle: "art & design · ages 5–8",
  tagline:
    "this book belongs to a young artist. every mark you made. every colour you mixed. every time you tried something new and kept going.",
  coverColor: "bg-[#F5D547]",
  coverImageUrl: "/book-covers/art-5-8.png",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "my favourite colour is",
    "i like drawing with",
    "i like painting with",
    "my favourite thing to draw is",
    "i feel happy when i make art because",
  ],
  segments: [
    {
      icon: "🏋️",
      name: "art gym",
      desc: "warm up your eyes and hands with drawing exercises from books and cue cards.",
    },
    {
      icon: "🎲",
      name: "artgames",
      desc: "play a game that builds one art skill — colours, shapes, textures, or imagination.",
    },
    {
      icon: "🎨",
      name: "artiverse",
      desc: "the main making time. you choose how to use a new medium or technique on A3 paper.",
    },
    {
      icon: "📖",
      name: "experience book",
      desc: "write and draw what you did today. your teacher helps you fill this in.",
    },
  ],
  skills: [
    {
      tag: "lt",
      name: "line & texture",
      color: "#C56A3A",
      desc: "the marks you make and how they feel",
      abilities: [
        "1. identifies marks different tools make",
        "2. makes different line types with intention",
        "3. combines line types to create texture",
        "4. draws using observed line and texture",
      ],
    },
    {
      tag: "sf",
      name: "shape & form",
      color: "#4A6B8A",
      desc: "building things from shapes",
      abilities: [
        "1. traces and draws basic 2D shapes",
        "2. combines shapes to draw recognisable objects",
        "3. modifies and combines shapes creatively",
        "4. identifies and draws simple 3D forms",
      ],
    },
    {
      tag: "cp",
      name: "colour & painting",
      color: "#A33E3E",
      desc: "mixing, choosing, and using colour",
      abilities: [
        "1. paints with control and early mixing",
        "2. mixes primary to secondary reliably",
        "3. identifies warm and cool families",
        "4. creates tints and shades",
      ],
    },
    {
      tag: "bc",
      name: "balance & composition",
      color: "#5B7A4C",
      desc: "where things go on the page and why",
      abilities: [
        "1. fills whole page",
        "2. understands foreground/background",
        "3. draws overlapping for depth and horizon line",
        "4. understands colour/shape placement for balance",
      ],
    },
    {
      tag: "ic",
      name: "imagination & collaboration",
      color: "#8A7A4C",
      desc: "your ideas and how you work with others",
      abilities: [
        "1. experiments freely",
        "2. generates unusual ideas",
        "3. listens/contributes/decides together",
        "4. describes imagined world with enough detail",
      ],
    },
  ],
  dailyLogFields: [
    { label: "art gym", placeholder: "what we drew" },
    { label: "artgames", placeholder: "which game we played" },
    { label: "artiverse — medium/tool", placeholder: "e.g. poster paints" },
    { label: "artiverse — technique/theme", placeholder: "e.g. colour mixing, warm or cool world" },
  ],
  dailyLogTracker: {
    label: "how we did today",
    levels: ["starting out", "getting there", "going strong"],
  },
  journeyLabel: "art journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child has been exploring new tools, learning to choose colours, and making their first marks with intention.",
      atHomeTitle: "playing with colour together",
      atHomeTips: [
        "mix two colours with poster paints and name what you make",
        "sort objects at home by colour — warm colours on one side, cool on the other",
        "paint together on the same sheet — no plan, just play",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been building textures, using different line types, and starting to look more carefully before drawing.",
      atHomeTitle: "exploring line and texture together",
      atHomeTips: [
        "close your eyes and feel three different surfaces — draw the texture you felt",
        "draw a leaf using only lines — no outlines allowed",
        "look at fabric patterns at home and try to copy them with pencils",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been working with new mediums, layering colours, and learning to fill the whole page.",
      atHomeTitle: "visit a gallery together",
      atHomeTips: [
        "visit any gallery or exhibition — let your child choose one piece to stand in front of for two minutes",
        "ask: what do you notice first? what colours did the artist use? how does it make you feel?",
        "draw or paint something inspired by what you saw when you get home",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been combining shapes, thinking about where things go on the page, and making more deliberate choices.",
      atHomeTitle: "playing with shapes together",
      atHomeTips: [
        "cut shapes from coloured paper and arrange them into a picture before gluing",
        "find shapes in everyday objects — circles in plates, rectangles in doors",
        "build something from shapes only — no drawing first, just cutting and arranging",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been thinking about composition — foreground, background, and where the eye goes first.",
      atHomeTitle: "thinking about space and placement together",
      atHomeTips: [
        "take a photo of something at home — look at what is in front, in the middle, and at the back",
        "draw the same scene twice — once close up, once far away",
        "rearrange objects on a shelf — ask what looks balanced and what feels off",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "your child has used every skill together — line, shape, colour, composition, and imagination — to make work that is truly their own.",
      atHomeTitle: "art books to read and keep together",
      atHomeTips: [
        "The Dot by Peter H. Reynolds — about the courage to make a mark",
        "Beautiful Oops! by Barney Saltzberg — about turning mistakes into art",
        "Mix It Up! by Hervé Tullet — an interactive colour-mixing adventure",
        "visit your local bookshop and let your child choose one art book to keep",
      ],
    },
  ],
  backCoverPrompts: [
    "draw yourself as an artist — what do you look like when you are making?",
    "what is the one piece you are most proud of this year?",
    "what medium did you love the most?",
    "what would you make if you could make anything?",
  ],
};

// ─── Art 8-12 ───────────────────────────────────────────────

const art812: BookConfig = {
  slug: "art-8-12",
  type: "art",
  ageGroup: "8-12",
  title: "my art experience book",
  subtitle: "art & design · ages 8–12",
  tagline:
    "this book belongs to a maker who looks closely. every observation you drew. every idea you pushed past the obvious. every time you chose the harder path.",
  coverColor: "bg-[#F5D547]",
  coverImageUrl: "/book-covers/art-8-12.png",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "the medium i enjoy most is",
    "a technique i want to master is",
    "an artist whose work i admire is",
    "when i make art i feel",
    "the subject i keep coming back to is",
  ],
  segments: [
    {
      icon: "🏋️",
      name: "art gym",
      desc: "observational drawing from books and cue cards — with extension challenges to push further.",
    },
    {
      icon: "🎲",
      name: "artgames",
      desc: "a game that sharpens one specific skill — texture, composition, colour memory, or observation.",
    },
    {
      icon: "🎨",
      name: "artiverse",
      desc: "the main making session. thumbnail sketch first, then work on A3. one-sentence share at the end.",
    },
    {
      icon: "📖",
      name: "experience book",
      desc: "record what you did, what you noticed, and one decision you made today.",
    },
  ],
  skills: [
    {
      tag: "lt",
      name: "line & texture",
      color: "#C56A3A",
      desc: "controlled mark-making and surface quality",
      abilities: [
        "1. uses different line types with control",
        "2. observes and draws textures from real objects",
        "3. uses hatching/cross-hatching/stippling to build texture",
        "4. creates multi-layered artworks where texture is a compositional choice",
      ],
    },
    {
      tag: "sf",
      name: "shape & form",
      color: "#4A6B8A",
      desc: "proportion, 3D form, and complex compositions",
      abilities: [
        "1. identifies and draws basic 3D forms",
        "2. combines shapes with recognisable proportions",
        "3. observes proportions and adjusts",
        "4. creates complex compositions with accurate forms",
      ],
    },
    {
      tag: "cp",
      name: "colour & painting",
      color: "#A33E3E",
      desc: "tertiary mixing, layering, and palette control",
      abilities: [
        "1. mixes to produce tertiary colours",
        "2. uses layering for gradients/highlights/shadows",
        "3. uses colour to show depth (warm advances, cool recedes)",
        "4. chooses and justifies a palette for specific mood",
      ],
    },
    {
      tag: "bc",
      name: "balance & composition",
      color: "#5B7A4C",
      desc: "focal point, depth, and visual weight",
      abilities: [
        "1. uses size and placement for visual balance",
        "2. creates foreground/middle ground/background with intention",
        "3. uses overlap/spacing/perspective for depth",
        "4. uses contrast to draw eye to focal point",
      ],
    },
    {
      tag: "ic",
      name: "imagination & collaboration",
      color: "#8A7A4C",
      desc: "intention, voice, and working with others",
      abilities: [
        "1. creates detailed drawings from imagination",
        "2. combines materials and techniques intentionally",
        "3. works with others on creative differences",
        "4. makes intentional choices and articulates why",
      ],
    },
  ],
  dailyLogFields: [
    { label: "art gym", placeholder: "what we drew" },
    { label: "artgames", placeholder: "which game we played" },
    { label: "artiverse — medium/tool", placeholder: "e.g. watercolours" },
    { label: "artiverse — technique/theme", placeholder: "e.g. wet-on-wet, landscape" },
    { label: "thumbnail sketch", placeholder: "quick plan before A3" },
    { label: "one-sentence share", placeholder: "one decision i made today" },
  ],
  dailyLogTracker: {
    label: "how we did today",
    levels: ["starting out", "getting there", "going strong"],
  },
  journeyLabel: "art journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child has been using brush pens and oil pastels — learning to control line, observe closely, and draw from real objects.",
      atHomeTitle: "looking closely and drawing what you really see",
      atHomeTips: [
        "choose one small object — a shoe, a cup, a fruit — and draw it slowly for 10 minutes",
        "try drawing without looking at the page — keep your eyes on the object",
        "compare two drawings of the same thing made a week apart — what changed?",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been working with colour pencils and soft pastels — cross-hatching, blending, and building up layers.",
      atHomeTitle: "exploring value and mark-making together",
      atHomeTips: [
        "create a value scale from light to dark using only one pencil — press harder as you go",
        "try hatching and cross-hatching on scrap paper — see how many tones you can make",
        "look at shadows in your home and draw just the dark shapes, not the objects",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been experimenting with acrylics and gouache — layering, mixing, and thinking about composition.",
      atHomeTitle: "visit a gallery together",
      atHomeTips: [
        "visit any gallery or exhibition — spend time with work your child chooses, not just what you think is best",
        "ask: what did the artist do first? what was the last thing they added? how can you tell?",
        "buy a postcard of one piece and keep it where your child works at home",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been combining mediums — watercolour with brush pen, colour pencils with oil pastels — and thinking about palette and mood.",
      atHomeTitle: "playing with colour and palette",
      atHomeTips: [
        "choose a mood — calm, energetic, mysterious — and pick 3–4 colours that match it",
        "look at a favourite painting online and name the colour family the artist used",
        "mix paint to match an exact colour from something in your kitchen — how close can you get?",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been thinking about composition at a deeper level — focal points, contrast, atmospheric perspective, and self-portraits.",
      atHomeTitle: "thinking about what makes a composition work",
      atHomeTips: [
        "crop a photograph in three different ways — notice how each crop changes what feels important",
        "look at a favourite artwork and find the focal point — what pulls your eye there?",
        "draw the same subject from two different distances — what changes about the composition?",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "your child has brought all five skills together in self-directed work — choosing mediums, techniques, and subjects with real intention.",
      atHomeTitle: "books to read and keep together",
      atHomeTips: [
        "How to Be an Artist by Jerry Saltz — written for everyone, not just experts",
        "Steal Like an Artist by Austin Kleon — about finding your own creative voice",
        "The Art Book (Phaidon) — 500 artists from medieval to modern in one volume",
        "visit a bookshop and let your child choose one art book that feels like theirs",
      ],
    },
  ],
  backCoverPrompts: [
    "draw yourself making — what does your setup look like?",
    "which piece pushed you the furthest this year?",
    "what medium feels most like yours now?",
    "what would you make if you had a whole week and any material?",
  ],
};

// ─── Speaking 5-8 ───────────────────────────────────────────

const speaking58: BookConfig = {
  slug: "speaking-5-8",
  type: "speaking",
  ageGroup: "5-8",
  title: "my public speaking experience book",
  subtitle: "public speaking · ages 5–8",
  tagline:
    "this book belongs to a speaker who is finding their voice. every story you told. every idea you shared. every time you stood up and started talking.",
  coverImageUrl: "/book-covers/speaking-5-8.png",
  coverColor: "bg-category-language/40",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "the game i like best is",
    "i feel brave when",
    "i like speaking because",
    "the hardest part about speaking is",
    "my favourite story is about",
  ],
  segments: [
    {
      icon: "📣",
      name: "roll call",
      desc: "a quick warm-up game to activate your voice or body — everyone plays at the same time.",
    },
    {
      icon: "🎯",
      name: "playground",
      desc: "a speaking game that builds one specific skill through play.",
    },
    {
      icon: "🎤",
      name: "showtime",
      desc: "you speak in front of the group. the audience responds. your teacher watches and helps.",
    },
    {
      icon: "📖",
      name: "experience book",
      desc: "fill in what you did today — your teacher helps.",
    },
  ],
  skills: [
    {
      tag: "cs",
      name: "content & structure",
      color: "#4A6B8A",
      desc: "what you say and how you organise it",
      abilities: [
        "1. tells a story with a beginning, middle, and end",
        "2. explains what they heard in their own words",
        "3. describes a person or thing clearly enough for others to picture it",
        "4. asks and answers who, what, when, and where questions",
        "5. begins a talk with a clear opening and ends with a clear closing",
      ],
    },
    {
      tag: "bl",
      name: "body language",
      color: "#C56A3A",
      desc: "how your body helps you speak",
      abilities: [
        "1. uses hands and face to show feelings while talking",
        "2. looks at the person they are speaking to",
        "3. starts speaking in a way that gets attention — stands still, pauses, then begins",
      ],
    },
    {
      tag: "vs",
      name: "vocal skills",
      color: "#A33E3E",
      desc: "how you use your voice",
      abilities: [
        "1. speaks soft or loud on purpose",
        "2. speaks clearly enough for others to follow",
        "3. uses voice and sound effects to bring ideas to life",
      ],
    },
  ],
  dailyLogFields: [
    { label: "roll call game", placeholder: "which warm-up we played" },
    { label: "playground — game/format", placeholder: "e.g. tale trail" },
    { label: "showtime — what i did", placeholder: "e.g. whacky news reporter" },
    { label: "lanyard worn today", placeholder: "yes / no" },
  ],
  dailyLogTracker: {
    label: "how we did today",
    levels: ["starting out", "getting there", "going strong"],
  },
  lanyardExplanation:
    "every session, each child wears a lanyard for each segment. the lanyard names one ability — the one to focus on right now. the teacher watches specifically for that ability. the child knows what they are working on. every session, the teacher notes: doing great today, or focus more. over 8 sessions, this builds a clear picture of every child as a speaker.",
  journeyLabel: "speaking journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child has been playing speaking games, telling stories, and starting to find their voice in front of others.",
      atHomeTitle: "telling stories together",
      atHomeTips: [
        "at bedtime, take turns adding one sentence each to build a story together",
        "ask your child to tell you about their day with a beginning, a middle, and an end",
        "tell a story from your own childhood — let them ask you questions about it",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been using gestures, making eye contact, and starting to use their body while they speak.",
      atHomeTitle: "playing with body language together",
      atHomeTips: [
        "play a feelings charade — act out an emotion without speaking and guess what it is",
        "practise telling a short story using big gestures and a small voice, then small gestures and a big voice",
        "watch a cartoon with the sound off and guess what the characters are feeling from their bodies",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been describing things with more detail, asking follow-up questions, and using their voice with more control.",
      atHomeTitle: "watch a performance together",
      atHomeTips: [
        "watch a storytelling performance, play, or puppet show together — live or recorded",
        "ask your child: what did the performer do with their voice? with their body? what was the best moment?",
        "try performing something together at home — a short skit, a news report, or a poem",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been speaking for longer, structuring ideas more clearly, and starting to use body and voice together.",
      atHomeTitle: "playing with voice together",
      atHomeTips: [
        "read a favourite book aloud using different voices for each character",
        "try whispering a sentence, then saying it at full volume — which feels more powerful?",
        "record your child telling a one-minute story and listen back together — what do they notice?",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been performing with more confidence, recovering when they lose the thread, and starting to command attention.",
      atHomeTitle: "asking real questions together",
      atHomeTips: [
        "play the interview game — your child interviews you about your job, your childhood, or your favourite thing",
        "after they ask a question, ask them: what did you learn from my answer? what would you ask next?",
        "practise asking 'why?' three times in a row about the same topic to see how deep you can go",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "your child has been using all three skills — content, body, and voice — together. they speak with a style that is starting to feel like their own.",
      atHomeTitle: "books about finding your voice",
      atHomeTips: [
        "Speak Up! by Nathan Bryon — about a girl who learns to raise her voice for what matters",
        "The Storyteller by Evan Turk — about the power of stories to change the world",
        "I Talk Like a River by Jordan Scott — about finding confidence when speaking feels hard",
        "visit your local bookshop and let your child choose one book about speaking or storytelling",
      ],
    },
  ],
  backCoverPrompts: [
    "draw yourself speaking — what do you look like when you have everyone's attention?",
    "what was the bravest thing you said this year?",
    "which game was your favourite?",
    "if you could give a speech about anything, what would it be?",
  ],
};

// ─── Speaking 8-12 ──────────────────────────────────────────

const speaking812: BookConfig = {
  slug: "speaking-8-12",
  type: "speaking",
  ageGroup: "8-12",
  title: "my public speaking experience book",
  subtitle: "public speaking · ages 8–12",
  tagline:
    "this book belongs to a speaker who is learning to argue, persuade, and mean what they say. every argument you built. every idea you pushed past the obvious. every time you spoke with conviction.",
  coverColor: "bg-category-language/40",
  coverImageUrl: "/book-covers/speaking-8-12.png",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "the format i enjoy most is",
    "i feel most confident when",
    "the hardest thing about speaking is",
    "a speaker i admire is",
    "the topic i care most about is",
  ],
  segments: [
    {
      icon: "📣",
      name: "roll call",
      desc: "activate your voice or body in a quick warm-up game — everyone plays simultaneously.",
    },
    {
      icon: "🎯",
      name: "playground",
      desc: "a speaking game that builds argument, improvisation, or attentiveness through play.",
    },
    {
      icon: "🎤",
      name: "showtime",
      desc: "debate, share, or perform in front of the group. the audience responds and questions.",
    },
    {
      icon: "📖",
      name: "experience book",
      desc: "record what you did, reflect on how it went, and note one thing to work on.",
    },
  ],
  skills: [
    {
      tag: "cs",
      name: "content & structure",
      color: "#4A6B8A",
      desc: "what you say, how you structure it, and how you argue",
      abilities: [
        "1. arranges ideas in clear logical order",
        "2. identifies and delivers main point",
        "3. adds specific details and examples",
        "4. asks and answers deeper questions",
        "5. begins with clear opening and ends with clear closing",
      ],
    },
    {
      tag: "bl",
      name: "body language",
      color: "#C56A3A",
      desc: "how your body supports what you say",
      abilities: [
        "1. uses hands and face to highlight important ideas",
        "2. makes eye contact across group",
        "3. starts with stillness, pause, and deliberate opening",
      ],
    },
    {
      tag: "vs",
      name: "vocal skills",
      color: "#A33E3E",
      desc: "how you use your voice as a tool",
      abilities: [
        "1. uses voice and sound to bring ideas to life",
        "2. adjusts volume deliberately",
        "3. stresses specific words to change meaning",
        "4. uses vocal tone to express different feelings",
      ],
    },
  ],
  dailyLogFields: [
    { label: "roll call game", placeholder: "which warm-up we played" },
    { label: "playground — game/format", placeholder: "e.g. debate duel" },
    { label: "showtime — what i did", placeholder: "e.g. experience share circle" },
    { label: "lanyard worn today", placeholder: "yes / no" },
    { label: "doing great at", placeholder: "one thing that went well" },
    { label: "focus more on", placeholder: "one thing to work on" },
  ],
  dailyLogTracker: {
    label: "how we did today",
    levels: ["starting out", "getting there", "going strong"],
  },
  lanyardExplanation:
    "every session, each child wears a lanyard for each segment. the lanyard names one ability — the one to focus on right now. the teacher watches specifically for that ability. the child knows what they are working on. every session, the teacher notes: doing great today, or focus more. over 8 sessions, this builds a clear picture of every child as a speaker.",
  journeyLabel: "speaking journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child has been building arguments, debating both sides of a topic, and learning to arrange ideas in a clear order.",
      atHomeTitle: "building structure together",
      atHomeTips: [
        "pick a topic at dinner — everyone gives one reason for and one reason against",
        "ask your child to explain something they learned today using 'first, then, finally'",
        "play 'convince me' — your child has one minute to persuade you of something they believe",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been using eye contact, gesture, and physical presence more deliberately while speaking.",
      atHomeTitle: "noticing body language together",
      atHomeTips: [
        "watch a talk or speech together (TED, news, or a debate) and focus only on what the speaker does with their body",
        "practise standing still for three seconds before starting to speak — notice how it changes the energy",
        "play 'spot the tell' — watch a conversation and name one moment where body language said something the words did not",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been asking deeper questions, recovering mid-talk, and using voice and body together with more control.",
      atHomeTitle: "watch a debate or speech together",
      atHomeTips: [
        "watch a debate, speech, or spoken word performance together — live or recorded",
        "ask your child: what was the strongest moment? was it a word, a pause, or something the speaker did with their body?",
        "try a mini-debate at home on a low-stakes topic — no winner, just practice",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been speaking for longer stretches, using vocal variety with purpose, and beginning to develop a personal speaking style.",
      atHomeTitle: "playing with voice together",
      atHomeTips: [
        "read the same sentence in three different ways — which version is most persuasive?",
        "listen to a podcast together and name one moment where the host's voice changed the feeling",
        "record a one-minute opinion piece on a phone and listen back — what would you change?",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been performing with conviction, handling challenge questions, and beginning to adjust mid-talk based on how the audience is responding.",
      atHomeTitle: "the art of the good question",
      atHomeTips: [
        "play the interview game — but this time, every follow-up question must build on the previous answer",
        "after watching or reading something together, ask: what is the one question you would ask the person who made this?",
        "practise 'and then what?' — keep asking it until the reasoning goes as deep as it can",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "your child has been using all three skills — content, body, and voice — as one integrated thing. their speaking style is becoming recognisably their own.",
      atHomeTitle: "books about finding your voice and using it well",
      atHomeTips: [
        "Thank You for Arguing (Young Readers' Edition) by Jay Heinrichs — a guide to persuasion",
        "Talk Like TED by Carmine Gallo — what makes a great talk great",
        "The Boy at the Back of the Class by Onjali Q. Rauf — about speaking up for what is right",
        "visit a bookshop and let your child choose one book about speaking, arguing, or leading",
      ],
    },
  ],
  backCoverPrompts: [
    "draw yourself speaking — what do you look like when you are fully in command?",
    "what was the most convincing thing you said this year?",
    "which format suited you best — debate, storytelling, or improvisation?",
    "if you could give a speech to anyone about anything, who would it be and what would you say?",
  ],
};

// ─── Robotics 5-8 ───────────────────────────────────────────

const robotics58: BookConfig = {
  slug: "robotics-5-8",
  type: "robotics",
  ageGroup: "5-8",
  title: "my robotics experience book",
  subtitle: "robotics · ages 5–8",
  tagline:
    "this is your book. every model you built. every experiment you ran. every time you figured out why something worked.",
  coverColor: "bg-[#EDE6D3]",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "when i build, i love to figure out why something is not working",
    "i love to see if what i predicted actually happens",
    "i love to make something work better",
    "i love to find the exact part that was causing the problem",
    "one thing i want to build this year",
  ],
  segments: [
    {
      icon: "🔬",
      name: "experiment",
      desc: "work in a small group to find the answer to one specific question. every person takes at least one measurement with their own hands.",
    },
    {
      icon: "🔧",
      name: "build",
      desc: "each of us builds our own model using a kit and a step card. the teacher never fixes it — only asks questions. when something does not work, we figure it out.",
    },
    {
      icon: "📓",
      name: "experience book",
      desc: "ten minutes at the end to write what we found and what we built.",
    },
  ],
  skills: [
    {
      tag: "B&M",
      name: "building & making",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "putting parts together, fixing what breaks, making it better.",
      abilities: [
        "puts parts together so they fit and work",
        "follows the step card one step at a time",
        "finds what is broken and fixes it",
        "improves the model on purpose and checks if it worked",
      ],
    },
    {
      tag: "PS",
      name: "problem solving",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "noticing when something is wrong, finding the cause, fixing it.",
      abilities: [
        "notices when something is not working — without being told",
        "tries a different approach when the first one fails",
        "finds the exact part causing the problem",
        "keeps going until the model reaches a clear goal",
      ],
    },
    {
      tag: "O&U",
      name: "observing & understanding",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "watching closely, measuring carefully, thinking before trying, explaining why.",
      abilities: [
        "spots one specific thing that changed — without being asked",
        "measures carefully and writes the number in the right place",
        "thinks about what will happen before trying",
        "explains why a result happened — not just what happened",
      ],
    },
    {
      tag: "LT",
      name: "logical thinking",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "understanding that results have causes — figuring out what caused each one.",
      abilities: [
        "understands that results have causes",
        "knows which specific change made the difference",
        "draws on what they found before when approaching something new",
        "thinks through what to test and how they will know if it worked",
      ],
    },
  ],
  dailyLogFields: [
    { label: "experiment", placeholder: "which experiment today" },
    { label: "build", placeholder: "model name" },
    { label: "day", placeholder: "build day (1–8)" },
    { label: "worth remembering", placeholder: "one specific thing noticed today" },
  ],
  dailyLogTracker: {
    label: "daily marks · ✓ observed clearly · — not observed",
    levels: ["O&U (experiment)", "LT (experiment)", "B&M (build)", "PS (build)", "concept understood"],
  },
  journeyLabel: "robotics journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child arrived ready to build and figure things out. they showed a particular approach to problem-finding and kept returning to the mechanics of what works and why.",
      atHomeTitle: "lever hunt at home",
      atHomeTips: [
        "pick up any object and try to balance it on one finger",
        "move your finger closer to one end and then the other",
        "ask your child: where does it balance? why there and not somewhere else?",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been building with growing confidence and thinking more carefully before testing.",
      atHomeTitle: "find a real pulley",
      atHomeTips: [
        "look for a pulley in real life — at a building site, in a gym, on a bicycle",
        "count how many times the rope goes around the wheels",
        "ask: the more times it goes around, the less effort needed. why?",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been stretching, tackling harder problems, and explaining their thinking out loud.",
      atHomeTitle: "take something apart",
      atHomeTips: [
        "find something simple that is already broken — an old pen, a broken toy",
        "lay each part out and name every part",
        "ask your child to figure out what job each one was doing",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been building with real confidence and thinking carefully about why things work — not just whether they work.",
      atHomeTitle: "diagnose before fixing",
      atHomeTips: [
        "when something breaks at home — before it gets fixed — ask: what do you think is causing this?",
        "ask: what would you try?",
        "listen and then try their idea first",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been building and experimenting with the confidence of someone who knows what they are doing.",
      atHomeTitle: "machines inside the bicycle",
      atHomeTips: [
        "on a bicycle together — ask: where is the lever? where is the fulcrum? where does the effort go?",
        "the bicycle has many machines inside it — find as many as you can",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "these final sessions your child built and experimented with the confidence and curiosity of a real engineer.",
      atHomeTitle: "name the simple machine inside",
      atHomeTips: [
        "look at any machine together — a crane, a lift, a bicycle, a market scale",
        "ask: which simple machine is inside this?",
        "your child has built working models this year — they know the answer",
      ],
    },
  ],
  backCoverPrompts: [
    "draw your favourite model from this year",
    "the model i am most proud of was",
    "the hardest problem i solved was",
    "i am most proud of",
  ],
};

// ─── Robotics 8-12 ──────────────────────────────────────────

const robotics812: BookConfig = {
  slug: "robotics-8-12",
  type: "robotics",
  ageGroup: "8-12",
  title: "my robotics experience book",
  subtitle: "robotics · ages 8–12",
  tagline:
    "this is your book. every model you built. every experiment you ran. every time you figured out not just what happened — but why.",
  coverColor: "bg-[#EDE6D3]",
  nameFields: [
    { label: "name", placeholder: "your name" },
    { label: "teacher", placeholder: "your teacher's name" },
    { label: "year", placeholder: "2025–2026" },
  ],
  preferences: [
    "when i build, i love to figure out the specific cause — not just that something is wrong",
    "i love to test my prediction and see if my reasoning was right",
    "i love to improve something deliberately and measure whether it worked",
    "i love to apply what i found in one experiment to something completely different",
    "one thing i want to build, figure out, or understand this year",
  ],
  segments: [
    {
      icon: "🔬",
      name: "experiment",
      desc: "work in a small group to find the answer to one specific question. every person takes at least one measurement independently — we never just watch.",
    },
    {
      icon: "🔧",
      name: "build",
      desc: "each of us builds our own model using a personal kit and a step card. the teacher never fixes anything and never tells us what to do next.",
    },
    {
      icon: "📓",
      name: "experience book",
      desc: "ten minutes at the end to write what we found, what we built, and what to think about before next session.",
    },
  ],
  skills: [
    {
      tag: "B&M",
      name: "building & making",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "connecting, constructing, fixing, and deliberately improving a working mechanical model.",
      abilities: [
        "puts parts together deliberately — checks each connection works before moving on",
        "follows the step card and notices when a step has not worked as expected",
        "finds the exact part that failed and fixes it without being told",
        "improves the model deliberately — states what they expect to change before testing",
      ],
    },
    {
      tag: "PS",
      name: "problem solving",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "recognising failure, trying genuinely different approaches, locating the specific cause, working toward a measurable goal.",
      abilities: [
        "notices when the model is not working and names what it should be doing",
        "tries genuinely different approaches — does not repeat what already failed",
        "names the specific part that is failing and explains what it is failing to do",
        "sets a measurable goal and keeps adjusting until the model reaches it",
      ],
    },
    {
      tag: "O&U",
      name: "observing & understanding",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "watching closely, measuring accurately, writing specific predictions before testing, explaining what caused a result.",
      abilities: [
        "names one specific thing that changed — what moved, shifted, or read differently",
        "takes measurements accurately and records every reading correctly",
        "writes a specific prediction before testing — a value or a reason, not just a direction",
        "explains what caused the result — names the cause and connects it to what the data shows",
      ],
    },
    {
      tag: "LT",
      name: "logical thinking",
      color: "bg-brand-orange/12 text-brand-orange",
      desc: "understanding causality, identifying what specifically made the difference, applying reasoning to new situations, planning before testing.",
      abilities: [
        "understands that results come from specific causes — not from everything changing at once",
        "identifies which specific change caused the result",
        "applies what they found in one situation to reason about a different one",
        "plans what to test, how to test it, and what a good result looks like — before starting",
      ],
    },
  ],
  dailyLogFields: [
    { label: "experiment", placeholder: "which experiment today" },
    { label: "build", placeholder: "model name" },
    { label: "day", placeholder: "build day (1–6)" },
    { label: "worth remembering", placeholder: "specific detail — especially reasoning" },
  ],
  dailyLogTracker: {
    label: "daily marks · ✓ observed clearly · — not observed",
    levels: ["O&U (experiment)", "LT (experiment)", "B&M (build)", "PS (build)", "concept understood (causal)"],
  },
  journeyLabel: "robotics journey",
  journeys: [
    {
      number: 1,
      sessionRange: "sessions 1–8",
      monthIntro:
        "your child arrived ready to build and think carefully about why things work.",
      atHomeTitle: "calculate before you balance",
      atHomeTips: [
        "pick up any object — a book, a tin, a fruit — and balance it on a ruler over a pencil",
        "move the pencil until it balances",
        "ask: could you calculate where it would balance before trying? what information would you need?",
      ],
    },
    {
      number: 2,
      sessionRange: "sessions 9–16",
      monthIntro:
        "your child has been building with precision and reasoning more carefully before every test.",
      atHomeTitle: "count the ropes on a real pulley",
      atHomeTips: [
        "look at a crane, a flagpole, or a building site pulley",
        "count the ropes",
        "your child can now tell you what adding one more rope does to the effort needed — ask them",
      ],
    },
    {
      number: 3,
      sessionRange: "sessions 17–24",
      monthIntro:
        "your child has been thinking like an engineer — reasoning before testing and explaining after.",
      atHomeTitle: "diagnose the failing part",
      atHomeTips: [
        "take apart something simple that is already broken",
        "ask your child to name each part and its function",
        "ask them to identify which part failed and what it was failing to do",
      ],
    },
    {
      number: 4,
      sessionRange: "sessions 25–32",
      monthIntro:
        "your child has been building and experimenting with the precision of someone who understands what they are measuring and why it matters.",
      atHomeTitle: "name the part · name the failure · name the fix",
      atHomeTips: [
        "when something breaks at home — before it gets fixed — ask your child three questions",
        "what is the specific part that failed, what was it supposed to do, and what would you change about the design?",
      ],
    },
    {
      number: 5,
      sessionRange: "sessions 33–40",
      monthIntro:
        "your child has been building and experimenting with the confidence and rigour of a trained engineer.",
      atHomeTitle: "every simple machine on a bicycle",
      atHomeTips: [
        "on a bicycle together — identify every simple machine you can find",
        "which are levers? which are pulleys?",
        "which reduce effort and which change direction?",
      ],
    },
    {
      number: 6,
      sessionRange: "sessions 41–48",
      monthIntro:
        "in these final sessions your child built and experimented with the precision, independence, and curiosity of a real engineer.",
      atHomeTitle: "explain the principle inside",
      atHomeTips: [
        "look at any complex machine together — a lift, a crane, a bicycle gear system",
        "ask your child to explain how it works — not just what it does, but the mechanical principle inside it",
        "they can now give you a real answer",
      ],
    },
  ],
  backCoverPrompts: [
    "draw your favourite model from this year",
    "the model i am most proud of was",
    "the most interesting thing i figured out was",
    "the prediction i got exactly right was",
  ],
};

// ─── Export ─────────────────────────────────────────────────

export const bookConfigs: Record<string, BookConfig> = {
  "art-5-8": art58,
  "art-8-12": art812,
  "speaking-5-8": speaking58,
  "speaking-8-12": speaking812,
  "robotics-5-8": robotics58,
  "robotics-8-12": robotics812,
};

export function getBookConfig(slug: string): BookConfig | undefined {
  return bookConfigs[slug];
}
