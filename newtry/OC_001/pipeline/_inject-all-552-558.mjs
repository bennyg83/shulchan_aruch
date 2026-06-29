#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

const jobs = [
  [552, ["_hand552-taz7-en.mjs", "_hand552-remain-en.mjs"]],
  [553, ["_hand553-chokhmat-en.mjs", "_hand553-remain-en.mjs"]],
  [554, ["_fixes-siman554-slot14.mjs", "_hand554-batch2-en.mjs"]],
  [555, ["_hand555-558-en.mjs"]],
  [556, ["_hand555-558-en.mjs"]],
  [557, ["_hand555-558-en.mjs"]],
  [558, ["_hand555-558-en.mjs"]],
];

function run(script, args) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const [siman, files] of jobs) {
  for (const f of files) {
    const fp = path.join(__dirname, f);
    if (f === "_hand555-558-en.mjs" && siman >= 556) {
      // use FIXES556 etc via custom merge below
      continue;
    }
    run("_inject-hand-en-slot14.mjs", [String(siman), fp]);
  }
}

// 556-558 use named exports
import fs from "fs";
import { pathToFileURL } from "url";
import { autoFix } from "./_slot14-lib.mjs";

const mod = await import(pathToFileURL(path.join(__dirname, "_hand555-558-en.mjs")).href);
const map556 = mod.FIXES556;
const map557 = mod.FIXES557;
const map558 = mod.FIXES558;

function injectMap(siman, FIXES) {
  const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const en = FIXES[it.rel]?.[it.key];
    if (en) {
      it.en = autoFix(en, it.marker, it.he || "");
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: injected ${n}`);
}

injectMap(556, map556);
injectMap(557, map557);
injectMap(558, map558);
