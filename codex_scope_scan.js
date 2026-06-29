const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const srcBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_001/output';

const GARBAGE_RE=/terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|magen avraham anglicized|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;

// Commentators scripts will touch (unsafe for parallel Codex work)
const UNSAFE_SLUGS=new Set(['chokhmat-shlomo','rabbi-akiva-eiger']);

// ── A: per-commentator garbage EN in corpus ──
const garbageBySlug={};
const phantomsBySlug={};
const missingMechaberEN=[];

const simanDirs=fs.readdirSync(base).filter(d=>d.startsWith('siman')).sort((a,b)=>parseInt(a.slice(5))-parseInt(b.slice(5)));

for(const si of simanDirs){
  const siPath=path.join(base,si);
  const seifDirs=fs.readdirSync(siPath).filter(d=>d.startsWith('seif-')&&fs.statSync(path.join(siPath,d)).isDirectory());
  for(const se of seifDirs){
    const seifPath=path.join(siPath,se);
    const slugs=fs.existsSync(seifPath)?fs.readdirSync(seifPath).filter(s=>fs.statSync(path.join(seifPath,s)).isDirectory()):[];
    for(const slug of slugs){
      const ep=path.join(seifPath,slug,'en.html');
      const hp=path.join(seifPath,slug,'he.html');
      if(!fs.existsSync(ep)) continue;
      const en=brSegs(fs.readFileSync(ep,'utf8'));
      if(!en.length) continue;
      const enText=strip(en[0]);
      if(GARBAGE_RE.test(enText)){
        if(!garbageBySlug[slug]) garbageBySlug[slug]=[];
        garbageBySlug[slug].push({si,se,preview:enText.slice(0,80)});
      }
      // mechaber missing EN (HE exists, EN empty or missing)
      if(slug==='mechaber'){
        const he=fs.existsSync(hp)?brSegs(fs.readFileSync(hp,'utf8')):[];
        if(he.length&&!en.length) missingMechaberEN.push({si,se});
      }
    }
  }
}

// ── B: source TXT garbage patterns ──
const SRC_GARBAGE_RE=/terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat/i;
const srcGarbageFiles=[];
if(fs.existsSync(srcBase)){
  for(const si of fs.readdirSync(srcBase).filter(d=>d.startsWith('siman'))){
    const siPath=path.join(srcBase,si);
    for(const comm of fs.readdirSync(siPath)){
      const commPath=path.join(siPath,comm);
      if(!fs.statSync(commPath).isDirectory()) continue;
      for(const f of fs.readdirSync(commPath).filter(f=>f.endsWith('.txt'))){
        const txt=fs.readFileSync(path.join(commPath,f),'utf8');
        if(SRC_GARBAGE_RE.test(txt)) srcGarbageFiles.push(si+'/'+comm+'/'+f);
      }
    }
  }
}

// ── OUTPUT ──
console.log('=== CORPUS GARBAGE BY COMMENTATOR (safe for parallel Codex) ===');
const safeGarbage=Object.entries(garbageBySlug).filter(([s])=>!UNSAFE_SLUGS.has(s));
const unsafeGarbage=Object.entries(garbageBySlug).filter(([s])=>UNSAFE_SLUGS.has(s));

safeGarbage.sort((a,b)=>b[1].length-a[1].length).forEach(([slug,entries])=>{
  console.log(slug+': '+entries.length+' garbage entries');
  entries.slice(0,3).forEach(e=>console.log('  '+e.si+'/'+e.se+': '+e.preview));
});

console.log('\n=== UNSAFE (wait for scripts) ===');
unsafeGarbage.forEach(([slug,entries])=>console.log(slug+': '+entries.length+' garbage entries'));

console.log('\n=== SOURCE TXT GARBAGE (safe, independent of corpus scripts) ===');
console.log('Total files: '+srcGarbageFiles.length);
// Group by siman
const srcBySiman={};
srcGarbageFiles.forEach(f=>{const si=f.split('/')[0];if(!srcBySiman[si])srcBySiman[si]=[];srcBySiman[si].push(f);});
Object.entries(srcBySiman).slice(0,10).forEach(([si,files])=>console.log('  '+si+': '+files.length+' files — '+files.map(f=>f.split('/')[1]).join(', ')));

console.log('\n=== MISSING MECHABER EN (safe) ===');
console.log('Count: '+missingMechaberEN.length);
missingMechaberEN.slice(0,10).forEach(e=>console.log('  '+e.si+'/'+e.se));

console.log('\n=== TOTALS ===');
const safeTotal=safeGarbage.reduce((s,[,e])=>s+e.length,0);
const unsafeTotal=unsafeGarbage.reduce((s,[,e])=>s+e.length,0);
console.log('Safe corpus garbage entries: '+safeTotal+' across '+safeGarbage.length+' commentators');
console.log('Unsafe corpus garbage (wait): '+unsafeTotal);
console.log('Source TXT garbage files: '+srcGarbageFiles.length);
console.log('Missing mechaber EN: '+missingMechaberEN.length);
