// Fix 4 negative-diff turei-zahav cases by joining over-split EN segments
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function loc(si,se){ return path.join(base,si,se,'turei-zahav','en.html'); }
function hep(si,se){ return path.join(base,si,se,'turei-zahav','he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

// Each case: { si, se, groups: [ [enIndices], [enIndices], ... ] }
// groups maps EN segments into the desired output segments (one group per HE segment)
const CASES = [

  // siman98/seif-001: he=1, en=2 → join EN[0]+EN[1] into 1 seg
  { si:'siman98', se:'seif-001', expected:{he:1,en:2},
    groups:[[0,1]] },

  // siman194/seif-001: he=2, en=3 → EN[0] alone; EN[1]+EN[2] joined
  { si:'siman194', se:'seif-001', expected:{he:2,en:3},
    groups:[[0],[1,2]] },

  // siman107/seif-001: he=2, en=5 → EN[0] alone; EN[1..4] joined
  { si:'siman107', se:'seif-001', expected:{he:2,en:5},
    groups:[[0],[1,2,3,4]] },

  // siman124/seif-024: he=2, en=5 → EN[0] alone; EN[1..4] joined
  { si:'siman124', se:'seif-024', expected:{he:2,en:5},
    groups:[[0],[1,2,3,4]] },

];

let ok=0,fail=0;
for(const {si,se,expected,groups} of CASES){
  const ep=loc(si,se), hp=hep(si,se);
  try{
    const heS=brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    if(heS.length!==expected.he||enS.length!==expected.en){
      console.log(`SKIP ${si}/${se}: expected he=${expected.he} en=${expected.en}, got he=${heS.length} en=${enS.length}`);
      fail++; continue;
    }
    const newSegs=groups.map(idxs=>idxs.map(i=>enS[i]).join(' '));
    if(DRY){
      console.log(`DRY ${si}/${se}: ${enS.length}→${newSegs.length} segs`);
      newSegs.forEach((s,i)=>console.log(`  [${i}] ${s.slice(0,80)}...`));
      ok++; continue;
    }
    const out=join(newSegs);
    try{ fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
    catch(_){ safeWrite(ep,out); }
    const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    console.log(`OK ${si}/${se}: ${enS.length}→${v.length} segs (expected ${groups.length})`);
    ok++;
  } catch(e){ console.log(`ERROR ${si}/${se}: ${e.message}`); fail++; }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
