"use client";

import Link from "next/link";
import { ImageFlipbook } from "@/components/ImageFlipbook";
import { TeacherGate } from "@/components/TeacherGate";

/**
 * Artistotle book — a digital flipbook of the printed Artistotle book pages
 * used in the Art & Design 3-5 programme. Each Artistotle session sits in
 * one of these illustrator chapters (Eric Carle, Lois Ehlert, Taro Gomi).
 */
const ARTISTOTLE_PAGES = [
  "/artistotle-book/01-cover.png",
  "/artistotle-book/02-table-of-contents.png",
  "/artistotle-book/03-meet-pip.png",
  "/artistotle-book/04-eric-carle-about.png",
  "/artistotle-book/05-eric-carle-technique.png",
  "/artistotle-book/06-eric-carle-project-1-formatted.png",
  "/artistotle-book/08-eric-carle-project-2.png",
  "/artistotle-book/09-lois-ehlert-cover.png",
  "/artistotle-book/10-lois-ehlert-project-1.png",
  "/artistotle-book/11-lois-ehlert-project-2-formatted.png",
  "/artistotle-book/12-lois-ehlert-project-2-process.png",
  "/artistotle-book/13-taro-gomi-cover.png",
  "/artistotle-book/14-taro-gomi-about.png",
  "/artistotle-book/15-taro-gomi-project-1.png",
  "/artistotle-book/16-taro-gomi-project-2-formatted.png",
];

export default function ArtistotleBookPage() {
  return (
    <TeacherGate>
      <div className="flex flex-col">
        {/* Back link */}
        <div className="px-4 pt-3">
          <Link
            href="/art-design-3-5"
            className="text-[12px] font-bold text-brand-orange hover:underline"
          >
            ← art &amp; design · ages 3–5
          </Link>
        </div>

        {/* Title band */}
        <section className="bg-[#F5D547] px-5 py-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-[12px] font-extrabold text-ink/50">oh.</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[30px]">
              the artistotle book
            </h1>
            <p className="mt-1 text-[12px] font-semibold text-ink/60">
              art &amp; design · ages 3–5
            </p>
            <p className="mt-3 max-w-md text-[12px] italic leading-relaxed text-ink/70">
              meet the illustrators. their characters, their palette, their
              style. then make something in their spirit.
            </p>
          </div>
        </section>

        {/* Flipbook */}
        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ImageFlipbook
              pages={ARTISTOTLE_PAGES}
              altPrefix="artistotle book page"
            />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-[10px] italic text-ink-subtle">
            tap the edges or use the prev / next buttons. the book runs across
            artistotle days in the 3–5 programme.
          </p>
        </section>
      </div>
    </TeacherGate>
  );
}
