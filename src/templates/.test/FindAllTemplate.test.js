'use strict';

require('chai').should();

var fixtures = require('../../../fixtures/templates/findAll'),
    FindAllTemplate = require('../FindAllTemplate');

suite('FindAllTemplate', function() {
	fixtures.filter(function(fixture) {
		return !fixture.skip;
	}).forEach(function(fixture) {
		test(fixture.name, function() {
			new FindAllTemplate(fixture.template).toString().should.eql(fixture.queryString);
		});
	});
});
