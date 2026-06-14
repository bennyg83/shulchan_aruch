#!/usr/bin/env node
/** Apply siman 177 mt_garbage retranslations. Run from YD_001 root. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../output/siman_177");

const T = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "_s177-translations.json"), "utf8"));

function applyFile(relPath) {
  const abs = path.join(ROOT, relPath);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  let n = 0;
  for (const b of blocks) {
    const key = `${relPath}|${b.seif}|${b.marker}`;
    if (!T[key]) continue;
    b.en = T[key];
    n++;
  }
  if (n) {
    fs.writeFileSync(abs, blocks.map(serializeBlock).join("\n\n") + "\n", "utf8");
    console.log(`Applied ${n} to ${relPath}`);
  }
}

for (const rel of new Set(Object.keys(T).map((k) => k.split("|")[0]))) {
  applyFile(rel);
}

let bad = 0;
for (const rel of new Set(Object.keys(T).map((k) => k.split("|")[0]))) {
  for (const b of parseBlocksInFile(fs.readFileSync(path.join(ROOT, rel), "utf8"))) {
    const key = `${rel}|${b.seif}|${b.marker}`;
    if (!T[key]) continue;
    const errs = runBlockQualityChecks(b).filter((e) => e.severity === "error");
    if (errs.length) {
      bad++;
      console.error("STILL BAD", key, errs.map((e) => e.code).join(","));
    }
  }
}
console.log(`Total keys: ${Object.keys(T).length}, remaining errors: ${bad}`);
if (bad) process.exit(1);
