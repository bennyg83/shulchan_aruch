#!/usr/bin/env node
/** Mark simanim 21-697 with zero editorial pending as complete in editorial-loop-state.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const STATE_PATH = path.join(WORK, "editorial-loop-state.json");
const OUT_ROOT = path.join(OC_ROOT, "output");
const done = loadEditorialDoneIds(WORK);

const from = 21;
const to = 697;
const complete = [];
for (let s = from; s <= to; s++) {
  const items = collectEditorialBlocks(OUT_ROOT, s, "all", "info", done);
  if (items.length === 0) {
    const dir = path.join(OUT_ROOT, `siman_${String(s).padStart(3, "0")}`);
    if (fs.existsSync(dir)) complete.push(s);
  }
}

const state = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
state.completedSimanim = [...new Set([...(state.completedSimanim || []), ...complete])].sort(
  (a, b) => a - b
);
state.phase = "idle";
state.currentSiman = null;
state.currentPart = 0;
state.totalParts = 0;
state.lastUpdated = new Date().toISOString();
fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");

console.log(`Synced ${complete.length} simanim (${from}-${to}) with 0 pending → editorial-loop-state`);
console.log(`Total completedSimanim in state: ${state.completedSimanim.length}`);
