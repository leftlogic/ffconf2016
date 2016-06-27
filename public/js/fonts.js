// http://crocodillon.com/blog/non-blocking-web-fonts-using-localstorage
(function() {
  var md5 = 'c8c5676ae28fd20f3ddd940e8060fb08';
  var key = 'fonts';
  var url = '/css/fonts.c8c5676ae28fd20f3ddd940e8060fb08.woff.json';

  function insertFont(value) {
    var style = document.createElement('style');
    style.innerHTML = value;
    document.head.appendChild(style);
  }

  function useFont(md5, key, url) {
    var cache;
    // PRE-RENDER
    try {
      cache = window.localStorage.getItem(key);
      if (cache) {
        cache = JSON.parse(cache);
        if (cache.md5 == md5) {
          insertFont(cache.value);
        } else {
          // Busting cache when md5 doesn't match
          window.localStorage.removeItem(key);
          cache = null;
        }
      }
    } catch(e) {
      // Most likely LocalStorage disabled
      return;
    }

    // POST-RENDER
    if (!cache) {
      // Fonts not in LocalStorage or md5 did not match
      window.addEventListener('load', function() {
        var request = new XMLHttpRequest(),
            response;
        request.open('GET', url, true);
        request.onload = function() {
          if (this.status == 200) {
            try {
              response = JSON.parse(this.response);
              insertFont(response.value);
              window.localStorage.setItem(key, this.response);
            } catch(e) {
              // LocalStorage is probably full
            }
          }
        };
        request.send();
      });
    }
  }

  useFont(md5, key, url);
})();