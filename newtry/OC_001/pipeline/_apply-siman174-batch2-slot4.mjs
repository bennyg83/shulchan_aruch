#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "biur-halacha/part-001.txt": {
    "2:_": `Wine exempts all kinds of liquids—and therefore one drinking coffee after wine need not bless on it; and even sugar taken in mouth to sweeten drink need not bless, as subordinate to coffee and coffee to wine [Teshuvat Chavot Yair OC siman 47]; see Chayyei Adam general 55 Nishmat Adam: exempts only if drank first then took sugar; if enjoyed sugar first it is not subordinate—better to take little sugar first and bless intending to exempt liquids, see there. Know wine exempts all liquids even without intent at blessing to exempt them; stam they are subordinate. Chayyei Adam and Nishmat Adam: only when drinking wine regularly, not one or two cups without intent to continue; kiddush drinking only full mouthful does not exempt even if liquids before him at blessing. Although Mishna Berurah we wrote unlike his words because many Acharonim dispute, nevertheless do not be lenient except when drank at least full mouthful—important measure for kiddush per siman 271 seif 14 Biur Halachah; b'dieved measures combine only for kiddush, not to make all later liquids subordinate. From Darkhei Chaim in MB re participants who did not taste cup—he holds even any taste of wine suffices; for law requires study; l'chatchila drink full mouthful [else siman 271 seif 14]; if not, ask one who did not taste from cup to exempt, or bless on little sugar to exempt liquids.`,
    "4:ב": `Wine of havdalah—proves regarding kiddush he holds exempt in all cases; although several poskim hold per Tosafot same for kiddush wine specifically after netilat yadayim, Mechaber did not decide thus; regarding havdalah itself we need not be stringent except l'chatchila.`,
    "6:ב": `(2) And even if he did not have etc.—see Mishna Berurah regarding other liquids drunk before meal—we wrote to bless final blessing per many Acharonim: Magen Avraham, Birkei Yosef, Gra, Chayyei Adam, Magen Giborim; although Acharonim sided with Tur and Taz that other liquids equal wine because they arouse appetite for food [except water—Acharonim agree with aforementioned], we need not heed them since even wine itself which Mechaber exempts per Rosh is unclear as we wrote; especially per Gra in Ketzot haChoshen most poskim dispute Rosh; similarly Nishmat Adam general 41; Gra Chasam Sofer challenged Rosh from Tosefta in siman 177 Magen Avraham s.k. 6—his ruling follows poskim disputing Rosh who require final blessing even on wine before meal. Therefore we exempt with wine which certainly draws appetite per Rosh, not other liquids; even if did not bless until after hamotzi he blesses afterward [Chayyei Adam]. Burned wine certainly equals wine; if drinks liquor before netilat yadayim to arouse appetite no final blessing even if drank revi'it, hamotzi exempts; Chayyei Adam: even water if very thirsty and drinks before netilat yadayim to become hungry for meal—no final blessing as connected to meal. All above re liquids before meal when not drinking during meal; if drinks during meal Magen Avraham s.k. 173 requires study re final blessing—there he wrote better not drink before netilat yadayim more than revi'it, see there.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "5:_": `(5) [Levush] and he does not bless etc.—appears same law: no final blessing before meal from doubt, unless one holds blessings resembling three on wine are d'oraisa—requires study; Bach implies leniency, so Taz and Magen Avraham siman 299; but when intends not to remove definitely needs final blessing before meal; what Mechaber wrote havdalah on table—Taz explained below means unlike when separating in another room.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "3:_": `(3) There and bread does not exempt it—implies even if he had intent at hamotzi blessing he is not exempt and must bless on it; so Mishna Berurah sign 1; see Tzalach Berakhot 41b: per Me'or author if wine before him when he blessed hamotzi need not bless on that wine during meal, see there; Peta' Einayim sign 2; we follow gemara and Shulchan Aruch plainly that even with intent at hamotzi not exempt; custom to bless on wine during meal even if wine on table at hamotzi—as we wrote siman 172 sign 2, where custom exists we are not concerned for doubt in blessings, see there.`,
    "4:_": `(4) [seif 2] Wine exempts etc.—reason other species are subordinate to it. Orach Tzedek sign 2. Taz s.k. 2 explains in Mordekhai chapter 50: only if other liquids before him when he blessed on wine then wine exempts them, end quote; Mor uKetziah in Darkhei Moshe sign 6 cites Mordekhai and concludes reason because nowadays we do not fix on wine; in name of R' Eliezer of Prague: per Tur our sitting counts as their reclining—no distinction our time from theirs; see siman 213 how we rule. Meaning Tur and Shulchan Aruch hold our sitting counts as fixed like their reclining for one exempting another; likewise fixed for exempting other liquids even if not before him at wine blessing, unlike Mordekhai, see there; so Derekh Moshe on Taz not precise, we do not rule like Mordekhai; Shaarei Teshuvah sign 1; Acharonim sign 8; Nehar Shalom sign 2; Mishnat Zahav sign 2: per Tur siman 213 nowadays also fixed drinking—like meal; even if liquids not before him when blessed on wine no blessing on liquids first or last even outside meal; if possible better satisfy all—have them before him at blessing or intend at wine blessing to exempt.`,
  },
  "levushei-serad/part-001.txt": {
    "6:_": `Magen Avraham s.k. 5 when he drinks for thirst. Magen Avraham did not write kiddush wine because all agree exempt since kiddush connected to meal—kiddush only where meal; only when drinks for thirst before netilat yadayim is there dispute.`,
    "8:_": `s.k. 7—that is, to explain language they extend to him much, implying many together; therefore wrote that is not intent; also teaches even if given before he drank first, as Magen Avraham siman 179 s.k. 6; see Taz siman 8 s.k. 10.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "2:א": `(2) (s.k. 2) He leaves it etc.—in teshuvat Rashba etc. we learned Berakhot chapter These matters: wine comes after meal (after meal not precise as Taz wrote); if only one item that cup—Beit Shammai bless on wine then on meal; Beit Hillel bless on meal then wine; conclusion daf 42: Beit Shammai reason they hold birkat hamazon does not require cup therefore drink before birkat hamazon; Beit Hillel reason not explained in Shas; one who holds hamotzi requires cup—Beit Hillel holds specifically bless meal then wine so he has cup for birkat hamazon; Beit Shammai may bless wine first even without cup for birkat hamazon since they hold no cup required; Beit Hillel if no cup required—Beit Hillel statement means permitted but if he wants does like Beit Shammai; therefore Beit Shammai must bless wine first means obligated.`,
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
