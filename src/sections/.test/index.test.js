'use strict';

require('chai').should();

suite('sections', function() {
	suite('return', require('./ReturnSection.test'));
	suite('filter', require('./FilterSection.test'));
});
