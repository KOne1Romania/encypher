'use strict'

var stampit = require('stampit')

var Node        = require('../node/Node'),
    ChainCommon = require('./ChainCommon'),
    Ensure      = require('../util/stamps').Ensure

var PartialChain = stampit()
	.state({
		node: {},
		main: null
	})
	.methods({
		addNode: function(newNode) {
			return PartialChain({
				node: Node(newNode).inContext(this.node),
				main: this.main
			})
		},

		getStamp: function() {
			return PartialChain
		}
	})
	.compose(ChainCommon)
	.compose(Ensure({
		node: Node
	}))

module.exports = PartialChain
