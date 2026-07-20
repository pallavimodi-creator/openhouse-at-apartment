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
  // simple "what the children did" statements, for parents.
  "l1-levers-e1": "lifting a weight with long and short levers, to feel which is easier.",
  "l1-levers-e2": "lifting a light and a heavy weight, to feel which takes more effort.",
  "l1-levers-e3": "balancing equal weights on either side of a see-saw.",
  "l1-levers-e4": "hunting for everyday things that balance a weight.",
  "l1-pulleys-e1": "lifting light and heavy loads with a pulley.",
  "l1-pulleys-e2": "using a pulley to pull down and lift something up.",
  "l1-pulleys-e3": "lifting a load from different heights with a pulley.",
  "l1-pulleys-e4": "pulling the pulley rope from different sides.",
  "l1-pulleys-e5": "lifting three different weights with a two-wheel pulley.",
  "l1-gears-e1": "connecting two gears to see which way they turn.",
  "l1-gears-e2": "counting how the big gear turns when the small one spins.",
  "l1-gears-e3": "counting how the small gear turns when the big one spins.",
  "l1-gears-e4": "counting the turns as two gears drive each other.",
  "l1-wheel-axle-e2": "pushing a loaded cart to see how far it rolls.",
  "l1-wheel-axle-e3": "moving the load around the cart to see how it rolls.",

  // ─── robotics 5-8 · experiments (level 2) ────────────
  "l2-levers-e1": "comparing lifting weights by hand and with a lever.",
  "l2-levers-e5": "moving the balance point until two different weights sit level.",
  "l2-levers-e6": "finding which lever length lifts a heavy weight most easily.",
  "l2-pulleys-e1": "measuring the effort to lift three weights on a pulley.",
  "l2-pulleys-e4": "checking if pulley height changes how hard the lift feels.",
  "l2-pulleys-e5": "checking if the pull direction changes how hard the lift feels.",
  "l2-gears-e1": "working out how many times one gear turns the other.",
  "l2-wheel-axle-e2": "measuring how far a cart rolls with different loads.",
  "l2-wheel-axle-e3": "steering a cart by pointing the front axle.",
  "l2-wheel-axle-e4": "seeing how the load's place changes how far a cart rolls.",
  "l2-wheel-axle-e5": "seeing how the wheels' spacing changes how far a cart rolls.",
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
