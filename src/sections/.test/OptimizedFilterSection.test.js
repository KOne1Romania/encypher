'use strict';

var OptimizedFilterSection = require('../OptimizedFilterSection');

module.exports = function() {
	suite('no conditions', function() {
		test('match one node', function() {
			var expectedString = 'MATCH ($self:Competitor) WITH distinct $self';
			checkFilter([
				{ label: 'Competitor' }
			], {
				queryString : expectedString,
				queryParams : {},
				resultString: expectedString
			});
		});
		test('node and relation', function() {
			var expectedString = [
				'MATCH ($self:Competitor)',
				'WITH distinct $self',
				'MATCH $self-[:COVERS]->(market:Market)',
				'WITH distinct $self'
			].join(' ');
			checkFilter([
				{ label: 'Competitor' },
				{ relation: { type: 'COVERS', related: { label: 'Market'} } }
			], {
				queryString : expectedString,
				queryParams : {},
				resultString: expectedString
			});
		});
	});
	suite('with conditions', function() {
		test('for self', function() {
			var expectedString = 'MATCH ($self:Competitor) WHERE id($self) = 15 WITH distinct $self',
			    expectedQString = 'MATCH ($self:Competitor) WHERE id($self) = {id} WITH distinct $self',
			    expectedQParams = { id: 15 };
			checkFilter([
				{ label: 'Competitor', conditions: [
					{ value: 15 }
				] }
			], {
				queryString : expectedQString,
				queryParams : expectedQParams,
				resultString: expectedString
			});
		});
		test('multiple conditions', function() {
			var expectedString = [
				    'MATCH ($self:Competitor)',
				    'WHERE (id($self) = 15 AND $self.`age` > 18)',
				    'WITH distinct $self'
			    ].join(' '),
			    expectedQString = [
				    'MATCH ($self:Competitor)',
				    'WHERE (id($self) = {id} AND $self.`age` > {minAge})',
				    'WITH distinct $self'
			    ].join(' '),
			    expectedQParams = { id: 15, minAge: 18 };
			checkFilter([
				{ label: 'Competitor', conditions: [
					{ value: 15 },
					{ field: 'age', op: 'gt', value: 18}
				] }
			], {
				queryString : expectedQString,
				queryParams : expectedQParams,
				resultString: expectedString
			});
		});
		test('for self and relation', function() {
			var expectedString = [
				    'MATCH ($self:Competitor)',
				    'WHERE id($self) = 15',
				    'WITH distinct $self',
				    'MATCH $self-[:COVERS]->(market:Market)',
				    'WHERE market.`name` = "Chicago"',
				    'WITH distinct $self'
			    ].join(' '),
			    expectedQString = [
				    'MATCH ($self:Competitor)',
				    'WHERE id($self) = {id}',
				    'WITH distinct $self',
				    'MATCH $self-[:COVERS]->(market:Market)',
				    'WHERE market.`name` = {marketName}',
				    'WITH distinct $self'
			    ].join(' '),
			    expectedQParams = { id: 15, marketName: 'Chicago' };
			checkFilter([
				{ label: 'Competitor', conditions: [
					{ value: 15 }
				] },
				{ relation: { type: 'COVERS', related: { label: 'Market' }}, conditions: [
					{ field: 'name', value: 'Chicago' }
				] }
			], {
				queryString : expectedQString,
				queryParams : expectedQParams,
				resultString: expectedString
			});
		});
	});
};

function checkFilter(descriptors, expected) {
	var filterSection = new OptimizedFilterSection({ filterDescriptors: descriptors }),
	    queryObject = filterSection.queryObject();
	if (expected.resultString) {
		filterSection.toString().should.eql(expected.resultString);
	}
	if (expected.queryString) {
		queryObject.string.should.eql(expected.queryString);
	}
	if (expected.queryParams) {
		queryObject.params.should.eql(expected.queryParams);
	}
}
