"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * Artiverse book — structured as a real book, lowercase labels per
 * brand. Cover + TOC + chapter covers are built in JSX so a teacher
 * can flip through the whole book end-to-end while project photos are
 * being prepared. When a project photo lands, drop it in
 * /public/artiverse-book and add `image: { src, alt }` to the project
 * entry below — the placeholder flips to a full photo page.
 *
 * Order:
 *   1. cover                       — built
 *   2. table of contents           — built
 *   3. paper · chapter cover       — built
 *   4–8.   5 paper projects        — text + photo placeholder
 *   9. crayons · chapter cover     — built
 *   10–16. 7 crayon projects       — text + photo placeholder
 *   17. paint · chapter cover      — built
 *   18–21. 4 paint projects        — text + photo placeholder
 */

type ProjectImage = { src: string; alt: string };
type ProjectVideo = { youtubeId: string; title: string };
type ProjectEntry = {
  number: number;
  title: string;
  artworks: number;
  /** Materials needed to make the artwork — extracted from how-to-conduct. */
  materials?: string[];
  /** Legacy field kept so existing projects don't break — surfaced as 'materials' in the UI. */
  prep?: string[];
  steps: string[];
  image?: ProjectImage;
  /**
   * Optional gallery — when more than one finished example exists for
   * a project (e.g. doodling produces 2 worksheets, mixing-shapes
   * produces 2 examples). Use `image:` for single-photo projects and
   * `images:` for multi-photo projects.
   */
  images?: ProjectImage[];
  /**
   * Optional YouTube videos to embed beside the steps — e.g. for
   * origami where a video walkthrough is more useful than a finished
   * photo. Pass the video id (the bit after `v=` in the URL).
   */
  videos?: ProjectVideo[];
};

type Chapter = {
  number: number;
  name: string;
  why: string;
  guidelines: string[];
  totalArtworks: number;
  projects: ProjectEntry[];
};

const PAPER: Chapter = {
  number: 1,
  name: "paper folding & sticking",
  why: "Paper helps children build finger strength and understand shape, space, and construction. In this chapter children learn folding and sticking — they do not cut. The teacher pre-cuts every paper piece before the session.",
  guidelines: [
    "Teacher pre-cuts every piece before class. Children never use scissors here.",
    "Children fold and stick — those are the two skills this chapter builds.",
    "Animal-face stencils are provided in the kit — give them to children as needed.",
    "Use coloured A4 paper as the background sheet for every project.",
    "Allow uneven and imperfect work. Don't fix.",
  ],
  totalArtworks: 10,
  projects: [
    {
      number: 1,
      title: "accordion folding",
      artworks: 2,
      materials: [
        "Coloured A4 paper as the background sheet",
        "Pre-cut paper strips in mixed colours (5–10 cm thick) — teacher cuts before class",
        "Animal face stencils (provided in the kit)",
        "Glue sticks",
        "Crayons or markers for details",
      ],
      steps: [
        "Show folding back and forth — model one accordion fold slowly.",
        "Help children press folds with the heel of their hand.",
        "Children stick the folded strip onto the coloured A4 background as a body.",
        "Trace an animal face from the stencil and stick it on top.",
        "Decorate with crayons — eyes, legs, patterns.",
      ],
      image: {
        src: "/artiverse-book/paper/accordion-1.png",
        alt: "accordion giraffe — children's work",
      },
    },
    {
      number: 2,
      title: "circles folding",
      artworks: 3,
      materials: [
        "Coloured A4 paper as the background sheet",
        "Pre-cut paper circles in different sizes and colours — teacher cuts before class",
        "Animal face stencils (provided in the kit)",
        "Glue sticks",
        "Crayons or markers for details",
      ],
      steps: [
        "Show how to fold a circle into a half (a flap) — model on a large circle.",
        "Children fold circles into halves or flaps.",
        "Stick some parts flat onto the A4 background, leave some flaps open so the artwork has dimension.",
        "Arrange circles to form objects — a fish, a bird, a flower, a face.",
        "Trace face details from the stencil and add with crayons.",
      ],
      image: {
        src: "/artiverse-book/paper/circles-1.png",
        alt: "circles folding artwork — children's work",
      },
    },
    {
      number: 3,
      title: "mosaics",
      artworks: 2,
      materials: [
        "Coloured A4 paper as the background sheet",
        "Pre-torn coloured paper pieces (small, mixed colours) — teacher prepares before class",
        "Simple outline sheets (animal or shape outlines)",
        "Glue sticks",
      ],
      steps: [
        "Show how to tear pre-torn pieces into smaller fragments using fingers.",
        "Children tear more pieces if needed (no scissors).",
        "Fill the outline shape with pieces — encourage colour choice.",
        "Stick each piece down with glue so the outline becomes a colourful mosaic.",
        "Mount the finished outline onto the coloured A4 background.",
      ],
      image: {
        src: "/artiverse-book/paper/mosaic-1.png",
        alt: "paper mosaic artwork — children's work",
      },
    },
    {
      number: 4,
      title: "loops & chains",
      artworks: 1,
      materials: [
        "Coloured A4 paper as the background sheet",
        "Pre-cut paper strips (short, mixed colours) — teacher cuts before class",
        "Glue sticks",
        "Animal face stencils (provided)",
      ],
      steps: [
        "Show how to bring two ends of a paper strip together to make a loop.",
        "Glue the ends — children make 4–6 loops each.",
        "Pass the next strip through the loop and glue — building a chain.",
        "Stick the chain onto the coloured A4 background — caterpillar, snake, or decorative chain.",
        "Add a face from the stencil and details with crayons.",
      ],
      image: {
        src: "/artiverse-book/paper/loops-1.png",
        alt: "paper loops & chains artwork — children's work",
      },
    },
    {
      number: 5,
      title: "simple origami",
      artworks: 2,
      materials: [
        "Coloured A4 paper as the background sheet",
        "Square origami papers (pre-cut by the teacher)",
        "Glue sticks",
        "Crayons or markers for backgrounds and details",
      ],
      steps: [
        "Teach one fold at a time — match the corners, press the crease, repeat.",
        "Watch the reference videos with the children before starting.",
        "Assist where needed — fingers tire fast at this age.",
        "Stick the finished origami onto the coloured A4 background.",
        "Decorate the background with crayons — water for a fish, sky for a bird.",
      ],
      // YouTube shorts — first fish, then frog.
      videos: [
        { youtubeId: "tx-3oRsIS7E", title: "origami fish · video walkthrough" },
        { youtubeId: "rgove-1t3bA", title: "origami frog · video walkthrough" },
      ],
    },
  ],
};

const CRAYONS: Chapter = {
  number: 2,
  name: "crayons",
  why: "Crayons build grip control and help children colour with intention.",
  guidelines: [
    "Encourage drawing before colouring.",
    "Do not fix drawings.",
    "Focus on control, not perfection.",
  ],
  totalArtworks: 15,
  projects: [
    {
      number: 1,
      title: "solid colours in shapes",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws simple shapes — circle, triangle, square — on the A4 paper.",
        "Children fill each shape with one solid colour.",
        "Encourage neat strokes from edge to edge.",
        "Add simple details — eyes, smiles — to bring the shapes to life.",
      ],
      image: {
        src: "/artiverse-book/crayon/solid-shapes.png",
        alt: "solid colours in shapes — children's work",
      },
    },
    {
      number: 2,
      title: "solid colours in scenery",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws a simple scene — sun, sky, ground, tree.",
        "Children colour each large area in a solid block — sky, grass, tree.",
        "Encourage covering the page fully — no white gaps.",
        "Compare day vs night versions in the second session.",
      ],
      image: {
        src: "/artiverse-book/crayon/solid-scenery.png",
        alt: "solid colours in scenery — children's work",
      },
    },
    {
      number: 3,
      title: "intricate colouring",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws detailed objects — flower, butterfly, basket of fruit.",
        "Children colour carefully within the smaller sections.",
        "Use multiple colours per object — petals, wings, fruits.",
        "Talk about staying inside the lines as a fun challenge — not a rule.",
      ],
      image: {
        src: "/artiverse-book/crayon/intricate.png",
        alt: "intricate colouring — flower, butterfly, basket of fruit",
      },
    },
    {
      number: 4,
      title: "doodling",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Children make free-form scribbles, lines, dots, swirls.",
        "Layer colours on top of each other for texture.",
        "Use the page as a playground — no shapes to fill in.",
        "Encourage experimenting with pressure (light vs dark).",
      ],
      images: [
        {
          src: "/artiverse-book/crayon/doodling-1.png",
          alt: "doodling artwork — sun and rainbow swirls",
        },
        {
          src: "/artiverse-book/crayon/doodling-2.png",
          alt: "doodling artwork — second example",
        },
      ],
    },
    {
      number: 5,
      title: "colour mixing — shapes",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws simple shapes — triangle, square, star.",
        "Children fill each shape using 2 colours.",
        "Overlap the strokes and observe the new colour appearing.",
        "Name the new colour out loud — red + yellow = orange.",
      ],
      image: {
        src: "/artiverse-book/crayon/mixing-shapes.png",
        alt: "colour mixing — shapes · children's work",
      },
    },
    {
      number: 6,
      title: "colour mixing — objects",
      artworks: 3,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws an intricate object — flower, leaf, fruit.",
        "Children colour the object using 2 blended colours.",
        "Layer the colours so the new mixed colour appears within the form.",
        "Notice how the object takes a new identity through the mix.",
      ],
      image: {
        src: "/artiverse-book/crayon/mixing-objects.png",
        alt: "colour mixing — objects · children's work",
      },
    },
    {
      number: 7,
      title: "colour mixing — scenery",
      artworks: 2,
      materials: [
        "White A4 paper",
        "Crayons (oil pastel or wax)",
      ],
      steps: [
        "Teacher draws a scene — sunset, garden, sea.",
        "Children fill backgrounds with strokes of 2 colours.",
        "Blend the strokes into each other for soft transitions.",
        "Add the foreground subject on top once the background is mixed.",
      ],
      image: {
        src: "/artiverse-book/crayon/mixing-scenery.png",
        alt: "colour mixing — scenery · children's work",
      },
    },
  ],
};

const PAINT: Chapter = {
  number: 3,
  name: "paint",
  why: "Paint helps children explore movement, pressure, and expression.",
  guidelines: [
    "Accept mess.",
    "Limit colours to 2–3 initially.",
    "Demonstrate lightly.",
  ],
  totalArtworks: 12,
  projects: [
    {
      number: 1,
      title: "hand painting",
      artworks: 3,
      prep: ["Paint trays", "Large sheets"],
      steps: [
        "Children dip hands in paint.",
        "Press on paper.",
        "Observe prints.",
        "Build images from prints.",
      ],
      image: {
        src: "/artiverse/art-3-5/av35-8-hand-printing.png",
        alt: "paint · hand painting — children's work",
      },
    },
    {
      number: 2,
      title: "finger painting",
      artworks: 3,
      prep: ["Thick paint", "Trays"],
      steps: [
        "Children use fingers.",
        "Make swirls, dots, spreads.",
        "Allow free mixing.",
      ],
      image: {
        src: "/artiverse/art-3-5/av35-9-finger-painting.png",
        alt: "paint · finger painting — children's work",
      },
    },
    {
      number: 3,
      title: "sponge painting",
      artworks: 3,
      prep: ["Sponge pieces", "Paint"],
      steps: [
        "Dip sponge lightly.",
        "Dab repeatedly.",
        "Create patterns or objects.",
      ],
      image: {
        src: "/artiverse/art-3-5/av35-10-sponge.png",
        alt: "paint · sponge painting — children's work",
      },
    },
    {
      number: 4,
      title: "q-tip painting",
      artworks: 3,
      prep: ["Q-tips", "Paint"],
      steps: [
        "Dip tip in paint.",
        "Make dots and patterns.",
        "Build images using dots.",
      ],
      image: {
        src: "/artiverse/art-3-5/av35-11-qtip.png",
        alt: "paint · q-tip painting — children's work",
      },
    },
  ],
};

const CHAPTERS = [PAPER, CRAYONS, PAINT] as const;

// ─── Built pages ───────────────────────────────────────────────────

/**
 * Cover artwork as a self-contained component. Re-used as the books
 * row thumbnail on the overview so the card preview matches what
 * actually opens inside the modal.
 */
export function ArtiverseCoverArt({
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
      {/* Top-left brand mark */}
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
          learning hub
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
          <span aria-hidden className={isThumb ? "absolute -top-0.5 left-[26%] text-[8px]" : "absolute -top-1 left-[26%] text-[20px]"}>✷</span>
          <span aria-hidden className={isThumb ? "absolute top-[14%] right-[10%] text-[7px]" : "absolute top-[14%] right-[10%] text-[18px]"}>⊿</span>
          <span aria-hidden className={isThumb ? "absolute right-[-3%] top-[44%] text-[7px]" : "absolute right-[-3%] top-[44%] text-[18px]"}>⌘</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[10%] right-[16%] text-[7px]" : "absolute bottom-[10%] right-[16%] text-[18px]"}>✶</span>
          <span aria-hidden className={isThumb ? "absolute -bottom-0.5 left-[34%] text-[7px]" : "absolute -bottom-1 left-[34%] text-[18px]"}>❀</span>
          <span aria-hidden className={isThumb ? "absolute bottom-[18%] left-[-2%] text-[7px]" : "absolute bottom-[18%] left-[-2%] text-[18px]"}>◐</span>
          <span aria-hidden className={isThumb ? "absolute top-[22%] left-[-2%] text-[7px]" : "absolute top-[22%] left-[-2%] text-[18px]"}>⌇</span>

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
              : "text-[28px] font-extrabold lowercase leading-tight text-ink md:text-[34px]"
          }
        >
          the artiverse book
        </h2>
        {!isThumb && (
          <>
            <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-ink/70 md:text-[14px]">
              a making book — paper, crayons, paint
            </p>
            <div className="mx-auto mt-4 max-w-sm rounded-xl bg-brand-white/70 px-4 py-3 ring-1 ring-ink/10">
              <p className="text-[10px] font-bold tracking-normal text-brand-orange">
                core materials
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink/80 md:text-[12px]">
                water paint · oil pastel crayons · craft paper
              </p>
              <p className="mt-2 text-[10px] font-bold tracking-normal text-brand-orange">
                additional
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink/80 md:text-[12px]">
                sketch pens · colour pencils
              </p>
              <p className="mt-2 text-[10.5px] italic leading-relaxed text-ink-muted md:text-[11px]">
                always on A4 paper — white or coloured depending on the artwork
              </p>
            </div>
          </>
        )}
        <p
          className={
            isThumb
              ? "mt-1 text-[6px] font-bold lowercase tracking-tight text-ink/45"
              : "mt-5 text-[10px] font-bold lowercase tracking-tight text-ink/45"
          }
        >
          teacher reference
        </p>
      </div>
    </div>
  );
}

function CoverPage() {
  return <ArtiverseCoverArt size="full" />;
}

function TocPage() {
  const total = CHAPTERS.reduce((s, c) => s + c.totalArtworks, 0);
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        contents
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold lowercase leading-tight text-ink md:text-[28px]">
        three chapters · {total} artworks
      </h2>
      <ol className="mt-4 space-y-3 overflow-y-auto pr-2 scroll-visible">
        {CHAPTERS.map((c) => (
          <li key={c.name}>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              chapter {c.number} · {c.totalArtworks} artworks
            </p>
            <p className="mt-0.5 text-[14px] font-extrabold lowercase text-ink">
              {c.name}
            </p>
            <ul className="mt-1.5 space-y-1">
              {c.projects.map((p) => (
                <li
                  key={p.title}
                  className="flex items-baseline gap-2 text-[11.5px] leading-snug text-ink-muted"
                >
                  <span className="w-4 shrink-0 text-right font-bold text-brand-orange">
                    {p.number}.
                  </span>
                  <span className="flex-1">
                    {p.title}{" "}
                    <span className="text-ink-subtle">
                      ({p.artworks} {p.artworks === 1 ? "artwork" : "artworks"})
                    </span>
                  </span>
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
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
        chapter {chapter.number} · {chapter.totalArtworks} artworks
      </p>
      <h2 className="mt-2 text-[26px] font-extrabold lowercase leading-tight text-ink md:text-[32px]">
        {chapter.name}
      </h2>
      <div className="mt-5">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          why {chapter.name.split(" ")[0]} works
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
          {chapter.why}
        </p>
      </div>
      <div className="mt-5">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          teacher guidelines
        </p>
        <ul className="mt-1.5 space-y-1">
          {chapter.guidelines.map((g) => (
            <li
              key={g}
              className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
              <span className="flex-1">{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectTextPage({
  chapterName,
  project,
}: {
  chapterName: string;
  project: ProjectEntry;
}) {
  // Materials field falls back to legacy `prep` so existing entries
  // surface their materials list under the new heading.
  const materials = project.materials ?? project.prep ?? [];
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-brand-cream p-5 md:p-7">
      <div className="shrink-0">
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {chapterName} · project {project.number}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
            {project.title}
          </h3>
          <span className="rounded-chip bg-brand-orange/15 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
            {project.artworks} {project.artworks === 1 ? "artwork" : "artworks"}
          </span>
        </div>
      </div>

      <div className="mt-3 flex-1 overflow-y-auto pr-1 scroll-visible">
        {materials.length > 0 && (
          <>
            <p className="text-[10px] font-bold tracking-normal text-brand-orange">
              materials
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {materials.map((m) => (
                <li
                  key={m}
                  className="text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]"
                >
                  · {m}
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="mt-4 text-[10px] font-bold tracking-normal text-brand-orange">
          how to conduct
        </p>
        <ol className="mt-2 space-y-2">
          {project.steps.map((s, i) => (
            <li
              key={s}
              className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-muted md:text-[13px]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[10px] font-extrabold text-brand-orange">
                {i + 1}
              </span>
              <span className="flex-1">{s}</span>
            </li>
          ))}
        </ol>

        {project.videos && project.videos.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-normal text-brand-orange">
              reference videos
            </p>
            <div className="mt-2 space-y-2">
              {project.videos.map((v, i) => (
                <div
                  key={`${v.title}-${i}`}
                  className="overflow-hidden rounded-xl bg-brand-white ring-1 ring-ink/5"
                >
                  {v.youtubeId ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}`}
                        title={v.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-brand-cream/40 px-4 text-center">
                      <p className="text-[11px] italic leading-relaxed text-ink-muted">
                        {v.title} — drop the YouTube id here.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {project.images && project.images.length > 1 ? (
          <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
            See the next {project.images.length} pages for finished examples of children&apos;s work.
          </p>
        ) : project.image || (project.images && project.images.length === 1) ? (
          <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
            See the next page for a finished example of children&apos;s work.
          </p>
        ) : !project.videos || project.videos.length === 0 ? (
          <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
            Photo coming soon.
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Dedicated photo page so paper / paint artworks aren't cropped by the
 * sibling text card. Used after every ProjectTextPage that has a photo.
 */
function ProjectPhotoPage({
  chapterName,
  project,
  image,
}: {
  chapterName: string;
  project: ProjectEntry;
  image: ProjectImage;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div className="shrink-0 text-center">
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {chapterName} · project {project.number} · children&apos;s work
        </p>
        <h3 className="mt-1 text-[16px] font-extrabold lowercase leading-tight text-ink md:text-[18px]">
          {project.title}
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

  // 1. cover
  pages.push({ kind: "node", node: <CoverPage /> });
  // 2. TOC
  pages.push({ kind: "node", node: <TocPage /> });

  // each chapter: cover + projects (text page, then a dedicated
  // photo page when the project has a children's-work image so the
  // artwork is shown full-bleed without cropping).
  for (const chapter of CHAPTERS) {
    pages.push({ kind: "node", node: <ChapterCoverPage chapter={chapter} /> });
    for (const project of chapter.projects) {
      pages.push({
        kind: "node",
        node: <ProjectTextPage chapterName={chapter.name} project={project} />,
      });
      const photos = project.images ?? (project.image ? [project.image] : []);
      for (const image of photos) {
        pages.push({
          kind: "node",
          node: (
            <ProjectPhotoPage
              chapterName={chapter.name}
              project={project}
              image={image}
            />
          ),
        });
      }
    }
  }
  return pages;
}

// ─── Modal ──────────────────────────────────────────────────────────

export function ArtiverseBookModal({
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

  const pages = buildPages();

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-segment-yellow px-4 py-3 md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-ink/60">
            teacher reference
          </p>
          <h2 className="truncate text-[18px] font-extrabold lowercase leading-tight text-ink md:text-[22px]">
            the artiverse book · art &amp; design 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink-muted transition hover:bg-ink/20"
          aria-label="close artiverse book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              Colourful papers, crayons, paint. The picture in the book is a reference only — children pick their own subject and take the work home.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="artiverse book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
