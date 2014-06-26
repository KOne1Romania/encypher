"use strict";

var forOwn = require('lodash-node').forOwn;

var suiteDefs = require('require-all')({
	dirname: __dirname,
	filter: /^(.*)Res\.test\.js/,
	excludeDirs: /.+/
});

suite('res', function() {
	forOwn(suiteDefs, function(suiteDef, suiteName) {
		suite(suiteName.toLowerCase(), suiteDef);
	});
});
