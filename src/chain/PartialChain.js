'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Node         = require('./node/Node'),
    ChainCommon  = require('./ChainCommon'),
    RelationArc  = require('./RelationArc'),
    CypherObject = require('../cypher/CypherObject'),
    stamps       = require('../util/stamps'),
    Ensure       = stamps.Ensure,
    Forwarder    = stamps.Forwarder

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
			return CypherObject.fromString(this.main).prepend('WITH distinct')
		},

		getRelationCypher: function(relationArc) {
			return RelationArc(relationArc).toCypher(this.previous, this.node)
		}
	})
	.compose(Forwarder({
		node: ['putStringInContext']
	}))
	.compose(ChainCommon)
	.compose(Ensure({
		node: Node
	}))

module.exports = PartialChain
