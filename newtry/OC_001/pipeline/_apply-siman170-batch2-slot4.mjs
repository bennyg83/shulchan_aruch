#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "beur-hagra/part-001.txt": {
    "1:ב": `(ב) And if not etc.—therefore he takes only one hand; and there for feet etc.—this means etc.`,
    "13:ב": `(ב) But etc.—another version there do not say etc.; and in Jerusalem etc.; Tur and Bach emended; in Jerusalem they would turn guest lodging into marriage; Darkei Moshe explains this is like one who says at first he came etc. and said for marriage—meaning even at large meal; and this is what even etc. means.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `[א] One may not converse etc.—even in words of Torah. Perishah wrote and it appears even between one dish and another one may not converse all while his mind is still to eat; proof from what wrote siman 177 regarding wine blessing and hatov vehametiv that one does not exempt fellow even if says savri—for lest one pass eat answer amen and come to danger; therefore they were concerned in every matter. Nevertheless we can say this specifically for them when they ate reclining on left side—then stomach above and trachea below and when speaking trachea opens and food above that should enter esophagus may fall into trachea and endanger—unlike now we eat sitting equally so no such concern; therefore I never saw carefulness in this; however this distinction I did not find anywhere—end quote. See above end siman 174 we hold when says savri exempts—and if so here too certainly permitted between dish and dish.`,
    "2:_": `[ב] And these matters for drinking etc.—wrote in Tur HaBayit haKatzar page 59 one known short temper even for drinking takes outside for all know his mind cannot bear to do so—end quote. And per what Rabbenu Yonah wrote they were accustomed at time of drinking to eat, and Taz in name Rashi—if so for us no washing at all needed for drinking; and Levush does not imply so.`,
    "3:_": `[ג] [Levush] And to me it appears etc.—I say not only Beit Yosef and Rama ruled so in name Hagahot Ashiri but I also saw in Semag page 113 and Semak, Agudah chapter 1 Yoma 48, chapter Elu Devarim, and Shiltai Giborim who ruled so; strained to say refers one sitting alone at meal. Therefore appears to me to resolve: specifically where obligated to wash hands we say take inside due to suspicion; but where not obligated at all we do not say take due to suspicion. Again saw in Perishah he also disputes Levush and wrote poskim refer when he sees him rub—end quote. Per this without seeing need not take inside at all—and strained; also conclusion of all poskim does not imply so. Magen Avraham wrote we fear perhaps someone sees him rub and not see take and suspect—strained. Also surprised at Olat Tamid wondered on Rama who wrote stam and if did not rub does not take—not so Shulchan Aruch for wrote reason at eating that immediately they know I am inattentive and did not write reason lest suspect perhaps did not rub—for even without rubbing need washing—end quote. You may ask reason immediately they know is set Gemara Yoma 30—and if so difficult on poskim above; and perhaps truly that is explanation immediately they know I am inattentive and if so perforce either took or did not rub; also difficult for my view etc.`,
    "5:_": `[ה] [Levush] And also in this they said etc.—I say were it not words of great poskim I would explain Gemara Yoma 30 refers to end regarding urination specifically; but regarding drinking no suspicion for we say drinking in matter not needing rubbing; proof from Gemara language rather he enters sits in place and takes two hands etc.—implies end regarding urination one hand suffices; however Rif and Rosh did not quote takes two hands—appears not in their text. For law although appears correct to me nevertheless not worthwhile rely against all great poskim; greater found in Tur HaBayit haAroch and Mishmeret HaBayit page 157 close matter in urination that even for eating takes inside due to suspicion—for in urination what inattentiveness is there—end quote. However Tur HaBayit haKatzar there ruled so in urination also did not mention at all drinking law as if Gemara not about drinking as I explained—requires great study.`,
    "12:_": `(12) Small etc.—explained small means quarter log Shelah; in our beer measure is more than quarter (Magen Avraham). Levush Yom Tov wrote this is Shulchan Aruch language very small and likewise very large; so appears main—for Arizal said they did not say your cup small and your wine sweet and your stomach wide until all apply; therefore Shulchan Aruch precise very small and very large. Tur and Shulchan Aruch did not quote Arizal—appears because uncommon all three together—end quote; see Magen Avraham. Ketubot 65 woman whose husband not with her may not drink wine; guest even if husband with her forbidden intercourse—see below siman 200 seif 13. If accustomed drink wine with husband permitted drink little when not with husband; but when with husband even much permitted even if not accustomed. Magen Avraham wrote same for other intoxicating drinks—end quote; possible to distinguish wine gladdens heart of man.`,
    "19:_": `(19) [Levush] Whether remainder or to fellow etc.—acharonim wrote in name Rashal specifically give to hand; but permitted place before him on table for then fellow does not drink when disgusted from drinking—end quote; so found in Perishah. Appears even per Lechem Chamudos page 224 not because this one drinks should say comes to life danger; rather reason if inattentive will not drink at all and die of thirst—nevertheless possible he agrees permitted place before on table for then drinks other water; but when gives to hand ashamed drink other water—easy to understand. Taz wrote in testament R' Eliezer haGadol warns greatly drink from cup fellow drank lest perhaps illness in body and breath from mouth to that remainder; Taz concluded other countries very careful in this.`,
    "22:_": `(22) And give to son etc.—specifically all before them but little permitted (Damascus Eliezer page 242); language before them does not imply so; likewise Rambam Magen Avraham brought implies even little forbidden. Appears guests may give each other—so Beit Yosef wrote. Rashal chapter Gid HaNasheh wrote attendant serving meal permitted; Shirei Keneset HaGedolah disputes; however where known there is enough and permitted—all permitted.`,
  },
};

const base = "output/siman_170";
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
