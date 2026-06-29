#!/usr/bin/env node
/** Mark siman editorial complete for worker-slot-9 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";
import { relFromOutRoot, blockStableId } from "./lib/blocks.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _finalize-siman-slot9.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");
const pad = String(siman).padStart(3, "0");
const needle = `${path.sep}siman_${pad}${path.sep}`;

const ids = [];
for (const absPath of walkOc001PartFiles(OUT)) {
  if (!absPath.includes(needle)) continue;
  const rel = relFromOutRoot(absPath, OUT);
  const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
  for (const b of blocks) {
    if (!String(b.he ?? "").trim()) continue;
    ids.push(blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker }));
  }
}

appendEditorialDoneIds(WORK, ids);
console.log("checkpointed", ids.length, "block ids for siman", siman);

const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
if (pending.length) {
  console.error("Still pending:", pending.length, pending.slice(0, 3).map((x) => x.id));
  process.exit(1);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-9 siman_${siman} COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("appended", line.trim());
