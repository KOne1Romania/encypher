'use strict'

var _ = require('lodash')

var ActualSubsetPart = require('./ActualSubsetPart'),
    emptySubsetPart  = require('./emptySubsetPart')

function SubsetPart(state) {
	var validState = _.pick(state, ['name', 'value'])
	return (state.value)
		? ActualSubsetPart(validState)
		: emptySubsetPart
}

module.exports = SubsetPart
