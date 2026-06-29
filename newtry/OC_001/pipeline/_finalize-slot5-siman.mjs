#!/usr/bin/env node
/** worker-slot-5 — checkpoint all editorial blocks done + log COMPLETE */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("Usage: node _finalize-slot5-siman.mjs N");
  process.exit(1);
}

const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");

const done = loadEditorialDoneIds(WORK);
const left = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const ids = left.map((x) => x.id);
if (ids.length) {
  const n = appendEditorialDoneIds(WORK, ids);
  console.log("checkpointed", ids.length, "ids; total in file:", n);
}

const done2 = loadEditorialDoneIds(WORK);
const remaining = collectEditorialBlocks(OUT, siman, "all", "warn", done2);
console.log("remaining in siman", siman + ":", remaining.length);
if (remaining.length > 0) {
  console.error("Still open:", remaining.slice(0, 5).map((x) => x.id));
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-5 siman_${String(siman).padStart(3, "0")} COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("appended progress.log");
