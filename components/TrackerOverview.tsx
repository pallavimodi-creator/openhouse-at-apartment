/**
 * TrackerOverview — a visual explainer for the robotics monthly progress
 * tracker, shown above the live tool on /admin/tracker. Explains the
 * model × skill grid, where/how to observe and fill it, and what the
 * teacher fills vs what the parent receives.
 */

const PERI = "#8E8AC9";
const PERI2 = "#6a63b8";
const CORAL = "#F25E35";
const GREEN = "#5DA271";
const RED = "#e07a56";

const SKILLS = [
  { ic: "🔧", name: "building" },
  { ic: "🔬", name: "observing" },
  { ic: "🧩", name: "solving" },
  { ic: "🗣️", name: "presenting" },
];

// sample marks for the illustrative grid (matches the tool's demo)
const GRID: { model: string; marks: boolean[] }[] = [
  { model: "see-saw", marks: [true, false, true, false] },
  { model: "weighing scale", marks: [true, true, false, false] },
  { model: "crane", marks: [true, true, true, false] },
];

function Mark({ yes }: { yes: boolean }) {
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-extrabold"
      style={
        yes
          ? { background: "#eaf4ec", border: "1.5px solid #bfe0c8", color: GREEN }
          : { background: "#fdf1ec", border: "1.5px solid #f3d3c3", color: RED }
      }
    >
      {yes ? "✓" : "○"}
    </span>
  );
}

function StepArrow() {
  return (
    <div className="flex items-center justify-center text-ink/25" aria-hidden>
      <span className="hidden text-2xl md:inline">→</span>
      <span className="text-2xl md:hidden">↓</span>
    </div>
  );
}

export function TrackerOverview() {
  return (
    <section className="mb-8 rounded-2xl border border-ink/10 bg-brand-white p-5 md:p-7">
      <p
        className="text-[10px] font-extrabold uppercase tracking-[0.14em]"
        style={{ color: PERI2 }}
      >
        how it works
      </p>
      <h2 className="mt-1 text-[20px] font-extrabold lowercase text-ink md:text-[23px]">
        one page a month — the teacher marks, the parent note writes itself
      </h2>
      <p className="mt-1.5 max-w-[64ch] text-[13px] leading-relaxed text-ink-muted">
        the tracker turns what a teacher already notices into a warm monthly
        note for the family — with no writing. it has two halves: the{" "}
        <b className="text-ink">left, the teacher fills</b>; the{" "}
        <b className="text-ink">right writes itself</b> and is what the parent
        receives.
      </p>

      {/* ── the 4-step flow ── */}
      <div className="mt-6 grid grid-cols-1 items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        <FlowCard
          n="1"
          tone="peri"
          title="observe"
          body="all month, notice each child in class — and their experience book."
          foot="👁 watch in class · 📖 check the book"
        />
        <StepArrow />
        <FlowCard
          n="2"
          tone="peri"
          title="fill the grid"
          body="once a month, mark each skill for each model the child built."
          foot="✓ achieved · ○ not yet"
        />
        <StepArrow />
        <FlowCard
          n="3"
          tone="coral"
          title="note writes itself"
          body="the tool turns your marks into a plain-language note. nothing to type."
          foot="remembers earlier months too"
        />
        <StepArrow />
        <FlowCard
          n="4"
          tone="coral"
          title="parent receives"
          body="what they made, how each skill is growing, and what's next."
          foot="shared as the monthly note"
        />
      </div>

      {/* ── the model × skill grid, explained ── */}
      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-ink/10 bg-brand-cream/40 p-4">
          <p
            className="text-[11px] font-extrabold lowercase"
            style={{ color: PERI2 }}
          >
            the model × skill grid — what the teacher fills
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            every row is a <b className="text-ink">model the child built</b>.
            every column is one of the <b className="text-ink">4 robotics
            skills</b>. because every build naturally uses all four, each cell
            gets a mark.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="pb-2 pr-2 text-left text-[10px] font-extrabold lowercase text-ink-muted">
                    model
                  </th>
                  {SKILLS.map((s) => (
                    <th
                      key={s.name}
                      className="px-1 pb-2 text-center text-[9.5px] font-bold lowercase text-ink-muted"
                    >
                      <span className="block text-[14px]">{s.ic}</span>
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GRID.map((row) => (
                  <tr key={row.model}>
                    <td className="whitespace-nowrap py-1 pr-2 text-[12px] font-extrabold text-ink">
                      {row.model}
                    </td>
                    {row.marks.map((m, i) => (
                      <td key={i} className="px-1 py-1 text-center">
                        <Mark yes={m} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 rounded-lg p-3 text-[11.5px] leading-relaxed"
            style={{ background: "#f6f4fb", border: "1px solid #e2dbee" }}
          >
            <b style={{ color: PERI2 }}>how to fill a cell:</b> tap it to see{" "}
            <b>👁 what to watch in class</b> and <b>📖 what to check in the
            book</b>. mark <b style={{ color: GREEN }}>✓ achieved</b> when you
            saw it in class <b>and</b> it&apos;s in the book · mark{" "}
            <b style={{ color: RED }}>○ not yet</b> if either isn&apos;t there
            yet. built another model? add it and mark that row too.
          </div>
        </div>

        {/* what goes to the parent */}
        <div
          className="rounded-xl p-4 text-white"
          style={{ background: CORAL }}
        >
          <p className="text-[11px] font-extrabold lowercase opacity-90">
            what the parent receives — written for you
          </p>
          <p className="mt-1 text-[12px] leading-relaxed opacity-95">
            the same marks, turned into a note a family understands at a glance:
          </p>
          <ul className="mt-3 space-y-2.5">
            {[
              ["📌", "what they made", "the models they built this month"],
              [
                "🌱",
                "each skill, over the month",
                "steady · growing · just starting — from the ticks across their models",
              ],
              [
                "💛",
                "worth working on next",
                "the one skill to nudge, with a simple at-home idea",
              ],
              [
                "🎓",
                "the road to level-up",
                "which concepts are covered, which skills are steady, and whether they're ready to move up",
              ],
            ].map(([ic, h, b]) => (
              <li key={h} className="flex gap-2.5">
                <span className="text-[15px] leading-none">{ic}</span>
                <span className="text-[12px] leading-snug">
                  <b>{h}</b>
                  <span className="block opacity-90">{b}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-white/25 pt-2.5 text-[11px] italic opacity-90">
            the teacher never writes this — it&apos;s assembled from the grid.
          </p>
        </div>
      </div>

      {/* ── where & when ── */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ["when", "once a month, at month-end — from what you remember plus the child's book. ~2 minutes per child."],
          ["where the evidence is", "two places, always: what you saw in class, and what's on the child's experience-book pages."],
          ["how it's used", "share the note with the family; the “road to level-up” shows readiness to move up a level."],
        ].map(([h, b]) => (
          <div key={h} className="rounded-xl border border-ink/10 p-3.5">
            <p
              className="text-[10px] font-extrabold uppercase tracking-[0.1em]"
              style={{ color: PERI2 }}
            >
              {h}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowCard({
  n,
  tone,
  title,
  body,
  foot,
}: {
  n: string;
  tone: "peri" | "coral";
  title: string;
  body: string;
  foot: string;
}) {
  const accent = tone === "peri" ? PERI2 : CORAL;
  const bg = tone === "peri" ? "#f6f4fb" : "#fff4ef";
  const border = tone === "peri" ? "#e2dbee" : "#f7ddd0";
  return (
    <div
      className="flex h-full flex-col rounded-xl p-3.5"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
          style={{ background: accent }}
        >
          {n}
        </span>
        <span
          className="text-[13px] font-extrabold lowercase"
          style={{ color: accent }}
        >
          {title}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] leading-snug text-ink">{body}</p>
      <p className="mt-auto pt-2 text-[10.5px] font-semibold text-ink-muted">
        {foot}
      </p>
    </div>
  );
}
