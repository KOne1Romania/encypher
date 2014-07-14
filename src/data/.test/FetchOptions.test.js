'use strict';

var FetchOptions = require('../FetchOptions');
var buildFetchOptions = FetchOptions.buildFetchOptions;

module.exports = function() {
	suite('defaults', function() {
		suite('.aggregate', function() {
			test('is collect for `many` cardinality', function() {
				new FetchOptions({}, 'many').aggregate.should.eql('collect');
			});
			test('is identity when none provided and one cardinality', function() {
				new FetchOptions({}, 'one').aggregate.should.eql('identity');
			});
			test('is count when provided', function() {
				new FetchOptions({ aggregate: 'count' }).aggregate.should.eql('count');
			});
		});
		test('assumes default cardinality to be `many`', function() {
			new FetchOptions({}).aggregate.should.eql('collect');
		});
		test('.fetch is identity', function() {
			new FetchOptions().fetch.should.eql('node');
		});
	});
	suite('#resultPart', function() {
		test('context only', function() {
			new FetchOptions().resultPart().toString().should.eql('collect(distinct $self) as $selves')
		});
		test('with id', function() {
			new FetchOptions({ fetch: 'id' }, 'one').resultPart().toString()
				.should.eql('id($self) as id');
		});
		test('with fields', function() {
			var fetchOptions = new FetchOptions({ fetch: ['name'] }, 'one');
			fetchOptions.resultPart().toString()
				.should.eql('{ id: id($self), name: $self.name } as $self');
		});
		test('count', function() {
			new FetchOptions({ aggregate: 'count' }).resultPart('market').toString()
				.should.eql('count(distinct market) as marketsCount');
		});
		test('collect', function() {
			new FetchOptions({}, 'many').resultPart().toString()
				.should.eql('collect(distinct $self) as $selves');
		});
	});
};
