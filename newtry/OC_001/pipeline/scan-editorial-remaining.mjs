#!/usr/bin/env node
/** Fast scan: simanim with editorial blocks not in editorial-done-ids.txt */
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const OUT_ROOT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);

const from = parseInt(process.argv[2] || "21", 10);
const to = parseInt(process.argv[3] || "697", 10);

const rows = [];
for (let s = from; s <= to; s++) {
  const items = collectEditorialBlocks(OUT_ROOT, s, "all", "info", done);
  if (items.length > 0) rows.push({ siman: s, blocks: items.length });
}

const total = rows.reduce((a, r) => a + r.blocks, 0);
console.log(`Range ${from}-${to}: ${rows.length} simanim, ${total} blocks pending (not in editorial-done-ids)`);
for (const r of rows) console.log(`  siman_${r.siman}: ${r.blocks}`);
if (rows.length === 0) console.log("  (none)");
