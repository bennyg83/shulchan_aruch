#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "magen-avraham/part-001.txt": {
    "2:ב": `For a blessing—living means Perishko in Ashkenaz; R' Yehudah Weil wrote remove from barrel immediately near blessing; if so for us too send shopkeeper buy near blessing to be living.`,
    "2:ג": `Full on its banks—not like R' Yehudah Meiril adornment that not so full held high in cup crown around it.`,
    "3:_": `Whole cup—even if base below broken invalid unless pressed need (Maharil); kabbalists wrote require all ten things except wrapping abroad; Bach wrote God-fearing does not bless in turban only places hat on head and wraps in upper garment.`,
    "4:א": `Under the right—Shelah in Beit Yosef but to assist with left under right hand permitted for we hold assisting has no substance etc.; when not touching cup only right hand if placed left under to assist permitted; clear per Rema words not like Bach; Bach seems Shelah permits only under cup—Magen Avraham on Shelah this his language; proof for Shelah from Shabbat 93 see Taz s.k.3; responsa Chakham Tzvi 82 from problem left assist has substance at least rabbinically did not want stringency lest invalidate sacrifice if received right left assists see there; in large cups or Rosh Chodesh Tevet Shabbat long birkat hamazon miracles al hanissim v'al haniflaot Chanukah or weddings extend birkat hamazon—end quote; Magen Avraham took one without need as above certainly forbidden therefore stringent; Shelah kabbalists place cup on right palm fingers erect around cup as Zohar Bereishit; not fully proven may surround in grip; do not take cup in palms only remove first (Hagahot Berakhot Maharil).`,
    "4:ב": `Therefore do not take etc.—Darkei Moshe another reason R' Elazar Prague because Rava cup of blessing swallowed swallow when mouth narrow cannot swallow much at once therefore siman 182 s.15; Maharsha Sukkah other explanation see there; on Rema reason difficult whence eyes in wine perhaps enough eyes in cup so not lose mindfulness from it—as Gemara laws.`,
    "4:ג": `For his wife—even if did not eat with them as Gemara regarding Iltai.`,
    "5:_": `Left-handed—requires study; Bach siman 491 plain R' Yehudah we follow world's right since lulav right is rabbinic all the more cup of blessing mainly rabbinic should follow world's right; truly in Shelah before us nothing written in Beit Yosef and regarding lulav ruled take world's right see there; perhaps another posek so in Beit Yosef; nevertheless appears practice so as Rema regarding lulav.`,
    "6:א": `Blesser should not speak—implies diners may speak until blesser begins (Beit Yosef Bach); nevertheless appears stringent since Tur and R' Yehudah Weil stringent.`,
    "6:ב": `They fulfilled—like hearing nine tekios in nine hours of day fulfilled (Tosafot Rosh); if so per what wrote siman 65 if interruption under duress must return to start; possibly Beit Yosef lenient as wrote siman 185 regarding feces and wrote siman 122 188; appears if spoke intentionally returns to start as siman 114 s.7 and Tosafot daf 46b end s.v. where does he return etc. for did not eat meanwhile—implies if ate returns to start; nevertheless appears error in Tosafot should say did not speak see there and wrote siman 194 in name Ramban and siman 200.`,
    "7:א": `Quietly with blesser—so they bless together not each alone only at end blessing; Bach wrote better listen; wrote siman 193 s.1; Tashbetz wrote must hear until Who sustains which is zimmun blessing and siman 200—so main.`,
    "7:ב": `Generous eye—one who hates ill-gotten gain and does kindness with his money (Rashi there).`,
  },
  "mechaber/part-001.txt": {
    "1:main": `How one who blesses should conduct himself with the cup of birkat hamazon. In it are 12 seifim. The cup of blessing requires rinsing on the inside and washing on the outside. If it is clean and has no cup remnants, he need not.`,
    "2:main": `He puts wine into it undiluted until reaching the Blessing of the Land, and then he dilutes it to show praise of the Land. {Rama: Some say if wine is not strong need not dilute [Tur]; so practiced in these lands. Take from barrel for purpose of blessing [Tur in name Rashi]. For us lacking much wine need only pour from jug guarding wine for blessing; barrel not precise; so in these countries. Cup of blessing fill so full on all its banks.}`,
    "3:main": `He must seek a whole cup.`,
    "4:main": `He receives it with both hands; when he begins to bless he takes it in his right hand and does not assist with his left. {Rama: Specifically left should not touch cup; if left under right to assist, permitted [Beit Yosef in name Shibolei HaLeket].} He raises it a tefach from the ground if sitting on ground; if reclining at table raises a tefach above table; puts eyes in it so as not to lose concentration. {Rama: Therefore do not take narrow-mouthed cup called glance for blessing.} He sends to his wife that she drink from it.`,
    "5:main": `Some say if blesser is left-handed he holds cup in his right hand, which is everyone's left.`,
    "6:main": `From when cup given to bless he should not speak; diners should not speak from when blesser begins—not only while blessing when they must hear and understand, but even between blessing and blessing. If they transgressed and spoke between blessings when blesser was silent briefly, they fulfilled. {Rama: Even if blesser himself spoke.} If they spoke while he was blessing, they did not fulfill.`,
    "7:main": `Proper that each diner say quietly with blesser every blessing even conclusions. {Rama: Finish slightly before blesser to answer amen as above siman 59. Give cup of blessing only to generous eye [Gemara chapter Elu Ne'emarin].}`,
    "8:main": `Regarding interrupting birkat hamazon for fear or honor, some say law like tefillah.`,
    "9:main": `Must sit when blessing—whether walking in house when ate or standing or reclining, when reaches blessing must sit to concentrate better and not recline which is haughtiness; sit with awe. {Rama: Appears not only blesser but all diners should not sit lightly but with awe; if not, even blessed walking b'dieved fulfilled [Rambam ch. 4].}`,
    "10:main": `Some say even al hamichya must be said seated.`,
    "11:main": `If walking on road and eating need not sit to bless for mind not settled on him.`,
    "12:main": `Forbidden to bless while occupied with his work.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) Requires rinsing etc.—same if wiped with cloth until clean, permitted.`,
    "1:ב": `(2) Cup remnants—wine remnants bread absorbed in it.`,
    "1:ג": `(3) Need not—good to rinse even without bread remnants if not clean and clear [Acharonim].`,
    "2:א": `(4) Undiluted—meaning as is without dilution even if not fit to drink so as it is.`,
    "2:ב": `(5) Blessing of the Land—meaning start of Blessing of the Land.`,
    "2:ג": `(6) Praise of the Land—wine strong needing dilution with water; see Beit Yosef wrote in his country practiced dilute little water even when wines not strong see there reason.`,
    "2:ד": `(7) Need not dilute—because fit to drink as is.`,
    "2:ה": `(8) For blessing—take out near blessing from barrel for blessing not earlier and wait in vessel—only optimal mitzvah.`,
    "2:ו": `(9) Full etc.—even if accustomed pour little to ground; some do not fill much for this reason nevertheless place full on it; know full only l'chatchila not me'akev if wine has revi'it measure as wrote siman 271 Mishna Berurah s.k.182 see there.`,
    "3:א": `(10) Seek etc.—from language implies only l'chatchila no disqualification.`,
    "3:ב": `(11) Whole—not broken body nor defective lip even slight missing [crack stringent l'chatchila even without missing]; if body whole only base broken also stringent even if can stand on base if no other lenient; covering vessels even not made for reception not stringent if no other [Acharonim]. Magen Avraham in name Bach God-fearing does not bless in turban only hat on head; some also wrap upper garment—all included in wrapping of Gemara at cup of blessing; so today Israel at birkat hamazon place hat even individual without cup.`,
    "4:א": `(12) Receives with both hands etc.—Taz wrote reason show affection receiving cup then hold one hand not appear burden; right hand is main and important.`,
    "4:ב": `(13) Left should not touch etc.—even if wants hold cup in right middle and left hold from below.`,
    "4:ג": `(14) To assist—cup on right palm left under to support right hand.`,
    "4:ד": `(15) Permitted—since not touching cup; Acharonim wrote stringent unless need. Shelah per kabbalah place cup on right palm fingers erect around; do not take in palms only remove first.`,
    "4:ה": `(16) Raises etc.—so cup visible to all diners they look [Tur]; Gemara links verse cup of salvations I will raise etc.`,
    "4:ו": `(17) Not lose concentration—from blessing.`,
    "4:ז": `(18) Therefore do not take etc.—cannot look inside; Acharonim challenged intent Gemara eyes in cup not inside; therefore not stringent if cannot obtain other vessel easily.`,
    "4:ח": `(19) Sends to wife etc.—through cup of blessing woman blessed even if woman did not eat with them; if more guests give them taste from cup see below siman 190 s.1 siman 271 s.14; if guest reclines with host and blessed on cup give host drink from cup of blessing so host blessed.`,
    "10:_": `(35) Also al hamichya—see Biur HaGra tied this law to below siman 184 s.3 and Rambam who holds so follows his view there; therefore on five grains all agree final blessing specifically seated.`,
    "11:_": `(36) On him—if sat because eyes hurt delay of way cannot concentrate well only walk and bless—Chayei Adam all only when eating was way of walking as Mechaber walking on road eating; if eating was seated must bless seated too.`,
    "12:_": `(37) Forbidden to bless—all blessings; see below siman 191 Mishna Berurah explained well.`,
  },
};

const base = "output/siman_183";
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
