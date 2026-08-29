const CACHE = 'nilson-pdv-v3-20260829';
const FILES = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './sw.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request, { cache: 'no-store' }).then(response => {
            if (response && response.ok) {
                const copy = response.clone();
                caches.open(CACHE).then(cache => cache.put(event.request, copy));
            }
            return response;
        }).catch(() =>
            caches.match(event.request).then(cached =>
                cached || caches.match('./index.html')
            )
        )
    );
});
