import fs from "fs";
const data = JSON.parse(fs.readFileSync("he442-export.json", "utf8"));
const part2Slugs = [
  "beur-hagra", "biur-halacha", "chok-yaakov", "eliyah-rabbah", "kaf-hachayyim",
  "peri-megadim", "chatam-sofer", "chokhmat-shlomo", "dagul-merevavah", "eshel-avraham",
  "levushei-serad", "netiv-chayim", "rabbi-akiva-eiger", "shaarei-teshuvah",
  "ateret-zekenim", "yad-ephraim",
];
function stripHtml(h) {
  return h.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').trim();
}
const keys = Object.keys(data)
  .filter((k) => part2Slugs.some((s) => k.startsWith(s + "/")))
  .sort();
const out = {};
for (const k of keys) out[k] = stripHtml(data[k].he);
fs.writeFileSync("_part2-he442.json", JSON.stringify(out, null, 2));
console.log("keys", keys.length);
