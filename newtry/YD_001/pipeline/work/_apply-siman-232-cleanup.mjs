#!/usr/bin/env node
/** Apply clean English to siman 232 mt_garbage blocks (StrReplace semantics). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity } from "../lib/quality-checks.mjs";
import { CLEAN } from "./_siman-232-clean-en.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output", "siman_232");

function applyFile(slug, part) {
  const fp = path.join(OUT, slug, part);
  if (!fs.existsSync(fp)) return 0;
  let raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const slugMap = CLEAN[slug];
  if (!slugMap) return 0;
  for (const b of blocks) {
    const key = `${b.seif}#${b.marker}`;
    if (!(key in slugMap)) continue;
    const newEn = slugMap[key];
    const oldBlock = serializeBlock(b);
    const newBlock = serializeBlock({ ...b, en: newEn });
    if (oldBlock === newBlock) continue;
    if (!raw.includes(oldBlock)) {
      throw new Error(`Block not found for replace: ${slug}/${part} ${key}`);
    }
    raw = raw.replace(oldBlock, newBlock);
    n++;
  }
  if (n) fs.writeFileSync(fp, raw, "utf8");
  return n;
}

let total = 0;
for (const slug of Object.keys(CLEAN)) {
  const dir = path.join(OUT, slug);
  if (!fs.existsSync(dir)) continue;
  for (const part of fs.readdirSync(dir).filter((f) => f.endsWith(".txt"))) {
    total += applyFile(slug, part);
  }
}

let errors = 0;
for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  for (const part of fs.readdirSync(path.join(OUT, ent.name)).filter((f) => f.endsWith(".txt"))) {
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(OUT, ent.name, part), "utf8"));
    for (const b of blocks) {
      if (maxSeverity(runBlockQualityChecks(b)) === "error") errors++;
    }
  }
}

console.log(`Applied ${total} block replacements`);
console.log(`Remaining error-level blocks: ${errors}`);
process.exit(errors ? 1 : 0);
