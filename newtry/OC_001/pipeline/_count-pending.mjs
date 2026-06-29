#!/usr/bin/env node
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);

for (const s of process.argv.slice(2).map(Number)) {
  const all = collectEditorialBlocks(OUT, s, "all", "warn", done);
  const q = collectEditorialBlocks(OUT, s, "quality", "warn", done);
  console.log(`siman ${s}: pending ${all.length} quality ${q.length}`);
}
