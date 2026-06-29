#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translateCite444 } from "./lib/translate-cite-444.mjs";
import { PART1_EN } from "./siman444-part1-data.mjs";
import { PART2_EN } from "./siman444-part2-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he444-export.json"), "utf8"));

const PART1_SLUGS = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];

const MECHABER = {
  "mechaber/1:main":
    'The laws when Erev Pesach falls on Shabbat. Contains 8 seifim. When the 14th of Nisan occurs on Shabbat we search for chametz on the night of the 13th and burn everything before Shabbat, and we leave over food for two meals for the sake of Shabbat — for the third meal its time is after minchah and then one cannot make it neither with matzah nor with chametz, rather with matzah ashirah; and one must make it before the tenth hour. {Rama: And in these lands where we do not eat matzah ashirah, as below siman 462 seif 4 in the gloss — one fulfills the third meal with kinds of fruit or with meat and fish, as above siman 291 seif 5 in the gloss.}',
  "mechaber/2:main":
    "It is good to burn on Erev Shabbat before noon so that one not come to err in other years and burn after noon; {Rama: and on Shabbat day one nullifies it (Tur).}",
  "mechaber/3:main":
    'One does not cook porridge and the like for this Shabbat, and one does not make bread shrunken in a bowl. {Rama: And if one transgressed and cooked and the food sticks to the pot and it is impossible to scrape it — one rinses it a little to remove the chametz (Mahari"v).}',
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

function beerEn(key, he) {
  let en = translateCite444(he);
  en = en.replace(/there in the Mishnah/g, "Mishnah there");
  return en;
}

function buildPart(slugs, extra) {
  const out = { ...extra };
  for (const key of Object.keys(exp)) {
    const slug = key.split("/")[0];
    if (!slugs.includes(slug)) continue;
    if (out[key]) continue;
    if (slug === "beer-hagolah") {
      out[key] = beerEn(key, exp[key].he);
      continue;
    }
    if (extra[key] !== undefined) continue;
  }
  return out;
}

const part1Keys = Object.keys(exp).filter((k) => PART1_SLUGS.includes(k.split("/")[0]));
const part2Keys = Object.keys(exp).filter((k) => !PART1_SLUGS.includes(k.split("/")[0]));

const part1 = { ...MECHABER, ...PART1_EN };
for (const k of part1Keys) {
  if (k.startsWith("beer-hagolah/")) part1[k] = beerEn(k, exp[k].he);
}

const part2 = { ...PART2_EN };

const missing1 = part1Keys.filter((k) => !part1[k]);
const missing2 = part2Keys.filter((k) => !part2[k]);

if (missing1.length) {
  console.error("MISSING PART1:", missing1.join(", "));
  process.exit(1);
}
if (missing2.length) {
  console.error("MISSING PART2:", missing2.join(", "));
  process.exit(1);
}

const p1Out = {};
for (const k of part1Keys.sort()) p1Out[k] = part1[k];
const p2Out = {};
for (const k of part2Keys.sort()) p2Out[k] = part2[k];

fs.writeFileSync(path.join(__dirname, "siman444-part1.json"), JSON.stringify(p1Out, null, 2) + "\n");
fs.writeFileSync(path.join(__dirname, "siman444-part2.json"), JSON.stringify(p2Out, null, 2) + "\n");

console.log(`part1 ${Object.keys(p1Out).length} keys, part2 ${Object.keys(p2Out).length} keys`);
