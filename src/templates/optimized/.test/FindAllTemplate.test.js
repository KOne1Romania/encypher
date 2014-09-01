'use strict';

require('chai').should();

var fixtures = require('./fixtures/findAll'),
    FindAllTemplate = require('../FindAllTemplate');

module.exports = function() {
	fixtures.filter(function(fixture) {
		return !fixture.skip;
	}).forEach(function(fixture) {
		test(fixture.name, function() {
			new FindAllTemplate(fixture.template).toString().should.eql(fixture.queryString);
		});
	});
};
