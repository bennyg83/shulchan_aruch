#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "rabbi-akiva-eiger/part-001.txt": {
    "4:_": `Magen Avraham s.k. 4—for his view he does not bless, end quote; see teshuvat Ginat Veradim Orach Chayim general 1 siman 40.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "1:א": `HaTov veHaMeitiv. Baer Heitev; in Berit Yosef wrote many dispute Maharil, see Tur siman 473 and Maamar Chametz Rashbatz wrote may bless haTov veHaMeitiv; R' Yitzchak in incident on Passover night after kiddush cup saw wine was bad, doubted whether to send for better wine lest enter doubt of haTov veHaMeitiv—answered certainly personal obligation to do mitzvah from best; proof teshuvat Chavot Yair siman 45, see there; wrote that also Maharil agrees for not adding cups—needs cups for mitzvah, and they have from first—may bless haTov veHaMeitiv per all views; implies if not from first possibly should not bring anew to avoid doubt in haTov veHaMeitiv; appears nevertheless for mitzvah from best permitted to bring better for mitzvah in its time even if not bless haTov due to doubt, as Berit Yosef there per Raavad and Radbaz not to bless—concern for their words; so Maharik and Shlah, see there.`,
    "1:ב": `The first. Baer Heitev; see in s.k. before that doubt in blessings to be lenient; Berit Yosef in name Mahari Molcho: if mixed wine brought anew into his wine, if majority from new wine blesses haTov veHaMeitiv—Rama ruled Shulchan Aruch siman 208 and 217, see there; in my humble opinion requires study—for essence of this blessing is he now tastes better taste than before, not dependent on majority and minority but on improving; if now tastes improved wine taste even through minority mixture—bless; clear to understanding easy to distinguish between this siman and siman 217; see below siman 202 regarding cooked wine mixed with uncooked.`,
  },
};

const base = "output/siman_175";
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
