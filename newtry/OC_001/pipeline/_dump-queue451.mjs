#!/usr/bin/env node
/** Dump bad-MT Hebrew for translation queue */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he451-export.json"), "utf8"));
const parts = [1, 2, 3].map((n) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `siman451-part${n}.json`), "utf8"))
);

function stripHtml(h) {
  return h
    .replace(/<small>[\s\S]*?<\/small>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const pn of [1, 2, 3]) {
  const hand = parts[pn - 1];
  const out = {};
  for (const [k, v] of Object.entries(exp)) {
    if (hand[k]) continue;
    const slug = k.split("/")[0];
    const PART1 = ["mechaber","mishnah-berurah","machatzit-hashekel","magen-avraham","turei-zahav","beer-hagolah","baer-heitev"];
    const PART2 = ["chok-yaakov","beur-hagra","peri-megadim"];
    const PART3 = ["biur-halacha","ateret-zekenim","chatam-sofer","dagul-merevavah","eliyah-rabbah","eshel-avraham","kaf-hachayyim","levushei-serad","rabbi-akiva-eiger","shaarei-teshuvah","yad-ephraim","chokhmat-shlomo"];
    const map = {1:PART1,2:PART2,3:PART3};
    if (!map[pn].includes(slug)) continue;
    out[k] = { he: stripHtml(v.he), en_bad: v.en };
  }
  fs.writeFileSync(path.join(__dirname, `he451-queue-p${pn}.json`), JSON.stringify(out, null, 2) + "\n");
  console.log(`he451-queue-p${pn}.json`, Object.keys(out).length);
}
