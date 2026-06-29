#!/usr/bin/env node
/** Run slot12 apply+complete for one siman after hand JSON is fully translated */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const handEn = process.argv[3];
if (!siman) {
  console.error("Usage: _run-siman-slot12.mjs <siman> [hand-en.mjs]");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

if (handEn) run("_merge-hand-slot12.mjs", [String(siman), handEn]);

const audit = spawnSync(
  process.execPath,
  [path.join(__dirname, "_audit-hand-slot12.mjs"), String(siman)],
  { cwd: OC_ROOT, encoding: "utf8" }
);
if (audit.status !== 0) process.exit(audit.status ?? 1);
const a = JSON.parse(audit.stdout);
if (a.need > 0) {
  console.error(`audit fail: ${a.need} blocks need work`);
  process.exit(1);
}

run("_hand-to-en-mjs.mjs", [String(siman)]);
run("_gen-fixes-siman-slot12-from-en.mjs", [String(siman)]);
run("_inject-hand-en-slot12.mjs", [
  String(siman),
  path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`),
]);

const build = spawnSync(
  process.execPath,
  [path.join(__dirname, "_build-slot12-siman.mjs"), String(siman)],
  { cwd: OC_ROOT, encoding: "utf8" }
);
if (build.status !== 0) process.exit(build.status ?? 1);
if ((build.stdout || "").match(/(\d+) blocks in/)?.[1] > 0) {
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
    batch++;
  }
}
run("_complete-siman-slot12.mjs", [String(siman)]);
console.log(`siman ${siman} slot12 COMPLETE`);
