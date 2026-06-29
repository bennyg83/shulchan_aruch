const fs=require('fs'),path=require('path');

const jsonPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const corpusBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const DRY=process.argv.includes('--dry');

function hebrewNumeral(s){
  s=s.replace(/['"״׳\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;for(const c of s)n+=v[c]||0;return n;
}
function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}
function safeWrite(p,c){const t=p+'.tmp';fs.writeFileSync(t,c,'utf8');fs.renameSync(t,p);}
function readFile(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';}
function rmFile(p){if(fs.existsSync(p))fs.unlinkSync(p);}
function rmDir(p){try{fs.rmdirSync(p);}catch(e){}}

// Parse seif label from HE content (first segment)
function parseSeifN(content){
  const segs=brSegs(content);
  if(!segs.length)return null;
  const m=segs[0].match(/<small>([\s\S]*?)<\/small>/);
  if(!m)return null;
  const label=m[1].trim();
  if(!/^סעיף/.test(label))return null;
  const s=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
  const n=hebrewNumeral(s);
  return n||null;
}

const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

// Build complete pending-move map from JSON: key="si:currentN" -> correctN
// Only for entries with explicit סעיף labels that don't match sequential seif
const pending=new Map(); // key "si:currentN" -> correctN
for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim))continue;
  for(let se=0;se<seifim.length;se++){
    const t=seifim[se];
    if(typeof t!=='string'||!t.trim())continue;
    const m=t.match(/<small>([\s\S]*?)<\/small>/);
    if(!m)continue;
    const label=m[1].trim();
    if(!/^סעיף/.test(label))continue;
    const s=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
    const correctN=hebrewNumeral(s);
    if(!correctN)continue;
    const currentN=se+1;
    if(currentN===correctN)continue;
    pending.set(`${si+1}:${currentN}`,correctN);
  }
}

// For a given siman+seif, check if it still has real HE in corpus
function getHePath(si,seifN){return path.join(corpusBase,'siman'+si,seifPad(seifN),'rabbi-akiva-eiger','he.html');}
function getEnPath(si,seifN){return path.join(corpusBase,'siman'+si,seifPad(seifN),'rabbi-akiva-eiger','en.html');}
function hasRealHe(si,seifN){const p=getHePath(si,seifN);return fs.existsSync(p)&&brSegs(readFile(p)).length>0;}

// Resolve a move recursively (handles chains)
// Returns true if source was handled, false if stuck (circular)
const visited=new Set();
const done=new Set();
const log=[];
let mergedCount=0,chainCount=0,skipped=0;

function resolveMove(si,srcN,tgtN,depth){
  if(depth>10){log.push('DEPTH_LIMIT s'+si+' seif'+srcN+'->'+tgtN);return false;}
  const key=`${si}:${srcN}`;
  if(done.has(key))return true;
  if(visited.has(key)){log.push('CIRCULAR s'+si+' seif'+srcN+'->'+tgtN);return false;}
  visited.add(key);

  const srcHe=getHePath(si,srcN), srcEn=getEnPath(si,srcN);
  const tgtHe=getHePath(si,tgtN), tgtEn=getEnPath(si,tgtN);

  const srcHeContent=readFile(srcHe);
  const srcEnContent=readFile(srcEn);
  if(!brSegs(srcHeContent).length){done.add(key);return true;} // nothing to move

  if(!hasRealHe(si,tgtN)){
    // Target is empty — simple move
    if(!DRY){
      fs.mkdirSync(path.dirname(tgtHe),{recursive:true});
      safeWrite(tgtHe,srcHeContent);
      const tgtEnContent=readFile(tgtEn);
      if(!brSegs(tgtEnContent).length&&srcEnContent) safeWrite(tgtEn,srcEnContent);
      rmFile(srcHe);rmFile(srcEn);rmDir(path.dirname(srcHe));
    }
    log.push((DRY?'DRY ':'')+'SIMPLE_MOVE s'+si+' seif'+srcN+'->'+tgtN);
    chainCount++;done.add(key);visited.delete(key);return true;
  }

  // Target occupied — is it also pending a move?
  const tgtPendingKey=`${si}:${tgtN}`;
  const tgtPendingTarget=pending.get(tgtPendingKey);
  if(tgtPendingTarget&&!done.has(tgtPendingKey)){
    // Chain: resolve target's move first
    const ok=resolveMove(si,tgtN,tgtPendingTarget,depth+1);
    if(ok&&!hasRealHe(si,tgtN)){
      // Target is now clear, do simple move
      if(!DRY){
        fs.mkdirSync(path.dirname(tgtHe),{recursive:true});
        safeWrite(tgtHe,srcHeContent);
        const tgtEnContent=readFile(tgtEn);
        if(!brSegs(tgtEnContent).length&&srcEnContent) safeWrite(tgtEn,srcEnContent);
        rmFile(srcHe);rmFile(srcEn);rmDir(path.dirname(srcHe));
      }
      log.push((DRY?'DRY ':'')+'CHAIN_MOVE s'+si+' seif'+srcN+'->'+tgtN);
      chainCount++;done.add(key);visited.delete(key);return true;
    }
    // Target still has content after move — fall through to merge
  }

  // Merge: both notes belong at tgtN — combine segments
  const tgtHeContent=readFile(tgtHe);
  const tgtEnContent=readFile(tgtEn);
  const tgtSegs=brSegs(tgtHeContent);
  const srcSegs=brSegs(srcHeContent);

  // Order: lower corpus seif number = lower array index = comes first
  let mergedHe, mergedEn;
  if(srcN<tgtN){
    // src note came first in JSON → [src, tgt]
    mergedHe=srcSegs.concat(tgtSegs).join('<br />\n');
    const sE=brSegs(srcEnContent), tE=brSegs(tgtEnContent);
    mergedEn=sE.concat(tE).join('<br />\n');
  } else {
    // tgt note came first in JSON → [tgt, src]
    mergedHe=tgtSegs.concat(srcSegs).join('<br />\n');
    const sE=brSegs(srcEnContent), tE=brSegs(tgtEnContent);
    mergedEn=tE.concat(sE).join('<br />\n');
  }

  if(!DRY){
    safeWrite(tgtHe,mergedHe);
    if(mergedEn) safeWrite(tgtEn,mergedEn);
    rmFile(srcHe);rmFile(srcEn);rmDir(path.dirname(srcHe));
  }
  log.push((DRY?'DRY ':'')+'MERGE s'+si+' seif'+srcN+(srcN<tgtN?'+':'-before-')+tgtN+' -> seif'+tgtN+' ['+brSegs(mergedHe).length+' segs]');
  mergedCount++;done.add(key);visited.delete(key);return true;
}

// Process all pending moves
for(const [key,correctN] of pending){
  const [siStr,srcStr]=key.split(':');
  const si=parseInt(siStr),srcN=parseInt(srcStr);
  if(done.has(key))continue;
  if(!hasRealHe(si,srcN)){skipped++;continue;} // already moved or empty
  if(hasRealHe(si,correctN)||!hasRealHe(si,srcN)){
    // Only process conflicts here (phase 1 already handled empties)
    // But we run resolveMove for all to handle chains cleanly
  }
  resolveMove(si,srcN,correctN,0);
}

console.log('=== RAE CONFLICT FIX ('+(DRY?'DRY':'LIVE')+') ===');
console.log('Merged:',mergedCount);
console.log('Chain/simple moves:',chainCount);
console.log('Skipped (no HE):',skipped);
console.log();
log.forEach(l=>console.log(l));
