"use strict";

var $field = require('..').field;

module.exports = function() {
	test('default', function() {
		$field('name').toString().should.eql('$self.name as name');
	});
	test('with context', function() {
		$field('name').of('competitor').toString().should.eql('competitor.name as competitorName');
	});
	test('with nested context', function() {
		$field('name').of('market').of('competitor').toString()
			.should.eql('competitor_market.name as competitorMarketName');
	});
	test('from reference', function() {
		$field('name').as('competitor').toString()
			.should.eql('competitor.name as name');
	});
	test('with context from reference', function() {
		$field('name').of('market').as('competitor').toString()
			.should.eql('competitor_market.name as marketName');
	});
	test('from nested reference', function() {
		$field('name').as('market').as('competitor').toString()
			.should.eql('competitor_market.name as name');
	});
};
