'use strict'

require('chai').should()

var CountAggregator = require('../CountAggregator')

suite('aggregator', function() {
	var result = { key: 'post', value: 'post' }
	test('CountAggregator', function() {
		var countAggregatorResult = CountAggregator(result)
		countAggregatorResult.toString().should.equal('count(post) as postsCount')
	})
})
