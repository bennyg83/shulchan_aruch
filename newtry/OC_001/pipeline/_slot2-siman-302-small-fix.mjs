#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `ateret-zekenim:3:_`,
    `Some say etc. — Rosh ruled new tallitot permitted fold on Yom Tov erev Shabbat when made eruv tavshilin, all the more Shabbat eve; specifically new hard, folding not needed; not old quick to wrinkle, folding is repair (Maharshal).`,
  ],
  [`dagul-merevavah:1:_`, `Nevertheless not obligated unless etc.`],
  [
    `chokhmat-shlomo:1:_`,
    `Seif 9: permitted put water on shoe to rinse etc. Mishna Berurah: I saw Rambam Hilchot Mezuzah ch. 8 halacha 1 wrote on hard leather no laundering needed; Lechem Mishneh wondered since Rambam ruled there like first Tanna not others Menachot 95a, should divide Shabbat too — why Hilchot Shabbat stam forbids launder shoe, left requires study. To my understanding: hard leather reason not negative commandment of laundering on them, rather laundering applies but not garment; Torah wrote garment and leather, leather not garment — know Menachot ch. 4 "of leather and its wing of garment exempt" proves leather not garment; therefore Scripture expanded chatas even leather needs laundering — only novelty soft; hard not garment, initially Menachot proves no laundering because not subject to laundering, as thought Rava derived shoe Shabbat permitted launder, proves leather not subject to laundering, therefore explains reason not subject; but is garment and truly liable tzitzit; but per Rava establishes amora and derives shoe forbidden launder Shabbat — why not say briefly law like first Tanna or others — proves Shabbat different: truly subject to laundering, only first Tanna reason not garment, Scripture revealed soft not hard; therefore tzitzit no expansion all leather not garment exempt tzitzit; chatas difference soft/hard; Shabbat all cases forbidden for Shabbat depends on subject to laundering — comes out well, examine well.`,
  ],
  [
    `shaarei-teshuvah:6:_`,
    `On that day — Avodat HaTodah; see Mishna Berurah: even if bed path between two houses from eating house to sitting house — permitted spread eating room for Shabbat honor; but if their way passes there — not.`,
  ],
  [`netiv-chayim:1:_`, `(Magen Avraham s.k. 5) and Beit Shammai. Mishna Berurah: in Kuntres Be'er Mayim Chayim siman 5 see there.`],
  [
    `netiv-chayim:2:_`,
    `(In Magen Avraham s.k. 18) nevertheless be stringent Mishna Berurah; to my humble opinion what Shulchan Aruch forbids specifically on leather, but not on cloth, and with moist mud permitted for all views.`,
  ],
  [
    `rabbi-akiva-eiger:1:_`,
    `Magen Avraham s.k. 4 — therefore one entangled thus is Rambam ch. 22 halacha 24, and it is from Yerushalmi.`,
  ],
  [
    `rabbi-akiva-eiger:2:_`,
    `Magen Avraham s.k. 5 — in Sefer HaZichronit wrote appears Mechaber also holds so, for he wrote "but if he removed them" implies l'chatchila forbidden.`,
  ],
  [
    `rabbi-akiva-eiger:3:_`,
    `Magen Avraham s.k. 6 — do not spread beds Shabbat to weekday even if Yom Tov; but Yom Tov to Shabbat, even without eruv tavshilin, for R' Yehudah holds spread Yom Kippur to Shabbat because Shabbat holiness stricter; not Shabbat to Yom Kippur; holds there Shabbat offerings on Yom Kippur except Ra'avad disputes both equal, Shabbat offerings not on Yom Kippur; implies also no spread Yom Kippur to Shabbat; nevertheless since Shabbat certainly stricter than Yom Tov and Shabbat offerings on Yom Tov — learn spread Yom Tov to Shabbat as R' Yehudah permits Yom Kippur to Shabbat as I wrote; later saw Ateret Zekenim s.k. 8 Maharshal ruled from Maharash: new tallitot permitted fold Yom Tov on erev Shabbat with eruv tavshilin; to me without eruv also permitted like Yom Kippur to Shabbat per R' Yishmael; and see gloss siman 528 Magen Avraham s.b. and siman 567.`,
  ],
  [
    `rabbi-akiva-eiger:4:_`,
    `Magen Avraham s.k. 7 — even if permitted erev Shabbat means if partially permitted erev Shabbat per R' Yehudah mishnah permitting entirely and remove — first Tanna forbids decree lest not permitted at all erev Shabbat and come permit Shabbat; but if entirely permitted erev Shabbat in matter can remove without any permit — truly permitted, no decree; reason Rambam muktzeh explained: if removing what muktzeh movement here, even if press shakes nevertheless kele'achar yad for permitted need as I wrote.`,
  ],
  [
    `rabbi-akiva-eiger:5:_`,
    `Seif 7 — dry forbidden as tochen; apparently argue since separated was crumbled and by drying stuck together — no grinding after grinding as below siman 321 s.8 in gloss.`,
  ],
  [
    `yad-ephraim:1:_`,
    `Magen Avraham s.k. 5 — if not particular about them, likewise in Kenesset HaGedolah; word "not" is printing error or should read "if not" that not particular; see Sh.A. Hagahot Maimoniyot body wrote to my heart lean stringent; nevertheless never liable until matter he is particular see there.`,
  ],
  [
    `yad-ephraim:2:_`,
    `Magen Avraham s.k. 17 — peels leather etc.; to my humble opinion possibly only scraping forbidden; Maharil wiped gently lest dirty mud come to synagogue.`,
  ],
  [
    `yad-ephraim:3:_`,
    `There s.k. 27 — nevertheless needs as stated, circled in margin; see responsa Maharam 4 sections where should teach those words; anyway needs; one who emended thus to resolve language; not so, only emend as Teshuvot HaRashbatz small siman 28: because hands dirty, even clean hands Maharam says must dry etc. see there; what circled (Mishna Berurah) also printing error.`,
  ],
]);

const files = [
  "output/siman_302/ateret-zekenim/part-001.txt",
  "output/siman_302/dagul-merevavah/part-001.txt",
  "output/siman_302/chokhmat-shlomo/part-001.txt",
  "output/siman_302/shaarei-teshuvah/part-001.txt",
  "output/siman_302/netiv-chayim/part-001.txt",
  "output/siman_302/rabbi-akiva-eiger/part-001.txt",
  "output/siman_302/yad-ephraim/part-001.txt",
];

let applied = 0;
const missing = [];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  for (const b of blocks) {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    if (!en) {
      missing.push(key);
      continue;
    }
    b.en = en;
    applied++;
  }
  fs.writeFileSync(f, blocks.map(serializeBlock).join("\n\n"), "utf8");
}
console.log("Small 302:", applied, "missing:", missing.length, missing);
if (missing.length) process.exit(1);
