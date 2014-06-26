"use strict";

require('chai').should();

var $c = require('..');

suite('context', function() {
	test('default', function() {
		assertForContext($c(), '$self', 'id', '$self');
	});
	test('inside context', function() {
		assertForContext($c().of('aa'), 'aa', 'aaId');
	});
	test('inside nested context', function() {
		assertForContext($c().of('bb').of('aa'), 'aa_bb', 'aaBbId');
	});
	test('with other reference', function() {
		assertForContext($c().as('aa'), 'aa', 'id');
	});
	test('with nested reference', function() {
		assertForContext($c().as('bb').as('aa'), 'aa_bb', 'id');
	});
	test('inside context with different reference', function() {
		assertForContext($c().of('bb').as('aa'), 'aa_bb', 'bbId');
	});
});

function assertForContext(context, value, aliasWith, alias) {
	context.value().should.eql(value);
	context.aliasWith('id').should.eql(aliasWith);
	if (alias) {
		context.alias().should.eql(alias);
	}
}
