"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ImageFlipbook,
  type FlipbookPage,
} from "@/components/ImageFlipbook";

/**
 * Artistotle book — structured as a real book, lowercase labels per
 * brand. Keeps the existing artist cover + about pages from the
 * printed book; replaces project pages with the new project copy plus
 * a photo placeholder so a teacher can still read the project while
 * photos are being prepared.
 *
 * Order:
 *   1.  cover                            — existing 01-cover.png
 *   2.  table of contents                — built (lowercase)
 *   3.  eric carle · about / cover       — existing 04-eric-carle-about.png
 *   4.  eric carle · technique spotlight — existing 05-eric-carle-technique.png
 *   5-8.  4 eric carle projects          — text + photo placeholder
 *   9.  lois ehlert · cover              — existing 09-lois-ehlert-cover.png
 *   10-13. 4 lois ehlert projects        — text + photo placeholder
 *   14. taro gomi · cover                — existing 13-taro-gomi-cover.png
 *   15. taro gomi · about                — existing 14-taro-gomi-about.png
 *   16-20. 5 taro gomi projects          — text + photo placeholder
 */

type ProjectImage = { src: string; alt: string; caption?: string };
type ProjectEntry = {
  number: number;
  title: string;
  /** Materials needed to make the artwork — extracted from how-to-conduct. */
  materials: string[];
  /** How-to-conduct steps — what the teacher does in order. */
  steps: string[];
  /** Single primary image — kept for backwards compatibility. */
  image?: ProjectImage;
  /**
   * Optional gallery — each entry renders on its own dedicated photo
   * page so worksheets and children's-work photos sit side by side
   * without being cropped.
   */
  images?: ProjectImage[];
};

const CARLE: ProjectEntry[] = [
  {
    number: 1,
    title: "stripes collage",
    materials: [
      "A3 paper as the base sheet",
      "Pre-cut paper strips in mixed colours (teacher cuts before class)",
      "Glue sticks",
      "Tempera paint trays — 2–3 colours",
      "Sponge dabbers",
      "Black pen / fine marker for details",
    ],
    steps: [
      "Lay paper strips out on the table — let children pick a colour palette.",
      "Children arrange strips on the A3 sheet — straight, diagonal, overlapping.",
      "Once the layout feels right, glue each strip down.",
      "Dab paint onto the strips with sponge dabbers — building texture and depth Carle-style.",
      "Once the paint is dry, use the black pen to add details: ladybug spots, eyes, lines.",
      "Photograph the artwork before children take it home.",
    ],
    image: {
      src: "/artistotle-book/carle-project-1-stripes.png",
      alt: "eric carle · stripes collage — children's work",
    },
  },
  {
    number: 2,
    title: "caterpillar collage (round shape)",
    materials: [
      "A3 paper as the base sheet",
      "Pre-cut paper circles (varied sizes, mixed colours) — teacher cuts before class",
      "Glue sticks",
      "Black marker / crayon for details",
    ],
    steps: [
      "Show children a caterpillar reference — point out the round repeated shape.",
      "Children arrange circles in a line on their A4 sheet.",
      "Glue each circle down.",
      "Add face, antennae, legs with marker or by sticking small extra paper pieces.",
      "Encourage children to invent their own round-shape creature in the second session.",
    ],
    image: {
      src: "/artistotle-book/carle-project-2-caterpillar.png",
      alt: "eric carle · caterpillar collage — children's work",
    },
  },
  {
    number: 3,
    title: "fruit & vegetable collage (irregular shape)",
    materials: [
      "A3 paper as the base sheet",
      "Coloured paper sheets (red, orange, green, yellow, purple)",
      "Glue sticks",
      "Reference cards — fruits and vegetables",
    ],
    steps: [
      "Show fruit and vegetable reference cards. Talk about each shape.",
      "Children tear coloured paper into irregular pieces — no scissors.",
      "Arrange torn pieces into the shape of their chosen fruit or vegetable.",
      "Glue down once the shape feels right.",
      "Add stem, leaves, or seeds with extra torn paper or marker.",
    ],
    image: {
      src: "/artistotle-book/carle-project-3-fruit-veg.png",
      alt: "eric carle · fruit & vegetable collage — children's work",
    },
  },
  {
    number: 4,
    title: "jellyfish collage (multi-medium, multi-shape)",
    materials: [
      "A3 paper as the base sheet",
      "Pre-cut paper circles (varied sizes) — teacher cuts before class",
      "Pre-cut paper strips (curly and straight) — teacher cuts before class",
      "Patterned scrap paper",
      "Glue sticks",
    ],
    steps: [
      "Show a jellyfish reference — round head, flowing tentacles.",
      "Children pick a large circle for the jellyfish head.",
      "Arrange paper strips of different colours and patterns underneath as tentacles.",
      "Glue head, then glue tentacles in place.",
      "Layer extra small circles and dots on the head for texture.",
      "In the second session, children build an underwater scene around their jellyfish.",
    ],
    image: {
      src: "/artistotle-book/carle-project-4-jellyfish.png",
      alt: "eric carle · jellyfish collage — children's work",
    },
  },
];

const EHLERT: ProjectEntry[] = [
  {
    number: 1,
    title: "sponge dabbling flowers",
    materials: [
      "A3 paper as the base sheet",
      "Small sponge pieces (one per child)",
      "Tempera paint trays — 2–3 colours per child",
      "Paper towels",
    ],
    steps: [
      "Pour paint into trays — one colour per tray.",
      "Demonstrate: dip sponge lightly, dab on paper. Repeat for each petal.",
      "Children dab petals around a centre point to build a flower.",
      "Add a centre dot in a contrasting colour.",
      "Encourage building a row or field of sponge flowers.",
    ],
    image: {
      src: "/artistotle-book/ehlert-project-1.png",
      alt: "lois ehlert · sponge dabbling flowers — children's work",
    },
  },
  {
    number: 2,
    title: "brush flowers",
    materials: [
      "A3 paper as the base sheet",
      "Round and flat brushes (one each per child)",
      "Tempera paint — 3–4 colours",
      "Water cup for brush rinsing",
      "Paper towels",
    ],
    steps: [
      "Show how a single brushstroke can become a petal.",
      "Children practise stroke direction on a scrap sheet.",
      "On the main sheet, paint a centre dot.",
      "Add petals around it using brushstrokes — no need for outlines.",
      "Add a stem and leaves using a flat brush.",
    ],
    image: {
      src: "/artistotle-book/ehlert-project-2.png",
      alt: "lois ehlert · brush flowers — children's work",
    },
  },
  {
    number: 3,
    title: "simple flowers",
    materials: [
      "A3 paper as the base sheet",
      "Round brushes",
      "Tempera paint — bright colours",
      "Water cup, paper towels",
    ],
    steps: [
      "Demonstrate one brushstroke for a petal — short, deliberate.",
      "Children practise petals on scrap paper.",
      "On the main sheet, paint simple flowers — petals around a centre dot.",
      "Repeat across the page — building a row or field.",
      "In the second session, add stems, leaves, and small details.",
    ],
    image: {
      src: "/artistotle-book/ehlert-project-3.png",
      alt: "lois ehlert · simple flowers — children's work",
    },
  },
  {
    number: 4,
    title: "two-layer flower garden",
    materials: [
      "A3 paper as the base sheet",
      "Round brushes",
      "Tempera paint — green for grass, mixed colours for flowers",
      "Water cup, paper towels",
    ],
    steps: [
      "Day 1: paint the background — vertical green strokes for grass, blue or yellow for sky.",
      "Let the background dry fully (or use a hairdryer).",
      "Day 2: on the dried background, paint flowers on top using contrasting colours.",
      "Add small dots and details.",
      "Talk about layering — what we paint first goes behind, what we paint last comes forward.",
    ],
    image: {
      src: "/artistotle-book/ehlert-project-4.png",
      alt: "lois ehlert · two-layer flower garden — children's work",
    },
  },
];

const GOMI: ProjectEntry[] = [
  {
    number: 1,
    title: "simple colouring",
    materials: [
      "Printed worksheets — simple animal outlines (bear and tiger)",
      "Crayons",
      "Colour pencils",
      "Sketch pens",
    ],
    steps: [
      "Hand each child a printed worksheet — bear on day 1, tiger on day 2.",
      "Children pick their own colours — no rules.",
      "Add fun details and backgrounds — a smile, a hat, dots, sky, grass.",
      "Ask each child to share what they drew and what they added.",
    ],
    image: {
      src: "/artistotle-book/gomi-colour-1-bear.png",
      alt: "taro gomi · simple colouring worksheet — bear in overalls",
      caption: "worksheet · bear (day 1)",
    },
    // Tiger worksheet pending — drop the file in
    // /public/artistotle-book/gomi-colour-1-tiger.png and switch the
    // `image:` block above to `images:` with both entries.
  },
  {
    number: 2,
    title: "line making 1",
    materials: [
      "Printed worksheets — simple character outlines (umbrella set)",
      "Crayons",
      "Colour pencils",
      "Sketch pens",
    ],
    steps: [
      "Show children different line patterns: dots, dashes, zigzags, waves.",
      "Children practise each line on a scrap sheet.",
      "Hand out the printed umbrella worksheet — fill internal areas with chosen line patterns.",
      "Talk about how patterns make a drawing more interesting.",
    ],
    images: [
      {
        src: "/artistotle-book/gomi-lines-1-umbrella-girl.png",
        alt: "taro gomi · line making 1 worksheet — umbrella girl",
        caption: "worksheet · umbrella 1",
      },
      {
        src: "/artistotle-book/gomi-lines-2-umbrella-boy.png",
        alt: "taro gomi · line making 1 worksheet — umbrella boy",
        caption: "worksheet · umbrella 2",
      },
    ],
  },
  {
    number: 3,
    title: "line making 2 — add filling inside burger",
    materials: [
      "Printed burger worksheets — two empty buns ready to be filled",
      "Crayons",
      "Colour pencils",
      "Sketch pens",
    ],
    steps: [
      "Hand each child the printed burger worksheet — top bun, bottom bun, empty middle.",
      "Read the prompt: 'Trace the hamburger. Draw what you want in between the buns.'",
      "Children pick what to put inside — lettuce, cheese, patty, tomato, onion, pickle.",
      "Each filling gets a different line pattern — dots, stripes, zigzags, waves.",
      "Encourage variety — no two layers the same.",
      "End by holding up the artwork and naming the patterns used.",
    ],
    image: {
      src: "/artistotle-book/gomi-lines-2-burger.png",
      alt: "taro gomi · add filling inside burger through lines — burger worksheet",
      caption: "worksheet · burger",
    },
  },
  {
    number: 4,
    title: "draw & colour 1",
    materials: [
      "Printed worksheets — simple character outlines",
      "Crayons",
      "Colour pencils",
      "Sketch pens",
    ],
    steps: [
      "Hand out the printed worksheet — a character with empty surroundings.",
      "Children colour the character freely.",
      "Then add a background — bubbles, sky, ground — using sketch pens or pencils.",
      "Each child gives their drawing a short one-line story.",
    ],
    image: {
      src: "/artistotle-book/gomi-draw-1-lady.png",
      alt: "taro gomi · draw & colour 1 — lady with circles, day 1",
      caption: "worksheet · day 1",
    },
  },
  {
    number: 5,
    title: "draw & colour 2",
    materials: [
      "Printed worksheets — simple character outlines",
      "Crayons",
      "Colour pencils",
      "Sketch pens",
    ],
    steps: [
      "Hand out the printed worksheet — a character on a blank background.",
      "Children colour the character first.",
      "Then build the world around them — stars, planets, dots, lines.",
      "Each child tells a short story about their scene to the group.",
    ],
    image: {
      src: "/artistotle-book/gomi-draw-2-astronaut.png",
      alt: "taro gomi · draw & colour 2 — astronaut, day 2",
      caption: "worksheet · day 2",
    },
  },
];

const ARTISTS = [
  { name: "eric carle", chapter: 1, projects: CARLE },
  { name: "lois ehlert", chapter: 2, projects: EHLERT },
  { name: "taro gomi", chapter: 3, projects: GOMI },
] as const;

// ─── Built pages (TOC + project placeholder) ──────────────────────

function TocPage() {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-6 md:p-10">
      <p className="text-[10px] font-bold tracking-normal text-brand-orange">
        contents
      </p>
      <h2 className="mt-2 text-[22px] font-extrabold lowercase leading-tight text-ink md:text-[28px]">
        three artists · fourteen projects
      </h2>
      <ol className="mt-4 space-y-3 overflow-y-auto pr-2 scroll-visible">
        {ARTISTS.map((a) => (
          <li key={a.name}>
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              chapter {a.chapter}
            </p>
            <p className="mt-0.5 text-[14px] font-extrabold lowercase text-ink">
              {a.name}
            </p>
            <ul className="mt-1.5 space-y-1">
              {a.projects.map((p) => (
                <li
                  key={p.title}
                  className="flex items-baseline gap-2 text-[11.5px] leading-snug text-ink-muted"
                >
                  <span className="w-4 shrink-0 text-right font-bold text-brand-orange">
                    {p.number}.
                  </span>
                  <span className="flex-1">{p.title}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectTextPage({
  artistName,
  project,
}: {
  artistName: string;
  project: ProjectEntry;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-brand-cream p-5 md:p-7">
      <div className="shrink-0">
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {artistName} · project {project.number}
        </p>
        <h3 className="mt-1 text-[20px] font-extrabold lowercase leading-tight text-ink md:text-[24px]">
          {project.title}
        </h3>
      </div>
      <div className="mt-3 flex-1 overflow-y-auto pr-1 scroll-visible">
        <p className="text-[10px] font-bold tracking-normal text-brand-orange">
          materials
        </p>
        <ul className="mt-1.5 space-y-0.5">
          {project.materials.map((m) => (
            <li
              key={m}
              className="text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]"
            >
              · {m}
            </li>
          ))}
        </ul>

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

        {project.image ? (
          <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
            See the next page for a finished example of children's work.
          </p>
        ) : (
          <p className="mt-4 text-[10.5px] italic leading-relaxed text-ink-muted">
            Photo coming soon.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Dedicated photo page so the artwork is never cropped by a sibling
 * text card. Renders a single ProjectImage; the caller decides which
 * images to include and the order they appear.
 */
function ProjectPhotoPage({
  artistName,
  project,
  image,
}: {
  artistName: string;
  project: ProjectEntry;
  image: ProjectImage;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-brand-cream p-5 md:p-7">
      <div className="shrink-0 text-center">
        <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
          {artistName} · project {project.number}
          {image.caption ? ` · ${image.caption}` : " · children's work"}
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

/** Resolve the image list for a project — supports both `image` and
 * `images[]` so old single-image projects keep working. */
function projectImageList(project: ProjectEntry): ProjectImage[] {
  if (project.images && project.images.length > 0) return project.images;
  if (project.image) return [project.image];
  return [];
}

// Pre-existing book pages we keep (not project images — those are
// replaced with placeholders).
const EXISTING_PAGES: Record<string, { src: string; alt: string }> = {
  cover: {
    src: "/artistotle-book/01-cover.png",
    alt: "the artistotle book — cover",
  },
  toc: {
    src: "/artistotle-book/02-table-of-contents.png",
    alt: "the artistotle book — table of contents",
  },
  carleCover: {
    src: "/artistotle-book/04-eric-carle-about.png",
    alt: "eric carle · about",
  },
  carleTechnique: {
    src: "/artistotle-book/05-eric-carle-technique.png",
    alt: "eric carle · technique spotlight",
  },
  ehlertCover: {
    src: "/artistotle-book/09-lois-ehlert-cover.png",
    alt: "lois ehlert · cover",
  },
  gomiCover: {
    src: "/artistotle-book/13-taro-gomi-cover.png",
    alt: "taro gomi · cover",
  },
  gomiAbout: {
    src: "/artistotle-book/14-taro-gomi-about.png",
    alt: "taro gomi · about",
  },
};

function buildPages(): FlipbookPage[] {
  const pages: FlipbookPage[] = [];

  // 1. existing cover
  pages.push({ kind: "image", ...EXISTING_PAGES.cover });

  // 2. existing table of contents image (per the printed book)
  pages.push({ kind: "image", ...EXISTING_PAGES.toc });

  // 3. eric carle · about (cover for chapter 1)
  pages.push({ kind: "image", ...EXISTING_PAGES.carleCover });
  // 4. eric carle · technique spotlight
  pages.push({ kind: "image", ...EXISTING_PAGES.carleTechnique });
  // 5+. eric carle's 4 projects — text page, then one dedicated photo
  // page per image so artworks are never cropped.
  for (const project of CARLE) {
    pages.push({
      kind: "node",
      node: <ProjectTextPage artistName="eric carle" project={project} />,
    });
    for (const image of projectImageList(project)) {
      pages.push({
        kind: "node",
        node: <ProjectPhotoPage artistName="eric carle" project={project} image={image} />,
      });
    }
  }

  // lois ehlert · cover
  pages.push({ kind: "image", ...EXISTING_PAGES.ehlertCover });
  // lois ehlert's 4 projects — text page + photo page(s) each
  for (const project of EHLERT) {
    pages.push({
      kind: "node",
      node: <ProjectTextPage artistName="lois ehlert" project={project} />,
    });
    for (const image of projectImageList(project)) {
      pages.push({
        kind: "node",
        node: <ProjectPhotoPage artistName="lois ehlert" project={project} image={image} />,
      });
    }
  }

  // taro gomi · cover
  pages.push({ kind: "image", ...EXISTING_PAGES.gomiCover });
  // taro gomi · about
  pages.push({ kind: "image", ...EXISTING_PAGES.gomiAbout });
  // taro gomi's 6 projects — text page + photo page(s) each (line making
  // projects have a worksheet + a children's-work image, so two photo
  // pages each).
  for (const project of GOMI) {
    pages.push({
      kind: "node",
      node: <ProjectTextPage artistName="taro gomi" project={project} />,
    });
    for (const image of projectImageList(project)) {
      pages.push({
        kind: "node",
        node: <ProjectPhotoPage artistName="taro gomi" project={project} image={image} />,
      });
    }
  }
  return pages;
}

// ─── Modal ──────────────────────────────────────────────────────────

export function ArtistotleBookModal({
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
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/5 bg-brand-orange px-4 py-3 text-white md:px-8">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-normal text-white/80">
            teacher reference
          </p>
          <h2 className="truncate text-[18px] font-extrabold lowercase leading-tight md:text-[22px]">
            the artistotle book · art &amp; design 3–5
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label="close artistotle book"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-3 py-5 md:px-6 md:py-8">
          <div className="rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink/5 md:p-5">
            <p className="mb-3 text-[11px] italic leading-relaxed text-ink-muted md:text-[12px]">
              Children meet each artist simply, then make in their spirit. Focus on technique, not copying.
            </p>
            <ImageFlipbook
              pages={pages}
              altPrefix="artistotle book page"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
