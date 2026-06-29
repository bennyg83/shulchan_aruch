#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot14-lib.mjs";
import { TAZ518 } from "./_taz518-en-patch.mjs";

const siman = process.argv[2];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const all = {
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "work", "slot14-need-fixes.json"), "utf8")),
  ...TAZ518,
};

run("_export-he-slot14.mjs", [String(siman)]);
run("_gen-fixes-siman-slot14-from-en.mjs", [String(siman)]);
run("_seed-hand-slot14-partial.mjs", [String(siman)]);
run("_force-seed-hand-slot14.mjs", [String(siman)]);

const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const prefix = `${siman}|`;
let n = 0;
for (const it of hand.items) {
  const k = `${siman}|${it.rel}|${it.key}`;
  const en = all[k];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en);
console.log("bootstrap siman", siman, "injected overrides", n, "missing", miss.length);
if (miss.length) {
  miss.forEach((m) => console.log(" ", m.rel, m.key));
  process.exit(1);
}
