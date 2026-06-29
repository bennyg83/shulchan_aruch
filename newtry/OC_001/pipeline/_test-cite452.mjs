import { translateCite452 } from "./lib/translate-cite-452.mjs";
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const raw = fs.readFileSync("../output/siman_452/beer-hagolah/part-001.txt", "utf8");
const blocks = parseBlocksInFile(raw);
for (const b of blocks) {
  const k = `${b.seif}:${b.marker || "_"}`;
  const en = translateCite452(b.he);
  console.log(k, "|", JSON.stringify(b.he.trim()), "=>", en);
}
