const CACHE_NAME = 'little-painter-pwa-v4-ipad';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];
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
