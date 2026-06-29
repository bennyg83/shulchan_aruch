import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const dir = path.dirname(fileURLToPath(import.meta.url));

export const gra = {
  "beur-hagra:1:א": `Seif 1 beit se'ah — such as gardens. Mishnah 18:1, 23:`,
  "beur-hagra:1:ב": `And orchards. 25:2:`,
  "beur-hagra:1:ג": `And watchmen's booths. 22:1:`,
  "beur-hagra:1:ד": `That are not made. There. And chapter 15:1, 100:1:`,
  "beur-hagra:1:ה": `More than four amot. There and 90:1:`,
  "beur-hagra:1:ו": `But if. There and 23, as explained:`,
  "beur-hagra:1:ז": `Which is the measure. 23:1, 2:`,
  "beur-hagra:1:ח": `Whether square. This is their intent saying beit se'asayim:`,
  "beur-hagra:1:ט": `One amah. Mishnah there and Gemara:`,
  "beur-hagra:1:י": `And if enclosed. 61:1, 82:1:`,
  "beur-hagra:1:כ": `And some say, customary. 24:1; as Tosafos 23:1 s.v. provided; Rashi's explanation; what some say further watchmanship and dwelling house: same there Hagahot Ashiri; from Rabbi Yehuda ben Bava we learn for us more than beit se'ah; and disputants on all this. Tosafos there proved in three proofs Rabbi Yehuda ben Bava does not help more than beit se'ah, same for us; last proof also Rabbi Akiva; must be "provided" not needed here; certainly Rabbi Akiva forbids in all views; Beit Yosef, Bach agree not like Magen Avraham; Rama omitted watchmanship and dwelling house, for Tosafos certainly do not help per Hagahot Ashiri; as seif 2 dwelling house; and Rosh there; but per my explanation watchmanship and dwelling house — see Magen Avraham:`,
  "beur-hagra:1:ל": `And some further. Same watchmanship and dwelling house; from Rabbi Yehuda ben Bava for us more than beit se'ah; disputants; Hagahot Ashiri and Tosafos do not help except Rivam less than seventy needs watchmanship; for us more than seventy helps; Rama omitted watchmanship and dwelling house — no dispute; city dispute siman 259; Hagahot Ashiri wide different; Ritva; this one who built. 25:2; Magen Avraham:`,
  "beur-hagra:1:מ": `And disputants on all this. Tosafos there proved in three proofs Rabbi Yehuda ben Bava does not help more than beit se'ah, and the same for us; last proof also for Rabbi Akiva; must be "provided" is unnecessary here; certainly Rabbi Akiva also forbids in all views; Beit Yosef and Bach agreed not like Magen Avraham; Rama omitted watchmanship and dwelling house from Hagahah, for Tosafos certainly do not help as Hagahot Ashiri; as seif 2 dwelling house; and Rosh there; but per my explanation in watchmanship and dwelling house — see Magen Avraham:`,
  "beur-hagra:1:נ": `This one who built. 25:2; Magen Avraham:`,
  "beur-hagra:2:א": `Seif 2 or. 27:1:`,
  "beur-hagra:2:ב": `Or one amah. There:`,
  "beur-hagra:2:ג": `Some say, etc., until diminished. Per Hagah, 27:1, 2:`,
  "beur-hagra:2:ד": `And width, etc. Tosafos there s.v. if there is, etc.: all to diminish from top of stake to top of wall less than ten needs four by four — see there:`,
  "beur-hagra:2:ה": `Along length ten. Should read more than ten, as Shulchan Aruch:`,
  "beur-hagra:2:ו": `And if not. If earth ten high, not breached — new partition here; if less than three or on edge of tel, etc.; but here wall and earth not ten — wall as breached; as 88:1 wall nineteen, etc.; Terumat HaDeshen explicitly remedy only wall nineteen, not like Magen Avraham 7:`,
  "beur-hagra:2:ז": `Even if returns. There 25:1 swallowed, etc.:`,
  "beur-hagra:2:ח": `Since nullified. As explained subsection 3:4:`,
  "beur-hagra:2:ט": `One Shabbat. Per Rashi there:`,
  "beur-hagra:2:י": `And some disagree. Per Rabeinu Chananel there; see Rosh; proof for Rashi Eruvin 89:1 "leave Shabbat prohibition," etc.; not understood — Gemara 93:2 mound five, etc.; also need lower layer three; no connection; why not find easy remedy ladders more than ten — certainly better than his remedy; questions; as 59:2 ladder Torah form of door; 27:87, 88; even 61:1 paved wall with ladders to lenient per Rashi — I do not agree; for enclosure karpef nullifying first partition returns to prohibition — as breached first wall; even that Shabbat not helped; question Magen Avraham 7 if height, etc. — here placed beside wall; did not look seif 14:`,
  "beur-hagra:2:כ": `And even for that Shabbat it does not help, as above; and on Magen Avraham — question what he wrote s.k. 7 if there is in its height, etc.: (1) here he placed beside the wall; (2) also did not examine seif 14:`,
  "beur-hagra:3:_": `Seif 3 tel. If more than beit se'ah forbidden except four amot, as 15:50:2; if enclosed for dwelling on it helps. 25:1; see Tosafos s.v. if:`,
  "beur-hagra:4:א": `Seif 4 even if. From "afterward he built a pillar," etc.:`,
  "beur-hagra:4:ב": `And the same for digging. Same Rashba; Rashi there s.v. in trees, etc., and from this reason same for pit — answers Tosafos' question 22:1 s.v. pit:`,
  "beur-hagra:5:_": `Seif 5 built in it, etc. In all three seifim Shulchan Aruch rules like Rava against Rabba and Rav Shimi who teach leniently; though Rosh in name of Rambam no halacha like Rav Shimi — we rule lenient in Eruvin only among tannaim, not amoraim; Rambam reversed; Rambam chapter 1 does not rule lenient among amoraim per Mordechai, Hagahot Maimoniyot, Hagahot Ashiri 372 s.v. from here; proved from 47:2 Shmuel and R' Yochanan; but stringency is leniency; chapter Rabba; pillar and partition only plaster mud depends; if halacha Rav Shimi then Rabba, R' Shimon and Rav Hamnuna hold thus per Rosh; first version halacha Rava from Abaye onward per Rosh; Rambam and Raavad first version Rava; Hagahot Ashiri Or Zarua latter version Rabba; Rosh questions Rambam only where no general rule; his view chapter 5:63 Rambam lenient even individual against many — unique; Mordechai from Tosafos 47:2; contradicts Rosh in Moed Katan like R' Yochanan in mourning not Rav and Shmuel; Tosafos Moed Katan; Rosh Moed Katan; Tosafos contradict — 66:1 s.v. fine, some say lenient; Rosh; Mordechai and Hagahot Ashiri Rambam even amoraim dispute; not plausible from 47:2:`,
  "beur-hagra:6:_": `Seif 6 along length ten. Should read more than ten as seif 2:`,
  "beur-hagra:8:_": `Seif 8 even on. See Tosafos s.v. if:`,
  "beur-hagra:9:_": `Seif 9 even if only beit se'ah. There like Rabbi Shimon, etc.; Rabbi Shimon too; Magen Avraham: not like beit se'ah, even less; as Gemara unless stated; minority sown forbidden; no difference Rabbi Shimon and Rabbis; Tosafos s.v. no, minority sown, etc.:`,
  "beur-hagra:10:א": `Seif 10 one who has. Four introductions: (1) seeds cancel courtyard dwelling like karpef — seif 9 though Rosh doubts, Tur stringent; (2) beit se'ah and less same for house objects — no reason to distinguish three appearances, Tosafos s.v. we only said one matter explained soon; (3) minority sown remainder breached fully forbidden whether minority more than beit se'ah 25:2 or beit se'ah forbids house objects, Tosafos chapter 9:1 s.v. Rav said; or their dispute; (4) majority sown — law of entire courtyard like minority sown part, as Rabbi Shimon here karpef; if not more than beit se'ah in all, courtyard objects permitted:`,
  "beur-hagra:10:ב": `Even if only. Should read even less; from it: because less than beit se'ah; beit se'ah even from courtyard forbidden; Magen Avraham:`,
  "beur-hagra:11:_": `Seif 11 even, etc. There:`,
  "beur-hagra:12:_": `Seif 12 permitted. Lenient view; Rosh there; as above:`,
};

const existing = JSON.parse(fs.readFileSync(path.join(dir, "_en358-small-raw.json"), "utf8"));
fs.writeFileSync(path.join(dir, "_en358-small-raw.json"), JSON.stringify({ ...existing, ...gra }, null, 2));
console.log("gra", Object.keys(gra).length, "total", Object.keys({ ...existing, ...gra }).length);
