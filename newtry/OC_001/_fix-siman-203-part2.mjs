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

const khc = "output/siman_203/kaf-hachayyim/part-001.txt";
const ls = "output/siman_203/levushei-serad/part-001.txt";
const mhs = "output/siman_203/machatzit-hashekel/part-001.txt";
const ma = "output/siman_203/magen-avraham/part-001.txt";
const mech = "output/siman_203/mechaber/part-001.txt";

patch(
  khc,
  "kaf-hachayyim",
  5,
  "_",
  `(5) There — on strawberries, etc. They are called in German "moyl" and "malinche"; but in some countries there are types of "moyl" in German that grow on a tree — and then one blesses borei peri haEtz upon them. Orach Chayim. Eliyah Rabbah, note (1).`,
);
patch(
  khc,
  "kaf-hachayyim",
  6,
  "_",
  `(6) In that Rama gloss: that it is not called a tree, etc. See in Beer HaGolah, who wrote that the Rama's gloss belongs after seif 3 and the Mishna Berurah continues after it — and they did not look in the Tur, where it is written explicitly that this refers to strawberries themselves; see there. And likewise in Ma'orei Or, part Be'er Sheva, page 41, that its place is properly in seif 2; see there.`,
);
patch(
  khc,
  "kaf-hachayyim",
  7,
  "_",
  `(7) In that Rama gloss: that it is not called a tree, etc. And it is a sign to know which is tree fruit and which is ground fruit: any tree whose fruits fall off and the trunk and roots remain in the ground, and it returns from year to year and produces branches and leaves and fruit — or leaves and fruit without branches — this is called tree fruit. But anything whose roots do not remain in the ground and must be sown each year is called ground fruit. And there are types where when the fruit falls, the trunk and roots remain in the ground; in winter it dries and even the trunk is consumed and only the roots remain in the ground; the next year the root returns and produces a new trunk and fruit again grows on it — such as strawberries that grow in a bush. Some say one blesses borei peri haEtz, since its trunk remains many days after the fruit falls and its roots endure and it need not be sown each year. And some say: since the trunk is consumed each year and only the roots remain — even though it grows again on its own and need not be sown each year — it is ground fruit and one blesses borei peri haAdamah upon it. Tur, Beit Yosef, and Levush. And we already wrote above, note (4), that such is the view of Maran, may his memory be blessed, and the latter authorities — a second book to bless borei peri haAdamah upon it; but only b'dieved, if he blessed borei peri haEtz he has fulfilled, because there are those who hold thus. And it requires study. Sdei Chemed.`,
);
patch(
  khc,
  "kaf-hachayyim",
  8,
  "_",
  `(8) In that Rama gloss: since its trunk is completely consumed, etc. If so, the same applies to fruit called "brombeer" and to red fruit called "erpherit" — one blesses borei peri haAdamah. And likewise in Berakhot, Maharil, and so is the practice. Bach. And the Agudah wrote that on "brombeer" and "erpherit" one should bless borei peri haEtz, for thus the branch endures many days and when one takes fruit it again comes from that same branch itself; end of his words — and such is the main matter. And likewise the rulings of Tosafot in Berakhot, chapter 6. And likewise those called in Poland "jagodas" — the black ones; but the red ones grow among grasses and one blesses borei peri haAdamah. And those red ones found in Tamuz — and there is also a type found in winter that has nothing but mere sap enclosed within the pits; they suck them out and discard them — it is appropriate to bless shehakol, as written siman 202, seif 8 and seif 15. And even though some swallow them with the peel and pit, nevertheless our eyes see that the peel and pit are not fit for eating at all; if so, one should bless only on the liquid inside. Magen Avraham, note 1. Eliyah Rabbah, note (1). Some say in Hagahot Beit Yosef. However, what Magen Avraham wrote regarding fruits that one sucks — that one blesses shehakol — Birkei Yosef wrote on this a general rule; Nahar Shalom, note (6): it is possible his intent is regarding a type of jagoda whose food is not fit for anything except sucking; but jagodas called "broishnitz" and "zaaribin" and the like — plainly one blesses borei peri haAdamah, and so is the practice of the world; see there. And likewise regarding what Magen Avraham wrote that on black jagodas one blesses borei peri haEtz — Chayei Adam wrote there, note (9), that the world practices to bless borei peri haAdamah, for they are not considered much of a fruit; see there.`,
);
patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `Magen Avraham, note 1 — and they suck them out; and these are the "kalinos," and he compares them to sugar; and regarding sugar itself there is a dispute; therefore in practice it appears to me to act as Taz wrote, note 13.`,
);
patch(
  ls,
  "levushei-serad",
  2,
  "_",
  `There — as written siman 202, seif 8 and seif 15 — so it should read.`,
);
patch(
  ls,
  "levushei-serad",
  3,
  "_",
  `Shulchan Aruch, seif 4 — ilanei serak: meaning trees that grow on their own and are not planted — so is explained from Taz. And similarly at the beginning of siman 204; see there, Taz, note 8. Shulchan Aruch, seif 1 — on mushrooms; see Minchat Yaakov, general rule 46, note 3.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "א",
  `(Note 1) Since its trunk is completely consumed, etc. (In Orach Chayim he wrote in the name of Orach Chayim that strawberries are what they call in German "moyl" and "malinche"; but in some countries there are types of "moyl" in German, such as in the lands of Austria, that grow on a tree — and then one blesses borei peri haEtz; end of his words.) If so, the same applies to fruit called "brombeer," etc. And the Agudah wrote regarding "brombeer," etc., that thus the branch endures, etc. I was uncertain about his intent, for we say on page 40: how does one bless borei peri haEtz? If you take the fruit, it is in the trunk and again produces, etc. — and the fathers of the world disagreed in the explanation of "trunk." Some explain that he means the branch endures from year to year — therefore one blesses borei peri haEtz. But if the branch does not endure, even though the root endures in the ground and the next year again produces fruit and branches from its root — nevertheless one blesses borei peri haAdamah.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "ב",
  `And some explain that "trunk" means the root: if only the root endures, one blesses borei peri haEtz; but if even the root does not endure and it must be sown each year, one blesses borei peri haAdamah — and Shulchan Aruch ruled like the first opinion.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "ג",
  `Therefore he wrote to bless on strawberries borei peri haAdamah, as Rama wrote. And on this Magen Avraham brought in the name of Bach that the same applies to "brombeer" and "erpherit" — one blesses borei peri haAdamah, for they too have no enduring trunk but only the root. And afterward Magen Avraham brought in the name of the Agudah to bless borei peri haEtz upon them, for thus the branch endures, etc. If his intent is that the Agudah too holds one requires specifically that the trunk endure and not merely the root's endurance:`,
);
patch(mhs, "machatzit-hashekel", 1, "ד", `Rather he holds that on "brombeer" and "erpherit" the trunk endures.`);
patch(
  mhs,
  "machatzit-hashekel",
  1,
  "ה",
  `The matter is difficult in my eyes — that they should divide in reality: for Maharil's blessing the trunk does not endure, and for the Agudah the trunk endures. And if we say the Agudah too holds that on "brombeer" and "erpherit" the trunk does not endure, but he rules like the poskim that it suffices if the root endures — if so, he also disputes regarding strawberries and holds one blesses borei peri haEtz upon them. According to this, the Agudah's wording is strained — "for thus the branch endures" — and it should have said "for thus the root endures." And see in Beit Yosef. It is appropriate to bless shehakol, as written siman 202, seif 8 and seif 15 — that on all liquids that come from fruits, except olives and grapes, one blesses shehakol.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "_",
  `(Note 2) Ilanei serak, etc. — it is merely a tree: meaning that the fruit too is a tree fruit and not ground fruit on account of its inferiority, as in note 1.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  3,
  "א",
  `(Note 3) Rather, etc. — ilanei serak. And Rabbenu Yonah wrote in the name of Shiltei HaGibborim, and this is his language: it was taught — the four species of the lulav: two produce fruit and two do not produce fruit. And since we say hadas and aravah do not produce fruit, we learn that the fruit of ben Asa is not fruit; end of his words.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  3,
  "ב",
  `And see siman 202, seif 16, who wrote that on date clusters of nettles one blesses borei peri haAdamah — from which we learn that nettles are a tree that produces fruit and one blesses on its fruits borei peri haEtz; except that its dates, where the main fruit is not cut off, we descend a level and bless borei peri haAdamah.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "א",
  `(Note 4) Ginger, etc. — and see siman 204, seif 61, that it is explained thus regarding anise and cumin.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ב",
  `Bach wrote, etc. — and likewise Rashi on Yoma 81b: Rava said — dry ginger on Yom Kippur is exempt. Ravina said to Marimar: but R' Nachman said this homlita that comes from Bei Nudai is permitted and one blesses borei peri haAdamah upon it — there is no difficulty: here when moist, here when dry. And Rashi wrote: homlita — that they spice with spices, ground in honey, is permitted.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ג",
  `And it has no concern of bishul akum, for it is eaten as it is, live; and not concern of absorption in non-Jewish vessels — netilat kelim (meaning: ordinary non-Jewish vessels are not "children of the day"). And since he said there is no concern of bishul akum, we learn that its manner of eating is when live; end of his words — meaning we hold that something eaten live, if a non-Jew cooked it, has no concern of bishul akum.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ד",
  `And it does not fit Rashi's explanation — that the difficulty is from that he said one blesses borei peri haAdamah upon it; for if so, what is Rava's difficulty? Rava deals with one who ate it as it is, without compounding — and then it is not fit for eating, and therefore he is exempt on Yom Kippur; and likewise one does not bless upon it. And R' Nachman, who said one blesses upon it — behold it is explained he deals when it is compounded, for then it is good for food; and in such a case Rava indeed concedes that if one ate it on Yom Kippur he is liable. Therefore Rashi wrote that he deduces from that he said there is no concern of bishul akum — end of his words — that it is eaten as it is even before compounding; and since it is fit for eating before compounding, Rava properly challenges: why on dry ginger on Yom Kippur is one exempt — behold it is fit for eating. And on this he answers: here when moist, here when dry — meaning when moist it is fit to eat it live, but when dry it is not fit to eat live; and Rava who exempts deals with dry ginger, and the homlita of R' Nachman deals when they compound it while moist — then it is eaten live. According to this, if non-Jews cooked and compounded it when dry, there is concern of bishul akum, for it is not eaten as it is, live.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ה",
  `But the view of the Tur and Tosafot, etc. — the Tur's view, as Bach himself wrote: since the Tur wrote plainly homlita that comes from Bei Nudai with borei peri haAdamah and did not write only if they cooked it when moist — or he holds that in every case it is permitted. And see in Bach what he wrote. And Tosafot, who wrote on Berakhot 36b that this sugya is also there, and Tosafot wrote s.v. berativta — such as "lituarin" in the vernacular — one blesses upon them borei peri haAdamah, etc.; end of his words. And per Rashi on Yoma, the main point is missing from Tosafot's words, who wrote such as "lituari" — it should have said "lituari" that they cooked and compounded when moist — or he holds that even if they cooked it when dry it is permitted; and he explained the sugya as we will write below.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ו",
  `And in the Gemara the difficulty stands — meaning: since Magen Avraham holds that even if they cooked it when dry, when it is not fit for eating, nevertheless there is no concern of bishul akum; and the reason that Magen Avraham wrote afterward — if so, what does Rava challenge from this homlita? Therefore he wrote that the difficulty is from the blessing, for R' Nachman said one blesses borei peri haAdamah upon it — end of his words — that it is fit for eating. And if you say homlita is different because it is compounded and through this fit for eating — this is truly the intent of the answer "here when moist": meaning since it is compounded, it is as if moist and fit for eating; therefore one blesses upon it borei peri haAdamah. And with this one may reconcile Tosafot's words, who wrote berativta such as "lituari" — meaning it is compounded and through this its law is like moist, fit for eating.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  4,
  "ז",
  `For otherwise, salted fish: we hold in Yoreh De'ah siman 113, seif 12, that if a non-Jew cooked it, there is no concern of bishul akum, for it is eaten as it is, live — even though salted fish is not fit to be eaten alone without bread; and likewise vinegar and oil — we hold there is no concern of bishul akum even though live they are not fit alone; rather, anything eaten live — so it is; and likewise in Tur Choshen Mishpat, general rule 61, section 7; and likewise in the gloss at the end of Orach Chayim — and this is his language: even dry ginger and dry peppers that a non-Jew cooked are permitted.`,
);
patch(
  ma,
  "magen-avraham",
  2,
  "_",
  `Since its trunk is completely consumed. If so, the same applies to fruit called "brombeer" and red fruit called "erpherit" — one blesses borei peri haAdamah; and likewise in Berakhot, Maharil, and so is the practice (Bach). And the Agudah wrote that on "brombeer" and "erpherit" one should bless borei peri haEtz, for thus the branch endures many days and when one takes fruit it again comes from that same branch itself; end of his words — and such is the main matter. And likewise the rulings of Tosafot in Berakhot, chapter 6. And likewise those called in Poland "jagodas" — the black ones; but the red ones grow among grasses and one blesses borei peri haAdamah. And those red ones found in Tamuz — and there is also a type found in winter that has nothing but mere sap enclosed within the pits; they suck them out and discard them — it is appropriate to bless shehakol, as written siman 202, seif 8 and seif 15. And even though some swallow them with the peel and pit, nevertheless our eyes see that the peel and pit are not fit for eating at all; if so, one should bless only on the liquid inside.`,
);
patch(
  ma,
  "magen-avraham",
  4,
  "_",
  `Ilanei serak — shehakol. For they are not considered to bless upon them borei peri haEtz — they are merely trees; but something good to eat, like those I wrote above, is complete fruit — even though they grow on ilanei serak, as stated.`,
);
patch(
  ma,
  "magen-avraham",
  5,
  "_",
  `Rather shehakol — for they are not considered; it is like fruits that ornamental trees produce — siman 202, seif 6.`,
);
patch(
  ma,
  "magen-avraham",
  6,
  "_",
  `Ginger. It appears to me that the same applies when they roast ginger and eat it for medicinal purposes, or candied citron (etz citron) — one blesses borei peri haAdamah, since through this it is fit for eating; and it is possible that on etz citron one blesses shehakol, since it is made for taste and descends one level — siman 204, seif 61. And on peppers that they preserve, one blesses borei peri haAdamah, as written siman 202, seif 8. Bach wrote here that ginger that a non-Jew cooked in honey is forbidden on account of bishul akum — and likewise Rashi on Yoma, and likewise Hagaot Maimoniyot, chapter 25. And the ginger that they bring from fairs is made through pickling and is permitted in any case. But the view of the Tur and Tosafot implies it is permitted; and in the Gemara the difficulty stands regarding blessing, and he answers here when moist, here when dry — and likewise Terumat HaDeshen. But regarding bishul akum there is no distinction, for the dry too is eaten as it is, live, with bread and salt — for otherwise salted fish too would be forbidden on account of bishul akum; and likewise vinegar and oil, which are not eaten live alone; rather, anything eaten live — so it is; and likewise in Tur Choshen Mishpat, general rule 61, section 7; and likewise in the gloss at the end of Orach Chayim — and this is his language: even dry ginger and dry peppers that a non-Jew cooked are permitted.`,
);
patch(
  ma,
  "magen-avraham",
  8,
  "_",
  `Radish. Even though if one leaves it in the ground it will eventually harden, nevertheless since they sow it with intent to eat it when soft, one blesses borei peri haAdamah — unlike a gourd, as written siman 204.`,
);
patch(
  mech,
  "mechaber",
  1,
  "main",
  `The laws of blessings on fruits of the ground. And it has 8 seifim: On fruits of the ground one recites borei peri haAdamah.`,
);
patch(
  mech,
  "mechaber",
  2,
  "main",
  `On strawberries that grow in a bush one recites borei peri haAdamah: {Rama: for it is not called a tree except regarding what it produces from its trunk; but what it produces from its roots is not called a tree. And these, since their trunks are completely consumed in winter and again blossom from their roots, one blesses upon them borei peri haAdamah. [Tur and Mordechai in the name of responsa of the Geonim.]}`,
);
patch(mech, "mechaber", 3, "main", `On bananas one recites borei peri haAdamah.`);
patch(
  mech,
  "mechaber",
  4,
  "main",
  `On fruits that ornamental trees (ilanei serak) produce — shehakol.`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 203 part 2 of 3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-203-part2of3.json");
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
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
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
