"use strict";

var ReturnSection = require('../ReturnSection');

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
		new ReturnSection({ fields: ['name', 'coverage'] }).toString().should.eql([
			'RETURN {',
				'id: id($self),',
				'name: $self.name,',
				'coverage: $self.coverage',
			'} as $self'
		].join(' '));
	});
	test('one relation - fetch node', function() {
		new ReturnSection({	fetchDescriptors: [{
			relationDescriptor: relToOneDescriptor
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'RETURN {',
				'id: id($self),',
				'other: other',
			'} as $self'
		].join(' '));
	});
	test('one relation - fetch embedded', function() {
		new ReturnSection({ fetchDescriptors: [{
			relationDescriptor: relToOneDescriptor,
			fetchOptions: { retrieve: ['name'] }
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'RETURN {',
				'id: id($self),',
				'other: { id: id(other), name: other.name }',
			'} as $self'
		].join(' '));
	});
	test('to many relation - fetch count', function() {
		new ReturnSection({ fetchDescriptors: [{
			relationDescriptor: relToManyDescriptor,
			fetchOptions: { aggregate: 'count' }
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
			'RETURN {',
				'id: id($self),',
				'childrenCount: count(distinct child)',
			'} as $self'
		].join(' '));
	});
	test('to many relation - fetch ids', function() {
		new ReturnSection({ fetchDescriptors: [{
			relationDescriptor: relToManyDescriptor,
			fetchOptions: { retrieve: 'id' }
		}] }).toString().should.eql([
			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
			'RETURN {',
				'id: id($self),',
				'childIds: collect(distinct id(child))',
			'} as $self'
		].join(' '));
	});
};
