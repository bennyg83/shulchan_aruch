import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  biurHalacha11,
  biurHalacha12a,
  biurHalacha12b,
  biurHalacha14,
  biurHalacha2a,
  biurHalacha2b,
  biurHalacha2g,
  biurHalacha2d,
  biurHalacha2e,
  biurHalacha3,
  chatamSofer2,
} from "./pipeline/work/_siman-216-p3-long-en.mjs";

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

const gra = "output/siman_216/beur-hagra/part-001.txt";
const bhc = "output/siman_216/biur-halacha/part-001.txt";
const cs = "output/siman_216/chatam-sofer/part-001.txt";
const chs = "output/siman_216/chokhmat-shlomo/part-001.txt";
const er = "output/siman_216/eliyah-rabbah/part-001.txt";

patch(
  gra,
  "beur-hagra",
  3,
  "ג",
  `(ג) <b>That it is nardi skin.</b> Taz — and it should read "still nardi" with a dalet, as Rambam wrote in his commentary on Tractate Keritut chapter 1, and similarly in his composition in chapter 2 of Hilchot Klei HaMikdash; and it is Arabic language — see there in chapter 1; and Rambam meant nardi from India as he wrote above. Furthermore, in their language it is called a tree, as he wrote in the commentary there — "tree" in their language. But Semag disagreed with this, for they said in chapter 6 of Shabbat that it was hidden, etc. — see Kenesset HaGedolah there in chapter 2:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ד",
  `(ד) <b>And on the frankincense.</b> As he wrote regarding atzei levonah:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ה",
  `(ה) <b>And the gummy resin (mistsakhi).</b> See Rashi chapter 4 of Yoma 33b s.v. bimushtaki, etc. — resin, etc.; and likewise Ran in the chapter of eight sheratzim — although it is resin, it is only from the tree itself:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "_",
  `<b>Seif 4 on oil, etc.</b> There, chapter 1:`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "_",
  `<b>Seif 5 on oil, etc.</b> Thus Rambam explains — meshcha kevisha or techina; and chapter like Neharde'a, and likewise Rif and Rosh and Tosafot — and specifically oil whose primary source is a tree. Magen Avraham:`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "א",
  `(א) <b>Seif 6 — oil whose name is among the spices, etc.</b> This is kesharta per Rambam's explanation; and even though Rambam wrote in Mishna Berakhot per a variant — but our variant is in Berakhot, and likewise Tur; and this means whose name is in atzei besamim; and Rambam deals with whose name is among many species — see Beit Yosef. And this is what he wrote: "and if there were in it trees and spices," etc.; and likewise Rosh there explains Arukh, etc. — "and if they were mixed," etc.:`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "ב",
  `(ב) <b>And if there were trees, etc.</b> As he wrote in the shop of besamim; and see there at the beginning of siman 217:`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "ג",
  `(ג) <b>Some say one blesses, etc.</b> Like afarsimon oil. Tur — who explains that therefore one blesses on afarsimon oil in Shulchan Aruch, because it has no spices in essence; and this is what is meant: this afarsimon oil — what does one bless:`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "ד",
  `(ד) <b>And some say, etc.</b> There; and see siman 297 seif 3 Ya'avetz; and the view of Raavad that one blesses in Mishna Berakhot — see Rosh and Tur; and the view of Tosafot s.v. meshcha that one blesses as if the spices are within it:`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "א",
  `(א) <b>Seif 7 — simlak, etc.</b> Magen Avraham in the name of Rashba, who wrote thus in the name of the Geonim; and likewise Arukh in the name of the Geonim — he wrote that flax, even though it is soft, is called a tree:`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "ב",
  `(ב) <b>Rosemary (rusmarin).</b> Thus Beit Yosef in the name of Terumat HaDeshen. And he erred, for Terumat HaDeshen did not write it except regarding chilfa dema; and likewise Arukh explains in the name of the Geonim, and Abudraham in the gloss — he explained grofli; and it is difficult — for if so, one should bless she-natan reiach tov ba-perot, as written in siman 101:`,
);
patch(
  gra,
  "beur-hagra",
  7,
  "ג",
  `(ג) <b>Spikenard (shibbolat nerad).</b> Rashi there; and likewise Rashi also in the first chapter of Keritut; and likewise Rambam explains in his commentary there that thus it is in the foreign language:`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "א",
  `(א) <b>Seif 8 — siglei.</b> See in Sanhedrin 99a; and as he wrote regarding duda'im, "they gave," etc.:`,
);
patch(
  gra,
  "beur-hagra",
  8,
  "ב",
  `(ב) <b>And iuleish.</b> Berakhot there in Rashi:`,
);
patch(
  gra,
  "beur-hagra",
  9,
  "א",
  `(א) <b>Seif 9 — chavatzalat.</b> Rashi and Terumat HaDeshen in the name of Arukh. And as he wrote, "I am a chavatzalet," and the Targum there: "I am compared to narkom," etc.:`,
);
patch(gra, "beur-hagra", 9, "ב", `(ב) <b>And some say.</b> Terumat HaDeshen in the name of R' Yeshaya:`);

patch(bhc, "biur-halacha", 1, "_", `<b>That smells good</b> — and there is no distinction between detached spices and when it is still connected in the ground, such as when one walks in a field where those fruits and fragrant spices grow [thus it appears from Shakhnehag, and it was brought in the gloss of Maharshal there in siman 217]:`);
patch(bhc, "biur-halacha", 11, "_", biurHalacha11);
patch(bhc, "biur-halacha", 12, "א", biurHalacha12a);
patch(bhc, "biur-halacha", 12, "ב", biurHalacha12b);
patch(bhc, "biur-halacha", 14, "_", biurHalacha14);
patch(bhc, "biur-halacha", 2, "א", biurHalacha2a);
patch(bhc, "biur-halacha", 2, "ב", biurHalacha2b);
patch(bhc, "biur-halacha", 2, "ג", biurHalacha2g);
patch(bhc, "biur-halacha", 2, "ד", biurHalacha2d);
patch(bhc, "biur-halacha", 2, "ה", biurHalacha2e);
patch(bhc, "biur-halacha", 3, "_", biurHalacha3);

patch(
  cs,
  "chatam-sofer",
  1,
  "_",
  `In Magen Avraham sk 3 — in the round etrog, and Rosh 48 in Berakhot siman 35:`,
);
patch(cs, "chatam-sofer", 2, "_", chatamSofer2);

patch(
  chs,
  "chokhmat-shlomo",
  1,
  "_",
  `<b>Seif 2.</b> If this which emerges from it is smell, etc. — see in Magen Avraham what he questioned on Rosh in the name of Rabbeinu Yona regarding the law of nevelah that turned into honey; and see in my compositions on Tractate Niddah 9, what he wrote on this; also in my compositions on Tractate Avodah Zarah 29b regarding vinegar of gentiles — what I discussed there are pleasant matters, with God's help; examine well.<br><b>(There)</b> Like musk — one blesses borei minei besamim. See in my compositions Sefer HaChayim what he wrote in the words of Rabbeinu Yona regarding musk; and see in my compositions Mayim Niddah in the tractate Niddah 16 regarding "Who can produce pure from impure" — what he wrote there; examine well:`,
);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>[Levush] Every soul, etc.</b> That is to say — since he should have said "The soul shall praise Hashem" and he says "Every soul":`,
);
patch(
  er,
  "eliyah-rabbah",
  10,
  "_",
  `(10) <b>Among the gummy resins and the like, etc.</b> Ran explained in the chapter of eight sheratzim: it is resin of a tree from which they make pitch:`,
);
patch(
  er,
  "eliyah-rabbah",
  11,
  "_",
  `(11) <b>[Levush] Because, etc.</b> This is the language of Beit Yosef in the name of Rabbeinu Yona — because it is found in Eretz Yisrael and it is important, etc. — until here. And in Ba'al Halachot Gedolot I found: and what he wrote "from all my anointed in my name" — these were arrested for them, and the smell of this tree emerges — until here. Olat Tamid wrote in the name of Bach: b'dieved, if he blessed borei atzei besamim he fulfilled — until here. Although Bach wrote that there are disputants, nevertheless his view appears, and the essence is that he fulfilled; and in the Yerushalmi, chapter Keitzad Mevarchin, I saw a dispute in this:`,
);
patch(
  er,
  "eliyah-rabbah",
  12,
  "_",
  `(12) <b>[Levush] Therefore it is correct, etc.</b> And the view of Bach and Nachalat Tzvi is to smell it and bless borei minei besamim; and it is clear that Bach's proof is from that Rambam calls the anointing oil kesharta, that one blesses borei minei besamim, as Beit Yosef wrote; and it is simple that the anointing oil was filtered, and I did not descend to the end of the view of Taz, who brought the view of Bach for something that never entered his mind, as if the language of Shulchan Aruch is the language of Rambam — and this is not so at all. And for the law it appears to me that the essence is as Bach and Nachalat Tzvi, and proof from that Rosh and Rabbeinu Yona and Kolbo and Rabbeinu Yerucham and Avudraham and other poskim wrote according to Raavad: if he removed the spices from there, he blesses borei minei besamim — and they did not explain that the primary source must remain somewhat, as Tur wrote; but certainly it deals simply that they filtered it. Also, the view that Tur and Shulchan Aruch wrote that one blesses on it borei shemen arev yechida'ah is a lone view after examination among the poskim; and likewise ruled Ri'az in Shiltei Gibborim that one blesses borei minei besamim, and it is not similar to siman 217 seif 3, where it only absorbed from smoke, but here it absorbed from the essence of the spices that he extracted the moisture of their essence; and there is further to distinguish between a species of fruit that absorbed smell and a vessel that absorbed smell — and see at the end of the siman (Tosefta):`,
);
patch(
  er,
  "eliyah-rabbah",
  13,
  "_",
  `(13) <b>[Levush] Rather he should smell, etc.</b> This enactment the Levush added of his own reasoning; and Lechem Chamudot wrote, and it did not help us unless he take afarsimon and bless on it — for behold the view of those who say to bless on this oil is that they say to bless borei shemen arev; and if he intended for this, he should not have been cryptic but should have explained that therefore he wrote on it Or Chadash. And I wonder at him — he should have explained whether it is in Eretz Yisrael; and it is possible that it deals with one brought outside the land — until here. And he was not precise: because it is important and grows in Eretz Yisrael they established the blessing borei shemen arev — and we certainly establish it even if it grows outside Eretz Yisrael, like all seven species with which Eretz Yisrael was praised, for which they established a blessing resembling the three [blessings], even if they grew outside Eretz Yisrael, as above in siman 208; and perhaps afarsimon oil is not common at all that it grows outside Eretz Yisrael. And the main difficulty of Lechem Chamudot — it appears to me to answer that the Levush holds like Bach that b'dieved one fulfills with the blessing of borei atzei besamim on afarsimon oil; and if so, if we do not have afarsimon it is considered b'dieved; and moreover, since many poskim bless on this oil with atzei besamim, as Beit Yosef wrote, the Levush holds it is permitted l'chatchila in this, even if he take something on which one blesses borei atzei besamim. Examine well:`,
);
patch(
  er,
  "eliyah-rabbah",
  14,
  "_",
  `(14) <b>Ishpeig.</b> And this is spignardi in the Polish language; they are accustomed to pour it into the water with which kohanim wash hands for the duchan, and those standing there must bless borei minei besamim as with rosewater. And the language of Orchot Chayim: they call it shpika nardi, and some call it lavendel — and it is of this species — until here:`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) <b>[Levush] It appears to me because, etc.</b> Lechem Chamudot wrote on 294 and Malbushei Yom Tov — it escaped the Levush what Rashi explained in Niddah 52b: the reason is because the pleasure is slight — until here. And it appears to me that the Levush explains according to Rashi: since the smell is finished, etc., therefore the pleasure is slight; and likewise Bach explained Rashi's words. Also, it escaped the Levush and Lechem Chamudot and Malbushei Yom Tov the words of Kolbo 21, who wrote explicitly like the words of the Levush. Olat Tamid wrote another reason: because a fragrant thing, since one smells in it, a concluding blessing is not applicable. Lechem Chamudot wrote that from this reason — that the pleasure is slight — one can reconcile that which one does not bless Shehecheyanu on smell; and Maharam of Padua, may his memory be for a blessing, said: because the blessing on smell is based on "Every soul shall praise Hashem," and an eternal soul is not applicable to say "who has kept us alive," etc., for behold it lives eternally in itself. And Magen Avraham wrote: because they are all year and the sense contradicts this — and see Shiyurei Kenesset HaGedolah:`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 216 part3of8 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-216-part3of8.json",
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
  /\bartist\b/i,
  /\bgarage\b/i,
  /\bBible\b/i,
  /\bKGB\b/i,
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
