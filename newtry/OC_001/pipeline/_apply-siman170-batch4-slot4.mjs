#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "machatzit-hashekel/part-001.txt": {
    "3:ג": `(ג) And in some texts this gloss written below I will eat—meaning after what Rabbeinu Yehudah wrote; but to eat takes even outside etc.; on this Rama emended and if did not rub does not take; intent of these texts to remove Levush difficulty still suspicion remains; therefore Rama wrote regarding eating there no suspicion; and why takes even outside—need take only where obligated by law; therefore if did not rub need not take; but for drinking where suspicion exists admits Magen Avraham even if did not rub must take inside as Levush and so Magen Avraham; this text of Rama holds even for drinking no washing where did not rub; and in our text and so Agudah—for reason Magen Avraham wrote above in such case no suspicion.`,
    "5:ב": `(ב) And possible in urination always takes inside—meaning even if wants to eat nevertheless suspicion exists since no inattentiveness; and why Rabbeinu Yehudah reversed Gemara language—not mistaken for also in urination distinction between drinking and eating; and truly in urination even for eating must take inside; and although per our Gemara text do not take from outside but enter sit in place and take two hands—implies main suspicion law in baraita refers to urination requiring two hands washing; for urination takes one hand after rubbing; since main refers to urination and above they said R' Chisda we only said for drinking but for eating takes outside—implies distinction in urination between drinking and eating; so challenged in Chemed Moshe; however Rif and Rosh did not quote takes two hands—certainly not in their text.`,
    "6:ג": `(ג) And siman 212 what Shelah proved—even though we hold below siman 212 primary exempts secondary even secondary bread exempts primary need not hamotzi; if so those sitting to drink and custom eat little bread to sweeten drink need not bless on bread for it is secondary to beverage—all the more if intent explicitly eat bread to sweeten; this law brought Magen Avraham in name Shelah below siman 212; however Shelah added proof from Terumat HaDeshen cited and his language—even beverages which are primary exempt bread secondary from hamotzi—nevertheless must wash hands for that bread; and wherever bread exempted by secondary nevertheless need washing—for here wants to drink not eat i.e. removed hands from eating and finished meal; if wants eat must bless on bread; but since finished meal and must bless on wine when drinks—for we hold wine within meal does not exempt wine after meal—therefore need not bless on little bread eaten during drinking for that bread secondary to beverage and wine blessing exempts it; even so must wash because of little bread—for regarding this being secondary does not help—end quote he extended.`,
    "6:ה": `(ה) It is in Tosafot Bekhorot—they say there R' Abba son of Rabbah bar bar Chanah drinks water before many (due to danger) and do not drink water before many; Tosafot wrote Kuntres explanation way of Torah scholars modest in eating and drinking; what they say Pesachim 86 Rava son of R' Nachman drank and did not turn face—reason bride turns face when eating for she ashamed to eat; but man need not turn face—implies there way to drink before many without turning face is during meal like bride; in derech eretz they say before many turn face aside and drink water—appears mentions water for those not accustomed all drink water only when thirsty; but other things accustomed drink together—end quote Tosafot; what Tosafot wrote and in five matters of derech eretz requires study their intent if precise that mentions water to exclude other beverages—for this comes to prove also from Gemara (strained to say Gemara mentions water because discussing drinking water); rather say in my opinion intent to challenge their answer that within meal need not turn—for in derech eretz they say before many turn face etc.—appears.`,
    "6:ו": `(ו) Refers one sitting within meal—for otherwise why turn face; can go to side and should say plainly do not drink water before many as in Gemara; nevertheless refers within meal sitting at table and cannot otherwise except turning face; and Tosafot in Pesachim not precise within meal from wrote did not turn face and precise like bride; can say better proof like bride than language turning face; or they asked why turn face for even small matter did not go aside only did not turn—proves even within meal must turn; and answer can distinguish specifically mentions water not other beverages; that Pesachim was other beverages.`,
    "6:ח": `(ח) And guest even if husband with her forbidden—for prohibition woman drinking wine arouses desire for immorality; therefore if husband with her permitted for she has bread in basket; since we hold guest forbidden intercourse as below siman 200 seif 13—she has no bread in basket; if they secluded house guest permitted intercourse and as there permitted wine see Magen Avraham note 27; if accustomed drink wine before husband—meaning accustomed before husband to drink two cups—they give her one cup not before husband; but if not accustomed drink before husband only one cup—then not before husband do not give wine at all—so Even HaEzer; per Rif there if accustomed before husband drink much wine—they give much also not before husband see Beit Shmuel; regarding nursing for wine see Choshen Mishpat and Beit Shmuel law not before husband.`,
    "14:_": `(14) From head etc.—and on Shabbat etc.; see siman 274 for although we hold above siman 167 not cut slice of cutter more than egg-size for appears glutton; explained siman 274 (and so above siman 166) on Shabbat mitzvah cut large slice sufficing whole meal due to honoring mitzvah; same here can say mitzvah start from head on Shabbat due to honoring mitzvah.`,
    "21:_": `(21) And gives to fellow lest from shame etc.; see Taz in name testament R' Eliezer haGadol.`,
  },
  "magen-avraham/part-001.txt": {
    "1:ג": `(ג) Does not take at all—Levush wrote specifically for eating but for drinking must take lest suspect he rubbed and did not take; and it appears if so even if went outside and did not urinate should need take due to suspicion; rather meaning where someone sees him rub and not see take and suspect—unlike when did not rub no concern for this; so Bach; in some texts gloss written below I will eat—not so; and so Agudah—for refers also drinking.`,
    "1:ד": `(ד) And urinated—nevertheless need not bless hamotzi as Rama wrote siman 178.`,
    "1:ה": `(ה) Takes two hands—for drinking takes inside as above so in Gemara and Tur and Rambam; I did not know why Rabbeinu Yehudah reversed their language; possible he holds in urination always takes inside for no inattentiveness; and so in Tur HaBayit.`,
    "13:ב": `(ב) Due to interest—meaning appears like interest Yoreh De'ah siman 162 seif 1 in gloss. Regarding things that cause forgetfulness such as olives etc.—only unintentionally; but food with intent as known adds memory for it fixes it; must be very careful not eat heart of animal bird fish; Arizal ate desert herbs not planted by person to fulfill and you shall eat grass of field (writings).`,
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
