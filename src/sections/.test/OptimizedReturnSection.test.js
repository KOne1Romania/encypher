"use strict";

var ReturnSection = require('../OptimizedReturnSection');

var relToOneDescriptor = {
	cardinality: 'one', type: 'RELATES_TO', related: { label: 'Other' }
};
var relToManyDescriptor = {
	type: 'HAS', related: { label: 'Other', alias: 'child' }
};

module.exports = function() {
	test('contains only id when nothing provided', function() {
		new ReturnSection().toString().should.eql([
			'RETURN {',
				'id: id($self)',
			'} as $self'
		].join(' '));
	});
	test('fields only', function() {
		new ReturnSection({ fields: ['name'] }).toString().should.eql([
			'RETURN {',
				'id: id($self),',
				'name: $self.`name`',
			'} as $self'
		].join(' '));
	});
	test('one relation - fetch node', function() {
		new ReturnSection({	fetchDescriptors: [{
			relationDescriptor: relToOneDescriptor
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'WITH $self, other',
			'RETURN {',
				'id: id($self),',
				'other: other',
			'} as $self'
		].join(' '));
	});
	test('one relation - fetch id', function() {
		new ReturnSection({ fetchDescriptors: [{
			relationDescriptor: relToOneDescriptor,
			fetchOptions: { retrieve: 'id' }
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'WITH $self, id(other) as otherId',
			'RETURN {',
				'id: id($self),',
				'otherId: otherId',
			'} as $self'
		].join(' '));
	});
	test('to many relation - fetch count', function() {
		new ReturnSection({ fetchDescriptors: [{
			relationDescriptor: relToManyDescriptor,
			fetchOptions: { aggregate: 'count' }
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
			'WITH $self, count(distinct child) as childrenCount',
			'RETURN {',
				'id: id($self),',
				'childrenCount: childrenCount',
			'} as $self'
		].join(' '));
	});
	test('multiple relations', function() {
		new ReturnSection({
			fetchDescriptors: [
				{ relationDescriptor: relToManyDescriptor },
				{ relationDescriptor: relToOneDescriptor, fetchOptions: { retrieve: 'id' } }
			]
		}).toString().should.eql([
			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
			'WITH $self, collect(distinct child) as children',
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'WITH $self, children, id(other) as otherId',
			'RETURN {',
				'id: id($self),',
				'children: children,',
				'otherId: otherId',
			'} as $self'
		].join(' '));
	});
};
