#!/usr/bin/env node
/** Export → analyze bad MT → seed → merge hand chunks → build fixes → apply parts 1–3 (siman 453) */
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function run(label, script, args = []) {
  console.log(`\n=== ${label} ===`);
  const r = spawnSync(process.execPath, [path.join(ROOT, script), ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) {
    console.error(`${label} failed status=${r.status}`);
    process.exit(r.status || 1);
  }
}

run("export Hebrew", "pipeline/_export-he453.mjs");
run("analyze bad MT", "pipeline/_analyze-bad-mt453.mjs");
run("seed hand JSON", "pipeline/_build-hand453-seed.mjs");
run("merge hand chunks", "pipeline/_merge-all-hand453-chunks.mjs");
run("build fixes", "pipeline/_merge-build-fixes-453.mjs");

for (const n of [1, 2, 3]) {
  run(`apply part ${n}`, `_apply-siman453-slot3-part${n}.mjs`);
}

run("bad-export verify", "pipeline/_build-he-bad-export.mjs", ["453"]);

const prog = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-slot-3 siman_453 COMPLETE\n`;
if (!fs.readFileSync(prog, "utf8").includes("siman_453 COMPLETE")) {
  fs.appendFileSync(prog, line);
}
console.log("\n=== DONE siman 453 pipeline ===");
