'use strict'

var Result = require('../Result')

function FieldSelector(fieldName) {
	return function SpecificFieldSelector(chain) {
		return Result({
			key: chain.toStringWithSuffix(fieldName),
			value: [chain.toString(), fieldName].join('.')
		})
	}
}

module.exports = FieldSelector
