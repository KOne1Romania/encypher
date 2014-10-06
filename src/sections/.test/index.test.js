'use strict';

require('chai').should();

suite('sections', function() {
	suite('order', require('./OrderSection.test.js'));
	suite('subset', require('./SubsetSection.test.js'));
	suite('return', require('./OptimizedReturnSection.test.js'));
	suite('filter', require('./OptimizedFilterSection.test.js'));
});
