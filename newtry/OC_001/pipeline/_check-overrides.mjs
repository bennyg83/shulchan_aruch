#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { OVERRIDES } from "./_manual-overrides-459-462.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const siman of [459, 460, 461, 462]) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`), "utf8")
  );
  const blocks = OVERRIDES[String(siman)] || {};
  console.log(`\n=== siman ${siman} ===`);
  for (const [key, val] of Object.entries(blocks)) {
    const [slug, seif, marker] = key.split(":");
    const it = hand.items.find(
      (x) =>
        x.slug === slug &&
        String(x.seif) === seif &&
        (marker === "main" ? x.marker === "main" : (x.marker || "_") === marker)
    );
    if (!it) {
      console.log("MISSING", key);
      continue;
    }
    const ovLen = val.length;
    const hdLen = String(it.en || "").length;
    if (ovLen < hdLen * 0.5) console.log("TRUNCATED", key, ovLen, "vs", hdLen);
    if (/\bAccording to the\b/i.test(val)) console.log("PREFLIGHT", key);
    if (val.endsWith(" and") || val.endsWith(" that") || val.endsWith(" the"))
      console.log("INCOMPLETE_END", key);
  }
}
