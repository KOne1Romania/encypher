'use strict'

var _ = require('lodash')

var selector   = require('./selector'),
    aggregator = require('./aggregator')

function ResultMaker(opts) {
	opts = opts || {}
	var actualSelector   = selector(opts.select),
	    actualAggregator = aggregator(opts.aggregate)

	return function(chain) {
		return actualAggregator(actualSelector(chain))
	}
}


module.exports = ResultMaker
