"use strict";

var $relation = require('..').relation;

module.exports = function() {
	suite('all provided', function() {
		var fullDescriptor = $relation({
			type: 'SOLD_BY',
			self: { label: 'Competitor' },
			related: { label: 'CompetitorProduct', alias: 'product' },
			direction: 'inbound',
			cardinality: 'one'
		});
		test('#matchPart', function() {
			var fullMatchClause = [
				'(competitor:Competitor)',
				'<-[:SOLD_BY]-',
				'(product:CompetitorProduct)'
			].join('');
			fullDescriptor.matchPart().toString().should.eql(fullMatchClause);
		});
	});
	suite('minimum provided', function() {
		var minimalDescriptor = $relation({
			type: 'COVERS',
			related: 'market'
		});
		test('#matchPart', function() {
			var minimalMatchClause = '$self-[:COVERS]->market';
			minimalDescriptor.matchPart().toString().should.eql(minimalMatchClause);
		});
	});
};
