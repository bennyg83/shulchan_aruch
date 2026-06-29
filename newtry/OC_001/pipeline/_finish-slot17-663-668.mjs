#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [663, 664, 665, 666, 667, 668];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  run("_export-he-slot17.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot17-from-en.mjs", [String(siman)]);
  const needFix = path.join(__dirname, `_fixes-siman${siman}-need-slot17.mjs`);
  if (fs.existsSync(needFix)) {
    run("_inject-hand-en-slot17.mjs", [String(siman), needFix]);
  }
  run("_seed-hand-slot17-partial.mjs", [String(siman)]);
  run("_force-seed-hand-slot17.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot17.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot17.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  const j = JSON.parse(audit.stdout);
  if (j.need > 0) {
    console.error(`siman ${siman} still has ${j.need} need blocks after fixes`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot17.mjs", [String(siman)]);
  run("_build-slot17-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot17.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot17.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot17.mjs", [String(siman)]);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-17 SLOT COMPLETE simanim 634-668\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("\nDONE", line.trim());
