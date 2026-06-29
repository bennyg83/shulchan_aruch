#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`biur-halacha:2:_`, `Everything one delights in — see Mishna Berurah; many Acharonim likewise explained; Tur concludes "and permitted to see"; Beit Yosef wrote these two words are superfluous, therefore Shulchan Aruch omitted them; Sefer Chemed Moshe reconciled: meaning specifically something one delights in and permitted to see, to exclude something forbidden to see such as going to theaters, etc., forbidden even on Shabbat to go and see, for certainly forbidden matter was not permitted because of oneg Shabbat.`],
  [`biur-halacha:3:א`, `Even if it is wide — from this language implies all the more if the water is actually short, permitted to jump; I do not know the reason, for in seif 2 he wrote jumping is forbidden; perhaps when water is deep, since sometimes one falls inside an amah, they permitted jumping in all cases, and this is like Gemara conclusion: since impossible otherwise, it is considered that all are in the category of impossible.`],
  [
    `biur-halacha:3:ב`,
    `To receive his teacher's face, etc. — see Magen Avraham who distinguishes foot for Shabbat — only mitzvah — and foot for Yom Tov — obligation; he greatly forces the sugya; see siman 554; in Perishah before us reshut ha-rabbim Taz explains explicitly Gemara reads: if distant, not obligated except on foot; if near, obligated even in month and Shabbat see there; Ritva more explicit: R' Yitzchak took latter end, truth of kabbalah is according to closeness to his rabbi — if in city obligated daily, not sufficient otherwise; if outside city nearby once a week or month — Shunamit case; if far place, see once on foot at least see there at length.`,
  ],
  [`biur-halacha:4:_`, `Can pass through it — meaning even when clothed and even up to his neck in water [Gemara there], specifically where water does not flow strongly. Gezeirah shavah.`],
  [
    `biur-halacha:7:א`,
    `Everything that goes out, etc. — general rules of carrying from this siman and siman 303: something neither clothing nor ornament is called burden, forbidden d'oraisa, intentional kares, unintentional chatas, if he took it out as weekday carrying way; if not weekday carrying way, called kele'achar yad, exempt but d'rabbanan forbidden; clothing or ornament permitted d'oraisa, but several things Chazal forbade: some lest remove and show and come to carry d'oraisa in reshut ha-rabbim [though dispute if remove-and-show applies to man, seif 9]; some because healing and lest slip off and come to carry; some lest mock and come to remove and carry; some maris ayin; some for women because things intervene in immersion, worry lest obligatory immersion arise and she remove and later come to carry; things not made full clothing only to save filth, such as placing cloth on scarf against rain, called burden; but full clothing even to save from rain is clothing not burden. Know also finished ornament carried in hand is burden and way of carrying out, liable — gleaned from Tosefta Shabbat and other places.`,
  ],
  [
    `biur-halacha:7:ב`,
    `In one that has no wound — see Mishna Berurah reason; this is Chiyya bar Rav in Gemara; Rav Huna holds opposite, goes out specifically in one with wound see there his reason; Mechaber follows Rabbeinu Chananel, Rif, Rambam, Rosh as Chiyya bar Rav; Razah and Maharam ruled as Rav Huna, brought Shulchan Aruch HaRav in name of Levush Yom Tov, Gra brought proof from Yerushalmi; many Acharonim agreed [Bach, Taz, Shulchan Aruch HaRav, Mahari Weil] proper to be stringent never go out with one shoe even if wound on that foot or other, better barefoot when cannot wear both [though some stringent not barefoot Shabbat seif 16 here impossible in other matter permitted]. Since we lack full reshut ha-rabbim per many poskim, certainly need not be stricter than Mechaber, for some lenient entirely in karmelis, as below siman 303 seif 8 [Peri Megadim, Gra Zal].`,
  ],
  [
    `biur-halacha:8:א`,
    `He may not go out with needle, etc. — if went out with pierced, liable; this is Maharam brought Beit Yosef; other opinion Rif and Rambam; third opinion Rosh and Tur both exempt man, Mechaber omitted see Tosafot Shantz and Beit Yosef sides Rashi man equals woman pierced and unpierced; Gra sides Rosh and Tur man pierced and unpierced exempt but forbidden; thus unpierced Rif, Rambam, Rashi, Rosh, Tur all exempt; resolves difficulty from seif 12 as Magen Avraham awakened seif 329, his answer not ample as Chemed Moshe and Nehar Shalom and Peri Megadim challenged.`,
  ],
  [
    `biur-halacha:8:ב`,
    `And unpierced exempt — if he needs needle to join garment edges, requires study if permitted for man; see below siman 303 seif 9 woman permitted unpierced needle in place of tying see Magen Avraham reason for wearing, seems same for man; but second opinion man liable unpierced, possibly no leniency, for woman unpierced all exempt, as we do not leniently apply to woman for pierced, so man for unpierced both have chatas liability; can distinguish there no way to leave pierced needle because it slips, not so unpierced perhaps way of wearing, requires study.`,
  ],
  [
    `biur-halacha:9:_`,
    `And if he went out liable — see Beit Yosef in name of Rabbenu Yerucham, agreed: today custom on weekdays ring without seal is ornament category, exempt but forbidden; see below siman 303 seif 8 where Ran's opinion brought in name of some say, for he himself holds like Rabbenu Yerucham above.`,
  ],
  [
    `biur-halacha:11:א`,
    `And some permit silver, etc., but if key, etc., and some wrote, etc. — language implies iron and copper key fixed at belt end as Acharonim explained worse than silver key whom they permit, all the more permit silver key [even fixed middle of belt as Taz explained]; from Taz implies preferable, even stringent there admits here since one body with belt.`,
  ],
  [
    `biur-halacha:11:ב`,
    `In this to permit — regarding carrying watch outside eruv in pocket see Mishna Berurah simpler than "statement in pouch" — ornament hidden in pocket not relevant; Chayei Adam general 56, Zichru Torat Moshe [what some Acharonim mentioned ornament on watch end siman 308, I brought there in Mishna Berurah regarding permitting moving, some stringent also]; even hung on chain on neck with watch exposed, appears forbidden, for essence made to use; everyone who wears it stam intent is use to know time while walking, though also adorns [proof when broken people do not carry]; since took out to use, even if made for ornament, proven Yerushalmi chapter "With what may woman go out" 3 liable chatas: Yerushalmi there made for this and that [ring for seal and ornament], took out to sign liable, for ornament exempt; even expressly for ornament only forbidden first opinion seif 11, viewer says for use; second opinion permits only when evident ornament, for man does not make silver-gold key, unlike watch [also remove-and-show concern even for man, poskim permitting ornament for man because man does not show friend, not so watch customary to show hours and see himself and take in hand and carry d'oraisa, see below seif 329]; even gold chain ornament, watch not batel, more important, as poskim ruled knife sheath and eyeglass case silver, knife and eyeglasses not batel, we do not say eyeglasses for case but case for eyeglasses as Beit Yosef, likewise chain for watch not watch for chain; see Rashba responsum Beit Yosef and Mordechai siman 303; Taz if iron key hangs silver chain permitted per some permissive seif 11 batel ornament, Tosafot Shantz seized this see there; even Taz admits our case there key not important to silver chain like below start 338, but watch certainly important, not less than silk threads below 338 important not batel, all the more here. I expanded to refute one great one who wrote to lenient without reason or proof, wondered he wrote Acharonim forbade and Chacham Tzvi among them yet argued in mere logic; emerges no side to lenient, especially many poskim hold full reshut ha-rabbim nowadays as below siman 345 Mishna Berurah and here, chatas concern, way of carrying; Ketzot HaChoshen also wrote as us, no permit even gold chain, Maharal Alter ruled thus.`,
  ],
  [`biur-halacha:13:_`, `But if she ties it, etc. — without tying does not hold; siman 303 seif 15 explains fluff placed for niddah in that place permitted even without tying there it holds; here without tying does not hold since depends only in front [Magen Avraham and Tosafot Shantz].`],
  [`biur-halacha:16:_`, `That the foot enters in it — meaning though Gemara implies wooden shoe decree lest slip because not tight, that was their time when main tied at shin and foot did not enter; not so ours. Regarding bast sandal per Riva certainly permitted all even those forbidding wood; brought Beit Yosef end siman.`],
  [`biur-halacha:17:א`, `Who cannot walk without cane — if nail at cane head makes dent walking, psik reisha he does not want, requires study if permitted; see Machatzit HaShekel sides permit.`],
  [
    `biur-halacha:17:ב`,
    `But if possible, etc., forbidden — see Mishna Berurah reason is burden; therefore d'oraisa prohibition walking thus in reshut ha-rabbim; Peri Megadim also wanted say initially burden, later brought from Levush only decree lest come carry d'oraisa [without support]; examiner Shabbat 66a conclusion Rava holds elders' cane not for support at all [less than amputee box with receptacle tamei medras because sometimes supports, therefore pure medras, only to resolve sugya, Mordechai brought proof from baraita elders' cane]; later Riva proves no shoe and ornament on cane, Or Zarua wrote explicitly burden.`,
  ],
  [
    `biur-halacha:22:_`,
    `They go out with fluff and sponge — see Mishna Berurah; Shulchan Aruch copied this seif language from Tur; Tur ended thus because they heal, therefore Tosefta per his words old fluff and sponge [see below seif 28 note 23] that heal goes his view something not healing though protects from pain is burden as below seif 28 [Magen Avraham explained] also Tur language; per him baraita deals placed from before Shabbat, not fallen, otherwise forbidden return Shabbat for healing; Rambam: even not healing but prevents wound scratching, permitted, as Gra in commentary this Tosefta also new fluff sponge not healing but prevent scratching, below siman 328 seif 3 permitted go out and return initially Shabbat; Tosefta truly did not conclude fluff sponge if fell not return unlike others, supports Rambam permit even not for healing but prevent pain; baraita includes going out fluff sponge all cases even new not healing, therefore did not conclude not return like others, no healing concern.`,
  ],
  [`biur-halacha:23:א`, `Whose way is to be attached — therefore permitted pockets sewn in garment and kapote hanging from garment covering head in rain.`],
  [
    `biur-halacha:23:ב`,
    `Specifically no bell, etc. — likewise if pair is plugged [so Gra]; Magen Avraham concludes only where needs bell such as children; adults permitted even with bell making sound since no need bell; see siman 305 note 5 Magen Avraham doubts pair sound like musical instrument, 338 forbids; Shulchan Aruch HaRav doubts Magen Avraham; Gra appears agrees Rama see there.`,
  ],
  [`biur-halacha:25:א`, `And healed with it three times — even one person as poskim wrote; we do not say patient's fortune caused as below three amulets one man, more to rely on amulet proof than patient fortune.`],
  [
    `biur-halacha:25:ב`,
    `Such as wrote one spell, etc. — see Mishna Berurah what is expert healer and expert amulet per Shulchan Aruch, Tosafot and Rosh and Riva view, disagreeing Rashi who explains giving three amulet types to three sick people makes man expert all amulets help, per them not expert at all, expert healer only if healed three with one spell, not expert except that spell. Expert amulet per Rashi if spell healed three one disease, spell expert, anyone writes for that illness may go out; they hold only that document healed three, other document with same spell not expert forbidden. Beit Yosef though Semag Semak Terumat HaDeshen hold Rashi, Shulchan Aruch follows Tosafot Rosh Rabbenu Yerucham; found Perishah before us Rav Papa's question explains Rashi, Ran in Chiddushim Rabbenu Yonatan explicitly [see there explains Tosafot difficulty]; Meiri explicitly, Hagahot Asheri Rashi, Darkei Moshe; since Rabbeinu Chananel, Rashi, Rabbenu Yonatan, Semag, Semak, Terumat HaDeshen, Meiri, Hagahot Asheri one view to lenient rabbinic matter no chatas any case per Mishnah, seems rely to lenient in need; Beit Yosef had Rabbenu Chananel and Rabbenu Yonatan before him, should not stam stringent in Shulchan Aruch.`,
  ],
  [`biur-halacha:25:ג`, `Expert healer for this spell, etc. — know Shulchan Aruch view is Tosafot and Rosh as above; per them even if wrote many spells each helping, not expert for other spells not yet strengthened.`],
  [`biur-halacha:25:ד`, `And these documents were strengthened for everyone — do not challenge what difference documents strengthened, for due to expert healer alone also everyone may carry those documents as Mishna Berurah note 91; practical difference if healer lost proof such as wrote this spell three more times ineffective, nevertheless may carry documents already from amulet proof each healed three times, they did not lose proof [Taz in name of Tosafot].`],
  [`biur-halacha:25:ה`, `And specifically they came, etc. — see Biur HaGra what he challenged, remains requires study.`],
  [`biur-halacha:25:ו`, `Not the man — see Mishna Berurah reason patient's fortune caused; though for amulet proof such as one amulet healed one person three times we do not rely on patient fortune there because can rely on amulet, better to rely as above; here on amulet cannot rely except healer or patient fortune, Shulchan Aruch relies more patient fortune, healer not yet expert.`],
  [
    `biur-halacha:30:א`,
    `Permitted to go out in reshut ha-rabbim, etc. — see Mishna Berurah Magen Avraham and Tosafot Shantz from Rashba responsum, deals countries accustomed thus, Nehar Shalom and Shulchan Aruch HaRav; Taz came to novel matter 334: per Rashi and Tur taking folded tallit wrapping around neck permitted all places, interprets thus permitted folded sudar on shoulder below 334, Shulchan Aruch permits here tallit, preferable to his view than 329 see reason; Acharonim did not copy practically, implies disagree; he himself wrote end note 24 Rambam forbids here too, practically stringent [retracted what wrote note 329 end rely lenient, already in Shulchan Aruch HaRav]; therefore did not copy his explanation this seif.`,
  ],
  [
    `biur-halacha:30:ב`,
    `Tallit around neck — see Magen Avraham implies even mitzvah tallit; Peri Megadim awakened prohibition for tzitzit, even if way of wearing, nevertheless not obligated tzitzit this walking, not now body covering, tzitzit burden; can say tzitzit adorn garment, like night permitted walk though not obligated tzitzit then, Magen Avraham siman 13; not like seif 38 intent to complete see there.`,
  ],
  [`biur-halacha:30:ג`, `Even though he places, etc. — see Mishna Berurah Gra; Rama's source per his explanation is Tosafot; per Tosafot explained there permitted only placing one right side on left shoulder, upper front side; placing two right sides on left shoulder is gutter Gemara forbids.`],
  [
    `biur-halacha:31:_`,
    `And folded here and there in hand or on shoulder — see Mishna Berurah; Gra in commentary appears Shulchan Aruch copies Rambam differently: doubled hem raised and held in hand or shoulder, becomes gutter inside, Sages forbade taking out thus when not for modesty, not way of wearing.`,
  ],
  [`biur-halacha:32:_`, `If he needs it — see Mishna Berurah some say fears robbery; apparently per conclusion below permitted loss case take money not way of carrying, why Rama require pierced even taking in hand, is muktzeh stricter than carrying by change? Perhaps Rama here lenient per all, there only per "some permit".`],
  [
    `biur-halacha:34:_`,
    `And if sudar does not cover head and most, etc. — see Mishna Berurah; Taz holds Rambam all cases require cover head and most; in my opinion can distinguish: folded sudar on shoulder cannot be stringent as Taz after many Rishonim permit [see Biur HaGra] according to their time place custom way of wearing; but if spread to wrap body, require most body clothed per country custom, else not way of wearing; Taz himself explained Rashi beginning thus; Rambam two categories: no measure, or has measure but did not cover head and most; therefore does not contradict start seif permitting folded sudar on shoulder.`,
  ],
  [
    `biur-halacha:37:א`,
    `That he sew them, etc., or tie permanent knot — see Taz challenged when hanging by knot not on hand, burden on him, what help tied, certainly not batel to garment, etc.; Gra challenged more, even sewing what help unlike cloth without tzitzit, as 338 and 339; saw Shulchan Aruch HaRav answered since ties well knot looks like long sleeve, no burden, helps; Nehar Shalom and Tosafot Shantz: though knot not batel to sleeve-hands, nevertheless now wearing them way of clothing, only fear lest need remove and bring in hand, since tied even if removes hand won't fall completely, worry lest take in hand hanging on him, not way of carrying, exempt, therefore no decree [though per this even non-permanent knot should permit, no fear take in hand, perhaps fear more than knot as Peri Megadim]; Taz and Gra dislike this answer, hold way of carrying out.`,
  ],
  [`biur-halacha:37:ב`, `Well — and likewise permitted attach with buttons [Shulchan Aruch HaRav].`],
  [`biur-halacha:38:_`, `And his intent on them until he completes — Rishonim explain Gemara "these are important" because intent to complete; many Rishonim explain because mitzvah strings or tekhelet strings per Rashi; practical differences many matters see Nishmas Adam general 56, too long to expand.`],
  [`biur-halacha:41:_`, `Made to protect from sun — seif 40 also deals such hat, else tent concern inapplicable; explicit Rif and Rishonim; teaches here even per those who forbid, concern only lest fall and carry, we forbid only such hat for reason in Mishna Berurah Beit Yosef and Acharonim.`],
  [`biur-halacha:44:א`, `Wears all he can wear — since way of wearing, permitted.`],
  [`biur-halacha:44:ב`, `And removes and returns, etc. — see below siman 334 seif 8 Mechaber brought disputants, here stam; Biur HaGra forced main law is like here.`],
  [`biur-halacha:44:ג`, `And takes out — see below there what we wrote in Mishna Berurah.`],
  [`biur-halacha:45:א`, `And he is not concerned, etc. — careful not shake off water, shaking also included in squeezing, as below siman 302 seif 1.`],
  [
    `biur-halacha:45:ב`,
    `In inner chambers — see Mishna Berurah Tosafot and Rosh; Tosafot chapter Af-al-pi daf 62 s.v. mema'aken; though not decisive, Ran first chapter Yom Tov answered other answer on Tosafot difficulty; Shabbat 65 implies Rav includes all; as Magen Avraham wrote, nevertheless seems rely for law, several poskim [Ran, Geonim, Razah, Terumat HaDeshen] do not hold Rav's view; though for main law Rav cannot rely against Rif, Rambam, Rosh, Semag, Ran all ruled Rav, Beit Yosef; at least rabbinic prohibition can combine lenient views not forbid maris ayin except publicly not in his courtyard.`,
  ],
  [`biur-halacha:46:_`, `Soaked garments, etc. — stam garments implies wool too Peri Megadim; do not say bleaching only linen custom oven bleaching as Mishnah there; cooking prohibition certainly all garments; see siman 302 seif 9 Biur Halacha s.v. permitted.`],
  [
    `biur-halacha:50:_`,
    `Or he went out in them, etc. — see Mishna Berurah: moving permitted even if thought; going out see Beit Yosef depends Rishonim: Rosh and Tosafot permit, Ran, Rabbenu Yonah, Rashba brought Beit Yosef siman 308 forbid, not evident, appears carrying on Shabbat; Gra wrote Rambam likewise; Beit Yosef Tosafot: no need went out one hour from erev Shabbat, likewise if sat in them; Biur HaGra siman 308 note 24 those stringent thought does not help, sitting likewise for carrying.`,
  ],
  [
    `biur-halacha:51:_`,
    `Wrapped on hand — see Mishna Berurah Magen Avraham and Shulchan Aruch HaRav; Chayei Adam copied regarding rags not lenient; Gra wrote per Mechaber previous seif here too require went out one hour from erev Shabbat, so Taz; Gra clarified why Mechaber did not mention detail seif 50: other Rishonim for clothing status for carrying do not require one hour erev Shabbat; Gemara picorin mentioned because otherwise forbidden moving; Mechaber mentioned detail seif 50 copying Rambam Gemara deals carrying, here omitted contradicting himself; certainly do not lenient against Rashi, Rambam, Rabbenu Yonah, Ran, Rashba one view prohibition is carrying, also our case require one hour erev Shabbat; practically requires study after Mechaber stam lenient.`,
  ],
]);

const f = "output/siman_301/biur-halacha/part-001.txt";
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
const missing = blocks
  .map((b) => `${b.slug}:${b.seif}:${b.marker}`)
  .filter((k) => !fixes.has(k));
console.log("Biur Halacha:", fixes.size, "fixes,", missing.length, "missing");
if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}
