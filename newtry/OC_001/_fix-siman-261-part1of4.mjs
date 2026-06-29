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

const az = "output/siman_261/ateret-zekenim/part-001.txt";
const bh = "output/siman_261/baer-heitev/part-001.txt";
const bhg = "output/siman_261/beer-hagolah/part-001.txt";
const gra = "output/siman_261/beur-hagra/part-001.txt";
const bhc = "output/siman_261/biur-halacha/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `And likewise to tell him to do for him, etc. — that is, even for the need of clothing to wear on that same Shabbat, and likewise for a great need and substantial loss it is permitted in every matter. And likewise if he forgot to kindle a yarzeit candle while it was still day, it is permitted to tell a non-Jew during bein hashemashos to kindle it (Maharshal siman 46):`,
);
patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `And if he wishes to advance, etc. And if plag hamincha is calculated — that is, an hour and a fifth of an hour before night — it would be only a little before sunset, and Maharar"m"I already noted this in siman 267; therefore one should be stringent and make Shabbat two hours before night (Bach per the view of R' Eliezer of Metz):`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>Bein hashemashos.</b> And if he is in doubt whether it is bein hashemashos, it is forbidden. Bach:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>And we do not immerse.</b> And if he needs it for Shabbat and has no other vessel, he may immerse during bein hashemashos; however, there is another permission to give it to a non-Jew as a gift or through a stratagem, such as drawing water in order to drink from it. Taz; and see Yoreh De'ah siman 120 seif 7:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `<b>Shabbat.</b> And likewise anything that involves substantial loss, even though there is no Shabbat need — and for the need of a mitzvah as well it is permitted to tell a non-Jew to do work during bein hashemashos. And likewise it is permitted to tell a non-Jew during bein hashemashos to kindle a yarzeit candle, since the world is careful about it we consider it a great need, for there is no distinction between a great need and substantial loss. Rashal; and see Magen Avraham; and see siman 242:`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ד",
  `<b>The candle.</b> Even not in a place of mitzvah, since the day is still great:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `<b>On the holy.</b> And it is a positive Torah commandment:`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `<b>960 cubits.</b> And this is like a quarter of an hour before tzeit hakochavim; and most poskim wrote that two hours before night one must add, which is one twelfth — similar to Shevi'it, for tosefet applies per the view that a day is one twelfth of the mishnah day. Darkei Moshe in the name of Maharam; and so wrote Bach; see Or Torah and Magen Avraham:`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "א",
  `<b>Eiruvin.</b> Even for a matter of mitzvah; and likewise it is forbidden to enter a bathhouse even to sweat — Berachot daf 27. See Kenesset HaGedolah and in responsum Chakham Tzvi siman 11:`,
);
patch(
  bh,
  "baer-heitev",
  4,
  "ב",
  `<b>Shabbat.</b> In these countries they are not accustomed to recite the psalm [Mizmor Shir l'Yom HaShabbat], and therefore answering Barchu is acceptance of Shabbat per Darkei Moshe; and so in siman 263 seif 10. And now they are accustomed to recite the psalm, yet nevertheless they do not accept Shabbat and perform all labors until Barchu, for originally they accepted upon themselves thus. Bach; Magen Avraham:`,
);

patch(bhg, "beer-hagolah", 1, "א", `Shabbat 34.`);
patch(bhg, "beer-hagolah", 1, "ב", `Rif; see there.`);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ג",
  `Rambam in ch. 4 of Hilchot Shabbat; Tur brought it, and Rabbeinu Yonah siman 242.`,
);
patch(
  bhg,
  "beer-hagolah",
  2,
  "א",
  `Rif, Rosh, Ran, and Maggid in ch. 5 in the name of Ramban from this in Yoma ch. 1.`,
);
patch(bhg, "beer-hagolah", 2, "ב", `Maggid there.`);
patch(
  bhg,
  "beer-hagolah",
  2,
  "ג",
  `Shabbat 34, like Rabbi Yehudah, as Rava explains it.`,
);
patch(bhg, "beer-hagolah", 3, "_", `There 35.`);
patch(bhg, "beer-hagolah", 4, "א", `Mordekhai.`);
patch(bhg, "beer-hagolah", 4, "ב", `Beit Yosef.`);

patch(gra, "beur-hagra", 1, "א", `<b>Seif 1, and he.</b> There 2:`);
patch(gra, "beur-hagra", 1, "ב", `<b>That is.</b> There as Rabbah:`);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And the measure.</b> Pesachim 94a; and see siman 259 seif 2 and below:`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ד",
  `<b>And we do not establish eiruvin.</b> Gemara Shabbat there:`,
);
patch(gra, "beur-hagra", 1, "ה", `<b>Eiruv techumim.</b> There:`);
patch(
  gra,
  "beur-hagra",
  1,
  "ו",
  `<b>And it is permitted to tell, etc., and likewise.</b> See there Rashi s.v. safek chashicha; but Rambam holds it applies even like Rabbi, and Rabbi only said it in such a case; and proof that we do not find Rabbi's words except regarding eiruv; and see siman 215 seif 1 — whether... or because...:`,
);
patch(gra, "beur-hagra", 1, "ז", `<b>And likewise one who accepted.</b> Magen Avraham:`);

patch(
  gra,
  "beur-hagra",
  2,
  "א",
  `<b>Seif 2 — there are those who say one must [add].</b> So it is written in the wording "there are those who say" — for Rambam did not write tosefet except regarding affliction on Yom Kippur, but regarding rest [on Shabbat] he wrote no tosefet; and see in Hilchot Shevitat Asor ch. 1, and his reason is from what they say in Yerushalmi at the beginning of Shevi'it: R' Gamliel and the court permitted [work during] the prohibition of the first two perakim. R' Yochanan asked: is it not thus taught — a court cannot annul the words of a fellow court until etc. R' Acha in the name of R' Yonatan: when they forbade [work] for reading [Torah publicly] they relied [on a pasuk], and when they permitted reading they relied — when they forbade reading they relied on "in plowing and in harvest you shall rest" etc.; and when they permitted reading they relied on "six days you shall work and you shall do all your labor" — just as on erev Shabbat of creation you are permitted to do work until the sun sets, so too on erev Shabbatot of years you are permitted to do work until the sun sets; and likewise in the Gemara at the beginning of Mo'ed Katan 4a. And R' Yochanan said etc.; and even though they challenged this there regarding it, nevertheless regarding Shabbat he did not retract; and likewise it is implied in the second chapter of Shabbat, where it says: when darkness [has fallen] there is no doubt of dusk — no; and if so, behold tosefet Shabbat precedes; and Tosafot in the first chapter of Rosh Hashanah 9a were strained because tosefet needs no measure; and Rosh already wrote in ch. 4 of Berachot siman 6 that there must be a measure from what is written in the third perek of Shabbat 48b regarding tosefet Yom Kippur etc. Therefore they do not allow them to eat when dusk [falls] lest they touch a karet prohibition, for there too we only say tosefet specifically; and such is the essence, and likewise is the conclusion of Tosafot there that tosefet is not needed except on Yom Kippur like Rambam — and such is what Beit Hillel [meant when they] permit with the sun; and we learned in ch. 2 of Shabbat 34a: when there is doubt of dusk we do not tithe etc.; but certainly there is a mitzvah to add, and this is what the trumpet blasts were for:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `<b>And this time of tosefet is from the beginning of, etc.</b> Meaning there are two settings, as Tosafot wrote in Shabbat 35a s.v. trei from this in Pesachim 94a; and likewise as their words in Berachot 2b and the explanation of Tosafot there:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ג",
  `<b>That the sun [is not visible].</b> For before then it is impossible, as written above 17b in the mishnah; and all this is strained per the view cited above that requires tosefet — but the mishnah decides like Rambam and Tosafot that it is not needed, as written above:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ד",
  `<b>Until the time.</b> For afterward as well it is impossible, for otherwise it is forbidden:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ה",
  `<b>That it is three [mil].</b> From Pesachim as above in the cited Tosafot. And all this is per the view of the cited Tosafot; but it does not hold [for Rambam], for if so from plag hamincha until sunrise would equal from sunset until tzeit hakochavim — and in truth it is not so as written above, and the senses contradict every observer that plag hamincha is a measure very much greater than tzeit after sunset; and in countries that lean toward the north, plag begins in summer at midnight — if so there is no tzeit at all in summer, but rather bein hashemashos begins immediately from the beginning of sunset until the lower mantle [of darkness], and this is three-quarters of a mil on the horizon in Babylon at the time of the tekufah of Nisan and Tishrei, and at the beginning of sunset is complete bein hashemashos — and as mentioned, "when the sun sets" means at the beginning of sunset; and likewise regarding a fast — any fast on which the sun did not set etc.; and at the beginning of sunset one may immediately eat, for we hold his doubt is permitted; and see Mordekhai in the first chapter of Ta'anit — except that they are accustomed to wait for tzeit because we are in doubt whether the halachah follows R' Yehuda or R' Yossi, as written above — halachah follows R' Yehuda regarding etc.; and the measure of bein hashemashos of R' Yossi is after the mantle [covers], as written there that bein hashemashos of R' Yossi is completed; and therefore one must act on a fast according to R' Yossi, as written above, and halachah follows R' Yossi regarding terumah; and even though we are lenient on a fast that his doubt is permitted, we do not combine two leniencies to act also like R' Yehuda; and see Rosh end of ch. 3 of Shabbat siman 23; and regarding a fast, even though his words are astounding, certainly one must practice on a fast according to R' Yossi since halachah was decided like R' Yossi stringently; but regarding Shabbat it is as above; and likewise regarding Chanukah, also from the beginning of sunset — and so in Ran and Rashba there by Chanukah, unlike the words of Tosafot; and see Ran there; and such is what is written in Shabbat there — one who wishes to know the measure of R' Nechemiah should place the sun etc. — thus bein hashemashos is immediately when the sun sets; and within the time of its rising is night — the measure of its rising from the sea is half a mil; and Tosafot there and Rashba were greatly distressed on the Gemara there, see there, for he strained greatly. And the difficulty of Tosafot there from Pesachim 94a appears not difficult at all, for certainly the setting of stars and their rising are equal, and likewise the coming of light and its departure are equal — therefore in countries that lean [north] the light does not come at all in summer, but stars stand; but tzeit of Pesachim means all the stars, for not all stars are seen until it is night when the light is completely purified on account of the smallness of the stars — similar to what it says there from plag until neitz, for while it is still day stars still stand a long time, and until the sun shines is four mil; so too from sunset until tzeit means likewise that all stars have come out, for such is the measure of the thickness of the firmament discussed in the sugya of Pesachim there; and such is what it says in Shabbat there — not small stars that are not visible except at night, meaning after the coming of light, when then all the small stars are also visible as above; but tzeit of stars that we say everywhere that it is night is in three stars alone and medium ones, as written in Shabbat — and this is a distinction between two [types], and they are visible like the upper mantle and equal to the lower; and because great expertise is required herein to know three stars alone that are medium, as Tosafot wrote, therefore they gave the measure in the mantle etc.; and likewise Abbaye who was an expert etc. And with this is resolved their last difficulty as well, what they challenged — and further they challenged: let us see ourselves etc. — and it does not hold as above; and aside from this there is no difficulty, for this measure of four mil is not at every time and every place, for it changes at every time and season; and also what they answered there — that it is doubtful for them — is astounding, for it is already estimated in Pesachim there; but according to what I said everything is satisfactory; and therefore the measure from sunset until night is only three-quarters of a mil, and even though in our country it is more, it is as above on account of change of horizons and change of season, and the time of four mil and of three-quarters of a mil — all on their horizon in Eretz Yisrael and Babylon, but here it is longer; and likewise the time on the equinox days during the tekufah of Nisan and Tishrei when everything is equal. And with this is resolved that Rambam and Avudraham are not contradicted, that the measure of neshef is twenty degrees — the measure of an hour and a third — while per the Gemara it is an hour and a half; and likewise there the words of the Gemara are contradicted by the senses, for otherwise there would be no night for four months in our country; but the measure of Rambam and Avudraham is on the equator and the words of the Gemara on their horizon. And according to what I wrote, bein hashemashos begins immediately at sunset — and this is bein hashemashos between the coming of the sun and the beginning of the coming of light, which is at the mantle, when then its light ceases reddening; and likewise blood is invalidated at sunset, and likewise one may not pray Minchah then; and such is what curses one who prays with the reddening of the sun — while according to Tosafot the day is still great; and likewise then Shabbat begins; and such is what Beit Hillel permit with the sun; and Tosafot Shabbat 35 — as Tosafot wrote in the first chapter of Rosh Hashanah and in the cited Yerushalmi, and likewise in Sefer Yere'im, and Mordekhai brought in the second chapter of Shabbat, and wrote that "when the sun sets" there means the beginning of sunset; and likewise regarding Chanukah — the language "when it sets" is a time before sunset, as written in the chapter HaPo'alim from when they cease until they cease is asked — and with this is satisfactory what is written: when the palm darkens at the top of the palm tree etc. — in a city one sees a rooster; and for Rabbenu Tam it is before the time of accepting Shabbat — except that his view there is that bein hashemashos is before the beginning of sunset when it tilts slightly and people recognize that it wishes to enter the sky; and all the time of three-quarters of a mil is before sunset — and his words are not plausible to say the lower and upper mantle are all before sunset; and Abbaye who was an expert etc.; and likewise we learned Beit Hillel permit with the sun. And further it appears there that three stars, which is night, is a walk of five mil after sunset per Rabbeinu Tam, see there siman 61 — and his words also do not seem plausible here, for if so the measure of three stars is exceedingly far from the measure of the upper mantle, and we say there halachah follows R' Yossi to be stringent, and his bein hashemashos is immediately after bein hashemashos of R' Yehuda, and even the measure of immersion is not between them, as Tosafot wrote there; whereas here R' Yossi [says] one star day, etc., three night — as above; and likewise in Mordekhai ch. 4 of Berachot siman 78 from Rav Hai Gaon that after sunset one may pray Maariv etc., see there — and therefore everything is satisfactory. But still there is doubt according to what I wrote above that halachah follows R' Yossi regarding a fast — if so Tosafot's difficulty there s.v. except regarding eating is difficult, on account of a slight measure etc. — certainly it is a great difficulty, and their answer is very strained, for they explicitly say there that bein hashemashos of R' Yossi is completed and then begins etc. — it implies they knew that immediately it begins; and likewise Rosh strained in the answer to the cited Tosafot — and it is a great strain; but after investigation it appears to me the essence is not to depart from it, for a mistake fell into the books, and it must be said: priests do not eat terumah until bein hashemashos of R' Yehuda is completed — for in bein hashemashos one may immediately eat terumah, as written "the sun came and was purified" — but rather there are three settings: one the beginning of sunset, which is bein hashemashos for R' Yehuda; the second the end when the sun reddens and is mantled, when then the sparks of the sun are extinguished — and this is bein hashemashos of R' Yossi immediately after bein hashemashos of R' Yehuda; and this is tzeit, as Shmuel said one star day, two etc. — all according to R' Yossi; and proof that R' Yossi rose there [saying] not like stars etc.; and behold stars rise one after another immediately — and such is "in the blink of an eye"; and above Shmuel said three-quarters of a mil according to R' Yehuda, and here according to R' Yossi; and this that the Gemara established his words here after it said halachah follows R' Yossi; and what is written at the beginning of Berachot we do not eat until tzeit — that is according to R' Yossi; and what was asked there — the coming of his sun or the coming of his light: the coming of his light is from the third sunset of Pesachim, which is four mil after sunset when then light comes completely, as I wrote above; and such is what they say: they entangled the sun and immediately etc. — meaning immediately at erev shemesh; and for R' Yossi erev shemesh — wherever at tzeit are sparks reddening the east; but for R' Yehuda immediately when the sun sets; and with this is resolved Tosafot's difficulty in Shabbat there 35b s.v. the Rabbi questioned Porat etc. — and their answer is very strained, and according to what I wrote it is satisfactory; and likewise regarding a fast, as written at the beginning of Berachot — this "the sun came" is the coming of his sun etc.; Tosafot strained there to say the coming of his light is before the coming of his sun — and this is very astounding; but according to what I said it is satisfactory — the coming of his light is at the emergence of all stars, and the coming of his sun is at three stars; and R' Yossi holds that at three stars is sunset when then it has set well; and Tosafot strained as above for their view. And what is written there "and then they restored etc." — perhaps because it says a sign for the matter, and if with all the stars one cannot give a sign in them:`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ו",
  `<b>And if.</b> Berachot 21; and see there Tosafot s.v. deRav:`,
);
patch(
  gra,
  "beur-hagra",
  4,
  "_",
  `<b>Seif 4, after.</b> Tosefta last chapter of Sukkah: even though the kettle is in his hand, Barchu is acceptance of Shabbat. Berachot there; Rosh end of ch. 2 of Shabbat:`,
);

patch(
  bhc,
  "biur-halacha",
  1,
  "א",
  `<b>Bein hashemashos</b> — and see Mishna Berurah sk 1; and it is not a safek safeka, for doubt due to lack of knowledge does not enter the category of safek at all [and even regarding tithes which are d'rabbanan, and all the more so regarding kindling, so wrote Peri Megadim]; unlike bein hashemashos, which is a doubt for the entire world [acharonim]; and it further appears to me that therefore it is not a safek, for it is one name — doubt of day, doubt of night:`,
);

const PATCH_COUNT = 34;
console.log(`ok siman 261 part 1 of 4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-261-part1of4.json",
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
