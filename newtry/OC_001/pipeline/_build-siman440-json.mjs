#!/usr/bin/env node
/** Build siman440-part{1,2}.json from he440-export + hand overrides + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translateCite440 } from "./lib/translate-cite-440.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exportPath = path.join(__dirname, "he440-export.json");
const handPath = path.join(__dirname, "_hand-risky-440.json");

const PART1_SLUGS = new Set([
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
]);

const MECHABER = {
  "mechaber/1:main":
    "The law of chametz belonging to a non-Jew deposited with a Jew. Contains 4 seifim. A non-Jew who deposited his chametz with a Jew: if the Jew is liable for it for theft and loss — whether it is in his house or anywhere under his domain — he is obligated to destroy it. {Rama: And even if he then re-deposited it with another non-Jew (Hagahot Alfasi, beginning of Pesachim).} And there are those who say that even if he is only an unpaid guardian, who is liable only for negligence, he must destroy it. And even if he is not legally liable, but he knows that the non-Jew is forceful and will compel him to pay if it is lost, he must destroy it; and there are those who disagree.",
  "mechaber/2:main":
    "If he is not liable for it, he is not obligated to destroy it — even if it is under his control, such as when a resident convert lives with him in the courtyard; however, he must make a partition ten handbreadths high so that he not forget and eat it. {Rama: If a non-Jew placed chametz in a Jew's house without permission, he covers it with a vessel (Rivash §401). This applies specifically on Yom Tov; but if it is before Yom Tov, he must make a partition (see above §446 seif 1).}",
  "mechaber/3:main":
    "If a non-Jew enters a Jew's house with his chametz in hand, the Jew is not required to remove him. Even though the Jew sees the non-Jew's chametz, there is no issue; however, it is forbidden to have it brought onto the table with him, even with a separating cloth.",
  "mechaber/4:main":
    "If a Jew deposited his chametz with another Jew or with a non-Jew, even if the guardian accepted liability, both the depositor and the guardian transgress regarding it.",
};

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/four סעיפים/g, "4 seifim")
    .replace(/&quot;/g, '"')
    .trim();
}

const exported = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const hand = fs.existsSync(handPath)
  ? JSON.parse(fs.readFileSync(handPath, "utf8"))
  : {};

const part1 = {};
const part2 = {};

for (const [hk, { he, en }] of Object.entries(exported)) {
  const slug = hk.split("/")[0];
  let out =
    MECHABER[hk] ||
    hand[hk] ||
    (slug === "beer-hagolah" ? translateCite440(he) : null) ||
    sanitizeEn(en);

  if (PART1_SLUGS.has(slug)) part1[hk] = out;
  else part2[hk] = out;
}

fs.writeFileSync(
  path.join(__dirname, "siman440-part1.json"),
  JSON.stringify(part1, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(__dirname, "siman440-part2.json"),
  JSON.stringify(part2, null, 2) + "\n"
);
console.log("part1", Object.keys(part1).length, "part2", Object.keys(part2).length);
const missing = Object.keys(exported).filter((k) => !(part1[k] || part2[k]));
if (missing.length) console.log("missing", missing);
