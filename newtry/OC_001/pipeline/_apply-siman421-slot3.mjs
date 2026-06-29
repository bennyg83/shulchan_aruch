#!/usr/bin/env node
/** worker slot 3 — siman 421 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_421/mechaber/part-001.txt": {
    "1:main":
      "The recitation of \"And on your Rosh Chodesh days\" in Pesukei Dezimra. Contains 1 seif. The custom in Ashkenaz is to recite the passage of \"And on your Rosh Chodesh days\" in the morning service after the passage of the daily offering. In Sepharad the custom is not to recite it, since they will read it later from the Torah scroll.",
  },
  "output/siman_421/mishnah-berurah/part-001.txt": {
    "1:_":
      "(1) That they recite the passage \"And on your Rosh Chodesh days\" — in order to publicize that it is Rosh Chodesh [Magen Avraham].",
  },
  "output/siman_421/magen-avraham/part-001.txt": {
    "1:_":
      "\"And on your Rosh Chodesh days\" — to publicize that it is Rosh Chodesh; see siman 48; and there is support for this from the mishnah at the end of Shekalim.",
  },
  "output/siman_421/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) And on Rosh Chodesh, etc. — from the mishnah at the end of Shekalim. For we learned: every day the priests would make a lottery; they would bring the limbs of the morning tamid and place them on the ramp of the altar, which was 32 cubits long — on the lower half of the ramp close to the ground; and they would interrupt and read Shema, and afterward they would place the limbs on the altar; and the limbs of the Rosh Chodesh additional offerings they would place the first time on the upper half of the ramp toward the side of the altar — according to Raavad there. And according to Rambam — on the altar between one corner and another. And the reason Rashi wrote: this importance we do so that they recognize, so they recognize it is obvious to beit din that they sanctified it according to its law, and a person's heart should not waver on it, for most of the public did not see the renewal of the moon — end. And even though in our time this reason does not apply, for we do not sanctify based on sight, nevertheless we do so as a remembrance of our fathers' custom.",
  },
  "output/siman_421/beer-hagolah/part-001.txt": {
    "1:_": "Tur — I cited it above siman 48.",
  },
  "output/siman_421/beur-hagra/part-001.txt": {
    "1:_": "Seif 1 — the custom in Ashkenaz. Sukkah 54b, 55a.",
  },
  "output/siman_421/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] Because of remembrance, etc. — they practiced to stand at the time of announcing Rosh Chodesh on such-and-such day, corresponding to kiddush hachodesh which was while standing (Magen Avraham siman 417).",
  },
  "output/siman_421/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] The custom — in Ashkenaz they recite the passage \"And on your Rosh Chodesh days,\" etc., to publicize that it is Rosh Chodesh, as written above siman 48 in the gloss; and Magen Avraham brought it in this siman.",
  },
  "output/siman_421/peri-megadim/part-001.txt": {
    "1:ב":
      "What the Mechaber wrote — the custom is that they recite the passage \"And on your Rosh Chodesh days\" on Rosh Hashanah if they say \"and on your Rosh Chodesh\" — see siman 582 and 584 in Levush; and in siman 48 I wrote one does not [recite] the passage \"And on your Rosh Chodesh days\" — see there; and if so, in Hilchot Rosh Hashanah it will be explained further.",
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
