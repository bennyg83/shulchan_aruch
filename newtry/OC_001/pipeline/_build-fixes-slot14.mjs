#!/usr/bin/env node
/** Build fixes: use output mechaber en when clean; else keep hand enBad for manual pass */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot14-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`), "utf8")
);
const fixes = {};
for (const it of hand.items) {
  if (!fixes[it.rel]) fixes[it.rel] = {};
  const fp = path.join(OUT, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = String(b?.en ?? "").trim();
  const pf = preflightFail(en);
  if (pf || en.length < 12) en = `__NEED__${it.key}`;
  fixes[it.rel][it.key] = en;
}
const need = [];
for (const [rel, m] of Object.entries(fixes)) {
  for (const [k, v] of Object.entries(m)) {
    if (String(v).startsWith("__NEED__")) need.push(`${rel} ${k}`);
  }
}
const out = path.join(__dirname, `_fixes-siman${siman}-slot14.mjs`);
fs.writeFileSync(
  out,
  `/** worker-slot-14 — siman ${siman} — ${need.length} need manual */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
  "utf8"
);
console.log("wrote", out, "need", need.length);
if (need.length) console.log(need.slice(0, 15).join("\n"));
