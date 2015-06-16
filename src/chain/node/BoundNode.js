'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../../cypher/CypherObject')

var BoundNode = stampit()
	.state({
		alias: ''
	})
	.methods({
		bind: function() {
			throw Error('Cannot bind node `' + this.alias +'` - already bound')
		},

		withAlias: function(alias) {
			return BoundNode({ alias: alias })
		},

		toString: function() {
			return this.alias
		}
	})

module.exports = BoundNode
