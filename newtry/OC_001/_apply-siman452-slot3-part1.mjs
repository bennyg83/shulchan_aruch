#!/usr/bin/env node
/** worker slot 3 — siman 452 part 1 (hagalas kelim / time of hagalah) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { fixes } from "./pipeline/_fixes-siman452-part1.mjs";

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bHashem\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
  /\bPresidents of\b/i,
  /\bIDF\b/i,
  /\bGaza\b/i,
  /\bUFO\b/i,
  /\bHoly Qur'?an\b/i,
  /\bQur'?an\b/i,
  /\bHametz\b/i,
  /\bRema:\s*Rema:/i,
  /\ban Jew\b/i,
  /\bIsraelite(s?)\b/i,
  /\bthrust down to hell\b/i,
  /\boppressor\b/i,
  /\bscour(ing|ed|s)?\b/i,
  /\bBible\b/i,
  /\bU\.S\.\b/i,
];

let total = 0;
const risks = [];
const missing = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!blockFixes[key]) missing.push({ file, key });
  }
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        if (en.length < 8 && !/^[\(\)\d\s\-–—.:,'"]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_en" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("PART1 TOTAL", total);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
