#!/usr/bin/env node
/** Mark all Hebrew blocks editorial-done and log worker-slot-7 COMPLETE */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";
import { relFromOutRoot, blockStableId, walkOc001PartFiles } from "./lib/blocks.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _mark-siman-slot7-complete.mjs <siman>");
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
const done = loadEditorialDoneIds(WORK);
const flagged = collectEditorialBlocks(OUT, siman, "quality", "warn", done);
const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-7 siman_${siman} COMPLETE\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log(`siman_${siman}: marked ${ids.length} ids, quality-flagged open: ${flagged.length}`);
console.log("appended", line.trim());
