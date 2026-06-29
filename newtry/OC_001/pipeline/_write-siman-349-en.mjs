#!/usr/bin/env node
import fs from "fs";
function esc(s) { return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`"); }
function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(name, lines.join("\n") + "\n", "utf8");
}

const bh = {
  "1:א": `Four amot — confined: his body three amot and an amah to spread hands and feet (Avodat HaGershuni).`,
  "1:ב": `With his amah — that is the forearm.`,
  "1:ג": `Small — and he is large, so four amot do not suffice.`,
  "3:א": `To his fellow — specifically within reshut ha-rabbim, reshut ha-yachid, or karmelit; but from karmelit to reshut ha-yachid or the reverse — certainly forbidden (Yad Aharon; Taz: this only helps moving outside four amot in reshut ha-rabbim or karmelit, not reshut ha-yachid to karmelit). I protested communities carrying a Torah via the street (karmelit) by passing under four amot — prohibition remains house to street; via gentile — forbidden (mitzvah through transgression). For milah: gentile may take child from house; then Israelites move less than four amot; gentile brings to synagogue from karmelit to reshut ha-yachid (Magen Avraham siman 331; Eben HaOzer remedy).`,
  "3:ב": `Outside his boundary — ownerless objects permitted, siman 401.`,
  "5:_": `To carry — standing within four amot fixing a load is like walking and liable unless resting (Magen Avraham; Avodat HaGershuni siman 104; Yad Aharon siman 347).`,
};

const beer = {
  "1:א": `Plain from Eruvin 48`,
  "1:ב": `There in Gemara conclusion`,
  "2:א": `There as Rashi and Tosafos and Rosh per Rabbenu Tam and Rambam chapter 12`,
  "2:ב": `Likewise there in Raavad`,
  "3:א": `Mishnah there 55 and like R' Yehuda — Rambam chapter 3 Laws of Shabbat`,
  "3:ב": `Likewise Raavad and Razah and Rosh in his name`,
  "3:ג": `Rif per Razah; likewise chapter 12 in Ramban`,
  "4:_": `Mishnah there 45`,
  "5:א": `R' Yehuda in Chullin in Mar Shalom; all from thorn in reshut ha-rabbim Shabbat 42 and sheaves there 173`,
  "5:ב": `Tosafos and Mordechai in chapter 3 of Eruvin`,
};

const gra = {
  "1:א": `Seif 1 every person — excluding Raavad who wrote only for going outside techum; disputed from chapter 8 "one stands in reshut ha-yachid" provided he not take outside four amot; Gemara 8a permits moving reshut ha-rabbim to reshut ha-rabbim within four amot; Raavad strained pit sugya for ten amot there; standing sugya for above ten only with two exemptions, still liable outside four amot.`,
  "1:ב": `Average etc. — there 4b.`,
  "2:א": `Seif 2 four amot — as Rashi; not so for Rashi only in passing impossible corners; here square four amot; Rambam; Rashi Mishnah 45a; Rabbenu Tam as Tur; nevertheless Rashi etc.`,
  "2:ב": `And some — Maggid Mishneh reason from "not liable until"; for prohibition no diagonal needed; I say dispute is walking; certainly for moving; especially his view like R' Yehuda siman 396; walking certainly without diagonal as 2b Baal HaMaor.`,
  "3:א": `Seif 3 permitted — even rabbis do not argue R' Yehuda except outside techum; Rav Ashi too siman 46a.`,
  "3:ב": `Provided — rabbis: even R' Yehuda only ownerless; as written; R' Yehuda unnecessary.`,
  "3:ג": `And some — halacha not like them but first Tanna; tefillin too forbidden; see 32 in field no eruv; R' Yehuda from 32 in field.`,
  "4:_": `Seif 4 such as between — such as between; all per R' Chaim and Rashi.`,
  "5:א": `Seif 5 forbidden — Shabbat 17b and Rashi s.v. places; Avodat HaGershuni; Mishnah Berurah 1; only for one who darkened; no gentile; Motzei Tefillin.`,
  "5:ב": `Even twilight — Eruvin 34a; Tosafos s.v. why; R' Yehuda first view; tower; Rashi first view s.v. no; Rashi explicitly below ten; one view s.v. and he.`,
};

const mb = {
  "1:א": `(1) Every person — "a man under him": sitting measure of body; Chazal: three amot plus amah to spread limbs; may move within this measure.`,
  "1:ב": `(2) Four amot — confined (Magen Avraham); measure tightly; see s.k. 6 diagonal.`,
  "1:ג": `(3) With his amah — if very tall, measure with his forearm; his four amot larger than others.`,
  "1:ד": `(4) Small amah — average body, short forearm; Torah "under him" gives average four amot.`,
  "1:ה": `(5) Siman 396 — for techum spread amot; here reshut ha-rabbim moving — confined only.`,
  "2:א": `(6) They and diagonal — liable only if moved diagonal measure; not world diagonal; not east-west square without diagonal measure.`,
  "2:ב": `(7) Some say — Acharonim agree.`,
  "2:ג": `(8) From four until five and three-fifths — less than four permitted l'chatchila even this view.`,
  "2:ד": `(9) Exempt forbidden — Rambam; Gra: designated four may use diagonal up to 5.33; no diagonal or no designation — only four straight; passing four amot diagonal: liable only if uproot-to-place span exceeds measure; partial object in measure — exempt.`,
  "3:א": `(10) Permitted — many people each under four amot — no concern combined transport.`,
  "3:ב": `(11) Provided not outside boundary — not beyond owner's dwelling acquisition; ownerless: no acquisition, carry freely; Acharonim: no intent to acquire by lifting.`,
  "3:ג": `(12) Some forbid — even permitted cases (darkened road siman 266; Motzei Tefillin siman 301) — degradation of Shabbat.`,
  "3:ד": `(13) See siman 301 — Mechaber lenient; respect strict view; passing many helps only within reshut ha-rabbim/karmelit, not reshut ha-yachid to karmelit; communities carrying Torah via street — forbidden; Taz: even gentile from house forbidden; milah siman 331 MB s.k. 20.`,
  "4:א": `(14) Two people — each food at start of four amot, six amot apart; middle two amot of each overlap — eat in overlap.`,
  "4:ב": `(15) Middle swallowed — middle at center of eight; four amot swallowed in each outer; permitted with each outer; outers forbidden together.`,
  "5:א": `(16) Forbidden carry less than four — lest come to four at once unintentionally (exceptions siman 266, 301, 308).`,
  "5:ב": `(17) Less less — standing to rest between counts; fixing load within four like walking four at once — liable.`,
  "5:ג": `(18) Even twilight — rabbinic doubt lenient elsewhere; here stricter near d'oraisa.`,
  "5:ד": `(19) Even karmelit — lest come to four at once (Taz); Gra: shvus in reshut ha-rabbim applies to karmelit; twilight leniency only mitzvah/pressure.`,
};

const ma = {
  "1:א": `Four amot confined — Rabbenu Yehuda and Rambam: body three amot and amah to spread.`,
  "1:ב": `His amah — forearm.`,
  "1:ג": `Small amah — large person lacks four if measured by short forearm.`,
  "3:_": `Outside boundary — ownerless permitted siman 401.`,
  "4:_": `Six amot — per Rama siman 396 center measure; need three amot between.`,
  "5:_": `Forbidden to carry — fixing load within four like walking unless resting.`,
};

const mh = {
  "1:_": `(s.k. 1) Four amot confined — Rabbenu Yehuda/Rambam; Rama siman 396 spread — here confined; Eruvin 40 dispute; halacha R' Yehuda; Rambam two amot body plus amah; Rabbenu Yehuda wondered why Rambam cites R' Meir; explains R' Meir confined, R' Yehuda spread; tefachim from sweat — four amot confined like R' Meir; Rambam silent to be stringent.`,
  "4:_": `(s.k. 4) Outside — ownerless: no owners' feet limit; no acquisition — carry freely; Tosafot Shabbat: no intent to acquire.`,
  "5:_": `(s.k. 5) Some say — if four amot choosable direction (Rama), six amot gives two amot overlap; Rama center four amot — three amot gap — middle amah both may move.`,
};

const er = {
  "1:_": `[1] Has four amot — see siman 396 spread; Bach here stringent; Magen Avraham silent confined — incline stringent passing; siman 396 techum spread supports; Beit Yosef: Rambam confined; Bach: should explain if spread.`,
  "2:_": `[2] [Levush] large limbs — Tur; unclear if large limbs vs small limbs and large body; Gemara/Tur siman 396 "abundant in limbs" Rashi large limbs small body.`,
  "3:_": `[3] [Levush] some say — Bach and Nachalat Tzvi agree.`,
  "4:_": `[4] And give — only moving within four in reshut ha-rabbim/karmelit, not reshut ha-yachid to karmelit; Rashbash responsum 51; Taz communities Torah via passing — forbidden; mitzvah through transgression; milah gentile from house; siman 331 s.k. 5.`,
  "5:_": `[5] Many milin — ownerless; siman 401.`,
};

const kaf = {
  "1:_": `(1) [Seif 1] every person — "under him" three amot and amah (R' Meir/R' Yehuda Eruvin); Rashi: R' Yehuda spread, R' Meir large; Rif/Rosh opposite; halacha R' Yehuda; Tur; Shulchan Aruch like Rambam confined; Magen Avraham; Tosafot Orach 1 like Tur; R' Zalman Orach 1 confined; Chayei Adam 53:18; Acharonim; see s.k. 7.`,
  "2:_": `(2) may move — take here place here within four; not carry outside even with intermittent rest.`,
  "3:_": `(3) his amah — Og king of Bashan; Gemara.`,
  "4:_": `(4) his amah — large by size, small by forearm; R' Zalman 1; forearm to long finger; Rashi.`,
  "5:_": `(5) his amah — forearm (Magen Avraham s.k. 2); elbow to long finger; R' Zalman 1.`,
};

const biur = {
  "2:א": `They and diagonal — even world-square rule applies; Rabbenu Tam; Mechaber like him; Rashba difference; Tosafos/Rosh doubt; Mechaber follows; Rambam/Rashi/Rashba/Ritva agree.`,
  "2:ב": `From four amot — Rambam implies four straight permitted l'chatchila; why decree straight lest diagonal?`,
  "3:א": `Give to fellow — Taz: forbidden Torah scroll reshut ha-yachid to karmelit even gentile mitzvah through transgression; shvus for mitzvah; Taz siman 347 end only unjoined courtyard not karmelit; Acharonim permit karmelit too.`,
  "3:ב": `Fellow to fellow — many people each under four; Peri Megadim 266: even two chain; perhaps still gzeirah less than four unless darkened road.`,
  "5:א": `Even twilight — Beit Yosef from Tosafot Eruvin; Tosafos/Rosh forbid twilight — this uproots-that-places heavier than karmelit; Rashi twilight permit less-than-four; Gra karmelit shvus applies; Taz/Acharonim lenient twilight; Gra forbid except mitzvah; Motzei Tefillin harder; Taz 266 only moving not domain transfer; study.`,
  "5:ב": `Even karmelit — Acharonim question Shulchan Aruch; Kol Bo not about pausing walker; Taz: like twilight lest four at once; Gra shvus reshut ha-rabbim applies karmelit; Rashi twilight permit; Ritva Motzei mitzvah; perhaps shvus deshvus mitzvah; study.`,
};

const pm = {
  "1:א": `Even Taz — corrected much; street carrying — Rashi Shabbat 127a Motzei mitzvah less than four karmelit; Rabbi himself; not two uproot-place; Motzei mitzvah permits; Eben HaOzer this siman.`,
  "1:ב": `Mechaber s.k. 1-3 unclear; Rambam/Tur diagonal dispute; passing four; square not full four at once; Rambam "under him" asmakhta techum rabbinic; may walk more, extend hand/tool, move within four; rabbinic forbid outside four.`,
  "1:ג": `Not stand reshut ha-yachid move reshut ha-rabbim unneeded — Ramban lenient; see siman 306.`,
};

const taz = {
  "5:_": `Even karmelit — Beit Yosef from Kirah thorn less than four; Rashi to side reshut ha-rabbim rabbinic; side like karmelit 361; Eruvin 34a twilight decree; Taz/Between Hashemashot/karmelit lenient; teratret leteivat; s.k. 3 chain permitted; only within four reshut ha-rabbim/karmelit not reshut ha-yachid to karmelit; Rashbash 51; communities Torah — forbidden; milah gentile; may God atone.`,
};

const small = {
  "chatam-sofer:1:_": `Taz s.k. 1 protested street Torah — Rashi Shabbat 127a Motzei mitzvah less than four karmelit; not two people uproot-place; Eben HaOzer.`,
  "rabbi-akiva-eiger:1:_": `Seif 5 even karmelit — Teshuvot Tzitz Eliezer 2:81; moving unjoined alley less than four forbidden; Rashi Shabbat 127 Motzei mitzvah karmelit l'chatchila; Eben HaOzor beginning.`,
  "rabbi-akiva-eiger:2:_": `Eben HaOzor beginning — like Rashi Shabbat 127.`,
  "rabbi-akiva-eiger:3:_": `There further remedy — ship nine deep karmelit; Magen Avraham 255:10; Chayei Adam: Rashi vessels in karmelit; Tosafot Shabbat 5a below ten; vessel null to karmelit; makom patur view; Eben HaOzor vessels makom patur; Chayei Adam vessel reshut ha-yachid makom patur; Rashi ship standing karmelit.`,
  "rabbi-akiva-eiger:4:_": `Beer HaGolah end — Avodat HaGershuni 124; Taz 37 s.k. 12.`,
};

emit(bh, "bh349-en.mjs");
emit(beer, "beer349-en.mjs");
emit(gra, "gra349-en.mjs");
emit(mb, "mb349-en.mjs");
emit(ma, "ma349-en.mjs");
emit(mh, "mh349-en.mjs");
emit(er, "er349-en.mjs");
emit(kaf, "kaf349-en.mjs");
emit(biur, "biur349-en.mjs");
emit(pm, "pm349-en.mjs");
emit(taz, "taz349-en.mjs");
emit(small, "small349-en.mjs");
console.log("349 en files written");
