/**
 * Artiverse chapter notes — infographic-style chapter blocks.
 *
 * Each chapter renders as:
 *   - a solid coloured band with the chapter name + emoji + a vertical
 *     divider + the "why <chapter> works" cover line
 *   - a numbered list of projects underneath, with circle numbers and a
 *     dotted connector running between them so the chapter reads as a
 *     visual progression rather than a uniform card grid.
 *
 * Used inside /artiverse-book and the 3-5 overview Artiverse block.
 */
interface Chapter {
  name: string;
  /** Single emoji used in the chapter band. */
  emoji: string;
  /** Tailwind classes for the band. */
  band: { bg: string; ink: string };
  coverLine: string;
  projects: { name: string; desc: string }[];
}

const CHAPTERS: Chapter[] = [
  {
    name: "paper",
    emoji: "📄",
    band: { bg: "bg-segment-yellow", ink: "text-ink" },
    coverLine:
      "paper is easy to tear, fold, and move. it builds finger strength, control, and early planning without needing tools.",
    projects: [
      {
        name: "colourful papers",
        desc: "tear and place pieces to create their own picture (using references) — building finger control, colour exploration, and independent choices.",
      },
      {
        name: "accordions",
        desc: "fold paper back and forth to make and transform forms of their choice — building coordination, control, and spatial awareness.",
      },
      {
        name: "circles",
        desc: "trace, stamp, or draw circles to build their own compositions — developing shape control and intentional mark-making.",
      },
      {
        name: "mosaics",
        desc: "place small pieces to create patterns or images — building precision, planning, and colour selection.",
      },
      {
        name: "loops & chains",
        desc: "link materials to create chains or forms of their choice — building finger control, sequencing, and repetition.",
      },
    ],
  },
  {
    name: "crayon",
    emoji: "🖍️",
    band: { bg: "bg-brand-orange", ink: "text-white" },
    coverLine:
      "crayons are stable and forgiving. they help children control marks, stay within space, and begin using colour with intent.",
    projects: [
      {
        name: "doodling",
        desc: "make free marks to create their own drawings — building grip control and mark confidence.",
      },
      {
        name: "colouring",
        desc: "fill shapes with chosen colours (using references) — building control within space and colour recognition.",
      },
      {
        name: "mixing",
        desc: "layer colours while making their own artwork — building colour awareness and early mixing understanding.",
      },
    ],
  },
  {
    name: "paint",
    emoji: "🎨",
    band: { bg: "bg-segment-blue", ink: "text-ink" },
    coverLine:
      "paint is fluid and responsive. it helps children explore movement, pressure, and cause-effect while expressing ideas more freely.",
    projects: [
      {
        name: "hand painting (greeting cards)",
        desc: "use hands to print and create their own images — building sensory comfort and whole-hand control.",
      },
      {
        name: "finger painting (greeting cards)",
        desc: "use fingers to spread and create — building finger control and direct interaction with colour.",
      },
      {
        name: "sponge painting",
        desc: "dab and press to create textures and images — building pressure control and pattern awareness.",
      },
      {
        name: "q-tips painting",
        desc: "dot and detail to build images — strengthening precision and repeated pattern-making.",
      },
      {
        name: "watercolour",
        desc: "use brush and water to create fluid artworks — building brush control and colour exploration.",
      },
      {
        name: "blow & splatter",
        desc: "blow or splatter paint and build images from the result — exploring cause-effect and creative interpretation.",
      },
    ],
  },
];

export function ArtiverseChapters({ compact = false }: { compact?: boolean }) {
  // `compact` is kept for API compatibility with existing call sites; the
  // infographic layout works at any width without column variants.
  void compact;
  return (
    <div className="space-y-6">
      {CHAPTERS.map((chapter, ci) => (
        <article
          key={chapter.name}
          className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5"
        >
          {/* Chapter band */}
          <header
            className={`grid gap-3 px-5 py-5 md:grid-cols-[auto_1fr] md:items-center md:gap-6 md:px-7 md:py-6 ${chapter.band.bg} ${chapter.band.ink}`}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-white/40 text-[26px] backdrop-blur-sm md:h-14 md:w-14 md:text-[30px]"
                aria-hidden="true"
              >
                {chapter.emoji}
              </span>
              <div>
                <p className="text-[10px] font-bold opacity-70">
                  chapter {ci + 1}
                </p>
                <h3 className="text-[22px] font-extrabold lowercase leading-tight md:text-[26px]">
                  {chapter.name}
                </h3>
              </div>
            </div>
            <div className="md:border-l md:border-white/30 md:pl-6">
              <p className="text-[12px] font-bold opacity-90 md:text-[12.5px]">
                why {chapter.name} works
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed opacity-90 md:text-[13px]">
                {chapter.coverLine}
              </p>
            </div>
          </header>

          {/* Projects — numbered list with dotted connector */}
          <ol className="relative px-5 py-5 md:px-7 md:py-6">
            {chapter.projects.map((p, i) => (
              <li
                key={p.name}
                className={`relative flex items-start gap-4 ${
                  i < chapter.projects.length - 1 ? "pb-5" : ""
                }`}
              >
                {/* Dotted connector that runs between number bubbles */}
                {i < chapter.projects.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-9 bottom-0 w-0 border-l-2 border-dotted border-ink/15"
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full text-[12px] font-extrabold ring-2 ring-brand-white ${chapter.band.bg} ${chapter.band.ink}`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 pt-0.5">
                  <p className="text-[13.5px] font-extrabold lowercase text-ink md:text-[14px]">
                    {p.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-ink-muted md:text-[12.5px]">
                    {p.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      ))}

      {/* Important footer */}
      <div className="rounded-2xl border-2 border-dashed border-brand-orange/40 bg-brand-orange/5 p-4 md:p-5">
        <p className="text-[11px] font-bold lowercase text-brand-orange">
          important
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
          all outcomes are choice-based. children create their own versions,
          using reference images only as inspiration.
        </p>
      </div>
    </div>
  );
}
