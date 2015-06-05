'use strict'

var _ = require('lodash')

var IdSelector    = require('./IdSelector'),
    FieldSelector = require('./FieldSelector')

function FieldOrIdSelector(fieldName) {
	if (!_.isString(fieldName)) {
		throw Error('Field name must be a string!')
	}
	if (fieldName.toLowerCase() === 'id') {
		return IdSelector
	}
	return FieldSelector(fieldName)
}

module.exports = FieldOrIdSelector
