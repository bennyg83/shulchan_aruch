#!/usr/bin/env node
/** worker-slot-5 — siman 219 editorial batch 3 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman219-slot5-batch3-data.mjs";
import { MAGEN_FIXES } from "./_siman219-slot5-batch3-magen.mjs";

const FIXES_ALL = { ...FIXES };
for (const [rel, blocks] of Object.entries(MAGEN_FIXES)) {
  FIXES_ALL[rel] = { ...FIXES_ALL[rel], ...blocks };
}
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_219");

const PREFLIGHT = [
  /\bAccording to the\b/i,
  /\bthere in the\b/i,
  /&quot;/,
  /&amp;/,
  /&lt;/,
  /&gt;/,
  /\bShield of Abraham\b/i,
  /\bGolden Rows\b/i,
  /\bHouse of Joseph\b/i,
];

let total = 0;
const preflightFixed = [];

for (const [rel, blockFixes] of Object.entries(FIXES_ALL)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);

for (const [rel, blockFixes] of Object.entries(FIXES_ALL)) {
  for (const [key, en] of Object.entries(blockFixes)) {
    if (!en || en.length < 8) {
      console.error("PREFLIGHT FAIL too_short", rel, key);
      process.exit(1);
    }
    for (const re of PREFLIGHT) {
      if (re.test(en)) {
        preflightFixed.push(`${rel} ${key}: ${re.source}`);
      }
    }
  }
}
if (preflightFixed.length) {
  console.error("PREFLIGHT FAILURES:", preflightFixed.join("\n"));
  process.exit(1);
}
console.log("preflight ok");

import { spawnSync } from "child_process";
const sync = spawnSync(
  process.execPath,
  [path.join(__dirname, "sync-queue-from-output.mjs"), path.join(__dirname, "work", "editorial-queue-siman-219.json")],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
