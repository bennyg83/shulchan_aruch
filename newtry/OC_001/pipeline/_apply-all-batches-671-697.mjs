#!/usr/bin/env node
/** Apply all existing _apply-simanNNN-batchN-slot18.mjs for simanim 671-697 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const FROM = Number(process.env.FROM || "671");
const TO = Number(process.env.TO || "697");

function run(script) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script)], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    console.error("FAILED", script);
    process.exit(r.status ?? 1);
  }
}

for (let siman = FROM; siman <= TO; siman++) {
  let batch = 1;
  let any = false;
  while (true) {
    const script = `_apply-siman${siman}-batch${batch}-slot18.mjs`;
    if (!fs.existsSync(path.join(__dirname, script))) break;
    console.log(`\n>> ${script}`);
    run(script);
    any = true;
    batch++;
  }
  if (!any) console.log(`siman ${siman}: no batch scripts`);
}
console.log("\n[OK] all batches applied", FROM, "-", TO);
