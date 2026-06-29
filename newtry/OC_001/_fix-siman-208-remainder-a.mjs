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

const mb = "output/siman_208/mishnah-berurah/part-001.txt";
const mhs = "output/siman_208/machatzit-hashekel/part-001.txt";

// mishnah-berurah (36)
patch(
  mb,
  "mishnah-berurah",
  13,
  "ד",
  `(65) And all the more so if he ate meat, etc. — the reason for "all the more so": wine and apples are in any case both a tree species; all the more so what is not a tree species.`,
);
patch(
  mb,
  "mishnah-berurah",
  13,
  "ה",
  `(66) And the same applies if, etc. — see below in siman 212 regarding ikkar and tafel, what we wrote there.`,
);
patch(
  mb,
  "mishnah-berurah",
  14,
  "א",
  `(67) To bless on them borei peri haEtz — so you should not say that grapes too are borei peri haGefen and are exempt b'dieved with the wine blessing; it teaches that this is not so.`,
);
patch(
  mb,
  "mishnah-berurah",
  14,
  "ב",
  `(68) He must mention on, etc. — meaning, do not think that he fulfills with the blessing "al haGefen" that one blesses on wine; rather he must also mention on the tree and include it with the blessing of the vine in one blessing, as above in seif 12.`,
);
patch(
  mb,
  "mishnah-berurah",
  15,
  "א",
  `(69) If b'dieved, etc. — and the same applies if he drank wine and intended to exempt the grapes, that he has fulfilled, as written in siman 206 seif 2 — see there [Acharonim. And see in Mishna Berurah what we wrote on this, and the same applies to our matter]. And it is not similar to seif 4, for there he did not explicitly intend in the blessing borei peri haGafen to exempt the grapes; therefore we say that automatically they are not exempt, for l'chatchila he should bless on each one a separate blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  15,
  "ב",
  `(70) On the grapes with borei peri haGafen, etc. — and if he blessed on the wine borei peri haEtz, there are opinions among the poskim: some say he has fulfilled b'dieved and some say he has not fulfilled, and safek berachot lehakel.`,
);
patch(
  mb,
  "mishnah-berurah",
  16,
  "א",
  `(71) And water — and the same applies to all types of beverages, even the most important.`,
);
patch(
  mb,
  "mishnah-berurah",
  16,
  "ב",
  `(72) He has no obligation to bless, etc. — it speaks when he established himself on wine, and then he exempts even if the beverages were not before him at the time of the blessing; or it speaks when the beverages were before him at the time of the blessing, and then he exempts even if he drank only one cup. But if he did not establish himself and the beverages were also not before him at the time of the blessing, then he must bless on the beverages afterward, just as he must bless on them beforehand, as explained above in siman 174 in Mishna Berurah sk 3 — see there.`,
);
patch(
  mb,
  "mishnah-berurah",
  16,
  "ג",
  `(73) That the blessing on wine exempts them, etc. — and even if it happened that they brought the beverages after he decided and diverted his mind from drinking wine, so that then he certainly must bless a first blessing on the beverages [for they are not better than wine itself]; nevertheless he need not bless borei nefashot, since he established himself initially on wine — everything is attached to the wine and is exempted by its blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "א",
  `(74) That if he ate, etc. — meaning, not within the meal; for within the meal, even before Birkat HaMazon, certainly the three blessings exempt them.`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "ב",
  `(75) Daisa — and the same applies to other types of cooked dishes that are from the five species of grain. And even though all this is less satiating than dates, nevertheless since they have another elevation in bread — bread becomes the primary of the grain species — the blessing of three does not apply except on bread. And know that for the law, many Acharonim agreed not like the view of the Mechaber, but rather that daisa and likewise anything from the grain species — b'dieved Birkat HaMazon exempts them, since it satiates and is not worse than dates [and all the more so pat haba bekisnin, which certainly Birkat HaMazon exempts].`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "ג",
  `(76) But on wine, etc. — meaning, even when he drank outside the meal, he also exempts it b'dieved when he blessed Birkat HaMazon on it; the reason is because wine satiates and feeds the heart like bread — and see Biur Halacha.`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "ד",
  `(77) On dates — for dates too satiate like the grain species, and b'dieved Birkat HaMazon applies to them; unlike other fruits, even of the seven species — even b'dieved one does not fulfill with Birkat HaMazon.`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "ה",
  `(78) Rather the blessing HaZan, etc. — although it does not have me'ein shalosh, nevertheless since he already finished HaZan on everything, he can no longer say the remaining blessings that were not enacted l'chatchila on wine and dates.`,
);
patch(
  mb,
  "mishnah-berurah",
  17,
  "ו",
  `(79) And if he remembered, etc. — for l'chatchila he certainly should bless a blessing that includes me'ein shalosh as required.`,
);
patch(
  mb,
  "mishnah-berurah",
  18,
  "א",
  `(80) And a thing whose blessing, etc. — and it speaks when he has no wine [for if he has wine, he cannot remove himself from doubt — whether he blessed on wine borei peri haGafen and on another type borei nefashot, and he has fulfilled either way], and he wants to take another thing whose blessing is also me'ein shalosh and include in the middle a doubtful blessing on the vine, etc., as in seif 12. The reason it is forbidden is lest his blessing is borei nefashot and the name of the vine is not applicable at all; it is better not to mention it at all. Nevertheless, if he has something on which to bless borei nefashot, he should bless — lest his blessing is borei nefashot — and what he can correct he should correct.`,
);
patch(
  mb,
  "mishnah-berurah",
  18,
  "ב",
  `(81) And he should include with it, etc. — and if he ate a tree fruit and does not know whether it is of the seven species, and he has no other fruit that is of the seven species to exempt it with a me'ein shalosh blessing, Magen Avraham wrote that he may take wine — and the same applies to one of the five grain species whose blessing is also me'ein shalosh — and add to include in the blessing "on the tree and on the fruit of the tree," and he has fulfilled either way; for even if this fruit is not of the seven species, it is fit to say on it "fruit of the tree," as above in seif 13.`,
);
patch(
  mb,
  "mishnah-berurah",
  18,
  "ג",
  `(82) From doubt — and the view of the Taz, and many Acharonim agreed with him for the law, that we do not say this reasoning except l'chatchila — that is, that he drink this beverage and rely for the matter of the after-blessing on the basis that he will afterward include in it some addition. But for b'dieved — that is, he already drank a beverage that has doubt — it is better that he include in it than remain without any after-blessing at all.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(2) The five species of grain — they are wheat, barley, spelt, oats, and rye. But what we call tatarka or tershti and vitz are not included in grain, for they are fruit of the ground.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(3) "That they boiled them" — it should read "that they divided them," meaning one into two or more — and that is what we call groats; for if they are whole, even if he cooked them, it is explained below that one blesses borei peri haAdamah. However, if they were mashed through cooking, even if initially he put them in the pot whole — that is, while they are in their shells — nevertheless one blesses borei minei mezonot, since they were well mashed.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(4) Or like straw — meaning, even if he did not divide them, only that he removed the shell through pounding; and the Acharonim side with the view that we require specifically that they stick through cooking — then it is considered a pot dish; for otherwise it is considered as whole, as below in seif 4 — and see what we wrote there.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(5) Harifot and geresh karmel — harifot is the explanation of "like straw," and geresh karmel is the explanation of "that they divided them"; and all of these are included in a pot dish.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ה",
  `(6) And daisa — it is called thus when it was mashed and stuck well. And what the Acharonim wrote — that one should not eat those barley or wheat groats whole except within the meal, as written in seif 4 — that is when they did not stick through cooking; but if they stuck through cooking, one blesses borei minei mezonot.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ו",
  `(7) Much more than them — the reason: since he comes to flavor and to prepare the dish, and it is from the five species which are important, it is the primary element — and see below in seif 9 and in Mishna Berurah there regarding the measure for which one is obligated to bless al haMichya.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ז",
  `(8) Rather to stick it, etc. — meaning, he did not come to flavor the dish nor to feed the heart, only that the dish should be sticky — it is not significant and is nullified relative to the dish, even if he put much flour into it.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "א",
  `(9) He blesses borei minei mezonot — and even if they are the minority, since the flour is from the five species, the almonds are nullified relative to it.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(10) He does not bless borei minei mezonot — for the flour is nullified relative to the fruit, as above in seif 2.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ג",
  `(11) And it is good to be stringent — because in a dish of almonds the way is also to make it for satiation; therefore it is hard to assess whether his intent was only to stick — and therefore it is good to be stringent.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ד",
  `(12) And to swallow it — meaning, to eat it when it was thick and fit for eating; but if it was soft and fit only for drinking, even outside the meal, and he made it in order to feed the heart — he also blesses only shehakol, as below in seif 6.`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ה",
  `(13) And exempt from borei minei mezonot — the Acharonim challenged: if it is only to stick, then it is nullified relative to the almonds, and behold he must bless on fruit within the meal. It appears to resolve: since he is ill and needs the almonds, his primary establishment of the meal l'chatchila is on them — and it is as one who establishes his meal on fruits, on which he does not bless, as above in siman 177 seif 3 — see there.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "א",
  `(14) Living grain — all five species are included; and Rama disputes regarding barley.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ב",
  `(15) And the kernels whole — meaning, that he did not divide them initially and they were also not mashed at all through cooking — they are not considered food but are like other fruit of the ground. And if the shell was removed through pounding, some say their blessing is borei minei mezonot when cooked as a pot dish, and some say their blessing is borei peri haAdamah since the kernels themselves are whole. The correct practice is not to eat them except within the meal [alone is the view of Tosafot below] — and see above at the end of sk 6 that when they stuck through cooking, one may rely l'chatchila to bless borei minei mezonot and afterward me'ein shalosh. However, barley whose shell was removed and also part of them themselves through the millstone — they become smaller than they were before [and this is common in the type called pearl groats] — the custom is to bless on them borei minei mezonot and afterward me'ein shalosh l'chatchila, even if they did not stick through cooking; one should not protest against them.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ג",
  `(16) Only shehakol — and if they were cooked, also on barley one blesses borei peri haAdamah [Rabbi Akiva Eiger].`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ד",
  `(17) They were in doubt, etc. — he holds borei minei mezonot; for since it is a grain species, it is possible that for the matter of the after-blessing one must bless me'ein shalosh. And even though on al haMichya he cannot say it, since it is not a type of food — he should say "on the ground and on the fruit of the ground," as one says "on the tree and on the fruit of the tree"; but we do not find that such a text was enacted, and therefore the matter remained among them as a doubt.`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ה",
  `(18) Within the meal — and if it happened that he ate them outside the meal, he should bless afterward borei nefashot, for such is the fundamental law.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "א",
  `(19) Even of wheat — for they are important, and all the more so flour of barley.`,
);

// machatzit-hashekel (21)
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "א",
  `<b>(sk 1) The five species, etc. — tatarka.</b> In Sefer Avodat HaRokeach — that is what they call hadin.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "ב",
  `And see there siman 253, as corrected.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  10,
  "א",
  `<b>(sk 10) Until it was mashed, etc. — the Rabbi, may his memory be blessed, etc.</b> Meaning, it was written on Rama's gloss in Beit Yosef in the name of the Rosh and R' Yitzchak; on this Magen Avraham challenged that in Beit Yosef the opposite is explained — and therefore this is Rama's own view, and he challenges him why he argued against the Rabbi without proof.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  10,
  "ב",
  `<b>That there is a distinction between, etc.</b> Meaning, R' Yitzchak wrote for those who hold that dochan has the law of rice — dochan too, if cooked, one blesses first borei minei mezonot and afterward borei nefashot, even though the braita did not mention dochan but only rice; therefore R' Yitzchak wrote to resolve that there is a distinction, etc. If so, why did the braita use language that is decisive — that even when it is whole one blesses borei minei mezonot?`,
);
patch(
  mhs,
  "machatzit-hashekel",
  10,
  "ג",
  `<b>However, one may distinguish between wheat, etc.</b> Meaning, in any case the language "whole" that R' Yitzchak wrote regarding rice is as the simple meaning — that it is not mashed, and nevertheless one blesses borei minei mezonot. And regarding the Rabbi's difficulty from wheat — that we require specifically that it be mashed — therefore the Rabbi wrote that one may distinguish between wheat and rice, for the way of rice, etc. — and this is as Magen Avraham wrote in sk 2 in the name of the Bach.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  10,
  "ד",
  `Even when it was not cooked much, its blessing does not change from if it had been cooked much and mashed.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  10,
  "ה",
  `<b>And the Bach wrote that without being mashed there is doubt.</b> Meaning, besides the doubt lest it is dochan, as written in sk 9 — without being mashed there is an additional doubt.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  11,
  "א",
  `<b>(sk 11) It is the majority, etc.</b> And so too Rambam, and he retracted, etc. — for Tur wrote in the name of the Rosh that specifically if the other dish is the majority; and on this the Rabbi wrote that it implies Rambam disagrees and does not require a majority, from what he wrote "provided it is not mixed with something else but rice alone" — it implies that even if the other dish is not the majority, nevertheless he does not bless borei minei mezonot, unlike the Rosh. And in Shulchan Aruch he first wrote the language of Rambam — that it not be mixed with something else, etc. — which implies even if the other dish is not the majority; and afterward he concluded like the words of the Rosh, "and if he mixed, etc., and the dish is the majority" — and so the Bach questioned. And therefore Magen Avraham wrote that in Shulchan Aruch he retracted and holds that the view of Rambam too is like the Rosh, as Magen Avraham wrote in this responsum, and so too Rambam. And he wrote that so it implies in Kesef Mishneh, where he brought there the view of the aforementioned Rambam — what the Rosh wrote, that we require that the dish be the majority, implies that he holds they do not disagree.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  11,
  "ב",
  `<b>Is it that, etc.</b> Meaning, even though Rambam wrote anonymously "provided it is not mixed," etc. — which implies even without a majority — that is, the anonymous wording follows the explanation that it should not be mixed until the dish is the majority; and he did not need to explain how it could enter one's mind that even if a little is mixed one blesses as for the dish, as Magen Avraham wrote: "Is it that if there is a little rice in the dish," etc. If so, Rambam does not disagree with the Rosh; if so, the language of Shulchan Aruch too is not contradictory, for there is no proof from the language of Rambam that he wrote "provided it is not mixed," etc. — for nevertheless it can be explained that he holds we require specifically a majority from another species.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  11,
  "ג",
  `<b>And even in Beit Yosef he did not write except that it implies, etc.</b> Meaning, that also in Beit Yosef he did not decide the matter with certainty that Rambam disagrees with the Rosh, but only wrote "it implies," etc.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  13,
  "א",
  `<b>(sk 13) They were mashed, etc.</b> But when one mashes them in a spoon, the primary way of eating them is thus — meaning, and therefore one blesses borei peri haAdamah.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  13,
  "ב",
  `<b>And furthermore, the Mishnah stands, etc.</b> And it deals with Mishnah Berurah seif 6 — meaning, that it is written there: even if they were crushed much, if their form was not lost and the form of the fruit is still upon it — in its language it stands — to bless its blessing as if it were not mashed.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "א",
  `(sk 15) If there is not in it, etc. And the Rabbi wrote in siman 253, as corrected.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ב",
  `<b>They drag the rice.</b> Meaning, the rice is dragged after the wheat — and behold it is as if the rice too were wheat.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ג",
  `<b>And specifically with rice; but another species with wheat, no.</b> And the same applies to rice with barley or one of the five grain species — it also does not drag it after it. Specifically wheat with rice.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ד",
  `<b>And regarding matzah.</b> Meaning, that one must learn the law of HaMotzi and Birkat HaMazon from this mishnah; and since the mishnah teaches "it is obligated in hallah and one fulfills with it one's obligation of matzah" — first one learns HaMotzi from the law of hallah, for their laws are equal; and now one learns further likewise from matzah, for their laws are also equal.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ה",
  `<b>And in other species.</b> Meaning, whether rice with the other four species besides wheat, or other legume species with wheat — where there is not a kezayit per k'dei achilat pras.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ו",
  `<b>However, there it concludes.</b> Meaning, in the Yerushalmi it concludes, and it is brought in the Rosh in Berachot chapter 4 seif 16: the Yerushalmi challenges on this general principle — behold, less than a kezayit, on which one does not bless Birkat HaMazon — even so one blesses on it HaMotzi; and on this it answers that it does not deal with the measure for which one blesses Birkat HaMazon, but it deals with species. And the Rosh explained: meaning, bread on which one blesses HaMotzi — one blesses on it Birkat HaMazon; and everything on which one blesses first borei minei mezonot, such as pat haba bekisnin on which he did not establish himself — one does not bless afterward Birkat HaMazon but only me'ein three.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ז",
  `<b>And if so, it is difficult, etc.</b> For in a case where there is a kezayit per k'dei achilat pras, one can say HaMotzi and afterward Birkat HaMazon; but if there is not a kezayit per k'dei achilat pras in other species besides wheat with rice — which depends on the dispute of Mishna Berurah and Ramban with Raavad — he should not bless HaMotzi first.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ח",
  `And in my humble opinion, a similar case, etc., is like another difficulty.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ט",
  `<b>And here, since it is mixed, etc.</b> Meaning, that in any case it deals with a case where there is not a kezayit per k'dei achilat pras; and why afterward does he not bless Birkat HaMazon? Since he interrupted the eating of the kezayit through eating other species that were mixed with it, the kezayit of grain for more than k'dei achilat pras — the kezayit does not combine together, as if that kezayit of grain were visible without mixture and he waited k'dei achilat pras — it would not have combined. Unlike HaMotzi, which one blesses because it is not combined and is not called eating a kezayit — in any case, on whatever amount one also blesses HaMotzi.`,
);

const PATCH_COUNT = 57;
console.log(`ok siman 208 remainder-a — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-208.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const SLUGS = new Set(["mishnah-berurah", "machatzit-hashekel"]);
const patchedItems = (queue.items || []).filter((it) => SLUGS.has(it.slug));

for (const it of patchedItems) {
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
console.log(`Refreshed queue: ${queuePath} (${patchedItems.length} items)`);

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
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of patchedItems) {
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
  console.error(`Preflight: ${fail} failure(s) of ${patchedItems.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${patchedItems.length - fail}/${patchedItems.length} blocks`);
