#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { HAND443 } from "./_hand443-en.mjs";
import { translateCite443 } from "./lib/translate-cite-443.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SIMAN = 443;

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

const fixes = {};
const missing = [];
let total = 0;

for (const slug of fs.readdirSync(path.join(ROOT, `output/siman_${SIMAN}`)).sort()) {
  const rel = `output/siman_${SIMAN}/${slug}/part-001.txt`;
  const abs = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(abs)) continue;
  fixes[rel] = {};
  for (const b of parseBlocksInFile(fs.readFileSync(abs, "utf8"))) {
    const k = keyFor(b);
    const hk = `${slug}/${k}`;
    let en = HAND443[hk];
    if (!en && slug === "beer-hagolah") en = translateCite443(b.he);
    if (en) {
      fixes[rel][k] = en;
      total++;
    } else missing.push(hk);
  }
}

const out = path.join(__dirname, "_fixes-siman443.mjs");
fs.writeFileSync(
  out,
  `/** Auto-generated — siman 443 (chametz hours erev Pesach) — slot 3 */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
);
console.log(`Wrote ${out}, keys ${total}, missing ${missing.length}`);
if (missing.length) console.log(missing.join("\n"));
