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
      "I'll say one sentence ending in a bold starter word. The next child begins their sentence with that word. Chain continues around the circle.",
    howToPlay:
      "Sit in a circle. Teacher reads one opening sentence — the last word is a bold starter word the next child must open with. The chain continues around the circle. If a child cannot continue within 5 seconds, they say \"pass\" and the next child continues.",
    example:
      "Teacher — \"I saw a puppy near my building gate.\" Child 1 — \"Gate was closed when I tried to open it.\" Child 2 — \"It took me a minute to figure out why.\"",
    materials: ["Opening-sentence prompt deck"],
    promptHeading: "prompts — last word is the starter for the next child",
    prompts: [
      "I saw a puppy near my building gate  →  starter: gate",
      "We went to the park in the evening  →  starter: evening",
      "My friend was feeling very happy  →  starter: happy",
      "I ran home because it started to rain  →  starter: rain",
      "My mother called me in the morning  →  starter: morning",
      "We stopped playing because it got dark  →  starter: dark",
      "I felt hungry after coming from school  →  starter: school",
      "My father came home very late  →  starter: late",
      "We were excited because it was a holiday  →  starter: holiday",
      "I laughed because my friend was funny  →  starter: funny",
      "We sat quietly because the teacher was angry  →  starter: angry",
      "I woke up early on a Sunday  →  starter: Sunday",
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
      { level: "Easy", description: "Solo / partner action on the card — child forms the object using the solo or partner action printed on the card." },
      { level: "Medium", description: "Additional group or pair tasks — extra prompts layered on top of the base formation (e.g. \"chimney appears,\" \"two arches meet,\" \"flying in formation\")." },
      { level: "Hard", description: "Find your pair — cards come in matching pairs (table + chair, bowl + spoon). Each child draws one card without showing others; on the signal, everyone forms their object with their body and finds their matching pair. First pair to lock in wins." },
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
      "Before you throw the ball, call a volume. The catcher has to say any word at exactly that volume.",
    howToPlay:
      "Children stand or sit in a circle. Before throwing a soft ball, the thrower calls one of three volume levels. The catcher must say any word at exactly that volume before throwing to someone new and calling a different level. Three volume levels: Loud — full voice, fill the room · Medium — normal conversation voice · Whisper — barely audible, lean in to hear.",
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
        name: "Walk toward each other",
        description:
          "Two children who lock eyes walk toward each other — eyes must stay on each other for the entire walk.",
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
      "Children take turns. One child picks a card from the deck without showing it. On the card is a ticked object — a bell, a door, a cat, a kettle, a clap, a drum. The child makes the sound of that object using only their voice and body. The other children listen and guess. First correct guess picks the next card. To extend the game — children play to complete a set of sounds by asking their friends for the set card and making that sound in order to get that card. For example, if a child gets a card with 4 animal images and one ticked (like a dog), the child has to find the other 3 cards with the other animals ticked — a ticked cat, a ticked cow, and so on. The child asks friends for those cards and gets them only after making the matching sound.",
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
      "Each child receives a laminated Script Flip card and an erasable marker. They fill in the story template blanks. When all blanks are filled, each child narrates their completed script. For children who cannot yet write, the teacher scribes — child says the word aloud, teacher writes it in, then child narrates.",
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
      { level: "Easy", description: "Educator provides an opening sentence." },
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
      "Divide children into a Performing Team and a Questioning Team. The Performing Team draws one story — 6 cards — and lays them face-up in the story's printed order. They have preparation time to build a story using the cards in that order. They perform — roleplay and narration — within set time. Questioning team asks questions using their Question Bands, and the Performing Team answers. One player summarises in 2–3 sentences. Roles rotate.",
    materials: [
      "Story Combination Cards — 10 stories × 6 cards = 60 A5 cards total (laminated, matte, openhouse green stripe)",
      "Question Bands (Who, What, When, Where, Why, How)",
      "Timer",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Untimed — the Performing Team takes as long as they need to prepare." },
      { level: "Medium", description: "Timed challenge — preparation time is limited (e.g. 5 minutes on the clock)." },
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
  "body-talk": {
    id: "body-talk",
    segment: "playground",
    title: "body talk",
    setupLine:
      "Children complete a set — 4 expressions and 4 gestures — by drawing cards and performing each one in a sentence.",
    howToPlay:
      "Each child draws a card from the expression / gesture deck. The child then chooses to keep or discard the card — if they keep it, they incorporate that expression or gesture into a sentence they speak; if not, they discard it and wait for their next turn. The group watches and calls out the feeling or meaning they see. The round continues until every child has completed their set — 4 expressions and 4 gestures each.",
    variations: [
      {
        name: "Individual play",
        description:
          "Each child completes their own set of 4 expressions + 4 gestures on their own turns.",
      },
      {
        name: "Team play",
        description:
          "Children play in teams. For each card, every member of the team says a different line using that same gesture or expression — a group performance of the same feeling.",
      },
    ],
    materials: ["Body Talk expression and gesture card deck"],
    difficultyLevels: [
      { level: "Easy", description: "Child says 1 sentence using the expression or gesture on the card." },
      { level: "Medium", description: "Child says 3–4 sentences using the expression or gesture on the card." },
      { level: "Hard", description: "The other group or person changes the topic mid-sentence and the player speaks accordingly — incorporating the new topic into the same gesture or expression." },
    ],
    debriefPrompts: [
      {
        questions: [
          "What were some faces that were difficult to make?",
          "Highlight if there is any room for improvement.",
          "Suggest some emotions and ask the children to make expressions that reflect that emotion.",
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
      "Pieces start at the bottom of the gameboard. The time board at the side maps speaking time to steps — e.g. 15 seconds = 1 step, 30s = 2, 45s = 3, 60s = 4, and so on. Players can see the board so they can plan how long they want to keep speaking. On their turn, an individual / team rolls the dice and moves. Teacher reads out a prompt from the digital deck in the app. Player starts speaking on that prompt. The timer runs. Hesitation, repetition, or going off-topic stops the timer — the piece moves by the number of steps the time board allows for that clock reading. Landing on a Slippery Step moves the piece back. Landing on a Risk Step: player attempts a Risk Card challenge — completing it earns a Reward Card. First individual / team to the top of the board wins.",
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
      "Digital prompts — https://wordwall.net/resource/84074464",
      "Digital prompts — https://wordwall.net/resource/84114001",
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
      "Three coloured card decks are placed in the centre — each colour is a different type of speaking task. On their turn, a child draws one card and completes the speaking task, laying the completed card face-up in front of them. This line of completed cards is their train. The child wins by making a set of 3 cards of each colour — a total of 9 cards. Action cards may be used during play depending on the difficulty level.",
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
      {
        name: "Yes/No questions",
        description: "Child asks yes/no questions to guide themselves to the answer. Hardest: child uses the guessed word in a sentence that shows they understand what it means.",
      },
    ],
    materials: ["Guess Me Cards"],
    difficultyLevels: [
      { level: "Easy", description: "Simple concrete cards, no time limit." },
      { level: "Medium", description: "30-second limit per card, standard variation." },
      { level: "Hard", description: "Variation 3, child uses the word in a meaningful sentence." },
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
      "Questioner steps outside or turns away. Group secretly agrees on a hidden rule governing all their answers — for example, everyone ends every answer with the same word, or everyone answers as if they are the person sitting to their left. Questioner returns and asks each player a question in turn. After one full round, questioner states their theory. Group responds: Warm (close) or Cold (not close). Game ends when the questioner correctly identifies the rule.",
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
  "reverse-gear": {
    id: "reverse-gear",
    segment: "playground",
    title: "reverse gear",
    setupLine:
      "Teacher gives a sentence prompt. A child starts speaking. Another player can call \"reverse gear\" on any word — the speaker then has to say the opposite of what was originally said.",
    howToPlay:
      "Teacher gives a sentence prompt to speak. A child starts speaking. Another player can choose to call \"reverse gear\" on a specific word in between. The child then has to say the opposite of what was originally said, continuing from that point.",
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
          "Continue and add a new sentence relating to the reversed sentence. The child can also choose to call reverse gear one more time in the newly added sentences.",
      },
    ],
    promptHeading: "prompts — statements to reverse",
    prompts: [
      "I always like playing in the park.",
      "We usually eat dinner together at home.",
      "My friend often plays cricket after school.",
      "My mother always wakes up early.",
      "My father sometimes watches TV at night.",
      "My grandmother usually tells stories before bed.",
      "My uncle often travels by car.",
      "I usually choose chocolate ice cream.",
      "We often play games in the evening.",
      "My friend usually sits quietly in class.",
      "My mother cooks food at home every day.",
      "I always finish my homework quickly.",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
};

const showtimeActivities: Record<string, CurriculumActivity> = {
  "whacky-news": {
    id: "whacky-news",
    segment: "showtime",
    title: "whacky news reporter",
    setupLine:
      "You are a news reporter. You have just heard something extraordinary. Tell the class what happened — beginning, middle, and end. After you finish, everyone asks you one question.",
    howToPlay:
      "Teacher reads out a prompt from the app. The child prepares for a set time. Child delivers their report standing in front of the class — a clear opening (who they are and what happened), a middle (details), and a closing (what happens next). After the report, each child asks the reporter one question. The reporter answers each in one sentence. New child takes the next prompt.",
    materials: ["App for prompt cards (digital)"],
    difficultyLevels: [
      { level: "Easy", description: "Teacher helps with points to speak." },
      { level: "Medium", description: "Limited preparation time." },
      { level: "Hard", description: "No preparation time." },
    ],
    promptHeading: "prompts — whacky news headlines",
    prompts: [
      "Toys come alive at night.",
      "Giant balloon flies away.",
      "Dinosaur found in park.",
      "Chocolate river starts flowing.",
      "Kids declare no homework.",
      "Dog becomes school principal.",
      "Ice cream falls from sky.",
      "Cat wins running race.",
      "Monkey steals lunch box.",
      "Robot joins classroom today.",
      "Teacher turns superhero during class time.",
      "Rain turns into sticky jelly drops.",
      "Kids build huge fort inside classroom.",
      "Talking parrot gives morning announcements.",
    ],
    debriefPrompts: [
      {
        questions: [
          "Conclude with a discussion on how each part of the news report helps communicate the story effectively.",
          "Praise creative thinking, clear structure, and the ability to stay on-topic.",
        ],
      },
    ],
    type: "physical-game",
  },
  "mad-ad": {
    id: "mad-ad",
    segment: "showtime",
    title: "mad ad",
    setupLine:
      "You are selling something. Make it sound like the most amazing thing in the world. Hook → product name → one reason → the big ask.",
    howToPlay:
      "One child receives today's topic from the app. They invent a product connected to that topic. The child prepares for a set time and speaks — delivering a pitch in front of the class. The class decides: buying or not buying the product, after asking questions about the product. Performer answers in character. Ad structure: Hook — start with a question or surprise · Product name · One amazing reason to buy it · The big ask: \"So what are you waiting for? Get yours today!\"",
    materials: [
      "Topic prompts — https://wordwall.net/resource/77103607",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher helps with the opening sentence and structure." },
      { level: "Medium", description: "Standard gameplay — limited preparation time, child structures independently." },
      { level: "Hard", description: "No preparation time given — child must include at least two deliberate changes of volume or energy." },
    ],
    debriefPrompts: [
      {
        questions: [
          "Ask the players what they learnt while presenting the product.",
          "Conclude with a discussion on how the activity helped with communication and effective speech delivery.",
          "Praise creative thinking, clear structure, and the ability to stay on-topic.",
        ],
      },
    ],
    type: "facilitated",
  },
  "experience-share": {
    id: "experience-share",
    segment: "showtime",
    title: "experience share circle",
    setupLine:
      "Share one experience connected to today's theme — tell us where you were, what happened, and how it ended. After each person shares, two people ask one real question.",
    howToPlay:
      "Teacher gives today's theme from the prompt bank. Each child takes 30 seconds to think. Children share in turn — beginning (when and where), main event (what happened), conclusion (how it ended or what it meant). After each child shares, two peers each ask one genuine question connected to what was actually said.",
    materials: ["App for theme prompts"],
    difficultyLevels: [
      { level: "Easy", description: "Familiar themes, teacher models with their own experience first." },
      { level: "Medium", description: "Standard themes, no model." },
      { level: "Hard", description: "Abstract or challenging themes, no preparation time." },
    ],
    promptHeading: "prompts — themes to share about",
    prompts: [
      "A time I lost something at home.",
      "A time I met a new friend.",
      "A day I went to a birthday party.",
      "A time I got hurt while playing.",
      "A time I helped someone at home.",
      "A day I travelled with my family.",
      "A time I forgot something important.",
      "A time I shared my toys.",
      "A day I stayed at home all day.",
      "A time I saw something new outside.",
      "A time I felt very excited.",
      "A time I had to wait for something.",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "magic-box": {
    id: "magic-box",
    segment: "showtime",
    title: "magic box narratives",
    setupLine:
      "Reach in without looking. Whatever you pull out — build a story around it. Beginning, middle, end. One minute to think.",
    howToPlay:
      "Each child reaches into the Magic Box without looking and draws one object. Children build a story around the drawn object — beginning, middle, end.",
    materials: [
      "Magic Box (decorated)",
      "30 small objects — 10 animals, 10 vehicles, 10 everyday objects",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Teacher provides a sentence frame: \"One day, [object] was...\"" },
      { level: "Medium", description: "No frame, child begins independently." },
      { level: "Hard", description: "Child draws two objects — both must appear at named points in the story." },
    ],
    debriefPrompts: [],
    type: "physical-game",
  },
  "story-spine": {
    id: "story-spine",
    segment: "showtime",
    title: "story spine",
    setupLine:
      "Create and perform a short story together using five simple prompts — a character, a setting, a problem, an action, and an ending.",
    howToPlay:
      "Children form groups of 3–4. Each group receives the prompt sheet with five anchor categories: Character (who is this story about? — robot, rabbit, child, pirate, monster), Setting (where is the story happening? — forest, space, school, home, ocean), Problem (oh no — what goes wrong? — gets lost, something breaks, chased, can't find something), Action (what do they try? — hide, build, run, fix, ask for help), and Ending (what happens in the end? — escapes, finds it, fixes it, wins, becomes safe). Each group picks one word from each category, builds a short story using all five, and performs it to the rest of the class. Writing is optional — speaking and acting is key. Teacher chooses exactly one challenge for the round (see challenges below).",
    materials: [
      "Story Spine prompt sheet — 5 anchor categories (character · setting · problem · action · ending) with example words under each",
    ],
    difficultyLevels: [
      { level: "Easy · Add an Emotion", description: "Children must show a feeling in the story — happy, scared, angry, or excited." },
      { level: "Medium · Add an Opponent", description: "Add someone or something that creates difficulty — a villain, animal, obstacle, or other person." },
      { level: "Hard · Add a Plot Twist", description: "Something unexpected happens — it fails again, someone changes, or a new problem appears." },
    ],
    promptHeading: "prompt sheet — 5 anchor categories · pick one word from each",
    prompts: [
      "Character — who is this story about? · robot · rabbit · child · pirate · monster",
      "Setting — where is the story happening? · forest · space · school · home · ocean",
      "Problem — oh no, what goes wrong? · gets lost · something breaks · chased · can't find something",
      "Action — what do they try? · hide · build · run · fix · ask for help",
      "Ending — what happens in the end? · escapes · finds it · fixes it · wins · becomes safe",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "superhero-sales": {
    id: "superhero-sales",
    segment: "showtime",
    title: "superhero sales pitch",
    setupLine:
      "You have a superpower. Sell it to the group. Tell us what it is, why it is the best, and answer one challenge question.",
    howToPlay:
      "The child is given a superpower prompt from the app by the teacher. 30 seconds to prepare. Child pitches their superpower to the class. The group votes — useful or useless. Child responds to one challenge question from the group.",
    materials: ["App for superpower prompts"],
    difficultyLevels: [
      { level: "Easy", description: "1 minute prep, teacher provides the opening: \"My superpower is...\"" },
      { level: "Medium", description: "30 seconds prep, child structures independently." },
      { level: "Hard", description: "No prep, child must handle at least two challenge questions from the group." },
    ],
    promptHeading: "prompts — superpowers to pitch",
    prompts: [
      "A superhero who can fly anywhere.",
      "A superhero who can talk to animals.",
      "A superhero who can run very fast.",
      "A superhero who can become invisible.",
      "A superhero who can clean anything instantly.",
      "A superhero who can fix broken toys.",
      "A superhero who can find lost things.",
      "A superhero who can make food quickly.",
      "A superhero who can control rain.",
      "A superhero who can carry heavy things.",
      "A superhero who can light up dark places.",
      "A superhero who can build things quickly.",
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
};

const signOffActivities: Record<string, CurriculumActivity> = {
  "tell-the-story": {
    id: "tell-the-story",
    segment: "sign-off",
    title: "tell the story",
    setupLine:
      "Think of a story connected to today's topic — real or made-up. Use your card to help you tell it well.",
    howToPlay:
      "Scaffold card: Start — set the scene. Who? Where? When? · Then — what happened? Slow down at the exciting moment. · End — how did it end? How did it feel? Children pair up, prepare for 2 minutes, then speak for 10 minutes in pairs. 2–3 volunteers share with the group.",
    materials: ["Sign-Off Scaffold Cards — Tell the Story (A6, laminated)"],
    difficultyLevels: [
      { level: "Easy", description: "Child tells a beginning and an ending, 2 sentences minimum, uses a time word to start." },
      { level: "Medium", description: "Full story using all three scaffold steps, at least 5 sentences, uses one connecting word." },
      { level: "Hard", description: "Full story with one specific detail that makes it feel real, voice changes at the most exciting moment, ends with what it meant." },
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "step-inside": {
    id: "step-inside",
    segment: "sign-off",
    title: "step inside",
    setupLine:
      "Step into a character connected to today's topic. Decide who you are, where you are, and what you want. Play out a short scene with your partner.",
    howToPlay:
      "Scaffold card: Who am I? — name your character, how do they speak, how do they move · Where am I? — say the setting in one sentence · What do I want? — your character has one goal · What gets in the way? — something happens, how does it end? Children pair up and play out scenes.",
    materials: ["Sign-Off Scaffold Cards — Step Inside (A6, laminated)"],
    difficultyLevels: [
      { level: "Easy", description: "Child names the character and one thing they want, speaks as the character not about them." },
      { level: "Medium", description: "Plays out a short scene with a small ending, uses voice and body differently from normal." },
      { level: "Hard", description: "Full scene with clear character, stated setting, problem that gets resolved, and a closing line spoken in character." },
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "show-and-tell": {
    id: "show-and-tell",
    segment: "sign-off",
    title: "show and tell",
    setupLine:
      "Pick something connected to today's topic — real or imaginary. Tell your partner about it like it is the most interesting thing in the world.",
    howToPlay:
      "Scaffold card: Introduce it — \"Today I want to tell you about...\" Hold it up or pretend to · What is it? — two things about it · Why it matters — \"This is important to me because...\" · Close — \"And that is why you should know about [name of thing].\"",
    materials: ["Sign-Off Scaffold Cards — Show and Tell (A6, laminated)"],
    difficultyLevels: [
      { level: "Easy", description: "Names the thing and says two things about it." },
      { level: "Medium", description: "Full structure with a clear final sentence." },
      { level: "Hard", description: "Strong opening, two specific details, personal meaning, closing line that lands, eye contact maintained throughout." },
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
  "ask-me": {
    id: "ask-me",
    segment: "sign-off",
    title: "ask me",
    setupLine:
      "One of you is the expert on today's topic. The other asks real questions and actually listens. Then swap.",
    howToPlay:
      "Scaffold card — Interviewer: Start with \"Tell me about [topic]\" · Ask one more question about something they said · Finish with \"Is there anything else?\" Scaffold card — Interviewee: Answer with more than one sentence · Add one detail they did not ask for · If stuck, say \"That is a good question — I think...\"",
    materials: [
      "Sign-Off Scaffold Cards — Ask Me Interviewer (A6, laminated)",
      "Sign-Off Scaffold Cards — Ask Me Interviewee (A6, laminated)",
    ],
    difficultyLevels: [
      { level: "Easy", description: "Interviewee answers two questions with one sentence each, interviewer uses only the printed questions." },
      { level: "Medium", description: "Interviewee adds one unprompted detail, interviewer follows up on something actually said." },
      { level: "Hard", description: "Interviewer generates all questions from what the interviewee says, no card needed." },
    ],
    debriefPrompts: [],
    type: "facilitated",
  },
};

// ─── Session Table ──────────────────────────────────────────

const sessionTable: CurriculumSessionEntry[] = [
  { sessionNumber: 0, rollCall: "voice", playground: "script-flip", showtime: "whacky-news", topicLayer: 0 },
  { sessionNumber: 1, rollCall: "brain", playground: "script-flip", showtime: "whacky-news", topicLayer: 1 },
  { sessionNumber: 2, rollCall: "body", playground: "tale-trail", showtime: "mad-ad", topicLayer: 1 },
  { sessionNumber: 3, rollCall: "voice", playground: "shuffle", showtime: "experience-share", topicLayer: 1 },
  { sessionNumber: 4, rollCall: "eyes", playground: "body-talk", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 5, rollCall: "ears", playground: "watch-your-step", showtime: "story-spine", topicLayer: 1 },
  { sessionNumber: 6, rollCall: "brain", playground: "train-of-thoughts", showtime: "whacky-news", topicLayer: 1 },
  { sessionNumber: 7, rollCall: "body", playground: "guess-me", showtime: "mad-ad", topicLayer: 1 },
  { sessionNumber: 8, rollCall: "voice", playground: "psychiatrist", showtime: "experience-share", topicLayer: 1, isCheckpoint: true },
  { sessionNumber: 9, rollCall: "eyes", playground: "reverse-gear", showtime: "magic-box", topicLayer: 1 },
  { sessionNumber: 10, rollCall: "ears", playground: "script-flip", showtime: "story-spine", topicLayer: 1 },
  { sessionNumber: 11, rollCall: "brain", playground: "tale-trail", showtime: "whacky-news", topicLayer: 1 },
  { sessionNumber: 12, rollCall: "body", playground: "shuffle", showtime: "mad-ad", topicLayer: 1 },
  { sessionNumber: 13, rollCall: "voice", playground: "body-talk", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 14, rollCall: "eyes", playground: "watch-your-step", showtime: "magic-box", topicLayer: 2 },
  { sessionNumber: 15, rollCall: "ears", playground: "train-of-thoughts", showtime: "story-spine", topicLayer: 2 },
  { sessionNumber: 16, rollCall: "brain", playground: "guess-me", showtime: "whacky-news", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 17, rollCall: "body", playground: "psychiatrist", showtime: "mad-ad", topicLayer: 2 },
  { sessionNumber: 18, rollCall: "voice", playground: "reverse-gear", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 19, rollCall: "eyes", playground: "script-flip", showtime: "magic-box", topicLayer: 2 },
  { sessionNumber: 20, rollCall: "ears", playground: "tale-trail", showtime: "story-spine", topicLayer: 2 },
  { sessionNumber: 21, rollCall: "brain", playground: "shuffle", showtime: "whacky-news", topicLayer: 2 },
  { sessionNumber: 22, rollCall: "body", playground: "body-talk", showtime: "mad-ad", topicLayer: 2 },
  { sessionNumber: 23, rollCall: "voice", playground: "watch-your-step", showtime: "experience-share", topicLayer: 2 },
  { sessionNumber: 24, rollCall: "eyes", playground: "train-of-thoughts", showtime: "magic-box", topicLayer: 2, isCheckpoint: true },
  { sessionNumber: 25, rollCall: "ears", playground: "guess-me", showtime: "story-spine", topicLayer: 3 },
  { sessionNumber: 26, rollCall: "brain", playground: "psychiatrist", showtime: "superhero-sales", topicLayer: 3 },
  { sessionNumber: 27, rollCall: "body", playground: "reverse-gear", showtime: "whacky-news", topicLayer: 3 },
  { sessionNumber: 28, rollCall: "voice", playground: "script-flip", showtime: "mad-ad", topicLayer: 3 },
  { sessionNumber: 29, rollCall: "eyes", playground: "tale-trail", showtime: "experience-share", topicLayer: 3 },
  { sessionNumber: 30, rollCall: "ears", playground: "shuffle", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 31, rollCall: "brain", playground: "body-talk", showtime: "story-spine", topicLayer: 3 },
  { sessionNumber: 32, rollCall: "body", playground: "watch-your-step", showtime: "superhero-sales", topicLayer: 3, isCheckpoint: true },
  { sessionNumber: 33, rollCall: "voice", playground: "train-of-thoughts", showtime: "whacky-news", topicLayer: 3 },
  { sessionNumber: 34, rollCall: "eyes", playground: "guess-me", showtime: "mad-ad", topicLayer: 3 },
  { sessionNumber: 35, rollCall: "ears", playground: "psychiatrist", showtime: "experience-share", topicLayer: 3 },
  { sessionNumber: 36, rollCall: "brain", playground: "reverse-gear", showtime: "magic-box", topicLayer: 3 },
  { sessionNumber: 37, rollCall: "body", playground: "script-flip", showtime: "story-spine", topicLayer: 4 },
  { sessionNumber: 38, rollCall: "voice", playground: "tale-trail", showtime: "superhero-sales", topicLayer: 4 },
  { sessionNumber: 39, rollCall: "eyes", playground: "shuffle", showtime: "whacky-news", topicLayer: 4 },
  { sessionNumber: 40, rollCall: "ears", playground: "body-talk", showtime: "mad-ad", topicLayer: 4, isCheckpoint: true },
  { sessionNumber: 41, rollCall: "brain", playground: "watch-your-step", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 42, rollCall: "body", playground: "train-of-thoughts", showtime: "magic-box", topicLayer: 4 },
  { sessionNumber: 43, rollCall: "voice", playground: "guess-me", showtime: "story-spine", topicLayer: 4 },
  { sessionNumber: 44, rollCall: "eyes", playground: "psychiatrist", showtime: "superhero-sales", topicLayer: 4 },
  { sessionNumber: 45, rollCall: "ears", playground: "reverse-gear", showtime: "whacky-news", topicLayer: 4 },
  { sessionNumber: 46, rollCall: "brain", playground: "script-flip", showtime: "mad-ad", topicLayer: 4 },
  { sessionNumber: 47, rollCall: "body", playground: "tale-trail", showtime: "experience-share", topicLayer: 4 },
  { sessionNumber: 48, rollCall: "voice", playground: "shuffle", showtime: "magic-box", topicLayer: 4, isCheckpoint: true },
  { sessionNumber: 49, rollCall: "brain", playground: "script-flip", showtime: "whacky-news", topicLayer: 1, isFlex: true },
  { sessionNumber: 50, rollCall: "body", playground: "tale-trail", showtime: "mad-ad", topicLayer: 1, isFlex: true },
];

// ─── Checkpoints ────────────────────────────────────────────

const checkpoints: CurriculumCheckpoint[] = [
  {
    afterSession: 8,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Participates when directly invited. Speaks in one or two words.",
        developing: "Responds with a sentence. Stays on one topic for 20–30 seconds.",
        secure: "Tells a simple story with a beginning and an ending. Responds to a direct question with at least one full sentence.",
      },
      {
        skillArea: "Body Language",
        beginning: "Body is still or looking down while speaking.",
        developing: "Looks at their partner while speaking.",
        secure: "Looks at the person they are speaking to consistently.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is very quiet.",
        developing: "Voice can be heard by partner.",
        secure: "Voice carries across the circle.",
      },
    ],
  },
  {
    afterSession: 16,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Speaks when it is their turn but ideas are not structured.",
        developing: "Structures a short talk with a beginning.",
        secure: "Structures a short talk with a clear opening and a clear closing.",
      },
      {
        skillArea: "Body Language",
        beginning: "Body does not change while speaking.",
        developing: "Uses at least one gesture while speaking.",
        secure: "Uses at least one deliberate gesture. Consistently responds to what their partner said.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is quiet or flat.",
        developing: "Voice has some variation.",
        secure: "Voice changes deliberately at least once.",
      },
    ],
  },
  {
    afterSession: 24,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Descriptions are vague.",
        developing: "Describes something with one or two specific details. Asks a follow-up question.",
        secure: "Describes something specifically enough for a partner to picture it. Asks a follow-up question connected to what was just said.",
      },
      {
        skillArea: "Body Language",
        beginning: "Gestures are accidental, not deliberate.",
        developing: "Uses hands and face together at least once.",
        secure: "Body language supports the words consistently.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is steady but with no variation.",
        developing: "Changes their voice at least once — louder or softer.",
        secure: "Changes their voice deliberately for effect.",
      },
    ],
  },
  {
    afterSession: 32,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Speaks for 30–45 seconds before trailing off. Relies fully on the scaffold card.",
        developing: "Speaks for 1 minute with reasonable structure. Glances at the scaffold card but does not read from it.",
        secure: "Speaks for 1–2 minutes on any topic using all three skills. Occasionally sets the scaffold card aside.",
      },
      {
        skillArea: "Body Language",
        beginning: "Needs reminding to use body.",
        developing: "Uses body and voice together in at least one moment.",
        secure: "Body language is becoming natural and integrated.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is consistent but not yet varied.",
        developing: "Recovers with a prompt when losing the thread.",
        secure: "Begins to recover mid-talk without a prompt.",
      },
    ],
  },
  {
    afterSession: 40,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "Consistent but not yet independent — needs the scaffold to start.",
        developing: "Starts independently without needing the setup line read aloud.",
        secure: "Starts independently, uses all three skills together, makes at least one adjustment mid-talk.",
      },
      {
        skillArea: "Body Language",
        beginning: "Uses body language when reminded.",
        developing: "Uses body and voice together deliberately in at least one moment.",
        secure: "Commands attention when starting — pauses, stands still, then begins.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is steady but predictable.",
        developing: "Uses voice variation independently.",
        secure: "Voice, body, and content are beginning to work together as one thing.",
      },
    ],
  },
  {
    afterSession: 48,
    descriptors: [
      {
        skillArea: "Content & Structure",
        beginning: "A consistent, willing participant. Needs continued support to extend and vary their speaking.",
        developing: "Speaks confidently in familiar formats. Uses a personal style that is beginning to be recognisable.",
        secure: "Speaks for 2+ minutes on any topic. Chooses their own approach without the scaffold. Recovers from losing the thread mid-talk.",
      },
      {
        skillArea: "Body Language",
        beginning: "Body language is present but not yet distinctive.",
        developing: "Has a recognisable physical presence while speaking.",
        secure: "Voice, body, and content work together as one thing.",
      },
      {
        skillArea: "Vocal Skills",
        beginning: "Voice is clear and audible but not yet a tool.",
        developing: "Uses voice as a deliberate tool in familiar formats.",
        secure: "Voice changes when they need it to and stays controlled when it matters.",
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

export const publicSpeaking58: CurriculumProgramme = {
  id: "public-speaking-5-8",
  slug: "public-speaking-5-8",
  title: "public speaking",
  category: "language",
  heroImageUrl: "/prog-speaking-5-8.gif",
  ageGroup: "5-8",
  ageLabel: "ages 5–8",
  tagline: "find your voice through play and learn to express without fear.",
  description:
    "builds how children organise ideas, use body language, and use their voice — through games that make speaking feel like play.",
  totalSessions: 50,
  skillAreas: [
    {
      id: "cs",
      name: "Content & Structure",
      shortName: "C&S",
      abilities: [
        "Tells a story with a beginning, middle, and end",
        "Explains what they heard in their own words",
        "Describes a person or thing clearly enough for others to picture it",
        "Asks and answers who, what, when, and where questions",
        "Begins a talk with a clear opening and ends with a clear closing",
      ],
    },
    {
      id: "bl",
      name: "Body Language",
      shortName: "BL",
      abilities: [
        "Uses hands and face to show feelings while talking",
        "Looks at the person they are speaking to",
        "Starts speaking in a way that gets attention — stands still, pauses, then begins",
      ],
    },
    {
      id: "vs",
      name: "Vocal Skills",
      shortName: "VS",
      abilities: [
        "Speaks soft or loud on purpose",
        "Speaks clearly enough for others to follow",
        "Uses voice and sound effects to bring ideas to life",
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
      objective: "build speaking and attentiveness through one group game. debrief closes.",
      type: "rotating",
      rotationPool: [
        "script-flip", "tale-trail", "shuffle", "body-talk",
        "watch-your-step", "train-of-thoughts", "guess-me",
        "psychiatrist", "reverse-gear",
      ],
    },
    {
      id: "showtime",
      name: "Showtime",
      durationRange: "30–35 min",
      objective: "children perform in front of peers. audience responds immediately. teacher tracks who speaks. debrief closes.",
      type: "rotating",
      rotationPool: [
        "whacky-news", "mad-ad", "experience-share",
        "magic-box", "story-spine", "superhero-sales",
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
          "children sit wherever they like — around a table, on the floor, however the space works. teacher sits in the group, not in front.",
        setupLine:
          "quick question. answer fast — first thing that comes to your head. what is the most disgusting food you can imagine?",
        howToPlay:
          "fast round — every child answers. teacher celebrates the most outrageous answer with genuine enthusiasm. \"did you notice what just happened? every single one of you spoke. just now. without being asked twice. because the question was fun enough that your voice came out before your brain said no.\" \"that's what every game in this class does — makes the question so interesting that speaking becomes the easy part.\" \"today — three games. real games. let's go.\"",
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
          "first game of the session. teacher demonstrates once with the child beside them, then the chain moves around the circle.",
        setupLine:
          "i say a sentence. it ends on one word. that word is your first word. you build a new sentence from it. we go around the circle. if you get stuck — say pass and the next person goes.",
        howToPlay:
          "teacher demonstrates the mechanic fully with the child beside them first — so everyone sees it once before playing. teacher starts: \"today i ate a mango.\" chain moves around the circle. two full rounds — second round a little faster.",
        example:
          "prompts to restart if the chain runs dry: \"i saw a puppy near my building gate.\" · \"we went to the park in the evening.\" · \"my friend was feeling very happy.\" · \"i ran home because it started to rain.\" · \"we stopped playing because it got dark.\"",
      },
      {
        name: "Playground — Tale Trail",
        time: "18 min",
        objective:
          "build a story together, card by card. one turn each before anyone takes a second. teacher keeps energy warm.",
        setupLine:
          "we are going to build a story together. everyone pick one card from any pile — don't show anyone. i start with one sentence and place my card on the mat. then the next person adds one sentence — wherever the story goes — and places their card. we go around once before anyone takes a second turn.",
        howToPlay:
          "teacher places story cards face-up in four piles in the centre: object · character · emotion · event. story mat laid out. teacher gives an opening sentence — \"one morning, a small elephant woke up to find something very strange outside her door.\" each child adds one sentence and places their card. if a child is stuck: \"what does your card make happen next?\" after one full round, teacher prompts the ending: \"who wants to bring the story home? one sentence — finish it.\" one child ends it. group gives a quick round of applause. · if time allows — teacher rearranges three cards in a different sequence: \"same story — but now these three things happen in a different order. what changes?\" brief group discussion — one minute only.",
        materials: [
          "Story Mat",
          "Story Cards — Object, Character, Emotion, Event",
        ],
        heroImageUrl: "/games/ps/tale-trail.png",
      },
      {
        name: "Showtime — Mad Ad",
        time: "22 min",
        objective:
          "children perform in front of the group. each pitch is voted on and fielded one challenge question. an option to stand beside the teacher is offered naturally — not singled out or labelled.",
        setupLine:
          "you get a topic. you have 1 minute to think. then you stand up and sell something connected to that topic — like you're in an advertisement. make it sound like the most amazing thing in the world.",
        howToPlay:
          "ad structure (teacher shows a reference card): hook — start with a question or a surprise · product name · one amazing reason to buy it · the big ask — \"so what are you waiting for? get yours today!\" · after each ad: class votes — who's buying, who's not. one person asks a challenge question. performer answers in character. · \"one thing — if anyone wants, you can do your ad standing right next to me. same ad, same vote, same applause. just side by side.\" offered naturally, not singled out. · teacher draws and reads the first topic card aloud. run 3–4 ads depending on group size. voting after each — hands up for buying, hands up for not buying. one challenge question per ad from the audience.",
        example:
          "prompts: a pillow that never goes flat · shoes that make you run faster · a lunch box that keeps food warm forever · a pencil that never breaks · glasses that help you find lost things · a bag that carries itself.",
        materials: [
          "Mad Ad topic cards",
          "Ad structure reference card",
        ],
      },
      {
        name: "Last 2 minutes — what every session looks like",
        time: "2 min",
        objective:
          "a short close that names the three segments of every regular session so the child leaves knowing what to expect next time.",
        howToPlay:
          "\"every session at oh. public speaking — three parts.\" · \"roll call — you warm up your voice and brain. everyone plays at the same time.\" · \"playground — one game, everyone in. you speak, you listen, you compete.\" · \"showtime — you perform in front of the group. real audience. real response.\" · \"every session you will speak more than you expected to. see you next time.\"",
      },
    ],
  },
};
