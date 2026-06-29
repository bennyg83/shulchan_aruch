#!/usr/bin/env node
/** Apply hand128-fixes.mjs; verify placeholders=0, soft-bad=0 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";
import { FIXES } from "./hand128-fixes.mjs";
import { GARBLED_USER } from "./_list-garbled-128.mjs";

const PLACEHOLDER = /English translation outstanding/;

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const base = path.join(ROOT, "output", "siman_128");

const fails = [];
const stillBad = [];
let applied = 0;

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key].trim() };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  for (const [key, en] of Object.entries(blockFixes)) {
    applied++;
    const pf = preflightFail(en);
    if (pf) fails.push(`${rel} ${key}: ${pf}`);
    if (isBadMt447(en)) stillBad.push(`${rel} ${key}`);
  }
}

console.log(`applied ${applied} blocks`);

if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.join("\n"));
  process.exit(1);
}

let placeholders = 0;
const placeholderHits = [];
let soft = 0;
const softHits = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (PLACEHOLDER.test(b.en || "")) {
        placeholders++;
        placeholderHits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"}`);
      }
      const pats = [...SOFT, ...GARBLED_USER].filter((re) => re.test(b.en || ""));
      if (pats.length) {
        soft++;
        softHits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"}`);
      }
    }
  }
}

console.log(`placeholder count: ${placeholders}`);
if (placeholders > 0) {
  console.error(placeholderHits.join("\n"));
  process.exit(1);
}

console.log(`soft-bad count: ${soft}`);
if (soft > 0) {
  console.error(softHits.join("\n"));
  process.exit(1);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const placeholderLine = `${ts} worker-slot-3 siman_128 placeholders COMPLETE\n`;
const qualityLine = `${ts} worker-slot-3 siman_128 quality-fix COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes("siman_128 placeholders COMPLETE")) {
  fs.appendFileSync(logPath, placeholderLine);
}
if (!prog.includes("siman_128 quality-fix COMPLETE")) {
  fs.appendFileSync(logPath, qualityLine);
}
const garbledLine = `${ts} worker-slot-3 siman_128 garbled-fix COMPLETE\n`;
if (!prog.includes("siman_128 garbled-fix COMPLETE")) {
  fs.appendFileSync(logPath, garbledLine);
}
console.log("ok placeholders=0 soft-bad=0 garbled=0 bad_mt=0 preflight=0");
