/**
 * Concept map for the robotics 5-8 newsletter.
 * A crane is really about pulleys. A see-saw is really about levers.
 * The build and the experiments belong to the SAME concept — the
 * newsletter groups them together so parents see the connection:
 * "children built X to feel a Y at work; they ran experiments to
 * discover why Y behaves the way it does."
 *
 * All content grounded in the openhouse robotics brochure +
 * mechanics experience book.
 */

export type Mechanism = "lever" | "pulley" | "gear" | "wheel-axle";

/** For a given build id, which mechanism the child felt at work. */
export const BUILD_MECHANISM: Record<string, Mechanism[]> = {
  "build-see-saw": ["lever"],
  "build-weighing-scale": ["lever"],
  "build-fishing-rod": ["lever", "pulley"],
  "build-crane": ["pulley"],
  "build-wind-turbine": ["pulley"],
  "build-drawbridge": ["pulley", "wheel-axle"],
  "build-tow-truck": ["pulley", "wheel-axle"],
  "build-copter": ["gear"],
  "build-bulldozer": ["gear"],
  "build-rickshaw": ["wheel-axle"],
};

/** For a given experiment id, which mechanism it probes. */
export function experimentMechanism(id: string): Mechanism | null {
  const l = id.toLowerCase();
  if (l.includes("lever")) return "lever";
  if (l.includes("pulley")) return "pulley";
  if (l.includes("gear")) return "gear";
  if (l.includes("wheel") || l.includes("axle")) return "wheel-axle";
  return null;
}

/**
 * Parent-facing story for each mechanism — the label a robotics teacher
 * would give in a note to parents, plus a plain-language line about what
 * children discover through the build + experiments together.
 * Grounded in the mechanics brochure ("simple machines — the building
 * blocks bigger machines are made from") + the experience book.
 */
export interface MechanismStory {
  /** short parent-friendly name — "levers" / "pulleys" */
  label: string;
  /** the small emoji sits next to the section title */
  icon: string;
  /** one line naming the concept — what a lever/pulley/gear IS */
  what: string;
  /** what the children discovered through the build + experiments */
  learnt: string;
}

export const MECHANISM_STORY: Record<Mechanism, MechanismStory> = {
  lever: {
    label: "levers",
    icon: "⚖",
    what: "a stick that turns on a fulcrum — the simplest way to move a heavy thing with less effort.",
    learnt:
      "the children discovered that a longer lever needs less effort to lift the same weight, that a heavier load needs more effort, and that two equal weights on either side sit level. this is the science of a see-saw, a bottle-opener, a spoon in the hand — everyday levers in disguise.",
  },
  pulley: {
    label: "pulleys",
    icon: "🪝",
    what: "a wheel with a rope — the machine that changes the direction of a pull, so we can lift something up by pulling down.",
    learnt:
      "the children saw that a pulley lets us lift a load without climbing next to it, and that a second pulley makes the same lift feel easier. this is what every crane, every window blind, every flag mast is quietly doing.",
  },
  gear: {
    label: "gears",
    icon: "⚙",
    what: "two toothed wheels that turn each other — the way we take one spin and make it faster, slower, or in the other direction.",
    learnt:
      "the children counted turns and worked out the ratio: turn the small gear once, and the big gear turns less than once; the other way, and it spins many times. this is how a hand-crank on a copter becomes fast spinning blades, or a bicycle pedal becomes a rolling wheel.",
  },
  "wheel-axle": {
    label: "wheels & axles",
    icon: "🛞",
    what: "a wheel fixed on a rod — the machine that turns a push into rolling.",
    learnt:
      "the children pushed loaded carts and found out how load, load position, and axle position change how far and how straight the cart rolls. this is the science under every rickshaw, every car, every trolley — invisible until you build one yourself.",
  },
};

/** Order the mechanisms for a stable, sensible newsletter section order. */
export const MECHANISM_ORDER: Mechanism[] = ["lever", "pulley", "gear", "wheel-axle"];

/**
 * The programme's engineering story — the parent-facing intro that
 * frames WHY mechanics matters. Straight from the robotics brochure's
 * "machines first, then electricity, then code" thesis.
 */
export const PROGRAMME_ENGINEERING_STORY: Record<
  string,
  { headline: string; body: string }
> = {
  "robotics-5-8": {
    headline: "why we start with machines",
    body: "engineering is the habit of understanding how things work — and then using that understanding to build. at openhouse, we teach it the way humans invented it: machines first, then electricity, then code. every new idea builds on one the child already understands, with their own hands. this window has been about mechanics — levers, pulleys, gears, wheels. these are the simple machines every bigger machine is built from. before a child can design a robot, they need to feel these in their hands. that is what has been happening in your class.",
  },
  "robotics-8-12": {
    headline: "why we start with machines",
    body: "engineering is the discipline of solving real problems by understanding how things work — then designing, testing, and improving. at openhouse we teach it in the order humans invented it: machines first, then electricity, then code. this window has been about mechanics — the simple machines every complex one is built from. the children didn't just build; they measured, calculated, and explained. that is engineering.",
  },
  "art-design-5-8": {
    headline: "why we teach it this way",
    body: "art at openhouse is real technique + the child's own idea — the two halves of every artist. we start with the alphabet of drawing: line, shape, colour, composition. every technique they meet becomes a tool for their own choice.",
  },
  "art-design-8-12": {
    headline: "why we teach it this way",
    body: "art at openhouse is real technique + intentional expression. we build the craft — line, shape, colour, composition — so the child can make choices, and articulate why. that is design thinking.",
  },
  "public-speaking-5-8": {
    headline: "why speaking matters early",
    body: "speaking well is not born, it's built — one story, one turn at the front, one clear closing at a time. we work on three things at once: what they say (structure), how they show up (presence), and how their voice carries. by class debate age, this is the difference between an idea heard and one lost.",
  },
  "public-speaking-8-12": {
    headline: "why speaking matters early",
    body: "speaking well is a skill of composure + craft — the shape of a good argument, presence under pressure, a voice that reaches the room. we build all three at once, so by school debate and Model UN age, the child is ready to speak for an idea they believe in.",
  },
};

/** Programme category → parent-facing signature the teacher signs off with. */
export const PROGRAMME_SIGNATURE: Record<string, string> = {
  robotics: "your robotics team at openhouse",
  art: "your art & design team at openhouse",
  language: "your public speaking team at openhouse",
  stem: "your stem team at openhouse",
};

/**
 * How to phrase each segment of a games-based programme (public
 * speaking, art games) in the parent doc — the natural sentence a
 * teacher would use. e.g. roll-call → "this time we warmed up with…".
 */
export const SEGMENT_PHRASING: Record<
  string,
  { icon: string; lead: string }
> = {
  "roll-call": { icon: "🙌", lead: "this time we warmed up with" },
  playground: { icon: "🎲", lead: "we played" },
  showtime: { icon: "🎤", lead: "we took to the stage with" },
  "sign-off": { icon: "👋", lead: "we closed each class with" },
  "art-games": { icon: "🎨", lead: "we played" },
  "art-gym": { icon: "✏️", lead: "we warmed up our hands with" },
};
