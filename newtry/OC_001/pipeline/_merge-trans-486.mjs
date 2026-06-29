#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, "work/hand-slot12-siman-486.json"), "utf8"));
const T = JSON.parse(fs.readFileSync(path.join(__dirname, "trans/siman486.json"), "utf8"));

const FAIL = /Lord's Prayer|Hashem's Word|Hashem's promise|Gloss:|Saturday|Shield|Aboriginally|follicles|IDF|According to the|Dewey|column wrote|United States|psalmist/i;

for (const it of hand.items) {
  if (!T[it.rel]) T[it.rel] = {};
  if (T[it.rel][it.key]) continue;
  let en = String(it.en || it.enBad || "").trim();
  if (en && !FAIL.test(en) && en.length > 30) {
    T[it.rel][it.key] = en;
  }
}

const missing = hand.items.filter((it) => !T[it.rel]?.[it.key]);
console.log("missing after merge:", missing.map((x) => `${x.rel} ${x.key}`).join(", "));
fs.writeFileSync(path.join(__dirname, "trans/siman486.json"), JSON.stringify(T, null, 2), "utf8");
