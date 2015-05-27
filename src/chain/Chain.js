'use strict'

var stampit = require('stampit')

var Cloner        = require('../util/stamps').Cloner,
    MainChainLink = require('./link/MainChainLink')

var Chain = stampit()
	.state({
		main: null,
		current: null
	})
	.methods({
		toString: function() {
			return this.current.toString()
		},

		addNode: function(node) {
			return this.extend({ current: this.current.addNode(node) })
		},

		backToMain: function() {
			return this.extend({ current: this.main.bind() })
		},

		getStamp: function() {
			return Chain
		},

		bind: function() {
			return this.extend({ current: this.current.bind() })
		},

		buildMatchCypher: function() {
			return this.current.node.buildMatchCypher()
		},

		buildReturnCypher: function() {
			return this.current.node.buildReturnCypher()
		},

		buildWithCypher: function() {
			return this.current.node.buildWithCypher()
		},

		buildWhereIdCypher: function(id) {
			return this.current.node.buildWhereIdCypher(id)
		}
	})
	.compose(Cloner)

Chain.fromNodeLabeled = function(label) {
	var mainChainLink = MainChainLink.fromNode({ label: label })
	return Chain({
		main: mainChainLink,
		current: mainChainLink
	})
}

module.exports = Chain
