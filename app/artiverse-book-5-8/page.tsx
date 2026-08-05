"use client";

import Link from "next/link";
import { TeacherGate } from "@/components/TeacherGate";
import { getCurriculumProgramme } from "@/lib/content";

const PDF_URL = "/artiverse/art-5-8.pdf";

/**
 * Artiverse book — 5–8 art programme. Renders the teacher-reference PDF
 * (the same book plugged on both sites): the at-apartment sequence first,
 * then the newer artworks, with the "why these artworks — in this order"
 * theory page. How many sessions each artwork runs is a teacher decision.
 */
export default function ArtiverseBook58Page() {
  const programme = getCurriculumProgramme("art-design-5-8");
  const units = programme?.artiverseUnits ?? [];

  return (
    <TeacherGate>
      <div className="flex flex-col">
        <div className="px-4 pt-3">
          <Link
            href="/art-design-5-8"
            className="text-[12px] font-bold text-brand-orange hover:underline"
          >
            ← art &amp; design · ages 5–8
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
              art &amp; design · ages 5–8
            </p>
            <p className="mt-3 text-[12px] italic leading-relaxed text-ink/75 md:text-[13px]">
              Tempera/watercolour, oil pastel, acrylic and mixed media. The core sequence first, then
              the newer artworks — each pairs a medium with a focused technique and a subject the child
              makes their own. Opens with a &ldquo;why these artworks — in this order&rdquo; page.
            </p>
            <p className="mt-2 text-[12px] font-semibold leading-relaxed text-ink/70 md:text-[13px]">
              How many sessions each artwork runs is up to the teacher. Adapt the pace to your group.
            </p>
          </div>
        </section>

        {/* PDF viewer — browser-native, works everywhere */}
        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="overflow-hidden rounded-2xl bg-brand-cream ring-1 ring-ink/10 shadow-[0_8px_30px_rgba(44,43,40,0.12)]">
              <iframe
                src={PDF_URL}
                title="artiverse book · ages 5–8"
                className="block h-[75vh] w-full min-h-[520px] md:h-[85vh]"
              />
            </div>
            <p className="mx-auto mt-4 max-w-md text-center text-[10px] italic text-ink-subtle">
              {units.length} units in the programme. Scroll the book above; each artwork has a teacher-reference
              page and the artwork itself.
            </p>
          </div>
        </section>
      </div>
    </TeacherGate>
  );
}
