// siman271/seif-007: he=5, en=1 (no <br> tags in en.html)
// EN contains all 5 translations as paragraph-separated text. Split into 5 <br>-delimited segments.
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const ep = path.join(base,'siman271','seif-007','turei-zahav','en.html');
const hp = path.join(base,'siman271','seif-007','turei-zahav','he.html');

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
const raw = fs.readFileSync(ep,'utf8').replace(/^﻿/,'');
const enS = brSegs(raw);

console.log(`he=${heS.length} en=${enS.length} diff=${heS.length-enS.length}`);
if(heS.length!==5||enS.length!==1){
  console.log('ERROR: unexpected segment counts, aborting'); process.exit(1);
}

const merged = enS[0];

// HE[1]: starts at "And what he wrote "and not with a feather.""
const SPLIT1 = 'And what he wrote "and not with a feather."';
// HE[2]: starts at "And engraving — since it came to hand"
const SPLIT2 = 'And engraving — since it came to hand';
// HE[3]: starts at "And further it appears to me clear proof from chapter Eglah Arufah"
const SPLIT3 = 'And further it appears to me clear proof from chapter Eglah Arufah';
// HE[4]: starts at "And again I saw in responsum"
const SPLIT4 = 'And again I saw in responsum';

const idx1=merged.indexOf(SPLIT1);
const idx2=merged.indexOf(SPLIT2);
const idx3=merged.indexOf(SPLIT3);
const idx4=merged.indexOf(SPLIT4);

if([idx1,idx2,idx3,idx4].some(i=>i===-1)){
  console.log(`ERROR: split markers not found: ${idx1} ${idx2} ${idx3} ${idx4}`);
  process.exit(1);
}
if(!(idx1<idx2&&idx2<idx3&&idx3<idx4)){
  console.log(`ERROR: splits not in order: ${idx1} ${idx2} ${idx3} ${idx4}`); process.exit(1);
}

const seg0=merged.slice(0,idx1).trim();
const seg1=merged.slice(idx1,idx2).trim();
const seg2=merged.slice(idx2,idx3).trim();
const seg3=merged.slice(idx3,idx4).trim();
const seg4=merged.slice(idx4).trim();

const segs=[seg0,seg1,seg2,seg3,seg4];
console.log('\nSegments:');
segs.forEach((s,i)=>console.log(`  Seg${i} (${s.length}): ${s.slice(0,70)}`));

if(DRY){ console.log('\nDRY: would write 5 segments'); process.exit(0); }

const out=segs.join('<br />\n');
try{ fs.writeFileSync(ep,out,{encoding:'utf8',flag:'w'}); }
catch(_){ safeWrite(ep,out); }
const verify=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
console.log(`\nOK: wrote ${verify.length} segments`);
