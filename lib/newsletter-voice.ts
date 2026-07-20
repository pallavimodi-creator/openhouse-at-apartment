/**
 * parent-voice translations of each programme's skills.
 * pulled from the language guide: main-idea-first, warm, positive,
 * concrete. no comparison. no fixed-mindset labels. no jargon.
 *
 * used by the parent-facing newsletter to translate skill ids like
 * "bm" / "cs" into a sentence a parent understands without needing
 * the internal spine documentation.
 */

export interface ParentSkillCopy {
  /** short parent-friendly label — e.g. "building things that work" */
  label: string;
  /** one-sentence explanation for the newsletter body */
  body: string;
}

const COPY: Record<string, ParentSkillCopy> = {
  // ─── robotics 5-8 + 8-12 ─────────────────────────────
  bm: {
    label: "building with their hands",
    body: "your children built with real parts and real tools — fitting, adjusting, and getting a machine to actually work.",
  },
  ps: {
    label: "figuring things out",
    body: "when a build didn't work the first time, your children noticed, tried something different, and stayed with it.",
  },
  ou: {
    label: "noticing and explaining",
    body: "your children looked closely at what happened, predicted before they tested, and could say why the machine did what it did.",
  },

  // ─── art & design 5-8 + 8-12 ─────────────────────────
  lt: {
    label: "drawing with intention",
    body: "your children practised different kinds of marks — lines, textures, layers — and chose them on purpose to say something.",
  },
  sf: {
    label: "seeing shape and form",
    body: "your children learned to see the shapes inside everyday things, and to build objects and forms from them.",
  },
  cp: {
    label: "working with colour",
    body: "your children mixed their own colours, chose palettes for a mood, and got surer about how colour changes a picture.",
  },
  bc: {
    label: "composing the whole picture",
    body: "your children thought about the whole page — where things sit, what draws the eye, how the picture holds together.",
  },
  ic: {
    label: "imagining and making together",
    body: "your children brought their own ideas to the paper, and worked alongside friends to shape those ideas.",
  },

  // ─── public speaking 5-8 + 8-12 ──────────────────────
  cs: {
    label: "shaping what they say",
    body: "your children learned to give their ideas a beginning, a middle and an end — and to make one clear point land.",
  },
  bl: {
    label: "showing up in front of people",
    body: "your children practised standing still, looking at their listener, and letting their face and hands help the story.",
  },
  vs: {
    label: "using their voice",
    body: "your children played with volume, pace and expression — so the words they said reached the back of the room.",
  },

  // ─── language storytelling 3-5 (safe fallback if used) ─
  listening: {
    label: "listening well",
    body: "your children held on to what they heard and could tell it back — the events, in order.",
  },
  speaking: {
    label: "putting things into words",
    body: "your children reached for the right word, told what they saw, and connected it to their own days.",
  },
  reading: {
    label: "loving the books",
    body: "your children followed the meaning, had opinions about the characters, and asked for the story again.",
  },
  vocabulary: {
    label: "growing their words",
    body: "your children met new words in stories and started using them in their own play.",
  },
  writing: {
    label: "making marks that mean something",
    body: "your children used marks and drawings on purpose to stand for a character or an event.",
  },
};

const CATEGORY_FALLBACK: Record<string, ParentSkillCopy> = {
  art: {
    label: "art & design",
    body: "your children explored materials and techniques with more intention this month.",
  },
  language: {
    label: "language & speaking",
    body: "your children stretched their language a little further this month.",
  },
  stem: {
    label: "hands-on science",
    body: "your children built, tested, and asked why this month.",
  },
  music: {
    label: "music",
    body: "your children explored rhythm and voice this month.",
  },
  movement: {
    label: "movement",
    body: "your children moved with more control and joy this month.",
  },
};

export function parentSkillCopy(
  skillId: string,
  fallbackCategory?: string
): ParentSkillCopy {
  const direct = COPY[skillId.toLowerCase()];
  if (direct) return direct;
  const fallback = fallbackCategory
    ? CATEGORY_FALLBACK[fallbackCategory]
    : undefined;
  return fallback ?? CATEGORY_FALLBACK.stem;
}

/**
 * Turn a list of picked item labels into a natural parent-voice
 * phrase — e.g. ["crane", "bulldozer", "rickshaw"] →
 * "the crane, the bulldozer and the rickshaw".
 */
export function joinParentList(labels: string[]): string {
  const clean = labels.map((l) => l.trim().toLowerCase()).filter(Boolean);
  if (clean.length === 0) return "";
  if (clean.length === 1) return `the ${clean[0]}`;
  if (clean.length === 2) return `the ${clean[0]} and the ${clean[1]}`;
  return (
    "the " +
    clean.slice(0, -1).join(", the ") +
    ", and the " +
    clean[clean.length - 1]
  );
}

/**
 * Human-readable "from → to" for the newsletter header.
 *   {from: "2026-07-01", to: "2026-07-31"} → "1–31 july 2026"
 */
export function humanRange(from: string, to: string): string {
  const parse = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };
  const a = parse(from);
  const b = parse(to);
  if (!a && !b) return "";
  if (a && !b) {
    return a
      .toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toLowerCase();
  }
  if (!a && b) {
    return b
      .toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toLowerCase();
  }
  if (a && b) {
    const sameMonth =
      a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
    if (sameMonth) {
      const month = a
        .toLocaleDateString("en-IN", { month: "long", year: "numeric" })
        .toLowerCase();
      return `${a.getDate()}–${b.getDate()} ${month}`;
    }
    const left = a
      .toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
      })
      .toLowerCase();
    const right = b
      .toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toLowerCase();
    return `${left} → ${right}`;
  }
  return "";
}
