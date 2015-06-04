'use strict'

var _ = require('lodash')

function aggregator(aggregateType) {
	if (!_.isString(aggregateType)) {
		return _.identity
	}
	aggregateType = aggregateType.toLowerCase()
	if (aggregateType === 'count') {
		return require('./CountAggregator')
	}
	if (aggregateType === 'collect') {
		return require('./CollectAggregator')
	}
	return _.identity
}

module.exports = aggregator
