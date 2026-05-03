"use client";

import Link from "next/link";
import {
  ImageFlipbook,
  type FlipbookCaption,
  type FlipbookPage,
} from "@/components/ImageFlipbook";
import { ArtistotleChapters } from "@/components/ArtistotleChapters";
import { TeacherGate } from "@/components/TeacherGate";

/**
 * Artistotle book — a digital flipbook of the printed Artistotle book pages
 * used in the Art & Design 3-5 programme. Each Artistotle session sits in
 * one of these illustrator chapters (Eric Carle, Lois Ehlert, Taro Gomi).
 * Each page is captioned with its illustrator + project so the book reads
 * like a real book — image and text together.
 */
interface ArtistotlePage {
  src: string;
  caption: FlipbookCaption;
}

const ARTISTOTLE_PAGES: ArtistotlePage[] = [
  {
    src: "/artistotle-book/01-cover.png",
    caption: {
      eyebrow: "the artistotle book",
      title: "cover",
      description:
        "meet the illustrators. their characters, their palette, their style. then make in their spirit.",
    },
  },
  {
    src: "/artistotle-book/02-table-of-contents.png",
    caption: { eyebrow: "front matter", title: "table of contents" },
  },
  {
    src: "/artistotle-book/03-meet-pip.png",
    caption: {
      eyebrow: "front matter",
      title: "meet pip",
      description:
        "pip is the children's guide through the book — a small character who turns up across the chapters.",
    },
  },
  {
    src: "/artistotle-book/04-eric-carle-about.png",
    caption: {
      eyebrow: "illustrator 1",
      title: "eric carle · about",
      description:
        "big, bold, joyful. eric carle's collage characters are made from layers of hand-painted paper.",
    },
  },
  {
    src: "/artistotle-book/05-eric-carle-technique.png",
    caption: {
      eyebrow: "illustrator 1 · technique",
      title: "eric carle · technique spotlight",
      description:
        "texture papers · cut and torn shapes · layering big bright colour fields into a recognisable creature.",
    },
  },
  {
    src: "/artistotle-book/06-eric-carle-project-1-formatted.png",
    caption: {
      eyebrow: "illustrator 1 · project 1",
      title: "hungry caterpillar",
      description:
        "make a textured-paper caterpillar over 3 sessions. day 1 paint texture papers · day 2 cut shapes · day 3 build the caterpillar.",
    },
  },
  {
    src: "/artistotle-book/08-eric-carle-project-2.png",
    caption: {
      eyebrow: "illustrator 1 · project 2",
      title: "create your own world",
      description:
        "use your texture papers to build a full scene — fish, jellyfish, planets, rockets, trees. layered into a busy underwater or outer-space world.",
    },
  },
  {
    src: "/artistotle-book/09-lois-ehlert-cover.png",
    caption: {
      eyebrow: "illustrator 2",
      title: "lois ehlert · about",
      description:
        "geometry made warm. lois ehlert builds animals and plants from clean cut shapes — circles, triangles, semicircles.",
    },
  },
  {
    src: "/artistotle-book/10-lois-ehlert-project-1.png",
    caption: {
      eyebrow: "illustrator 2 · project 1",
      title: "colourful flower garden",
      description:
        "sponge-print bright flower circles and stack them into a tall garden over 3 sessions.",
    },
  },
  {
    src: "/artistotle-book/11-lois-ehlert-project-2-formatted.png",
    caption: {
      eyebrow: "illustrator 2 · project 2",
      title: "geometric animals",
      description:
        "cut coloured paper into circles, semicircles, triangles, and strips. combine them into a crab, a chick, an owl — animals built entirely from geometry.",
    },
  },
  {
    src: "/artistotle-book/13-taro-gomi-cover.png",
    caption: {
      eyebrow: "illustrator 3",
      title: "taro gomi · about",
      description:
        "loose, playful, alive. taro gomi draws people and places with simple lines and big personality. children learn to draw without worrying about perfection.",
    },
  },
  {
    src: "/artistotle-book/14-taro-gomi-about.png",
    caption: {
      eyebrow: "illustrator 3",
      title: "taro gomi · profile",
      description:
        "born in tokyo in 1945, gomi studied industrial design before turning to picture books. his minimal line style invites the child to fill in the rest.",
    },
  },
  {
    src: "/artistotle-book/15-taro-gomi-project-1.png",
    caption: {
      eyebrow: "illustrator 3 · project 1",
      title: "create your own characters",
      description:
        "draw a row of people you know — family, friends, anyone. day 1 outline · day 2 add more · day 3 colour and finish.",
    },
  },
  {
    src: "/artistotle-book/16-taro-gomi-project-2-formatted.png",
    caption: {
      eyebrow: "illustrator 3 · project 2",
      title: "my map",
      description:
        "draw places — home, school, park, shop — then connect them with roads and add details. day 1 places · day 2 colour · day 3 paint the roads.",
    },
  },
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
        <section className="px-3 pt-5 md:px-8 md:pt-7">
          <div className="mx-auto w-full max-w-3xl rounded-2xl bg-segment-yellow px-5 py-5 ring-1 ring-ink/5 md:px-7 md:py-6">
            <p className="text-[11px] font-extrabold text-ink/50">oh.</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink md:text-[28px]">
              the artistotle book
            </h1>
            <p className="mt-1 text-[12px] font-semibold text-ink/60">
              art &amp; design · ages 3–5
            </p>
            <p className="mt-3 text-[12px] italic leading-relaxed text-ink/75 md:text-[13px]">
              meet the illustrators. their characters, their palette, their
              style. then make something in their spirit.
            </p>
          </div>
        </section>

        {/* Flipbook */}
        <section className="bg-white px-3 py-6 md:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ImageFlipbook
              pages={ARTISTOTLE_PAGES.flatMap<FlipbookPage>((p) => [
                { kind: "image", src: p.src, alt: p.caption.title },
                { kind: "text", caption: p.caption },
              ])}
              altPrefix="artistotle book page"
            />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-[10px] italic text-ink-subtle">
            tap the edges or use the prev / next buttons. the book runs across
            artistotle days in the 3–5 programme.
          </p>
        </section>

        {/* Chapter notes — Eric Carle · Lois Ehlert · Taro Gomi */}
        <section className="bg-bg px-4 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-4 text-center">
              <p className="text-[11px] font-bold text-brand-orange">
                illustrator notes
              </p>
              <h2 className="mt-1 text-[20px] font-extrabold text-ink md:text-[24px]">
                three illustrators. six projects.
              </h2>
              <p className="mt-1 text-[12px] italic leading-relaxed text-ink-muted">
                why each illustrator works, and what every project builds.
              </p>
            </div>
            <ArtistotleChapters />
          </div>
        </section>
      </div>
    </TeacherGate>
  );
}
