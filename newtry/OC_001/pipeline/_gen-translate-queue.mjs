#!/usr/bin/env node
/** Emit compact JSON for agent translation: siman, part, keys only */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const siman = Number(process.argv[2]);
const part = Number(process.argv[3] || 1);
const PARTS = {
  456: {
    1: ["ateret-zekenim", "baer-heitev", "beer-hagolah", "chok-yaakov", "mishnah-berurah", "magen-avraham", "turei-zahav", "machatzit-hashekel", "eliyah-rabbah", "kaf-hachayyim", "peri-megadim", "eshel-avraham", "yad-ephraim", "chatam-sofer"],
    2: ["beur-hagra"],
  },
  457: { 1: ["mechaber", "mishnah-berurah", "magen-avraham", "turei-zahav", "baer-heitev", "beer-hagolah", "chok-yaakov", "biur-halacha", "machatzit-hashekel", "eliyah-rabbah", "kaf-hachayyim", "levushei-serad", "peri-megadim", "eshel-avraham", "yad-ephraim", "chatam-sofer", "chokhmat-shlomo", "dagul-merevavah", "rabbi-akiva-eiger", "netiv-chayim", "ateret-zekenim"] },
  455: {
    1: ["mechaber", "mishnah-berurah", "magen-avraham", "turei-zahav", "baer-heitev", "beer-hagolah"],
    2: ["beur-hagra", "chok-yaakov", "biur-halacha", "machatzit-hashekel", "peri-megadim"],
    3: ["eliyah-rabbah", "kaf-hachayyim", "ateret-zekenim", "chatam-sofer", "chokhmat-shlomo", "chok-yaakov", "rabbi-akiva-eiger", "shaarei-teshuvah", "netiv-chayim"],
  },
};

const slugs = PARTS[siman]?.[part];
if (!slugs) throw new Error("unknown siman/part");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, `he${siman}-export.json`), "utf8"));
const out = {};
for (const [k, v] of Object.entries(exp)) {
  const slug = k.split("/")[0];
  if (!slugs.includes(slug)) continue;
  if (isBad(v.en)) out[k] = v.he.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
const fp = path.join(__dirname, `he${siman}-part${part}-compact.json`);
fs.writeFileSync(fp, JSON.stringify(out, null, 2));
console.log(Object.keys(out).length, "keys ->", fp);
