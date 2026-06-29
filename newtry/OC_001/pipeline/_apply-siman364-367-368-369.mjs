#!/usr/bin/env node
/** Apply hand translations for simanim 364, 367, 368, 369 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t364 } from "./_translations-siman364.mjs";
import { t367 } from "./_translations-siman367.mjs";
import { t368 } from "./_translations-siman368.mjs";
import { t369 } from "./_translations-siman369.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SIMAN_MAPS = [
  [364, t364],
  [367, t367],
  [368, t368],
  [369, t369],
];

let totalMissing = [];
let totalApplied = 0;

for (const [siman, t] of SIMAN_MAPS) {
  const base = path.join(ROOT, "output", `siman_${siman}`);
  let simanApplied = 0;
  const missing = [];
  for (const slug of fs.readdirSync(base).filter((d) => fs.statSync(path.join(base, d)).isDirectory())) {
    const dir = path.join(base, slug);
    for (const part of fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/.test(f)).sort()) {
      const fp = path.join(dir, part);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const out = blocks
        .map((b) => {
          const key = `${b.slug}:${b.seif}:${b.marker}`;
          const en = t[key];
          if (!en) missing.push(key);
          else simanApplied++;
          return en ? { ...b, en } : b;
        })
        .map(serializeBlock)
        .join("\n\n");
      fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    }
  }
  console.log(`siman_${siman}: applied ${simanApplied}, missing ${missing.length}`);
  if (missing.length) {
    console.log(missing.join("\n"));
    totalMissing.push(...missing);
  }
  totalApplied += simanApplied;
}

if (totalMissing.length) {
  console.error("MISSING KEYS:", totalMissing.length);
  process.exit(1);
}
console.log("TOTAL applied:", totalApplied);
