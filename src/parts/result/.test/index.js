"use strict";

require('chai').should();
var forOwn = require('lodash-node').forOwn;

var suiteDefs = require('require-all')({
	dirname: __dirname,
	filter: /^(.*)Result\.test\.js/,
	excludeDirs: /.+/
});

module.exports = function() {
	forOwn(suiteDefs, function(suiteDef, suiteName) {
		suite(suiteName.toLowerCase(), suiteDef);
	});
};