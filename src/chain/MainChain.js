'use strict'

var stampit = require('stampit')

var Node         = require('./node/Node'),
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

		buildResetCypher: function() {
			return CypherObject.EMPTY
		},

		getRelationCypher: function() {
			throw Error('Cannot get relation with only one node')
		},

		toStringWithSuffix: function(suffix) {
			return suffix
		}
	})
	.compose(ChainCommon)
	.enclose(function() {
		this.node = Node(this.node).withAlias('$main')
		this.main = this
	})

module.exports = MainChain
