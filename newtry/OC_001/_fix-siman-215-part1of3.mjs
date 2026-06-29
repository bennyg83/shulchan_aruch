import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { biurHalacha2a } from "./pipeline/work/_siman-215-p1-long-en.mjs";

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

const az = "output/siman_215/ateret-zekenim/part-001.txt";
const bh = "output/siman_215/baer-heitev/part-001.txt";
const bhg = "output/siman_215/beer-hagolah/part-001.txt";
const gra = "output/siman_215/beur-hagra/part-001.txt";
const bhc = "output/siman_215/biur-halacha/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `One should also answer after etc., and likewise on Shabbat after "Ufros sukkat Shalom" etc., in a place where the custom is to answer after one's own blessing (Beit Yosef). And in the morning Torah blessing that has two blessings — study is required whether one should answer amen after one's own blessing (Maharshal). Safek berachot lehakel.`,
);
patch(
  az,
  "ateret-zekenim",
  3,
  "_",
  `But when they etc. Nevertheless, an adult who is obligated in that blessing does not fulfill his obligation by hearing it from the child, and even when he intends to fulfill his obligation and answers amen — nevertheless he does not fulfill his obligation, since the child is not obligated in that blessing but only to train (Lechem Rav).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "_",
  `<b>Jerusalem.</b> For it is the end of the blessings that are d'oraisa, while HaTov VeHaMetiv is d'rabbanan.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `(א) <b>Amen.</b> In the Midrash it says: when one hears another praying a word or blessing for Israel, even without mention of the Name — he is obligated to answer amen; therefore they answer amen after "HaRachaman" in Birkat HaMazon. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `(ב) <b>After a non-Jew.</b> But there is no obligation — Taz wrote, and see Magen Avraham; and even though the non-Jews intend their blessing for idolatry, nevertheless one considers etc., as written in siman 156.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "א",
  `(א) <b>When he is learning.</b> But an adult, when he is learning, says without a Name. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ב",
  `(ב) <b>They answer after them.</b> And nevertheless, he cannot fulfill the adult's obligation through them.`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "_",
  `<b>In vain.</b> And it is forbidden to cause an extra blessing when one could exempt with one blessing. And for the same reason it is forbidden to chat between slaughter and slaughter. And on Shabbat, if they brought him fruits during the meal, he may set them aside until after the meal in order to bless on them the concluding blessing — for on Shabbat it is permitted to cause a blessing to complete one hundred blessings (Shelah). And Maharam Galanti siman 38 wrote that on Shabbat he may instruct his household not to lay all the fruits before him at once. And Kenesset HaGedolah in the name of Sefer HaZichronot forbids increasing blessings even for a mitzvah, that one should not bring them before him. See Magen Avraham.`,
);

patch(
  bhg,
  "beer-hagolah",
  1,
  "_",
  `Berachot 45 for the explanation of Rif and Rambam and R' Yona and Rosh and Rashba`,
);
patch(bhg, "beer-hagolah", 2, "א", `There, siman 51`);
patch(bhg, "beer-hagolah", 2, "ב", `There, siman 53`);
patch(bhg, "beer-hagolah", 2, "ג", `Rambam chapter 1 of Hilchot Berachot`);
patch(bhg, "beer-hagolah", 3, "א", `In the Gemara there`);
patch(bhg, "beer-hagolah", 3, "ב", `Rambam there`);
patch(bhg, "beer-hagolah", 3, "ג", `Tur in the name of Raavad's commentary`);
patch(bhg, "beer-hagolah", 3, "ד", `Rashi there`);
patch(bhg, "beer-hagolah", 4, "_", `Rambam there:`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `(א) <b>Seif 51, one does not etc. and they practiced etc. and there are those who say etc.</b> See what is written in siman 51 seif 3:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `(ב) <b>And in places etc.</b> For there it is the end of the blessings, as written in the mishnah "in the morning he blesses etc." and as with Boneh Yerushalayim:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "א",
  `(א) <b>Seif 52, one is obligated etc.</b> Rambam, who explains what is written "after all, one answers amen" — an obligation; and as written "for I will call on the name of the Lord" etc., and as written in Sifrei there, and from where do we know that one answers amen after the one blessing — who says "Give greatness" etc., and see Gemara Yoma 37a and Taanit 16b:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `(ב) <b>But etc.</b> Rambam, and when one did not hear the entire blessing, and as written in the mishnah there regarding a Samaritan, and likewise an apikoros — they share one reason. But regarding a child and an adult etc. — even if he heard the entire blessing, and a child there siman 53 seif 2, and as written in seif 3, and likewise mishnah on a coin etc., and as Rambam wrote that the reason one does not answer amen after children is because the blessing is in vain, and even though it is permitted — how much more so in mishnah, where we hold he has not fulfilled and it is in vain, and like R' Yehudah 40 seif 2, the halachah is like R' Yehudah. But Rosh there wrote in the name of Yerushalmi that the halachah is like R' Meir, and see siman 167 seif 10; and it is possible, as written above, there R' Meir does not argue etc., and in Rambam there law 15:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ג",
  `(ג) <b>And they answer etc.</b> This requires further study — for in Tosefta and Yerushalmi they said regarding a non-Jew that even if he did not hear the entire blessing, and Rosh brought there, and this is what he said: the Yerushalmi in chapter 8 of Berachot teaches: a Jew who blessed the Name — they answer amen after him. And even though the Yerushalmi can be explained like the words of Ri's view that it discusses when one heard the entire blessing, and it teaches us that even after a Jew one answers amen — but in Tosefta it does not say so, for there in siman 66 it says: a Jew who blesses the Name — they answer amen after him; a Samaritan who blesses the Name — they do not answer amen after him until he hears the entire blessing. And Beit Yosef's words require further study more, for he wrote that according to Rambam after a Jew one never answers amen after him, and a Samaritan now is like a Jew as written in the first chapter of Chullin — and therefore Rambam was silent and wrote one does not answer after them. And even if he strained and said that since in the Gemara it was not mentioned, therefore they argue with Tosefta and Yerushalmi — his words are very surprising. And likewise from the Rav's language it appears regarding a Samaritan that even if he heard the entire thing one does not answer — and all this is surprising; and it appears to me that therefore there is a textual error in Rambam, and the law is clear that for a Samaritan who heard the entire thing, and a Jew even part of it — they answer. But with our version in Rambam it is impossible to reconcile at all, for certainly it says even if he heard the entire thing, from his silence, and furthermore from that he listed together with child and adult etc.:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "א",
  `(א) <b>Seif 53, it is permitted etc.</b> Rambam and the aforementioned Gemara:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ב",
  `(ב) <b>But etc.</b> In the Gemara there, and as Rosh explained in the name of Raavad:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "א",
  `(א) <b>Seif 54, every etc.</b> Berachot 33a:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ב",
  `(ב) <b>And it is forbidden etc.</b> Rambam, and he learned from this regarding children, as written in seif 2:`,
);

patch(bhc, "biur-halacha", 2, "א", biurHalacha2a);
patch(
  bhc,
  "biur-halacha",
  2,
  "ב",
  `(ב) <b>From its beginning until its end</b> — because in the Gemara it concludes that regarding a Samaritan we require until he hears the entire thing [namely before they decreed against them]; therefore the Mechaber also used this language, that regarding a Jew we do not require this. But in truth, even if he did not hear also the end of the blessing — if he knows which blessing the one blessing recited, he may answer amen per all views, as above in siman 124 seif 8 in the gloss there. Since here it discusses where the listener does not want to fulfill with that blessing [for one who wants to fulfill, he already ruled above in siman 213 seif 3 that we require specifically until he hears the entire thing, see there]:`,
);
patch(
  bhc,
  "biur-halacha",
  2,
  "ג",
  `(ג) <b>He is obligated to answer amen after him</b> — see in Taz, where it is proven from him that he holds the Tur too concedes to the essence of the obligation, but he holds that regarding obligation we require specifically that he hear from him the entire blessing; and see in Maamar Mordekhai that he too sides thus, and not as some strained in the words of Tur:`,
);
patch(
  bhc,
  "biur-halacha",
  2,
  "ד",
  `(ד) <b>The one blessing is an apikoros</b> — see above in siman 40 in Biur HaLachah s.v. "shekatavan apikoros." And it is plain that minim who do not believe in the words of chazal are like Samaritans before they decreed against them, that one must answer after them amen when they heard the entire blessing from their mouths — and this is specifically regarding answering amen alone. And regarding joining for other matters of holiness they are no better than Karaites; and see above in siman 55 seif 247 in Mishna Berurah:`,
);
patch(
  bhc,
  "biur-halacha",
  2,
  "ה",
  `(ה) <b>If he heard the entire blessing</b> — behold, the view of several acharonim that according to Rambam one does not answer after him in any case; and nevertheless, it appears that in practice one should be lenient, since there are poskim who hold that even if he did not hear the entire blessing he must answer, as is proven from Yerushalmi, and so GRA ruled l'dina; and therefore it suffices for us if we are stringent that he must hear the entire thing:`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 215 part1of3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-215-part1of3.json",
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
