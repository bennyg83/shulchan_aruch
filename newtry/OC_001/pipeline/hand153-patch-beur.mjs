import { readFileSync, writeFileSync } from "fs";
const p = new URL("./hand153-garbled-overrides.mjs", import.meta.url);
let s = readFileSync(p, "utf8");
const ins = `    "7:ל":
      "(30) And likewise, etc. — and per Ran's explanation that if they have another beit haknesset, the reason of negligence does not apply, as explained in siman 152.",
    "12:_":
      "(12) There they sold a handkerchief taking books — each chumash by itself, as well as prophets and scriptures; see there at length.",
    "14:ג":
      "(3) Standing and screaming — since they consecrated with intent and for the beit haknesset, even the owner may change it per Choshen Mishpat; see Meiri who is not a city member.",
    "21:ג":
      "(3) Returning to his mitzvah — see there in siman 22.",
`;
if (s.includes('"7:ל"')) {
  console.log("already patched");
  process.exit(0);
}
const needle = '  "beur-hagra/part-001.txt": {\n    "22:ב":';
if (!s.includes(needle)) throw new Error("needle not found");
s = s.replace(needle, `  "beur-hagra/part-001.txt": {\n${ins}    "22:ב":`);
writeFileSync(p, s);
console.log("patched beur-hagra overrides");
