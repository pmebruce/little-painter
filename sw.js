/* natural-voice audio cache */const NV_CACHE='nv-audio-little-painter-v1';const NV_EAGER=["97611db516b6.mp3", "9a53ebaea0c0.mp3", "7897db4c33d5.mp3", "34bc104adf27.mp3", "0d919d90d6e3.mp3", "bd09f99e3cc9.mp3", "5274e916ac90.mp3", "6f96741c2562.mp3", "3aa7257a1a26.mp3", "dae828fe4fb7.mp3", "4a1ae3cda4be.mp3", "ba96bf8c2982.mp3", "db42244090b7.mp3", "daf384708ed3.mp3", "20a41b42b16b.mp3", "58b1918ede9d.mp3", "5996c71fae9f.mp3", "5a495ce6e37b.mp3", "9e2d5cab14cc.mp3", "fac816637761.mp3", "2d80ae1cf921.mp3", "727c92f2d9d8.mp3", "cf4e3461b503.mp3", "14acb1236444.mp3", "7f1838dec880.mp3", "532e69460607.mp3", "df52498f5046.mp3", "ef89f04b763f.mp3", "c4d05d546883.mp3", "38658e9a44ef.mp3", "2eae934531e9.mp3", "af726e58e062.mp3", "f919a8bb9dd5.mp3", "898e5dda1471.mp3", "fc782100b980.mp3", "500be7d0c9a8.mp3", "399dfb72de36.mp3", "044683d50e2f.mp3", "6bfcddc6034e.mp3", "0a678f75c844.mp3", "f7008714ccdf.mp3", "956fa4e2c6f7.mp3", "b69a4b88c6ca.mp3", "61b101b501cb.mp3", "a114d6d35d55.mp3", "5d9c8c7ba8b4.mp3", "228740857983.mp3", "7f3fd812c134.mp3", "3d7dd39aeed3.mp3", "2614624bdb67.mp3", "394fe6820368.mp3", "f6c42dd29969.mp3", "24cb4265682f.mp3", "d23e20cbf291.mp3", "0b3ea4acc8c3.mp3", "91cda8ed171e.mp3", "58bf90e3c494.mp3", "06b29625b1c6.mp3", "4a2766059b4d.mp3", "d01dd5ed318f.mp3", "6a8e03cbe40a.mp3", "c6642f322de9.mp3", "b10f5c01654c.mp3", "b616476b3cc9.mp3", "68604c49f356.mp3", "f6e70acec4b6.mp3", "34c54ef0e5af.mp3", "2835f830a218.mp3", "148a4776b64d.mp3", "594f6e57e782.mp3", "0ed485ee56f1.mp3", "c6dfb3da818f.mp3", "389044048ded.mp3", "0fbb3c5cf73c.mp3", "6f6b8405def7.mp3", "718676932678.mp3", "5fa7d39d2f4c.mp3", "efb3bd53d0b2.mp3", "bae37534332d.mp3", "b33ea3ad22ba.mp3", "07ee8a14dfdf.mp3", "3c62ebb2b60f.mp3", "d6ac95590b56.mp3", "937900ebec5c.mp3", "7ff505f6ef4e.mp3", "f2718c154462.mp3", "8f53e79895e2.mp3", "90dc6e89f701.mp3", "fc1091f4a1ef.mp3", "3e223c29f7e1.mp3", "314e2df11e0a.mp3", "40b7427675ea.mp3", "5cc8819711cf.mp3", "f47d34499a9d.mp3", "b75e9f806d29.mp3", "abc915589f6b.mp3", "945b4a494f3f.mp3", "6eb347d8a6bc.mp3", "1e998aaf670a.mp3", "e04b5963309e.mp3", "2b0af9923775.mp3", "39820b444245.mp3", "ae1cc74f757a.mp3", "b632323caeb9.mp3", "d0cd4ad5bca1.mp3", "9a1491b46731.mp3", "bcb34be61606.mp3", "c75a8febcf18.mp3", "bac478f7049e.mp3", "42f53e974d24.mp3", "ae11f9dfd51d.mp3", "f4926d19f4de.mp3", "f7a98d77445f.mp3", "10f128b05622.mp3", "b3f1324832a1.mp3", "005546a77d97.mp3", "5315aa5cfb73.mp3", "c346c50a73e2.mp3", "614af0f7f04f.mp3", "d5de41b39776.mp3", "9dd34bd188af.mp3", "a253a1dcbbc1.mp3", "4d901e5f0f2c.mp3", "116f278cd135.mp3", "acb13c91e610.mp3", "bdab046d5f14.mp3", "713fed4bbe64.mp3", "0f48e705b72a.mp3", "06cf121f9428.mp3", "671dd28f3431.mp3", "a0e068aede00.mp3", "c6d6fad1a03e.mp3", "165e0b54c00b.mp3", "c2feb631c8da.mp3", "4a28ee016cab.mp3", "2e9563083e4d.mp3", "d61cb198ca79.mp3", "605dcc5b5ade.mp3", "d6cd17320768.mp3"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(NV_CACHE).then(c=>c.addAll(['./natural-voice.js?v=1','./voice-zh/manifest.json?v=1'].concat(NV_EAGER.map(f=>'./voice-zh/'+f+'?v=1')))).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('nv-audio-little-painter-')&&n!==NV_CACHE).map(n=>caches.delete(n)))))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||e.request.headers.has('range'))return;const isClip=/\/voice-zh\/[^/]+\.mp3$/.test(u.pathname),isNV=/\/voice-zh\/manifest\.json$/.test(u.pathname)||/\/natural-voice\.js$/.test(u.pathname);if(!isClip&&!isNV)return;e.stopImmediatePropagation();
 e.respondWith(caches.open(NV_CACHE).then(async c=>{const hit=await c.match(e.request);if(isClip&&hit)return hit;try{const r=await fetch(e.request);if(r.status===200)c.put(e.request,r.clone());return r}catch(err){if(hit)return hit;throw err}}))});
/* end natural-voice */
const CACHE_NAME = 'little-painter-pwa-v8-viewport-islands-return-v1-nv1';
const ASSETS = ['./islands-return.js?v=1','./', './index.html', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith('little-painter-') || k.startsWith('little-artist-')) && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  if(event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if(response.ok) { const copy=response.clone(); event.waitUntil(caches.open(CACHE_NAME).then(c => c.put('./index.html', copy))); }
      return response;
    }).catch(() => caches.match('./index.html')));
  } else {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});

