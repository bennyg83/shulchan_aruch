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

const mh = "output/siman_206/machatzit-hashekel/part-001.txt";
const ma = "output/siman_206/magen-avraham/part-001.txt";
const me = "output/siman_206/mechaber/part-001.txt";
const mb = "output/siman_206/mishnah-berurah/part-001.txt";

patch(
  mh,
  "machatzit-hashekel",
  4,
  "א",
  `<b>(seif koton 4) More, etc.</b> That is, "Shalom aleikha rabbi" — which is three words — and not "rabbi u'mori," which is four words; and so writes Avodat HaRokeach in the name of the Levush, chapter Merubah, who writes thus in the name of Tosafot in Nazir.`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ב",
  `<b>When he eats a nut he should break it, etc.</b> Lest it be wormy or rotted and not fit to eat, and his blessing would be in vain — so too in Shulchan Aruch. And Shelah writes specifically a nut; but other fruit such as an apple is good to bless while whole, for even if it will be wormy nevertheless some small amount remains that can be eaten and his blessing will not be in vain. And Avodat HaRokeach writes siman 202: if he intends to peel the fruit he should peel a little before the blessing so the peel should not be an interruption.`,
);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ג",
  `Furthermore he writes there that Shulchan Aruch was precise — and he writes: if he has one nut in his hand — if there were four nuts before him and his mind was on all of them, he should bless before he breaks them, for even if it will be wormy his blessing will not be in vain, since there are others before him that his mind was on. And see further there.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "א",
  `<b>(seif koton 5) Pressed to the ground, etc.</b> Buttocks — meaning the buttocks. We do not hold like R' Yehudah, who said in Berachot daf 24a: two who were sleeping naked in a bed — one turns his face and one turns his face (so there should not be contact of nakedness) and they read Shema — and he challenges: but there are buttocks (Rashi: they touch each other)! It supports R' Yehudah, who said buttocks have no concern of nakedness. And he concludes further — let us say it supports R' Yehudah: we learned a woman sits and separates her challah naked; and even though she must bless at the time of separating challah, buttocks have no concern of nakedness, because in her sitting her nakedness is covered by the ground and even though the buttocks are exposed — thus buttocks have no concern of nakedness. And he rejects: such as where her lower face was pressed to the ground so her buttocks too are covered.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ב",
  `As written siman 73: two who were sleeping naked in one bed — even if they turn their faces, they need to separate with a tallit between them.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ג",
  `<b>Therefore, etc.</b> That all her face, etc., if she separates challah while naked.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ד",
  `<b>That is the reason they touch.</b> Meaning one person's buttocks touch another's buttocks, or other limbs touch another's buttocks; but his own buttocks — when he is naked and only his buttocks are visible — he may bless. So too in Rashba's chiddushim.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ה",
  `And Rosh chapter 2 of Challah — thus it should read.`,
);
patch(
  mh,
  "machatzit-hashekel",
  5,
  "ו",
  `<b>And in chapter Mi she'Meito, etc.</b> The conclusion, etc. — meaning the Yerushalmi infers from the mishna above that teaches "sits and separates her challah naked" like R' Yehudah that buttocks have no concern of nakedness — we cannot establish it as "pressed to the ground"; if so, per the Yerushalmi we should rule like R' Yehudah, since an unattributed mishna follows him — and thus Rosh brought afterward. However in chapter Mi she'Meito he establishes it, etc. — his intention is not that our Gemara argues and holds not like R' Yehudah — and as a rule when Yerushalmi disagrees with our Talmud we rule like our Talmud; rather his intention is our Gemara rejects the support from the mishna. But since we see Yerushalmi ruled like R' Yehudah, from where shall we say our Talmud argues and does not hold like R' Yehudah? Only that it rejects the support — but nevertheless the law may be true.`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "_",
  `<b>If he blessed on tree fruits.</b> It appears to me: those that grow on the tree and one blesses borei peri haAdamah because the fruit is not finished or they are not the primary fruit — if he blessed borei peri haEtz he has fulfilled his obligation.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "_",
  `<b>They were before him.</b> And for l'chatchila see siman 211 seif 3.`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "א",
  `<b>That he not interrupt.</b> A groom and bride who came to become betrothed and enter the chuppah immediately, and the cantor thought they came only to enter the chuppah and blessed the blessing of chassanim — he should bless again the blessing of chassanim after the blessing of erusin and kiddushin (Ra'am ch. 1 dalet).`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ב",
  `<b>More than k'dei dibur.</b> And if he blessed on a mitzvah to perform, or on something to eat, and it did not succeed at that time and he delayed more than k'dei dibur of a student asking his rabbi (namely "Shalom aleikha rabbi") and then it succeeded — he must return and bless — thus Beit Yosef in the name of Shibolei HaLeket. And in siman 140 he wrote that Abudraham disagrees on this and wrote that silence is not considered an interruption — whether much or little; and l'chatchila certainly one should not interrupt, but b'dieved he need not return and bless unless he spoke in between. When he eats a nut he should break it and afterward bless (Shelah, Magen Tzedek). See siman 266. It is written in Kol Bo: and even though in the blessings of Shema one asks out of honor and interrupts between the blessing and Shema — there it is different, since we do not bless to read Shema we are not so strict. And see siman 60.`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ג",
  `<b>Pressed to the ground.</b> Meaning attached and covered by the ground so her buttocks should not be visible, for buttocks are nakedness — we do not hold like R' Yehudah, as written siman 73 — end Rabbeinu Yosef's words. Therefore Rambam wrote ch. 5 of Challah in explanation of the mishna that all her face should be pressed to the ground; but Ra'avad wrote ch. 2 of Challah: buttocks have no concern of nakedness, and so is the plain meaning of the Gemara daf 25, that R' Yehudah said buttocks have no concern of nakedness. And even though the halachah is not like the baraita that supports him, as written siman 73 that a tallit separation is required — that is because they touch — and so too in Tosafot HaRosh, and these are his words: one's own buttocks have no concern of nakedness; another's — if touching, forbidden; and regarding his wife — if touching, permitted; if seeing, forbidden — end of his words. And regarding his wife we do not hold like him, as written siman 73 — see there. Nevertheless regarding buttocks it is difficult why we do not rule like R' Yehudah, for there is no one who disagrees. And in Beit Yosef he ruled that even contact of buttocks — meaning they touch each other in the buttocks — there is no concern. And Rosh ch. 2 of Challah brings Yerushalmi that infers from the mishna buttocks have no concern of nakedness, etc.; and in chapter Mi she'Meito he establishes it that her face was pressed to the ground — end of his words. Meaning from this there is nothing to infer; but nevertheless the halachah is like R' Yehudah, and so is the view of Rosh and Rif, who did not bring at all this matter of her face pressed to the ground. Therefore it appears to me to rule as Rashba wrote, and see Yoreh De'ah siman 328.`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "_",
  `<b>To hold it in his right hand.</b> And he should not stab with a knife (Berachot remez mem).`,
);
patch(
  ma,
  "magen-avraham",
  5,
  "_",
  `<b>He need not bless.</b> Here I have seen that all the latter great ones questioned Tur Yoreh De'ah siman 19, who wrote one must bless, and they strained to reconcile; therefore I set before you the source of this law. Thus Rabbeinu Yosef Karo: one does not bless until they bring it before him. And you may ask: what is different from the law of spring water as written seif 66? One may say it is different here, for it is possible they will not bring it to him; but water will eventually come — proven from this that even if his mind was on it it does not help, lest they not bring it to him. And what is written "and afterward they brought him more of that species" is not precise; rather the same applies to a species of the first blessing, as written siman 177: even though the fruits were not before him, since they come to accompany the bread, etc. — see there. And what is written siman 179 in the name of Kol Bo — thus Beit Yosef there: Kol Bo wrote in the name of Rambam: two or three species of fruit, or even one species if not all are before him at one time — he blesses on each one alone because of distraction of mind. And Mahari Fasci corrected: when a man eats in his friend's house, such as at a circumcision house, one blessing suffices for him, and even that type before they bring him another type, since it depends on the mind of the homeowner he does not distract his mind — end of his words. And Rabbeinu wrote siman 206: one who blessed on fruits before him and afterward they brought him more of the same, etc. And I already wrote siman 177 that Rabbeinu's words appear correct; and thus Rashba wrote there: even though fruits were not before him when he blessed on bread, since they come to accompany the bread he need not bless. And even though Kol Bo wrote that some say fruit brought after haMotzi requires a blessing even if eating them with bread — Rashba's words appear correct, since his mind was on them even though they are not on the table at the time of the blessing, what of it? And so Rabbeinu in siman 206 wrote one who blessed on fruits, etc., and it implies that species is not precise but those whose blessings equal that species he calls by that name. However, where after blessing they sent from another house that his mind was not on — he must bless, etc. — end Rabbeinu Yosef's words. Behold for you explicitly Tur: here it discusses where his mind was on the second fruits at the time of the first blessing, and it teaches that even though they were not before him he need not bless; but in an unspecified case it is not so that one must, as written Yoreh De'ah siman 19: one who blessed with intent to slaughter many animals and afterward they brought him more, even of that species, and even if still before him from the first ones — he must bless unless his mind was on everything they will bring him — end of his words. Behold Tur's view is settled for you. And it requires study on Rabbeinu in siman 179 who wrote Kol Bo disagrees with Tur, for Kol Bo discusses an unspecified case as stated, and the Rif's correction, etc. — this discusses unspecified, and it requires study. And thus Mordekhai chapter Keitzad: if beverages are not before him when he blessed on wine he must bless on them, for nowadays there is no fixed practice of wine-drinking and he cannot say the reason — and see siman 208 seif 16; therefore a fortiori for fruits. Nevertheless if he eats fruit within the meal it is fixed and he need not bless, as written siman 179 seif 2. And see siman 213. And Rama wrote in Darkei Moshe. And see Yoreh De'ah siman 19 regarding slaughtering — likewise here. Thus he holds here like the author of the Itur who wrote there that whatever is the first species he need not bless. If so, since Tur's view there is that nevertheless one must bless, and also regarding another species some say there if still before him from the first ones he need not bless — therefore he wrote l'chatchila his mind should be on everything they will bring him; if so he need not bless according to all — and this is strained, that Tur should win a dispute against two, and furthermore how can he rule not like the words of his father Rosh? And according to what I wrote above in siman 140 that here it discusses where his mind was on it — yet we still need to settle Rabbeinu's words who ruled regarding slaughtering: if still before him from the first ones he need not bless, and here he ruled specifically where his mind was on it; and likewise above siman 179 seif 4. And we must say he holds regarding slaughter that from an unspecified case there is fixed practice of slaughtering, as written there in Yoreh De'ah. Therefore it appears to me: if he fixed himself for eating fruits he need not bless, for he does not distract his mind unless he explicitly reconsidered. And even according to what I said in the name of Mordekhai — nevertheless regarding something whose blessings are equal he agrees. However from Kol Bo's words above it does not imply so — it implies only because it depends on the homeowner's mind; if not, not — see siman 213. And further slaughtering is different, for even though he slaughtered them they still lie before him, unlike eating where he already ate the first ones — see siman 8 seif koton 15. And in Magen Tzedek wrote in the name of Shulchan Aruch siman 487: if he ate the first he must bless on the second if his mind was not on it; and if still before him from the first ones he need not bless — end of his words. This is as Rabbeinu wrote in Yoreh De'ah regarding slaughtering. And in Maharil wrote in an unspecified case: if they brought him afterward he must bless — end. Summary: if his mind was on everything they will bring him — obviously he need not bless; and if he reconsidered regarding them — obviously he must bless; and in an unspecified case, as long as the first ones remain before him, they disagree — Kol Bo requires blessing as stated, for there is no fixed practice for fruits; and per Shulchan Aruch he need not bless — however specifically fruit species, but if he drank beer and they brought him fish, even though it is one blessing he must bless unless his mind was on them, even though they come to sweeten the drink — see siman 212. And if the first ones are not placed before him, it appears to me that according to all he must bless, and Rama too agrees, for slaughtering is different, since as long as they lie before him it is called occupied with slaughtering, as Rabbeinu wrote there; but in eating specifically when they brought him from the first species while still occupied with eating (see Yoreh De'ah siman 265 and Sha'ach there that circumcision is different, for it did not enter his mind they would bring him) — as Shelah wrote: he does not distract his mind from eating as long as he reclines at the table — end of his words. It implies: if he does not recline for this purpose but only eats fruit incidentally, even if they brought him of the same species he must bless according to all, if he already ate the first ones.`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "_",
  `<b>Only if his mind was not on it.</b> Meaning his mind was not clearly on it, for we do not say in an unspecified case that his mind was on everything before him. And in Be'er Heitev siman 224 it implies that in an unspecified case his mind is on all of them — see there. And Abudraham siman 140 that there are disagreeing — see there what is written. Magen Tzedek wrote in the name of Shulchan Aruch: one who blessed on fruits and while still blessing they brought him more beautiful fruits — he should eat from the first ones first since he blessed on them; end of his words. It discusses where his mind was to exempt the beautiful ones, for otherwise he must return and bless on the beautiful ones as written siman 211 seif 5. One who blessed on water and heard there is a dead person in the city — he should drink a little of the water and pour out the rest; and if they told him the tekufah falls — he should wait a little until the tekufah passes and then drink and not bless (Shulchan Aruch siman 494). And even according to those who say there is danger in the matter, for "the keeper of a mitzvah shall know no evil" (Kohelet). See siman 495.`,
);

patch(
  me,
  "mechaber",
  1,
  "main",
  `The laws of interruption and error in blessings on fruits. And it contains 6 seifim: If one blessed borei peri haAdamah on tree fruits, one has fulfilled one's obligation. But if one blessed borei peri haEtz on ground produce, one has not fulfilled one's obligation. Therefore if one is in doubt whether the fruit is tree produce or ground produce, one blesses borei peri haAdamah. And on everything — if one said shehakol, one has fulfilled one's obligation, even on bread or wine.`,
);
patch(
  me,
  "mechaber",
  2,
  "main",
  `If before him were ground produce and tree produce and he blessed on the ground produce and intended to exempt the tree produce, he has fulfilled his obligation.`,
);
patch(
  me,
  "mechaber",
  3,
  "main",
  `All these blessings — one must not interrupt between the blessing and eating. {Rama: More than k'dei dibur [Beit Yosef in the name of Shibolei HaLeket]} And one must make it audible to one's ears; and if one did not make it audible, one has fulfilled one's obligation provided one articulates with one's lips. And we say in any language. And one should not bless naked until one covers one's nakedness — in what case is this said? Regarding a man. But a woman may sit with her lower face pressed to the ground, for thereby her nakedness is covered. {Rama: (And see above siman 74 seif 4)} And even if he is not naked — if his heart sees his nakedness or his head is uncovered, it is forbidden to bless.`,
);
patch(
  me,
  "mechaber",
  4,
  "main",
  `Everything upon which one blesses — to eat it or to smell it — one must hold it in one's right hand when blessing.`,
);
patch(
  me,
  "mechaber",
  5,
  "main",
  `One does not bless on food or beverage until they bring it before him. If one blessed and afterward they brought it before him, one must bless again. But one who blessed on fruits before him and afterward they brought him more of that species, or of another species whose blessing is like the blessing of the first — he need not bless. {Rama: And it is good l'chatchila to have one's mind on everything they will bring him [Beit Yosef, Tur Yoreh De'ah siman 19].}`,
);
patch(
  me,
  "mechaber",
  6,
  "main",
  `If one took fruit in his hand to eat and blessed on it, and it fell from his hand and was lost, or became repulsive, he must return and bless again — even if more of that species was before him when he blessed on the first one. {Rama: Only if his mind was not on it to eat it [Hagahot Maimoniot ch. 4, Kol Bo, Agur, Abudraham, responsum Maharil siman 92].} And he must say baruch shem k'vod malchuto l'olam va'ed for having uttered God's name in vain. And if when it fell he said baruch ata Hashem and did not say Elokeinu, he should finish and say limdani chukekha so it appears as reading a verse, and there is no uttering God's name in vain here. But one standing by a spring blesses and drinks even though the water he drinks was not before him when he blessed, because he intended this from the outset. {Rama: And see above seif 1 regarding if he blessed in error what the law is.}`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(1) If he blessed, etc. — since the essence of the tree is from the earth and he did not lie in his blessing, and even if he acted intentionally in this [Peri Megadim].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) On ground produce, etc. — and even when fruits grow on the tree but the tree does not endure in winter, he has not fulfilled his obligation, for it is included in ground produce, as above siman 203 in the gloss.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) He has not fulfilled — Magen Avraham wrote: those fruits that grow on the tree and one blesses borei peri haAdamah because the fruit is not finished or they are not the primary fruit — as above siman 202 seif 2 and seif 66 — if he blessed borei peri haEtz he has fulfilled his obligation, since in any case it is a tree-fruit species. And likewise on ground produce that is better cooked than raw, that we rule to bless shehakol when eating them raw — if he blessed borei peri haAdamah he has fulfilled [Panim Me'irot].`,
);

const PATCH_COUNT = 26;
console.log(`ok siman 206 part 2 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-206-part2of4.json",
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
