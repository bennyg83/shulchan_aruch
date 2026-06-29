import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output");
const items = [
  "siman_537/rabbi-akiva-eiger/part-001.txt|7|_",
  "siman_545/chokhmat-shlomo/part-001.txt|3|_",
  "siman_585/chokhmat-shlomo/part-001.txt|2|_",
  "siman_590/chokhmat-shlomo/part-001.txt|4|_",
  "siman_591/chokhmat-shlomo/part-001.txt|6|_",
];
for (const line of items) {
  const [rel, seif, marker] = line.split("|");
  const fp = path.join(ROOT, rel);
  const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
    (x) => x.seif === seif && (x.marker || "_") === marker
  );
  const en = b.en || "";
  console.log("\n", rel, seif, marker, "bad=", isBadMt447(en));
  for (const re of BAD_MT_447) {
    if (re.test(en)) console.log(" ", re.toString());
  }
}
