#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite444 } from "./lib/translate-cite-444.mjs";

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
  "beur-hagra",
  "biur-halacha",
  "chok-yaakov",
  "chokhmat-shlomo",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "peri-megadim",
  "ateret-zekenim",
  "chatam-sofer",
  "rabbi-akiva-eiger",
  "yad-ephraim",
  "shaarei-teshuvah",
  "netiv-chayim",
  "levushei-serad",
];

const MECHABER = {
  "mechaber/1:main":
    "The laws when Erev Pesach falls on Shabbat. Contains 8 seifim. When the 14th of Nisan occurs on Shabbat we search for chametz on the night of the 13th and burn everything before Shabbat, and we leave over food for two meals for the sake of Shabbat — for the third meal its time is after minchah and then one cannot make it neither with matzah nor with chametz, rather with matzah ashirah; and one must make it before the tenth hour. {Rama: And in these lands where we do not eat matzah ashirah, as below siman 462 seif 4 in the gloss — one fulfills the third meal with kinds of fruit or with meat and fish, as above siman 291 seif 5 in the gloss.}",
  "mechaber/2:main":
    "It is good to burn on Erev Shabbat before noon so that one not come to err in other years and burn after noon; {Rama: and on Shabbat day one nullifies it (Tur).}",
  "mechaber/3:main":
    "One does not cook porridge and the like for this Shabbat, and one does not make bread shrunken in a bowl. {Rama: And if one transgressed and cooked and the food sticks to the pot and it is impossible to scrape it — one rinses it a little to remove the chametz (Mahari\"v).}",
  "mechaber/4:main":
    "After one ate the morning meal on this Shabbat he shakes out the cloth they ate on and wipes the bowls with his finger and hides them from sight with the rest of the chametz vessels; and if bread remains he may give it to a gentile on condition that he not go out to the public domain with it — even as an evasion — and only a small amount.",
  "mechaber/5:main":
    "If chametz remains after they ate, he nullifies it and covers it with a vessel until after the festival and burns it.",
  "mechaber/6:main":
    "Even though no chametz remains in the house after the morning meal — he must nullify chametz as he nullifies in other years.",
  "mechaber/7:main":
    "One who travels on the fourteenth for a mitzvah matter — such as to circumcise his son or to eat a betrothal meal at his father-in-law's house — and remembers he has chametz at home: if he can return to his house and burn and return to his mitzvah, he returns and burns; and if not, he nullifies it in his heart. If he was going to rescue from a river, from fire, from collapse, or from gentiles — he nullifies in his heart and does not return even if there is time. If he left for his own need he returns immediately. How far does he return? Up to an egg's volume; less than this he nullifies in his heart and that suffices.",
  "mechaber/8:main":
    "If he had dough in his house and is occupied elsewhere and fears it may become chametz — he nullifies it in his heart before it becomes chametz; but if it already became chametz, nullification does not help if it is after the time of its prohibition.",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman444-part1.json", "siman444-part2.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_444/${slug}/part-001.txt`;
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
      if (!en && slug === "beer-hagolah") en = translateCite444(b.he);
      if (!en) missing.push(hk);
      else fixes[file][k] = en;
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman444-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 444 part ${partNum} — Erev Pesach on Shabbat */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
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
if (r1.missing.length) console.log("MISSING_P1", r1.missing.slice(0, 20).join(", "), r1.missing.length > 20 ? "..." : "");
if (r2.missing.length) console.log("MISSING_P2", r2.missing.slice(0, 20).join(", "), r2.missing.length > 20 ? "..." : "");
