#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "6:_": `They begin in order to look at the four blessings of birkat hamazon (Beit Yosef). Need not pour on hands but once (Beit Yosef and Levush). Also no revi'it for mayim acharonim. They take from all types of beverage except wine for disgrace as explained siman 171.`,
  },
  "baer-heitev/part-001.txt": {
    "6:_": `For mayim acharonim. Sages estimated measure like netilat arba revi'ot—blesser can look at four blessings of birkat hamazon. Proves what we say immediately after netilat yadayim blessing is not literally immediately but within this measure; nevertheless for interrupting we do not interrupt. Magen Avraham.`,
    "10:_": `Not practiced. Kabbalists wrote every person should be careful with mayim acharonim; so Yeshuot Yaakov who practiced pouring the cup and washing hands in the water.`,
  },
  "beer-hagolah/part-001.txt": {
    "3:_": `There in Gemara.`,
    "10:_": `Tosafot there in Berakhot 53.`,
  },
  "beur-hagra/part-001.txt": {
    "4:_": `No need. So Tur ch. 4 in name Raavad and Magen Avraham—all per Rashi, Rashbam, Raavad, and Ra'ah who explain Chullin until the joint—until second knuckle of fingers; though we hold Samuel stringently for terumah from terumah rule—not so for mayim acharonim—this is Raavad and Rashba view here as said.`,
    "7:_": `None. Tosafot Chullin there s.v. water and support; Bahag; so Rosh ch. 8 Berakhot; Rambam; Tosafot Shabbat 25b s.v. obligation; many dispute—see Raavad, Turat HaBayit, Rosh, Tur.`,
    "10:_": `Some. Because Sodomite salt not found among us—Tosafot ch. 5 Eruvin and ch. 8 Berakhot; see Rosh there though drasha there is asmakhta; oil siman 42a etc.; therefore oil blocks blessing for accustomed; likewise hands dirty; Tosafot Chullin s.v. water; Rosh, Tur, Bahag; but all rejected—Tosafot Eruvin 17b s.v. water: now their words rejected from root—for there discusses mishnah four things exempt in camp and hand washing—Abaye there: mayim acharonim not exempt in camp because obligation from Sodomite salt per R' Chiya bar Ashi; if no Sodomite salt reason—exempt in camp like first waters; but without camp obligated in mayim acharonim like first; so Rosh in sugya Chullin 105, Ran, Rambam ch. 3—is essence.`,
  },
  "biur-halacha/part-001.txt": {
    "2:_": `But in a vessel—and if must be careful not to pour afterward where people tread; seemingly depends on dispute: per Levush vessel permitted because people will not trample on it—therefore forbidden pour afterward where people pass, as above siman 4 seif 9 regarding morning netilah water; but per Shulchan Aruch HaRav no evil spirit rests on water in vessel when they rinse in vessel—permitted, not similar to above siman 4 where evil spirit on hands and when washing hands even in vessel evil spirit passes from hands to water; can reject that perhaps even afterward when pouring mayim acharonim from vessel on ground evil spirit rests—and so implied somewhat from Rashi's language (Chullin 105 s.v. kinisa) see there: all mayim acharonim poured on ground—evil spirit rests on them.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "6:_": `(6) (Levush) And the reason there is no, etc.—difficulty: already said reason immediately after netilat yadayim blessing; Beit Yosef spring shows one who said this did not say that—for Rashi explained reason removal of table, Rashba reason interruption; R' Yonah ch. Kol HaBasar 42 did not precise—wrote nowadays no table removal even if hundred honor blesser—did not notice also interruption reason. Now resolves Bach and Taz wonder on Tur who ruled this law and siman 180 wrote they do not remove table from blesser—no difficulty—for holds Rashba's reason; further seems since their custom was to remove table Rashi stated so, but truly disgrace for elder to sit idle waiting even when they do not remove table—Levush view.`,
  },
};

const base = "output/siman_181";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
