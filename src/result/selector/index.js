'use strict'

var _ = require('lodash')

var NodeSelector      = require('./NodeSelector'),
    FieldOrIdSelector = require('./FieldOrIdSelector')

function selector(selected) {
	if (_.isString(selected)) {
		return FieldOrIdSelector(selected)
	}
	return NodeSelector
}

module.exports = selector
