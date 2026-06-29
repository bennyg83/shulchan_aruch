#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  // eliyah-rabbah 13
  [`eliyah-rabbah:1:_`, `[1] [Garment] new etc. — even if laundered, if not used much still in newness as when artisans finish and not yet worn, called new (Beit Yosef).`],
  [`eliyah-rabbah:2:_`, `[2] particular about it etc. — shrinks in water (Beit Yosef end siman 301 in name Kol Bo); when already laundered no longer called new for this law.`],
  [`eliyah-rabbah:3:_`, `[3] [Garment] be concerned etc. — to my humble opinion by law forbidden, saw Sefer Yereim, Sefer HaTerumot, Shulchan Leket, baraita in name R' Chananel like Rashi; nevertheless if not particular permitted.`],
  [`eliyah-rabbah:4:_`, `[4] remove feather etc. — Sefer Zichronot page 53 concerned; also wrote if bent even slightly do not spread, tearing primary melacha; separate quietly and delay.`],
  [`eliyah-rabbah:5:_`, `[5] [Garment] knots etc. — flax seed or dish on garment permitted scrape (Hagahot Gedolot); shavings tailors make — liable if particular.`],
  [`eliyah-rabbah:6:_`, `[6] to wear etc. — Lechem Mishnah chapter those knots: even if does not know needs for Shabbat permitted, for making garments no measure; here folding for Shabbat need.`],
  [`eliyah-rabbah:7:_`, `[7] [Garment] colored etc. — or colored should say, so Tur; have to change etc. even if not as nice (Beit Yosef).`],
  [`eliyah-rabbah:8:_`, `[8] [Garment] therefore etc. — appears refers above "wear that day" therefore forbidden fold etc. even new white without intent wear that day (Beit Yosef).`],
  [`eliyah-rabbah:9:_`, `[9] every case etc. — even old, even two people; Mordechai, Agudah, main view; even no intent wear that day.`],
  [`eliyah-rabbah:10:_`, `[10] permitting like nullifying etc. — Rashi Shabbat 141b, Tur; therefore concluded if was permitted etc. remove, then no reasoning and muktzeh (Beit Yosef).`],
  [`eliyah-rabbah:11:_`, `[11] [Garment] but if was etc. — Magen Avraham ruled stam forbidden as Maggid above; wonder why did not cite Rambam ch. 21.`],
  [`eliyah-rabbah:12:_`, `[12] [Garment] recognizes etc. — Tur language Tzeda Laderech, Maggid there; requires study mishnah language if was permitted etc.`],
  [`eliyah-rabbah:13:_`, `[13] and other etc. — therefore say cloak he permits not linen (Nachalat Tzvi); Yom Tov garments explained even linen part (Beit Yosef).`],
  // levushei-serad 13
  [`levushei-serad:1:_`, `Magen Avraham s.k. 5 called inersesir, in our language striegivan.`],
  [`levushei-serad:2:_`, `Magen Avraham s.k. 1 in newness — not like seif 3 calls new until laundered; here depends on recognizable newness not laundering.`],
  [`levushei-serad:3:_`, `s.k. 2 because shrinks, therefore Rama new garment not only black; dew specifically needs black, here shrinks therefore particular.`],
  [`levushei-serad:4:_`, `there all garments — Acharonim agreed, source Kol Bo reason squeezing, no difference. s.k. 3 on black.`],
  [`levushei-serad:5:_`, `and delays — acts covertly lest tear; Hagahot Gedolos possible without tearing, if torn permitted no intent.`],
  [`levushei-serad:6:_`, `Shulchan Aruch s.b. gathers tufts — yavel means growth.`],
  [`levushei-serad:7:_`, `business manner exempt — Rambam language; Beit Yosef proved beginning "when particular" not Rambam "and particular".`],
  [`levushei-serad:8:_`, `Shulchan Aruch s.g. wear them — if not fold they soften from laundering and wrinkle.`],
  [`levushei-serad:9:_`, `one person — two people folding forbidden, more repair.`],
  [`levushei-serad:10:_`, `not laundered — new unwashed hard, folding not significant repair.`],
  [`levushei-serad:11:_`, `white — white, folding does not repair much.`],
  [`levushei-serad:12:_`, `Magen Avraham s.k. 5 be stringent if particular as stated.`],
  [`levushei-serad:13:_`, `s.k. 7 monetary loss — whatever person particular about, fears moving lest spoil; explained siman 308.`],
  // machatzit-hashekel 17
  [`machatzit-hashekel:1:_`, `s.k. 1 new not used — do not say new means not laundered; Beit Yosef; after this Rabbenu Yonah wrote new is recognizable newness.`],
  [`machatzit-hashekel:2:א`, `s.k. 2 new etc. — implies stam new particular, since did not write "when particular" like Gemara.`],
  [`machatzit-hashekel:2:ב`, `Sefer HaZichronot forbids etc. — only on Kol Bo matter garment soaked rain; if dew fell and not particular — permitted.`],
  [`machatzit-hashekel:3:_`, `s.k. 3 garment etc. — black and new as above, on Rav Huna shakes tallit liable, Gemara specifically black new.`],
  [`machatzit-hashekel:4:א`, `s.k. 4 remove etc. tearing father — Rambam ch. 22 Hilchot Shabbat.`],
  [`machatzit-hashekel:4:ב`, `see siman 317 s.g.; there s.k. 10 liable tearing needs intent to sew; here without intent exempt.`],
  [`machatzit-hashekel:5:א`, `s.k. 5 when particular etc. — to beautify; above seif 1 particular means particular not to wear without shaking.`],
  [`machatzit-hashekel:5:ב`, `be stringent if particular as stated; so explicit Sh.A. Hagahot Maimoniyot ch. 7 only if particular.`],
  [`machatzit-hashekel:6:א`, `s.k. 6 wear etc. — Shulchan Aruch specifically one person: one person not fully repaired; books wrote two forbidden.`],
  [`machatzit-hashekel:6:ב`, `below etc. — see siman 289, Beit Shammai, means siman 289 somewhat like Magen Avraham morning also disgrace.`],
  [`machatzit-hashekel:7:א`, `s.k. 7 artisan etc. — lest come permit if not permitted erev Shabbat.`],
  [`machatzit-hashekel:7:ב`, `because muktzeh etc. — press muktzeh, removing vessels shakes muktzeh press.`],
  [`machatzit-hashekel:8:_`, `s.k. 8 other etc. — Rabbenu Yonah: per this view cloak permitted means not linen cloak.`],
  [`machatzit-hashekel:9:_`, `s.k. 9 or shoes Bach disputes 138; Rabbenu Yonah Mahari Abuhav doubted scrape on shoe forbidden because erases.`],
  [`machatzit-hashekel:11:_`, `s.k. 11 even wall — wooden wall permitted; Teshuvot HaShabbat possible today walls wood plastered.`],
  [`machatzit-hashekel:12:_`, `s.k. 12 permits both — field building; ground permitted no concern forget level hollows, davar she'eino mitkaven.`],
  [`machatzit-hashekel:13:_`, `s.k. 13 little etc. — all permit; Rama "likewise permitted little pottery" refers to "some permit both".`],
  // kaf-hachayyim 13
  [`kaf-hachayyim:1:_`, `a) seif 1 shakes new tallit — not used much still newness as artisans finish.`],
  [`kaf-hachayyim:2:_`, `b) there. from dew liable — specifically new black, shaking like laundering, particular not wear without shaking.`],
  [`kaf-hachayyim:3:_`, `c) dew etc. — likewise snow. Ateret Zekenim Agudah. Chayei Adam klal 22 ot 9.`],
  [`kaf-hachayyim:4:_`, `d) particular etc. — Rashba chiddushim: if particular psik reisha; if not particular exempt.`],
  [`kaf-hachayyim:5:_`, `e) gloss new particular — shrinks water Beit Yosef siman 301 Kol Bo; stam new particular.`],
  [`kaf-hachayyim:6:_`, `f) gloss new etc. — if laundered no concern. Ateret Zekenim ot 2, Eliyahu Rabbah ot 2 if recognized newness.`],
  [`kaf-hachayyim:7:_`, `g) gloss some forbid dust etc. — specifically black new. Magen Avraham s.k. 3 as beginning.`],
  [`kaf-hachayyim:8:_`, `h) gloss good be concerned — Bach l'chatchila beware shake dust or water. Machatzit HaShekel s.k. 2.`],
  [`kaf-hachayyim:9:_`, `Mordechai ch. Chavit writes we not particular wear with dust dew permitted; Kenesset HaGedolah Hagahot Tur; from Tosafot Yom Tov.`],
  [`kaf-hachayyim:10:_`, `j) gloss permitted remove feathers — not stuck like dust; if came on Shabbat permitted remove.`],
  [`kaf-hachayyim:11:_`, `k) gloss feathers — Sefer HaZichronot page 53 concerned; Kenesset HaGedolah; Eliyahu Rabbah s.k. 4; Ateret Zekenim ot 4.`],
  [`kaf-hachayyim:12:_`, `one entangled in thorns separates discreetly delays; if torn not liable no intent.`],
  [`kaf-hachayyim:13:_`, `l) seif 2 gathers yavel — growth. Levush; even one yavel many remain forbidden.`],
  // peri-megadim 8
  [`peri-megadim:1:_`, `Taz Shabbat 75b Rashi there; Rambam ch. 10 Hilchot Shabbat 18: gathers yavel liable, business manner exempt.`],
  [`peri-megadim:2:_`, `when particular — explained in letter alef well; see Netziv; Shulchan Aruch even in Niddah many doubt Rambam view.`],
  [`peri-megadim:3:_`, `or Taz; Magen Avraham ot 17 even thick like knife back forbidden; Ateret Zekenim ot 15; Avodat Yom Kippur even moist forbidden scrape; nevertheless if gently.`],
  [`peri-megadim:4:_`, `even wall Taz Shabbat 141a on beam — no beam, surely permitted barefoot foot, distress on wall or ground where distress no building concern.`],
  [`peri-megadim:5:_`, `fit to move siman 308 — seal with this pottery Taz; see Levush.`],
  [`peri-megadim:6:א`, `tochen Taz Shach printing error see there.`],
  [`peri-megadim:6:ב`, `what Mechaber s.9 and Yom Tov laundering laws explained later Magen Avraham.`],
  [`peri-megadim:6:ג`, `asked on Yom Tov bathing child hot water, only place dry rags in tub — how?`],
]);

const slugs = ["eliyah-rabbah", "levushei-serad", "machatzit-hashekel", "kaf-hachayyim", "peri-megadim"];
let applied = 0;
const missing = [];
for (const slug of slugs) {
  const f = `output/siman_302/${slug}/part-001.txt`;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const out = blocks.map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    if (!en) {
      missing.push(key);
      return b;
    }
    applied++;
    return { ...b, en };
  });
  fs.writeFileSync(f, out.map(serializeBlock).join("\n\n"), "utf8");
}
console.log("Mid 302:", applied, "missing:", missing.length, missing);
if (missing.length) process.exit(1);
