#!/usr/bin/env tsx
/**
 * Asset sync — local mode.
 *
 * Walks /assets-source/{programmeId}/resources/{resourceId}/*
 * and writes /content/generated/assets.json with structured metadata.
 *
 * Drive mode (TODO) will replace the filesystem walk with a Drive API call.
 * The output format stays the same.
 *
 * Usage:   npm run sync:assets
 */
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import type { AssetType, DigitalAsset } from "../content/types";

const ROOT = process.cwd();
const SOURCE_DIR = join(ROOT, "assets-source");
const PUBLIC_DIR = join(ROOT, "public", "assets");
const OUTPUT = join(ROOT, "content", "generated", "assets.json");

const EXT_TO_TYPE: Record<string, AssetType> = {
  ".pdf": "pdf",
  ".png": "image",
  ".jpg": "image",
  ".jpeg": "image",
  ".webp": "image",
  ".svg": "image",
  ".mp3": "audio",
  ".wav": "audio",
  ".m4a": "audio",
  ".mp4": "video",
  ".mov": "video",
  ".pptx": "slide",
  ".key": "slide",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function titleize(filename: string) {
  const base = basename(filename, extname(filename));
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type AssetsByResource = Record<string, DigitalAsset[]>;

function walkProgramme(programmeId: string): AssetsByResource {
  const programmeDir = join(SOURCE_DIR, programmeId, "resources");
  if (!existsSync(programmeDir)) {
    console.log(`[sync] no source dir at ${programmeDir} — skipping.`);
    return {};
  }
  const out: AssetsByResource = {};
  for (const resourceId of readdirSync(programmeDir)) {
    const resourceDir = join(programmeDir, resourceId);
    if (!statSync(resourceDir).isDirectory()) continue;

    const assets: DigitalAsset[] = [];
    for (const file of readdirSync(resourceDir)) {
      if (file.startsWith(".") || file.startsWith("_")) continue;
      const full = join(resourceDir, file);
      if (!statSync(full).isFile()) continue;
      const ext = extname(file).toLowerCase();
      const type = EXT_TO_TYPE[ext];
      if (!type) {
        console.warn(`[sync] skipping unsupported file: ${file}`);
        continue;
      }

      // Copy into /public/assets so Next can serve it
      const destDir = join(PUBLIC_DIR, programmeId, resourceId);
      mkdirSync(destDir, { recursive: true });
      const destFile = join(destDir, file);
      copyFileSync(full, destFile);

      const publicUrl = `/assets/${programmeId}/${resourceId}/${file}`;
      const isImage = type === "image";
      const isPdf = type === "pdf";

      assets.push({
        id: `${resourceId}-${slugify(basename(file, ext))}`,
        title: titleize(file),
        type,
        thumbnailUrl: isImage ? publicUrl : "",
        previewUrl: isImage || isPdf ? publicUrl : undefined,
        fileUrl: publicUrl,
        linkedResourceId: resourceId,
        sizeBytes: statSync(full).size,
      });
    }
    if (assets.length > 0) {
      out[resourceId] = assets;
    }
  }
  return out;
}

function main() {
  const programmes = ["art-design-l1"];
  const combined: Record<string, AssetsByResource> = {};
  for (const p of programmes) {
    combined[p] = walkProgramme(p);
  }

  const generatedDir = join(ROOT, "content", "generated");
  mkdirSync(generatedDir, { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(combined, null, 2) + "\n", "utf8");

  const total = Object.values(combined).reduce(
    (acc, byResource) =>
      acc + Object.values(byResource).reduce((a, b) => a + b.length, 0),
    0
  );
  console.log(`[sync] wrote ${OUTPUT} · ${total} assets across ${programmes.length} programme(s).`);
}

main();
