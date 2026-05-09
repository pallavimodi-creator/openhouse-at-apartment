/**
 * Lesson plans for the 8 books in Language Through Storytelling 3-5.
 *
 * Each book runs across two 3-day blocks with a 2-book interval between
 * them. The first block introduces the book; the second block (Version
 * 2.0) returns to it as a deeper read.
 *
 * Day 1 — print knowledge (before & during reading)
 * Day 2 — narrative (during & after reading)
 * Day 3 — narration + group activity
 */

export interface BookDayPlan {
  /** "Before and During Reading" / "During and After Reading Narrative" / etc. */
  when?: string;
  /** "Learning Objective N — to recognise..." */
  learningObjective?: string;
  /** Comma-separated vocabulary list, e.g. "munching, prance, awful, crooked". */
  vocabulary?: string;
  /** Numbered teacher steps for the day. */
  steps: string[];
}

export interface BookDay3Plan {
  /** What to do prefix — narration + activity. */
  steps: string[];
  vocabulary?: string;
  /** Activity for the day. */
  activity: { name: string; level: "Easy" | "Hard" };
}

export interface BookBlockPlan {
  day1: BookDayPlan;
  day2: BookDayPlan;
  day3: BookDay3Plan;
}

export interface BookPlan {
  /** Matches LanguageBook.order (1..8). */
  order: number;
  title: string;
  author: string;
  /** First time the book is read. */
  blockA: BookBlockPlan;
  /** Version 2.0 — advanced version of the same book. */
  blockB: BookBlockPlan;
}

export const LANGUAGE_BOOK_PLANS: BookPlan[] = [
  // 1 ───────────────────────────────────────────────────────
  {
    order: 1,
    title: "We're Going on a Bear Hunt",
    author: "Michael Rosen and Helen Oxenbury",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise that print carries meaning and to distinguish print from pictures.",
        vocabulary: "squelch, beautiful, deep",
        steps: [
          "Show the children the cover. Read the title aloud and point to each individual word as you read. Count the number of words in the title with the children: We're / Going / on / a / Bear / Hunt — 1, 2, 3, 4, 5, 6 — six words in the title.",
          "Talk about what the title does: the title helps us know what the book is about. This title has the word \"Bear\" (point to it) and the word \"Hunt\" (point to it). \"I wonder if they are going to look for a bear. Let's read and find out.\"",
          "During reading, periodically stop and point out words in the repeating phrases to build word awareness. Example: \"Here is the word swishy-swashy, and here is the picture of the grass.\" Track the print with your finger as you read repeated lines.",
          "For each of the last 5 pages, invite one child to come up and show where to begin reading. Encourage them to point to the top-left of the text and sweep left to right.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe the setting and characters of a story.",
        vocabulary: "oozy, dark, swirling",
        steps: [
          "At the top of a large sheet of paper, write \"Setting\" and remind the children that the setting is where the story takes place. Tell the children: our story takes place in many different places — grass, mud, river, forest. These places together are the setting.",
          "Read the book. After each page, highlight the characters and the setting. \"The family is going through tall grass. Who are the characters? Where are they now? The grass is the setting.\" Continue through river, mud, forest, snowstorm, cave.",
          "Have the children talk about what they remember about the setting. Ask: \"Help me describe the places in the story. What did we see?\" Prompt as needed (tall swishy grass, deep cold river, thick oozy mud, dark forest, swirling snowstorm, dark cave). Show the pictures so children can use visual clues.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "whirling, narrow, gloomy",
        activity: { name: "Story re-enactment (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the left-to-right and top-to-bottom directionality of print.",
        steps: [
          "Show the children the cover. Ask one child to come up and show you the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word as you say it. Remind children they have heard this story before. Ask them to tell what the story is about. Extend each child's response by adding more detail. Example: child — \"They go find a bear.\" Teacher — \"Yes, a family goes on a hunt to look for a bear. They travel through grass, river, mud, and a cave.\"",
          "With your finger, track the text on each page while reading. Follow the repeated lines and point to each word as you say it.",
          "Every few pages, comment on print directionality: \"I am pointing to the words as I read. I start here (point left) and go all the way across the page. I read from this side to this side. Then I move from this line (top) to the next line (bottom). That's how we read the words.\"",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe one or more major actions or events in a story.",
        steps: [
          "Read the book. Pause on each page to summarise the major events. Example: \"The family decides to go on a bear hunt. They walk through tall swishy grass. They splash through a deep cold river.\"",
          "After reading, place a large sheet of paper where all children can see. Ask them to recall the major events. \"Help me remember each thing that happened in the story.\" Use prompts: where did they go first? What happened after the grass? Where did they splash?",
          "Write children's responses on the paper in order. After listing several events, read the list back to them and point to each event as you read.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        activity: { name: "Story re-enactment (group)", level: "Hard" },
      },
    },
  },

  // 2 ───────────────────────────────────────────────────────
  {
    order: 2,
    title: "Mixed: A Colorful Story",
    author: "Arree Chung",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise that print carries meaning and to distinguish print from pictures.",
        vocabulary: "under, beside",
        steps: [
          "Show the children the cover. Read the title, pointing to each word as you read it.",
          "Ask: \"How many words are in the title of this book? Let's hold up a finger for each word.\" Read at a slow pace, holding up a finger for each word. \"There are four words in the name of this book. The words tell us what this book is about. It says 'Mixed: A Colorful Story.' What do you think it is about?\"",
          "During reading, point to the words on each page as you read. Periodically tell the children: \"Here are the words on this page that I need to read. I am going to read each word to you.\"",
          "Before reading the last page, ask one child to come up and show you the words on the page. \"Show me the words on this page so I know what to read.\"",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe the setting and characters of a story.",
        vocabulary: "over",
        steps: [
          "Read the book. During reading, summarise the major events on each page by commenting. \"A Red is singing. A Blue is driving a car.\"",
          "After reading, place the large paper so all children can see. Ask the children to recall several major events. \"Let's talk about what the colors did in the story.\" Write their answers down. Read the list to the children.",
          "Ask the children to put the events in order. Help as needed: \"In the beginning, all the colors lived together. Then they separated into their own groups. Next, what colors noticed each other? Last, what happened when colors started mixing?\"",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "above",
        activity: { name: "Change story endings (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the left-to-right and top-to-bottom directionality of print.",
        steps: [
          "Show the cover. Ask one child to come up and show you the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word as you say it. Remind the children they have heard this book before. Ask them what the story is about. Extend each child's contribution.",
          "With your finger, track the text on each page while reading.",
          "Every few pages, comment on print directionality (left-to-right, top-to-bottom).",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe one or more major actions or events in a story.",
        steps: [
          "Read the book. During reading, summarise the major events on each page (\"A Red is singing. A Blue is driving a car.\").",
          "After reading, ask the children to recall several major events. Write their answers on the paper, then read the list back.",
          "Ask the children to put the events in order. Help with prompts about beginning, middle, and end.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        activity: { name: "Change story endings (group)", level: "Hard" },
      },
    },
  },

  // 3 ───────────────────────────────────────────────────────
  {
    order: 3,
    title: "Giraffes Can't Dance",
    author: "Giles Andreae and Guy Parker-Rees",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise that print carries meaning and to distinguish print from pictures.",
        vocabulary: "munching, prance, awful, crooked",
        steps: [
          "Show the children the cover. Read the title and point to each individual word as you read. Count the number of words in the title for the children: 1, 2, 3 — three words in the title.",
          "Talk about what the title of a book does: \"The title helps us know what the book is about. This title has the word 'Dance' in it. I wonder if our story is about dancing. Let's read and see.\"",
          "During reading, periodically stop to point out some words in the book and use the word \"word\" to help children understand what a word is. Example: \"Here is the word dance and here is a picture of the jungle dance.\"",
          "For each of the last 5 pages, ask one child to come up to the book and show you where to start reading on the page.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe the setting and characters of a story.",
        vocabulary: "waltzing, swaying, slim, buckled",
        steps: [
          "At the top of the large paper, write \"Setting\" and remind the children that the setting is where the story takes place. \"Our story took place in the jungle. The jungle is the setting of the book.\"",
          "Read the book. After reading the text on each page, highlight the character and the setting. \"The book said all the animals in Africa are going to the Jungle Dance. What animals are at the dance?\"",
          "Have the children describe what they remember about the setting. \"Help me describe the jungle. What did we see?\" Prompt as needed: \"We saw lots of animals. Where did they live?\" Show the pictures to give extra help.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "somersault, elegant, splendid, clumsy",
        activity: { name: "Story re-enactment (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the left-to-right and top-to-bottom directionality of print.",
        steps: [
          "Show the cover. Ask one child to come up and show you the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word. Remind children they have heard this book before. Ask them to tell what the story is about; extend each child's contribution.",
          "With your finger, track the text on each page of the book while reading.",
          "Every few pages, comment on print directionality (left-to-right, top-to-bottom).",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To identify and describe one or more major actions or events in a story.",
        steps: [
          "Read the book. Pause on every page to summarise the major events. Example: \"Gerald was very sad because he was not a good dancer.\"",
          "After reading, place the large paper so all the children can see it. Ask the children to describe the major events. \"Help me remember each thing that happened in the story.\" Use open-ended prompts: \"What did the cricket tell Gerald to listen to?\" Write down children's answers.",
          "After children list several events, read the list back to them. Point to the events as you read them.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        activity: { name: "Story re-enactment (group)", level: "Hard" },
      },
    },
  },

  // 4 ───────────────────────────────────────────────────────
  {
    order: 4,
    title: "The Color Monster",
    author: "Anna Llenas",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the difference between letters and words.",
        vocabulary: "confused, jumbled, monster",
        steps: [
          "Hold up the book. Read the title, pointing to each word. \"Our title has two words.\" Draw children's attention to each word and its letters: \"The has three letters. T-H-E. Color has five letters. C-O-L-O-R. Monster has seven letters. M-O-N-S-T-E-R.\" Ask: \"Which word is the shortest? Which one is the longest?\"",
          "Place a large sheet of paper where all children can see it. Write the title \"Emotion Colors\" at the top. \"As we read, we will listen for different feelings and write them down. We'll also match each feeling to its color, just like in the story.\"",
          "Pause each time a new emotion appears. Read the feeling word and write it on the chart (happy, sad, angry, fear, calm, love). Count letters while writing. After each word ask: how many letters? Is it long or short? What color matches this feeling?",
          "At the end, review the whole list and compare: which word was longest? Shortest? Which colors did we see most?",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To produce a personal story that has a clear beginning, middle, and end.",
        vocabulary: "happy, sad, angry",
        steps: [
          "Read the story and stop periodically to discuss events relating to the theme of understanding feelings. Point out how the Color Monster's emotions are mixed up and how each feeling is sorted into a different jar. Summarise after reading: \"The Color Monster's feelings were all jumbled together. As he sorted each color, he began to understand how he felt.\"",
          "After reading, ask the children to think of their own experience: \"Think of a time when you felt more than one feeling at the same time — maybe happy and nervous, or angry and sad.\" Give them a few moments. Then ask: \"What color would match your feeling?\"",
          "Tell the children your own story: \"Sometimes I feel nervous on the first day of something new. My feelings get all mixed up — excited, worried, and a little scared. I take a deep breath, talk about how I feel, and slowly I begin to feel calm.\"",
          "Now, ask three children to share their own stories. Repeat each child's story, adding details to model a clear beginning, middle, and end.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "courage and calm",
        activity: { name: "Vocabulary reproduction (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise some common sight words, including environmental print.",
        steps: [
          "Show the cover. Ask one child to come up and show you the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word as you say it. Remind children they have heard this book before. Ask them to tell what the story is about; extend each child's contribution.",
          "Read the book. During reading, pause when each new feeling appears. \"The Color Monster looks all mixed up. Look, here is the yellow page. It has one word — happy. Can you guess what this word is?\" If children have trouble, give hints (\"He is smiling and jumping. What feeling is that?\"). Repeat with sad, angry, calm, love.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To share feelings, ideas, or experiences in a single story that is precise and understandable.",
        vocabulary: "happy, sad, angry (revisiting)",
        steps: [
          "Read the book, highlighting specific details. After reading, tell the children they are going to write a new story together. At the top of a large sheet of paper, write the title: \"The Color Monster Fixes His Mixed-Up Feelings.\"",
          "Say: \"Remember the Color Monster? His feelings were all mixed up. Today, he has a problem again — his feelings are jumbled. We are going to write a story about how he sorts them out. I'll write the story, but you must tell me what to write.\"",
          "Write the first lines: \"Once upon a time there was a Color Monster. His feelings were all mixed up. The Color Monster decided to sort them. First…\" Ask the children what happened first. Add details to model a rich story. (\"He picked the yellow feeling.\" \"What feeling is yellow? What did he do with it?\")",
          "Continue identifying the second and third things until the story is complete. Write \"The End\" and read it aloud.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        vocabulary: "courage and calm",
        activity: { name: "Vocabulary reproduction (group)", level: "Hard" },
      },
    },
  },

  // 5 ───────────────────────────────────────────────────────
  {
    order: 5,
    title: "The Lion Inside",
    author: "Rachel Bright and Jim Field",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the difference between letters and words.",
        vocabulary: "brave, roar, mighty",
        steps: [
          "Hold up the book. Read the title, pointing to each word. \"Our title has three words.\" Draw attention to letters in each word: \"Lion is made up of four letters. L-I-O-N. Inside has six letters. I-N-S-I-D-E.\"",
          "Play a quick game before reading. \"I am going to call someone's name. When I call your name, I am going to say either a letter or a word. If I say a letter, touch a letter on the cover. If I say a word, touch a word on the cover.\" Allow at least five children to play. Help children track an entire word vs. an individual letter.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To produce a fictional story that has a clear beginning, middle, and end.",
        vocabulary: "trod, weeny, feast",
        steps: [
          "Read the story and stop periodically to discuss events. \"First, we meet a very small mouse who feels unnoticed and wants to be heard. Then the mouse decides to climb up the rock to meet the lion. While they are together, the lion lets out a loud roar, and the mouse feels scared. As the story continues, the mouse uses his small voice, and both the mouse and lion learn something new about being brave.\"",
          "After reading, ask the children to think about all the things the mouse did. \"What were some of the things the mouse did?\" Repeat and expand answers: \"The mouse climbed the tall rock. The mouse wanted to meet the lion and be noticed. The mouse squeaked and used his voice, even though he felt scared.\"",
          "Tell the children they are going to make up their own story about being small but brave. \"Let's pretend you are the mouse. What would you do? Where would you go? Who would you meet?\"",
          "Provide your own narrative: \"If I were the mouse, first I would climb the tall rock. Then I would see the lion and feel a little scared. Next, I would use my small voice and say hello. Finally, I would become brave and make a new friend.\"",
          "Ask three children to provide their own story. Invite one child at a time. Repeat their ideas and expand to model a clear beginning, middle, and end.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "squeak, tippity toes",
        activity: { name: "Assuming puppet character (individual)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise some common sight words, including environmental print.",
        vocabulary: "frustrate (revisiting)",
        steps: [
          "Show the cover. \"We have seen this book before. Does anyone remember its name? Help me read the words.\" Read slowly, pausing between each word as you point.",
          "Remind children they have heard this story before. Ask them what the story is about. Extend their contribution: \"Yes, the small mouse wanted to be noticed. The mouse climbed up to meet the lion.\"",
          "Read the book. During reading, point to the text and say: \"I am reading these words here. Look closely. There are more words on this page. Can you find them?\" Track words with your finger and ask children what the words might say.",
          "Continue reading, pointing out words on each page. Show how the words change and tell the story.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To share feelings, ideas, or experiences in a single story that is precise and understandable.",
        vocabulary: "satisfied (revisiting)",
        steps: [
          "At the top of a large sheet of paper, write the title \"The Mouse Becomes Brave.\" \"We are going to write a new story about the mouse. I'll write the story, but you have to tell me what to write. Let's make sure our story has a beginning, middle, and ending.\"",
          "Write the first lines: \"The mouse felt very small and wanted to be noticed. One day, the mouse decided to be brave. First…\" Ask the children what the mouse does first. Add details to model a rich story. (\"The mouse climbs the tall rock.\" \"Why does the mouse climb? Is the rock big or small? Is the mouse scared while climbing? What does the mouse see at the top?\")",
          "Continue identifying the second and third things until the story is complete. Write \"The End\" and read the story aloud, pointing to each word.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        vocabulary: "thrilled (revisiting)",
        activity: { name: "Assuming puppet character (individual)", level: "Hard" },
      },
    },
  },

  // 6 ───────────────────────────────────────────────────────
  {
    order: 6,
    title: "How Do Dinosaurs Go to School?",
    author: "Jane Yolen and Mark Teague",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the difference between letters and words.",
        vocabulary: "drag, interrupt, car pool, yell",
        steps: [
          "Hold up the book. Read the title, point to each word: \"How Do Dinosaurs Go to School? Six words.\" Draw attention to the length of words. \"I see two long words and four short words in our title. Can you point to a short word? This word is 'How' — three letters: h-o-w. The words 'Dinosaurs' and 'School' are longer words with more letters.\"",
          "Play a quick game before reading. \"When I call your name, I am going to say either a letter or a word. If I say a letter, touch a letter on the cover. If I say a word, touch a word on the cover.\" Allow at least five children to play. Help them track an entire word when you say a word, vs. point to a letter when you say a letter.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To produce a fictional story that has a clear beginning, middle, and end.",
        vocabulary: "plunk, fidget, stir up, quick",
        steps: [
          "Read the story and stop periodically to discuss events that happen during the school day. \"First, the dinosaurs must get to school. Some take a car, others take the bus. While they are at school, dinosaurs do a lot of things.\"",
          "After reading, ask the children to think of all the things the dinosaurs did. Repeat and expand their answers: \"They went to recess. The dinosaurs played with their friends and growled at the bullies during recess.\"",
          "Tell the children they are going to make up their own story about a day at school. \"Let's pretend you were a dinosaur going to school. What would your day be like?\"",
          "Provide your own narrative: \"If I were a dinosaur going to school, first I would fly there. Then I would listen to my teacher. Next, I would play with my friends at recess. Finally, I would help to clean the classroom before flying home.\"",
          "Ask three children to share their own story. Repeat their ideas, adding details to model a story with a clear beginning, middle, and end.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "tease, tidy",
        activity: { name: "Change story endings (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise some common sight words, including environmental print.",
        vocabulary: "drag, interrupt, car pool, yell (revisiting)",
        steps: [
          "Show the cover. \"We have seen this book before. Does anyone remember its name? Help me read the words.\" Encourage participation, reading slowly and pausing between each word: \"How — Do — Dinosaurs — Go — to — School?\"",
          "Remind children they have heard this book before. Ask them to tell what the story is about; extend each child's contribution.",
          "Read the book. During reading, point out environmental print in the illustrations. \"Look at the picture of this dinosaur trying to catch a ride to school. I read these words up here. Look closely — there are more words on this page. Can you find them? There are more words written right here on the top of the bus. What do you think these words might say?\"",
          "Continue reading, pointing out other examples of environmental print such as \"show and tell\" on the blackboard and alphabet letters on charts and blocks.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To share feelings, ideas, or experiences in a single story that is precise and understandable.",
        vocabulary: "plunk, fidget, stir up, quick (revisiting)",
        steps: [
          "At the top of a large sheet of paper, write the title \"Buster Helps Out.\" \"We have another Buster story to write. Today we will write about how Buster helps everyone in his neighbourhood. I'll write the story, but you have to tell me what to write.\"",
          "Write the first lines: \"Buster is a big help to all the neighbours. Every week he lends a hand to people as they are doing their chores. First…\" Ask the children what Buster does first. Add details: (\"Buster brings in the newspaper.\" \"Whose newspaper? Where does he leave it? Does he ever get slobber in the newspaper? Does he get a treat?\")",
          "Continue identifying the second and third things until the story is complete. Write \"The End\" and read with the children, pointing to each word.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        vocabulary: "tease, tidy (revisiting)",
        activity: { name: "Change story endings (group)", level: "Hard" },
      },
    },
  },

  // 7 ───────────────────────────────────────────────────────
  {
    order: 7,
    title: "The Gruffalo",
    author: "Julia Donaldson",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the difference between letters and words.",
        vocabulary: "scary, afraid, tusk, claws",
        steps: [
          "Hold up the book. Read the title, pointing to each word. \"Our title has two words: The Gruffalo.\" Draw attention to the letters in each word. \"The has three letters. T-H-E. Gruffalo has eight letters. G-R-U-F-F-A-L-O.\" Ask which word is longer and which is shorter.",
          "Place a large sheet of paper where all children can see. Write \"Mouse's Plan\" (or \"Words from the Forest\") at the top. \"As we read, we will write down the animals Mouse meets and the things he says about the Gruffalo.\"",
          "During reading, pause when key words appear and add them to the list. Example: when Mouse meets the fox, write \"fox.\" Count letters as you write: F-O-X — three letters, a short word. Continue with owl, snake, Gruffalo, terrible tusks, knobbly knees, poisonous wart, purple prickles, orange eyes. Each time, count letters and ask the children: long or short?",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To produce a personal story that has a clear beginning, middle, and end.",
        vocabulary: "amazing, astounding, underground, deep",
        steps: [
          "Read the story and stop periodically to discuss events related to clever thinking and problem-solving. Pause when Mouse meets each animal: \"How does Mouse solve his problem?\" After reading, summarise: \"Mouse met animals that wanted to eat him, but he used clever ideas and confident words to stay safe. Even when he met the real Gruffalo, Mouse stayed calm and solved the problem.\"",
          "After reading, ask the children to think of their own experiences. \"Think of a time you solved a problem by using your thinking words. Maybe you found a lost toy, shared with a friend, or figured out how to build something.\" Allow a few children to share. Then say: \"You can use your experiences to make up stories.\"",
          "Tell the children your own story: \"Yesterday, I couldn't open a tight jar. I tried pulling, but it didn't work. Then I thought carefully. I tapped the lid gently and used a cloth to hold it tight. After trying again, the jar opened. I used my thinking to solve the problem.\"",
          "Ask three children to share their own stories. \"Tell me about a time you used your thinking to solve a problem.\" After each child shares, repeat the story and add details: \"First, you couldn't find your crayons. Then you looked in different places. Finally, you checked your bag and found them.\"",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "poisonous, prickles, stream",
        activity: { name: "Vocabulary reproduction (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise some common sight words, including environmental print.",
        vocabulary: "scary, afraid, tusk, claws (revisiting)",
        steps: [
          "Show the cover. Ask one child to come up and show the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word as you say it. Remind the children they have heard this story before. Ask them to tell what the story is about. Extend each child's contribution: \"Yes, Mouse meets different animals in the forest, and each one wants to eat him, but Mouse has a clever plan.\"",
          "Read the story. During reading, pause when Mouse meets each animal. After reading the text on the page, ask children if they can \"read\" or guess who appears. \"It looks like Mouse is walking through the forest. Oh, here comes an animal. Can you guess who this is?\" Give hints if needed: \"This animal flies at night and lives in a tree. What do you think it is?\" Continue similarly for fox, owl, snake, and Gruffalo.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To share feelings, ideas, or experiences in a single story that is precise and understandable.",
        vocabulary: "amazing, astounding, underground, deep (revisiting)",
        steps: [
          "Read the book, highlighting specific details in the story. After reading, tell the children they are going to write their own story. At the top of a large sheet of paper, write the title \"Mouse Solves His Problem.\"",
          "\"Remember Mouse from the story? He used clever ideas to stay safe in the forest. Today Mouse has a new problem — he is lost in the forest. We are going to write a story about how Mouse finds his way home. I'll write the story, but you must tell me what to write.\"",
          "Write the first lines: \"Once upon a time there was a little mouse. Mouse had a problem. He was lost in the forest. Mouse decided to find his way home. First…\" Ask what happens first. Add details: (\"Mouse asked the owl.\" \"Where was Owl sitting? On a tall tree branch. What did Owl say? Did Owl give him directions?\")",
          "Continue identifying the second and third things Mouse does — asking Fox, following Snake's trail, spotting the Gruffalo's footprints. Guide the story until Mouse solves the problem and finds his way home. Write \"The End\" and read aloud.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        vocabulary: "poisonous, prickles, stream (revisiting)",
        activity: { name: "Vocabulary reproduction (group)", level: "Hard" },
      },
    },
  },

  // 8 ───────────────────────────────────────────────────────
  {
    order: 8,
    title: "Bunny Cakes",
    author: "Rosemary Wells",
    blockA: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise the difference between letters and words.",
        vocabulary: "frustrated",
        steps: [
          "Hold up the book. Read the title, pointing to each word. \"Our title has two words: Bunny Cakes.\" Draw attention to the letters: \"Bunny is made up of five letters — B-U-N-N-Y. Cakes also has five letters — C-A-K-E-S.\"",
          "Place the large paper where all children can see. Write \"Grocery List\" at the top. \"As we read about Max's trips to the grocery store, we will keep a list of all the things he is supposed to buy.\"",
          "During reading, pause at each grocery list. Read the word and write it on the large paper. \"This list says 'eggs.' Let's write the word eggs on our list. E-G-G-S — four letters, a pretty short word.\" Repeat for milk, flour, birthday candles, silver stars, sugar hearts, buttercream roses. Let children judge: long or short word?",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To produce a personal story that has a clear beginning, middle, and end.",
        vocabulary: "satisfied",
        steps: [
          "Read the story and stop periodically to discuss events relating to the theme of \"try, try again.\" Summarise after reading: \"Max tried over and over again to get his special ingredient for the cake. He kept trying and finally got the grocer to understand.\"",
          "After reading, ask the children to think of their own experience. \"Think of a time you had to keep trying to get something you wanted.\" Provide a few moments to think, then allow a few children to share. \"You can use your experiences to make up stories.\"",
          "Tell the children your own story: \"Last year, I taught my son how to ride his bike. I would tell him to sit in the middle of the seat and hold the handlebars tight, but that was hard for him. Yet, every day he tried different ways of sitting and holding. All his work paid off and he learned how to ride his bike in just a few weeks.\"",
          "Ask three children to share their own stories. \"Tell me about a time you kept working until you succeeded at something.\" Repeat each story, adding details to model a clear beginning, middle, and end.",
        ],
      },
      day3: {
        steps: [
          "One quick narration of the story.",
          "Activity session.",
        ],
        vocabulary: "thrilled",
        activity: { name: "Vocabulary reproduction (group)", level: "Easy" },
      },
    },
    blockB: {
      day1: {
        when: "Before and During Reading · Print Knowledge",
        learningObjective:
          "To recognise some common sight words, including environmental print.",
        vocabulary: "frustrated (revisiting)",
        steps: [
          "Show the cover. Ask one child to come up and show you the title. \"We have seen this book before. Does anyone remember its name?\"",
          "Read the title and point to each word. Remind children they have heard this book before. Ask them to tell what the story is about; extend each child's contribution.",
          "Read the book. During reading, pause at each grocery list after reading the text on the page. Ask children if they can \"read\" what is on the list. \"It looks like Max broke the eggs. Look, here is a grocery list that his sister Ruby must have written. It has one word on it (track the word eggs). Can you guess what this word is?\" If children have trouble, ask other class members to help or provide hints.",
        ],
      },
      day2: {
        when: "During and After Reading · Narrative",
        learningObjective:
          "To share feelings, ideas, or experiences in a single story that is precise and understandable.",
        vocabulary: "satisfied (revisiting)",
        steps: [
          "Read the book, highlighting specific details. After reading, tell the children they are going to write another story about the dog Buster. At the top of a large sheet of paper, write the title \"Buster Solves His Problem.\"",
          "\"Remember Buster? We wrote last week about the good day he had. Today, Buster has a problem — Buster lost his bone. We are going to write a story about how Buster found his bone. I'll write the story, but you must tell me what to write.\"",
          "Write the first lines: \"Once upon a time there was a dog named Buster. Buster had a problem. He lost his bone. Buster decided to go and look for it. First…\" Ask the children what happened first. Add details: (\"Buster asked other dogs.\" \"Which dogs did he ask? What did the other dogs say?\")",
          "Continue identifying the second and third things Buster did until the story is complete. Write \"The End\" and read it to the children.",
        ],
      },
      day3: {
        steps: [
          "Show the children the story and ask them to reconstruct it as a group, before the narration.",
          "Activity session.",
        ],
        vocabulary: "thrilled (revisiting)",
        activity: { name: "Vocabulary reproduction (group)", level: "Hard" },
      },
    },
  },
];

export function getBookPlan(order: number): BookPlan | undefined {
  return LANGUAGE_BOOK_PLANS.find((p) => p.order === order);
}
