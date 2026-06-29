#!/usr/bin/env node
/** Build _fixes-500-697-remnant.mjs from overrides + MT + hand JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work/remainders-500-697-he.json"), "utf8")
);
const handPath = path.join(__dirname, "work/hand-500-697-en.json");
const hand = fs.existsSync(handPath)
  ? JSON.parse(fs.readFileSync(handPath, "utf8"))
  : {};

// Pull OVERRIDES from _build-overrides-and-apply.mjs via dynamic import
const overridesMod = await import(
  path.join(__dirname, "..", "_build-overrides-and-apply.mjs")
);
const OVERRIDES = overridesMod.OVERRIDES || {};

const FIXES = {};
let fromOverride = 0;
let fromHand = 0;
const missing = [];

for (const it of heData.items) {
  const relPath = `siman_${String(it.siman).padStart(3, "0")}/${it.rel}`;
  const ok = `${it.siman}|${it.slug}|${it.seif}|${it.marker}`;
  let en =
    hand[`${it.siman}/${it.rel}/${it.key}`] ||
    hand[ok] ||
    OVERRIDES[ok];
  if (!en) {
    missing.push({ relPath, key: it.key, ok });
    continue;
  }
  FIXES[relPath] = FIXES[relPath] || {};
  FIXES[relPath][it.key] = en.trim();
  if (OVERRIDES[ok]) fromOverride++;
  else fromHand++;
}

const out = `/** Hand EN — simanim 500-697 remainders (${heData.count} blocks) R1–R10 */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "_fixes-500-697-remnant.mjs"), out, "utf8");
console.log("wrote fixes", Object.values(FIXES).reduce((n, o) => n + Object.keys(o).length, 0));
console.log("fromOverride", fromOverride, "fromHand", fromHand, "missing", missing.length);
if (missing.length) {
  fs.writeFileSync(
    path.join(__dirname, "work/hand-500-697-missing.json"),
    JSON.stringify(missing, null, 2) + "\n",
    "utf8"
  );
}
