#!/usr/bin/env node
/** Apply hand EN fixes for slot3 simanim 550-560 (garbage MT blocks) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", "hand-en-550-560.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

const byFile = {};
for (const [hk, en] of Object.entries(hand)) {
  const parts = hk.split("/");
  const siman = parts[0];
  const slug = parts[1];
  const sk = parts.slice(2).join("/");
  const rel = `siman_${siman}/${slug}/part-001.txt`;
  byFile[rel] = byFile[rel] || {};
  byFile[rel][sk] = en;
}

let applied = 0;
for (const [rel, blockFixes] of Object.entries(byFile)) {
  const fp = path.join(ROOT, "output", rel);
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const out = blocks
    .map((b) => {
      const k = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[k]) {
        applied++;
        return { ...b, en: blockFixes[k] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(rel, Object.keys(blockFixes).length, "patched");
}
console.log("APPLIED", applied, "of", Object.keys(hand).length);
