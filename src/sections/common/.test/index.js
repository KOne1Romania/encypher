'use strict';

require('chai').should();

module.exports = function() {
	suite('order', require('./OrderSection.test'));
	suite('subset', require('./SubsetSection.test'));
};
