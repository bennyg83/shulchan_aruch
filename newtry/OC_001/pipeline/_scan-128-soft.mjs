#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const SOFT = [
  /Skala/i, /MA skanha/i, /Domter/i, /\bmonk\b/i, /Debt prayer/i, /presidy/i,
  /AAG D/i, /Riu 20/i, /Riu Shukor/i, /Gach Thala/i, /Thala AaG/i,
  /unleavened bread means/i, /Mishkin AAG/i, /Daikshq/i, /ithaksha/i,
  /Duff in the rest/i, /Damhoyev/i, /Dambarach/i, /DAAG DKIL/i, /ten onum/i,
  /Skalag/i, /16 Skag/i, /Damhiksha/i, /Manzir 1971/i, /Fatu Maht/i,
  /Dahmer is a drunkard/i, /Damharim 20/i, /AAG Davimihim/i, /Damakrin 20/i,
  /Rabon KOS/i, /Yavrach/i, /MA SKA RAZ/i, /AAG Debsi 1944/i,
  /DAC, why did the Toss Dawley/i, /ZG AC/i, /Lishab Koshith/i,
  /Dam there is a hole/i, /APA blesses/i, /sabbatical/i, /daikshq/i,
];

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(ROOT, "output", "siman_128");
const hits = [];
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      const pats = SOFT.filter((re) => re.test(b.en || ""));
      if (pats.length) hits.push({ rel: `${slug}/${f}`, key: `${b.seif}:${b.marker || "_"}`, pats: pats.map((r) => r.source) });
    }
  }
}
console.log("soft-bad count:", hits.length);
for (const h of hits) console.log(JSON.stringify(h));
