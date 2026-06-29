#!/usr/bin/env node
/** Merge translations-*.mjs into hand-slot14-siman-NNN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");

const files = [
  "translations-541-543.mjs",
  "translations-544-546.mjs",
  "translations-547-549.mjs",
  "translations-550-551.mjs",
];

const allT = {};
for (const f of files) {
  const p = path.join(WORK, f);
  if (!fs.existsSync(p)) {
    console.error("missing", p);
    process.exit(1);
  }
  const { T } = await import(pathToFileURL(p).href + "?v=" + Date.now());
  Object.assign(allT, T);
}

const bySiman = new Map();
for (const [k, en] of Object.entries(allT)) {
  const [siman, rel, key] = k.split("|");
  if (!bySiman.has(Number(siman))) bySiman.set(Number(siman), []);
  bySiman.get(Number(siman)).push({ rel, key, en });
}

let total = 0;
for (const [siman, items] of bySiman) {
  const handPath = path.join(WORK, `hand-slot14-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    console.error("no hand file", handPath);
    process.exit(1);
  }
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const k = `${it.rel}|${it.key}`;
    const hit = items.find((x) => x.rel === it.rel && x.key === it.key);
    if (hit) {
      it.en = hit.en;
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: merged ${n}`);
  total += n;
}
console.log("total merged", total, "keys in T", Object.keys(allT).length);
