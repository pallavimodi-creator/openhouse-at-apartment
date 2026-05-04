"use client";

import Link from "next/link";
import { ArtiverseFlipbook } from "@/components/ArtiverseFlipbook";
import { TeacherGate } from "@/components/TeacherGate";
import { getCurriculumProgramme } from "@/lib/content";

/**
 * Artiverse book — 8–12 art programme. Renders all artiverse units
 * as image + text spreads using the shared ArtiverseFlipbook component.
 */
export default function ArtiverseBook812Page() {
  const programme = getCurriculumProgramme("art-design-8-12");
  const units = programme?.artiverseUnits ?? [];

  return (
    <TeacherGate>
      <div className="flex flex-col">
        <div className="px-4 pt-3">
          <Link
            href="/art-design-8-12"
            className="text-[12px] font-bold text-brand-orange hover:underline"
          >
            ← art &amp; design · ages 8–12
          </Link>
        </div>

        {/* Title band */}
        <section className="px-3 pt-5 md:px-8 md:pt-7">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-segment-yellow px-5 py-5 ring-1 ring-ink/5 md:px-7 md:py-6">
            <p className="text-[11px] font-extrabold text-ink/50">oh.</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[28px]">
              the artiverse book
            </h1>
            <p className="mt-1 text-[12px] font-semibold text-ink/60">
              art &amp; design · ages 8–12
            </p>
            <p className="mt-3 text-[12px] italic leading-relaxed text-ink/75 md:text-[13px]">
              {units.length} units across the year. Each pairs a medium with a focused technique and a
              subject the child makes their own. The picture in the book is a reference only; children
              pick their own subject.
            </p>
          </div>
        </section>

        {/* Flipbook */}
        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ArtiverseFlipbook units={units} altPrefix="artiverse 8-12 book page" />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-[10px] italic text-ink-subtle">
            Tap the edges or use the prev / next buttons. Each spread shows the unit
            reference image on the left and the technique brief on the right.
          </p>
        </section>
      </div>
    </TeacherGate>
  );
}
