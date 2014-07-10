"use strict";

require('chai').should();

var ReturnSection = require('../ReturnSection');

var fieldsOnlyDef = {
	fields: ['name', 'coverage']
};
var relToOne = {
	cardinality: 'one', type: 'RELATES_TO', related: { label: 'Other' }
};
var relToManyDef = {rels: [
	{ type: 'HAS', label: 'Other', alias: 'child' }
]};


suite('ReturnSection', function() {
	test('contains only id when nothing provided', function() {
		new ReturnSection().toString().should.eql([
			'RETURN {',
				'id: id($self)',
			'} as $self'
		].join(' '));
	});
	test('fields only', function() {
		new ReturnSection(['name', 'coverage']).toString().should.eql([
			'RETURN {',
				'id: id($self),',
				'name: $self.name,',
				'coverage: $self.coverage',
			'} as $self'
		].join(' '));
	});
	test('one relation - fetch node', function() {
		new ReturnSection([], [ relToOne ]).toString().should.eql([
			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
			'RETURN {',
				'id: id($self),',
				'other: other',
			'} as $self'
		].join(' '));
	});
//	test('to many relation - fetch count', function() {
//		var fetchCountDescriptor = { child: { fetch: '$count' } };
//		var oneRelationEntityDesc = new EntityDescriptor(relToManyDef);
//		new ReturnSection(oneRelationEntityDesc, fetchCountDescriptor).toString().should.eql([
//			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
//			'RETURN {',
//				'id: id($self),',
//				'childrenCount: count(distinct child)',
//			'} as $self'
//		].join(' '));
//	});
//	test('to many relation - fetch ids', function() {
//		var fetchCountDescriptor = { child: { fetch: '$id' } };
//		var oneRelationEntityDesc = new EntityDescriptor(relToManyDef);
//		new ReturnSection(oneRelationEntityDesc, fetchCountDescriptor).toString().should.eql([
//			'OPTIONAL MATCH $self-[:HAS]->(child:Other)',
//			'RETURN {',
//				'id: id($self),',
//				'childIds: collect(distinct id(child))',
//			'} as $self'
//		].join(' '));
//	});
});
