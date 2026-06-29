#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite448 } from "./lib/translate-cite-448.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART1 = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2 = [
  "ateret-zekenim",
  "beur-hagra",
  "biur-halacha",
  "chatam-sofer",
  "chok-yaakov",
  "chokhmat-shlomo",
  "dagul-merevavah",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "netiv-chayim",
  "peri-megadim",
  "rabbi-akiva-eiger",
  "shaarei-teshuvah",
  "yad-ephraim",
];

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /Saturday/i, /hand recoils/i,
  /first dish/i, /allocated/i, /Shield of Abraham/i, /her age/i, /the craft/i,
  /Darbanan/i, /Holy Qur'?an/i, /Qur'?an/i, /Jehovah/i, /Pakistan/i,
  /Hashem's Word/i, /Bible says/i, /B\.T\. B\./, /Rambam in FIFA/i, /Agoda/i,
  /the column/i, /fertilizer donation/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-–—.:,'"]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

const MECHABER = {
  "mechaber/1:main":
    "The law of chametz over which Passover has passed. Contains 7 seifim. Chametz of a non-Jew over which Passover has passed is permitted even for consumption.",
  "mechaber/2:main":
    "If a non-Jew brings a Jew a gift of chametz on the eighth day of Passover, the Jew should not accept it; and also he should not show through his actions that he desires it. And it is good that he say he does not want [the non-Jew] to acquire it for him in his domain.",
  "mechaber/3:main":
    "Chametz of a Jew over which Passover has passed is forbidden in benefit, even if he left it by mistake or under duress. And if he sold it or gave it to a non-Jew outside the house before Passover — even though the Jew acknowledges to the non-Jew and knows that he will not touch it at all but will guard it for him until after Passover and will then return and give it back to him — it is permitted, provided that he gives it to him as an absolute gift without any condition, or that he sells it to him in an absolute sale for a small amount. But a gift on condition to return does not work.",
  "mechaber/4:main":
    "A Jew is permitted to say to a non-Jew in the fifth hour or earlier: While you are acquiring chametz for one hundred [coins], acquire [it] for two hundred, as perhaps I will need [chametz] and I will buy it from you after Passover. But he may not sell it to him or give it to him on condition [that he will return it], and if he did so he transgresses bal yera'eh and bal yimatzei.",
  "mechaber/5:main":
    "Chametz that is found in a Jew's house after Passover is forbidden, even though he nullified it.",
  "mechaber/6:main":
    "It is forbidden to feed one's chametz during Passover, even to animals belonging to others or to ownerless animals.",
  "mechaber/7:main":
    "It is forbidden to give one's animal to a non-Jew to feed during the days of Passover if one knows that he feeds it barley refuse, which is chametz.",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman448-part1.json", "siman448-part2.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_448/${slug}/part-001.txt`;
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    const file = rel(slug);
    const abs = path.join(ROOT, file.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) continue;
    const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
    fixes[file] = {};
    for (const b of blocks) {
      const k = keyFor(b);
      const hk = `${slug}/${k}`;
      let en = hand[hk];
      if (!en && slug === "beer-hagolah") en = translateCite448(b.he);
      if (!en) {
        const cur = b.en || "";
        if (!isBad(cur)) en = sanitizeEn(cur);
      }
      if (!en) missing.push(hk);
      else fixes[file][k] = en;
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman448-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 448 part ${partNum} — chametz she'avar alav haPesach */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
let n = 0;
for (const f of Object.values(r1.fixes)) n += Object.keys(f).length;
for (const f of Object.values(r2.fixes)) n += Object.keys(f).length;
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
console.log("MISSING", r1.missing.length + r2.missing.length);
if (r1.missing.length) console.log("MISSING_P1", r1.missing.slice(0, 30).join(", "), r1.missing.length > 30 ? "..." : "");
if (r2.missing.length) console.log("MISSING_P2", r2.missing.slice(0, 30).join(", "), r2.missing.length > 30 ? "..." : "");
