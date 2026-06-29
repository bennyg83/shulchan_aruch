#!/usr/bin/env node
/** Generate baer-hetev, beit-shmuel, beur-hagra data files from blocks JSON. */
import fs from "fs";

const blocks = JSON.parse(fs.readFileSync(new URL("./_siman-007-blocks.json", import.meta.url), "utf8"));

const GRA_OVERRIDES = {
  "1#ב": `Or relative, etc. And minor, etc. — Ran already wondered; nevertheless from sugya there 40 minor trusted even when not examined as written there testimony, etc. child, etc. when not examined — else even son, etc. as stated; likewise wrote even relative and did not distinguish all fit even unexamined; there taught son and daughter only when examined; also wrote incident, etc. similar because minor — does not imply so — said one person and 40 adult — rather because was his son; meaning: some say their method woman slave and maidservant even his and all relatives except son daughter fit even unexamined; likewise minor male and female; but son daughter slave maidservant only examined; she and husband not trusted even examined; Ramban relied on Yerushalmi as his custom: even minor Rav Ami in name R' Yehoshua ben Levi even minor even relative even minor and relative — we inform her from this Chananya Karsutya was captive he and sons and daughters came to R' Chiyya not accepted to R' Yehoshua ben Levi accepted; holds this incident Gemara said came before R' Yehoshua ben Levi and minor like Yerushalmi — therefore needed examination; but relative no distinction as there general for all relatives mutually; Rambam generalized; Chelkat Mechokek and Beit Shmuel very strained — need not respond.`,
  "10#ו": `And eighteen, etc. Version Rav Mari in Avodah Zarah there brought only Rav Mari's version; so Rif wrote two mishnayot stam; Rambam explains like Rashi s.v. R' Yitzchak — he also has Rav Mari variant only asks to divide here; likewise Tosefta s.v. Hanal; can resolve, etc. as stated; likewise Rambam chapter 12 forbidden foods and Shulchan Aruch YD 129:12; implied Yerushalmi divides like R' Yitzchak without mishnah contradicting each other — Ran; Ramban did not want this because language here and there difficult for him.`,
  "11#ב": `And specifically, etc. As Avodah Zarah there and here same reason; as Tosefta there s.v. teda wonder, etc.; can say, etc.; there s.v. vetu; examine, etc.; meaning if they seized, etc. as stated in hagahah; all this imprisoned, etc.; though per first answer permitted seized — all posekim last version; per Maggid Mishneh and Maharik; as Gemara; nothing more — clear matter.`,
  "11#ה": `And specifically, etc. Like Chizkiyah there Rav's student is Ritva Rosh Ran per Rashi s.v. hani nashi — sitting because of husbands though women's judgment not finished; if so imprisoned because of themselves Chizkiyah admits; Rambam stam through life danger — explained women sit because of themselves knowing husbands' deed; explains like R' Yochanan; meaning and specifically, etc.; in this I agree to you even per posekim like Chizkiyah per Rashi; but, etc.; all for Israelite husband; for kehunah all forbid as not worse than not through money; meaning and one says, etc.; and specifically, etc.`,
  "11#ס": `And all this, etc. As Tosefta Avodah Zarah there s.v. teda, etc.; examine, etc.; Rosh in name R' Elchanan, etc.; as stated; as wrote woman not forbidden, etc.; even in gentile hands; as Yerushalmi passed and secluded; R' Yirmiyah we inform from this woman imprisoned by gentiles; R' Yosei woman accustomed to scream apply yourself if she was deaf accustomed to hint; though Gemara there does not hold so because imprisoned by them cannot scream unlike this case.`,
  "12#ב": `Such as kohen, etc. And Kohen Gadol, etc. Yevamot 61 written widow, etc. and written, etc.; Kiddushin there 2: prostitute why stated, etc.; Rashi there 78a s.v. Kohen Gadol in widow, etc.; in Torat Kohanim parashat Emor explains further: say widow teaches widow he shall not profane divorcee he shall not profane, etc.; prostitute from where — might think only Kohen Gadol makes seed from all blemishes from him profane — ordinary kohen whence? Teach prostitute — prostitute for exposition: as prostitute stated in Kohen Gadol makes seed from all blemishes from him profane — so prostitute stated regarding ordinary kohen makes seed from all blemishes from him profane.`,
  "12#ג": `Or married, etc. Like R' Elazar ben Azaryah Yevamot there established there like him; specifically cohabited — betrothal alone not so implied Rambam there and Kiddushin 78a like Rava; husband alone suffices as stated; see Rashi there beginner betrothed and s.v. Rava admits, etc.; cohabitation specifically also married as Rambam wrote; Maggid Mishneh reason from Yevamot there shall not marry and if married, etc. chalal; in my view if cohabitation alone — from shall not profane as there — would be chalal; Tosafot challenged Yevamot 60 s.v. chalal; though per Rambam cohabitation with single woman from negative command not kehunah prohibitions and zona not made though prohibition equal for all — we do not rule like R' Eliezer as siman 30:8.`,
  "12#ט": `But, etc. But, etc. Yevamot 66b they became widows, etc.`,
  "14#ב": `And if returned and cohabited, etc. Meaning another kohen not forbidden relation to him or he such as with sister-in-law; likewise yevamah leshuk — we rule child not mamzer as Yevamot 92a; his words doubtful since made zona child blemished for kehunah even if Israelite as stated second version all admit though R' Yehoshua, etc. likewise there 15b what fears, etc.; Rashi there s.v. she herself and above regarding relatives, etc. likewise chalalah per several opinions made zona; likewise yevamah leshuk — main law yevamah leshuk made zona too doubtful — there 40 not made zona therefore child fit as Rashi s.v. hanal; can say does not rule like this sugya — also returning divorcee profanes yet child fit from Kiddushin and later Niddah and other places she is abomination and son not abomination; if say verse unnecessary — refuted a fortiori; from it we derive all zona child fit; cannot say so — Yevamot there second version and she fit, etc.; there 69a and imagine cohabited, etc.; I would say omitted 15b for conclusion — child returning divorcee what? meaning if sons of rival wives unfit child returning divorcee what? who says; but yevamah leshuk also profaned — plain even rival sons fit — do not derive a fortiori at all; cannot say so — what fears, etc.; likewise second version who all admit R' Yochanan, etc.; Gemara Kiddushin — therefore kohen, etc. specifically themselves not seed; see above siman 6:8; main law per all posekim not made zona except those kiddushin do not take — all sugyot prove; also yevamah leshuk as stated 15b — therefore never made chalalah even second cohabitation; therefore Kiddushin says kohen cohabited with sister; many places specifically relatives; even first child blemished for kehunah even from Israelite — so Taz gentile and slave from a fortiori as stated 45a all amoraim, etc. a fortiori, etc.; however Rambam's words correct — follows his method explains chapter 15 gentile and slave with Israelite daughter child fit; from his words fully fit; Rif doubted after all give and take concludes halakhah gentile, etc. and did not conclude child blemished; Rambam z"l doubted and wrote from Rav Yehuda go whisper, etc.; Rava or reveal, etc.; if so where give advice lest kohen marry daughter; Rav Yosef Rabbi is, etc.; R' Yehoshua ben Levi said child corrupted, etc. — all Rav Yosef's words — Rabbi child mamzer; R' Yehoshua ben Levi child blemished; Abaye what saw, etc. teach leniency — even for kehunah; Rav, etc.; all teach leniency even for kehunah; entire sugya; since says halakhah, etc. fit stam — can say even for kehunah; Bekhorot 47 one opinion do not make ugly, etc.; Rashi there; nevertheless Rambam explains to validate even for kehunah; Maggid Mishneh chapter 13 halakhah 5 already challenged; answer distinction convert couple presumed among Israelites; Ra'avad perforce must say so — if child blemished for kehunah no difference — per R' Yehuda even full convert daughter unfit Kiddushin 77a; Rambam wrote married Israelite; also wrote I converted; Ramban challenged — Gemara no question except I converted; not trusted on wife to say gentile to disqualify son as stated; not trusted on adult son because son's son — likewise for mother; no need for all — distinction even full convert presumed Israelite — then daughter fit for kehunah and disqualifies daughter for Ra'avad all the more R' Yehuda; meaning presumed proper Israelite — says I converted between himself and himself to disqualify himself; for sons even converted in court likewise distinction all placements and married Israelite distinction two doubts and chalitzah return to sugya per Rambam child fit even for kehunah — if so even where kiddushin not take and made zona child fit — no a fortiori; all sugyot disqualifying child hold gentile and slave with Israelite daughter child blemished like R' Yehoshua ben Levi — we do not rule so; yevamah leshuk disqualified for kehunah explains R' Yochanan ben Nuri — perforce made zona from disqualifying child; here does not hold like him child blemished as above even relatives fit; returning divorcee from Rambam words profaned — all chalal equal for all; laws of terumot R' Yehoshua ben Levi does not hold what said there 69a to strange man, etc.; Ramban there; main law as Rosh child unfit for kehunah as siman 4:5 and 9 and this siman 17; what wrote stam halakhah, etc. — Rosh already rejected; Ramban strained sugya — none validate; Bekhorot Tosafot s.v. do not say, etc. — Ravina validated here; 78a and end Kiddushin 66:2 though not mamzer, etc.; after established law there said that one called him son of Aramean, etc.; Tosafot Sotah 41b s.v. that day, etc. — wondrous matter; Perishah, etc.; Ramban refuted them — except Absalom and Rehoboam prove; except Tosefta Sanhedrin chapter 4 do not appoint king unless married to kehunah — meaning if daughter would be fit for kehunah — proves child unfit; Tosafot Yevamot 46b s.v. since, etc.; though Tosefta, etc.; Ramban wrote Torah prohibition from your brethren the choicest — now unnecessary all strains in baraita; Bekhorot 47 distinction for kehunah and R' Yochanan distinction mamzer as Tosafot s.v. ne'eman; can say holds, etc.; established halakhah there halakhah like him, etc. — distinction for us for kehunah; Ramban likewise; what wrote yevamah leshuk disqualified like R' Yochanan ben Nuri — all sugyot do not prove; all posekim dispute; all the more per we rule child blemished distinction made zona — all sugyot prove child not blemished from relatives; yevamah leshuk never made chalalah even second cohabitation.`,
};

const BSH_OVERRIDES = {
  "11#א": `Lest they lose from their purse. So Ri in name R' Yonatan; so Rashi Avodah Zarah 23; there Tosafot and Rosh two answers why if secluded permitted — first answer wrote we rule like Ravina who said bedi'eved not concerned perhaps cohabited; what through money permitted to husband is not because monetary loss but always bedi'eved permitted unless life danger concern; through money in mishnah excludes through life danger; Rosh wrote therefore likewise if they seized her to ransom with money also permitted — bedi'eved permitted whenever not life danger; appears plain aliba diRavina no distinction between strong Israelite hand and strong gentile hand — either way permitted though their hand strong can extract money even if they act and cohabit — nevertheless bedi'eved not concerned cohabited — for him not because monetary loss; like law buying animals from gentiles — not concerned breeding bedi'eved; there monetary loss inapplicable — likewise permitted; mishnah in Ashkelon permitted only through witnesses — therefore Horehna is different as Rashi Ketubot wrote since time arrived not redeemed — behold gentile property by their law — therefore need witnesses; proves aliba diRavina no distinction strong gentile hand from strong Israelite hand; if so Rosh and other posekim Ketubot Rav's law distinguishing strong Israelite hand from strong gentile hand — learn we do not rule like Ravina but like conclusion there Avodah Zarah and second answer Tosafot and Rosh — concerned for loss specifically when seized to give money — forbidden to husband; therefore Rama ruled like Ri and not concerned what Rosh wrote aliba diRavina; not like Chelkat Mechokek who wondered how Rama did not heed Rosh; see Maharik siman 165 brought all posekim distinguishing seclusion from imprisonment through money — brought no posekim bedi'eved permitted except certainly main as stated; Ri who brought distinction strong Israelite from strong gentile hand nevertheless wrote initially when seized to give money is because of money not Ravina's establishment — likewise from reasoning initially seemed even in such case there is loss. What wrote in these laws permitted even for kehunah — even single woman; so Beit Yosef.`,
};

function expandAbbr(h) {
  return h
    .replace(/<b>/g, "").replace(/<\/b>/g, "")
    .replace(/ב"ש/g, "Beit Shmuel")
    .replace(/ב"י/g, "Beit Yosef")
    .replace(/ב"ח/g, "Bach")
    .replace(/ב"ד/g, "bet din")
    .replace(/ח"מ/g, "Choshen Mishpat")
    .replace(/ח"ר/g, "Chiddushei Rabbi")
    .replace(/הג"מ/g, "Hagahot Maimonides")
    .replace(/הגהות מיי'/g, "Hagahot Maimonides")
    .replace(/כ"מ/g, "Maggid Mishneh")
    .replace(/מל"ת/g, "mesich lefi tumo")
    .replace(/מסל"ת/g, "mesich lefi tumo")
    .replace(/ע"י ממון/g, "through money")
    .replace(/ע"י נפשות/g, "through danger to life")
    .replace(/ע"א/g, "one witness")
    .replace(/ע"פ/g, "from the mouth of")
    .replace(/פ"(\d)/g, "chapter $1")
    .replace(/דכ"(\d+)/g, "22")
    .replace(/ד"ה/g, "s.v.")
    .replace(/כמ"ש/g, "as stated")
    .replace(/כ"כ/g, "so too")
    .replace(/ועיין/g, "and see")
    .replace(/ע"ש/g, "see there")
    .replace(/לע"ד/g, "in my view")
    .replace(/קי"ל/g, "we hold")
    .replace(/ס"ל/g, "holds")
    .replace(/ה"ט/g, "this is the reason")
    .replace(/ה"נ/g, "here")
    .replace(/ה"א/g, "if so")
    .replace(/צ"ע/g, "uncertain")
    .replace(/כו'/g, "etc.")
    .replace(/שבויה/g, "captive")
    .replace(/לכהן/g, "to kohen")
    .replace(/לכהונה/g, "for kehunah")
    .replace(/נטמאה/g, "she was defiled")
    .replace(/טהורה/g, "pure")
    .replace(/א"י/g, "Israelite")
    .replace(/א"א/g, "forbidden relative")
    .replace(/כותי/g, "Kuti")
    .replace(/עכו"ם/g, "idolater")
    .replace(/חלל/g, "chalal")
    .replace(/חללה/g, "chalalah")
    .replace(/יבמה לשוק/g, "yevamah leshuk")
    .replace(/גרושה/g, "divorcee")
    .replace(/זונה/g, "zona")
    .replace(/ספק/g, "safek")
    .replace(/ממזר/g, "mamzer")
    .replace(/תרומה/g, "terumah")
    .replace(/מכת מרדות/g, "makat mardut")
    .replace(/לכתחילה/g, "ab initio")
    .replace(/בדיעבד/g, "bedi'eved")
    .replace(/ר"ל/g, "meaning")
    .replace(/י"ל/g, "one may say")
    .replace(/מ"מ/g, "nevertheless")
    .replace(/אע"ג/g, "even though")
    .replace(/אע"פ/g, "even if")
    .replace(/דוקא/g, "specifically")
    .replace(/היינו/g, "meaning")
    .replace(/משום/g, "because")
    .replace(/פירוש/g, "explanation")
    .replace(/הקשה/g, "challenged")
    .replace(/תשובת/g, "responsum")
    .replace(/תוס'/g, "Tosafot")
    .replace(/גמ'/g, "Gemara")
    .replace(/משנה/g, "mishnah")
    .replace(/ברייתא/g, "baraita")
    .replace(/סוגי'/g, "sugya")
    .replace(/פלוגתא/g, "dispute")
    .replace(/הלכתא/g, "halakhah")
    .replace(/אליבא/g, "aliba")
    .replace(/כנ"ל/g, "as above")
    .replace(/\s+/g, " ")
    .trim();
}

function translateFromHe(he, overrides, key) {
  if (overrides[key]) return overrides[key];
  const t = expandAbbr(he);
  if (!t || t.length < 8) return t || "See source.";
  return t.charAt(0).toUpperCase() + t.slice(1) + (t.endsWith(".") ? "" : ".");
}

function writeDataFile(name, slug, overrides) {
  const T = {};
  for (const b of blocks[slug]) {
    T[b.key] = translateFromHe(b.he, overrides, b.key);
  }
  const out = `/** EH001 siman 007 — ${slug} (${blocks[slug].length} blocks). */\nexport const T = ${JSON.stringify(T, null, 2)};\n`;
  fs.writeFileSync(new URL(`./_siman-007-data-${name}.mjs`, import.meta.url), out);
  console.log(`wrote ${name}: ${Object.keys(T).length} blocks`);
}

writeDataFile("baer-hetev", "baer-hetev", {});
writeDataFile("beit-shmuel", "beit-shmuel", BSH_OVERRIDES);
writeDataFile("beur-hagra", "beur-hagra", GRA_OVERRIDES);
