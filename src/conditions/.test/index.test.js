"use strict";

var forOwn = require('lodash-node').forOwn;

require('chai').should();

var suiteDefs = require('require-all')({
	dirname: __dirname,
	filter: /^(.*)Condition\.test\.js/,
	excludeDirs: /.+/
});

suite('conditions', function() {
	forOwn(suiteDefs, function(suiteDef, suiteName) {
		suite(suiteName.toLowerCase(), suiteDef);
	});
});
