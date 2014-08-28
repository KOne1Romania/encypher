'use strict';

var FilterSection = require('../FilterSection');

module.exports = function() {
	suite('no conditions', function() {
		test('match one node', function() {
			new FilterSection({ filterDescriptors: [
				{ label: 'Competitor' }
			] }).toString().should.eql('MATCH ($self:Competitor)');
		});
		test('node and relation', function() {
			new FilterSection({ filterDescriptors: [
				{ label: 'Competitor' },
				{ relation: { type: 'COVERS', related: { label: 'Market'} } }
			] }).toString().should.eql([
					'MATCH',
					'($self:Competitor),',
					'$self-[:COVERS]->(market:Market)'
				].join(' '));
		});
	});
	suite('with conditions', function() {
		test('for self', function() {
			new FilterSection({ filterDescriptors: [
				{
					label     : 'Competitor',
					conditions: [
						{ value: 15 }
					]
				}
			] }).toString().should.eql([
					'MATCH',
					'($self:Competitor)',
					'WHERE',
					'id($self) = 15'
				].join(' '));
		});
		test('for self and relation', function() {
			new FilterSection({ filterDescriptors: [
				{
					label     : 'Competitor',
					conditions: [
						{ value: 15 }
					]
				},
				{
					relation  : { type: 'COVERS', related: { label: 'Market' }},
					conditions: [
						{ field: 'name', value: 'Chicago' },
						{ field: 'coverage', op: 'ne', value: 'local' }
					]
				}
			] }).toString().should.eql([
					'MATCH',
					'($self:Competitor),',
					'$self-[:COVERS]->(market:Market)',
					'WHERE',
					'id($self) = 15',
					'AND market.`name` = "Chicago"',
					'AND market.`coverage` <> "local"'
				].join(' '));
		});
		test('for self and nested relations', function() {
			new FilterSection({ filterDescriptors: [
				{
					label: 'Competitor'
				},
				{
					relation: {
						type     : 'SOLD_BY',
						direction: 'inbound',
						related  : { label: 'CompetitorProduct', alias: 'product' }
					}
				},
				{
					context   : 'product',
					relation  : {
						type   : 'IS_IN',
						related: { label: 'CompetitorCategory', alias: 'category' }
					},
					conditions: [
						{ op: 'in', value: [12, 13] }
					]
				}
			] }).toString().should.eql([
					'MATCH',
					'($self:Competitor),',
					'$self<-[:SOLD_BY]-(product:CompetitorProduct),',
					'product-[:IS_IN]->(product_category:CompetitorCategory)',
					'WHERE',
					'id(product_category) IN [12, 13]'
				].join(' '));
		});
	});
};
