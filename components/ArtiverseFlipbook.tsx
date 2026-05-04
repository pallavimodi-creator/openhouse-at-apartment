"use client";

import {
  ImageFlipbook,
  type FlipbookCaption,
  type FlipbookPage,
} from "@/components/ImageFlipbook";
import type { ArtiverseUnit } from "@/content/types";

/**
 * Generic Artiverse flipbook — converts a programme's `artiverseUnits`
 * into image + text spreads (image on the left page, text on the right
 * page) using the same `ImageFlipbook` engine as the hand-curated 3-5
 * book at /artiverse-book.
 *
 * The text page is generated from each unit's data:
 *   eyebrow → "unit N · medium"
 *   title   → what children make (the topic of the unit)
 *   body    → technique + topic options
 */
export function ArtiverseFlipbook({
  units,
  altPrefix = "artiverse book page",
}: {
  units: ArtiverseUnit[];
  altPrefix?: string;
}) {
  const pages: FlipbookPage[] = units.flatMap((unit) => {
    const caption: FlipbookCaption = {
      eyebrow: `unit ${unit.unitNumber} · ${unit.medium.toLowerCase()}`,
      title: unit.whatChildrenMake.toLowerCase(),
      description: buildBody(unit),
    };
    return [
      {
        kind: "image",
        src: unit.heroImageUrl,
        alt: unit.whatChildrenMake,
      },
      { kind: "text", caption },
    ] satisfies FlipbookPage[];
  });

  return <ImageFlipbook pages={pages} altPrefix={altPrefix} />;
}

function buildBody(unit: ArtiverseUnit): string {
  const technique = unit.technique.trim();
  const opts = unit.topicOptions.length
    ? `Topic options: ${unit.topicOptions.join(" · ")}.`
    : "";
  const days = unit.days > 1 ? `${unit.days} sessions.` : "";
  // Short, sentence-cased body. Sections separated by a single space so the
  // text reads as a paragraph on the right page.
  return [technique.endsWith(".") ? technique : `${technique}.`, days, opts]
    .filter(Boolean)
    .join(" ");
}
