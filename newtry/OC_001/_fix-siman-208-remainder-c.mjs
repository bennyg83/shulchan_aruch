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

const bh = "output/siman_208/biur-halacha/part-001.txt";
const gra = "output/siman_208/beur-hagra/part-001.txt";
const ea = "output/siman_208/eshel-avraham/part-001.txt";
const cs = "output/siman_208/chatam-sofer/part-001.txt";
const dm = "output/siman_208/dagul-merevavah/part-001.txt";
const ls = "output/siman_208/levushei-serad/part-001.txt";

patch(
  bh,
  "biur-halacha",
  7,
  "_",
  `<b>Until it was mashed.</b> See in Mishna Berurah. And behold, in Beit Yosef he is in doubt about the essential law in explaining the words of R' Yona — for it appears from his words that regarding cooked rice, even when they are whole, one blesses borei minei mezonot; and he rejected somewhat [this view] — see there. And in several places he agreed thus; and so Eshel Avraham sided in the name of Kol Bo that such is the view of R' Yona [and so it appears from the Gra — however he did not explain his ruling for the law in this whether to take like R' Yona or like the Rosh who disagrees with him in this]. And for the law, many acharonim are divided on this whether to bless on whole rice borei minei mezonot or borei peri haAdamah or shehakol from doubt [see Bach, Pri To'ar, Shelah, Taz, Mateh Yehudah, Birkei Yosef, Maamar Mordekhai, Yeshuot Yaakov, Halachot Ketanot, and Derech HaChayim]. And the main thing for the law, it appears to me like the words of Rama and the acharonim who follow him — that when they are mashed one blesses borei minei mezonot; but if they are whole one blesses borei peri haAdamah; for even if we explain the view of R' Yona that he holds that even whole [one blesses] borei minei mezonot — nevertheless in the Rosh it appears explicitly that specifically when he cooked and made it like deisa one blesses borei minei mezonot, and like regarding wheat below; and so copied Ri'az. And I found further several Rishonim who hold thus — they are Tosafot Rabbenu Yehudah and Avudraham copied his words, and so Ri'az, and brought in Shibolei Leket — that specifically when he made it like deisa one blesses borei minei mezonot, but when the kernels are whole one blesses borei peri haAdamah. However, from the words of Peri Megadim it appears that all this is when they are completely whole; but if their shell was removed like our rice, one can side that this is not in the category of whole even if they were not mashed by the cooking — for otherwise even in wheat the view of Rambam per what Magen Avraham explained in sk 2, that when its shell is removed one can bless borei minei mezonot. And even though from the words of R' Yona it appears that he holds there that specifically when they stuck together by cooking — and as Magen Avraham noted there — this comes regarding rice whose view is otherwise that even whole one blesses borei minei mezonot; and therefore it appears that one who blesses on them borei minei mezonot did not lose [and especially b'dieved he fulfills with the blessing borei minei mezonot on all matters of zeiin].`,
);
patch(
  bh,
  "biur-halacha",
  8,
  "_",
  `<b>On bread of dochan.</b> Behold, in truth regarding dochan many Rishonim hold that its blessing is borei minei mezonot like rice — they are the view of the Gaon brought in Terumat HaDeshen, and he also agrees from there thus; and likewise the Rosh and Raavad [brought in Rashba], Eshkol, Or Zaru'a in the name of R' Yehuda Sirleone, Shibolei Leket in the name of Rashi, Ra'ah in his novellae on Rif, Ri'az, Avudraham in the name of his teacher, Rokeach, and Abudraham — all these hold that rice and dochan have one law for each other in every matter. And the Mechaber's silence is only the view of Rif, Rambam, and R' Yehuda [and brought in Eshkol]; and it requires further study on the Mechaber who was silent thus for the law against the Rosh and all these Rishonim who stand in his method — and perhaps they were not before his eyes since he did not bring them in Beit Yosef. And per this, even though no harm results from this since with shehakol one fulfills on everything b'dieved — nevertheless one who wants to bless borei minei mezonot, we do not protest against his hand, as it appears to me. And know further that several Rishonim hold that it is not specifically rice and dochan — the same applies to other species that we know zeiin vasueid halev — their law is like rice and dochan and one blesses borei minei mezonot; and included in this is pulizo explained in Shulchan Aruch — see in Terumat HaDeshen who brought thus in the name of a Gaon and he also agreed to this; and so wrote Rosh in his Tosafot on Berachot [and Beit Yosef who was in doubt about the view of Rosh in this — the light of his eyes had not seen Rosh's Tosafot]. And Shulchan Aruch was silent regarding pulizo shehakol — because it is not more important than dochan per his view; and see what we wrote in Mishna Berurah in the name of Chatam Sofer regarding the concern about Turkish wheat and buckwheat lest it be in the category of rice — and per these Rishonim one should in any case be concerned that it sates greatly. Nevertheless one who blesses shehakol on dochan and all these certainly has on whom to rely.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "א",
  `<b>If he mixed flour of dochan, etc.</b> And regarding rice flour when mixed with wheat flour — one should study, and it appears this depends on the method of poskim explained in siman 213 seif 2; and see there in Chok Yaakov; and see in Peri Megadim and Derech HaChayim who side that for the law one should take that rice equals dochan for our matter. However, in Magen Giborim he disagrees on this — see there.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ב",
  `<b>And if he made bread from it one blesses HaMotzi.</b> And it is reasonable: whenever he has before him bread from the five species of grain, even if it is not clean bread and mixed bread and there is in it a kezayit of wheat in k'dei akhilat pras — nevertheless it is more preferable to bless on bread that is not clean [Peri Megadim].`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ג",
  `<b>And Birkat HaMazon.</b> See in Peri Megadim who is in doubt regarding the d'oraisa obligation — whether we require k'dei sevi'ah, whether the other species combine toward the grain for this matter.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ד",
  `<b>He does not bless at the end Birkat HaMazon.</b> See in Pri To'ar who wrote that if he ate k'dei sevi'ah he must bless Birkat HaMazon — and he did not explain his reason [and Sefer Beit Efraim of his I do not have]. And perhaps because he was concerned for the method of poskim that taste is the essence d'oraisa, and he holds that this also applies regarding Birkat HaMazon; and therefore he was stringent regarding k'dei sevi'ah whose obligation is generally d'oraisa. However, from the words of the Gra in sign 34, who wrote that the main point is that in all blessings at the end one requires a kezayit in k'dei akhilat pras — at first glance it does not appear thus; and likewise from the words of the Mechaber who was silent in this — it appears that in all cases he does not bless Birkat HaMazon.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ה",
  `<b>In a pot.</b> See Mishna Berurah what he wrote that it is not specifically mixtures of flour in flour, etc. — so too Lechem Chamudot, and brought in Shenei Luchot HaBrit; and even though Magen Avraham at end of sk 215 wrote the opposite and some acharonim copied his words — I did not want to be silent thus for the law, because many acharonim wondered at his words, and their view is like the Lechem Chamudot mentioned — they are Maharam ben Nachum in his explanation on Mordekhai, Maamar Mordekhai, and Nishmat Adam; and so Eshel Avraham also sides [and it appears that Eshel Avraham also agreed to this — see there]; and so from the explanation of the Gra in sk 35 s.v. "And if he cooked it," etc., it is proven explicitly that he holds like the Lechem Chamudot mentioned.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ו",
  `<b>He blesses first borei minei mezonot.</b> See in Mishna Berurah that we require there be in it taste of grain — so is proven from the repeated words of the Mechaber that it refers to what is above; and so Magen Avraham in siman 204 sk 25 — see there [and even though Peri Megadim wants to force there the intent of Magen Avraham that one should not think thus — the plain meaning of Magen Avraham's language appears as we wrote, and so is the view of Eshel Avraham]. And even though from the words of Taz at the beginning of this siman and at the beginning of siman 202 it appears that he holds we do not require taste of grain — and he proved this from what the Mechaber wrote "even if he mixed with them honey," etc. — already Mateh Yehudah and Nishmat Adam wondered at him that it is not proof at all, for even when mixed in honey one can feel somewhat taste of grain — see there; and their view is as we wrote in Mishna Berurah. And also in the gloss of the Gra of Sanz he disagrees with Taz; and also from the words of the Rosh [who wrote "everything whose essence is from the five species, even if the majority is from another species"] it appears that in any case we require taste of grain — for otherwise it is not applicable at all to call it the essence; and similar to this I also found in Sefer Or Zaru'a in the name of the explanation of R' Chananel — see there well. And in particular I found the view of Ra'ah in his novellae on Rif who holds that without a kezayit in k'dei akhilat pras it is not important at all, and also at the outset one does not bless borei minei mezonot — and nevertheless for the law one should not move from the words of Shulchan Aruch who ruled like Abudraham in the name of R' Yona that at the outset one blesses in all cases borei minei mezonot — nevertheless taste of grain one requires.`,
);
patch(
  bh,
  "biur-halacha",
  9,
  "ז",
  `<b>And after it borei nefashot.</b> See in the explanation of the Gra that this law depends on the method of Rishonim — this is per Rashi and R' Yona [and Ra'ah that we brought above], and Tosafot disagree on this. And behold, I found in Tosafot of the Rosh who also copied as Tosafot's question on Rashi — nevertheless for the law it appears from his words that he takes as the main point like the ruling of Shulchan Aruch that when there is not a kezayit in k'dei akhilat pras one does not bless at the end except borei nefashot. And behold in the explanation of the Gra s.v. "At the outset" its source is from what they said "Everything that has in it from the five species" — it implies even when there is not a kezayit in k'dei akhilat pras; and per this Rif who concluded in the words of Rav and Shmuel [at Riheta of Mehoza] "and at the end he blesses on it me'ein shalosh" — therefore he also holds like the method of the Tosafot mentioned. However in the Gemara before us this is not found in the words of Rav and Shmuel.`,
);
patch(
  bh,
  "biur-halacha",
  17,
  "א",
  `<b>But regarding wine, etc.</b> Know that regarding wine there are several views among the Rishonim, and in this matter there are several divisions — we will copy all of them for the law.<br>a) If he drank wine not within the meal and blessed on it HaMotzi — he is discharged b'dieved, for such is the view of R' Yona and the Rosh; and so appears the view of Rashbam and HaMaor in chapter 6; even though the view of Ramban and Ran there that wine is not discharged by HaMotzi — we do not hold like them, as Shulchan Aruch ruled in this seif.<br>b) If he drank within the meal — even though for the first blessing he needs to bless because it is important and causes a blessing for itself; but the after-blessing for everyone is discharged by Birkat HaMazon, as Shulchan Aruch ruled in siman 174 seif 6.<br>c) If he drank after the completion of the meal — the view of R' Yona, Rashbam, and HaMaor is that he is discharged automatically by HaMotzi that he blessed on the bread even if he did not have explicit intent on the wine; but the view of the Rosh [so is proven from his words in chapter 20 end of section 26, and so he wrote explicitly in his Tosafot] and Ramban and Ran — he requires a blessing before and after, and one should not rely on Birkat HaMazon [however if he had explicit intent to discharge also the wine — for the Rosh and his aid mentioned in section 1, certainly it helps; and Ramban and Ran — even b'dieved it does not help]. However for us there is no practical difference in this, for for us everything is considered within the meal as above in siman 177, unless when he said "Let us sit and bless" — then it would depend on those views; and therefore it is good that he have explicit intent to discharge the wine with Birkat HaMazon, and then he fulfills per most poskim.<br>d) If he drank before the meal alone — per HaMaor, Ramban, and Ran he is not discharged by Birkat HaMazon; but per the Rosh he is discharged l'chatchila because wine drags the desire of food and is related to the meal; and Shulchan Aruch ruled like him in siman 174 seif 6; and even though certainly one should not move from the ruling of Shulchan Aruch — nevertheless l'chatchila it is certainly proper that one have intent in Birkat HaMazon to discharge the wine he drank.`,
);
patch(
  bh,
  "biur-halacha",
  17,
  "ב",
  `<b>Birkat sheloshah discharges it.</b> So wrote the poskim from that [which is written] in Berachot 35b — see there in that which the Gemara challenges: if so let us bless on it three blessings; and ostensibly the Gemara's question applies there only to a little [wine] that satisfies and not to a lot that drags; and so is proven in Pesachim 108a that wine drags and does not satisfy. And whether we say that this sugya in Pesachim holds that even a little satisfies, or whether we say that there it deals with a lot as Tosafot wrote there — in any case it is proven that a lot drags [meaning approximately three cups of a revi'it as in the sugya there in Pesachim]; and so is ruled in Shulchan Aruch below siman 471 seif 1 that a lot drags; and if so, necessarily the Gemara's question in Berachot applies only to a little; but on a lot that drags and does not satisfy it is not applicable to ask — if so it would appear for Shulchan Aruch to distinguish that with a lot one does not fulfill even b'dieved when he blessed HaMotzi; and one could say the Gemara's intent there in Pesachim is that it satisfies and also drags the desire of eating; and that which it says there "and it is impossible that it satisfies" — means that it satisfies alone; if so what is the Gemara challenging in Berachot? And behold Rava drank two [cups], etc., and it was necessary to distinguish between a little and a lot — let us say that it drags and also satisfies — if not, this is not [the explanation]; and it is possible to say that since he became obligated from the time he drank a little and it is related then to Birkat HaMazon — for then the heart is satisfied like through bread — it does not lapse even if he drank a lot; and it requires further study.`,
);
patch(
  bh,
  "biur-halacha",
  17,
  "ג",
  `<b>And the same if he blessed on dates.</b> Meaning b'dieved, for l'chatchila certainly he should bless the special blessing; and even if he ate them within the meal after completion of the meal he should not discharge them with Birkat HaMazon but requires a blessing before and after [such is the view of the Gra in siman 174 and in this siman, and so too Even HaEzer, and they proved this from Yerushalmi; and not like Magen Avraham in siman 177 who copied for the law like Rashba]. And for us this is not applicable, for everything is considered by us within the meal and he does not require a blessing except before it, as in siman 177.`,
);
patch(
  bh,
  "biur-halacha",
  17,
  "ד",
  `<b>Except Birkat HaZan, etc., he has fulfilled.</b> See Mishna Berurah; nevertheless one needs a reason, for behold he lacks in his blessing the blessing of the Land and the blessing of Jerusalem; and therefore one must say that they did not enact to include in the blessing all three matters — food, Land, and Jerusalem — except l'chatchila; and b'dieved if he did not mention only food alone he has fulfilled. Afterwards I found that R' Yona wrote thus at the end of chapter 20, and proved from this that me'ein shalosh is d'rabbanan; and per the one who says it is d'oraisa — in truth it requires further study.`,
);
patch(
  bh,
  "biur-halacha",
  18,
  "_",
  `<b>From doubt (m safek).</b> See Mishna Berurah what he wrote the view of Taz and Eshel Avraham regarding b'dieved — that their view is that in order that he not remain without an after-blessing at all, it is permitted to add. And know further regarding the poskim that I brought above sk 15 in Mishna Berurah — that if he blessed on wine borei peri haEtz he has fulfilled b'dieved, that it is a comprehensive blessing like borei peri haAdamah which also includes the tree; and if so certainly the same applies in the after-blessing — if he blessed on wine "upon the tree and upon the fruit of the tree" he has fulfilled b'dieved; and so some say — see there in klal 50. And if so, even if we take not like the view of Taz, he also has a remedy — namely that he bless only on the tree and upon the fruit of the tree, and have explicit intent to discharge also the doubt-wine that he drank earlier.`,
);

patch(
  gra,
  "beur-hagra",
  9,
  "ב",
  `<b>And if he made, etc.</b> As written in chapter 3 of Challah mishnah 7 "One who makes a dough from wheat," etc., and Raavad wrote — and it is that there is a kezayit in k'dei akhilat pras; and even per the view of Ramban and Rashba who disagree and hold it is not required — and only on account of dragging specifically in rice; and see siman 213 seif 2 and as written.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "ג",
  `<b>And specifically, etc. But, etc.</b> For all measures are not combined in more than k'dei akhilat pras; and above siman 210 seif 10 "One who eats," etc.; and see Magen Avraham.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "ד",
  `<b>In k'dei akhilat pras.</b> Meaning, and specifically that he eats it also in k'dei akhilat pras.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "ה",
  `<b>At the outset he blesses HaMotzi.</b> For here one does not require k'dei akhilat pras, as written "Everything that has in it from the five species," etc., only that it is not for binding as above; and as written "And if he cooked it in a pot he blesses," etc., and the same applies regarding HaMotzi.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "ו",
  `<b>And at the end Borei Nefashot.</b> It is a textual corruption and it should read Borei Nefashot; and as written at the end "And if he cooked it," etc. — what is different? And similarly the main point that in all blessings at the end one requires a kezayit in k'dei akhilat pras.`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "ז",
  `<b>And if he cooked it, etc., and after it Borei Nefashot.</b> Gloss of Rashi, Berachot 41b s.v. "The bread that comes," etc., and from within, etc.; and see Tosafot there s.v. "however they disagree on this," and they wrote "And to me," etc. But R' Yona there — even though he also explains like Tosafot, not on account of this question; and we rule in the law not like him — see there.`,
);

patch(
  ea,
  "eshel-avraham",
  2,
  "א",
  `<b>That they boiled them.</b> There is a textual corruption here, and in place of "that they boiled them" it should read "that he divided them." Yoreh De'ah siman 332, 333.`,
);
patch(
  ea,
  "eshel-avraham",
  2,
  "ב",
  `<b>HaMichya.</b> Explanation of me'ein shalosh. See Yoreh De'ah at length siman 78.`,
);
patch(
  ea,
  "eshel-avraham",
  9,
  "_",
  `<b>Nefashot.</b> Magen Avraham wondered: why should he not bless me'ein shalosh as with bread? And he answered in Sefer Elya Rabbah: we descend one level — with bread, which is fit to bless HaMotzi, one blesses me'ein shalosh; and here, which is fit to bless borei minei mezonot, one blesses borei nefashot rabot, since there is no kezayit in k'dei akhilat pras. And furthermore, bread is important — it appears to me see there.`,
);

patch(
  cs,
  "chatam-sofer",
  1,
  "_",
  `Seif 8 in the hagahah. NB: And regarding buckwheat (Tatarkei) and Turkish wheat (Turkish Veitz) see responsum Chatam Sofer Orach Chayim siman 50 [there he was asked regarding bread and dishes made from flour of a known legume species called buckwheat or Turkish Veitz whether to bless on it shehakol or borei peri haAdamah; and the content of my answer: if it were simple that it is a legume species they would bless shehakol per my view. However, even if it is certainly not from the five species of grain — nevertheless one should be in doubt whether it is a species of rice, and then its blessing is borei minei mezonot; and he expanded there to explain the law of rice bread and dochan bread regarding blessing; and in the aforementioned case he concluded thus: "And since I do not have a clear matter in my hands, etc., one should not eat it except within the meal — neither that Turkish Veitz nor the buckwheat."}`,
);
patch(
  cs,
  "chatam-sofer",
  2,
  "_",
  `There in Mechaber seif 17 — that if one ate deisa (porridge), NB see in Even HaEzer who disagrees, and so is the view of Be'er HaGolah, and so it appears to me.`,
);

patch(
  dm,
  "dagul-merevavah",
  1,
  "_",
  `He explains that orez (rice) is yerez (millet); but that dochan should be yerez, he does not explain. And per Rashi dochan is panitzu (fava beans). And since we have no practical consequence so much to know what is the explanation of dochan — for everything that is not in the category of rice one blesses on it shehakol — therefore Magen Avraham was not precise in his language.`,
);

patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `(Taz sk 18) And see there siman 174 seif 7, so it should read.`,
);

const PATCH_COUNT = 27;
console.log(`ok siman 208 remainder-c — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-208.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const SLUGS = new Set([
  "biur-halacha",
  "beur-hagra",
  "eshel-avraham",
  "chatam-sofer",
  "dagul-merevavah",
  "levushei-serad",
]);
const items = (queue.items || []).filter((it) => SLUGS.has(it.slug));
for (const it of items) {
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
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
);

let fail = 0;
for (const it of items) {
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
  console.error(`Preflight: ${fail} failure(s) of ${items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${items.length - fail}/${items.length} blocks`);
