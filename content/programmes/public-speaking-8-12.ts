import type {
  CurriculumProgramme,
  CurriculumActivity,
  CurriculumSessionEntry,
  CurriculumCheckpoint,
} from "@/content/types";

// ─── Activities ─────────────────────────────────────────────

const rollCallActivities: Record<string, CurriculumActivity> = {
  brain: {
    id: "brain",
    segment: "roll-call",
    title: "sentence chain",
    cardName: "Brain",
    setupLine:
      "I'll say one sentence ending in a bold starter word. The next child begins with that word. Chain continues around the circle — no starter word may repeat.",
    howToPlay:
      "Sit in a circle. Teacher reads one opening sentence from the prompt bank \u2014 the last word is a bold starter word the next child must open with. The chain continues. If a child cannot continue within 5 seconds, they say \"pass\" and the next child continues. At 8\u201312, no starter word may repeat across the whole chain.",
    example:
      "Teacher \u2014 \"I missed the bus because I woke up late.\" Child 1 \u2014 \"Late nights always make the next morning harder.\" Child 2 \u2014 \"Harder days teach you more than easy ones.\"",
    materials: ["Opening-sentence prompt deck"],
    promptHeading: "prompts — last word is the starter for the next child",
    prompts: [
      "I missed the bus because I woke up late  →  starter: late",
      "We stayed indoors because it was too hot  →  starter: hot",
      "My friend was nervous before the match  →  starter: match",
      "I felt proud after finishing my project  →  starter: project",
      "We reached the mall in the evening  →  starter: evening",
      "I got tired after playing in the ground  →  starter: ground",
      "My teacher smiled because I answered correctly  →  starter: correctly",
      "We stood quietly during the assembly  →  starter: assembly",
      "I felt excited before going on a trip  →  starter: trip",
      "My friend was upset after losing the game  →  starter: game",
      "We started laughing because something was funny  →  starter: funny",
      "I stayed back after school for a practice  →  starter: practice",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  body: {
    id: "body",
    segment: "roll-call",
    title: "every body says",
    cardName: "Body",
    setupLine:
      "I'm going to show a card. Your team has to become that object — using only your bodies. No speaking.",
    howToPlay:
      "Children divide into teams of 3–4. One child flips an object image card — visible to all teams. All teams immediately form that object using their bodies. No speaking. Teams work together silently. The teacher decides which team's version is most convincing. That team flips the next card.",
    variations: [
      {
        name: "Formation guide",
        description:
          "The back of each card shows an illustration of how to form the object as a pair or a group. Teams try to match the illustrated formation.",
      },
      {
        name: "Find your pair",
        description:
          "Cards come in matching pairs (table + chair, bowl + spoon, pen + paper). Each child draws one card without showing others. On the signal, everyone walks around forming their object using their body. When they find their matching pair, they link up. First pair to lock in wins.",
      },
    ],
    difficultyLevels: [
      { level: "Easy", description: "Solo — each child forms the object on their own body." },
      { level: "Medium", description: "Partner — two children form the object together, adding the partner action on the card." },
      { level: "Hard", description: "Additional group or pair tasks — extra prompts layered on top of the base formation (e.g. \"chimney appears,\" \"two arches meet,\" \"flying in formation\")." },
    ],
    materials: [
      "Every Body Says object image cards (30 cards · 15 pairs)",
    ],
    promptHeading: "prompts — card · object · solo action · partner action",
    prompts: [
      "P1A · chair — solo: glide · partner: one leg breaks",
      "P1B · table — solo: wobble · partner: set the table",
      "P2A · spoon — solo: stir · partner: scoop",
      "P2B · bowl — solo: spin · partner: fill up",
      "P3A · bed — solo: bounce · partner: tuck in",
      "P3B · pillow — solo: squish · partner: two pillows",
      "P4A · tree — solo: grow · partner: a bird lands",
      "P4B · flower — solo: wilt · partner: a bee arrives",
      "P5A · car — solo: accelerate · partner: traffic jam",
      "P5B · bus — solo: brake · partner: passengers board",
      "P6A · bridge — solo: sway · partner: someone crosses",
      "P6B · arch — solo: crumble · partner: two arches meet",
      "P7A · lamp — solo: flicker · partner: switch on",
      "P7B · book — solo: flip · partner: someone reads",
      "P8A · house — solo: shrink · partner: chimney appears",
      "P8B · door — solo: creak · partner: knock knock",
      "P9A · airplane — solo: soar · partner: flying in formation",
      "P9B · rocket — solo: launch · partner: countdown",
      "P10A · bicycle — solo: pedal · partner: flat tyre",
      "P10B · wheel — solo: spin · partner: two wheels",
      "P11A · guitar — solo: strum · partner: duet",
      "P11B · drum — solo: rumble · partner: drumstick snaps",
      "P12A · umbrella — solo: inside out · partner: share",
      "P12B · rain — solo: pour · partner: puddle forms",
      "P13A · ladder — solo: wobble · partner: someone climbs",
      "P13B · stairs — solo: crumble · partner: third step",
      "P14A · toothbrush — solo: brush · partner: giant tooth",
      "P14B · tooth — solo: wobbly · partner: toothbrush arrives",
      "P15A · camera — solo: zoom · partner: pose",
      "P15B · mirror — solo: crack · partner: three-way mirror",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  voice: {
    id: "voice",
    segment: "roll-call",
    title: "voice toss",
    cardName: "Voice",
    setupLine:
      "Before you throw the ball, call a volume. The catcher has to say any word or sentence at exactly that volume.",
    howToPlay:
      "Children stand or sit in a circle. Before throwing a soft ball, the thrower calls one of three volume levels. The catcher must say any word at exactly that volume before throwing to someone new and calling a different level. Three volume levels: Loud \u2014 full voice, fill the room \u00b7 Medium \u2014 normal conversation voice \u00b7 Whisper \u2014 barely audible, lean in to hear. At 8\u201312, the thrower may also name a word to stress: \"Medium \u2014 and stress the last word.\"",
    variations: [
      {
        name: "Sing / Laugh / Cry and Speak",
        description:
          "Before the throw, the thrower calls one of three modes — sing, laugh, or cry. The catcher says any word in that mode: sung to any tune, while laughing, or as if about to cry.",
      },
      {
        name: "Volume Toss Circle",
        description:
          "The circle gradually moves up or down the volume scale — each catcher speaks one notch louder or one notch quieter than the last. After every 3 children, the teacher resets the cycle and the circle starts again from the beginning of the scale.",
      },
    ],
    materials: ["Soft ball"],
    debriefPrompts: [],
    type: "physical-game",
  },
  eyes: {
    id: "eyes",
    segment: "roll-call",
    title: "eye contact tag",
    cardName: "Eyes",
    setupLine:
      "Walk around. When the music stops, find someone and hold eye contact until the music starts again.",
    howToPlay:
      "Children walk around the space while music plays. When the music stops, each child makes eye contact with someone nearby and holds it according to today's variation.",
    variations: [
      {
        name: "Hold it",
        description:
          "Both children hold eye contact until the music starts again. If a child looks away first, they sit out for one round.",
      },
      {
        name: "Walk and exchange",
        description:
          "Two children who lock eyes walk toward each other without breaking contact and exchange one sentence before music resumes.",
      },
      {
        name: "Who blinks first",
        description:
          "After locking eyes, both children try not to blink. First to blink sits out for one round.",
      },
      {
        name: "Make them laugh",
        description:
          "After locking eyes, children try to make the other person smile or laugh without touching them or speaking.",
      },
    ],
    materials: [
      "Portable Bluetooth speaker",
      "Curated music playlist — https://www.youtube.com/watch?v=-oO7Vk3lNXM&list=RDEMm-K3475YJ1af4D0F6JvchA&start_radio=1",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  ears: {
    id: "ears",
    segment: "roll-call",
    title: "copycat",
    cardName: "Ears",
    setupLine:
      "I'm going to start a gesture with a sound. Copy it exactly and pass it on.",
    howToPlay:
      "Everyone stands in a circle. One player makes a small gesture with a small sound \u2014 for example, slowly raising one hand and humming softly. Their neighbour copies exactly and passes it around. Variations in what subtly changes are observed and discussed after. Also watch for small unplanned sounds \u2014 sighs, clicks, breaths \u2014 these should be copied too.",
    materials: [],
    debriefPrompts: [],
    type: "facilitated",
  },
  "whats-that-sound": {
    id: "whats-that-sound",
    segment: "roll-call",
    title: "what's that sound",
    cardName: "Ears",
    setupLine:
      "Pick a card. Don't show anyone. Make the sound of the ticked object — the rest of us guess.",
    howToPlay:
      "Children take turns. One child picks a card from the deck without showing it. On the card is a ticked object — a bell, a door, a cat, a kettle, a clap, a drum. The child makes the sound of that object using only their voice and body. The other children listen and guess. First correct guess picks the next card. After a correct guess, the child explains one specific mark-quality of their sound — pitch, rhythm, attack — that made it recognisable. To extend the game — children play to complete a set of sounds by asking their friends for the set card and making that sound too. For example: collect all instrument cards to make a set — bell + drum + guitar + flute — every child who has one of those cards makes its sound as they hand it over.",
    materials: [
      "What's That Sound card deck (objects with a ticked sound on each)",
      "Set cards — groups of related objects (instruments, kitchen sounds, animals, etc.)",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
};

const playgroundActivities: Record<string, CurriculumActivity> = {
  "script-flip": {
    id: "script-flip",
    segment: "playground",
    title: "script flip",
    setupLine:
      "Every child gets a script card. They fill in the blanks and then narrate their script.",
    howToPlay:
      "Each child receives a laminated Script Flip card and an erasable marker. They fill in the story template blanks. When all blanks are filled, each child narrates their completed script.",
    variations: [
      {
        name: "Write & perform — individual or as a team",
        description:
          "Children fill and perform their script solo, or work in small teams — one card shared, blanks filled together, each team member delivers a section of the narration.",
      },
    ],
    materials: [
      "Laminated Script Flip cards — B1 set (1 per child, reusable)",
      "Laminated Script Flip cards — B2 set",
      "Erasable markers",
      "Tone prompts — https://wordwall.net/resource/84260671/script-flip-digital-tones",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Use B1 cards." },
      { level: "Medium", description: "Use B2 cards." },
      { level: "Hard", description: "Also use tone prompts to write the script and to perform — https://wordwall.net/resource/84260671/script-flip-digital-tones" },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "tale-trail": {
    id: "tale-trail",
    segment: "playground",
    title: "tale trail",
    setupLine:
      "Shuffle Story Cards and place face-up in 4 piles (character, object, event, emotion). Pick one card from any pile. Children place it on the story mat and each child continues the story line through the cards they pick and place.",
    howToPlay:
      "Each child picks one card from any pile and places it on the Story Mat. Say the line in the story as you place the card. Next child picks another card, places it on the mat, and continues the story line. The tale builds card by card around the circle.",
    variations: [
      {
        name: "Transition cards",
        description:
          "Use transition cards alongside the story cards — when a child places one, they use the word or phrase on it to link their line to the previous one (e.g. \"meanwhile…,\" \"suddenly,\" \"later that day\").",
      },
      {
        name: "Theme dice",
        description:
          "The teacher rolls the theme dice to set the theme for the story. All children keep their contributions inside that theme.",
      },
      {
        name: "Re-arrange the story",
        description:
          "After the first telling, the teacher places the beginning / middle / end arrow cards over the row and interchanges them — the group has to re-tell the story in the new order using the same cards.",
      },
    ],
    materials: [
      "Story Mat",
      "Story Cards (Object 15, Character 15, Emotion 12, Event 15)",
      "Theme dice",
      "Transition word cards",
      "Beginning / middle / end arrow cards",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator gives opening sentence." },
      { level: "Medium", description: "Standard play, players choose their cards." },
      { level: "Hard", description: "Cards drawn randomly face-down; 5-minute time limit on the full tale." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  shuffle: {
    id: "shuffle",
    segment: "playground",
    title: "shuffle",
    setupLine:
      "Divide into Performing Team and Questioning Team. Performing team gets cards, creates a story, and performs. Questioning team asks using their Question Bands.",
    howToPlay:
      "Divide into Performing Team (2–3) and Questioning Team. The Performing Team draws one story — 6 cards — and lays them face-up in the story's printed order. They have preparation time to create and prepare their performance. Perform within 2–3 minutes. Questioning team asks questions using Question Bands — at least one Why and one How. One player summarises in 2–3 sentences. Roles rotate.",
    materials: [
      "Story Combination Cards — 10 stories × 6 cards = 60 A5 cards total (laminated, matte, openhouse green stripe)",
      "Question Bands (Who, What, When, Where, Why, How)",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Untimed — the Performing Team takes as long as they need to prepare." },
      { level: "Medium", description: "Timed challenge — preparation time is limited (e.g. 3–5 minutes on the clock)." },
      { level: "Hard", description: "Timed preparation, and the Questioning Team is allowed to ask follow-up questions beyond the normal round — digging deeper into any answer." },
    ],
    promptHeading: "the 10 stories in the shuffle deck",
    prompts: [
      "Story 1 — The Tortoise and the Hare (Aesop)",
      "Story 2 — The Boy Who Cried Wolf (Aesop)",
      "Story 3 — The Lion and the Mouse (Aesop)",
      "Story 4 — The Emperor's New Clothes (Hans Christian Andersen) · works best with 3 children",
      "Story 5 — The Ant and the Grasshopper (Aesop)",
      "Story 6 — The Crow and the Pitcher (Aesop) · one child acts, others narrate",
      "Story 7 — The Ugly Duckling (Hans Christian Andersen)",
      "Story 8 — Androcles and the Lion (Aesop)",
      "Story 9 — The Wind and the Sun (Aesop)",
      "Story 10 — The Brahmin's Pot of Dreams (Panchatantra) · make the dream visible through narration",
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  spaggle: {
    id: "spaggle",
    segment: "playground",
    title: "spaggle",
    setupLine:
      "Note your topic from the digital deck. Assemble your Speech Puzzle Board \u2014 Topic, Opening, Argument, Evidence, Conclusion \u2014 using your cards. Then deliver your speech.",
    howToPlay:
      "Each player notes their topic from the digital topic deck. Deal 5 Puzzle Cards and 2 Action Cards per player. Players assemble their Speech Puzzle Board simultaneously. On each turn, draw 1 Puzzle Card, may play one Action Card (Swap/Steal/Block), then deliver speech using cards on board in order. After delivering, ask one question to any other player. If they cannot answer correctly, they lose 1 token. Game ends at 15 tokens or after fixed rounds.",
    materials: [
      "Speech Puzzle Board (1 per child)",
      "Speech Puzzle Cards",
      "Action Cards",
      "Player Tokens and Tracker",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator suggests topic and helps fill Opening." },
      { level: "Medium", description: "Child assembles independently." },
      { level: "Hard", description: "Must use all five sections; Conclusion must connect back to Opening." },
    ],
    debriefPrompts: [
      {
        notice: "which part of the speech structure was hardest to fill.",
        name: "that is the section that needs the most practice.",
        connect: "What is the difference between an argument and an opinion? Which one is more convincing and why?",
      },
    ],
    type: "physical-game",
  },
  "pitch-perfect": {
    id: "pitch-perfect",
    segment: "playground",
    title: "pitch perfect",
    setupLine:
      "Your team has invented something that solves a problem. Plan your pitch: name the problem, describe the solution, explain why it works. Incorporate the Twist card. Present to the investor panel.",
    howToPlay:
      "Teams of 2\u20133 draw a pitch prompt card. 5\u20137 minutes to plan. Educator gives each team one Twist card to incorporate. Each team pitches for 2 minutes. Non-pitching groups are the investor panel and ask at least two questions. Panel awards tokens to most structured and convincing pitch.",
    materials: [
      "Pitch prompt cards",
      "Investor tokens",
      "Twist cards",
      "Index cards for planning",
    ],
    difficultyLevels: [
      { level: "Easy", description: "7-minute prep, Twist optional, panel asks one question." },
      { level: "Medium", description: "5-minute prep, Twist required, two questions." },
      { level: "Hard", description: "5-minute prep, Twist required, panel must challenge one assumption." },
    ],
    debriefPrompts: [
      {
        notice: "which pitch stated problem and solution clearly in first 30 seconds.",
        name: "that is a strong opening structure.",
        connect: "Did the pitch have a clear problem and solution \u2014 or did it jump straight to the product?",
      },
    ],
    type: "physical-game",
  },
  "speech-a-palooza": {
    id: "speech-a-palooza",
    segment: "playground",
    title: "speech-a-palooza",
    setupLine:
      "Roll, move, draw a challenge card. Complete the speaking challenge. Then answer one follow-up question without repeating anything you already said.",
    howToPlay:
      "Each player rolls, moves, draws challenge card. Complete speaking challenge. One other player asks one genuine follow-up question. Speaker must answer without repeating anything already said. Repeat = lose one token.",
    materials: [
      "Board",
      "Challenge cards",
      "Tokens",
      "Dice",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Follow-up questions optional." },
      { level: "Medium", description: "Follow-up required, no repeats." },
      { level: "Hard", description: "After follow-up, peer speaks on same topic for 20 seconds starting from where speaker left off." },
    ],
    debriefPrompts: [
      {
        notice: "which follow-up question forced the speaker to think in a completely new direction.",
        name: "that is genuine follow-up.",
        connect: "What happens to answer quality when you cannot repeat? Where does the new thinking come from?",
      },
    ],
    type: "physical-game",
  },
  "watch-your-step": {
    id: "watch-your-step",
    segment: "playground",
    title: "watch your step",
    setupLine:
      "Speak on your topic for a set time to move a set number of steps. Hesitate or stop, and the timer stops — you move by however many steps the time board gives you.",
    howToPlay:
      "Pieces start at the bottom of the gameboard. The time board at the side maps speaking time to steps — e.g. 15 seconds = 1 step, 30s = 2, 45s = 3, 60s = 4, and so on. Players can see the board the whole time so they can plan how long they want to keep speaking. On their turn, an individual / team draws a topic card and starts speaking. The timer runs visibly. Hesitation, repetition, or going off-topic stops the timer — the piece moves by the number of steps the time board allows for that clock reading. Landing on a Slippery Step moves the piece back. Landing on a Risk Step: player attempts a Risk Card challenge — completing it earns a Reward Card. First individual / team to the top of the board wins. In team play, the whole team shares one piece but each team member speaks on a different topic on their turn — every member takes at least one turn.",
    variations: [
      {
        name: "Individual play",
        description:
          "Each player plays with their own piece. Their turn, their topic, their time.",
      },
      {
        name: "Team play",
        description:
          "Teams share one piece on the board but turns are taken by team members — each member speaking on a different topic. Every member must take at least one turn before the team piece reaches the top.",
      },
      {
        name: "3-word incorporation",
        description: "The opposing team / player gives the speaker 3 words to incorporate into their speech before the turn begins.",
      },
    ],
    materials: [
      "Gameboard",
      "Time board (speaking-time to steps reference)",
      "Player pieces",
      "Risk Cards",
      "Reward Cards",
      "App for topic cards",
      "Visible timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Simple familiar topics, 3-word variation not used." },
      { level: "Medium", description: "Standard topics, 3-word incorporation optional." },
      { level: "Hard", description: "Complex or abstract topics, 3-word incorporation required and words must appear naturally." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "train-of-thoughts": {
    id: "train-of-thoughts",
    segment: "playground",
    title: "train of thoughts",
    setupLine:
      "Three coloured card decks are in the centre. On your turn, draw one card from each deck and complete the speaking tasks one after another.",
    howToPlay:
      "Three coloured card decks are placed in the centre \u2014 each colour is a different type of speaking task. On their turn, a child draws one card from each of the three decks and completes the speaking tasks one after another, laying each completed card face-up in front of them. This line of completed cards is their train. Wild Cards are shuffled into the decks \u2014 when a child draws a Wild Card, they decide how to use it as a bonus or a skip within their turn. At 8\u201312, no notes are permitted at any difficulty level.",
    variations: [
      {
        name: "Longest train",
        description: "At the end of the session, the child with the longest train \u2014 most cards completed in sequence \u2014 wins.",
      },
    ],
    materials: [
      "Three-category card deck (three coloured decks)",
      "Wild Cards shuffled into decks",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher reads each card aloud, short pauses between." },
      { level: "Medium", description: "Child reads independently, completes in sequence." },
      { level: "Hard", description: "Must connect all three into one continuous response; any pause means starting again." },
    ],
    debriefPrompts: [
      {
        notice: "which type of task was hardest for most children.",
        name: "that is the skill that needs the most work.",
        connect: "When you are speaking to someone in real life, which of those things do you do most often? Which do you do least?",
      },
    ],
    type: "physical-game",
  },
  "guess-me": {
    id: "guess-me",
    segment: "playground",
    title: "guess me",
    setupLine:
      "One child holds a card to their forehead without looking at it. The group acts out what is on the card.",
    howToPlay:
      "One child holds a card to their forehead without looking at it. The group acts out what is on the card. At 8\u201312, child must use the word in a sentence demonstrating genuine contextual understanding. Another player may challenge.",
    variations: [
      {
        name: "Body and face only",
        description: "No sounds, no words.",
      },
      {
        name: "Body, face, and sounds",
        description: "Group can add sounds but not say the word.",
      },
      {
        name: "Yes/No questions",
        description: "Child asks yes/no questions to guide themselves to the answer. Hardest: child uses the guessed word in a sentence that shows they understand what it means.",
      },
    ],
    materials: ["Vocabulary card deck"],
    difficultyLevels: [
      { level: "Easy", description: "Simple cards, no time limit, no challenge." },
      { level: "Medium", description: "Standard cards, 30-second limit, sentence must show contextual understanding." },
      { level: "Hard", description: "Abstract cards, 20-second limit, any player may challenge sentence accuracy." },
    ],
    debriefPrompts: [
      {
        notice: "which physical performance made the answer most obvious without any sound.",
        name: "that is clear body communication.",
        connect: "What did you have to do with your body to make the other person understand without words? When do you use that same skill while speaking?",
      },
    ],
    type: "physical-game",
  },
  psychiatrist: {
    id: "psychiatrist",
    segment: "playground",
    title: "psychiatrist",
    setupLine:
      "Questioner steps outside. Group agrees on a hidden rule. Questioner returns and asks questions to figure out the rule.",
    howToPlay:
      "Questioner steps outside or turns away. Group secretly agrees on a hidden rule governing all their answers \u2014 for example, everyone ends every answer with the same word, or everyone answers as if they are the person sitting to their left. Questioner returns and asks each player a question in turn. After one full round, questioner states their theory. Group responds: Warm (close) or Cold (not close). Game ends when the questioner correctly identifies the rule. Post-reveal: group identifies the single most useful question asked and explains why. At 8\u201312, the group may secretly change the rule halfway through.",
    variations: [
      {
        name: "Imposter",
        description:
          "Before the questioner returns, one group member secretly receives a different hidden rule (decided by a simple chit draw from a bag). That person is the imposter. The questioner must identify both the group's rule and the imposter.",
      },
    ],
    materials: ["Simple chits (for imposter variation \u2014 two types: Rule and Imposter)"],
    difficultyLevels: [
      { level: "Easy", description: "Obvious rules, unlimited rounds." },
      { level: "Medium", description: "Subtle rules, 3 rounds." },
      { level: "Hard", description: "Group changes rule halfway, questioner identifies both rules and the change point." },
    ],
    debriefPrompts: [
      {
        notice: "the question that got closest to revealing the rule.",
        name: "that is a precise question.",
        connect: "What made some questions more revealing than others? What would a precise question look like in a real conversation?",
      },
    ],
    type: "facilitated",
  },
  "improv-survival": {
    id: "improv-survival",
    segment: "playground",
    title: "improv survival",
    setupLine:
      "Two performers, four quadrant zones, each with a different challenge. Perform a scene. The audience can move you between zones.",
    howToPlay:
      "Set up four quadrant mats, each with a slate showing a different challenge (e.g. speak only in questions, whisper, no hand gestures, rhyme every sentence). Two performers start a scene in one quadrant. Audience members hold Number Cards corresponding to quadrants. At any point, an audience member raises their card to move a performer to that quadrant \u2014 the performer must immediately switch to that quadrant's challenge while staying in character. Each performer has one Block Token to reject a move. Penalty Tokens for breaking a quadrant rule. Scene runs for a set time. Post-scene: audience names the smoothest transition.",
    materials: [
      "Quadrant Mats (4)",
      "Slates with stands (4)",
      "App for scenario cards",
      "Number Cards (1 per audience member)",
      "Block Tokens (1 per performer)",
      "Penalty Tokens",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator performs as one performer, simple scenarios, audience shifts once." },
      { level: "Medium", description: "Two student performers, standard scenarios, audience shifts twice, Block Tokens in play." },
      { level: "Hard", description: "No Block Tokens, audience shifts twice, final round each performer through all 4 quadrants in 60 seconds." },
    ],
    debriefPrompts: [
      {
        notice: "which quadrant shift was handled most smoothly.",
        name: "that is adapting in real time.",
        connect: "What did you have to do to stay in character? When do you need that skill in real speaking?",
      },
    ],
    type: "physical-game",
  },
  "reverse-gear": {
    id: "reverse-gear",
    segment: "playground",
    title: "reverse gear",
    setupLine:
      "I'll read a statement. One child says it. The next child reverses it — changing the quantifier and the action.",
    howToPlay:
      "Teacher reads a statement from the prompt bank. The first child repeats it. The next child reverses it — flipping the quantifier (always → never, usually → rarely) and optionally the action. The difficulty level determines how much gets reversed. Group listens for whether the reversal is genuinely speakable and makes sense in real life.",
    materials: ["Reverse Gear prompt deck (app)"],
    difficultyLevels: [
      {
        level: "Easy",
        description:
          "Teacher reads the statement aloud. Child reverses the quantifier only — e.g. \"always\" → \"never.\"",
      },
      {
        level: "Medium",
        description:
          "Child reads independently. Child reverses both quantifier and action — e.g. \"I always like playing in the park\" → \"I never like staying indoors.\"",
      },
      {
        level: "Hard",
        description:
          "Child reverses the statement AND adds one extra sentence extending the reversed idea — e.g. \"I never like staying indoors — I need to be outside or I go crazy.\"",
      },
    ],
    promptHeading: "prompts — statements to reverse",
    prompts: [
      "I usually prefer working alone on my tasks.",
      "We always follow rules during games.",
      "My friend often tries new activities.",
      "My mother usually plans everything in advance.",
      "My father always finishes work on time.",
      "My grandmother often chooses quiet places.",
      "My uncle usually speaks softly in conversations.",
      "I always organise my things before starting.",
      "We often play in large groups after school.",
      "My friend usually completes work very fast.",
      "My mother always keeps the house neat.",
      "I often wake up early without help.",
    ],
    debriefPrompts: [
      {
        notice: "which reversals felt most natural, and which felt forced.",
        name: "that is the difference between a real opposite and a logical opposite.",
        connect:
          "In a real argument, when does someone take the opposite side genuinely versus just for effect? How do you tell?",
      },
    ],
    type: "facilitated",
  },
};

const showtimeActivities: Record<string, CurriculumActivity> = {
  "debate-duel": {
    id: "debate-duel",
    segment: "showtime",
    title: "debate duel",
    setupLine:
      "Two debaters, one topic. One argues For, one argues Against. The audience awards their vote to whoever was more convincing in how they delivered \u2014 not who they agreed with.",
    howToPlay:
      "Arrange in circle. Give each child a Vote Card. Select moderator. Moderator draws Topic Card and selects topic. Selects two debaters. Debaters draw For/Against chits. Each draws a Strategy Card. 1 minute preparation. For speaks first \u2014 1 minute. Against \u2014 1 minute. Non-debating players ask questions. Audience awards Vote Cards based on delivery. Losing debater gets Strike Card. Two Strikes = become moderator. Last debater standing wins.",
    materials: [
      "Debate Duel Topic Cards (Booklet 1 + 2)",
      "Strategy Cards",
      "Moderator Card",
      "Voting Cards (10)",
      "Strike Cards (10)",
      "For & Against Cards (2)",
      "Volume Meter (educator)",
      "Small whiteboard + dry-erase markers (educator)",
      "Index cards",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Booklet 1 topics, 1-min prep, Strategy Cards optional." },
      { level: "Medium", description: "Booklet 1 or 2, Strategy Cards required, audience names specific moment." },
      { level: "Hard", description: "Booklet 2, Strategy Cards required, educator names one word losing debater should have stressed." },
    ],
    debriefPrompts: [
      {
        notice: "the specific moment that made most audience members award their vote.",
        name: "that is the moment of conviction.",
        connect: "What did that speaker do \u2014 was it a word, a pause, a gesture, a change of volume? How do you create that moment deliberately?",
      },
    ],
    type: "physical-game",
  },
  "experience-share": {
    id: "experience-share",
    segment: "showtime",
    title: "experience share circle",
    setupLine:
      "Share one experience connected to today's theme \u2014 tell us where you were, what happened, and how it ended. After each person shares, two people ask one real question.",
    howToPlay:
      "Teacher gives today's theme from the prompt bank. Each child takes 30 seconds to think. Children share in turn \u2014 beginning (when and where), main event (what happened), conclusion (how it ended or what it meant). After each child shares, two peers each ask one genuine question connected to what was actually said. Mid-circle, teacher asks the whole group: \"Before we continue \u2014 what is one thing someone said that you are still thinking about?\"",
    materials: ["App for theme prompts"],
    promptHeading: "prompts \u2014 themes to share about",
    prompts: [
      "A time I solved a problem by myself.",
      "A time I worked with others in a group.",
      "A time I tried something new.",
      "A time I made a mistake and fixed it.",
      "A time I changed my plan.",
      "A time I helped someone without being asked.",
      "A time I felt nervous before doing something.",
      "A time I completed something difficult.",
      "A time I had to be patient.",
      "A time I learned something outside school.",
      "A time I felt proud of something I did.",
      "A time I had to share something important.",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Familiar themes, teacher models with their own experience first." },
      { level: "Medium", description: "Standard themes, no model." },
      { level: "Hard", description: "Abstract or challenging themes, no preparation time." },
    ],
    debriefPrompts: [
      {
        notice: "which follow-up question opened something up that the speaker had not planned to share.",
        name: "that is a genuine question.",
        connect: "What is the difference between a genuine question and one you prepared before the person finished speaking?",
      },
    ],
    type: "facilitated",
  },
  "magic-box": {
    id: "magic-box",
    segment: "showtime",
    title: "magic box narratives",
    setupLine:
      "Reach in without looking. Whatever you pull out \u2014 build a story around it. Named character, a problem connected to the object, a surprising ending. Two minutes to think.",
    howToPlay:
      "Each child draws one object. 2 minutes to think. Tell story \u2014 2.5 min max. Named character, problem connected to object, surprising ending required. After all stories: Round 1 \u2014 group names strongest structural moment. Round 2 \u2014 group names most clearly structured story overall and explains why.",
    materials: [
      "Magic Box (decorated)",
      "30 small objects \u2014 10 animals, 10 vehicles, 10 everyday objects",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher provides a sentence frame: \"One day, [object] was...\"" },
      { level: "Medium", description: "No frame, child begins independently." },
      { level: "Hard", description: "Two objects, both must appear at named points in the story." },
    ],
    debriefPrompts: [
      {
        notice: "which story had an ending that felt earned rather than just surprising.",
        name: "that is setup and payoff.",
        connect: "What is the difference between a surprising ending and one that does not make sense?",
      },
    ],
    type: "physical-game",
  },
};

const signOffActivities: Record<string, CurriculumActivity> = {
  extempore: {
    id: "extempore",
    segment: "sign-off",
    title: "extempore",
    setupLine:
      "Read your scaffold card now \u2014 before the topic is revealed. Then speak immediately when the topic lands.",
    howToPlay:
      "Scaffold: say three things \u2014 one point, one example, one closing sentence. Start with whatever comes first. If stuck, say \"What I mean is...\" and try again. Pause instead of saying umm.",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "30 seconds, any structure, no stop >3s." },
      { level: "Medium", description: "1 minute, one example, clear closing." },
      { level: "Hard", description: "90 seconds, two angles, closes with intention, no visible hesitation." },
    ],
    debriefPrompts: [
      {
        notice: "who recovered fastest when they lost the thread.",
        name: "that is thinking on your feet.",
        connect: "What did they do in that moment \u2014 pause, restart, change direction? Which strategy worked best?",
      },
    ],
    type: "facilitated",
  },
  "point-of-view": {
    id: "point-of-view",
    segment: "sign-off",
    title: "point of view",
    setupLine:
      "I'll give you a position. Argue for it as strongly as you can \u2014 even if you disagree. Then your partner challenges you once. Respond.",
    howToPlay:
      "Scaffold: Position \u2014 state clearly. Reason 1. Reason 2. Counter \u2014 acknowledge opposite. Close \u2014 one strong final sentence.",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "States position and one reason, responds to challenge." },
      { level: "Medium", description: "Full structure, two reasons, counter acknowledged." },
      { level: "Hard", description: "Full structure with examples, counter pre-empted, handles challenge without repeating." },
    ],
    debriefPrompts: [
      {
        notice: "which argument felt strongest even when the speaker did not agree with it.",
        name: "that is conviction in delivery.",
        connect: "What made it convincing \u2014 the reasons or the way it was said?",
      },
    ],
    type: "facilitated",
  },
  "news-report": {
    id: "news-report",
    segment: "sign-off",
    title: "news report",
    setupLine:
      "You are a reporter. Report on something connected to today's topic as if it is happening right now.",
    howToPlay:
      "Scaffold: Headline \u2014 one sentence hook. Facts \u2014 Who/What/Where/When one sentence each. Why it matters. Close \u2014 \"Reporting live from [place], this is [your name].\"",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "Headline, who/what/where, signs off." },
      { level: "Medium", description: "Full report with reporter voice." },
      { level: "Hard", description: "Full report with invented detail plus live interview question to partner mid-report." },
    ],
    debriefPrompts: [
      {
        notice: "which report felt most like a real broadcast.",
        name: "that is vocal authority.",
        connect: "What did their voice do that made it sound like news rather than a conversation?",
      },
    ],
    type: "facilitated",
  },
  "story-in-a-minute": {
    id: "story-in-a-minute",
    segment: "sign-off",
    title: "story in a minute",
    setupLine:
      "Build and tell a story connected to today's topic. Character, problem, ending. One minute.",
    howToPlay:
      "Scaffold: Who \u2014 name + detail. Problem. Turning point. End. Magic words: Suddenly / But then / Until / Even though.",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "Names character, beginning + ending, one magic word." },
      { level: "Medium", description: "Full structure without notes, one magic word." },
      { level: "Hard", description: "Full structure, one unexpected detail, voice differentiates characters." },
    ],
    debriefPrompts: [
      {
        notice: "which story had a turning point that changed everything.",
        name: "that is narrative structure.",
        connect: "What made that moment feel like a real shift \u2014 was it the words or the way they were said?",
      },
    ],
    type: "facilitated",
  },
  defence: {
    id: "defence",
    segment: "sign-off",
    title: "defence",
    setupLine:
      "I'll give you an unlikely position. Defend it as if you fully believe it. Your partner challenges you once.",
    howToPlay:
      "Scaffold: Claim \u2014 \"I believe...because...\". Evidence \u2014 \"For example...\". Objection \u2014 \"You might think...but actually...\". Close \u2014 \"So that is why I stand by this.\"",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "Claim + one reason, responds to challenge." },
      { level: "Medium", description: "Full structure, handles challenge with new reason." },
      { level: "Hard", description: "Full structure with conviction, handles challenge without repeating, closing feels like final word." },
    ],
    debriefPrompts: [
      {
        notice: "which defence was hardest to argue against.",
        name: "that is a well-built argument.",
        connect: "What made it hard to challenge \u2014 the evidence or the delivery?",
      },
    ],
    type: "facilitated",
  },
  "what-if": {
    id: "what-if",
    segment: "sign-off",
    title: "what if",
    setupLine:
      "Respond to this scenario. What would happen \u2014 and what would you do? Think out loud.",
    howToPlay:
      "Scaffold: Imagine \u2014 what would happen first? Action \u2014 what specifically? Consequence \u2014 what comes next? Message \u2014 why does this matter?",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "Says what they would do and one consequence." },
      { level: "Medium", description: "Full structure in connected sentences." },
      { level: "Hard", description: "Reasoning goes two steps forward, handles partner's \"and then what?\" with specific answer." },
    ],
    debriefPrompts: [
      {
        notice: "which response went furthest into the future.",
        name: "that is extended reasoning.",
        connect: "What happens to your thinking when someone asks \"and then what?\" a second time?",
      },
    ],
    type: "facilitated",
  },
  "rapid-fire": {
    id: "rapid-fire",
    segment: "sign-off",
    title: "rapid fire",
    setupLine:
      "Your partner asks three quick questions. Answer each clearly. No hesitation >3 seconds. Then swap.",
    howToPlay:
      "Questioner scaffold: Q1 \"What do you think about [topic]?\" Q2 \"Why does this matter to you?\" Q3 choose one. Speaker scaffold: 1\u20133 sentences each. No one-word answers. If stuck, say \"My instinct is...\"",
    materials: [],
    difficultyLevels: [
      { level: "Easy", description: "Two questions, one sentence each, no hesitation >3s." },
      { level: "Medium", description: "All three, one unprompted detail." },
      { level: "Hard", description: "All three fluently, then asks partner one genuine follow-up based on what partner said." },
    ],
    debriefPrompts: [
      {
        notice: "which answer surprised the questioner.",
        name: "that is spontaneous thinking.",
        connect: "What happens when you answer before you have time to plan? Is the answer better or worse?",
      },
    ],
    type: "facilitated",
  },
  "superhero-sales": {
    id: "superhero-sales",
    segment: "showtime",
    title: "superhero sales pitch",
    setupLine:
      "You have a superpower. Sell it to the group. Tell us what it is, why it is the best, and answer two challenge questions.",
    howToPlay:
      "One child draws a superpower prompt from the app. 30 seconds to prepare. Child pitches their superpower to the class — what it is, why it is the best, how it would be used. The group votes — useful or useless. Child responds to two challenge questions from the group.",
    materials: ["App for superpower prompts"],
    difficultyLevels: [
      { level: "Easy", description: "1 minute prep, teacher provides the opening frame." },
      { level: "Medium", description: "30 seconds prep, child structures independently." },
      { level: "Hard", description: "No prep, child must handle at least three challenge questions from the group." },
    ],
    promptHeading: "prompts — superpowers to pitch",
    prompts: [
      "A superhero who can pause time for a few seconds.",
      "A superhero who can understand any language.",
      "A superhero who can fix traffic in a city.",
      "A superhero who can reduce noise anywhere.",
      "A superhero who can organise messy places instantly.",
      "A superhero who can remember everything.",
      "A superhero who can find the fastest route anywhere.",
      "A superhero who can stop pollution in a city.",
      "A superhero who can help people work together.",
      "A superhero who can make learning easier.",
      "A superhero who can solve small problems quickly.",
      "A superhero who can give everyone exactly the right amount of sleep they need.",
    ],
    debriefPrompts: [
      {
        notice: "which pitch made the vote closest.",
        name: "that is a compelling argument.",
        connect: "What made the vote hard to decide? What did that speaker do that made you genuinely consider it?",
      },
    ],
    type: "facilitated",
  },
};

// ─── Session Table ──────────────────────────────────────────

const sessionTable: CurriculumSessionEntry[] = [
  { sessionNumber: 0, rollCall: "voice", playground: "guess-me", showtime: "debate-duel", topicLayer: 0 },
  { sessionNumber: 1, rollCall: "brain", playground: "script-flip", showtime: "debate-duel", topicLayer: 1 },
  { sessionNumber: 2, rollCall: "body", playground: "tale-trail", showtime: "experience-share", topicLayer: 1 },
  { sessionNumber: 3, rollCall: "voice", playground: "shuffle", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 4, rollCall: "eyes", playground: "spaggle", showtime: "debate-duel", topicLayer: 1 },
  { sessionNumber: 5, rollCall: "ears", playground: "pitch-perfect", showtime: "experience-share", topicLayer: 1 },
  { sessionNumber: 6, rollCall: "brain", playground: "speech-a-palooza", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 7, rollCall: "body", playground: "watch-your-step", showtime: "debate-duel", topicLayer: 1 },
  { sessionNumber: 8, rollCall: "voice", playground: "train-of-thoughts", showtime: "experience-share", topicLayer: 1, isCheckpoint: true },
  { sessionNumber: 9, rollCall: "eyes", playground: "guess-me", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 10, rollCall: "ears", playground: "psychiatrist", showtime: "debate-duel", topicLayer: 1 },
  { sessionNumber: 11, rollCall: "brain", playground: "improv-survival", showtime: "experience-share", topicLayer: 1 },
  { sessionNumber: 12, rollCall: "body", playground: "script-flip", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 13, rollCall: "voice", playground: "tale-trail", showtime: "debate-duel", topicLayer: 2 },
  { sessionNumber: 14, rollCall: "eyes", playground: "shuffle", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 15, rollCall: "ears", playground: "spaggle", showtime: "magic-box", topicLayer: 2 },
  { sessionNumber: 16, rollCall: "brain", playground: "pitch-perfect", showtime: "debate-duel", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 17, rollCall: "body", playground: "speech-a-palooza", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 18, rollCall: "voice", playground: "watch-your-step", showtime: "magic-box", topicLayer: 2 },
  { sessionNumber: 19, rollCall: "eyes", playground: "train-of-thoughts", showtime: "debate-duel", topicLayer: 2 },
  { sessionNumber: 20, rollCall: "ears", playground: "guess-me", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 21, rollCall: "brain", playground: "psychiatrist", showtime: "magic-box", topicLayer: 2 },
  { sessionNumber: 22, rollCall: "body", playground: "improv-survival", showtime: "debate-duel", topicLayer: 2 },
  { sessionNumber: 23, rollCall: "voice", playground: "script-flip", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 24, rollCall: "eyes", playground: "tale-trail", showtime: "magic-box", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 25, rollCall: "ears", playground: "shuffle", showtime: "debate-duel", topicLayer: 3 },
  { sessionNumber: 26, rollCall: "brain", playground: "spaggle", showtime: "experience-share", topicLayer: 3 },
  { sessionNumber: 27, rollCall: "body", playground: "pitch-perfect", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 28, rollCall: "voice", playground: "speech-a-palooza", showtime: "debate-duel", topicLayer: 3 },
  { sessionNumber: 29, rollCall: "eyes", playground: "watch-your-step", showtime: "experience-share", topicLayer: 3 },
  { sessionNumber: 30, rollCall: "ears", playground: "train-of-thoughts", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 31, rollCall: "brain", playground: "guess-me", showtime: "debate-duel", topicLayer: 3 },
  { sessionNumber: 32, rollCall: "body", playground: "psychiatrist", showtime: "experience-share", topicLayer: 3, isCheckpoint: true },
  { sessionNumber: 33, rollCall: "voice", playground: "improv-survival", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 34, rollCall: "eyes", playground: "script-flip", showtime: "debate-duel", topicLayer: 3 },
  { sessionNumber: 35, rollCall: "ears", playground: "tale-trail", showtime: "experience-share", topicLayer: 3 },
  { sessionNumber: 36, rollCall: "brain", playground: "shuffle", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 37, rollCall: "body", playground: "spaggle", showtime: "debate-duel", topicLayer: 4 },
  { sessionNumber: 38, rollCall: "voice", playground: "pitch-perfect", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 39, rollCall: "eyes", playground: "speech-a-palooza", showtime: "magic-box", topicLayer: 4 },
  { sessionNumber: 40, rollCall: "ears", playground: "watch-your-step", showtime: "debate-duel", topicLayer: 4, isCheckpoint: true },
  { sessionNumber: 41, rollCall: "brain", playground: "train-of-thoughts", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 42, rollCall: "body", playground: "guess-me", showtime: "magic-box", topicLayer: 4 },
  { sessionNumber: 43, rollCall: "voice", playground: "psychiatrist", showtime: "debate-duel", topicLayer: 4 },
  { sessionNumber: 44, rollCall: "eyes", playground: "improv-survival", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 45, rollCall: "ears", playground: "script-flip", showtime: "magic-box", topicLayer: 4 },
  { sessionNumber: 46, rollCall: "brain", playground: "tale-trail", showtime: "debate-duel", topicLayer: 4 },
  { sessionNumber: 47, rollCall: "body", playground: "shuffle", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 48, rollCall: "voice", playground: "spaggle", showtime: "magic-box", topicLayer: 4, isCheckpoint: true },
  { sessionNumber: 49, rollCall: "brain", playground: "script-flip", showtime: "debate-duel", topicLayer: 1, isFlex: true },
  { sessionNumber: 50, rollCall: "body", playground: "tale-trail", showtime: "experience-share", topicLayer: 1, isFlex: true },
];

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Participates when directly invited. Speaks in short sentences without structure.",
        developing: "Arranges two or three ideas in sequence. Identifies a main point when prompted.",
        secure: "Arranges ideas in clear logical order. Identifies and delivers main point without prompting. Adds at least one specific detail or example.",
      },
      {
        skillArea: "Body Language",
        beginning: "Body is still or fidgeting while speaking.",
        developing: "Uses one deliberate gesture to highlight an idea.",
        secure: "Uses hands and face to highlight important ideas. Makes eye contact with at least one person consistently.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is flat or monotone.",
        developing: "Attempts to vary voice but inconsistently.",
        secure: "Uses voice and sound to bring ideas to life. Adjusts volume deliberately at least once.",
      },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Ideas are present but not ordered. Main point is unclear.",
        developing: "Delivers a main point with one supporting detail. Asks a deeper question when prompted.",
        secure: "Arranges ideas logically with specific details and examples. Asks and answers deeper questions. Begins with a clear opening.",
      },
      {
        skillArea: "Body Language",
        beginning: "Gestures are accidental, not deliberate.",
        developing: "Uses hands and face together at least once to support a point.",
        secure: "Makes eye contact across the group. Uses gestures that match and reinforce what is being said.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is steady but with no variation.",
        developing: "Stresses a specific word at least once to change meaning.",
        secure: "Adjusts volume deliberately. Stresses specific words to change meaning. Voice begins to express different feelings.",
      },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Structure is attempted but inconsistent. Examples are vague.",
        developing: "Adds specific details and examples consistently. Begins and ends with intention.",
        secure: "Arranges ideas in clear logical order with specific evidence. Asks deeper follow-up questions. Opens and closes clearly.",
      },
      {
        skillArea: "Body Language",
        beginning: "Eye contact is brief or limited to one person.",
        developing: "Makes eye contact across the group. Starts with stillness before beginning.",
        secure: "Uses hands, face, and eye contact together to support delivery. Starts with stillness, pause, and deliberate opening.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice changes are attempted but not yet purposeful.",
        developing: "Uses vocal tone to express at least one feeling deliberately.",
        secure: "Uses voice to bring ideas to life. Stresses words for meaning. Uses tone to express different feelings consistently.",
      },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Speaks for 30\u201345 seconds before trailing off. Relies on scaffold.",
        developing: "Speaks for 1\u20132 minutes with reasonable structure. Uses examples without prompting.",
        secure: "Speaks for 2+ minutes with clear logical order, specific evidence, deeper questions, and strong opening and closing.",
      },
      {
        skillArea: "Body Language",
        beginning: "Needs reminding to use body language.",
        developing: "Uses body and voice together in at least one deliberate moment.",
        secure: "Body language is becoming natural and integrated. Commands attention at the start.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is consistent but not yet a tool.",
        developing: "Recovers with a prompt when losing the thread. Uses word stress independently.",
        secure: "Voice, stress, tone, and volume work together. Begins to recover mid-talk without a prompt.",
      },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Consistent but not yet independent \u2014 needs scaffold to start.",
        developing: "Starts independently. Argues a position with at least two reasons and one piece of evidence.",
        secure: "Argues a position with clear structure, specific evidence, pre-empts counter-arguments, and adjusts mid-talk.",
      },
      {
        skillArea: "Body Language",
        beginning: "Uses body language when reminded.",
        developing: "Uses body and voice together deliberately. Eye contact is sustained across the group.",
        secure: "Commands attention when starting \u2014 pauses, stands still, then begins. Body language reinforces conviction.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is steady but predictable.",
        developing: "Uses voice variation and word stress independently.",
        secure: "Voice, body, and content work together. Tone shifts express genuine feeling and intention.",
      },
    ],
  },
  {
    afterSession: 48,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "A consistent, willing participant. Needs continued support to extend arguments and vary structure.",
        developing: "Speaks confidently in familiar formats. Uses a personal style that is beginning to be recognisable. Handles challenges.",
        secure: "Speaks for 2+ minutes on any topic. Argues with conviction. Chooses own approach without scaffold. Recovers from losing the thread.",
      },
      {
        skillArea: "Body Language",
        beginning: "Body language is present but not yet distinctive.",
        developing: "Has a recognisable physical presence while speaking. Eye contact is natural across the group.",
        secure: "Voice, body, and content work together as one thing. Physical presence commands the room.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is clear and audible but not yet a tool.",
        developing: "Uses voice as a deliberate tool in familiar formats. Word stress and tone are intentional.",
        secure: "Voice changes when they need it to and stays controlled when it matters. Vocal expression is distinctive and personal.",
      },
    ],
  },
];

// ─── Merged activities ──────────────────────────────────────

const allActivities: Record<string, CurriculumActivity> = {
  ...rollCallActivities,
  ...playgroundActivities,
  ...showtimeActivities,
};

// ─── Programme export ───────────────────────────────────────

export const publicSpeaking812: CurriculumProgramme = {
  id: "public-speaking-8-12",
  slug: "public-speaking-8-12",
  title: "public speaking",
  category: "language",
  heroImageUrl: "/prog-speaking-8-12.gif",
  ageGroup: "8-12",
  ageLabel: "ages 8\u201312",
  tagline: "think clearly & speak with confidence and conviction in front of an audience.",
  description:
    "builds argument, evidence, voice, and body language \u2014 through games and debates that turn speaking into a deliberate skill.",
  totalSessions: 50,
  skillAreas: [
    {
      id: "cs",
      name: "Content & Structure",
      shortName: "C&S",
      abilities: [
        "Arranges ideas in clear logical order",
        "Identifies and delivers main point",
        "Adds specific details and examples",
        "Asks and answers deeper questions",
        "Begins with clear opening and ends with clear closing",
      ],
    },
    {
      id: "bl",
      name: "Body Language",
      shortName: "BL",
      abilities: [
        "Uses hands and face to highlight important ideas",
        "Makes eye contact across group",
        "Starts with stillness pause and deliberate opening",
      ],
    },
    {
      id: "vs",
      name: "Vocal Skills",
      shortName: "VS",
      abilities: [
        "Uses voice and sound to bring ideas to life",
        "Adjusts volume deliberately",
        "Stresses specific words to change meaning",
        "Uses vocal tone to express different feelings",
      ],
    },
  ],
  segmentDefinitions: [
    {
      id: "roll-call",
      name: "Roll Call",
      durationRange: "8–10 min",
      objective: "activate voice or body. every child playing simultaneously within 2 minutes. debrief closes — max 2 min.",
      type: "rotating",
      rotationPool: ["brain", "body", "voice", "eyes", "ears", "whats-that-sound"],
    },
    {
      id: "playground",
      name: "Playground",
      durationRange: "20–25 min",
      objective: "build speaking, argument, and attentiveness through one group game. debrief closes.",
      type: "rotating",
      rotationPool: [
        "script-flip", "tale-trail", "shuffle", "spaggle",
        "pitch-perfect", "speech-a-palooza", "watch-your-step",
        "train-of-thoughts", "guess-me", "psychiatrist",
        "improv-survival",
      ],
    },
    {
      id: "showtime",
      name: "Showtime",
      durationRange: "30–35 min",
      objective: "children perform in front of peers. audience responds immediately. teacher tracks who speaks. debrief closes.",
      type: "rotating",
      rotationPool: [
        "debate-duel", "experience-share", "magic-box",
      ],
    },
    {
      id: "log-book",
      name: "Experience Book",
      durationRange: "8–10 min",
      objective: "child fills in log book with teacher's help. book goes home.",
      type: "fixed",
    },
  ],
  sessionTable,
  activities: allActivities,
  checkpoints,
  trialSession: {
    intro:
      "the trial session is 60 minutes. a first-time child experiences the full daily structure — roll call, playground, and showtime — with a short close naming the segments of every regular session.",
    segments: [
      {
        name: "When children arrive",
        time: "2 min",
        objective:
          "children sit wherever they like. teacher sits in the group.",
        setupLine:
          "quick question. no thinking. just answer. if you had to convince someone of the most ridiculous thing possible — what would it be?",
        howToPlay:
          "fast round — every child answers. teacher celebrates the most absurd argument with genuine enthusiasm. \"every person in this group just made an argument for something completely invented. in under 5 seconds. that is exactly what this programme builds — the ability to take any idea and say something worth listening to, right now, without days of preparation.\" \"three games today. let's go.\"",
      },
      {
        name: "Game context — say this early",
        time: "1 min",
        objective:
          "a short framing the teacher reads to the group once they've settled — sets expectation for what today's games are and how much choice children have.",
        howToPlay:
          "\"did you know we're going to play lots of different speaking games today? we'll use fun prompts to tell stories, act like characters, and share our ideas. we'll play games where you speak on your own, with a partner, and even in teams. for older children, we'll also try a fun debate duel game. every game is different — sometimes you perform, sometimes you answer, and sometimes you lead!\"",
      },
      {
        name: "Roll Call — Sentence Chain",
        time: "12 min",
        objective:
          "first game of the session. teacher demonstrates once with the child beside them, then the chain moves around the circle at pace.",
        setupLine:
          "i start. the last word of my sentence is the first word of yours. we go around. no pausing. if you pause for more than 5 seconds — say pass, and the chain moves on.",
        howToPlay:
          "teacher demonstrates the mechanic once fully with the child beside them before the group begins. teacher starts: \"i missed the bus because i woke up late.\" chain moves around. two rounds — second round, teacher moves to the next person after 3 seconds. no waiting.",
        example:
          "prompts to restart if the chain runs dry: \"my friend was nervous before the match.\" · \"i felt proud after finishing my project.\" · \"my teacher smiled because i answered correctly.\" · \"my friend was upset after losing the game.\" · \"we started laughing because something was funny.\"",
      },
      {
        name: "Playground — Tale Trail",
        time: "18 min",
        objective:
          "build a story together with a real story shape — problem, turning point, resolution. teacher introduces a transition card midway to force the story to change direction.",
        setupLine:
          "we build a story together — and at your level, the story must have three things: a problem, a turning point, and a resolution. not just events. a real story shape. everyone pick one card from any pile.",
        howToPlay:
          "story cards face-up in four piles: object · character · emotion · event. transition cards in a separate pile. story mat in the centre. teacher starts the story. children add one sentence each — building on what came before. midway through, teacher introduces a transition card: \"now i add a transition — 'but suddenly' — whoever is next has to take the story somewhere it wasn't going.\" after one full round, teacher asks the group: \"where is the turning point in this story? which sentence changed everything?\" brief discussion — 2 minutes. children identify it and say why. · if time allows: teacher rearranges three cards in a different order. \"same characters, same objects — different sequence. does the story change? what's different about it now?\"",
        materials: [
          "Story Mat",
          "Story Cards — Object, Character, Emotion, Event",
          "Transition Cards",
        ],
        heroImageUrl: "/games/ps/tale-trail.png",
      },
      {
        name: "Showtime — Debate Duel",
        time: "22 min",
        objective:
          "two debaters per duel. one argues for, one argues against. audience votes on delivery — not the argument — then names the specific moment that earned the vote.",
        setupLine:
          "two debaters. one topic. one argues for. one argues against. i assign the sides — you don't choose. 1 minute to prepare. then for speaks for 1 minute. against speaks for 1 minute. then everyone else asks one question each. both debaters answer. then we vote — not on who was right. on who was more convincing in how they delivered.",
        howToPlay:
          "teacher acts as moderator for the first duel, then can hand the moderator card to a child. run 2 duels. after each vote — teacher picks one person who voted: \"why? give me one specific moment — not a feeling, a moment.\" one person who votes then explains exactly which moment made them vote that way. one specific moment — a word, a pause, a change of energy.",
        example:
          "topics: homework should be banned. / homework should stay. · pets should be allowed in school. / pets should not be allowed. · everyone should learn to cook. / cooking should be optional.",
        materials: [
          "Debate Duel topic cards",
          "For & Against cards",
          "Moderator card",
        ],
        heroImageUrl: "/games/ps/debate-duel.png",
      },
      {
        name: "Last 2 minutes — what every session looks like",
        time: "2 min",
        objective:
          "a short close that names the three segments of every regular session so the child leaves knowing what to expect next time.",
        howToPlay:
          "\"every session at oh. public speaking — three parts. roll call to wake up your voice and brain. playground to play and compete. showtime to perform in front of people.\" · \"the games rotate. the structure stays. every session you speak more than you expected to. every session it gets sharper.\" · \"see you next time.\"",
      },
    ],
  },
};
