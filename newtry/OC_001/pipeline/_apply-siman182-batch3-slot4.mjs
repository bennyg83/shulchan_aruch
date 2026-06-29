#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "magen-avraham/part-001.txt": {
    "7:_": `At time of pressure—meaning he has no other (Rashbam)—i.e. not that better bless without cup; Tur wrote some put bread crumbs in defective wine to fix—foolish custom—end quote; Peri Megadim did not explain; some particular when crumbs inside—possibly hold must be full of wine specifically; Tur does not imply prohibition in matter.`,
  },
  "mechaber/part-001.txt": {
    "1:main": `Laws of the cup for birkat hamazon and that it not be defective. It has seven seifim: Some say birkat hamazon requires a cup even when alone, and one must wait and not eat if he has no cup to bless on when he anticipates it is possible he will have one even if must pass time of one eating period. Per this if two eat together each needs cup for birkat hamazon. Some say only with three; some say no cup at all even with three: {Rama: nevertheless mitzvah min hamuvchar to bless on cup (Ran ch. Arvei Pesachim).}`,
    "2:main": `Cup for birkat hamazon is only wine and not other beverages even if established meal on them. If wine not available in that place and beer or other drinks are chamar medinah one blesses on them except water: {Rama: what is practiced in these lands to bless on beer—do not protest for some say no cup required at all; also primary chamar medinah is beer and they establish meal on it; even though wine in city not called available for this being expensive and impossible buy wine every meal; nevertheless mitzvah min hamuvchar on wine (Darkhei Moshe). Some meticulous when bless alone on wine not hold cup in hand but place on table before them—practice proper per Kabbalah (Beit Yosef).}`,
    "6:main": `May fix defective cup by adding little wine; even by adding water it is not fixed.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) Requires cup—for most blessings Chazal enacted arrange on cup because way of honor and praise fitting before God to arrange His praise and blessing on cup as written I will lift cup of salvation and call on name of God (Levush).`,
    "1:ב": `(2) And shall not eat, etc.—like havdalah siman 296 if expects cup tomorrow cancels night meal and waits for cup; see Magen Avraham disagrees for birkat hamazon cup need not prevent eating unlike havdalah; see there and Gra in Biur seems agrees with Magen Avraham.`,
    "1:ג": `(3) If two eat, etc.—for three or more who invite together one blesses on cup and exempts all like zimmun; but with two mitzvah to divide and one does not exempt other—each needs own cup.`,
    "1:ד": `(4) Min hamuvchar, etc.—even per view no cup required at all meaning no obligation but all agree mitzvah min hamuvchar bless on cup if has wine at home; Mechaber did not decide between views; Maharshal and Bach stringent birkat hamazon requires cup by law; world custom lenient as third view not chase cup unless has wine or chamar medinah beverages at home—then certainly min hamuvchar for all; specifically in zimmun of three; for individual many Acharonim completely lenient; see below end seif 2 in Rama.`,
    "2:א": `(5) And not from other beverages—like kiddush and havdalah not on other beverages all agree where not chamar medinah.`,
    "2:ב": `(6) Even established meal—meaning during meal relied on beverage and main drinking from them—even so not considered to bless birkat hamazon on them since city people not accustomed drink constantly in this place.`,
    "2:ג": `(7) No wine available—even if wine in city but not much available; therefore main drinking of city is beer and other beverages—lenient bless birkat hamazon on beer; see Bach though not obligated seek wine from shop if has wine at home must bless on wine.`,
    "2:ד": `(8) In that place—meaning whole city though other towns in country have much wine.`,
    "2:ה": `(9) Bless on them—if two beverage types e.g. beer and honey water and one preferred—bless on preferred; especially if before birkat hamazon drank from it for preference—proper bless on it not other lest your table full and master's empty; only if that type chamar medinah accustomed there; if drink only occasionally though inherently more important—not chamar medinah like apple pomegranate wine.`,
    "2:ו": `(10) Except water—even if majority drinking water do not bless; same kvass and beer water though masses drink—not considered more than water; seems possible lenient in pressure when masses drink them; see siman 296 Mishna Berurah s.k.10 what we wrote there.`,
    "2:ז": `(11) What is practiced, etc.—meaning practice bless on beer though wine available in city.`,
    "2:ח": `(12) Establish meal on it—even if not considered chamar medinah because wine also available; nevertheless some say if established meal initially on other beverages considers them and blesses birkat hamazon though wine exists; Mechaber stam initially like poskim establishment not effective; nevertheless may combine this view to lenient since wine expensive hard obtain.`,
    "2:ט": `(13) Impossible, etc.—but for kiddush and havdalah seems Rama agrees must seek wine since available in city though expensive.`,
    "2:י": `(14) Buy wine every meal—but if has wine at home must bless on it (Bach); if little wine at home only for kiddush havdalah need not bless on it for kiddush havdalah all require cup stricter than birkat hamazon.`,
    "2:כ": `(15) Not to hold—meticulous who bless on cup satisfy first opinion seif 1 even alone requires cup; only from Zohar individual should not bless on cup—therefore bless and do not hold in hand—satisfies all for even those who say requires cup cup before him on table holding only min hamuvchar per their view.`,
    "2:ל": `(16) Correct this practice, etc.—not hold in hands as above; today world custom does not bless on cup at all when alone.`,
    "3:א": `(17) Its defect—unfit further bless on it birkat hamazon; same kiddush havdalah as below siman 271 s.10 siman 296 s.1; even tasted only something.`,
    "3:ב": `(18) Into his hand—and same if tasted with finger—specifically if drank from it with mouth it is defective.`,
    "3:ג": `(19) Nothing in this—when poured only little so still full on it or afterward poured into small cup from it and full or threw bread crumb to raise wine so cup full—not required entirely full wine for revi'it suffices cup not lacking as below.`,
    "3:ד": `(20) Becomes defective—meaning all in this barrel even if afterward poured to other vessels.`,
    "3:ה": `(21) Need not be particular—some stringent even on this; should heed them l'chatchila not let drink even from spigot of large barrel.`,
    "3:ו": `(22) Invalid to mix—apparently why not say first in first out nullified like seif 5; possible unmixed wine cannot drink without dilution therefore not nullified.`,
    "4:א": `(23) If they were, etc.—sometimes give each diner cup when blesser blesses each drinks his cup; if theirs defective blesser gives from his cup little to each before drinking fixing their defect all drink from non-defective cup.`,
    "4:ב": `(24) From cup of blessing—if only blesser holds cup in hand though diners necessarily taste defective cup after he drank—we do not care since initially cup whole and all considered one.`,
    "4:ג": `(25) Some say, etc.—hold not particular about defective cup except for blesser not diners.`,
    "4:ד": `(26) See below, etc.—there Mechaber stam like first view.`,
    "5:א": `(27) Valid—specifically b'dieved; l'chatchila forbidden; therefore practice add initially little from pitcher fixes as seif 6 then pour to pitcher then wine valid take out for blessing.`,
    "5:ב": `(28) First in first out nullified—provided wine in pitcher more than wine in cup.`,
    "6:א": `(29) May fix—defective matter not true invalidation but mere defect because drank little; when returns and adds becomes fixed.`,
    "6:ב": `(30) Water—specifically strong wine not spoiled by dilution; not specifically water—same other beverages (Acharonim).`,
    "6:ג": `(31) Not fixed—water themselves not defective that drank from them otherwise cannot fix; some seif 3 hold water also defective by drinking.`,
    "7:_": `(32) At time of pressure—no other cup nothing to fix this cup; teaches not better bless without cup entirely; defective matter only l'chatchila if can be careful not for delay; Acharonim when must bless on defective cup if has small cup holding revi'it pour from large into it thereby somewhat fixes defect; some fix defect with bread crumb—Tur rejected custom ineffective; if not defective only not full and contents have revi'it measure all agree filling helps even via bread specifically one piece—for many there is repulsiveness bring it near etc.; on contrary must rinse cup from crumbs as below siman 183 s.1 (Acharonim).`,
  },
  "netiv-chayim/part-001.txt": {
    "1:_": `(Magen Avraham s.k.1) And question for we say Pesachim etc.—Mishna Berurah: proof not forced—for per answer preferred mitzvah in its time and wine mitzvah min hamuvchar as written remember it with wine—otherwise still difficult leave until tomorrow honor day and sanctify bread.`,
    "2:_": `(Magen Avraham s.k.5) And possible in Beit Meir relies other reason as should be—Mishna Berurah: this is not so for in resolution Rav Asi and Issi Rosh wrote halacha like Sages and in these variations other reason not relevant; seems from that he brought and Sages in Yehuda after several mishnayot interrupted dispute because taught stam mishnah place where practiced regarding halacha pesikta—all those mishnayot place practiced to light and other halachot pesiktot as explained Bava Kama 102; therefore Rosh inferred stam mishnah beginning chapter preferable to words of Sages eat in their places—we hold halacha like Sages.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `To bless—Taz language somewhat strained in what wrote preferred preferable—for we hold below siman 211 s.1 seven species preferable; but since does not want drink both no precedence and preferred preferable; so Bach; also what implies beer without substance bless shehakol—is seven species explained below siman 211; requires study; Magen Avraham there letter 8; and if not there explained several beer types; nevertheless specifically when honey water chamar medinah accustomed; but brought from distance—beer chamar medinah preferable; see here and somewhat Bach see there; again saw Magen Avraham 2 so.`,
    "2:_": `And there is—Taz siman 183 s.4 cup of blessing must hold in right hand etc.; alone places on table; Mechaber brought Magen Avraham letter 16 see there; see what I wrote in 183:3 from this.`,
    "3:_": `Into—Taz Magen Avraham 7; Bach wrote for havdalah (Berakhot 22a) this is defective even if pours to another cup from it see there—meaning even though says only—for R' Chananel but tanna of mishnah there Beit Shammai requires cup—therefore drinks with hands and leaves for birkat hamazon and havdalah defective; nevertheless may refer when no small cup for havdalah defective but when afterward pours to small cup fixed thereby.`,
  },
};

const base = "output/siman_182";
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
