'use strict';

require('chai').should();

suite('templates', function() {
	suite('simple', require('../simple/.test'));
	suite('optimized', require('../optimized/.test'));
});
