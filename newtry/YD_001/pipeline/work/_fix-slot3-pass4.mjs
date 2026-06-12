/** Pass 4 — simanim 234, 242, 267 priority-slug garbage */
import fs from 'fs';
import path from 'path';
const root = path.join(process.cwd(), 'output');

const BLOCKS = {
  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|16|_': `(There) And some say bathing, adorning, and laundering her clothes are affliction of the soul, as explained in the sugya — R' Yosi holds laundering is better than bathing and adorning, for even according to those who rule like the rabbis against R' Yosi, nevertheless we do not find the rabbis disagree with R' Yosi here; and from Torah to say the rabbis disagree with opposite reasoning — that for rabbis bathing and adorning are affliction of the soul but laundering not, and for R' Yosi the reverse; and even according to Ran ad loc. "and compare R' Yosi to R' Yosi" — that for rabbis one cannot ask since bathing is affliction of the soul but laundering is not — and we must also say that ultimately we do not ask rabbis against rabbis; nevertheless it appears the main point is like Ran's other answer, that for rabbis even though it is affliction of the soul, others' lives take precedence, for there is no difficulty at all, for we see R' Yosi requires a verse as it is written "and for all its animals"; and it is possible Ran wrote only for clarity to give two answers, but the main point is the other answer — and we hold laundering for all is affliction of the soul — end of his words.`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|17|_': `(There in the gloss) Not that they are matters between them — it must be: they are only matters between them:`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|18|_': `(Seif 69) Even though the vow did not take effect — as explained above (seif 21):`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|19|_': `(Taz s.k. 63) And this does not sit well with me — all these words of Taz Maharit (part 1) siman 55 wrote:`,

  'siman_234/rabbi-akiva-eiger-yd/part-001.txt|20|_': `(Shach s.k. 86) "Your hands performed with me" etc. — see Shach above (siman 216 s.k. 8) and Kesef Mishneh and Turei Zahav (beginning of Nedarim) and Netivot HaMishpat (27:8 p. 210):`,

  'siman_267/siftei-kohen/part-001.txt|9|ד': `Behold he is a free man. And there is no distinction whether he immersed before his master or not before his master — so implies Tur, according to Rashi's and Rosh's version; and according to them, regarding a convert whose slaves preceded him and immersed before him — there is a distinction: if they immersed before their convert-master immersed, even unspecified they acquired themselves as free men; but if their convert-master immersed first and afterward they immersed — if they specified they immerse for the sake of freedom they acquired themselves as free men, but if they immersed unspecified — not. But Rif and Rambam distinguish even regarding an Israelite's slave — they do not acquire themselves as free men except when they said at immersion "behold I immerse before you for the sake of conversion"; and if he immersed before his master he need not specify, for once he immersed unspecified he was freed. And so Semag negative commandment 117; and so Rashba in responsum Beit Yosef brought at end of daf 311:`,

  'siman_267/siftei-kohen/part-001.txt|10|_': `But if he acquired him etc. Noda B'Yehuda wrote: if an idolater took him in war, he too acquires his body; and Beit Yosef wrote below 312a that this is specifically in war which is the law of the kingdom; however he wrote in the name of responsum of Rashba that even if he acquired him by the law of the kingdom his body is not acquired; and Bach expanded on this in seif 13 and concludes the main point that even if captured in peacetime, and all the more so in war by the law of the kingdom — his body is acquired; see there:`,

  'siman_267/pitchei-teshuva/part-001.txt|1|_': `He did nothing. See responsum Radbaz part 1 siman 49 who wrote this is specifically regarding becoming obligated in mitzvot; but regarding cooking of idolaters and regarding contact with wine which is rabbinic — his law is like a full slave who does not forbid — see there:`,

  'siman_267/pitchei-teshuva/part-001.txt|2|_': `To circumcise him etc. See responsum Rashbash siman 89 who wrote in the name of Baal HaManhig in Bereishit Rabbah parashah 17 he is a husband; and so the common people say; and they already said in Yerushalmi: any halachah weak in your hand — see how the public practices and practice like them — end of his words — see there:`,

  'siman_267/pitchei-teshuva/part-001.txt|3|_': `That he go out with it to freedom. Be'er Heitev in the name of Shach and Taz. And Taz concludes this did not enter any posek's mind ever, except that in Derishah he wrote from his own reasoning that expressions effective for a woman in siman 222 are also effective for a slave — and he was not precise — end of his words. And see responsum Avnei Nezer part 2 siman 106 who challenged Taz on this; and at the end brought Rambam's words chapter 3 of Hilchot Zechiyah UMatanah law 14, explained there explicitly like Derishah and Shach — see there. And see Sha'ar HaMelech chapter 6 of Hilchot Avadim halachah 12 that he too answered Taz on this:`,

  'siman_242/siftei-kohen/part-001.txt|15|_': `What is here or there — the judgment of the public; that is, in the midst of the public's opinion the same law applies — see there:`,
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
    if (!re.test(text)) { console.warn('NO MATCH', key); continue; }
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
console.log('pass4 total', t);
