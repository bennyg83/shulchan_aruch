const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/siman11';
const jsonPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

// Dump all RAE entries in corpus for siman 11
console.log('=== Corpus siman11 RAE entries ===');
const seifDirs=fs.readdirSync(base).filter(d=>d.startsWith('seif-')).sort();
for(const d of seifDirs){
  const hp=path.join(base,d,'rabbi-akiva-eiger','he.html');
  const ep=path.join(base,d,'rabbi-akiva-eiger','en.html');
  if(!fs.existsSync(hp)&&!fs.existsSync(ep)) continue;
  const he=fs.existsSync(hp)?brSegs(fs.readFileSync(hp,'utf8')):[];
  const en=fs.existsSync(ep)?brSegs(fs.readFileSync(ep,'utf8')):[];
  if(!he.length&&!en.length) continue;
  const status=he.length&&en.length?'HE+EN':he.length?'HE_ONLY':'PHANTOM';
  console.log(d+' ['+status+']');
  he.forEach((s,i)=>console.log('  HE['+i+']: '+strip(s).slice(0,110)));
  en.forEach((s,i)=>console.log('  EN['+i+']: '+strip(s).slice(0,110)));
}

// Dump all RAE JSON entries for siman 11
console.log('\n=== Sefaria JSON siman11 RAE entries ===');
const entries=j.text[10]||[];
entries.forEach((e,i)=>{
  if(typeof e==='string'&&e.trim())
    console.log('json['+i+'] (corpus seif '+(i+1)+'): '+strip(e).slice(0,110));
});

// Also show mechaber seif 9 and adjacent seifim from corpus
console.log('\n=== Corpus siman11 Mechaber seif-008 to seif-015 (for context) ===');
for(let n=8;n<=15;n++){
  const d='seif-'+String(n).padStart(3,'0');
  const hp=path.join(base,d,'mechaber','he.html');
  if(!fs.existsSync(hp)) continue;
  const he=brSegs(fs.readFileSync(hp,'utf8'));
  if(he.length) console.log(d+' mechaber HE: '+strip(he[0]).slice(0,100));
}
