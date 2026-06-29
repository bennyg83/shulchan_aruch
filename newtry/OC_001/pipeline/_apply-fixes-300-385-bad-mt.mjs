#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { FIXES_BY_SIMAN } from "./_fixes-300-385-bad-mt.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, "progress.log");

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

let applied = 0;
const stillBad = [];

for (const [simanStr, files] of Object.entries(FIXES_BY_SIMAN)) {
  const siman = Number(simanStr);
  const pad = String(siman).padStart(3, "0");
  const simDir = path.join(ROOT, "output", `siman_${pad}`);
  for (const [rel, blockFixes] of Object.entries(files)) {
    const fp = path.join(simDir, rel);
    const raw = fs.readFileSync(fp, "utf8");
    const blocks = parseBlocksInFile(raw);
    const out = blocks
      .map((b) => {
        const k = keyFor(b);
        if (blockFixes[k]) {
          applied++;
          const en = blockFixes[k].trim();
          if (isBadMt447(en)) stillBad.push(`siman_${pad} ${rel} ${k}`);
          return { ...b, en };
        }
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out + (raw.endsWith("\n") ? "\n" : ""), "utf8");
  }
}

// verify range
let total = 0;
let bad = 0;
for (let siman = 300; siman <= 385; siman++) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        if (isBadMt447(b.en)) {
          bad++;
          stillBad.push(`siman_${siman} ${slug}/${f} ${keyFor(b)}`);
        }
      }
    }
  }
}

console.log("APPLIED", applied);
console.log("VERIFY total=", total, "bad_mt=", bad);
if (stillBad.length) {
  console.error("STILL BAD:\n" + stillBad.join("\n"));
  process.exit(1);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const line = `${ts} simanim_300-385 bad_mt=0 hand-fix COMPLETE\n`;
if (!fs.readFileSync(LOG, "utf8").includes("simanim_300-385 bad_mt=0")) {
  fs.appendFileSync(LOG, line);
}
console.log("[COMPLETE] simanim 300-385 — bad_mt=0");
