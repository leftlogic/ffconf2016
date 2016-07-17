window.UI = function() {
  var $$ = document.querySelector.bind(document);

  var $subscribe = $$('#subscribe');
  var $subscribeWrapper = $$('#subscribe-wrapper');
  var $subscribeLabel = $$('#subscribe-label');
  var $notSupported = $$('#not-supported');

  this.notSupported = function(msg) {
    $notSupported.innerHTML = msg;
  };

  this.disable = function() {
    $subscribe.disabled = true;
  };

  this.enable = function() {
    $subscribe.disabled = false;
  };

  this.subscribed = function() {
    $subscribe.checked = true;
    $subscribeLabel.innerHTML = 'Disable';
  };

  this.unsubscribed = function() {
    $subscribe.checked = false;
    $subscribeLabel.innerHTML = 'Enable';
  };

  this.load = function() {
    $subscribeWrapper.style.display = '';
    $notSupported.style.display = 'none';
  };

  this.action = function(cb) {
    $subscribe.addEventListener('click', cb);
  };
};

window.Subscription = function(remoteUrl) {
  var sendPost = function(opt) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', opt.url, true);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.responseType = 'json';

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          resolve(request.response);
        } else {
          // We reached our target server, but it returned an error
          reject(request.response);
        }
      };

      request.onerror = function(err) {
        reject(err);
      };

      request.send(JSON.stringify(opt.data));
    });
  };

  var sendDelete = function(opt) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('DELETE', opt.url, true);
      request.responseType = 'json';

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          resolve(request.response);
        } else {
          // We reached our target server, but it returned an error
          reject(request.response);
        }
      };

      request.onerror = function(err) {
        reject(err);
      };

      request.send();
    });
  };

  this.sendSubscriptionToServer = function(sub) {
    return sendPost({
      url: remoteUrl + '/clients',
      data: sub
    })
    .then(function(res) {
      if (res.status === 1 && res.id) {
        try {
          var o = {};
          o[sub.endpoint] = res.id;
          localStorage.setItem('pushNotificationId', JSON.stringify(o));
        } catch(e) {
          console.error(e);
        }
      }
      return res;
    });
  };

  this.cancelSubscriptionFromServer = function(sub) {
    var o = {};
    try {
      o = JSON.parse(localStorage.getItem('pushNotificationId'));
    } catch(e) {
      console.error(e);
      return Promise.reject(e);
    }
    var id = o[sub.endpoint];
    return sendDelete({
      url: remoteUrl + '/client/' + id
    })
    .then(function(res) {
      try {
        localStorage.removeItem('pushNotificationId');
      } catch(e) {
        console.error(e);
      }
      return res;
    });
  };
};

/* global ServiceWorkerRegistration */
window.Notifications = function(ui, s) {
  var isPushEnabled = false;

  function sendSubscriptionToServer(sub) {
    console.log(sub);
    return s.sendSubscriptionToServer(sub);
  }
  function cancelSubscriptionFromServer(sub) {
    return s.cancelSubscriptionFromServer(sub);
  }

  this.init = function() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      ui.notSupported('Notifications not supported');
      return;
    }
    
    // Check the current Notification permission
    // If it's denied, it's a permanent block until the user changes the permission
    if (Notification.permission === 'denied') {
      ui.notSupported('The user has blocked notifications');
      return;
    }

    // Is push messaging supported?
    if (!('PushManager' in window)) {
      ui.notSupported('Push messaging not supported');
      return;
    }

    ui.load();

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // Do we already have a push message subscription?
      serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from push messages
        ui.enable();

        if (!subscription) {
          // We aren't subscribed to push, so set UI to allow the user to enable push
          return;
        }

        // Keep your server in sync with the latest subscriptionId
        // var sub = JSON.parse(JSON.stringify(subscription));
        // return sendSubscriptionToServer(sub);

        // Set your UI to show they have subscribed for push messages
        ui.subscribed();
        isPushEnabled = true;
      })
      .catch(function(err) {
        console.error('Error during getSubscription()', err);
      });
    });
  };

  function subscribe() {
    // Disable the button so it can't be changed while we process the permission request
    ui.enable();

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {
        // The subscription was successful
        ui.subscribed();
        isPushEnabled = true;

        // TODO: Send the subscription.endpoint to your server and save it to send a push message at a later date
        var sub = JSON.parse(JSON.stringify(subscription));
        return sendSubscriptionToServer(sub);
      })
      .catch(function(err) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
          console.warn('Permission for Notifications was denied');
          ui.disable();
        }
        else {
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', err);
          ui.enable();
          ui.unsubscribed();
        }
      });
    });
  }

  function unsubscribe() {
    ui.disable();

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // To unsubscribe from push messaging, you need get the subscription object, which you can call unsubscribe() on
      serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Check we have a subscription to unsubscribe
        if (!subscription) {
          // No subscription object, so set the state to allow the user to subscribe to push
          ui.unsubscribed();
          isPushEnabled = false;
          return;
        }

        var sub = JSON.parse(JSON.stringify(subscription));
        // TODO: Make a request to your server to remove
        // the subscriptionId from your data store so you
        // don't attempt to send them push messages anymore
        cancelSubscriptionFromServer(sub);

        // We have a subscription, so call unsubscribe on it
        subscription.unsubscribe()
        .then(function(successful) {
          if (successful) {
            ui.unsubscribed();
            isPushEnabled = false;
            ui.enable();
          }
        })
        .catch(function(err) {
          // We failed to unsubscribe, this can lead to
          // an unusual state, so may be best to remove
          // the users data from your data store and
          // inform the user that you have done so

          console.error('Unsubscription error: ', err);
          ui.unsubscribed();
          ui.enable();
        });
      })
      .catch(function(err) {
        console.error('Error thrown while unsubscribing from push messaging.', err);
      });
    });
  }

  this.toggle = function() {
    if (isPushEnabled) {
      unsubscribe();
    }
    else {
      subscribe();
    }
  };
};