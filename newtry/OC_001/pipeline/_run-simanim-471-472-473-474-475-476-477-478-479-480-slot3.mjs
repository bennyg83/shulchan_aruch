#!/usr/bin/env node
/** Run slot3 apply pipelines for simanim 471, 472, 473, 474, 475, 476, 477, 478, 479, 480 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

for (const s of [471, 472, 473, 474, 475, 476, 477, 478, 479, 480]) {
  console.log("\n========== siman " + s + " ==========");
  const r = spawnSync(process.execPath, [path.join(__dirname, `_run-siman${s}-slot3-pipeline.mjs`)], {
    cwd: OC,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log("\n[COMPLETE] Session done — simanim: 471, 472, 473, 474, 475, 476, 477, 478, 479, 480");
