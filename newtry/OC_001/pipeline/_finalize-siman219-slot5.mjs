#!/usr/bin/env node
/** Mark all siman 219 editorial blocks done after batches 2–4 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds, appendEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { blockStableId, relFromOutRoot } from "./lib/blocks.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");

// Snapshot ids that were pending before this worker (batches 2–4 = 134 blocks)
const remaining = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_siman219-remaining.json"), "utf8")
);
const ids = remaining.map((r) => r.id);
const n = appendEditorialDoneIds(WORK, ids);
console.log("checkpointed", ids.length, "ids; total in file:", n);

const done = loadEditorialDoneIds(WORK);
const left = collectEditorialBlocks(OUT, 219, "all", "warn", done);
console.log("remaining in siman 219:", left.length);
if (left.length > 0) {
  console.error("Still open:", left.slice(0, 5).map((x) => x.id));
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-5 siman_219 COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("appended progress.log");
