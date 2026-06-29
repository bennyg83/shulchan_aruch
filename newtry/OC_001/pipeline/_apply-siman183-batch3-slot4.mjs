#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "levushei-serad/part-001.txt": {
    "2:_": `Magen Avraham s.k.3—Perishko; per this when sends shopkeeper for whole meal includes birkat hamazon cup—removed from barrel for blessing though drinking during meal not Perishko at birkat hamazon—only Perishko when remove from barrel; R' Yehudah Weil near blessing must be Perishko at blessing send shopkeeper near blessing; language for us too Magen Avraham though not obligated all ten only four sign chameshah nevertheless living practiced for us; requires study.`,
    "3:_": `s.k.5—placing hat included in wrapping in Gemara.`,
    "4:_": `Taz s.k.4—like other matters rinsing washing etc.`,
    "5:_": `There only language of Sages—only cup; regarding you shall be holy if beverage secondary gives for her honor; only language of Sages even beverage secondary intent only cup.`,
    "6:_": `There Tur wrote perhaps distract as should be.`,
    "7:_": `Magen Avraham s.k.6 Tur wrote as should be.`,
    "8:_": `There and I too forbidden therefore stringent.`,
    "9:_": `Magen Avraham s.k.11 therefore per Rema siman 65 as should be.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:_": `(s.k. 1) Remnants etc.—bread absorbed; wrote previous siman though crumbs do not invalidate wine these remnants from bread absorption more repulsive.`,
    "2:א": `(s.k. 2) They dilute in his country to show praise Eretz Yisrael wine strong needs water; though blesser abroad since not diluted until blessing of Land proven comes show praise Eretz Yisrael Rav Yehudah; support for custom from Rambam language see Rav Yehudah; must dilute immediately start blessing of Land not only at end blessing of Land—then at start birkat hamazon need not fill on all banks see there; (s.k. 3) for blessing living means Perishko one of ten things Berakhot 51a; Mechaber seif 3 whole per interpreters living on vessel whole as we say broken vessels their death whole vessel called living.`,
    "2:ב": `Send shopkeeper; Sefer Acharonim wrote also this is effort.`,
    "4:_": `(s.k. 4) Full in cup adornment around—interpret within ten things adornment means not too full inner adornment; Magen Avraham on contrary require full on banks one of ten; adornment other matter as Gemara; Taz s.k.4 rejected we do not require adornment—reason those do so lest cup spill disgrace as Berakhot 171 do not pass full cup over diners.`,
    "5:א": `(s.k. 5) Cup even if broken; Acharonim brought Maharil even cracked without missing do not bless if other possible see there.`,
    "5:ב": `Must all ten things—add only adornment for Shulchan Aruch counts one by one eight things rinsing washing living full receive both hands take right raise tefach put eyes; adornment and wrapping; abroad no wrapping.`,
    "5:ג": `Bach wrote upper garment even alone bless Shelah awe of master on him.`,
    "6:א": `(s.k. 6) Under etc.—there 51a Rabbah bar bar Chanah R' Yochanan first asked may left assist right R' Elazar since first did not explain we act stringently; Bach seems Shelah forbade only when holds cup on left side like right one side; when holds middle of back only right puts left under cup left under right assists—not substantial permitted; Hagahot Shulchan Aruch understood permitted only left under right hand under cup forbidden since holds cup with left—not clear Bach.`,
    "6:ב": `Seems proof for Shelah—meaning either per Rema understanding or Bach intent at least Shelah reason support no substance; Rema and Bach dispute what called support.`,
    "6:ג": `Receive with right—all sacrificial service right; receiving blood one of four sacrificial acts.`,
    "6:ד": `Tur wrote to support—written to support her feminine refers right hand not cup; support feminine therefore right hand; disputes Shelah.`,
    "6:ה": `Should hold both hands; per Bach certainly holds both when holds cup one side like right; even Rema who permitted only left under right hand under cup forbidden—then required if holds cup side only right left under cup act stringently; under right hand possibly permitted; Tur holds even left under cup called holding both hands not to resolve certainly forbidden—only whether permitted left under right not under cup; R' Elazar we act stringently.`,
    "6:ו": `Therefore stringent as should be—Tur disputes Shelah stringent like Tur; Tur proof Magen Avraham Shabbat 93 see Taz s.k.3; responsa Chakham Tzvi 82 proved from problem left assist has substance at least rabbinically did not want stringency lest invalidate sacrifice if received right left assists see there.`,
    "6:ז": `As Tosafot large cup—wrote on problem left assist; in large cups or Rosh Chodesh Tevet on Shabbat long birkat hamazon miracles al hanissim v'al haniflaot Chanukah or weddings extend birkat hamazon—end quote.`,
    "6:ח": `Magen Avraham took one of them—implies from Tosafot without need as above certainly forbidden therefore Magen Avraham stringent.`,
    "7:א": `(s.k. 7) Therefore no—because Sukkah 49.`,
    "7:ב": `Swallowing—Rashi large swallows affection mitzvah; Maharsha swallowing means fine sips rejected R' Elazar Prague; Gemara ten things includes put eyes in it refers to cup said in cup—end quote.`,
    "8:_": `(s.k. 8) For his wife daughter-in-law—there Berakhot Rav Nachman send daughter-in-law cup blessing though seems did not eat with them.`,
    "9:_": `(s.k. 9) Left hand—rabbinic; not like tefillin left for hand tefillin; left his hand not follow world because from Torah; take lulav right etrog left rabbinic—three species in lulav need important hand therefore right of world suffices; nevertheless practice so; Magen Avraham difficulty Rav Yehudah—per Rav Yehudah lulav should take cup right of world; law like Rav Yehudah take right hand for also lulav Rema take left lulav right hand.`,
    "11:א": `(s.k. 11) Fulfilled nine tekios—Gemara language counts Torah tekios nine sounds three times teruah; doubt what is teruah therefore thirty sounds end Rosh Hashanah below siman 589; since heard nine tekios in nine hours certainly interrupted between nevertheless fulfilled—same here.`,
    "11:ב": `Per siman 65 etc.—regarding shema Tosafot there law shema and shofar same forced divide if waited under duress interruption—for tekios if waited nine hours not interruption; prayer Berakhot if waited finish whole returns start; Tosafot hold prayer shema shofar one law therefore divide under duress interruption prayer shema shofar; if waited whole returns start refers under duress; since for them shofar under duress returns law learns from shofar—same here under duress returns start.`,
    "11:ג": `Regarding feces if blessed birkat hamazon feces before him doubt return bless; prayer such certainly return pray as above s.6.`,
    "11:ד": `End s.v. where returns—Gemara where returns R' Zeira from Abbaye Abbaye return start Sages place stopped; Rashi one who interrupted for years explained siman 219 three ate as one two interrupted meal want bless zimmun third still wants eat—three must stop eating until end zimmun then return eat; Rosh holds until end who sustains start we thank you; when three stopped for two finished eating where return start birkat hamazon R' Zeira Abbaye return start who sustains beginning birkat hamazon Sages place stopped start we thank you; Tosafot challenge Sages if ate after hearing zimmun from two who interrupted lacks who sustains for eating after interrupt—Tosafot refer three ate one went market they call and invite him siman 194 seif 2 hold must wait that three with two until after zimmun; asked if after zimmun third left wants bless eating before called where start Sages place stopped start we thank you fulfilled who sustains heard from two when called; Tosafot conclude therefore fulfilled hearing who sustains first did not speak between—implies only if did not speak between if spoke between Sages return start—proof Magen Avraham spoke intentionally returns start.`,
    "11:ה": `However seems error Maharsha graft if did not eat between—how challenge Rashi since ate after zimmun how fulfilled zimmun on eating after; therefore Tosafot wrote per Tosafot did not eat after called heard zimmun properly fulfilled zimmun heard; if graft did not speak would challenge why mention speech not asked Rashi speech; graft did not eat no proof Magen Avraham from Tosafot.`,
    "11:ו": `See siman 194 in name Rambam returns on start Magen Avraham words—even waited under duress need not return—Ramban explains Rif where returns blesser zimmun begins we ate from him they answer blessed etc. lives in His goodness; asked where blesser returns R' Zeira Abbaye return start again bless we ate (Tur Yehudah nivrach sometimes imperative sometimes present).`,
    "11:ז": `Therefore when said first time bless imperative others bless; second time bless present we bless Creator we ate; Sages place stopped begin blessed we ate lives in His goodness.`,
    "11:ח": `Ramban therefore reason R' Zeira Abbaye return start—hold if waited finish whole returns start; hold suffices if waited finish one blessing still returns; like R' Nachman zimmun until start who sustains—when said we ate from him finished first blessing.`,
    "11:ט": `And when waited until answer blessed lives in His goodness—waited finish one blessing for longer than bless we ate therefore return start again bless—Ramban; Sages hold return place stopped not explained ostensibly hold birkat hamazon if waited finish whole does not return though interruption under duress must wait until responders answer blessed we ate—birkat hamazon even waited under duress not return start—no proof for Rambam is for Rif Rif does not divide under duress only prayer not under duress returns shema shofar even under duress not return as siman 65; Tosafot Rosh divide under duress birkat hamazon need return or not unresolved; Magen Avraham infers Tosafot Rosh Rema siman 65 divide under duress nevertheless agree blesser birkat hamazon begins second time place stopped blessed we ate as siman 192 though waited under duress finish whole zimmun; rejected siman 219 no proof—we hold zimmun until who sustains Rosh—when blesser waited until answer blessed lives in His goodness did not wait finish whole blessing until we thank you.`,
    "12:א": `(s.k. 12) Quietly so bless together—for zimmun need join in birkat hamazon; each says quietly; Tur siman 59 Rosh cannot intend constantly with shaliach tzibur; if not intend mid-blessing heart to other words lost intent; mouth even partial without intent fulfilled—end quote.`,
    "12:ב": `Nevertheless must bless with zimmun equally to join.`,
    "12:ג": `Only at end hurry finish before zimmun as Rema so can answer amen; if finish together with zimmun may not answer amen—answering amen after own blessings.`,
    "12:ד": `See above siman 51 Magen Avraham s.k.2.`,
    "12:ה": `Bach wrote better lest cannot finish before zimmun cannot answer amen; in zimmun must answer amen as derived Seferi; unlike siman 59 there not so obligated answer after shaliach tzibur—end Bach siman 193.`,
    "12:ו": `Siman 219 we hold zimmun until end who sustains.`,
    "12:ז": `So main Tashbetz.`,
  },
  "magen-avraham/part-001.txt": {
    "1:_": `Cup remnants—wine remnants bread absorbed (Rashi Beitzah ch. 2); same wipe cloth permitted.`,
    "2:א": `They dilute—Rav Yehudah wrote practiced in his country though wines not strong Kabbalah secret other reasons see there.`,
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
