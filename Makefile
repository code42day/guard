all: lint test


lint:
	./node_modules/.bin/jshint lib test

test:
	./node_modules/.bin/mocha --recursive

.PHONY: all lint test
