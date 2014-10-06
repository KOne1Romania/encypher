'use strict';

var SubsetSection = require('../SubsetSection');

module.exports = function() {
	test('all provided', function() {
		checkSubset({ skip: 20, limit: 10 }, {
			string: 'SKIP {skip} LIMIT {limit}',
			params: { skip: 20, limit: 10}
		});
	});
	test('only SKIP', function() {
		checkSubset({ skip: 20 }, {
			string: 'SKIP {skip}',
			params: { skip: 20 }
		});
	});
	test('only LIMIT', function() {
		checkSubset({ limit: 10 }, {
			string: 'LIMIT {limit}',
			params: { limit: 10 }
		});
	});
	test('none', function() {
		checkSubset({}, {
			string: '',
			params: {}
		});
	});
};

function checkSubset(subsetDef, expected) {
	var queryObject = new SubsetSection(subsetDef).queryObject();
	queryObject.string.should.eql(expected.string);
	queryObject.params.should.eql(expected.params);
}
