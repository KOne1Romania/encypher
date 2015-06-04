'use strict'

var _ = require('lodash')

var UnboundResult = require('./UnboundResult'),
    BoundResult   = require('./BoundResult')

module.exports = function Result(state) {
	state = state || {}
	if (state.value == null) {
		return BoundResult(_.pick(state, 'key'))
	}
	return UnboundResult(_.pick(state, ['key', 'value']))
}
