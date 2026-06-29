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

const pm = "output/siman_206/peri-megadim/part-001.txt";
const rae = "output/siman_206/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_206/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_206/turei-zahav/part-001.txt";

patch(
  pm,
  "peri-megadim",
  4,
  "_",
  `<b>And see above siman 74.</b> Ateret Zekenim showed there in sign 4, and Magen Avraham explained that regarding a woman too there is concern of ervah, and therefore we require pressing to the ground; but her heart seeing ervah has no bearing on her — therefore in water, when her hair is covered, it is permitted even though her heart is also in the water, for she has no concern that her heart sees her nakedness, etc. And the Mechaber wrote it is forbidden to bless naked, and a woman, etc., and even if he is not naked, etc. Regarding a man who is naked — his nakedness: even though his whole body and heart are covered, it is forbidden if all his hair is exposed. And regarding a woman, pressing to the ground helps so she not be in ervah; but not regarding a man, for it is impossible to cover his nakedness with the ground, etc. But the dress changed — and even if he is not naked, etc. But regarding a woman it implies that a woman too leaves concern that her heart sees her nakedness, and pressing to the ground helps for this too — see there on this:`,
);
patch(
  pm,
  "peri-megadim",
  5,
  "_",
  `<b>Required.</b> Ateret Zekenim siman 272 in Tur — likewise see there in Beit Yosef, and if God wills in Ohr L'ahavah siman 266 this will be explained:`,
);
patch(
  pm,
  "peri-megadim",
  6,
  "א",
  `<b>He blessed.</b> Ateret Zekenim: I did not understand this, for Beit Yosef here wrote exactly as Kol Bo perek 4 halachah 10 writes. And I am compelled to copy the Yerushalmi and what needs to be explained in it:`,
);
patch(
  pm,
  "peri-megadim",
  6,
  "ב",
  `<b>We recite</b> in Yerushalmi chapter How does one bless, halachah 1 (Beit Yosef brought it): Rabbi Zerikan said in the name of Rabbi Zeira: One who takes lupine and blesses on it and it fell from his hand — what is the law? Does he bless on it a second time? They taught: What is the difference between this and emet hamayim? They said there: Because his mind was from the outset — but here, his mind was not from the outset. Rabbah the son of Chana taught: One does not bless on bread except at the hour that one breaks it. Rabbi Chiya bar Abba said: This one said — one who takes a cake and blesses on it and it did not come to his hand — he must bless on it a second time — end of his words. And there are three explanations in this: The first is the explanation of the Rosh that Beit Yosef brought — they asked the resolution of what Rabbah the son of Chana taught "one does not bless until one breaks" lest it fall — if so it is clear that one who takes lupine and it fell requires blessing a second time, and this is what Rabbi Chiya bar Abba said "this one said" — meaning they asked the resolution and one need not do kal vachomer. The second is the explanation of Shibolei HaLeket in the name of Rav Nissim Gaon — they asked not the resolution but nevertheless ruled stringently as is usual that a prohibition is ruled stringently (and I do not know [why], for rabbinic blessings; on the contrary there is stringency of not taking God's name in vain — see responsum 216) — and what Rabbah the son of Chana taught "one does not bless until one breaks" is a separate matter on account of interruption, and Rabbi Chiya bar Abba said "this one said" — a cake that did not come to his hand because it was delayed (more than 24?) — he must bless a second time. The third is the explanation of Beit Yosef — Rabbah the son of Chana taught that one does not bless until one breaks lest the slice fall, and they asked the resolution of lupine, and Rabbi Chiya bar Abba said "this one said" — this one who takes a cake and blesses on it and it did not come to his hand — blesses a second time — is a different matter that one learns from this: one who now takes a cake (dried cake and the like) and blesses on them — meaning he already blessed but the cake did not come to his hand at the time he blessed — he must bless a second time when it is brought before him. And what was said here in seif 5 "one does not bless until they bring before him" — and one must do per this explanation kal vachomer — see there. And I do not see how to learn this from that and say they are equivalent — from where do we know? And it is possible the explanation is: since Rabbah the son of Chana taught "one does not bless" etc. and they asked the resolution, therefore emet hamayim must be distinguished — there his mind was from the outset, and automatically since you must distinguish thus we say that everything that is not before him he blesses again, and emet hamayim — because his mind was from the outset — for he knows the first waters at the time he blesses will go to him and he knows the second will certainly come — thus it appears to explain. And even though the Mechaber in Beit Yosef Tur brought Shibolei HaLeket's words — from where do we learn to explain further as seif 5? See Drisha — perhaps above for l'chatchila he said but b'dieved one does not return and bless again as Magen Avraham wrote in sign 4, and for l'chatchila it is reasoning and not derived from Yerushalmi — for that [Yerushalmi] is regarding that one does not bless until they bring before him, and b'dieved one returns and blesses; and even if his mind was from the outset on these fruits that he sent a messenger to the market lest an accident occur and they not bring him — b'dieved. And preserve this for you will need it again in signs 8 and 9 as we must say there if God wills, and in siman 140 in Magen Avraham sign 4 — and therefore he did not decide there that silence is not interruption on account of lupine — and one may explain see there well:`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Seif 1: If he said shehakol he fulfilled; and the final blessing on something whose blessings are of three kinds — if he blessed borei neirot — whether he fulfilled, see responsum Giovannini siman 15, and see Magen Avraham siman 208 and siman 211.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `Seif 2: And he intended to exempt — see Taz siman 208 seif 7.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  3,
  "_",
  `Magen Avraham sign 4 wrote that Abudraham disagrees. See responsum Perach Shoshan who wrote to distinguish that there the delay was for the sake of reading — to unroll and read.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  4,
  "_",
  `Seif 3 in Hagah: More than k'dei dibur — that is silence; but speech in any matter is interruption and it is forbidden to answer amen or Kaddish and Kedushah, and if he answered it depends on the dispute of Taz and Magen Avraham above siman 25 seif 10, Eshel Avraham siman 51 sign 6.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  5,
  "_",
  `Seif 5: He need not bless — there were before him several species whose blessings are equal and his mind was to eat all of them, but when he blessed on one he did not know that the other species too have blessings equal to this one, and it was in his mind that they would not be discharged by this blessing — this requires further study if he must return and bless on the others; see Tevuot Shor yud seif 19.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  6,
  "_",
  `Seif 6 in Hagah: Only that his mind was not on it. If he took a cup of wine before the meal to drink and his mind was to drink also during the meal and the cup spilled — one may say that per those who hold above siman 174 that bread discharges beverages during the meal — if so the blessing was not at all on the wine during the meal and he must return and bless when he drinks before the meal; see in Tosafot Shabbat below seif 471.`,
);

patch(
  st,
  "shaarei-teshuvah",
  1,
  "_",
  `(•) In Shulchan Aruch seif 1: he blessed on tree fruits with borei peri haAdamah — he fulfilled, etc.; and see Rishon Letzion who wrote that the blessing shehakol — we do not hold like Rabbi Yehuda except b'dieved; and in Bach he wrote that with borei peri haAdamah it is preferable as more explicit; and see in Shaagat Aryeh siman 23 who discussed whether it is fitting for one who fears Heaven to be concerned l'chatchila with the wording of old manuscripts in Rambam who rules he did not fulfill, and the practical difference: if he is in doubt whether to bless borei peri haEtz or borei peri haAdamah he should not bless borei peri haAdamah out of doubt; and he raised that the primary text in Rambam as Kesef Mishneh wrote is that he fulfilled; and he also brought proof from that which Ula said "dispute in their blessings equal," etc. — that Ula holds like Rabbi Yehuda that he fulfilled — see there. In Shulchan Aruch seif 2: and he intended to discharge borei peri haEtz — he fulfilled; see Magen Avraham who showed a place for siman 211 that l'chatchila one should not do so, and likewise in Ateret Zekenim — see there.<br> (1) He did not fulfill. Baer Heitev; and see in Yad Ephraim what he wrote on the words of Ezer MiKodesh — that regarding if the fruit is not the primary fruit there is no proof from caper, only regarding the fruit not being finished there is fine proof from boser; and likewise in R' Akiva Eiger he did not write only regarding finishing the fruit — see there; and see in Bach who rejected also this proof from boser, for nevertheless borei peri haAdamah is more correct than borei peri haEtz, for its meaning is that this is the primary fruit; but in any case b'dieved even with borei peri haEtz he fulfilled. And what was written in Panim Me'irot siman 58 — that on boser and its kind one should bless borei peri haEtz to fulfill Rambam — that is, the correct text in Rambam as Kesef Mishneh wrote that if he blessed borei peri haAdamah on borei peri haEtz he fulfilled — see there; and see there in Peri Megadim that if on ground fruits that are better cooked than raw, that we rule to bless shehakol — if he blessed borei peri haAdamah he fulfilled b'dieved — see there; and it is obvious that the same applies in reverse: those that are better raw than cooked, and he blessed after cooking borei peri haAdamah — he fulfilled; and it appears that if he is in doubt whether this fruit is better raw than cooked or the reverse, he should bless borei peri haAdamah whether before cooking or after, since b'dieved he fulfilled; and even though with shehakol too b'dieved he fulfilled, nevertheless with borei peri haAdamah it is more explicit, as was said above in the name of Bach; and what was written in siman 204 regarding one in doubt about his blessing shehakol — that is when in doubt whether to bless borei peri haAdamah or borei peri haEtz he does not fulfill even b'dieved; but in this case borei peri haAdamah is preferable since b'dieved he fulfilled. And see in Taz who wrote why Shulchan Aruch specified "they were before him" — that even if his mind was on them the law is as below seif 5; and in Shaagat Aryeh siman 27 he wrote that he exaggerated in his words — that there the blessings are equal with borei peri haEtz; but also if they were before him it appears from Rashi and Tosafot that the blessing on cucumber does not discharge the olive, and he rules like Rashi that it is not effective to discharge in Beit Yosef, and one must bless on that of the tree with borei peri haEtz — see there. And see in Rabbeinu Yonah who brought the words of Shaagat Aryeh and wrote to reconcile the sugya per the view of Shulchan Aruch — and it is reasonable his reason: since he blessed borei peri haAdamah on borei peri haEtz b'dieved he fulfilled — if so, when he has borei peri haAdamah in hand and intends explicitly to discharge borei peri haEtz — he fulfilled, for great is the power of intention; and see there who wrote that the words of Rabbenu Yona teach explicitly like Taz; and likewise in the commentary in Kol Bo; and likewise in Orchot Chaim — that is the view of Rashba; and likewise the view of Mordekhai in Darkei Moshe as Shulchan Aruch; and likewise Perach in Lekutim. And it appears that if they were before him he should not return and encircle, per the words of Shulchan Aruch that doubt in blessings is decided leniently; and l'chatchila he should resolve not to eat borei peri haEtz immediately, for there is no beracha levatala here since his main blessing on borei peri haAdamah was fulfilled; and likewise if they were not before him it is fitting to do so to remove himself from the dispute. And see in R' Akiva Eiger — it is clear that intention is required — but unspecified, even if both were before him, he did not discharge borei peri haAdamah on borei peri haEtz — see there — thus is Taz's difficulty resolved; and likewise in Peri Megadim ch. 1 siman 58 he wrote there; and if before him something whose blessing is shehakol and something whose blessing is borei peri haEtz or adamah, and he erred and blessed shehakol first — he is not discharged for tree or adamah without intention; and greater than this: even regarding something whose blessings are equal, Beit Yosef wrote in the name of Rashba, etc. — if so, even when he blessed shehakol he must return and bless on each species its proper blessing; and see in responsum Rivash siman 384 in the middle of the answer there he wrote: "And who can say regarding kasher meat and cheese whose blessings are equal, that if he blessed on the cheese he must return and bless on the meat because he cannot eat them together due to prohibition," etc. — see there. And it appears that this is when intending, or even when unspecified, since his mind was to eat the meat too after rinsing and washing — for otherwise in any case it would be a resolution:`,
);
patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `<b>Speech.</b> Baer Heitev; and see what he wrote afterward in Turei Zahav siman 19 sign 2, and it is clear there that if he forgot and ate without blessing he has no [basis] to bless within k'dei of eating; and see there who brought from above siman 172 — and this requires further study, for Rama wrote there that the main thing is that he bless, and that is after swallowing the beverages — if so, also when he forgot and ate it is possible that it helps to bless within k'dei. And it appears that if still before him more of that species he should be quick to bless within k'dei of the eating that he ate, and he will eat again afterward from what is before him too; and likewise regarding beverages, above siman 172, one should do so; and see in Magen Avraham that between blessing and eating he should not ask shalom, even a disciple to his rabbi — and it is not comparable to the blessing of Shema — see there; and likewise he should not respond, since there is concern of beracha levatala when he interrupts with speech; and see in Turei Zahav siman 13 that speech, even one word that is not for the sake of the eating on which he blesses, is interruption and requires another blessing — see there:`,
);
patch(
  st,
  "shaarei-teshuvah",
  4,
  "_",
  `<b>He need not bless.</b> Baer Heitev; and see Turei Zahav siman 19; Magen Avraham 14; what he wrote on this; and see there sign 33 — if they brought before him thirty nuts or apples and his mind was to eat them all, and he errs in his mind thinking he must bless on each one separately — when the truth becomes known to him he need not bless again, for it is not comparable to a resolution where it was not in his mind to eat and eating was renewed for him; but here nothing was renewed for him — why should he bless? — see there; and see in responsum Maharam Galanti, and they brought it in R' Akiva Eiger — see there:`,
);
patch(
  st,
  "shaarei-teshuvah",
  5,
  "_",
  `<b>On him.</b> Baer Heitev; and see what was written above siman 208:`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `<b>And even on bread and wine.</b> They cause many blessings for themselves in Kiddush and Havdalah and the blessing of grooms:`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `<b>They were before him — fruits.</b> It is wondrous to me why it should need to be before him — behold, he wrote in seif 5: if he blessed on fruits before him and they brought him more of another species whose blessing is like the blessing of the first, he need not bless; and here too is the blessing of tree fruit like the fruit of the earth — that if he intended in his saying borei peri haAdamah also on tree fruit, he need not bless afterward on borei peri haEtz; and this law is from the words of R' Yitzchak ibn Ghiyyat that Beit Yosef brings, and it is clear in the words of R' Yitzchak ibn Ghiyyat that he deals when they brought tree fruit before him afterward — that is, after he blessed borei peri haAdamah on fruit of the earth; and likewise one may learn from the words of Rashba that Beit Yosef brings, and these are his words: if one eats apples and blessed on them, and afterward they brought nuts before him — if the apples are dearer to him he discharges the nuts by the drag of the blessing on the apples; but if they are not dearer to him the nuts do not discharge unless he intended for them from the outset — end of his words; learn from this that when he intends he discharges even if they brought before him after the blessing on the apples; and the same law applies here regarding borei peri haEtz after fruit of the earth, since he fulfilled with it; and see seif 5:`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "א",
  `<b>More than k'dei dibur.</b> He explains k'dei dibur as the measure of a student's greeting to his rabbi — that is, "Shalom aleikha rabbi u'mori:"`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "ב",
  `<b>And see above siman 74.</b> See there, and in Yoreh De'ah siman 200:`,
);
patch(
  tz,
  "turei-zahav",
  4,
  "_",
  `<b>He must hold it in his right hand.</b> For this reason in Magen Avraham he holds the cup in his right hand and points to heaven with his left, and afterward switches, as explained in siman 212:`,
);
patch(
  tz,
  "turei-zahav",
  5,
  "א",
  `<b>He blessed and afterward they brought before him, etc.</b> Kesef Mishneh wrote that this is learned from the law mentioned in seif 6, which is from the Yerushalmi — likewise Kesef Mishneh perek 4 of Berachot:`,
);
patch(
  tz,
  "turei-zahav",
  5,
  "ב",
  `<b>Of another species whose blessing, etc.</b> Beit Yosef so explained himself, but we already proved in Yoreh De'ah siman 19 that we do not hold thus; and what he brought as proof from the words of Rashba — that one need not bless on fruits since he blessed on bread — is not relevant to this, for there certainly everything drags after bread which is the main thing, even if the bread was not before him; and also regarding the same species it appears one does not discharge from a blessing except regarding a person whose way is to continue in eating fruits more than what is placed before him; but regarding one who thinks in his mind that he will eat this amount and whose way is not to eat except what is before him — if they brought before him more, it is a resolution and he must bless; and this is simple reasoning and no proof is needed:`,
);
patch(
  tz,
  "turei-zahav",
  6,
  "א",
  `<b>Only that his mind was not on it to eat it.</b> I saw here a new dispute between early and later poskim, and Beit Yosef did not mention this. Beit Yosef in the name of Rosh wrote that we learn from the Yerushalmi: if fruits were before him and his mind was to eat them and he blessed on them and it fell from his hand — he must bless on the fruits he will eat, etc. — behold, what was in his hand to eat at the time of the blessing does not help; and so are the words of Tur, who is the language of Shulchan Aruch here, who wrote: even though more of that species was before him when he blessed on the first; but Hagahot Maimoniot wrote in the name of Rabbenu Tam: if he blessed on a cup and it spilled and they brought him another cup, the first blessing suffices for him — what difference to me this one and what difference to me another; and as Beit Yosef [wrote], Rabbenu Tam deals when they brought him another cup when his mind was on it from the first hour — end of his words. And Rabbenu Yona wrote in the chapter [on laws] and these are his words: we learned from this Yerushalmi that one who blessed on a thing and it fell from his hand need not return and bless when he returns and eats from that species — end of his words. This language implies somewhat that his mind was not to eat more of that species, from that he wrote "when he returns and eats" — it implies a matter that was not in his mind initially, for otherwise he would not have needed to mention language of return. And in Beit Yosef he wrote after the words of Rosh, and likewise R' Yitzchak ibn Ghiyyat — and I do not know from where he learned thus, for according to Rosh even if his mind was initially to eat more he must return and bless — behold, a dispute among the early authorities; and in siman 208 it will be explained that there is dispute in this too between Maharil and Maharchai; and one must reconcile the words of Rama, who ruled here that the matter depends on his mind — did he not already rule Rambam, Tur, and Shulchan Aruch here that if he blessed and afterward they brought before him he must bless again, and this is from the Yerushalmi as Kesef Mishneh wrote on this? And Rama did not write there that it depends on his mind initially; and in truth both this and that deal with one case — this is learned from that:`,
);
patch(
  tz,
  "turei-zahav",
  6,
  "ב",
  `<b>That therefore he intended initially on this.</b> It is difficult from this on what was written in seif 5 that if they brought before him after he blessed he must bless again — behold, he intended initially on this; granted according to Rabbenu Tam it deals there where his mind was not initially on this, as was said nearby; but according to Rosh, that his mind from the beginning to eat does not help — the same applies regarding if what he blessed on was lost from him or became repulsive, as was said nearby; likewise if he blessed and afterward they brought before him — for this law that they brought before him after he blessed is learned from this law, as Kesef Mishneh wrote in perek 4 — this is learned from the Yerushalmi; and the same law applies to lupine that fell, as Beit Yosef copied; and likewise regarding loss that Shulchan Aruch mentioned; and why does emet hamayim help — what he intended on what will come after the blessing? And in truth one may say the view of Rosh: he does not hold this section "he blessed and afterward they brought before him" requires blessing except if his mind was initially on it — therefore it helps like emet hamayim; and there is no comparison to "he blessed and it was lost" — for that seif deals where what he blessed on itself was lost, unlike one who blessed intending that they will bring him and they brought him that same thing — he need not bless again; but on Tur and Shulchan Aruch it is difficult — for they ruled here regarding emet hamayim that he need not bless, but regarding brought before him Tur wrote he must bless, and Shulchan Aruch too; and one must distinguish that brought before him afterward is not as clear as emet hamayim, for the waters will certainly come, but regarding fruits it is possible an accident will occur and they will not come — and likewise in Levush; and if so it is fitting to say in this "you gave your words measure" — that if this one who brings is next to the room of this blesser, standing there in a manner that accident is not applicable, he need not return and bless; and if you say the rabbis did not divide — this is not applicable in blessing to bless in vain; and in Beit Yosef he brought in the name of Shelah that one who blesses on a thing to eat it and it did not succeed for the time being and was delayed until after k'dei dibur — he must return and bless; and it appears that since this ruling is not clear to us, if it occurred that he blessed and afterward they brought the fruits before him — he should bring another species whose blessing is like these fruits and intend to discharge these fruits too:`,
);

const PATCH_COUNT = 23;
console.log(`ok siman 206 part 4 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-206-part4of4.json",
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
