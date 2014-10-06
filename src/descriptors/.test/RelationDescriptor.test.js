"use strict";

var $relation = require('..').relation;

module.exports = function() {
	test('all provided', function() {
		var fullDescriptor = $relation({
			type       : 'SOLD_BY',
			self       : { label: 'Competitor' },
			related    : { label: 'CompetitorProduct', alias: 'product' },
			direction  : 'inbound',
			cardinality: 'one'
		});
		var fullMatchClause = [
			'(competitor:Competitor)',
			'<-[:SOLD_BY]-',
			'(product:CompetitorProduct)'
		].join('');
		fullDescriptor.matchPart().toString().should.eql(fullMatchClause);
	});
	test('with initial context', function() {
		var fullDescriptor = $relation({
			type       : 'SOLD_BY',
			related    : { label: 'CompetitorProduct', alias: 'product' },
			direction  : 'inbound',
			cardinality: 'one',
			context    : 'competitor'
		});
		var fullMatchClause = [
			'competitor',
			'<-[:SOLD_BY]-',
			'(competitor_product:CompetitorProduct)'
		].join('');
		fullDescriptor.matchPart().toString().should.eql(fullMatchClause);
	});
	test('with added context', function() {
		var fullDescriptor = $relation({
			type       : 'SOLD_BY',
			related    : { label: 'CompetitorProduct', alias: 'product' },
			direction  : 'inbound',
			cardinality: 'one'
		}).withContext('competitor');
		var fullMatchClause = [
			'competitor',
			'<-[:SOLD_BY]-',
			'(competitor_product:CompetitorProduct)'
		].join('');
		fullDescriptor.matchPart().toString().should.eql(fullMatchClause);
	});
	suite('minimum provided', function() {
		test('#matchPart', function() {
			var minimalDescriptor = $relation({
				type   : 'COVERS',
				related: { alias: 'market' }
			});
			var minimalMatchClause = '$self-[:COVERS]->market';
			minimalDescriptor.matchPart().toString().should.eql(minimalMatchClause);
		});
		test('calling #matchPart twice', function() {
			var minimalDescriptor = $relation({
				type   : 'COVERS',
				related: { alias: 'market' }
			});
			var minimalMatchClause = '$self-[:COVERS]->market';
			minimalDescriptor.matchPart();
			minimalDescriptor.matchPart().toString().should.eql(minimalMatchClause);
		});
	});
};
