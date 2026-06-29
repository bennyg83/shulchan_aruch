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

const mb = "output/siman_210/mishnah-berurah/part-001.txt";
const pm = "output/siman_210/peri-megadim/part-001.txt";
const rae = "output/siman_210/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_210/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_210/turei-zahav/part-001.txt";
const ye = "output/siman_210/yad-ephraim/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(1) The one who eats — all foods join to a kezayit to bless upon them the appropriate after-blessing; if from the seven species, the three-form blessing; if not from the species, for purposes of borei nefashot. If he ate half a kezayit from the seven species and half a kezayit of another, he blesses after them borei nefashot; and likewise when he ate half a kezayit of bread and half a kezayit of something upon which one blesses borei nefashot — he blesses borei nefashot. And all beverages join to a revi'it. The one who eats and drinks [meaning he ate less than a kezayit and drank less than a revi'it] — they do not join even for purposes of borei nefashot. Pickle liquid on vegetables joins to a kezayit, for all accessories of food [a beverage that comes to sweeten food] is food; and likewise bread soaked in beverage or in wine or in sauce. But if he ate the bread with the sauce without dipping, it does not join. However, if the sauce was of a food from things one blesses upon them as on the food [and this is explained in siman 200] — it is possible the sauce joins to the food, and this requires further study [Chayei Adam]. If he ate the kezayit a little at a time and tarried much in his eating — if from the beginning of the eating until the end of the eating is more than kedei achilat pras, it does not join [and the measure of pras, see below siman 212; there are views whether three eggs or four eggs; and here it is reasonable that it does not join even only within three eggs, for the measure of kezayit even for bread for purposes of birkat hamazon is only d'rabbanan; and so implies from Chayei Adam]. And Peri Megadim wrote that all this is only regarding the measure of kezayit; but regarding bread kedei sevi'ah, whose obligation is from the Torah — he is obligated even if he ate a little, for in any case we call him "and you ate and were satisfied" therein. If there was sponge-cake bread that swelled until the air pockets in it are imperceptible — one who eats a kezayit from it as it is does not bless, for in truth he did not eat a kezayit. And likewise if it was a kezayit and shrank and diminished in its measure — one does not bless after it unless it returned and swelled again [Acharonim]. And regarding drinking a revi'it: if he drank and paused a little and returned and drank until he completed a revi'it — some say it does not join, and some say it joins if he did not wait from the beginning of the drinking until the end of the drinking more than kedei achilat pras [from below in siman 212 seif 10], and the Gra agreed there in his Beur that the halachah follows this second view. And behold, regarding drinking coffee and tea, whose way is to drink them when hot and it is hard to drink them without pausing unlike other beverages but only a little — there is great dispute among poskim whether one needs to bless an after-blessing per the first view stated above; and in Machatzit Hashekel and Chayei Adam they lean not to bless, and so too in Dagul Merevavah, and such is the custom of the world. And practical people are accustomed that at the end of their drinking they leave the measure of a revi'it to cool slightly so that he can drink a revi'it without pausing and bless an after-blessing; and it is good to do so in order to satisfy all views, and especially per the Gra stated above who ruled like the second view that the measure is kedei achilat pras for joining — also in drinking it is certainly correct to do so. If he ate less than the measure and went outside and returned immediately — certainly he must bless again at the outset; even regarding bread, there is room to examine: if he returned and ate less than the measure within kedei achilat pras whether it joins — perhaps since he went outside it is like hesech ha'da'at; and see Magen Avraham who leans that it joins.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) Less than a revi'it — and the measure of revi'it and kezayit, see above in siman 271 seif 68 in Mishna Berurah and Biur Halacha there, and below in siman 486 in Mishna Berurah and Biur Halacha.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) He blesses at the outset — and even on any amount whatsoever, whether food or beverage, for it is forbidden to enjoy this world without a blessing.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(4) And after it, etc. — for regarding bread is it not written "and you shall eat and be satisfied and bless," etc., and there is no eating anywhere in the Torah less than a kezayit; and regarding other things, when the sages enacted an after-blessing similar to this they enacted. And regarding beverages too — since we find in the world regarding drinking beverages that are forbidden, whose obligation is a revi'it — here too when they enacted an after-blessing on a beverage they enacted it at this measure.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ה",
  `(5) A grape berry — and likewise one fig or one bean [R' Akiva Eiger and Shulchan Aruch].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ו",
  `(6) That one blesses after it — because of its importance; and if it was crushed before eating it is not called a beriah [Pri Megadim].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ז",
  `(7) As it is — that is, with the pit; and even if the pit is not fit to eat at all, since in any case he swallowed it whole.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ח",
  `(8) But if he took, etc. — and all the more so if a little was cut from the fruit itself. And if a little fell from it through cooking, as is usual for it to crumble — likewise it appears that thereby the name beriah was nullified from it.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ט",
  `(9) The pit — and needless to say if the pits are also fit to eat; certainly through their lack the name beriah was nullified from the fruit. And even if they were of types that are not fit to eat at all — likewise the fruit was nullified from the category of beriah thereby. And if inside the pit itself is found something fit to eat, and he ate what is inside the pit and threw away its hard shell (like our plums) — the view of Magen Avraham and R' Akiva Eiger is that this too is included in beriah, after in any case he ate what is fit to eat from it.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "י",
  `(10) Of wine — and likewise other beverages.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "כ",
  `(11) On a kezayit — which is one-third of a revi'it, for it is possible that regarding beverage too we measure as in eating with a kezayit.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ל",
  `(12) But less, etc. — and b'dieved if he drank a kezayit and does not have a revi'it, it is good to beware not to drink until most of a revi'it, and all the more so not to drink the measure of an egg, which is two-thirds of a revi'it — for some say that on these amounts one must bless an after-blessing; and see above siman 190 seif 14 what we wrote there.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(13) One who tastes, etc. — for although it is forbidden to enjoy this world without a blessing even any amount whatsoever, whether in eating or drinking — that is when he intends to eat and drink; but here where his intent is only to taste to know whether it needs salt or spices, he need not bless neither before nor after. And even if he eats a bit of the food after cooking [when he is not able to fix the food then] and only to know whether it is good — likewise R' Akiva Eiger and Peri Megadim lean that this too is included in tasting, since his intent is not for the sake of eating.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(14) Up to a revi'it — and "up to" is inclusive; but more than a revi'it, since it is extra enjoyment, it is considered as if he intends to eat. And see in Magen Avraham who wrote that "up to a revi'it" that is permitted means even to taste from many pots; however, if his intent is to eat a little, it is forbidden to do so many times, for it is considered proper eating. And regarding tasting some food item to know whether it is good, the Acharonim lean that its measure is only up to a kezayit. And know that although in Shulchan Aruch he wrote one need not bless, nevertheless it is forbidden to bless, for it would be a blessing in vain [Acharonim].`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(15) And even if he swallows it — and if he spits it out, it is permitted even more than a revi'it without a blessing, also per this view.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(16) Requires a blessing — even for any amount whatsoever, since he has enjoyment of his intestines.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ה",
  `(17) When he returns and spits it out — for in this they permitted when his intent was only for tasting in general, since he has only enjoyment of the palate from the dish he tasted or from the food he chewed. And those who put an herb called tobacco into a pipe and light it and draw the smoke into their mouths — Magen Avraham was uncertain whether this is like one who tastes and spits out; and the Acharonim decided plainly that one does not bless on smoking this tobacco.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ו",
  `(18) And then even, etc. — and therefore one who chews for a child, since he does not swallow, even for much he need not bless.`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ז",
  `(19) And a doubt in blessings to be lenient — that is, even if he swallows he should not bless, since his intent is not for eating, per the first view. And behold Magen Avraham disagrees with Shulchan Aruch and Rama and he holds that in swallowing, according to all he is obligated to bless; but several Acharonim decided with Rama's ruling that it is a doubt in blessings and he should not bless. And l'chatchila it is good to beware: one who wishes to swallow should intend to enjoy from it in the manner of eating and bless upon it [Chayei Adam].`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `And one who drinks — Taz; but the view of other Acharonim is that one does not bless on coffee less than a revi'it — R' Akiva Eiger letter 6 in the name of Shach in Beit David. And in Magen Avraham siman 190 letter 4 on this; and what he wrote regarding drinking twice, etc. — it is difficult in siman 212, where the first view anonymously holds that drinking does not join if this is a little, see there; and why is it different in hot coffee that Peri Chadash ruled in responsum siman 1 that one does not bless an after-blessing even though its way is thus, like kutach for dipping — we say there is no kezayit as kedei achilat pras; and in Keritut, chapter "They said to him," a baby who nurses from a tamei corpse is pure — a doubt whether he nursed the measure and perhaps he waited more than kedei achilat pras even though its way is thus; and that Rosh holds that all species are dragged after the five species, and when he ate a kezayit from all the mixtures he blesses an after-blessing, see there; and in Ohel Moed part 3 of Mishna Berurah, and so wrote Magen Avraham; if so, in drinking coffee, if he drank a revi'it more than the usual measure of revi'it, he does not bless at all. And what he wrote that Tosafot are uncertain regarding borei nefashot in Berachot 39a — Tur and Levush brought this doubt; and see Perishah; and we hold that for borei nefashot one needs a measure.`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "_",
  `That one does not — Taz; but a cherry and the like that has a pit and one removes the pit is not a beriah; and in Magen Avraham letter 4, and if so there it will be explained. And in my novellae on Berachot 39a I wrote: that which is written "a vine, a fig, and a pomegranate," and "olive oil and honey" — it did not write olive and date; for if we say the three-form blessing is like the Torah, as the Tur wrote in letter 9 (Taz there letter 3), "and you shall eat" a kezayit — and in prohibitions, beriah, one is lashed; all the more so "one shall not eat" a flying creeping thing, small or large, implies it; and eating a kezayit in crushing — likewise here, vine, fig, and pomegranate are normally eaten with the pit, as Magen Avraham wrote letter 4; unlike olive and date that are not planted as its creation, since one eats what is fit even if he throws away the pit — for this the Torah wrote with a change of language, and we require in the species a kezayit or revi'it that if it hardens, etc.; and likewise regarding honey. And this is per the Gaon that date honey — one blesses borei peri haEtz and the three-form blessing; so it appears as a hint, but the halachah is not thus, as in siman 202 seif 8. And for the Rosh you find in raw and cooked; however, because of this it does not apply that here too for this reason it changed and wrote honey and one does not bless on honey at all — nevertheless; and one need not elaborate.`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Seif 1: One who eats less than a kezayit. A kezayit that shrank — one does not bless after it unless it returned and swelled; and if it was not a kezayit and swelled and became a kezayit — it is a doubt; Gan HaMelech siman 124.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `There: And one who drinks less than a revi'it. One who sucks fruits whose measure is a kezayit — Pri Chadash in Sefer Mayim Chaim, Orach Chayim siman 7.`,
);

patch(
  st,
  "shaarei-teshuvah",
  1,
  "_",
  `From a kezayit — Ba'er Heitev; and see Beit Yehudah siman 21; and he wrote in Birkei Yosef in the name of Zera Emet: regarding sponge-cake bread that swelled until the air pockets in it are imperceptible — one who eats a kezayit from it as it is does not bless, for in truth he did not eat a kezayit.`,
);
patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `From a revi'it — Ba'er Heitev; and regarding the Torah measure of revi'it, see in Sefer Beit Efrayim on Treifot in the pamphlet of responsa that there is a distinction between a Torah revi'it and where the obligation is only d'rabbanan; and this depends on the doubt of the measure of the thumb — whether we measure at the wide place or the narrow place; and per what Tosafot wrote in Menachot there is further doubt whether to estimate the measure of the thumb's joint, see there.`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "א",
  `And one who drinks less than a revi'it — it appears to me that brandy in our country is not included in this, for with it one cannot drink a revi'it of a log, which is an egg and a half; if so, we follow the measure of drinking for most people in this. And proof for this: from what Beraita Yeshanim brings, Beit Yosef regarding beriah — there is a distinction: if it is something normally eaten with its pit, we count it with the pit as a kezayit, etc.; likewise we follow the way of the world. And further proof from the beginning of chapter HaMotzi yayin, where we say there "wine kedei meziga," and we explain kedei rova revi'it — that if you dilute it, it will stand at a revi'it, and that is the measure of a cup of blessing. And Rava said regarding Shabbat: since it requires something significant, and this too is significant — meaning it is fit to mix water in it; behold, before us, even though there is no revi'it there, since it is fit to mix water in it up to a revi'it — likewise with brandy: if one drinks as people normally drink at one time, or even in two times when there is no pause between them of the measure of drinking a revi'it, as stated in siman 212 that in this the two drinkings join each other to the measure — then, even though there is no revi'it of a log there, nevertheless, since it is fit to mix water and one can drink a revi'it, and an ordinary person cannot drink a revi'it at once, we properly call him "and you ate and were satisfied" therein. And otherwise there is room to say that for borei nefashot one need not [a revi'it], for Tosafot are uncertain in this; we can rely and say it is as if he drank a revi'it of wine and is obligated in an after-blessing, as appears to me.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ב",
  `That one not eat a beriah less, etc. — that is, one fig or one bean, as Rashi explained: "one shall not eat" one alone.`,
);
patch(
  tz,
  "turei-zahav",
  1,
  "ג",
  `Or a revi'it — above in siman 190 we wrote that a full lugma suffices in a large cup, or even less than that if he drank most of the cup.`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `And even if he swallows it — in the Gemara it says one who tastes a dish up to the measure of a revi'it; and Beit Yosef brought from the Tur the first view that this is said regarding blessing too, and even if he swallows it; and although it is forbidden to enjoy this world without a blessing — that is when he wishes to enjoy from it itself; but here where his intent is only to taste the dish, he need not bless up to a revi'it. And the second view is that Rosh holds there is no distinction regarding blessing between a revi'it or less — for in swallowing, even a tiny amount requires a blessing; and in spitting out, even much he need not bless; only regarding fasting was this measure of revi'it, namely in spitting out. With this the words of the Tur in what Beit Yosef wrote are settled. In Beit Yosef it is written that we must say the Rosh holds the measure of revi'it equals a kebeitzah — for if it is less than a kebeitzah, how is he removed from doubt by drinking a revi'it, end of his words; and I did not understand his talk, for certainly every revi'it of a log is an egg and a half everywhere; and this was also a doubt in the Rosh, that perhaps an egg does not suffice, as written in siman 190.`,
);

patch(
  ye,
  "yad-ephraim",
  1,
  "_",
  `In Taz seif kaf alef — one need not a measure, for Tosafot are uncertain in this, etc., so it should read.`,
);
patch(
  ye,
  "yad-ephraim",
  2,
  "_",
  `Magen Avraham seif kaf alef — and if he waited more than kedei achilat pras it is not called eating, so it should read.`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 210 part 3/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-210-part3of3.json",
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
