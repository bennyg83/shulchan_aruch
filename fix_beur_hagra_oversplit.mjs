import fs from 'fs';
import path from 'path';
const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function loc(siman,seif){ return path.join(base,siman,seif,'beur-hagra','en.html'); }
function he(siman,seif){ return path.join(base,siman,seif,'beur-hagra','he.html'); }
function join(segs){ return segs.join('<br />\n'); }

function splitAt(str, marker){
  const i = str.indexOf(marker);
  if(i<0) throw new Error('Marker not found: <<'+marker+'>> in:\n'+str.substring(0,200));
  return [str.substring(0,i), str.substring(i)];
}
function trim(s){ return s.replace(/^\s+|\s+$/g,''); }

const fixes = [

  // siman125/seif-003 he=2 en=3
  // EN[1] = HE[1] + HE[2][1] joined at " (Likut) If, etc., mixed together"
  // EN[2] = HE[2][2], EN[3] = HE[2][3]
  { siman:'siman125', seif:'seif-003', fn(s){
    const [a,b] = splitAt(s[0], ' (Likut) If, etc., mixed together');
    return [trim(a), [trim(b),s[1],s[2]].join('\n')];
  }},

  // siman129/seif-003 he=2 en=3
  // EN[1] = HE[1] + HE[2][1] at " (Extract) That which is permitted, etc. — Tosafot"
  { siman:'siman129', seif:'seif-003', fn(s){
    const [a,b] = splitAt(s[0], ' (Extract) That which is permitted, etc. — Tosafot');
    return [trim(a), [trim(b),s[1],s[2]].join('\n')];
  }},

  // siman160/seif-023 he=2 en=3
  // EN[1] = HE[1] + HE[2][1] at " (Extract) The lender, etc. Tur"
  { siman:'siman160', seif:'seif-023', fn(s){
    const [a,b] = splitAt(s[0], ' (Extract) The lender, etc. Tur');
    return [trim(a), [trim(b),s[1],s[2]].join('\n')];
  }},

  // siman188/seif-006 he=2 en=3
  // EN[3] contains HE[1][3] and HE[2][1] — the (Likut) part follows whitespace
  { siman:'siman188', seif:'seif-006', fn(s){
    const [a,b] = splitAt(s[2], '(Likut) If it is a piece');
    return [[s[0],s[1],trim(a)].join('\n'), trim(b)];
  }},

  // siman123/seif-008 he=2 en=4
  // EN[4] = HE[1][4] + HE[2][1] at " (supplement) And there are, etc. — from"
  { siman:'siman123', seif:'seif-008', fn(s){
    const [a,b] = splitAt(s[3], ' (supplement) And there are, etc. — from');
    return [[s[0],s[1],s[2],trim(a)].join('\n'), trim(b)];
  }},

  // siman135/seif-006 he=2 en=4
  // EN[3] = HE[1][3] + HE[2][1] at " [Likut: their law like all earthenware"
  { siman:'siman135', seif:'seif-006', fn(s){
    const [a] = splitAt(s[2], ' [Likut: their law like all earthenware');
    // extract the bracketed likut text directly from EN[3]
    const bStart = s[2].indexOf('[Likut: ');
    const bEnd = s[2].lastIndexOf(']');
    const rawLikut = s[2].substring(bStart+8, bEnd); // strip "[Likut: " and "]"
    const likutFixed = rawLikut.replace(/^their/, '(Likut) their');
    return [[s[0],s[1],trim(a)].join('\n'), [likutFixed, s[3]].join('\n')];
  }},

  // siman124/seif-011 he=3 en=5
  // EN[1] = HE[1] + HE[2][1] at " (supplement) or with his foot. Not like"
  // EN[5] = HE[2][5] + HE[3][1] at " (supplement) if he touched, etc. From"
  { siman:'siman124', seif:'seif-011', fn(s){
    const [a1,b1] = splitAt(s[0], ' (supplement) or with his foot. Not like');
    const [a5,b5] = splitAt(s[4], ' (supplement) if he touched, etc. From');
    return [trim(a1), [trim(b1),s[1],s[2],s[3],trim(a5)].join('\n'), trim(b5)];
  }},

  // siman126/seif-005 he=3 en=4
  // EN[1]+EN[2]+EN[3] = HE[1][1..3]
  // EN[4] = HE[1][4] + HE[2] + HE[3]
  //   split1 at " And if it is stam, etc. There in Tosafot and in Tosafot 73a"
  //   split2 at " (Collection) However it does not forbid, etc. Tosafot and proof"
  { siman:'siman126', seif:'seif-005', fn(s){
    const [a4,r4] = splitAt(s[3], ' And if it is stam, etc. There in Tosafot and in Tosafot 73a');
    const [b4,c4] = splitAt(r4, ' (Collection) However it does not forbid, etc. Tosafot and proof');
    return [[s[0],s[1],s[2],trim(a4)].join('\n'), trim(b4), trim(c4)];
  }},

  // siman114/seif-001 he=2 en=8
  // EN[7] = HE[1][7] + HE[2][1] at " (Collected) And there are those who permit beer of honey — Be'er HaGolah"
  { siman:'siman114', seif:'seif-001', fn(s){
    const [a7,b7] = splitAt(s[6], " (Collected) And there are those who permit beer of honey — ");
    return [[s[0],s[1],s[2],s[3],s[4],s[5],trim(a7)].join('\n'), [trim(b7),s[7]].join('\n')];
  }},

  // siman108/seif-001 he=4 en=22
  // EN[13] = HE[1][13] + HE[2][1] at " (Likut) And all the more if, etc. So he learned"
  // EN[14] = HE[2][2] + HE[3][1] at " (Likut) But if one of them, etc. From covered"
  // EN[20] = HE[3][7] + HE[4][1] at " (Likut) Some say issur that forbids, etc. This dispute"
  { siman:'siman108', seif:'seif-001', fn(s){
    const [a13,b13] = splitAt(s[12], ' (Likut) And all the more if, etc. So he learned');
    const [a14,b14] = splitAt(s[13], ' (Likut) But if one of them, etc. From covered');
    const [a20,b20] = splitAt(s[19], ' (Likut) Some say issur that forbids, etc. This dispute');
    const g1 = [s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],s[8],s[9],s[10],s[11],trim(a13)].join('\n');
    const g2 = [trim(b13), trim(a14)].join('\n');
    const g3 = [trim(b14),s[14],s[15],s[16],s[17],s[18],trim(a20)].join('\n');
    const g4 = [trim(b20),s[20],s[21]].join('\n');
    return [g1,g2,g3,g4];
  }},

  // siman109/seif-001 he=4 en=8
  // EN[7] = HE[1][7] + HE[2][1] at " (Likkut) And some are stringent, etc. Rashi in chapter 1 of Yoma"
  // EN[8] = HE[2][2] + HE[3][1] + HE[4][1]
  //   split1 at " (Likkut) And there is no distinction, etc. Unlike Hagahot ShaDa who wrote that in d'rabbanan even"
  //   split2 at " (Likkut) And there is no distinction, etc. Meaning: we require sixty"
  { siman:'siman109', seif:'seif-001', fn(s){
    const [a7,b7] = splitAt(s[6], ' (Likkut) And some are stringent, etc. Rashi in chapter 1 of Yoma');
    const [a8,r8] = splitAt(s[7], " (Likkut) And there is no distinction, etc. Unlike Hagahot ShaDa who wrote that in d'rabbanan even");
    const [b8,c8] = splitAt(r8, " (Likkut) And there is no distinction, etc. Meaning: we require sixty");
    return [[s[0],s[1],s[2],s[3],s[4],s[5],trim(a7)].join('\n'), [trim(b7),trim(a8)].join('\n'), trim(b8), trim(c8)];
  }},

  // siman330/seif-001 he=3 en=5 — wrong EN content, replace with correct translations
  { siman:'siman330', seif:'seif-001', fn(_s){
    return [
      'And of an Israelite, etc. The Rosh in his Piskei learned from the first clause — dough of a gentile, etc., as mentioned above — just as kneading by an Israelite does not obligate, etc.',
      'She gave, etc. The mishnah there.',
      'A gentile, etc. Menachot there.',
    ];
  }},
];

let ok=0, fail=0;
for(const {siman,seif,fn} of fixes){
  const ep = loc(siman,seif);
  const hp = he(siman,seif);
  try {
    const raw = fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim();
    const heRaw = fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim();
    const s = brSegs(raw);
    const heS = brSegs(heRaw);
    const groups = fn(s);
    if(groups.length !== heS.length){
      console.log('MISMATCH '+siman+'/'+seif+' groups='+groups.length+' he='+heS.length);
      fail++; continue;
    }
    const out = join(groups);
    if(DRY){
      console.log('DRY '+siman+'/'+seif+' → '+groups.length+' segs');
      groups.forEach((g,i)=>console.log('  G['+(i+1)+']: '+g.substring(0,80)));
    } else {
      fs.writeFileSync(ep, out, {encoding:'utf8', flag:'w'});
      console.log('OK '+siman+'/'+seif+' → '+groups.length+' segs');
    }
    ok++;
  } catch(e){
    console.log('ERROR '+siman+'/'+seif+': '+e.message);
    fail++;
  }
}
console.log('\nDone. ok='+ok+' fail='+fail);
