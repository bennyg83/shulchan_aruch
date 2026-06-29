// siman177/seif-031: he=4, en=1
// EN[0] contains HE[0]+HE[1]+HE[2]+HE[3] merged. Split into 4 segments.
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman177','seif-031','turei-zahav','en.html');
const hp = path.join(base,'siman177','seif-031','turei-zahav','he.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());

console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
if(heS.length!==4||enS.length!==1){
  console.log('ERROR: unexpected segment counts, aborting'); process.exit(1);
}

const merged = enS[0];

// HE[1] starts at "Question:"
const SPLIT1 = 'Question:';
// HE[2] starts at "Another question in Maharam"
const SPLIT2 = 'Another question in Maharam';
// HE[3] starts at "Answer to the first question"
const SPLIT3 = 'Answer to the first question';

const idx1 = merged.indexOf(SPLIT1);
const idx2 = merged.indexOf(SPLIT2);
const idx3 = merged.indexOf(SPLIT3);

if([idx1,idx2,idx3].some(i=>i===-1)){
  console.log(`ERROR: split markers not found: idx1=${idx1} idx2=${idx2} idx3=${idx3}`);
  process.exit(1);
}
if(!(idx1<idx2&&idx2<idx3)){
  console.log(`ERROR: splits not in order: ${idx1} ${idx2} ${idx3}`); process.exit(1);
}

const seg0 = merged.slice(0,idx1).trim();
const seg1 = merged.slice(idx1,idx2).trim();
const seg2 = merged.slice(idx2,idx3).trim();
const seg3 = merged.slice(idx3).trim();

console.log(`\nSeg0 (${seg0.length}): ${seg0.slice(0,80)}`);
console.log(`Seg1 (${seg1.length}): ${seg1.slice(0,60)}...`);
console.log(`Seg2 (${seg2.length}): ${seg2.slice(0,60)}...`);
console.log(`Seg3 (${seg3.length}): ${seg3.slice(0,60)}...`);

if(DRY){ console.log('\nDRY: would write 4 segments'); process.exit(0); }

const out = [seg0,seg1,seg2,seg3].join('<br />\n');
try { fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
catch(_){ safeWrite(ep,out); }
const verify = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`\nOK: wrote ${verify.length} segments`);
