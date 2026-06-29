#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { T } = await import(
  pathToFileURL(path.join(__dirname, "work", "slot14-translations-541-551.mjs")).href + "?v=" + Date.now()
);
const bySiman = {};
for (const [k, v] of Object.entries(T)) {
  const m = k.match(/^(\d+)\|(.+)$/);
  if (!m) throw new Error("bad key: " + k);
  const siman = +m[1];
  const key = m[2];
  (bySiman[siman] ||= {})[key] = v;
}
let failed = false;
for (const siman of [541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551]) {
  const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  const map = bySiman[siman] || {};
  for (const it of hand.items) {
    const k = `${it.rel}|${it.key}`;
    if (map[k]) {
      it.en = map[k];
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en || x.en.length < 8);
  console.log(`siman ${siman}: merged ${n}, missing ${miss.length}`);
  if (miss.length) {
    failed = true;
    for (const x of miss.slice(0, 5)) console.log("  ", x.rel, x.key);
  }
}
process.exit(failed ? 1 : 0);
