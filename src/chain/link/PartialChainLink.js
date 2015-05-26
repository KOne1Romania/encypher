'use strict'

var stampit = require('stampit')

var ChainLinkCommon = require('./ChainLinkCommon'),
    Node            = require('../../node/Node'),
    Ensure          = require('../../util/stamps').Ensure


var PartialChainLink = stampit()
	.state({
		node: {},
		previous: {}
	})
	.methods({
		addNode: function(newNode) {
			return PartialChainLink({
				node: Node(newNode).inContext(this.node),
				previous: this
			})
		},

		getStamp: function() {
			return PartialChainLink
		}
	})
	.compose(ChainLinkCommon)
	.compose(Ensure({
		node: Node
	}))

module.exports = PartialChainLink
