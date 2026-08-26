"use client";

/**
 * Music daily flow — the 3 parts of every class, each with whether it is
 * rotating or linear, and (for the band) the general rules for how band play
 * happens. Shown under the timeline bar on the music overview.
 */

type FlowKind = "rotating" | "linear" | "band";

const KIND_STYLE: Record<FlowKind, { label: string; cls: string }> = {
  rotating: { label: "rotating", cls: "bg-segment-yellow/30 text-ink" },
  linear: { label: "linear", cls: "bg-segment-blue/25 text-ink" },
  band: { label: "band", cls: "bg-segment-green/25 text-ink" },
};

const PARTS: {
  n: number;
  name: string;
  time: string;
  kind: FlowKind;
  kindNote: string;
  body: string;
}[] = [
  {
    n: 1,
    name: "warm up",
    time: "10 min",
    kind: "rotating",
    kindNote: "the warm-up games rotate",
    body: "a short whole-group warm-up — the educator picks one vocal and one rhythm game, and rotates them across classes so it stays fresh.",
  },
  {
    n: 2,
    name: "instrument rotation",
    time: "50 min",
    kind: "linear",
    kindNote: "the books go in order, page by page",
    body: "individual play. each child works through their own level book — the books are linear, done in order. children rotate through two instruments a class by their own choice; the instrument they aren't playing in the band is practised here. a monthly assessment moves a child up a level, per instrument. exploring a different instrument is only a gentle nudge, never a rule — a child can go as deep as they like on the instrument they love and move up the levels on that alone.",
  },
  {
    n: 3,
    name: "ensemble play",
    time: "30 min",
    kind: "band",
    kindNote: "how band play works",
    body: "the whole group plays the band song together. each child is given one instrument by interest, ability & rotation, and reads their part at their own book level. the band song runs in a fixed order per level; the group performs roughly every two months — as a band and with individual performances.",
  },
];

export function MusicDailyFlow() {
  return (
    <div className="mt-4 space-y-3">
      {PARTS.map((p) => {
        const kind = KIND_STYLE[p.kind];
        return (
          <div
            key={p.n}
            className="rounded-2xl bg-brand-white p-4 shadow-card ring-1 ring-ink/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-[11px] font-extrabold text-brand-orange">
                {p.n}
              </span>
              <p className="text-[14px] font-extrabold lowercase text-ink">{p.name}</p>
              <span className="rounded-chip bg-ink/[0.05] px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                {p.time}
              </span>
              <span
                className={`rounded-chip px-2 py-0.5 text-[10px] font-extrabold lowercase ${kind.cls}`}
              >
                {kind.label}
              </span>
              <span className="text-[10.5px] italic text-ink-subtle">{p.kindNote}</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">{p.body}</p>
          </div>
        );
      })}
    </div>
  );
}
