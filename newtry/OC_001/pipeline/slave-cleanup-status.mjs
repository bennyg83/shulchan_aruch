#!/usr/bin/env node
/** Quick status for Ollama slave cleanup (simanim 10–20). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const SLAVE_DONE = path.join(WORK, "slave-cleanup-done-ids.txt");

function loadSlaveDone() {
  if (!fs.existsSync(SLAVE_DONE)) return new Set();
  return new Set(
    fs.readFileSync(SLAVE_DONE, "utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  );
}

const editorialDone = loadEditorialDoneIds(WORK);
const slaveDone = loadSlaveDone();
const state = fs.existsSync(path.join(WORK, "slave-cleanup-state.json"))
  ? JSON.parse(fs.readFileSync(path.join(WORK, "slave-cleanup-state.json"), "utf8"))
  : {};

console.log("Ollama slave cleanup (simanim 10–20)");
console.log("  URL:", process.env.OC001_OLLAMA_URL || "http://10.100.102.14:11434");
console.log("  Checkpointed:", slaveDone.size);
if (state.lastAt) console.log("  Runner lastAt:", state.lastAt, "| lastRemaining:", state.lastRemaining);

for (let s = 10; s <= 20; s++) {
  const q = collectEditorialBlocks(path.join(__dirname, "..", "output"), s, "quality", "warn", editorialDone);
  const due = q.filter((it) => !slaveDone.has(it.id)).length;
  if (due) console.log(`  siman ${s}: ${due} quality blocks due`);
}
