import fs from 'node:fs';
const top = JSON.parse(fs.readFileSync('.analysis/majd-live/top-map.json','utf8'));
for (const n of top.filter(n => /SOFTWARE|ENGINEER|CREATING|2026|Majd|Hey|Portrait/.test(n.text) || (n.rect.w>1000 && n.rect.h>100))) console.log(JSON.stringify(n));
const navFrames = JSON.parse(fs.readFileSync('.analysis/majd-live/nav-click-precise.json','utf8'));
for (const idx of [0,5,10,15,20,25,30,35,40,50,60]) { const f=navFrames[idx]; if (f) console.log('navframe', idx, f.t, f.nav, f.children.slice(0,8)); }
const load=JSON.parse(fs.readFileSync('.analysis/majd-live/load-precise.json','utf8'));
for (const idx of [0,5,10,20,30,40,50,70,90,108]) { const f=load[idx]; if(f) console.log('load', idx, f.t, f.nav, f.titleParts?.map(p=>({t:p.text, r:p.rect, o:p.opacity, tr:p.transform, fs:p.fontSize})).slice(0,4)); }
