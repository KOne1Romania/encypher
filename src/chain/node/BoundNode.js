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
			throw Error('Cannot bind node `' + this.alias + '` - already bound')
		},

		withAlias: function(alias) {
			return BoundNode({ alias: alias })
		},

		toStringWithData: function() {
			throw Error('Cannot get string with data for bound node: ' + this.alias)
		},

		toString: function() {
			return this.alias
		},

		putStringInContext: function(string) {
			return this.alias + _.capitalize(string)
		}
	})

module.exports = BoundNode
