"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * NumbersGym — teacher reference book for STEM 3–5.
 *
 * Three level books — every child works in their personal gamebook
 * at their own level. A child moves to the next level when they
 * demonstrate the current level confidently across two independent
 * sessions.
 *
 * Each level book has 2 pages here:
 *   1. Table of contents — what children will work with at this level
 *   2. What children learn + how to use the book
 */

type Level = {
  number: 1 | 2 | 3;
  ageHint: string;
  goal: "connection" | "relationship" | "application";
  toc: { heading: string; items: string[] }[];
  introTitle: string;
  intro: string[];
  howToUseTime: string;
  beforeQ: string;
  duringQ: string;
  afterQ: string;
  closingNote: string;
};

const LEVEL_1: Level = {
  number: 1,
  ageHint: "ages 3–4 · or starting children",
  goal: "connection",
  toc: [
    {
      heading: "numbers and counting",
      items: [
        "counting objects from 1–10",
        "matching numbers (1–10) to quantities",
        "recognising quantities without counting (1–5)",
      ],
    },
    {
      heading: "position and direction",
      items: [
        "understanding in, on, under",
        "identifying objects facing the same direction",
      ],
    },
    {
      heading: "comparison and sorting",
      items: [
        "matching objects to numbers",
        "identifying filled vs empty",
        "grouping similar objects",
      ],
    },
    {
      heading: "order and sequence",
      items: [
        "arranging objects by size (small to big)",
        "sequencing everyday actions (1–4 steps)",
      ],
    },
    {
      heading: "visual reasoning",
      items: [
        "matching objects to shadows",
        "identifying shapes in real objects",
        "spotting similarities and differences",
      ],
    },
  ],
  introTitle: "how children learn with this book",
  intro: [
    "children at this stage learn by seeing, doing, and repeating.",
    "this book helps children:",
    "connect numbers to real objects",
    "understand simple relationships (more, less, same)",
    "notice patterns and visual differences",
    "begin organising what they see",
  ],
  howToUseTime: "do 1–2 pages a day · spend 15–20 minutes · sit with the child and talk through the page",
  beforeQ: "what do you see?",
  duringQ: "let the child try — avoid correcting immediately",
  afterQ: "how did you know?",
  closingNote: "the goal is not speed. the goal is understanding.",
};

const LEVEL_2: Level = {
  number: 2,
  ageHint: "ages 4–5 · or after level 1 mastery",
  goal: "relationship",
  toc: [
    {
      heading: "numbers and counting",
      items: [
        "counting forward from 1–20",
        "filling missing numbers within 1–20",
        "identifying before, after, and between numbers",
      ],
    },
    {
      heading: "grouping and quantity",
      items: [
        "grouping objects into sets",
        "counting objects in groups",
        "comparing quantities (more, less, equal)",
      ],
    },
    {
      heading: "ordering and measurement",
      items: [
        "arranging objects by size (smallest to largest)",
        "comparing length and height",
        "sequencing growth and change (4 steps)",
      ],
    },
    {
      heading: "patterns and logic",
      items: [
        "recognising and continuing patterns",
        "sorting objects using rules",
      ],
    },
    {
      heading: "data and interpretation",
      items: [
        "reading simple visual representations",
        "counting and comparing groups visually",
      ],
    },
  ],
  introTitle: "how children learn with this book",
  intro: [
    "children now begin to organise and compare what they see.",
    "this book helps children:",
    "understand how numbers relate to each other",
    "group and compare quantities",
    "follow sequences and patterns",
    "begin logical thinking",
  ],
  howToUseTime: "do 1–2 pages a day · allow 15–20 minutes · encourage the child to explain their thinking",
  beforeQ: "what is happening here?",
  duringQ: "let the child try different ways",
  afterQ: "why do you think this is correct?",
  closingNote: "if a page feels difficult, stay with it. understanding matters more than finishing.",
};

const LEVEL_3: Level = {
  number: 3,
  ageHint: "ages 5+ · or after level 2 mastery",
  goal: "application",
  toc: [
    {
      heading: "numbers and operations",
      items: [
        "addition within 10",
        "solving simple number sentences",
        "writing numbers in expanded form (tens and ones)",
      ],
    },
    {
      heading: "number structure",
      items: [
        "breaking numbers into tens and ones (up to 50)",
        "comparing numbers (greater than, less than, equal to)",
        "identifying odd and even numbers",
      ],
    },
    {
      heading: "grouping and counting",
      items: [
        "counting in groups (2s and 10s)",
        "finding totals using grouping",
      ],
    },
    {
      heading: "measurement and comparison",
      items: [
        "measuring length using non-standard units",
        "comparing height, size, and quantity",
      ],
    },
    {
      heading: "data and representation",
      items: [
        "reading and interpreting simple graphs",
        "drawing basic graphs from given data",
      ],
    },
    {
      heading: "shapes and space",
      items: [
        "identifying 2D shapes (circle, square, triangle, etc.)",
        "recognising sides and corners",
      ],
    },
  ],
  introTitle: "how children learn with this book",
  intro: [
    "children now begin to apply what they know.",
    "this book helps children:",
    "use numbers to solve problems",
    "understand how numbers are built",
    "compare, measure, and represent information",
    "explain their thinking",
  ],
  howToUseTime: "do 1–2 pages a day · allow 20 minutes · encourage independent thinking",
  beforeQ: "what do you think you need to do?",
  duringQ: "let the child attempt first",
  afterQ: "how did you solve this?",
  closingNote: "if a child struggles, revisit earlier concepts. confidence builds step by step.",
};

const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3];

// ─── Page renderers ──────────────────────────────────────────────

/**
 * NumbersGym cover — same JSX cover pattern as the other STEM books.
 * No printed activity book exists yet, so we use a styled cover with
 * number-themed sprinkles around the brand mark.
 */
export function NumbersGymCoverArt({
  size = "full",
}: {
  size?: "full" | "thumb";
}) {
  const isThumb = size === "thumb";
  return (
    <div
      className={
        isThumb
          ? "relative flex h-full w-full flex-col bg-brand-cream p-2"
          : "relative flex h-full w-full flex-col bg-brand-cream p-6 md:p-10"
      }
    >
      <div className="z-10">
        <p
          className={
            isThumb
              ? "text-[8px] font-extrabold lowercase tracking-tight text-brand-orange"
              : "text-[12px] font-extrabold lowercase tracking-tight text-brand-orange md:text-[14px]"
          }
        >
          openhouse
        </p>
        <p
          className={
            isThumb
              ? "mt-0.5 text-[6px] italic text-ink/55"
              : "mt-0.5 text-[9px] italic text-ink/55 md:text-[10px]"
          }
        >
          stem · learning hub
        </p>
      </div>
      <div className="relative my-auto flex flex-1 items-center justify-center">
        <div
          className={
            isThumb
              ? "relative flex aspect-square w-[80%] items-center justify-center"
              : "relative flex aspect-square w-[78%] max-w-[320px] items-center justify-center"
          }
        >
          <div
            className={
              isThumb
                ? "absolute inset-0 rounded-full border-[1.5px] border-dashed border-ink/55"
                : "absolute inset-0 rounded-full border-[2.5px] border-dashed border-ink/55"
            }
          />
          {/* Number-themed sprinkles */}
          <span aria-hidden className={isThumb ? "absolute -top-0.5 left-[26%] text-[8px]" : "absolute -top-1 left-[26%] text-[20px]"}>1</span>
          <span aria-hidden className={isThumb ? "absolute top-[14%] right-[10%] text-[7px]" : "absolute top-[14%] right-[10%] text-[18px]"}>2</span>
          <span aria-hidden className={isThumb ? "absolute right-[-3%] top-[44%] text-[7px]" : "absolute right-[-3%] top-[44%] text-[18px]"}>3</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[10%] right-[16%] text-[7px]" : "absolute bottom-[10%] right-[16%] text-[18px]"}>+</span>
          <span aria-hidden className={isThumb ? "absolute -bottom-0.5 left-[34%] text-[7px]" : "absolute -bottom-1 left-[34%] text-[18px]"}>=</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[18%] left-[-2%] text-[7px]" : "absolute bottom-[18%] left-[-2%] text-[18px]"}>◯</span>
          <span aria-hidden className={isThumb ? "absolute top-[22%] left-[-2%] text-[7px]" : "absolute top-[22%] left-[-2%] text-[18px]"}>△</span>
          <div
            className={
              isThumb
                ? "relative flex h-[58%] w-[58%] items-center justify-center rounded-full bg-brand-orange shadow-[0_2px_6px_rgba(242,100,61,0.35)]"
                : "relative flex h-[58%] w-[58%] items-center justify-center rounded-full bg-brand-orange shadow-[0_8px_24px_rgba(242,100,61,0.35)]"
            }
          >
            <span
              className={
                isThumb
                  ? "text-[16px] font-extrabold leading-none text-white"
                  : "text-[42px] font-extrabold leading-none text-white md:text-[52px]"
              }
            >
              oh.
            </span>
          </div>
        </div>
      </div>
      <div className="z-10 text-center">
        <h2
          className={
            isThumb
              ? "text-[10px] font-extrabold lowercase leading-tight text-ink"
              : "text-[26px] font-extrabold lowercase leading-tight text-ink md:text-[32px]"
          }
        >
          the numbersgym book
        </h2>
        {!isThumb && (
          <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-ink/70 md:text-[14px]">
            three levels · self-paced · 1–2 pages a day
          </p>
        )}
        <p
          className={
            isThumb
              ? "mt-1 text-[6px] font-bold lowercase tracking-tight text-ink/45"
              : "mt-6 text-[10px] font-bold lowercase tracking-tight text-ink/45"
          }
        >
          teacher reference
        </p>
      </div>
    </div>
  );
}

function CoverPage() {
  return <NumbersGymCoverArt size="full" />;
}

function HowItWorksPage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        how numbersgym works
      </p>
      <h3 className="mt-2 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
        three level books · one child, one book, one pace
      </h3>
      <ul className="mt-4 space-y-3 overflow-y-auto pr-1 scroll-visible">
        <li className="rounded-xl bg-brand-white p-3 ring-1 ring-ink/5">
          <p className="text-[12.5px] font-extrabold lowercase text-ink">
            every child works at their own level
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            Each child opens their own gamebook to where they left off. Age-based starting points:
          </p>
          <ul className="mt-1.5 space-y-0.5">
            <li className="text-[12px] leading-relaxed text-ink-muted">
              · <span className="font-semibold text-ink">3 year olds</span> start at Level 1.
            </li>
            <li className="text-[12px] leading-relaxed text-ink-muted">
              · <span className="font-semibold text-ink">4 year olds</span> start at Level 2.
            </li>
            <li className="text-[12px] leading-relaxed text-ink-muted">
              · <span className="font-semibold text-ink">5 year olds</span> start at Level 2 — transition to Level 3 once they're comfortable.
            </li>
          </ul>
        </li>
        <li className="rounded-xl bg-brand-white p-3 ring-1 ring-ink/5">
          <p className="text-[12.5px] font-extrabold lowercase text-ink">
            move up after two confident sessions
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            A child moves to the next level when they demonstrate the current level confidently across two independent sessions. The teacher records this in the Experience Book — no announcement, no celebration, no labelling. The next session, the child opens the next level book.
          </p>
        </li>
        <li className="rounded-xl bg-brand-white p-3 ring-1 ring-ink/5">
          <p className="text-[12.5px] font-extrabold lowercase text-ink">
            every page uses physical materials
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            Coloured tiles · threading beads · small balance scales · number track card · counters in two colours · sorting tray · crayons. The gamebook is a surface for thinking with objects — never a worksheet completed with a pencil alone.
          </p>
        </li>
      </ul>
    </div>
  );
}

function LevelTocPage({ level }: { level: Level }) {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div className="shrink-0">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          level {level.number} — table of contents
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          level {level.number} · {level.goal}
        </h3>
        <p className="mt-1 text-[11px] italic text-ink-muted">
          {level.ageHint}
        </p>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto pr-1 scroll-visible">
        <p className="text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
          in this book, children will work with:
        </p>
        <div className="mt-3 space-y-3">
          {level.toc.map((section) => (
            <div key={section.heading}>
              <p className="text-[10.5px] font-bold tracking-normal text-brand-orange">
                {section.heading}
              </p>
              <ul className="mt-1 space-y-0.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-[12px] leading-relaxed text-ink-muted"
                  >
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LevelHowToUsePage({ level }: { level: Level }) {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div className="shrink-0">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          level {level.number} · {level.introTitle}
        </p>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto pr-1 scroll-visible">
        <p className="text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]">
          {level.intro[0]}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]">
          {level.intro[1]}
        </p>
        <ul className="mt-1.5 space-y-0.5">
          {level.intro.slice(2).map((line) => (
            <li
              key={line}
              className="text-[12px] leading-relaxed text-ink-muted"
            >
              · {line}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[10.5px] font-bold tracking-normal text-brand-orange">
          how to use this book
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
          {level.howToUseTime}
        </p>

        <ol className="mt-3 space-y-2">
          <li className="rounded-lg bg-brand-white p-2.5 ring-1 ring-ink/5">
            <p className="text-[10.5px] font-bold lowercase text-brand-orange">
              before
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {level.beforeQ}
            </p>
          </li>
          <li className="rounded-lg bg-brand-white p-2.5 ring-1 ring-ink/5">
            <p className="text-[10.5px] font-bold lowercase text-brand-orange">
              during
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {level.duringQ}
            </p>
          </li>
          <li className="rounded-lg bg-brand-white p-2.5 ring-1 ring-ink/5">
            <p className="text-[10.5px] font-bold lowercase text-brand-orange">
              after
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">
              {level.afterQ}
            </p>
          </li>
        </ol>

        <p className="mt-4 rounded-xl bg-brand-orange/10 p-3 text-[10.5px] italic leading-relaxed text-ink-muted">
          {level.closingNote}
        </p>
      </div>
    </div>
  );
}

// ─── Build pages ────────────────────────────────────────────────

function buildPages(): FlipbookPage[] {
  const pages: FlipbookPage[] = [];
  pages.push({ kind: "node", node: <CoverPage /> });
  pages.push({ kind: "node", node: <HowItWorksPage /> });
  for (const level of LEVELS) {
    pages.push({ kind: "node", node: <LevelTocPage level={level} /> });
    pages.push({ kind: "node", node: <LevelHowToUsePage level={level} /> });
  }
  return pages;
}

// ─── Modal ──────────────────────────────────────────────────────

export function NumbersGymBookModal({
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
            the numbersgym book · stem 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="close numbersgym book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              Three level books — every child opens their own gamebook to
              where they left off, at their own pace.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="numbersgym book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
