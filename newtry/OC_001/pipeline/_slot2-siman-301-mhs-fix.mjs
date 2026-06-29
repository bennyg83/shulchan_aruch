#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`machatzit-hashekel:1:_`, `(s.k. 1) One should not run, etc., even on weekdays, etc. — Maharsha Chiddushei Aggadot 113 asked: what difference between Shabbat and weekday? Answer: on weekday only harm to eyes, no prohibition; on Shabbat added prohibition; practical difference: blind person — nevertheless on Shabbat forbidden.`],
  [`machatzit-hashekel:2:_`, `(s.k. 2) More than an amah — meaning one foot; likewise when two feet follow one another with no air between, that too is surely an amah measure, and surely one amah.`],
  [
    `machatzit-hashekel:3:_`,
    `(s.k. 3) And their running — not like Bach who explained Tur's words "youths who take pleasure" etc.; Tur also "to see" — Rama wrote final "permitted" is superfluous; Bach added first "to see" also superfluous; Bach explains Tur's two rulings differ regarding permission: running forbidden l'chatchila lest one accustom to running for pleasure; if already accustomed, not forbidden on Shabbat lest prohibition of running spoil Shabbat pleasure. Reason for l'chatchila prohibition: weekday youths limit place and run races for money; on Shabbat if seen running, maris ayin he runs to earn as weekdays. Running to see something pleasurable permitted even l'chatchila — no maris ayin, who pays for running to see pleasure. Therefore Tur split two laws. Magen Avraham disagrees, holds even running for pleasure permitted l'chatchila; superfluous "to see" and "permitted" in Tur settled per Magen Avraham s.k. 4.`,
  ],
  [
    `machatzit-hashekel:4:_`,
    `(s.k. 4) And to see — meaning even though forbidden to run, this resolves Tur who split laws: each is different permission — first permits running that delights; end permits seeing portraits if delights; end did not speak of permitting running for seeing; Bach permits running; not like Taz who forbids unless running itself is pleasure; here running not pleasure, only for seeing — running not permitted because not delighting while running; nevertheless per Magen Avraham he concedes to Bach: running for seeing though not delighting in running is permitted, as s.k. 5.`,
  ],
  [
    `machatzit-hashekel:5:_`,
    `(s.k. 5) Permitted — question: he delights in it; apparently what difficulty — not delighting while running, only afterward when exercises and sweats; Magen Avraham holds even not delighting while running; from this difficulty on Tosefta Taz proved must delight while running; Magen Avraham: say deals with case as siman 328 — food healthy people may eat for healing; if walks as usual though to warm and heal, since walking is everyone's way, like healthy food permitted for healing; running not people's way, therefore forbidden for healing.`,
  ],
  [`machatzit-hashekel:6:א`, `(s.k. 6) And forbidden — as Gemara 113b.`],
  [`machatzit-hashekel:6:ב`, `What is written siman 613 — Rama on Yom Kippur: wherever permitted pass through water (e.g. greet rabbi) even if could go around, permitted, for less walking preferable — end of his words.`],
  [
    `machatzit-hashekel:7:א`,
    `(s.k. 7) To greet — as derived from Shunammite, Rosh Hashanah 16b: R' Yitzchak obligated greet rabbi on festival — "why go today not new moon nor Shabbat" (Shunammite's husband to Shunammite going to Elisha); implies on new moon and Shabbat must go. Magen Avraham difficulty: opened with festival, concluded new moon and Shabbat; verse also new moon and Shabbat; whence obligation — perhaps mitzvah not obligation; Magen Avraham: means on new moon and Shabbat there is mitzvah; from this R' Yitzchak learns from logic that on festival there is obligation.`,
  ],
  [
    `machatzit-hashekel:7:ב`,
    `See siman 594 s.k. 12 — Magen Avraham there: even weekday mitzvah, Shabbat obligation; proof from Hagigah 5b R' Yaakov of Kfar Hutin greeted rabbi daily; when old, rabbi said do not trouble with greeting walk; he answered who is small among rabbis; thus Shabbat, new moon, festival one matter — unlike precision here. Shunammite's "why" — though daily mitzvah, husband knew she not accustomed greet every day, only new moon and Shabbat.`,
  ],
  [`machatzit-hashekel:8:_`, `(s.k. 8) To guard — partial mitzvah, therefore going permitted; return not permitted, not full mitzvah. Taz other reason: guarding produce cannot permit return lest end from beginning — if return forbidden will not go l'chatchila fearing loss; what if he does not go — nevertheless permitted going.`],
  [`machatzit-hashekel:9:א`, `(s.k. 9) Liable — kares; if warned, stoning; Magen Avraham omitted since we do not judge capital cases now.`],
  [`machatzit-hashekel:9:ב`, `Exempt — meaning even from chatas; melacha machshavah prohibits Torah though no intent for melacha.`],
  [`machatzit-hashekel:9:ג`, `Law of Rosh Hashanah — see siman 345 whether Rosh Hashanah applies now.`],
  [
    `machatzit-hashekel:10:_`,
    `(s.k. 10) In seif even girded — Gemara 63: sages obligate if went out with these, hold burden not ornament; R' Eliezer exempt, ornament; Gemara asked R' Eliezer's reason, answered verse "gird sword on thigh mighty one your splendor" — Scripture called splendor and ornament, there "girded" — main splendor and ornament when girded on waist; R' Eliezer exempt even so; sages obligate even so.`,
  ],
  [
    `machatzit-hashekel:12:א`,
    `(s.k. 12) Because — Talmud: Shabbat not time for tefillin; Shabbat 61a: may not go with tefillin; R' Safra: do not say only per view Shabbat not time for tefillin; even per view Shabbat is time, may not go lest come carry four amos reshut ha-rabbim removing for bathroom. Taz challenged: for us who hold Shabbat not time for tefillin, need not reason "must remove"; Magen Avraham: for tefillin this reason unnecessary; nevertheless true reason stated — practical difference amulet expert permitted though names inside, forbidden unless covered in leather because must remove — see s.k. 14.`,
  ],
  [
    `machatzit-hashekel:12:ב`,
    `Per siman 308 s.k. 64 — we hold Shabbat not time for tefillin as R' Akiva: "and it shall be sign" — we are servants bearing His seal like slave's collar; Shabbat and Yom Tov are themselves sign, need no other sign; may wear tefillin on Shabbat if wishes — therefore for us need reason must remove. R' Safra: do not say only per view Shabbat not time — what difference time or not, still need remove reason. Eruvin 96a: "guard this statute for its season from days to days" — days not nights, days not all days, excludes Shabbat and Yom Tov — R' Yosei HaGlili; R' Akiva: statute only Passover; then baraita R' Akiva: perhaps lay tefillin Shabbat/Yom Tov — "sign for you" — those needing sign excluded, these are sign themselves. Tosafot "days" excludes Shabbat: drasha from "sign on hand" nearby; "from days" excludes some days without tefillin; why exclude Shabbat more than other days — therefore rely on "sign"; then "from days" needed to exclude Shabbat/Yom Tov forbidden lay, though "sign" already excluded; R' Safra: do not say only per view not time — forbidden lay; even per view time, may not go lest carry. We hold R' Akiva, may lay Shabbat — Shulchan Aruch needs remove reason.`,
  ],
  [`machatzit-hashekel:13:_`, `(s.k. 13) In shoe — Olat Tamid wondered omitted woman torn shoe; also omitted siman 303 seif 13.`],
  [`machatzit-hashekel:14:_`, `(s.k. 14) In his garment but in hand — explicit Shabbat 11b: in hand way of carrying out; Rashi 62a s.v. removed kele'achar yad — one who carries out non-ornament carries in hands not as garment; in garment sometimes not way of carrying, explained later.`],
  [`machatzit-hashekel:15:א`, `(s.k. 15) Pierced in Beit Yosef — scribal error in our Beit Yosef already corrected; so per girsa before Bach; see Taz who brought girsa before Bach, also says error there.`],
  [`machatzit-hashekel:15:ב`, `Bach wrote nevertheless — Mishnah beginning "with what woman may not go out": ring without seal, unpierced needle — if went out not liable chatas; 62b: may not go pierced needle or ring with seal — liable; Ulla: reversed for man. Poskim dispute Ulla; all agree Ulla on ring: man opposite woman — without seal liable, with seal exempt. If permitted l'chatchila dispute Rashi/Rabbenu Tam/Rambam: Rashi forbids l'chatchila; R/T/Rambam permit l'chatchila — not forbidden what is ornament lest remove and carry; woman because arrogant; man does not boast jewelry — permitted l'chatchila except ornament for man and woman — woman forbidden, R/T/Rambam forbid man too — not plog, as seif 9; Yerushalmi below s.k. 27. If Ulla also on needle — Rif and followers hold Ulla on needle; therefore man unpierced liable pierced exempt; Rashi Ulla not on needle; Machatzit Hashekel: Rashi man and woman equal on needle — two views in Shulchan Aruch: Rashi/Magen Avraham vs Rif. Woman pierced liable only when placed against forehead — siman 303 seif 9; not in man. Magen Avraham Bach: no one holds man liable pierced — Rif holds Ulla on needle too, man pierced exempt; Rashi/Magen Avraham equal on needle, woman liable only at forehead — not man. Magen Avraham not forced: Rashi/Magen Avraham equal, both exempt unpierced, both liable pierced.`],
  [`machatzit-hashekel:15:ג`, `As Gemara 92a: one carried load on head exempt — not way of carrying; even Hotzla who carry on head weekdays exempt — their practice void; see siman 362.`],
  [`machatzit-hashekel:16:_`, `(s.k. 16) If — lest say man has no way carry ring without seal on finger — therefore "sometimes" etc.`],
  [
    `machatzit-hashekel:17:א`,
    `(s.k. 17) Or forms — Rama per Kelim; Rama: seal protruding; Yoreh Deah 141:1 protruding human form forbidden leave weekdays — Mechaber omitted; there complete human form; face or body alone permitted; animal forms permitted. Magen Avraham brought Rambam to prove forbidden even on pad.`,
  ],
  [
    `machatzit-hashekel:17:ב`,
    `Keys etc. — sheath has law of eyeglass case if silver; if eyeglasses inside, Magen Avraham like silver keys dispute Rama; same sheath for knife — if no knife depends dispute; if knife inside all forbid like eyeglasses in case — Rama all forbid, do not say eyeglasses batel to case; eyeglasses primary — make case for eyeglasses not eyeglasses for case; knife sheath same, forbidden all.`,
  ],
  [`machatzit-hashekel:18:א`, `(s.k. 18) In this — like zankeil/spangen we call.`],
  [`machatzit-hashekel:18:ב`, `Forbidden; Taz: if chain silver, even iron key fixed middle permitted; Sefer Teshuvah disagrees.`],
  [`machatzit-hashekel:19:א`, `(s.k. 19) And if his craft — to show he is craftsman.`],
  [
    `machatzit-hashekel:19:ב`,
    `As seif 8 — craftsman not worse than layman; siman 303 woman liable; Tosafot 11b: R' Meir craftsman by craft exempt; therefore tailor with needle in garment exempt. Tosafot: Mishnah woman pierced liable chatas — R' Meir there full way of carrying; Magen Avraham: woman where way of carrying, tailor where not way — shows and proclaims craft stuck there; R' Meir exempt. Chemed Moshe challenged Magen Avraham — dismiss easily; disputes Magen Avraham on Tosafot intent — Tosafot divide place not man/woman; Taz in Mishnah explanation. My view: Tosafot challenge Mishnah obligation on woman — answer per Taz; Ulla "reversed for man" — Rif on needle, man unpierced liable; Magen Avraham man/woman equal pierced liable (except Bach); must say as Magen Avraham.`,
  ],
  [
    `machatzit-hashekel:21:_`,
    `(s.k. 21) She ties — not like Olat Shabbat; Raba: even not tied, since repulsive will not carry; Olat Shabbat challenged Tur/Shulchan Aruch "if she tied"; Magen Avraham did not see Olat Shabbat siman 303 brought moch law; Tur/Shulchan Aruch even not tied. "If tied" not prohibition but manner of speech: tight moch can stay without tie; apron if not tied falls.`,
  ],
  [`machatzit-hashekel:23:א`, `(s.k. 23) On scarf — even linen pieces, since wrapped as garment permitted; even flax pieces not important to rich women permitted.`],
  [
    `machatzit-hashekel:23:ב`,
    `But to place — Maharil agrees. Responsum Avodat HaGershuni: why not concerned rain stops, cover removed from head/body to show jewelry/clothes, transfers four amos — answer: weekday clothes mostly not boast-worthy, only expensive Shabbat clothes; when removes cover will remember Shabbat and refrain carrying; proof Tosafot first chapter "with what woman" — see there.`,
  ],
  [`machatzit-hashekel:25:א`, `(s.k. 25) And some stringent — Pesachim 51, law: may go in cordwainers' shoes Shabbat, not in Biri.`],
  [
    `machatzit-hashekel:25:ב`,
    `And incident sons of R' Gamliel in cordwainers' shoes in Biri, Gaza governor blinded them, gave slaves, would not say permitted; concludes: R' Chiya things permitted others practiced prohibition — may permit before them only Kutim; Biri not frequent rabbis like Kutim. Hagahot Maimoniyot: perhaps those pantofles are cordwainers' shoes. Magen Avraham "if forgot" not in Hagahot Maimoniyot — so Shiltei Gibborim and Sefer Shiltei — not seen. Sons of R' Gamliel blinded — Rabbenu Tam to Milaan: Biri sons not Torah sons, you are Torah sons (Tosafot 139b); Rome truly must remove; if forgot where custom permit; one may be stringent privately if forgot need not remove — see Peri Chadash Ahavah; incident sons R' Gamliel.`,
  ],
  [`machatzit-hashekel:26:_`, `(s.k. 26) In place — modesty measure; always sell and buy shoes; four like excommunicated to place, one walks barefoot — Eruvin chapter.`],
  [`machatzit-hashekel:27:א`, `(s.k. 27) But — only when impossible; Taz lenient if rain, sloped winter ice frozen place — concern fall, permitted.`],
  [`machatzit-hashekel:27:ב`, `Even R' Eliezer who holds — seif 7 weapons: Magen Avraham s.k. 10 seif deals girded sword; other weapons not girded — spear etc. — R' Eliezer exempt though in hand.`],
  [`machatzit-hashekel:27:ג`, `Only said — Rashi 64b: all rabbinic prohibitions maris ayin lest suspect prohibition — armor, greaves; to whom Rashi — forbidden maris ayin; for sages who obligate R' Eliezer, R' Eliezer admits rabbinic prohibition.`],
  [`machatzit-hashekel:27:ד`, `Tosafot 62: Gemara asks amulet sanctity bathroom; wanted prove no sanctity — how permit expert amulet, ornament, still concern bathroom and carry; answered healing though in hands. Rashi: though in hands, ornament since heals — even carries four amos not liable. Stipulation R' Oshaya: provided not hold and transfer four amos — Rashi: not ornament but garment. Tosafot: R' Yehuda perhaps maris ayin like tie amulet in string and ring (61a forbidden maris ayin — looks needs healing not ornament, anxiety of illness); now no d'oraisa concern if carries. R' Yehuda not in hand — even fist no maris ayin, only d'oraisa; Tosafot considered amulet in hand ornament like garment, heals in hand.`],
  [
    `machatzit-hashekel:27:ה`,
    `Nevertheless compared to tie in string and ring — not divide: string/ring some maris ayin, amulet not usual in string/ring; here amulet in hand maris ayin. Explanation: d'oraisa forbidden amulet in hand; their proof from string/ring remains forbid ornament in hand maris ayin; likewise amulet in leather if not d'oraisa still rabbinic maris ayin; so all ornament in hand forbidden maris ayin — Acharonim challenged in vain.`,
  ],
  [
    `machatzit-hashekel:27:ו`,
    `Yerushalmi R' Gamliel — Beit Yosef: gold key in hand, colleagues rebuked ornament; "made for this and that" — one explanation: for ornament and use like key forbidden both; other: for man and woman, women arrogant lest remove; man forbidden — not plog; as seif 9, 11. Implies ornament permitted in hand — only rebuked key dual use; pure ornament permitted in hand. Magen Avraham proof from jewelry forbidden woman lest remove — not: could reject those not ornament when worn, stick/key ornament even in hand; Yerushalmi proves forbidden even so.`,
  ],
  [
    `machatzit-hashekel:27:ז`,
    `Per Magen Avraham prohibition carrying ornament in hand only maris ayin — why decree remove, rebuke R' Gamliel — decree on decree; Rabbanan established decree on decree often; see Magen Avraham siman 348 s.k. 4. Dual ornament and use — stick both; even if carrying ornament in hand permitted as wearing, dual use forbidden seif 11.`,
  ],
  [`machatzit-hashekel:27:ח`, `Carries only for honor, no Shabbat degradation.`],
  [`machatzit-hashekel:27:ט`, `As siman 522 — Taz Maharshal: no prohibition Yom Tov except reshut ha-rabbim or karmelis like reshut ha-rabbim; unlike Shabbat even outside eruv forbidden; Maharshal: with eruv even Shabbat permitted.`],
  [
    `machatzit-hashekel:27:י`,
    `I explain Tur — resolves Rabbi Yosef challenge: Tur permits Shabbat if many need — whence, Beitzah says only Yom Tov ziluta; Shabbat also carrying prohibition — whence permit? Per Magen Avraham Tur: place without carrying prohibition, only Shabbat degradation; explains Tur when many need.`,
  ],
  [`machatzit-hashekel:29:_`, `(s.k. 29) And chains — lest remove; Rama: no concern, well fastened cannot remove; not burden, like garment.`],
  [`machatzit-hashekel:31:א`, `(s.k. 31) Forbidden — Rambam: do not explain Shulchan Aruch literally forbidden only tie thread or salve on wound; on pad permitted like binding names. Bach truly. Magen Avraham brought Rambam proving forbidden even on pad.`],
  [`machatzit-hashekel:31:ב`, `Implies even on sponge — plural "them"; could mean only wound singular; must mean lint and sponge plural.`],
  [`machatzit-hashekel:32:א`, `(s.k. 32) They are not — per seif 9 R/T/Rambam special man's ornament not woman's — no concern remove; Shulchan Aruch is Gemara words; R/T/Rambam won't argue — spangles not ornament except lone man.`],
  [
    `machatzit-hashekel:32:ב`,
    `Appear like Jewish crown — only kings' sons not laymen in Shas; here deals with minor — "sons" means minors, 66a boys in bindings, Rashi medicine for known illness; challenged why only minors, also adults — Rashi: connected bindings are for illness. "Sons" teaches minors; Magen Avraham s.k. 35 requires minors.`,
  ],
  [`machatzit-hashekel:32:ג`, `Even if carries — like minor eating nevelah, court not commanded restrain.`],
  [
    `machatzit-hashekel:32:ד`,
    `But princes — 67a: princes in spangles, every person permitted; R' Oshaya: R' Shimon all Israel princes; Rashi: poor also look fine, not disgrace, not like crown lest remove. Rava: woven in garment; Tosafot to R' Oshaya: even if laugh, concern stop; Riva Yerushalmi minors — even stop and carry no prohibition; Tosafot challenged: why need R' Shimon all Israel princes if laugh and carry anyway; answer per Magen Avraham father hears and takes; Acharonim challenged Tosafot to R' Oshaya per R' Shimon — Rava still concern stop; Riva minors; we hold Rava woven in garment — why concern stop; Tosafot 58a s.v. what is pair; why Magen Avraham brought Tosafot — Magen Avraham explains his reason woven lest laugh: without woven forbidden lest stop; brought Tosafot even unwoven only stop concern, laugh concern valid.`,
  ],
  [
    `machatzit-hashekel:33:_`,
    `(s.k. 33) His way attached — Magen Avraham unnecessary — Rama already: attached batel to garment not burden; Magen Avraham words are Tosafot 58a: challenged slave in pair woven, seal woven not permitted; answer: seal not ornament to garment, decree woven lest not woven; pair woven all garments as ornament, Rabbanan did not burden remove — Tosafot. Magen Avraham distinguishes here permitted woven vs siman 304 slave seal even woven forbidden decree.`,
  ],
  [
    `machatzit-hashekel:34:_`,
    `(s.k. 34) Attached somewhat — fringe attached somewhat and tied not worse than partial attachment; not batel to belt — belt not important, belt batel to patshil; only regarding garment patshil batel; Taz s.k. 14 beginning siman 308 attach end belt like long belt; Taz tie non-permanent knot; Sefer AR disagrees non-permanent ineffective; Sefer Teshuvah emend Taz must tie permanent knot from erev Shabbat; Taz admits non-permanent does not help.`,
  ],
  [
    `machatzit-hashekel:35:_`,
    `(s.k. 35) And one may not sound — only song sound; Rama siman 338 forbids knock door with ring though not intent to sing — vessel designated therefore forbidden. Here child does not need that sound. Second difficulty on Tur; first difficulty only on Alfasi gloss source of Rama, not Rama himself — Alfasi: whistling to friends like bird permitted; Magen Avraham there: though whistle usually with song, here intent call friend not sing, no act — implies Rama permits; even non-song sound if needs sound forbidden — Alfasi requires song sound; can reject Alfasi forbids non-song only designated vessel, not mouth — see AR. Rama siman 338 gloss: nowadays tap and dance Shabbat though Shas forbids lest fix instrument — not skilled now, no decree; permit Gentile play organ — likewise here lenient nowadays spangles making sound, prohibition only lest fix instrument.`,
  ],
  [
    `machatzit-hashekel:36:א`,
    `(s.k. 36) For every person — do not err "every person" means anyone who wrote this spell may go out; rather even this doctor if wrote same spell in another letter forbidden; all the more another person forbidden — means letter that healed three times permitted for everyone.`,
  ],
  [`machatzit-hashekel:36:ב`, `If writes letter — even first doctor if writes first spell again, forbidden.`],
  [
    `machatzit-hashekel:37:_`,
    `(s.k. 37) Two proofs — not yet established. Tosafot 61b: R' Papa obvious three amulets three people; each amulet healed three times establishes person and amulet; R' Papa asked three amulets one person (one spell three letters healed three people) — amulet surely not established, healed only once; person established? say healed man three times or patient's fortune accepts writing — Rashi: if one amulet healed three times even one person, say amulet established, not patient's fortune (Rama in Machatzit Hashekel: after amulet tested proper making, more reason hang cure on amulet than fortune); but surely hang on person or doctor or patient. Rashba challenged: obvious person and amulet established — how amulet three established when third healed once person established; still not amulet three; if healed twice more, healed three times — how amulet three, hang on doctor not amulet; answered as Magen Avraham; Maharsha: per R' Papa three amulets one person person not established depends patient — two proofs contradict; per three amulets one person person established not patient — still not find amulet three established: cannot heal one man three times without person established; if healed two people two amulets person established — when third heals Shimon once, person established amulet not until third heals Levi. Acharonim: we hold R' Papa question stringently — if healed via three letters one person, doubt person established; in case "person and amulet established" how amulet three — perhaps R' Papa says both established, therefore amulet third not established; Maharsha stringent cannot establish person. My view: if obvious R' Papa person established three letters one person — our case amulet not established as Maharsha; we hold unresolved doubt — can say amulet third established though doubt person; why only person not amulet — perhaps only one established; we don't know which — don't presume expert person or amulet; only if doubt whether established at all like R' Papa patient fortune — stringent. Our case one surely established — equal, both established though more reason amulet; Rashi one amulet three times one person establishes amulet; person doubt fortune — person advantage started before amulet third (Reuven via second on Shimon); we say though person established immediately third heals Shimon, still doubt unresolved — person more side than amulet perhaps R' Papa person established; amulet advantage hang more on amulet than person per Rashi; two sides person started first and perhaps R' Papa not fortune; equal both established; Maharsha agrees our unresolved doubt both established.`,
  ],
  [`machatzit-hashekel:38:_`, `(s.k. 38) Does not depend — practical difference if lost proof: even if amulet not established, permitted this amulet since person established; all the more letter to letter; what lost — if lost etc.`],
  [`machatzit-hashekel:39:א`, `(s.k. 39) Not person — patient's fortune; for amulet proof not on patient explained s.k. 37 Rashi.`],
  [
    `machatzit-hashekel:39:ב`,
    `Therefore he himself forbidden — Acharonim: why forbid that patient? If person established everyone permitted; if only fortune, that patient permitted. Magen Avraham agrees permitted, printing error; if person lost proof even that patient forbidden — perhaps hang on person not patient, proof lost.`,
  ],
  [`machatzit-hashekel:40:_`, `(s.k. 40) Of 20 — unless covered — concern bathroom, must remove; we hold amulet has sanctity, lest carry reshut ha-rabbim as seif 7 tefillin; Gemara 62a.`],
  [`machatzit-hashekel:41:_`, `(s.k. 41) And also — seif 22: all not healing though saves clothes forbidden; why here; seif 22 not permitted if to avoid distress; seif 13 woman tied garment lest menstrual blood distress — permitted.`],
  [
    `machatzit-hashekel:45:א`,
    `(s.k. 45) And may go out — Maharil; some permit; Rama permits pierced even not bundled (not in hand per Magen Avraham this s.k.) — bundled permitted even not pierced; not bundled not pierced Rama forbids; others Maharil permit even not bundled not pierced if not in hand.`,
  ],
  [
    `machatzit-hashekel:45:ב`,
    `As siman 334 s.k. 2 — agitated about money, if not permit comes to d'oraisa; Bach: permit lest come to d'oraisa digging bury; siman 334 seif 9 only mixed courtyard — Maharil holds like lenient who permit even unmixed courtyard, same outside eruv.`,
  ],
  [`machatzit-hashekel:45:ג`, `From Maharil carry at side — in hand even pierced forbidden.`],
  [`machatzit-hashekel:45:ד`, `If not danger — e.g. governor's men searching — then permitted outside eruv, agitated — may shake muktzeh in hand if no other way, siman 334 seif 2.`],
  [
    `machatzit-hashekel:45:ה`,
    `Siman 303 permits go out — if smoothed coin erev Shabbat permitted since dedicated use; thought pierced here also dedication; Magen Avraham pierced here not usual dedication, not permit without danger.`,
  ],
  [`machatzit-hashekel:46:_`, `(s.k. 46) In place — if not sewn forbidden; Taz holds per permissive view even not sewn permitted.`],
  [
    `machatzit-hashekel:49:_`,
    `(s.k. 49) Two garments — siman 23 explained attached batel to garment. Rama: two hats zankeil — Darkhei Moshe: Azriel permits two hats custom weekday small hat on large; I say hat on yarmulke or shlapel — Azriel called small hat, permitted weekday custom; Rama from Azriel; two real zankeil hats surely forbidden, not weekday way.`,
  ],
  [
    `machatzit-hashekel:50:_`,
    `(s.k. 50) Shall sew — lest forget: cannot use needs while wearing gloves, concern remove one glove, carry other hand, forget Shabbat carry; Taz: what helps tying, not batel, if carries four amos prohibition even tied (implies sewn admits batel); Sefer Teshuvah: tying kele'achar yad, only rabbinic, no decree remove lest carry — double decree; still tie permanent knot erev Shabbat; Sefer Teshuvah; in gloves; Taz permits arbel — pull one hand out, arbel remains other hand — see there.`,
  ],
  [
    `machatzit-hashekel:51:א`,
    `(s.k. 51) Hat — Rambam Shabbat 138b R' Shimon son R' Eliezer: siyana permitted — Rashi felt hat; baraita forbidden; answer: this has tefach spread below head forbidden tent; without tefach permitted; if spread tefach in cloak on head — likewise obligated; tight permitted, not tight forbidden. Rabbenu Tam: only lenient without tefach etc., no fall concern; Bach required; Mechaber seif 40 R' Chananel, R' Tam, Rambam 22:14; Rif "except" read "only"; Maharshal brought. Mechaber stam hat hard — Magen Avraham brought Rambam need very hard not stam hats.`,
  ],
  [`machatzit-hashekel:51:ב`, `Siman 315 seif 8 — sloped tent not tent unless roof tefach or within three tefachim of roof; there l'chatchila forbidden; here like kilah siman 315 seif 11 permitted l'chatchila — Magen Avraham reason to distinguish.`],
  [`machatzit-hashekel:51:ג`, `Question: should answer Gemara difficulty "siyana forbidden" — forbidden baraita when has cloak on head with partitions; permitted siyana without cloak on head.`],
  [
    `machatzit-hashekel:51:ד`,
    `Per Rosh end Eruvin abbreviated — Eruvin Rosh only in Beitzah: Eruvin 102b men wrap felt tefach left — tent without partitions; there different important building, intent tent; temporary building not tent without partitions — Rosh. Great ones refrain tallit on head — not R' Tam view partitions permit; Magen Avraham: they hold like Maharil grasp Rashi only maris ayin not tent; Taz siman 315 s.k. 8 why conclusion not tent; sages first thought tent then conclusion not; even without partitions tent; Rosh; therefore Gemara difficulty siyana forbidden, challenges spread cloak — without partitions still tent if distanced tefach though sides near body no partitions, forbidden, answers only tight — no tent without partitions (Beitzah Rosh first view important building); refrain tallit on head; even R' Tam refrain — not because no partitions no tent; Rosh even without partitions tent; R' Tam fix only Hagahot Maimoniyot Maharil slope; tallit on hat mostly not sloped, pulling makes level psik reisha — refrain tallit on head.`,
  ],
]);

const files = [
  "output/siman_301/machatzit-hashekel/part-001.txt",
  "output/siman_301/machatzit-hashekel/part-002.txt",
];
for (const f of files) {
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
}
const allKeys = files.flatMap((f) =>
  parseBlocksInFile(fs.readFileSync(f, "utf8")).map((b) => `${b.slug}:${b.seif}:${b.marker}`)
);
const missing = allKeys.filter((k) => !fixes.has(k));
console.log("MHS:", fixes.size, "missing:", missing.length);
if (missing.length) {
  console.log(missing);
  process.exit(1);
}
