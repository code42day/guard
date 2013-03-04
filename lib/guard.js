/**
 * Executes 'done' method when internal counter reaches 0.
 * Exports on and off methods to manipulate the counter
 */

module.exports = function guard(done, init) {
  var self, counter = 0, callbacks = {};

  function onCallback(counter, fn) {
    callbacks.on = {
      counter: counter,
      fn: fn
    };
    return self;
  }

  function offCallback(counter, fn) {
    callbacks.off = {
      counter: counter,
      fn: fn
    };
    return self;
  }

  function callbackMaybe(type) {
    var cb = callbacks[type];
    if (cb && counter === cb.counter) {
      cb.fn();
    }
  }

  function on() {
    counter += 1;
    callbackMaybe('on');
    return self;
  }

  function off() {
    counter -= 1;
    callbackMaybe('off');
    if (counter === 0 && typeof done === 'function') {
      process.nextTick(done);
    }
    return self;
  }

  if (typeof init === 'number') {
    while(init > 0) {
      on();
      init -= 1;
    }
  } else if (init) {
    on();
  }

  self = {
    on: on,
    off: off,
    offCallback: offCallback,
    onCallback: onCallback
  };

  return self;
};
