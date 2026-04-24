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
      "Teacher — \"I missed the bus because I woke up late.\" Child 1 — \"Late nights always make the next morning harder.\" Child 2 — \"Harder days teach you more than easy ones.\" No requirements — the child can make a sentence that does not necessarily continue the story.",
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
      { level: "Easy", description: "Solo / partner action on the card." },
      { level: "Medium", description: "Additional group or pair tasks — extra prompts layered on top of the base formation (e.g. \"chimney appears,\" \"two arches meet,\" \"flying in formation\")." },
      { level: "Hard", description: "Find your pair." },
    ],
    materials: [
      "Every Body Says object image cards (30 cards · 15 pairs)",
    ],
    promptHeading: "prompts — 15 pair blocks · card A + card B",
    prompts: [
      "Pair 1 · chair (solo: glide · partner: one leg breaks) + table (solo: wobble · partner: set the table)",
      "Pair 2 · spoon (solo: stir · partner: scoop) + bowl (solo: spin · partner: fill up)",
      "Pair 3 · bed (solo: bounce · partner: tuck in) + pillow (solo: squish · partner: two pillows)",
      "Pair 4 · tree (solo: grow · partner: a bird lands) + flower (solo: wilt · partner: a bee arrives)",
      "Pair 5 · car (solo: accelerate · partner: traffic jam) + bus (solo: brake · partner: passengers board)",
      "Pair 6 · bridge (solo: sway · partner: someone crosses) + arch (solo: crumble · partner: two arches meet)",
      "Pair 7 · lamp (solo: flicker · partner: switch on) + book (solo: flip · partner: someone reads)",
      "Pair 8 · house (solo: shrink · partner: chimney appears) + door (solo: creak · partner: knock knock)",
      "Pair 9 · airplane (solo: soar · partner: flying in formation) + rocket (solo: launch · partner: countdown)",
      "Pair 10 · bicycle (solo: pedal · partner: flat tyre) + wheel (solo: spin · partner: two wheels)",
      "Pair 11 · guitar (solo: strum · partner: duet) + drum (solo: rumble · partner: drumstick snaps)",
      "Pair 12 · umbrella (solo: inside out · partner: share) + rain (solo: pour · partner: puddle forms)",
      "Pair 13 · ladder (solo: wobble · partner: someone climbs) + stairs (solo: crumble · partner: third step)",
      "Pair 14 · toothbrush (solo: brush · partner: giant tooth) + tooth (solo: wobbly · partner: toothbrush arrives)",
      "Pair 15 · camera (solo: zoom · partner: pose) + mirror (solo: crack · partner: three-way mirror)",
    ],
    debriefPrompts: [
      {
        questions: [
          "How easy or difficult was it to form these images?",
          "Was it easy or difficult to work as a team? Could they have formed these images alone?",
          "Which image would they like to try making again?",
          "What did they do when they were stuck?",
          "Were there any specific challenges they faced? How did they overcome it?",
          "Is there anything they could have done differently or better?",
          "Was there ever a time when they could have collaborated better?",
          "Was there any shape created by another team that they liked?",
          "Did they ever have moments where they felt excited, apprehensive, or frustrated?",
          "Recognise individual achievements and uniqueness through tokens.",
          "Discuss how working together can lead to better results — highlight particularly effective teamwork moments during the game.",
        ],
      },
    ],
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
    debriefPrompts: [
      {
        questions: [
          "Reflect on the experience — how did maintaining eye contact affect your interactions? How might you use this in public speaking?",
        ],
      },
    ],
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
      "Everyone stands in a circle. One player makes a small gesture with a small sound — for example, slowly raising one hand and humming softly. Their neighbour copies exactly and passes it around. Variations in what subtly changes are observed and discussed after. Also watch for small unplanned sounds — sighs, clicks, breaths — these should be copied too.",
    materials: [],
    promptHeading: "prompts — gesture + sound combinations",
    prompts: [
      "Touch one shoulder slowly and hum one soft note.",
      "Open your eyes wide and make a tiny gasp.",
      "Scrunch your nose and sniff two times.",
      "Wave one hand gently and whisper \"hi.\"",
      "Put your hands on your cheeks and say \"oh!\"",
      "Raise both eyebrows and make a short \"hmm.\"",
      "Pat your knees two times and say \"tap tap.\"",
      "Clap once softly and smile wide.",
      "Touch your chin and say \"hmm hmm.\"",
      "Wiggle your fingers and whisper \"tickle tickle.\"",
      "Stamp one foot lightly and say \"thump.\"",
      "Cover your mouth and make a tiny giggle.",
      "Point to your ear and say \"listen.\"",
      "Make a surprised face and say \"wow!\"",
      "Rub your hands together and say \"ready ready.\"",
      "Tilt your head to one side and hum softly.",
      "Tap your elbow and make a quiet \"pop.\"",
      "Stretch both arms out and say \"ta-da!\"",
      "Blink three times and make a soft \"bloop.\"",
      "Pat your shoulders and say \"brrr.\"",
      "Make a sleepy face and yawn quietly.",
      "Lift one hand high and say \"hello there!\"",
      "Tap your head twice and say \"beep beep.\"",
    ],
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
      "Children take turns. One child picks a card from the deck without showing it. On the card is a ticked object — a bell, a door, a cat, a kettle, a clap, a drum. The child makes the sound of that object using only their voice and body. The other children listen and guess. First correct guess picks the next card. After a correct guess, the child explains one specific mark-quality of their sound — pitch, rhythm, attack — that made it recognisable.",
    variations: [
      {
        name: "Variation — Quartets",
        description:
          "Shuffle and deal 4 cards to each player. Place the rest face down in the centre. Goal: make sets of 4 matching cards of the same series (quartets). On your turn, ask any player for a series (e.g. nature, animals, vehicles) you need — if they have it, ask for the card by acting out or saying its sound. If you get the card, continue your turn. If not, draw one card from the centre and your turn ends. The first player to collect 1 or 2 full quartets wins.",
      },
    ],
    materials: [
      "What's That Sound card deck (objects with a ticked sound on each)",
    ],
    debriefPrompts: [
      {
        questions: [
          "What were some sounds that were difficult to make?",
          "Are there different ways to make the sound for a specific prompt?",
          "Was any prompt confusing?",
          "Is there any room for improvement?",
        ],
      },
    ],
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
      { level: "Hard", description: "Also use tone prompts to write the script and to perform." },
    ],
    debriefPrompts: [
      {
        questions: [
          "After the narration, players can reflect on how well they matched the tone in both their word choices and their storytelling style.",
          "Tone Awareness:",
          "Did the chosen words match the assigned tone (e.g. silly, spooky)?",
          "How did sticking to the tone make the story more engaging or challenging?",
          "Creativity and Word Choice:",
          "What was your favourite word or phrase that you added?",
          "Did thinking about the tone make you more creative with your word selection?",
          "Storytelling and Expression:",
          "How did using the tone while speaking bring the story to life?",
          "What did you enjoy most about performing your story in the assigned tone?",
          "Listening and Connection:",
          "What was your favourite story or performance by another player?",
          "How did their tone and word choice make the story memorable?",
          "Takeaway Skills:",
          "How can using tones and expressive words help in real-life situations, like storytelling or presentations?",
          "What would you do differently next time to make your story even better?",
        ],
      },
    ],
    type: "physical-game",
  },
  "tale-trail": {
    id: "tale-trail",
    segment: "playground",
    title: "tale trail",
    setupLine:
      "Shuffle Story Cards and place face-up in 4 piles (character, object, event, emotion). Pick one card from any pile. Children place it on the story mat and each child continues the story line through the cards they pick and place.",
    howToPlay:
      "First child places their card and begins the story. The next child picks a card from any pile, places it on the Story Mat, and continues the story line from where the previous child left off. The tale builds card by card around the circle. The child placing the last card ends the story, or the teacher ends it. At the end, the children give their story a title.",
    variations: [
      {
        name: "Transition cards",
        description:
          "Use transition cards alongside the story cards — when a child places one, they use the word or phrase on it to link their line to the previous one (e.g. \"meanwhile…,\" \"suddenly,\" \"later that day\"). One child narrates the full story at the end.",
      },
      {
        name: "Theme dice",
        description:
          "The teacher rolls the theme dice to set the theme for the story. All children keep their contributions inside that theme. One child narrates the full story at the end.",
      },
      {
        name: "Re-arrange the story",
        description:
          "After the first telling, the teacher places the beginning / middle / end arrow cards over the row and interchanges them — the group has to re-tell the story in the new order using the same cards. One child narrates the rearranged story at the end.",
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
      { level: "Hard", description: "Use the theme dice — teacher rolls and all children keep their contributions inside the rolled theme." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Highlight key events that changed the story.",
          "Ask players to consider how the story or ending could be different.",
          "Reflect on moments when they couldn't think of an idea or connect to the previous card.",
          "Discuss what helped them generate ideas.",
          "Highlight skills displayed by each player.",
        ],
      },
    ],
    type: "physical-game",
  },
  shuffle: {
    id: "shuffle",
    segment: "playground",
    title: "shuffle",
    setupLine:
      "Divide into Performing Team and Questioning Team. Performing team gets cards, creates a story, and performs. Questioning team asks using their Question Bands.",
    howToPlay:
      "Divide into Performing Team and Questioning Team. The Performing Team draws one story — 6 cards — and lays them face-up in the story's printed order. They have preparation time to create and prepare their performance. Perform within set time. Questioning team asks questions using Question Bands — at least one Why and one How — and the Performing Team answers. One player summarises in 2–3 sentences. Roles rotate.",
    materials: [
      "Story Combination Cards — 10 stories × 6 cards = 60 A5 cards",
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
      "Story 4 — The Emperor's New Clothes (Hans Christian Andersen)",
      "Story 5 — The Ant and the Grasshopper (Aesop)",
      "Story 6 — The Crow and the Pitcher (Aesop)",
      "Story 7 — The Ugly Duckling (Hans Christian Andersen)",
      "Story 8 — Androcles and the Lion (Aesop)",
      "Story 9 — The Wind and the Sun (Aesop)",
      "Story 10 — The Brahmin's Pot of Dreams (Panchatantra)",
    ],
    debriefPrompts: [
      {
        questions: [
          "Conduct a discussion around the importance of understanding story structure and sequencing.",
          "Emphasise how different interpretations can lead to unique storytelling.",
          "Ask story-specific questions to gauge their understanding of the story.",
          "Discuss how to give structure to a story.",
        ],
      },
    ],
    type: "physical-game",
  },
  spaggle: {
    id: "spaggle",
    segment: "playground",
    title: "spaggle",
    setupLine:
      "Each player receives a topic card. Assemble your Speech Puzzle Board — Topic, Opening, Argument, Evidence, Conclusion — using your cards. Then deliver your speech in the order of the cards on the board.",
    howToPlay:
      "Each player notes their topic from the digital topic deck on their topic card. Children pick any 5 puzzle cards from the shuffled deck placed face down by the teacher. Teacher gives out any 2 action cards to each player. On each turn, a child places one puzzle card on the Puzzle Board following the order (Topic, Opening, Argument, Evidence, Conclusion). During play, players use the action cards given to Swap / Steal / Stop and fill the puzzle board with cards. After all puzzle cards are placed, the child delivers their speech using the cards placed on the board. One token is awarded for each puzzle card successfully used in a sentence.",
    variations: [
      {
        name: "Variation — Ability lanyard",
        description:
          "Teacher assigns a lanyard of a specific ability to the player, which the child focuses on while delivering their speech. The child earns bonus tokens for correctly using the assigned ability.",
      },
    ],
    materials: [
      "Speech Puzzle Board (1 per child)",
      "Topic Cards",
      "Speech Puzzle Cards",
      "Action Cards (Swap / Steal / Stop)",
      "Player Tokens and Tracker",
      "Digital prompts — https://wordwall.net/resource/84114197",
      "Digital prompts — https://wordwall.net/resource/84261693",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Educator helps the child deliver their speech." },
      { level: "Medium", description: "Child delivers independently — standard gameplay." },
      { level: "Hard", description: "Conclusion must connect back to the opening." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Challenge Spotlight (3 minutes):",
          "Each player shares one challenge they faced during the game. Example: \"It was hard to think quickly when my card was swapped.\"",
          "Encourage quick follow-up questions or ideas from others: \"How did you handle it?\" · \"What could you try next time?\"",
          "Champion Recognition (5 minutes):",
          "Players take turns nominating someone as a \"Champion\" for something they did well. Example: \"I nominate Mia for her creative argument about space travel!\"",
          "New Challenge Goal (2 minutes):",
          "End by setting a group challenge for the next session, such as: \"Let's focus on making our openings more exciting next time!\"",
          "Rotate who suggests the group challenge to keep it fresh.",
        ],
      },
    ],
    type: "physical-game",
  },
  "pitch-perfect": {
    id: "pitch-perfect",
    segment: "playground",
    title: "pitch perfect",
    setupLine:
      "Investors draw a Problem Card. Teams select a Solution Card from their hand that best matches the problem and prepare their pitch. Investors evaluate and award tokens based on structure and how convincing the pitch is.",
    howToPlay:
      "Choose one pair to start as the Investors. This role rotates every round. Form teams of 2–3 children. Investors draw a Problem Card that presents a problem. Each team receives 3 Solution Cards. Teams select 1 Solution Card from their hand that they feel best matches the Problem Card, and prepare their pitch. Each team pitches to the Investors. The Investors are allowed to ask questions. The Investors evaluate and award tokens to each team based on the structure of the pitch and how convincing it was.",
    materials: [
      "Problem Cards",
      "Solution Cards",
      "Investor tokens",
      "Twist cards",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Twist card not used." },
      { level: "Medium", description: "Twist card optional." },
      { level: "Hard", description: "Use a Twist card — teams must balance completing the twist with creating a pitch that appeals to the Investors." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Start a \"reflection chain\" where each player completes one of the following sentences:",
          "\"I learned that good pitches need…\"",
          "\"Next time, I'll try to…\"",
          "\"What I enjoyed most was…\"",
          "Example: \"I learned that good pitches need a clear idea.\" or \"Next time, I'll try to use more gestures when presenting.\"",
        ],
      },
    ],
    type: "physical-game",
  },
  "speech-a-palooza": {
    id: "speech-a-palooza",
    segment: "playground",
    title: "speech-a-palooza",
    setupLine:
      "Each player rolls the dice, moves their meeple, and follows the action on the block they land on. Complete a challenge or fortune or simple action to earn tokens.",
    howToPlay:
      "Each player is given a meeple and a set amount of tokens. Each player rolls the dice, moves, and follows the action on the block they land on. The player draws a level-based challenge card or a fortune card, or does the simple action mentioned on the block. Completing the challenge or action earns the player tokens.",
    materials: [
      "Board",
      "Meeples (one per player)",
      "Dice",
      "Level-based Challenge cards (easy / medium / hard)",
      "Fortune cards",
      "Tokens",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Easy challenge cards." },
      { level: "Medium", description: "Medium challenge cards." },
      { level: "Hard", description: "Difficult challenge cards." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Conduct a discussion around all the challenges that were completed during the game.",
          "Ask students what tasks they found fun, weird, or particularly challenging.",
          "Ask how they overcame the challenging tasks.",
          "What did they think were the most fun moments of the game?",
          "Bring out the various skills of public speaking that were showcased.",
          "Suggest areas for improvement and highlight notable performances.",
          "The players can collect their challenge cards that can also be used in the debrief.",
        ],
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
      "Pieces start at the bottom of the gameboard. The time board at the side maps speaking time to steps — e.g. 15 seconds = 1 step, 30s = 2, 45s = 3, 60s = 4, and so on. Players can see the board so they can plan how long they want to keep speaking. Teacher reads out a prompt from the digital deck in the app. Player starts speaking on that prompt. The timer runs. Hesitation, repetition, or going off-topic stops the timer — the piece moves by the number of steps the time board allows for that clock reading. Landing on a Slippery Step moves the piece back. Landing on a Risk Step: player attempts a Risk Card challenge — completing it earns a Reward Card. First individual / team to the top of the board wins.",
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
    ],
    materials: [
      "Gameboard",
      "Time board (speaking-time to steps reference)",
      "Player pieces",
      "Risk Cards",
      "Reward Cards",
      "Digital prompts — https://wordwall.net/resource/84114197",
      "Digital prompts — https://wordwall.net/resource/84261693",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Timer visible to the speaker." },
      { level: "Medium", description: "Timer not visible to the speaker." },
      { level: "Hard", description: "Use of 3-word incorporation — the opposing player gives the speaker 3 words to incorporate into their speech before the turn begins." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Most Fun Moments:",
          "What was the most enjoyable part of the game for you?",
          "Which Risk or Reward card made you laugh or feel excited?",
          "Challenges Faced:",
          "What was the hardest part of the game (e.g. speaking on time, Risk cards)?",
          "How did you overcome it, or what would you do differently next time?",
          "Teamwork Reflection:",
          "How well did your team work together?",
          "What could you or your teammates improve for better collaboration?",
          "Learnings from Speaking:",
          "What did you learn about speaking (e.g. staying on topic, avoiding hesitation)?",
          "How did you feel while speaking — nervous, excited, or confident?",
          "Celebrate Success:",
          "What are you most proud of from the game today?",
        ],
      },
    ],
    type: "physical-game",
  },
  "train-of-thoughts": {
    id: "train-of-thoughts",
    segment: "playground",
    title: "train of thoughts",
    setupLine:
      "Three coloured card decks are in the centre. On your turn, draw one card from each deck and complete the speaking tasks one after another.",
    howToPlay:
      "Three coloured card decks are placed in the centre — each colour is a different type of speaking task. On their turn, a child draws one card and completes the speaking task, laying the completed card face-up in front of them. This line of completed cards is their train. The child wins by making a set of 3 cards of each colour — a total of 9 cards. At 8–12, no notes are permitted at any difficulty level.",
    variations: [
      {
        name: "Longest train",
        description: "At the end of the session, the child with the longest train — most cards completed in sequence — wins.",
      },
    ],
    materials: [
      "Coloured Question Cards — with 6 compartments (Package, Suitcase, Food, Beverage, Pet, Passenger)",
      "Wild cards and action cards",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Set of same colour only — no use of action cards." },
      { level: "Medium", description: "Use action cards." },
      { level: "Hard", description: "Use action cards + all cards in a set must belong to the same compartment and be of the same colour." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Highlight some of the interesting answers shared during the game.",
          "Ask if they found any questions particularly challenging — and how they tackled answering those questions.",
          "Applaud any unique answers or interpretations of questions.",
          "Explain why listening to questions and answering them effectively is an important skill in any conversation.",
        ],
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
      "One child holds a card to their forehead without looking at it. The group acts out what is on the card. The child guesses what is on the card based on the group's enactment.",
    variations: [
      {
        name: "Body and face only",
        description: "No sounds, no words.",
      },
      {
        name: "Body, face, and sounds",
        description: "Group can add sounds but not say the word.",
      },
    ],
    materials: [
      "Guess Me Cards",
      "Timer (optional)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Standard gameplay with no time limit." },
      { level: "Medium", description: "Standard gameplay within set time." },
      { level: "Hard", description: "With time limit — player asked to make sentences after guessing." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Ask players which cards were their favourite — and if any were particularly easy or difficult.",
          "Reflect on the cards that were enacted or described — understand whether there is room for improvement.",
          "Highlight the performance of various players.",
          "Suggest some alternative actions that they can try next time.",
        ],
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
    materials: ["Simple chits (for imposter variation — two types: Rule and Imposter)"],
    difficultyLevels: [
      { level: "Easy", description: "Unlimited rounds — questioner can ask as many rounds as they need to identify the rule." },
      { level: "Medium", description: "Limited rounds — questioner has a set number of rounds to identify the rule." },
      { level: "Hard", description: "Imposter variation — one group member secretly has a different hidden rule. Questioner must identify both the group's rule and the imposter." },
    ],
    promptHeading: "reference prompts — hidden rules the group can agree on",
    prompts: [
      "Use a colour word in every answer.",
      "Include a number in every answer.",
      "Start every answer with \"I think.\"",
      "End every answer with the same word.",
      "Speak only in questions.",
      "Give opposite answers.",
      "Use only 3 words per answer.",
      "Add an animal name in every answer.",
      "Never use the word \"I.\"",
      "Always say \"yes\" before answering.",
      "Include a food item in every answer.",
      "Act and speak — add one action before answering.",
      "Give only very short answers.",
      "Give only long or detailed answers.",
      "Stretch one word in every answer.",
      "Smile while answering.",
      "Speak like a robot.",
      "Speak in a whisper.",
      "Answer like a baby.",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "improv-survival": {
    id: "improv-survival",
    segment: "playground",
    title: "improv survival",
    setupLine:
      "Two performers, four quadrant zones, each with a different challenge. Perform a scene. The audience can move you between zones.",
    howToPlay:
      "Set up four quadrant mats, each with a slate showing a different challenge (e.g. speak only in questions, whisper, no hand gestures, rhyme every sentence). Two performers start a scene in one quadrant. Audience members hold Number Cards corresponding to quadrants. At any point, an audience member raises their card to move a performer to that quadrant — the performer must immediately switch to that quadrant's challenge while staying in character. Each performer has one Block Token to reject a move. Penalty Tokens for breaking a quadrant rule. Scene runs for a set time. Post-scene: audience names the smoothest transition.",
    variations: [
      {
        name: "Variation 2",
        description:
          "Performers must rotate through all 4 quadrants during a single performance while still keeping the scene flowing.",
      },
    ],
    materials: [
      "Quadrant Mats (4)",
      "Slates with stands (4)",
      "Scenario prompts",
      "Improv Survival Topics — https://docs.google.com/presentation/d/1TWcBf9YU3XrrPi5YrBoRvi94AZMS-sZTGxs5PoPbD1M/preview?usp=sharing",
      "Number Cards (1 per audience member)",
      "Block Tokens (1 per performer)",
      "Penalty Tokens",
      "Script Book",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Refer Script Book — performers refer to the script book while performing." },
      { level: "Medium", description: "Normal gameplay without the script book." },
      { level: "Hard", description: "Without the Script Book and Variation 2 — performers rotate through all 4 quadrants without the script book." },
    ],
    promptHeading: "reference quadrant prompts — one per quadrant mat",
    prompts: [
      "Slow Motion",
      "Underwater",
      "Whisper",
      "Scream",
      "Happy",
      "Sad",
      "Angry",
      "Surprised",
      "Scared",
      "Speak Fast",
      "American Accent",
      "Indian Accent",
      "Excited",
      "Silly",
      "Sleepy",
      "Windy",
      "Speak in \"n\" word sentences",
      "Sing your lines",
      "Speak in questions",
      "Curious",
      "Bored",
      "Anxious",
      "Disgusted",
      "Sarcastic",
      "Loving",
    ],
    debriefPrompts: [
      {
        questions: [
          "Fun and Engagement:",
          "What was the most fun or surprising part of the game for you?",
          "Did any audience-directed movements or scenarios make you laugh or think creatively?",
          "Challenges and Adaptation:",
          "Which quadrant was the hardest to adapt to (Emotion, Accent, or Setting)? Why?",
          "How did you manage to stay in character during difficult moments?",
          "Teamwork:",
          "How did you and your partner support each other during the performance?",
          "What strategies helped your team maintain the flow of the improv?",
          "Learning Takeaways:",
          "What did you learn about communication or adaptability from this game?",
          "How can these skills help in real-life situations, like teamwork or public speaking?",
          "Audience Insights:",
          "For the audience: what was the most impressive performance or adaptation you observed?",
          "How did it feel to participate in directing the performers?",
          "NOTE: Encourage students to retry performing in specific quadrants they struggled with, and encourage peers to help them through active feedback and demonstrations.",
        ],
      },
    ],
    type: "physical-game",
  },
  "reverse-gear": {
    id: "reverse-gear",
    segment: "playground",
    title: "reverse gear",
    setupLine:
      "Teacher gives a sentence prompt. A child starts speaking. Another player can call \"reverse gear\" on any word — the speaker then has to say the opposite of what was originally said.",
    howToPlay:
      "Teacher gives a sentence prompt to speak. A child starts speaking. Another player can choose to call \"reverse gear\" on a specific word in between. The child then has to say the opposite of what was originally said, or change the original word to a different word, continuing from that point. For example, a player says \"I love eating mangoes.\" Another child calls \"reverse gear on I.\" The player repeats the sentence — \"You love eating mangoes.\"",
    materials: ["Reverse Gear prompt deck (app)"],
    difficultyLevels: [
      {
        level: "Easy",
        description:
          "One reverse gear, one sentence — the reverse gear call can only be made once and only within one sentence.",
      },
      {
        level: "Medium",
        description:
          "Reverse gear can be called up to 2 times within a sentence.",
      },
      {
        level: "Hard",
        description:
          "After the player says the reversed sentence, they add 2–3 lines of their own, continuing that sentence.",
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
    debriefPrompts: [],
    type: "facilitated",
  },
};

const showtimeActivities: Record<string, CurriculumActivity> = {
  "debate-duel": {
    id: "debate-duel",
    segment: "showtime",
    title: "debate duel",
    setupLine:
      "Two debaters, one topic. One argues For, one argues Against. Each draws a Challenge Card — a constraint they must handle during their debate.",
    howToPlay:
      "Arrange in a circle and select a moderator. Moderator draws a Topic Card and selects the topic. Moderator selects two debaters. Debaters draw For/Against chits. Each debater draws a Challenge Card that introduces a constraint they must incorporate. 1 minute of preparation. For and Against speak in turn, within set time. Non-debating players ask questions. Losing debater gets a Strike Card. Two Strikes = become moderator. Last debater standing wins.",
    materials: [
      "Debate Duel Topic Cards (B1 + B2)",
      "Challenge Cards",
      "Moderator Card",
      "Strike Cards (10)",
      "For & Against Cards (2)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "B1 topics, 1-min prep, Challenge Cards optional." },
      { level: "Medium", description: "B1, Challenge Cards required." },
      { level: "Hard", description: "B2, Challenge Cards required." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Who did you think handled their challenge card well? Why?",
          "What clues can we find that show someone was confident?",
          "Did anyone hear a speaker who used great body language?",
          "Did someone answer a tough question well?",
        ],
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
    debriefPrompts: [],
    type: "facilitated",
  },
  "magic-box": {
    id: "magic-box",
    segment: "showtime",
    title: "magic box narratives",
    setupLine:
      "Reach in without looking. Whatever you pull out \u2014 build a story around it. Named character, a problem connected to the object, a surprising ending. Two minutes to think.",
    howToPlay:
      "Each child reaches into the Magic Box without looking and draws one object. Children build a story around the drawn object — beginning, middle, end. Named character, problem connected to object, surprising ending required.",
    materials: [
      "Magic Box (decorated)",
      "30 small objects \u2014 10 animals, 10 vehicles, 10 everyday objects",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher provides a sentence frame: \"One day, [object] was...\"" },
      { level: "Medium", description: "No frame, child begins independently." },
      { level: "Hard", description: "Child draws two objects — both must appear at named points in the story." },
    ],
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
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
    debriefPrompts: [],
    type: "facilitated",
  },
  "superhero-sales": {
    id: "superhero-sales",
    segment: "showtime",
    title: "superhero sales pitch",
    setupLine:
      "You have a superpower. Sell it to the group. Tell us what it is, why it is the best, and answer two challenge questions.",
    howToPlay:
      "The child is given a superpower prompt from the app by the teacher. 30 seconds to prepare. Child pitches their superpower to the class — what it is, why it is the best, how it would be used. The group votes — useful or useless. Child responds to two challenge questions from the group.",
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
    debriefPrompts: [],
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
