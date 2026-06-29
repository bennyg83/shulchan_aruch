import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(si,se){ return path.join(base,si,se,'beur-hagra','en.html'); }
function hep(si,se){ return path.join(base,si,se,'beur-hagra','he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(si,se){ return brSegs(fs.readFileSync(loc(si,se),'utf8').replace(/^﻿/,'').trim()); }
function safeWrite(p, content){
  const tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, { encoding:'utf8' });
  fs.renameSync(tmp, p);
}

const CASES = [

  // siman177/seif-002 (he=11, en=5, diff=6) — append HE[6]–HE[11]
  { siman:'siman177', seif:'seif-002', segs: [
    // HE[6]
    `(Supplement) That each day, etc. So wrote the Rif — for a laborer's employment is by hire and each day stands alone (end).`,
    // HE[7]
    `Like an idle laborer, etc. Gemara there; and there are three approaches: the approach of Rashi — see there s.v. "Abaye said," etc.; and the approach of Tosafot — that he gives him according to that [type of] labor from which he is idle, since he is now sitting completely idle; and see Tosafot there s.v. "Rosh HaShanah" — "and he gives," etc.; and likewise the view of the Rosh; and see Tosafot in Bekhorot 29b s.v. "like an idle laborer," etc. And the approach of Rashba and Nimmukei Yosef follows R' Chananel there; and R' Chananel explained there: "as in other times of the year," etc. (and see what I wrote in Choshen Mishpat siman 265 in the supplement). [And there is also a fourth approach of the Tur — that he gives him wages for the [secondary] occupation and not for the original labor.]`,
    // HE[8]
    `(Supplement) Idle of, etc. Like the unattributed mishnah, and it follows R' Meir. Rif — and see in Milchamot, in the name of a responsum of the Rif, where he elaborated to prove that the ruling follows R' Meir; and likewise in Semag — see there (end).`,
    // HE[9]
    `And if he had, etc. This is [the ruling of] Shmuel there (69a), and it is the decided ruling.`,
    // HE[10]
    `(Supplement) Rather even, etc. It is lenient in two [respects] — a single dinar suffices, and [it applies] also for all the days of the partnership together; and likewise I emended in the Tur that it should read "that he gives," etc. first, "and the enactment of," etc. (as above paragraph 6) (end).`,
    // HE[11]
    `And likewise if he said to him, etc. This is [the ruling of] Rav there, and we rule accordingly; and all the more so regarding [the case of] Shmuel, where Rav concedes to him. And if he was, etc. From the incident with R' Elazar of Hagronya, according to his explanation; but the Tur did not record it; and likewise most commentators who explain it as Rashi does there — that with a partner one need give no wages at all; and so wrote Semag; and this is what is written in the gloss: "and all this when one," etc. And it is required, etc. — and not like, etc. See Tosafot 70a s.v. "who was," etc.; and see Shach.`,
  ]},

  // siman132/seif-002 (he=16, en=9, diff=7) — append HE[10]–HE[16]
  { siman:'siman132', seif:'seif-002', segs: [
    // HE[10]
    `(Supplement) And even ab initio, etc. There [in the Gemara] at the end of the [passage beginning] "when he arrived," etc.; and the case is "for example, when there was," etc.; and as above (in paragraph 11); but according to Rambam this is not necessary — and even post facto [it is forbidden] (as Rambam wrote there in halachah 24: "and if he measured and did not take payment, even though he fixed the price, [the wine] is forbidden," etc.; and see there the Hasagot and Lechem Mishneh) — for he holds that the stream of liquid is entirely forbidden even according to Rabban Shimon ben Gamliel; and this is unlike Tosafot and the Rav above in siman 126 seif 5 in the gloss (and see there in paragraph 11 in Supplement 2). But if, etc. There at the end of the [passage beginning] "when he arrived," etc.`,
    // HE[11]
    `And the vessel belongs to, etc. There: "and let him fix for him," etc. — "hence," etc.; unlike when it is in the possession of the gentile; and specifically when it is in the possession of the gentile; and see Eyn Mishpat siman 4 seif 3 in the gloss.`,
    // HE[12]
    `Or he grabbed it with his hand. There: "if he was holding it," etc.`,
    // HE[13]
    `Or he stands, etc. There: "hence his vessel," etc.; and we rule that when one says "go and acquire" — he acquires — as written in Bava Batra 86a and as written there in Shulchan Arukh (end). For as soon as it arrives, etc. See Turei Zahav and Shach.`,
    // HE[14]
    `(Supplement) And likewise if they measured it, etc. So explained Rashba in the name of R' Chananel and Ramban — that the gentile measured it for himself and drew [it] first before measuring; and even though he lifted it at the time he measured, [the Jew] did not acquire [it] — because that lifting was not for the purpose of acquisition; and the wine becomes forbidden immediately upon his measuring, even though he did not touch it through his own [direct] force — and as written there: "Rashbam interpreted it [as referring to] a gentile," etc.; and Rashba follows his own approach, holding that force [of a gentile] is forbidden even for benefit; but the Rosh and Tur ruled that it is permitted for benefit, and therefore even with the measuring of the gentile, all those conditions are required — and this is what is written "but if," etc. — "his ruling is," etc. (end). And he lifted it first. See Shach.`,
    // HE[15]
    `And all this, etc. As above in seif 1 in the gloss.`,
    // HE[16]
    `(Supplement) And all this does not, etc. Even though from that [case of a] gentile it is permitted — as written there (59b); Beit Yosef wrote: according to Rambam this is fine, for he holds [it applies] specifically when he intended to harm him; but according to Rashba who disagrees and wrote that even without intent it is forbidden — it requires study; and it seems to me that in such a case even Rashba concedes, since [the gentile] touches with the knowledge of the Jew (end).`,
  ]},

];

let ok = 0, fail = 0;
for (const { siman, seif, segs } of CASES) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== segs.length) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} expected=${segs.length} he=${heS.length} en=${enS.length}`);
      fail++; continue;
    }
    const newSegs = [...enS, ...segs];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} append=${segs.length} → ${newSegs.length}`);
    } else {
      try {
        fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      } catch(_) {
        safeWrite(ep, join(newSegs));
      }
      const verify = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${siman}/${seif}: ${enS.length}+${segs.length} → ${verify.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
