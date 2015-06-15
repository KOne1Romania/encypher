'use strict'

var stampit = require('stampit')

var CypherObject     = require('../../cypher/CypherObject'),
    OperatorDefaults = require('./OperatorDefaults')

var JoinOperator = stampit()
	.compose(OperatorDefaults)
	.state({
		name: 'and'
	})
	.methods({
		applyOn: function(cypherObjects) {
			var spacedSymbol = ' ' + this.symbol + ' '
			return CypherObject.merge(cypherObjects, spacedSymbol).surround('(', ')')
		}
	})


module.exports = JoinOperator
