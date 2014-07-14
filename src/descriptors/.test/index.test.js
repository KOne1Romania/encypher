'use strict';

require('chai').should();

suite('descriptors', function() {
	suite('node', require('./nodeDescriptor.test'));
	suite('relation', require('./RelationDescriptor.test'));
	suite('fetch', require('./fetch'));
});
