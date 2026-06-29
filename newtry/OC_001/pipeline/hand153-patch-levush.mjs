import { readFileSync, writeFileSync } from "fs";
const p = new URL("./hand153-garbled-overrides.mjs", import.meta.url);
let s = readFileSync(p, "utf8");
if (s.includes('"levushei-serad/part-001.txt": {\n    "1:_"')) {
  console.log("levush 1:_ already present");
  process.exit(0);
}
const needle = '  "levushei-serad/part-001.txt": {\n    "3:_":';
s = s.replace(
  needle,
  `  "levushei-serad/part-001.txt": {\n    "1:_":\n      "Siman 154 — whether one may make a beit midrash from a beit haknesset; see there.",\n    "3:_":`
);
writeFileSync(p, s);
console.log("patched levushei-serad");
