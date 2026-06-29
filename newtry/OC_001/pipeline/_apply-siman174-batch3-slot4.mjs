#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "machatzit-hashekel/part-001.txt": {
    "5:א": `(5) Wine etc.—implies specifically havdalah wine; meaning some hold it does not exempt unless he already washed hands.`,
    "6:א": `(6) (s.k. 6) He washed hands etc.—as Tosafot s.v. etc.; on daf 43 how order of reclining: guests enter and sit on bench until all enter; they bring water each takes one hand (we do not rule thus as siman 178 seif 6, see Rav Yosef Karo reason); wine comes each blesses for himself; they recline each returns and washes two hands; one wine one blesses for all; Tosafot s.v. came etc.: although wine before meal exempts wine after meal, all the more this before him; different here since upon reclining is change of place and must bless, end Tosafot—were it not change of place first wine would exempt even before netilat yadayim since they took only one hand and now need two; therefore netilat yadayim not precise, same if fixed and there they fixed; not proof perhaps we never require actual netilat yadayim for havdalah wine; Tosafot speak of wine before meal per Rav Beit Yosef that even before netilat yadayim exempts as Magen Avraham s.k. 5; therefore Magen Avraham wrote see there regarding those who kiddush in synagogue—proves Tosafot hold wine before meal does not exempt before netilat yadayim; thus netilat yadayim not precise; proof Tosafot hold wine before meal does not exempt before netilat yadayim from Tosafot daf 42a.`,
  },
  "magen-avraham/part-001.txt": {
    "3:_": `He leaves it after meal—in teshuvat Rashba siman 342: per Beit Hillel hamotzi does not require cup, permitted to drink before birkat hamazon; Beit Shammai hold obligated to drink before, for v'she'asa zeh shetiyah etc.; Yerushalmi explains another reason; Mechaber wrote here since poskim dispute as siman 182, if he has cup better not drink, Rav Yosef Karo per his view wrote siman 197 no concern for drinking; but per Rama there not obligated d'oraisa to bless if thirsty and did not drink—here too better to drink, especially since nowadays practice per those who hold no cup required; nevertheless if not so thirsty obviously obligated to leave for birkat hamazon.`,
    "4:א": `(1) If he fixed—likewise if he blessed before meal need not bless on wine after meal before birkat hamazon; but if he had no wine before meal and blessed on wine during meal, must bless again on wine after meal, for wine in meal comes to serve food and not important to exempt wine coming for drinking; siman 177 end seif 2 this law not common, see there.`,
    "4:ד": `(4) He washed hands—to explain likewise if he fixed himself for meal; as Tosafot s.v. wine came, see there: although they took only one hand and must return and wash, nevertheless exempt; see there regarding those who kiddush in synagogue; so Bach; how permitted to interrupt and havdalah between netilat yadayim and hamotzi—say no distraction since intent to eat [gemara chapter Arvei Pesachim siman 166].`,
    "6:ב": `(2) Before meal—since comes to open bowels to continue appetite for food, from meal [Beit Yosef, Rosh]; also it satiates [see siman 471]; wine after meal bread exempts from final blessing since satiates and gemara challenges should bless three blessings and answers people do not fix on it—if fixed would bless three; since drinks within fixed meal, since fixed for eating also fixed for drinking [Beit Yosef, Rashba, so Tur Yereim]; thus other liquids after meal need final blessing, not better than things from meal after meal as siman 177; all the more liquids some hold even during meal bless as seif 7; Hagahot Maimoniot chapter 4 counts with other things; Rosh: only liquids coming during meal bread exempts; Tosafot Pesachim 113: only wine no final blessing, intent per Rashba; this law not common among us siman 177; Shlah Anusim: eating after meal to sweeten drink like radish and olive—wine blessing exempts, end quote; other liquids during meal bread exempts as drink subordinate to bread; Anusim for drink as Tosafot when blessed on Ginosar fruit exempts salty and bread.`,
    "7:א": `(1) Because there is no way etc.—implies burned wine not normally drunk not considered from meal and needs blessing; even one accustomed to drink always, intent nullified [Magen Tzafnat Paneach, Lev Chaim, Rashal]; even if drinks before meal to arouse appetite not better than fruits needing blessing; all the more drinking mid-meal or after only to warm stomach to digest—not called from meal, separate matter (Levush siman 177); but Tur end siman 472: what comes to continue appetite counts as from meal as seif 6; so Tosafot Pesachim 116: appetizers continuing eating like small fish dates vegetables eaten between courses—bread exempts as comes for meal need to eat more; Bach siman 176; Rashi gemara; siman 168 seif 8; Mordekhai: wine exempted by bread because through its strength man desires food; Mordekhai and Hagahot Maimoniot chapter 4 fruits not from meal like fruits not to satiate but to digest food—distinction when comes to arouse appetite is meal need to eat more no blessing needed; when comes to digest no meal need now requires blessing.`,
    "7:ד": `(4) Before netilat yadayim—for he holds after netilat yadayim is interruption; and seif 4 he was not concerned for those who say before netilat yadayim does not exempt; nevertheless requires study if drank revi'it whether needs final blessing—for one who holds no blessing needed during meal, needs final blessing; per those who hold no havdalah as siman 299 seif 7 only wine before meal to continue appetite no final blessing as seif 6; other liquids need final blessing as Tur siman 473; siman 177 seif 3; per Me'or author no final blessing if also drinks during meal for Beit Hillel exempts all; if no liquids during meal needs final blessing on drinking before meal siman 299 seif 8; if has cup for birkat hamazon need not final blessing on liquids before meal for he blesses final blessing on birkat hamazon cup—no interruption to fix blessing after, so Ran and Ramban in Milchamot siman 178 and 474; nevertheless drink less than revi'it before meal to remove doubt, so Ari intent, see there; in kavanot if drank revi'it blessing is in vain—when made final blessing; if drank revi'it as large meals drink before meal, practice per Ran and Ramban siman 179 be careful not to leave before meal without birkat hamazon.`,
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
