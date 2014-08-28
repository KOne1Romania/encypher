'use strict';

var $fetch = require('../..').fetch;

module.exports = function() {
	suite('basic', function() {
		var fetchDescriptor;
		setup(function() {
			fetchDescriptor = $fetch({relationDescriptor: {
				type   : 'COVERS',
				related: { label: 'Market' }
			}});
		});
		test('#matchPart', function() {
			fetchDescriptor.matchPart().toString().should.eql('$self-[:COVERS]->(market:Market)')
		});
		test('#resultPart', function() {
			fetchDescriptor.resultPart().toString().should.eql('collect(distinct market) as markets');
		});
	});
	suite('relation to-one', function() {
		var fetchDescriptor;
		setup(function() {
			fetchDescriptor = $fetch({relationDescriptor: {
				type       : 'SOLD_BY',
				related    : { label: 'Competitor' },
				cardinality: 'one'
			}});
		});
		test('#matchPart', function() {
			fetchDescriptor.matchPart().toString().should.eql('$self-[:SOLD_BY]->(competitor:Competitor)')
		});
		test('#resultPart', function() {
			fetchDescriptor.resultPart().toString().should.eql('competitor');
		});
	});
	suite('complex', function() {
		var fetchDescriptor;
		setup(function() {
			fetchDescriptor = $fetch({
				relationDescriptor  : {
					self     : { label: 'Competitor' },
					type     : 'SOLD_BY',
					direction: 'inbound',
					related  : { label: 'CompetitorProduct', alias: 'product' }
				},
				fetchOptions: { aggregate: 'count' }
			});
		});
		test('#matchPart', function() {
			fetchDescriptor.matchPart().toString()
				.should.eql('(competitor:Competitor)<-[:SOLD_BY]-(product:CompetitorProduct)')
		});
		test('#resultPart', function() {
			fetchDescriptor.resultPart().toString().should.eql('count(distinct product) as productsCount');
		});
	});
};
