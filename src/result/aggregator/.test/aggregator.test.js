'use strict'

require('chai').should()

var CountAggregator   = require('../CountAggregator'),
    CollectAggregator = require('../CollectAggregator')

suite('result/aggregator', function() {
	var result = { key: 'post', value: 'post' }
	test('CountAggregator', function() {
		var countAggregatorResult = CountAggregator(result)
		countAggregatorResult.toString().should.equal('count(post) as postsCount')
	})

	test('CollectAggregator', function() {
		var collectAggregatorResult = CollectAggregator(result)
		collectAggregatorResult.toString().should.equal('collect(post) as posts')
	})
})
