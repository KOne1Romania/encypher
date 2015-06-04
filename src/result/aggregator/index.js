'use strict'

var _ = require('lodash')

var Result = require('../Result')

var DEFAULT_AGGREGATOR = Result

function aggregator(aggregateType) {
	if (!_.isString(aggregateType)) {
		return DEFAULT_AGGREGATOR
	}
	aggregateType = aggregateType.toLowerCase()
	if (aggregateType === 'count') {
		return require('./CountAggregator')
	}
	if (aggregateType === 'collect') {
		return require('./CollectAggregator')
	}
	return DEFAULT_AGGREGATOR
}

module.exports = aggregator
