#!/usr/bin/env node
/**
 * Apply English translations to blocks listed in an editorial queue JSON.
 *   node pipeline/apply-editorial-queue.mjs --queue pipeline/work/editorial-queue-siman-032-part9of32.json --translations pipeline/work/sprint10-translations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock, blockKey } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");

function parseArgs() {
  let queuePath = null;
  let translationsPath = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--queue" && a[i + 1]) queuePath = path.resolve(a[++i]);
    else if (a[i] === "--translations" && a[i + 1]) translationsPath = path.resolve(a[++i]);
  }
  if (!queuePath || !translationsPath) {
    throw new Error("Usage: --queue <json> --translations <mjs exporting TRANSLATIONS>");
  }
  return { queuePath, translationsPath };
}

async function main() {
  const { queuePath, translationsPath } = parseArgs();
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const mod = await import(pathToFileURL(translationsPath).href);
  const T = mod.TRANSLATIONS || mod.default;
  if (!T || typeof T !== "object") throw new Error("translations module must export TRANSLATIONS");

  const byFile = new Map();
  let missing = 0;
  for (const it of queue.items || []) {
    if (!T[it.id]) {
      console.error("Missing translation:", it.id);
      missing++;
      continue;
    }
    if (!byFile.has(it.file)) byFile.set(it.file, []);
    byFile.get(it.file).push({ ...it, en: T[it.id] });
  }
  if (missing) process.exit(1);

  for (const [rel, items] of byFile) {
    const abs = path.join(OC_ROOT, "output", rel.replace(/^siman_/, "siman_"));
    const raw = fs.readFileSync(abs, "utf8");
    const blocks = parseBlocksInFile(raw);
    const map = new Map(blocks.map((b) => [blockKey(b.slug, b.seif, b.marker), b]));
    for (const it of items) {
      const k = blockKey(it.slug, it.seif, it.marker);
      const b = map.get(k);
      if (!b) {
        console.error("Block not found in file:", rel, k);
        process.exit(1);
      }
      b.en = it.en;
    }
    const out = blocks.map((b) => serializeBlock(b)).join("\n");
    fs.writeFileSync(abs, out.endsWith("\n") ? out : out + "\n", "utf8");
    console.log(`Updated ${rel} (${items.length} blocks)`);
  }
}

function pathToFileURL(p) {
  const resolved = path.resolve(p);
  return new URL(`file:///${resolved.replace(/\\/g, "/")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
