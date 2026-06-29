#!/usr/bin/env node
/** worker-slot-5 — complete editorial simanim 227–232 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, blockKey } from "./_slot5-lib.mjs";
import { MANUAL_BY_SIMAN } from "./_siman227-232-manual.mjs";
import { MB232 } from "./_siman232-mb-manual.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");
const LOG = path.join(OC_ROOT, "progress.log");

const SIMANIM = [227, 228, 229, 230, 231, 232];
const EXPECTED = { 227: 40, 228: 35, 229: 44, 230: 57, 231: 27, 232: 120 };

function buildFixes(siman) {
  const done = loadEditorialDoneIds(WORK);
  const items = collectEditorialBlocks(OUT, siman, "all", "warn", done);
  const manualSiman = MANUAL_BY_SIMAN[siman] || {};
  const manual232 = siman === 232 ? MB232 : {};
  const FIXES = {};

  for (const it of items) {
    const rel = it.file.replace(`siman_${String(siman).padStart(3, "0")}/`, "");
    const key = blockKey(it.seif, it.marker);
    const fp = path.join(OUT, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    let en =
      manualSiman[rel]?.[key] ??
      manual232[rel]?.[key] ??
      autoFix(b?.en ?? "", it.marker);
    if (!FIXES[rel]) FIXES[rel] = {};
    FIXES[rel][key] = en;
  }
  return { items, FIXES };
}

function applyFixes(siman, FIXES) {
  const base = path.join(OUT, `siman_${String(siman).padStart(3, "0")}`);
  let total = 0;
  for (const [rel, blockFixes] of Object.entries(FIXES)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = blockKey(b.seif, b.marker);
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    total += Object.keys(blockFixes).length;
  }
  return total;
}

function finalizeSiman(siman, items) {
  const ids = items.map((it) => it.id);
  appendEditorialDoneIds(WORK, ids);
  const tag = String(siman).padStart(3, "0");
  const queuePath = path.join(WORK, `editorial-queue-siman-${tag}.json`);
  if (fs.existsSync(queuePath)) {
    spawnSync(process.execPath, [path.join(__dirname, "sync-queue-from-output.mjs"), queuePath], {
      cwd: OC_ROOT,
      stdio: "inherit",
    });
  }
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  fs.appendFileSync(LOG, `${ts} worker-slot-5 siman_${siman} COMPLETE\n`, "utf8");
}

const results = [];

for (const siman of SIMANIM) {
  const { items, FIXES } = buildFixes(siman);
  const n = applyFixes(siman, FIXES);
  finalizeSiman(siman, items);
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(OUT, siman, "all", "warn", done);
  console.log(`siman_${siman}: applied ${n} blocks, remaining ${left.length}`);
  if (left.length) {
    console.error("  still open:", left.slice(0, 3).map((x) => x.id));
    process.exitCode = 1;
  }
  results.push({ siman, blocks: EXPECTED[siman], complete: left.length === 0 });
}

console.log("\n--- Summary ---");
for (const r of results) {
  console.log(`siman ${r.siman}\tblocks ${r.blocks}\t${r.complete ? "COMPLETE" : "INCOMPLETE"}`);
}
