#!/usr/bin/env node
/** Count libre-wave completions from progress.log */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PROGRESS = path.join(ROOT, "progress.log");
if (!fs.existsSync(PROGRESS)) {
  console.log("No progress.log yet");
  process.exit(0);
}
const lines = fs.readFileSync(PROGRESS, "utf8").split("\n").filter((l) => l.includes("libre-wave DONE"));
const total = lines.reduce((sum, l) => {
  const m = l.match(/\((\d+) blocks\)/);
  return sum + (m ? +m[1] : 0);
}, 0);
console.log(`Libre-wave simanim completed: ${lines.length}`);
console.log(`Blocks fixed (logged): ${total}`);
console.log("Recent:");
for (const l of lines.slice(-8)) console.log(" ", l.replace(/^\S+\s/, ""));
