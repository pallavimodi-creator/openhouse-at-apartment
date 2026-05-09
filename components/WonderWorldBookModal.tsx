"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * WonderWorld — teacher reference book for STEM 3–5.
 *
 * One workbook all year — "What Is In Your Tiffin?" — covering bread,
 * cheese, and salad. 15 activities (3 chapters × 5 activities), each
 * met twice across the year. Each activity page covers concept,
 * materials, setup, how-to-conduct, teacher prompts, and learning focus.
 */

type ActivityImage = { src: string; alt: string; caption?: string };
type Activity = {
  number: number;
  title: string;
  time: string;
  concept: string;
  materials: string[];
  setup: string;
  howToConduct: string[];
  prompts: string[];
  learningFocus: string;
  /** Optional gallery — each entry renders on its own dedicated photo page. */
  images?: ActivityImage[];
};

type Chapter = {
  number: number;
  name: string;
  caption: string;
  activities: Activity[];
};

const BREAD: Chapter = {
  number: 1,
  name: "the bread journey",
  caption:
    "Wheat becomes flour. Flour becomes dough. Dough becomes bread. Children meet the bread journey through their hands.",
  activities: [
    {
      number: 1,
      title: "punch and squish",
      time: "10–15 minutes",
      concept:
        "Wheat becomes flour, flour becomes dough, and dough changes when we knead it.",
      materials: [
        "1 ball of beige/yellow playdough per child.",
        "Clean table mat or tiffin mat (can be replaced with A4 sheet divided into 4 sections).",
      ],
      setup:
        "Give each child one playdough ball. Ask them to keep both hands on the mat.",
      howToConduct: [
        "Say: 'Today we are bakers. We are going to turn dough soft by pressing and kneading.'",
        "Ask children to press the dough with both palms. Count together from 1 to 10.",
        "Stop and touch the dough. Ask: 'Is it flat? Soft? Warm? Smooth?'",
        "Roll it back into a ball.",
        "Knead again — press, fold, press, fold. Count 10 more times.",
        "Compare before and after: 'What changed?'",
        "End: 'When we knead dough, it changes. That is how bread begins.'",
      ],
      prompts: [
        "What happens when you press harder?",
        "Is your dough flat or round now?",
        "Did it become softer?",
      ],
      learningFocus:
        "Material transformation, hand strength, counting, observation.",
      images: [
        {
          src: "/wonderworld-book/projects/bread-1-punch-and-squish.png",
          alt: "punch and squish — children kneading dough",
        },
      ],
    },
    {
      number: 2,
      title: "make a bread from somewhere in the world",
      time: "10–15 minutes",
      concept: "Bread can come in many shapes, sizes, and forms.",
      materials: [
        "1 small ball of beige/yellow playdough per child (each child makes one kind of bread).",
        "A4 tiffin mat or paper divided into 4 boxes.",
      ],
      setup: "Place one 4-section mat in front of each child.",
      howToConduct: [
        "Say: 'Bread does not look the same everywhere. Different breads have different shapes.'",
        "Assign or let children choose one kind to make.",
        "Some children: round chapati. Some: long loaf. Some: tiny bun. Some: square slice.",
        "Once all breads are ready, compare: biggest, smallest, round, long, flat, thick.",
        "Each child says: 'I made a ___.'",
      ],
      prompts: [
        "Which bread is flat?",
        "Which one is long?",
        "Which one would fit in your tiffin?",
      ],
      learningFocus:
        "Shape recognition, comparison, vocabulary, fine motor control.",
      images: [
        {
          src: "/wonderworld-book/projects/bread-2-make-a-bread.png",
          alt: "make a bread from somewhere in the world — bread varieties",
        },
      ],
    },
    {
      number: 3,
      title: "bread riddles",
      time: "10–15 minutes",
      concept: "Children identify food using clues.",
      materials: [
        "Picture cards of chapati, loaf, bun, toast.",
        "Optional playdough bread models from the previous activity.",
      ],
      setup: "Place picture cards face up where children can see them.",
      howToConduct: [
        "Say: 'I will give you clues. You have to guess the bread.'",
        "Read one clue at a time: 'I am round and flat. I puff on the pan.' / 'I am long and sliced. I make sandwiches.' / 'I am small and soft. You can hold me in one hand.' / 'I pop up and become crunchy.'",
        "Children point to the answer or say it aloud.",
        "Optional: children make the described bread using playdough and show it.",
        "After each answer, ask: 'How did you know?'",
        "Let children create one simple clue: 'I am ___ and ___.'",
      ],
      prompts: [
        "What clue helped you?",
        "Can you describe your favourite bread?",
        "Is it soft, crunchy, round, or flat?",
      ],
      learningFocus: "Listening, reasoning, descriptive vocabulary, recall.",
    },
    {
      number: 4,
      title: "what comes next?",
      time: "10–15 minutes",
      concept: "Bread follows a sequence: seed → wheat → flour → dough → bread.",
      materials: [
        "5 picture cards: seed, wheat, flour, dough, bread.",
        "Table or floor space.",
        "Optional printed sequence strip.",
      ],
      setup: "Shuffle the cards before the activity.",
      howToConduct: [
        "Say: 'Bread has a journey. Let's put the journey in order.'",
        "Teacher first says all stages randomly: 'bread, dough, wheat, flour, seed.'",
        "Ask: 'Does wheat come first? Can bread come before dough? What comes before flour?'",
        "Spread the picture cards on the floor.",
        "Children arrange them in correct order: seed, wheat, flour, dough, bread.",
        "Say the full sequence together.",
        "Remove one card and ask: 'What is missing?'",
        "End by acting it out together: tiny seed, tall wheat, grinding, kneading, eating bread.",
      ],
      prompts: [
        "What happens after wheat?",
        "Can bread come before dough?",
        "What do we need to make dough?",
      ],
      learningFocus: "Sequencing, process thinking, memory, cause and effect.",
      images: [
        {
          src: "/wonderworld-book/projects/bread-4-what-comes-next.png",
          alt: "what comes next? — bread journey from wheat to bread",
        },
      ],
    },
    {
      number: 5,
      title: "sieve the wheat & stone",
      time: "10–15 minutes",
      concept: "Grains are cleaned by separating food from non-food items.",
      materials: [
        "Rice / wheat / lentils.",
        "Small pebbles or large beads.",
        "1 tray per group.",
        "2 small bowls: 'food' and 'not food'.",
        "Sieve, optional.",
      ],
      setup: "Mix grains with a few stones/beads in each tray.",
      howToConduct: [
        "Say: 'Before wheat becomes flour, farmers clean it. Let's help.'",
        "Show the mixed tray. Ask: 'Can we eat everything here?'",
        "Children pick out grains and stones/beads.",
        "Place grains in the 'food' bowl and stones/beads in the 'not food' bowl.",
        "Try again with a sieve if available.",
        "Compare: 'Was it easier with fingers or sieve?'",
        "End: 'Sorting helps us make food clean and safe.'",
      ],
      prompts: [
        "What belongs in the food bowl?",
        "What should we remove?",
        "How did you know?",
      ],
      learningFocus:
        "Sorting, observation, food safety, fine motor precision.",
    },
  ],
};

const CHEESE: Chapter = {
  number: 2,
  name: "say butter, say cheese",
  caption:
    "Some foods come from milk. Some pair well with cheese. Spreading and cutting build hand control. Memory builds the sandwich.",
  activities: [
    {
      number: 1,
      title: "make a pretend cheese",
      time: "10–15 minutes",
      concept: "Some foods pair well with cheese and some do not.",
      materials: [
        "Yellow playdough.",
        "Plastic fruits/vegetables or picture cards from an existing deck.",
        "2 sorting mats or bowls: 'yes with cheese' / 'not with cheese'.",
      ],
      setup:
        "Give each child or group one cheese piece and a mixed basket of foods/cards.",
      howToConduct: [
        "Say: 'We are making pretend cheese. What tastes good with cheese?'",
        "Children make one small cheese piece from playdough.",
        "Pick one item at a time. Ask: 'Would this taste good with cheese?'",
        "Children sort into two piles.",
        "Ask them to explain: 'I put tomato here because…'",
        "End by building one pretend cheese plate from the 'yes' pile.",
      ],
      prompts: [
        "Would cheese go with cucumber?",
        "Why did you put banana there?",
        "What would you add to a sandwich?",
      ],
      learningFocus:
        "Classification, food pairing, reasoning, expressive language.",
      images: [
        {
          src: "/wonderworld-book/projects/cheese-1-make-a-pretend-cheese.png",
          alt: "make a pretend cheese — children with giant cheese block and milk",
        },
      ],
    },
    {
      number: 2,
      title: "does it come from milk?",
      time: "10–15 minutes",
      concept: "Some foods are made from milk; some are not.",
      materials: [
        "Teacher-read food list.",
        "Optional: picture cards from existing deck.",
      ],
      setup: "Children sit in a circle with hands on knees.",
      howToConduct: [
        "Say: 'If the food comes from milk, clap. If it does not, keep your hands still.'",
        "Teacher slowly reads food names aloud.",
        "Pause after each word and let children respond.",
        "After a few rounds, ask: 'Why did we clap for butter?'",
        "Repeat faster once children understand the game.",
        "End by asking children to name one milk food.",
      ],
      prompts: [
        "Does paneer come from milk?",
        "Does banana come from milk?",
        "What else is made from milk?",
      ],
      learningFocus:
        "Categorisation, listening control, food source awareness.",
      images: [
        {
          src: "/wonderworld-book/projects/cheese-2-does-it-come-from-milk.png",
          alt: "does it come from milk? — food grid (milk, banana, paneer, butter, etc.)",
        },
      ],
    },
    {
      number: 3,
      title: "spread your butter",
      time: "10–15 minutes",
      concept: "Spreading needs pressure, control, and direction.",
      materials: [
        "Brown craft paper squares as toast.",
        "Small yellow playdough pieces as butter.",
        "Table mats.",
        "Optional child-safe spreaders.",
      ],
      setup: "Give each child one toast paper and one butter piece.",
      howToConduct: [
        "Say: 'This is your toast. This is your butter. Can you spread it all over?'",
        "Children place the butter in the centre of the toast.",
        "Ask them to spread using one finger only.",
        "Encourage them to move from middle to corners.",
        "Ask: 'Which corner is still empty?'",
        "Try again using thumb or child-safe spreader.",
        "Compare: 'Which tool/finger worked best?'",
      ],
      prompts: [
        "Can you reach the corner?",
        "Do you need to press softly or hard?",
        "Is your butter thick or thin?",
      ],
      learningFocus:
        "Fine motor control, spatial awareness, pressure control, problem-solving.",
    },
    {
      number: 4,
      title: "cut your cheese into pieces",
      time: "10–15 minutes",
      concept: "One whole can be divided into smaller parts.",
      materials: [
        "Yellow playdough.",
        "Clay tools or blunt plastic knives.",
        "Mat.",
      ],
      setup: "Give each child or group one flat playdough cheese block.",
      howToConduct: [
        "Say: 'We have one big cheese. Let's share it.'",
        "First cut into 2 pieces. Say: 'Now we have halves.'",
        "Cut again into 4. Say: 'Now we have quarters.'",
        "Cut some pieces into tiny cubes.",
        "Ask children to count after each cut.",
        "Compare: 'Are 4 pieces bigger or smaller than 2 pieces?'",
        "End: 'When we cut more, each piece becomes smaller.'",
      ],
      prompts: [
        "How many pieces now?",
        "Which piece is bigger?",
        "What happened when we cut again?",
      ],
      learningFocus:
        "Early fractions, counting, size comparison, hand control.",
      images: [
        {
          src: "/wonderworld-book/projects/cheese-4-cut-your-cheese.png",
          alt: "cut your cheese into pieces — 1 whole, 2 halves, 4 quarters, 8 wedges",
        },
      ],
    },
    {
      number: 5,
      title: "the cheese sandwich game",
      time: "10–15 minutes",
      concept: "Children build and remember a sequence.",
      materials: [
        "Picture cards for bread, cheese, vegetables and sandwich ingredients from existing deck.",
        "Optional DIY bread and cheese cards.",
      ],
      setup: "Children sit in a circle. Keep picture cards visible if using.",
      howToConduct: [
        "Say: 'I am making a cheese sandwich. What goes in it?'",
        "First child says one ingredient.",
        "Teacher repeats: 'Now I have cheese and tomato.'",
        "Next child adds another ingredient.",
        "Teacher repeats the full list each time.",
        "Continue for as long as children can remember.",
        "Use picture cards for support if needed.",
        "Ask: 'What was first? What was last?'",
      ],
      prompts: [
        "Can you remember the whole sandwich?",
        "What comes after tomato?",
        "What should we add next?",
      ],
      learningFocus:
        "Working memory, sequencing, food vocabulary, turn-taking.",
    },
  ],
};

const SALAD: Chapter = {
  number: 3,
  name: "salad days",
  caption:
    "Cutting changes pieces. Salads are rainbows. Some food grows above the soil, some below. Recipes follow an order. Children become food detectives.",
  activities: [
    {
      number: 1,
      title: "cut your tomato",
      time: "10–15 minutes",
      concept: "Cutting changes size and number of pieces.",
      materials: [
        "Red playdough.",
        "Clay tools or blunt plastic knives.",
        "Mat.",
      ],
      setup: "Give each child or group one red playdough tomato.",
      howToConduct: [
        "Say: 'Let's make a tomato and cut it in different ways.'",
        "Children roll a red playdough ball.",
        "Cut it into 2 halves. Count: 1, 2.",
        "Cut into 4 quarters. Count: 1, 2, 3, 4.",
        "Make thin slices.",
        "Make tiny cubes.",
        "Compare all forms: whole, half, quarter, slice, cube.",
        "End: 'Smaller pieces cook faster because heat reaches them quickly.'",
      ],
      prompts: [
        "Which has the smallest pieces?",
        "Which has the most pieces?",
        "What changed after cutting?",
      ],
      learningFocus:
        "Counting, comparison, early fractions, observation.",
      images: [
        {
          src: "/wonderworld-book/projects/salad-1-cut-your-tomato.png",
          alt: "cut your tomato — whole, halves, quarters, tiny cubes",
        },
      ],
    },
    {
      number: 2,
      title: "the rainbow tiffin",
      time: "10–15 minutes",
      concept: "Salads have different colours and food groups.",
      materials: [
        "Plastic/real food items or picture cards in different colours.",
        "Tiffin tray or 4-section mat.",
      ],
      setup: "Place mixed vegetables/fruits in a basket.",
      howToConduct: [
        "Say: 'A salad can be a rainbow. Let's make a rainbow tiffin.'",
        "Ask children to choose one red food. Place it in one section.",
        "Choose one green food. Place it in another section.",
        "Continue with orange and yellow.",
        "Count the colours together.",
        "Ask children to name each food and colour.",
        "Ask: 'Which colour is missing? Can we add it?'",
      ],
      prompts: [
        "Find something red.",
        "What colour is cucumber?",
        "How many colours are in your tiffin?",
      ],
      learningFocus:
        "Colour sorting, classification, counting, vocabulary.",
      images: [
        {
          src: "/wonderworld-book/projects/salad-2-rainbow-tiffin.png",
          alt: "the rainbow tiffin — 4-quadrant tiffin with red, yellow, green, orange",
        },
      ],
    },
    {
      number: 3,
      title: "above or below the soil?",
      time: "10–15 minutes",
      concept:
        "Some foods grow above the soil and some below.",
      materials: [
        "Picture cards or toy foods from existing deck.",
        "Brown paper sheet to show soil line.",
      ],
      setup:
        "Place the brown paper on the floor or table to create a soil line.",
      howToConduct: [
        "Say: 'Some foods grow above the soil. Some grow below. Let's sort them.'",
        "Pick one card at a time.",
        "Ask: 'Above or below?'",
        "Children place the card on the correct side of the brown paper.",
        "After each placement, ask children to explain their thinking.",
        "End by reviewing all items together.",
      ],
      prompts: [
        "Where does carrot grow?",
        "How do you know tomato grows above?",
        "Can you say: tomato grows above because…",
      ],
      learningFocus:
        "Classification, plant awareness, reasoning, oral explanation.",
      images: [
        {
          src: "/wonderworld-book/projects/salad-3-above-or-below.png",
          alt: "above or below the soil? — sorting foods by where they grow",
        },
      ],
    },
    {
      number: 4,
      title: "follow the salad recipe",
      time: "10–15 minutes",
      concept:
        "Recipes follow an order; order helps us make something correctly.",
      materials: [
        "Bowl or plate.",
        "Pretend or real salad ingredients.",
        "Spoon or tongs.",
      ],
      setup: "Arrange ingredients in separate bowls.",
      howToConduct: [
        "Say: 'A recipe tells us what to do first, next, and last.'",
        "Teacher gives each step verbally:",
        "Step 1 — add the base.",
        "Step 2 — add two vegetables.",
        "Step 3 — add one topping.",
        "Step 4 — mix gently.",
        "Ask: 'What did we add first? What did we add last?'",
        "Try a second round where children choose their own order, then compare.",
        "End: 'When we follow steps, we make a recipe.'",
      ],
      prompts: [
        "What comes first?",
        "What comes after vegetables?",
        "What happens if we mix before adding everything?",
      ],
      learningFocus:
        "Sequencing, following instructions, decision-making, process thinking.",
    },
    {
      number: 5,
      title: "the salad quiz",
      time: "10–15 minutes",
      concept:
        "Children classify foods by colour, texture, growing place, and category.",
      materials: [
        "Picture cards or toy foods from existing deck.",
        "Basket or tray.",
      ],
      setup: "Place all items in a tray where children can see them.",
      howToConduct: [
        "Say: 'Today we are food detectives. I will ask questions. You find the answer.'",
        "Round 1 — colour: 'Find something red. Find something green.'",
        "Round 2 — texture: 'Which is crunchy? Which is soft?'",
        "Round 3 — growing place: 'Which grows above the soil? Which grows below?'",
        "Round 4 — odd one out: place 3–4 cards together and ask: 'Which one does not belong?'",
        "Bonus: let children make their own quiz question for the teacher.",
      ],
      prompts: [
        "Why did you choose this?",
        "What is same about these two?",
        "What is different?",
      ],
      learningFocus:
        "Reasoning, comparison, categorisation, expressive language.",
      images: [
        {
          src: "/wonderworld-book/projects/salad-5-salad-quiz.png",
          alt: "the salad quiz — tiffin with tomatoes, cucumber, carrots",
        },
      ],
    },
  ],
};

const CHAPTERS = [BREAD, CHEESE, SALAD] as const;

// ─── Page renderers ──────────────────────────────────────────────

/**
 * WonderWorld cover — uses the actual activity-book cover image so
 * teachers see the same artwork as the printed book. Same component
 * is reused as the books-row thumbnail (size="thumb") and as the
 * full first page of the flipbook (size="full").
 */
export function WonderWorldCoverArt({
  size = "full",
}: {
  size?: "full" | "thumb";
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/wonderworld-book/cover.png"
        alt="the wonderworld book — what is in your tiffin?"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

function CoverPage() {
  return <WonderWorldCoverArt size="full" />;
}

function TocPage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        contents
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold lowercase leading-tight text-ink md:text-[26px]">
        three chapters · fifteen activities
      </h2>
      <ol className="mt-4 space-y-3 overflow-y-auto pr-2 scroll-visible">
        {CHAPTERS.map((c) => (
          <li key={c.name}>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              chapter {c.number}
            </p>
            <p className="mt-0.5 text-[14px] font-extrabold lowercase text-ink">
              {c.name}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {c.activities.map((a) => (
                <li
                  key={a.title}
                  className="flex items-baseline gap-2 text-[11.5px] leading-snug text-ink-muted"
                >
                  <span className="w-4 shrink-0 text-right font-bold text-brand-orange">
                    {a.number}.
                  </span>
                  <span className="flex-1">{a.title}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ChapterCoverPage({ chapter }: { chapter: Chapter }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-cream p-6 text-center md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        chapter {chapter.number}
      </p>
      <h3 className="mt-2 text-[26px] font-extrabold lowercase leading-tight text-ink md:text-[32px]">
        {chapter.name}
      </h3>
      <p className="mt-5 max-w-md text-[12.5px] leading-relaxed text-ink-muted md:text-[13.5px]">
        {chapter.caption}
      </p>
      <p className="mt-5 text-[10.5px] italic text-ink-subtle">
        {chapter.activities.length} activities
      </p>
    </div>
  );
}

function ActivityPage({
  chapterName,
  activity,
}: {
  chapterName: string;
  activity: Activity;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden bg-brand-cream p-5 md:p-7">
      <div>
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {chapterName} · activity {activity.number} · {activity.time}
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          {activity.title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scroll-visible">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          concept
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {activity.concept}
        </p>

        <Section label="materials needed" items={activity.materials} />

        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          teacher setup
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {activity.setup}
        </p>

        <p className="mt-4 text-[10px] font-bold tracking-normal text-brand-orange">
          how to conduct
        </p>
        <ol className="mt-1.5 space-y-1.5">
          {activity.howToConduct.map((s, i) => (
            <li
              key={s}
              className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[9px] font-extrabold text-brand-orange">
                {i + 1}
              </span>
              <span className="flex-1">{s}</span>
            </li>
          ))}
        </ol>

        <Section label="teacher prompts" items={activity.prompts} />

        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          learning focus
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {activity.learningFocus}
        </p>
      </div>
    </div>
  );
}

function Section({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        {label}
      </p>
      <ul className="mt-1.5 space-y-0.5">
        {items.map((i) => (
          <li key={i} className="text-[11.5px] leading-relaxed text-ink-muted">
            · {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Build pages ────────────────────────────────────────────────

/** Dedicated photo page so activity illustrations render full-bleed
 *  and aren't squeezed by the surrounding text card. */
function ActivityPhotoPage({
  chapterName,
  activity,
  image,
}: {
  chapterName: string;
  activity: Activity;
  image: ActivityImage;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div className="shrink-0 text-center">
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {chapterName} · activity {activity.number}
          {image.caption ? ` · ${image.caption}` : ""}
        </p>
        <h3 className="mt-1 text-[16px] font-extrabold lowercase leading-tight text-ink md:text-[18px]">
          {activity.title}
        </h3>
      </div>
      <div className="mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-brand-white p-2 ring-1 ring-ink/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}

function buildPages(): FlipbookPage[] {
  const pages: FlipbookPage[] = [];
  pages.push({ kind: "node", node: <CoverPage /> });
  pages.push({ kind: "node", node: <TocPage /> });
  for (const chapter of CHAPTERS) {
    pages.push({ kind: "node", node: <ChapterCoverPage chapter={chapter} /> });
    for (const activity of chapter.activities) {
      pages.push({
        kind: "node",
        node: (
          <ActivityPage chapterName={chapter.name} activity={activity} />
        ),
      });
      // Render one dedicated photo page per image so illustrations
      // appear at full size, not squeezed beside text.
      if (activity.images) {
        for (const image of activity.images) {
          pages.push({
            kind: "node",
            node: (
              <ActivityPhotoPage chapterName={chapter.name} activity={activity} image={image} />
            ),
          });
        }
      }
    }
  }
  return pages;
}

// ─── Modal ──────────────────────────────────────────────────────

export function WonderWorldBookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const pages = buildPages();

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-brand-orange px-4 py-3 text-white md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-white/80">
            teacher reference
          </p>
          <h2 className="truncate text-[18px] font-extrabold lowercase leading-tight md:text-[22px]">
            the wonderworld book · stem 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="close wonderworld book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              One book all year — bread, cheese, salad. 15 activities, each
              met twice across 30 sessions.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="wonderworld book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
