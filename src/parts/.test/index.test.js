'use strict';

require('chai').should();

suite('parts', function() {
	suite('match', require('../match/.test'));
	suite('result', require('../result/.test'));
	suite('order', require('./OrderPart.test'));
	suite('start', require('./StartPart.test'));
});
