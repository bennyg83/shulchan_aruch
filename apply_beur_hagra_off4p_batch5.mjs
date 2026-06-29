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
  const tmp = p + '.tmp'; fs.writeFileSync(tmp, content, {encoding:'utf8'}); fs.renameSync(tmp, p);
}

const CASES = [

  // siman127/seif-003 (he=16, en=8, diff=8) — append HE[9]–HE[16]
  { siman:'siman127', seif:'seif-003', segs: [
    // HE[9]
    `And a woman is trusted, etc. See Tosafot in Pesachim 4b s.v. "they trusted him," etc.; and this is what is written "and specifically," etc. — meaning regarding a biblical prohibition; but in a rabbinic matter she is trusted even in such a case, as written there; and likewise regarding a minor, as written below.`,
    // HE[10]
    `(Supplement) And a woman is trusted in, etc. In the Yerushalmi chapter 1 of Pesachim regarding that which teaches "everyone is trusted," etc.: "women are not included here, since they are lazy in checking even tiny amounts"; and Terumat HaDeshen explained: this means women are not included even where they would normally be trusted even in biblical matters; and it answers "since they," etc. — and therefore in such a case they are not trusted in biblical matters, and only in rabbinic matters; and see the Rosh there, who explains "they are not included" — that they are not trusted even in rabbinic matters — see there (end).`,
    // HE[11]
    `(Supplement) And a woman is trusted, etc. Meaning: in what is in her power to rectify — like a man; and proof from shechitah where she is trusted; and in Ketubot 72a: "she fed him untithed [produce]" — implying that he relies on her. Tosafot in Gittin 2b s.v. "one witness," etc.; and Pesachim 4b s.v. "they trusted him," etc. "Specifically," etc. — "but," etc. — meaning regarding a biblical prohibition; but in a rabbinic matter she is trusted — as written in Pesachim there [unlike those who say in the Yerushalmi there — meaning according to the explanation of Ba'al HaMaor, as above in Supplement 1 — which the Rosh cited; and as written in Orach Chaim siman 437 seif 4]; and proof that she is not trusted — from what is written there: "one might say," etc. — "[the mishnah] teaches us," etc.; and see Tosafot there s.v. the aforementioned (end).`,
    // HE[12]
    `(Supplement) Specifically, etc. See Tosafot in Pesachim above, who wrote "a matter involving effort"; but in the Mordechai it is written there in the name of Tosafot: because of doubt — as written here; and likewise in Semag; and likewise in Hagahot Ashiri there s.v. "even though," etc.`,
    // HE[13]
    `Such as when it is needed, etc. Hagahot Ashiri there (end). A minor, etc. At the end of chapter 3 of Sukkah and at the beginning of Chullin; and [this applies] when an adult is with him, but he himself is not trusted to say that he slaughtered properly. Ritva in Sukkah there. And as for what we say there "one who knows how to guard his hands," etc. — Rivash in siman 245 answered: whoever has it in his power [to rectify it] is trusted; but the Ritva there answered: only regarding what already had a presumption of prohibition is he not trusted — such as with shechitah, where an animal while alive has a presumption of, etc.; but regarding guarding, etc.; and he wrote: from this one can learn matters which, etc.; and as written in seif 4. In any case, etc. One can learn from the above.`,
    // HE[14]
    `And if, etc. Pesachim there.`,
    // HE[15]
    `But if, etc. Like [the rule] with shechitah, as above.`,
    // HE[16]
    `(Supplement) A minor, etc. — "and if he testifies," etc. But Tosafot in Pesachim above wrote that the reason he was trusted there is because it is in his power to rectify it; and therefore he was not trusted at the end of chapter 2 of Ketubot regarding Shabbat boundaries, which are rabbinic — specifically for adults, but not for minors, since it is not in [a minor's] power; and likewise written in Eruvin 59a s.v. "and Shabbat boundaries," etc. — and from there it is proven that a woman is trusted in rabbinic matters even in something not in her power. The rule: in something in their power to rectify — even a woman and a minor are trusted even in biblical [matters], like shechitah for a woman and a minor who knows how to guard his body, etc.; and specifically when there is no effort [involved] — as Tosafot wrote there — or doubt and a direction toward leniency — from the [case in] Pesachim there, where we say: specifically in rabbinic matters; and in rabbinic matters a woman is trusted even when it is not in her power — like Shabbat boundaries; and likewise a slave; but a minor, no — as above: when it is not in their power; and [in] a biblical [matter] even a woman is not trusted — from what is written in Eruvin, since Shabbat boundaries are rabbinic; but when it is in their power and [it is] rabbinic — even effort and doubt — both a woman and a minor are trusted, as written regarding chametz, as above. The rule in brief: [when it is] in their power and there is no doubt — both a woman and a minor are trusted even in biblical matters (see above siman 120 paragraph 36); and if one of these two conditions is lacking — both of them are not trusted in biblical matters. And in rabbinic matters with doubt — both are trusted; and when it is not in their power — a woman is trusted but not a minor. And a slave is like a woman.`,
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
        fs.writeFileSync(ep, join(newSegs), {encoding:'utf8', flag:'w'});
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
