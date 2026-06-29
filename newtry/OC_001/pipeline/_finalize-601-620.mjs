#!/usr/bin/env node
/** Post-MT patch, verify bad_mt=0, append progress.log COMPLETE for simanim 601-620. */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const SIMANS = process.argv.slice(2).map(Number).filter(Boolean);
const ALL = SIMANS.length ? SIMANS : Array.from({ length: 20 }, (_, i) => 601 + i);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

spawnSync(process.execPath, [path.join(__dirname, "_post-mt-patch-571-580.mjs"), ...ALL.map(String)], {
  cwd: ROOT,
  stdio: "inherit",
});

const remainders = [];
for (const siman of ALL) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
  if (!fs.existsSync(dir)) {
    remainders.push({ siman, rel: "(missing dir)" });
    continue;
  }
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (isBadMt447(b.en)) {
          remainders.push({
            siman,
            rel: `${slug}/${f}`,
            key: `${b.seif}:${b.marker || "_"}`,
            en: String(b.en).slice(0, 120),
          });
        }
      }
    }
  }
}

if (remainders.length) {
  const outPath = path.join(__dirname, "remainders-601-620.json");
  fs.writeFileSync(outPath, JSON.stringify(remainders, null, 2) + "\n", "utf8");
  console.error(`still bad: ${remainders.length} — wrote ${outPath}`);
  for (const r of remainders.slice(0, 30)) {
    console.error(`  siman_${r.siman} ${r.rel} ${r.key}: ${r.en}`);
  }
  process.exit(1);
}

for (const siman of ALL) {
  fs.appendFileSync(LOG, `${ts} cursor-subagent siman_${siman} COMPLETE\n`, "utf8");
  console.log(`siman_${siman}: bad_mt=0 — logged COMPLETE`);
}
console.log("ok bad_mt=0 preflight=0");
