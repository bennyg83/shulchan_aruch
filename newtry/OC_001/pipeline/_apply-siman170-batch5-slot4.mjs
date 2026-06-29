#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "mechaber/part-001.txt": {
    "13:main": `One who enters a home should not say Give me to eat until they say so. {Rama: A person should not say to his fellow Come and eat with me what you fed me—for this is like repaying a debt and appears as if he loaned to him; concern he will feed him more; this entails aspect of ribit. But permitted to say Come and eat with me and I will eat with you another time; and permitted to eat with him afterward even a greater meal. [Darkhei Moshe per Tur]}`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:י": `(י) Since diverted his mind—and applies whether eating or drinking once he urinated. Nevertheless hamotzi need not bless again even if certainly touched unclean place [Magen Avraham].`,
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
