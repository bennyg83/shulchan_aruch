#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`kaf-hachayyim:1:_`, `(1) [seif 1] One may not run on Shabbat — as written "if you turn back your foot from Shabbat," Chazal expounded one's Shabbat walking should not be like weekday walking (Tur). Though Gemara derives from "your ways," Tur cited beginning of verse intending end — so Tosafot Shantz letter 1, see there. Even short steps less than an amah, if running, forbidden on Shabbat — Eshel Avraham letter 1.`],
  [
    `kaf-hachayyim:2:_`,
    `(2) There — do not run on Shabbat; even on weekdays coarse stride forbidden — removes one of five hundred from eyesight (Magen Avraham s.k. 1). Maharsha Chiddushei Aggadot 113: what difference Shabbat and weekday? — weekday only harm to eyes, Shabbat added prohibition; practical difference blind person still forbidden Shabbat (Machatzit HaShekel). See Tosafot Shantz letter 3: some dispute coarse stride; rule leniently — only Shabbat forbidden, see there.`,
  ],
  [`kaf-hachayyim:3:_`, `(3) There — unless for mitzvah — "they shall follow Hashem as a lion roars" implies run from lion, so run after mitzvot (Tosafot Shantz letter 2).`],
  [`kaf-hachayyim:4:_`, `(4) There gloss — forbidden stride etc. — likewise forbidden leap (Rambam chapter 24 law 4).`],
  [
    `kaf-hachayyim:5:_`,
    `(5) There gloss — forbidden stride more than amah — half amah between feet, foot also half amah; as siman 397 seif 2 in name Mahariyu (Magen Avraham s.k. 2). Meaning there: amah is length of two shoes on one standing place, shoe between feet — see there; here "foot" means with shoe. Agudah in name Tosafot first chapter Taanit: not uproot second foot before placing first (Magen Avraham there); so Raavan siman 304; brought Eshel Avraham letter 4.`,
  ],
  [
    `kaf-hachayyim:6:_`,
    `(6) There gloss — forbidden stride more than amah — even weekday forbidden except there only danger alone with remedy in Kiddush and Havdalah, unlike Shabbat (Eshel Avraham letter 1). However already wrote above end letter 2 some dispute, hold no weekday concern — see there.`,
  ],
  [
    `kaf-hachayyim:7:_`,
    `(7) There gloss — Eshel Avraham from Hagahot Kavanot: permitted coarse stride on Shabbat for mitzvah, all the more if no other way; if thereby does mitzvah more zealously and quickly, perhaps permitted — see there (Ahavah letter 2).`,
  ],
  [`kaf-hachayyim:8:_`, `(8) There gloss — if possible etc. — if impossible, explained seif 3 permitted.`],
  [`kaf-hachayyim:9:_`, `(9) [seif 2] Youths enjoying in jumping etc. — youths playing together (Agudah); brought Eshel Avraham letter 8.`],
  [
    `kaf-hachayyim:10:_`,
    `(10) There — their running permitted — Bach: permitted only b'dieved since accustomed run and jump for pleasure on Shabbat; if we object, spoil their Shabbat pleasure; l'chatchila if asks, do not permit (see there). Magen Avraham s.k. 3: even l'chatchila permitted, unlike Bach who was forced.`,
  ],
  [`kaf-hachayyim:11:_`, `(11) On Simchat Torah permitted dance; wedding joy for bridegroom and bride (Shas chapter 5 Beitzah). Eshel Avraham letter 8.`],
  [
    `kaf-hachayyim:12:_`,
    `(12) There — also to see everything — permitted run or skip to see something they enjoy (Bach). Olat Shabbat letter 3: Taz s.k. 1 forbids run to see, only permits seeing alone — permitted see on Shabbat what delights (see there). Magen Avraham s.k. 4: though portraits forbidden siman 307 seif 15, if seeing is pleasure for him, permitted see. Eshel Avraham letter 6 like Bach; Chayei Adam letter 2; Maamar Mordechai; so Acharonim.`,
  ],
  [
    `kaf-hachayyim:13:_`,
    `(13) There gloss — also permitted stroll etc. — intent exercise and warm; forbidden run to warm if for healing (Magen Avraham s.k. 5). Eshel Avraham letter 6: Levush implies even walk not run if intent exercise forbidden; appears Levush from Tosefta and Rama — see there. Eshel Avraham letter 5: not forced like Levush, can say like Magen Avraham; Piskei Teshuvah letter 3 challenged Eshel Avraham, agreed Magen Avraham; so Tosafot Shantz letter 5.`,
  ],
  [
    `kaf-hachayyim:14:_`,
    `(14) There gloss — stroll responsum end Sefer Chazeh HaTenufah: stroll Shabbat in alley with eruv without head covering and cloak depends on custom; if custom not to stroll, fine custom, do not lighten; proof from place where practiced (Pesachim 50b) (Beit Yosef). I received these responsa; Sefer Chazeh HaTenufah abridges Rosh responsa; end has unpublished abridgment; this responsum siman 55 with variant: if practiced strolling, fine custom, do not lighten, kosher custom, differ Shabbat wrap from weekday, ancestors' custom is Torah, proof from "place" (Mechaber letter 2).`,
  ],
  [`kaf-hachayyim:15:_`, `(15) [seif 3] May skip and jump — skipping: pauses feet in width; jumping: both feet together (Ramban). Gra.`],
  [
    `kaf-hachayyim:16:_`,
    `(16) There — forbidden pass through etc. — if cannot go around and cannot skip, only pass water — forbidden, not going for mitzvah (Bach). Eshel Avraham letter 8: from Magen Avraham s.k. 6 implies if cannot skip or go around, permitted pass water. Eshel Avraham letter 6: Acharonim like Bach. Appears in pressing need may lighten.`,
  ],
  [
    `kaf-hachayyim:17:_`,
    `(17) There — lest come to squeezing — though in Levush forbidden, his washing is washing; Tosafot Shabbat 111 answered only where filth on garment; also say not "his washing" in invisible soiling. Found Sefer Yereim 39 and Piskei Rekanati siman 113: here leather garments — requires study (Eshel Avraham letter 8). See below siman 302 seif 9.`,
  ],
  [
    `kaf-hachayyim:18:_`,
    `(18) [seif 4] Such as greet rabbi — obligated greet on festival; Shabbat and new moon no obligation but mitzvah exists; woman equal to man from Shunammite (Magen Avraham s.k. 7). See siman 594 seif 12 — Magen Avraham wrote weekday too mitzvah. Responsum Noda BiYehudah Mahadura Tinyana siman 94: one not going to learn from rabbi on foot only to greet — no obligation nowadays, only proper — see there.`,
  ],
  [`kaf-hachayyim:19:_`, `(19) There — greet rabbi — likewise father's face (Gemara); rabbi with student — question unresolved, rule stringent forbidden (Beit Yosef).`],
  [`kaf-hachayyim:20:_`, `(20) There — or face of greater — if goes to student who needs him, rabbi considered greater in this (Taz s.k. 2).`],
  [
    `kaf-hachayyim:21:_`,
    `(21) There — may pass through — when garment not soiled; if soiled mud etc. per Rosh Yoma 77 answer 1 forbidden — washing; answer 2 permitted (Piskei Teshuvah letter 8). See Eshel Avraham letter 3; above letter 15.`,
  ],
  [`kaf-hachayyim:22:_`, `(22) There — so he remembers etc. — Rashi: not put hand under cloak hem to raise on arm — not seen as garment but carrying on shoulder; master: one who goes with folded tallit on shoulder Shabbat liable (Beit Yosef).`],
  [
    `kaf-hachayyim:23:_`,
    `(23) There — see below siman 613 seif 5 and seif 8 gloss — Rama z"l: wherever permitted pass water even if dry path, permitted — less walking preferable. Taz and Magen Avraham there: be stringent, do not pass water if can walk even if longer — see there. So Raz siman 613 letter 13.`,
  ],
  [`kaf-hachayyim:24:_`, `(24) There — forbidden pass in sandal etc. — difference shoe and sandal: sandal cannot tighten like shoe (Rashi) (Beit Yosef).`],
  [`kaf-hachayyim:25:_`, `(25) [seif 5] So he not fail him etc. — lest next time not go for mitzvah if not permitted go and return (Rashi).`],
  [`kaf-hachayyim:26:_`, `(26) [seif 6] Going guard produce — guarding money somewhat mitzvah (Magen Avraham s.k. 8; Tosafot Shantz letter 11); not full mitzvah, therefore return not permitted (Eshel Avraham letter 1).`],
  [`kaf-hachayyim:27:_`, `(27) There — permitted pass etc. — provided not remove hands from under cloak hem as above seif 4 Gemara.`],
  [
    `kaf-hachayyim:28:_`,
    `(28) There — but not return — not applicable "lest fail later" (Beit Yosef; Taz s.k. 3). Olat Shabbat Taz: other reason — person agitated about money will not refrain going later, unlike mitzvah performance.`,
  ],
  [`kaf-hachayyim:29:_`, `(29) [seif 7] Not way of garment etc. — way of garment only what is way to wear on weekday (Maharik Molcho responsa 21 siman 312; Birkei Yosef letter 1 Shaarei Teshuvah).`],
  [
    `kaf-hachayyim:30:_`,
    `(30) There — liable — know wherever "liable": intentional kares (if warned, stoning — Machatzit HaShekel); unwitting — forgot Shabbat or knew Shabbat but not this melacha — chatas; melacha without intent, e.g. forgot item and went reshut ha-rabbim — exempt (Magen Avraham s.k. 9). "Exempt" — even from chatas: melacha machshavah, no intent for melacha (Machatzit HaShekel). Rosh Hashanah law — see below siman 345 seif 7 and our words there.`],
  [`kaf-hachayyim:31:_`, `(31) There — every ornament that heals etc. — lest fall and carry reshut ha-rabbim.`],
  [`kaf-hachayyim:32:_`, `(32) There — accustomed remove them etc. — concern meanwhile carry reshut ha-rabbim.`],
  [`kaf-hachayyim:33:_`, `(33) There — not in sword etc. — even girded on waist liable, weekday way of carrying thus (Beit Yosef; Magen Avraham s.k. 10; Eshel Avraham letter 12).`],
  [`kaf-hachayyim:34:_`, `(34) There — not in these — iron staff cubit and half with ball head (Be'er HaGolah). Eshel Avraham there.`],
  [`kaf-hachayyim:35:_`, `(35) There — not armor — "coat of mail" is garment (1 Samuel 17:5); Metzudat Tzion: rings of iron like fish scales (see there).`],
  [`kaf-hachayyim:36:_`, `(36) There — not helmet nor greaves — kaseda iron hat, greaves iron leg armor for war (Beit Yosef; Magen Avraham s.k. 11).`],
  [
    `kaf-hachayyim:37:_`,
    `(37) There — if went out exempt etc. — forbidden rabbinically (Rabbi Yitzchak Ze'ev letter 3); l'chatchila should not appear going to war like Ran — omitted by Levush (Sefer Regel Yesharah 53; Mechaber letter 4). Tosafot Shantz letter 14 like Rashi: even inner rooms forbidden as seif 45. City with royal guard: Jews and Gentiles guard by lot with swords against thieves; sometimes Jew on Shabbat night must guard with sword and torch on shoulder. Zera Emet 3:273: arrange shifts so Shabbat night exchanged with weekday night — avoid muktzeh, maris ayin going to war; may spend money, not permit for enmity; if decree harsh and dangerous, no muktzeh concern — see there (Piskei Teshuvah letter 5).`,
  ],
  [`kaf-hachayyim:38:_`, `(38) There — because must remove them etc. — concern carry reshut ha-rabbim (Gemara; Beit Yosef). See above siman 31; below siman 308 seif 4 gloss.`],
  [`kaf-hachayyim:39:_`, `(39) There — minor may not go out etc. — small person in shoe too big (Rashi; Rabbi Yitzchak Ze'ev letter 3).`],
  [
    `kaf-hachayyim:40:_`,
    `(40) There — minor etc. — no difference man/woman for this; new shoe and torn shoe — difference man/woman siman 303 seif 13 (Bach). Beit Yosef: from Riva appears only woman for big shoe on small foot; Semak and Semag like Tur — no difference; so Acharonim.`,
  ],
  [`kaf-hachayyim:41:_`, `(41) There — may go out in foot without wound — no concern they laugh seeing cannot wear second shoe due to wound (Tur).`],
  [
    `kaf-hachayyim:42:_`,
    `(42) There — foot with wound may not go out — concern wound hurts, removes shoe, carries; appears wound he can walk without shoe — therefore may not wear shoe on wounded foot; if wound so severe cannot walk without shoe, no concern remove since distressed and cannot walk barefoot — so Rashi — see there (Olat Shabbat letter 16).`,
  ],
  [
    `kaf-hachayyim:43:_`,
    `(43) There — ruling Chiyya bar Rav; Maharshal gloss brought Maharam: like Rav Huna, go out on wounded foot; Bach: stringent in dispute, not one shoe whether wounded or not (Taz s.k. 4; Eshel Avraham letter 17; Tosafot Shantz letter 16). Walk completely barefoot when wound on one foot. Even who forbid barefoot when no wound — when wound Eshel Avraham elsewhere. Mishnat Hasidim letter 4: for us without full reshut ha-rabbim, not stricter than Shulchan Aruch; so Mishnat Hasidim there.`,
  ],
  [
    `kaf-hachayyim:44:_`,
    `(44) Go out — nailed sandal called Arabic kabkab, not same as Gemara chapter "with what woman" — nevertheless forbid: burden or lest slip and carry; remedy attach so not slip, like Edom sandals with covered back — then shoe not slipping not burden. Radbaz 3 Farda siman 11: wooden shoe without leather cover (suikom/kabkab) forbidden even unjoined alley — leather on top slips, cannot rewear, close to carrying in hand (Ikarei Dinim siman 15 letter 3). Birkei Yosef letter 16: Maharikash permits some; Mechaber letter 7 brought many forbid like Radbaz — see there. See below seif 16 gloss and our words there.`,
  ],
  [`kaf-hachayyim:45:_`, `(45) [seif 8] May not go with needle etc. — not craftsman here; craftsman law below seif 12 (Beit Yosef; Olat Shabbat letter 11). Woman's law — below siman 303 seif 9.`],
  [`kaf-hachayyim:46:_`, `(46) There — stuck in garment etc. — in hand liable all cases man and woman pierced and unpierced (Magen Avraham s.k. 14; Eshel Avraham 18; Tosafot Shantz letter 17; Acharonim).`],
  [
    `kaf-hachayyim:47:_`,
    `(47) There — stuck in garment — question if needle in cloak hem/lips, permitted man? See below siman 303 laws 9 and 18 implying only woman. Beit Yosef this siman: coins sewn not intent carry coin but open garment — coin batel to garment (Rabbi Akiva Eger z"l in glosses 21; Birkei Yosef letter 2). Rabbi Yitzchak Ze'ev letters 4–5: even for wearing, pierced liable chatas, unpierced exempt forbidden, same man; woman siman 303 — see there.`,
  ],
  [
    `kaf-hachayyim:48:א`,
    `(48) There — between pierced etc. — Beit Yosef scribal error here; Shulchan Aruch written properly (Magen Avraham s.k. 15). See Taz s.k. 5 emendation Beit Yosef — see there. Bach "no one holds man liable pierced" — Magen Avraham: not forced; Taz: Bach wrote in vain, Beit Yosef and Shulchan Aruch not erring student, all coherent, needs emendation in Beit Yosef — see there. General rule: per time — if weekday custom carry thus and not ornament, way of carrying, liable; if not weekday way, exempt but forbidden as not ornament. Dispute which needle was way in Talmud times. If majority world not custom, even if locale does — exempt, opinion batel (Gemara 52; Magen Avraham; Eshel Avraham letter 19; Tosafot Shantz letter 17).`,
  ],
  [`kaf-hachayyim:48:ב`, `(48) Tosafot Shantz there: if they have reason for custom, possible if reason applied worldwide they would act so — not say opinion batel — see there. See below siman 362 seif 1.`],
  [
    `kaf-hachayyim:49:_`,
    `(49) There — some say opposite — Rosh: pierced or unpierced if went out exempt — kele'achar yad, not way carry needle, exempt as Tur and Beit Yosef — see there. Perushim or 7: even in hand if carried exempt — not poskim' view as above letter 46.`,
  ],
  [
    `kaf-hachayyim:50:_`,
    `(50) [seif 9] If went out liable — sometimes wife gives husband needle to bring to craftsman, holds in hand until arrival — weekday way of carrying, liable, not ornament for man (Magen Avraham s.k. 16; Olat Shabbat letter 14; all the more in hand — Eshel Avraham letter 16; Olat Shabbat there; see above letter 46).`,
  ],
  [
    `kaf-hachayyim:51:_`,
    `(51) There — if went out liable — see below siman 303 seif 18: nowadays men accustomed ring without seal is ornament, permitted — see there. Above letter 48: all per time; therefore Eshel Avraham letter 16: anyway do not object to men now for reasons siman 303 seif 18; all the more Rabbenu Tam and Rambam permit man (not concern remove and show) — see there. See below letter 53.`,
  ],
]);

const f = "output/siman_301/kaf-hachayyim/part-001.txt";
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
console.log("Kaf HaChayim:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
