"use strict";

require('chai').should();

var $coll = require('..').collect;
var $id = require('..').id;

module.exports = function() {
	test('default', function() {
		$coll().toString().should.eql('collect(distinct $self) as $selves');
	});
	test('with context', function() {
		$coll($id()).of('competitor').toString()
			.should.eql('collect(distinct id(competitor)) as competitorIds');
	});
	test('with context from reference', function() {
		$coll().of('market').as('competitor').toString()
			.should.eql('collect(distinct competitor_market) as markets');
	});
	test('from nested reference', function() {
		var collectResult = $coll($id()).of('parent').as('market').as('competitor');
		var asString = 'collect(distinct id(competitor_market_parent)) as parentIds';
		collectResult.toString().should.eql(asString);
	});
};
