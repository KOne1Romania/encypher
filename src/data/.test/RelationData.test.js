'use strict';

require('chai').should();

var RelationData = require('../RelationData');

suite('RelationData', function() {
	suite('basic', function() {
		var relationData;
		setup(function() {
			relationData = new RelationData({descriptor: {
				type   : 'COVERS',
				related: { label: 'Market' }
			}});
		});
		test('#matchPart', function() {
			relationData.matchPart().toString().should.eql('$self-[:COVERS]->(market:Market)')
		});
		test('#resultPart', function() {
			relationData.resultPart().toString().should.eql('collect(distinct market) as markets');
		});
	});
	suite('complex', function() {
		var relationData;
		setup(function() {
			relationData = new RelationData({
				descriptor  : {
					self     : { label: 'Competitor' },
					type     : 'SOLD_BY',
					direction: 'inbound',
					related  : { label: 'CompetitorProduct', alias: 'product' }
				},
				fetchOptions: { aggregate: 'count' }
			});
		});
		test('#matchPart', function() {
			relationData.matchPart().toString()
				.should.eql('(competitor:Competitor)<-[:SOLD_BY]-(product:CompetitorProduct)')
		});
		test('#resultPart', function() {
			relationData.resultPart().toString().should.eql('count(distinct product) as productsCount');
		});
	});
});
