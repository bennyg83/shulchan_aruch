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

const az = "output/siman_249/ateret-zekenim/part-001.txt";
const bh = "output/siman_249/baer-heitev/part-001.txt";
const bhg = "output/siman_249/beer-hagolah/part-001.txt";
const gra = "output/siman_249/beur-hagra/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `One does not walk on Erev Shabbat, etc. And in these countries we are not careful about this. And some say that specifically when walking on foot; but one who goes in a wagon or rides on a horse — the world is accustomed to be lenient. Leave them; better that they be shogegim than mezidim. Nevertheless one must be careful not to go until evening time, even to hurry in order to come to his city and his home, for many times they stumble and profane Shabbat.`,
);
patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `And a feast whose time is on Erev Shabbat — even in this one must be careful to begin l'chatchila before two temporal hours (my teacher in Bach). It appears that one should not eat on Erev Shabbat a large feast, even at a mitzvah feast (Ateret Zekenim in the name of MaharRash in Maharil) — only the relatives and shushbinim who are more connected to that feast; and also they should not increase in the feast beyond satiation, and certainly coarse eating (Ateret Zekenim z"l). And one who buries his dead on Erev Shabbat near darkness before prayer in the synagogue is obligated in havra'ah if there is time to eat before prayer, for we rule like R' Yehuda who permits to begin, etc. (Agudah).`,
);
patch(
  az,
  "ateret-zekenim",
  3,
  "_",
  `And to eat and drink without a fixed meal, etc. — meaning specifically for the need of the hour; but to do so always is not [permitted], as it appears like belittling the honor of Shabbat (Beit Yosef in the name of Rav HaMagid). I found written the laws of fasting on Erev Shabbat — meaning yahrzeit — if it fell the first time on Erev Shabbat and he did not complete, then he need not complete (Maharshal in responsum).`,
);
patch(
  az,
  "ateret-zekenim",
  4,
  "_",
  `And so is the custom of Maharil. And regarding a dream fast one must complete until night (Bach).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>Three parsaos.</b> And if he sits in a wagon or rides on a horse he can go more; and nevertheless he should be careful that he can arrive while the day is still large. Bach.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>To prepare.</b> And in these countries most people prepare with ease, and therefore they are not careful about this. Agudah, Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `<b>Engagement.</b> And the same for a wedding feast. Bach. And this requires further study — in siman 644 seif 7 he wrote that an engagement feast is a mitzvah feast even on a weekday, all the more so on Erev Shabbat which is more lenient. And this requires further study — in siman 546 he wrote that one may marry on erev regel. And this requires further study — since he engaged on Erev Shabbat it is a feast time on Erev Shabbat. And in Rokeach siman 344 he brought this Yerushalmi, and it appears to me that here the meaning is: forbidden to engage on Erev Shabbat — the statement "engagement feast" means if he already engaged previously it is forbidden to make an engagement feast on Erev Shabbat, but to engage is permitted, meaning it is permitted to engage on Erev Shabbat lest another precede him and then one may also make a feast. Magen Avraham there, and see siman 644 seif 6. And see responsum Chut Yair siman 70 what is called a mitzvah feast at length. And one who buries his dead on Erev Shabbat — if obligated in havra'ah see Yoreh De'ah siman 341. <small>(And see in Sefer Even Ha'ozer who resolves Magen Avraham's question on the ruling of Shulchan Aruch.)</small> And in Sefer Eliyah Rabbah he rules that one who engages on Erev Shabbat — if it is possible to delay to tomorrow or another day — it is forbidden to make the feast on Erev Shabbat; and below deals with when it is impossible to delay.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `<b>Pidyon haBen.</b> And pidyon haBen whose time has passed is forbidden to be done on Erev Shabbat. And milah — even though time has passed, such as if he was sick on the eighth day — it is considered a fixed time, for every hour and moment is its time, and it is forbidden to leave him uncircumcised, as explained from Tosafot in Moed Katan daf 8 — see Magen Avraham. And see Yoreh De'ah siman 266 in Shach and Taz that some forbid circumcising a milah not at its time on Erev Shabbat.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ג",
  `<b>Permitted as above.</b> And if impossible for both to exist, the Shabbat feast should be postponed for clothing. Bach wrote it is a mitzvah to begin before the tenth hour, and Shlah wrote: my teacher Maharash of Lublin was sandek on Erev Shabbat and did not want to go to the feast since there was a minyan without him, and Shlah answered him per the sages.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "_",
  `<b>To fast.</b> And Bach wrote in the name of poskim that it is forbidden to fast on Erev Shabbat unless if he eats during the day he will not want to eat at night.`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "א",
  `<b>And on a public fast he completes.</b> It implies that on a public fast a condition does not work, since the matter does not depend on him, and so too siman 572.`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "ב",
  `<b>Dream fast.</b> It appears that the Ye''A also agree that on a dream fast one must complete, for even on Shabbat itself later ones fast — see Shakh in Nekudat HaKesef and Yad Aharon. And it appears to me that if one fasts on every Erev Shabbat and completed the first time, he must always practice thus. And the same for one who fasts the written fasts in siman 580, and the same for Rosh Chodesh that falls on Erev Shabbat, and the 20th of Sivan that falls on Erev Shabbat — Magen Avraham. And regarding yahrzeit on Erev Shabbat Bach wrote: if at first when he began to fast it occurred on Friday, he should be careful to accept upon himself not to complete, for yahrzeit is like a vow, and since he did not complete at first he need not complete again; but if it first occurred on weekdays and he completed, it becomes like a vow and he must complete even if it later falls on Friday — end of his words. Thus we learn: if it fell the first time on Friday yahrzeit and he did not complete then, he need never complete all his days if yahrzeit falls on Friday. And if he completed then, or the first yahrzeit fell in the middle of the week when he is obligated to complete by law — then he must complete every time his yahrzeit falls on Friday. And Taz disagrees and wrote it is not called a vow practice unless his intention is to practice thus forever; therefore one who is lenient has not lost, especially one who suffers on Erev Shabbat. And see Yoreh De'ah siman 402 seif kuf yud bet in Sha'ashu'im, and the world practices like Bach, and see in responsum Nachalat Shiva siman <small>(57)</small> [58].`,
);

patch(bhg, "beer-hagolah", 1, "א", `Sukkah 44, and as there are those who say — Rif, Rosh, and Rambam in chapter 40.`);
patch(bhg, "beer-hagolah", 1, "ב", `Beit Yosef`);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ג",
  `From the words of Rambam there and Rabbeinu Yerucham in part 1.`,
);
patch(bhg, "beer-hagolah", 2, "א", `From that which is in Gittin 38.`);
patch(bhg, "beer-hagolah", 2, "ב", `Rav HaMagid on Rambam chapter 40.`);
patch(
  bhg,
  "beer-hagolah",
  3,
  "_",
  `Tur from that in Eruvin 8, and explained in Yerushalmi chapter 2 of Ta'anit.`,
);
patch(
  bhg,
  "beer-hagolah",
  4,
  "א",
  `Ta'anit 18 according to Rosh there, and so too Tur.`,
);
patch(
  bhg,
  "beer-hagolah",
  4,
  "ב",
  `Tur and Hagahot Maimoniyot chapter 1 of Hilchot Ta'anit.`,
);

patch(
  gra,
  "beur-hagra",
  1,
  "_",
  `<b>Seif 1, "and this applies when he is," etc., and if.</b> As written above — even a kosa deharsena, etc.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "א",
  `<b>Seif 2, that he is not accustomed.</b> So is proven from that in Pesachim 99b — "eats and goes," etc.`,
);
patch(gra, "beur-hagra", 2, "ב", `<b>And even if he [is accustomed].</b> Yerushalmi.`);
patch(
  gra,
  "beur-hagra",
  2,
  "ג",
  `<b>And all day.</b> For stam it says there on Erev Shabbat.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ד",
  `<b>And a feast whose time [is set].</b> For even an engagement feast — if he already engaged — is permitted, as written in chapter 3 of Pesachim 49a; and even a wedding feast as written in chapter 1 of Moed Katan; and all are permitted on erev regel.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ה",
  `<b>And to eat.</b> Pesachim 99b — like R' Yosi of the mishnah there agrees with him; and therefore "without fixed [meal]" it deals with, as written below; and so explains the language "eats," etc.; and therefore in a feast that he is accustomed [to] it deals with, as above.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ו",
  `<b>But a mitzvah.</b> There 100a — the halachah is like R' Yosi regarding interruption; and there Ri''A — we do not interrupt, meaning we do not begin except that there regarding a fixed feast; and Tosafot in the name of BeHaG.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "א",
  `<b>Seif 4, if he accepted.</b> For any fast that did not set, as written in Ta'anit 12; and with an unspecified acceptance he must complete.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ב",
  `<b>If not.</b> According to Rosh's explanation in Eruvin there — they fast and complete, meaning if he wants; and so wrote Tosafot there s.v. vehalakhta, etc.`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "ג",
  `<b>And some say not.</b> Tosafot in Avodah Zarah 34a s.v. mit'anim, etc.; however, etc.; and in Magen Avraham.`,
);

const PATCH_COUNT = 30;
console.log(`ok siman 249 part 1 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-249-part1of4.json",
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
