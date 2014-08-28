'use strict';

var WithClause = require('../WithClause');
var $resultParts = require('../../parts/result');

module.exports = function() {
	test('one result part as arg', function() {
		new WithClause($resultParts.node().of('competitor')).toString().should.eql('WITH competitor');
	});
	test('result part defaults to $self', function() {
		new WithClause().toString().should.eql('WITH $self');
	});
	test('distinct', function() {
		var withDistinctClause = new WithClause($resultParts.node(), true);
		withDistinctClause.toString().should.eql('WITH distinct $self');
	});
	test('an array of match parts as arg', function() {
		var matchClause = new WithClause([
			$resultParts.node(),
			$resultParts.id().of('competitor')
		]);
		matchClause.toString().should.eql('WITH $self, id(competitor) as competitorId');
	});
};
