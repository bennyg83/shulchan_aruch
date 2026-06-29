#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "peri-megadim/part-001.txt": {
    "4:_": `Before per Taz—wine before meal comes to open bowels and counts for drinking like after meal; during meal only to serve; Tosafot and Rosh Berakhot 42b; fixed per Levush—even on weekday during meal they drink wine; only after meal distinction between Shabbat and Yom Tov and weekday (see Tur), unlike during meal though Rosh learned only a fortiori, so it is; however only when drinks in one place, but change of place requires blessing during meal, see Berakhot 43a Tosafot s.v. came; Magen Avraham sign 6; siman 178; see Berakhot 42 Tosafot s.v. Rav Sheshet.`,
    "5:_": `Of kiddush per Taz—for kiddush only where meal, connected to meal and exempts during meal; havdalah although not for meal exempts; Beit Yosef and poskim teach only wine before meal considered comes to open bowels and drink exempts during and after meal; but kiddush wine not for drinking one might say does not teach—on contrary mitzvah more important, Taz intent; regarding final blessing siman 299 some hold before netilat yadayim does not exempt during meal—bless final blessing; but for us doubt in blessings to be lenient, no final blessing on havdalah, exempts wine during meal.`,
    "7:_": `And they extend per Taz siman 169 Taz sign 4—important person stam or Torah scholar, see there; Magen Avraham siman 169 7 in his intent on doubt whether helps; from wedding cup seems not help intent on doubt; again saw in Kitzur sign 7 corrected this, requires study, will be explained there.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "1:_": `Liquids Baer Heitev; see Degel Machaneh Ephraim—for per what we rule siman 213 we fix on wine even for us even if liquids not before him exempt, as explained Darkhei Moshe; so Peri Megadim per Darkhei Moshe, see there; see Magen Avraham.`,
  },
  "turei-zahav/part-001.txt": {
    "7:א": `(1) And even wine was not needed etc.—this is gemara challenge: wine too should bread exempt, and answer since he fixes blessing for himself due to its importance as seif 1; first view holds only on wine challenges that bread exempt it because it satiates; water does not satiate, thus no reason bread should exempt; appears our beer from grain—even first view no blessing needed, for Rosh chapter These pass over brings Beit Yosef below siman 472: beer made in Ashkenaz has much more than revi'it, certainly satiates and bread exempts.`,
    "7:ב": `(2) He sits before netilat yadayim etc.—say he must bless final blessing after revi'it drank before hamotzi, for Beit Hillel does not exempt borei nefashot nor one blessing me'ein shalosh as proven siman 147 after meal require blessing before and after and Beit Hillel does not exempt; so Beit Yosef siman 197 s.v. my brother wrote; Beit Yosef siman 473 in name teshuvat Rashba Beit Hillel does not exempt what ate before meal not supporting meal, speaks of borei nefashot; thus no combination with what drinks during meal; say what drank before eating comes for need of what will eat afterward as seif 6 Beit Hillel exempts wine before meal since comes to open bowels and continue appetite as Rosh chapter Arvei Pesachim, same other liquids—no final blessing before eating; but certainly one already obligated borei nefashot or me'ein shalosh Beit Hillel does not exempt. Found in Kavanot Ari: before eating drink little water less than revi'it, bless beginning and end, intend to fulfill eighteen from water during meal; once drank more than revi'it shown on forehead blessing was in vain, end quote; appears he did not adopt Rosh view wine before meal exempt from final blessing; since needs final blessing would be interruption between wine blessed before hamotzi.`,
  },
};

const base = "output/siman_174";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
