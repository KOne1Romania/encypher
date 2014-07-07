"use strict";

var RelationDescriptor = require('../../src/descriptors/RelationDescriptor');

suite('RelationDescriptor', function() {
	suite('defaults', function() {
		var descriptor = new RelationDescriptor({
			type    : 'COVERS',
			label   : 'Market'
		});
		test('direction is outbound', function() {
			descriptor.dir.should.eql('outbound');
		});
		test('cardinality is many', function() {
			descriptor.card.should.eql('many');
		});
		test('alias depends on label', function() {
			descriptor.alias.should.equal('market');
		});
	});
});
