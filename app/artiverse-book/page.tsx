"use client";

import Link from "next/link";
import { ImageFlipbook } from "@/components/ImageFlipbook";
import { ArtiverseChapters } from "@/components/ArtiverseChapters";
import { TeacherGate } from "@/components/TeacherGate";

/**
 * Artiverse book — a digital flipbook of all 12 Artiverse projects in the
 * Art & Design 3-5 programme. Pairs (Circles, Finger Painting, Sponge, Blow
 * & Splatter) include their day-2 spreads as separate pages so the teacher
 * can see both reference images.
 */
const ARTIVERSE_PAGES = [
  "/artiverse-book/01-accordion.png",
  "/artiverse-book/02-circles.png",
  "/artiverse-book/03-circles-day-2.png",
  "/artiverse-book/04-mosaic.png",
  "/artiverse-book/05-loops-and-chains.png",
  "/artiverse-book/06-doodling.png",
  "/artiverse-book/07-colouring.png",
  "/artiverse-book/08-mixing.png",
  "/artiverse-book/09-hand-printing.png",
  "/artiverse-book/10-finger-painting.png",
  "/artiverse-book/11-finger-painting-day-2.png",
  "/artiverse-book/12-sponge.png",
  "/artiverse-book/13-sponge-day-2.png",
  "/artiverse-book/14-qtip.png",
  "/artiverse-book/15-blow-splatter.png",
  "/artiverse-book/16-blow-splatter-day-2.png",
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

        <section className="bg-segment-yellow px-5 py-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-[12px] font-extrabold text-ink/50">oh.</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[30px]">
              the artiverse book
            </h1>
            <p className="mt-1 text-[12px] font-semibold text-ink/60">
              art &amp; design · ages 3–5
            </p>
            <p className="mt-3 max-w-md text-[12px] italic leading-relaxed text-ink/70">
              colourful papers, crayons, watercolour. twelve projects across
              the programme. each project runs across two sessions —
              children pick what to make and take the work home.
            </p>
          </div>
        </section>

        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ImageFlipbook
              pages={ARTIVERSE_PAGES}
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
