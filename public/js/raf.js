(function (window, request, cancel) {
  'use strict';
  var strings = {
    raf: 'requestAnimationFrame',
    caf: 'cancelAnimationFrame',
    af: 'AnimationFrame',
  };

  var queue = [];
  var lookup = {};
  var guid = 0;

  var _rAF = window[strings.raf];

  function clearQueue(time) {
    _rAF(clearQueue);
    if (!queue.length || !raf.running) {
      return;
    }

    var todo = queue.splice(0); // move items across
    var i = 0;
    var item = null;
    var length = todo.length;
    for (; i < length; i++) {
      item = todo[i];
      if (!item.cancel) {
        item.fn(time);
      }
      delete lookup[item.guid];
    }
  }

  clearQueue();

  var raf = function raf(fn) {
    guid++;

    lookup[guid] = fn;

    queue.push({
      guid: guid,
      cancel: false,
      fn: fn,
    });

    return guid;
  };

  raf.running = true;

  raf.cancel = function (id) {
    if (lookup[id]) {
      lookup[id].cancel = true;
      return true;
    }

    return false;
  };

  raf.fps = function (fn, fps) {
    var lastFrameTime = 0;
    var ms = 1000 / fps;

    function update(elapsedTime) {
      // calculate the delta since the last frame
      var delta = elapsedTime - (lastFrameTime || 0);

      // queue up an rAF update call
      raf(update);

      // if we *don't* already have a first frame, and the
      // delta is less than 33ms (30fps in this case) then
      // don't do anything and return
      if (lastFrameTime && delta < ms) {
        return;
      }
      // else we have a frame we want to update at our fps...

      // capture the last frame update time so we can work out
      // a delta next time.
      lastFrameTime = elapsedTime;

      // now do the frame update and render work
      fn(elapsedTime);
    }
    update();
  };

  if (cancel) {
    window[cancel] = raf.cancel;
  }

  if (!request) {
    request = 'raf';
  }

  window[request] = raf;

})(window, 'raf', 'craf');
