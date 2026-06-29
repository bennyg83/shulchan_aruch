// Fix all 12 he.html files that contain English text embedded after the Hebrew.
// Strategy:
//   - Mismatched (he>en): extract English from he.html, split into segments, write to en.html, strip from he.html
//   - Balanced (he=en): strip English from he.html only (en.html already correct)
//   - siman127/seif-001/mateh-yehonatan: special — translate HE[1] Hagah, append to en.html, strip from he.html
import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s=>s.trim()); }
function join(segs){ return segs.join('<br />\n'); }
function safeWrite(p,c){ const t=p+'.tmp'; fs.writeFileSync(t,c,{encoding:'utf8'}); fs.renameSync(t,p); }

function stripEnglish(heRaw){
  // Find first line starting with a capital English word followed by lowercase + 40 chars
  const m = heRaw.match(/\n([A-Z][a-z]+ .{40,})/);
  if(!m) return null;
  const idx = heRaw.indexOf(m[0]);
  return heRaw.slice(0, idx);
}

function loc(si,se,c){ return path.join(base,si,se,c,'en.html'); }
function hep(si,se,c){ return path.join(base,si,se,c,'he.html'); }

let ok=0, fail=0;

// ─── CASE 1: siman177/seif-001/yad-ephraim (he=5, en=1) ─────────────────────
// English in he.html = HE[1..4] merged; split into 4, append to en[0]
{
  const si='siman177',se='seif-001',c='yad-ephraim';
  try {
    const ep=loc(si,se,c), hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const enSegs=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    const heSegs=brSegs(heRaw);
    if(heSegs.length!==5||enSegs.length!==1){ throw new Error(`counts: he=${heSegs.length} en=${enSegs.length}`); }

    const engStart = heRaw.match(/\n([A-Z][a-z]+ .{40,})/);
    const engIdx = heRaw.indexOf(engStart[0]);
    const engBlock = heRaw.slice(engIdx).trim();

    const SPLIT1 = 'Further there siman 44:';
    const SPLIT2 = 'See in responsum Beit Efrayim Yoreh Deah siman 41';
    const SPLIT3 = 'And there I wrote that there is no permission to give';
    const i1=engBlock.indexOf(SPLIT1), i2=engBlock.indexOf(SPLIT2), i3=engBlock.indexOf(SPLIT3);
    if([i1,i2,i3].some(x=>x===-1)) throw new Error(`split markers not found: ${i1} ${i2} ${i3}`);
    if(!(i1<i2&&i2<i3)) throw new Error(`splits out of order`);

    const newSegs=[
      enSegs[0],
      engBlock.slice(0,i1).trim(),
      engBlock.slice(i1,i2).trim(),
      engBlock.slice(i2,i3).trim(),
      engBlock.slice(i3).trim(),
    ];

    const cleaned = stripEnglish(heRaw);
    if(!cleaned) throw new Error('could not strip English from he.html');
    if(brSegs(cleaned).length!==5) throw new Error(`cleaned he segs=${brSegs(cleaned).length}`);

    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: en ${enSegs.length}→${newSegs.length} segs`);
      newSegs.forEach((s,i)=>console.log(`  [${i}] ${s.slice(0,70)}`));
    } else {
      safeWrite(ep, join(newSegs));
      safeWrite(hp, cleaned);
      const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${si}/${se}/${c}: en wrote ${v.length} segs, he stripped`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── CASE 2: siman177/seif-002/yad-ephraim (he=10, en=1) ────────────────────
// English in he.html = HE[1..9] merged; split into 9, append to en[0]
{
  const si='siman177',se='seif-002',c='yad-ephraim';
  try {
    const ep=loc(si,se,c), hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const enSegs=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    const heSegs=brSegs(heRaw);
    if(heSegs.length!==10||enSegs.length!==1){ throw new Error(`counts: he=${heSegs.length} en=${enSegs.length}`); }

    const engStart = heRaw.match(/\n([A-Z][a-z]+ .{40,})/);
    const engIdx = heRaw.indexOf(engStart[0]);
    const engBlock = heRaw.slice(engIdx).trim();

    const SPLITS = [
      'Further there siman 148:',
      'And he wrote there regarding the case in responsum Chavot Yair siman 189',
      'He wrote in responsum Avkat Rokhel siman 5',
      'Further there siman 112:',
      'Further there siman 137:',
      'Further there siman 151:',
      'He wrote in responsum Har HaCarmel siman 16',
      'He wrote in responsum Beit Hadin siman 16',
    ];
    const idxs = SPLITS.map(s=>engBlock.indexOf(s));
    if(idxs.some(x=>x===-1)) throw new Error(`split marker not found: ${SPLITS[idxs.indexOf(-1)]}`);
    for(let k=1;k<idxs.length;k++) if(idxs[k]<=idxs[k-1]) throw new Error(`splits out of order at ${k}`);

    const cuts=[0,...idxs,engBlock.length];
    const newSegs=[enSegs[0],...cuts.slice(0,-1).map((s,k)=>engBlock.slice(s,cuts[k+1]).trim())];

    const cleaned = stripEnglish(heRaw);
    if(!cleaned) throw new Error('could not strip English from he.html');
    if(brSegs(cleaned).length!==10) throw new Error(`cleaned he segs=${brSegs(cleaned).length}`);

    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: en ${enSegs.length}→${newSegs.length} segs`);
      newSegs.forEach((s,i)=>console.log(`  [${i}] ${s.slice(0,70)}`));
    } else {
      safeWrite(ep, join(newSegs));
      safeWrite(hp, cleaned);
      const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${si}/${se}/${c}: en wrote ${v.length} segs, he stripped`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── CASE 3: siman188/seif-002/tiferet-yisrael (he=4, en=1) ─────────────────
// English in he.html = HE[1..3] merged; split into 3, append to en[0]
{
  const si='siman188',se='seif-002',c='tiferet-yisrael';
  try {
    const ep=loc(si,se,c), hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const enSegs=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    const heSegs=brSegs(heRaw);
    if(heSegs.length!==4||enSegs.length!==1){ throw new Error(`counts: he=${heSegs.length} en=${enSegs.length}`); }

    const engStart = heRaw.match(/\n([A-Z][a-z]+ .{40,})/);
    const engIdx = heRaw.indexOf(engStart[0]);
    const engBlock = heRaw.slice(engIdx).trim();

    const SPLIT1 = 'However also impossible all above';
    const SPLIT2 = 'And alternatively even per Rashba who purifies during veset';
    const i1=engBlock.indexOf(SPLIT1), i2=engBlock.indexOf(SPLIT2);
    if([i1,i2].some(x=>x===-1)) throw new Error(`split markers not found: ${i1} ${i2}`);
    if(!(i1<i2)) throw new Error('splits out of order');

    const newSegs=[
      enSegs[0],
      engBlock.slice(0,i1).trim(),
      engBlock.slice(i1,i2).trim(),
      engBlock.slice(i2).trim(),
    ];

    const cleaned = stripEnglish(heRaw);
    if(!cleaned) throw new Error('could not strip English from he.html');
    if(brSegs(cleaned).length!==4) throw new Error(`cleaned he segs=${brSegs(cleaned).length}`);

    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: en ${enSegs.length}→${newSegs.length} segs`);
      newSegs.forEach((s,i)=>console.log(`  [${i}] ${s.slice(0,70)}`));
    } else {
      safeWrite(ep, join(newSegs));
      safeWrite(hp, cleaned);
      const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${si}/${se}/${c}: en wrote ${v.length} segs, he stripped`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── CASE 4: siman127/seif-001/mateh-yehonatan (he=2, en=1) ─────────────────
// English in he.html = repeat of HE[0] translation (already in en.html)
// HE[1] is a short Hagah; translate it, append to en.html, strip from he.html
{
  const si='siman127',se='seif-001',c='mateh-yehonatan';
  try {
    const ep=loc(si,se,c), hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const enSegs=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
    const heSegs=brSegs(heRaw);
    if(heSegs.length!==2||enSegs.length!==1){ throw new Error(`counts: he=${heSegs.length} en=${enSegs.length}`); }

    // HE[1] = "<b>[הג"ה </b>וכסברא זו כתב הדגמ"ר כאן בגליון הש"ך ולפי פי' שם בדברי הש"ך גם הש"ך מודה לזה]:"
    const he1translation = `[Gloss: And according to this reasoning, Darkei Moshe wrote here in the margin of Shach; and according to the explanation there of Shach's words, Shach also agrees to this.]`;

    const newSegs = [enSegs[0], he1translation];

    const cleaned = stripEnglish(heRaw);
    if(!cleaned) throw new Error('could not strip English from he.html');
    if(brSegs(cleaned).length!==2) throw new Error(`cleaned he segs=${brSegs(cleaned).length}`);

    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: en ${enSegs.length}→${newSegs.length} segs`);
      newSegs.forEach((s,i)=>console.log(`  [${i}] ${s.slice(0,80)}`));
      console.log(`  he: stripped, ${brSegs(cleaned).length} segs remain`);
    } else {
      safeWrite(ep, join(newSegs));
      safeWrite(hp, cleaned);
      const v=brSegs(fs.readFileSync(ep,'utf8').replace(/^﻿/,'').trim());
      console.log(`OK ${si}/${se}/${c}: en wrote ${v.length} segs, he stripped`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── CASE 5: siman155/seif-003/beur-hagra (he=8, en=8) ──────────────────────
// English embedded within segment 5 — strip from within that segment
{
  const si='siman155',se='seif-003',c='beur-hagra';
  try {
    const hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const parts=heRaw.split(/<br\s*\/?>/);
    const MARKER='\n(Likkut) Permitted to burn';
    const cleaned=parts.map(p=>{
      const idx=p.indexOf(MARKER);
      return idx!==-1 ? p.slice(0,idx) : p;
    }).join('<br>\n');
    const before=brSegs(heRaw).length, after=brSegs(cleaned).length;
    if(before!==after) throw new Error(`seg count changed: ${before}→${after}`);
    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: strip English from within segment (${before} segs preserved)`);
    } else {
      safeWrite(hp, cleaned);
      console.log(`OK ${si}/${se}/${c}: he.html stripped in-segment (${after} segs)`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── CASE 6: siman177/seif-002/beur-hagra (he=11, en=11) ─────────────────────
// English embedded within segments 3 and 7 — strip from within those segments
{
  const si='siman177',se='seif-002',c='beur-hagra';
  try {
    const hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const parts=heRaw.split(/<br\s*\/?>/);
    const MARKERS=['\n\n(Likkut) The giver, etc.', '\n\n(Likkut) Idle of, etc.'];
    const cleaned=parts.map(p=>{
      for(const m of MARKERS){
        const idx=p.indexOf(m);
        if(idx!==-1) return p.slice(0,idx);
      }
      return p;
    }).join('<br>\n');
    const before=brSegs(heRaw).length, after=brSegs(cleaned).length;
    if(before!==after) throw new Error(`seg count changed: ${before}→${after}`);
    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: strip English from 2 segments (${before} segs preserved)`);
    } else {
      safeWrite(hp, cleaned);
      console.log(`OK ${si}/${se}/${c}: he.html stripped in-segment (${after} segs)`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

// ─── BALANCED CASES: strip English appended after all Hebrew segs ─────────────
const STRIP_ONLY = [
  {si:'siman127',se:'seif-002',c:'mateh-yehonatan'},
  {si:'siman127',se:'seif-003',c:'mateh-yehonatan'},
  {si:'siman127',se:'seif-004',c:'mateh-yehonatan'},
  {si:'siman128',se:'seif-002',c:'mateh-yehonatan'},
  {si:'siman271',se:'seif-007',c:'beur-hagra'},
  {si:'siman188',se:'seif-006',c:'chiddushei-hilkhot-niddah'},
];

for(const {si,se,c} of STRIP_ONLY){
  try {
    const hp=hep(si,se,c);
    const heRaw=fs.readFileSync(hp,'utf8').replace(/^﻿/,'');
    const heSegs=brSegs(heRaw);
    const cleaned = stripEnglish(heRaw);
    if(!cleaned) throw new Error('no English found to strip');
    const cleanedSegs=brSegs(cleaned);
    if(cleanedSegs.length!==heSegs.length) throw new Error(`seg count changed: ${heSegs.length}→${cleanedSegs.length}`);
    if(DRY){
      console.log(`DRY ${si}/${se}/${c}: strip ${heRaw.length-cleaned.length} chars from he.html (${heSegs.length} segs preserved)`);
    } else {
      safeWrite(hp, cleaned);
      console.log(`OK ${si}/${se}/${c}: he.html stripped (${heSegs.length} segs)`);
    }
    ok++;
  } catch(e){ console.log(`FAIL ${si}/${se}/${c}: ${e.message}`); fail++; }
}

console.log(`\nDone. ok=${ok} fail=${fail}`);
