const fs=require('fs'),path=require('path');
const DRY=process.argv.includes('--dry');

function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function safeWrite(p,c){const t=p+'.tmp';fs.writeFileSync(t,c,'utf8');fs.renameSync(t,p);}
function read(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';}
function rm(p){if(fs.existsSync(p))fs.unlinkSync(p);}
function rmdir(p){try{fs.rmdirSync(p);}catch(e){}}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const SLUG='rabbi-akiva-eiger';
const log=[];

function dir(si,n){return path.join(base,'siman'+si,seifPad(n),SLUG);}
function hp(si,n){return path.join(dir(si,n),'he.html');}
function ep(si,n){return path.join(dir(si,n),'en.html');}

// Simple move: src HE → tgt (phantom EN already at tgt, keep it)
function move(si,src,tgt,label){
  const srcHe=read(hp(si,src)), srcEn=read(ep(si,src));
  if(!brSegs(srcHe).length){log.push('SKIP(no_srcHE) s'+si+' '+src+'->'+tgt);return;}
  if(brSegs(read(hp(si,tgt))).length){log.push('SKIP(tgt_occupied) s'+si+' '+src+'->'+tgt);return;}
  if(!DRY){
    fs.mkdirSync(dir(si,tgt),{recursive:true});
    safeWrite(hp(si,tgt),srcHe);
    // Only write src EN to tgt if tgt EN is empty
    if(!brSegs(read(ep(si,tgt))).length&&srcEn) safeWrite(ep(si,tgt),srcEn);
    rm(hp(si,src));rm(ep(si,src));rmdir(dir(si,src));
  }
  log.push((DRY?'DRY ':'')+'MOVE s'+si+' seif'+src+'->seif'+tgt+' ['+label+']');
}

// Merge HE only: append src HE into tgt HE; keep tgt EN untouched; delete src
// Lower array-index content (lower corpus seif) goes first
function mergeHe(si,src,tgt,label){
  const srcHe=read(hp(si,src));
  const srcSegs=brSegs(srcHe);
  if(!srcSegs.length){log.push('SKIP(no_srcHE) s'+si+' merge '+src+'->'+tgt);return;}
  const tgtSegs=brSegs(read(hp(si,tgt)));
  const merged=src<tgt?srcSegs.concat(tgtSegs).join('<br />\n')
                       :tgtSegs.concat(srcSegs).join('<br />\n');
  if(!DRY){
    safeWrite(hp(si,tgt),merged);
    rm(hp(si,src));rm(ep(si,src));rmdir(dir(si,src));
  }
  log.push((DRY?'DRY ':'')+'MERGE_HE s'+si+' seif'+src+(src<tgt?'+':'-before-')+tgt+' ['+label+', '+brSegs(merged).length+'segs]');
}

// Delete phantom EN (safety check: skip if HE exists)
function delPhantom(si,n,reason){
  if(brSegs(read(hp(si,n))).length){log.push('SKIP(has_HE) delete s'+si+' seif'+n);return;}
  if(!DRY){rm(ep(si,n));rm(hp(si,n));rmdir(dir(si,n));}
  log.push((DRY?'DRY ':'')+'DELETE s'+si+' seif'+n+' ['+reason+']');
}

// ── GROUP A: delete 8 misrouted siman1 phantoms from siman135/137 ──
[[135,2],[135,3],[135,4],[135,5],[135,6],
 [137,4],[137,5],[137,6]].forEach(([si,se])=>delPhantom(si,se,'misrouted_siman1'));

// ── ABBREVIATED-SEIF: 8 validated moves ──
move(2, 5, 6, "סעי' ו'");
// siman3/seif-002: seif-005 already has MA note HE — merge HE only, keep seif-005 EN
mergeHe(3, 2, 5, "סעי' ה' merge");
move(3, 3, 11, "סעי' י\"א");
move(3, 4, 12, "סעי' י\"ב");
move(3, 6, 17, "סעי' י\"ז");
move(4, 4, 18, "סעי' י\"ח");
move(37, 1, 3,  "סעי' ג'");
move(257, 2, 7,  "סעי' ז");

// ── SIMAN11: merge seif-013 fingernail HE into seif-009 (seif-009 EN already correct) ──
// seif-009 = json[8], seif-013 = json[12]; 9 < 13 but we want tgt=009, src=013
// Since src(13)>tgt(9): order is [tgt, src] = [MA_sk10, fingernail] — correct
mergeHe(11, 13, 9, "seif-9 fingernail");

// ── SUMMARY ──
console.log('=== RAE ABBREV REMAP ('+(DRY?'DRY':'LIVE')+') ===');
log.forEach(l=>console.log(l));
console.log('\nTotal actions:',log.filter(l=>!l.startsWith('SKIP')).length);
console.log('Skipped:',log.filter(l=>l.startsWith('SKIP')).length);
