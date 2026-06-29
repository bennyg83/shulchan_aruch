#!/usr/bin/env node
/** Inject per-siman manual fixes into hand-slot7 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { FIXES } = await import(pathToFileURL(path.join(__dirname, "_fixes-manual-slot7-301-305.mjs")).href);

const simanFilter = process.argv[2] ? Number(process.argv[2]) : null;

for (const [simanStr, relMap] of Object.entries(FIXES)) {
  const siman = Number(simanStr);
  if (simanFilter && siman !== simanFilter) continue;
  const handPath = path.join(__dirname, "work", `hand-slot7-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const en = relMap[it.rel]?.[it.key];
    if (en) {
      it.en = en;
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const missing = hand.items.filter((x) => !x.en || x.en.length < 8);
  console.log(`siman ${siman}: injected ${n}, missing ${missing.length}`);
  if (missing.length) {
    console.error(missing.slice(0, 5).map((x) => `${x.rel} ${x.key}`).join("\n"));
    process.exit(1);
  }
}
