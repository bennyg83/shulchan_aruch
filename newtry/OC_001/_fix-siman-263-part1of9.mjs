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

const az = "output/siman_263/ateret-zekenim/part-001.txt";
const bh = "output/siman_263/baer-heitev/part-001.txt";
const bhg = "output/siman_263/beer-hagolah/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  3,
  "_",
  `And it is good for a God-fearing woman not to kindle the Shabbat candles in a lamp — rather she should have a special wax candle for herself to kindle each Shabbat on its Shabbat (Panach Raza, parashat Beshalach):`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>A beautiful candle.</b> And one kindles in all the rooms where he walks there — Magen Tzion. See seif 6. And one makes twisted candles together, in memory that "zachor" and "shamor" were said in one utterance — and so they practice in synagogues — Bach. And it is forbidden to kindle Shabbat candles from wax that comes from their house of prayer — see siman 154 seif 11:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>To add.</b> And the practice is to kindle 7 candles corresponding to the 7 days of the week — and so too the Arizal z"l:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `<b>That she forgot.</b> And if she forgot several times she must add each time so that she be careful regarding the honor of Shabbat. And if she was compelled and did not kindle — such as when she was in prison and the like — she need not add. A blind woman also blesses, for she too enjoys from the lights; nevertheless, if she has a seeing husband the husband blesses; however, if she eats with others at one table she does not bless — Magen Avraham — see seder havanah. A woman who gave birth — the husband kindles the candles on the first Shabbat and blesses — Minhagim Magen Tzion and Shelah. And during her days of niddah the woman blesses herself — see siman 88 — and in Kenesset HaGedolah he wrote that the candle should be brought before the woman who gave birth and she blesses herself. And a woman who forgot and did not bless on the kindling — if she remembers before the time when kindling becomes forbidden, she blesses again; but after the time when kindling becomes forbidden she does not bless — Kenesset HaGedolah in the name of Mahari Bruna. And see the responsum of Nachalat Shiva siman 8. And a woman whose time of immersion arrives on Shabbat night — it is better that her husband kindle and bless; and there are women who practice going to their house between their hair-washing and immersion, kindling, and returning to immersion; and Ateret Zekenim wrote: I heard that some women practice per my grandfather the gaon z"l that they kindle in the immersion house — and see the responsum of Maharil siman 23:`,
);
patch(
  bh,
  "baer-heitev",
  10,
  "א",
  `<b>A woman.</b> And if the man kindles there is no established custom, and melacha is permitted; nevertheless it is good to stipulate. Bach:`,
);
patch(
  bh,
  "baer-heitev",
  10,
  "ב",
  `<b>First.</b> Nevertheless one should not stipulate except for need. Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  10,
  "ג",
  `<b>The candles.</b> Nevertheless one blesses on them, even if he kindles in rooms as written in seif 6; however, specifically when he has a special room and did not bless on another candle, as written in seif 6 — but those who kindle in a communal hall do not bless, even if he did not bless on another candle, for this is not a mitzvah incumbent upon him, and they also do not use it there for eating; but in a place where they use it for eating he must bless — see Magen Avraham. And it is good to be careful l'chatchila to kindle in the eating place. And it appears to me that this is when one candle stands there — Magen Avraham there:`,
);
patch(
  bh,
  "baer-heitev",
  12,
  "_",
  `<b>Shabbat.</b> And if the majority of the congregation were not in synagogue, we do not follow the minority; and likewise in a city that has many synagogues, one is not drawn after its fellow. Kenesset HaGedolah:`,
);
patch(
  bh,
  "baer-heitev",
  13,
  "_",
  `<b>To go down.</b> Meaning, that he goes to the room — see siman 266 seif 12:`,
);
patch(
  bh,
  "baer-heitev",
  14,
  "_",
  `<b>That they kindled, etc.</b> See Taz who wrote that we do not rule like either of these views — nor like the view he brings afterward:`,
);
patch(
  bh,
  "baer-heitev",
  15,
  "_",
  `<b>Shabbat.</b> That is, the recitation of Barchu for us, as written siman 261:`,
);
patch(
  bh,
  "baer-heitev",
  17,
  "א",
  `<b>Melacha.</b> For if he wished he would not have accepted Shabbat upon himself; and anything for which he has permission, speech is permitted, as written siman 307 seif 8:`,
);
patch(
  bh,
  "baer-heitev",
  17,
  "ב",
  `<b>From his work.</b> And so too in his responsum. And Bach brought repeatedly unlike Levush, who forbids unless he blessed and diverted his attention from Shabbat. And I do not know what he gains with habdallah melacha — Magen Avraham — and so ruled Taz in his responsum at length there — see Yad Aharon what he wrote on Taz. And in the responsum of Zera Avraham Orach Chayim siman 9. And this is simple: if he said the habdallah formula etc. all is permitted, as written siman 299 seif 10. However, it requires study whether afterward he may say retzeh in the weekday Amidah — it can be said specifically when praying the weekday prayer he should not say retzeh, but when he says habdallah alone he is permitted to say retzeh — see there siman 288:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "_",
  `<b>What he will eat.</b> Meaning, that he must buy with the money in his hand for food — for certainly his eating precedes the Shabbat candle; however, if he has bread to eat, that suffices, and the candle precedes taking from other foods. Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "א",
  `<b>Are admonished.</b> And even if the husband wishes to kindle himself, the woman takes precedence — Bach; except if she gave birth — see s.k. 3 as written there:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ב",
  `<b>The house.</b> And also because a woman kindled the light of the world. Nevertheless the man prepares the candles. Ketavim:`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "ג",
  `<b>First.</b> And one candle suffices — and likewise on Chanukah. Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "_",
  `<b>To hurry.</b> And from here the early ones relied that they send the children to their homes before Barchu so that they kindle and not kindle before. She'erit Yosef:`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "א",
  `<b>When she kindles she blesses, etc.</b> It is good that she have a special candle to kindle with each Shabbat on its Shabbat — Ateret Zekenim in the name of Panach Raza. It is fit that the woman pray at the time of kindling that Hashem give her sons, males, illuminating in Torah — Magen Tzion. Maharash wrote: when there is a chuppah on Erev Shabbat and they delay it until after sunset and the woman does not wish to accept Shabbat before the chuppah — then she kindles the candle without a blessing before the chuppah, and afterward in darkness she spreads her hands over the candles and blesses; or she tells a non-Jew to kindle after the chuppah and she blesses on Erev Shabbat. And Magen Avraham wrote his words are puzzling; however b'dieved if she forgot to bless until it darkened she may rely on Maharash — see s.k. 3 as written there; and nevertheless one candle suffices — Magen Avraham there:`,
);
patch(
  bh,
  "baer-heitev",
  5,
  "ב",
  `<b>After the kindling.</b> For if she blesses she accepts Shabbat and is forbidden to kindle; if so on Yom Tov she blesses and afterward kindles — so too in Sha'ar HaDerishah Orach Chayim in the name of his mother. And Magen Avraham wrote: but there is no wisdom for a woman, etc. — for the sages did not distinguish on Erev Shabbat:`,
);
patch(
  bh,
  "baer-heitev",
  6,
  "_",
  `<b>And bless on it.</b> But to kindle he must not stumble on a tree or a stone — see what was written s.k. 1. Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  8,
  "_",
  `<b>His.</b> For every addition of light brings increased shalom bayit and joy for the enjoyment of light in every corner. And Shelah wrote that nevertheless two people do not bless on one lamp that has many branches. And see in Ateret Zekenim. (And in Sefer Eliyahu Rabbah in the name of his grandfather the gaon z"l to permit two people to bless even on one lamp on Erev Shabbat.)`,
);
patch(
  bh,
  "baer-heitev",
  9,
  "א",
  `<b>In the courtyard.</b> This implies that if one eats in the house, even if it is not burning until night it is permitted; however it is a mitzvah to make long candles that burn until night — Shelah and Magen Tzion there.`,
);
patch(
  bh,
  "baer-heitev",
  9,
  "ב",
  `<b>In vain.</b> And it is possible that if in that place there was somewhat darkness and he uses something by the light of the candle, there is no prohibition — Maharil siman 23:`,
);

patch(bhg, "beer-hagolah", 1, "א", `Tur from R' Huna — Shabbat 23.`);
patch(bhg, "beer-hagolah", 1, "ב", `Tur — and all of it in siman 24.`);
patch(bhg, "beer-hagolah", 10, "א", `Shibolei Leket.`);
patch(
  bhg,
  "beer-hagolah",
  10,
  "ב",
  `Hagahot Maimoniyot chapter 25 in the name of Rabbenu Meir and Mordechai in chapter 2 of Shabbat.`,
);
patch(bhg, "beer-hagolah", 10, "ג", `Kol Bo in the name of Rif.`);
patch(
  bhg,
  "beer-hagolah",
  10,
  "ד",
  `Tosafot and Rosh at the end of chapter 2 of Shabbat, and Rabbeinu Yerucham part 2, and Maggid in the name of Ramban and Rashba.`,
);
patch(bhg, "beer-hagolah", 11, "_", `Beit Yosef from the words of Tur:`);
patch(bhg, "beer-hagolah", 12, "_", `Mordechai end of chapter 2 of Shabbat and Rambam.`);
patch(bhg, "beer-hagolah", 13, "_", `Shibolei Leket.`);
patch(bhg, "beer-hagolah", 14, "א", `Berachot 27.`);
patch(
  bhg,
  "beer-hagolah",
  14,
  "ב",
  `Beit Yosef — and so it appears from the words of Rabbeinu Yona.`,
);
patch(
  bhg,
  "beer-hagolah",
  14,
  "ג",
  `Rosh there and Rashba there and the students of Rabbeinu Yona there, and R"Y.`,
);
patch(
  bhg,
  "beer-hagolah",
  14,
  "ד",
  `Mordechai end of chapter 2 of Shabbat in the name of the Geonim.`,
);
patch(
  bhg,
  "beer-hagolah",
  14,
  "ה",
  `Shibolei Leket in the name of the Geonim.`,
);
patch(
  bhg,
  "beer-hagolah",
  15,
  "א",
  `Terumat HaDeshen siman 10 and in his writings siman 153 that he found in a responsum, and likewise several great ones ruled.`,
);
patch(
  bhg,
  "beer-hagolah",
  15,
  "ב",
  `Mordechai end of chapter 2 of Shabbat and Hagahot Maimoniyot chapter 5 and there in Terumat HaDeshen.`,
);

const PATCH_COUNT = 39;
console.log(`ok siman 263 part 1 of 9 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-263-part1of9.json",
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
