/**
 * Short parent-facing captions per activity id — used on the newsletter
 * (both the editor's checkbox subtitles and the parent view's item cards).
 *
 * The programme .ts files carry a longer `goal` sentence that's teacher-
 * facing. Parents need a cleaner one-liner that names what actually
 * happened in class — grounded in the real experiment cue cards and
 * build kits.
 *
 * If an id isn't listed here, the code falls back to the activity's
 * goal / setupLine, so this map only needs to cover the items we care
 * enough to rewrite.
 */

export const PARENT_ITEM_DESCRIPTION: Record<string, string> = {
  // ─── robotics 5-8 · builds ───────────────────────────
  "build-bulldozer":
    "a working bulldozer — blade and tracks driven by gears.",
  "build-copter":
    "a copter — a hand crank spins the blades through a gear train.",
  "build-crane":
    "a working crane — tested for how much it can lift before it tips.",
  "build-drawbridge":
    "a drawbridge that raises and lowers with axles and a pulley.",
  "build-fishing-rod":
    "a fishing rod with a lever arm and a pulley reel that lifts a load.",
  "build-rickshaw":
    "a rickshaw on wheels and axles — tested for how far and how straight it rolls.",
  "build-see-saw":
    "a see-saw tested to balance two known weights.",
  "build-tow-truck":
    "a tow truck that rolls on axles and winches a load with a pulley.",
  "build-weighing-scale":
    "a weighing scale calibrated so the beam balances with equal weights.",
  "build-wind-turbine":
    "a wind turbine — spinning blades drive a pulley that lifts a load.",

  // ─── robotics 5-8 · experiments (level 1) ────────────
  "l1-levers-e1": "does a longer lever make lifting easier?",
  "l1-levers-e2": "does a heavier weight need more effort?",
  "l1-levers-e3": "when does a see-saw balance?",
  "l1-levers-e4": "which everyday objects balance a 0.5 kg weight?",
  "l1-pulleys-e1": "does the load change the effort on a pulley?",
  "l1-pulleys-e2": "how does a pulley change the direction of a pull?",
  "l1-pulleys-e3": "does the pulley's height change the effort?",
  "l1-pulleys-e4": "does the pull direction change the effort reading?",
  "l1-pulleys-e5": "does load change effort on a double pulley?",
  "l1-gears-e1": "which way does the second gear turn?",
  "l1-gears-e2": "how many big-gear turns for 3, 5, 8 small-gear turns?",
  "l1-gears-e3": "how many small-gear turns for 3, 5, 8 big-gear turns?",
  "l1-gears-e4": "how many gear-b turns for 4, 6, 9 gear-a turns?",
  "l1-wheel-axle-e2": "does load change how far a cart rolls?",
  "l1-wheel-axle-e3": "does where you place the load change the roll?",

  // ─── robotics 5-8 · experiments (level 2) ────────────
  "l2-levers-e1":
    "how much easier does a lever make lifting 1, 1.5, and 2 kg?",
  "l2-levers-e5": "move the fulcrum until 0.5 kg balances 1.5 kg.",
  "l2-levers-e6":
    "which lever length needs the least effort to lift 2 kg?",
  "l2-pulleys-e1": "measure the effort to lift 0.5, 1, 1.5 kg on a double pulley.",
  "l2-pulleys-e4": "does pulley height change the effort for 3 kg?",
  "l2-pulleys-e5": "does pull direction change the effort for 3 kg?",
  "l2-gears-e1":
    "work out the ratio when you turn a small gear 6, 9, 12 times.",
  "l2-wheel-axle-e2": "does load change roll distance for 2, 2.5, 3 kg?",
  "l2-wheel-axle-e3":
    "does front-axle angle change the direction the cart rolls?",
  "l2-wheel-axle-e4":
    "does load position change the roll — centre vs back?",
  "l2-wheel-axle-e5":
    "do close vs far axles change how far a cart rolls?",
};

/**
 * Best parent-facing description for an activity id.
 * Prefers the curated one-liner, falls back to whatever the caller
 * passed as the raw goal/setupLine.
 */
export function parentItemDescription(
  id: string,
  fallback: string | undefined
): string | undefined {
  const curated = PARENT_ITEM_DESCRIPTION[id];
  return curated ?? fallback;
}
