'use strict';

var FetchData = require('../FetchData');
var buildFetchOptions = FetchData.buildFetchOptions;

module.exports = function() {
	suite('buildFetchOptions', function() {
		suite('.aggregate', function() {
			test('is collect when none provided and many cardinality', function() {
				buildFetchOptions({}, 'many').aggregate.should.eql('collect');
			});
			test('assumes default cardinality to be `many`', function() {
				buildFetchOptions({}).aggregate.should.eql('collect');
			});
			test('is identity when none provided and one cardinality', function() {
				buildFetchOptions({}, 'one').aggregate.should.eql('identity');
			});
			test('is count when provided', function() {
				buildFetchOptions({ aggregate: 'count' }).aggregate.should.eql('count');
			});
		});
		test('.fetch is identity when not provided', function() {
			buildFetchOptions({}).fetch.should.eql('node');
		});
	});
	suite('#resultPart', function() {
		test('context only', function() {
			new FetchData().resultPart().toString().should.eql('collect(distinct $self) as $selves')
		});
		test('with id', function() {
			new FetchData({ fetch: 'id' }, 'one').resultPart().toString()
				.should.eql('id($self) as id');
		});
		test('with fields', function() {
			var fetchData = new FetchData({ fetch: ['name'] }, 'one');
			fetchData.resultPart().toString()
				.should.eql('{ id: id($self), name: $self.name } as $self');
		});
		test('count', function() {
			new FetchData({ aggregate: 'count' }).resultPart('market').toString()
				.should.eql('count(distinct market) as marketsCount');
		});
		test('collect', function() {
			new FetchData({}, 'many').resultPart().toString()
				.should.eql('collect(distinct $self) as $selves');
		});
	});
};
