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

const ma = "output/siman_208/magen-avraham/part-001.txt";
const mc = "output/siman_208/mechaber/part-001.txt";

patch(
  ma,
  "magen-avraham",
  2,
  "א",
  `<b>The five species of grain.</b> They are wheat, barley, spelt, oat (shibbolet shu'al), and rye (shifon); but what we call tertrakhi is not included — and see what is written in siman 454.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ב",
  `<b>That they boiled them or crushed them.</b> It implies that at first it deals with boiling without crushing; and it is difficult — for in seif 4 he writes that when they boiled the kernels whole one blesses borei peri haEtz; and it is possible that here it deals with boiling until it was mushed; and so in Levush seif 4 — see there; and so below in seif 7; and this is the language of Terumat HaDeshen: specifically when the wheat was crushed and stuck together and became like a kind of stew — but if he cooked the wheat whole and the kernels remain whole, one blesses borei peri haEtz — end of his words. It must be said that the first part — "when the wheat was crushed and stuck," etc. — means that through cooking they stuck together; for certainly through crushing alone they do not stick; but if he cooked the wheat whole — meaning that he did not remove the shell — and if so the kernels remain whole, that they do not stick through cooking, one blesses borei peri haEtz. And the language of the Rambam — "that he divided them or crushed them" — implies that "crushed" means even if he did not divide them, only that he removed their shell; and so from what is written: the rifot, and they are barley from which the shell was removed; and so from what is written in seif 4. But in the Gemara it only teaches "divided" — per Rashi this means that he divided one into two, as is proven in the second chapter of Moed Katan; and if so — what did Bach write, that one should not eat these barley or wheat (genci, gersten) except within the meal, as written in seif 4? That is when they did not stick through cooking; but if they stuck through cooking, one blesses me'ein shalosh — and specifically that they were mushed well, as Tosafot wrote; and the same law applies to whole grits; and see in Shelah; and see siman 200 seif 2, that the sauce has the law of the food itself.`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "_",
  `<b>To swallow it.</b> Meaning — to eat it; and see siman 204.`,
);
patch(ma, "magen-avraham", 4, "א", `<b>Grain.</b> All five species are included.`);
patch(
  ma,
  "magen-avraham",
  4,
  "ב",
  `<b>Whole.</b> That its shell was not removed and it was not divided — only as they bring it from the threshing floor; unlike rice, whose way is to cook it whole (as is written in Rif) — see seif 7 and seif 2.`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "ג",
  `<b>And Tosafot were uncertain.</b> Even raw; and he ruled regarding flour in seif 16 that one blesses Borei Nefashot — for there, since it was changed, even though olive oil was also changed and one blesses on it borei peri haAdamah — there it has no other importance; here it has other importance in bread (gemara).`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "ד",
  `<b>Within the meal.</b> And if it happened that he ate them not within the meal, he blesses after them Borei Nefashot — as is the view of Rabbenu Yonah; and in my humble opinion — if they make a dish from oat (shibbolet shu'al) that they call genci gritz, and put in them much water that is only fit to drink — that they call zofa — it is possible that the water is not nullified regarding the kernels, and one must bless on the kernels borei peri haEtz and on the water shehakol, for their main [purpose] is on account of the water, as is written in siman 204 seif 1 regarding barley beer; nevertheless the kernels are not nullified to the sauce, for the five species are considered [significant], as is written in siman 204; and see siman 168 seif 13.`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "_",
  `<b>For eating and for chewing it.</b> It implies that if it is not fit to chew it, even if it is thick, one blesses shehakol; and afterward it says: if it is fit for drinking, etc. — it implies that if it is thick one blesses me'ein shalosh; and so is essential; and so in the Gemara: on thick — me'ein shalosh; and so from Rashi regarding a stew; and so in Agudah; and see siman 204 seif 2, as written.`,
);
patch(
  ma,
  "magen-avraham",
  7,
  "א",
  `<b>Rice.</b> Riz; dochan — yeriz in foreign languages, and the opposite — therefore one should not eat them when they have been mushed except within the meal; and if he ate them without a meal, he blesses on both of them shehakol from doubt (Shelah and Bach). And in Levush he wrote that the custom of the world is: rice — riz; dochan — yeriz; and so too Rabbenu Yonah and in Levush.`,
);
patch(
  ma,
  "magen-avraham",
  7,
  "ב",
  `<b>Until it was mushed.</b> This is the language of Rabbenu Yonah; and it appears that it requires that it be mushed, as is written in seif 2 regarding wheat; and even though R' Yonatan wrote that there is a distinction between rice and dochan — that on rice one blesses me'ein shalosh even when it is whole — it may be said that "whole" here does not mean to say that we do not require that it be mushed, but rather that it does not require that it be crushed; and so at the end of his words, that he wrote: but on dochan one does not bless on it when it is whole, for it is not its way to eat it whole except through crushing or grinding — but rice — its way is to eat it whole — end of his words. Thus the "whole" that he mentioned regarding rice is only to exclude crushing; but mushed it requires. Nevertheless one may distinguish between wheat and rice — for the way of rice is to cook it when it is whole without any crushing; and therefore even when it was not cooked much, its blessing does not change; unlike wheat, for it is not the way to cook them except divided or crushed, such as rifot; and therefore when they cook them whole without any crushing, it is as if he chewed them raw — end of his words, Rabbenu Yonah; and if so — the view of Rabbenu Yonah is that even if it was not mushed, one blesses me'ein shalosh; and this requires further study regarding Rama — why he disagreed with him; and Bach wrote that without being mushed it is a doubt, and one should not eat it except within the meal; it may be derived from this that anything whose way of eating is thus — one blesses me'ein shalosh; and see seif 2.`,
);
patch(
  ma,
  "magen-avraham",
  7,
  "ג",
  `<b>It is the majority.</b> So too the Rosh; and so ruled the Rambam; and so in many places; and he retracted from what is written in Beit Yosef — unlike Bach, who made a doubt from this: as if when there is in the rice a little of another species, its blessing is nullified — this is something that does not enter the mind; and see siman 204; and even in Beit Yosef he only wrote that it is implied from the words of the Rambam — see there.`,
);
patch(
  ma,
  "magen-avraham",
  8,
  "א",
  `<b>On dochan bread.</b> And if you will say — behold it changed for the better; and it may be said: since it left the category of fruit, one cannot say "fruit of the ground"; and haMotzi — one blesses only on the five species; and therefore one blesses shehakol; and it is possible to say — because its way of eating is not thus, one blesses shehakol.`,
);
patch(
  ma,
  "magen-avraham",
  8,
  "ב",
  `<b>They were completely mushed.</b> That it is not their way of eating thus [Beit Yosef]; and specifically when they were mushed through a perforated vessel, that they are very thin — or that he made a dish from legume flour, as is written in Levush and Shelah; but when he mushed it in the palm — the main way of eating them is thus; and furthermore, the substance remains and one blesses borei peri haAdamah; and see siman 202 seif 7.`,
);
patch(
  ma,
  "magen-avraham",
  9,
  "א",
  `<b>Me'ein shalosh.</b> For whatever has in it from the five species, one blesses me'ein shalosh — as is written in seif 2.`,
);
patch(
  ma,
  "magen-avraham",
  9,
  "ב",
  `<b>If there is not in it.</b> So wrote Radbaz in the name of Terumat HaDeshen: we learned in tractate Challa — one who makes dough from wheat and from rice — if it has the taste of grain, it is liable in challah, and a person fulfills with it on Pesach; and Rabbenu Yonah wrote in siman 453 seif 2: Raavad and Rashba — and this is when there is there an olive's bulk within kedei achilat pras; and Maggid Mishneh and Ramban hold — even if there is not an olive's bulk within kedei achilat pras, because the wheat draws the rice — and specifically in rice, but not in other species; and so too the Rambam and the Rosh — end of his words. And it is known that the law of challah and haMotzi are equal in this for all — see siman 168 seif 13: regarding challah it is written "bread," and regarding matzah the Gemara compares it to haMotzi, as is proven in Berachot daf 37b; and also the Rambam wrote in Hilchot Matzah: this is the rule — all that one blesses on it haMotzi, a person fulfills with it on Pesach; and see siman 188; and if so it is proven that in rice — even though there is not an olive's bulk within kedei achilat pras — one blesses haMotzi and three blessings, per the view of Maggid Mishneh and his camp; and in other species it is not called bread for the matter of haMotzi; and the same applies for the matter of Birkat HaMazon — for the Rambam wrote in chapter 3, halacha 11: all that one blesses on it haMotzi, one blesses at the end Birkat HaMazon; and all that one blesses on it me'ein shalosh, one blesses at the end me'ein three — except for rice; and so in Yerushalmi; nevertheless there it concludes that it refers to species that one blesses on them; and if so — this requires further study: why did he write here at first haMotzi and at the end "al haMichyah," and we do not find the like in the entire Talmud; and it must be said: since we hold regarding all prohibitions in the Torah that if he ate a little at a time and paused within kedei achilat pras he is not liable — if so, the same applies for the matter of Birkat HaMazon: he need not bless until he eats an olive's bulk without having paused within kedei achilat pras; and here, since an olive's bulk is mixed within kedei achilat pras, he necessarily pauses between them — and therefore he does not bless Birkat HaMazon; and the same applies for the matter of matzah (and see responsum siman 210); but haMotzi — one blesses, for on any amount one blesses haMotzi — as is written somewhat in Levush; nevertheless it is difficult: since he does not combine — if so, he should also not bless "al haMichyah," for on the rest of the species he blesses only Borei Nefashot; and furthermore — regarding challah: even though in flour of grain alone there is the measure of challah, nevertheless if he mixed it with other flour he is exempt from challah if there is not in it an olive's bulk within kedei achilat pras — thus it is totally nullified; and it may be said that for the matter of blessing we hold: whatever has in it from the five species, one blesses me'ein shalosh — even less than an olive's bulk within kedei achilat pras, as is written in seif 2; but it is difficult — why did he write: if he cooked it, he blesses after it Borei Nefashot — for we do not find this except regarding rice, as the Rambam wrote; and this requires further study; nevertheless — if he did not mix it with flour, only with the rest of the species, he blesses me'ein shalosh and "al haMichyah" — even if there is not within kedei achilat pras, as is written in seif 2.`,
);
patch(
  ma,
  "magen-avraham",
  12,
  "ג",
  `<b>And upon the fruit of the vine.</b> And in Mordekhai it is written to conclude on the land and on the sustenance and on the fruits; and so too Agudah; and so from what is written in seif 10 and seif 11.`,
);
patch(
  ma,
  "magen-avraham",
  13,
  "_",
  `<b>And he drank wine.</b> Even though he concludes on the land and on the fruits, as written above — nevertheless, since he does not mention fruits in the opening, he has not fulfilled.`,
);
patch(
  ma,
  "magen-avraham",
  14,
  "_",
  `<b>He drank wine.</b> If he erred and blessed on the wine borei peri haAdamah, he must return and bless borei peri haGafen (Bach, R' Yehuda Levi, Magen Zahav); and even strong wine to which he did not put water — if he blessed borei peri haAdamah, he has not fulfilled — see Berachot end of chapter 7.`,
);
patch(
  ma,
  "magen-avraham",
  15,
  "_",
  `<b>If b'dieved.</b> And the same law applies if he drank wine and intended to exempt the grapes — he has fulfilled, as is written in siman 206 seif 2 (Beit Yosef).`,
);
patch(
  ma,
  "magen-avraham",
  16,
  "_",
  `<b>The wine blessing.</b> Mordekhai wrote in chapter 8, and this is his language: the general rule of the matter — wherever wine exempts beverages from the blessing before it — for example, when before him were wine and other beverages — so too it exempts them from the blessing after it, by an a fortiori argument from fruits within the meal: bread does not exempt them before it, yet it exempts them after it, etc. But wherever the beverages were not before him at the time that he blessed on the wine, and he needed to bless on the beverages — for one who drinks nowadays has no established practice to drink wine, and there is no "pass the cup to drink" in it — he did not exempt the beverages that come after it from blessing before them; the same applies — he must bless after them — end of his words; and so too Agudah; and Shelah wrote that we hold there is an established practice for wine, as is written in siman 213; if so, it is like a meal — and just as in a meal, even if he said "Come, let us bless" and wants to drink, he requires a first blessing but not an after-blessing — the same applies regarding an established practice of wine — end of his words; and in my humble opinion — for even if he only withdrew his hands from bread, he requires an after-blessing, as is written in siman 177 seif 2; all the more so when he said "Give us to eat and let us bless"; nevertheless — where there is an established practice on wine, he does not require an after-blessing on beverages; and see siman 206 seif 5.`,
);
patch(
  ma,
  "magen-avraham",
  17,
  "_",
  `<b>On dates.</b> Wine and dates too (Saadia); and grapes — unlike deisa, which has other importance in bread.`,
);
patch(
  ma,
  "magen-avraham",
  18,
  "_",
  `<b>On doubt.</b> Levush wrote that if he ate a fruit and does not know whether it is of the seven species, he should not drink wine and include it in "on the tree"; and it is better to bless Borei Nefashot — and this requires further study — end of his words; and in my humble opinion — if he has nothing to include in it, it is better to bless "on the tree," for he exits in any case, as is written in seif 13; and if it is a beverage, he should not bless at all after it, as the poskim wrote — for one should more be concerned for a blessing in vain than for eating without a blessing, for all blessings are d'rabbanan.`,
);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `<b>The law of the me'ein shalosh blessing after the five species of fruits and the five species of grain. And it contains 18 seifim:</b> On the five species — they are grape, fig, pomegranate, olive, and date — one recites after them one me'ein shalosh blessing.`,
);
patch(
  mc,
  "mechaber",
  10,
  "main",
  `In one me'ein shalosh blessing on fruits outside the Land, one concludes on the land and on the fruits; and in Eretz Yisrael one concludes on the land and on its fruits; and if in chutz la'aretz one eats from the fruits of the Land, one also concludes on its fruits.`,
);
patch(
  mc,
  "mechaber",
  11,
  "main",
  `In the me'ein shalosh blessing on wine, one does not conclude "upon the vine and upon the fruit of the vine"; rather, upon the land and upon the fruit of the vine, or upon the land and upon the fruits.`,
);
patch(
  mc,
  "mechaber",
  12,
  "main",
  `One mentions in it me'ein haMe'orei on Shabbat and Yom Tov and Rosh Chodesh, but not on Chanukah and Purim. If one ate fruits of the seven species and ate types of mezonot and drank wine, he includes everything in one blessing; and he precedes the sustenance, and afterward the vine, and afterward the tree; and he says: upon the sustenance and upon the nourishment, and upon the vine and upon the fruit of the vine, and upon the tree and upon the fruit of the tree; and he concludes upon the land and upon the sustenance and upon the fruit of the vine and upon the fruits.`,
);
patch(
  mc,
  "mechaber",
  13,
  "main",
  `If one ate fruits of the seven species and also ate apples, he need not bless Borei Nefashot on the apples, since they are also included in the blessing "upon the tree," for they too are fruit of the tree. But if one ate apples and drank wine, he must bless Borei Nefashot on the apples; and all the more so if one ate meat or fruit of the ground and drinks wine, or ate from the seven species — that he must bless on each and every one. And the same applies if one ate meat and fish and ate from the five species — the blessing "upon the sustenance" does not exempt the meat and the fish.`,
);
patch(
  mc,
  "mechaber",
  14,
  "main",
  `If one drank wine and blessed borei peri haGafen and ate grapes, he must bless on them borei peri haEtz; and likewise in the after-blessing he must mention upon the tree and upon the fruit of the tree.`,
);

const PATCH_COUNT = 28;
console.log(`ok siman 208 part5of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part5of11.json",
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
