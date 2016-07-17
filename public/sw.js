/* global self, clients */
/* jshint esnext: true */
var TITLE = 'Notification from ffconf 2016';
var OPEN_URL = 'https://2016.ffconf.org/';
var BODY = 'Default push message';
var ICON = 'images/logo.png';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Received push');
  var notificationTitle = TITLE;
  var notificationOptions = {
    body: BODY,
    icon: ICON
  };

  if (event.data) {
    var msg = {
      t: TITLE,
      b: BODY
    };
    try {
      var tmp = JSON.parse(event.data.text());
      msg.t = tmp.t || msg.t;
      msg.b = tmp.b || msg.b;
    } catch(e) {}
    notificationTitle = msg.t;
    notificationOptions.body = msg.b;
  }

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click', event.notification);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();
  var url = OPEN_URL;
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});