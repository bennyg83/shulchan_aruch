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

const az = "output/siman_206/ateret-zekenim/part-001.txt";
const bh = "output/siman_206/baer-heitev/part-001.txt";
const bhg = "output/siman_206/beer-hagolah/part-001.txt";
const gra = "output/siman_206/beur-hagra/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `And he intended to exempt, etc. So too R' Yona on Rashi's explanation, and so too Kol Bo. And at any rate, if he did not intend to exempt the tree fruit, he has not fulfilled his obligation even though both are placed before him; nevertheless, l'chatchila he should not bless borei peri haAdamah but only borei peri haEtz.`,
);
patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `He must not interrupt, etc. That is, so that a student's greeting to his rabbi — "Shalom aleikha, rabbi u'mori" — [counts as k'dei dibur]; and if he interrupted more, he must return and bless — whether he blessed on an item that was not in his hand, or on a blessing he became obligated in and cannot bless at the moment (Beit Yosef in the name of Shibolei HaLeket). And he must make it audible to his ears, and there is no distinction between Shema, Birkat Hamazon, and all other blessings.`,
);
patch(
  az,
  "ateret-zekenim",
  3,
  "_",
  `That he articulate with his lips, etc. And there is no distinction between Shema and Birkat Hamazon and all other blessings — he must articulate with his lips, and if he thinks in his heart he has not fulfilled his obligation — not like Rambam and Semag, who distinguish between Shema and other blessings (and see above siman 62 and siman 185).`,
);
patch(
  az,
  "ateret-zekenim",
  4,
  "_",
  `He must hold it in his right hand. Every mitzvah one holds with the right hand (Mordekhai, chapter "How does one bless").`,
);
patch(
  az,
  "ateret-zekenim",
  5,
  "_",
  `Or from another species, etc. And there are those who disagree regarding two species — that he must return and bless when they bring before him the second species even though he has not finished eating from the first; and therefore it is good to be careful l'chatchila that his mind be on everything they will bring him, even other species whose blessings are equal to the species he blessed on (my teacher in Bach).`,
);
patch(
  az,
  "ateret-zekenim",
  6,
  "_",
  `And it fell from his hand, etc. And some say: one who blessed on food and after he blessed it became repulsive — he may eat some of it even though it has spoiled, so that his blessing should not be in vain; and the same law applies if he blessed on a cup to drink and it was spilled and he wants to drink another — he must return and bless even though there was more of that beverage before him at the time of the blessing (Beit Yosef in the name of R' Yitzchak).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "_",
  `<b>He has not fulfilled his obligation.</b> It appears to me that those that grow on the tree and one blesses borei peri haAdamah because the fruit is not finished or they are not the primary fruit — if he blessed borei peri haEtz he has fulfilled his obligation per Magen Avraham; and in Even HaEzer he disagrees that he has not fulfilled his obligation — see there. (And likewise in Eliyah Rabbah he objected to Magen Avraham on this.) And see in responsum Panim Me'irot siman 58; and in the Ba'er Heitev before me there is a lack of some letters — see there.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "_",
  `<b>Speech.</b> Meaning k'dei dibur — a student's greeting to his rabbi, namely "Shalom aleikha, rabbi u'mori"; and silence is not considered an interruption, b'dieved even for a long time — see Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "_",
  `<b>In his right hand.</b> And he should not stab with a knife — Rama.`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "_",
  `<b>He need not bless.</b> See Magen Avraham, who expanded and established as halachah, and these are his words: The principle of the matter — if his mind was on everything they will bring, it is obvious he need not bless; and if he reconsidered explicitly, it is obvious he must bless; and in an unspecified case, as long as they remain before him from the first fruits — they disagree, for according to all he must bless on them, for fruit has no permanence; but for the latter fruits he need not bless. However, specifically fruit species, but if they brought him beer to drink and fish — even though it is one blessing, he must bless unless his mind was on them. And if the first fruits are not before him, according to all he must bless — end of his words. And see Taz: if while he is blessing they bring him beautiful fruits, he should eat from the first first, since he blessed on them first, even though his mind was to exempt the beautiful ones as well. Shaarei Chesed Magen Avraham. And see in responsum Be'er Eshek siman 74 (and in Eliyah Rabbah seif kaf).`,
);
patch(
  bh,
  "baer-heitev",
  6,
  "_",
  `<b>On it.</b> See Magen Avraham: one who blessed on water and heard there is a dead person in the city — he should drink a little of the water and pour out the rest; and if they told him the tekufah falls — he should wait a little until the tekufah passes and then drink, and he need not bless. Shaarei Chesed Magen Avraham.`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 40, and like Rabbi Yehudah.`);
patch(bhg, "beer-hagolah", 1, "ב", `Tur; see there.`);
patch(
  bhg,
  "beer-hagolah",
  2,
  "_",
  `R' Yona — for their blessings are not equal, daf 41.`,
);
patch(bhg, "beer-hagolah", 3, "א", `From that which he took and blessed God's name.`);
patch(bhg, "beer-hagolah", 3, "ב", `I cited this in siman 175.`);
patch(bhg, "beer-hagolah", 3, "ג", `This too in siman 74.`);
patch(bhg, "beer-hagolah", 4, "_", `Berachot 46.`);
patch(
  bhg,
  "beer-hagolah",
  5,
  "א",
  `Rambam in ch. 4 of Hilchot Berachot from Yerushalmi.`,
);
patch(
  bhg,
  "beer-hagolah",
  5,
  "ב",
  `Tur from that Yerushalmi at the end of the siman.`,
);
patch(
  bhg,
  "beer-hagolah",
  6,
  "א",
  `Tur and Rosh from that Yerushalmi 10a and other poskim.`,
);
patch(bhg, "beer-hagolah", 6, "ב", `See there.`);
patch(bhg, "beer-hagolah", 6, "ג", `There, in Yerushalmi.`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `<b>Seif 1, if he blessed etc.</b> Tosafot there s.v. R' Yehudah etc.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `<b>Therefore etc.</b> As above siman 202 seif 2 and siman 8.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And even etc.</b> Tosafot there, second s.v. veR' Yehudah, and so Rif and Rashba that the anonymous passage in ch. 9 is plainly so, etc.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "_",
  `<b>Seif 2, they were etc.</b> As above; and the meaning of what Rashi wrote — Magen Avraham 1 s.v. aval. And even though etc. there regarding one who is not intentional:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "א",
  `<b>Seif 3, more etc.</b> As written in Yerushalmi, and Rosh brought siman 20 — the law of one who picked a radish and blessed on it and it did not come to his hand: he must bless on it a second time; and he explains on account of interruption and the measure of 24; as written in Yerushalmi and Rosh brought there ch. 9 siman 13 — he was sitting in synagogue, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ב",
  `<b>And he must etc., and if etc., provided etc.</b> As above siman 185 seif 2.`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ג",
  `<b>And they are articulated etc.</b> As written above seif 1.`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ד",
  `<b>And not etc.</b> end of ch. Berachot and ch. 23 of Shabbat and ch. 9 of Bava Metzia.`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ה",
  `<b>In what case etc.</b> ch. 2 of Challah.`,
);
patch(
  gra,
  "beur-hagra",
  3,
  "ו",
  `<b>And her face etc.</b> Berachot 24a and Magen Avraham.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "א",
  `<b>Seif 4, and even etc.</b> So in tractate Berachot, and Tosafot there s.v. veharei etc.; and Rosh ch. 9 siman 13 — R' Yehudah asked etc.; and so Semag — in all blessings it is forbidden — not like Ran in ch. 1 of Shabbat etc. Beit Yosef — and it is not so, for Ran also holds thus, as written in siman 91 seif 2.`,
);

const PATCH_COUNT = 34;
console.log(`ok siman 206 part 1 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-206-part1of4.json",
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
