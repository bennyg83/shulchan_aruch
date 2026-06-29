#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work/hand-500-697-final39.json"), "utf8")
);

const byFile = {};
for (const [k, en] of Object.entries(hand)) {
  const parts = k.split("/");
  const blockKey = parts.pop();
  const siman = parts.shift();
  const rel = parts.join("/");
  const relPath = `siman_${siman.padStart(3, "0")}/${rel}`;
  byFile[relPath] = byFile[relPath] || {};
  byFile[relPath][blockKey] = en;
}

let applied = 0;
const fails = [];
const stillBad = [];

for (const [relPath, blockFixes] of Object.entries(byFile)) {
  const fp = path.join(ROOT, "output", relPath);
  const raw = fs.readFileSync(fp, "utf8");
  const out = parseBlocksInFile(raw)
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
    if (isBadMt447(en)) stillBad.push(`${relPath} ${key}`);
  }
}

console.log("applied", applied);
if (fails.length) {
  console.error("PREFLIGHT", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT", stillBad.join("\n"));
  process.exit(1);
}

const logPath = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} worker-range 500-697 bad_mt=0 remainders-hand COMPLETE\n`;
const prog = fs.readFileSync(logPath, "utf8");
if (!prog.includes("500-697 bad_mt=0 remainders")) {
  fs.appendFileSync(logPath, line);
}
console.log("ok bad_mt=0");
