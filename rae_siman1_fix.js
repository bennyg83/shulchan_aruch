const fs=require('fs'),path=require('path');
const DRY=process.argv.includes('--dry');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}
function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function safeWrite(p,c){const t=p+'.tmp';fs.writeFileSync(t,c,'utf8');fs.renameSync(t,p);}
function read(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';}
function rm(p){if(fs.existsSync(p))fs.unlinkSync(p);}
function rmdir(p){try{fs.rmdirSync(p);}catch(e){}}

const si1=path.join('C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1','siman1');
const SLUG='rabbi-akiva-eiger';
function d(n){return path.join(si1,seifPad(n),SLUG);}
function hp(n){return path.join(d(n),'he.html');}
function ep(n){return path.join(d(n),'en.html');}

// ── FIX 1: sk11 → seif 5 ──
// Merge seif-004 HE (sk11 main) + seif-005 HE (continuation) into seif-005
// seif-004 comes first (lower array index in JSON)
// Use seif-007 phantom EN (2-seg, better quality) as seif-005 EN
// Delete seif-004 and seif-007
const he4=read(hp(4)), he5=read(hp(5)), en7=read(ep(7));
const segs4=brSegs(he4), segs5=brSegs(he5), enSegs7=brSegs(en7);
console.log('Fix 1 — sk11 merge:');
console.log('  seif-004 HE: '+strip(segs4[0]||'').slice(0,80));
console.log('  seif-005 HE: '+strip(segs5[0]||'').slice(0,80));
console.log('  seif-007 EN[0]: '+strip(enSegs7[0]||'').slice(0,80));
console.log('  seif-007 EN[1]: '+strip(enSegs7[1]||'').slice(0,80));

const mergedHe1=segs4.concat(segs5).join('<br />\n');
if(!DRY){
  safeWrite(hp(5), mergedHe1);
  safeWrite(ep(5), en7);           // replace seif-005 EN with better 2-seg EN from seif-007
  rm(hp(4)); rm(ep(4)); rmdir(d(4));
  rm(ep(7)); rm(hp(7)); rmdir(d(7)); // seif-007 was phantom (no HE), just delete EN
}
console.log((DRY?'DRY ':'')+'  → seif-005 HE now '+brSegs(mergedHe1).length+' segs; EN replaced with seif-007 2-seg EN; seif-004+007 deleted');

// ── FIX 2: sk12 → seif 9 ──
// Move seif-006 HE → seif-009; keep seif-009 phantom EN (better translation); delete seif-006
const he6=read(hp(6));
const segs6=brSegs(he6);
const en9=read(ep(9));
console.log('\nFix 2 — sk12 move:');
console.log('  seif-006 HE: '+strip(segs6[0]||'').slice(0,80));
console.log('  seif-009 phantom EN: '+strip(brSegs(en9)[0]||'').slice(0,80));
if(brSegs(read(hp(9))).length){console.log('  SKIP: seif-009 already has HE');}
else{
  if(!DRY){
    fs.mkdirSync(d(9),{recursive:true});
    safeWrite(hp(9), he6);
    // seif-009 EN already has the better translation — keep it, don't overwrite
    rm(hp(6)); rm(ep(6)); rmdir(d(6));
  }
  console.log((DRY?'DRY ':'')+'  → seif-009 HE written from seif-006; seif-009 EN kept; seif-006 deleted');
}

// ── VERIFY ──
console.log('\n── Post-fix verification ──');
for(const n of [4,5,6,7,9]){
  const he=brSegs(read(hp(n))), en=brSegs(read(ep(n)));
  const status=he.length&&en.length?'HE+EN('+he.length+'+'+en.length+')':he.length?'HE_ONLY':en.length?'PHANTOM':'EMPTY';
  console.log('  seif-'+String(n).padStart(3,'0')+': '+status);
  if(he.length) console.log('    HE[0]: '+strip(he[0]).slice(0,80));
  if(en.length) console.log('    EN[0]: '+strip(en[0]).slice(0,80));
}
