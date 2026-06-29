#!/usr/bin/env node
/** partial seed → inject patches if provided → build/apply → finalize */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const patch = path.join(__dirname, "patches", `siman${siman}.json`);
run("_seed-hand-slot6-partial.mjs", [String(siman)]);
if (fs.existsSync(patch)) run("_inject-hand-json-slot6.mjs", [String(siman), patch]);
run("_run-slot6-siman-loop.mjs", [String(siman)]);
