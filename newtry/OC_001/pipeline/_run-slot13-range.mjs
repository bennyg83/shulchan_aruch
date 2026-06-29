#!/usr/bin/env node
/** Run finish for simanim list if hand-en file exists */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

for (const s of simanim) {
  const hand = path.join(__dirname, `_hand-en-${s}-slot13.mjs`);
  if (!fs.existsSync(hand)) {
    console.log("skip", s, "no hand-en");
    continue;
  }
  console.log("\n=== siman", s, "===");
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, "_finish-siman-slot13.mjs"), String(s), `./_hand-en-${s}-slot13.mjs`],
    { cwd: OC_ROOT, stdio: "inherit" }
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
}
