#!/usr/bin/env node
/** Apply all siman 038 retranslations via patchFile. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { patchFile } from "./_patch-siman-utils.mjs";
import mechaber from "./_patch-siman-038-data-mechaber.mjs";
import beerHagolah from "./_patch-siman-038-data-beer-hagolah.mjs";
import rabbiAkiva from "./_patch-siman-038-data-rabbi-akiva-eiger.mjs";
import baerHeitev from "./_patch-siman-038-data-baer-hetev.mjs";
import beitShmuel from "./_patch-siman-038-data-beit-shmuel.mjs";
import beurHagra from "./_patch-siman-038-data-beur-hagra.mjs";
import tureiZahav from "./_patch-siman-038-data-turei-zahav.mjs";
import pitcheiTeshuva from "./_patch-siman-038-data-pitchei-teshuva.mjs";
import beitMeir from "./_patch-siman-038-data-beit-meir.mjs";
import chokhmatShlomo from "./_patch-siman-038-data-chokhmat-shlomo.mjs";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";

const workDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(workDir, "../..");
const dump = JSON.parse(fs.readFileSync(path.join(workDir, "_siman-038-hebrew-dump.json"), "utf8"));

const MANUAL = {
  mechaber,
  "beer-hagolah": beerHagolah,
  "rabbi-akiva-eiger": rabbiAkiva,
  "baer-hetev": baerHeitev,
  "beit-shmuel": beitShmuel,
  "beur-hagra": beurHagra,
  "turei-zahav": tureiZahav,
  "pitchei-teshuva": pitcheiTeshuva,
  "beit-meir": beitMeir,
  "chokhmat-shlomo": chokhmatShlomo,
};

function fileKey(seif, marker) {
  return `${seif}#${!marker || marker === "_" ? "_" : marker}`;
}

function dumpLookup(slug, seif, marker) {
  const arr = dump[slug] || [];
  const m = marker === "_" || !marker ? "main" : marker;
  return arr.find((x) => x.key === `${seif}#${m}` || x.key === `${seif}#${marker}`)?.he;
}

const ORDER = [
  "mechaber",
  "beit-shmuel",
  "turei-zahav",
  "baer-hetev",
  "beer-hagolah",
  "beur-hagra",
  "pitchei-teshuva",
  "rabbi-akiva-eiger",
  "beit-meir",
  "chokhmat-shlomo",
];

const counts = {};
let total = 0;

for (const slug of ORDER) {
  const fp = path.join(ROOT, "output", "siman_038", slug, "part-001.txt");
  if (!fs.existsSync(fp)) continue;
  const fileBlocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  if (!fileBlocks.length) continue;
  const manual = MANUAL[slug] || {};
  const T = {};
  for (const b of fileBlocks) {
    const key = fileKey(b.seif, b.marker);
    if (!(key in manual)) throw new Error(`Missing ${slug} ${key}`);
    T[key] = manual[key];
  }
  const n = patchFile(`siman_038/${slug}/part-001.txt`, slug, T);
  counts[slug] = n;
  total += n;
  console.log(`${slug}: ${n}`);
}

console.log(`TOTAL PATCHED: ${total}`);
console.log(JSON.stringify(counts, null, 2));
