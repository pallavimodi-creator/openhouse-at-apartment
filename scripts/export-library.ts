/**
 * Extract the library content (every programme's activities, artiverse units,
 * builds, primers) into a single Markdown file at the repo root.
 *
 * Run: npx tsx scripts/export-library.ts
 * Output: LIBRARY.md
 */
import fs from "node:fs";
import path from "node:path";
import { curriculumProgrammes } from "../content/programmes/curriculum-registry";
import type {
  CurriculumProgramme,
  CurriculumActivity,
} from "../content/types";

const OUT = path.join(process.cwd(), "LIBRARY.md");

const SEGMENT_LABEL: Record<string, string> = {
  "roll-call": "Roll Call",
  playground: "Playground",
  showtime: "Showtime",
  "art-games": "Art Games",
  "art-gym": "Art Gym",
  artiverse: "Artiverse",
  experiment: "Experiment",
  build: "Build",
  "experience-book": "Experience Book",
  "log-book": "Experience Book",
  "sign-off": "Sign Off",
};

function clean(text: string | undefined): string {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
}

function bullet(label: string, value: string | undefined): string {
  const v = clean(value);
  if (!v) return "";
  return `- **${label}:** ${v}\n`;
}

function renderActivity(a: CurriculumActivity): string {
  const out: string[] = [];
  out.push(`### ${a.title}`);
  out.push("");
  out.push(
    `_${SEGMENT_LABEL[a.segment] ?? a.segment} · ${a.type === "physical-game" ? "physical game" : "facilitated"}${a.cardName ? ` · card: ${a.cardName}` : ""}_`
  );
  out.push("");

  if (a.setupLine) {
    out.push(`> ${clean(a.setupLine)}`);
    out.push("");
  }

  if (a.howToPlay) {
    out.push(`**How to play**`);
    out.push("");
    // Split on sentence + middle dot to make a numbered list.
    const sentences = clean(a.howToPlay)
      .split(/(?<=[.?!])\s+(?=["“”A-Z])/)
      .flatMap((s) => s.split(" · "))
      .map((s) => s.trim())
      .filter(Boolean);
    sentences.forEach((s, i) => {
      out.push(`${i + 1}. ${s}`);
    });
    out.push("");
  }

  if (a.variations && a.variations.length) {
    out.push(`**Variations**`);
    out.push("");
    a.variations.forEach((v) => {
      out.push(`- **${v.name}** — ${clean(v.description)}`);
    });
    out.push("");
  }

  if (a.difficultyLevels && a.difficultyLevels.length) {
    out.push(`**Difficulty**`);
    out.push("");
    a.difficultyLevels.forEach((d) => {
      out.push(`- **${d.level}:** ${clean(d.description)}`);
    });
    out.push("");
  }

  if (a.materials && a.materials.length) {
    out.push(`**Materials**`);
    out.push("");
    a.materials.forEach((m) => {
      out.push(`- ${clean(m)}`);
    });
    out.push("");
  }

  if (a.prompts && a.prompts.length) {
    out.push(`**${a.promptHeading ?? "Prompts"}**`);
    out.push("");
    a.prompts.forEach((p, i) => {
      out.push(`${i + 1}. ${clean(p)}`);
    });
    out.push("");
  }

  if (a.example) {
    out.push(`**Example**`);
    out.push("");
    out.push(`> ${clean(a.example)}`);
    out.push("");
  }

  if (a.pdfUrl) {
    out.push(`**PDF reference:** \`${a.pdfUrl}\`\n`);
  }

  return out.join("\n");
}

function renderProgramme(p: CurriculumProgramme): string {
  if (!p.activities || Object.keys(p.activities).length === 0) {
    return ""; // placeholder programmes (e.g. 3-5 ages) are skipped
  }

  const out: string[] = [];
  out.push(`## ${p.title} · ${p.ageLabel}`);
  out.push("");
  out.push(`_${p.tagline}_`);
  out.push("");
  out.push(`- **Slug:** \`${p.slug}\``);
  out.push(`- **Category:** ${p.category}`);
  out.push(`- **Total sessions:** ${p.totalSessions}`);
  out.push("");
  out.push(p.description);
  out.push("");

  // Group activities by segment
  const bySegment: Record<string, CurriculumActivity[]> = {};
  for (const a of Object.values(p.activities)) {
    (bySegment[a.segment] ??= []).push(a);
  }

  const segmentOrder = [
    "roll-call",
    "playground",
    "showtime",
    "art-games",
    "experiment",
    "build",
    "sign-off",
  ];
  const orderedSegments = Object.keys(bySegment).sort(
    (a, b) =>
      (segmentOrder.indexOf(a) === -1 ? 99 : segmentOrder.indexOf(a)) -
      (segmentOrder.indexOf(b) === -1 ? 99 : segmentOrder.indexOf(b))
  );

  for (const seg of orderedSegments) {
    out.push(`---`);
    out.push("");
    out.push(`### ${SEGMENT_LABEL[seg] ?? seg} segment`);
    out.push("");
    bySegment[seg].forEach((a) => {
      out.push(renderActivity(a));
      out.push("");
    });
  }

  // Artiverse units (art programmes)
  if (p.artiverseUnits && p.artiverseUnits.length) {
    out.push(`---`);
    out.push("");
    out.push(`### Artiverse units (${p.artiverseUnits.length})`);
    out.push("");
    p.artiverseUnits.forEach((u, i) => {
      out.push(`#### Unit ${i + 1} — ${u.medium}`);
      out.push("");
      out.push(bullet("Technique", u.technique));
      out.push(bullet("What children make", u.whatChildrenMake));
      out.push(bullet("Days", String(u.days)));
      if (u.topicOptions?.length) {
        out.push(`- **Topic options:**`);
        u.topicOptions.forEach((t) => out.push(`  - ${t}`));
      }
      out.push("");
    });
  }

  return out.join("\n");
}

function main() {
  const lines: string[] = [];
  lines.push(`# Openhouse · Curriculum Library`);
  lines.push("");
  lines.push(
    `Every game, segment, and unit across the live programmes — extracted from the source. Generated automatically from \`scripts/export-library.ts\`.`
  );
  lines.push("");
  lines.push(`**Programmes covered**`);
  lines.push("");
  curriculumProgrammes
    .filter((p) => Object.keys(p.activities ?? {}).length > 0)
    .forEach((p) => {
      const slugAnchor = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      lines.push(`- [${p.title} · ${p.ageLabel}](#${slugAnchor}-${p.ageLabel.replace(/[^0-9a-z]+/gi, "")})`);
    });
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const p of curriculumProgrammes) {
    const block = renderProgramme(p);
    if (block) {
      lines.push(block);
      lines.push("");
    }
  }

  fs.writeFileSync(OUT, lines.join("\n"), "utf-8");
  console.log(`Wrote ${OUT}`);
  console.log(
    `Programmes exported: ${curriculumProgrammes.filter((p) => Object.keys(p.activities ?? {}).length > 0).length}`
  );
}

main();
