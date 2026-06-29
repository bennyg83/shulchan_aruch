#!/usr/bin/env node
/** Bulk-fix common MT preflight patterns in siman447-part*.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REPL = [
  [/\bDarbanan\b/gi, "d'rabbanan"],
  [/\bDurbanan\b/gi, "d'rabbanan"],
  [/\bAccording to the\b/gi, "Per the"],
  [/\bfirst dish\b/gi, "kli rishon"],
  [/\bfirst vessel\b/gi, "kli rishon"],
  [/\bsecond vessel\b/gi, "kli sheini"],
  [/\bthere in the Gemara\b/gi, "in the Gemara there"],
  [/\bthere in the\b/gi, "there in"],
  [/\bhand recoils\b/gi, "yad soledes bo"],
  [/\ballocated\b/gi, "muktzeh"],
  [/\bShield of Abraham\b/gi, "Magen Avraham"],
  [/\bSaturday\b/gi, "Shabbat"],
  [/\bLord'?s Prayer\b/gi, ""],
  [/\bHashem\b/gi, ""],
  [/\bHametz\b/g, "chametz"],
  [/\bChametz\b/g, "chametz"],
  [/\bchometz\b/gi, "chametz"],
  [/\bleaven\b/gi, "chametz"],
  [/\b&quot;/g, '"'],
  [/\bIDF\b/g, ""],
  [/\bG-d\b/g, "God"],
];

for (const n of [1, 2, 3]) {
  const p = path.join(__dirname, `siman447-part${n}.json`);
  if (!fs.existsSync(p)) continue;
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  let c = 0;
  for (const [k, v] of Object.entries(hand)) {
    let s = String(v);
    for (const [re, rep] of REPL) s = s.replace(re, rep);
    s = s.replace(/\s{2,}/g, " ").trim();
    if (s !== v) {
      hand[k] = s;
      c++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n");
  console.log(`part${n}: fixed ${c} entries`);
}
