/**
 * Slot 3 quality pass — simanim 228, 234, 242, 267 (non-Mechaber mt_garbage / failure patterns).
 * Replaces **** ENGLISH **** sections only.
 */
import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), 'output');

/** @type {Record<string, string>} key: relPath|seif|marker */
const BLOCKS = {
  // ─── siman 228 ───
  'siman_228/siftei-kohen/part-001.txt|10|א': `Regarding "you shall not take revenge" etc. On this we do not say that a person is brazen, for these are not so severe, and therefore he will not refrain from speaking the truth. Beit Yosef. And the Bach explained that these are written in the Torah and he is certainly brazen:`,

  'siman_228/siftei-kohen/part-001.txt|20|ר': `[Even if she has already been married, he must divorce her. And as explained in Even HaEzer siman 77; and even according to those who disagree there, that is regarding a married woman, which is not the case here. Mahariu siman 337:]`,

  'siman_228/siftei-kohen/part-001.txt|21|ט': `[But if he said unspecifiedly. The view of Ran and Rashba and Rivash is that even if he said unspecifiedly "in the opinion of the public" he has no release, and it appears one should be stringent l'chatchila:]`,

  'siman_228/siftei-kohen/part-001.txt|21|ל': `[Only in a time of pressure. This is what the rabbi wrote according to what Beit Yosef wrote, namely that Mahariq wrote (root 52) in the name of R' Avigdor that regarding a vow in the opinion of the public there is no annulment l'chatchila, but b'dieved if three men came and released it for him it is permitted; and even though this is not the approach of most poskim, nevertheless it is fit to make a branch for the views mentioned etc.; and Rashba too in responsum regarding a vow taken in the opinion of the public — if they released it, it is permitted b'dieved; and even though some great teachers disagree, nevertheless R' Yerucham is fit to rely on in a time of pressure etc. Beit Yosef, and Darkei Moshe brings it. And it appears to me that one cannot say Rashba's responsum deals with such a case, for we do not find R' Yerucham anywhere that b'dieved it is permitted; on the contrary, from what all poskim wrote and Rashba himself in chapter HaSholeach in his name — that the Gemara resolves the one who asked that perhaps he will go to a sage and release him, i.e. for b'dieved; but l'chatchila they do not release him except with his consent — if so it is proven that regarding the opinion of the public even b'dieved release does not help for R' Yerucham, for they answer there that we coerce him regarding the opinion of the public, and so is the view of all poskim that even b'dieved he has no release. And in responsum of Maharam Padua siman 68 he too disagrees with R' Avigdor and wrote the language "there is no annulment" implies even b'dieved, and his reasoning is good; but it appears to me to prove thus from the sugya in chapter HaSholeach and end of chapter These Defects, that if etc. — end of his words.]`,

  'siman_228/siftei-kohen/part-002.txt|39|ב': `(To extend it and stand. And in Orach Chayyim he wrote: a vow that was partially released — all of it is released; and the same applies to an oath; therefore if Reuven owes Shimon a maneh under oath within a known time, and at that known time Reuven comes to Shimon and asks him to extend payment until another time — Reuven is no longer liable under that oath; and so ruled the sages of the generation etc. And so it appears from the plain sense of Rosh's responsum cited above regarding one who swore to his wife not to leave her without her permission; and so it appears from Ramban's responsum below. Nevertheless it is fit to be concerned for Rashba's words etc. — language of Bedek HaBayit. And see Ramban's and Rosh's responsa there, that nothing is implied; and the words of Orach Chayyim require study, for what relevance is this to a vow partially released, since we hold in siman 229 seif 2 that in cherem and a wife's annulment we do not say "all released" since he only cuts from now and does not uproot from the outset; and the same is certain regarding a fellow — he only uproots regarding himself and it is a condition, and he can make conditions as he wishes; and so appears from Rabbeinu Yerucham and the Mechaber below siman 229 end of seif 1. And necessarily it must be that Orach Chayyim deals with when he said to him "behold I am as though I received" and therefore he is no longer liable under that oath — in such a case all is released; if so Rashba's law does not disagree with him:)`,

  'siman_228/pitchei-teshuva/part-001.txt|8|_': `such as gambling. See responsum Nachalat Yehoshua siman 37:`,

  'siman_228/pitchei-teshuva/part-001.txt|9|_': `Regarding his vow. Be'er Heitev in the name of Taz; and see Beit Yosef that many permit through writing except Rivash wrote that it appears from Rambam's words that even through writing it is forbidden, and one should be concerned for his words — see there. Accordingly, in a time of pressure it is possible somewhat to be lenient (and what he wrote that if not so, the daughter of Yiftach etc. — even though we do not derive halachah from aggadah, see responsum Noda B'Yehuda Tinyana ch. 14 siman 161). [And see responsum Chatam Sofer end of siman 220 who rejected this proof and wrote that nevertheless it is difficult to act; and it is explained there that a community needing to release their vows and sending one of them before a court outside their city is not in the category of agent but owner of the matter himself, as the Gemara distinguishes in chapter 2 of Kiddushin — it is different there because he has partnership in it; and from being good it will be in his hand — also wrote from the fund administrators seven good men of the city — see there.] And see Mishneh Lamelech chapter 4 of Hilchot Bechorot in the words "however it appears to me" that he wrote regarding one who vowed a matter and made an agent to ask about his vow according to Rashba's view that one can make an agent for his release (or that he sent his handwriting with him) — it is obvious that until nightfall he must fulfill his vow; and even though we might say in this case the presumption "an agent performs his agency" applies — nevertheless this presumption for leniency was not stated on his day. And even for tomorrow one should not be lenient before the agent arrives — see below siman 340 seif 66 in his name:`,

  'siman_228/pitchei-teshuva/part-001.txt|10|_': `His opinion is for no benefit. [Be'er Heitev; and see responsum Chatam Sofer end of siman 226 who wrote that R' Eliyahu Mizrachi disagrees with Tashbetz only if he retracts within his time — such as a worker in the middle of the day who already earned half a day's wages, and similarly dwelling in his house some time — he is already committed to him for that time's rent and a benefit was done to him even if he does not fulfill his oath; but if he has not even begun the work or dwelling in the house, he may immediately retract and wish to release his oath — even R' Eliyahu Mizrachi agrees they can release without his consent, for he has not yet received any benefit from him — see there. And he wrote there regarding a great rabbi whom they persuaded and the men of one city finished until he struck hands with one of them in public to hire himself to them as rabbi and teacher — and immediately afterward he regretted, especially when it became known they are quarrelsome people, and also a letter reached him from his father commanding him not to leave his place — whether there is release for the oath he gave or not, that it is a vow for another's benefit which is not released except with his consent; and he expanded on the reason of need for mitzvah (which Rama mentioned in gloss 3 and see there) — difficult to rely on for release. And also from the reason of disgust and excuse which Rama mentioned at the end of that gloss — difficult to release, for one who examines Mahariu siman 186 will see that reason applies when there is prohibition to marry him because of hated children, but where there is no prohibition in fulfilling the oath, the claim of disgust is not a claim; and especially when there is no sufficient excuse here, for the community's act is certainly known and it is like a claim of blemishes where there is a bathhouse in the city. However in this case there is room to permit for another reason: most poskim hold that benefit is required, and Tashbetz wrote a worker can retract; and in this case he enjoyed nothing from them and did not begin their work at all — even Maharam Alashkar agrees; and especially since from beginning to end it was not willingly before this rabbi — they persuaded him and certainly it is not called benefit. And also in any case one may combine the two reasons mentioned — there is mitzvah and claims of disgust and excuse — therefore there is room to release with three knowingly without their rabbi; and he concluded there: nevertheless my heart is pained because of the great desecration of Hashem's name lest they say these rabbis permit for themselves a raven and forbid us even a dove — therefore he should strive to speak to the hearts of the community that they willingly agree to release — see there:]`,

  'siman_228/pitchei-teshuva/part-001.txt|44|_': `Like a vow in the opinion of the public. [See responsum Chatam Sofer siman 10 who wrote that what Rama wrote — one who vows in a time of trouble is like one who vowed in the opinion of the public by mere similarity — likewise what relevance is this; and the main reason he wrote in responsum Binyamin Zeev there that it is like a vow for the intent and benefit of another, and he received benefit from him which is not released except with his consent; and so too the vow is for the benefit, so to speak, of the Holy One blessed be He, for a vow was made before Him that His will be done and He did him good by saving him from trouble, and He is not released except with His consent — see there; therefore one should not release except since he vowed for another's benefit, even for a mitzvah matter some poskim do not release without the other's consent; and it could be said one who vows in a time of trouble has the same law — this comes to teach, for behold the release for a mitzvah matter is the benefit of the Giver of Torah may He be blessed, and behold this is like a vow in the opinion of the public, for we are witnesses they agree to mitzvah since the public has no benefit from this; and the same is this vow — the Holy One blessed be He will agree — see there further that Shach attacked Rama regarding a vow from charity — Heaven forbid to consider Rama mistaken in simplicity; but Rama's view is from Ramban's language that this man follows his desires and was not restrained until he ate so much cheese and became ill from it and transgressed a positive commandment "guard yourselves very well" etc. — see there:]`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|1|_': `(Siman 228 seif 3) And regarding relatives. It appears to me that a woman is not specifically "relatives," for the disqualification is not in her person — she is fit to judge one who is not her relative; and likewise at night the night causes it and there is no disqualification in the man; and likewise a minor — it appears to me according to Tosafos (Niddah 20) that menstruation — their view is also a minor is disqualified to judge by the general rule of the mishnah "all fit to judge" — and this is one view in Tur Choshen Mishpat (siman 7); and even according to Tur and Shulchan Aruch there that a minor thirteen who has not brought two hairs is fit to judge — nevertheless it appears to me this is when they did not examine hairs, for by law we say the presumption he brought, and only the rabbis were stringent in Torah matters in chalitzah and it seems to me to require examination; and the same in monetary laws they were not stringent and we establish by law. But if they examined and he did not bring two hairs — he appears disqualified to judge, for they ruled there a woman is disqualified to judge, and Beit Yosef wrote we derive this from testimony; and since we derive the law of testimony, the same applies regarding a minor. And truly from the Gemara's words that wrote the reason that before thirteen he is disqualified to judge because he does not appear at all as an adult and did not state the reason that then he is certainly a minor — it implies that even if they examined and he did not bring hairs he is fit; but in my view it is difficult from what is written afterward regarding testimony. Later I found in Tumim so too, and there he added that the Yerushalmi's intent in "there are two judges besides him" is that by Torah law one is fit in monetary judgments, and regarding rabbinic law we leave the presumption he brought — all the more so; but this is possible that Tur wrote even as a unique expert he can judge, but in any case this is possible that his intent in the Gemara is as I wrote etc. — end of his words.]`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|13|_': `(There in seif 20 in the gloss) Even though they do not release him l'chatchila. See responsum Shevut Yaakov (part 2 siman 80):`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|17|_': `(There in seif 22 in the gloss) Or a vow regarding the place. See responsum Rashach (part 1 s.k. 89) and in Tashbetz (part 2 siman 53):`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|19|_': `(There in seif 25) Vows and cherem are judged as doubtful cherem. See Rashba (siman 991), Maharival (part 1), Maharam Trani (part 1 siman 227), Rashdam part 1 (siman 28), Chavot Yair (simanim 82, 87, 139), and in Choshen Mishpat (simanim 99, 227, 239, 244, 247, and Shulchan Aruch), Mishpetei Shmuel (simanim 65, 98, 101), Maharshach (part 1 s.k. 112, part 2 s.k. 89, part 3 simanim 45, 105), Raanach (siman 25 seif 49 ch. 1), Mahari Aderabi (siman 59 seif 5), Maharam Padua (siman 71); and see responsum Shnei HaMe'orot HaGedolim (siman 4) and R' Moshe Alshich (siman 75), and in Raanach (part 2 simanim 55, 56, 57):`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|36|_': `(There, Taz s.k. 50) And these are his words: see in responsum Maharachash (part 1 siman 3) that nevertheless if he was first obligated to pay by a certain time — meaning from that time onward — likewise when written at the end that he swore to fulfill all the above, the implication is also that he swore to pay from that time onward — see there:`,

  'siman_228/rabbi-akiva-eiger-yd/part-001.txt|37|_': `(In any case) there is room to distinguish; see in responsum Beit Yaakov (siman 23):`,

  'siman_228/nekudot-hakesef/part-001.txt|7|_': `(There s.k. 49) He expanded to challenge Rashba — and all his words can be rejected, and it is simple; but for practical law it requires study, for also R' Eliyahu Mizrachi challenged Rashba in this, as Shach wrote in siman 216 s.k. 22:`,

  'siman_228/beur-hagra/part-001.txt|12|_': `And likewise death etc., but. Gemara there 2 [and see Rosh ad loc., and Raavan there in the words "Yerushalmi" etc.]:`,

  'siman_228/beur-hagra/part-002.txt|1|_': `And there is one who. Yerushalmi: "Arise, shine" — and see there:`,

  'siman_228/beer-hagolah/part-001.txt|3|ד': `Mishnah Shabbat daf 157a and Nedarim daf 77b:`,

  'siman_228/beer-hagolah/part-001.txt|3|ה': `The conclusion of the Gemara in Nedarim there:`,

  'siman_228/beer-hagolah/part-001.txt|3|ו': `Rabbeinu Yerucham: since on Shabbat everyone is gathered, and if they do not release then they cannot release them (Beit Yosef in Orach Chayyim siman 341 in the name of responsum of Rashba and Agur):`,

  'siman_228/beer-hagolah/part-001.txt|4|_': `Tur's wording from Rosh there in his rulings from the baraita of R' Gamliel — he descended from the donkey and wrapped himself and sat and released his vow for him; and the Gemara explains R' Gamliel holds we do not open with regret, for uprooting the vow itself we require, and he needs examination — therefore he sat:`,

  'siman_228/beer-hagolah/part-001.txt|5|_': `Rambam's wording in chapter 7 of Hilchot Nedarim from the Yerushalmi chapter 5 of Nedarim and the Tosefta:`,

  'siman_228/beer-hagolah/part-001.txt|19|_': `Rivash part 2 siman 36:`,

  'siman_228/baer-heitev/part-001.txt|11|_': `They declared them. The reason in the Gemara is that he was brazen to declare them nedarim, and therefore also now at the time of regret he will speak the truth. And the Bach distinguished in these laws of "you shall not take revenge" and likewise honor of father written explicitly in the Torah — since he was already brazen to transgress words of Torah he will be brazen now too and not be ashamed; unlike at opening when doing a transgression through a vow it is not revealed to all. And the Taz wrote his words are astounding, for if he already knew the prohibition what relevance is opening to permit him through "if you had known" etc. — end of his words.`,

  'siman_228/baer-heitev/part-001.txt|12|א': `A Torah scholar. And if so-and-so went to learn — this is not nolad, for it is common when one goes to learn that he becomes a great man. Semag in the name of Tosafos; and the Taz wrote in the name of Semag that we do not open with nolad — we do not open [with nolad alone], but we open with regret on account of nolad; therefore R' Akiva permitted his father-in-law, for there was complete regret on account of the nolad that R' Akiva became a Torah scholar. And explicitly he said he regrets the vow that originally on account of this they did not forbid him with nolad unless others open for him with this so he will regret — and he does not say he regrets from the outset, only that he says "on this intent I did not vow" — in this we say there is no regret except from the nolad onward and not from the outset. And similarly if after others' statement he himself explicitly says he regrets on his own that he made a vow initially — it is effective — end of his words.`,

  'siman_228/baer-heitev/part-001.txt|12|ב': `Common. Even if he was very ill it is nolad, because most sick people live — Beit Yosef in the name of responsum of Ramban. And it appears if he was goses it is not considered nolad, for most gosesim go to death, as below siman 339 — end of words of Shach.`,

  'siman_228/baer-heitev/part-001.txt|13|_': `Regret. And why do we practice now to open even with nolad — therefore it must be said "if you had known you would regret" etc. — Shach.`,

  'siman_228/baer-heitev/part-001.txt|14|_': `And the cause. Shach wrote: and it is astounding that I have not seen practiced thus even among rabbis who are precise etc. — the explanation is that what we say one must specify the vow is the obligation of the one who vows and not that the sage must ask about this. And one who does not specify the cause — this is because he vowed in general. And one who vowed on account of a cause and does not explain in truth — the sin is in his hand and we do not bring proof from fools — end of his words.`,

  'siman_228/baer-heitev/part-001.txt|15|א': `Gambling. Shach wrote: it appears a vow of dice and the like has no release even b'dieved, and so too in responsum of R' Eliyahu Mizrachi.`,

  'siman_228/baer-heitev/part-001.txt|15|ב': `They permit. Shach wrote: it must be that the rabbi goes according to his view that he wrote in responsum that there is no disagreement in this matter; but in responsum of Ra"M he wrote that in a matter of prohibition even if only d'rabbanan such as gambling with dice and the like — they do not permit him, and even though he cries and says he cannot stand by his oath — we pay no attention to him. And he wrote in Derishah that all this is specifically one whose craft is only dice-playing and has no other occupation and is disqualified for testimony on this account; but one whose occupation is not in this and sometimes plays — they can permit. And so too wrote the Bach.`,

  'siman_228/baer-heitev/part-001.txt|16|_': `Agent. Taz wrote: even through writing it is forbidden, for if not so with the daughter of Yiftach he could have sent a letter to Pinchas. And through an interpreter — meaning when the principals stand there too.`,

  'siman_228/baer-heitev/part-001.txt|17|_': `He was asked. And even b'dieved it is not permitted. Ran wrote: one who vowed on the sixth day in the morning not to be on the approaching Shabbat in this city, and while the day is near sunset he regretted — they can permit before Shabbat, for implied in his oath is that he is obligated to leave the city before Shabbat; therefore with nightfall the vow takes effect, and see below siman 234 seif 31.`,

  'siman_228/baer-heitev/part-001.txt|18|_': `Passover. Taz wrote it is better to permit close to Shavuot literally, and on Shavuot itself a second time; and Shach wrote eve of Shavuot and after Shavuot.`,

  'siman_228/baer-heitev/part-001.txt|20|ג': `Benefit. The view of most poskim is that benefit specifically is required; but if they coerced him and he vowed with his consent — whether from love or fear — they can release without his consent. Rashbatz wrote a worker can retract within his time even though he accepted cherem and nidui to do the work all that time — he can be asked about his acceptance without the employer's consent. And Beit Yosef wrote on him his words are not correct, for the employer does him good by giving him work that he will earn his livelihood. And Shach agrees with Rashbatz and rejected Beit Yosef's words because the good the employer does him is that he will do the work for him, whereas we require benefit specifically on account of the oath, as Rivash wrote. However in responsum of Maharam Alashkar it implies in such a case it is called benefit — requires study — end of his words.`,

  'siman_228/baer-heitev/part-001.txt|20|ד': `For benefit. Shach wrote: he did not know what is being said — if to exclude where the oath is not for another's benefit they can release — that is not so, for all poskim hold that with benefit, even though the oath is not for another's benefit, there is no release. And it is possible he mentioned the view of some in the latter section that specifically where there is benefit for another, suspicion applies — for otherwise suspicion does not apply that he will say "because I have no benefit in it he did not inform me." And Rivash wrote: whoever is not forbidden by another — even though he swore for another's benefit — all agree his consent is not needed. And in Darkei Moshe he wrote on this that this is not the poskim's view; and it appears to me all agree on this, for poskim deal only with receiving benefit, and Rivash deals explicitly with one who does not receive benefit — end of his words.`,

  'siman_228/siftei-kohen/part-001.txt|17|ב': `He is not asked until Iyar enters. And Ran wrote in responsum siman 50: one who vowed in the morning on the sixth day not to be on the approaching Shabbat in this city, and while the day is near sunset he regretted — they can permit before Shabbat, for implied in his oath is that he is obligated to leave the city before Shabbat; therefore with nightfall the vow takes effect. And see that Beit Yosef brought this, and see below end of siman 229:`,

  'siman_228/beur-hagra/part-002.txt|45|ב': `(Likkut) And there is one who. Nidui of this world is for creatures and nidui of the World to Come is for the Place; therefore this world's depends on release for creatures, and the World's to Come depends on release for the Place; therefore Yehuda's bones rolled until the Merciful One released him. Mordechai chapter 6 of Bava Metzia siman 993 — end of his words.`,

  'siman_228/yad-avraham/part-001.txt|1|_': `(Siman 228 seif 40) A father who made his son swear that he may not lend except with permission of Shimon and Levi — he may lend with permission of one of them. And see Taz who challenged from what Tur and Shulchan Aruch wrote regarding a vow in the opinion of the public, such as if he specified them with the intent of so-and-so and so-and-so etc., and why do we not say there too that if so-and-so said it, it was not in the opinion of the public. He further challenged from that which is in chapter 2 of Kiddushin regarding betrothal with multiple items. And see responsum Chacham Tzvi siman 4 who resolves Taz's difficulty. And the main point is Rashba's view that whenever he did not specify together, the main implication is whether both together or each separately — end of his words.`,
};

function patchFile(relPath, updates) {
  const fp = path.join(root, relPath);
  let text = fs.readFileSync(fp, 'utf8');
  let count = 0;
  for (const [keySuffix, en] of Object.entries(updates)) {
    const key = `${relPath}|${keySuffix}`;
    const full = BLOCKS[key];
    if (!full) {
      console.warn('missing', key);
      continue;
    }
    const [seif, marker] = keySuffix.split('|');
    const re = new RegExp(
      `(\\*\\*\\*\\* YD001 SOURCE BLOCK \\*\\*\\*\\*[\\s\\S]*?slug: [^\\n]+\\nseif: ${seif.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\nmarker: ${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\n)[\\s\\S]*?(\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
      'm'
    );
    if (!re.test(text)) {
      console.warn('NO MATCH', key);
      continue;
    }
    text = text.replace(re, `$1${full}$2`);
    count++;
  }
  fs.writeFileSync(fp, text);
  console.log(relPath, count, 'blocks');
  return count;
}

// Group updates by file
const byFile = {};
for (const [key, en] of Object.entries(BLOCKS)) {
  const [rel, seif, marker] = key.split('|');
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][`${seif}|${marker}`] = en;
}

let total = 0;
for (const [rel, updates] of Object.entries(byFile)) {
  total += patchFile(rel, updates);
}
console.log('Total blocks patched:', total);
