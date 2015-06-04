'use strict'

require('chai').should()

var aggregator = require('..')

suite('result/aggregator', function() {
	var result = { key: 'post', value: 'post' }
	test('count', function() {
		var countAggregatorResult = aggregator('count')(result)
		countAggregatorResult.toString().should.equal('count(post) as postsCount')
	})

	test('collect', function() {
		var collectAggregatorResult = aggregator('collect')(result)
		collectAggregatorResult.toString().should.equal('collect(post) as posts')
	})

	test('does nothing if not defined', function() {
		var unknownAggregatorResult = aggregator('unknown')(result)
		unknownAggregatorResult.toString().should.equal('post as post')
	})
})
