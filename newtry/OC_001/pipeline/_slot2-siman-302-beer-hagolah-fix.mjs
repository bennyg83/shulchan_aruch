#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`beer-hagolah:1:א`, `Shabbat 147`],
  [`beer-hagolah:1:ב`, `Per Tosafot and the Rosh and the Ran, and Shulchan Pesak in the name of R' Chananel`],
  [`beer-hagolah:2:א`, `There 75`],
  [`beer-hagolah:2:ב`, `In the words of the Rambam in chapter 6`],
  [`beer-hagolah:2:ג`, `There per his explanation in the Gemara`],
  [`beer-hagolah:3:א`, `There 113`],
  [
    `beer-hagolah:3:ב`,
    `Mordechai there; and further wrote Beit Yosef in the name of Kol Bo the reason for a place where they practiced leniency, see there`,
  ],
  [`beer-hagolah:4:_`, `There 161, and like the first Tanna`],
  [`beer-hagolah:5:_`, `There 140`],
  [`beer-hagolah:6:א`, `There 161, and likewise the Rif in the name of Geonim and the Rambam in chapter 21`],
  [`beer-hagolah:6:ב`, `The Rif in the name of R' Yehudai`],
  [`beer-hagolah:7:א`, `There`],
  [`beer-hagolah:7:ב`, `Tur in the name of R' Peretz who brought Tosafot`],
  [`beer-hagolah:8:_`, `There in the Gemara`],
  [`beer-hagolah:9:א`, `Zevachim 94, and they wrote it the Rif and Rosh end chapter Tolim`],
  [`beer-hagolah:9:ב`, `Shabbat 142`],
  [`beer-hagolah:9:ג`, `Glosses chapter 22 in the name of Semak`],
  [
    `beer-hagolah:10:_`,
    `Mordechai end chapter 15 of Shabbat in the name of Rambam and Shulchan Leket in the name of Sefer Yereim`,
  ],
  [`beer-hagolah:11:_`, `Rambam in chapter 22, and the Rav HaMagid wrote it is Tosefta`],
  [`beer-hagolah:12:_`, `Teshuvot HaRashbatz in the name of Rambam and R' Yitzchak in ch. 13`],
  [`beer-hagolah:13:א`, `Shabbat 149, and like the first Tanna the Rif and Rosh and Rambam chapter 22 and Shulchan Pesak`],
  [`beer-hagolah:13:ב`, `There in the above poskim`],
]);

const f = "output/siman_302/beer-hagolah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Beer HaGolah 302:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
