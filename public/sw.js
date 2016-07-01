/* jshint esnext: true */

// It's too early to implement offline support or other niceties

// https://remysharp.com/2016/03/22/the-copy--paste-guide-to-your-first-service-worker
const cacheName = 'v1::static';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});