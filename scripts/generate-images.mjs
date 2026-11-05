#!/usr/bin/env node
/**
 * Koovalam image generator
 *
 * Reads image-prompts.json and generates each image with the OpenAI Images API,
 * saving files to public/images/<name>.png (and .webp if the optional `sharp`
 * package is installed).
 *
 * Requirements: Node 18+ (built-in fetch)
 *
 * Setup:
 *   1. Put this file in  scripts/generate-images.mjs  and image-prompts.json in the project root
 *      (or change PROMPTS_FILE below).
 *   2. export OPENAI_API_KEY="sk-..."          (Windows PowerShell: $env:OPENAI_API_KEY="sk-...")
 *   3. Optional, for smaller web files:  npm i -D sharp
 *
 * Usage:
 *   node scripts/generate-images.mjs                  # generate all missing images
 *   node scripts/generate-images.mjs --only hero-bg   # generate one image
 *   node scripts/generate-images.mjs --force          # regenerate everything
 *   node scripts/generate-images.mjs --quality high   # low | medium | high | auto
 *   node scripts/generate-images.mjs --dry-run        # print prompts, no API calls
 *
 * Env overrides:
 *   IMAGE_MODEL   (default: gpt-image-1)
 *   OUT_DIR       (default: public/images)
 *   PROMPTS_FILE  (default: image-prompts.json)
 *
 * To use a different provider, only the `generateOne()` function needs changing.
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const API_URL = "https://api.openai.com/v1/images/generations";
const MODEL = process.env.IMAGE_MODEL || "gpt-image-1";
const OUT_DIR = process.env.OUT_DIR || "public/images";
const PROMPTS_FILE = process.env.PROMPTS_FILE || "image-prompts.json";

const SIZES = {
  landscape: "1536x1024",
  portrait: "1024x1536",
  square: "1024x1024",
};

// ---- CLI args ----
const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueOf = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : undefined;
};
const FORCE = has("--force");
const DRY_RUN = has("--dry-run");
const ONLY = valueOf("--only");
const QUALITY = valueOf("--quality") || "medium";

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(prompt, size, apiKey) {
  const body = { model: MODEL, prompt, size, quality: QUALITY, n: 1 };

  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const json = await res.json();
      const item = json.data?.[0];
      if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
      if (item?.url) {
        const img = await fetch(item.url);
        return Buffer.from(await img.arrayBuffer());
      }
      throw new Error("No image data in response");
    }

    // Retry on rate limit / server errors
    if (res.status === 429 || res.status >= 500) {
      const wait = 2000 * attempt * attempt;
      console.warn(`  ! HTTP ${res.status}, retrying in ${wait / 1000}s (attempt ${attempt}/4)`);
      await sleep(wait);
      continue;
    }

    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  throw new Error("Failed after 4 attempts");
}

async function maybeConvertToWebp(pngBuffer, webpPath) {
  try {
    const sharp = (await import("sharp")).default;
    await sharp(pngBuffer).webp({ quality: 82 }).toFile(webpPath);
    return true;
  } catch {
    return false; // sharp not installed: skip silently
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey && !DRY_RUN) {
    console.error("Missing OPENAI_API_KEY environment variable.");
    process.exit(1);
  }

  const config = JSON.parse(await readFile(PROMPTS_FILE, "utf8"));
  const styleBlock = `${config.style}\nAvoid: ${config.avoid}`;
  let items = config.images;

  if (ONLY) {
    items = items.filter((i) => i.name === ONLY);
    if (!items.length) {
      console.error(`No image named "${ONLY}" in ${PROMPTS_FILE}.`);
      process.exit(1);
    }
  }

  await mkdir(OUT_DIR, { recursive: true });

  let done = 0, skipped = 0, failed = 0;

  for (const item of items) {
    const pngPath = path.join(OUT_DIR, `${item.name}.png`);
    const size = SIZES[item.orientation] || SIZES.square;
    const fullPrompt = `${item.prompt}\n\nStyle: ${styleBlock}`;

    if (!FORCE && (await exists(pngPath))) {
      console.log(`- skip   ${item.name} (exists, use --force to regenerate)`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`\n[${item.name}] ${size}\n${fullPrompt}`);
      continue;
    }

    console.log(`- make   ${item.name}  (${size}, quality=${QUALITY})`);
    try {
      const buffer = await generateOne(fullPrompt, size, apiKey);
      await writeFile(pngPath, buffer);
      const webp = await maybeConvertToWebp(buffer, path.join(OUT_DIR, `${item.name}.webp`));
      console.log(`  saved ${pngPath}${webp ? " (+ .webp)" : ""}`);
      done++;
    } catch (err) {
      console.error(`  x failed ${item.name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. generated: ${done}, skipped: ${skipped}, failed: ${failed}`);
  if (failed) process.exitCode = 1;
}

main();
