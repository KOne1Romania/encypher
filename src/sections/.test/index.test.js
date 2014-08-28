'use strict';

require('chai').should();

suite('sections', function() {
	suite('common', require('../common/.test'));
	suite('simple', require('../simple/.test'));
	suite('optimized', require('../optimized/.test'));
});
