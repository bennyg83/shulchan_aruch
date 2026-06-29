#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES as AUTOFIX } from "./_fixes-need-autofix-slot15.mjs";
import { FIXES as FAIL_MERGED } from "./_fixes-need-fail-merged-slot15.mjs";
import { FIXES as FAIL_RAW } from "./_fixes-need-fail-manual-slot15.mjs";

function mergeFail(...maps) {
  const out = {};
  for (const m of maps) {
    for (const [rel, blocks] of Object.entries(m)) {
      if (!out[rel]) out[rel] = {};
      Object.assign(out[rel], blocks);
    }
  }
  return out;
}
const FAIL = mergeFail(FAIL_MERGED, FAIL_RAW);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-slot15-577-588.json"), "utf8")
);

const bySiman = {};
function add(siman, rel, key, en) {
  if (!bySiman[siman]) bySiman[siman] = {};
  if (!bySiman[siman][rel]) bySiman[siman][rel] = {};
  bySiman[siman][rel][key] = en;
}

for (const it of need) {
  if (it.siman === 577) continue;
  const en = FAIL[it.rel]?.[it.key] ?? AUTOFIX[it.rel]?.[it.key];
  if (en) add(it.siman, it.rel, it.key, en);
}

// siman 580 eliyah — preflight only, not in need fail list
add(
  580,
  "eliyah-rabbah/part-001.txt",
  "2:_",
  FAIL["eliyah-rabbah/part-001.txt"]["2:_"]
);

for (const siman of Object.keys(bySiman).sort((a, b) => a - b)) {
  const fp = path.join(__dirname, `_fixes-siman${siman}-manual-slot15.mjs`);
  const fixes = bySiman[siman];
  const n = Object.values(fixes).reduce((a, o) => a + Object.keys(o).length, 0);
  fs.writeFileSync(
    fp,
    `/** worker-slot-15 — siman ${siman} complete manual fixes */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
    "utf8"
  );
  const needN = need.filter((x) => x.siman === Number(siman)).length;
  console.log(`siman ${siman}: need ${needN} fixes ${n} ${needN === n ? "OK" : "MISMATCH"}`);
}
