/**
 * Artistotle chapter notes — infographic-style illustrator profiles.
 *
 * Each illustrator renders as:
 *   - a solid coloured band with the illustrator name + a brand emoji + a
 *     vertical divider with the "why <illustrator> works" cover line
 *   - an optional "technique spotlight" callout strip below the band
 *   - a numbered list of projects with circle numbers and a dotted
 *     connector running between them
 *
 * Used inside /artistotle-book and the 3-5 overview Artistotle block.
 */
interface ArtistotleChapter {
  illustrator: string;
  /** Single emoji used in the band. */
  emoji: string;
  /** Tailwind classes for the band. */
  band: { bg: string; ink: string };
  coverLine: string;
  techniqueSpotlight?: string;
  projects: { name: string; desc: string }[];
}

const CHAPTERS: ArtistotleChapter[] = [
  {
    illustrator: "eric carle",
    emoji: "🐛",
    band: { bg: "bg-segment-yellow", ink: "text-ink" },
    coverLine:
      "big, bold, joyful. eric carle's collage characters are made from layers of hand-painted paper. children meet the technique, then make their own collage pieces in the same spirit.",
    techniqueSpotlight:
      "texture papers · cut and torn shapes · layering big bright colour fields into a recognisable creature.",
    projects: [
      {
        name: "project 1 — hungry caterpillar",
        desc: "make a textured-paper caterpillar over 3 sessions. day 1 paint texture papers · day 2 cut shapes · day 3 build the caterpillar.",
      },
      {
        name: "project 2 — create your own world",
        desc: "use your texture papers to build a full scene — fish, jellyfish, planets, rockets, trees. layered into a busy underwater or outer-space world.",
      },
    ],
  },
  {
    illustrator: "lois ehlert",
    emoji: "🌸",
    band: { bg: "bg-brand-orange", ink: "text-white" },
    coverLine:
      "geometry made warm. lois ehlert builds animals and plants from clean cut shapes — circles, triangles, semicircles. children learn to see the shapes hiding inside everyday creatures.",
    projects: [
      {
        name: "project 3 — colourful flower garden",
        desc: "sponge-print bright flower circles and stack them into a tall garden over 3 sessions. day 1 make the circles · day 2 add details · day 3 build the full garden.",
      },
      {
        name: "project 4 — geometric animals",
        desc: "cut coloured paper into circles, semicircles, triangles, and strips. combine them into a crab, a chick, an owl — animals built entirely from geometry.",
      },
    ],
  },
  {
    illustrator: "taro gomi",
    emoji: "🗺️",
    band: { bg: "bg-segment-blue", ink: "text-ink" },
    coverLine:
      "loose, playful, alive. taro gomi draws people and places with simple lines and big personality. children learn to draw without worrying about perfection.",
    projects: [
      {
        name: "project 5 — create your own characters",
        desc: "draw a row of people you know — family, friends, anyone. day 1 outline the figures · day 2 add more characters · day 3 colour and finish.",
      },
      {
        name: "project 6 — my map",
        desc: "draw places — home, school, park, shop — then connect them with roads and add details. day 1 draw places · day 2 add colour · day 3 paint the roads connecting everything.",
      },
    ],
  },
];

export function ArtistotleChapters({ compact = false }: { compact?: boolean }) {
  // `compact` kept for API compatibility — the infographic layout reads
  // well at any width without alternative column variants.
  void compact;
  return (
    <div className="space-y-6">
      {CHAPTERS.map((chapter, ci) => (
        <article
          key={chapter.illustrator}
          className="overflow-hidden rounded-2xl bg-brand-white shadow-card ring-1 ring-ink/5"
        >
          {/* Illustrator band */}
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
                  illustrator {ci + 1}
                </p>
                <h3 className="text-[22px] font-extrabold lowercase leading-tight md:text-[26px]">
                  {chapter.illustrator}
                </h3>
              </div>
            </div>
            <div className="md:border-l md:border-white/30 md:pl-6">
              <p className="text-[12px] font-bold opacity-90 md:text-[12.5px]">
                why {chapter.illustrator} works
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed opacity-90 md:text-[13px]">
                {chapter.coverLine}
              </p>
            </div>
          </header>

          {/* Technique spotlight callout — only Eric Carle has one today */}
          {chapter.techniqueSpotlight && (
            <div className="border-b border-ink/5 bg-brand-cream/60 px-5 py-3 md:px-7">
              <p className="text-[11px] font-bold lowercase text-brand-orange">
                technique spotlight
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink md:text-[13px]">
                {chapter.techniqueSpotlight}
              </p>
            </div>
          )}

          {/* Projects — numbered list with dotted connector */}
          <ol className="relative px-5 py-5 md:px-7 md:py-6">
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
          children make in the spirit of the illustrator, not copies of their
          work. reference images set the tone — the child&apos;s piece is
          their own.
        </p>
      </div>
    </div>
  );
}
