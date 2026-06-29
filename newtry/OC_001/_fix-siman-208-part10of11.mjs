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

const rae = "output/siman_208/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_208/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_208/turei-zahav/part-001.txt";

patch(
  rae,
  "rabbi-akiva-eiger",
  7,
  "_",
  `Magen Avraham note 22 — to go back and bless borei peri haEtz. I am puzzled on this — for there "pri" is upon him, for one blesses borei peri haGafen, and if so automatically he properly blesses borei peri haEtz, except that he did not specify which tree; and if so it is inferior to if he blessed shehakol, for he has fulfilled.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  8,
  "_",
  `Seif 17 — that if he ate deisa, specifically deisa that has no connection to Birkat HaMazon, for even if he established a meal on it one does not bless Birkat HaMazon. But pat haba'ah b'kisnin, which is complete bread, except that without establishing a meal the Sages did not obligate Birkat HaMazon — for from the Torah on complete bread also there is no obligation of Birkat HaMazon unless he ate enough to be satisfied. Eben HaEzer siman 168 — on this Birkat HaMazon exempts it since it is truly bread. And likewise in Ganat Veradim, Chayei Adam siman 53.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  9,
  "_",
  `Be'er HaGolah — likewise with deisa, and he did not come to exempt. And Pri Chadash agreed, and Ran on Pesachim daf 157 states explicitly that for deisa Birkat HaMazon exempts. And regarding wine — his opinion and Ran in Milchamot that Birkat HaMazon does not exempt it.`,
);
patch(
  st,
  "shaarei-teshuvah",
  1,
  "_",
  `In Shulchan Aruch — one blesses after them, etc. If one ate fruits in the measure of the after-blessing and vomited again, he does not bless the after-blessing, for it is no worse than if digested — so too in Beit Yosef. And see Peri Megadim, Rishon Berachot siman 21.`,
);
patch(
  st,
  "shaarei-teshuvah",
  12,
  "_",
  `Dochan — see in responsa Beit Ephraim siman 13, explained at length in these laws; what is summarized from them briefly: One who makes dough from wheat and from rice and baked bread from it — if there is from the wheat a kezayit within kedei achilat pras, that is, when he eats three beaten eggs which are six olives, he has already eaten from the mixture a kezayit of wheat and ate three eggs from the mixture, and did not linger in this eating except the measure required for eating three eggs of wheat bread with accompaniments and reclining — for through this he eats quickly and does not linger in his eating — he blesses after it three blessings, and needless to say he blesses before it haMotzi, even though the majority is rice. And if he wants to eat less than this measure, he should fear heaven not to eat except within the meal where he eats other bread after which he is obligated in three blessings. And if he eats bread from the mentioned mixture less than the measure of a peras, which is three beaten eggs, and he has no kezayit from other bread — then if he is satisfied from it he blesses after it Birkat HaMazon, and if he is not satisfied he blesses only one blessing me'ein shalosh. And if the mixture does not have so much grain that when he eats only the measure of four eggs there is in it a kezayit of wheat and he ate the measure of four eggs — he must bless Birkat HaMazon. And if there is not so much in the mixture — then before it he blesses haMotzi, and if he is satisfied from his eating he blesses Birkat HaMazon, and if not he blesses me'ein shalosh; and even a kezayit from the mixture he blesses me'ein shalosh, and specifically when there is taste of grain there; but if there is no taste of grain, even though there is a kezayit within kedei achilat pras, he blesses before it borei minei mezonot and after it borei nefashot rabot, like the blessing on rice. And if the majority of the dough is grain and its taste is grain and the taste of rice is not discernible and he eats from it a kezayit — there is one who appears to hold that he must eat grain so much from the mixture until he has certainly eaten a kezayit of grain, then he blesses Birkat HaMazon; and it does not appear so. And it further appears that whenever the majority is grain it suffices, even though its taste is not grain; and similarly he must eat so much from the mixture until he has certainly eaten a kezayit from the grain. And even though there is within kedei achilat pras in this mixture — if he is not satisfied from it, even though he ate the whole peras, only that he lingered in his eating more than the measure mentioned above — he blesses only me'ein shalosh; and me'ein shalosh one must bless even on a kezayit from the mixture. And I already explained that one must be careful not to eat except within the meal; and it appears to me also that if there is more than kedei achilat pras but he ate in haste and did not linger in his eating more than the measure mentioned above — he blesses after it Birkat HaMazon, since he ate from the mixture so much that he has certainly eaten a kezayit of grain; and also if he ate it within kedei achilat pras he blesses after it three blessings. And the law of mixtures of wheat flour and rice that I wrote above — it appears to me that likewise other species with one of the five species — their law is equal in all the ways I wrote; and there are those for whom it does not appear so from his words, and therefore there would be many distinctions of laws; and some say that barley too is equal to wheat; and also regarding mixtures of other species there are several divisions — one who wants to stand on them should examine the responsa mentioned.`,
);
patch(
  st,
  "shaarei-teshuvah",
  14,
  "_",
  `The land — Ba'er Heitev; and see in Halakhot Ketanot part 2 siman 55; and see in Beit Yosef in the name of Pri HaAretz part 3, a manuscript — if they brought raisins from outside Eretz Yisrael and made wine from them in Eretz Yisrael, even though in Eretz Yisrael the wine was completed, one concludes on peri haGafen, etc., and it is simple.`,
);
patch(
  st,
  "shaarei-teshuvah",
  15,
  "_",
  `(Shulchan Aruch siman 13) And likewise — if he ate meat and fish, see in Beit Yosef that the custom is to eat latkes with much cheese and they do not bless on the cheese; and many are accustomed to eat in the morning kisnin with cheese and bless only on the kisnin. And by law one blesses on the main thing and exempts the subsidiary — they touched on this and one must settle the matter, end of his words. And see there above he brings from Maharshal that it appears to him from the language of Tur and Shulchan Aruch that even though meat and fish came to accompany the five species, and he left in doubt latkes with cheese, etc. — but in truth the language of Shulchan Aruch does not imply so, and also the language of Tur can be resolved.`,
);
patch(
  st,
  "shaarei-teshuvah",
  18,
  "_",
  `Borei peri haGefen — Ba'er Heitev; and also in Even HaEzer he disagrees with Mahari Levi. And see in Yad Ephraim what he wrote on this.`,
);
patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `Ground — Ba'er Heitev; and see in Yad Ephraim what he wrote on the words of Magen Avraham on this.`,
);
patch(
  st,
  "shaarei-teshuvah",
  3,
  "_",
  `In general — Ba'er Heitev; and see Peri Megadim part 1 siman 68, who is concerned to say that one should bless haMotzi and three blessings, for such is the opinion of Rabbeinu Tam in challah, and he brought there the words of Bach and Taz; and see in responsa Beit Ephraim simanim 11 and 12, and I brought it above siman 167 — and it is clear that the custom of the world is to bless borei minei mezonot and me'ein shalosh, and he has what to rely on. In Shulchan Aruch seif 4, and Tosafot were in doubt, etc. — see in Yad Ephraim what he wrote on Magen Avraham on this.`,
);
patch(
  st,
  "shaarei-teshuvah",
  9,
  "_",
  `The rice — Ba'er Heitev; and see in Beit Yosef in the name of Mahari Malko and Leket Yosher siman 8 — if he ate cooked rice and blessed on haMichya, or ate cakes and rice and blessed on haMichya, it exempts the rice b'dieved, and it is properly called Michya and daily sustenance, etc.; and it appears that even for us, where we are in doubt which is rice, nevertheless since he already blessed on haMichya he does not go back and bless borei nefashot rabot, for doubt is to be lenient. And see in Peri Megadim who wondered why we do not bless on grapes from Hungary borei peri haAdamah; and see in Mishbetzot Zahav on bread they make from Turkish wheat.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `He blesses after them, etc. — because from their importance, that Eretz Yisrael was praised with them, they established for them a separate blessing after them.`,
);
patch(
  tz,
  "turei-zahav",
  10,
  "_",
  `In one blessing me'ein shalosh, etc. — In Tur he brings these formulas in this blessing, for Semag wrote that one should say after "for You are Hashem good and do good to all" — "and we thank You for the land and for haMichya, and for fruits — on the land and on the fruits, and for wine — on the land and on the wine," so that there be a kind of signature near the signature; and afterward he wrote in the name of Rosh that he would not say "and we thank You," etc. And Beit Yosef wrote that without this there is a kind of signature in what one says "and we bless You over it in holiness and purity"; and in my humble opinion this is not a kind of signature, and rather we have more reason to say that in what one says "for You are Hashem good and do good" is included the goodness of the land and fruits and haMichya and wine. But in my humble opinion one should bring proof that one should say it — since it is stated in siman 187 in the blessing "we thank You," R' Abba says one must mention in it thanks at the beginning and end, and such is its language — "and for everything we thank You"; and one need not say before the signature "and we thank You, Selah, for the land and for food," for otherwise there would be three; and just as one may not diminish, so one may not add, end of his words — from which we learn that were it not for the addition it would be fit to say it so that there be a kind of signature; automatically here one should say it, for there is no addition as stated.`,
);
patch(
  tz,
  "turei-zahav",
  11,
  "_",
  `Or on the land and on the fruits. — In the Gemara it states: for fruit one concludes on the land and on the fruits, and the blessing on wine is not mentioned there; and Rambam and Ri hold that it is included in the blessing on fruits, and therefore they did not mention it; and even though at the opening of the after-blessing one begins on the vine and on the fruit of the vine, nevertheless at the conclusion of the blessing it appears to them like the conclusion of the blessing on fruits. And Ri and Raavad and Rosh hold that the Gemara did not need to mention it because from the first blessing on wine it is heard that forever on wine one mentions a specific name — automatically it implies that in the after-blessing one begins on the vine and on the fruit of the vine and concludes also on the land and on the fruit of the vine. And here in Shulchan Aruch he did not decide — whoever acts like one master acts, and whoever acts like the other master acts; and according to what appears, since there is no decision here and one who concludes on fruits admits that also if he concludes on the vine he has acted properly, for there is no doubt here except that also for one of fruits it is proper — but rather that on peri haGafen alone the blessing on fruits does not suffice; it is more pleasing to us to say what helps for everyone, as stated.`,
);
patch(
  tz,
  "turei-zahav",
  12,
  "_",
  `And he precedes haMichya — because its blessing is borei minei mezonot, which is important and distinct; and they also precede in the verse; and afterward wine, which is also important and has its own blessing in particular.`,
);
patch(
  tz,
  "turei-zahav",
  13,
  "_",
  `And all the more so if he ate meat. — It appears that the reason of the kal va'chomer is that wine and apples are in any case both a tree species, all the more so what is not a tree species. Tur wrote: And I would like to say that likewise if he ate kinds of accompaniments and ate with them from the five species, one need not bless on the accompaniments, for the blessing on haMichya exempts them, for they too satiate — and R' Yosef Karo did not admit to his words; and Beit Yosef explained the reason he did not admit — that accompaniments, even though they satiate, do not satisfy, and grain satisfies; therefore they are not comparable to each other, end of his words. And Maharshal questioned this — for it is stated in the beginning of Berakhot that if one blessed on bread he has also fulfilled the blessing on dates, since dates satiate; and according to Beit Yosef it is difficult — for dates do not satisfy. And one could answer that dates are different, for they are produce of the ground like bread, unlike accompaniments which are meat and fish; and all this is not equal to me, for certainly plain accompaniments do not refer to meat and fish; and furthermore, if so, other kinds of accompaniments that are produce of the ground should be exempted by that blessing me'ein shalosh, and we do not find this, and they should have divided on this. And in my humble opinion, the reason Rosh did not admit to this is that three blessings are different, for haZan is mentioned in them, and therefore he is exempt from anything else that satiates, as stated in seif 17 that the blessing of haZan is the main thing if it comes to exempt dates that satiate; unlike with me'ein shalosh, where nothing of food was mentioned — how can it exempt another thing whose importance is from satiation, even though one says on haMichya — nevertheless food is not mentioned there, as appears to me.`,
);
patch(
  tz,
  "turei-zahav",
  14,
  "_",
  `He drank wine and blessed borei peri haGefen — this Tur wrote in the name of his brother R' Yitzchak, who thought he is exempt from the first blessing of grapes, which is borei peri haEtz, on account of having blessed borei peri haGefen; and likewise from the after-blessing of grapes he is exempt on account of having blessed on the vine — and Rosh did not admit to him on either; and nevertheless he agreed that if he blessed on grapes borei peri haGefen he has fulfilled. And Beit Yosef explained that therefore he did not admit to him that l'chatchila one must bless on each thing its appropriate blessing, but b'dieved he fulfills with the blessing borei peri haGefen on grapes; and because of his flow he was not precise — for if so, why did R' Yechiel say "and nevertheless he agreed to this"? He should have said that b'dieved he fulfills even if he blessed on wine, for grapes too are exempt from their blessing since it helps according to Beit Yosef's explanation. Rather it is simple that even b'dieved Rosh forbade, and his words are literally the words of Rashi that Beit Yosef brings, who wrote: And even though we learned "if one blessed on fruits of the tree borei peri haAdamah he has fulfilled" — this is in one species and he erred and blessed on it borei peri haAdamah; but a radish and olive and he blessed on the radish — the olive is not exempted; and such too is his explanation of the words that Rosh did not admit to his son R' Yitzchak, who thought that also for grapes and wine the blessing on wine helps for grapes, and he did not admit to him except that he agreed if he blessed on grapes themselves borei peri haGefen that he has fulfilled, like the words of Rashi. And here in Shulchan Aruch he ruled plainly on wine and grapes and did not distinguish whether he intended at the time of the blessing on wine and grapes or not; and Beit Yosef mentioned this and did not decide — and it is puzzling, for in siman 206 seif 2 he ruled that intention helps regarding borei peri haAdamah with borei peri haEtz — automatically the same here, that it helps that he blessed on wine and intended to exempt also the grapes, that they are exempt from the blessing on grapes.`,
);
patch(
  tz,
  "turei-zahav",
  17,
  "_",
  `That if he ate deisa — meaning, not within the meal; for if within the meal, even before Birkat HaMazon, certainly three blessings exempt. And for wine that Birkat HaMazon exempts — the reason appears from what we say: wine satisfies, satisfies. And see what I wrote siman 177 seif 7 that Birkat HaMazon does not exempt borei nefashot rabot.`,
);
patch(
  tz,
  "turei-zahav",
  18,
  "_",
  `He should not include doubt. — The explanation of this matter is not sufficient from what is written here — these words in Teshuvot HaRash dam siman 30 regarding one who wants to eat one thing that has doubt in its blessing, namely whether the after-blessing is borei nefashot rabot or me'ein shalosh, and wants to eat it and escape the doubts — namely, that afterward he will eat two things: the first whose blessing is borei nefashot rabot and the second whose blessing is me'ein shalosh — automatically he will fulfill the blessing of that thing he ate, whatever you wish. And his intent there is that certainly if he will eat another species whose blessing is me'ein shalosh and bless it, certainly like one who eats me'ein shalosh — then he can certainly do so, for there is no inconsistency here; but it deals with one who has no other species whose blessing is like what he ate, but a different blessing me'ein shalosh, only that he wants to insert into that blessing what he has doubt about in what he ate — this was the question, and he answered on this that one cannot insert anything additional in the after-blessing, even though he did not mention for this Name and kingship in particular; and he derived it from that which is in Yerushalmi that Rav Yirmiyah never ate whole wheat in his life because of doubt in the after-blessing, and as Tur and Shulchan Aruch wrote in seif 4 that one should be in doubt whether to say on it borei peri haAdamah, and as stated there — evidently one may not add anything because of doubt; and if so he did not eat that thing at all — and this is what was asked of the author of Teshuvot HaRash dam. But Beit Yosef and Shulchan Aruch here wrote this matter regarding one who already ate and does not know what to bless afterward — he has no remedy to add anything in the blessing; and this too is in a case that I mentioned that it is impossible for him to find to eat what needs a blessing like what he already ate, out of doubt — then he has a remedy without concern, unless he wants to bless a different blessing and include in it what pertains to that doubt — in this there is a prohibition. And in my humble opinion the author of Teshuvot HaRash dam admits in this that he has permission to add what he needs because of doubt, since it is impossible for him otherwise — for his main proof is from R' Yirmiyah who never ate whole wheat in his life, as stated; and this is l'chatchila, that it is not proper to place oneself in doubt l'chatchila; but b'dieved it is better to add what he needs, since there is no blessing in vain here, for in any case he must bless and it is not said that he should not bless. And in Levush he brought these words in a way that is not settled according to my opinion, and he further wrote that from doubt one should bless borei nefashot rabot — and it is not clear, for Tur wrote in the name of Rosh siman 207 that for something fit for me'ein shalosh because of lack of measure, another blessing is not relevant; and so too is his way, as appears to me, clear after examination in the source of the law.`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "א",
  `The five species of grain — which are wheat, barley, spelt, oats, and rye, which are also important; and such is the language of Tur: spelt is a kind of wheat; oats and rye are a kind of barley; and they further have superiority, for on them man lives — therefore if he made bread from them he blesses haMotzi, and if he cooked them or ground them, etc. And see siman 168 seif 4 on spelt.`,
);

const PATCH_COUNT = 20;
console.log(`ok siman 208 part10of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part10of11.json",
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
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
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
