#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { autoFix } from "./_slot15-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const fixesMod =
  args.find((a) => a.endsWith(".mjs")) || "_fixes-slot15-529-540-collisions.mjs";
const simanim = args.map(Number).filter(Boolean);
const { SIMAN_FIXES } = await import(
  pathToFileURL(path.join(__dirname, fixesMod)).href + "?v=" + Date.now()
);

for (const siman of simanim) {
  const fixes = SIMAN_FIXES[siman];
  if (!fixes) continue;
  const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const en = fixes[it.rel]?.[it.key];
    if (en) {
      it.en = autoFix(en, it.marker, it.he || "");
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: collision fixes ${n}`);
}
