#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "baer-heitev/part-001.txt": {
    "1:א": `HaTov veHaMeitiv. Maharil some hold no haTov veHaMeitiv on Passover night not to add cups, end quote; Magen Avraham wrote appears should not drink two kinds but if brought another kind must bless since mentioned in gemara; if blessed birkat hamazon on wine need not haTov veHaMeitiv for already said in birkat hamazon. Magen Avraham.`,
    "4:א": `With him. Levushei Chayim: Reuven and Shimon each drink their wine and Reuven gave Shimon his cup to drink—requires study if bless haTov veHaMeitiv since wine change only for Shimon, see Magen Avraham. Teshuvat Ginat Veradim general 1 siman 40: even if another with him did not drink from first wine and later other wine came and both want to drink together from second—does not bless haTov veHaMeitiv for meitiv for others none since fellow did not drink from first; but if after other wine came they decided also to drink from first—bless haTov veHaMeitiv, see there resolved Lev Chayim question. Teshuvat Perach Shoshan general 4 siman 12 extended: whether Reuven and Shimon drank from first and second only one drank, or reverse—in all requires study; doubt in blessings to be lenient, see Magen Avraham s.k. 5.`,
    "4:ב": `No. Mordekhai chapter haRo'eh: innkeeper and guest do not bless haTov veHaMeitiv for not benefit since not his, end quote; Beit Yosef explains guest should not bless only host, disputes—why not bless on what Holy One blessed him types of wines even though not his; Bach: Mordekhai holds guest does not bless, host blesses and guest fulfills through his blessing, so we rule, so Shlah; Magen Avraham disputes: doubt in blessings to be lenient, neither guest nor host bless when no household member at table; nevertheless if host puts pitcher on table as large feasts—all equal for benefit and bless haTov veHaMeitiv; if not drinking together each in separate room obviously no blessing; Perach Shoshan challenged Magen Avraham, raised guest can bless and host drinking with him; saw practice before gedolim guest blesses; Or Chadash daf 29 s.k. 8 reason as if gives all brought wine as gift and considered his; therefore to resolve doubt when host gives guest to bless, guest can say to host or host to guest—in giving to bless wine becomes all his to bless per all views; or say half wine is his if gives all host cannot bless again on it, see Perach Shoshan siman 12.`,
  },
  "beur-hagra/part-001.txt": {
    "5:א": `(1) Seif 5 if many etc.—see Tosafot Berakhot 43a s.v. he'eil etc. and R' Yechiel etc.`,
  },
  "eshel-avraham/part-001.txt": {
    "1:_": `HaTov. When for kiddush only raisin wine and during meal brought more wine—ruled teshuvat Beit Yehudah siman 49 first blessing pushed off, no greater reconsideration than this, bless borei peri hagafen.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_": `(3) There but bless haTov etc.—Maharil some hold no haTov veHaMeitiv on Passover night not to add cups, end quote; brought Magen Avraham beginning of siman: l'chatchila not drink two kinds but if brought another kind must bless since explicit in gemara, end quote; meaning if brought other between first and second that he can drink as siman 473 seif 3, and desires to drink must bless since haTov veHaMeitiv in gemara; so Radbaz in name Maharam and Tur siman 473 may bless on Passover night and not adding cups, see there; Bach Magen Avraham there.`,
    "5:_": `(5) There but bless haTov—and if blessed birkat hamazon on other wine need not haTov veHaMeitiv for already said in birkat hamazon; Magen Avraham beginning, Acharonim sign 2, some in Hagahot Tur; although in birkat hamazon since must bless borei peri hagafen considered reconsideration and in reconsideration bless only borei peri hagafen as below sign 7—say here all agree bless only borei peri hagafen, see there examine.`,
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
