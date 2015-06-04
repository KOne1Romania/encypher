'use strict'

var _ = require('lodash')

function selector(selected) {
	if (!_.isString(selected)) {
		return require('./NodeSelector')
	}
	if (selected.toLowerCase() === 'id') {
		return require('./IdSelector')
	}
	return require('./FieldSelector')(selected)
}

module.exports = selector
