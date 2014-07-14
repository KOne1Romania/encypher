"use strict";

var $count = require('..').count;
var QueryPartError = require('../../../errors/QueryPartError');

module.exports = function() {
	test('throws error if no context provided', function() {
		var fn = function() {	$count().toString(); };
		fn.should.throw(QueryPartError, /requires a context/);
	});
	test('throws error if context is null', function() {
		var fn = function() {	$count().of().toString(); };
		fn.should.throw(QueryPartError, /requires a context/);
	});
	test('with context from reference', function() {
		$count().of('market').as('competitor').toString()
			.should.eql('count(distinct competitor_market) as marketsCount');
	});
	test('from nested reference', function() {
		var countResult = $count().of('parent').as('market').as('competitor');
		var asString = 'count(distinct competitor_market_parent) as parentsCount';
		countResult.toString().should.eql(asString);
	});
};
