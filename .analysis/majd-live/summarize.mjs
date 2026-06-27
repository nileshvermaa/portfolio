import fs from 'node:fs';
const load = JSON.parse(fs.readFileSync('.analysis/majd-live/load-precise.json','utf8'));
const nav = JSON.parse(fs.readFileSync('.analysis/majd-live/nav-click-precise.json','utf8'));
const scroll = JSON.parse(fs.readFileSync('.analysis/majd-live/scroll-portrait-chain.json','utf8'));
const firstLast = (arr, pick) => ({ first: pick(arr[0]), last: pick(arr[arr.length-1]) });
console.log('load frames', load.length, 'first/last', firstLast(load, f => ({t:f.t, nav:f.nav, portrait:f.portrait, titleParts:f.titleParts?.slice(0,2)})));
console.log('nav frames', nav.length, 'heights', [...new Set(nav.map(f => Math.round(f.nav?.h||0)))].slice(0,20), 'first', nav[0]?.nav, 'last', nav[nav.length-1]?.nav);
console.log('scroll summary');
for (const s of scroll) { const b=s.boxes[2]||s.boxes[1]||s.boxes[0]; console.log(s.y, b?.rect, b?.transform, b?.pos); }
