'use strict';

require('chai').should();

suite('data', function() {
	suite('fetch', require('./FetchData.test'));
	suite('relation', require('./RelationData.test'));
});
