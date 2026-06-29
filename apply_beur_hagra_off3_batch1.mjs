import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(siman, seif){
  return brSegs(fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim());
}

// Off-by-3 batch 1 (cases 1–5). Append HE[N-2], HE[N-1], HE[N].
const APPEND_3 = [

  // siman24/seif-013 (he=5, en=2)
  { siman:'siman24', seif:'seif-013',
    n2:`He slaughtered, etc. — converts, etc. Like Rav Yehudah — R' Nachman holds like him; and in Terumat HaDeshen he ruled stringently in all cases, except according to the first version — like R' Yehoshua b'Rabbi Yehudah (end).`,
    n1:`(Supplement) Converts, etc. — he slaughtered, etc. And Terumat HaDeshen disagrees with all of this — from what is written there 20a, and like R' Huna said in the name of R' [X], etc. — hence the sugya follows that version; and the same applies in the other [version] that it is invalid — see there (end).`,
    n:`And if he pressed or concealed, etc. — like [the rule] regarding pausing.` },

  // siman124/seif-014 (he=5, en=2)
  { siman:'siman124', seif:'seif-014',
    n2:`(Supplement) Specifically when he knew, etc. Hagahot Ashiri chapter 5 seif 26, beginning of s.v. "asher" — and even if the tap protrudes beyond the pipe, etc. (end).
But if, etc. Tur; and like a gentile at a barrel, etc.; and as written above at the beginning of siman 125; and so wrote Mordechai and Hagahot Ashiri there chapter 12 s.v. "rather the halachah" — and Ravyah, etc.; and all this according to their approach, who hold like Rashi there 72b s.v. "the inside," etc., and Tosafot there s.v. "his strength" — as the Tur wrote at the beginning of siman 125; but according to what is written in Shulchan Arukh there that all of it is forbidden, the same applies here; and so wrote here in Terumat HaDeshen in the name of Ramban: in such a case all of it is forbidden; and what is written in Mordechai and Hagahot Ashiri there "or he returned it," etc. — Beit Yosef challenged this, for this is R' Papa's [ruling] stated in the Gemara; and likewise implied from the Tur who wrote only the first clause — that he removed it alone; and Darkei Moshe resolved that possibly R' Papa speaks specifically of [putting in] his finger; and his words are forced; and therefore it was omitted here as well.
And if he removed, etc. As written above, seif 24 and in the gloss there.`,
    n1:`(Supplement) But if it was not working, etc. — like his force. As written in Sanhedrin (77b): "this one who bound him," etc. — "his arrows" — and this is specifically in primary force, etc.; and see Ran. And if he removed without intent, etc. There in Ran (end).`,
    n:`(Supplement) If the tap was long, etc. Hagahot Ashiri chapter 4 seif 12 s.v. "rather," etc.; and see there in the aforementioned Hagahot Ashiri (in the supplement of paragraph 33): "Rashba responded," etc.; and it requires study there (end).` },

  // siman124/seif-019 (he=6, en=3)
  { siman:'siman124', seif:'seif-019',
    n2:`And they saw, etc. There — that he sealed it, etc.; and because [otherwise] he might touch intentionally and pour a libation; and see what I wrote above, seif 11.`,
    n1:`And likewise if, etc. Like the case of Charam there 55a; and according to R' Tam's explanation in Tosafot 59b s.v. "it was tied," etc.
And even if it became known, etc. The Rosh there, seif 10, in the name of Raavad.`,
    n:`And there is not, etc. There seif 12 — from the fact that they did not permit that case of the tap in seif 23, and likewise the case of the agardamus there 58a; and so wrote Terumat HaDeshen; and he wrote that therefore Rava erred there in the case of Mechuza because he did not focus until they challenged him from the case of the agardamus; and Raavad explained the case of the tap in another manner — the Rosh and Rashba cited it there; and as written in seif 23 in the Tur and gloss; and specifically, etc.` },

  // siman127/seif-001 (he=8, en=5)
  { siman:'siman127', seif:'seif-001',
    n2:`And all those disqualified, etc. But Ran wrote that they are not trusted — for according to version aleph: "if he is trusted by you that he is not a robber," etc. — as above; and it requires study; and likewise what was written "unless he is suspected," etc. — behold we say above in siman 119 seif 7 "and regarding another's," etc. — for we rule in chapter 8 of Yoma and in Bekhorot 35b like Rabban Shimon ben Gamliel who said: he is trusted regarding another's, etc.; rather, to permit — even the suspect is trusted; but to forbid — where he is trusted by virtue of his testimony — all those disqualified are not trusted, as above; and so Shach challenged; and it requires study.`,
    n1:`(Supplement) And all those disqualified from testimony, etc. For we rule: one who is suspected in one matter is not suspected [in another], etc. [and see Tosafot in Bekhorot 36a s.v. "one might say," etc.] — as written in siman 119 seif 4 and seif 7.`,
    n:`Unless, etc. See there, seif 7 — which is not what [Shach] wrote, who wrote "and regarding another's," etc.; but according to the words of the Rav [Maran] that is the essential ruling — as written there (in paragraph 18) (end).` },

  // siman135/seif-008 (he=5, en=2)
  { siman:'siman135', seif:'seif-008',
    n2:`And there are those who, etc. The Rosh there.`,
    n1:`But, etc. See Orach Chaim siman 451 seif 26.`,
    n:`(Supplement) There are those who, etc.; and there are, etc.; but, etc. From what is written 33b: "these jugs," etc.; "these flasks," etc.; and the Rosh explained there: even when one stores them for keeping, since they do not absorb; and all the more so with glass vessels; and see Ran there (end).` },

];

let ok = 0, fail = 0;
for (const { siman, seif, n2, n1, n } of APPEND_3) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== 3) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} (expected 3, he=${heS.length} en=${enS.length})`);
      fail++; continue;
    }
    const newSegs = [...enS, n2, n1, n];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+3 → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
