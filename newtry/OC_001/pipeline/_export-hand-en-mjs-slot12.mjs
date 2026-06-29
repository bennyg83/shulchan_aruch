#!/usr/bin/env node
/** Build _hand-en-NNN-slot12.mjs from hand-slot12-siman-NNN.json en fields */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const outPath = path.join(__dirname, `_hand-en-${siman}-slot12.mjs`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const miss = [];
const lines = [
  `/** worker-slot-12 — siman ${siman} editorial EN (${hand.count} blocks) */`,
  "export const EN = {",
];
for (const it of hand.items) {
  const k = `${it.rel}|${it.key}`;
  if (!it.en || !String(it.en).trim()) {
    miss.push(k);
    continue;
  }
  lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(it.en)},`);
}
lines.push("};", "");
if (miss.length) {
  console.error("missing en:", miss.length, miss.slice(0, 5).join("\n"));
  process.exit(1);
}
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("wrote", outPath, hand.items.length, "keys");
