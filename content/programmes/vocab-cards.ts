/**
 * Vocabulary cards data — flippable Mrs-Wordsmith-style cards for the
 * Language Through Storytelling 3–5 programme.
 *
 * Each card is a single word pulled from one of the 5 picture books we
 * have scene assets for. The scene image is the moment in the book
 * where the word is encountered; the rest is teacher-facing pedagogy.
 *
 * Modes — five ways a 3–5 year old can play the word:
 *  - emote        : show the word as a face / feeling
 *  - enact        : do the word with the body
 *  - sentence     : say the word inside a tiny sentence
 *  - word-pairs   : pair it with a friend (synonym) and an opposite (antonym)
 *  - what-why-how : open question for describing words
 *
 * Each card declares which modes are most natural for its word; the UI
 * still shows all five so the teacher can choose, but the natural ones
 * are highlighted.
 */

export type VocabMode =
  | "emote"
  | "enact"
  | "sentence"
  | "word-pairs"
  | "what-why-how";

export type WordType =
  | "action"
  | "describing"
  | "feeling"
  | "naming"
  | "position";

export type WordTier = "easy" | "harder";

export interface VocabCard {
  /** Lowercase word, kebab if multi-word (matches image filename stem). */
  slug: string;
  /** The word as it should display on the card (lowercase, no styling). */
  word: string;
  /** Educator-written short meaning, ages 3–5 friendly. */
  meaning: string;
  /** Action / describing / feeling / naming / position. */
  type: WordType;
  /** Soft tier — light yellow (easy) or dark yellow (harder). */
  tier: WordTier;
  /** One synonym, lowercase. */
  synonym?: string;
  /** One antonym, lowercase. */
  antonym?: string;
  /** Which of the 5 play modes fit this word best. */
  modes: VocabMode[];
  /**
   * Hand-written prompts per mode. The modal prefers these when present
   * and falls back to a generic template otherwise. Only write a prompt
   * for the modes that genuinely fit the word — skip the rest.
   */
  prompts?: Partial<Record<VocabMode, string>>;
}

export interface VocabBook {
  /** Matches the language-book order number (1..8). */
  bookOrder: number;
  /** Folder slug under /public/assets/vocab/<slug>/. */
  slug: string;
  /** Display title (lowercase preferred). */
  title: string;
  /** Path to cover thumb. */
  coverUrl: string;
  cards: VocabCard[];
}

const wordsDir = (slug: string) => `/assets/vocab/${slug}/words`;

/* ─── 1 · We're Going on a Bear Hunt ───────────────────────── */

const bearHunt: VocabBook = {
  bookOrder: 1,
  slug: "bear-hunt",
  title: "we're going on a bear hunt",
  coverUrl: `/assets/vocab/bear-hunt/cover.jpg`,
  cards: [
    {
      slug: "hunt",
      word: "hunt",
      meaning: "to look for something.",
      type: "action",
      tier: "easy",
      synonym: "search",
      modes: ["enact", "sentence", "word-pairs"],
      prompts: {
        enact:
          "let's hunt for a bear — peek under the chair, behind the door, up high.",
        sentence: "today we hunt for ____.",
        "word-pairs":
          "hunt is like search. we hunt when we want to find something hidden.",
      },
    },
    {
      slug: "wavy",
      word: "wavy",
      meaning: "having soft curves like waves.",
      type: "describing",
      tier: "easy",
      synonym: "curly",
      antonym: "straight",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "splash",
      word: "splash",
      meaning: "to make water fly up and around.",
      type: "action",
      tier: "easy",
      synonym: "splatter",
      antonym: "still",
      modes: ["enact", "sentence", "word-pairs"],
    },
    {
      slug: "deep",
      word: "deep",
      meaning: "going a long way down or far inside.",
      type: "describing",
      tier: "easy",
      synonym: "low",
      antonym: "shallow",
      modes: ["what-why-how", "sentence", "word-pairs"],
    },
    {
      slug: "oozy",
      word: "oozy",
      meaning: "wet and slow and a little sticky.",
      type: "describing",
      tier: "harder",
      synonym: "gooey",
      antonym: "dry",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "squelch",
      word: "squelch",
      meaning: "the soft squishy sound mud makes.",
      type: "action",
      tier: "harder",
      synonym: "squish",
      modes: ["enact", "sentence"],
    },
    {
      slug: "dark",
      word: "dark",
      meaning: "when there is very little light.",
      type: "describing",
      tier: "easy",
      synonym: "dim",
      antonym: "bright",
      modes: ["what-why-how", "word-pairs", "sentence"],
    },
    {
      slug: "stumble",
      word: "stumble",
      meaning: "to trip a little bit while walking.",
      type: "action",
      tier: "harder",
      synonym: "trip",
      antonym: "balance",
      modes: ["enact", "sentence"],
    },
    {
      slug: "swirling",
      word: "swirling",
      meaning: "moving round and round in circles.",
      type: "action",
      tier: "harder",
      synonym: "spinning",
      antonym: "still",
      modes: ["enact", "what-why-how"],
    },
    {
      slug: "gloomy",
      word: "gloomy",
      meaning: "dark and a little sad.",
      type: "describing",
      tier: "harder",
      synonym: "sad",
      antonym: "cheerful",
      modes: ["emote", "what-why-how", "word-pairs"],
    },
    {
      slug: "tip-toe",
      word: "tiptoe",
      meaning: "to walk softly on the tips of your toes.",
      type: "action",
      tier: "easy",
      synonym: "creep",
      antonym: "stomp",
      modes: ["enact", "sentence", "word-pairs"],
    },
    {
      slug: "furry",
      word: "furry",
      meaning: "covered in soft hair.",
      type: "describing",
      tier: "easy",
      synonym: "hairy",
      antonym: "smooth",
      modes: ["what-why-how", "word-pairs", "sentence"],
    },
  ],
};

/* ─── 3 · Giraffes Can't Dance ─────────────────────────────── */

const giraffes: VocabBook = {
  bookOrder: 3,
  slug: "giraffes-cant-dance",
  title: "giraffes can't dance",
  coverUrl: `/assets/vocab/giraffes-cant-dance/cover.jpg`,
  cards: [
    {
      slug: "slim",
      word: "slim",
      meaning: "thin and narrow.",
      type: "describing",
      tier: "easy",
      synonym: "thin",
      antonym: "wide",
      modes: ["what-why-how", "word-pairs"],
    },
    {
      slug: "munching",
      word: "munching",
      meaning: "chewing food in a noisy, happy way.",
      type: "action",
      tier: "easy",
      synonym: "chewing",
      antonym: "fasting",
      modes: ["enact", "sentence"],
    },
    {
      slug: "buckled",
      word: "buckled",
      meaning: "bent and fell apart at the knees.",
      type: "action",
      tier: "harder",
      synonym: "collapsed",
      antonym: "stood",
      modes: ["enact", "sentence"],
    },
    {
      slug: "prance",
      word: "prance",
      meaning: "to walk with bouncy, happy steps.",
      type: "action",
      tier: "harder",
      synonym: "skip",
      antonym: "stomp",
      modes: ["enact", "sentence", "word-pairs"],
    },
    {
      slug: "elegant",
      word: "elegant",
      meaning: "lovely and graceful to look at.",
      type: "describing",
      tier: "harder",
      synonym: "graceful",
      antonym: "clumsy",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "splendid",
      word: "splendid",
      meaning: "really really wonderful.",
      type: "describing",
      tier: "harder",
      synonym: "wonderful",
      antonym: "awful",
      modes: ["emote", "what-why-how", "word-pairs"],
    },
    {
      slug: "clumsy",
      word: "clumsy",
      meaning: "moving in a bumpy, awkward way.",
      type: "describing",
      tier: "easy",
      synonym: "awkward",
      antonym: "graceful",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "swaying",
      word: "swaying",
      meaning: "moving slowly side to side.",
      type: "action",
      tier: "easy",
      synonym: "swinging",
      modes: ["enact", "what-why-how"],
    },
    {
      slug: "somersault",
      word: "somersault",
      meaning: "a roll where your body turns right over.",
      type: "naming",
      tier: "harder",
      synonym: "roll",
      modes: ["enact", "sentence"],
    },
  ],
};

/* ─── 4 · The Colour Monster ───────────────────────────────── */

const colourMonster: VocabBook = {
  bookOrder: 4,
  slug: "colour-monster",
  title: "the colour monster",
  coverUrl: `/assets/vocab/colour-monster/cover.jpg`,
  cards: [
    {
      slug: "confused",
      word: "confused",
      meaning: "not sure what is happening inside.",
      type: "feeling",
      tier: "harder",
      synonym: "puzzled",
      antonym: "certain",
      modes: ["emote", "what-why-how", "sentence"],
    },
    {
      slug: "gentle",
      word: "gentle",
      meaning: "soft, kind and careful.",
      type: "describing",
      tier: "easy",
      synonym: "soft",
      antonym: "rough",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "bright",
      word: "bright",
      meaning: "shining with lots of light.",
      type: "describing",
      tier: "easy",
      synonym: "shiny",
      antonym: "dull",
      modes: ["what-why-how", "word-pairs", "sentence"],
    },
    {
      slug: "stomp",
      word: "stomp",
      meaning: "to take big, heavy, noisy steps.",
      type: "action",
      tier: "easy",
      synonym: "thump",
      antonym: "tiptoe",
      modes: ["enact", "emote", "word-pairs"],
    },
    {
      slug: "blazes",
      word: "blazes",
      meaning: "burns brightly with big flames.",
      type: "action",
      tier: "harder",
      synonym: "burns",
      antonym: "fades",
      modes: ["enact", "what-why-how"],
    },
    {
      slug: "afraid",
      word: "afraid",
      meaning: "feeling a little scared.",
      type: "feeling",
      tier: "easy",
      synonym: "scared",
      antonym: "brave",
      modes: ["emote", "what-why-how", "sentence"],
    },
    {
      slug: "calm",
      word: "calm",
      meaning: "quiet and peaceful inside.",
      type: "feeling",
      tier: "easy",
      synonym: "peaceful",
      antonym: "tense",
      modes: ["emote", "enact", "what-why-how"],
    },
  ],
};

/* ─── 5 · The Lion Inside ──────────────────────────────────── */

const lionInside: VocabBook = {
  bookOrder: 5,
  slug: "lion-inside",
  title: "the lion inside",
  coverUrl: `/assets/vocab/lion-inside/cover.jpg`,
  cards: [
    {
      slug: "mighty",
      word: "mighty",
      meaning: "having great power and strength.",
      type: "describing",
      tier: "easy",
      synonym: "strong",
      antonym: "weak",
      modes: ["enact", "emote", "word-pairs"],
    },
    {
      slug: "meekest",
      word: "meekest",
      meaning: "the quietest and gentlest of all.",
      type: "describing",
      tier: "harder",
      synonym: "gentlest",
      antonym: "boldest",
      modes: ["emote", "what-why-how", "word-pairs"],
    },
    {
      slug: "mane",
      word: "mane",
      meaning: "the long hair around a lion's neck.",
      type: "naming",
      tier: "easy",
      modes: ["sentence", "what-why-how"],
    },
    {
      slug: "trod",
      word: "trod",
      meaning: "walked or stepped on something.",
      type: "action",
      tier: "harder",
      synonym: "stepped",
      antonym: "avoided",
      modes: ["enact", "sentence"],
    },
    {
      slug: "roar",
      word: "roar",
      meaning: "to make a long, loud, brave sound.",
      type: "action",
      tier: "easy",
      synonym: "shout",
      antonym: "whisper",
      modes: ["enact", "emote", "sentence"],
    },
    {
      slug: "slumbering",
      word: "slumbering",
      meaning: "sleeping peacefully.",
      type: "action",
      tier: "harder",
      synonym: "sleeping",
      antonym: "waking",
      modes: ["enact", "sentence", "word-pairs"],
    },
    {
      slug: "reclining",
      word: "reclining",
      meaning: "leaning back to rest.",
      type: "action",
      tier: "harder",
      synonym: "leaning",
      antonym: "sitting up",
      modes: ["enact", "what-why-how"],
    },
    {
      slug: "frightened",
      word: "frightened",
      meaning: "feeling scared that something bad might happen.",
      type: "feeling",
      tier: "easy",
      synonym: "scared",
      antonym: "brave",
      modes: ["emote", "what-why-how", "sentence"],
    },
    {
      slug: "impressed",
      word: "impressed",
      meaning: "amazed and proud of something.",
      type: "feeling",
      tier: "harder",
      synonym: "amazed",
      antonym: "bored",
      modes: ["emote", "what-why-how", "sentence"],
    },
  ],
};

/* ─── 7 · The Gruffalo ─────────────────────────────────────── */

const gruffalo: VocabBook = {
  bookOrder: 7,
  slug: "gruffalo",
  title: "the gruffalo",
  coverUrl: `/assets/vocab/gruffalo/cover.jpg`,
  cards: [
    {
      slug: "stroll",
      word: "stroll",
      meaning: "to walk slowly in a relaxed way.",
      type: "action",
      tier: "easy",
      synonym: "walk",
      antonym: "run",
      modes: ["enact", "sentence", "word-pairs"],
    },
    {
      slug: "underground",
      word: "underground",
      meaning: "under the ground, below our feet.",
      type: "position",
      tier: "easy",
      synonym: "below",
      antonym: "above",
      modes: ["enact", "what-why-how", "word-pairs"],
    },
    {
      slug: "roasted",
      word: "roasted",
      meaning: "cooked with heat until warm and brown.",
      type: "describing",
      tier: "harder",
      synonym: "cooked",
      antonym: "raw",
      modes: ["sentence", "what-why-how"],
    },
    {
      slug: "treetop",
      word: "treetop",
      meaning: "the very top part of a tree.",
      type: "naming",
      tier: "easy",
      synonym: "canopy",
      modes: ["enact", "sentence"],
    },
    {
      slug: "knobbly",
      word: "knobbly",
      meaning: "full of little bumps and lumps.",
      type: "describing",
      tier: "harder",
      synonym: "bumpy",
      antonym: "smooth",
      modes: ["what-why-how", "word-pairs"],
    },
    {
      slug: "poisonous",
      word: "poisonous",
      meaning: "not safe to eat or touch — it can make you sick.",
      type: "describing",
      tier: "harder",
      synonym: "harmful",
      antonym: "safe",
      modes: ["what-why-how", "word-pairs"],
    },
    {
      slug: "prickles",
      word: "prickles",
      meaning: "tiny sharp points that can poke.",
      type: "naming",
      tier: "easy",
      synonym: "spikes",
      modes: ["sentence", "what-why-how"],
    },
    {
      slug: "scrambled",
      word: "scrambled",
      meaning: "moved very quickly in a panic.",
      type: "action",
      tier: "harder",
      synonym: "rushed",
      antonym: "strolled",
      modes: ["enact", "sentence"],
    },
    {
      slug: "astounding",
      word: "astounding",
      meaning: "very surprising or amazing.",
      type: "describing",
      tier: "harder",
      synonym: "amazing",
      antonym: "ordinary",
      modes: ["emote", "what-why-how", "word-pairs"],
    },
    {
      slug: "fled",
      word: "fled",
      meaning: "ran away quickly because of fear.",
      type: "action",
      tier: "harder",
      synonym: "escaped",
      antonym: "stayed",
      modes: ["enact", "sentence", "word-pairs"],
    },
  ],
};

/* ─── Registry ─────────────────────────────────────────────── */

export const VOCAB_BOOKS: VocabBook[] = [
  bearHunt,
  giraffes,
  colourMonster,
  lionInside,
  gruffalo,
].map((b) => ({
  ...b,
  cards: b.cards.map((c) => ({
    ...c,
    // attach a default image path the modal can use
  })),
}));

/** Look up a book's vocab cards by language-book order. */
export function getVocabBookByOrder(order: number): VocabBook | undefined {
  return VOCAB_BOOKS.find((b) => b.bookOrder === order);
}

/** Build the scene image URL for a card. */
export function vocabImageUrl(book: VocabBook, card: VocabCard): string {
  // Most files are .png; a few covers / scenes are .jpg. The modal will
  // try .png first and fall back to .jpg via an onError handler.
  return `${wordsDir(book.slug)}/${card.slug}.png`;
}

export function vocabImageFallbackUrl(
  book: VocabBook,
  card: VocabCard
): string {
  return `${wordsDir(book.slug)}/${card.slug}.jpg`;
}
