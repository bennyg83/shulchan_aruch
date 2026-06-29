#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const siman of simanim) {
  const transPath = path.join(__dirname, "work", `trans-slot14-${siman}.mjs`);
  if (!fs.existsSync(transPath)) {
    console.error("missing", transPath);
    process.exit(1);
  }
  const { T } = await import(pathToFileURL(transPath).href + "?v=" + Date.now());
  const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const k = `${it.rel}|${it.key}`;
    if (T[k]) {
      it.en = T[k];
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: merged ${n} keys`);
}
