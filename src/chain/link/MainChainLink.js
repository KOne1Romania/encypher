'use strict'

var stampit = require('stampit')

var Node             = require('../../node/Node'),
    ChainLinkCommon  = require('./ChainLinkCommon'),
    PartialChainLink = require('./PartialChainLink')

var MainChainLink = stampit()
	.state({
		node: {}
	})
	.methods({
		addNode: function(newNode) {
			return PartialChainLink({
				node: newNode,
				previous: this
			})
		},

		getStamp: function() {
			return MainChainLink
		}
	})
	.compose(ChainLinkCommon)
	.enclose(function() {
		this.node = Node(this.node).withAlias('$main')
	})

MainChainLink.fromNode = function(node) {
	return MainChainLink({ node: node })
}

module.exports = MainChainLink
