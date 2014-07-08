"use strict";

require('chai').should();

var ReturnSection = require('../ReturnSection');
var EntityDescriptor = require('../../descriptors/EntityDescriptor');

var fieldsOnlyDef = {
	fields: ['name', 'coverage']
};
var relToOneDef = {rels: [
	{ card: 'one', type: 'RELATES_TO', label: 'Other' }
]};
var relToManyDef = {rels: [
	{ type: 'HAS', label: 'Other', alias: 'child' }
]};


suite('ReturnSection', function() {
	test('contains only id when nothing provided', function() {
		var emptyEntityDescriptor = new EntityDescriptor({});
		new ReturnSection(emptyEntityDescriptor).toString().should.eql([
			'RETURN {',
				'id: id($self)',
			'} as $self'
		].join(' '));
	});
	test('fields only', function() {
		var fieldsOnlyEntityDesc = new EntityDescriptor(fieldsOnlyDef);
		new ReturnSection(fieldsOnlyEntityDesc).toString().should.eql([
			'RETURN {',
				'id: id($self),',
				'name: $self.name,',
				'coverage: $self.coverage',
			'} as $self'
		].join(' '));
	});
//	test('one relation - fetch id', function() {
//		var fetchIdDescriptor = { other: { fetch: '$id' } };
//		var oneRelationEntityDesc = new EntityDescriptor(relToOneDef);
//		new ReturnSection(oneRelationEntityDesc, fetchIdDescriptor).toString().should.eql([
//			'OPTIONAL MATCH $self-[:RELATES_TO]->(other:Other)',
//			'RETURN {',
//				'id: id($self),',
//				'otherId: id(other)',
//			'} as $self'
//		].join(' '));
//	});
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
