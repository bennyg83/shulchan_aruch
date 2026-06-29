#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const simanim = process.argv.slice(2).map(Number).filter(Boolean);

function needListForSiman(siman) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`), "utf8")
  );
  const list = [];
  for (const it of hand.items) {
    const fp = path.join(OUT, `siman_${siman}`, it.rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    let en = it.en || autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    const sev = maxSeverity(issues);
    if (pf || sev >= SEVERITY.warn) {
      list.push({ rel: it.rel, key: it.key, issues: issues.map((i) => i.code), pf });
    }
  }
  return { hand, needList: list };
}

for (const siman of simanim) {
  const { hand, needList } = needListForSiman(siman);
  console.log(`\n=== siman ${siman} need ${needList.length} ===`);
  for (const n of needList) {
    const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
    console.log(`${n.rel}|${n.key}|${(n.issues || []).join(",")}`);
    console.log(it?.hePlain || it?.he || "");
    console.log("---");
  }
}
