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
  /** one concrete "try this at home" suggestion, per openhouse voice */
  atHome: string;
  /** small emoji icon to sit next to the skill on the parent doc */
  icon: string;
}

/**
 * Category-accent colour per programme, per the openhouse-onepager
 * skill: art = yellow, language/PS = sage, robotics = periwinkle.
 * Used sparingly — the title dot, the squiggle, the milestone chips.
 */
export const CATEGORY_ACCENT: Record<string, string> = {
  art: "#F3C520",
  language: "#A3C996",
  music: "#7DBBE2",
  movement: "#A3C996",
  stem: "#B8B5DD",
};

/**
 * The parent-facing "destination" line per programme category.
 * See your child ... — the tactical real-world payoff.
 */
export const PARENT_DESTINATION: Record<string, string> = {
  robotics:
    "build real machines, ask how things work, and fall in love with science early.",
  art: "mix their own colours and fill a portfolio with original work.",
  language:
    "tell a good story, hold their own in a school debate, an elocution, a model UN.",
  stem: "notice, wonder, and test — the habits of a scientist.",
  music: "hear music with a musician's ear.",
  movement: "move with confidence and joy.",
};

/**
 * A single-sentence "why the programme matters" line, per programme
 * category — the hero "why" that lands the concept in one bold line.
 */
export const PARENT_WHY: Record<string, string> = {
  robotics:
    "the simple machines every bigger machine is built from — discovered by building.",
  art: "real technique + their own idea — the two halves of every artist.",
  language:
    "the shape of a good story, the courage to tell it, the voice that lands it.",
  stem: "wondering aloud, testing with hands, and saying why.",
  music: "listening, keeping time, joining in.",
  movement: "control, balance, and expression through the body.",
};

const COPY: Record<string, ParentSkillCopy> = {
  // ─── robotics 5-8 + 8-12 ─────────────────────────────
  bm: {
    label: "building with their hands",
    body: "the children built with real parts and real tools — fitting, adjusting, and getting a machine to actually work.",
    atHome:
      "at home, hand them the loose parts of something (a torch, a peg-clip) and let them figure out how it puts back together.",
    icon: "🔧",
  },
  ps: {
    label: "figuring things out",
    body: "when a build didn't work the first time, the children noticed, tried something different, and stayed with it.",
    atHome:
      "when they hit a snag at home, ask 'what's one small thing you could change?' — resist fixing it for them.",
    icon: "🧩",
  },
  ou: {
    label: "noticing and explaining",
    body: "the children looked closely at what happened, predicted before they tested, and could say why the machine did what it did.",
    atHome:
      "before pouring water, opening the pressure cooker, or plugging in a fan, ask 'what do you think will happen — and why?'",
    icon: "🔬",
  },

  // ─── art & design 5-8 + 8-12 ─────────────────────────
  lt: {
    label: "drawing with intention",
    body: "the children practised different kinds of marks — lines, textures, layers — and chose them on purpose to say something.",
    atHome:
      "when they draw at home, ask them to name one mark they used and why — 'why the wavy line here?'",
    icon: "✏️",
  },
  sf: {
    label: "seeing shape and form",
    body: "the children learned to see the shapes inside everyday things, and to build objects and forms from them.",
    atHome:
      "on a walk, spot the shapes inside real things together: 'a triangle roof, a circle wheel, a rectangle door.'",
    icon: "◆",
  },
  cp: {
    label: "working with colour",
    body: "the children mixed their own colours, chose palettes for a mood, and got surer about how colour changes a picture.",
    atHome:
      "next time they paint, offer only the three primaries plus white — let them mix every other colour themselves.",
    icon: "🎨",
  },
  bc: {
    label: "composing the whole picture",
    body: "the children thought about the whole page — where things sit, what draws the eye, how the picture holds together.",
    atHome:
      "when they finish a drawing, ask 'where is the first place your eye lands?' — the answer is usually the composition working.",
    icon: "⚖",
  },
  ic: {
    label: "imagining and making together",
    body: "the children brought their own ideas to the paper, and worked alongside friends to shape those ideas.",
    atHome:
      "try a two-person drawing at home — you draw a line, they add the next, back and forth, until you both see a picture.",
    icon: "✨",
  },

  // ─── public speaking 5-8 + 8-12 ──────────────────────
  cs: {
    label: "shaping what they say",
    body: "the children learned to give their ideas a beginning, a middle and an end — and to make one clear point land.",
    atHome:
      "at dinner, ask them to tell you 'one thing that happened today' — in three sentences: what, then what, then what.",
    icon: "📖",
  },
  bl: {
    label: "showing up in front of people",
    body: "the children practised standing still, looking at their listener, and letting their face and hands help the story.",
    atHome:
      "when they share something with you at home, gently ask them to stand still, look at you, and start with a pause — every time.",
    icon: "🎭",
  },
  vs: {
    label: "using their voice",
    body: "the children played with volume, pace and expression — so the words they said reached the back of the room.",
    atHome:
      "make it a game — tell the same sentence in three ways: like a whisper, like a giant, like it's the funniest thing you've ever heard.",
    icon: "🔊",
  },

  // ─── language storytelling 3-5 (safe fallback if used) ─
  listening: {
    label: "listening well",
    body: "the children held on to what they heard and could tell it back — the events, in order.",
    atHome:
      "at bedtime, ask 'what happened first in the story? what happened next?' — they'll surprise you.",
    icon: "👂",
  },
  speaking: {
    label: "putting things into words",
    body: "the children reached for the right word, told what they saw, and connected it to their own days.",
    atHome:
      "give them the last word — 'and then i…' — and let them finish the sentence with their own day.",
    icon: "🗣",
  },
  reading: {
    label: "loving the books",
    body: "the children followed the meaning, had opinions about the characters, and asked for the story again.",
    atHome:
      "let them choose the book. read the same one many nights in a row — repetition is where love of reading lives.",
    icon: "📖",
  },
  vocabulary: {
    label: "growing their words",
    body: "the children met new words in stories and started using them in their own play.",
    atHome:
      "when a new word comes up, act it out together — 'squelchy' is your fingers in a plate of dal.",
    icon: "💬",
  },
  writing: {
    label: "making marks that mean something",
    body: "the children used marks and drawings on purpose to stand for a character or an event.",
    atHome:
      "keep paper and one crayon at their eye level — the point isn't neat, it's that they choose to write.",
    icon: "✏️",
  },
};

const CATEGORY_FALLBACK: Record<string, ParentSkillCopy> = {
  art: {
    label: "art & design",
    body: "the children explored materials and techniques with more intention this month.",
    atHome:
      "keep basic art supplies out and reachable — the choice to make is half the practice.",
    icon: "🎨",
  },
  language: {
    label: "language & speaking",
    body: "the children stretched their language a little further this month.",
    atHome: "read together, then ask one open question about the story.",
    icon: "🗣",
  },
  stem: {
    label: "hands-on science",
    body: "the children built, tested, and asked why this month.",
    atHome: "before pouring, plugging, or pressing — ask them to predict first.",
    icon: "🔬",
  },
  music: {
    label: "music",
    body: "the children explored rhythm and voice this month.",
    atHome: "clap the rhythm of a favourite song together at home.",
    icon: "🎵",
  },
  movement: {
    label: "movement",
    body: "the children moved with more control and joy this month.",
    atHome: "dance together for one song a day — no rules, just movement.",
    icon: "🤸",
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
