'use strict'

var UnboundNode = require('./UnboundNode'),
    BoundNode   = require('./BoundNode')

var Node = function(state) {
	return state.label != null
		? UnboundNode(state)
		: BoundNode(state)
}

module.exports = Node
