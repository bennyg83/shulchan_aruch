import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { pm2g, pm3g, st3 } from "./pipeline/work/_siman-213-p3-long-en.mjs";

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

const mb = "output/siman_213/mishnah-berurah/part-001.txt";
const pm = "output/siman_213/peri-megadim/part-001.txt";
const rae = "output/siman_213/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_213/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_213/turei-zahav/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  1,
  "ז",
  `(ז) Apart from bread — the reason the Mechaber mentioned bread here is that regarding bread we hold that if there are three they make zimun and one fulfills another through Birkat HaMazon; but not so with other foods, where in the blessing after eating even with three one does not fulfill another:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ח",
  `(ח) In the first blessing — and the reason is because in the first blessing each one gains through that blessing permission to eat and enjoy, therefore they join for it; but in the blessing after eating, since they already ate and their minds are to separate, they do not join, even for wine:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ט",
  `(ט) They must separate — and even if they established together it does not help for this; and b'dieved if he intended to fulfill his obligation and the blesser also intended to fulfill him, he has fulfilled it, even without any establishment at all, as the Mechaber ruled above siman 167 seif 13 — see there in Mishna Berurah. And if one does not know how to bless by himself, he fulfills even l'chatchila through his fellow's blessing; and the Taz and Magen Avraham wrote that nowadays, since the masses are very lax regarding the blessing after eating, one may rely to do so l'chatchila — that one blesses the blessing after eating aloud and others fulfill through him even when they know how to bless by themselves; and especially regarding the blessing after eating that is a kind of threefold blessing, since not everyone is expert in it by heart — it is certainly good to do so l'chatchila; nevertheless it is better that they say with the blesser word for word:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "י",
  `(י) That there is no zimun for fruits — meaning, since there is no mitzvah of zimun for fruits to gather together and say "let us bless what we ate," automatically each one must bless for himself and not fulfill through his fellow's blessing; and see above siman 193 sk 6 in Mishna Berurah:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "כ",
  `(כ) And some say in all etc. — this refers to the beginning of the seif, regarding the first blessing; and their reason is that specifically bread and wine, which are important, sitting or reclining helps for us; but not so with other things that are not important — each one must bless for himself; and if fruits came during the meal, one blesses for all of them, for since sitting helps for bread, it also helps for other things:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ל",
  `(ל) Regarding fruits — and likewise regarding other things. And regarding beer and honey water called mei eden — see Baal HaTanya and Taz and Magen Avraham; and nowadays the custom is that even for these each one blesses for himself [Peri Megadim]. And regarding wine — it appears from the Rama and from Darkei Moshe that even for us sitting or reclining helps; but several acharonim raised that even for wine each one should bless for himself, because nowadays people are not accustomed to establish themselves on wine; and in truth according to law this depends on local custom — in a place where wine is plentiful and people are accustomed to establish themselves on it, certainly sitting or reclining helps for one to fulfill another. And it seems to me that now the custom is widespread in most places that they do not fulfill one another through another in almost any food, even though this is against the law; and possibly because not everyone is expert in intending to fulfill and to have others fulfill; and something similar is explained in Chayei Adam general rule 5:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "מ",
  `(מ) That each one blesses for himself — specifically l'chatchila; but b'dieved if he blessed and intended to fulfill his fellow and the listener intended to fulfill his obligation, even without sitting or reclining at all, he has also fulfilled:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(א) Fulfills others — regarding blessings of benefit; for specifically regarding blessings on mitzvot, all Israel are guarantors for one another, and when his fellow does not fulfill the mitzvah it is as if he did not fulfill — therefore one can bless even for one not obligated in that blessing; not so regarding blessings of benefit, which are not an obligation incumbent upon him like other mitzvot — he does not benefit and one cannot bless for him, even if they do not know how to bless by themselves. And this seif applies both to the first blessing and to the blessing after eating; and see above siman 167 seif 19:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(ב) Then they fulfill through hearing — and if he does not eat and drink with them, even b'dieved they do not fulfill, for his blessing is void since he himself is not eating — and how can they fulfill through him? And even if they answered amen on the blessing — not so; unless it happened that the blesser did not eat and drink inadvertently or under duress, such as the cup spilled after the blessing and the like, where at the time of the blessing it was not void — then others fulfill through him:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(ג) That they direct intention toward him — and he too must intend to fulfill them, as below seif 3:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(ד) Even if they do not answer amen — for we hold that one who hears is as one who answers, and behold he is like one blessing by himself. All this is b'dieved; but l'chatchila, aside from what is obligatory to answer amen on every blessing one hears from Israel, as below siman 215 — there is even greater obligation l'chatchila to answer amen on a blessing through which one intends to fulfill his obligation, in order to indicate in actuality that he agrees with the blesser's blessing [acharonim]. The poskim wrote: if several people perform one mitzvah, it is a mitzvah l'chatchila that one bless for all of them, for "in the multitude of people is the king's glory"; and see above siman 6 in Shaarei Teshuvah sk 6, and siman 8 seif 5, and Mishna Berurah, and siman 298, and Taz in siman 19:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "א",
  `(א) Through hearing etc. — since it states plainly that it speaks of all blessings, even blessings that are d'rabbanan — we require specifically that he intend to fulfill the mitzvah; and thus is clear in Rosh Yosef siman 5; and see above siman 60 in Mishna Berurah sk 10 and Biur Halachah there, and siman 271 seif 6 in Biur Halachah s.v. vekhegon:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(ב) From beginning to end — and this includes also the word baruch at its beginning, for he is no better than one blessing by himself when he skips any word from the essence of the blessing, for he has not fulfilled his obligation since it is a change from the formulation coined by the Sages:`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `<b>But.</b> Taz: the Rashba in responsum to Ramban 196 — Beit Yosef brought that there is no zimun for fruits l'chatchila, but b'dieved one fulfills since one who hears is as one who answers; and nowadays, since people are lax, one may do so l'chatchila — that one bless and all hear and intend to fulfill. And that which he wrote to rely on this view — it appears regarding the blessing after eating, if he waited more than kedei achilat pras and did not eat a kezayit within that time interval, he should not bless the blessing after eating — see Rashi on this:`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "א",
  `<b>And some say.</b> Taz: good beer and mei eden, which are like bread and wine — see there; and specifically not fruits. And nowadays they practiced that each one blesses for himself:`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "ב",
  `<b>If</b> fruits came during the meal — since sitting and establishment help for bread, likewise one blesses for all even for fruits — Eliyah Rabbah ot 3, and see in the name of Rashba in the incident of R. Gamliel and the elders; see the Rif's ruling that even for the blessing after eating one blesses for all with fruits that come after the meal — see siman 177 in Magen Avraham ot 7:`,
);
patch(pm, "peri-megadim", 2, "ג", pm2g);
patch(
  pm,
  "peri-megadim",
  3,
  "א",
  `<b>That they direct intention toward him.</b> Taz: it is not his own reasoning so much, for it is explained in seif 3; rather he is indicating the place — truly for seif 3, for it is explained in Rosh HaShanah and several places per the view that mitzvot require intent — both require intent:`,
);
patch(
  pm,
  "peri-megadim",
  3,
  "ב",
  `<b>I have</b> a matter here, thoughts on things, and I shall list them with Hashem's help siman 60 anonymously, per view one that they require intent; and Magen Avraham wrote: specifically d'oraisa, not d'rabbanan. And behold all blessings except Birkat HaMazon which is d'rabbanan per the Mechaber siman 218 seif 3 — and he rejects saying that whatever the mitzvah is d'oraisa, the blessing also requires intent — and see siman 689, view 11 in speech requires intent. And to say that it is different when one does himself in d'rabbanan — he need not have intent, but one who hears from others — even in d'rabbanan — requires intent; it appears from Birkat HaRosh 29b that it teaches us one who blows for song — the mitzvah does not require intent, and it challenges from "pregnant behind the Temple" if he intended; and what is the difficulty — that doing differs from hearing:`,
);
patch(pm, "peri-megadim", 3, "ג", pm3g);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Seif 2: Even if they do not answer amen. See in the margin siman 219 seif 4 and seif 5:`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `Magen Avraham sk 7: that there it would have been inadvertent. And likewise deliberate — if when he blessed his mind was to eat, and afterward he interrupted between blessing and eating deliberately — even though for himself he does not fulfill, the others fulfill — from Shivchei Zahav above siman 167 seif 8:`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  3,
  "_",
  `There. And see Yoreh De'ah siman 265 seif 5. See Tevuot Shor siman 19 seif 8:`,
);

patch(st, "shaarei-teshuvah", 3, "_", st3);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `<b>But in the blessing after eating, etc.</b> Beit Yosef brought in the name of Rashba that even in this one fulfills through hearing; and it appears to me that nowadays, since people are very lax regarding the blessing after eating, one may rely on this view and bless the blessing after eating aloud and the others fulfill through him:`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "_",
  `<b>And some say in all foods, etc.</b> It appears that nowadays beer, and all the more so honey water called mei eden, are included in bread and wine; sitting helps for us that one blesses for all of them, for according to most poskim sitting helps for other things — only that there are those who say this is the Raavad; and since Rama attached the matter to custom, this too is a widespread custom — when they sit to drink these beverages, one blesses for all those reclining:`,
);
patch(
  tz,
  "turei-zahav",
  3,
  "_",
  `<b>That they direct intention toward him.</b> It is plain in several places that he too must intend to fulfill them:`,
);

const PATCH_COUNT = 27;
console.log(`ok siman 213 part 3/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-213-part3of3.json",
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
