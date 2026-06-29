/** worker-slot-16 — siman 603 manual fixes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chokhmatEn = fs
  .readFileSync(path.join(__dirname, "work", "chokhmat603-en.txt"), "utf8")
  .trim();

export const FIXES = {
  "beur-hagra/part-001.txt": {
    "1:א":
      '(א) Seif 1, even one who is not careful with bread of gentiles, etc. Rosh end of Rosh Hashanah and Mordechai and Shiltei Giborim from Yerushalmi — Rosh Chodesh commands the rabbi: if you can eat the whole year in purity, eat; if not, eat seven days in the year. Ravyah received that these are the seven weekday days between Rosh Hashanah and Yom Kippur, for on Shabbat and Yom Tov one need not be careful — and they learned from this regarding bread of gentiles.',
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_":
      "(א) [Seif 1] Even one who is not careful with Samaritan bread, etc. — meaning even one not careful all year with baker-gentile bread must nevertheless be careful during the Ten Days of Repentance. Rosh Chodesh (1), Mishna Berurah (1). See Yoreh Deah siman 112 for the distinction between baker-gentile bread and homeowner bread, and between five-grain bread and other legumes, see there. See below note (3).",
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": chokhmatEn,
  },
};
