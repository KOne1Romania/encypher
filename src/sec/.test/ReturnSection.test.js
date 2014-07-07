"use strict";

require('chai').should();

var ReturnSection = require('../ReturnSection');
var EntityDescriptor = require('../../descriptors/EntityDescriptor');

suite('ReturnSection', function() {
	test('fields only', function() {
		var fieldsOnlyDesc = new EntityDescriptor(require('./fixtures/fields-only.def'));
		new ReturnSection(fieldsOnlyDesc).toString().should.eql([
			'RETURN {',
				'id: id($self),',
				'name: $self.name,',
				'coverage: $self.coverage',
			'} as $self'
		].join(' '));
	});
});
