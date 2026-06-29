#!/usr/bin/env node
/** Apply hand-en JSON (slug/seif:marker -> en) to siman output blocks. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { translateCite454 } from "./lib/translate-cite-454.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const siman = parseInt(process.argv[2], 10);
const jsonPath = process.argv[3];
if (!siman || !jsonPath) {
  console.error("Usage: node pipeline/_apply-hand-json.mjs SIMAN path/to/hand.json");
  process.exit(1);
}

const pad = String(siman).padStart(3, "0");
const hand = JSON.parse(fs.readFileSync(path.resolve(jsonPath), "utf8"));
const simDir = path.join(ROOT, "output", `siman_${pad}`);

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

let applied = 0;
const notFound = [];

// group by file
const byFile = {};
for (const [hk, en] of Object.entries(hand)) {
  const [slug, sk] = hk.split("/");
  const rel = `${slug}/part-001.txt`;
  const fp = path.join(simDir, rel);
  if (!fs.existsSync(fp)) {
    notFound.push({ hk, reason: "file missing" });
    continue;
  }
  byFile[rel] = byFile[rel] || {};
  byFile[rel][sk] = en;
}

for (const [rel, blockFixes] of Object.entries(byFile)) {
  const fp = path.join(simDir, rel);
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const k = keyFor(b);
      if (blockFixes[k]) {
        n++;
        applied++;
        return { ...b, en: blockFixes[k] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(rel, n, "patched,", blocks.length, "blocks");
}

if (notFound.length) {
  console.error("NOT_FOUND", JSON.stringify(notFound, null, 2));
  process.exit(1);
}
console.log("APPLIED", applied, "of", Object.keys(hand).length);
