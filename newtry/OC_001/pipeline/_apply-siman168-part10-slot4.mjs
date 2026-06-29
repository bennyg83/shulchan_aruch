#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "5:ד": `(ד) And his intent is not etc.—meaning although at beginning of seif wrote bless on whichever he wishes—refers when his intent is to eat meal from both; but this one whose intent is not to eat at all except idolater bread—need not bless on other bread even though it is considered better; and so in seif 61 in gloss. And even if host recites hamotzi and they eat only from kosher bread—nevertheless since he does not wish to eat except this and he is host he is primary and we follow him and he blesses on bread he eats.`,
  "7:ח": `(ח) And so is practiced—that they bake lechem mishneh bread with little oil and spice (Darkei Moshe); and so acharonim agreed halachah follows Rama's ruling.`,
  "8:א": `(א) It is full bread—for made only from flour and water like other bread; and even though thin nevertheless not like dry k'eivin of seif 7 that are very dry and not made for eating but only nibble for dessert; but these are made for eating.`,
  "9:א": `(א) Less than olive-size—and likewise even on any amount—for forbidden to benefit from this world without blessing.`,
};

const path = "output/siman_168/mishnah-berurah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(path, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (fixes[key]) return { ...b, en: fixes[key] };
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(path, out);
console.log("fixed", Object.keys(fixes).length);
