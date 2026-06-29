/**
 * Chokhmat Shlomo seif-numbering remap — Phase 1 + 2 combined
 * Labels in <b>...</b> tags, formats: (סעיף X'), (שם) סעיף X', ס"א, סעי' X
 */
const fs=require('fs'),path=require('path');
const DRY=process.argv.includes('--dry');

const JSON_PATH='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Chokhmat_Shlomo_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const CORPUS='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const SLUG='chokhmat-shlomo';

// ── helpers ──
function hebrewNumeral(s){
  s=s.replace(/['"״׳'\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;for(const c of s)n+=v[c]||0;return n;
}
function pad(n){return 'seif-'+String(n).padStart(3,'0');}
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function safeWrite(p,c){const t=p+'.tmp';fs.writeFileSync(t,c,'utf8');fs.renameSync(t,p);}
function read(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';}
function rm(p){if(fs.existsSync(p))fs.unlinkSync(p);}
function rmdir(p){try{fs.rmdirSync(p);}catch(e){}}
function hp(si,n){return path.join(CORPUS,'siman'+si,pad(n),SLUG,'he.html');}
function ep(si,n){return path.join(CORPUS,'siman'+si,pad(n),SLUG,'en.html');}
function dir(si,n){return path.join(CORPUS,'siman'+si,pad(n),SLUG);}
function hasHe(si,n){return brSegs(read(hp(si,n))).length>0;}

// ── parse CS seif label from <b> tag ──
function parseCSLabel(entry){
  const bm=entry.match(/<b>([\s\S]*?)<\/b>/);
  if(!bm) return null;
  let lbl=bm[1].trim();

  // Strip outer parens: (X) → X
  lbl=lbl.replace(/^\((.+)\)$/,'$1').trim();
  // Strip שם prefix: שם סעיף X → סעיף X
  lbl=lbl.replace(/^שם\s+/,'').trim();

  let numStr;
  if(/^סעיף\s/.test(lbl)){
    numStr=lbl.replace(/^סעיף\s*/,'').trim();
  } else if(/^סעי'?\s/.test(lbl)){
    numStr=lbl.replace(/^סעי'?\s*/,'').trim();
  } else if(/^ס"([^ק])/.test(lbl)){
    // ס"א = seif aleph, but NOT ס"ק (seif katan)
    numStr=lbl.replace(/^ס"/,'').trim();
  } else {
    return null;
  }

  // Take first whitespace/comma-delimited token, strip trailing apostrophes
  numStr=numStr.split(/[\s,]/)[0].replace(/'+$/,'').trim();
  const n=hebrewNumeral(numStr);
  return n||null;
}

// ── build pending map ──
const j=JSON.parse(fs.readFileSync(JSON_PATH,'utf8'));
const pending=new Map(); // "si:currentN" → correctN

for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim))continue;
  for(let se=0;se<seifim.length;se++){
    const entry=seifim[se];
    if(typeof entry!=='string'||!entry.trim())continue;
    const correctN=parseCSLabel(entry);
    if(!correctN)continue;
    const currentN=se+1;
    if(currentN===correctN)continue;
    // Skip colophon simanim (494, 696 — trailing non-halachic entries)
    if((si+1===494||si+1===696)&&se>=1)continue;
    pending.set(`${si+1}:${currentN}`,correctN);
  }
}
console.log('Pending moves found:',pending.size);

// ── resolve moves (same logic as rae_fix_conflicts) ──
const done=new Set(), visited=new Set(), log=[];
let moved=0,merged=0,skipped=0;

function resolveMove(si,srcN,tgtN,depth){
  if(depth>10){log.push('DEPTH_LIMIT s'+si+' '+srcN+'->'+tgtN);return false;}
  const key=`${si}:${srcN}`;
  if(done.has(key))return true;
  if(visited.has(key)){log.push('CIRCULAR s'+si+' '+srcN+'->'+tgtN);return false;}
  visited.add(key);

  const srcHeC=read(hp(si,srcN)), srcEnC=read(ep(si,srcN));
  if(!brSegs(srcHeC).length){done.add(key);visited.delete(key);return true;}

  if(!hasHe(si,tgtN)){
    // Simple move
    if(!DRY){
      fs.mkdirSync(dir(si,tgtN),{recursive:true});
      safeWrite(hp(si,tgtN),srcHeC);
      const tgtEnC=read(ep(si,tgtN));
      if(!brSegs(tgtEnC).length&&srcEnC) safeWrite(ep(si,tgtN),srcEnC);
      rm(hp(si,srcN));rm(ep(si,srcN));rmdir(dir(si,srcN));
    }
    log.push((DRY?'DRY ':'')+'MOVE s'+si+' '+srcN+'->'+tgtN);
    moved++;done.add(key);visited.delete(key);return true;
  }

  // Target occupied — check if it's also pending
  const tgtKey=`${si}:${tgtN}`, tgtPending=pending.get(tgtKey);
  if(tgtPending&&!done.has(tgtKey)){
    const ok=resolveMove(si,tgtN,tgtPending,depth+1);
    if(ok&&!hasHe(si,tgtN)){
      if(!DRY){
        fs.mkdirSync(dir(si,tgtN),{recursive:true});
        safeWrite(hp(si,tgtN),srcHeC);
        const tgtEnC=read(ep(si,tgtN));
        if(!brSegs(tgtEnC).length&&srcEnC) safeWrite(ep(si,tgtN),srcEnC);
        rm(hp(si,srcN));rm(ep(si,srcN));rmdir(dir(si,srcN));
      }
      log.push((DRY?'DRY ':'')+'CHAIN s'+si+' '+srcN+'->'+tgtN);
      moved++;done.add(key);visited.delete(key);return true;
    }
  }

  // Merge: both notes belong at tgtN
  const tgtHeC=read(hp(si,tgtN)), tgtEnC=read(ep(si,tgtN));
  const srcSegs=brSegs(srcHeC), tgtSegs=brSegs(tgtHeC);
  const srcESegs=brSegs(srcEnC), tgtESegs=brSegs(tgtEnC);
  let mergedHe,mergedEn;
  if(srcN<tgtN){
    mergedHe=srcSegs.concat(tgtSegs).join('<br />\n');
    mergedEn=srcESegs.concat(tgtESegs).join('<br />\n');
  } else {
    mergedHe=tgtSegs.concat(srcSegs).join('<br />\n');
    mergedEn=tgtESegs.concat(srcESegs).join('<br />\n');
  }
  if(!DRY){
    safeWrite(hp(si,tgtN),mergedHe);
    if(mergedEn) safeWrite(ep(si,tgtN),mergedEn);
    rm(hp(si,srcN));rm(ep(si,srcN));rmdir(dir(si,srcN));
  }
  log.push((DRY?'DRY ':'')+'MERGE s'+si+' '+srcN+(srcN<tgtN?'+':'-before-')+tgtN+' ['+brSegs(mergedHe).length+'segs]');
  merged++;done.add(key);visited.delete(key);return true;
}

for(const [key,correctN] of pending){
  const [siStr,srcStr]=key.split(':');
  const si=parseInt(siStr),srcN=parseInt(srcStr);
  if(done.has(key))continue;
  if(!hasHe(si,srcN)){skipped++;continue;}
  resolveMove(si,srcN,correctN,0);
}

console.log('=== CS REMAP ('+(DRY?'DRY':'LIVE')+') ===');
console.log('Moved:',moved,'| Merged:',merged,'| Skipped(no HE):',skipped);
console.log('Total ops:',moved+merged);
if(DRY||log.length<=60){log.forEach(l=>console.log(l));}
else{
  log.slice(0,30).forEach(l=>console.log(l));
  console.log('... ('+(log.length-30)+' more) ...');
  log.slice(-5).forEach(l=>console.log(l));
}
