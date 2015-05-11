'use strict';

require('chai').should();

suite('sections', function() {
	suite('subset', require('./SubsetSection.test.js'));
	suite('return', require('./ReturnSection.test.js'));
	suite('returnCount', require('./ReturnCountSection.test.js'));
	suite('filter', require('./FilterSection.test.js'));
});
