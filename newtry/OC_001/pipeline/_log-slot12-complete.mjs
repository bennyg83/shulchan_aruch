#!/usr/bin/env node
/** Append worker-slot-12 COMPLETE if siman has zero pending editorial blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
if (pending.length) {
  console.error("pending", pending.length);
  process.exit(1);
}
const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-12 siman_${siman} COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("appended", line.trim());
