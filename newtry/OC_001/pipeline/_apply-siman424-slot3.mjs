#!/usr/bin/env node
/** worker slot 3 — siman 424 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_424/mechaber/part-001.txt": {
    "1:main":
      "The law of mentioning Yaaleh VeYavo in Birkat HaMazon. Contains 1 seif. They mention Yaaleh VeYavo in Birkat HaMazon. And if he did not say it, we do not make him repeat it. And if he remembered before he began HaTov VeHaMetiv, he says: Blessed is He who gave Rosh Chodesh to His people Israel as a remembrance. {Rama: And see above siman 188 seif 7.}",
  },
  "output/siman_424/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) We do not make him repeat — for there is no obligation to eat bread on Rosh Chodesh; if so, if he wishes he is not eating bread and he is not obligated in Birkat HaMazon at all:",
    "1:ב":
      "(2) And if he remembered, etc. — see above siman 188 in Biur Halacha that one must say it in Shem and Malchut — see there; and see there further in seif 10 regarding if he blessed after Rosh Chodesh departed that he must mention Rosh Chodesh in Birkat HaMazon, for we follow the beginning of the meal when it was still Rosh Chodesh. And Magen Avraham also wrote in siman 419 that if he prayed Maariv after Rosh Chodesh — even if he prayed while it was still day — he no longer mentions Rosh Chodesh afterward in Birkat HaMazon, for he made it a weekday in his prayer; but if he did not pray, even though the congregation already prayed, he is not drawn after them and must mention Rosh Chodesh in Birkat HaMazon. And all this is specifically where he is not drawn after the congregation except in a place where he already began eating beforehand; but if he began eating after the congregation prayed Maariv — even if they prayed while it was still day — he does not mention Rosh Chodesh in Birkat HaMazon. And all this is when he prayed at least Mincha; but if he has not yet prayed Mincha, even if he begins eating after the congregation's Maariv prayer he must mention Rosh Chodesh in Birkat HaMazon, for we cannot say he is drawn after the congregation since in any case for him it is Rosh Chodesh, for he has not yet prayed Mincha and must mention Rosh Chodesh in Mincha prayer. The same applies in reverse: if the congregation prayed on erev Rosh Chodesh Maariv while it was still day and he began eating after Maariv — even though he did not pray Maariv — nevertheless he mentions Rosh Chodesh, for he is drawn after the congregation; however if he has not yet prayed Mincha he does not mention Rosh Chodesh, since he will pray a weekday Mincha — all this Magen Avraham wrote and the Acharonim brought it for practical law:",
  },
  "output/siman_424/magen-avraham/part-001.txt": {
    "1:_": "We do not make him repeat. For if he wishes he does not eat bread; and see siman 188 seif 6:",
  },
  "output/siman_424/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] They mention Yaaleh VeYavo in Birkat HaMazon — and that Yaaleh VeYavo is in Boneh Yerushalayim: Tosafot wrote (Shabbat 24a) that because Yaaleh VeYavo is prayer and supplication they enacted it in Boneh Yerushalayim, which is also prayer; and in Yom Tov they enacted it in Avodah, which is prayer to restore Israel to Jerusalem — end of his words — and Beit Yosef brought it:",
  },
  "output/siman_424/eliyah-rabbah/part-001.txt": {
    "1:_": "[1] And if he did not say it, etc. — this entire siman was already explained at the end of siman 188:",
  },
  "output/siman_424/beer-hagolah/part-001.txt": {
    "1:א": "Shabbat 24 and according to R' as the baraita teaches according to him",
    "1:ב": "Statement in Berakhot 49",
    "1:ג": "I flagged it siman 188 seif 7",
  },
  "output/siman_424/baer-heitev/part-001.txt": {
    "1:א":
      "In Birkat HaMazon. Regarding if Rosh Chodesh falls on Shabbat and one extended the third meal until night, or if Rosh Chodesh falls on Sunday — I wrote everything explained at the end of siman 188 there. And regarding if one ate between Mincha and Maariv on Rosh Chodesh or on erev Rosh Chodesh — I wrote everything explained in siman 419 there:",
    "1:ב": "We do not make him repeat. For if he wishes he need not eat bread:",
  },
};

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
];

let total = 0;
const risks = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) {
            risks.push({ file, key, pattern: re.source });
          }
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}

console.log("TOTAL", total);
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
