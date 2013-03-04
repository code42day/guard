var assert = require('assert');
var guard = require('../lib/guard.js');

/*global describe, it*/

describe('guard', function() {

  it('should trigger after on/off', function(done) {
    var g, x, y;

    g = guard(function() {
      x = true;
      assert.equal(y, 5);
      done();
    });
    y = 0;
    g.on();
    y = 1;
    g.on();
    y = 2;
    g.off();
    y = 3;
    assert.ok(!x);
    g.on();
    y = 4;
    g.off();
    y = 5;
    g.off();
  });

  it('should trigger after off when initialized', function(done) {
    var g;

    g = guard(function() {
      done();
    }, true);
    g.off();
  });

  it('should trigger after off when initialized with a number', function(done) {
    var g, x;

    g = guard(function() {
      assert.equal(x, 4);
      done();
    }, 4);
    x = 1;
    g.off();
    x = 2;
    g.off();
    x = 3;
    g.off();
    x = 4;
    g.off();
  });

  it ('should trigger on/off callbacks', function() {
    var x, g;

    function fn1() {
      x = 'on';
    }

    function fn2() {
      x = 'off';
    }

    g = guard().onCallback(3, fn1).offCallback(1, fn2);

    g.on(); // 1
    assert.equal(x, undefined);
    g.on(); // 2
    assert.equal(x, undefined);
    g.on(); // 3
    assert.equal(x, 'on');

    g.off(); // 2
    assert.equal(x, 'on');
    g.off(); // 1
    assert.equal(x, 'off');

    g.on(); // 2
    assert.equal(x, 'off');
    g.on(); // 3
    assert.equal(x, 'on');
  });
});