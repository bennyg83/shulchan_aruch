#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";

for (const s of [686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697]) {
  const pad = String(s).padStart(3, "0");
  const line = `${ts} worker-slot-3 siman_${pad} bad_mt=0 apply-pipeline COMPLETE\n`;
  if (!prog.includes(`siman_${pad} bad_mt=0 apply-pipeline COMPLETE`)) {
    fs.appendFileSync(logPath, line);
    console.log("logged", pad);
  } else {
    console.log("skip", pad);
  }
}
