'use strict';

require('chai').should();

var $templates = require('..');

suite('templates', function() {
	suite('findAll', testsForTemplate('findAll'));
	suite('count', testsForTemplate('count'));
});

function testsForTemplate(templateName) {
	return function() {
		var fixtures = require('./fixtures/' + templateName);
		fixtures.filter(function(fixture) {
			return !fixture.skip;
		}).forEach(function(fixture) {
			suite(fixture.name, function() {
				var template, queryObject;
				setup(function() {
					template = $templates[templateName](fixture.template);
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
}

