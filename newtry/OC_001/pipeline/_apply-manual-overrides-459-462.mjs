#!/usr/bin/env node
/** Apply mechaber + manual block overrides to hand-slot11 JSON for simanim 459-462 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERRIDES } from "./_manual-overrides-459-462.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const [simanStr, blocks] of Object.entries(OVERRIDES)) {
  const siman = Number(simanStr);
  const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const k = `${it.slug}:${it.seif}:${it.marker === "main" ? "main" : it.marker || "_"}`;
    const alt = `${it.slug}/${it.seif}:${it.marker === "main" ? "main" : it.marker || "_"}`;
    const en = blocks[k] || blocks[alt] || blocks[`${it.slug}:${it.key}`];
    if (en) {
      it.en = en;
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const missing = hand.items.filter((x) => !x.en);
  console.log(`siman ${siman}: applied ${n} overrides, missing ${missing.length}`);
  if (missing.length) {
    missing.slice(0, 5).forEach((x) => console.error("  missing:", x.rel, x.key));
    process.exit(1);
  }
}
