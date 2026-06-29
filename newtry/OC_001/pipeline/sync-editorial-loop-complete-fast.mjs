#!/usr/bin/env node
/** After scan confirms 0 pending: mark all output simanim 21-697 complete in loop state */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const STATE_PATH = path.join(WORK, "editorial-loop-state.json");
const OUT_ROOT = path.join(OC_ROOT, "output");

const complete = [];
for (let s = 21; s <= 697; s++) {
  const dir = path.join(OUT_ROOT, `siman_${String(s).padStart(3, "0")}`);
  if (fs.existsSync(dir)) complete.push(s);
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

console.log(`Marked ${complete.length} simanim with output dirs as complete in editorial-loop-state`);
