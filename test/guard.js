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
});