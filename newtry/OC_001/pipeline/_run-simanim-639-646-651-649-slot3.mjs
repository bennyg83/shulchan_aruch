#!/usr/bin/env node
/** Run slot3 apply pipelines for simanim 639, 646, 651, 649 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

for (const s of [639, 646, 651, 649]) {
  console.log("\n========== siman " + s + " ==========");
  const r = spawnSync(process.execPath, [path.join(__dirname, `_run-siman${s}-slot3-pipeline.mjs`)], {
    cwd: OC,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log("\n[COMPLETE] Session done — simanim: 639, 646, 651, 649");
