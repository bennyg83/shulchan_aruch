#!/usr/bin/env node
/** Full siman 447 pipeline: merge chunks → build fixes → apply parts 1-3 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const node = process.execPath;

function run(script, args = []) {
  const r = spawnSync(node, [path.join(__dirname, script), ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

if (fs.existsSync(path.join(__dirname, "_restore-siman447-part3.mjs"))) {
  run("_restore-siman447-part3.mjs");
}
for (const part of [1, 2, 3]) {
  const chunk = `hand447-p${part}-chunk.mjs`;
  const p = path.join(__dirname, chunk);
  if (fs.existsSync(p)) run("_merge-hand447-chunk.mjs", [String(part), chunk]);
}
const missingP3 = path.join(__dirname, "hand447-p3-missing.mjs");
if (fs.existsSync(missingP3)) run("_merge-hand447-chunk.mjs", ["3", "hand447-p3-missing.mjs"]);

run("_merge-hand-and-build-fixes-447.mjs");

for (const part of [1, 2, 3]) {
  const r = spawnSync(node, [path.join(ROOT, `_apply-siman447-slot3-part${part}.mjs`)], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: "pipe",
  });
  const out = (r.stdout || "") + (r.stderr || "");
  process.stdout.write(out);
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("PIPELINE COMPLETE");
