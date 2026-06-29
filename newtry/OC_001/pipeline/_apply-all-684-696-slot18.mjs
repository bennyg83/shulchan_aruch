#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { FIXES_BY_SIMAN } from "./_hand684-696-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const fixesPath = path.join(__dirname, "work", "slot18-hand-fixes.json");

const existing = JSON.parse(fs.readFileSync(fixesPath, "utf8"));
for (const [s, fixes] of Object.entries(FIXES_BY_SIMAN)) {
  existing[s] = { ...(existing[s] || {}), ...fixes };
}
fs.writeFileSync(fixesPath, JSON.stringify(existing, null, 2) + "\n", "utf8");

const SIMANIM = [684, 685, 686, 687, 688, 689, 690, 691, 692, 695, 696];
for (const siman of SIMANIM) {
  if (!FIXES_BY_SIMAN[siman]) continue;
  console.log(`\n===== apply siman ${siman} =====`);
  const r = spawnSync(process.execPath, [path.join(__dirname, "_apply-need-fixes-slot18.mjs"), String(siman)], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log("\n[OK] all 684-696 applied");
