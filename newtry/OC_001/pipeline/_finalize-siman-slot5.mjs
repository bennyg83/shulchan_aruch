#!/usr/bin/env node
/** Mark siman editorial complete for worker-slot-5 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _finalize-siman-slot5.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");

const tag = String(siman).padStart(3, "0");
const queuePath = path.join(WORK, `editorial-queue-siman-${tag}.json`);
if (!fs.existsSync(queuePath)) {
  console.error("Queue not found:", queuePath);
  process.exit(1);
}
const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const ids = (q.items || []).map((it) => it.id);
appendEditorialDoneIds(WORK, ids);
console.log("checkpointed", ids.length, "block ids");

const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
if (pending.length) {
  console.error("Still pending:", pending.length, pending.slice(0, 3).map((x) => x.id));
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-5 siman_${siman} COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("appended", line.trim());
