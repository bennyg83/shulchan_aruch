import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "output/siman_139/mishnah-berurah/part-001.txt");
let content = fs.readFileSync(fp, "utf8");

const en = `(4) One must protest, etc. — from the Mechaber's words it is proved that even if one can read with the chazzan word for word from the text, nevertheless one should not call him, since he can read by himself; but from the words of Tur below in siman 141 and likewise from responsum of Rosh brought in Beit Yosef there, it implies one should be lenient in this [Peri Chadash]; and especially following what is written in Shulchan Aruch HaRav in the name of Maharil — certainly one should not be stringent in this.`;

const re =
  /(\*\*\*\* OC001 SOURCE BLOCK \*\*\*\*\nslug: mishnah-berurah\nseif: 2\nmarker: א\n\*\*\*\* HEBREW \*\*\*\*\n[\s\S]*?\*\*\*\* ENGLISH \*\*\*\*\n)[\s\S]*?(\n\*\*\*\* END BLOCK \*\*\*\*)/;

if (!re.test(content)) throw new Error("block not found");
content = content.replace(re, `$1${en}$2`);
fs.writeFileSync(fp, content, "utf8");
console.log("Patched mishnah-berurah seif 2 marker א");
