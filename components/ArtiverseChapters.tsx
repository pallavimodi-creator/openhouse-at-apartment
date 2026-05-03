/**
 * Artiverse chapter notes — used both inside the Artiverse book route and
 * the 3-5 overview segment. Three chapters (Paper · Crayon · Paint), each
 * with a "why it works" cover line and project descriptions.
 */
interface Chapter {
  name: string;
  tone: { bg: string; pill: string; text: string };
  coverLine: string;
  projects: { name: string; desc: string }[];
}

const CHAPTERS: Chapter[] = [
  {
    name: "Paper",
    tone: {
      bg: "bg-[#F5D547]/15",
      pill: "bg-[#F5D547]/40 text-amber-900",
      text: "text-amber-900",
    },
    coverLine:
      "Paper is easy to tear, fold, and move. It builds finger strength, control, and early planning without needing tools.",
    projects: [
      {
        name: "Colourful Papers",
        desc: "Tear and place pieces to create their own picture (using references) — building finger control, colour exploration, and independent choices.",
      },
      {
        name: "Accordions",
        desc: "Fold paper back and forth to make and transform forms of their choice — building coordination, control, and spatial awareness.",
      },
      {
        name: "Circles",
        desc: "Trace, stamp, or draw circles to build their own compositions — developing shape control and intentional mark-making.",
      },
      {
        name: "Mosaics",
        desc: "Place small pieces to create patterns or images — building precision, planning, and colour selection.",
      },
      {
        name: "Loops / Chains",
        desc: "Link materials to create chains or forms of their choice — building finger control, sequencing, and repetition.",
      },
    ],
  },
  {
    name: "Crayon",
    tone: {
      bg: "bg-brand-orange/10",
      pill: "bg-brand-orange/20 text-brand-orange",
      text: "text-brand-orange",
    },
    coverLine:
      "Crayons are stable and forgiving. They help children control marks, stay within space, and begin using colour with intent.",
    projects: [
      {
        name: "Doodling",
        desc: "Make free marks to create their own drawings — building grip control and mark confidence.",
      },
      {
        name: "Colouring",
        desc: "Fill shapes with chosen colours (using references) — building control within space and colour recognition.",
      },
      {
        name: "Mixing",
        desc: "Layer colours while making their own artwork — building colour awareness and early mixing understanding.",
      },
    ],
  },
  {
    name: "Paint",
    tone: {
      bg: "bg-category-stem/15",
      pill: "bg-category-stem/30 text-blue-900",
      text: "text-blue-900",
    },
    coverLine:
      "Paint is fluid and responsive. It helps children explore movement, pressure, and cause-effect while expressing ideas more freely.",
    projects: [
      {
        name: "Hand Painting (Greeting Cards)",
        desc: "Use hands to print and create their own images — building sensory comfort and whole-hand control.",
      },
      {
        name: "Finger Painting (Greeting Cards)",
        desc: "Use fingers to spread and create — building finger control and direct interaction with colour.",
      },
      {
        name: "Sponge Painting",
        desc: "Dab and press to create textures and images — building pressure control and pattern awareness.",
      },
      {
        name: "Q-Tips Painting",
        desc: "Dot and detail to build images — strengthening precision and repeated pattern-making.",
      },
      {
        name: "Watercolour",
        desc: "Use brush and water to create fluid artworks — building brush control and colour exploration.",
      },
      {
        name: "Blow & Splatter",
        desc: "Blow or splatter paint and build images from the result — exploring cause-effect and creative interpretation.",
      },
    ],
  },
];

export function ArtiverseChapters({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      {CHAPTERS.map((chapter) => (
        <div
          key={chapter.name}
          className={`overflow-hidden rounded-xl ${chapter.tone.bg} p-4 md:p-5`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`rounded-chip px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${chapter.tone.pill}`}
            >
              chapter
            </span>
            <p className={`text-[15px] font-extrabold ${chapter.tone.text}`}>
              {chapter.name}
            </p>
          </div>

          <p className="mt-2 text-[12px] italic leading-relaxed text-ink-muted md:text-[13px]">
            <span className="font-semibold not-italic text-ink">
              why {chapter.name.toLowerCase()} works ·{" "}
            </span>
            {chapter.coverLine}
          </p>

          <div
            className={`mt-3 grid gap-2 ${
              compact ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {chapter.projects.map((p) => (
              <div
                key={p.name}
                className="rounded-lg bg-brand-white p-3 shadow-card ring-1 ring-ink/5"
              >
                <p className="text-[12.5px] font-bold text-ink">{p.name}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Important footer */}
      <div className="rounded-xl bg-ink/[0.04] p-4 ring-1 ring-ink/10">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-orange">
          important
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
          all outcomes are choice-based. children create their own versions,
          using reference images only as inspiration.
        </p>
      </div>
    </div>
  );
}
