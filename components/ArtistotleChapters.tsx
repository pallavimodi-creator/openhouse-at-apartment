/**
 * Artistotle chapter notes — final teacher-handbook structure.
 *
 * Three illustrators: Eric Carle · Lois Ehlert · Taro Gomi. Each
 * project lists how to conduct it. Used inside the artistotle book
 * modal as the side-panel reference.
 */
interface Project {
  name: string;
  steps: string[];
}

interface ArtistotleChapter {
  illustrator: string;
  emoji: string;
  band: { bg: string; ink: string };
  why: string;
  projects: Project[];
}

const CHAPTERS: ArtistotleChapter[] = [
  {
    illustrator: "eric carle",
    emoji: "🐛",
    band: { bg: "bg-segment-yellow", ink: "text-ink" },
    why: "Focus on collage and texture.",
    projects: [
      {
        name: "stripes collage",
        steps: [
          "Children arrange strips.",
          "Overlap freely.",
          "Stick after arranging.",
        ],
      },
      {
        name: "caterpillar collage",
        steps: [
          "Arrange circles in a line.",
          "Stick.",
          "Add details.",
        ],
      },
      {
        name: "fruit & vegetable collage",
        steps: [
          "Tear paper.",
          "Arrange into shapes.",
          "Stick freely.",
        ],
      },
      {
        name: "jellyfish collage",
        steps: [
          "Use a circle for the head.",
          "Add strips for tentacles.",
          "Layer materials.",
        ],
      },
    ],
  },
  {
    illustrator: "lois ehlert",
    emoji: "🌻",
    band: { bg: "bg-brand-orange", ink: "text-white" },
    why: "Focus on bold colour and layering.",
    projects: [
      {
        name: "sponge flowers",
        steps: ["Dab sponge.", "Repeat for petals."],
      },
      {
        name: "brush flowers",
        steps: ["Use brush strokes.", "Create simple flowers."],
      },
      {
        name: "swirling flowers",
        steps: ["Move brush in circles.", "Create loose shapes."],
      },
      {
        name: "two-layer garden",
        steps: ["Paint the background.", "Add flowers on top."],
      },
    ],
  },
  {
    illustrator: "taro gomi",
    emoji: "🖍️",
    band: { bg: "bg-segment-blue", ink: "text-ink" },
    why: "Focus on playful drawing and expression.",
    projects: [
      {
        name: "simple colouring",
        steps: ["Colour the bear (day 1) and tiger (day 2) worksheets.", "Add playful details and a background."],
      },
      {
        name: "line making 1",
        steps: ["Practise lines and patterns."],
      },
      {
        name: "line making 2",
        steps: ["Fill objects using patterns."],
      },
      {
        name: "draw & colour 1",
        steps: ["Draw simple objects.", "Colour freely."],
      },
      {
        name: "draw & colour 2",
        steps: ["Create a full scene.", "Encourage storytelling."],
      },
    ],
  },
];

export function ArtistotleChapters({ compact = false }: { compact?: boolean }) {
  void compact;
  const totalProjects = CHAPTERS.reduce((s, c) => s + c.projects.length, 0);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-brand-orange/15 p-4 ring-1 ring-brand-orange/30">
        <p className="text-[11px] font-bold tracking-normal text-brand-orange">
          three illustrators · {totalProjects} projects · ~15–20 sessions
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
          Artistotle focuses on learning art through the styles of well-known illustrators. Children create artworks inspired by each artist while making their own choices.
        </p>
        <ul className="mt-2 space-y-1 text-[11.5px] leading-relaxed text-ink-muted">
          <li>· Introduce the artist simply (1–2 lines only).</li>
          <li>· Focus on technique, not copying.</li>
          <li>· Allow interpretation.</li>
        </ul>
      </div>

      {CHAPTERS.map((chapter, ci) => (
        <article
          key={chapter.illustrator}
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
                  artist {ci + 1} · {chapter.projects.length} projects
                </p>
                <h3 className="text-[20px] font-extrabold lowercase leading-tight md:text-[24px]">
                  {chapter.illustrator}
                </h3>
              </div>
            </div>
            <div className="md:border-l md:border-white/30 md:pl-6">
              <p className="text-[12px] font-bold opacity-90 md:text-[12.5px]">
                why {chapter.illustrator.split(" ")[0]} works
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed opacity-90 md:text-[13px]">
                {chapter.why}
              </p>
            </div>
          </header>

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
                  <p className="text-[13.5px] font-extrabold lowercase text-ink md:text-[14px]">
                    {p.name}
                  </p>
                  <div className="mt-1.5">
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
          final note
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
          The goal is not to create perfect artwork. The goal is to help children feel confident, explore materials, and express ideas.
        </p>
      </div>
    </div>
  );
}
