#!/usr/bin/env node
/** Export → seed good → merge fixes → apply parts 1–3 for siman 447 */
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function run(label, cmd, args = []) {
  console.log(`\n=== ${label} ===`);
  const r = spawnSync(cmd, args, { cwd: ROOT, encoding: "utf8", shell: true });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    console.error(`${label} failed status=${r.status}`);
    process.exit(r.status || 1);
  }
}

run("export Hebrew", "node", ["pipeline/_export-he447.mjs"]);
run("seed good EN", "node", ["pipeline/_seed-siman447-good.mjs"]);
for (const n of [1, 2, 3]) {
  run(`merge patches part ${n}`, "node", ["pipeline/_merge447-patches.mjs", String(n)]);
}
run("sanitize hand", "node", ["pipeline/_sanitize-hand447.mjs"]);
run("merge fixes", "node", ["pipeline/_merge-hand-and-build-fixes-447.mjs"]);

for (const n of [1, 2, 3]) {
  run(`apply part ${n}`, "node", [`_apply-siman447-slot3-part${n}.mjs`]);
}

console.log("\n=== DONE siman 447 pipeline ===");
