/** Pass 2 — remaining citation/garbage blocks simanim 228, 234, 242, 267 */
import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), 'output');

const BLOCKS = {
  'siman_228/beer-hagolah/part-001.txt|3|ב': `Rambam in chapter 7 of Hilchot Shevuot law 5:`,
  'siman_228/beer-hagolah/part-001.txt|44|_': `Rosh in responsum general 8:`,
  'siman_228/beer-hagolah/part-001.txt|45|א': `In responsum to Ramban, which is in responsum of Rashba; and he concluded there regarding Yehuda as stated (Bava Kamma 92a) because he thought nidui on condition — if the condition was fulfilled, annulment is not needed, and therefore he did not ask about his nidui etc.; and they say in Makkot 11b nidui on condition requires annulment — from where do we learn? From Yehuda etc.:`,
  'siman_228/beer-hagolah/part-001.txt|45|ב': `Mordechai chapter 7 of Bava Metzia in the name of R' Peretz and Rabbeinu Yerucham in Netiv 14 that he received from his teachers; and therefore they did not release Yehuda — not Yaakov and not Moshe Rabeinu — until Moshe Rabeinu prayed for him:`,
  'siman_228/beer-hagolah/part-001.txt|46|א': `In responsum of Ramban siman 274:`,
  'siman_228/turei-zahav/part-001.txt|20|ו': `Some say there is no distinction. This is Rambam's view, which Tur wrote; and Rambam did not distinguish, for he wrote: Reuven who made Shimon swear and he answered amen — they do not release Shimon except before Reuven; and likewise if Reuven swore not to benefit from him, Shimon regretted and asked a sage — they do not release him except before Shimon; and even if Shimon was an idolater or a minor, so the one forbidden knows this one released his vow and therefore he may benefit — end of his words. It is clear from his words that Rambam does not care about receiving benefit, and he does not care that the oath be in another's opinion; rather in every case, whether they make him swear or he swore on his own, he must beware of suspicion; therefore he must inform the one forbidden. And that which he concluded "so the one forbidden knows" — this refers to the latter section regarding the one forbidden, i.e. Shimon knows from this and from that; we learn to the former section that Reuven who is the one forbidding must inform — one reason. And Beit Yosef expanded to explain Rambam's words in what is not necessary; only what Rambam wrote in the latter section that Shimon may not benefit from him and concluded "the one forbidden must know" etc. — what suspicion is there, for as long as the one forbidden does not know the forbidding party released his vow, certainly he will not benefit from him. And we must say he means that he himself will not do benefit for Shimon, and in this suspicion applies from Shimon if he sees Reuven benefiting him; therefore he must inform him. And so is explained in the true version Beit Yosef brings in Rambam who wrote "not benefit in Shimon" etc.:`,
  'siman_228/turei-zahav/part-001.txt|20|ז': `For the need of a mitzvah etc. I wondered at the rabbi who brought this to practical halachah, for this reasoning is from Tosafos and Ran in chapter R' Eliezer of Nedarim — to seek a reason why the Sanhedrin permitted Tzidkiyahu, because Tzidkiyahu was greatly pained that the matter was not revealed and he was idle from heavenly work etc.; nevertheless we see they were punished as it says "sit on the ground in silence," and Beit Yosef so wrote. And truly in Rivash siman 94 he mentioned these words of Tosafos — to combine this with other releases as he writes there explicitly; Beit Yosef concludes there that by law even release is not needed, such as a woman who swore not to marry except with her mother's consent and her mother does not admit because of fear of relatives, but in private she agrees etc. — only from stringency he concludes release is needed. And in siman 70 and 186 Rivash wrote explicitly on Tosafos's words above: they found a pretext to release because of his fear since he was king and they acted improperly; and this is why they found no answer for Nevuchadnezzar etc. And he concludes on this: it arose in our hands that whoever swore for another's benefit is not released in any way without his consent etc. Therefore one should not heed leniency in this release; and it is possible Rama too intended that one may make this a branch when there is release in any case, even though there is some hesitation — so it appears to me.`,

  // siman 234
  'siman_234/beer-hagolah/part-001.txt|3|ד': `Mishnah Shabbat daf 157a and Nedarim daf 77b:`,
  'siman_234/siftei-kohen/part-001.txt|28|_': `To the house of mourning or to the house of feasting. See there:`,

  // siman 242 - key garbage
  'siman_242/siftei-kohen/part-001.txt|15|_': `What is here or there — the judgment of the public. That is, in the midst of the public's opinion it is the same law — see there:`,

  // siman 267
  'siman_267/baer-heitev/part-001.txt|3|_': `Shabbat. But Nemukei Yosef on Sunday after Shabbat is a weekday; but he is told his son does not circulate Shabbat between native of the house, or give money as "the columnist" — but his rabbis will fight for the word of slavery, even if his mother and daughter were not allowed to sit in Israel:`,
  'siman_267/siftei-kohen/part-001.txt|12|_': `See there in the gloss. And see responsum in that place:`,
};

function patchFile(relPath, updates) {
  const fp = path.join(root, relPath);
  if (!fs.existsSync(fp)) {
    console.warn('missing file', relPath);
    return 0;
  }
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
console.log('pass2 total', t);
