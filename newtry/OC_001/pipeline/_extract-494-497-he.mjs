#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

function hePlain(h) {
  return h
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

const needs = {
  494: [
    ["baer-heitev/part-001.txt", "1", "א"],
    ["mishnah-berurah/part-001.txt", "3", "א"],
    ["mishnah-berurah/part-001.txt", "3", "ה"],
    ["peri-megadim/part-001.txt", "3", "ב"],
  ],
  495: [
    ["baer-heitev/part-001.txt", "4", "ד"],
    ["beur-hagra/part-001.txt", "1", "א"],
    ["biur-halacha/part-001.txt", "4", "ב"],
    ["machatzit-hashekel/part-001.txt", "3", "א"],
    ["mishnah-berurah/part-001.txt", "4", "ח"],
    ["mishnah-berurah/part-001.txt", "4", "ט"],
    ["peri-megadim/part-001.txt", "2", "_"],
  ],
  496: [
    ["baer-heitev/part-001.txt", "3", "ג"],
    ["kaf-hachayyim/part-001.txt", "1", "_"],
    ["peri-megadim/part-001.txt", "1", "א"],
    ["rabbi-akiva-eiger/part-001.txt", "2", "_"],
    ["shaarei-teshuvah/part-001.txt", "1", "_"],
  ],
  497: [
    ["beur-hagra/part-001.txt", "4", "א"],
    ["machatzit-hashekel/part-001.txt", "1", "א"],
    ["machatzit-hashekel/part-001.txt", "14", "ז"],
    ["machatzit-hashekel/part-001.txt", "16", "ב"],
    ["machatzit-hashekel/part-001.txt", "5", "ב"],
    ["machatzit-hashekel/part-001.txt", "7", "א"],
    ["magen-avraham/part-001.txt", "12", "א"],
    ["magen-avraham/part-001.txt", "7", "_"],
    ["mishnah-berurah/part-001.txt", "12", "ב"],
    ["mishnah-berurah/part-001.txt", "16", "א"],
    ["mishnah-berurah/part-001.txt", "2", "א"],
    ["peri-megadim/part-001.txt", "3", "_"],
    ["peri-megadim/part-001.txt", "4", "_"],
    ["turei-zahav/part-001.txt", "1", "א"],
    ["yad-ephraim/part-001.txt", "1", "_"],
  ],
};

let out = "";
for (const [s, blocks] of Object.entries(needs)) {
  for (const [rel, seif, marker] of blocks) {
    const fp = `output/siman_${String(s).padStart(3, "0")}/${rel}`;
    const bs = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = bs.find(
      (x) =>
        String(x.seif) === seif &&
        String(x.marker || "_") === (marker || "_")
    );
    out += `\n\n===== SIMAN ${s} ${rel} ${seif}:${marker} =====\n`;
    out += hePlain(b.he) + "\n";
  }
}
fs.writeFileSync("pipeline/work/extract-494-497-he.txt", out, "utf8");
console.log("wrote", out.length);
