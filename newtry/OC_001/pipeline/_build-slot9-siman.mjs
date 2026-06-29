#!/usr/bin/env node
/**
 * Build slot9 batch data + apply scripts from work/hand-slot9-siman-NNN.json
 * Usage: node pipeline/_build-slot9-siman.mjs 257
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import {
  BATCH_SIZE,
  autoFix,
  blockKey,
  loadHandJson,
  preflightFail,
  writeApplyScript,
  writeBatchData,
} from "./_slot9-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _build-slot9-siman.mjs <siman>");

const handRaw = loadHandJson(__dirname, siman);
const handByRel = {};
if (handRaw.items) {
  for (const row of handRaw.items) {
    if (!row.en) continue;
    if (!handByRel[row.rel]) handByRel[row.rel] = {};
    handByRel[row.rel][row.key] = row.en;
  }
} else {
  Object.assign(handByRel, handRaw);
}

const done = loadEditorialDoneIds(WORK);
const queueItems = collectEditorialBlocks(OUT, siman, "all", "warn", done);

const all = [];
const fails = [];
for (const it of queueItems) {
  const rel = it.file.replace(/^siman_\d+\//, "");
  const key = blockKey(it.seif, it.marker);
  const fp = path.join(OUT, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = handByRel[rel]?.[key];
  if (!en) {
    console.error("MISSING hand translation", rel, key);
    process.exit(1);
  }
  en = autoFix(en, it.marker, b?.he ?? "");
  const pf = preflightFail(en);
  if (pf) fails.push({ rel, key, pf, en: en.slice(0, 60) });
  all.push({ rel, key, en });
}

if (fails.length) {
  console.error("preflight fails before batching:", fails.length);
  console.error(JSON.stringify(fails.slice(0, 8), null, 2));
  process.exit(1);
}

const batches = [];
for (let i = 0; i < all.length; i += BATCH_SIZE) batches.push(all.slice(i, i + BATCH_SIZE));

let batchNum = 1;
for (const chunk of batches) {
  const batchFixes = {};
  for (const { rel, key, en } of chunk) {
    if (!batchFixes[rel]) batchFixes[rel] = {};
    batchFixes[rel][key] = en;
  }
  writeBatchData(__dirname, siman, batchNum, batchFixes, chunk.length);
  writeApplyScript(__dirname, siman, batchNum);
  console.log(`batch ${batchNum}: ${chunk.length} blocks`);
  batchNum++;
}
console.log(`siman ${siman}: ${all.length} blocks in ${batches.length} batch(es)`);
