/**
 * Artiverse chapter notes — final teacher-handbook structure.
 *
 * Three chapters: paper · crayons · paint. Each project lists how to
 * conduct it (teacher actions) and the artwork count. Used inside the
 * artiverse book modal as the side-panel reference.
 */
interface Project {
  name: string;
  artworks: number;
  prep?: string[];
  steps: string[];
}

interface Chapter {
  name: string;
  emoji: string;
  band: { bg: string; ink: string };
  why: string;
  guidelines: string[];
  totalArtworks: number;
  projects: Project[];
}

const CHAPTERS: Chapter[] = [
  {
    name: "paper folding & sticking",
    emoji: "📄",
    band: { bg: "bg-segment-yellow", ink: "text-ink" },
    why: "Paper helps children build finger strength and understand shape, space, and construction.",
    guidelines: [
      "Always pre-cut materials.",
      "Always give stencils for faces if needed.",
      "Focus on folding and sticking, not drawing.",
      "Allow uneven and imperfect work.",
    ],
    totalArtworks: 10,
    projects: [
      {
        name: "accordion folding",
        artworks: 2,
        prep: [
          "Paper strips (5–10 cm thick)",
          "Animal face stencils",
          "Glue + crayons",
        ],
        steps: [
          "Show folding back and forth.",
          "Help children press folds.",
          "Children stick the folded strip as a body.",
          "Add a face and decorate.",
        ],
      },
      {
        name: "circles folding",
        artworks: 3,
        prep: ["Pre-cut circles in different sizes"],
        steps: [
          "Children fold circles into halves or flaps.",
          "Stick some parts flat, leave some open.",
          "Arrange to form objects.",
        ],
      },
      {
        name: "mosaics",
        artworks: 2,
        prep: ["Pre-torn coloured paper", "Simple outline sheets"],
        steps: [
          "Children tear more pieces.",
          "Fill shapes using pieces.",
          "Encourage colour choice.",
        ],
      },
      {
        name: "loops & chains",
        artworks: 1,
        prep: ["Paper strips (short)"],
        steps: [
          "Children make loops.",
          "Join loops into chains.",
          "Attach faces.",
        ],
      },
      {
        name: "simple origami",
        artworks: 2,
        prep: ["Square papers"],
        steps: [
          "Teach one fold at a time.",
          "Assist where needed.",
          "Stick the finished piece.",
          "Decorate the background.",
        ],
      },
    ],
  },
  {
    name: "crayons",
    emoji: "🖍️",
    band: { bg: "bg-brand-orange", ink: "text-white" },
    why: "Crayons build grip control and help children colour with intention.",
    guidelines: [
      "Encourage drawing before colouring.",
      "Do not fix drawings.",
      "Focus on control, not perfection.",
    ],
    totalArtworks: 15,
    projects: [
      {
        name: "solid colours in shapes",
        artworks: 2,
        steps: ["Draw simple shapes.", "Children fill colour inside."],
      },
      {
        name: "solid colours in scenery",
        artworks: 2,
        steps: ["Draw simple scenery.", "Children colour large areas."],
      },
      {
        name: "intricate colouring",
        artworks: 2,
        steps: ["Draw simple detailed objects.", "Children colour carefully."],
      },
      {
        name: "doodling",
        artworks: 2,
        steps: [
          "Children make lines, dots, patterns.",
          "Use the page for texture.",
        ],
      },
      {
        name: "colour mixing — shapes",
        artworks: 2,
        steps: ["Use 2 colours in one shape.", "Overlap and observe."],
      },
      {
        name: "colour mixing — objects",
        artworks: 3,
        steps: ["Colour objects using blended colours."],
      },
      {
        name: "colour mixing — scenery",
        artworks: 2,
        steps: ["Create colourful backgrounds."],
      },
    ],
  },
  {
    name: "paint",
    emoji: "🎨",
    band: { bg: "bg-segment-blue", ink: "text-ink" },
    why: "Paint helps children explore movement, pressure, and expression.",
    guidelines: [
      "Accept mess.",
      "Limit colours to 2–3 initially.",
      "Demonstrate lightly.",
    ],
    totalArtworks: 12,
    projects: [
      {
        name: "hand painting",
        artworks: 3,
        prep: ["Paint trays", "Large sheets"],
        steps: [
          "Children dip hands in paint.",
          "Press on paper.",
          "Observe prints.",
          "Build images from prints.",
        ],
      },
      {
        name: "finger painting",
        artworks: 3,
        prep: ["Thick paint", "Trays"],
        steps: [
          "Children use fingers.",
          "Make swirls, dots, spreads.",
          "Allow free mixing.",
        ],
      },
      {
        name: "sponge painting",
        artworks: 3,
        prep: ["Sponge pieces", "Paint"],
        steps: [
          "Dip sponge lightly.",
          "Dab repeatedly.",
          "Create patterns or objects.",
        ],
      },
      {
        name: "q-tip painting",
        artworks: 3,
        prep: ["Q-tips", "Paint"],
        steps: [
          "Dip tip in paint.",
          "Make dots and patterns.",
          "Build images using dots.",
        ],
      },
    ],
  },
];

export function ArtiverseChapters({ compact = false }: { compact?: boolean }) {
  void compact;
  const total = CHAPTERS.reduce((sum, c) => sum + c.totalArtworks, 0);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-segment-yellow/30 p-4 ring-1 ring-segment-yellow/50">
        <p className="text-[11px] font-bold tracking-normal text-brand-orange">
          three chapters · {total} artworks
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
          Artiverse focuses on helping children become comfortable and confident with art materials. Imagery is open and neutral — children create their own versions using references only as inspiration.
        </p>
      </div>

      {CHAPTERS.map((chapter, ci) => (
        <article
          key={chapter.name}
          className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5"
        >
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
                  chapter {ci + 1} · {chapter.totalArtworks} artworks
                </p>
                <h3 className="text-[20px] font-extrabold lowercase leading-tight md:text-[24px]">
                  {chapter.name}
                </h3>
              </div>
            </div>
            <div className="md:border-l md:border-white/30 md:pl-6">
              <p className="text-[12px] font-bold opacity-90 md:text-[12.5px]">
                why {chapter.name.split(" ")[0]} works
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed opacity-90 md:text-[13px]">
                {chapter.why}
              </p>
            </div>
          </header>

          {/* Teacher guidelines for the chapter */}
          <div className="border-b border-ink/5 bg-brand-cream/50 px-5 py-3 md:px-7">
            <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
              teacher guidelines
            </p>
            <ul className="mt-1.5 space-y-1">
              {chapter.guidelines.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-2 text-[11.5px] leading-relaxed text-ink-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange/80" />
                  <span className="flex-1">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <ol className="px-5 py-5 md:px-7 md:py-6">
            {chapter.projects.map((p, i) => (
              <li
                key={p.name}
                className={`relative flex items-start gap-4 ${
                  i < chapter.projects.length - 1 ? "pb-5" : ""
                }`}
              >
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
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="text-[13.5px] font-extrabold lowercase text-ink md:text-[14px]">
                      {p.name}
                    </p>
                    <span className="rounded-chip bg-brand-cream px-1.5 py-0.5 text-[10px] font-bold text-ink-muted">
                      {p.artworks} {p.artworks === 1 ? "artwork" : "artworks"}
                    </span>
                  </div>
                  {p.prep && (
                    <div className="mt-2">
                      <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
                        teacher prep
                      </p>
                      <ul className="mt-1 space-y-0.5">
                        {p.prep.map((m) => (
                          <li
                            key={m}
                            className="text-[11px] leading-relaxed text-ink-muted"
                          >
                            · {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="text-[10px] font-bold tracking-normal text-ink-subtle">
                      how to conduct
                    </p>
                    <ol className="mt-1 space-y-0.5">
                      {p.steps.map((s, si) => (
                        <li
                          key={s}
                          className="text-[11.5px] leading-relaxed text-ink-muted"
                        >
                          {si + 1}. {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </article>
      ))}

      <div className="rounded-2xl border-2 border-dashed border-brand-orange/40 bg-brand-orange/5 p-4 md:p-5">
        <p className="text-[11px] font-bold lowercase text-brand-orange">
          important — for both books
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
          All outcomes are choice-based. Children should not copy perfectly — reference images are only for inspiration. Children should choose their own colours, add details, make changes, create freely. Mess and imperfection are part of learning.
        </p>
      </div>
    </div>
  );
}
