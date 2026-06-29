#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const siman = path.join(ROOT, "output/siman_447");

const BAD = [
  /pending/i,
  /Lord'?s Prayer/i,
  /Hashem/i,
  /\bHametz\b/i,
  /\bhametz\b/i,
  /\bChametz\b/i,
  /Rema:\s*Rema:/i,
  /Gloss-/i,
  /Reichah Milsah/i,
  /with Hashem/i,
  /&quot;/,
  /there in the/i,
  /hand recoils/i,
  /first dish/i,
  /allocated/i,
  /Shield of Abraham/i,
  /Saturday/i,
  /her age/i,
  /the craft/i,
  /Darbanan/i,
  /chometz/i,
  /Yom tov/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-–—.:,'"]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

let total = 0;
let bad = 0;
const bySlug = {};
for (const slug of fs.readdirSync(siman).sort()) {
  const dir = path.join(siman, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"));
    bySlug[slug] = (bySlug[slug] || 0) + blocks.length;
    total += blocks.length;
    for (const b of blocks) if (isBad(b.en)) bad++;
  }
}
console.log("total", total, "bad", bad, "good", total - bad);
console.log(JSON.stringify(bySlug, null, 2));
