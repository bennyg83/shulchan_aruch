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

const mhs = "output/siman_208/machatzit-hashekel/part-001.txt";
const ma = "output/siman_208/magen-avraham/part-001.txt";

patch(
  mhs,
  "machatzit-hashekel",
  15,
  "י",
  `<b>And furthermore regarding hallah, etc.</b> Meaning that for hallah necessarily the reason that it does not combine is because it was there — for we have before us the entire hallah measure from a grain species, and therefore one who is exempt from hallah when there is less than a kezayit per person — necessarily it is nullified and is as one who does not exist at all, and if so the HaMotzi also was not fit to bless on it in such a case.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "כ",
  `<b>And one could say regarding blessings, etc.</b> Meaning that certainly for Birkat HaMazon, which is from the Torah, it has the law of hallah, and whatever is called bread for hallah is the same for Birkat HaMazon — but HaMotzi and one blessing me'ein shalosh, which are d'rabbanan (for us, but some hold they are d'oraisa as written in Tur siman 209) — they said and they said that even if there is not a kezayit per person, nevertheless due to the importance of the five species one blesses HaMotzi and after it me'ein shalosh — but for Birkat HaMazon, no, for it is d'oraisa and its law is like hallah.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  15,
  "ל",
  `<b>And however, if he did not mix, etc.</b> With other species he blesses Birkat HaMazon, etc. And in Lechem Chamudot chapter 48 siman katan 19 he wrote, after he brought the words of the RaDa in the name of R' Yosef Rav as written here in Shulchan Aruch, and this is his language: and even though his words there are said regarding mixing with another flour of millet and the like — it appears to me that he speaks specifically of mixing with flour, but he spoke in the usual manner and the same applies to everything where he mixed the five species and they are the essence — end of his words Lechem Chamudot. And I did not understand — for the Rosh writes there: therefore all whose essence (meaning to exclude something that sticks) is from the five species, even if the majority is from another species, they bless on it HaMotzi and at the end one blessing me'ein shalosh — and these are the words of the Gemara, and it is the law mentioned in seif 2, as the Magen Avraham hinted here — and if so it must be that he mentions flour specifically — Abudraham, and as Magen Avraham writes — but I do not know a reason to distinguish between flour and other things.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  16,
  "א",
  `<b>(siman katan 16) In one blessing me'ein shalosh, the text, etc.</b> In truth it resembles the four blessings of Birkat HaMazon — for "al hamichyah" is like the blessing HaZan; "al eretz chemdah" is like birkat ha'aretz; "rachem Hashem aleinu," etc., and "al Yerushalayim," etc., is like Boneh Yerushalayim; "Ki ata Hashem tov u'metiv" is like birkat hatov vehameitiv. But they called it me'ein shalosh since the blessing hatov vehameitiv is d'rabbanan — they showed the essence of Birkat HaMazon, which is d'oraisa, and there are only three blessings — so Tur.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  16,
  "ב",
  `<b>And he concludes on the land and on the fruits (Bach).</b> Meaning that even though in Shulchan Aruch he did not decide whether to conclude on the vine and on the fruit of the vine or only on the fruits — but the Bach forced to conclude on the land and on the fruits, because such is the opinion of most poskim. But the custom, etc., and so too the Taz that it is correct — for if he concludes on the vine and on the fruit of the vine, all agree he has fulfilled, unlike when he concludes on the land and on the fruits, there is a dispute regarding shalosh — end of his words.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  17,
  "_",
  `<b>(siman katan 17) He does not conclude, and b'dieved, etc.</b> In Tosafot daf 44a s.v. "al ha'etz," etc., and this is their language: some conclude on the land and on the fruits, and some conclude on the vine and on the fruit of the vine; however, at first glance it seems one need not change the conclusion, for we only change saying "peri hagefen" instead of "peri ha'etz." But when we do not bless on the tree except in general on the land and on the fruits — for wine too one need not change — end of Tosafot. Behold they wrote that at first glance it seems one need not change, etc. — meaning there is no obligation to conclude on the vine and on the fruit of the vine, but it suffices in general if he says on the land and on the fruits. Nevertheless Tosafot agree that if he said on the vine and on the fruit of the vine he has fulfilled, and possibly it is preferable. And possibly Tosafot's intent in what they write "and some conclude on the vine and on the fruit of the vine" — they also agree one must mention on the land, as Tur writes that the land always stands and in all conclusions one must mention on the land — but they add "on the vine and on the fruit of the vine," meaning to specify the vine, and it is not enough to conclude generically on the fruits. And on this Tosafot wrote one need not change to specify the fruit of the vine, and it suffices when he says generically on the fruits — but certainly for all one must mention on the land; or possibly they hold it suffices when he says on the vine and on the fruit of the vine and need not mention the land, for it suffices in what he mentions on the tree from which the fruit came, namely the vine, and it substitutes for mentioning the land from which the vine came — but we do not find their colleagues among the poskim who do not mention the land in the conclusion.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  18,
  "_",
  `<b>(siman katan 18) Me'ein, etc.</b> See in Tur — meaning that the Beit Yosef brought many poskim that in this time one should not mention mention of the event; if so we hold like the poskim who mention mention of the event — l'chatchila — but b'dieved we rely on the poskim who need not mention mention of the event; but for Chanukah and Purim, for all one need not mention mention of the event, as written in Shulchan Aruch. And the reason — Levush wrote — since miracles are thanksgiving, it is fit to mention them in thanksgiving — that is, in prayer in Modim "v'al kulam," and in Birkat HaMazon "v'al hakol," where thanks is mentioned — unlike one blessing me'ein shalosh, which has no thanksgiving that it is fit to adjoin thanks for miracles except in "v'noda lecha al ha'aretz," etc., and there it is not fit to interrupt so there would be a mention of the event adjacent to the conclusion — and Lechem Chamudot chapter 48 siman katan 135 wrote on him that it is forced. And Lechem Chamudot wrote the reason — since we do not find to mention mention of the event except in Yerushalmi, and there Chanukah and Purim were not mentioned — possibly the reason, since they were not mentioned in the Torah as of now.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "א",
  `<b>(siman katan 2) That they boiled them, etc.</b> And possibly here, etc., until it was crushed — meaning that he removed their shells, and thereby possibly they get crushed and stick — as written afterward.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "ב",
  `<b>And this is the language of Tur, etc.</b> Meaning that also from Tur's words it implies that when crushed and stuck the matter depends.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "ג",
  `<b>But if he cooked, etc.</b> Meaning that he did not remove the shell — for if he removes their shells, even if they are whole, it is possible they get crushed and stick. And it must be said that both at the beginning and at the end he mentions the definitive word, and mentions in barley that was crushed, etc. — for then the way of the word is that they were crushed; and at the end whole wheat, meaning their shells were not removed — so then it is impossible they would stick; and when they are whole and their shells were removed, sometimes they get crushed and stick through much boiling, and sometimes they do not stick.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "ד",
  `<b>And what Tur writes "and it becomes like chavitz kadara."</b> Rashi daf 36b s.v. chavitz kadara: a type of thick food like milk that was curdled in the stomach — so they make thick food in a pot, and below he explains flour, honey, and oil — end of his words. And the word chavitz is joining and adhesion, as explained in Bava Metzia daf 99b — one who stole chavitza of dates, and Rashi: dates stuck together is called chavitza.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "ה",
  `<b>But in the Gemara it does not teach "harifot," etc.</b> Meaning there is no proof from the Gemara — nevertheless the law is a true law, and as seems from Rambam there is no distinction between crushed or whole except when crushed and stuck the matter depends — except that for crushed ones the way of the word is they were crushed, as above. And what the Taz writes siman katan 11 — groats made from barley as crushed, etc. — it is obvious one blesses Borei Minei Mezonot, etc. — if we say he agrees with Magen Avraham why he mentions crushed — because then certainly they were crushed and stuck, and the same for whole ones whose shells were removed, if they were crushed and stuck, one blesses HaMotzi and after it me'ein shalosh.`,
);
patch(mhs, "machatzit-hashekel", 2, "ו", `<b>And specifically, etc.</b> As Tosafot daf 37a end s.v. hakoses, etc.`);
patch(mhs, "machatzit-hashekel", 2, "ז", `(siman katan 3)`);
patch(
  mhs,
  "machatzit-hashekel",
  2,
  "ח",
  `<b>And "ulgma'o" — meaning to eat it — and see seif 6.</b> Meaning that even though generally the term gmi'ah means drinking, but here necessarily gmi'ah means eating — and that is when it is thick — for if he means drinking, meaning it is soft, there would be a difficulty, for it is explained in seif 6 that in such a case one blesses shehakol.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  5,
  "_",
  `<b>(siman katan 5) Whole ones, etc.</b> Unlike rice, where the way is to cook it whole — and meaning as Magen Avraham in seif 6 siman katan 10, that the Beit Yosef holds that for rice, even if not crushed, one blesses HaMotzi — but here for wheat we require specifically crushed and stuck; therefore wheat whose shells were not removed, that do not get crushed and do not stick — one blesses shehakol, for rice is different, etc., and as Magen Avraham in the name of the Beit Yosef in siman katan 10 — but according to what Rama holds in seif 6, that for rice too we require that it be crushed — if so the law of rice and wheat is equal — if so there is no place for the words of Machatzit HaShekel.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  6,
  "_",
  `<b>(siman katan 6) And Tosafot, etc.</b> That there was no need for 'aluy, etc. — this distinction is said in Shas daf 36a — first blessing of shevet zayin, that on fruits one blesses borei peri ha'etz and on flour the first blessing is shehakol — and similarly we say for the after-blessing, as Magen Avraham wrote.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  7,
  "א",
  `<b>(siman katan 7) Within, etc.</b> As the opinion of the Beit Yosef — meaning since Shulchan Aruch wrote l'chatchila, unstated, to bless after it Borei Nefashot, and afterward wrote and Tosafot were uncertain, etc. — this is the Beit Yosef's way, that one opinion is primary in his eyes.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  7,
  "ב",
  `<b>And it is possible the water is not nullified, etc.</b> Meaning that even though it is simple in seif 2 regarding the five species, if mixed with another, even if those other things are the majority, nevertheless one blesses HaMotzi — nevertheless, since his main intent is on the water, the water is not nullified vis-a-vis the five species. Nevertheless the kernel is not nullified — meaning that even though his main intent is on the water, and why the water is not nullified vis-a-vis the kernel even though they are of the five species — nevertheless the importance of the five species helps that at least the kernel is not nullified vis-a-vis water, and therefore he should bless on the water and on the kernel HaMotzi. Nevertheless, since it is not clear to Magen Avraham that the water is not nullified vis-a-vis the kernel, Magen Avraham wrote above siman 204 siman katan 6 that he should bless first on the water shehakol and then on the kernel.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  7,
  "ג",
  `<b>What Shulchan Aruch writes in siman 204 — flour, even of wheat.</b> Meaning not of barley, which is susceptible to worms, as Magen Avraham siman 204 siman katan 8 — certainly he does not bless except shehakol; but even of wheat, which are not harmed, nevertheless he does not bless except shehakol — and meaning finely ground that is not fit for eating — but even if ground a bit, etc., that is fit for eating; and similarly roasted grain flour fit for eating — nevertheless he does not bless except shehakol.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  8,
  "א",
  `<b>(siman katan 8) For eating and to chew, etc.</b> And as explained in the Gemara daf 38a — patita (meaning flour that was boiled with water or liquids) — Rav said shehakol and Shmuel said HaMotzi, and Rav Chananiel, and they do not argue — this [case], thick, they bless HaMotzi, and this thin they bless shehakol; and plain thick implies even if not fit to chew — and necessarily what "this thin" means is fit for drinking; and even though he said plain thin, one could say he relied on what he first said, "this thick," plain — and necessarily meaning even if impossible to chew, only that it is thick — therefore "this thin" means fit for drinking. Unlike the reverse — when he said plain thin, meaning even if not fit for drinking, only not fit to chew — and necessarily "this thick" means fit to chew; and even though he said plain thick, he relied on "this thin," plain — more reasonable that he relied on what is written at the end on what is first said, than the reverse, that he relied on what is written first on what he will say afterward at the end.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  8,
  "ב",
  `<b>And as explained Rashi regarding chavitz, etc.</b> I brought his language above in siman katan 2, and the word kafui that Rashi wrote does not imply so thick that one needs to chew it.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  9,
  "א",
  `<b>(siman katan 9) The rice — it should read: one should not eat them except within the meal, as it should read.</b> And the word "when crushed" is therefore a printing error — and so too the Bach, that in all cases one should not eat them except within the meal, as explained — and the Taz brought in his name, for also without being crushed there is doubt for us who do not know what is rice or millet — for per Magen Avraham in siman katan 10, on rice, even if not crushed, one blesses HaMotzi, and on millet borei peri ha'adamah; and per the Bach, who brought Magen Avraham siman katan 10 without doubt that millet is in rice — if not crushed itself, there is doubt whether to bless HaMotzi.`,
);
patch(
  mhs,
  "machatzit-hashekel",
  9,
  "ב",
  `<b>And in Lechem Chamudot he wrote our types, etc.</b> And Shelah writes siman regarding this — and so Maharam Schik — path hadarah; the word hadarah is an acronym: "this year" — millet; "rice" — is.`,
);
patch(
  ma,
  "magen-avraham",
  10,
  "_",
  `<b>In one blessing me'ein shalosh.</b> The text of the blessing: Baruch Atah Hashem Elokeinu Melech haOlam, al haMichya ve'al haKalcha ve'al tnuvat hasadeh ve'al eretz chemdah tovah u'rechavah sheratzita vehinchalta laAvoteinu le'echol mipriyah v'lisbua mituvah, rachem Hashem Elokeinu aleinu ve'al Yisrael amekha ve'al Yerushalayim irekha ve'al Tzion mishkan kevodekha ve'al mizbechakha ve'al heichalekha, u'vneh Yerushalayim ir haKodesh bimheirah beyameinu, vehe'elinu letokha v'samachnu bah, Ki Atah Hashem tov u'metiv laKol, v'noda lekha al haAretz ve'al haMichya, Baruch Atah Hashem al haAretz ve'al haMichya ve'al haKalcha. And on fruits he says al haEtz ve'al peri haEtz ve'al tnuvat hasadeh ve'al eretz, etc. And on wine al haGefen ve'al peri haGefen ve'al tnuvat hasadeh ve'al eretz, and concludes on the land and on the fruits — Bach. But the custom is to conclude on the land and on the fruit of the vine, and so too Beit Yosef in the name of Rashba that thus the people act; and in chutz la'aretz adjacent to Eretz Yisrael one need not change the coin of the blessing from doubt lest the fruits be from Eretz Yisrael — and we are not concerned for this — Bach, Tur, unlike what the Beit Yosef wrote.`,
);
patch(
  ma,
  "magen-avraham",
  11,
  "_",
  `<b>He does not conclude.</b> And b'dieved he has fulfilled, as explained in Tosafot daf 44.`,
);
patch(
  ma,
  "magen-avraham",
  12,
  "א",
  `<b>Mention of the event.</b> One says v'samachnu bah, ratzah v'hachalitzanu beyom haShabbat hazeh; and on Yom Tov he says v'zachreinu letovah beyom chag peloni hazeh; and likewise on Rosh Chodesh. And if he did not mention it, he has fulfilled — see in Tur, see siman 188.`,
);
patch(
  ma,
  "magen-avraham",
  12,
  "ב",
  `<b>On the land, etc.</b> And it is not concluding in two, for the land brings out all of them.`,
);

const PATCH_COUNT = 28;
console.log(`ok siman 208 part4of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part4of11.json",
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
