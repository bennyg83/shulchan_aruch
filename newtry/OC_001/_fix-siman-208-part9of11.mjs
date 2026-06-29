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

const pm = "output/siman_208/peri-megadim/part-001.txt";
const rae = "output/siman_208/rabbi-akiva-eiger/part-001.txt";

patch(
  pm,
  "peri-megadim",
  15,
  "_",
  `<b>And he precedes.</b> Taz, and in siman 209 seif 65 [regarding] the order of precedence, and in seif 67 there — spelt precedes the vine in the first blessing; likewise in the after-blessing he precedes al haMichya for spelt before those others, and it will be explained there.`,
);
patch(
  pm,
  "peri-megadim",
  16,
  "א",
  `<b>And all the more so.</b> Taz wrote in Magen Avraham note 21, and wrote so also for one who holds "on the land and upon the fruit of the vine," as written in note 14 that it is fitting to do so — nevertheless it is all the more so for the after-blessing. And what he wrote that al haMichya does not exempt minei mezonot — meaning even dates, or wine for satiety, and dates — al haMichya does not exempt them; only haZan exempts them, not like Levush who wrote that al haMichya exempts wine and dates; and Rabbi Akiva Eiger wrote on this in note 26. And know what is written in siman 17: haZan exempts wine even though me'ein shalosh has in it haZan and land, and Beit Yosef [that] Abaye [said] holds the blessing of haZan is more important and one fulfills — unlike me'ein shalosh, if one skipped one of them he did not fulfill, as written in note 13.`,
);
patch(
  pm,
  "peri-megadim",
  16,
  "ב",
  `<b>Question.</b> One ate grain about which there is doubt in the after-blessing — like mezonot — and erred and blessed on the land and on the fruit of the land, and also ate apples: does he fulfill or not?`,
);
patch(
  pm,
  "peri-megadim",
  16,
  "ג",
  `<b>Answer.</b> There is doubt — if like wine also on apples, b'dieved borei peri haEtz is included in borei peri haAdamah, but he did not intend so — Magen Avraham note 23. But if he ate borei peri haAdamah [fruits] together with grain and blessed on the land and on the fruit of the land, he should not bless again borei nefashot on other borei peri haAdamah fruits, lest he has fulfilled, as written — understand. And what the Mechaber wrote, "if one ate fruits of the seven species" — meaning fruits that are among the seven species, which are the five aside from wheat and barley, and they are called produce of grain, as Rambam wrote in chapter 3 of Hilchot Berachot halacha 1.`,
);
patch(
  pm,
  "peri-megadim",
  17,
  "_",
  `<b>"He drank."</b> Taz explained that Rosh holds like Rashi, etc.; and Magen Avraham note 23 corrected this — for if so, for the Mechaber the law here is like Berakhot 26b, that if he had intent it is b'dieved like R' Yitzchak.`,
);
patch(
  pm,
  "peri-megadim",
  18,
  "_",
  `<b>That if.</b> Taz [holds] wine is exempted by Birkat HaMazon — wine for satiety and dates for satiety (textual corruption in the manuscript: should read "eaten" rather than "wine"), and Magen Avraham.`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "_",
  `<b>Five species of grain.</b> Taz wrote so in Tur (and it appears to me fitting, and the intent is that it is Gemara in Menachot), and he pointed to siman 168 note 4 and siman 209 note 6; and between Taz and Magen Avraham — 168:7 and 209:12 — all agree that spelt, oat (shibbolet shu'al), and rye (shifon) are included in the category of wheat and barley of the verses with which Eretz Yisrael was praised, and in bread Birkat HaMazon is d'oraisa on them, and in deisa Tur [holds it is] d'oraisa; and for one who holds me'ein shalosh is d'rabbanan even for the five species of grain. And the order of precedence — it will be explained in siman 209 in Taz and Magen Avraham note 13.`,
);
patch(
  pm,
  "peri-megadim",
  3,
  "_",
  `<b>Even.</b> Taz — in Magen Avraham Radbaz note 25 it implies that for the five species the taste must be perceptible; and Magen Avraham note 15, and so too in Bach, that we require [the dish] made specifically for taste, and so appears in Levush; and see Prisha [on the] distinction between here and siman 169, where for flour in flour the taste is not perceptible — whenever it is not in the manner of bread one does not bless Birkat HaMazon, and here the taste is perceptible l'chatchila even though afterward he put much flour of other species — behold it is not like Taz; and Rabbi Akiva Eiger [siman] 3, and Pri Chadash in responsa siman 8 — even though the honey is the main [reason] to eat, whenever the flour seasons and prepares it, [it has importance] in a small measure; and see Chayei Adam Berakhot 36b that the honey is the main [ingredient] — see there; and in Radbaz, Taz, and Magen Avraham 25 we expanded on this — see there.`,
);
patch(
  pm,
  "peri-megadim",
  4,
  "_",
  `<b>And if.</b> Taz — whether there is a majority, etc.; but Bach wrote that even a majority of everything for binding is nullified, and essentially the flour is primary, and so too Ateret Zekenim note 2; and see in Sefer Chemed Moshe that essentially it is bread of almonds — see there. Paaneach Razah [siman] 165 has doubt whether it is called "for binding"; Rabbi Akiva Eiger [wrote] there. And Levush siman 63 implies that whether almonds or for binding — within the meal of bread — if it is for binding alone, see there; and Magen Avraham explained this in note 5.`,
);
patch(
  pm,
  "peri-megadim",
  5,
  "_",
  `<b>And it is good.</b> Taz — like Tosafot Berakhot 36b s.v. kol. And he wrote that the Mechaber refers to the after-blessing, and essentially note 4. And Magen Avraham 15 — what he wrote to distinguish [the case in] siman 62, that implies even when there is not a kezayit in the time of eating a peras from the five species; and in siman 36 one blesses me'ein shalosh in siman 69 in his [blessing of] borei nefashot — and it will be explained there; Magen Avraham explained this in note 7 from this.`,
);
patch(
  pm,
  "peri-megadim",
  6,
  "_",
  `<b>And exempt from borei nefashot.</b> Taz — specifically within the meal, not after the meal; but for us there is no [obligation of Birkat HaMazon] after the meal — simanim 177, 168, 68 — see there; and Magen Avraham 3 on this; and it will be explained there.`,
);
patch(
  pm,
  "peri-megadim",
  7,
  "_",
  `<b>And the kernels.</b> Taz — ostensibly for the first blessing the reason is that there is no strange manner of eating to eat whole boiled kernels, and therefore borei peri haAdamah; and for the after-blessing Tosafot 37a s.v. hakoesses doubted, for we do not find that they instituted [a blessing] on the ground — see there. Again I saw that the words of our master the Taz, may his memory be blessed, are founded on foundations of truth and reason — that Rosh and Tur [hold] the blessing me'ein shalosh is d'oraisa on fruits of the tree; if so, what is the doubt? And necessarily one must say that wheat, which the verse praises Eretz Yisrael with, through an important manner of eating — refers to bread or deisa that satisfies, and on this the verse says "and you shall bless" — unlike a boiled kernel (Magen Avraham 209 note 8 on this). And this is what Rosh wrote there — see there; but Tosafot doubt for another reason, that possibly they hold the blessing me'ein shalosh is d'rabbanan entirely, and we do not find that they instituted it on something unimportant except on something important; and even though Rosh also wrote similar to Tosafot — see there. And know: with whole kernels, the importance of the five species of grain applies, and we further follow the majority — if the majority is legumes and triticale and the like, even if there is close to half of the five species of grain, one blesses shehakol. And so appears somewhat in Levush siman 64, that the main importance is that they satisfy and nourish in deisa and bread; but whole boiled [kernels] are like other fruits — see there. And when equal, see Prisha that one cannot limit — necessarily one adds from the species he wishes until there is a majority. Magen Avraham explained this in note 10 regarding unripe grape — see there.`,
);
patch(
  pm,
  "peri-megadim",
  8,
  "_",
  `<b>Whole.</b> Taz — Bach wrote that because of the doubt one should not eat except within the meal, lest it is mezonot or borei peri haAdamah — Magen Avraham 10; and nevertheless in Eretz Yisrael one blesses shehakol and fulfills — Taz 5, for here there is no doubt in the after-blessing of borei nefashot; but Taz holds that from doubt one blesses borei peri haAdamah and fulfills, even if he blessed mezonot — nevertheless borei peri haAdamah too [applies]. And Magen Avraham note 22 — vine, borei peri haEtz does not fulfill; and apparently Taz, Radbaz 11, disagrees on this, as Pri Megadim wrote there, and per his view here. And therefore bread of the five species of grain — if he blessed borei peri haAdamah he fulfills b'dieved, since the manner of eating is so; and to distinguish bread of dochan, for its manner is not thus — and so Rambam chapter 3 halacha 9:7, and in 167:10, Taz 11. But per what Magen Avraham wrote in note 12, one could say that whatever changed completely and was ground much leaves the category of borei peri haAdamah, and one blesses only shehakol; and Magen Avraham siman 202 seif 66, and here seif 13; and above we wrote from this what is written regarding wheat flour in Berakhot 36a — and it will be explained in Magen Avraham 12, 13. And Magen Avraham explained in note 15 there from this.`,
);
patch(
  pm,
  "peri-megadim",
  9,
  "_",
  `<b>But.</b> Taz — in Beit Yosef he brought the language of Rif, may his memory be blessed, in Berakhot (daf 37a), and in Rif it is written to say that the statement of Rav and Shmuel — "all that has in it from the five species in a small measure" — behold rice is not established; and Rambam chapter 3 of Hilchot Berachot halacha 10 [rules regarding] rice alone; and in Rif one could say similarly that after whole rice is established in the eyes of the species, they have the elevation of the five species even when they are the minority — it teaches us that "all that has in it" is not established; but a majority of rice counts as all, and so wrote Magen Avraham note 11 — see there; and Pri Megadim chapter 3 halacha 4 wrote the statement "all that is [from] the five species of grain" (majority as all), and afterward another statement "all that has from the five species of grain" even a minority of them — and for what purpose did he bring one statement? And ostensibly to exclude rice, for even a majority is strained. And what Taz wrote — and per what is written that one should bless shehakol on rice — there is no difference; meaning that the poskim wrote there is doubt whether rice is riz and dochan is yeriz, or the reverse; therefore one blesses shehakol on both of them; and Rabbi Akiva Eiger note 9 — there is no difference, etc., for shehakol includes everything; and this is importance in a small measure — one could say they did not give [this importance] to rice only by itself, but in a mixture, especially from other species, easily in a small measure; but borei peri haAdamah when it is whole, or shehakol with fruits — its majority is not nullified as a bucket, for why should it be diminished from other things? And in a small measure that is not of the seven species it is nullified when it is by mixing, as we said.`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `On seif 2 — even though there is much honey more than them, even in a matter where there is not a kezayit of grain in the time of eating a peras — Magen Avraham siman 208 note 15; and even if he ate only a kezayit from the mixture, all of it is considered after the grain — Pri Chadash in responsa siman 1.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `On seif 3 — "and exempt from it" — it is difficult for me: behold, if it is for binding he should bless like for all fruits. Later I found so in Gan HaMelekh to Rav Ginzburg siman 132.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  3,
  "_",
  `Magen Avraham note 7 — and 206. And similarly Magen Avraham wrote above siman 200 note 6, that he blessed first on the water on account of [the wine].`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  4,
  "_",
  `On seif 5 — "and after it borei nefashot rabot," since he did not mention also in this that there is doubt whether to bless after it me'ein shalosh, as written in seif 66 — it is explained that the Mechaber holds the doubt of Tosafot is only in live grain, where one blesses first borei peri haAdamah; but where one blesses shehakol, certainly one blesses after it borei nefashot. And ostensibly there is proof for this from the passage in Berakhot 38 regarding a salted olive, that one blesses first shehakol and after it borei nefashot — behold, even though an olive is from the seven species, one does not bless after it me'ein shalosh since at first one blessed shehakol. And ostensibly there is a contradiction to this from Tosafot, who wrote that the amoraim in the Yerushalmi were in doubt about this, whether one blesses after it borei peri haAdamah — but one could say that he holds certainly that where one blesses first borei peri haAdamah one blesses after it me'ein shalosh; only they doubted regarding flour whether one blesses first borei peri haAdamah per R' Nachman, or shehakol per R' Yochanan — and automatically there is doubt in the after-blessing; nevertheless there is no distinction between where one blesses first borei peri haAdamah or shehakol.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  5,
  "_",
  `However, one of the Bachurei Chamad gave me a good answer: nevertheless it would have been possible for them to eat flour and also eat roasted [grain], and another species whose after-blessing is borei nefashot, and to bless me'ein shalosh and borei nefashot — and similarly Terumat HaDeshen wrote, and it is brought in Taz this siman. Nevertheless, on roasted [grain] itself they doubt whether one blesses after it me'ein shalosh; nevertheless, behold it is explicit in Rashba chapter 18 that both for flour of wheat and for flour of barley there is doubt in the after-blessing, and Beit Yosef himself brought thus — how did he rule here plainly not like Rashba? And per Rashba's view, one must say regarding that case of the salted olive mentioned above — namely, since it changed on account of salting, the importance of the seven species was nullified from it; but regarding flour, even after it changed it is fit to make bread from it and bless Birkat HaMazon — therefore, since they did not bake it, one blesses me'ein shalosh. Later I found that Eshel Avraham addressed this and wrote to resolve: Rashba, per his view, ruled like R' Nachman, that for flour of wheat one blesses borei peri haAdamah — for he holds that even when changed in its words it still applies; therefore he holds that also for flour of barley, even though its blessing is shehakol because it changed, it changed for the blessing — nevertheless for the matter of the after-blessing, even though it changed in its words it still applies. But per what he ruled regarding flour of wheat, that one blesses shehakol because it changed — likewise it changed for the matter of the after-blessing — see there. And therefore automatically the case of the salted olive there is settled, which stands per the secret doctrine that boiled [kernels] one blesses shehakol, and because it changed therefore one blesses after it borei nefashot. However, besides that the plain meaning of Rashba's words does not imply thus, and behold in Rashba's proof from the braita "they did not make it grain" it implies that for all, even per R' Yochanan, one blesses after it me'ein shalosh — nevertheless it does not suffice to settle the Mechaber's words, for this very matter that he ruled one blesses on wheat flour shehakol is only the doubt of the rabbis, as Beit Yosef wrote; and if so, there is still doubt in the after-blessing, lest the law is that at first one blesses borei peri haAdamah and blesses after it me'ein shalosh. And it is strained to say it is like a double doubt — that at first one blesses shehakol; and if you say one blesses borei peri haAdamah, nevertheless lest the blessing after it is borei nefashot, lest perhaps also for chewed wheat one blesses after it borei nefashot. And more — one could say the Mechaber holds for the law, regarding the essence, that chewed wheat one blesses after it borei nefashot, as appears from the language of Shulchan Aruch; only he also brought that Tosafot doubted as a general concern to be careful l'chatchila — and therefore for flour of wheat, since there is another branch and one blesses first shehakol because it changed, one relies certainly to bless after it borei nefashot. And still needs study.`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  6,
  "_",
  `On seif 13 — "that they too are included in the blessing on the tree" — specifically apples; but if one squeezed them and drank their liquid, or even cooked them in water — per Rashba above siman 202 seif 10 — one is not exempt with the blessing on the tree, for it is not fruit at all — Magen Avraham above siman 202 s.k. 225.`,
);

const PATCH_COUNT = 20;
console.log(`ok siman 208 part9of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part9of11.json",
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
