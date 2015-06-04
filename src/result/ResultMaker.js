'use strict'

var _ = require('lodash')

var selectors   = require('./selector'),
    aggregators = require('./aggregator')

function ResultMaker(opts) {
	opts = _.defaults({}, opts, {
		aggregate: '',
		select: 'node'
	})
	var selector   = selectors[opts.select] || selectors.Node,
	    aggregator = aggregators[opts.aggregate] || _.identity

	return function(chain) {
		return aggregator(selector(chain))
	}
}

module.exports = ResultMaker
