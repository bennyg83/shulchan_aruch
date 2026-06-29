const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const tempBase='C:/Users/binya/Documents/shulchan-yd-temp/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

const DRY_RUN = !process.argv.includes('--write');
console.log(DRY_RUN ? '=== DRY RUN ===' : '=== WRITING CHANGES ===');
console.log();

let updated=0, skipped=0, errors=0;

for(const si of fs.readdirSync(base).filter(d=>d.startsWith('siman'))){
  const siP=path.join(base,si);
  for(const se of fs.readdirSync(siP).filter(d=>{try{return d.startsWith('seif-')&&fs.statSync(path.join(siP,d)).isDirectory();}catch{return false;}})){
    const mPath=path.join(siP,se,'translated-sources-manifest.json');
    if(!fs.existsSync(mPath)) continue;
    const m=JSON.parse(fs.readFileSync(mPath,'utf8'));
    for(const src of m.sources){
      const slug=src.slug;
      const hp=path.join(siP,se,slug,'he.html');
      const ep=path.join(siP,se,slug,'en.html');
      if(!fs.existsSync(hp)||!fs.existsSync(ep)) continue;
      const he=brSegs(fs.readFileSync(hp,'utf8'));
      const en=brSegs(fs.readFileSync(ep,'utf8'));
      if(he.length===0||en.length===0) continue;
      if(he.length===en.length) continue; // already correct

      const tep=path.join(tempBase,si,se,slug,'en.html');
      if(!fs.existsSync(tep)){skipped++;continue;}
      const tempContent=fs.readFileSync(tep,'utf8');
      const tempEN=brSegs(tempContent);
      if(tempEN.length!==he.length){skipped++;continue;}

      const label=DRY_RUN?'[DRY]':'[WRITE]';
      console.log(label,si+'/'+se+'/'+slug+': EN '+en.length+' -> '+tempEN.length+' (HE:'+he.length+')');
      if(!DRY_RUN){
        try{ fs.writeFileSync(ep, tempContent, 'utf8'); updated++; }
        catch(e){ console.error('  ERROR:',e.message); errors++; }
      } else { updated++; }
    }
  }
}
console.log();
console.log((DRY_RUN?'Would update':'Updated')+':', updated, '| Skipped (temp incomplete):', skipped, '| Errors:', errors);
