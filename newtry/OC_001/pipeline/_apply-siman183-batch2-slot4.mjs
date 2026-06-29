#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "beur-hagra/part-001.txt": {
    "4:ה": `(s.k. 5) And if, etc.—so taste visible to all diners and they look at it; Tur and so Yerushalmi there; hand must be one tefach above table.`,
    "4:ו": `(s.k. 5) And therefore, etc.—Magen Avraham and Beit Meir etc. Rava etc. in end ch. Sukkah perhaps etc.; so Tosafot Shabbat s.v. above and Rosh Berakhot there.`,
    "5:_": `(s.k. 5) There is, etc.—as in tefillin ch. 3 Menachot and Magen Avraham.`,
    "6:א": `(s.k. 6) And diners, etc.—Tosafot there s.v. there is not.`,
    "6:ב": `Once he began, etc.—Rosh and Tur.`,
    "6:ג": `Not only, etc.—there and there; like between chapters Berakhot 51 and 52.`,
    "6:ד": `And if they passed, etc. but, etc.—Tosafot there.`,
    "6:ה": `Even, etc.—see siman 104 s.5-6.`,
    "7:א": `(s.k. 7) Correct, etc.—Taz; see siman 296 s.12.`,
    "7:ב": `And he precedes, etc. as above etc.—see there.`,
    "8:_": `(s.k. 8) For matter of, etc.—like Hallel on days they complete; all the more birkat hamazon explicit in Torah.`,
    "9:א": `(s.k. 9) In his house, etc.—see siman 211.`,
    "9:ב": `And also, etc.—there.`,
  },
  "biur-halacha/part-001.txt": {
    "6:_": `Even if blesser himself paused—see Mishna Berurah what we wrote in name R' Yehudah if waited to finish whole blessing returns to start even between blessing and blessing—from Magen Avraham; so Netivot in laws of blessings. Magen Avraham doubted perhaps birkat hamazon different from prayer where found feces—Tosafot Rosh siman 185; reject for many Acharonim stringent there and Ramban in Likkutim; remained on Magen Avraham in Biur Halacha siman 85 difficulty. Other side: siman 65 shema if waited between blessings does not return—here because delay each other all considered one blessing; also siman 188 s.10 returns to start Rosh reason three birkat hamazon blessings one—so I wrote Biur Halacha. Now after searching books: delay each other not settled—siman 194 Magen Avraham Ramban not clear; Even HaEzer Rif too do not delay each other; three blessings one only Rosh and R' Yehudah many poskim disagree siman 188 Biur Halacha—no proof for birkat hamazon if waited between returns; even mid-blessing forced finish—perhaps only start of that blessing; many disagree three as one; Even HaEzer perhaps no delay—then only return to start that blessing like siman 65 shema; requires study.`,
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": `Seif 4 and send to his wife she drink—Mishna Berurah wrote even if did not eat with them as Gemara daughter-in-law; wonder why proof from amoraic woman not explicit braita Bava Metzia 86 Sarah—angels knew Sarah in tent why asked to endear to husband R' Yosi: send cup of blessing—proves though Sarah did not eat sent cup—wonder on Magen Avraham; cannot check if commentators noticed; writing in village at hot bath; but precise Magen Avraham right—initially difficult R' Yosi send cup of blessing as answer why asked—finally hard since knew place send without asking where is Sarah; seems question falls on two matters: if asks generally where is person only if don't know place; if many guests one belongs to meal as guest sees wife not at meal may ask where is so-and-so metaphorically why not come to bread—even if know place question why not come to bread; place settle tannaitic difficulty knew in tent why asked—perhaps intent why not dine with us falls even knowing place; but Gemara does not answer so difficulty why not dine—must be intent where is Sarah; since knew why asked endear; R' Yosi: intent of question where is Sarah why not dine—not modesty—for without dining no cup of blessing; if dines earns cup—should not be stringent prevent blessing; not permitted such stringency; therefore send cup of blessing; question why not dine; Magen Avraham did not bring braita proof could imply opposite—brought daughter-in-law obligated send though not eating; must explain sugya differently: dispute if woman not dining better she come drink cup or they send—reward of steps; angels and Sarah disputed reward of steps like disputes upper and lower academy—angels held reward hers should come; asked Sarah your wife knew in tent intent metaphorically why not come drink cup; R' Yosi: question in language where is Sarah why not come drink; if question why not come truly to drink—intent send cup preferable not she come; requires study; seems correct; see Chiddushei HaRav on Eruvin siman 21 Biur on s.v. to endear see there.`,
  },
  "chatam-sofer/part-001.txt": {
    "1:_": `Magen Avraham s.k.6—Mishna Berurah: see my chiddushim Shabbat 93a.`,
    "2:_": `There s.k.7 explains in Sukkah—Mishna Berurah: see Yerushalmi ch. 1 Shekalim and Sukkah.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `(1) Remnants, etc.—meaning bread absorbed in cup; same wiping with cloth permitted Magen Avraham; good rinse even without bread remnants if not clean and clear because bring it near your table; Berakhot Maharam do not take cup in palms only remove them first; see s.k.7.`,
    "2:_": `(2) In these lands, etc.—Beit Yosef wrote practiced in his countries though wines not strong—Kabbalah secret and other reasons see there; also found our master Rav Liva in Netivot Olam 40 even these countries put little water in wine cup for wine brought curse to world and when wine joins water wine not ready for curse only blessing—so practice—end quote.`,
    "3:_": `(3) For blessing, etc.—living means fresh in Ashkenaz Perishko; R' Yehudah Weil remove from barrels immediately near blessing; if so send shopkeeper buy near blessing to be fresh Magen Avraham—effort.`,
    "4:_": `(4) Full on its banks, etc.—though pours little while holding; some do not fill much for verse and full; Gemara learned inherits two worlds; Lechem Chamudos 45 right is west south is day going south; Rashi world by day this world like night next world like day—end; Kolbo answers reward next world no verse needed—informs reward this world needed verse.`,
    "5:_": `(5) Whole, etc.—Kolbo 24 not defective not broken—end; implies even slight break not; Maharil forbid vessel damaged broken at lip; possibly defect little missing like fingernail width—we say beginning ch. These Defects no defect without missing; crack there invalid without missing; do not compare sacrifice defects—for Torah Chaim 72 need whole vessel like altar action see there; Maharil even broken base particular; Shirei Kenesset HaGedolah can stand without support unlike olah; all when possible; impossible may bless birkat hamazon on broken cup—not better than defective; Shirei Kenesset HaGedolah doubtful; seems no objection bless with cup and pitcher cover unlike netilat yadayim siman 159 need vessel made for reception; when possible should be particular.`,
    "6:_": `(6) Without yod, etc.—wonder on Levush truly wrote your hand without yod tefillin 134; seems Gemara expounds from vowels yod in shabatz and dalet in tzerei; if one hand yod would be segol and dalet shabatz; reason show affection receiving cup then hold one hand not appear burden.`,
    "7:_": `(7) Left under, etc.—Bach challenged Rema seems Beit Yosef same if holds right middle puts left under cup—end; my opinion Rema like Shelah received place on right palm fingers erect not those who surround cup with fingers—end; then Beit Yosef when puts left under right hand not under cup for right under cup; Magen Avraham on Shelah this his language; so Zohar Bereishit; not fully proven may say surround in grip—end; Beit Yaakov responsa 174 when holds cup sides as most people forbidden chatzitzah between wine and hand—cup on five fingers as Ari wrote secret Hei alin sacharin or hold vessel handles—proof Tosafot Sukkah 37 lulav; not proof—Sages enacted bless on cup so wine no chatzitzah; Bach Taz siman 291 Tosafot permit hold in pressure no substance unlike olah disputed Rema; Taz wondered Rema ruled like Shibolei HaLeket against Tur lenient; my opinion since essence not support is ibuya unresolved; found Shibolei HaLeket when not touching cup like double doubt lenient understandable; nevertheless not lenient unless need as Tosafot large cup; Mahari Luria birkat hamazon say with great joy say For conductor with melodies God grant us grace etc. then I will bless God end matter all hear etc. then Psalms God etc. and we will bless; take both hands place right cup on five fingers on backs literally eyes in cup entire birkat hamazon; if no cup place right on left against chest close eyes until finish blessings; also before placing cup in right say And speak to me this table before me.`,
    "8:_": `(8) Permitted more, etc.—not from name—for if so why permitted obligate; reason support no substance as Beit Yosef wrote.`,
    "9:_": `(9) Eyes in it, etc.—show permitted drink wine for mitzvah and bless Name with intent not get drunk Avudraham laws three meals; Levush see in cup like diners not into cup; therefore omitted what Rema wrote this language; therefore do not take narrow mouth cup called glance—end language requires study; Darkei Moshe another reason R' Elazar cannot swallow much together Rava swallowed for affection mitzvah—end; Maharsha Sukkah 49 explains swallowing means fine sips perhaps why Rema omitted R' Elazar in Hagahot; again Taz Magen Avraham challenged Rema permit glance when impossible other.`,
    "10:_": `(10) For his wife, etc.—so she be blessed; Pri Megadim; therefore custom spread somewhat not drink between man and wife; Magen Avraham end ch. three who ate implies even if not ate with them send her; see Rashi Vayera regarding Sarah.`,
    "11:_": `(11) Left to right, etc.—Levush Yom Tov even large cups Shabbat Chanukah Rosh Chodesh—end; Nachalat Tzvi learned even large cups need raise tefach unlike some say no raise since cannot put eyes; per what I wrote s.k.10 eyes on cup not contents—obvious no difference.`,
    "12:_": `(12) Once blesser began, etc.—meaning lenient from this blesser may speak until blesser begins; nevertheless wrote be stringent since R' Yehudah and R' Yehudah Weil stringent.`,
  },
  "eshel-avraham/part-001.txt": {
    "2:_": `In these countries—Beit Yosef wrote practiced in countries though wines not strong—Kabbalah secret; other reasons; so Netivot Olam R' Yehudah Liva z"l wine brought curse to world when wine joins water water not ready for curse only blessing see there.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) (Seif 1) Cup birkat hamazon needs rinsing etc.—so Berakhot 51a; ten things said in cup of blessing requires rinsing and washing; living and full; adornment and wrapping; take with both hands give to right; raise from ground tefach; put eyes in it; some say also send gift to household; R' Yochanan we have only four—rinsing washing living full—end; Gemara words and explanations Tur brought; Rambam mentioned only four of R' Yochanan; Tosafot count R' Yochanan only to diminish adornment and wrapping; giving right admits R' Yochanan—first asked may left assist right; presumably receiving both hands admits expound your hands holy; raising tefach from cup of salvation I lift; put eyes so not distract from blessing; Rav Nachman accustomed send wife; all these practiced and spreading cloth not bless bareheaded lacking only adornment Tur; Tosafot before us since amoraim did adornment and wrapping implies stringent on themselves—stringent cup of blessing; Bach Beit Yosef so Shulchan Aruch per Tosafot Tur; Mechaber note 1 in name Ramak Alfasi Zuta and Tur and Rashba—delay only; rest min hamuvchar; Tiferet Shmuel agreed in hagahah on Rosh see there; secret ten things see Zohar Pinchas 246 Ekev 273 Tikkunim 47 wine secret sod ten things yud of yesod see there; see below note 18.`,
    "2:_": `(2) Bach wrote for law seems since Tosafot Rosh testified practiced even spreading cloth; Tur and R' Yehudah—all fear Heaven careful at blessing wrap upper garment put hat not bless small cap even alone so—end; Shakh in Hagah Beit Yosef note 5 Or Torah note 9 Magen Avraham s.k.5 Acharonim note 16; so Acharonim.`,
    "3:_": `(3) Good adorn cup birkat hamazon kiddush havdalah six cups around Maaseh Rav netilat yadayim note 27 Piskei Teshuvot note 1; Tur wrote three explanations adornment: students sit around at blessing; add in blessing of Land wine or water see Pri Megadim note 3; place beautiful cups around for honor see there; Zohar there adorn with students see there; therefore not practice now adorn with cups rely Zohar students adornment—not always when BLH they sit around blesser.`,
    "4:_": `(4) There if clean—e.g. did not drink during meal now at blessing found clean need not rinse wash Beit Yosef Pri Megadim note 2; Zohar Tikkunim previous note gave secret reason rinse wash—implies specifically rinse wash in water even if clean see there.`,
    "5:_": `(5) There no cup remnants etc.—wine remnants bread absorbed Magen Avraham s.k.1 Rashi; Acharonim note 1; same wipe cloth fine Tur; Magen Avraham there Acharonim there; Acharonim wrote good rinse even without bread if not clean clear bring it near your table—end; already wrote per Zohar specifically rinse also in water see there; pressure no water may wipe cloth inside outside; Chida note 2 Piskei note 1.`,
    "6:_": `(6) (Seif 2) Then they dilute etc.—Rav Yehudah practiced in our country though wines not strong Kabbalah secret other reasons Magen Avraham s.k.2; Acharonim note 2 Zekan Aharon note 20; Shem HaMeforash Parashat Ekev when reach word you in verse and you ate and were satisfied and bless then dilute cup water etc. as known word you is Malchut called cup look at water when pour in cup intend water gematria tzadi nine yudin of four havayot 72 63 45 52—end; Maavar Yabok Shaarei Tefillah need put three drops one after another; Piskei Teshuvot note 1 Ruach Chaim note 1 Piskei note 2 Ben Ish Chai Shelach note 22; reason wine aspect Binah dinim aroused from it need sweeten with waters of kindness Binah name 63 has three yudin therefore three drops to sweeten.`,
    "7:_": `(7) There to inform praise of Land—to show all standing praise Eretz Yisrael whose wine strong need water though blesser abroad since not diluted until blessing of Land proven praise Eretz Yisrael comes to show Beit Yosef; R' Zalman note 3.`,
    "8:_": `(8) There Rama some say if wine not strong need not dilute; already wrote per Kabbalah must dilute therefore even not strong dilute little three drops as note 6 see there.`,
    "9:_": `(9) There Rama take from barrel for blessing—living Perishko; R' Yehudah Weil remove from barrel immediately near blessing; for us too send shopkeeper buy near blessing to be fresh Magen Avraham s.k.3; Acharonim note 3 wrote effort wait buy near blessing; seems buy beforehand in pitcher only not remove from pitcher until blessing time pour into cup for blessing; later saw Acharonim note 3 so.`,
    "10:_": `(10) There Rama cup of blessing fill—not like some adorn so not too full above cup adornment around Magen Avraham s.k.4; see Taz s.k.4; measure cup of blessing revi'it log receive five revi'ot of name Havayah Zohar Pinchas 246a.`,
    "11:_": `(11) There Rama full on all banks—seems not literal for must add water in blessing of Land; Chida note 3 if strong wine much water need full cup dilute some before birkat hamazon add in blessing of Land intend sweeten dinim—end; Rav Ben Ish Chai Shelach note 21 doubt some hold must start blessing living undiluted main per Ra'aya Mehemna Ekev 273 stam; other views in name some; if dilute before blessing lacks living for ten things; even much water must lack visibly at start since diluted in blessing of Land becomes full; nevertheless seems at least revi'it at start blessing—end.`,
    "12:_": `(12) There Rama full on banks—who blesses on full cup given inheritance without bounds as and full blessing of God sea and south inherit; some merit inherit two worlds this world and next Berakhot 51a.`,
  },
  "levushei-serad/part-001.txt": {
    "1:_": `Shulchan Aruch s.4 and do not support with left—see Minchat Yaakov klal 1 s.k.6.`,
    "2:_": `Magen Avraham s.k.3—Perishko meaning; per this explanation when sends take wine from shop for whole meal includes cup birkat hamazon—removed from barrel for blessing though drinking during meal not Perishko at birkat hamazon—we require only Perishko when remove from barrel for blessing; R' Yehudah Weil wrote near blessing must be Perishko at blessing time must send shopkeeper near blessing; language for us too Magen Avraham wrote though not obligated all ten things only four sign chameshah nevertheless living included practiced for us; requires study.`,
    "3:_": `s.k.5—place hat for all included wrapping in Gemara.`,
    "4:_": `Taz s.k.4—like other matters rinsing washing etc.`,
    "5:_": `There only language of Sages—meaning only cup; regarding you shall be holy difference if beverage secondary then presumably gives beverage for her honor; this only language of Sages therefore even if beverage secondary intent only on cup.`,
    "6:_": `There and Tur wrote perhaps distract as should be.`,
    "7:_": `Magen Avraham s.k.6 and Tur wrote as should be.`,
    "8:_": `There and I too forbidden therefore stringent as should be.`,
    "9:_": `Magen Avraham s.k.11 and therefore per Rema siman 65 as should be.`,
    "10:_": `Taz s.k.6 and see siman 193 s.1 as should be.`,
    "11:_": `Shulchan Aruch s.12 forbidden bless—see siman 131.`,
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
