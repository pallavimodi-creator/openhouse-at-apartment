/**
 * Generate simple SVG placeholders for the 8 Art & Design 3-5 games.
 * Each placeholder uses a category-tinted gradient + a single emoji marker
 * so the library card looks distinctive while we wait on real artwork.
 *
 * Run: npx tsx scripts/build-art-3-5-placeholders.ts
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "games", "art-3-5");

const games: Array<{
  slug: string;
  label: string;
  emoji: string;
  from: string;
  to: string;
}> = [
  // Fine Motor — yellow → orange palette
  { slug: "shape-stitch", label: "shape stitch", emoji: "🪡", from: "#FFE1B8", to: "#F8B074" },
  { slug: "stitch-me", label: "stitch me", emoji: "🔴🟡🔵", from: "#FFE1B8", to: "#F8B074" },
  { slug: "magna-tiles", label: "magna tiles", emoji: "🔷", from: "#FFE1B8", to: "#F8B074" },
  { slug: "shape-mats", label: "shape mats", emoji: "🟧", from: "#FFE1B8", to: "#F8B074" },
  // Colour — multicolour palette
  { slug: "match-me", label: "match me", emoji: "🎨", from: "#FFD69A", to: "#F25E35" },
  { slug: "mix-it-up", label: "mix it up", emoji: "🟢", from: "#FFD69A", to: "#F25E35" },
  { slug: "ryb-tiles", label: "red, yellow, blue", emoji: "🟥🟨🟦", from: "#FFD69A", to: "#F25E35" },
  // Creative Expression — green palette
  { slug: "mini-artventure", label: "miniartventure", emoji: "🎲", from: "#A3C996", to: "#6DA35A" },
];

function svgFor(game: (typeof games)[number]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" height="260">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${game.from}"/>
      <stop offset="100%" stop-color="${game.to}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="260" fill="url(#bg)"/>
  <g text-anchor="middle">
    <text x="200" y="130" font-size="64" font-family="-apple-system,BlinkMacSystemFont,sans-serif">${game.emoji}</text>
    <text x="200" y="195" font-size="22" font-weight="800" font-family="-apple-system,BlinkMacSystemFont,sans-serif" fill="#3B1C05" letter-spacing="0.5">${game.label}</text>
    <text x="200" y="220" font-size="11" font-weight="600" font-family="-apple-system,BlinkMacSystemFont,sans-serif" fill="#3B1C05" opacity="0.55">art &amp; design · ages 3–5</text>
  </g>
</svg>
`;
}

for (const g of games) {
  fs.writeFileSync(path.join(OUT_DIR, `${g.slug}.svg`), svgFor(g), "utf-8");
  console.log(`wrote ${g.slug}.svg`);
}
