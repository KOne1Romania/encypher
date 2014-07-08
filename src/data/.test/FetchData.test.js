'use strict';

require('chai').should();

var FetchData = require('../FetchData');
var buildFetchOptions = FetchData.buildFetchOptions;

suite('FetchData', function() {
	suite('buildFetchOptions', function() {
		suite('.aggregate', function() {
			test('is collect when none provided and many cardinality', function() {
				buildFetchOptions({}, 'many').aggregate.should.eql('collect');
			});
			test('is identity when none provided and one cardinality', function() {
				buildFetchOptions({}, 'one').aggregate.should.eql('identity');
			});
			test('is count when provided', function() {
				buildFetchOptions({ aggregate: 'count' }).aggregate.should.eql('count');
			});
		});
		test('.fetched is identity when not provided', function() {
			buildFetchOptions({}).fetched.should.eql('node');
		});
	});
	suite('#resultPart', function() {
		test('context only', function() {
			new FetchData('market').resultPart().toString().should.eql('market')
		});
		test('with id', function() {
			new FetchData('market', { fetched: 'id' }).resultPart().toString()
				.should.eql('id(market) as marketId');
		});
		test('with fields', function() {
			var fetchData = new FetchData('competitor', { fetched: ['name'] });
			fetchData.resultPart().toString()
				.should.eql('{ name: competitor.name } as competitor');
		});
		test('count', function() {
			new FetchData('market', { aggregate: 'count' }).resultPart().toString()
				.should.eql('count(distinct market) as marketsCount');
		});
		test('collect', function() {
			new FetchData('market', {}, 'many').resultPart().toString()
				.should.eql('collect(distinct market) as markets');
		});
	});
});
