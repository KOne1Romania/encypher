'use strict'

var stampit = require('stampit')

var Node         = require('../node/Node'),
    PartialChain = require('./PartialChain'),
    ChainCommon  = require('./ChainCommon'),
    CypherObject = require('../cypher/CypherObject')

var MainChain = stampit()
	.state({
		node: {}
	})
	.methods({
		addNode: function(newNode) {
			return PartialChain({
				node: newNode,
				main: this,
				previous: this
			})
		},

		getStamp: function() {
			return MainChain
		},

		buildWithCypher: function() {
			return CypherObject.EMPTY
		},

		buildCreateRelationCypher: function() {
			throw Error('Cannot create relation with only one node')
		}
	})
	.compose(ChainCommon)
	.enclose(function() {
		this.node = Node(this.node).withAlias('$main')
		this.main = this
	})

module.exports = MainChain
