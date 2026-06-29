#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { autoFix } from "./_slot14-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

async function inject(siman, fixesPath) {
  const { FIXES } = await import(pathToFileURL(fixesPath).href + "?v=" + Date.now());
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
  console.log(`inject ${path.basename(fixesPath)} -> ${n}`);
}

async function injectMap(siman, FIXES) {
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
  console.log(`siman ${siman} map injected ${n}`);
}

const jobs = [
  () => inject(553, path.join(__dirname, "_hand553-remain-en.mjs")),
  () => inject(553, path.join(__dirname, "_hand553-chokhmat-en.mjs")),
  () => inject(554, path.join(__dirname, "_fixes-siman554-slot14.mjs")),
  () => inject(554, path.join(__dirname, "_hand554-batch2-en.mjs")),
  async () => {
    const mod = await import(pathToFileURL(path.join(__dirname, "_hand552-554-hebrew-fix.mjs")).href);
    await injectMap(554, mod.FIXES554);
  },
  () => inject(555, path.join(__dirname, "_hand555-558-en.mjs")),
];

const mod558 = await import(pathToFileURL(path.join(__dirname, "_hand555-558-en.mjs")).href);
jobs.push(
  () => injectMap(556, mod558.FIXES556),
  () => injectMap(557, mod558.FIXES557),
  () => injectMap(558, mod558.FIXES558)
);

for (const j of jobs) await j();
console.log("reinject done");
