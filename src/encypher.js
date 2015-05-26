'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Node         = require('./node/Node'),
    CypherObject = require('./cypher/CypherObject'),
    Ensure       = require('./util/stamps').Ensure

var Encypher = stampit()
	.state({
		node: {},
		cypherObject: {}
	})
	.methods({
		match: function(node) {
			node = Node(node)
			return this.extend({
				node: node.bind(),
				cypherObject: this.cypherObject.append(node.buildMatchCypher())
			})
		},

		continue: function() {
			return this.extend({
				cypherObject: this.cypherObject.append(this.node.buildWithCypher())
			})
		},

		return: function() {
			return this.extend({
				cypherObject: this.cypherObject.append(this.node.buildReturnCypher())
			})
		},

		extend: function(newState) {
			return Encypher(_.merge(this, newState))
		},

		build: function() {
			return this.cypherObject
		}
	})
	.compose(Ensure({
		cypherObject: CypherObject
	}))

module.exports = Encypher
