'use strict';

require('chai').should();

var fixtures = require('./fixtures/findAll'),
    FindAllTemplate = require('../FindAllTemplate');

module.exports = function() {
	fixtures.filter(function(fixture) {
		return !fixture.skip;
	}).forEach(function(fixture) {
		suite(fixture.name, function() {
			var template, queryObject;
			setup(function() {
				template = new FindAllTemplate(fixture.template);
				queryObject = template.queryObject();
			});
			test('#toString', function() {
				template.toString().should.eql(fixture.generatedString);
			});
			test('queryString', function() {
				queryObject.string.should.eql(fixture.queryString);
			});
			test('queryParams', function() {
				queryObject.params.should.eql(fixture.queryParams);
			});
		});
	});
};
