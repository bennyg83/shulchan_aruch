#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`eliyah-rabbah:1:_`, `[1] [Levush] so that it not be, etc. — at the start of siman 308 he wrote more reasons; see there.`],
  [`eliyah-rabbah:2:_`, `[2] [Levush] it is written "if you turn back," etc. — so Tur wrote; requires study, for Shabbat 113a derives from "your ways" that your walking on Shabbat should not be, etc.`],
  [
    `eliyah-rabbah:3:_`,
    `[3] And forbidden to step, etc. — one should ask: we say in the Gemara there that coarse stepping is forbidden even on weekdays; see there; and I omitted Chiddushei Aggadot there: on weekdays it is only danger, for it removes one of five hundred from the light of one's eyes; but on Shabbat there is also prohibition. Further there it appears to me possible what the Gemara concludes and returns in Kiddushin of Bei Shimsha: Rabbi answered R' Yishmael, or the Gemara says: on weekdays there is remedy which is not so on Shabbat, prohibition remains. In Tosafot Taanit 10b they explained coarse stepping removes only the first step, henceforth since he tramples; therefore challenges: if so what did R' Yishmael answer Rabbi on Shabbat 113, and on weekdays was it permitted? Perhaps Rabbi's question where he already trampled. More than an amah, etc. — meaning half an amah between foot and foot, and the foot is also half an amah; Agudah wrote he should not uproot second foot before placing first; so Raavan siman 340.`],
  [`eliyah-rabbah:4:_`, `[4] More than an amah, etc. — meaning half an amah between foot and foot, and the foot is also half an amah; Agudah wrote he should not uproot second foot before placing first; so Raavan siman 340.`],
  [`eliyah-rabbah:5:_`, `[5] Those who take pleasure, etc. — meaning youths playing together (Agudah); specifically b'dieved who are accustomed thus, but l'chatchila one should not accustom them (Bach); on Simchat Torah permitted to dance; likewise wedding joy honoring bridegroom and bride — Gemara chapter 5 Beitzah.`],
  [`eliyah-rabbah:6:_`, `[6] And likewise to see, etc. — meaning to run to see.`],
  [
    `eliyah-rabbah:7:_`,
    `[7] [Levush] but not to exercise, etc. — meaning healing as below siman 332; Baal HaHalachot Gedolot siman 328 seif 42; not like Taz. Levush implies even walking not running, if intent to exercise forbidden; Magen Avraham: all who do not run permitted; Levush from Tosefta chapter 7 there: animal that ate much fruit they walk it, etc., implies person forbidden; so Rama.`],
  [
    `eliyah-rabbah:8:_`,
    `[8] And forbidden to pass through, etc. — even when impossible to go around; what he wrote lest come to squeezing — do not say therefore forbidden, for his washing is permitted; Tosafot Shabbat 111a answered we do not say thus except where filth on garment; also say we do not say "this is his washing" in something whose soiling is not visible; but I found Yereim page 39 and Piskei Rekanati siman 113 answered here deals with leather garments, requires study; see siman 302 seif 9.`,
  ],
  [
    `eliyah-rabbah:9:_`,
    `[9] May pass through, etc. — even though possible to go around; see siman 613 seif 8; what he wrote provided he makes change, etc., for Rashi he brought there is no need; appears he holds like Tosafot there: in mitzvah place they did not decree squeezing; so Sefer HaTerumot siman 244 and Semak; see Rosh start chapter Yom Kippur.`,
  ],
  [`eliyah-rabbah:10:_`, `[10] So it not be a stumbling block, etc. — difficult why we do not consider Ulla explicitly three things they permitted the end because of the beginning, chapter 1 Beitzah 11a (Taz).`],
  [
    `eliyah-rabbah:11:_`,
    `[11] [Levush] and liable for taking it out, etc. — know wherever it says "liable," intentional kares, unintentional chatas — forgot Shabbat or knew Shabbat but not this melacha forbidden; melacha without intent, such as forgot item and went to reshut ha-rabbim, exempt.`,
  ],
  [`eliyah-rabbah:12:_`, `[12] With sword, etc. — even girded at waist liable, for thus is way of carrying out (Hagahot); [Be'er HaGolah] "in these" is metal stick with thick head; siman 471 of wood or iron.`],
  [
    `eliyah-rabbah:13:_`,
    `[13] [Levush] iron hat, etc. — so Beit Yosef explained, requires study, for Rashi explained leather hat under metal hat; so Maggid chapter 19 laws Shabbat and Semak; again saw in Rambam Mishnah commentary and Bartenura like Beit Yosef in book Tanya: copper, iron, or wooden hat, requires study.`,
  ],
  [`eliyah-rabbah:14:_`, `[14] Anfilas, etc. — Bartenura language: iron greaves; Rambam Mishnah commentary wrote iron clothing.`],
  [`eliyah-rabbah:15:_`, `[15] [Levush] in any case l'chatchila, etc. — appears like going to war (Mordechai and Ran); Levush's words need forcing for this intent.`],
  [`eliyah-rabbah:16:_`, `[16] In shoe, etc. — Olat Tamid wondered he omitted woman may not go out in torn shoe, etc.; one should ask he omitted siman 303 seif 13.`],
  [
    `eliyah-rabbah:17:_`,
    `[17] That has no wound, etc. — I found Yerushalmi proves halacha like Rav Huna; therefore God-fearing should not go out in both singly (Levush Yom Tov); so Bach ruled; main principle I found Yereim page 48: Sages did not decide halacha according to anyone, therefore forbidden in both.`,
  ],
  [`eliyah-rabbah:18:_`, `[18] [Levush] only to take out in hand, etc. — implies in hand all agree liable, man and woman, pierced and unpierced; so Magen Avraham wrote.`],
  [
    `eliyah-rabbah:19:_`,
    `[19] And some say opposite, etc. — see Nachalat Tzvi and Acharonim who expanded; I shortened, for they dispute which needle was way of carrying out in Gemara times; now everything per time: if custom carry thus on weekdays and not ornament, liable; if not their way of carrying out, exempt but forbidden; if most of world do not carry thus, even if people of one place do, exempt, for their opinion batel to everyone.`,
  ],
  [`eliyah-rabbah:20:_`, `[20] And if he went out liable, etc. — nowadays exempt, called ornament — Beit Yosef; see siman 303 seif 18.`],
  [`eliyah-rabbah:21:_`, `[21] Engraved, etc. — if written for healing, law like amulet (Beit Yosef).`],
  [
    `eliyah-rabbah:22:_`,
    `[22] Form, etc. — protruding or sunken (Beit Yosef); Magen Avraham wrote he omitted what he wrote Yoreh Deah siman 141 seif 1 protruding even on weekdays forbidden to leave; not so, there deals specifically complete human form; face alone or body alone permitted; animal beast and bird forms entirely permitted see there.`,
  ],
  [`eliyah-rabbah:23:_`, `[23] [Levush] and deals when fixed, etc. — Taz note 10 omitted this; requires study.`],
  [`eliyah-rabbah:24:_`, `[24] [Levush] it becomes ornament, etc. — see siman 303 seif 18.`],
  [
    `eliyah-rabbah:25:_`,
    `[25] And some permit, etc. — specifically fixed at end called clasp; middle of belt forbidden; strap fixed on belt forbidden at end even if cannot remove on Shabbat; so Bach; appears practice as permissive; so Shiltei Gibborim 125 and 173.`,
  ],
  [`eliyah-rabbah:26:_`, `[26] [Levush] in any case since most times, etc. — above seif 8 thought deals when customary stick in garment on weekdays for intervals; see Magen Avraham; requires study.`],
  [
    `eliyah-rabbah:27:_`,
    `[27] [Levush] but for woman, etc. — Maharil wrote reason for custom to permit: since for poor considered clothing, also for wealthy permitted; see siman 303 seif 18 (Levush Yom Tov); Magen Avraham: deals when wraps as clothing; placed on head without wrapping forbidden; if intent rain not distress her, permitted every case even saved from filth, like seif 14 blood not hurt her; Shiltei Gibborim 128: same when for shade; so Beit Yosef end this siman; Shiltei Gibborim 173 end 2b; Tashbetz siman 48 requires both sudar ends tied tight lest wind carry on scarf; if covers most of body permitted — Taz.`,
  ],
  [`eliyah-rabbah:28:_`, `[28] Zav may not go out, etc. — therefore forbidden tie cloth to hat brim to wipe eyes (Shiltei Gibborim there).`],
  [
    `eliyah-rabbah:29:_`,
    `[29] [Levush] and if he went out exempt, etc. — Shulchan Aruch omitted; Olat Shabbat wrote nowadays no difference between chatas liability and exempt; he did not distinguish seif 4 and 8 where Shulchan Aruch wrote exempt, and many places; truly great difference nowadays between d'oraisa and rabbinic; also below end siman 334 practical difference melacha not needed for body if can extinguish coal where many harmed, Shulchan Aruch wrote dispute melacha not needed, did not decide; seems therefore did not write here "if went out exempt" because undecided, unlike Levush who decided siman 278 like R' Shimon exempt melacha not for body, therefore wrote here if went out exempt; Olat Shabbat who expanded melacha not for body omitted Shulchan Aruch end 334; somewhat difficult what he wrote siman 316 seif 4; also ask below siman 303 seif 18 Shulchan Aruch and Levush distinguish if forbidden in our karmelis; Olat Shabbat appears nevertheless practical difference extinguishing candle for sick without danger permitted l'chatchila per those who exempt melacha not for body; ask Gemara Shabbat 30a R' Shimon exempt but l'chatchila may not extinguish sick without danger; Tur and Levush siman 278 ruled so though ruled R' Shimon there.`,
  ],
  [`eliyah-rabbah:30:_`, `[30] Apron front and behind — Ezra's enactment; only behind and tied with straps in front not clothing, forbidden (Mordechai and Gemara).`],
  [
    `eliyah-rabbah:31:_`,
    `[31] If she ties it, etc. — appears he mentioned tying since now as below siman 303 seif 15 even without tying kosher; for Olat Tamid I omitted there; Magen Avraham wrote he mentioned tying: without tying does not hold since hangs in front; therefore explained chapter "With what may woman go out" permitted even without tying, deals with fluff in that place.`,
  ],
  [
    `eliyah-rabbah:32:_`,
    `[32] [Levush] they are burdens, etc. — so Beit Yosef in name Rashi and Rabbenu Yerucham; Levush Yom Tov wondered he did not bring Tosafot 85a disputing Rashi from arranged Gemara Yoma: reason lest slip and carry four amot reshut ha-rabbim, if so only d'rabbanan; I add Ran there and in his book, Hagahot Asheri, Rashba responsum siman 407; Semag: since wood and straw cannot tighten around feet, slips and comes to carry; great wonder on Beit Yosef who wrote Gemara in name Semag like Rashi; also appears Rashi did not explain thus only to dismiss Yoma 8a, but conclusion agrees; also Rashi explained only not ornament, can explain also Semag cannot tighten like ornament.`,
  ],
  [`eliyah-rabbah:33:_`, `[33] [Levush] however if anklimin, etc. — Shulchan Aruch omitted, appears included seif 16 pantofles as Rashba responsum implies.`],
  [`eliyah-rabbah:34:_`, `[34] Of leather in length, etc. — appears same law for wood as above (Levush Yom Tov).`],
  [
    `eliyah-rabbah:35:_`,
    `[35] And in pantofles, etc. — since leather cover tight and does not slip (Rashba); Rama concluded some stringent; Taz agreed lenient since no custom walk barefoot reshut ha-rabbim, will not come to carry; possibly Levush omitted for this reason; all agree if forgot and went out reshut ha-rabbim need not remove, walk home; same all forbidden lest come to carry; so Agur siman 428; Rabbenu Yerucham wrote bast sandal permitted all, since shepherds go out in it.`,
  ],
  [
    `eliyah-rabbah:36:_`,
    `[36] Only to support himself, etc. — like elder (Levush Yom Tov); if so old cannot walk without cane permitted (Rashdam); Taz wrote if walks where fear fall, rain, slope, or winter on ice called "eis," permitted cane to walk there, not conclusive; Magen Avraham wrote important people who walk with cane in hand forbidden Shabbat except where eruv; cannot say ornament, we do not find permission carry ornament in hand; even R' Eliezer who holds ornaments for him only said no chatas, still prohibition; Tosafot 62b carrying ornament in hand forbidden l'chatchila maris ayin; Raavan siman 349; I say R' Eliezer no proof, perhaps deals girded on thigh not hand, so Lechem Mishnah chapter "With what woman"; no proof from there to forbid, say sword and bow in hand not ornament unlike cane ornament in hand, thereby refutes Magen Avraham from key see there; Tosafot no proof, deals sick carrying amulet in hand, maris ayin they say ornament here without sick, not so cane no ornament in hand and important person known; I looked Raavan, not proof; difficult Tosafot challenged tied in song lest slip, song proves ornament, not amulet in hand his way for sick; Tosafot perhaps did not decide for halacha, only challenged source for sugya answer; nowadays all reshut ha-rabbim karmelis as below siman 303 seif 8 see note 87; Magen Avraham ordinary man not carrying for honor even with eruv forbidden degradation Shabbat siman 522; Bach and Taz in name Maharshal Yom Tov permitted even without eruv, no degradation except reshut ha-rabbim and karmelis; Tur wrote man many need him permitted sit on chair carried Shabbat provided each not place hand on friend's shoulder, chair on their arms; below Yom Tov laws siman 522 concluded if fears walk without shoulder permitted via another's shoulder; did not write here, possibly Shabbat stricter, Shulchan Aruch and Levush omitted all Tur's words, possibly stricter Shabbat even without shoulder; Magen Avraham Tur permits only with eruv, so Perishah; requires study.`,
  ],
  [`eliyah-rabbah:37:_`, `[37] [Levush] they are burdens, etc. — not so, Rambam chapter 19 wrote if went out exempt.`],
  [`eliyah-rabbah:38:_`, `[38] [Levush] and sometimes, etc. — Olat Tamid stringent without rain forbidden.`],
  [`eliyah-rabbah:39:_`, `[39] Forbidden wrap thread, etc. — even on sponge thread or ointment important, not batel to sponge unlike rag wrapping thrown away batel to sponge — Magen Avraham note 2; what wrote "he may not return them" see siman 328 seif 25.`],
  [`eliyah-rabbah:40:_`, `[40] [Levush] also children, etc. — not so Ran wrote, but Rabbenu Tam and Rambam above seif 9 worry lest mock and remove; Tosafot brought even small children forbidden.`],
  [`eliyah-rabbah:41:_`, `[41] [Levush] certainly, etc. — appears similar end siman 304 slave's seal (Levush Yom Tov).`],
  [
    `eliyah-rabbah:42:_`,
    `[42] Attached, etc. — specifically two stitches; tying does not help (Be'er Sheva); requires study why differ from green circles somewhat attached; those more batel to garment (Magen Avraham); appears since uses handkerchief to wipe, will not hold well and come to carry, unlike green circles permitted lest tear, not used for wiping.`,
  ],
  [
    `eliyah-rabbah:43:_`,
    `[43] In his clothing, etc. — but those who attach to belt with permanent knot forbidden, not batel to belt (Bach and Taz); thereby proves knot helps on clothing against Be'er Sheva above, requires study; Taz: permission only make patshil head of non-permanent knot at belt head like long belt, gird while walking street; can doubt see note 68; found what youths leniently wrap patshil around legs outside eruv thinking way of wearing like hose supporters called in Ashkenaz "hoizen bandel" — appears forbidden; slight proof Mishnah did not permit even milah mitzvah bring cloak, only wrap rag on finger bring via courtyard, implies not karmelis way, not clothing; all the more not mitzvah need; possibly long short patshil somewhat like hose supporters more permitted, better unintentional; end Keilim muleteers no proof, different there more clothing must cover head and most, so Maharshal in Maharal; can distinguish not like making belt since anklets tied anyway, yet permitted wrap on finger; can say leniency reason wiping see siman 331 seif 8; but if make sound since made to sound (Shiltei Gibborim); Magen Avraham challenged we forbid only musical instrument — not difficult, Rama siman 338 seif 1 anything made to sound forbidden even not instrument; see siman 339 seif 3.`,
  ],
  [
    `eliyah-rabbah:44:_`,
    `[44] [Levush] not non-expert amulet, etc. — if went out non-expert amulet exempt because way of wearing; likewise tefillin (Rambam chapter 19); Rashal responsum siman 47 expanded to find reason not liable; I omitted Rambam also Magen Avraham siman 308 omitted; ask his reason not liable lest healers — Rashal refutes clearly see there; nevertheless clear for us lacking reshut ha-rabbim permitted since no chatas, as below siman 303 seif 18; Rashal ruled there, not like Magen Avraham there.`,
  ],
  [`eliyah-rabbah:45:_`, `[45] [Levush] helped once, etc. — specifically twice, for third time both proofs came together, should not write "once" at all (Levush Yom Tov); in my humble opinion Levush means for each of two people helped once, then two times.`],
  [
    `eliyah-rabbah:46:_`,
    `[46] [Levush] or for that one alone. — appears complete error (Levush Yom Tov); meaning in one person healer proof does not apply except three people as below; thereby difficult what Levush wrote before one amulet healed three times one person; say thus: one amulet healed one person three times, second amulet second person three times; what wrote before healed three times two people means each amulet healed two people three times, then each six times; thus must interpret afterward "or one person," strained; therefore if you say: even if expert healer one person too, we do not find healer and amulet proof together; also possible he distinguishes: three documents one person each once not expert, but each healed three times, expert healer and amulets; if wrote one spell three times one person for three people and healed — end his words; proof for my words, requires study.`,
  ],
  [`eliyah-rabbah:47:_`, `[47] [Levush] and does not apply, etc. — meaning from healer strength amulet also helps as above, except when healer lost proof then need amulet proof, impossible except as he explained.`],
  [
    `eliyah-rabbah:48:_`,
    `[48] [Levush] and even if was, etc. — I do not know his source; perhaps only as clothing not liable; who told him secret it helps when carries in hand? Moreover Shabbat 62a rejected this, as Tosafot (Levush Yom Tov); proof from Magen Avraham Gemara amulet holy writing even expert may not go out unless covered, lest need bathroom and carry; if carrying in hand not liable, why decree not go out Shabbat 61a; need reason Rif, Rambam, Rosh, Tur, Shulchan Aruch who stam expert amulet may go out, did not distinguish uncovered forbidden; appear rely Rambam chapter 10 Sefer Torah, Tur Yoreh Deah siman 282 forbidden synagogue with amulet not covered leather; tefillin forbidden same reason; found Raavan siman 340: early generations had no toilets at home, now even covered leather permitted; difficult why poskim tefillin forbidden, perhaps because Shabbat not time for tefillin, wrote incidentally this reason.`,
  ],
  [
    `eliyah-rabbah:49:_`,
    `[49] Locust, etc. — locust helps thigh-bone weakness by segulah; live fox tooth hung on long sleeper to wake; dead fox opposite; nail from crucifixion tree hung on neck of third-day fever (Rambam and Maggid chapter 19); Rashi: place nail on boil swelling.`,
  ],
  [`eliyah-rabbah:50:_`, `[50] In every amulet, etc. — meaning even at home.`],
  [
    `eliyah-rabbah:51:_`,
    `[51] And it also heals, etc. — implies if not healing but only prevents being struck, forbidden as seif 22 forbidden wrap thread or ointment on wound — Bach and Magen Avraham; requires study, not implied Shabbat 65a; also Rabbenu Yerucham page 79; proof seif 13 ties so blood not distress; truly thread ointment requires study: perhaps not much pain relief, but rag wrapping permitted lest scratch clothes; what said above wrapping on ointment is leniency, permitted even on ointment; Bach note 40 did not explain thus, appears my humble opinion; Shiltei Gibborim 128a; Maharil in name Rosh; see what I wrote end this siman.`,
  ],
]);

const f = "output/siman_301/eliyah-rabbah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Eliyah Rabbah:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
