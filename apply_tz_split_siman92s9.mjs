// siman92/seif-009: he=3, en=1
// EN[0] already contains translations of HE[0]+HE[1]+HE[2] merged into one segment.
// Split at the natural boundaries to produce 3 segments.
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman92','seif-009','turei-zahav','en.html');
const hp = path.join(base,'siman92','seif-009','turei-zahav','he.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const enS = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());

console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
if(heS.length!==3||enS.length!==1){
  console.log('ERROR: unexpected segment counts, aborting');
  process.exit(1);
}

const merged = enS[0];

// Split point 1: HE[1] starts with "Written in Maharil Laws of Pesach:"
const SPLIT1 = 'Written in Maharil Laws of Pesach:';
// Split point 2: HE[2] starts with "And I again saw in Terumat HaDeshen siman 185"
const SPLIT2 = 'And I again saw in Terumat HaDeshen siman 185';

const idx1 = merged.indexOf(SPLIT1);
const idx2 = merged.indexOf(SPLIT2);

if(idx1===-1){ console.log(`ERROR: SPLIT1 not found in EN[0]`); process.exit(1); }
if(idx2===-1){ console.log(`ERROR: SPLIT2 not found in EN[0]`); process.exit(1); }
if(idx1>=idx2){ console.log(`ERROR: SPLIT1(${idx1}) must be before SPLIT2(${idx2})`); process.exit(1); }

const seg0 = merged.slice(0, idx1).trim();
const seg1 = merged.slice(idx1, idx2).trim();
const seg2 = merged.slice(idx2).trim();

console.log(`\nSeg0 length: ${seg0.length} chars (ends: ...${seg0.slice(-60)})`);
console.log(`Seg1 length: ${seg1.length} chars (starts: ${seg1.slice(0,60)}...)`);
console.log(`Seg2 length: ${seg2.length} chars (starts: ${seg2.slice(0,60)}...)`);

if(DRY){
  console.log('\nDRY: would write 3 segments');
  process.exit(0);
}

const out = [seg0, seg1, seg2].join('<br />\n');
try { fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
catch(_){ safeWrite(ep,out); }

const verify = brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`\nOK: wrote ${verify.length} segments`);
