'use strict'

var _ = require('lodash')

var EmptyDataContainer  = require('./EmptyDataContainer'),
    NormalDataContainer = require('./NormalDataContainer')

function DataContainer(state) {
	if (state.data) {
		return NormalDataContainer(_.pick(state, ['data', 'chain']))
	}
	return EmptyDataContainer(_.pick(state, 'chain'))
}

module.exports = DataContainer
