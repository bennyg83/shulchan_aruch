#!/usr/bin/env node
/**
 * Generates remaining translation part files from inventory JSON + embedded manual maps.
 * Run: node _gen-083-084-translations.mjs 083|084
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS_P1 as T083P1 } from './_patch-siman-083-translations-p1.mjs';
import { TRANSLATIONS_P2 as T083P2 } from './_patch-siman-083-translations-p2.mjs';
import { TRANSLATIONS_P1 as T084P1 } from './_patch-siman-084-translations-p1.mjs';
import { applyPhrases, translateBaer084 } from './_yd001-translate-shared.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));

function stripBold(h) {
  return h.replace(/<b>/g, '').replace(/<\/b>/g, '');
}

function translateBeer(heb) {
  const h = heb.trim();
  if (/^משנה/.test(h)) return h.replace('משנה', 'Mishnah').replace(/דף ([^\s:]+)/, 'daf $1');
  if (/^שם במשנ/.test(h)) return 'There in the Mishnah, the first tanna.';
  if (/^בריית/.test(h)) return 'A baraita there daf 66; Tosafot and Ran derive it from "it has no fin upon it."';
  if (/^טור והרשב/.test(h)) return 'Tur and Rashba in Terumat HaDeshen from those non-Jews, Avodah Zarah daf 39.';
  if (/^משנה נדה/.test(h)) return 'Mishnah Niddah daf 51.';
  if (/^טור וכ"כ/.test(h)) return 'Tur and so too Rashba, and it is plain.';
  if (/^ברייתא במעשה/.test(h)) return 'A baraita in the incident of R\' Shimon ben Gamliel, as Rav Pappa explained there, Avodah Zarah daf 40.';
  if (/^הרא"ש וטור/.test(h)) return 'Rosh and Tur and Ran in chapter 2 of Avodah Zarah, and Rashba in Terumat HaDeshen. (°) Explanation: and after they expelled all their brine they mixed them together.';
  if (/^משנה עבודת/.test(h)) return 'Mishnah Avodah Zarah daf 39 and a baraita there daf 40.';
  if (/^שם בגמרא/.test(h)) return 'There in the Gemara daf 40, as Rosh explained there; and so is the view of Rif according to our texts; and so Rashba; and so Tur.';
  return applyPhrases(h);
}

function translateGra(heb) {
  const t = stripBold(heb).trim();
  if (t.startsWith('ודוקא')) return `And specifically, etc. — Tosafta there: these are scales that are clothed in them.`;
  if (t.startsWith('ואפילו')) return `And even if, etc. — Avodah Zarah; Torat Kohanim parashat Shemini; "I only know one that increases scales and fins" — even one fin and one scale; Rebbe Yishmael: two scales.`;
  if (t.startsWith('וי"א')) return `And some say, etc. — Tosafta there; Rosh.`;
  if (t.startsWith('לפיכך מצא')) return `Therefore if one found, etc. — language of Tosafta there; Niddah there.`;
  if (t.startsWith('ואם אינן')) return `And if they do not match, etc. — there like R' Papa.`;
  if (t.startsWith('ואם נמצא כו')) return `And if a fish is found, etc. — there like R' Huna and R' Papa; and as written "when it is taught" etc.; Rosh; and the same for spine; Gemara shortened; specifically when known it has no scales, but stam we rely on head and spine which are uncommon; R' Huna and R' Nachman; extra inspection — head and spine (Lekut). And if a fish is found, etc. — like R' Huna and R' Papa; Rashi 39b s.v. every head, etc. (end). (Lekut) And if a fish is found, etc. — there; Rashi and Maharam omitted because Raavad and Re'ah explained head and spine as recognizing a known pure species; whole fish we rely on visual recognition of head and spine; cut fish not; R' Nachman: even cut fish, visual recognition of one suffices; Ramban and Rashba challenged; nevertheless Ramban wrote he never saw in Geonic works that head and spine are signs for fish — great investigation; Beit Yosef: Rambam in Mishnah commentary also like Raavad; Gemara resolves Ra'akva's challenge (end). (Lekut) But if, etc. — therefore the great ones were uncertain on barbota fish as Tosafot 40a; did not check head and spine except where pure resemble impure; stam we are not concerned — uncommon (Chullin 62a) in Persia and Media therefore sign of head and spine; not in barbota which has no scales (end).`;
  if (t.startsWith('ציר')) return `Brine, etc. — as explained from their dispute; Chullin 99b "brine is different"; Tosafot there; 112b impure fish; Bekhorot 6b to forbid their brine.`;
  if (t.startsWith('לפיכך מותר לקנות')) return `Therefore one may buy, etc. — rabbinic doubt is lenient in many places. (Lekut) Therefore one may buy, etc. — Rashi 35b s.v. and you salted; not trodden — recognizable pure ones permitted as in Mishnah 39b; Ramban and Terumat HaDeshen 93b (end).`;
  if (t.startsWith('ויש אוסרים')) return `And some forbid, etc. — since lying together presumably salted together initially. (Lekut) Therefore one may buy, etc. — Avodah Zarah 39 untrodden; not concerned they were salted with impure — salted pure and impure forbidden (Chullin 113a); we do not establish prohibition where common — here we are concerned; except rabbinic doubt — Ran; and some forbid, etc. — Ran: we do not establish prohibition; and even in other fish, etc. (end).`;
  if (t.startsWith('ואפילו בשאר')) return `And even in other fish, etc. — we do not establish prohibition (Avodah Zarah 56b).`;
  if (t.startsWith('ואם רואה')) return `And if one sees, etc. — salting is like boiling and their brine is sharp.`;
  if (t.startsWith('אבל אין חוששין')) return `But one need not be concerned, etc. — as above, we do not establish prohibition.`;
  if (t.startsWith('אבל אם אית')) return `But if there is fat, etc. — Semak; and Tosafot Chullin and Bekhorot.`;
  if (t.startsWith('והיכא דהדגים')) return `And where fish are salted dry, etc. — Or Zarua.`;
  if (t.startsWith('שזה סימן')) return `For this is a sign, etc. — Tur's language; Rashi; Tur concludes kulyatis is not found in brine of impure fish.`;
  if (t.startsWith('וה"מ')) return `And this applies, etc. — Rashi there; omitted what Rif, Rosh, Tur omitted — Beit Yosef wondered.`;
  if (t.startsWith('ויש מי שאומר שאם היו חביות')) return `And some say if many barrels, etc. — explains there 39b; two barrels; what Mechaber wrote "non-Jew brought" only in one — Rif omitted Rav, Shmuel, R' Yochanan; Ran; Maggid Mishneh: text of Rif should read open, etc.`;
  if (t.startsWith('דהיינו דג טהור')) return `Meaning a pure fish — Rashba and Ran in name of R' Chananel: kulyatis is pure fish; one pure fish establishes all brine; Mishnah "fish" means pure fish; not like Rashi; but chapter 3 (97a) implies impure or pure small fish — Ran.`;
  if (t.startsWith('ויש מי כו') && t.includes('הרשב"א')) return `And some say, etc. — Rashba and Ran challenged R' Chananel: in troita we require head and spine for each — answer: leniency in brine which is rabbinic; there forbidden because bodies mixed in brine — not here where no fish without scales, only brine.`;
  if (t.startsWith('קרבי דגים')) return `Fish innards, etc. — Rambam's path; Mechaber until "and now" from Rambam law 2; Maggid Mishneh: Rambam like R' Zeira — no signs for innards; fish from distant lands evade more than fowl eggs; therefore seif 7 omitted signs; yet Rif, Rosh, Rashba, Ran hold innards like fish eggs; seif 8 teaches even with signs of rounded/pointed heads one needs "I salted them"; when he says "I salted them" suffices even crushed (Avodah Zarah 40); Rambam: eggs like fowl — if he says from certain fowl helps; Mechaber omitted "like fowl eggs" — follows Maggid Mishneh; Rama: innards have signs in blunt head; all poskim except Rambam; even whole innards need "I salted them"; two rounded or pointed heads certainly impure.`;
  if (t.startsWith('אינם כו')) return `They are not purchased, etc. — but a sign does not help in them as above.`;
  if (t.startsWith('אא"כ כו') && t.includes('משל פלוני')) return `Unless, etc. — but "from a certain fish and pure" does not help even whole, unlike fowl, because fish come from afar (Lekut) unless established in kashrut — like tekhelet; not like Rashi "expert means knowledgeable"; Ramban: expert means trusted; Yerushalmi: innards and tekhelet only from expert; "I salted them" helps even suspect or non-Jew — Chullin 63b (Lekut) unless established in kashrut — like expert of tekhelet; not like Rashi; Ran on Chullin 64a.`;
  if (t.startsWith('הישראלי')) return `The Israelite — Rambam likewise for fowl eggs (siman 86); some explain Chullin: buy from non-Jew; "in every place" even where impure fowl common — Chullin 39b; no difference with non-Jew. Expert means trusted (Ramban); Yerushalmi; "I salted them" even suspect (Raavad); Rambam: only Israelite, not non-Jew (Lekut) person established in kashrut — like expert; Yerushalmi; unlike Rashi; Ran 64a.`;
  if (t.startsWith('או עובד כוכבים')) return `Or non-Jew — all poskim for pure fowl eggs (siman 86 hagahah); our texts "from non-Jews"; Chullin 64b; Ran challenged; Tosafot Chullin.`;
  if (t.startsWith('אא"כ היה') && t.includes('מומחה')) return `Unless there was, etc. — Rashi: expert is knowledgeable; Ramban: trusted; Yerushalmi; suspect or non-Jew believed with "I salted them" — Chullin; Raavad: suspect only with "I salted them"; non-Jew or suspect must say "these fish and these innards"; Ramban and Rashba: same for non-Jew and suspect Israelite; Rambam: only Israelite (Lekut) established in kashrut — like expert; Yerushalmi; unlike Rashi; Ran.`;
  if (t.startsWith('ביצי כו')) return `(Lekut) Fish eggs, etc. — like R' Yochanan and R' Shimon ben Pazi: fish signs also not d'oraisa; Gemara Chullin; Yerushalmi; Tosafot; Rambam, Rif: fish eggs need no sign — certainly pure; Chullin and Avodah Zarah; Raavad like R' Tam; Rashba: Rif holds no sign needed for fish eggs (end).`;
  if (t.startsWith('וה"ה בקרביים')) return `And the same for innards — all poskim except Rambam and Shulchan Aruch.`;
  if (t.startsWith('אא"כ כו') && t.includes('היה אדם')) return `Unless there was a person, etc. — as above.`;
  if (t.startsWith('ועכשיו')) return `And now, etc. — Or Zarua in name of Beit Yosef.`;
  if (t.startsWith('דג טהור שנמצא')) return `A pure fish found, etc. — Mishnah wording "found" — even if we did not see swallowing (Rav Ashi).`;
  if (t.startsWith('בין כו')) return `Whether found through digestive tract or swallowing or womb — Rav Sheshet and R' Papa; all the more Rav Ashi.`;
  if (t.startsWith('בין שיצא')) return `Whether it came out — Tosafot there: no proof from majority; permitted in womb — most spawn in species.`;
  return applyPhrases(t);
}

function translateKereti(heb) {
  const t = heb.trim();
  if (t.includes('וקשקשת אחד')) return `And one scale — in any place on the body, provided firmly attached; if not attached requires investigation unless many scales — Peri Chadash.`;
  if (t.includes('ואינן ניכרים')) return `And they are not recognizable; if one stands the fish toward the sun and scales appear — permitted.`;
  if (t.includes('כל שיש לו קשקשת')) return `Whoever has scales has a fin — majority of fish; nature witnesses; Torah and rabbinic law follow majority; Spanish swordfish with scales without fin does not contradict Chazal — minority; no need to distinguish sea creature from fish — Peri Chadash.`;
  if (t.startsWith('מתאימות')) return `Match — if placed side by side they fit well.`;
  if (t.startsWith('מלוחות וה"א')) return `Salted — like a piece with scales permitted; those salted were presumably from pure species; scales fell — d'oraisa doubt stringent; piece without scales among salted impure pieces — not forbidden from pieces with scales — multiple doubts.`;
  if (t.includes('דודאי וכו')) return `Certainly, etc. — presumably scales fell; broad head and spine when salted permitted; whole un salted fish without scales — do not rely on head and spine; Maharshal, Rosh, Tur; Beit Yosef; Rambam and Rashba; Maharalach, Peri Chadash, Peleti.`;
  if (t.startsWith('לא נמלחו')) return `Not salted together — even if brine still drips — brine of fish rabbinic; Perishah: concern soaked twenty-four hours like cooked d'oraisa.`;
  if (t.startsWith('ויש אוסרין')) return `Some forbid — presumably initially together; Taharat Chesed: sixty pure against impure permits l'chatchila; majority poskim brine nullifies in sixty.`;
  if (t.startsWith('וספיקא לחומרא')) return `Doubt to be stringent — certainly fat; doubt elsewhere — if doubt about fat, lenient — Peri Chadash.`;
  if (t.startsWith('כלכית')) return `Kulyatis — disputed: impure species in pure brine vs pure fish establishing brine; open vs sealed barrels.`;
  if (t.startsWith('בחביות סתומה')) return `Sealed barrel — one suffices; open — two lest from elsewhere.`;
  if (t.startsWith('דהיינו דג טהור')) return `Meaning pure fish — Rambam; not concerned it came from elsewhere.`;
  if (t.startsWith('ויש מי שאומר רוב')) return `Some say — majority of poskim agree; Mechaber should not have written "some say."`;
  if (t.startsWith('או עכו"ם')) return `Or non-Jew — Rama: must say certain pure fish and "I salted them"; distant fish — non-Jew believed like eggs.`;
  if (t.startsWith('ואני מלחתי')) return `And I salted them — Peleti; Mechaber: signs not needed with "I salted them"; if signs contradict, not believed.`;
  if (t.startsWith('אא"כ היה וכו') && t.includes('העט"ז')) return `Unless established in kashrut — Atzei Etz Chaim: if says both rounded heads clearly from pure fish — believed; Shach and Perishah challenged — Peleti sides with Atzei Etz Chaim.`;
  if (t.startsWith('וה"ה דאיכא')) return `And there are many who hold no signs for innards at all.`;
  if (t.startsWith('אני מלחתי\' מטור')) return `I salted them — Tur and many poskim require "certain fish and pure"; "I salted them" alone insufficient without signs when crushed; whole with signs — all agree.`;
  if (t.startsWith('אוכל על פיו')) return `Eat on his word — Peleti on Tur; whole vs crushed; buyer must recognize fish when seller says "from certain pure fish."`;
  if (t.startsWith('טהורים עמ"ש')) return `They are pure — Peleti supports R' Tam: fish signs d'oraisa.`;
  if (t.startsWith('דרך בית הריעי')) return `Through digestive tract; if in womb — Peleti uncertain.`;
  if (t.startsWith('אסור עיין')) return `Forbidden — Peleti: even chewed or not whole inside innards forbidden unless digestion time; Rambam's time for fish and fowl.`;
  return applyPhrases(t);
}

function translateSifteiKohen(heb) {
  const inner = heb.replace(/^\[\"|\"\]$/g, '').replace(/\\"/g, '"').trim();
  const lead = inner.match(/^([^"]*"[^"]*")/)?.[1] || inner.slice(0, 40);
  const body = inner.replace(/^<b>[^<]+<\/b>\.\s*/, '').replace(/^["\s]+/, '');
  // Return bracketed format with translated body
  const title = inner.match(/<b>([^<]+)<\/b>/)?.[1] || inner.split('.')[0];
  const engTitle = title
    .replace('וקשקשת אחד כו', 'And one scale, etc.')
    .replace('יש מיני דגים כו', 'There are fish species, etc.')
    .replace('כל שיש לו קשקשת כו', 'Whoever has scales, etc.')
    .replace(' אם החתיכות מתאימות כו', 'If the pieces match, etc.')
    .replace(' אפי\' כולן מלוחות ביחד', 'Even if all salted together')
    .replace(' ואם נמצא שם דג כו', 'And if a fish is found there, etc.')
    .replace(' שמא לא נמלחו יחד', 'Perhaps they were not salted together')
    .replace(' ויש אוסרים כו', 'And some forbid, etc.')
    .replace(' דמתירין בכל ענין', 'That they permit in every case')
    .replace(' משום דאין דרך למלחן עמהם', 'Because there is no way to salt with them')
    .replace(' אין להחמיר ולפשפש כו', 'One need not be stringent to search, etc.')
    .replace(' אפילו בהערינ"ג', 'Even herring')
    .replace(' כל זמן שאין רואים', 'As long as one does not see')
    .replace(' יש להתיר בכל ענין', 'One may permit in every case')
    .replace(' אבל אי אית בהו שמנונית כו', 'But if there is fat, etc.')
    .replace(' והיכא דהדגים מלוחים יבשים כו', 'And where fish are dry-salted, etc.')
    .replace(' ונהגו להחמיר גם בזה', 'And they practice stringency in this too')
    .replace(' אם כולכית אחת כו', 'If one kulyatis, etc.')
    .replace(' ומ"ש המחבר ויש מי שאומר כו', 'And what Mechaber wrote "some say," etc.')
    .replace(' וכולכית דהיינו דג טהור וכו', 'And kulyatis meaning pure fish, etc.')
    .replace(' ויש מי שאומר כו', 'And some say, etc.')
    .replace(' דהא דשריא ע"י כולכית', 'That which is permitted through kulyatis')
    .replace(' אבל אם יש בהם כו', 'But if everything is in it, etc.')
    .replace(' קרבי דגים כו', 'Fish innards, etc.')
    .replace(' ומ"ש הר"ב או עובד כוכבים', 'And what Rama wrote "or non-Jew"')
    .replace(' אא"כ היה אדם שהוחזק בכשרות', 'Unless a person established in kashrut')
    .replace(' ועכשיו נתפשט המנהג', 'And now the custom has spread')
    .replace(' שנמצא כו', 'That is found, etc.')
    .replace(' בין שנמצא כו', 'Whether found, etc.')
    .replace(' דג טמא שנמצא במעי כו', 'An impure fish found in the innards, etc.')
    .replace(' שנמצא במעי דג טהור כו', 'Found in the innards of a pure fish, etc.')
    .replace(' במים שבכלים', 'In water in vessels')
    .replace(' ושבבורות שיחין כו', 'And in cisterns and channels, etc.')
    .replace(' שאינם נובעים', 'That are not flowing')
    .replace(' לפיכך כו', 'Therefore, etc.')
    .replace(' ואינו חושש כו', 'And one need not be concerned, etc.')
    .replace(' המסנן כו', 'One who filters, etc.')
    .replace(' בתלוש כו', 'In detached fruit, etc.')
    .replace(' בקמח כו', 'In flour, etc.')
    .replace(' במחובר כו', 'While attached, etc.')
    .replace(' ואינו ידוע כו', 'And it is unknown, etc.')
    .replace(' כל מיני פירות כו', 'All fruit species, etc.')
    .replace(' עבר ובישל כו', 'If one transgressed and cooked, etc.')
    .replace(' ירקות מבושלים כו', 'Cooked vegetables, etc.')
    .replace(' אשה שבדקה כו', 'A woman who inspected, etc.')
    .replace(' סממנים כו', 'Medicinal compounds, etc.')
    .replace(' דבש כו', 'Honey, etc.')
    .replace(' חיטים כו', 'Wheat, etc.')
    .replace(' מין עופות כו', 'Species of birds, etc.')
    .replace(' כל תולעים כו', 'All worms, etc.')
    .replace(' שרץ שנשרף כו', 'A burnt sheretz, etc.');

  // Full translation map for known bodies (abbreviated where repetitive)
  const MAP = {
    'כלומר באיזה מקום': `["${engTitle}. Meaning: in any place one scale suffices; we are not concerned scales fell from other fish and attached, since firmly attached and appears part of its body; Yesh Omrim in hagahah: since not in the special place we are not concerned it came from pure fish; Ran; Maggid Mishneh; first reasoning: unknown species possibly attached scales — forbidden from doubt; follow Torah stringency; nevertheless elsewhere recognizable if from its body — end of his words."]`,
  };
  if (MAP[body.slice(0, 15)]) return MAP[body.slice(0, 15)];

  const en = applyPhrases(body);
  const titleOut = engTitle || applyPhrases(title);
  if (heb.trim().startsWith('["') || inner.startsWith('["')) {
    return `["${titleOut}. ${en}"]`;
  }
  return `${titleOut}. ${en}`;
}

function translateTaz(heb) {
  const t = heb.trim();
  const maps = [
    [/ונמצאו קשקשים/, 'And scales are found — permitted. In Tur he concluded with this language "it is known it has scales" — superfluous wording; many explanations; it appears he teaches: just as on the fish scales were not visible, do not say these scales were already on the garment from other fish or in water and due to fineness were not visible — rather it is more reasonable they were on this fish.'],
    [/ויש שיש לו סנפיר/, 'And there are those with a fin and no scales. Gemara asks: if so why write fin — answers: to expand Torah; meaning Torah itself explained its words lest we say what is scales is fin.'],
    [/לפיכך מצא חתיכת/, 'Therefore if one found a piece of fish, etc. — on a whole fish it is impossible in the world to find scales without a fin.'],
    [/אם החתיכות מתאימות/, 'If the pieces match — Rashi: pieces are equal and when placed together fit; Perishah: this inspection may be relied upon even now; Maharai compared to tereifah fowl; siman 101 seif 9.'],
    [/ואין אנו רואים בו קשקשים/, 'And we do not see scales on it, etc. — this resolves Rosh and Tur who initially wrote not to rely on head and spine; afterward permitted salted pieces when head and spine recognized; whole fish before us without visible scales — do not rely; Beit Yosef explains; buying from Israel l\'chatchila may rely on these signs without checking scales — Rosh first forbade then permitted non-Jew\'s barrel as b\'dieved like bread of non-Jews — Tur inserted "non-Jew brought" to answer his father\'s question.'],
    [/שמא לא נמלחו יחד/, 'Perhaps they were not salted together — initially; after expelling all brine they mixed — Rosh and poskim; not contradictory to siman 91 seif 5 — brine in fish is minimal; after salting time brine expelled; brine of fish rabbinic; Bach: permitters only when not touching impure; Rama: no concern after absorption.'],
    [/וסתם דגים מלוחים/, 'And ordinary salted fish, etc. — "salted" not precise in Arukh; stam fish have no fat; doubt of fat — lenient — Taharat Chesed general rule 20.'],
    [/אם כולכית אחת/, 'If one kulyatis, etc. — Rashi and Ran: kulyatis impure fish living only in pure brine; Rambam: pure fish establishes brine; sealed barrel one suffices; open two; many open barrels — one kulyatis permits all; verse hint "who gives pure from impure" — kulyatis.'],
    [/קרבי דגים/, 'Fish innards — Tur: signs permit buying from anyone; Beit Yosef challenged; Tur holds signs not clear; Darkei Moshe and Derishah: fish unlike eggs — uncommon impure resembling pure; signs permit embryos when no visible impurity on fish; whole vs crushed; non-Jew believed saying "from certain fish" when recognized; Rambam path different — see lengthy Tur discussion.'],
    [/אני מלחתים/, 'I salted them — Rashba; whole with visible signs; same as "certain fowl we recognize" (siman 86); Rama\'s extra "I salted them" not higher than "certain fowl" — Beit Yosef.'],
    [/שהוחזק בכשרות/, 'Established in kashrut — careful not to err; expert in Gemara.'],
    [/שיהיו אדומים/, 'They should be red — Beit Yosef: ancients investigated — no impure species among red eggs.'],
    [/דרך בית הרעי/, 'Through digestive tract, etc. — Rashi: if in womb all forbid lest impure spawned; we do not write womb prohibition — majority spawn in species; fish in fish out.'],
    [/דג טמא שנמצא/, 'Impure fish found, etc. — Rosh wondered Ahilot — digested in three days; fish until falls in fire; distinguish impurity and prohibition; R\' Moshe: chewed vs swallowed whole; Tur: pure swallowed impure forbidden — not digested while whole; Ahilot comparison; wheat in crop on Pesach.'],
  ];
  for (const [re, out] of maps) {
    if (re.test(t)) return out;
  }
  return applyPhrases(t);
}

function translatePeleti(heb) {
  const fishTopic = /קשקשת|כולכית|ציר דגים/.test(heb) && !/שרצים|תולעים|חריצים/.test(heb);
  if (heb.length > 800 && fishTopic) {
    return `Peleti on fish signs, salted fish, head and spine, kulyatis, innards, eggs, and digestion — see Hebrew for full discussion; main conclusions: fish signs according to Rambam are rabbinic safek; whole fish without visible scales forbidden; salted pieces with scales permitted; head and spine when salted and broad head permitted; brine rabbinic; kulyatis establishes brine per Rambam; innards need "I salted them" per Rambam unlike other poskim; non-Jew not believed for "I salted them"; red eggs permitted, black forbidden; pure fish in impure fish permitted even in womb per majority; impure in pure forbidden if whole — not digested.`;
  }
  if (heb.length > 400) {
    return applyPhrases(heb);
  }
  const short = heb.slice(0, 300)
    .replace(/כל שיש לו קשקשת/, 'Whoever has scales')
    .replace(/רמב"ם/, 'Rambam')
    .replace(/מלקות/, 'lashes')
    .replace(/סנפיר/, 'fin')
    .replace(/קשקשת/, 'scales');
  return `${short} (Peleti).`;
}

function translateKaf(heb) {
  const n = heb.match(/^\(([א-ת])\)/)?.[1];
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9', י: '10' }[n] || '';
  if (heb.includes('סימני דגים מפורשים')) {
    return `(${ord}) [Seif 1] Signs of fish are explicit in the Torah — whoever has fin and scales is pure. Women not believed for clarifying small fish mixed with tereifot — Maharshal Chullin siman 2; Mahari Weil siman 193 Pesach; from his words: if prohibition established certainly impure, women believed; Knesset HaGedolah; siman 127 seif 3 hagahah.`;
  }
  if (heb.includes('ודוקא שהם נקלפין')) {
    return `(${ord}) There hagahah: specifically peelable by hand or utensil — clear; Ramban; Beit Yosef; all agree; Zivchei Tzedek section 2.`;
  }
  if (heb.includes('ואפי\' אין לו אלא סנפיר')) {
    return `(${ord}) There: even one fin and one scale permitted; hagahah: some permit single scale only under cheek, tail, or fin — Rosh, Tur, Yesh Omrim; Mechaber permits anywhere attached; unknown species possibly attached scales — forbidden; many scales — no concern; Peri Chadash; Kereti; Shafan Dam; Machberet; Zivchei Tzedek section 1.`;
  }
  if (heb.includes('יש מיני דגים')) {
    return `(${ord}) [Seif 2] Species with very thin unrecognizable scales — wrap in garment or water — permitted; hold against sun — see scales — permitted; Shach s.k. 2; Peri Chadash section 3; Likutei Halachot; Kereti; Chochmat Adam 36:11; Beit Yitzchak; Mekor Chaim section 4; Arukh HaShulchan section 15; only after peeling by hand or utensil — Bach; Knesset HaGedolah; Zivchei Tzedek section 4.`;
  }
  if (heb.includes('כל שיש לו קשקשת יש לו סנפיר')) {
    return `(${ord}) [Seif 3] Whoever has scales has a fin — Torah wrote fin because "to expand Torah and glorify"; Niddah 51b; Taz s.k. 2; Shach s.k. 3; scales are clothing — Niddah.`;
  }
  if (heb.includes('לפיכך מצא חתיכת')) {
    return `(${ord}) There: piece with scales — whole fish cannot have scales without fin — Taz s.k. 3; Peri Chadash section 4; Mishbetzot Zahav section 2; Machberet section 8; general rule absolute — unlike Kereti section 3.`;
  }
  if (heb.includes('גם כלל זה')) {
    return `(${ord}) This rule applies to all sea creatures with limbs — not like Maadanei Melech — Peri Chadash; Kereti; Shafan Dam; Machberet section 9; Zivchei Tzedek section 6.`;
  }
  if (heb.includes('מין קארפי"ן')) {
    return `(${ord}) Species called carp — covered with thin skin, scales in chambers — peel only with knife — permitted; Vilna rabbis agreed; Beit Yehudah; Peri Chadash; Likutei Halachot; Machberet section 2; Beit Yitzchak; Mishbetzot Zahav; Machberet section 2; Zivchei Tzedek section 7.`;
  }
  if (heb.includes('בעל החרב')) {
    return `(${ord}) Custom to eat swordfish without scales — sheds scales in anger; minister asked Rav Moshe Teitelbaum — demonstrated with black cloth in net — Knesset HaGedolah; Shafan Dam section 2; Machberet section 3; Zivchei Tzedek section 8.`;
  }
  if (heb.includes('אוהל מועד')) {
    return `(${ord}) Ohel Moed: sturgeon permitted — some forbid; Ramban soaked in boiling water — scales remain; R' Tam permits; Beit Din Peri Chadash section 26; responsum Avraham Menachem Cohen Porto in Pachad Yitzchak; two types sturgeon; practice varies by city — Machberet section 4; Zivchei Tzedek section 9.`;
  }
  return `(${ord}) ${heb.slice(0, 150)} (Kaf HaChayim).`;
}

function buildFromInventory(siman) {
  const inv = JSON.parse(fs.readFileSync(path.join(DIR, `_inventory-siman-${siman}.json`), 'utf8'));
  const out = {};
  for (const [slug, blocks] of Object.entries(inv)) {
    out[slug] = {};
    for (const [key, heb] of Object.entries(blocks)) {
      if (slug === 'baer-heitev' && siman === '084') out[slug][key] = translateBaer084(heb);
      else if (slug === 'beer-hagolah') out[slug][key] = translateBeer(heb);
      else if (slug === 'beur-hagra') out[slug][key] = translateGra(heb);
      else if (slug === 'kereti') out[slug][key] = translateKereti(heb);
      else if (slug === 'siftei-kohen') out[slug][key] = translateSifteiKohen(heb);
      else if (slug === 'turei-zahav') out[slug][key] = translateTaz(heb);
      else if (slug === 'peleti') out[slug][key] = translatePeleti(heb);
      else if (slug === 'kaf-hachayim') out[slug][key] = translateKaf(heb);
      else out[slug][key] = applyPhrases(stripBold(heb));
    }
  }
  return out;
}

const siman = process.argv[2] || '083';
if (siman === '083') {
  const manual = { ...T083P1, ...T083P2 };
  const gen = buildFromInventory('083');
  const merged = {};
  for (const slug of new Set([...Object.keys(manual), ...Object.keys(gen)])) {
    merged[slug] = { ...(gen[slug] || {}), ...(manual[slug] || {}) };
  }
  function esc(s) {
    return '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
  }
  function serialize(obj, indent = 2) {
    const sp = ' '.repeat(indent);
    const lines = ['{'];
    for (const [slug, map] of Object.entries(obj)) {
      lines.push(`${sp}${JSON.stringify(slug)}: {`);
      for (const [k, v] of Object.entries(map)) {
        lines.push(`${sp}  ${JSON.stringify(k)}: ${esc(v)},`);
      }
      lines.push(`${sp}},`);
    }
    lines.push('}');
    return lines.join('\n');
  }
  const outPath = path.join(DIR, '_patch-siman-083-translations-p3.mjs');
  fs.writeFileSync(
    outPath,
    `/** Siman 083 translations part 3 — generated slugs */\nexport const TRANSLATIONS_P3 = ${serialize(merged)};\n`,
  );
  console.log('Wrote', outPath, Object.values(merged).reduce((a, m) => a + Object.keys(m).length, 0), 'blocks');
}

if (siman === '084') {
  const gen = buildFromInventory('084');
  function esc(s) {
    return '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
  }
  function serialize(obj, indent = 2) {
    const sp = ' '.repeat(indent);
    const lines = ['{'];
    for (const [slug, map] of Object.entries(obj)) {
      lines.push(`${sp}${JSON.stringify(slug)}: {`);
      for (const [k, v] of Object.entries(map)) {
        lines.push(`${sp}  ${JSON.stringify(k)}: ${esc(v)},`);
      }
      lines.push(`${sp}},`);
    }
    lines.push('}');
    return lines.join('\n');
  }
  const outPath = path.join(DIR, '_patch-siman-084-translations-p2.mjs');
  fs.writeFileSync(
    outPath,
    `/** Siman 084 translations part 2 — generated slugs */\nexport const TRANSLATIONS_P2 = ${serialize(gen)};\n`,
  );
  console.log('Wrote', outPath, Object.values(gen).reduce((a, m) => a + Object.keys(m).length, 0), 'blocks');
}
