/* global confDays */
// Scroll to session
(function() {
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

  // 100% height
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    if (h < 768 && w < 768) {
      document.querySelector('#masthead').style.height = h + 'px';
      document.querySelector('#svg-logo').style.maxHeight = h + 'px';
      document.querySelector('#svg-desc').style.maxHeight = h + 'px';
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