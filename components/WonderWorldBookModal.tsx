"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * WonderWorld — educator reference book for STEM 3–5.
 *
 * The Little Kitchen kit — one kitchen kit, four repeatable games that grow
 * with the child (sort & guess · cooking · restaurant · recipe development).
 * Each game is played two ways — easy (3–4) and medium (4–5). No scores, no
 * winners — the educator reads the play as observation. Rebuilt from the
 * lexagod little_kitchen game design (replaces the earlier tiffin workbook).
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

const GAMES: Chapter = {
  number: 1,
  name: "the four games",
  caption:
    "One kit, four games that grow with the child. Each game is played two ways — easy (3–4) and medium (4–5). Same pieces, same skills — only how much of the recipe is used, and what the educator asks for, changes.",
  activities: [
    {
      number: 1,
      title: "game 1 · sort & guess",
      time: "15–20 minutes",
      concept:
        "Sort foods by a true rule, then guess a hidden one by ruling out. Mainly builds logic (and curiosity).",
      materials: [
        "Fruit cards (10) + vegetable cards (10).",
        "The cooking mat's number track (1–20).",
      ],
      setup:
        "Lay the food cards out face-up. A rule must be TRUE — underground foods are potato, carrot, radish, onion, beetroot; everything else grows above ground. Never sort by colour (some foods come in more than one).",
      howToConduct: [
        "Name a true rule — fruit / vegetable, or grows underground / above ground (by the part we eat).",
        "Sort the cards into two piles.",
        "Count each pile and find its number on the mat's track — which has more?",
        "One child (the hider) hides a card and gives clues in their own words: 'it's long, you peel it, it grows underground'.",
        "The others (the guessers) turn ruled-out cards face-down; before the last flip, re-check the face-down cards against the clues.",
        "A guesser names the card and says the 'because…'. The round ends when the hidden card is named.",
      ],
      prompts: [
        "Easy (3–4): one rule, teacher-named; sort and count one pile; skip the guess.",
        "Medium (4–5): the child chooses the rule, compares both piles, then gives free spoken clues for the guess.",
        "Which pile has more? How did you know?",
      ],
      learningFocus:
        "Logic (sorts → reasons), number sense (count, compare, sorting & data), curiosity (predicts → investigates).",
    },
    {
      number: 2,
      title: "game 2 · cooking",
      time: "15–20 minutes",
      concept:
        "Cook a dish by counting with dots and putting the steps in order. Mainly builds number sense (and problem solving).",
      materials: [
        "Dish / recipe cards (18 dishes, ★ and ★★ rings).",
        "Ingredient + action cards.",
        "The cooking mat (number track + ½ / ¼ plate + glass).",
        "Play-dough + number tokens (1–10).",
      ],
      setup:
        "Pick a dish whose ★ stars match the age — ★ for 3–4, ★★ for 4–5. Keep one play-dough portion per dot (check the gaps).",
      howToConduct: [
        "Pick a dish card and turn it over to the recipe (count-dots, a ½-glass, numbered steps).",
        "Place one play-dough portion per dot and find the total on the mat's number track.",
        "At 4–5: combine the two dot-groups, place a number token for the total, then check it against the track — make it, then verify.",
        "Lay the action cards in a row to match the numbered steps.",
        "Cook on the plate — mould the dish, halve on the ½ / ¼ lines, fill the glass to ½.",
        "Check and serve — re-do any step that misfired.",
      ],
      prompts: [
        "Easy (3–4): a 2–3 ingredient ★ dish (fruit bowl, lassi); count to ~10, one portion per dot.",
        "Medium (4–5): a 3–4 ingredient ★★ dish; add two dot-groups within 10 and halve on the ½ line.",
        "How many did you count? Is the glass filled to half?",
      ],
      learningFocus:
        "Number sense (count → add within 10 → measure), problem solving (tries → solves), logic (ordering the steps).",
    },
    {
      number: 3,
      title: "game 3 · restaurant",
      time: "15–20 minutes",
      concept:
        "Run a café off the menu and invoice — order, cook, bill and make change. Mainly builds number sense / money (and problem solving).",
      materials: [
        "Two cooking mats (one flipped to its menu | invoice back).",
        "Dish cards.",
        "Pretend money — ₹1 · ₹2 · ₹5 · ₹10.",
      ],
      setup:
        "Flip one mat to its menu | invoice back; roles are customer · chef · cashier. With two children, one is both chef and cashier — the two mats let that child cook on mat-A and bill on mat-B without flipping.",
      howToConduct: [
        "The customer orders off the menu by pointing, and sets the table.",
        "The chef cooks the ordered dish on mat-A's front (as in cooking).",
        "Bill by token — drop each dish's price-coin into an invoice row and stack the coins in the total box.",
        "Pay, then put the change in the change box.",
      ],
      prompts: [
        "Easy (3–4): order, cook and serve; count the plates — no money.",
        "Medium (4–5): menu ₹1–₹10; pay and make change within 10 — a ₹6 bill paid with ₹10 gives ₹4 change.",
        "How much is the bill? How much change is left?",
      ],
      learningFocus:
        "Number sense (money, +/− within 10), problem solving (solves), curiosity (role-play).",
    },
    {
      number: 4,
      title: "game 4 · recipe development",
      time: "15–20 minutes",
      concept:
        "Invent a dish from the existing cards, predict it, then say why it works. Reaches the ★ of curiosity, problem solving and logic.",
      materials: [
        "Ingredient + action cards.",
        "The small tray + the cooking mat.",
        "Play-dough.",
      ],
      setup:
        "No recipe card — the child chooses ingredients into the tray (the tray caps the pile). The teacher notes the 'because' in their own notebook; there's no card to make.",
      howToConduct: [
        "Choose ingredients into the tray.",
        "Lay your own action cards in order toward a goal ('make it drinkable in the glass').",
        "Predict an observable — colour, count, pieces, halves or shape ('it'll be 3 yellow pieces').",
        "Make it on the plate, name it, and check — did the prediction hold?",
        "Say the 'because…'; the teacher notes it.",
      ],
      prompts: [
        "Easy (3–4): combine 2–3 cards and name it; the teacher prompts one sense.",
        "Medium (4–5): order the actions, predict an observable and check it, then justify the 'because'.",
        "What do you think will happen? Did it happen?",
      ],
      learningFocus:
        "Curiosity (predicts → investigates), problem solving (tries → solves), logic (reasons).",
    },
  ],
};

const CHAPTERS = [GAMES] as const;

// ─── Page renderers ──────────────────────────────────────────────

/**
 * Little Kitchen cover — a text cover in the openhouse register (cream +
 * coral). Reused as the books-row thumbnail (size="thumb") and as the full
 * first page of the flipbook (size="full").
 */
export function WonderWorldCoverArt({
  size = "full",
}: {
  size?: "full" | "thumb";
}) {
  const isThumb = size === "thumb";
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-cream p-4 text-center">
      <p
        className={
          isThumb
            ? "text-[8px] font-bold tracking-normal text-brand-orange"
            : "text-[11px] font-bold tracking-normal text-brand-orange"
        }
      >
        stem · ages 3–5
      </p>
      <h1
        className={
          isThumb
            ? "mt-1 text-[16px] font-extrabold lowercase leading-none text-ink"
            : "mt-2 text-[40px] font-extrabold lowercase leading-none text-ink md:text-[52px]"
        }
      >
        little
        <br />
        kitchen
      </h1>
      <p
        className={
          isThumb
            ? "mt-1.5 text-[7px] italic leading-tight text-ink-muted"
            : "mt-4 max-w-xs text-[12px] italic leading-relaxed text-ink-muted md:text-[13px]"
        }
      >
        a counting · sorting · money · pretend-play kit — one kit, four games
      </p>
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
        one kit · four games
      </h2>
      <ol className="mt-4 space-y-3 overflow-y-auto pr-2 scroll-visible">
        <li>
          <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
            start here
          </p>
          <p className="mt-0.5 text-[14px] font-extrabold lowercase text-ink">
            what&apos;s in the box &amp; how it works
          </p>
        </li>
        {CHAPTERS.map((c) => (
          <li key={c.name}>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              the games
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

/** The kit intro page — what's in the box, how counting works, how to read a
 *  recipe, the dishes, and how to read the play. */
function KitPage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div>
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          the little kitchen kit
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          what&apos;s in the box &amp; how it works
        </h3>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto pr-1 scroll-visible">
        <Section
          label="what's in the box"
          items={[
            "Fruit cards (10) + vegetable cards (10); dairy cards (4) + pantry cards (6).",
            "Action cards — stir, pour, scoop, heat, cool, cut, mould (pretend only).",
            "Dish / recipe cards — 18 dishes, ring-bound by tier: ★ (for 3–4) and ★★ (for 4–5).",
            "Two A3 cooking mats — front: work-plate (½ & ¼ lines) + a glass + a number track 1–20; back: menu | invoice.",
            "Number tokens (1–10), a small tray, play-dough + clay tools, and pretend money ₹1 · ₹2 · ₹5 · ₹10.",
          ]}
        />
        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          how counting works (dots)
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          Quantity is always shown as a matching number of dots. The child
          places one play-dough portion per dot (level a), then finds the number
          on the mat&apos;s track. To add (level b), combine two dot-groups,
          count them all, and place the number token for the total.
        </p>
        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          how to read a recipe — no words
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          Pick a dish by its front picture, then turn it over: the dots tell you
          how many of each ingredient (one portion per dot), a ½-glass means
          fill to half, and the numbered little pictures show the order of the
          actions.
        </p>
        <Section
          label="the dishes"
          items={[
            "★ dishes, for 3–4 (just count): fruit bowl, fruit salad, lassi, banana milkshake, orange juice, mashed potato, carrot salad, mango shrikhand, paneer cubes.",
            "★★ dishes, for 4–5 (count and add): vegetable salad, mixed-fruit lassi, vegetable soup, vegetable rice, aloo sabzi, palak paneer, paneer bhurji, fruity milk bowl, cauliflower fry.",
            "18 dishes in all — a class can cook for months without repeating (and re-cooking a favourite is good practice).",
          ]}
        />
        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          reading the play — no scores
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          Watch the move, not the answer. Assisted = progressing; unaided and
          repeated = secured. &quot;Not yet&quot; is the only fail state — about
          timing, not the child. Place by observation, not age.
        </p>
      </div>
    </div>
  );
}

function ChapterCoverPage({ chapter }: { chapter: Chapter }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-cream p-6 text-center md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        the games
      </p>
      <h3 className="mt-2 text-[26px] font-extrabold lowercase leading-tight text-ink md:text-[32px]">
        {chapter.name}
      </h3>
      <p className="mt-5 max-w-md text-[12.5px] leading-relaxed text-ink-muted md:text-[13.5px]">
        {chapter.caption}
      </p>
      <p className="mt-5 text-[10.5px] italic text-ink-subtle">
        {chapter.activities.length} games · played easy (3–4) and medium (4–5)
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
          {chapterName} · {activity.time}
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          {activity.title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scroll-visible">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          what it is
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {activity.concept}
        </p>

        <Section label="what you need" items={activity.materials} />

        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          before you start
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted">
          {activity.setup}
        </p>

        <p className="mt-4 text-[10px] font-bold tracking-normal text-brand-orange">
          how to play
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

        <Section label="two ways to play &amp; prompts" items={activity.prompts} />

        <p className="mt-3 text-[10px] font-bold tracking-normal text-brand-orange">
          what it builds
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
          {chapterName}
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
  pages.push({ kind: "node", node: <KitPage /> });
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
            educator reference
          </p>
          <h2 className="truncate text-[18px] font-extrabold lowercase leading-tight md:text-[22px]">
            the little kitchen book · stem 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="close little kitchen book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              One kit, four games that grow with the child — played easy (3–4)
              and medium (4–5). No scores, no winners.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="little kitchen book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
