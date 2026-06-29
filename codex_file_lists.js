const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const srcBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_001/output';
const GARBAGE_RE=/terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;
const UNSAFE=new Set(['chokhmat-shlomo','rabbi-akiva-eiger']);

const bySlug={};
const simanDirs=fs.readdirSync(base).filter(d=>d.startsWith('siman')).sort((a,b)=>parseInt(a.slice(5))-parseInt(b.slice(5)));
for(const si of simanDirs){
  const siPath=path.join(base,si);
  const seifDirs=fs.readdirSync(siPath).filter(d=>d.startsWith('seif-')&&fs.statSync(path.join(siPath,d)).isDirectory());
  for(const se of seifDirs){
    const seifPath=path.join(siPath,se);
    const slugs=fs.readdirSync(seifPath).filter(s=>fs.statSync(path.join(seifPath,s)).isDirectory());
    for(const slug of slugs){
      if(UNSAFE.has(slug)) continue;
      const ep=path.join(seifPath,slug,'en.html');
      const hp=path.join(seifPath,slug,'he.html');
      if(!fs.existsSync(ep)||!fs.existsSync(hp)) continue;
      const en=brSegs(fs.readFileSync(ep,'utf8'));
      const he=brSegs(fs.readFileSync(hp,'utf8'));
      if(!en.length||!he.length) continue;
      if(GARBAGE_RE.test(strip(en[0]))){
        if(!bySlug[slug]) bySlug[slug]=[];
        bySlug[slug].push({
          si:parseInt(si.slice(5)),
          se:parseInt(se.split('-')[1]),
          hePreview:strip(he[0]).slice(0,80),
          enGarbage:strip(en[0]).slice(0,80)
        });
      }
    }
  }
}

// Print full lists per slug
Object.entries(bySlug).sort((a,b)=>b[1].length-a[1].length).forEach(([slug,entries])=>{
  console.log('\n### '+slug.toUpperCase()+' ('+entries.length+' files) ###');
  entries.forEach(e=>{
    console.log('  siman'+e.si+'/seif-'+String(e.se).padStart(3,'0'));
    console.log('    HE: '+e.hePreview);
    console.log('    GARBAGE EN: '+e.enGarbage);
  });
});

// Source TXT files — group by siman
const SRC_GARBAGE=new RegExp(GARBAGE_RE.source,'i');
console.log('\n### SOURCE TXT FILES ###');
let srcCount=0;
if(fs.existsSync(srcBase)){
  for(const si of fs.readdirSync(srcBase).filter(d=>d.startsWith('siman')).sort()){
    const siPath=path.join(srcBase,si);
    for(const comm of fs.readdirSync(siPath)){
      const commPath=path.join(siPath,comm);
      if(!fs.statSync(commPath).isDirectory()) continue;
      for(const f of fs.readdirSync(commPath).filter(f=>f.endsWith('.txt'))){
        const txt=fs.readFileSync(path.join(commPath,f),'utf8');
        if(SRC_GARBAGE.test(txt)){console.log('  '+si+'/'+comm+'/'+f);srcCount++;}
      }
    }
  }
}
console.log('Total source TXT: '+srcCount);
