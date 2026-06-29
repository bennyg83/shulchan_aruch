#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const SOFT = [
  /Heaven's Prayer/i,
  /Heaven's Word/i,
  /Heaven's sake/i,
  /Holy Qur/i,
  /\bQur'an\b/i,
  /Capernaum/i,
  /And thou,/i,
  /the FIFA/i,
  /Tur — source/i,
  /Governor of Mars/i,
  /good Saturdays/i,
  /first taste as soon/i,
  /A\.C\./,
  /U\.S\. section/i,
  /\bIDF\b/,
  /Pakistan/i,
  /Jehovah/i,
  /oppressor/i,
  /thrust down to hell/i,
  /Arab prayer/i,
  /Caliphate/i,
  /brick and a return ear/i,
  /United States and Mars/i,
  /snoring and therefore/i,
  /tele box/i,
  /masks and wants/i,
];

const from = 244;
const to = 299;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

const bySiman = {};
for (let s = from; s <= to; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  let strict = 0;
  let soft = 0;
  const softKeys = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (isBadMt447(b.en)) strict++;
        const hits = SOFT.filter((re) => re.test(b.en || ""));
        if (hits.length) {
          soft++;
          softKeys.push({
            rel: `${slug}/${f}`,
            key: `${b.seif}:${b.marker || "_"}`,
            hits: hits.map((r) => r.source),
            en: (b.en || "").slice(0, 100),
          });
        }
      }
    }
  }
  if (strict || soft) bySiman[s] = { strict, soft, softKeys };
}

const sorted = Object.entries(bySiman)
  .map(([s, v]) => ({ siman: Number(s), ...v }))
  .sort((a, b) => b.soft - a.soft || b.strict - a.strict);

for (const x of sorted) {
  console.log(`siman_${x.siman}: strict=${x.strict} soft=${x.soft}`);
}
console.log(`TOTAL soft=${sorted.reduce((a, x) => a + x.soft, 0)} strict=${sorted.reduce((a, x) => a + x.strict, 0)}`);

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "soft-bad-244-299.json");
fs.writeFileSync(
  outPath,
  JSON.stringify(
    sorted.flatMap((x) =>
      x.softKeys.map((k) => ({ siman: x.siman, ...k }))
    ),
    null,
    2
  ) + "\n",
  "utf8"
);
console.log("wrote", outPath);
