"use strict";

require('chai').should();

var $id = require('..').id;

module.exports = function() {
	test('default', function() {
		$id().toString().should.eql('id($self) as id');
	});
	test('with context', function() {
		$id().of('competitor').toString().should.eql('id(competitor) as competitorId');
	});
	test('with nested context', function() {
		$id().of('market').of('competitor').toString()
			.should.eql('id(competitor_market) as competitorMarketId');
	});
	test('from reference', function() {
		$id().as('competitor').toString()
			.should.eql('id(competitor) as id');
	});
	test('with context from reference', function() {
		$id().of('market').as('competitor').toString()
			.should.eql('id(competitor_market) as marketId');
	});
};
