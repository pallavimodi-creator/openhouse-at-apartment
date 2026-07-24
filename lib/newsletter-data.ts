/**
 * Newsletter data helper — reads a programme's real activities from
 * content/programmes/*.ts and exposes them for the /newsletter form.
 *
 * Order is preserved exactly as declared in the programme file (which
 * mirrors the plans) — never alphabetised.
 *
 * Every item carries:
 *   - label       teacher-facing (may include a code like "L1 Levers e4")
 *   - parentLabel clean, layman name for the parent doc (never a code)
 *   - segment     the raw segment id, so games can be grouped by the
 *                 segment name the teacher knows (roll call / playground…)
 */

import { getCurriculumProgramme } from "@/lib/content";
import type {
  ArtiverseUnit,
  CurriculumActivity,
  CurriculumSkillArea,
} from "@/content/types";
import { parentItemDescription } from "@/lib/newsletter-item-copy";

export type ItemCategory = "models" | "experiments" | "artworks" | "games";

export interface NewsletterItem {
  id: string;
  label: string; // teacher-facing (may include a code)
  parentLabel: string; // clean, layman name for the parent doc
  subtitle?: string; // one-line parent description
  category: ItemCategory;
  segment: string; // raw segment id from the programme file
  segmentName: string; // friendly segment name (e.g. "Roll Call")
  skillIds: string[];
  heroImageUrl?: string; // reference image (e.g. an artiverse unit's artwork)
}

export interface NewsletterProgramme {
  slug: string;
  title: string;
  ageLabel: string;
  categoryLabel: string; // "robotics" / "art" / "public speaking"
  skillAreas: CurriculumSkillArea[];
  categories: {
    id: ItemCategory;
    label: string;
    items: NewsletterItem[];
  }[];
}

const CATEGORY_LABEL: Record<string, string> = {
  models: "models we built",
  experiments: "experiments we ran",
  artworks: "artworks we made",
  games: "games we played",
};

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

/** Clean a teacher-facing name into a layman parent label. */
function toParentLabel(
  category: ItemCategory,
  rawLabel: string,
  subtitle: string | undefined
): string {
  if (category === "experiments") {
    // Never show the experiment code to parents — use the plain question.
    return (subtitle ?? rawLabel).replace(/\.$/, "");
  }
  // Strip a trailing " build" so "bulldozer build" → "bulldozer".
  return rawLabel.replace(/\s+build$/i, "").toLowerCase();
}

export function getNewsletterProgramme(
  programmeSlug: string
): NewsletterProgramme | null {
  const p = getCurriculumProgramme(programmeSlug);
  if (!p) return null;

  // friendly segment names from the programme's own segmentDefinitions
  const segmentNames = new Map<string, string>();
  for (const s of p.segmentDefinitions ?? []) {
    segmentNames.set(s.id, s.name);
  }

  const activities = Object.values(p.activities ?? {});
  const buckets: Record<ItemCategory, NewsletterItem[]> = {
    models: [],
    experiments: [],
    artworks: [],
    games: [],
  };

  // 1. Regular curriculum activities — insertion order preserved.
  for (const a of activities as CurriculumActivity[]) {
    const cat = activityToCategory(a.segment);
    if (!cat) continue;
    const label = a.cardName ?? a.title;
    const subtitle = parentItemDescription(
      a.id,
      a.goal ??
        a.setupLine ??
        (a.title !== label ? a.title : undefined)
    );
    buckets[cat].push({
      id: a.id,
      label,
      parentLabel: toParentLabel(cat, label, subtitle),
      subtitle,
      category: cat,
      segment: a.segment,
      segmentName: segmentNames.get(a.segment) ?? a.segment,
      skillIds: a.skillIds ?? [],
    });
  }

  // 2. Artiverse / Artistotle units → additional artworks.
  for (const u of (p.artiverseUnits ?? []) as ArtiverseUnit[]) {
    buckets.artworks.push({
      id: u.id,
      label: u.whatChildrenMake,
      parentLabel: u.whatChildrenMake.toLowerCase(),
      subtitle: `${u.medium} · ${u.technique}`,
      category: "artworks",
      segment: "artiverse",
      segmentName: segmentNames.get("artiverse") ?? "artiverse",
      heroImageUrl: u.heroImageUrl,
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

  // Dedupe, PRESERVE insertion order (no sort).
  const categoriesOut: NewsletterProgramme["categories"] = [];
  for (const cat of ["models", "experiments", "artworks", "games"] as const) {
    const seen = new Set<string>();
    const items = buckets[cat].filter((i) => {
      if (seen.has(i.id)) return false;
      seen.add(i.id);
      return true;
    });
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
 * Skills built this window, each with the plain-language names of the
 * activities that built it — so the skill is shown LINKED to what was
 * done, not as a separate abstract list.
 */
export function skillsBuiltFrom(
  programme: NewsletterProgramme,
  selectedIds: Set<string>
): { skill: CurriculumSkillArea; through: string[] }[] {
  const throughMap = new Map<string, string[]>();
  const allItems = programme.categories.flatMap((c) => c.items);
  for (const item of allItems) {
    if (!selectedIds.has(item.id)) continue;
    for (const sid of item.skillIds) {
      if (!throughMap.has(sid)) throughMap.set(sid, []);
      const list = throughMap.get(sid)!;
      if (!list.includes(item.parentLabel)) list.push(item.parentLabel);
    }
  }
  return programme.skillAreas
    .map((s) => ({ skill: s, through: throughMap.get(s.id) ?? [] }))
    .filter((r) => r.through.length > 0);
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
