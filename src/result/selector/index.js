'use strict'

var _ = require('lodash')

var NodeSelector      = require('./NodeSelector'),
    FieldOrIdSelector = require('./FieldOrIdSelector'),
    ExpandSelector    = require('./ExpandSelector')

function selector(selected) {
	if (_.isString(selected)) {
		return FieldOrIdSelector(selected)
	}
	if (_.isPlainObject(selected)) {
		return ExpandSelector(selected)
	}
	return NodeSelector
}

module.exports = selector
