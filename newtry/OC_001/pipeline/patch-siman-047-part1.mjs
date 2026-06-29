#!/usr/bin/env node
/** Apply part 1/6 editorial English for siman 47 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

const EN = {
  "ateret-zekenim|13|_": `Similarly, etc. Thus wrote the Rosh at the end of the first chapter of Berachos; but the Mordechai there writes that Maharam says one need not bless, because yesterday's birchas haTorah exempts until the next dawn. And thus wrote Beit Yosef; and Tosafos in the name of Rabbeinu Tam wrote that it is not clear; and similarly Maharam in his rulings siman 123; and similarly Agur, that all poskim disagree with Rabbeinu Tam, and so the world practices. And when one goes to synagogue one need not return and bless; however the sheliach tzibur who descends before the ark may return and bless in order to discharge the obligation of the many.`,

  "ateret-zekenim|14|_": `Women, etc.: for although they are exempt from the Oral Torah, nevertheless Written Torah they are obligated. (Beit Yosef — see Yoreh De'ah siman 246 seif 3.)`,

  "ateret-zekenim|6|_": `And one must say: and our offspring, and the offspring of our offspring, and the offspring of your people the House of Israel — and so they practice. And one must say: students of Your Torah for its sake — such is the version of the Rif. And always the prayer of the father and mother should be ingrained in their mouths to pray for their seed that they be students of Torah and righteous ones and people of good character. And one should have great kavanah in the blessing Ahavah Rabbah, and likewise in birchas haTorah when saying: and may we and our descendants, etc. And likewise in the prayer Uva leTziyon Go'el when saying: so that we will not toil in vain and not give birth to panic — in all these places one should make one's prayer fixed regarding one's children that they be students of Torah, etc. And see Midrash Tanchuma on the verse: trust in Hashem and do good, etc.`,

  "ateret-zekenim|9|_": `Some say that if, in fact, Ahavah Rabbah is not the main blessing for birchas haTorah, then it exempts only if one studies immediately without interruption; but birchas haTorah exempts for the entire day even if one did not study after the morning prayer, only until midday. (Mordechai, end of first chapter of Berachos; Hagahos Rambam; and such is the view of Tosafos, Rabbeinu Yonah, Rabbeinu Yeruham, and the Rosh; and the Tur may be explained accordingly.)`,

  "baer-heitev|1|_": `<b>To be careful.</b> If birchas haTorah is d'oraisa or d'rabbanan — see in Sefer Penei Moshe part 1 siman 1, and Peri Chadash in the name of the poskim that it is d'oraisa; and from this emerges that if he was uncertain whether he blessed or not, he repeats and blesses all the blessings, even though d'oraisa there is only one blessing. Yad Aharon. <small>(And see in Eliyah Rabbah the prayer one should say before birchas haTorah.)</small>`,

  "baer-heitev|10|_": `<b>To return and study.</b> It implies that one whose custom is not to study and who reconsidered to study must bless. Magen Avraham and Taz rule that even one whose custom is not to study need not bless. See there, and see Peri Chadash and what Yad Aharon wrote on it.`,

  "baer-heitev|11|_": `<b>They practiced.</b> Some wrote that his teacher Mahari Ginzburg used to bless when he slept during the day. Magen Avraham.`,

  "baer-heitev|12|_": `<b>He slept.</b> And if he remained awake all night, as he stayed today — he must bless, for he did not have intention to be exempt only for one day. Magen Avraham.`,

  "baer-heitev|13|_": `<b>Understanding.</b> And in the writings and in the Zohar it states that one may say immediately after midnight: who gives understanding to the rooster. And Magen Avraham wrote, and it seems to me: specifically if he heard the crowing of a rooster; and nevertheless it is good to be careful l'chatchila. And Olas Tamid wrote that b'dieved he fulfilled his obligation and need not return and bless by day.`,

  "baer-heitev|14|_": `<b>The Torah.</b> For she is obligated to study their laws, and also to recite parashat korbanot as she is obligated in prayer; if so the blessing applies to this. Beit Yosef.`,

  "baer-heitev|2|_": `<b>Words of Torah.</b> And specifically when writing books for himself in the manner of his study and understands what he writes; but a scribe who copies a book and does not seek to understand what he writes need not bless; and likewise if he writes a letter of greetings — even if he writes some verses — need not bless. Magen Avraham and Taz.`,

  "baer-heitev|3|_": `<b>To bless.</b> For hirhur (thought) is not like speech. Accordingly one should be careful that those who study in depth from a book should take care to utter some words of Torah orally after the blessing.`,

  "baer-heitev|4|_": `<b>Our son.</b> It is written in the Rambam's letter that a convert may also bless thus. Magen Avraham — see there. And one must say: students of Your Torah for its sake (Bach, and Knesset HaGedolah); and one should intend in prayer for his children that they be learners, and likewise in "that we not toil in vain" and "not give birth to panic."`,

  "baer-heitev|5|_": `<b>And vav.</b> For it is one blessing — for if it were a separate blessing it would open with Baruch; and although it is adjacent to its companion, nevertheless since they are short blessings it should need to open with Baruch, as with the havdalah blessing which opens with Baruch although they are adjacent, since they are short; and some hold havdalah blessings are not adjacent because one may say each separately. See Magen Avraham.`,

  "baer-heitev|6|_": `<b>With vav.</b> For thereby we fulfill all opinions; but if you say without vav, behold VeHa'erev Na is a separate blessing and there is an interruption for that opinion which holds it is one blessing; and the Ari z"l used to say it is a separate blessing and would answer Amen after "to engage in words of Torah," and nevertheless he would say VeHa'erev with vav (Nigleh uMitzvah). And likewise Yad Aharon, unlike Peri Chadash — see Levushei Serad siman 83 letter Pe-Gimmel: one should answer Amen after "to engage in words of Torah" — it is uncertain (see Knesset HaGedolah). And in responsum of Mateh Yosef part 2 siman 60.`,

  "baer-heitev|7|_": `<b>Immediately.</b> Then it exempts study for the entire day; and specifically with Ahavah Rabbah must one study immediately, for it is not the main blessing for birchas haTorah but was instituted for Shema. But the blessings "who chose us" and "to engage in Torah" which were instituted as main for birchas haTorah exempt for the entire day. Ri and Taz.`,

  "baer-heitev|8|_": `<b>Shema.</b> One may say that Shema is like words of prayer; and Beit Yosef proved this reasoning from the Yerushalmi that ruled, and which is taught elsewhere. R' Levi: if he studies immediately — behold in any case he learns Torah in what he reads in Shema; but certainly it is not like words of Torah.`,

  "baer-heitev|9|_": `<b>The Torah.</b> And it is permitted to say it even before light of morning — not like Maharshal who forbids because there is no nesiat kapayim at night, for we say it on account of study and not on account of nesiat kapayim. Magen Avraham.`,

  "beer-hagolah|1|_": `Nedarim, chapter 1`,

  "beer-hagolah|10|_": `Rosh and R' Yitzchak in the name of Rabbeinu Tam`,

  "beer-hagolah|11|א": `Tur in the name of his father's responsum — the Rosh`,

  "beer-hagolah|11|ב": `Agur in his father's name`,

  "beer-hagolah|11|ג": `Beit Yosef`,

  "beer-hagolah|12|_": `there (same source)`,

  "beer-hagolah|13|א": `Tur in his father's name and in responsum, section 4`,

  "beer-hagolah|13|ב": `there (same source)`,

  "beer-hagolah|14|_": `Agur in the name of Maharil`,

  "beer-hagolah|2|_": `Berachos 11`,

  "beer-hagolah|3|_": `Ravad (source cited)`,

  "beer-hagolah|4|_": `Agur and Tosafos in chapter 3 of Berachos`,

  "beer-hagolah|5|_": `Rambam, chapter 7 of Laws of Tefillah; and R' Eliyahu Mizrachi wrote, and the Tur that one should say to engage in words of Torah — and such is the Ashkenazi and Sephardi nusach.`,

  "beer-hagolah|6|_": `Tosafos in chapter 7 of Berachos and chapter 10 of Pesachim and first chapter of Kesubos in the name of Rabbeinu Tam and the Rosh at the end of the first chapter of Berachos`,

  "beer-hagolah|7|א": `Berachos 11`,

  "beer-hagolah|7|ב": `Yerushalmi there:`,

  "beer-hagolah|8|_": `Beit Yosef for the second answer`,

  "beer-hagolah|9|א": `Ri, Rabbeinu Yonah, and Mordechai`,
};

function patchFile(rel, updates) {
  const fp = path.join(OUT, rel);
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.slug}|${b.seif}|${b.marker}`;
    if (updates[key]) {
      b.en = updates[key];
      n++;
    }
  }
  const out = blocks.map((b) => serializeBlock(b)).join("\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  return n;
}

const byFile = {};
for (const [key, en] of Object.entries(EN)) {
  const [slug] = key.split("|");
  const rel =
    slug === "ateret-zekenim"
      ? "siman_047/ateret-zekenim/part-001.txt"
      : slug === "baer-heitev"
        ? "siman_047/baer-heitev/part-001.txt"
        : slug === "beer-hagolah"
          ? "siman_047/beer-hagolah/part-001.txt"
          : null;
  if (!rel) continue;
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][key] = en;
}

let total = 0;
for (const [rel, updates] of Object.entries(byFile)) {
  const c = patchFile(rel, updates);
  console.log(`${rel}: ${c} block(s)`);
  total += c;
}
console.log(`Total patched: ${total}`);
if (total !== Object.keys(EN).length) {
  console.error(`Expected ${Object.keys(EN).length}, patched ${total}`);
  process.exit(1);
}
