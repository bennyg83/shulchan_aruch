import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "ber_heteiv_en_parts");

const en = [
  `Intentionally — implies Rashba siman 375 the pot is likewise forbidden; specifically one who cooks for a healthy person — but one who cooks for a sick person the pot is permitted — so Rashba there; see Shevuot Yaakov vol.2 siman 51; greater still he wrote even new pot doctors ordered cook in new vessel — still pot permitted; see Rashi first chapter Chullin — Rabbi Meir shegagah eats same day even himself — mezid forbidden others same day — elsewhere permits even himself — see there; Ketubot explains opposite Rabbi Meir — shegagah eats same day — mezid never he eats — others Yisrael eat — wrote Rabbi Meir mezid he never eats — opposite Chullin — question; see Rambam Mishnah commentary Terumot ch.2 — analyze.`,
  `Motza”ei Shabbat immediately — specifically gentile work needs kedei she’asu lest tell him do — Jew won’t listen Tosafot Chullin 15a; Motza”ei Yom Tov forbidden — Shabbat doesn’t prepare Yom Tov — Lekutei Mahari”v siman 2; if mixed see Magen Avraham.`,
  `Shegagah — if on sage’s instruction called shegagah; same forgot — Keneset HaGedolah Radbaz.`,
  `Raw — without salting Tur; see Even Ha’ezer siman 67:2 rinsing required; siman 325:1.`,
  `Shabbat — Motza”ei permitted immediately Shach — gentile cooked permissibly no kedei Magen Avraham; see Yoreh De’ah 113:10 later Achronim forbid even sick himself Motza”ei — see there.`,
  `“Grows” — fruit not finished cooking Beit Yosef; finished cooking not said “grows” — Magen Avraham there.`,
  `To bury sand — even erev see Rema 257:3; Rashbash responsum permitted roast hot roof sun — not confused fire — Magen Avraham not compelling; Tal Orot argues; Yerushalmi explicit forbidden; Rambam Tiberias springs exempt sun derivative; Ran forbidden place on springs erev permitted inside forbidden siman 326:3.`,
  `Cooking — know all laws forbidden cooking even put stove/oven before heating forbidden end siman 258 — Magen Avraham.`,
  `Some say — Bach ruled first opinion — see Magen Avraham siman 8.`,
  `To soak — even kli rishon siman 15 no cooking after cooking; Shulchan Aruch: if not cooked erev only soaked hot — forbidden soak hot Shabbat — good stringent if hand recoils — Magen Avraham.`,
  `They rinse — pour kli sheini; forbidden soak kli sheini appears cooking Bach; unlike spices siman 9 — spices sweeten — not appear cooking; onion law like spices taste — Magen Avraham.`,
  `Salted — implies cold water permitted — wash arav”ng cold even very salty — Beit Yosef end siman Pardes tunina fish — Taz.`,
  `Hard — same heavily salted cannot eat without rinsing Beit Yosef; Gemara rinsed liable.`,
  `Cooking — no cooking after cooking still cooking after roasting — forbid cooked by fire without gravy Piskei Rekanti; all agree no roast after roast — roasted permitted fire cooled — baked — cooked soak hot siman 4 Magen Avraham. Israel drink coffee boil water mix coffee sometimes not full measure still boiling add cups scrape coffee — if Shabbat forbidden add from coffee cups — Mahar”a Levi responsum Ginat Vered Orach Chaim kelal 3 siman 2 — see siman 9 Israel scholars; lenient has support stringent titba — Zera Avraham OC siman 1; Panei Meiros siman 84; Shevuot Yaakov vol.1 Shabbat.`,
  `Even kli sheini — Beit Yosef reason lest soft bread cook kli sheini; some permit Tur only salt one wording siman 9 — Magen Avraham per Bach stringent kli sheini appears cooking — Eliyahu Rabbah brings MB responsum permit kli sheini.`,
  `Kli rishon — dry no cooking after baking.`,
  `Hand recoils — meaning don’t put bread soup while recoils; chop fine onions soup after hand not recoiling — bread leniency baked — onions more — perhaps onions like salt wording cooks siman 9 — not expert soft forbidden — while recoiling soup — Taz.`,
  `Recoils — even not fully cooked permitted — preserve heat not full cooking — Taz see siman 15.`,
  `Dough — spreadable forbidden siman 314:11 — Taz.`,
  `Hot — dry permitted Magen Avraham.`,
  `Forbidden — like placing stove lechatchilah Shabbat Rivan; per siman 258:2 removed stove after dark may put pot — Magen Avraham.`,
  `Stove — even no cooking issue forbidden on stove decree stoke.`,
  `Primary — pot interrupts unlike stove there on fire Magen Avraham ch.22 — see Magen Avraham.`,
  `Recoils — see Magen Avraham; Yoreh De’ah 94:2 Shach Rashbash.`,
  `Ox — meat doesn’t cook moisture cooks Tur.`,
  `Blood — rinsed after salting — else forbidden blood in salt; Rav Beit Yosem plain only salty salt aids — see Magen Avraham.`,
  `Salt — wrote siman 17 onions same sharp cook fast — see sweeten kli sheini — Taz.`,
  `Nullified — Taz argues permit eating Shabbat wait after — see Magen Avraham; salt from boiled water no cooking — Magen Avraham siman 15.`,
  `Kli rishon — if poured peel forbidden cooked Shabbat — Magen Avraham.`,
  `Hot — Tiberias water forbidden cold in tub spring-fed — take kli sheini then put Gemara — Taz.`,
  `From hot water — pour kli rishon cold lower dominates Tur; spices siman 10 different mixtures majority cold; hot chunk cold gravy forbidden peel — Yoreh De’ah 91:4 Magen Avraham.`,
  `Majority — combining vessel unintentional not psik reisha — Magen Avraham.`,
  `Kli sheini — Yoreh De’ah 92:45 Taz drawing empty vessel has din kli rishon unlike Maharil; siman 258 burying vessel — Taz.`,
  `Alive — forbidden near fire — far permitted — forbidden iluntis lead near fire melt burn Magen Avraham Rambam — answer unintentional — Magen Avraham.`,
  `Cooled permitted — no cooking after gravy cooled.`,
  `Hand recoils — Levush error read where no recoiling — where recoils cooking Rabbeinu Yerucham oil — not difficult cooked dry siman 15 Rema 258:5 — Taz Magen Avraham.`,
  `Melts — does nothing hands melts automatically.`,
  `Permitted — still forbidden stringency cooking siman 15.`,
  `Some stringent — fat floats visible nolad unlike snow siman 320:9 — bedieved fat forbidden — pastete permitted absorbed fat Rabbeinu Yerucham; perhaps forbidden reabsorb Yoreh De’ah 113:3 bedieved lenient Rema; put pastete before oven heated siman 258 — not lenient before others use gentile; Rambam ch.9 liability stir ingredients — Maggid Mishneh stirring; Beit Yosef siman 258 Kol Bo stir liable — Beit Yosei appears permit warm fatty meat small melt permitted all; Az permit wine cup ice on stove melt ice; Rambam one brings fire wood pot water meat stir all liable — variant Ri bar Rav; ember transport Rashi kindling Levi Chibbat 21; Maggid Mishneh first stir; Beit Yosef Kol Bo.`,
  `Forbidden — dyeing.`,
  `Lechatchilah — world permits legumes spoon unavoidable rely siman 258:4 Magen Avraham; Taz removal piece without stirring not careful unfinished forbidden stir finished not stringent removal want stringent turn pot siman 21 Panei Meiros 84.`,
  `Bonfire — removing from fire boiling recoils forbidden smear garlic still kli rishon — many roast goose smear garlic forbidden recoiling Taz; Magen Avraham fat smear permitted no cooking siman 15 no nolad not visible not crush little melts — question gravy — question; from here smear fat goose flour legumes dish Az Drisha; Eliyahu Rabbah questions.`,
];

if (en.length !== 42) throw new Error(`Expected 42 got ${en.length}`);
fs.mkdirSync(dir, { recursive: true });
en.forEach((text, i) => {
  fs.writeFileSync(path.join(dir, `${String(i + 1).padStart(2, "0")}.txt`), text.trim() + "\n", "utf8");
});
console.log("Wrote", en.length);
