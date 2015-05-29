'use strict'

var stampit = require('stampit')

var MainChain = require('./MainChain'),
    CypherObject = require('../cypher/CypherObject')

var EmptyChain = stampit()
	.methods({
		addNode: function(node) {
			return MainChain({
				node: node
			})
		},

		backToMain: function() {
			return this
		},

		buildWithCypher: function() {
			return CypherObject.EMPTY
		},

		toString: function() {
			return ''
		}
	})

module.exports = EmptyChain
