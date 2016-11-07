/* jshint esnext: true */
var CACHE_NAME = 'ffconf-v1.2.6';

// TODO: decide which files
var urlsToCache = [
  '/',
  '/workshops',
  '/css/style.css',
  '/js/script.js',
  '/images/left-logic.svg'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});