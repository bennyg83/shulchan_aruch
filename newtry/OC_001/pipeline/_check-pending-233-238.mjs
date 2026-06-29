#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");
const done = loadEditorialDoneIds(WORK);

for (const s of [233, 234, 235, 236, 237, 238]) {
  const pending = collectEditorialBlocks(OUT, s, "all", "warn", done);
  console.log(`siman_${s}: pending=${pending.length}`);
}
