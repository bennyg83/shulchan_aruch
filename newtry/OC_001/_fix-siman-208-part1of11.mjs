import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const az = "output/siman_208/ateret-zekenim/part-001.txt";
const bh = "output/siman_208/baer-heitev/part-001.txt";
const bhg = "output/siman_208/beer-hagolah/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  10,
  "_",
  `In one me'ein shalosh blessing, etc. — and there is one who wrote that one should not say "ve'al tnuvat hasadeh" on fruits and on wine (Rabeinu Yona); but the text of the Gemara, Rif, Rambam, and Mahararam in Berachot, and likewise in the other poskim, does not distinguish between fruits and the five species regarding tnuvat hasadeh, nor regarding the opening and conclusion — and so ruled Maharshal and my teacher in Bach.`,
);

patch(
  az,
  "ateret-zekenim",
  11,
  "_",
  `But on the land, etc. This is the view of Raavad, R' Yona, and Rosh; but Rambam in chapter 6 writes that on wine one also concludes on the land and on the fruits, like the other seven species, and one should not change except in the opening, but in the conclusion one should not change — and so Tosafot, Mordekhai, Semag in the name of R' Yitzchak, and in Hagahot Semak, and so Mahararam in Berachot — and therefore even l'chatchila one should conclude in the wine blessing on the land and on the fruits (Bach); and at any rate, if he said on the land and on the fruits he has fulfilled (Maharar"i).`,
);

patch(
  az,
  "ateret-zekenim",
  12,
  "_",
  `One mentions in it me'ein [haMe'orei], etc. — that is, before he says "Ki Atah Tov u'Metiv," on Shabbat he says "Vehe'elinu letokha v'samachnu bevinah, ratzah v'hachalitzanu beyom haShabbat hazeh, Ki Atah Hu Hashem Tov u'Metiv," etc.; on Yom Tov he says "V'samachnu bah, Zachreinu letovah beyom chag peloni hazeh"; and on Rosh Chodesh he says "Zachreinu letovah beyom Rosh Chodesh hazeh" (Beit Yosef in the name of Teshuvat HaTashbetz).`,
);

patch(
  az,
  "ateret-zekenim",
  14,
  "_",
  `If one drank wine and blessed borei peri haGefen, etc. — and there is one who wrote specifically that if grapes were not before him at the time of the grape blessing, or they were before him and he did not intend to exempt the grapes as well and he ate the grapes — then he must bless borei peri haEtz; and in the after-blessing, l'chatchila he must include in the blessing on the vine and say "al haGefen ve'al peri haGefen ve'al haEtz ve'al peri haEtz," etc. But if both were before him — grapes and wine — and he blessed on the wine borei peri haGefen and intended to exempt the grapes as well, and likewise in the blessing on the vine if he intended to exempt also for the tree, he has fulfilled b'dieved, even though with borei peri haEtz on grapes he does not fulfill for grapes, since it is inclusive — for grapes are also fruit of the vine (manuscript).`,
);

patch(
  az,
  "ateret-zekenim",
  17,
  "_",
  `But on wine, etc. — and likewise the al haMichya blessing exempts me'ein shalosh, and specifically for wine and dates, because wine also sustains and dates are also weapons of satiation — therefore al haMichya applies to them properly; but it does not exempt the rest of the items from the seven species on which one is obligated to bless me'ein shalosh (Sefer Lechem Rav).`,
);

patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `The five species of grain, etc. — sufganiyot made on Pesach from matzah that is crushed — one blesses borei minei mezonot (in responsum Mahararash Cohen vol. 1 siman 163).`,
);

patch(
  az,
  "ateret-zekenim",
  4,
  "א",
  `When eating wheat, etc. — indeed, in the after-blessing, wheat and barley are equal to bless borei nefashot on both of them (Beit Yosef in the name of Rashba).`,
);

patch(
  az,
  "ateret-zekenim",
  4,
  "ב",
  `And therefore they wrote that one should not eat them, etc. — and therefore one should be careful not to eat wheat or barley, and likewise whole groats cooked, except within the meal, as above.`,
);

patch(
  az,
  "ateret-zekenim",
  7,
  "_",
  `One who chews rice blesses borei peri haAdamah, whether it is raw, whether it is roasted, or cooked and the kernel is whole (see Beit Yosef who afterward had a doubt) — and therefore, because of the doubt, one should not eat whole cooked rice except within the meal (Bach). And the meaning of orez is yerez dochan in Italian "reis" (Maharil daf 115b); and likewise in Aruch it is written orez yerza. And likewise regarding blessing: if one mixed dochan flour and other kinds of legumes with flour of the five species of grain — even when the flour of dochan or other kinds of legumes are the majority — nevertheless one blesses borei minei mezonot and al haMichya (Bach, and likewise is the implication of Rambam).`,
);

patch(
  bh,
  "baer-heitev",
  10,
  "א",
  `<b>Me'ein shalosh.</b> The text of the blessing: Baruch Atah Hashem Elokeinu Melech haOlam, al haMichya ve'al haKalcha ve'al tnuvat hasadeh ve'al eretz chemdah tovah u'rechavah sheratzita vehinchalta laAvoteinu le'echol mipiryah v'lisbua mituvah, rachem Hashem Elokeinu aleinu ve'al Yisrael amekha ve'al Yerushalayim irekha ve'al Tzion mishkan kevodekha ve'al mizbechakha ve'al heichalekha, u'vneh Yerushalayim ir haKodesh bimheirah beyameinu vehe'elinu letokha v'samachnu bah, Ki Atah Hashem tov u'metiv laKol, v'noideh lekha al haAretz ve'al haMichya, Baruch Atah Hashem al haAretz ve'al haMichya ve'al haKalcha. And on fruits he says al haEtz ve'al peri haEtz ve'al tnuvat hasadeh ve'al eretz, etc. And on wine al haGefen ve'al peri haGefen ve'al tnuvat hasadeh ve'al eretz, etc., and concludes on the land and on the fruits — Bach. But the custom is to conclude on the land and on the fruit of the vine.`,
);

patch(
  bh,
  "baer-heitev",
  10,
  "ב",
  `<b>The land.</b> And in chutz la'aretz adjacent to Eretz Yisrael, one need not change the coin of the blessing from doubt lest the fruits be from Eretz Yisrael — and we are not concerned for this — R' Yonah, Magen Avraham. (And in Sefer Eliyahu Rabbah he ruled for practice that if they definitely come from Eretz Yisrael to chutz la'aretz, one blesses on its fruits; and if they definitely come from chutz la'aretz to Eretz Yisrael, one blesses on the fruits; but in a case of doubt, one always blesses on the fruits alone.)`,
);

patch(
  bh,
  "baer-heitev",
  12,
  "א",
  `<b>Me'ein haMe'orei.</b> That is, before he says "Ki Atah Tov u'Metiv." He says "V'samachnu bah, ratzah v'hachalitzanu beyom haShabbat hazeh"; and on Yom Tov he says "V'zachreinu letovah beyom chag peloni hazeh"; and likewise on Rosh Chodesh. And if he did not mention it, he has fulfilled — Magen Avraham.`,
);

patch(
  bh,
  "baer-heitev",
  12,
  "ב",
  `<b>The fruits.</b> And in Mordekhai he wrote to conclude on the land and on the living and on the fruits — and so Agudah, and so it appears to me — Magen Avraham.`,
);

patch(
  bh,
  "baer-heitev",
  13,
  "_",
  `<b>The apples.</b> Even though he concludes on the land and on the fruits as written above in seif 11, nevertheless, since he does not mention fruits in the opening, he has not fulfilled.`,
);

patch(
  bh,
  "baer-heitev",
  14,
  "א",
  `<b>Borei peri haGefen.</b> If he erred and blessed on wine borei peri haEtz, he must return and bless borei peri haGefen — R' Levi; see Magen Avraham, and in responsum Panim Me'irot siman 58 he disagrees and ruled that he has fulfilled — see there.`,
);

patch(
  bh,
  "baer-heitev",
  14,
  "ב",
  `<b>Borei peri haEtz.</b> And if at the time of drinking the wine he intended to exempt the grapes, he is exempt from the grape blessing — Beit Yosef, Magen Avraham, Taz — see there; and see in responsum Panim Me'irot siman 58.`,
);

patch(
  bh,
  "baer-heitev",
  16,
  "א",
  `<b>Borei nefashot.</b> See Mahar"a Halevi in Sefer Gan HaMelech siman 98.`,
);

patch(
  bh,
  "baer-heitev",
  16,
  "ב",
  `<b>Beverages.</b> Specifically, if the other beverages were before him at the time he blessed on the wine — then the wine exempts them from the first blessing, and likewise exempts them from the after-blessing — and see siman 174 seif kaf alef. But where the beverages were not before him at the time he blessed on the wine and he needed to bless on the beverages that come afterward — likewise he must bless after them — Mordekhai. However, where he fixed on the wine, he need not an after-blessing on the beverages — Magen Avraham; and see siman 206 seif 5.`,
);

patch(
  bh,
  "baer-heitev",
  17,
  "א",
  `<b>Exempts him.</b> See in Be'er HaGolah that he wrote to his view that it is forced that certainly deisa is more sustaining than dates, etc. — see there; and so Peri Chadash — that if he blessed shehakol on deisa he has fulfilled — see there. And Magen Avraham wrote that deisa is different from dates and wine, because it has other importance as bread — see there; and see in Ginnat Veradim klal 1 siman 48, and in Halaket vol. 2 siman 154, and in Sefer Avnei HaEzer — see there.`,
);

patch(
  bh,
  "baer-heitev",
  17,
  "ב",
  `<b>Exempts him.</b> And likewise the al haMichya blessing exempts wine and dates — Lechem Rav, Ateret Zekenim.`,
);

patch(
  bh,
  "baer-heitev",
  18,
  "_",
  `<b>That there is doubt.</b> And Taz wrote that b'dieved one may add — see there; and if one ate a fruit and does not know whether it is from the seven species and he has nothing to include in it, he blesses on the tree so that he fulfills either way, as written in seif 13. And on a beverage he should not bless at all afterward, for there is more concern for beracha l'vatala than for his eating without a blessing, since all blessings are d'rabbanan — Magen Avraham.`,
);

patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `<b>Grain.</b> And they are wheat, barley, spelt, oats, and rye; but what we call tetreki are not included.`,
);

patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `<b>Crushed.</b> It implies that initially it discusses when they boiled them without crushing — and it is difficult, for in seif 4 he wrote that when they boiled them with whole kernels one blesses borei peri haAdamah; and it is possible that here it discusses when they boiled them until they were mashed — see Magen Avraham.`,
);

patch(
  bh,
  "baer-heitev",
  3,
  "א",
  `<b>Generally.</b> Taz wrote: apparently it seems that even if the five species are the majority, since they are not for food they have no importance as food to bless borei minei mezonot on them; and even though in other matters we follow the majority, here it is worse, since they are not in the category of food at all, since they are only for binding — and if so, those lekichim that are made for honey and spices — automatically the flour is only for binding; generally one should not bless borei minei mezonot on them. But one should not be lenient in this, since he has significant pleasure in any case from the quantity — and it appears that because of this doubt the Shulchan Aruch wrote here, and it is good to be strict and swallow them within the meal. And in seif 2, when he mentioned that one gives flour to bind and to coat, he did not write there to be strict in this, for there it discusses when the five species are not the majority — then it is clear that they are nullified when they are all for binding; which is not so when there is a majority, as above — end of his words. A food that they make from eggs and sugar — and when they put it on the fire they put flour in it — it appears that it is nullified relative to the eggs and sugar, for one does not put flour into it except to bind and coat it, and one blesses on it only shehakol. But from what the Rav Peri Chadash wrote in Yoreh De'ah siman 112 seif kaf zayin on kipti — meaning that they take grape juice and boil it on the fire and mix flour with it and it thickens, and the grape juice is greater than the flour — that one blesses borei minei mezonot, since aside from what binds and coats the mixture, it also makes it fit and prepares it for eating — see there; and so in his book Mayim Chaim in his responsum there siman 8 — see there. And so Mahar"a Yitzchaki in his responsum Zera Avraham siman 11 — if so, likewise here too, since aside from what binds it makes it fit for eating, one blesses borei minei mezonot. And regarding the after-blessing, Peri Chadash wrote there in his responsum that he blesses me'ein shalosh; and Mahar"a Yitzchaki wrote in his responsum there that if he ate a measure such that there is in it a k'zayit of grain within kedei achilat pras, he blesses me'ein shalosh, and if not he blesses borei nefashot — see Yad Aharon. According to this, there is no doubt in lekichim, and according to all one blesses borei minei mezonot and afterward me'ein shalosh — and not like Taz.`,
);

patch(
  bh,
  "baer-heitev",
  3,
  "ב",
  `<b>The meal.</b> Taz wrote: I wonder why they wrote that one eats them within the meal — why did they not say that one should bless shehakol on them? For on shehakol that he said shehakol, he has fulfilled. And it appears to me that here there is doubt because of the after-blessing — for if he would need to bless borei minei mezonot, he would need to bless afterward me'ein shalosh; and in the after-blessing one may say only as it was enacted — therefore he wrote that one should eat it within the meal. According to this, if one wants to eat this thing, and likewise lekichim less than a k'zayit and then he need not an after-blessing — he says shehakol before it and nothing afterward, and he need not [eat it] within the meal — see there; and according to what is written in the seif kaf preceding this, there is no doubt in lekichim, and one always blesses borei minei mezonot.`,
);

patch(
  bh,
  "baer-heitev",
  3,
  "ג",
  `<b>And exempt.</b> From it — thus it should read.`,
);

patch(
  bh,
  "baer-heitev",
  4,
  "א",
  `<b>Grain.</b> All five species are included.`,
);

patch(
  bh,
  "baer-heitev",
  4,
  "ב",
  `<b>Within the meal.</b> Therefore one should be careful not to eat wheat or barley, and likewise whole groats cooked, except within the meal, because of doubt regarding the after-blessing. And if it happened that they ate them not within the meal, one blesses after them borei nefashot. And so Kenesset HaGedolah; and see in responsum Ginnat Veradim klal 1 siman 16. And this is specifically when they were not stuck together through cooking; but if they were stuck together through cooking, or crushed in a mill, one blesses borei minei mezonot — and specifically when they were well mashed — see Magen Avraham. If they make a dish from oats that they call gretz groats and put in them much water such that they are fit only for porridge that they call zofa — the water is not nullified relative to the kernels, and one must bless on the kernels borei peri haAdamah and on the water separately shehakol, for their essence is on account of the water; and nevertheless the kernels are not nullified in the sauce, since the five species are important — Magen Avraham. And see in Sefer Even HaEzer that he proved from the Gemara that on chewing whole living barley one does not bless at all, per the ruling of Radbaz brought in Beit Yosef; and he also disputes regarding the law of the oat dish.`,
);

patch(
  bh,
  "baer-heitev",
  6,
  "_",
  `<b>For eating</b> <b>and for chewing it.</b> It implies that if it is not fit for chewing it — even if it is thick — one blesses shehakol; and afterward he says if it is fit for drinking, etc. — it implies that if it is thick one blesses borei minei mezonot; and so is primary, and so is implied in the Gemara that on thick one blesses borei minei mezonot — Magen Avraham; and see further in Magen Avraham siman 205 seif kaf vav.`,
);

patch(
  bh,
  "baer-heitev",
  7,
  "א",
  `<b>The rice.</b> Rice is reis, and dochan is yeriz. And some say the reverse — therefore one should not eat them when they are mashed except within the meal. And if one ate them without a meal, one blesses on both of them shehakol, from doubt — Shelah, Bach. And Taz wrote: since in any case there are no me'ein shalosh blessings in these, and there is no doubt here except regarding the first blessing whether it should be shehakol or borei minei mezonot — one should bless on reis and yeriz shehakol and afterward borei nefashot. And groats made from barley crushed in a mill and cooked — it is obvious that one blesses borei minei mezonot and afterward me'ein shalosh, for they are from the five species; and those made from tetreki, which are not from the five species — one blesses shehakol and borei nefashot — and this is simple.`,
);

patch(
  bh,
  "baer-heitev",
  7,
  "ב",
  `<b>When mashed.</b> See Taz and Magen Avraham. (And in Sefer Eliyahu Rabbah he wrote that there is no distinction in rice between mashed or actually whole; and therefore the Shulchan Aruch wrote it without distinction between mashed or not — and so Bach agreed — see there.)`,
);

patch(
  bh,
  "baer-heitev",
  8,
  "_",
  `<b>Completely mashed.</b> Specifically when they were mashed through a perforated vessel such that they are very thin, or that one made a dish from legume flour; but when one mashed them in a spoon — which is the primary way of eating them thus — and the kernel remains, one blesses borei peri haAdamah — Magen Avraham and Shelah.`,
);

patch(
  bh,
  "baer-heitev",
  9,
  "_",
  `<b>Dochan, etc.</b> See Magen Avraham and in Perach Shoshan klal 1 siman 50.`,
);

patch(bhg, "beer-hagolah", 1, "_", `Berachot 44.`);
patch(bhg, "beer-hagolah", 10, "א", `Berachot 44.`);
patch(bhg, "beer-hagolah", 10, "ב", `Rashbam there.`);
patch(bhg, "beer-hagolah", 11, "_", `R' Yona, Rosh, and Raavad.`);
patch(
  bhg,
  "beer-hagolah",
  12,
  "א",
  `Tosafot in Berachot 44 in the name of Sefer HaMeimon and Yerushalmi, and so wrote R' Yona, Rosh, and the other poskim.`,
);

const PATCH_COUNT = 38;
console.log(`ok siman 208 part 1 of 11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part1of11.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
