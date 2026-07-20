/**
 * Newsletter data helper — reads a programme's real activities from
 * content/programmes/*.ts and exposes them as a flat, checkbox-friendly
 * list for the /newsletter form. Skill-tagging is auto-derived from
 * each activity's own `skillIds`.
 *
 * Categories are programme-shaped:
 *   robotics → models (build segment) + experiments (experiment segment)
 *   art      → artworks (artiverse/artistotle units) + games (art-games)
 *   speaking → games (playground + showtime + roll-call + sign-off)
 */

import { getCurriculumProgramme } from "@/lib/content";
import type {
  ArtiverseUnit,
  CurriculumActivity,
  CurriculumSkillArea,
} from "@/content/types";
import { parentItemDescription } from "@/lib/newsletter-item-copy";

export type ItemCategory =
  | "models"
  | "experiments"
  | "artworks"
  | "games";

export interface NewsletterItem {
  id: string;
  label: string;
  subtitle?: string;
  category: ItemCategory;
  skillIds: string[];
}

export interface NewsletterProgramme {
  slug: string;
  title: string;
  ageLabel: string;
  categoryLabel: string; // "robotics" / "art" / "public speaking"
  skillAreas: CurriculumSkillArea[];
  categories: {
    id: ItemCategory;
    label: string; // "models we built" etc — brochure-voice
    items: NewsletterItem[];
  }[];
}

const CATEGORY_LABEL: Record<string, string> = {
  models: "models we built",
  experiments: "experiments we ran",
  artworks: "artworks we made",
  games: "games we played",
};

/** Turn a curriculum activity segment into a newsletter category. */
function activityToCategory(seg: string): ItemCategory | null {
  if (seg === "build") return "models";
  if (seg === "experiment") return "experiments";
  if (seg === "artiverse" || seg === "art-care") return "artworks";
  if (
    seg === "playground" ||
    seg === "showtime" ||
    seg === "roll-call" ||
    seg === "sign-off" ||
    seg === "art-games" ||
    seg === "art-gym"
  )
    return "games";
  return null;
}

/**
 * Load newsletter-shaped data for a programme slug. Returns null if the
 * programme doesn't exist or has no activities at all. Categories with
 * zero items are omitted so the form doesn't render empty sections.
 */
export function getNewsletterProgramme(
  programmeSlug: string
): NewsletterProgramme | null {
  const p = getCurriculumProgramme(programmeSlug);
  if (!p) return null;

  const activities = Object.values(p.activities ?? {});
  const buckets: Record<ItemCategory, NewsletterItem[]> = {
    models: [],
    experiments: [],
    artworks: [],
    games: [],
  };

  // 1. Regular curriculum activities → their segment maps to a category.
  for (const a of activities as CurriculumActivity[]) {
    const cat = activityToCategory(a.segment);
    if (!cat) continue;
    buckets[cat].push({
      id: a.id,
      label: a.cardName ?? a.title,
      subtitle: parentItemDescription(
        a.id,
        a.goal ??
          a.setupLine ??
          (a.title !== (a.cardName ?? a.title) ? a.title : undefined)
      ),
      category: cat,
      skillIds: a.skillIds ?? [],
    });
  }

  // 2. Artiverse / Artistotle units → additional artworks.
  for (const u of (p.artiverseUnits ?? []) as ArtiverseUnit[]) {
    buckets.artworks.push({
      id: u.id,
      label: u.whatChildrenMake,
      subtitle: `${u.medium} · ${u.technique}`,
      category: "artworks",
      // Artiverse units carry `abilitiesCovered` (skill names, not ids).
      // Match against the programme's skillAreas by name / shortName to
      // resolve to ids where possible.
      skillIds: (u.abilitiesCovered ?? [])
        .map((ability) => {
          const areaByAbility = (p.skillAreas ?? []).find((s) =>
            s.abilities.some((a) =>
              typeof a === "string"
                ? a.toLowerCase().includes(ability.toLowerCase())
                : a.name.toLowerCase().includes(ability.toLowerCase())
            )
          );
          return areaByAbility?.id;
        })
        .filter((id): id is string => !!id),
    });
  }

  // Dedupe + stable sort per category by label.
  const categoriesOut: NewsletterProgramme["categories"] = [];
  for (const cat of ["models", "experiments", "artworks", "games"] as const) {
    const seen = new Set<string>();
    const items = buckets[cat]
      .filter((i) => {
        if (seen.has(i.id)) return false;
        seen.add(i.id);
        return true;
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    if (items.length > 0) {
      categoriesOut.push({ id: cat, label: CATEGORY_LABEL[cat], items });
    }
  }

  return {
    slug: p.slug,
    title: p.title,
    ageLabel: p.ageLabel,
    categoryLabel: p.category,
    skillAreas: p.skillAreas ?? [],
    categories: categoriesOut,
  };
}

/**
 * From a set of selected item ids, derive the skills that were built
 * this month. Returns them ordered by how often they were touched
 * (most-touched first).
 */
export function skillsBuiltFrom(
  programme: NewsletterProgramme,
  selectedIds: Set<string>
): { skill: CurriculumSkillArea; touches: number }[] {
  const counts = new Map<string, number>();
  const allItems = programme.categories.flatMap((c) => c.items);
  for (const item of allItems) {
    if (!selectedIds.has(item.id)) continue;
    for (const sid of item.skillIds) {
      counts.set(sid, (counts.get(sid) ?? 0) + 1);
    }
  }
  return programme.skillAreas
    .map((s) => ({ skill: s, touches: counts.get(s.id) ?? 0 }))
    .filter((r) => r.touches > 0)
    .sort((a, b) => b.touches - a.touches);
}

/** Slugs eligible for the newsletter — the six 5-8 + 8-12 programmes. */
export const NEWSLETTER_PROGRAMME_SLUGS = [
  "robotics-5-8",
  "robotics-8-12",
  "art-design-5-8",
  "art-design-8-12",
  "public-speaking-5-8",
  "public-speaking-8-12",
] as const;
