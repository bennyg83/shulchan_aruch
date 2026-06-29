import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { mh9, ma2b } from "./pipeline/work/_siman-216-p5-long-en.mjs";

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

const mh = "output/siman_216/machatzit-hashekel/part-001.txt";
const ma = "output/siman_216/magen-avraham/part-001.txt";
const mc = "output/siman_216/mechaber/part-001.txt";

patch(
  mh,
  "machatzit-hashekel",
  13,
  "ג",
  `<b>There is a doubt how one should bless.</b> Whether "Who creates pleasant oil" or "Who creates trees of spices" or "Who creates species of spices":`,
);
patch(
  mh,
  "machatzit-hashekel",
  13,
  "ד",
  `<b>And one need not be concerned for those who say, etc.</b> — they are the "some say" of the latter view. One need not be concerned for them, for their words are the words of an individual:`,
);
patch(
  mh,
  "machatzit-hashekel",
  13,
  "ה",
  `And Machatzit HaShekel wrote, etc. — the opposite of Beit Chadash's reasoning:`,
);
patch(
  mh,
  "machatzit-hashekel",
  13,
  "ו",
  `<b>Since Tur did not divide, etc.</b> Only in siman 217 when Tur brought Rambam's words that one does not bless on finished vessels did he dispute him and wrote that one blesses on them; and here in this siman regarding this law — when the spices were removed from the oil — he wrote: "some say one does not bless on it at all," and this is Rambam's view as Beit Yosef explained, and Tur was silent and did not decide between the two views — which implies to Tur that here it is worse, and there is room for those who say one should not bless on the oil even if one blesses on finished vessels:`,
);
patch(
  mh,
  "machatzit-hashekel",
  13,
  "ז",
  `And a smell was made, and all the smoke of the smell enters into the finished vessel:`,
);
patch(
  mh,
  "machatzit-hashekel",
  13,
  "ח",
  `<b>And in Shulchan Aruch it appears like Beit Chadash.</b> Meaning like Beit Chadash's view that finished vessels are inferior; and it is more reasonable to say that one does not bless on them, since Beit Yosef wrote here, and it is proper not to smell them — which implies he is in doubt whether to bless; and regarding finished vessels he did not write thus — which implies that even l'chatchila one may smell them, for it is clear to him that one does not bless on them and there is no doubt — and this is Beit Chadash's view. But for practical law, on the contrary, Shulchan Aruch does not hold like Beit Chadash — for Beit Chadash wrote that here on oil one blesses "Who creates species of spices" and smells them; and Shulchan Aruch wrote from doubt that perhaps one does not bless on them, and therefore it is proper not to smell them:`,
);

patch(
  mh,
  "machatzit-hashekel",
  6,
  "א",
  `<b>(s.k. 6) On the rose.</b> Even though it is fit for eating and therefore it should bless "Who gives good smell in fruits" — nevertheless:`,
);
patch(
  mh,
  "machatzit-hashekel",
  6,
  "ב",
  `<b>And one may ask: since, etc.</b> As written siman 204 seif 11 — why preserved roses in honey bless "Who gives good smell in fruits":`,
);
patch(
  mh,
  "machatzit-hashekel",
  6,
  "ג",
  `<b>For it is impossible to bless "Who creates herbs of spices," etc.</b> Meaning — granted regarding eating: since it is not the main part of the fruit we descend one level, even though it would be fit to bless "Who creates fruit of the tree," since it is not the main part of the fruit one blesses "Who creates fruit of the earth"; but regarding smell — if we descend a level to bless "Who creates herbs of spices" one does not fulfill, since a rose is not an herb, as Bach wrote in small seif 16; if so it would be fit to say one should bless "Who creates species of spices," and descend two levels — we do not descend even though it is not truly two; specifically the blessing "shehakol" against "Who creates fruit of the tree" is two levels — one "Who gives" and one "shehakol"; unlike regarding smell, where "trees of spices" and "herbs of spices" are equal — one does not exempt the other; if one blessed "Who creates trees of spices," "Who creates herbs of spices" does not fulfill; if we say bless "Who creates trees of spices" when it is not the main part of "Who creates species of spices," it is only one level — nevertheless it resembles two levels:`,
);
patch(
  mh,
  "machatzit-hashekel",
  7,
  "_",
  `<b>(s.k. 7) Rose water, etc.</b> Even for those who disagree, etc., and hold that raisin juice and fig juice — one blesses on them "shehakol," even though the blessing on grapes and figs is "Who gives":`,
);
patch(
  mh,
  "machatzit-hashekel",
  8,
  "_",
  `<b>(s.k. 8) And storax, etc.</b> — pitch. And he wrote in Sefer Netiv Chayim that perforce it does not mean actual pitch that spoils, but rather what we call mastic:`,
);
patch(mh, "machatzit-hashekel", 9, "_", mh9);

patch(
  ma,
  "magen-avraham",
  1,
  "_",
  `Tur wrote siman 212: they brought him wine and good oil to smell — he blesses on the wine first, for the blessing of enjoyment precedes; and in siman 296 seif 7: <b>Afterward one need not bless.</b> Because the pleasure is slight (Rashi Niddah); and therefore we do not bless shehecheyanu on it (Chayei Adam); and in my view because they are all year round; siman 225 seif 6; and in Kol Bo he explained because when one stops the fragrance from his nostrils the pleasure has already passed — therefore one does not bless a final blessing, unlike eating that remained in his intestines; Mordechai in chapter Elu Devarim wrote one blesses only on something the body enjoys from it, and therefore one does not bless on fire except on motzei Shabbat, since the beginning of its creation is then — and it appears to me that for this reason one does not bless on arev oil (Darkei Moshe); and in Matamei Moshe he wrote because it has no substance, see there; and that we do not bless on bathing and anointing — must say since they do not enter the body, as we say in Berakhot daf 56, and see beginning of siman 210:`,
);
patch(
  ma,
  "magen-avraham",
  10,
  "_",
  `<b>On all of them.</b> Bach wrote that if one blessed on trees of spices "Who creates herbs of spices" he has not fulfilled, for herbs do not include trees — perforce; and likewise Levush; and study is required — for if so, why did Beit Yosef write in the name of Rokeach that one must precede trees to herbs, for both are equal to each other, neither includes more than the other; nevertheless one may say that in any case the word "herb" includes everything that grows in the ground, and "trees" includes only what grows on a tree — so wrote Rosh regarding fruits; and in truth I did not find this in Rokeach at all; and it is possible Rabbeinu Yosef had another edition, and therefore it appears we follow the dearer, as written in siman 211 seif 3; and Bach himself wrote thus there:`,
);
patch(
  ma,
  "magen-avraham",
  11,
  "א",
  `<b>To smell them.</b> For if to remove foul odor one does not bless, as written siman 217 end of seif 2, see there:`,
);
patch(
  ma,
  "magen-avraham",
  11,
  "ב",
  `<b>One blesses on the hadas.</b> And one takes it in his right hand — see siman 206 seif 4:`,
);
patch(
  ma,
  "magen-avraham",
  11,
  "ג",
  `<b>They are not equal.</b> Study is required — for per Rosh there is no precedence when their blessings are not equal, as written siman 211; and further it is difficult — for here it deals with persimmon oil, as Tur wrote, and its blessing is specific to persimmon alone, as seif 4; if so one should precede it, for it is a specific blessing, as siman 211 seif 3; and one must say the hadas is considered more important — study is required; however in Rosh he did not write persimmon, and it is possible it deals with oil infused in its name with herbs of spices, and on the hadas one blesses "Who creates trees of spices"; see this siman and siman 217 letter 2:`,
);
patch(
  ma,
  "magen-avraham",
  12,
  "_",
  `<b>He should not bless, etc.</b> For it requires proximity to their performance, as written siman 25 seif 8:`,
);
patch(
  ma,
  "magen-avraham",
  14,
  "א",
  `<b>One does not bless.</b> For it is not made for fragrance but for a mitzvah; so wrote in the name of Maharshal — specifically at the time of taking it for the sake of the mitzvah, but before and after one blesses:`,
);
patch(
  ma,
  "magen-avraham",
  14,
  "ב",
  `<b>Not to smell.</b> And if he smells it, Bach wrote that he blesses on it, for it is in the midrash: "What is an etrog — it has taste and fragrance" — if so it is made for fragrance, end of his words; and this is only a homiletical method, therefore one should be cautious with doubt of blessings and not bless on it; and likewise warm bread:`,
);
patch(ma, "magen-avraham", 2, "א", `<b>Tree species.</b> Even if it is not the main part of the fruit, as seif 3:`);
patch(ma, "magen-avraham", 2, "ב", ma2b);
patch(
  ma,
  "magen-avraham",
  2,
  "ג",
  `<b>Fit for eating.</b> Even if it is not fit to eat by itself except through mixtures, as siman 202:`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "ד",
  `<b>One does not bless.</b> For it is not made for fragrance (Berakhot, Maharam):`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "א",
  `<b>On the rose.</b> Which they call rose — even though it is fit for eating through confectionery, nevertheless its main purpose is not for eating but for fragrance; and one may ask: since they are not the main part of the fruit, not to bless on them "Who creates trees of spices," as written siman 204 seif 11; it appears to me this case is different, for it is impossible to bless "Who creates herbs of spices" since it is not a species of herb, therefore one blesses "Who creates trees of spices":`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ב",
  `<b>Rose water.</b> Even for those who disagree in siman 202 seif 11 — because fruit juice does not have taste like the fruits themselves, which is not so here, where rose water smells like the rose itself (Bach):`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ג",
  `<b>And storax.</b> Pitch that they make from it (Rashi, Bach):`,
);
patch(
  ma,
  "magen-avraham",
  3,
  "ד",
  `<b>Trees of spices.</b> And likewise anything whose stalk is hard [Shaarei Teshuvah]:`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "_",
  `<b>Persimmon oil.</b> Because it grows in Eretz Yisrael they established a separate blessing for it (Terumat HaDeshen):`,
);
patch(
  ma,
  "magen-avraham",
  5,
  "_",
  `<b>Olive oil.</b> It appears to me specifically olive oil, because it grows on the tree:`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "א",
  `<b>Anointing oil.</b> One who makes anointing oil by act and by the weight stated in the Torah is liable karet, and if unwitting he is liable a chattat — if he makes it for anointing; but if he made it to learn or to give to others he is exempt (Rambam chapter 1 of Laws of Temple Vessels). One who makes incense from the eleven spices mentioned — per these weights, even if he made only half or a third of it, since he made per these weights he is liable karet; if he made it to learn in it or to give to the community he is exempt (chapter 2 there):`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "ב",
  `<b>Proper to be careful.</b> And Bach wrote that even Rambam agrees here — for granted in finished vessels the main fragrance of the perfume was not absorbed, unlike here, where there is only a doubt how to bless; therefore one should bless "Who creates species of spices," and one need not be concerned for those who say one does not bless on it, end of his words; and Darkei Moshe wrote that since Tur did not divide here against Rambam, only in siman 217 — which implies he holds finished vessels are superior, the perfume was burned and became fragrance, unlike here where only fragrance was absorbed; and Shulchan Aruch appears as Bach wrote, for regarding finished vessels he did not write there to be careful not to smell them:`,
);
patch(
  ma,
  "magen-avraham",
  7,
  "_",
  `<b>Simlak and chilfei deima.</b> Even though they contain something soft, we do not care; rather since it produces from its tree one blesses "Who creates trees of spices" (Beit Yosef, Rashba, siman 203):`,
);
patch(
  ma,
  "magen-avraham",
  9,
  "_",
  `<b>Grows in a garden.</b> That they water it and tend it and it grows and endures — even though its tree dries out; but deer-antler [dudaim] dries like a herb and passes (Beit Yosef, Rashba):`,
);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `Laws of the blessing over fragrance, containing 14 seifim: It is forbidden to benefit from a pleasant fragrance until one blesses before smelling; however afterward one need not bless.`,
);
patch(
  mc,
  "mechaber",
  10,
  "main",
  `If before him are trees of spices, herbs of spices, and species of spices — he blesses on each the blessing appropriate to it. {Rama: And if he blessed on all of them "Who creates species of spices" he has fulfilled (Tur at the beginning of the siman); and if one must precede tree to herbs — see above siman 211.}`,
);
patch(
  mc,
  "mechaber",
  11,
  "main",
  `If they brought before him hadas and oil to smell: if their blessings are equal, he blesses on the hadas and exempts the oil; and if they are not equal, he blesses on the hadas first.`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part 5/8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part5of8.json",
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
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
  /\bGLOSS:/i,
  /\bWayne\b/i,
  /\bAmy\b/i,
  /\bDamiliev\b/i,
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
