#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) Mayim acharonim, etc.—reason hands are defiled from eating and unfit for blessing; Chazal relied on verse you shall sanctify yourselves—these are first waters (sanctify hands before eating from impurity as explained siman 158), you shall be holy—these are mayim acharonim; even one who hears blessing from blesser's mouth; moreover even when hands not defiled from eating Chazal obligated mayim acharonim for fear Sodomite salt—in every meal there is salt and fear perhaps mixed Sodomite salt blinds one who touches then touches eyes; even now no Sodomite salt among us fear other salt like it; see seif 10.`,
    "1:ב": `(2) Obligation—if limited water diminish first waters per siman 162 seif 2 so remains for mayim acharonim; if only measure of first waters they precede even one always careful with mayim acharonim since now no Sodomite salt less obligatory than first waters; some say initially may not eat unless knows will have mayim acharonim; nevertheless obligation not more than first waters—four mil before one mil after; within measure no water may still eat and bless birkat hamazon; whenever finds water afterward takes hands for Sodomite salt concern.`,
    "2:א": `(3) Only in a vessel—and not insert hands inside vessel to wash but pour water on hands so it descends into vessel.`,
    "2:ב": `(4) Because of evil spirit—danger for one who treads on them; where none pass may take on ground; therefore permitted under table though sometimes table removed; nevertheless dry between times.`,
    "2:ג": `(5) If he has no vessel—when he has vessel pour specifically inside vessel.`,
    "2:ד": `(6) And similar—thin stones thorns all where water absorbed not gathered one place; some lenient on floor if no vessel hold only on actual ground evil spirit rests; per Levush should be stringent.`,
    "3:א": `(7) In hot water—but lukewarm meaning hand does not recoil permitted; Maharshal ruled specifically cold; if only lukewarm certainly not stringent.`,
    "3:ב": `(8) Scorched by them—does not mean one takes hands in water as if burned but hand recoils; measure infant's belly scorched (Magen Avraham).`,
    "3:ג": `(9) They rub hands—soften hands absorb food grime (Rashi); seems hot water that cooled permitted.`,
    "4:_": `(10) Until second joint—above two finger joints food does not reach (from thumb need wash first joint); if food reached higher need washing above (Acharonim in name Belbo); see Biur Halacha; evil practice I saw people careful with mayim acharonim but do not fulfill law—only few drops on fingertips not reaching end first joint sometimes mere touch hands remain defiled; truly must wash at least until end of two finger joints as above.`,
    "5:_": `(11) Grime descends—from dirt on hands through netilah.`,
    "6:א": `(12) Begin from blesser—so he reviews four blessings of birkat hamazon while these four take; though today each at table blesses alone nevertheless proper each blessing quietly with blesser who blesses loud as below siman 183 s.7; zimmun blesser must say before them therefore need review somewhat at start.`,
    "6:ב": `(13) From youngest—sits end of table so blesser need not wait long after his netilah until all take—disgrace to him and interruption.`,
    "6:ג": `(14) Do not honor, etc.—not honor to hint he wash his defiled hands first.`,
    "6:ד": `(15) Begin, etc.—so while four take he can review birkat hamazon; though we hold immediately after netilah blessing within this measure not interruption; nevertheless possibly may not interrupt at all within that measure.`,
    "6:ה": `(16) From blesser—once he took his hands those four beside him do not honor each other but take while seated.`,
    "7:_": `(17) Do not bless, etc.—per reason explained above s.k.1 Sodomite salt danger to eyes certainly no blessing on this netilah like no blessing for guarding from other dangers filtering water at night from leech etc.; even per first reason above netilah to remove grime before birkat hamazon would warrant blessing; nevertheless custom not to since now do not perform mitzvah as enacted—custom rubbed hands in evening oil after netilah to remove grime; since we do not perform as ordained—no blessing in any case.`,
    "8:א": `(18) Need not dry—since only come to clean hands they are clean without drying.`,
    "8:ב": `(19) And Rambam, etc.—holds not called netilah without drying; see above end siman 173 Mechaber lenient; nevertheless l'chatchila good dry to satisfy all (Chayei Adam); Beit Yosef Sefer Shulchan Shel Arba, Ateret Roshei in name Kolbo—mayim acharonim need no measure only enough to rinse hands; Maaseh Rav Gra practiced revi'it.`,
    "9:א": `(20) Take from all beverages—they also clean grime like water; discusses when no water only beverages; if has water do not use beverages (Peri Megadim).`,
    "9:ב": `(21) Types of beverages—even oil honey milk except wine for respect; Acharonim all waters invalid for first—melacha done appearance changed even beast drank—nevertheless kosher for mayim acharonim; no vessel human force; chatzitzah does not invalidate; need not pour but once.`,
    "10:א": `(22) Not practiced, etc.—no Sodomite salt among us; defiled hands not concern since not particular to wash food grime not called grime for us; Gra in Biur must take also now both reasons apply (see Biur Halacha); Magen Avraham in name kabbalists every man careful with mayim acharonim; Maharshal Yam Shel Shlomo stringent; Birkei Yosef etc. very stringent.`,
    "10:ב": `(23) Must take hands, etc.—by law must take mayim acharonim all views; Acharonim even wants bless on wine fruits mid-meal must wipe first hands dirty and fastidious.`,
    "10:ג": `(24) Before birkat hamazon—careful not interrupt between netilah and birkat hamazon even Torah words.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `Water—see siman 179 s.6 in name R' Yosef Karo Rambam other salt nature like Sodomite; other reasons last waters killed soul Berakhot 53; sign to wife what he ate—nowadays not sign not to take; more reason defiled unfit for blessing Magen Avraham letter 9.`,
    "2:_": `Begin—see Bach Pri Chadash; Bach answered they separated take hands then return to birkat hamazon; Pri Chadash in Kuntres Pesachim difficult if so only table removal means stop eating see Biur Halacha; Acharonim 5 wrote Tur holds Rashba reason more than five do not begin from elder lest interruption between blessing and netilah; apparently forced nowadays no table removal yet law practiced among us meaning Rashba reason; but Taz wrote what Tur in Kuntres Pesachim Rashi disagrees.`,
    "3:_": `Five last—Taz more than five is interruption four is measure for birkat hamazon not interruption see there letter 2; nowadays all bless birkat hamazon alone though one loud siman 193 many nevertheless wait to bless birkat hamazon quietly until blesser begins loud and because zimmun though more than twenty amot etc.; siman 166 first waters see there.`,
    "4:_": `Begin—even after elder took do not honor with defiled hands; begin from elder for honor of blessing in name Mechaber.`,
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_": `Magen Avraham s.k.1—and no order for Tur's mishnah; see Magen Avraham siman 170.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "2:_": `In a vessel—Baer Heitev; see above siman 173 what Chida and Acharonim wrote there.`,
    "6:_": `Five last—Baer Heitev; in name Ari z"l wrote forbidden to interrupt even words of Torah see there.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `Mayim acharonim are obligatory—for Sages said after all your eating eat salt; there is Sodomite salt that blinds eyes; since touched salt when returns hand to eyes blinds—therefore must take them.`,
    "6:א": `Begin from youngest—Rashi: disgrace to remove table from elder when he takes hands and waits idle; therefore begin from youngest at end; do not remove table from elder until waters reach five beside him; return begin from elder remove table from him—end quote; not as Tur siman 180 did not remove table from blesser.`,
    "6:ב": `Five last—for Sages estimated while four take blesser can review four blessings of birkat hamazon; that we say immediately after netilah blessing not literally immediate only this measure; nevertheless to interrupt within measure Beit Yosef in name Rashba not interruption.`,
    "6:ג": `Begin from blesser; afterward do not honor each other (Beit Yosef in name Rosh).`,
  },
};

const base = "output/siman_181";
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
