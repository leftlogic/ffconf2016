/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
!function(){if("performance"in window==!1&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==!1){var n=window.performance.timing&&window.performance.timing.navigationStart?window.performance.timing.navigationStart:Date.now();window.performance.now=function(){return Date.now()-n}}}();var TWEEN=TWEEN||function(){var n=[];return{getAll:function(){return n},removeAll:function(){n=[]},add:function(t){n.push(t)},remove:function(t){var r=n.indexOf(t);-1!==r&&n.splice(r,1)},update:function(t){if(0===n.length)return!1;var r=0;for(t=void 0!==t?t:window.performance.now();r<n.length;)n[r].update(t)?r++:n.splice(r,1);return!0}}}();TWEEN.Tween=function(n){var t=n,r={},i={},o={},u=1e3,e=0,a=!1,f=!1,c=!1,s=0,h=null,l=TWEEN.Easing.Linear.None,p=TWEEN.Interpolation.Linear,E=[],w=null,d=!1,v=null,I=null,M=null;for(var m in n)r[m]=parseFloat(n[m],10);this.to=function(n,t){return void 0!==t&&(u=t),i=n,this},this.start=function(n){TWEEN.add(this),f=!0,d=!1,h=void 0!==n?n:window.performance.now(),h+=s;for(var u in i){if(i[u]instanceof Array){if(0===i[u].length)continue;i[u]=[t[u]].concat(i[u])}void 0!==r[u]&&(r[u]=t[u],r[u]instanceof Array==!1&&(r[u]*=1),o[u]=r[u]||0)}return this},this.stop=function(){return f?(TWEEN.remove(this),f=!1,null!==M&&M.call(t),this.stopChainedTweens(),this):this},this.stopChainedTweens=function(){for(var n=0,t=E.length;t>n;n++)E[n].stop()},this.delay=function(n){return s=n,this},this.repeat=function(n){return e=n,this},this.yoyo=function(n){return a=n,this},this.easing=function(n){return l=n,this},this.interpolation=function(n){return p=n,this},this.chain=function(){return E=arguments,this},this.onStart=function(n){return w=n,this},this.onUpdate=function(n){return v=n,this},this.onComplete=function(n){return I=n,this},this.onStop=function(n){return M=n,this},this.update=function(n){var f,M,m;if(h>n)return!0;d===!1&&(null!==w&&w.call(t),d=!0),M=(n-h)/u,M=M>1?1:M,m=l(M);for(f in i)if(void 0!==r[f]){var g=r[f]||0,T=i[f];T instanceof Array?t[f]=p(T,m):("string"==typeof T&&(T=T.startsWith("+")||T.startsWith("-")?g+parseFloat(T,10):parseFloat(T,10)),"number"==typeof T&&(t[f]=g+(T-g)*m))}if(null!==v&&v.call(t,m),1===M){if(e>0){isFinite(e)&&e--;for(f in o){if("string"==typeof i[f]&&(o[f]=o[f]+parseFloat(i[f],10)),a){var O=o[f];o[f]=i[f],i[f]=O}r[f]=o[f]}return a&&(c=!c),h=n+s,!0}null!==I&&I.call(t);for(var N=0,W=E.length;W>N;N++)E[N].start(h+u);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){return 0===n?0:1===n?1:-Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)},Out:function(n){return 0===n?0:1===n?1:Math.pow(2,-10*n)*Math.sin(5*(n-.1)*Math.PI)+1},InOut:function(n){return 0===n?0:1===n?1:(n*=2,1>n?-.5*Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)+1)}},Back:{In:function(n){var t=1.70158;return n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*(n*n*((t+1)*n-t)):.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return.5>n?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.Linear;return 0>t?u(n[0],n[1],i):t>1?u(n[r],n[r-1],r-i):u(n[o],n[o+1>r?r:o+1],i-o)},Bezier:function(n,t){for(var r=0,i=n.length-1,o=Math.pow,u=TWEEN.Interpolation.Utils.Bernstein,e=0;i>=e;e++)r+=o(1-t,i-e)*o(t,e)*n[e]*u(i,e);return r},CatmullRom:function(n,t){var r=n.length-1,i=r*t,o=Math.floor(i),u=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(0>t&&(o=Math.floor(i=r*(1+t))),u(n[(o-1+r)%r],n[o],n[(o+1)%r],n[(o+2)%r],i-o)):0>t?n[0]-(u(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[r]-(u(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):u(n[o?o-1:0],n[o],n[o+1>r?r:o+1],n[o+2>r?r:o+2],i-o)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var n=[1];return function(t){var r=1;if(n[t])return n[t];for(var i=t;i>1;i--)r*=i;return n[t]=r,r}}(),CatmullRom:function(n,t,r,i,o){var u=.5*(r-n),e=.5*(i-t),a=o*o,f=o*a;return(2*t-2*r+u+e)*f+(-3*t+3*r-2*u-e)*a+u*o+t}}},function(n){"function"==typeof define&&define.amd?define([],function(){return TWEEN}):"undefined"!=typeof module&&"object"==typeof exports?module.exports=TWEEN:void 0!==n&&(n.TWEEN=TWEEN)}(this);

/* global confDays, fontCache, fontInsert, fontKey, fontUrl */
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

    // event.preventDefault();

    // window.history.pushState(null, null, node.hash);

    var target = $(node.hash)[0];
    var id = target.id;
    delete target.id;
    var fromY = window.scrollY;
    var coords = { x: 0, y: fromY };
    var y = target.offsetTop;
    if (fromY < y) {
      y -= 100;
    }
    var running = true;
    var tween = new TWEEN.Tween(coords)
      .to({ x: 0, y: y }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function () {
        window.scrollTo(this.x, this.y);
        if (this.y === y) {
          target.id = id;
          window.location = node.hash;
          running = false;
        }
      })
      .start();

    requestAnimationFrame(animate);

    function animate(time) {
      if (running) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
    }
  });


  //=== 100% height header
  var $masthead = document.querySelector('#masthead');
  var $svgLogo = document.querySelector('#svg-logo');
  var $svgDesc = document.querySelector('#svg-desc');
  var stickyHeaderRef = $('#masthead picture')[0];
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

    boundery = stickyHeaderRef.offsetHeight;
  }
  t();

  var stickyHeader = $('#sticky-header')[0];
  var boundery = stickyHeaderRef.offsetHeight;
  var beforeScroll = 0;
  window.onscroll = function (event) {
    requestAnimationFrame(checkSticky);
  };

  function checkSticky() {
    var y = window.scrollY + 10;
    var isSticky = document.body.classList.contains('sticky');
    if (y > boundery) {
      if (!isSticky) {
        console.log('add sticky');
        document.body.classList.add('sticky');
      }
    } else if (isSticky) {
      console.log('remove sticky');
      document.body.classList.remove('sticky');
    }
  }


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
