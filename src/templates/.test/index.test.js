'use strict';

require('chai').should();

suite('templates', function() {
	suite('findAll', require('./FindAllTemplate.test'));
	suite('count', require('./CountTemplate.test'));
});
