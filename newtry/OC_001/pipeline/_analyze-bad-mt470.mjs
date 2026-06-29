#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he470-export.json"), "utf8"));

export const PART1 = ["mechaber","mishnah-berurah","machatzit-hashekel","magen-avraham","beer-hagolah","baer-heitev"];
export const PART2 = ["chok-yaakov","beur-hagra","peri-megadim"];
export const PART3 = ["ateret-zekenim","chatam-sofer","dagul-merevavah","eliyah-rabbah","kaf-hachayyim","rabbi-akiva-eiger","shaarei-teshuvah"];

export function partOf(slug) {
  if (PART1.includes(slug)) return 1;
  if (PART2.includes(slug)) return 2;
  if (PART3.includes(slug)) return 3;
  return 0;
}

const stats = { total: 0, bad: 0, good: 0, byPart: { 1: { total: 0, bad: 0 }, 2: { total: 0, bad: 0 }, 3: { total: 0, bad: 0 } } };
const badKeys = { 1: [], 2: [], 3: [] };

for (const [k, v] of Object.entries(exp)) {
  const slug = k.split("/")[0];
  const pn = partOf(slug);
  if (!pn) continue;
  stats.total++;
  stats.byPart[pn].total++;
  if (isBad(v.en)) {
    stats.bad++;
    stats.byPart[pn].bad++;
    badKeys[pn].push(k);
  } else {
    stats.good++;
  }
}

console.log(JSON.stringify(stats, null, 2));
for (const pn of [1, 2, 3]) {
  fs.writeFileSync(
    path.join(__dirname, `he470-bad-p${pn}.json`),
    JSON.stringify(badKeys[pn], null, 2) + "\n"
  );
  console.log(`he470-bad-p${pn}.json`, badKeys[pn].length);
}
