#!/usr/bin/env node
import { readFileSync } from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

function hePlain(h) {
  return h
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

const blocks = [
  ["beer-hagolah/part-001.txt", "7", "_"],
  ["kaf-hachayyim/part-001.txt", "7", "_"],
  ["machatzit-hashekel/part-001.txt", "9", "א"],
  ["machatzit-hashekel/part-001.txt", "12", "_"],
  ["machatzit-hashekel/part-001.txt", "15", "_"],
  ["magen-avraham/part-001.txt", "9", "ב"],
];

for (const [rel, seif, marker] of blocks) {
  const fp = `output/siman_497/${rel}`;
  const b = parseBlocksInFile(readFileSync(fp, "utf8")).find(
    (x) =>
      String(x.seif) === seif &&
      String(x.marker || "_") === (marker || "_")
  );
  console.log("===", rel, `${seif}:${marker}`, "===");
  console.log(hePlain(b.he));
  console.log("---EN---", (b.en || "").slice(0, 120));
}
