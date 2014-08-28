'use strict';

var OptimizedFilterSection = require('../OptimizedFilterSection');

module.exports = function() {
	suite('no conditions', function() {
		test('match one node', function() {
			new OptimizedFilterSection({ filterDescriptors: [
				{ label: 'Competitor' }
			] }).toString().should.eql('MATCH ($self:Competitor) WITH distinct $self');
		});
		test('node and relation', function() {
			new OptimizedFilterSection({ filterDescriptors: [
				{ label: 'Competitor' },
				{ relation: { type: 'COVERS', related: { label: 'Market'} } }
			] }).toString().should.eql([
					'MATCH ($self:Competitor)',
					'WITH distinct $self',
					'MATCH $self-[:COVERS]->(market:Market)',
					'WITH distinct $self'
				].join(' '));
		});
	});
	suite('with conditions', function() {
		test('for self', function() {
			new OptimizedFilterSection({ filterDescriptors: [
				{
					label     : 'Competitor',
					conditions: [
						{ value: 15 }
					]
				}
			] }).toString().should.eql([
					'MATCH ($self:Competitor)',
					'WHERE id($self) = 15',
					'WITH distinct $self'
				].join(' '));
		});
		test('multiple conditions', function() {
			new OptimizedFilterSection({ filterDescriptors: [
				{
					label     : 'Competitor',
					conditions: [
						{ value: 15 },
						{ field: 'age', op: 'gt', value: 18}
					]
				}
			] }).toString().should.eql([
					'MATCH ($self:Competitor)',
					'WHERE id($self) = 15 AND $self.`age` > 18',
					'WITH distinct $self'
				].join(' '));
		});
		test('for self and relation', function() {
			new OptimizedFilterSection({ filterDescriptors: [
				{
					label     : 'Competitor',
					conditions: [
						{ value: 15 }
					]
				},
				{
					relation  : { type: 'COVERS', related: { label: 'Market' }},
					conditions: [
						{ field: 'name', value: 'Chicago' }
					]
				}
			] }).toString().should.eql([
					'MATCH ($self:Competitor)',
					'WHERE id($self) = 15',
					'WITH distinct $self',
					'MATCH $self-[:COVERS]->(market:Market)',
					'WHERE market.`name` = "Chicago"',
					'WITH distinct $self'
				].join(' '));
		});
	});
};
