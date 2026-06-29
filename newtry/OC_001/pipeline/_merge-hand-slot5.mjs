#!/usr/bin/env node
/** Merge part hand JSON files into hand-slot5-siman-NNN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const siman = parseInt(process.argv[2], 10);
const parts = process.argv.slice(3).map((p) => path.join(WORK, p));
if (!siman || !parts.length) {
  throw new Error("Usage: _merge-hand-slot5.mjs <siman> part1.json [part2.json ...]");
}
const base = JSON.parse(fs.readFileSync(path.join(WORK, `hand-slot5-siman-${siman}.json`), "utf8"));
const byKey = new Map(base.items.map((it) => [`${it.rel}|${it.key}`, it]));
for (const fp of parts) {
  const part = JSON.parse(fs.readFileSync(fp, "utf8"));
  for (const it of part.items) {
    const k = `${it.rel}|${it.key}`;
    const row = byKey.get(k);
    if (!row) throw new Error(`Missing base row ${k}`);
    if (!it.en) throw new Error(`Missing en ${k}`);
    row.en = it.en;
  }
}
const missing = [...byKey.values()].filter((x) => !x.en);
if (missing.length) {
  console.error("Missing en for", missing.length, "blocks");
  console.error(missing.slice(0, 5).map((x) => `${x.rel} ${x.key}`));
  process.exit(1);
}
fs.writeFileSync(path.join(WORK, `hand-slot5-siman-${siman}.json`), JSON.stringify(base, null, 2) + "\n", "utf8");
console.log("merged", siman, base.items.length, "blocks");
