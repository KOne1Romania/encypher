'use strict'

var inflection = require('inflection')

var Result = require('../Result')

function CountAggregator(result) {
	return Result({
		key: inflection.pluralize(result.key),
		value: 'collect(' + result.value + ')'
	})
}

module.exports = CountAggregator
