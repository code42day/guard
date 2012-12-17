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

## License

MIT
