#!/usr/bin/env node
/** Apply RETRANSLATE map to hand-slot11 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const siman = Number(process.argv[2]);
const modPath = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { RETRANSLATE } = await import(pathToFileURL(path.resolve(modPath)).href + "?v=" + Date.now());
const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const marker = it.marker === "main" ? "main" : it.marker || "_";
  const key = `${it.slug}:${it.seif}:${marker}`;
  if (RETRANSLATE[key]) {
    it.en = RETRANSLATE[key];
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("siman", siman, "retranslated", n, "blocks");
