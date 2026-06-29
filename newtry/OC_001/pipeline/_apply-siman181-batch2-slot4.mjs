#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mechaber/part-001.txt": {
    "8:main": `There are those who say mayim acharonim do not require drying hands afterward; but per Rambam one dries and afterward recites the blessing.`,
  },
  "magen-avraham/part-001.txt": {
    "1:_": `Beit Yosef siman 158 in name Eshel Avraham: first waters mitzvah, last waters obligation—for what difference to cancel? Before this: if ate and has mayim acharonim and needs eat another meal same day e.g. three meals Shabbat without water—cancels other meal and takes hands for blessing since already obligated in blessing; if has evening oil or wine cleans and blesses—end quote; implies if wants eat and has only water—take once, take first not last since forbidden eat until washes hands; requires study—if so what stringency of last over first? Must say forbidden eat unless has first and last waters for this meal; see Peri Megadim 182; requires study; I say original difficulty does not apply—for difference for travelers in camp exempt first obligated last as Eruvin ch. 5 and Tosafot Chullin 105, siman 163 if no water need not cancel meal; seems now first preferred even for one careful with last for not obligation as no Sodomite salt; Ri Migash pour cup then take hands, siman 166; from Tur and Shulchan Aruch order implies take before; nevertheless Gemara like Ri Migash—no order in Tur's mishnah. But in vessel: nevertheless do not wash from inside vessel—intermediate permitted (Yeshuot Yaakov).`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) (Seif 1) Mayim acharonim obligatory—as in Berakhot 53b end: you shall sanctify yourselves—these are first waters, you shall be holy—these are mayim acharonim, etc.; reason in Chullin 105b Sodomite salt blinds eyes; Abaye: a speck in eye; Rashi: Sages said on all your eating eat salt—since touched salt when returns hand to eyes blinds—therefore must wash—end quote; Rabbenu Yonah ch. These Matters: Rambam though no Sodomite salt now—fear other salt like Sodomite; if passes hands over eyes before washing blinds—end quote; Ri Migash in name Ri: even without salt obligatory because mayim acharonim (Yoma 3b) kill the soul—end quote; Bach, Beit Yosef. These reasons per plain meaning; we wrote in Kol Mevaser all Rabbinic words are per secret but clothed in plain to soften ear; Zohar Terumah 154b revealed secret mayim acharonim: after person eats and enjoys must give portion of essence to that side—and who is that? mayim acharonim—that grime of hands must give that side its portion; therefore certainly obligatory; obligatory and where obligatory permitted; obligation on person to give its portion; therefore no blessing on them at all for blessing not on that side—end quote; so Sefer HaMaor ch. Ekev: matter of mayim acharonim—know Satan stands on table as Zohar Terumah and can rule more especially when alone without three for zimmun—for through zimmun Satan removed as Zohar Balak incident of youth; must be very careful in intent of mayim acharonim lest prosecute; but through this gift known Satan leaves; initially guest then if not intend birkat hamazon well becomes host and prosecutes especially alone without zimmun; intent of mayim acharonim we wrote siman 187 note 21 see there. Mayim acharonim has much obligation per secret expelling Satan—therefore Sages warned said obligatory; why not put hand on mouth while still wet from mayim acharonim since those waters Satan's portion; see below note 27 and siman 158 note 6 see there.`,
    "2:_": `(2) And the word needs netilah—as Chullin there; not from root midad but since touched salt need netilah lest put hands on eyes.`,
    "7:_": `(7) There mayim acharonim obligatory; seems nevertheless obligation not more than first waters—before him four mil and after one mil as above beginning siman 163 see there; if farther than measure mentioned—can clean hands in dirt or pebble as above siman 4 seif 22 see there; see below note 26.`,
    "9:_": `(9) There but in vessel, etc.—nevertheless do not wash from inside vessel—intermediate permitted Yeshuot Yaakov; Magen Avraham s.k. 1 wrote reason last come to remove grime—since washes from vessel waters removed grime from hands nevertheless water re-adheres with grime on hands unlike intermediate between cheese and meat eating—only come to remove food stuck on hands—helps even washing in vessel for food passes over hands and food not stuck; Machatzit HaShekel; therefore seems if much water that even if returns to hands no grime—even mayim acharonim permitted wash from vessel; per their secret as Satan's portion seems must be specifically by pouring.`,
    "10:_": `(10) There but in vessel, etc.—but need not vessel to take from like first netilah; Levush—meaning even vessel invalid for first netilah as siman 159 kosher for mayim acharonim; Kol Bo siman 23 in name Raavad these matters between first and last: first need revi'it, last to cast off hands; first only from vessel, last from anything; no human force; no chatzitzah invalidates; all waters kosher for last even used for work, very murky, even cow drank from them, even Tiberias hot springs bitter—first not by halves, last by halves; first if rubbed on body or wall needs another netilah, last not—end quote briefly; brought Eshel Avraham note 3 all are halacha, Turat HaBayit—not like Olat Tamid in name Shelah some opposite—end quote; see below note 25.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(Magen Avraham wrote Beit Yosef, etc.—implies takes first, etc.; one reason why must mayim acharonim in Eshel Avraham case cancel meal—for already obligated mayim acharonim and third meal not yet obligated—do now what obligated; per this in Magen Avraham case obligated first not yet last—take first; if so Eshel Avraham would mean simple difference wants eat has water only once—cancel first because of last and eat without first—requires study; if so what stringency—for each time do what obligated now and defer other; must say forbidden eat unless has first and last for this meal; well mayim acharonim more than first for first sometimes deferred for last as Eshel Avraham third meal case—but do not find last deferred for first; siman 163 if no water within four mil before and one mil after—eat without netilah wrap hands in cloth and eat.`,
    "6:_": `(s.k. 6) Dries, etc.—specifically blesser—and wrote there siman 10:245 reason unfit bless God's name without drying and preparing before God of Israel—but others need not dry—end quote; therefore specifically for them one blessed alone rest heard as siman 183 seif 6; but per our custom as Acharonim there even when invite together each blesses alone—therefore all need drying even per Maharshal.`,
    "10:א": `(s.k. 10) And must, etc.—so Yeshuot Yaakov practiced pour cup and wash—meaning after pouring cup poured that water on hands—not as understood from R' Yonah language that washed during pouring—for R' Yonah himself brought Magen Avraham s.k. 1 do not wash from vessel.`,
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
