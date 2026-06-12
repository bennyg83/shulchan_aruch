#!/usr/bin/env node
/** Write manual JSON for shorter 087 commentators */
import fs from 'fs';

const gra = {
  '1#א': `That it is not, etc. — there 108:1; and Rashi there 104:2 s.v. matkip, etc.; and all that is by fire is by way of cooking, as written — decree lest it rise; and no question except to exclude pickling, as written end of siman 91; and as written in chapter 3 of Pesachim (44b) and chapter 6 of Nazir.`,
  '1#ב': `But rabbinically, etc. — Rashi in Pesachim there; and as written in Mishnah Chullin 97 regarding setting in skin, etc.; and Tosafot chapter 2 of Avodah Zarah 35a s.v. mipnei, etc.`,
  '1#ג': `All meat, etc. — (Avodah Zarah) there 35b — whether Rav Chisda or, etc.; but Shmuel does not challenge. Mordechai there (see Chidushei R' Akiva Eiger; one may say Mordechai holds as Ramban and Ritva in Avodah Zarah there — the straightforward matter is that stam stomach skin of gentiles is nevelah. And Mordechai there: and some reject — per R' Yitzchak of Mezhirov; and per Tosafot Chullin 97a s.v. hama'amid; Ramban and Ritva in Avodah Zarah there in name of Raavad).`,
  '2#_': `And it is not, etc. — Kiddushin 4a.`,
  '3#א': `And wild animal meat, etc. — as R' Akiva there; Rav Ashi establishes there 104a the Mishnah like him; and Abaye there rejected Rav Yosef's words; and so Gemara 113b: kid even cow and ewe; and Tosafot there 108a s.v. veshavin; and it is taught: wage — for one tanna; Tosafot there 104b; and so Hagahot Maimoniyot; and Tur.`,
  '3#ב': `Permitted, etc. — there 104a: he said forbidden from Torah to cook; and wrote nevertheless he explains the wording is not precise but Scripture's language — meaning to eat; and learned from impure meat or milk — though one may reject there since one is already forbidden in eating; unlike wild animal and fowl; and as they decreed regarding raising — see there; and so 116a: Abaye said fowl, etc.; and R' Yehudah HaChasid said regarding cooking — learn fowl is forbidden from Torah to cook.`,
  '3#ג': `Rabbinically. — as Rav Ashi there; and 116a Abaye, etc.; and in many places.`,
  '3#ד': `They practice almond milk, etc. — Avodat HaTaharah; Peri Chadash.`,
  '4#א': `Forbidden to cook, etc.; and if, etc. — as written siman 66 seif 10 see there.`,
  '4#ב': `And specifically, etc. — as written in the book that preceded.`,
  '5#א': `Even though, etc. — as first tanna.`,
  '5#ב': `But, etc. — since fowl in milk is rabbinic — Beit Yosef; and Orach Chaim in name of R' Yitzchak: permitted without cleansing palate and without noten taam lifgam; and explains tanna of wage: Tosafot there — fowl and afterward cheese; and this is where he was lenient.`,
  '6#א': `Smoked. — Yerushalmi chapter 6 of Nedarim: sages of Caesarea asked whether smoked has Shabbat dish concern or basar b'chalav concern; but chapter 7 of Shabbat there — roaster, fryer, boiler, smoker — all because of cooking; if so also for basar b'chalav. Peri Chadash.`,
  '6#ב': `And cooked, etc. — as in Shabbat 40b and Pesachim 41a.`,
  '6#ג': `Or in milk of dead animal. — statement of Shmuel 113b; not milk of slaughtered.`,
  '6#ד': `Blood in milk. — there and 114a.`,
  '6#ה': `And male milk, etc. — as in chapter 6 of Machshirin: does not water even to prepare seeds; and not like milk-water there 114a.`,
  '6#ו': `But milk, etc. — there 97b; and 111a: milk of slaughtered is rabbinic.`,
  '6#ז': `And milk-water. — chapter 3 Pesachim (43a); chapter 7 (76); chapter 25 (111b, 112a); Tosafot there 114a s.v. hamvashel, etc.`,
  '7#א': `Or skin. — like placenta — verse there 116; all the more skin, as in Avodah Zarah 35b: skin and placenta; skin they boiled; placenta; and like sinews; as in nevelah not in skin; Tosafot 113b s.v. dam, etc.`,
  '7#ב': `And sinews, etc. — 114a.`,
  '10#א': `L'chatchila one should not, etc. — for it is sharp and sour since they set rennet in it. Orach Chaim.`,
  '10#ב': `But b'dieved, etc. — one may rely on poskim that forbid only by salting. There.`,
  '10#ג': `That it was salted. — measure as explained siman 69 seif 18.`,
  '10#ד': `Or it stood. — as in end of siman 105.`,
  '10#ה': `If it is clear, etc. — follows his ruling in siman 69 like Rabbenu Tam.`,
  '10#ו': `And if it was dried, etc. — taste leaving meat becomes excrement when absorbed in stomach — in milk like milk itself; see Mordechai; Tur [Tosafot there s.v. hen; that dried, etc.; and what is written s.v. kan; however where, etc. — per Rashi's text]. Beit Yosef: but R' Yonatan wrote even per Geonim who permit clear, here forbidden since it received meat taste — forbidden in every case; Beit Yosef: l'chatchila stringent; b'dieved rely on lenient; Shulchan Aruch: forbidden to set — l'chatchila; b'dieved permitted per Geonim as he ruled in Beit Yosef.`,
  '10#ז': `And if, etc.; and there is, etc. — Ephraim.`,
  '10#ח': `Stomach skin, etc. — Or Zarua chapter 7 Kilayim mishnah 1 s.v. afilu; and because of seeds, etc.`,
  '11#א': `But one who sets in nevelah skin, etc. — as in hagahah because of, etc.; Avodah HaGefen; chapter 2 Avodah Zarah 35a s.v. mipnei; Tosafot s.v. ve'ata; Ran in name of R' Yitzchak Migash: because of basar b'chalav nullifies in sixty; Rambam chapter 3 Laws of Forbidden Foods 9: they decreed on cheeses, etc.; Ran chapter 8 Chullin: one who sets in stomach skin, etc.; what does it teach — obvious; unless even in thousand not nullified; and as above — way of cooking must impart taste. There.`,
  '11#ב': `And specifically, etc. — chapter 2 Pesachim; chapter 3 Avodah Zarah; chapter 1 Temurah.`,
};

const nekudot = {
  '1#_': `(Siman 87 Taz s.k. 2) And the Sages were not precise, etc. — no question, for nevertheless because of basar b'chalav each stands alone permitted; if so pure milk becomes nevelah because of meat though impure meat, and pure meat becomes nevelah because of milk though impure milk; likewise piece fit to honor guests; however Shach s.k. 3 also brought Beit Yosef's reasons — see there.`,
  '2#_': `(There s.k. 4) And although Rama's words are correct, etc. — this is not as Shach s.k. 7 wrote.`,
  '3#_': `(There s.k. 6) Maharshal, etc. — and wrote on this that all this is strained for law; rather whenever entangled considered meat for all matters; compare to hunter, etc.; see Shach s.k. 9 and s.k. 10 — I expanded in my book and Maharshal's words are astonishing: Sifrei and Maharshal chapter Kol HaBasar siman 2: we read in first chapter of Yom Tov: one who slaughters a chicken and finds complete eggs — permitted to eat in milk; Rosh ruled permitted when yolk completed alone; great leniency; even what Rashba permitted when white also completed — even entangled is strained; also challenge in his words; not a question at all as Shach s.k. 9; also since they ruled like first tanna why distinguish eiver min ha'chai from basar b'chalav; on contrary Rashba entangled as eiver min ha'chai is stringency; here he did not lenient at all ruling like first tanna; also astonishing he himself ruled Beitzah siman 19 even entangled permitted like first tanna; as if his edition attacked him and he forgot sugya — only Rif and Rosh Kol HaBasar wrote first tanna and he decided all by reasoning — end; I wrote briefly in Shach.`,
  '4#_': `And in Yerushalmi ruled explicitly like R' Yaakov, etc. — and so Ra'avyah in Yereim siman 249.`,
  '5#_': `(Shach s.k. 15) He followed Beit Yosef and brings Rashi in Kol HaBasar (Chullin 109a) who holds karet liable; Beit Yosef: Rashi holds that statement is not halachah; appears Rambam's view; from his words appears no halachah like Ze'eira who said blood cooked or salted one does not violate — we find no dissent; in my opinion Rashi and Rambam agree but not for same reason — they hold like conclusion Menachot 21a: here inner sin-offering, there outer; Rashi: Ze'eira does not violate — inner like bulls and goats burned (astonishing how poskim hold blood cooked no violation — per conclusion Ze'eira only inner; outer one violates; may resolve with strain); since Ze'eira is halachah only inner — Rashi and Rambam clear; Tosafot challenge on Rashi in Kol HaBasar and Menachot resolved; also for Rambam and Rashi violation only inner not outer because Merciful One said take and give — if blood left by salting (as siman 69) Rambam and Rashi agree no violation — also outer exempt; whatever unfit for offering no violation; Rambam speaks blood cooked in milk in eye; Rashi: liver is like blood in eye; unlike blood left by salching and cooking — perhaps all poskim agree with Rambam here; thereby Tosafot challenge resolved; therefore poskim hold blood cooked/salted only rabbinic also in this case; thereby my challenge on all poskim resolved — investigate.`,
  '6#_': `(There Taz s.k. 10) It is difficult to me, etc. — no question from several reasons: first, he himself wrote below siman 91 s.k. 7 Ra'osh: anything needing peeling without peeling — all forbidden; Mahari: lenient for Ra'osh — may say disputes here forbidden; Beit Yosef is primary: different since enclosed in stomach and salted inside until placed on fire and boils — like pickling, all forbidden; like salted in vessel and stood until boiling — forbidden even per Ra'osh for all pickled; Beit Yosef here proves his view as I explained; otherwise measure unnecessary — for salting only peel measure; only for salting in vessel to forbid all pickled Ra'osh wrote measure siman 69; certainly as I explained — clear; and one may say Tur and Beit Yosef refer only to standing a full day; Rav in hagahah follows his view we measure all salting in sixty as below siman 105.`,
};

const kaf = {
  '1#_': `(1) [Seif 1] It is written in the Torah 'You shall not cook a kid in its mother's milk' three times — one for prohibition of cooking, one for eating, one for benefit; all forbidden foods one is not liable until eating by way of benefit except basar b'chalav and kilaei hakerem since eating was not stated to forbid without benefit. Rambam chapter 14 Laws of Forbidden Foods law 10. (siman 87; Kaf HaChayim).`,
  '2#_': `(2) There. And even not by way of eating and benefit forbidden; one would receive lashes; if so in other prohibitions except kilaei hakerem — so Rambam there law 11; Peri Megadim in Introduction brought it.`,
  '3#_': `(3) There. And one for benefit. They bury it; its ash forbidden like all forbidden ashes; Rambam chapter 9 law 1: l'chatchila must bury not burn; b'dieved if burned ash forbidden; Peri Chadash siman 94; Rabbenu Tam there 2 Kereti 4; Pithei Teshuvah end seif 2; if despised and forbidden for any benefit; if eaten for medical need without danger — lashes; Rabbenu Tam there; chapter 7: if roasted egg in hot ash or meat/grass of coals — egg and meat forbidden; Zivchei Tzedek end seif 1. (siman 87; Kaf HaChayim).`,
  '4#_': `(4) Food forbidden because basar b'chalav forbidden for benefit; even to give gentile or dog — forbidden for any being that does not benefit; Tosafot general rule 85 law 3; Knesset HaGedolah hagahot Tur; Shulchan Gavoah law 3; Chayei Adam general rule 40 seif 2; therefore practice pour dish in privy — its grave; or river — as burnt; cannot benefit any creature; insufficient to throw in street even without dog; Knesset HaGedolah; Shulchan Gavoah; Chayei Adam; custom Baghdad bury; Zivchei Tzedek end seif 2 — as Rabbenu Tam above seif 3. (siman 87; Kaf HaChayim).`,
  '5#_': `(5) Meat piece that received milk taste and became forbidden fell into vegetable dish; removed and lost; or spilled after removal — if sixty against whole piece — safek stringent; dish forbidden as siman 98: piece fit to honor guests d'oraisa per Bach; even with sixty against all milk whenever meat and milk expel together need sixty against whole piece; R' Meir in Petichah to Bach s.v. chapter 7 meat piece; forbidden in eating but permitted to sell gentile except prohibition value; as written next seif. (siman 87; Kaf HaChayim).`,
  '6#_': `(6) Basar b'chalav forbidden for benefit; afterward mixed in vegetable dish; if noten taam lifgam — permitted sell gentile except prohibition value; all benefit prohibitions mixed — permitted sell except value; R' Meir Petichah; Issur VeHeter general rule 21 law 6. (siman 87; Kaf HaChayim).`,
  '7#_': `(7) There. Meaning not by pickling/salting which is not cooking. Shach s.k. 1; so Shulchan Aruch below siman 91 seif 8.`,
  '8#_': `(8) Measure of cooking: not ben drusai; any meat falling in kli rishon even immediately removed — forbidden eating and benefit though no third cooking; not Peri Chadash seif 3; Peri Megadim Petichah law 3 s.v. benefit; Kereti 3; Zivchei Tzedek 7.`,
  '9#_': `(9) Half measure forbidden eating d'oraisa; doubtful cooking/benefit if half measure d'oraisa; Peri Megadim Petichah law 3; Ephraim seif 2: obvious half measure forbidden benefit d'oraisa like eating; Pithei Teshuvah seif 2 in name of Tzelach Pesachim 22b s.v. veharei eim.`,
  '10#_': `(10) There. But rabbinically forbidden every manner — even pickling/salting forbidden rabbinically eating every manner. Bach.`,
  '11#_': `(11) There hagahah. All basar b'chalav not d'oraisa forbidden for benefit; if forbidden by salting/pickling — not d'oraisa only rabbinic — permitted benefit as below siman 91 seif 8.`,
};

for (const [f, o] of [
  ['_manual-087-gra.json', gra],
  ['_manual-087-nekudot.json', nekudot],
  ['_manual-087-kaf.json', kaf],
]) {
  fs.writeFileSync(f, JSON.stringify(o, null, 2) + '\n');
  console.log('wrote', f, Object.keys(o).length);
}
