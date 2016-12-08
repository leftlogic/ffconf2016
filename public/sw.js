/* global self, caches, fetch, URL */
const version = '1.4.1';
const staticCacheName = `v${version}::static`;

const urls = `

/
/workshops
/css/style.css
/images/bg-header-1500_2x.jpg
/js/sticky-pagination-fixer.js
/js/raf.js
/js/picturefill.min.js
/js/smooth-scroll.min.js
/js/script.js
/images/sponsors/chrome.png
/images/sponsors/samsung.png
/images/sponsors/mozilla.png
/images/left-logic.svg
/images/pattern_nolines2x.png
/images/sponsors/amex.png
/images/sponsors/jsbin.png
/images/sponsors/snyk.svg
/images/sponsors/prodpad.png
/images/quotes/robin-mehner.jpg
/images/sponsors/brandwatch.png
/images/sponsors/opbeat.svg
/images/sponsors/ms-edge.png
/images/left-logic.svg
/images/sponsors/headforwards.svg
/images/workshops/2x-rachel.jpg
/images/workshops/2x-gerard.jpg
/images/workshops/2x-remy.jpg
/images/speakers/rachel.jpg
/images/speakers/ada.jpg
/images/speakers/leonie.jpg
/images/speakers/andrew.jpg
/images/speakers/mariko.jpg
/images/speakers/umar.jpg
/images/speakers/ashley.jpg
/images/speakers/mathieu.jpg
/images/quotes/anna-shipman.jpg
/images/quotes/james-da-costa.jpg
/images/quotes/john-k-paul.jpg
/images/quotes/hannah-wolfe.jpg
/images/quotes/phil-nash.jpg
/images/quotes/robin-mehner.jpg
/images/quotes/david-mcgeorge.jpg
/images/quotes/prisca-schmarsow.jpg
/images/quotes/glenn-jones.jpg
/images/quotes/james-wragg.jpg
/images/quotes/aisling-brock.jpg
/images/quotes/natalia-waniczek.jpg
/images/quotes/heather-lauren.jpg

`.trim().split('\n');

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources to make this
  // work offline
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(urls).then(() => self.skipWaiting());
    })
  );
});

function clearOldCaches() {
  return caches.keys().then(keys => {
    return Promise.all(keys
      .filter(key => key !== staticCacheName)
      .map(key => caches.delete(key))
    );
  });
}

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  var res = event.request;

  // when the browser fetches a url, either response with the cached object
  // or go ahead and fetch the actual url
  event.respondWith(
    caches.open(staticCacheName).then(cache => {
      return cache.match(res).then(res => {
        return res || fetch(event.request);
      })
    })
  );
});
