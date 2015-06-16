'use strict'

var Result = require('../Result'),
    encode = require('../../util/encode')

function FieldSelector(fieldName) {
	return function SpecificFieldSelector(chain) {
		return Result({
			key: chain.putStringInContext(fieldName),
			value: [chain.toString(), encode.field(fieldName)].join('.')
		})
	}
}

module.exports = FieldSelector
