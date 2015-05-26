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
			return this.extend({ current: this.main })
		},

		getStamp: function() {
			return Chain
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
