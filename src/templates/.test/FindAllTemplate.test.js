'use strict';

require('chai').should();

var fixture = require('../../../fixtures/templates/findAll'),
    FindAllTemplate = require('../FindAllTemplate');

suite('FindAllTemplate', function() {
	test('works', function() {
		new FindAllTemplate(fixture.template).toString().should.eql(fixture.queryString);
	});
});
