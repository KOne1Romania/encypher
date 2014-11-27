"use strict";

var _ = require('lodash-node');

var ReturnSection = require('../ReturnSection');

var relToOneDescriptor = {
	cardinality: 'one', type: 'RELATES_TO', related: { label: 'Other' }
};
var relToManyDescriptor = {
	type: 'HAS', related: { label: 'Other', alias: 'child' }
};

module.exports = function() {
	test('contains only id when nothing provided', function() {
		new ReturnSection().toString().should.eql('RETURN { id: id($self) }');
	});
	test('fields only', function() {
		new ReturnSection({ fields: ['name'] }).toString()
			.should.eql('RETURN { id: id($self), name: $self.`name` }');
	});
	test('one relation - fetch node', function() {
		new ReturnSection({
			relationDescriptors: [_.merge({}, relToOneDescriptor, { fetch: { retrieve: 'node' } })]
		}).toString().should.eql([
				'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
				'WITH $self, other',
				'RETURN { id: id($self), other: other }'
			].join(' '));
	});
	test('one relation - fetch id', function() {
		new ReturnSection({
			relationDescriptors: [_.merge({}, relToOneDescriptor, { fetch: { retrieve: 'id' } })]
		}).toString().should.eql([
				'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
				'WITH $self, id(other) as otherId',
				'RETURN { id: id($self), otherId: otherId }'
			].join(' '));
	});
	test('to-many relation - fetch count', function() {
		new ReturnSection({
			relationDescriptors: [_.merge({}, relToManyDescriptor, { fetch: { aggregate: 'count' } })]
		}).toString().should.eql([
				'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
				'WITH $self, count(distinct child) as childrenCount',
				'RETURN { id: id($self), childrenCount: childrenCount }',
			].join(' '));
	});
	test('multiple relations', function() {
		new ReturnSection({
			relationDescriptors: [
				relToManyDescriptor,
				relToOneDescriptor
			]
		}).toString().should.eql([
				'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
				'WITH $self, collect(distinct id(child)) as childIds',
				'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
				'WITH $self, childIds, id(other) as otherId',
				'RETURN { id: id($self), childIds: childIds, otherId: otherId }'
			].join(' '));
	});
};
