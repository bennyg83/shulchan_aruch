#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES_BY_SIMAN } from "./_hand684-696-en.mjs";
import { T688_SHORT } from "./_t688-short.mjs";
import { T688_LONG_P1 } from "./_t688-long-p1.mjs";
import { T688_LONG_P2 } from "./_t688-long-p2.mjs";
import { T688_LONG_P3 } from "./_t688-long-p3.mjs";
import { T688_LONG_P4 } from "./_t688-long-p4.mjs";
import { T690_SHORT } from "./_t690-short.mjs";
import { T690_LONG } from "./_t690-long.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function flattenFixes(siman) {
  const out = {};
  for (const fileMap of Object.values(FIXES_BY_SIMAN[siman] || {})) {
    for (const [marker, en] of Object.entries(fileMap)) {
      const slug = Object.keys(FIXES_BY_SIMAN[siman]).find((f) =>
        FIXES_BY_SIMAN[siman][f][marker] === en
      );
      // FIXES keyed by file then marker — rebuild slug/marker keys
    }
  }
  for (const [file, markers] of Object.entries(FIXES_BY_SIMAN[siman] || {})) {
    const slug = file.replace("/part-001.txt", "").replace(/\\/g, "/");
    for (const [marker, en] of Object.entries(markers)) {
      out[`${slug}/${marker}`] = en;
    }
  }
  return out;
}

function buildHand(siman, badFile, translations, mechKey) {
  const bad = JSON.parse(fs.readFileSync(path.join(__dirname, badFile), "utf8"));
  const badKeys = Object.keys(bad);
  const merged = { ...flattenFixes(siman), ...translations };
  const out = {};
  const missing = [];
  for (const k of badKeys) {
    if (merged[k]) out[k] = merged[k];
    else missing.push(k);
  }
  if (missing.length) {
    console.error(`siman ${siman} missing translations:`, missing);
    process.exit(1);
  }
  const jsonPath = path.join(__dirname, `_hand-en-${siman}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  console.log(jsonPath, Object.keys(out).length, "keys — JSON valid");

  if (mechKey && out[mechKey]) {
    const mechPath = path.join(__dirname, `mech${siman}-en.mjs`);
    const marker = mechKey.split("/")[1];
    const body = `/** OC siman ${siman} — mechaber */\nexport const t = ${JSON.stringify({ [marker]: out[mechKey] }, null, 2)};\n`;
    fs.writeFileSync(mechPath, body, "utf8");
    console.log(mechPath, "updated");
  }
  return out;
}

const t688 = {
  ...T688_SHORT,
  ...T688_LONG_P1,
  ...T688_LONG_P2,
  ...T688_LONG_P3,
  ...T688_LONG_P4,
};

const t690 = {
  ...T690_SHORT,
  ...T690_LONG,
};

buildHand(688, "he688-bad-export.json", t688, null);
buildHand(690, "he690-bad-export.json", t690, "mechaber/17:main");
