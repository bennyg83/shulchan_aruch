#!/usr/bin/env node
/** Apply hand translations for 47 garbled-target blocks in simanim 447, 467, 498. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { TARGETS, HAND } from "./_fixes-garbled-hand.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const GARBLED = [
  /\bPanad\b/i, /\bEkal\b/i, /\bMaga\b/i, /\bSkala\b/i,
  /\bDam[a-z]{2,}/i, /\bDamh/i, /\bAkal\b/i, /\bDamari\b/i,
  /\bDamrinan\b/i, /\bDSL\b/i, /\bDuff\b/i, /\bRiu\b/i, /\bAmash\b/i,
];

let total = 0;
const missing = [];
const stillGarbled = [];

for (const [siman, keys] of Object.entries(TARGETS)) {
  const hand = HAND[siman];
  if (!hand) throw new Error(`No HAND for siman ${siman}`);
  const simDir = path.join(ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);

  for (const [rel, blockFixes] of Object.entries(hand)) {
    const fp = path.join(simDir, rel);
    const raw = fs.readFileSync(fp, "utf8");
    const blocks = parseBlocksInFile(raw);
    let n = 0;
    const out = blocks
      .map((b) => {
        const k = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[k]) {
          n++;
          return { ...b, en: blockFixes[k] };
        }
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    console.log(`siman ${siman} ${rel}: ${n} blocks`);
    total += n;
  }

  for (const key of keys) {
    const [slugKey, sk] = key.split("/");
    const [seif, marker] = sk.includes(":") ? sk.split(":") : [sk, "_"];
    const rel = Object.keys(hand).find((r) => r.startsWith(`${slugKey}/`));
    const bk = `${seif}:${marker}`;
    if (!rel || !hand[rel]?.[bk]) missing.push(`${siman}:${key}`);
    else {
      const en = hand[rel][bk];
      if (GARBLED.some((re) => re.test(en))) stillGarbled.push(`${siman}:${key}`);
    }
  }
}

console.log("TOTAL_APPLIED", total);
if (missing.length) {
  console.log("MISSING", missing.join(", "));
  process.exit(1);
}
if (stillGarbled.length) {
  console.log("STILL_GARBLED", stillGarbled.join(", "));
  process.exit(1);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
for (const siman of Object.keys(TARGETS)) {
  const n = TARGETS[siman].length;
  fs.appendFileSync(
    logPath,
    `${ts} worker-slot-3 siman_${String(siman).padStart(3, "0")} garbled-hand COMPLETE ${n} blocks\n`
  );
}
console.log("progress.log updated");
