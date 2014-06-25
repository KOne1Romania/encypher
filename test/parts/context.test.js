"use strict";

require('chai').should();

var Context = require('../../src/parts/context');

suite('Context', function() {
	var $c = Context.ensureContext;

	test('simple', function() {
		$c({ self: 'competitor' }).toString().should.eql('competitor');
	});
	test('default self', function() {
		$c().toString().should.eql('$self');
	});
	test('with self and child', function() {
		$c({ self: 'competitor', child: 'market' }).toString()
			.should.equal('competitor_market')
	});
	test('with child and default self', function() {
		$c({ child: 'market' }).toString().should.equal('market')
	});
});
