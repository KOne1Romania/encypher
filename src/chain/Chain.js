'use strict'

var stampit = require('stampit')

var Chain = stampit()
	.state({
		first: {},
		current: {}
	})
	.methods({
		addNode: function(newNode) {
			return Chain({
				first: this.first,
				current: this.current.addNode(newNode)
			})
		}
	})

Chain.ofNode = function(node) {
	return Chain({ node: node })
}

module.exports = Chain
