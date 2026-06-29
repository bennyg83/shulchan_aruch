#!/usr/bin/env node
/** Merge slot13-need-fixes into hand-slot13 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "slot13-need-fixes.json"), "utf8")
);

const bySiman = {};
for (const [k, en] of Object.entries(fixes)) {
  const [siman, rel, key] = k.split("|");
  if (!bySiman[siman]) bySiman[siman] = {};
  if (!bySiman[siman][rel]) bySiman[siman][rel] = {};
  bySiman[siman][rel][key] = en;
}

for (const [siman, relFixes] of Object.entries(bySiman)) {
  const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const en = relFixes[it.rel]?.[it.key];
    if (en) {
      it.en = autoFix(en, it.marker, it.he || "");
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en);
  console.log("siman", siman, "injected", n, "missing", miss.length);
  if (miss.length) {
    for (const m of miss.slice(0, 8)) console.log(" ", m.rel, m.key);
  }
}
