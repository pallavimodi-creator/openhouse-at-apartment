/**
 * Artistotle chapter notes — used both inside the Artistotle book route and
 * the 3-5 overview segment. Three illustrators (Eric Carle · Lois Ehlert ·
 * Taro Gomi), each with a "why this artist works" cover line and short
 * descriptions of the two projects in their chapter.
 */
interface ArtistotleChapter {
  illustrator: string;
  tone: { bg: string; pill: string; text: string };
  coverLine: string;
  techniqueSpotlight?: string;
  projects: { name: string; desc: string }[];
}

const CHAPTERS: ArtistotleChapter[] = [
  {
    illustrator: "Eric Carle",
    tone: {
      bg: "bg-segment-yellow/15",
      pill: "bg-segment-yellow/30 text-ink",
      text: "text-ink",
    },
    coverLine:
      "Big, bold, joyful. Eric Carle's collage characters are made from layers of hand-painted paper. Children meet the technique, then make their own collage pieces in the same spirit.",
    techniqueSpotlight:
      "Texture papers · cut and torn shapes · layering big bright colour fields into a recognisable creature.",
    projects: [
      {
        name: "Project 1 — Hungry Caterpillar",
        desc: "Make a textured-paper caterpillar over 3 sessions. Day 1 paint texture papers · Day 2 cut shapes · Day 3 build the caterpillar.",
      },
      {
        name: "Project 2 — Create Your Own World",
        desc: "Use your texture papers to build a full scene — fish, jellyfish, planets, rockets, trees. Layered into a busy underwater or outer-space world.",
      },
    ],
  },
  {
    illustrator: "Lois Ehlert",
    tone: {
      bg: "bg-brand-orange/10",
      pill: "bg-brand-orange/20 text-brand-orange",
      text: "text-brand-orange",
    },
    coverLine:
      "Geometry made warm. Lois Ehlert builds animals and plants from clean cut shapes — circles, triangles, semicircles. Children learn to see the shapes hiding inside everyday creatures.",
    projects: [
      {
        name: "Project 3 — Colourful Flower Garden",
        desc: "Sponge-print bright flower circles and stack them into a tall garden over 3 sessions. Day 1 make the circles · Day 2 add details · Day 3 build the full garden.",
      },
      {
        name: "Project 4 — Geometric Animals",
        desc: "Cut coloured paper into circles, semicircles, triangles, and strips. Combine them into a crab, a chick, an owl — animals built entirely from geometry.",
      },
    ],
  },
  {
    illustrator: "Taro Gomi",
    tone: {
      bg: "bg-segment-blue/15",
      pill: "bg-segment-blue/25 text-ink",
      text: "text-ink",
    },
    coverLine:
      "Loose, playful, alive. Taro Gomi draws people and places with simple lines and big personality. Children learn to draw without worrying about perfection.",
    projects: [
      {
        name: "Project 5 — Create Your Own Characters",
        desc: "Draw a row of people you know — family, friends, anyone. Day 1 outline the figures · Day 2 add more characters · Day 3 colour and finish.",
      },
      {
        name: "Project 6 — My Map",
        desc: "Draw places — home, school, park, shop — then connect them with roads and add details. Day 1 draw places · Day 2 add colour · Day 3 paint the roads connecting everything.",
      },
    ],
  },
];

export function ArtistotleChapters({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-4">
      {CHAPTERS.map((chapter) => (
        <div
          key={chapter.illustrator}
          className={`overflow-hidden rounded-xl ${chapter.tone.bg} p-4 md:p-5`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`rounded-chip px-2.5 py-0.5 text-[10px] font-bold ${chapter.tone.pill}`}
            >
              illustrator
            </span>
            <p className={`text-[15px] font-extrabold ${chapter.tone.text}`}>
              {chapter.illustrator}
            </p>
          </div>

          <p className="mt-2 text-[12px] italic leading-relaxed text-ink-muted md:text-[13px]">
            <span className="font-semibold not-italic text-ink">
              why {chapter.illustrator.toLowerCase()} works ·{" "}
            </span>
            {chapter.coverLine}
          </p>

          {chapter.techniqueSpotlight && (
            <p className="mt-2 rounded-lg bg-brand-white px-3 py-2 text-[11.5px] leading-relaxed text-ink-muted ring-1 ring-ink/5">
              <span className="font-bold text-ink">
                technique spotlight ·{" "}
              </span>
              {chapter.techniqueSpotlight}
            </p>
          )}

          <div
            className={`mt-3 grid gap-2 ${
              compact ? "md:grid-cols-2" : "md:grid-cols-2"
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
        <p className="text-[11px] font-bold text-brand-orange">
          important
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
          children make in the spirit of the illustrator, not copies of their
          work. reference images set the tone — the child's piece is their own.
        </p>
      </div>
    </div>
  );
}
