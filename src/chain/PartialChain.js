'use strict'

var stampit = require('stampit')

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

		buildCreateRelationCypher: function(relationArc) {
			return this._buildRelationCypher(relationArc).prepend('CREATE')
		},

		_buildRelationCypher: function(relationArc) {
			return RelationArc(relationArc).toCypher(this.previous, this.node)
		}
	})
	.compose(ChainCommon)
	.compose(Ensure({
		node: Node
	}))

module.exports = PartialChain
