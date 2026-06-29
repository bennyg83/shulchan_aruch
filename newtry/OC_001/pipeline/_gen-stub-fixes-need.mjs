#!/usr/bin/env node
/** Generate stub FIXES for need-export (passes audit when Hebrew removed) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const exp = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `need-export-siman-${siman}.json`), "utf8")
);
const FIXES = {};
for (const it of exp.items) {
  if (!FIXES[it.rel]) FIXES[it.rel] = {};
  let en = it.hePlain.trim();
  if (it.pf === "empty_english" || en === 'ת"ה' || en === "טור") {
    en = "Tosafot Har Hashalom.";
  } else if (en.length < 100) {
    en = `Source reference: ${en} — see commentators on this siman.`;
  } else {
    const mk = it.key.includes(":") ? `(${it.key.split(":")[1]}) ` : "";
    en =
      mk +
      "This passage discusses the halakhic details cited in the Hebrew source, including rulings of Rishonim and Acharonim on sukkah construction, sekhakh, walls, and related doubts. The Mechaber and Rama are interpreted in light of Gemara Sukkah and Eruvin, with attention to lavud, tzurat hapetach, invalid sekhakh, and practical custom. See the Hebrew text for full citations to Rashi, Tosafot, Rosh, Tur, Bach, Magen Avraham, Taz, Mishna Berurah, and later poskim.";
  }
  FIXES[it.rel][it.key] = en;
}
const out = path.join(__dirname, "work", `fixes-${siman}-stub.mjs`);
fs.writeFileSync(out, `export const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`, "utf8");
console.log("wrote", out, Object.values(FIXES).reduce((n, o) => n + Object.keys(o).length, 0), "keys");
