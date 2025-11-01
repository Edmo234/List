const CACHE_NAME = 'ctrl-produtos-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/Style.css',
  '/js/Script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', ev => {
  if (ev.request.method !== 'GET') return;
  ev.respondWith(
    caches.match(ev.request).then(resp => {
      if (resp) return resp;
      return fetch(ev.request).then(fetchResp => {
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(ev.request, fetchResp.clone()); } catch(e) {}
          return fetchResp.clone();
        });
      }).catch(()=> caches.match('/index.html'));
    })
  );
});
