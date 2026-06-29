#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "beer-hagolah/part-001.txt": {
    "1:א": `(א) Taanit 5.`,
    "1:ב": `(ב) Yerushalmi chapter 6 Berachot.`,
    "1:ג": `(ג) Yoma 39.`,
    "1:ד": `(ד) It appears to me here refers to one sitting alone at a meal—and so implies Hagahot Ashri; therefore not relevant to say he should take due to suspicion.`,
    "10:_": `ibid. (same source).`,
    "11:_": `ibid. (same source).`,
    "12:_": `ibid. chapter 5.`,
    "13:_": `ibid. chapter 6.`,
    "14:_": `ibid. chapter 7.`,
    "15:_": `ibid. (same source).`,
    "16:_": `ibid. (same source).`,
    "17:_": `ibid. (same source).`,
    "3:_": `Eruvin 33.`,
    "6:_": `ibid. (same source).`,
    "18:_": `ibid. (same source).`,
    "21:_": `Berachot 45.`,
  },
  "baer-heitev/part-001.txt": {
    "1:ג": `(ג) His hands—and need not bless hamotzi as Rama wrote siman 178 Magen Avraham. (See also Sefer Birkat Avraham page 24.)`,
    "16:_": `To his fellow—for perhaps out of shame his fellow accepts from him and drinks against his will and dies from disgust. Taz wrote I saw in testament of R' Eliezer haGadol he warns greatly not to drink from what his fellow left—for perhaps he has illness in his body and breath comes from his mouth to that remainder see there.`,
  },
};

const base = "output/siman_170";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
