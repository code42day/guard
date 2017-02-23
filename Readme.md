[![Build Status](https://secure.travis-ci.org/pirxpilot/guard.png)](http://travis-ci.org/pirxpilot/guard)
[![NPM version](https://badge.fury.io/js/guard.png)](http://badge.fury.io/js/guard)

# guard 

Trivial guard: triggers callback when internal counter reaches 0.

## API

Create ```guard``` passing callback function. Call ```on()``` and ```off()``` to increase and
decrease internal counter.

    g = guard(function() {
      console.log('Done...')
    });
    g.on();
    g.on();
    g.off();
    g.off(); // prints 'Done...'

You can initialize the counter when creating a new guard.

    g = guard(function() {
      console.log('Done...')
    }, 2);
    g.on();
    // call off 3 times
    g.off();
    g.off();
    g.off(); // prints 'Done...'


In addition to `done` callback you can setup callbacks when counter reaches a certain value during
`on` or `off`

    g = guard()
      .onCallback(100, function() {
        // called when internal counter is 100 after increment
      })
      .offCallback(10, function() {
        // called when internal counter is 10 after decrement
      });

## License

MIT
