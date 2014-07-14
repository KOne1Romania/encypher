'use strict';

require('chai').should();

module.exports = function() {
	suite('descriptor', require('./FetchDescriptor.test.js'));
	suite('fetchOptions', require('./FetchOptions.test.js'));
};
