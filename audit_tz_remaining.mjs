import fs from 'fs';
import path from 'path';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }

const results = {};
const entries = fs.readdirSync(base).filter(d=>d.startsWith('siman'));
let checked=0, mismatches=0;

for(const si of entries.sort()){
  const siPath=path.join(base,si);
  const seifs=fs.readdirSync(siPath).filter(d=>d.startsWith('seif'));
  for(const se of seifs.sort()){
    const tzPath=path.join(siPath,se,'turei-zahav');
    if(!fs.existsSync(tzPath)) continue;
    const en=path.join(tzPath,'en.html');
    const he=path.join(tzPath,'he.html');
    if(!fs.existsSync(en)||!fs.existsSync(he)) continue;
    checked++;
    const heS=brSegs(fs.readFileSync(he,'utf8').replace(/^﻿/,'').trim());
    const enS=brSegs(fs.readFileSync(en,'utf8').replace(/^﻿/,'').trim());
    const diff=heS.length-enS.length;
    if(diff!==0){
      mismatches++;
      if(!results[diff]) results[diff]=[];
      results[diff].push({si,se,he:heS.length,en:enS.length});
    }
  }
}

console.log(`Checked: ${checked}  Mismatches: ${mismatches}\n`);
for(const d of Object.keys(results).map(Number).sort((a,b)=>b-a)){
  const cases=results[d];
  console.log(`diff=${d}: ${cases.length} cases`);
  for(const c of cases) console.log(`  ${c.si}/${c.se}  he=${c.he} en=${c.en}`);
}
