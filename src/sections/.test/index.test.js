'use strict';

require('chai').should();

suite('sections', function() {
	suite('order', require('./OrderSection.test.js'));
	suite('subset', require('./SubsetSection.test.js'));
	suite('return', require('./ReturnSection.test.js'));
	suite('returnCount', require('./ReturnCountSection.test.js'));
	suite('filter', require('./FilterSection.test.js'));
});
