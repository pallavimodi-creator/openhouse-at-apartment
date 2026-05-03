"use client";

import Link from "next/link";
import { ImageFlipbook, type FlipbookCaption } from "@/components/ImageFlipbook";
import { ArtiverseChapters } from "@/components/ArtiverseChapters";
import { TeacherGate } from "@/components/TeacherGate";

/**
 * Artiverse book — a digital flipbook of all 12 Artiverse projects in the
 * Art & Design 3-5 programme. Pairs (Circles, Finger Painting, Sponge, Blow
 * & Splatter) include their day-2 spreads as separate pages so the teacher
 * can see both reference images. Each page is captioned with its chapter
 * + project + a one-line build description so the book reads like a real
 * book — image and text together.
 */
interface ArtiversePage {
  src: string;
  caption: FlipbookCaption;
}

const ARTIVERSE_PAGES: ArtiversePage[] = [
  {
    src: "/artiverse-book/01-accordion.png",
    caption: {
      eyebrow: "paper · project 1",
      title: "accordions",
      description:
        "fold paper back and forth to make and transform forms of their choice — building coordination, control, and spatial awareness.",
    },
  },
  {
    src: "/artiverse-book/02-circles.png",
    caption: {
      eyebrow: "paper · project 2 · day 1",
      title: "circles",
      description:
        "trace, stamp, or draw circles to build their own compositions — developing shape control and intentional mark-making.",
    },
  },
  {
    src: "/artiverse-book/03-circles-day-2.png",
    caption: {
      eyebrow: "paper · project 2 · day 2",
      title: "circles, continued",
      description:
        "extend the circles project — add more characters and details to the arrangement.",
    },
  },
  {
    src: "/artiverse-book/04-mosaic.png",
    caption: {
      eyebrow: "paper · project 3",
      title: "mosaics",
      description:
        "place small pieces to create patterns or images — building precision, planning, and colour selection.",
    },
  },
  {
    src: "/artiverse-book/05-loops-and-chains.png",
    caption: {
      eyebrow: "paper · project 4",
      title: "loops & chains",
      description:
        "link materials to create chains or forms of their choice — building finger control, sequencing, and repetition.",
    },
  },
  {
    src: "/artiverse-book/06-doodling.png",
    caption: {
      eyebrow: "crayon · project 1",
      title: "doodling",
      description:
        "make free marks to create their own drawings — building grip control and mark confidence.",
    },
  },
  {
    src: "/artiverse-book/07-colouring.png",
    caption: {
      eyebrow: "crayon · project 2",
      title: "colouring",
      description:
        "fill shapes with chosen colours (using references) — building control within space and colour recognition.",
    },
  },
  {
    src: "/artiverse-book/08-mixing.png",
    caption: {
      eyebrow: "crayon · project 3",
      title: "mixing",
      description:
        "layer colours while making their own artwork — building colour awareness and early mixing understanding.",
    },
  },
  {
    src: "/artiverse-book/09-hand-printing.png",
    caption: {
      eyebrow: "paint · project 1",
      title: "hand painting",
      description:
        "use hands to print and create their own images — building sensory comfort and whole-hand control.",
    },
  },
  {
    src: "/artiverse-book/10-finger-painting.png",
    caption: {
      eyebrow: "paint · project 2 · day 1",
      title: "finger painting",
      description:
        "use fingers to spread and create — building finger control and direct interaction with colour.",
    },
  },
  {
    src: "/artiverse-book/11-finger-painting-day-2.png",
    caption: {
      eyebrow: "paint · project 2 · day 2",
      title: "finger painting, continued",
      description:
        "second-day spread — finish the greeting card or extend the pattern.",
    },
  },
  {
    src: "/artiverse-book/12-sponge.png",
    caption: {
      eyebrow: "paint · project 3 · day 1",
      title: "sponge painting",
      description:
        "dab and press to create textures and images — building pressure control and pattern awareness.",
    },
  },
  {
    src: "/artiverse-book/13-sponge-day-2.png",
    caption: {
      eyebrow: "paint · project 3 · day 2",
      title: "sponge painting, continued",
      description:
        "build up the textures across a second sitting — layering colour for depth.",
    },
  },
  {
    src: "/artiverse-book/14-qtip.png",
    caption: {
      eyebrow: "paint · project 4",
      title: "q-tips painting",
      description:
        "dot and detail to build images — strengthening precision and repeated pattern-making.",
    },
  },
  {
    src: "/artiverse-book/15-blow-splatter.png",
    caption: {
      eyebrow: "paint · project 5 · day 1",
      title: "blow & splatter",
      description:
        "blow or splatter paint and build images from the result — exploring cause-effect and creative interpretation.",
    },
  },
  {
    src: "/artiverse-book/16-blow-splatter-day-2.png",
    caption: {
      eyebrow: "paint · project 5 · day 2",
      title: "blow & splatter, continued",
      description:
        "second sitting on blow & splatter — refine the splatters into a finished piece.",
    },
  },
];

export default function ArtiverseBookPage() {
  return (
    <TeacherGate>
      <div className="flex flex-col">
        <div className="px-4 pt-3">
          <Link
            href="/art-design-3-5"
            className="text-[12px] font-bold text-brand-orange hover:underline"
          >
            ← art &amp; design · ages 3–5
          </Link>
        </div>

        <section className="px-3 pt-5 md:px-8 md:pt-7">
          <div className="mx-auto w-full max-w-3xl rounded-2xl bg-segment-yellow px-5 py-5 ring-1 ring-ink/5 md:px-7 md:py-6">
            <p className="text-[11px] font-extrabold text-ink/50">oh.</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[28px]">
              the artiverse book
            </h1>
            <p className="mt-1 text-[12px] font-semibold text-ink/60">
              art &amp; design · ages 3–5
            </p>
            <p className="mt-3 text-[12px] italic leading-relaxed text-ink/75 md:text-[13px]">
              colourful papers, crayons, watercolour. twelve projects across
              the programme — each runs over two sessions, children pick
              what to make and take the work home.
            </p>
          </div>
        </section>

        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ImageFlipbook
              pages={ARTIVERSE_PAGES.map((p) => p.src)}
              captions={ARTIVERSE_PAGES.map((p) => p.caption)}
              altPrefix="artiverse book page"
            />
          </div>
        </section>

        {/* Chapter notes — Paper · Crayon · Paint */}
        <section className="bg-bg px-4 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-4 text-center">
              <p className="text-[11px] font-bold text-brand-orange">
                chapter notes
              </p>
              <h2 className="mt-1 text-[20px] font-extrabold text-ink md:text-[24px]">
                three media families. twelve projects.
              </h2>
              <p className="mt-1 text-[12px] italic leading-relaxed text-ink-muted">
                why each chapter works, and what every project builds.
              </p>
            </div>
            <ArtiverseChapters />
          </div>
        </section>
      </div>
    </TeacherGate>
  );
}
