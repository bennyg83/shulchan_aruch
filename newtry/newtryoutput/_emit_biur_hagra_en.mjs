import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "biur_hagra_en_parts");

const PARTS = [];
PARTS.push(
  `Paragraph 1 — Shulchan Aruch ruled like Rabbi Yehudah (food cooked unintentionally on Shabbat permitted after Shabbat) and not like Rabbi Meir; Tosafot and their camp rule like Rabbi Meir with very clear proofs from stam Chullin. The Gra rejects the dismissal that stam Chullin follows Rabbi Yehudah — stam Terumot chapter 2 follows Rabbi Meir, and the sugya toward chapter 3 Shabbat goes accordingly; Rav Uri likewise Rabbi Meir. What Ramban and Ran dismissed because Rav follows Rabbi Yehudah — we rule like Rabbi Yochanan who holds halacha — Gra shows our Gemara supports Rabbi Yochanin leaning Rabbi Yehudah Sandlar only where accepted; Rif Semag rule Rabbi Shimon “left house” etc. Gra analyzes Yerushalmi Terumot chapter 3, Rabbi Avahu Rabbi Yochanan on shegagah/mezid for all prohibitions, Rashba on Rif chapter 3 Shabbat, Rosh chapter Merubah — concludes Tosafot primary for halacha; Yerushalmi Terumot chapter 2 explicit Rabbi Yochanan: ma’aser and “one who cooks shegagah eats mezid does not eat” — halacha Rabbi Meir shegagah eats; Geonim Ran Rambam ruled Rabbi Yehudah because ammei haaretz — Gra disagrees; Achronim essentially Rabbi Meir; Yerushalmi cooking stricter than other melacha — all his proofs dismissed as Gra explains — Tosafot principle wins.`
);
PARTS.push(
  `Or who did — Rambam chapter 23 Ma’aser/Mikveh like Rabbi Meir per stam Terumot chapter 2; Rabbi Yehudah only Torah — see Gittin 53b; Yoreh De’ah 99,101,110 etc.; Shabbat chapter 3 shegagah forbidden lest trick — unlike Terumot shards — Gittin Rashi Tosafot “hamaser”; Gra concludes “or did” Torah rabbinic Rabbi Meir; Gra’s view Rabbi Meir never penalizes shegagah even Torah — Yerushalmi stam mishnah support.`
);
PARTS.push(
  `Immediately — unlike Rashi Chullin 15a and Behag explained kedei she’asu — they follow benefit concern; Tosafot chapter 3 Yom Tov dispute; Rosh even Rashi here uncommon no kedei; Tosafot Chullin “morei”.`
);
PARTS.push(
  `Paragraph 2 — Like conclusion there Rabbi Meir only “benefit” earlier — perhaps different case rejected — Tosafot Shabbat 157b Ketubot; Tosafot Shabbat first chapter “to son”; Ran first chapter Chavit first Rabbi Eliezer as Ramban; Tosafot Yevamos 44a “not hay” etc.; Rashba Chullin Rabbi Yonah sugya disputes “heard Rabbi Meir”; Tosafot Yom Tov chicken muktzeh shechita — Gra analyzes muktzeh preparation Rabbi Shimon — Rashi Tosafot Ramban Ran slaughter sick healthy — Rif Rambam permit all — Rashba two views — see Magen Avraham 318:2 Shabbat 45b.`
);
PARTS.push(
  `Or did — same reason slaughter — specifically impossible otherwise.`
);
PARTS.push(
  `Or sick — Rashba same reason Jewish labor no distinction healthy sick.`
);
PARTS.push(
  `And even — Tosafot Gittin Eruvin 76 gentile comfort mother only milah permitted.`
);
PARTS.push(
  `Shabbat — exclude Motza”ei no bishulei akum uncommon no chasnus.`
);
PARTS.push(
  `And if — Chullin cut squash; explanation even sick erev like opening slaughter — not Rashi only today slaughter — as Gra; don’t say growth nullified majority principal issur “nisraf” Tosafot BK 69a — per siman 320:2 Yoreh De’ah 102 Hagahot permitted — Magen Avraham.`
);
PARTS.push(
  `Because grows — unlike animal no concern Tosafot Yom Tov there.`
);
PARTS.push(
  `Or break — three distinctions egg two-by-two Rashi there.`
);
PARTS.push(
  `Paragraph 4 dish — unlike “lest reheat” Rashi there even fully cooked — Tosafot 47b “bameh”; ordinary pots.`
);
PARTS.push(
  `Some say — end siman 8 Rivan; siman 257:7 anywhere even metzamek vera Gra holds forbidden all; Rivan perhaps not hatmana metzamek vera.`
);
PARTS.push(
  `If not — chapter 4 Yom Tov “not” one stirs.`
);
PARTS.push(
  `And even — unlike Rosh Tur Rambam Tosafot 39a “kol”.`
);
PARTS.push(
  `Same — learned above rejection chapter Keirah “gelgel” — we too anything finishing melacha.`
);
PARTS.push(
  `Paragraph 5 some — Rabbi Yosei Pesachim 41a Pesach roasted cooked.`
);
PARTS.push(
  `Even kli sheini — Shabbat 42b latter wording salt needs — other items admit first wording.`
);
PARTS.push(
  `And some — Magen Avraham there latter rejects first.`
);
PARTS.push(
  `Some say — Tosafot Pesachim “Ulla”; we rule blessing cooked vegetables ha’adamah Pesach ketiva Ulla Pesachim — Rabbi Yehudah blessing Tosafot cited.`
);
PARTS.push(
  `Paragraph 6 if — Rashi there.`
);
PARTS.push(
  `But — there not “to heat” Tosafot 48a “why”.`
);
PARTS.push(
  `Paragraph 7 Some say — rule siman 4 no cooking permitted opposite bonfire Magen Avraham like oil no cooking opposite bonfire fire derivatives kettle siman 6 hot siman 4; stove forbidden — permitted only chazarah conditions siman 258:2 — fire only opposite bonfire like leaning. Magen Avraham ch.22 Ran chapter Keirah kettle opposite bonfire unlike Rosh rejected leaning — Tosafot “tesh” Gra siman 8 15 Ramban Rashba — item no cooking fully cooked dry even cooled or gravy boiling siman 4; first opinion kettle on fire not “on fire” stove permitted two items; second opinion like fire forbidden siman 7 hot siman 8 cold dry different din Magen Avraham Rema Maggid Mishneh Ran first plainly Rivan Shulchan Aruch siman 8 first unlike Magen Avraham 26 wants distinguish Ran.`
);
PARTS.push(
  `Paragraph 8 and 24 permitted — learned from oil.`
);
PARTS.push(
  `Even if — siman 258 not fully cooked forbidden chazarah siman 2 metzamek vera from hot “preserve heat” Ketubot 38b.`
);
PARTS.push(
  `Metzamek — his view siman 4 Hagahot Magen Avraham.`
);
PARTS.push(
  `Paragraph 9 forbidden — explanation even first opinion Rosh Shulchan Aruch siman 4 — Maggid Mishneh Ran Hagahot siman 15 gravy cooled no cooking — permitted here too.`
);
PARTS.push(
  `Such hand recoils — no recoiling no cooking Magen Avraham Tosafot; Gra entire siman “recoils” even inside stove/oven permitted if no recoiling siman 258 Yerushalmi chapter Keirah oven; Magen Avraham quotes Yerushalmi opposite — Gra correct Yerushalmi chapter 3 Rabbi Zeira hand controls — Rabbi Yosei kli rishon vs sheini — Rabbeinu Yonah distance kli rishon not kli sheini — Rosh Ran Maggid Mishneh — Yerushalmi “no control” means yad soledet bo.`
);
PARTS.push(
  `Since removed — Rashi “in vessel”.`
);
PARTS.push(
  `And some — Rosh there Taz Rosh Tur omitted salted Rema Hagahot Gra.`
);
PARTS.push(
  `Some forbid — first wording.`
);
PARTS.push(
  `Stringent — Tosafot there.`
);
PARTS.push(
  `Even opposite fire — even Shulchan Aruch forbidden as Gra above.`
);
PARTS.push(
  `Salt — Magen Avraham; “for taste” Chullin 97b AZ 69a; zuzei Pesachim leaven “for taste”; “nisraf” Terumot chapter 3; siman 320:2.`
);
PARTS.push(
  `Paragraph 10 forbidden — Yerushalmi cited Tosafot Rosh there; learn Zevachim 90 Pesachim 76 pouring cooks peel-deep.`
);
PARTS.push(
  `Paragraph 11 tub — two paragraphs 11–12 Shulchan Aruch quote Rambam — Rif Rabbi Shimon on first clause halacha not like him Ra’avan Rosh.`
);
PARTS.push(
  `Even though — Tosafot left kettle cited tub; Ba’al HaTerumah distinction cup/tub; Rambam “heats much” though Beit Yosef rejected proof; siman 12 “provided not” unclear hot to cold; Tur relied tub why repeated; tub even kli sheini forbidden — din kli rishon as written.`
);
PARTS.push(
  `Paragraph 12 kettle emptied — supports Rav Ada Rav Shmuel hold like him.`
);
PARTS.push(
  `Permitted pour — Gemara 42a Bach Rosh conclusion Rava as Gra there.`
);
PARTS.push(
  `Provided not — infer “specifically cup”; cup kli sheini therefore Gemara unclear hot/cold — Abaye explains mishnah Rav Ada — didn’t cite permission majority water for this reason.`
);
PARTS.push(
  `If water — Tur Abaye didn’t write hot to cold permitted — relied siman 11 Hagahot kli sheini even kli rishon Tosafot “note” — still Abaye only Rabbi Yehudah — wrote “both” per Gemara.`
);
PARTS.push(
  `Paragraph 13 permitted — there.`
);
PARTS.push(
  `Or — Magen Avraham 2.`
);
PARTS.push(
  `But — there.`
);
PARTS.push(
  `Paragraph 14 forbidden — Yerushalmi likewise Gemara Geonim Semag melting not its “bishul” still forbidden siman 48 Tosafot “why”.`
);
PARTS.push(
  `Same — learned above.`
);
PARTS.push(
  `Paragraph 15 item — learned oil no cooking siman 4 8.`
);
PARTS.push(
  `Even though but — siman 4.`
);
PARTS.push(
  `Some lenient — Magen Avraham explains mishnah “came in hot” gravy cooled — Ran Maggid Mishneh Tosefta cook cooked bake baked; chapter 2 “lest reheat” Rif Rambam increase vapor lest boil reveal cover — Ra’avad explains question — doesn’t contradict our text halacha.`
);
PARTS.push(
  `Paragraph 16 permitted — unlike Sod chapter 4 crushing — there lest squeeze fruit for liquid Ran Maggid Mishneh.`
);
PARTS.push(
  `All the more pot — even Rashi nolad permitted “but puts”…`
);
PARTS.push(
  `Some stringent — like Rashi fat floats visible see AZ.`
);
PARTS.push(
  `Paragraph 18 if not — siman 4.`
);
PARTS.push(
  `And if — then no cooking since chazarah permitted Tosefta as above.`
);
PARTS.push(
  `But wool — Tosafot “perhaps”.`
);
PARTS.push(
  `Even though — Yerushalmi Ran; stam mishnah Beit Hillel permit didn’t distinguish overturned coated — Beit Shammai grant Beit Hillel eye removed concern.`
);
PARTS.push(
  `Paragraph 19 forbidden — Rashi 107a “sedika”.`
);

if (PARTS.length !== 57) throw new Error(`Got ${PARTS.length}`);
fs.mkdirSync(dir, { recursive: true });
PARTS.forEach((text, i) => {
  fs.writeFileSync(path.join(dir, `${String(i + 1).padStart(2, "0")}.txt`), text.trim() + "\n", "utf8");
});
console.log("Wrote", PARTS.length);
