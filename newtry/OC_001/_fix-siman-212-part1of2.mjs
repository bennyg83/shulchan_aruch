import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  biurHalacha1a,
  biurHalacha1b,
  chokhmatShlomo1,
  eliyahRabbah2,
} from "./pipeline/work/_siman-212-p1-long-en.mjs";

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

const az = "output/siman_212/ateret-zekenim/part-001.txt";
const bh = "output/siman_212/baer-heitev/part-001.txt";
const bhg = "output/siman_212/beer-hagolah/part-001.txt";
const gra = "output/siman_212/beur-hagra/part-001.txt";
const bhc = "output/siman_212/biur-halacha/part-001.txt";
const cs = "output/siman_212/chokhmat-shlomo/part-001.txt";
const er = "output/siman_212/eliyah-rabbah/part-001.txt";
const kh = "output/siman_212/kaf-hachayyim/part-001.txt";
const mh = "output/siman_212/machatzit-hashekel/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `For example, one who wants to drink, etc. But if he drinks first and afterward eats bread to sweeten the drink — he need not bless on the bread and need not wash his hands (responsum of Rama siman 1); and some say he washes without a blessing (Emek Berachah and Ohr Torah).`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>That it is primary.</b> And whatever is the majority is primary; and whatever has from the five species — we follow after them, provided there is substantial quantity in them; but if they mixed it in water until it is soft, he blesses shehakol — see siman 208 seif 6 and see end of siman 204. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>So that it does not harm him.</b> But one who eats herring with bread — the bread is primary and the herring comes as relish for the bread — Taz, see his words. One who eats bread to sweeten the drink blesses on the beverage and exempts the bread if his mind was explicitly on it or his custom is usually to eat bread in the middle of drinking — it is as if his mind was on it; otherwise he must bless — Magen Avraham, Shelah, and likewise Taz sk 1. One should refrain from eating bread during drinking, for who can distinguish whether he eats it to fill his stomach — then he must bless HaMotzi — or he eats it to sweeten the drink? And when he eats it to sweeten the drink he washes hands without a blessing — Shelah; and Magen Avraham wrote in the name of Rama's responsum and in the name of Mateh Moshe in the name of Rashal that washing is not required.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `<b>Secondary to something else.</b> It appears to me specifically here, where it is secondary to drinking other beverages and would be fit to bless shehakol on the beverage and exempt this — but because he eats the secondary first he blesses on it; therefore he blesses on it as the blessing of the primary. But when the primary's blessing is something else, he does not bless shehakol on it. And in Terumat HaDeshen he understood that even if one wants to drink wine he blesses shehakol on the pits, since they are secondary and lost their own blessing, and blesses shehakol and afterward blesses on the wine borei peri haGefen — and it requires study from where this is; therefore it appears to me one should not rely on this ruling — Magen Avraham. And see Taz.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `<b>Crackers.</b> Above siman 168 seif 8 I wrote that specifically if he eats the crackers with the spread; but if he ate the spread from above and left the crackers and eats them by themselves — they require their proper blessing, for then he has made them primary as well.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `<b>Bread.</b> Only that they come to attach the spread to them so the hands are not soiled with honey. Magen Avraham wrote: but in these countries they place the spread on honey cakes that are fit for food — if so, his intent is also for eating the honey cakes and he blesses on them.`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 44`);
patch(bhg, "beer-hagolah", 1, "ב", `Rosh there`);
patch(bhg, "beer-hagolah", 1, "ג", `In the mishnah there`);
patch(bhg, "beer-hagolah", 2, "_", `Kolbo — see there.`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `<b>Seif 1, between, etc.</b> A fortiori from things that come because of the meal — Magen Avraham 2; and see Tosafot there s.v. Halachta, etc.; and it appears if so, etc.; therefore Ri explained, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ב",
  `<b>Not needless to say, etc.</b> As written: all that has from the five species, etc.; and this salad, etc.; and likewise if he eats both together as in the mishnah here, and as written in the gloss "behold," etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>Rather even each, etc.</b> There 1 on radish and olive, and as written in things that come, etc.; and they say: if he blessed on bread he exempts, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ד",
  `<b>And even bread, etc.</b> See Tosafot there s.v. Mevareich, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ה",
  `<b>And some say, etc.</b> It requires study — for if so, what does he challenge there: Ri has no such view, etc.; behold since dear first, all the more so species of the seven which is preferable to dear for Ri — only it should have said "behold their blessings are not equal"; and likewise there, and missing text, etc., in what case, etc., s.v. Mevareich, etc.; and per Tosafot and Ri's explanation s.v. Mevareich — meaning dear is preferable; from this, at the outset dear does not help; and also behold in siman 211 seif 5 in the gloss on HaMotzi, etc., and even though, etc.; and here Shulchan Aruch wrote "and even bread," etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ו",
  `<b>Behold, etc.</b> As written at the beginning of chapter 6 that it is forbidden to benefit without a blessing:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ז",
  `<b>First.</b> And he said salted fish first, and likewise in Tosefet Yom Tov — except that afterward he rejected that the mishnah speaks even though they do not eat together; and this is per Tosafot s.v. Be'oclei, etc., and the bread after him, etc.; but Ri writes they eat it with the bread, and likewise in Tur, and eats bread with him in order, etc.:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ח",
  `<b>But if, etc., only, etc.</b> Wondrous; and Magen Avraham also disagrees on this — and see Taz.`,
);
patch(gra, "beur-hagra", 2, "_", `<b>Seif 2, spread, etc.</b> As above, and like to attach.`);

patch(bhc, "biur-halacha", 1, "א", biurHalacha1a);
patch(bhc, "biur-halacha", 1, "ב", biurHalacha1b);
patch(cs, "chokhmat-shlomo", 1, "_", chokhmatShlomo1);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>The primary is mixed and whatever is the majority is primary.</b> And whatever has from the five species — we follow after them, provided there is substantial quantity in them; but if they mixed it in water until it is soft, he blesses shehakol — Magen Avraham; and see above siman 208.`,
);
patch(er, "eliyah-rabbah", 2, "_", eliyahRabbah2);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] Whatever is primary, etc. — and whatever is the majority is primary, as written siman 208 seif 10; and whatever has from the five species — we follow after them, as written there seif 2, provided there is substantial quantity in them; but if they mixed it in water until it is soft, he blesses shehakol, as written there seif 6 — Magen Avraham sk 1. Ohr LeTzion letter 1. Chayei Adam general 56 letter 1; and see above siman 204 letter 60.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "א",
  `(2) There — he blesses on the primary and exempts the secondary — it implies that specifically if his mind at the time of the blessing was to eat the secondary and he intended to exempt it; but if at the time of blessing he thought he would not need it and afterward needed it — he must bless. Maamar Mordekhai letter 1. Chayei Adam letter 4; and see below letter 6. And likewise if he blessed on the secondary first and did not intend to exempt the primary — he must return and bless on the primary if their blessings are not equal; but if their blessings are equal he need not return and bless, as long as some of the secondary remains before him, as written above siman 211 letter 24 — see there. And see Mishnat Hashem letter 1 — think well.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "ב",
  `(2) There — between the blessing after it. And if he ate the primary less than the required quantity and the secondary he ate the required quantity — if he must bless the concluding blessing, see in responsum Meshivat Nefesh siman 5, who concludes that bread joins to the fish and it is as eating from the fish the required quantity, and he blesses borei nafashot — see there. And see above siman 210 letter 3.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "_",
  `(sk 1) The primary, etc., and all that has from the five species, etc. — even if the five species are few and the thing mixed with them is the majority — nevertheless we follow the five species; and specifically when the five species came to give taste; but if they were not placed there except to stick and to attach — the five species are nullified in the thing mixed with them.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "א",
  `(sk 2) For example, such as one eats, etc. — it is difficult. Magen Avraham came to settle why the Mechaber needed to write in which matter do we find that bread is secondary; and therefore it is difficult in any case, etc.:`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ב",
  `And if he is hungry — for him bread is primary; and the reason: per the order of the world they eat salted fish, namely herring, with bread — bread is primary and he blesses HaMotzi and exempts the salted fish; and likewise Taz sk 2.`,
);
patch(mh, "machatzit-hashekel", 2, "ג", `And see in the gloss what he wrote in this sk 7.`);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ד",
  `<b>And you will bless on sweet fruits.</b> Meaning: as he wrote above that he ate something sweet, etc. — meaning sweet fruits; and this is the language of the Gemara daf 44a: we learned — they brought before him salted food first and bread with it; he blesses on the salted food and exempts the bread; this is the rule: whatever is primary, etc.; and he challenges: is there anything where bread is secondary to it? And they answer: R' Eliezer taught regarding one who eats fruits of Ginosar — they are very sweet; and Tosafot explained as Magen Avraham wrote; and therefore it was difficult to them that he should bless on the fruits which are primary for all that follows.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ה",
  `<b>Or alternatively, etc.</b> In that session (Tosafot) — meaning he changed his place: after eating the fruits he went to another place and there eats salted fish with bread. And therefore in such a case, even if he intended when he blessed on the fruits to exempt the fish and bread — nevertheless, since he changed his place, he must bless again, as above siman 178; and what he wrote not like Nitzachon and Bach will be explained later.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ו",
  `<b>It implies from their words that if he knew, etc.</b> For in explanation 1 they wrote: at the time, etc., the salted fish and bread were not yet there, for he did not know, etc. — it implies he did not intend to exempt the fish and bread since he did not know his heart would weaken and he would need fish and bread; but if he knew and also intended for them, they are exempted even though they wrote that salted fish and bread were not yet there — nevertheless it does not depend whether they were before him or not, only whether he intended for them. And that Tosafot wrote that salted fish was not yet there, etc. — they mentioned the usual way, since he did not know he would need them — presumably he does not prepare them for that purpose; but everything depends on whether he knew his heart would weaken and intended for them or not. And likewise explanation 2 discusses that they were not before him, only that he knew his heart would weaken and his mind was on the fish and bread — and were it not that he changed his place, they would have been exempted by the blessing on the fruits.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ז",
  `And likewise siman 206 seif 5, where Rama wrote: and it is good l'chatchila that his mind be, etc. — it implies that in any case his mind helps even for what is not before him; and per the Mechaber there, also from an unspecified case his mind is on all they will bring him.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ח",
  `<b>And this is Bach's language: and explanation 1, etc.</b> For Bach explains explanation 2 — that he did not eat the fruits in that session, meaning: in truth his mind at the time he blessed on the fruits was also on the fish and bread; but since they were not brought before him in that session when the fruits were before him, but only after he finished eating the fruits fish and bread were brought before him — therefore he must bless on them. And for explanation 1 it discusses that they were brought before him while he was still engaged in eating the fruits, but he had already blessed on the fruits before they were brought before him; and even so, if his mind was on them at the time of blessing they would have been exempted by the blessing on the fruits — only that explanation 1 discusses that he did not intend to exempt them, and therefore Bach concludes: specifically when they were brought before him while the fruits were still before him, even if they were not there at the time of blessing — then what his mind was on at the time of blessing to exempt them helps; but if they were not brought until after he ate the fruits — his mind at the time of blessing does not help. And he proved from what Bach wrote in siman 177; but Magen Avraham wrote before this that his mind on them helps in every case, even if they were not brought until after he finished eating the fruits; also what he wrote to explain Ri — it appears, etc., that the Talmud in one who eats fruits of Ginosar — and this is his language: that the fruits of Ginosar are very sweet and are not eaten except with much salt so the sweetness not harm him, and they eat them with bread — and bread is found secondary to the fruits; therefore he blesses on the fruits and exempts the bread — end of his words; and Bach holds that Ri explains that the answer remained in the challenger's view that there is nothing where bread is secondary except fruits of Ginosar which are very important relative to them — bread is secondary if he will need afterward to eat salted fish with bread; but relative to salted fish, bread is not secondary.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ט",
  `Therefore they wrote that he blesses on the fruits and exempts the fish and also the bread; and that which the mishnah teaches "he blesses on the salted item" — meaning he blesses on the thing brought on its account, the salted item — namely on the fruits; and so it appears from Rashi there. And he wrote: therefore one should be careful to bring before him fish and bread (namely per his method above that they must be before him) at the time of eating fruits and intend to exempt them by the blessing on the fruits; but if they are not exempted by the blessing on the fruits — whether salted fish exempts bread, this law is in dispute between Tosafot and Ri as above. But Magen Avraham holds that for the law there is no dispute between Tosafot and Ri; Ri also agrees that even if he blesses on salted fish he exempts bread which is secondary relative to fish in such a case where he ate sweet fruits first — only Ri settles Tosafot's difficulty above that he should bless on the fruits, etc.; and for this Ri wrote that in truth such is the mishnah's intent and it does not discuss at all one who eats salted fish, only that he salts the fruits themselves and eats bread with them — then he blesses on the salted item, namely the salted fruits, and exempts the bread.`,
);

const PATCH_COUNT = 37;
console.log(`ok siman 212 part1of2 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-212-part1of2.json",
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
