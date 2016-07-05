/* global confDays, fontCache, fontInsert, fontKey, fontUrl, TWEEN */
(function () {
  var $ = function (s) {
    try {
      return document.querySelectorAll(s);
    } catch (e) {
      return [];
    }
  };
  var $$ = function (s) {
    try {
      return document.querySelector(s);
    } catch (e) {
      return [];
    }
  };


//=== Tween
  document.body.addEventListener('click', function (event) {
    var node = event.target;
    var location = window.location;

    // ignore non-links
    if (node.nodeName !== 'A') {
      return;
    }

    // only hook local urls
    if (node.origin !== location.origin || node.pathname !== location.pathname) {
      return;
    }

    event.preventDefault();

    window.history.pushState(null, null, node.hash);

    var target = $(node.hash)[0];
    var coords = { x: 0, y: window.scrollY };
    var tween = new TWEEN.Tween(coords)
      .to({ x: 0, y: target.offsetTop }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function () {
        window.scrollTo(this.x, this.y);
      })
      .start();

    requestAnimationFrame(animate);

    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
  });


//=== 100% height header
  var $masthead = document.querySelector('#masthead');
  var $svgLogo = document.querySelector('#svg-logo');
  var $svgDesc = document.querySelector('#svg-desc');
  function t() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    var maxH = h / 100 * 40;
    if (h < 768 && w < 768) {
      $masthead.style.height = h + 'px';
      $svgLogo.style.maxHeight = maxH + 'px';
      $svgDesc.style.maxHeight = maxH + 'px';
    }
    else {
      $masthead.style.height = '';
      $svgLogo.style.maxHeight = '';
      $svgDesc.style.maxHeight = '';
    }
  }
  t();
  // Resize
  // https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame
  var optimizedResize = (function() {
    var timeoutID;
    var running = false;
    // fired on resize event
    function resize() {
      if (!running) {
        running = true;
        if (requestAnimationFrame) {
          requestAnimationFrame(runCallbacks);
        }
        else {
          clearTimeout(timeoutID);
          timeoutID = setTimeout(runCallbacks, 500);
        }
      }
    }
    function runCallbacks() {
      t();
      running = false;
    }
    return {
      init: function() {
        window.addEventListener('resize', resize);
      }
    };
  }());
  // Not on resize on mobile
  if (!/mobi/i.test(navigator.userAgent)) {
    optimizedResize.init();
  }


//=== Fonts
  // http://crocodillon.com/blog/non-blocking-web-fonts-using-localstorage
  // POST-RENDER
  if (!fontCache) {
    // Fonts not in LocalStorage or md5 did not match
    window.addEventListener('load', function() {
      var request = new XMLHttpRequest(),
          response;
      request.open('GET', fontUrl, true);
      request.onload = function() {
        if (this.status == 200) {
          try {
            response = JSON.parse(this.response);
            fontInsert(response.value);
            window.localStorage.setItem(fontKey, this.response);
          } catch(e) {
            // LocalStorage is probably full
          }
        }
      };
      request.send();
    });
  }


//=== Quotes
  // convert NodeList to Array https://davidwalsh.name/nodelist-array
  var quotesWrapper = [].slice.call($('blockquote.quote'));
  var quotesTemplate = [].slice.call($('script.quote-template'));
  quotesWrapper.forEach(function(item) {
    var len = quotesTemplate.length;
    var rnd = Math.floor(Math.random() * len);
    var q = quotesTemplate.splice(rnd, 1);
    item.innerHTML = q[0].innerHTML;
  });


//=== Scroll to session
  var skipNav = false; // if we want to scroll down without showing the menu
  var $nav = $('.nav-main');
  var today = new Date();
  var best;
  var isConfDay = false;
  var whichConfDay = 0;

  confDays.forEach(function(confDay, index) {
    if ((today.getDate() === confDay.getDate()) &&
        (today.getMonth() === confDay.getMonth()) &&
        (today.getFullYear() === confDay.getFullYear())
    ) {
      isConfDay = true;
      whichConfDay = index + 1;
    }
  });

  if (isConfDay) {
    // find the current session
    var sessions = $('.js-session');
    var length = sessions.length;
    best = sessions[0];

    for (var i = 0; i < length; i++) {
      if ((Date.parse(sessions[i].getAttribute('data-date' + whichConfDay)) - (5 * 1000 * 60)) < today) {
        best = sessions[i];
      }
    }
  }

  // if today is conference day, then scroll the current session into view
  if (isConfDay && best && !window.location.hash) {
    setTimeout(function () {
      best.scrollIntoView(true);
    }, 750);
  } else if (skipNav) {
    // only scroll the front page
    // && /mobi/i.test(navigator.userAgent)
    $nav.length > 0 && location.pathname === '/' && !location.hash && setTimeout(function () {
      if (!pageYOffset) window.scrollTo(0, $nav[0].offsetHeight);
    }, 750);
  }
})();
