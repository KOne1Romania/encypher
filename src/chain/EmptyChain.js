'use strict'

var stampit = require('stampit')

var MainChain = require('./MainChain')

var EmptyChain = stampit()
	.methods({
		addNode: function(node) {
			return MainChain({
				node: node
			})
		},
		toString: function() {
			return ''
		}
	})

module.exports = EmptyChain
