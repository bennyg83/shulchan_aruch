#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "2:א": `If no wine available, etc.—beer and honey water; honey water preferable for birkat hamazon though beer is one of seven species (Bach).`,
    "2:ב": `What is practiced to bless on beer, etc.; some say one without cup of beer that is chamar medinah may bless on inferior beverages such as kvass or beer if most of their drinking is this beverage; nevertheless forbidden to teach so before multitude lest they habituate even not time of pressure (Maharshal responsa siman 23); better bless on damaged wine cup than other beverages not damaged as siman 296 for havdalah.`,
    "5:_": `Because first in first out nullified—implies opposite if poured from vessel to damaged cup all damaged (Maharshal); seems to me satisfy all views pour to damaged cup then pour entire cup to pitcher then from pitcher to cup—then either first nullified then damaged cup nullified in vessel or pitcher, or upper prevails then fixed from start when poured from pitcher to damaged cup as above.`,
    "6:_": `Can fix even with water; Yerushalmi implies on contrary better fix with water than little wine see there; some put crumbs of bread—no support or proof; I found support from verse threshing floor and winepress meaning threshing floor fixes winepress (Mitzpeh).`,
  },
  "baer-heitev/part-001.txt": {
    "1:_": `Alone—Ari z"l wrote individual should not bless on cup; see Yad Ephraim.`,
    "2:א": `Chamar medinah—Maharshal wrote in time of pressure may bless even on kvass or beer; do not teach before multitude lest belittle even not time of pressure; Taz says disgrace to blessing should not do among Israel; also custom among masses if drink beer during meal then after eating set themselves to drink honey water—they bless birkat hamazon on beer cup saying chamar medinah—also disgrace to mitzvah included in do not let your table be full while master's empty; so Bach and Shelah; Magen Avraham seems these only in countries accustomed to honey water as chamar medinah but where drink only occasionally not chamar medinah see there.`,
    "2:ב": `Cannot buy wine—but if has wine at home must bless on it Bach; Magen Avraham seems if little wine at home for kiddush need not bless on it for kiddush all require cup and stricter than birkat hamazon.`,
    "2:ג": `Per Kabbalah—as I wrote in name Ari no cup needed at all; see Yad Ephraim.`,
    "3:א": `Defect—same for kiddush and havdalah cups; but if wants drink though defective must bless—simple.`,
    "3:ב": `Into his hand—in manner still full on it for all require full.`,
    "3:ג": `Need not be particular—should be careful l'chatchila; so custom Magen Avraham.`,
    "4:_": `Into them—before blesser drinks all drink from cup not defective; but practice blesser drinks then pours to diners' defective cups—no reason; Taz.`,
    "5:_": `If returned—specifically b'dieved; l'chatchila forbidden; therefore practice add little from pitcher fixes then pour to pitcher then take from pitcher for blessing as siman 183; see Magen Avraham Ateret Zekenim Shakh Minhag and Sefer Halikhot Eliyahu daf 74.`,
    "7:_": `Pressure—better bless on damaged wine than other beverages not defective Ateret Zekenim; some put bread crumbs in cup say fixed thereby—Tur wrote foolish custom; Ramam and Bach cited verse threshing floor and winepress threshing floor fills winepress.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Pesachim 105 per Tosafot there and Tur.`,
    "1:ב": `See Kol Bo.`,
    "1:ג": `Midrash Ruth HaNe'elam.`,
    "1:ד": `Rif and Rambam ch. 7.`,
    "2:א": `Pesachim 106.`,
    "2:ב": `And Rosh there.`,
    "3:א": `Pesachim 107.`,
    "3:ב": `Berakhot 52.`,
    "3:ג": `There Pesachim.`,
    "3:ד": `Rashbam there.`,
    "3:ה": `Or Zaruah in name Rav Hai Gaon.`,
    "4:א": `Ohel Moed.`,
    "4:ב": `See Ra'ah.`,
    "5:_": `Orchot Chaim.`,
    "6:_": `Rosh there Pesachim per Yerushalmi.`,
    "7:_": `Rambam and R' Meir of Rothenburg.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `(s.k. 1) Blessing, etc.—mishnah ch. 8 Berakhot wine comes to them; Pesachim 105b; see Tosafot there s.v. learn blessing; so Rosh there and concludes Rosh ch. 8 Berakhot; there ten things in cup of blessing; in many places cup of blessing.`,
    "1:ב": `Even alone—from that says birkat hamazon not birkat hazimmun; Pesachim there one who enters—if so each eats alone and not eat before havdalah.`,
    "1:ג": `And must, etc.—from what permitted eat without havdalah as Rosh ch. 8 Berakhot and Tosafot Pesachim 102b s.v. and leaves it.`,
    "1:ד": `And shall not eat, etc.—Tur and like havdalah Pesachim 107a on cooked food; so birkat hamazon since requires cup Tur; see Rosh ch. 8 Berakhot s.k. 2 therefore seems explain; if he is even; siman 296 s.3 and Magen Avraham disagreed brought proof from above if says only one cup says on it; Eruvin 40b nevertheless requires cup.`,
    "1:ה": `Therefore two—mitzvah to divide.`,
    "1:ו": `Some say, etc.—only in three—for otherwise difficulty for Rabbenu Gershom who blesses three blessings then never exempts per Tosafot even olive-sized needs blessing; moreover full his mouth specifically b'dieved as Mekadesh; siman 472 and Tosafot Berakhot 37a s.v. gave and Pesachim 105b s.v. above strained; Hagahot Maimoniyot ch. 7 in name R' Yehudah this view; so R' Elchanan there; see Bahag; so Zohar in many places.`,
    "1:ז": `Some say, etc.—Rambam as conclusion Gemara Pesachim 114b; that we say there 105b requires cup Rashba we do not hold like him—must say because Beit Shammai as there; Berakhot 52a only there mishnah and Gemara Beit Hillel hold requires cup for blesses on food; that may be for mitzvah min hamuvchar as R' Menachem; so what we say in many places cup of blessing; cup of blessing requires ten things if has wine; so Rambam ch. 7 if wine there bring cup; if blessed on wine must set aside; Ran Pesachim there that which challenges learn birkat hamazon—certainly for mitzvah we require as above only because mishnah teaches even from porridge—in such case challenges learn; holds third cup only for birkat hamazon alone; Rama nevertheless; so Tur R' Yehudah ch. 7 Berakhot there one who drinks double; challenged for on fruit we say cup of blessing combines; answer different there obligated anyway see there.`,
    "2:א": `(s.k. 2) Even fixed, etc.—Rashbam there and Rosh and Mordekhai; but in Shulchan Aruch wondered on Rambam; so Rif and Bahag and R' Chananel and Shulchan Shel Arba read Gemara so; Hagahot Maimoniyot ch. 7 from birkat hamazon only where no wine available and always accustomed—ch. 6 Berakhot not called fixed unless others fix for him; so in name Tosafot in such case bless like havdalah; Rosh there; if no.`,
    "2:ב": `Good eye, etc.—meaning for interpreters who explain as plain meaning as above and Magen Avraham.`,
    "2:ג": `Some infer, etc.—as Zohar and Magen Avraham one should not bless alone on cup; to satisfy poskim that even alone requires cup therefore bless and do not hold cup; correct meaning per Kabbalah bless only in three; see Zohar main stringency hold in hand see there.`,
    "3:א": `(s.k. 3) Must, etc.—though R' Eliezer says its taste; Tosafot there.`,
    "3:ב": `Or vessel, etc.—Rosh there s.k. 2; that of Yerushalmi can reject.`,
    "3:ג": `There is, etc.—this is as above broken shard.`,
    "4:א": `(s.k. 4) If they were, etc.—Tosafot there s.v. that was; nevertheless.`,
    "4:ב": `And above, etc.—there and there anonymous as first version.`,
    "5:_": `(s.k. 5) If, etc.—as in last chapter Avodah Zarah and ch. 6 Chullin and learn.`,
    "6:_": `(s.k. 6) May, etc.—Tosafot Berakhot 52a s.v. its taste; Rosh there and ch. On Fruit and see there; Mordekhai Berakhot there.`,
    "7:_": `(s.k. 7) At time of, etc.—Tosafot Pesachim 106a s.v. particular.`,
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
