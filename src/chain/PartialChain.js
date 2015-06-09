'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Node        = require('../node/Node'),
    ChainCommon = require('./ChainCommon'),
    RelationArc = require('./RelationArc'),
    Ensure      = require('../util/stamps').Ensure

var PartialChain = stampit()
	.state({
		node: {},
		main: null,
		previous: null
	})
	.methods({
		addNode: function(newNode) {
			return PartialChain({
				node: Node(newNode).inContext(this.node),
				main: this.main,
				previous: this
			})
		},

		getStamp: function() {
			return PartialChain
		},

		buildResetCypher: function() {
			return this.main.node.buildWithCypher()
		},

		buildNewRelationCypher: function(action, relationArc) {
			return this._buildRelationCypher(relationArc).prepend(action.toUpperCase())
		},

		_buildRelationCypher: function(relationArc) {
			return RelationArc(relationArc).toCypher(this.previous, this.node)
		},

		toStringWithSuffix: function(suffix) {
			return this.toString() + _.capitalize(suffix)
		}
	})
	.compose(ChainCommon)
	.compose(Ensure({
		node: Node
	}))

module.exports = PartialChain
