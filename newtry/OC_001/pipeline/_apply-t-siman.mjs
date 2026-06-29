#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";
import { spawnSync } from "child_process";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const tPath = path.join(__dirname, "work", `t-siman-${siman}.mjs`);
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);

const { T } = await import(pathToFileURL(tPath).href);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let miss = 0;
for (const it of hand.items) {
  const k = `${it.rel}|${it.key}`;
  if (!T[k]) {
    miss++;
    console.error("missing T", k);
    continue;
  }
  it.en = T[k];
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
if (miss) process.exit(1);

const fixes = { [String(siman)]: {} };
for (const it of hand.items) {
  if (!fixes[String(siman)][it.rel]) fixes[String(siman)][it.rel] = {};
  fixes[String(siman)][it.rel][it.key] = String(it.en).trim();
}
const fixesName = `cursor-fixes-${siman}.json`;
fs.writeFileSync(path.join(__dirname, "work", fixesName), JSON.stringify(fixes, null, 2) + "\n", "utf8");

const ap = spawnSync(process.execPath, [path.join(__dirname, "_apply-cursor-json.mjs"), fixesName], {
  cwd: OC_ROOT,
  stdio: "inherit",
});
process.exit(ap.status ?? 1);
