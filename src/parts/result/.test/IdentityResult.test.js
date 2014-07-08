"use strict";

require('chai').should();

var $identity = require('..').identity;
var $node = require('..').node;

module.exports = function() {
	test('does nothing to the received part', function() {
		var part = $node().of('market');
		$identity(part).toString().should.eql('market');
	});
};
