/**
 * Executes 'done' method when internal counter reaches 0.
 * Exports on and off methods to manipulate the counter
 */

module.exports = function guard(done, init) {
  var counter = 0;

  function on() {
    counter += 1;
  }

  function off() {
    counter -= 1;
    if (counter === 0 && typeof done === 'function') {
      process.nextTick(done);
    }
  }

  if (typeof init === 'number') {
    while(init > 0) {
      on();
      init -= 1;
    }
  } else if (init) {
    on();
  }

  return {
    on: on,
    off: off
  };
};
