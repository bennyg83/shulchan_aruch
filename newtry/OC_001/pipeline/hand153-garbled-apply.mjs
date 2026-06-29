#!/usr/bin/env node
/** Apply hand153-garbled.mjs; verify garbled=0 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";
import { FIXES } from "./hand153-garbled.mjs";

const GARBLED = [
  /\bDam[a-z]{2,}/i,
  /\bAAG\b/,
  /\bM\. A\. Sec\b/,
  /\bSkala\b/i,
  /\bMaga\b/i,
  /\bMagan\b/i,
  /\bBhak\b/i,
  /\bKhanas\b/i,
  /\bBehkenas\b/i,
  /\bPanad\b/i,
  /\bKmash\b/i,
  /\bKSHAL\b/i,
  /\bDamgila\b/i,
  /\bAmash\b/i,
  /\bDSL\b/,
  /\bAkal\b/i,
  /\bEkal\b/i,
  /\bDuff\b/i,
  /\bRiu\b/i,
  /\[hand\]/i,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const base = path.join(ROOT, "output", "siman_153");

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
  console.error("PREFLIGHT:", fails.slice(0, 30).join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.slice(0, 30).join("\n"));
  process.exit(1);
}

let garbled = 0;
const garbledHits = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      const en = b.en || "";
      if (isBadMt447(en)) continue;
      const pats = GARBLED.filter((re) => re.test(en));
      if (pats.length) {
        garbled++;
        garbledHits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"} [${pats.map((r) => r.source).join(",")}]`);
      }
    }
  }
}

console.log(`garbled count: ${garbled}`);
if (garbled > 0) {
  console.error(garbledHits.slice(0, 40).join("\n"));
  process.exit(1);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} cursor-subagent siman_153 garbled COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes("siman_153 garbled COMPLETE")) {
  fs.appendFileSync(logPath, line);
}
console.log("ok garbled=0 bad_mt=0 preflight=0");
