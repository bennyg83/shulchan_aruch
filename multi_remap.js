/**
 * Multi-commentator seif-numbering remap — yad-ephraim, chatam-sofer, shaarei-teshuvah
 * Same Phase 1+2 chain-resolution logic as cs_remap.js / rae_fix_conflicts.js
 */
const fs=require('fs'),path=require('path');
const DRY=process.argv.includes('--dry');
const ONLY=process.argv.find(a=>a.startsWith('--only='));
const ONLY_SLUG=ONLY?ONLY.split('=')[1]:null;

const CORPUS='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const JSON_BASE='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries';

// ── Shared helpers ──
function hebrewNumeral(s){
  s=s.replace(/['"״׳'׳\s]/g,'').trim();
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
function hp(si,n,slug){return path.join(CORPUS,'siman'+si,pad(n),slug,'he.html');}
function ep(si,n,slug){return path.join(CORPUS,'siman'+si,pad(n),slug,'en.html');}
function dirp(si,n,slug){return path.join(CORPUS,'siman'+si,pad(n),slug);}
function hasHe(si,n,slug){return brSegs(read(hp(si,n,slug))).length>0;}

// ── Seif number extraction — finds first "סעיף X" or "סעי' X" in text ──
function parseSeifFromText(text){
  // Match סעיף or abbreviated forms followed by Hebrew numeral
  const m=text.match(/סעי[יף]?'?\s+([א-ת][א-ת"']*)/);
  if(!m) return null;
  const n=hebrewNumeral(m[1].split(/[\s,]/)[0]);
  return n||null;
}

// ── Label parsers per commentator ──

// yad-ephraim: labels in <b> tags — "סעיף X", "(בש"ע סעיף X)", "מחבר סעיף X"
// SKIP MA/TZ sk references and "סעיף קטן" (full-word seif katan)
function parseYadEphraim(entry){
  const bm=entry.match(/<b>([\s\S]*?)<\/b>/);
  if(!bm) return null;
  let lbl=bm[1].trim();
  if(/ס"ק|סק"|מג"א\s|מ"א\s|ט"ז\s+ס|סעיף קטן/.test(lbl)) return null;
  lbl=lbl.replace(/^\((.+)\)$/,'$1').trim();
  lbl=lbl.replace(/^(?:שם\s+)?(?:ב?ש"ע\s+)?(?:מחבר\s+)?/,'').trim();
  return parseSeifFromText(lbl);
}

// chatam-sofer: labels in <small> tags OR bare text at start
// SKIP MA/TZ sk references and bare "שם" labels
function parseChatamSofer(entry){
  const sm=entry.match(/<small>([\s\S]*?)<\/small>/);
  if(sm){
    const lbl=sm[1].trim();
    if(/ס"ק|סק"|מג"א\s|ט"ז\s+ס|סעיף קטן/.test(lbl)) return null;
    // "(שם)" or "שם" alone — try first 40 chars of body text
    if(/^[(\s]*שם[)\s]*$/.test(lbl)){
      const body=entry.replace(/<small>[\s\S]*?<\/small>/,'').trim();
      return parseSeifFromText(body.slice(0,40));
    }
    return parseSeifFromText(lbl);
  }
  // Bare text — seif ref at very start
  return parseSeifFromText(entry.slice(0,50));
}

// shaarei-teshuvah: labels in <b> tags — some have "סעיף X", some are word-quotes (skip)
function parseShaareiTeshuvah(entry){
  const bm=entry.match(/<b>([\s\S]*?)<\/b>/);
  if(!bm) return null;
  return parseSeifFromText(bm[1]);
}

// ── Core remap engine (identical to cs_remap.js) ──
function runRemap(slug,jsonPath,labelParser){
  if(ONLY_SLUG&&ONLY_SLUG!==slug) return;
  if(!fs.existsSync(jsonPath)){console.log(slug+': JSON not found, skipping');return;}

  const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));
  const pending=new Map();

  for(let si=0;si<j.text.length;si++){
    const seifim=j.text[si];
    if(!Array.isArray(seifim))continue;
    for(let se=0;se<seifim.length;se++){
      const entry=seifim[se];
      if(typeof entry!=='string'||!entry.trim())continue;
      const correctN=labelParser(entry);
      if(!correctN)continue;
      const currentN=se+1;
      if(currentN===correctN)continue;
      pending.set(`${si+1}:${currentN}`,correctN);
    }
  }

  console.log('\n=== '+slug+(DRY?' (DRY)':'')+' ===');
  console.log('Pending moves: '+pending.size);
  if(pending.size===0) return;

  const done=new Set(),visited=new Set(),log=[];
  let moved=0,merged=0,skipped=0;

  function resolveMove(si,srcN,tgtN,depth){
    if(depth>10){log.push('DEPTH_LIMIT s'+si+' '+srcN+'->'+tgtN);return false;}
    const key=`${si}:${srcN}`;
    if(done.has(key))return true;
    if(visited.has(key)){log.push('CIRCULAR s'+si+' '+srcN+'->'+tgtN);return false;}
    visited.add(key);

    const srcHeC=read(hp(si,srcN,slug)),srcEnC=read(ep(si,srcN,slug));
    if(!brSegs(srcHeC).length){done.add(key);visited.delete(key);return true;}

    if(!hasHe(si,tgtN,slug)){
      if(!DRY){
        fs.mkdirSync(dirp(si,tgtN,slug),{recursive:true});
        safeWrite(hp(si,tgtN,slug),srcHeC);
        const tgtEnC=read(ep(si,tgtN,slug));
        if(!brSegs(tgtEnC).length&&srcEnC) safeWrite(ep(si,tgtN,slug),srcEnC);
        rm(hp(si,srcN,slug));rm(ep(si,srcN,slug));rmdir(dirp(si,srcN,slug));
      }
      log.push((DRY?'DRY ':'')+'MOVE s'+si+' '+srcN+'->'+tgtN);
      moved++;done.add(key);visited.delete(key);return true;
    }

    // Target occupied — try to resolve chain first
    const tgtKey=`${si}:${tgtN}`,tgtPending=pending.get(tgtKey);
    if(tgtPending&&!done.has(tgtKey)){
      const ok=resolveMove(si,tgtN,tgtPending,depth+1);
      if(ok&&!hasHe(si,tgtN,slug)){
        if(!DRY){
          fs.mkdirSync(dirp(si,tgtN,slug),{recursive:true});
          safeWrite(hp(si,tgtN,slug),srcHeC);
          const tgtEnC=read(ep(si,tgtN,slug));
          if(!brSegs(tgtEnC).length&&srcEnC) safeWrite(ep(si,tgtN,slug),srcEnC);
          rm(hp(si,srcN,slug));rm(ep(si,srcN,slug));rmdir(dirp(si,srcN,slug));
        }
        log.push((DRY?'DRY ':'')+'CHAIN s'+si+' '+srcN+'->'+tgtN);
        moved++;done.add(key);visited.delete(key);return true;
      }
    }

    // Merge: both belong at tgtN
    const tgtHeC=read(hp(si,tgtN,slug)),tgtEnC=read(ep(si,tgtN,slug));
    const srcSegs=brSegs(srcHeC),tgtSegs=brSegs(tgtHeC);
    const srcESegs=brSegs(srcEnC),tgtESegs=brSegs(tgtEnC);
    let mergedHe,mergedEn;
    if(srcN<tgtN){
      mergedHe=srcSegs.concat(tgtSegs).join('<br />\n');
      mergedEn=srcESegs.concat(tgtESegs).join('<br />\n');
    } else {
      mergedHe=tgtSegs.concat(srcSegs).join('<br />\n');
      mergedEn=tgtESegs.concat(srcESegs).join('<br />\n');
    }
    if(!DRY){
      safeWrite(hp(si,tgtN,slug),mergedHe);
      if(mergedEn) safeWrite(ep(si,tgtN,slug),mergedEn);
      rm(hp(si,srcN,slug));rm(ep(si,srcN,slug));rmdir(dirp(si,srcN,slug));
    }
    log.push((DRY?'DRY ':'')+'MERGE s'+si+' '+srcN+(srcN<tgtN?'+':'-before-')+tgtN+' ['+brSegs(mergedHe).length+'segs]');
    merged++;done.add(key);visited.delete(key);return true;
  }

  for(const [key,correctN] of pending){
    const [siStr,srcStr]=key.split(':');
    const si=parseInt(siStr),srcN=parseInt(srcStr);
    if(done.has(key))continue;
    if(!hasHe(si,srcN,slug)){skipped++;continue;}
    resolveMove(si,srcN,correctN,0);
  }

  console.log('Moved: '+moved+' | Merged: '+merged+' | Skipped(no HE): '+skipped);
  const showAll=DRY||log.length<=30;
  if(showAll) log.forEach(l=>console.log('  '+l));
  else{
    log.slice(0,15).forEach(l=>console.log('  '+l));
    console.log('  ... ('+(log.length-15)+' more) ...');
    log.slice(-5).forEach(l=>console.log('  '+l));
  }
}

// ── Run ──
runRemap(
  'yad-ephraim',
  JSON_BASE+'/Yad_Ephraim_on_Shulchan_Arukh,_Orach_Chayim/merged.json',
  parseYadEphraim
);
runRemap(
  'chatam-sofer',
  JSON_BASE+'/Chatam_Sofer_on_Shulchan_Arukh,_Orach_Chayim/merged.json',
  parseChatamSofer
);
runRemap(
  'shaarei-teshuvah',
  JSON_BASE+"/Sha'arei_Teshuvah_on_Shulchan_Arukh,_Orach_Chayim/merged.json",
  parseShaareiTeshuvah
);
