'use strict'

var _ = require('lodash')

var UnboundNode = require('./UnboundNode'),
    BoundNode   = require('./BoundNode')

var Node = function(state) {
	if (_.isString(state)) {
		return UnboundNode({ label: state })
	}
	return state.label != null
		? UnboundNode(state)
		: BoundNode(state)
}

module.exports = Node
