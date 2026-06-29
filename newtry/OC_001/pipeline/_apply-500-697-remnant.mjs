#!/usr/bin/env node
/** Apply hand EN fixes for simanim 500-697 remainders */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";
import { FIXES } from "./_fixes-500-697-remnant.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const fails = [];
const stillBad = [];
let applied = 0;

for (const [relPath, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(ROOT, "output", relPath);
  if (!fs.existsSync(fp)) {
    console.error("MISSING", relPath);
    process.exit(1);
  }
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        applied++;
        return { ...b, en: blockFixes[key].trim() };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  for (const [key, en] of Object.entries(blockFixes)) {
    const pf = preflightFail(en);
    if (pf) fails.push(`${relPath} ${key}: ${pf}`);
    if (isBadMt447(en)) stillBad.push(`${relPath} ${key}: ${en.slice(0, 60)}`);
  }
}

console.log(`applied ${applied} blocks across ${Object.keys(FIXES).length} files`);
if (fails.length) {
  console.error("PREFLIGHT:\n", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:\n", stillBad.join("\n"));
  process.exit(1);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-range 500-697 bad_mt=0 remnant-hand COMPLETE\n`;
const prog = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
if (!prog.includes("500-697 bad_mt=0 remnant-hand")) {
  fs.appendFileSync(logPath, line);
}
console.log("ok bad_mt=0 preflight=0");
