#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "4:_": `And some say we say Boneh Yerushalayim b'rahamav and so is custom. It appears the reason: since he began with mercy he concludes with mercy—for conclusion resembles opening; not as all in Him who say one should not say because written Zion in judgment shall be redeemed—and they erred; specifically redemption shall be in judgment; but to be built and established in her honor more than First Temple is with mercy.`,
    "7:_": `And he does not conclude with formula of Rosh Chodesh. Some say even on weekday he concludes; on Shabbat since in any case must conclude because of Shabbat and does not mention because of Rosh Chodesh any name and malchut—concludes also with name of Rosh Chodesh (Maharal and Levush).`,
    "10:_": `The same law for Rosh Chodesh and Purim and Chanukah. In Shulchan Aruch Maharal author of Hagahot siman 132 implies specifically Purim and Shabbat we follow beginning of meal unlike Rosh Chodesh and Chanukah—for their meals are not considered so fixed to follow after beginning of meal; reasonable reason: on Shabbat and Purim obligated third meal by day; and Purim Purim meal eaten at night did not fulfill—end; correct to follow beginning of meal unlike Rosh Chodesh and Chanukah and even Yom Tov as I wrote; if he ate and extended meal until night and it was Shabbat and Rosh Chodesh—mentions Shabbat alone not Rosh Chodesh; and if Shabbat and Sunday was Rosh Chodesh must mention Shabbat and Rosh Chodesh for immediately at dark Rosh Chodesh enters though did not pray Maariv as I wrote; not as written and ruled my teacher in Bach that if Shabbat and Rosh Chodesh mentions Shabbat and Rosh Chodesh. If Shabbat was not Rosh Chodesh and Sunday was Rosh Chodesh—mentions Shabbat not Rosh Chodesh as I wrote. Maharshal of Lublin wrote thus their ruling: one whose Shabbat meal extended into night mentions retzeh; if Shabbat and Rosh Chodesh also mentions yaaleh veyavo; but Rosh Chodesh midweek and meal extended into night does not mention Rosh Chodesh since no added mitzvah in mentioning; when Rosh Chodesh on Sunday and meal extended Motzaei Shabbat—does not mention retzeh only yaaleh veyavo—see there.`,
  },
  "baer-heitev/part-001.txt": {
    "3:_": `So is custom. One does not protest those who practice so. Magen Avraham.`,
    "6:א": `For rest. One who does not know formula of this blessing that mentions here Who gave Shabbatot for rest, etc.—must return to beginning since cannot fix deficiency; but if knows beginning and end suffices even if does not know rest of formula properly. Taz.`,
    "6:ב": `Gave. On Rosh Hashanah Avnei Nezer on this; and Your word our King is truth—Maharil. Avnei Nezer on sleep and joy on Rosh Hashanah. Rav author Knesset HaGedolah ruled on Rosh Hashanah and Yom Kippur meaning sick who ate on Yom Kippur if erred and did not say yaaleh veyavo—say Blessed Who gave Yom Tov to Israel and conclude Blessed Who sanctifies Israel and Yom Kippur; Rav Bnei Chiya disputes and ruled does not conclude Rosh Hashanah and Yom Kippur; so Magen Avraham ruled does not conclude for it is like Rosh Chodesh—see there.`,
    "7:_": `Shabbat. If forgot Shabbat alone does not mention Rosh Chodesh in blessing; however when opens haTov vehaMetiv returning to beginning all mention Rosh Chodesh. On Shabbat Chanukah if mentioned Chanukah and not Shabbat—returns to beginning and does not mention Chanukah for not obligated to mention Chanukah. Magen Avraham.`,
    "8:א": `On Shabbat. Yom Tov specifically first meal of night and first of day. Tashbetz.`,
    "8:ב": `Like Rosh Chodesh. Although l'chatchila must eat; nevertheless since opinions exist—doubt in blessings to be lenient. If ate fourth meal on Shabbat need not return to beginning—Tosafot; Magen Avraham wrote implies from their words if did not open haTov vehaMetiv says Baruch, etc., like Rosh Chodesh.`,
    "10:א": `The meal. If already prayed Maariv—again does not mention Shabbat even if prayed intentionally. Magen Avraham.`,
    "10:ב": `The same for Rosh Chodesh. If Rosh Chodesh on Sunday—requires study whether mentions both Shabbat and Rosh Chodesh for they appear contradictory; if we follow now—say Rosh Chodesh; if we follow beginning of his meal—say Shabbat. Taz ruled say both Shabbat and Rosh Chodesh immediately—for it is like now when one says first Kiddush belonging to Yom Tov then Havdalah after Shabbat; so in birkat hamazon mentions passed Shabbat and coming Rosh Chodesh or Yom Tov. But Bach ruled if Rosh Chodesh or Yom Tov on Motzaei Shabbat and extended meal—says only retzeh for we follow beginning of his meal. Magen Avraham ruled if ate bread at night must mention Rosh Chodesh not Shabbat; if did not eat bread at night—mentions Shabbat not Rosh Chodesh. Motzaei Shabbat for Chanukah—even if ate bread at night does not mention Chanukah for only optional to mention. All when Rosh Chodesh or Yom Tov or Chanukah on Sunday; but Shabbat Chanukah or Shabbat Rosh Chodesh or Yom Tov falling on Shabbat and meal extended Motzaei Shabbat—all mention both Shabbat and Rosh Chodesh or Shabbat and Al hanissim; obvious; specifically if did not pray Maariv. In responsum Rama siman 132 implies specifically Purim and Shabbat follow beginning of meal unlike Rosh Chodesh and Chanukah—not considered fixed meals to follow after beginning; reason Shabbat must eat third meal by day and Purim meal at night did not fulfill—end; correct to follow beginning unlike Rosh Chodesh and Chanukah; if ate and extended until night and was Shabbat and Rosh Chodesh or Chanukah—mentions Shabbat alone not Rosh Chodesh or Chanukah. Maharam of Lublin ruled if Rosh Chodesh on Shabbat and extended meal—mentions Shabbat and Rosh Chodesh; but Rosh Chodesh midweek extended to night—does not mention Rosh Chodesh since no mitzvah in addition; unlike if Rosh Chodesh on Shabbat—see Ateret Zekenim and Magen Avraham siman 419; see Shakh. See Halakhot Ketanot ch. 2 siman 46 wrote until food digested from Shabbat can mention Shabbat—not law that if sits eating all night mentions Shabbat—obvious; above siman 184 s.k.1 (see Sefer Eliyah Rabbah on this and settling Rama's words—see there).`,
  },
  "beer-hagolah/part-001.txt": {
    "1:_": `Berakhot 45.`,
    "2:_": `Gemara there like Rav Ashi.`,
    "3:א": `There 48.`,
    "3:ב": `Mordechai in name Tosafot and Rabbenu Yonah and Rashba.`,
    "4:_": `Gemara there per Rashi and Tosafot.`,
    "5:_": `Tur and Semag.`,
    "6:_": `Gemara there 43.`,
    "7:א": `Gemara there.`,
    "7:ב": `Rif there and Rambam ch. 2.`,
    "7:ג": `Gemara there.`,
    "7:ד": `Semag and Kol Bo and Rabbenu Yerucham part 1 ch. 2.`,
    "7:ה": `Tur in name R' Yosef and Mordechai and Hagahot Maimoniyot ch. 2 Shabbat.`,
    "8:_": `Tur in name his brother R' Yechiel.`,
    "9:_": `Kol Bo there.`,
    "10:_": `Avnei Nezer in name Tosafot.`,
  },
  "beur-hagra/part-001.txt": {
    "2:_": `Seif 2 Amen, etc. Like Rav Ashi—for he is last; and for us there are no workers. Tosafot there s.v. Rav, etc.; and even workers today bless as enacted as siman 191 s.2 Hagahot Maimoniyot.`,
    "3:א": `Seif 3 and one should not mention, etc. There 49a first—only because, etc.; Tur and Rosh and they did not enact in Boneh Yerushalayim itself to say because not normal conduct to compare them.`,
    "3:ב": `And one who says, etc. Tur as above.`,
    "3:ג": `And so, etc. Rosh as above.`,
    "4:א": `Seif 4 formula, etc. Language of Rambam and Tosafot there s.v. matchil, etc.; so Rosh and Tur; brought proof from Yerushalmi that Tosafot bring there what to say, etc., formula, etc.—apparently one may not change formula on Shabbat; Rashi s.v. uveShabbat, etc.; but Rif wrote on Shabbat say nachemnu Hashem Elokeinu, etc., and weekday say rachem, etc.; so Rokeach; primary; and so per Kabbalah way.`,
    "4:ב": `And concludes, etc., or, etc. There 49a first like R' Nachman, Rif, Rambam wrote menachem amo, etc.; R' Efraim challenged from what is written Rosh Chodesh gevurata, etc.; though some answer since did not say uveneh but biveneh—not conclusion in two; Tur challenged—for in uvinehnu it counts and may tzaddikim rejoice in building Your city in two; Rosh wrote; but Zion, etc., is not two—for Zion and Yerushalayim are one.`,
    "5:א": `Seif 5 on Shabbat, etc. There and says kedushat hayom.`,
    "5:ב": `And on Rosh Chodesh, etc. Shabbat 24a days, etc.; Tosafot there s.v. uveBoneh, etc.`,
    "5:ג": `And if, etc. As in tefillah as ch. 2 Yom Tov and end ch. 3 Eruvin.`,
    "5:ד": `And does not mention, etc. Since mentions once suffices.`,
    "6:א": `Seif 6 and if falls, etc. Tosafot there s.v. Baruch, etc.; as above seif 5.`,
    "6:ב": `And all blessings, etc. Tur and Rashba and Shulchan Pesach; as written 40b every blessing, etc.; see Tosafot there s.v. Baruch, etc.`,
    "6:ג": `And that suffices, etc. Gemara there.`,
    "7:א": `Seif 7 whether at night, etc. Even though in tefillah do not return—here to return; but to add blessing even at night—Mordechai and Tur in name R' Yosef.`,
    "7:ב": `And not, etc. Gemara doubtful; therefore Rif Rambam Rosh Shulchan Pesach hold no conclusion; Behag wrote one concludes; so Rokeach; so Yerushalmi.`,
    "7:ג": `And honor of the King, etc. Yom Tov 8 appears like their words; as Hallel and joy eight; and R' Elazar 14 meals; and in Tosefta mikra kodesh honor with food drink and clean garment; Chagigah 11a: shall I say on Yom Tov, etc.; but not required.`,
    "7:ד": `If falls, etc. Even though not sufficient without eating—nevertheless not because of Rosh Chodesh; Yom Tov 8; and as ch. 2 Shabbat day he became obligated, etc.; appears not like name—for here no return at all on Rosh Chodesh; comparable to Rosh Chodesh falling on Shabbat there; so Hagahot Maimoniyot ch. 2 Shabbat.`,
    "7:ה": `And if forgot, etc. Magen Avraham.`,
    "7:ו": `And if opened, etc. Even if forgot Shabbat alone—as Magen Avraham—for like one who did not bless.`,
    "7:ז": `And some, etc. Since no conclusion on Rosh Chodesh at all; siman 284 s.2; some say, etc.; Rosh Shabbat there.`,
    "8:_": `Seif 8 meal, etc. Tosafot Berakhot there s.v. iy ba'i, etc., and meal, etc.; their doubt lenient; above siman 491 s.5; per Rashi explanation no need bread for third meal; but those requiring bread—law like other Shabbat meal.`,
    "10:_": `Seif 10 was, etc. Yerushalmi; Rosh brought ch. 8 Yoma 80b brothers of mother of R' Ada would tour exile of Rav; told him when you see, etc., Rav changed his view, etc.; R' Matna from Rav would extend in prayer much—would reach, etc.; apparently since began by day does not care finishing at night; see there Turei Zahav s.3.`,
  },
};

const base = "output/siman_188";
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
