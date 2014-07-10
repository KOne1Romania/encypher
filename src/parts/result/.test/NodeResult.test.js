"use strict";

var $node = require('..').node;

module.exports = function() {
	test('default', function() {
		$node().toString().should.eql('$self');
	});
	test('with context', function() {
		$node().of('competitor').toString().should.eql('competitor');
	});
	test('with context from reference', function() {
		$node().of('market').as('competitor').toString()
			.should.eql('competitor_market as market');
	});
};
