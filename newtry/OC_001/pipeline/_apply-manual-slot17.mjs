#!/usr/bin/env node
/** Inject BY_SIMAN fixes from _manual-fixes-slot17.mjs into hand JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { BY_SIMAN } from "./_manual-fixes-slot17.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const list = simans.length ? simans : Object.keys(BY_SIMAN).map(Number);

for (const siman of list) {
  const fixes = BY_SIMAN[siman];
  if (!fixes) continue;
  const tmp = path.join(__dirname, `_tmp-fixes-${siman}.mjs`);
  fs.writeFileSync(
    tmp,
    `export const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
    "utf8"
  );
  run("_inject-hand-en-slot17.mjs", [String(siman), tmp]);
  fs.unlinkSync(tmp);
  console.log("injected siman", siman);
}
