/** worker-slot-16 — siman 604 manual fixes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chokhmatEn = fs.readFileSync(path.join(__dirname, "work", "chokhmat604-en.txt"), "utf8").trim();

export const FIXES = {
  "mechaber/part-001.txt": {
    "1:main":
      "The order of Erev Yom Kippur. It contains 2 seifim: It is a mitzva to eat on Erev Yom Kippur and to increase at the meal. {Rama: And it is forbidden to fast on it even a taanit chalom (Maharil), and if one vowed to fast on it see above siman 570 seif 2.}",
    "2:main":
      "They do not fall on their faces on Erev Yom Kippur. {Rama: Also they do not say Lamenatzeach and Mizmor leTodah (Minhagim); also they do not say many selichot before dawn, and some places are accustomed to increase selichot, and all is according to custom. Regarding saying Avinu Malkeinu on Erev Yom Kippur there is dispute among acharonim; my city's custom is not to say it except when Yom Kippur falls on Shabbat when Avinu Malkeinu is not said — then they say it on Erev Yom Kippur at shacharit.}",
  },
  "beur-hagra/part-001.txt": {
    "1:א":
      '(א) Seif 1, and to increase at the meal, etc. As in Ketuvot 5a: but if so it should be the same, etc., and see Rashi there s.v. when it falls, etc., and Bereishit Rabbah ch. 11 — R. Tanhuma: an incident in Rome on erev the great fast, a tailor was there, etc., and they brought Tosafot Ketuvot there and Hullin ch. 3 p. 1 and Rosh end of Yoma and Shiltei Giborim and Tosafot there and Hullin 133a and Tosafot s.v. for Bar and there 95b Rav Nachman and there 110a they extracted everyone, etc.',
    "1:ב":
      '(ב) And forbidden to fast. As Pesachim ch. 6 — Mar son of Ravina sat fasting, etc., and Rashba explained taanit chalom: otherwise forbidden to fast on Shabbat and Yom Tov as Yerushalmi and Magen Avraham.',
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": chokhmatEn,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_":
      "(א) [Levush] The verse credits as if he fasted the ninth and tenth; Beit Yosef and acharonim elaborated; Knesset HaGedolah wrote wittily: I heard as if he fasted the ninth which is Tisha BeAv and the tenth which is Yom Kippur, end. In Amerkal I found ninth is 9 Av and tenth is 10 Tevet, end — requires study. Shibbolei HaLeket: because one eats well on Erev Yom Kippur and fasts hard on Yom Kippur affliction is greater — see siman 618.",
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_":
      "(א) [Seif 1] Mitzva to eat on Erev Yom Kippur, etc. — R. Chiya bar Rav of Difti taught: it is written 'you shall afflict your souls on the ninth of the month in the evening' — do we fast on the ninth? We fast on the tenth! Rather to teach whoever eats and drinks on the ninth Scripture credits as if he fasted the ninth and tenth, as in Berakhot 8b and elsewhere; Tur and Beit Yosef brought this. Question: why say as if he fasted the tenth — should it not say only as if he fasted the ninth alone, for the tenth stands alone whether he eats or not? Perhaps to teach since eating and drinking is considered affliction, reward is as if he fasted two consecutive days; or eating alone earns reward as two days' fasting besides tenth day's fasting reward. Peri Chadash.",
    "2:_":
      "(ב) There. Mitzva to eat on Erev Yom Kippur, etc. Reason in sod explained in Shaar HaKavanot 100d: each day of Ten Days is repaired in externality through eating, drinking, and their blessings; on Yom Kippur eating is forbidden — therefore increase eating and drinking on Erev Yom Kippur to repair externality of the day and morrow, see there. Pri Etz Chayim shaar 27 ch. 1: must eat on Erev Yom Kippur according to value of two days, see there; therefore at least two bread meals to require Hamotzi blessing and thereby repair externality through eating, drinking, and blessing; morning meal intent to repair externality of the day, interrupting meal to repair externality of morrow. Some cut two loaves like Yom Tov — Yafeh Lalev vol. 2 note 3 in name of Shelah and Ma'il Shmuel, see there. Before the meal sit in place and say Mizmor leDavid Hashem ro'i, etc., then say for unification of the Name, etc., and in name of every soul, spirit, living soul, unique one related to roots of our soul, spirit, life, uniqueness, generality and detail of Atzilut Beriah Yetzirah Asiyah — I come to fulfill mitzva of Erev Yom Kippur meal as Sages expounded whoever eats on the ninth is credited as if he fasted ninth and tenth, and to repair root of this mitzva and all mitzvot dependent on it in upper world. May it be pleasant, etc., and may it be willed before You Lord our God that all holy sparks in food and drink I eat and drink reach full repair and clarification, guard me they not cause sin or harm, purify our souls. May it be pleasant, etc.",
  },
  "mishnah-berurah/part-001.txt": {
    "1:א":
      "(א) Mitzva to eat, etc. — for it is written 'you shall afflict your souls on the ninth in the evening' — it should have written on the ninth 'fast your souls until evening,' etc.; since it writes 'you shall afflict' on the ninth, we learn mitzva from Torah to eat on Erev Yom Kippur — God wanted to give reward for eating as if one fasted, for mitzva with suffering has greater reward as 'according to suffering is reward'; if written 'eat on the ninth' we would only have reward for fulfilling eating; therefore Scripture changed to affliction language so eating counts before God as affliction.",
  },
  "peri-megadim/part-001.txt": {
    "1:ב":
      "(ב) Incident of the tailor (Beit Yosef). As you understood there, the officer sometimes served minister sometimes officer — see chapter Judges and officers in Rashi, Raavad, RaM; one explanation: officer is not minister but appointee to seek thieves, drunkards, squanderers — resolves three questions: why ask his craft, why give five gold for one gold when man may squander, how reconcile when taken from officer's servant — answer officer was not minister, etc.; asked how give five for gold while you squander — answered I am tailor not thief, may squander my own; asked truth and nevertheless wonder — one enjoying his labor does not squander like merchant; nevertheless acceptable; moreover you took from my servant meaning seller was already pleased with servant for one gold and you added to five raising price — I as officer may arrest you; unlike if squandered only what seller asked — if fool, etc.; found only one evil — therefore Beit Yosef wrote 'and not only' there; tailor answered: true on erev Shabbat and Yom Tov, etc., mitzva to eat, nevertheless I do not raise price except once a year on Erev Yom Kippur when God commanded us to eat and drink trusting He will atone — unlike Yom Tov and Shabbat where eating is mitzva; here as if afflicted on ninth by eating so we can fast on tenth — end of his words.",
  },
  "yad-ephraim/part-001.txt": {
    "1:_":
      'In Magen Avraham note 1 "and if you hold Mar son of Ravina does not refer to taanit chalom," etc. — it appears he holds one cannot rely on the view that on Erev Yom Kippur eating counts as affliction only if we say perhaps Mar son of Ravina refers to taanit chalom — then one may say even if he refers to other fasts, nevertheless eating counts as affliction; unlike if clear he does not refer to taanit chalom — why rule in Shevuot one fasting taanit chalom, then also on Erev Yom Kippur cannot rely alone. Still question: why Magen Avraham assumes perhaps Maharil comes because he holds Mar son of Ravina refers to taanit chalom and Rama does not — nevertheless clear to him eating counts as affliction; in my view Magen Avraham holds it is not reasonable that Erev Yom Kippur eating though verse counts as affliction is included in "taanit chalom has power to tear evil decree as if he fasted" — taanit chalom affliction is for suffering not pleasure; Magen Avraham means unlike Erev Yom Kippur, etc., intention: every doubt of fasting we are stringent; since we doubt perhaps he refers to other fasts, concern to be stringent and fast even on Purim and Shevuot — unlike Erev Yom Kippur cannot say so to be stringent requiring fasting — for that stringency leads to leniency nullifying affliction Torah spoke on Erev Yom Kippur, namely eating counted as affliction — end of his words.',
  },
};
