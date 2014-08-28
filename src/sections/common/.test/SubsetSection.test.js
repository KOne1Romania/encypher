'use strict';

var SubsetSection = require('../SubsetSection');

module.exports = function() {
	test('all provided', function() {
		new SubsetSection({ skip: 10, limit: 10 }).toString().should.eql('SKIP 10 LIMIT 10');
	});
	test('only SKIP', function() {
		new SubsetSection({ skip: 10 }).toString().should.eql('SKIP 10');
	});
	test('only LIMIT', function() {
		new SubsetSection({ limit: 10 }).toString().should.eql('LIMIT 10');
	});
	test('none', function() {
		new SubsetSection().toString().should.eql('');
	});
};
