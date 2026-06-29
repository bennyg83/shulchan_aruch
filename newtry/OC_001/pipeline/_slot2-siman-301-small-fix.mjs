#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`ateret-zekenim:23:_`, `Permitted to go out, etc. And what youths practice to leniently on Shabbat when they take out handkerchiefs wrapped around their legs to go thus outside towns, thinking this will be way of wearing like those tied around market houses called in foreign language "hose supporters" — appears forbidden; slight proof from that they did not permit in Mishnah even for milah mitzvah to bring a cloak, only wrap rag around finger and bring via courtyard, implies not via karmelis way, not way of wearing; and this is not for mitzvah need; possibly long patshil in long garments somewhat similar to hose supporters more permitted; better they be unintentional, etc.; from end chapter Keilim muleteers bring to bathhouses no proof, for different there, more way of wearing since must cover head and most [Maharshal]. Amulets youths carry on neck though not expert at all, permitted go out in karmelis Shabbat per Maharshal responsum siman 16.`],
  [`shaarei-teshuvah:1:_`, `(Shulchan Aruch seif 7) And it is not way of wearing — Rabbenu Yerucham wrote we consider way of wearing only what is customary to wear on weekdays; he wrote to reconcile places not appearing so see there; see below seif 14 Ateret Zekenim forbids handkerchief tied around leg thinking way of wearing like hose supporters, etc.`],
  [`shaarei-teshuvah:17:_`, `To support himself — Abudraham; see responsum Noda Biyehudah Mahadura Tinyana siman 28: in street with some ice, if place not sloped, not clear from Taz to permit; also on substance of Taz's words Shulchan Aruch HaRav wrote not conclusive; nevertheless one doing so is not called Shabbat desecrator; if eruv city and person's way is thus, permitted, not only honor cane but even plain wooden cane to which ornament does not apply see there.`],
  [`shaarei-teshuvah:18:_`, `With cane — Abudraham; see Magen Avraham note 87 to reconcile Tur "they go out with chair," etc., deals where eruv; see Noda Biyehudah Chayei Adam not so, only reconcile Tur from Chokhmat Binyamin difficulty; Rif and Rambam view on Shabbat inapplicable, where eruv even without many needing it permitted; therefore wrote in walled city with eruv no carrying prohibition, permitted carried in chair called fauteuil borne between two hands even without many needing see there; Noda Biyehudah Mahadura Tinyana siman 28 mentioned above note 17. Shulchan Aruch seif 38 going out with tallit, if tzitzit, see Rif responsum siman 299, Zakan Aharon 334, Radbaz part 4 siman 218 lenient even Shabbat night since weekday clothing way see there; Shaagat Aryeh siman 208 if tzitzit string broke in reshut ha-rabbim and friend sees, must tell him remove, not pushed aside for human dignity; see above siman 13 what is written on this.`],
  [`shaarei-teshuvah:32:_`, `Tent — Abudraham; see Peninei Yehoshua part 1 siman 16 of Gaon Mahar Meir father of Shach regarding britelach, sides at end for leniency because brim slopes and can tighten and not made initially for tent see there; Noda Biyehudah Mahadura Tinyana siman 30 regarding carrying parasol Shabbat, utensil to protect from sun and rain, shades person's head, has handle and hooks and loops to open stretch and close as wished; wrote if set up from erev Shabbat can discuss, not like britelach debated there no tent law only when placed on head, unlike parasol arranged from yesterday, now placing on head does not make new tent, can discuss forbid/permit; since does not know if arranged yesterday, certainly forbid d'rabbanan maris ayin, especially this generation many not Torah scholars (seems: when see one carry Shabbat cannot distinguish arranged yesterday or not, on Shabbat will arrange and come to stoning concern); but if not arranged yesterday and opened Shabbat, makes partitions Shabbat, certainly forbidden; wrote this recently brought our countries, when saw they began lenient even Shabbat protested and preached in synagogue complete prohibition, fear stoning prohibition, since then protest in congregations; end: generally searched all parasol sides, found no permit side see there; Berit Yosef siman 315 in name of letter to David: umbrella made protect heat rain targets forbidden carry Shabbat and Yom Tov, all the more open it; but tell Gentile carry to protect him, permitted; see Sheyurei Berachah there.`],
  [`shaarei-teshuvah:33:_`, `Shulchan Aruch seif 42 one who finds tefillin — see Magen Avraham woman forbidden bring in; see Yad Eliyahu responsum 100 one sage disputes Magen Avraham, he agreed with Magen Avraham; regarding putting on, wrote should intend as ornament see there.`],
  [`chatam-sofer:1:_`, `Be'er HaGolah letter 10: Tur in book deleted. Mishna Berurah: another matter in seif.`],
  [`chatam-sofer:2:_`, `There in Magen Avraham note 27 there is degradation of Shabbat as written siman 522. Mishna Berurah: in Noda Biyehudah siman 11 disputes with correct words.`],
  [`chokhmat-shlomo:1:_`, `Seif 7 everything that goes out in non-ornament — Mishna Berurah: see my compositions Yoreh Deah Mahadura Alef Vav responsum laws of blood siman 66 what I wrote to R' Karitsch in passing whether permitted wear yarmulke in street Shabbat without eruv, fear policeman see must remove and come carry four amot see there, requires study.`],
  [`chokhmat-shlomo:2:_`, `There seif 25 one may not go out in non-expert amulet, if expert may — Mishna Berurah: difficulty from Rambam commentary Mishnayot chapter 8 Yoma wrote only Shabbat concern is natural healing; for going out since ornament permitted; expert amulet for bearer is ornament whether heals or not, therefore permitted; but to feed etc. if not healing, actual Shabbat desecration; Rambam correct all not natural healing do not desecrate Shabbat, simple, requires study.`],
  [`chokhmat-shlomo:3:_`, `There seif 45 one whose garments fell in water, forbidden even inner chambers — Mishna Berurah: great rule wherever Chazal forbade maris ayin, forbidden inner chambers; great difficulty from Menachot 90a Ravina etc. sugya at length Rashi Tosafot chapter Shnei HaLechem; can reconcile with difficulty wrote elsewhere; main seems proof for Ran view in Sefer HaChaim this siman; originally intended: only where fear suspected doing other prohibition he does not do, forbidden inner chambers; but where fear they say this forbidden though actually not, permitted inner chambers, he himself won't do publicly lest suspected see there; clear proof above: suspicion they say this itself forbidden depositing terumah, therefore permitted inner chambers; sweetens Rashi and Tosafot "priests know reason of matter and priests are diligent": without second reason, knowing reason suffices no error fear; per our explanation Rashi means though know reason, since here suspicion prohibition itself they say forbidden, because priests diligent won't do where seen lest say doing prohibition, therefore permitted inner chambers — clear proof, requires study well.`],
  [`eshel-avraham:23:_`, `Whose way — see Tosafot Eretz Yisrael on riza carried Shabbat without sewing only tying in overall; see Beit Shmuel page 102, Kenesset HaGedolah, Bach this siman; that rabbi ignored them, better unintentional (see siman 604, etc.).`],
  [`eshel-avraham:38:_`, `Permitted to go out — even small tallit with proper tzitzit; Maharam was stringent on himself not walk in reshut ha-rabbim, feared lest one tzitzit string break; see Ramban responsum siman 208.`],
  [`yad-ephraim:1:_`, `There note 5 his conclusion for man is pierced, etc., since not his custom no liability like any burden for him; woman liable, etc.; but in what he wrote exempt as long as he did not take out, etc., so it should read.`],
  [`netiv-chayim:1:_`, `(Shulchan Aruch seif 5) And if he went out — Mishna Berurah: Rashi per Maharam Maimonides and Rashba in his chiddush.`],
  [`netiv-chayim:2:_`, `(Magen Avraham note 24) and does not slip — so it should read. Mishna Berurah: "quickly and by itself" means slipping off with hands without untying knot.`],
  [`netiv-chayim:3:_`, `(Magen Avraham note 31) and not as Bach wrote — Mishna Berurah: appears Tur deals sponge not stuck to wound unless via ointment wrapping, Rambam admits permitted; Rambam deals where fluff and sponge anyway stuck on wound, therefore thread and ointment not important to him.`],
  [`netiv-chayim:4:_`, `(Magen Avraham note 45) and what is written siman 303 — Mishna Berurah: refers to challenge from Maharil "but may not take out beyond eruv," implies even when wants hang on daughter's neck though pierced to be like ornament, therefore.`],
  [`netiv-chayim:5:_`, `(Magen Avraham note 51) as Rosh wrote — Mishna Berurah: chapter HaMevi siman 45 as in Eruvin, so it should read.`],
  [`netiv-chayim:6:_`, `(Magen Avraham note 53) if not — Mishna Berurah: see Sifrei page 31 side 4 what I obtained on it.`],
  [`netiv-chayim:7:_`, `(Magen Avraham note 54) and Rashba — Mishna Berurah: page 96 side 2 s.v. lo sevara see there.`],
  [`netiv-chayim:8:_`, `(Magen Avraham note 56) nevertheless question — Mishna Berurah: for me conversely challenges well he said matter even rabbinic prohibition as Rashi there, but we rule only Torah matters.`],
  [`netiv-chayim:9:_`, `(Magen Avraham note 59) meaning in karmelis — Mishna Berurah: if reshut ha-rabbim forbidden l'chatchila to wash, decree lest carry four amot.`],
  [`rabbi-akiva-eiger:1:_`, `Seif 14 in gloss: but forbidden for woman — see Teshuvot Rashdam siman 4.`],
  [`rabbi-akiva-eiger:2:_`, `Seif 15: section missing in Hagahot Maimoniyot chapter 3 laws fasting Yom Kippur 17, permitted go out in bast sandal, etc.; some forbid go out in them to reshut ha-rabbim Shabbat and Yom Kippur because carrying prohibition, etc., not main view end quote; see Machatzit HaShekel siman 614 note 2.`],
  [`rabbi-akiva-eiger:3:_`, `Magen Avraham note 39: he himself also forbidden if man lost proof, then even that sick person forbidden go out, for perhaps we do not rely on sick person but man; so emended in Machatzit HaShekel see there.`],
  [`rabbi-akiva-eiger:4:_`, `Magen Avraham note 41: see seif 22; see above seif 13; requires study.`],
  [`rabbi-akiva-eiger:5:_`, `Seif 33 silver and gold sewn in garment — see below siman 311 seif 8.`],
  [`rabbi-akiva-eiger:6:_`, `Magen Avraham note 46: carrying out and wearing kele'achar yad; all the more nowadays we lack reshut ha-rabbim, wearing.`],
  [`rabbi-akiva-eiger:7:_`, `Taz note 26: walk bareheaded end quote; even on hat only concern where people's way walk reshut ha-rabbim without hat; also our deep hats wind lacks power move and raise from head, no concern — see Mishna Berurah end book general laws.`],
  [`rabbi-akiva-eiger:8:_`, `Seif 42 or give to his fellow — see below siman 348 seif 6.`],
  [`rabbi-akiva-eiger:9:_`, `Magen Avraham note 54: therefore it appears see what he challenged in Shaar HaMelech chapter 19 chapter 3 laws Shabbat.`],
  [`rabbi-akiva-eiger:10:_`, `Seif 44 wrap remove return wear — see below siman 334 seif 8.`],
  [
    `rabbi-akiva-eiger:11:_`,
    `Magen Avraham note 56: and possible Tosafot hold per my humble opinion can say sugyot not divided; why Tosafot challenged 55: why need reason goes to river, why not because burden see there; can say reason river mentioned to forbid even in alley with eruv as Magen Avraham siman 305 note 56; therefore can say appears going to river, and way to river is go with animals to markets streets, d'oraisa prohibition when leads in market reshut ha-rabbim, prohibition resting his animal, pair is burden, therefore say for Rav even courtyard forbidden maris ayin on d'oraisa, even inner chambers forbidden; nevertheless we rule courtyard permitted, for maris ayin we rely on those who hold we lack reshut ha-rabbim now, see below siman 303 seif 8, maris ayin only on rabbinic, inner chambers permitted; precise.`,
  ],
  [`rabbi-akiva-eiger:12:_`, `Seif 46 near fire while wearing them — Tosafot in name of Maharal Prague.`],
  [
    `rabbi-akiva-eiger:13:_`,
    `Magen Avraham note 57: that there is no cooking — nevertheless practical difference: not soaked in hot water, for Hagahot Maimoniyot: because of cooking, no cooking after cooking; and if water now cold but already cooked and cooled, per those who hold even on wet garment no cooking after cooking, but because of bleaching there is, since via heating fire there is general cooking concern, but in this water no cooking after cooking, therefore bleaching applies; likewise gold settings siman 302.`,
  ],
  [`rabbi-akiva-eiger:14:_`, `Seif 49 that he not take them out — see below siman 326 seif 7.`],
]);

const files = [
  "output/siman_301/ateret-zekenim/part-001.txt",
  "output/siman_301/shaarei-teshuvah/part-001.txt",
  "output/siman_301/chatam-sofer/part-001.txt",
  "output/siman_301/chokhmat-shlomo/part-001.txt",
  "output/siman_301/eshel-avraham/part-001.txt",
  "output/siman_301/yad-ephraim/part-001.txt",
  "output/siman_301/netiv-chayim/part-001.txt",
  "output/siman_301/rabbi-akiva-eiger/part-001.txt",
];

let total = 0;
const missing = [];
for (const f of files) {
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = fixes.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      missing.push(key);
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(f, out);
  total += n;
  console.log(f, n, "/", blocks.length);
}
console.log("Total", total, "missing", missing.length);
if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}
