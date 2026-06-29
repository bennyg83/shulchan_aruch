const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

// Count corpus state for a given commentator slug
function scanCommentator(slug){
  const stats={heOnly:0,enOnly:0,both:0,empty:0,totalDirs:0,
    garbageEN:0, // EN exists but looks like garbage
    heSegTotal:0,enSegTotal:0};
  const garbage=['terrorist','heaven\'s people','kgb','lord\'s prayer','star work','bible and the','m\.m\.m','d\.d\.d\.','starwork','lycott'];
  const garbageRe=new RegExp(garbage.join('|'),'i');

  const simanDirs=fs.readdirSync(base).filter(d=>d.startsWith('siman')).sort((a,b)=>parseInt(a.slice(5))-parseInt(b.slice(5)));
  for(const si of simanDirs){
    const siPath=path.join(base,si);
    const seifDirs=fs.readdirSync(siPath).filter(d=>d.startsWith('seif-'));
    for(const se of seifDirs){
      const hp=path.join(siPath,se,slug,'he.html');
      const ep=path.join(siPath,se,slug,'en.html');
      const heExists=fs.existsSync(hp);
      const enExists=fs.existsSync(ep);
      if(!heExists&&!enExists) continue;
      stats.totalDirs++;
      const he=heExists?brSegs(fs.readFileSync(hp,'utf8')):[];
      const en=enExists?brSegs(fs.readFileSync(ep,'utf8')):[];
      if(he.length&&en.length){stats.both++;stats.heSegTotal+=he.length;stats.enSegTotal+=en.length;}
      else if(he.length){stats.heOnly++;}
      else if(en.length){stats.enOnly++;}
      else{stats.empty++;}
      if(en.length&&garbageRe.test(strip(en[0]))) stats.garbageEN++;
    }
  }
  return stats;
}

// Also check Sefaria JSON for MA
function scanMAJson(){
  const maPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries';
  const dirs=fs.readdirSync(maPath);
  const maDir=dirs.find(d=>/Magen.Avraham/i.test(d)||/Magen_Avraham/i.test(d));
  if(!maDir){console.log('MA JSON dir not found. Dirs:',dirs.slice(0,10).join(', '));return null;}
  console.log('MA JSON dir:',maDir);
  const jPath=path.join(maPath,maDir,'merged.json');
  if(!fs.existsSync(jPath)){console.log('No merged.json in',maDir);return null;}
  const j=JSON.parse(fs.readFileSync(jPath,'utf8'));
  let total=0,withLabel=0,noLabel=0;
  const labelTypes={};
  for(let si=0;si<j.text.length;si++){
    const seifim=j.text[si];
    if(!Array.isArray(seifim))continue;
    for(const e of seifim){
      if(typeof e!=='string'||!e.trim())continue;
      total++;
      const smallM=e.match(/<small>([\s\S]*?)<\/small>/);
      const boldM=e.match(/<b>([\s\S]*?)<\/b>/);
      const label=(smallM?smallM[1]:boldM?boldM[1]:'').trim().slice(0,30);
      if(label){
        withLabel++;
        const t=label.replace(/[\d\s'"״׳א-ת]/g,'').slice(0,10)||'other';
        labelTypes[t]=(labelTypes[t]||0)+1;
      } else noLabel++;
    }
  }
  return {total,withLabel,noLabel,labelTypes};
}

console.log('=== RAE corpus state ===');
const rae=scanCommentator('rabbi-akiva-eiger');
console.log('HE+EN (complete):',rae.both);
console.log('HE only:',rae.heOnly);
console.log('EN only (phantom):',rae.enOnly);
console.log('Empty dirs:',rae.empty);
console.log('Total HE segments:',rae.heSegTotal);
console.log('Total EN segments:',rae.enSegTotal);
console.log('Garbage EN:',rae.garbageEN);

console.log('\n=== MA corpus state ===');
const ma=scanCommentator('magen-avraham');
console.log('HE+EN (complete):',ma.both);
console.log('HE only:',ma.heOnly);
console.log('EN only (phantom):',ma.enOnly);
console.log('Empty dirs:',ma.empty);
console.log('Total HE segments:',ma.heSegTotal);
console.log('Total EN segments:',ma.enSegTotal);
console.log('Garbage EN:',ma.garbageEN);

console.log('\n=== MA Sefaria JSON ===');
const maJson=scanMAJson();
if(maJson){
  console.log('Total entries:',maJson.total);
  console.log('With any label tag:',maJson.withLabel);
  console.log('No label:',maJson.noLabel);
  console.log('Label types:',JSON.stringify(maJson.labelTypes));
}
