"use strict";

var RelationDescriptor = require('../../src/descriptors/RelationDescriptor');

suite('RelationDescriptor', function() {

	suite('alias', function() {
		suite('is derived from label when not specified', function() {
			test('when singular', function() {
				var descriptor = new RelationDescriptor({
					type    : 'COVERS',
					label   : 'Market',
					singular: true
				});
				descriptor.alias.should.equal('market');
			});
			test('when plural', function() {
				var descriptor = new RelationDescriptor({
					type : 'COVERS',
					label: 'Market'
				});
				descriptor.alias.should.equal('markets');
			});
		});
	});

});
