/** Pass 3 — remaining Lord's Prayer / Capernaum / obvious garbage */
import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), 'output');
const BLOCKS = {
  'siman_228/baer-heitev/part-001.txt|3|א': `Three times. And b'dieved once suffices (only to strengthen the matter). And so Beit Yosef and Bach in the name of Rambam that he need not say only once — Shach.`,

  'siman_234/beer-hagolah/part-001.txt|3|ד': `Mishnah Shabbat daf 157a and Nedarim daf 77b:`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|8|_': `(Shach s.k. 145) And even though it appears Ran wrote thus — in my view Ran's words are an arranged sugya (chapter HaMedir): "do not adorn yourself and do not forbid" — if so she is called disfigured; behold even for R' Yosi adornment is not etc.; nevertheless since through calling her disfigured she is likely to transgress and be forbidden in marital relations, he can annul immediately — and this is exactly Ran's view above — end of his words.`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|9|_': `(There in Shulchan Aruch seif 30) They cannot make an agent — and so is Tur's wording; and Beit Yosef wrote the dispute of R' Yoshiah and R' Yehuda (chapter Na'arah) and Rosh ruled there halachah follows R' Yoshiah who is stringent — see there. And it is astounding, for regarding erection R' Yoshiah is lenient that through an agent there is no erection; also in minors (chapter 8 of Bava Metzia) in the sugya of borrowing in owners' presence Rosh wrote in Ran's name: since there is no resolution in the matter, we rule stringently; and regarding vows the husband cannot annul through an agent; and regarding borrowing in owners' presence he is exempt because of "from Heaven" — and Shulchan Aruch Choshen Mishpat (siman 345 s.k. 66 in the gloss) brought this. If so, necessarily regarding erection we should rule that through an agent there is erection — requires study. And see responsum Yad Eliyahu (siman 51) who challenged thus on Rama who did not emend here that some say they can fulfill through an agent as he brought the dissenting view regarding borrowing in owners' presence. Truly the wonder falls on Rosh who wrote plainly R' Yoshiah is stringent, and all the more on Tur who ruled one cannot fulfill through an agent — requires study.`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|10|_': `(There in seif 36 in the gloss) He is not annulled at all. See Sha'ar Efraim (siman 43):`,

  'siman_267/turei-zahav/part-001.txt|1|א': `One born in the house. Meaning his Canaanite maidservant mother became pregnant in an Israelite's house and gave birth with his permission; and acquisition for money is that he bought the offspring — not that it was already born before his acquisition, nor that it is still in its mother's womb at the time of acquisition and afterward. And he explains the laws in detail. The matter is that the Torah mentioned in two places "one born in the house" and "acquisition for money" regarding circumcision: in one it wrote they shall be circumcised on the eighth like an Israelite, and in one it wrote unspecified — meaning they are circumcised immediately even on the first day of their birth. And we say those that exist are similar to "for you" — born to their mothers in an Israelite's possession — are circumcised on the eighth; therefore in acquisition for money we find a clear distinction: if he bought a pregnant maidservant and she gave birth with him, circumcise on the eighth for it is similar to "for you"; if he took a maidservant and also her child she already bore — circumcise on day one. In "one born in the house" you do not find circumcision on day one, for she gave birth in an Israelite's possession in every case; rather you find he bought a maidservant only for this — that what she conceives with him and bears will be his; acquisition of fruits is not like acquisition of the body — he has no share in the mother and it is not similar to "for you". Or one who bought a maidservant on condition not to immerse her — she is not obligated in mitzvot and not similar to "for you"; in these circumcise on day one. These are the rabbis in the Gemara; R' Chama disagrees and is lenient, holding that even if similar to "for you" we require the mother be impure from birth, then circumcise on the eighth, and he derives this from scripture; therefore even if born in an Israelite's possession, the maidservant mother must immerse first before birth, but if birth preceded immersion — circumcise on day one and need not wait until the eighth. Thus in one born in the house — conceived with him and gave birth — there is a distinction between immersion before birth or after. In acquisition for money: if he bought while pregnant and she immersed and gave birth — circumcise on the eighth; if two bought the pregnant maidservant — one the maidservant and one the fetus — even if she immersed before birth, circumcise on day one since at birth the fetus-owner had no share in the mother and it was not similar to "for you". Rambam and Tur ruled stringently like the rabbis — not circumcise one born in the house and acquisition for money on day one if born in an Israelite's possession even if immersed later; nevertheless if the eighth day occurs on Shabbat, we say perhaps the halachah follows R' Chama that he is not circumcised on the eighth, and it would be circumcision not in its time, and therefore it does not override Shabbat. With this these matters are explained in Tur and Shulchan Aruch.`,

  'siman_267/turei-zahav/part-001.txt|1|ב': `And even though he acquired the fetus by itself. Since it is in its mother's womb it is called born in his possession, for behold also its mother is his.`,

  'siman_267/turei-zahav/part-001.txt|1|ג': `And if its mother immersed after she gave birth etc. This is not in Tur but Rambam so wrote; and it appears his reason is that whenever immersion nullified the condition he initially stipulated not to immerse her — it is as though he bought the mother without condition, as above.`,

  'siman_267/turei-zahav/part-001.txt|2|_': `Except one born in the house etc. I already explained the reason Rambam is stringent in this ruling from doubt that he is not circumcised until the eighth, and we are uncertain whether Shabbat is overridden.`,

  'siman_267/turei-zahav/part-001.txt|21|_': `The master takes Shabbat. He did not say "even though he takes the loss" because Shabbat has greater importance — he still enjoys every hour of the slave, and that hour he does not wish to feed him.`,

  'siman_242/beur-hagra/part-001.txt|1|א': `Liable etc. Mishnah end of Kerisos:`,

  'siman_242/beur-hagra/part-001.txt|1|ב': `His father etc. Chapter 4 of Bava Metzia:`,

  'siman_242/beur-hagra/part-001.txt|1|ג': `But etc. Kiddushin 31b, as that which Mar said in the name of R' Eliezer etc.:`,

  'siman_228/beur-hagra/part-001.txt|20|ג': `And specifically one who vowed etc. Tosafos and Rosh and Shulchan Aruch in Nedarim there, and Rosh and Rashba in Gittin there, to resolve Tosafos's difficulty ad loc. "lest there be concern" above; and so Ran and Shulchan Aruch; and another proof he wrote from chapter 7 of Sotah 36b: "he said to him go ask" etc., "he said to him and he asked" etc., and they established it in the Gemara; and another proof from what is written in Gittin 46a: R' Avahu, what is R' Yosi's reason etc.:`,
  'siman_228/beur-hagra/part-001.txt|20|כ': `And some say etc. For Tzidkiyahu proves the opposite — "go see what happened to him" — and in Sanhedrin and scripture cried out; and also regarding King Nebuchadnezzar who rebelled etc., as the great sage wrote his sins are counted; and Raavan there and Shulchan Aruch; nevertheless it is not necessary that their punishment is because they released initially; and Tosafos and Ran there wrote that what they released initially was because for a mitzvah matter they release, and it was a mitzvah matter — see there; and Rivash wrote they were punished because of desecration of Hashem's name; and also what they released initially appeared to them a mitzvah matter but they acted improperly and found a pretext — and so Shulchan Aruch wrote. However the court etc., and Rivash siman 70; nevertheless it is proven b'dieved it is permitted, for if not what would help Tzidkiyahu, and likewise a mitzvah matter would not help if the release were nothing. And Mahariq brought proof from what is written in Shevuot 29: "so there not be annulment" even though he made them swear before Hashem — from here etc., "you stand before Hashem" etc., "to pass in the covenant of Hashem and His oath" etc.; and because he did him good on account of the oath — on condition thus he brought them to Eretz Yisrael; and so Yismach Moshe — it was on condition thus, and service needs the Exalted One:`,
  'siman_228/beur-hagra/part-001.txt|24|_': `A husband etc. Tosafos there 35b ad loc. "but." And if you ask regarding "and he declared her" (ad loc.) etc., and one can answer etc.; and so Rosh and Ran there and Shulchan Aruch:`,
  'siman_228/beur-hagra/part-001.txt|33|ב': `It is a vain oath. As written in chapter 3 of Shevuot and Rashi means no annulment is needed at all and he receives lashes as written; and as Mordechai wrote beginning of Shevuot — see there; and as explained above siman 239 seif 4 — requires study: are not all enactments of the sages and midrash of sages etc. — see there seif 67 in the gloss; nevertheless it appears to me etc. Torah reading etc.; and it is possible here it deals with an enactment not to do, and Rashba follows his view as written above seif 66 in the words "however" etc., and Shach there and here. And Mordechai's words there require study, for he wrote a vain vow takes effect and needs release — see below siman 232 seif 5; and so he wrote afterward "but in other places" etc., that there is no proof from there that it is not from the Torah, as written above siman 246 seif 1 in the gloss; and in a time of pressure etc., as written in chapter 1 of Nedarim (8a); and the main point is that of Torah no annulment is needed, but a rabbinic prohibition of their words needs annulment — and so here — as written in responsa of Ramban and Rivash:`,

  'siman_234/beer-hagolah/part-001.txt|53|_': `Mishnah Shabbat daf 157b and Nedarim daf 76b:`,
};

function patchFile(relPath, updates) {
  const fp = path.join(root, relPath);
  if (!fs.existsSync(fp)) return 0;
  let text = fs.readFileSync(fp, 'utf8');
  let count = 0;
  for (const [keySuffix, en] of Object.entries(updates)) {
    const key = `${relPath}|${keySuffix}`;
    const full = BLOCKS[key];
    if (!full) continue;
    const [seif, marker] = keySuffix.split('|');
    const re = new RegExp(
      `(\\*\\*\\*\\* YD001 SOURCE BLOCK \\*\\*\\*\\*[\\s\\S]*?seif: ${seif.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\nmarker: ${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\n)[\\s\\S]*?(\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
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
  console.log(relPath, count);
  return count;
}

const byFile = {};
for (const [key, en] of Object.entries(BLOCKS)) {
  const [rel, seif, marker] = key.split('|');
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][`${seif}|${marker}`] = en;
}
let t = 0;
for (const [rel, u] of Object.entries(byFile)) t += patchFile(rel, u);
console.log('pass3 total', t);
