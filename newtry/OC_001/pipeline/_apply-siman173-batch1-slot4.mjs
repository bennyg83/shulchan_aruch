#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "baer-heitev/part-001.txt": {
    "2:_": `Afterward. And possible in our time there is not so much danger, for many things mentioned in Shas pose danger for evil spirit and other things, and nowadays do not harm for natures changed; and also all depends on nature of lands; Magen Avraham, see Yoreh Deah siman 156 seif 3 and Orach Chayim siman 176.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:_": `Chullin 105.`,
    "2:_": `Tur in name of Rosh from gemara Pesachim 76.`,
  },
  "beur-hagra/part-001.txt": {
    "3:א": `(1) Seif 3 and except for drying etc.—Acharonim need not dry since no impure water present, for hands are pure, for even for first waters one need not dry when immersing; see Tosafot Berakhot 52a s.v. gezeirah etc., and Magen Avraham.`,
  },
  "eshel-avraham/part-001.txt": {
    "1:_": `Seif 9. The rav author of Pe'er haDor in Chokhmat Binyamin siman 14 was asked about a drink made this way—they put in a pot chicken broth and rose water and oils and herbs, and inside the pot place an empty cup and seal the cover so vapor does not escape, and boil it, for vapor rises and sweats the cover and sweat falls into the cup etc.—whether permitted to eat cheese after the sweat without waiting six hours. He raised that it is permitted in such a case: one, we need not be stringent except on meat broth itself and if one eating will taste it, therefore Rashi's taste one should be stringent; but all agree in sweat generally there is neither meat taste nor chicken taste, for taste is nullified through mixture and not from Semak, see there, for one cannot establish meat taste at all; and all the more poultry meat itself which is only d'rabbanan—supported if they are stringent on broth itself. And the rav concluded even wiping and rinsing not required by law, only one who is stringent should be blessed; see Laws of Vows siman 217 in teshuvat Beit Yehudah siman 84.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "2:_": `(2) And regarding eating meat after cheese—Beit Yosef wrote some are stringent on themselves not to eat meat after cheese in one meal, because written in Zohar parashat Mishpatim daf 125a: we find whoever eats this food joined as one or at one time or in one meal, forty days he appears as a goat bleating before those above and impure company approaches him and causes unclean judgments in the world; and if he fathers a child in those days they give him soul from impure side not needed, end quote. Beit Yosef wrote proper to be stringent also for poultry meat, see there; and in Shaar haMitzvot parashat Mishpatim wrote custom of Ari that day he ate cheese he did not eat meat until night, see there. From Zohar words it appears no distinction hard or soft cheese or milk—in every case one does not eat dairy and meat at one time or one meal even after an hour; therefore every God-fearing person should be stringent for himself and those who heed him not to eat meat after cheese even soft or after dairy foods until after one hour and another meal, although by law permitted after rinsing and wiping mouth as Yoreh Deah siman 89 seif 2, see there; and one stringent like Ari not to eat all that day—blessed is he. Regarding hard cheese see Mor uKetziah there in hagahah seif 2: some do not eat after it even poultry like cheese after meat, and some are lenient; he wrote good to be stringent, see there. Therefore everywhere per local custom; nevertheless even where lenient one should heed Zohar and not eat meat after it except after hour and other meal as said; see Rikanti there in Shulchan Aruch Yoreh Deah sign 13, and examine.`,
    "3:_": `(3) [seif 2] Between meat and fish one must wash etc.—some wash between cheese and fish; Kenat haGadol in hagah Bach wrote they derived from Beit Yosef Yoreh Deah siman 87 that forbidden to eat fish with milk because of danger, and likewise must wash hands similar to fish with meat, see there; and Magen Avraham in this siman wrote Darkhei Moshe already wrote printing error in Beit Yosef and should read fish with meat, see there; Kenat haGadol already discussed there hagah Bach sign 19 and Kenat haGadol in this siman sign 2, see there; Kenat haGadol wrote doctors say fish in milk or cheese poses danger of tzaraat, therefore practiced washing also between cheese and fish, see there; and so Beit Levi sign 3 except he wrote only butter and fat rising on pickled milk no danger, see there; and Mishnat Zahav sign 3; and Acharonim in this siman in Be'er Mayim Chayyim siman 1, Kaf HaChayyim siman 61; and teshuvat Edni part 7 siman 42 in name of Bachye parashat Mishpatim complete danger fish with cheese or milk, only butter permitted, see there; and Bach part 9, see there; but see Taz there s.k. 3 and Shach s.k. 5 who permit even milk, see there; and Chokhmat Shlomo siman 101; and Bach part 9 that nowadays since many are lenient it is permitted, see there. It appears since this is per medicine and air of places differs, as known, possible some places harmful and some not; therefore where many were not lenient to eat fish in milk or cheese one should be stringent, for danger is stricter than prohibition; and one should require netilat yadayim also between them as Kenat haGadol, and rinsing and wiping mouth like one who ate meat after milk as written Yoreh Deah siman 89 seif 2, see there; see in next sign.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "2:א": `(2) (s.k. 2) From distraction etc.—distraction for prayer, and here must be birkat hamazon.`,
    "2:ב": `(2) And see siman 178 that we say one who washes hands for fruit is coarse of spirit; therefore for fruit blessing we are not concerned for distraction; and if so for birkat hamazon one may say law of other blessings.`,
    "3:א": `(3) (s.k. 3) Except etc.—all the more for intermediate waters, for hands are pure.`,
  },
  "magen-avraham/part-001.txt": {
    "2:_": `Laws of meat and cheese were explained in Yoreh Deah for that is their place; but I saw Bach wrote here: it implies when they do not know each other they may eat on one cloth—and difficult etc., that meat sticks where cheese on cloth together etc.; and to me here it speaks of new cloth or well laundered, and this one eats at his edge and that one at the other edge so they do not touch, and this is simple. Further he wrote when one places bowl of meat on table and afterward places pot of milk in its place, it absorbs taste of meat absorbed in table etc. and forbids peel's thickness, end of his words—we do not rule thus as Yoreh Deah end siman 92, absorption does not pass vessel to vessel. Some wash between cheese and fish and derive from Beit Yosef Yoreh Deah siman 87 danger eating cheese and fish (so printed), and Darkhei Moshe already wrote printing error in Beit Yosef and should read fish with meat, see there, and so Acharonim. He asked on this. And possible in our time not so much danger, for we see many things in gemara dangerous for evil spirit and other things, and nowadays do not harm for natures changed; and all per nature of lands; see Yoreh Deah siman 156 seif 3 and Orach Chayim siman 176; and so Bach in name of Rambam.`,
  },
};

const base = "output/siman_173";
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
