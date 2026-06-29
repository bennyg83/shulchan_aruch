#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";

for (const s of [527, 548, 551]) {
  const pad = String(s).padStart(3, "0");
  const line = `${ts} worker-slot-3 siman_${pad} bad_mt-fix COMPLETE\n`;
  if (!prog.includes(`siman_${pad} bad_mt-fix COMPLETE`)) {
    fs.appendFileSync(logPath, line);
    console.log("logged", pad);
  } else {
    console.log("skip", pad);
  }
}
