#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "mishnah-berurah/part-001.txt": {
    "4:ב": `(7) Within the meal—and likewise exempts wine after meal before birkat hamazon [where accustomed to drink wine after finishing eating or he had explicit intent]; but if he had no wine before meal and blessed on wine during meal, must bless again on wine after meal, for wine during meal comes only to serve food in bowels and not important to exempt wine after meal that comes for drinking and pleasure [see Beit Yosef: if thirsty from eating even long after meal, as long as not yet birkat hamazon, considered like wine during meal serving food; also implied from Rashba if drinks immediately after eating presumably to serve food]; but in truth this law not common among us—we do not remove hands from bread until birkat hamazon, all counts as during meal; therefore wine during meal exempts wine after meal, both for serving.`,
    "5:ג": `(18) He did not have intent etc.—meaning intent was only to drink that cup no more, but afterward reconsidered to drink more; Taz wrote same for eating: bought one bread to eat all and blessed, then desired more and sends to buy more—must bless hamotzi again [reason actions prove he did not intend to eat only bread he bought, else would buy more initially; but if has bread at home and cuts piece to eat then wants more—not reconsideration, normal that at blessing he thinks one piece enough then takes more].`,
    "6:ב": `(24) Before the meal—for since they come to open bowels to continue appetite for food, also like things coming from meal; simple only if drinks near meal at least as start of meal, otherwise not.`,
    "6:ה": `(27) And regarding havdalah wine—meaning they do not come for meal need; see there we wrote if did not bless before meal he does not bless again and birkat hamazon exempts. Regarding whether birkat hamazon exempts wine drunk after end of meal—poskim dispute: some hold birkat hamazon does not exempt stam, must bless me'ein shalosh on wine unless explicitly intended in birkat hamazon to exempt wine—then b'dieved exempt as siman 208 seif 17; some hold no final blessing needed and birkat hamazon exempts stam even l'chatchila; nevertheless law not common among us—for per below siman 177 we do not remove hands from bread until birkat hamazon, thus all as during meal and birkat hamazon exempts [Magen Avraham]; nevertheless l'chatchila better to intend at birkat hamazon to exempt.`,
    "7:ל": `(39) And custom follows first view—reason as above, no eating without drinking, like things from meal; regarding liquor some Acharonim wrote need blessing during meal since not drunk for thirst of eating like other liquids; but Magen Avraham wrote during meal no blessing needed since comes to arouse appetite for food, counts from meal [same for fruits continuing appetite like salted lemons, salty olive, salted cucumbers—not like other fruits during meal needing blessing]; some Acharonim cited his view; proper to practice per Mechaber for other liquids [bless on little liquor before netilat yadayim intending to exempt what drinks during meal] because opinions exist, but world is lenient with basis. All during meal; if drinks liquor after meal certainly intent only to digest food—all require blessing [Acharonim]; nevertheless if ate oily food and little liquor to remove greasiness in mouth, if accustomed, subordinate to food—even after meal end no blessing needed. Chayyei Adam: if after meal end, only to digest food, unlike other liquids—needs first blessing not required; proper to bless on little and intend to exempt what drinks during meal.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `And there is no per Taz—Tosafot Berakhot 41b s.v. if so regarding kiddush and engagement blessing and some say havdalah, and even wine invalid for kiddush as siman 271 seif 1—suitable for borei peri hagafen and Chazal did not divide, see Tosafot there more reasons; some say changed for better and bless borei peri hagafen—difficult for lettuce also changed from borei peri ha'adamah, nevertheless bread exempts; in our novellae we wrote from this; see Magen Avraham 9.`,
    "3:_": `But per Taz Berakhot 51b and 52a—Bach wrote for amplification of Beit Shammai: even when birkat hamazon time arrives nevertheless bless on vine first; Rashi disputes what gemara says during meal did not come—implies if came during meal even Beit Hillel blesses and need not leave for after meal; Taz wrote for Rashi also Beit Hillel so, only Beit Shammai who hold hamotzi does not require cup necessarily, only mitzvah—therefore Beit Shammai bless during meal and drink, after meal bless, taste, leave for birkat hamazon since birkat hamazon time arrived, unlike Beit Hillel even during meal same, see gemara and understand; see Magen Avraham sign 2; again appears what Rashi wrote during meal not for them—not explained not during meal but rather if came during meal even Beit Shammai agree bless birkat hamazon; only without wine during meal Beit Shammai hold v'she'asa zeh shetiyah as Magen Avraham 2 in name Rashba; after meal amplification Beit Shammai per Bach even for Rashi; but from Rashi if he wants—not implied; that they do not argue whether v'she'asa shetiyah—nevertheless must wait about six hours lest cup for birkat hamazon arise siman 182 seif 1; appears cup of beer all drink before birkat hamazon siman 182 seif 2 hagahah; will be explained siman 182.`,
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
