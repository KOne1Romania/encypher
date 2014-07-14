'use strict';

require('chai').should();

suite('data', function() {
	suite('fetch', require('./FetchOptions.test.js'));
	suite('relation', require('./RelationData.test'));
});
