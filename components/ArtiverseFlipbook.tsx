"use client";

import type React from "react";
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
 *
 * Pass an optional `cover` element (a JSX node) to prepend a custom
 * first page — used by the 5-8 / 8-12 books to render a branded cover.
 */
export function ArtiverseFlipbook({
  units,
  altPrefix = "artiverse book page",
  cover,
}: {
  units: ArtiverseUnit[];
  altPrefix?: string;
  cover?: React.ReactNode;
}) {
  const pages: FlipbookPage[] = [];
  if (cover) {
    pages.push({ kind: "node", node: cover });
  }
  // Renumber units sequentially in the flipbook display so the labels
  // read 1, 2, 3, … even when source unitNumbers are non-contiguous
  // (e.g. after removing brush-pen / colour-pencil units).
  units.forEach((unit, i) => {
    const caption: FlipbookCaption = {
      eyebrow: `unit ${i + 1} · ${unit.medium.toLowerCase()}`,
      title: unit.whatChildrenMake.toLowerCase(),
      description: buildBody(unit),
    };
    // Text first, then image — teachers read the brief and then see the
    // reference picture (less confusing than image-then-explanation).
    pages.push({ kind: "text", caption });
    pages.push({
      kind: "image",
      src: unit.heroImageUrl,
      alt: unit.whatChildrenMake,
    });
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
