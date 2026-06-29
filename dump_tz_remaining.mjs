// Dumps HE content for all positive turei-zahav diff cases grouped by diff size
import fs from 'fs';
import path from 'path';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }

const entries = fs.readdirSync(base).filter(d=>d.startsWith('siman'));
const byDiff = {};

for(const si of entries.sort()){
  const siPath=path.join(base,si);
  const seifs=fs.readdirSync(siPath).filter(d=>d.startsWith('seif'));
  for(const se of seifs.sort()){
    const tzPath=path.join(siPath,se,'turei-zahav');
    if(!fs.existsSync(tzPath)) continue;
    const en=path.join(tzPath,'en.html');
    const he=path.join(tzPath,'he.html');
    if(!fs.existsSync(en)||!fs.existsSync(he)) continue;
    const heS=brSegs(fs.readFileSync(he,'utf8').replace(/^﻿/,'').trim());
    const enS=brSegs(fs.readFileSync(en,'utf8').replace(/^﻿/,'').trim());
    const diff=heS.length-enS.length;
    if(diff>0){
      if(!byDiff[diff]) byDiff[diff]=[];
      byDiff[diff].push({si,se,heS,enS});
    }
  }
}

let out='';
for(const d of Object.keys(byDiff).map(Number).sort((a,b)=>b-a)){
  out+=`\n=== DIFF=${d} (${byDiff[d].length} cases) ===\n`;
  for(const {si,se,heS,enS} of byDiff[d]){
    out+=`\n--- ${si}/${se} (he=${heS.length} en=${enS.length}) ---\n`;
    out+=`\n[EXISTING EN:]\n`;
    enS.forEach((s,i)=>{ out+=`[${i}] ${s}\n`; });
    out+=`\n[MISSING HE SEGMENTS (${d} to add):]\n`;
    // The last `diff` HE segments are missing from EN
    const missing=heS.slice(enS.length);
    missing.forEach((s,i)=>{ out+=`[${enS.length+i}] ${s}\n`; });
  }
}

fs.writeFileSync('tz_remaining_dump.txt', out, 'utf8');
console.log('Written: tz_remaining_dump.txt');
console.log(`Total positive-diff cases: ${Object.values(byDiff).reduce((a,b)=>a+b.length,0)}`);
