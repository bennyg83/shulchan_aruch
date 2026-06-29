const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const j=JSON.parse(fs.readFileSync('C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json','utf8'));
const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

// For each Group C siman, dump ALL entries in the JSON and ALL RAE corpus seifim
const groupC=[2,3,4,37,257];

for(const si of groupC){
  const entries=j.text[si-1]||[];
  const nonEmpty=entries.map((e,i)=>({i,e})).filter(x=>typeof x.e==='string'&&x.e.trim());
  console.log('=== siman'+si+' — JSON entries: '+nonEmpty.length+' non-empty of '+entries.length+' ===');
  nonEmpty.forEach(({i,e})=>console.log('  json['+i+']: '+strip(e).slice(0,100)));

  // Corpus RAE seifim
  const siDir=path.join(base,'siman'+si);
  if(fs.existsSync(siDir)){
    const seifDirs=fs.readdirSync(siDir).filter(d=>d.startsWith('seif-')).sort();
    const raeSeifim=seifDirs.filter(d=>{
      const hp=path.join(siDir,d,'rabbi-akiva-eiger','he.html');
      const ep=path.join(siDir,d,'rabbi-akiva-eiger','en.html');
      return fs.existsSync(hp)||fs.existsSync(ep);
    });
    console.log('  Corpus RAE entries:');
    raeSeifim.forEach(d=>{
      const hp=path.join(siDir,d,'rabbi-akiva-eiger','he.html');
      const ep=path.join(siDir,d,'rabbi-akiva-eiger','en.html');
      const he=fs.existsSync(hp)?brSegs(fs.readFileSync(hp,'utf8')):[];
      const en=fs.existsSync(ep)?brSegs(fs.readFileSync(ep,'utf8')):[];
      const status=he.length&&en.length?'HE+EN':he.length?'HE_ONLY':en.length?'EN_ONLY(phantom)':'EMPTY';
      console.log('    '+d+' ['+status+']: HE='+strip(he[0]||'').slice(0,70)+' | EN='+strip(en[0]||'').slice(0,70));
    });
  }
  console.log();
}
