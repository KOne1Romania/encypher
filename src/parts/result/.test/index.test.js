"use strict";

var forOwn = require('lodash-node').forOwn;

var suiteDefs = require('require-all')({
	dirname: __dirname,
	filter: /^(.*)Result\.test\.js/,
	excludeDirs: /.+/
});

suite('result', function() {
	forOwn(suiteDefs, function(suiteDef, suiteName) {
		suite(suiteName.toLowerCase(), suiteDef);
	});
});
