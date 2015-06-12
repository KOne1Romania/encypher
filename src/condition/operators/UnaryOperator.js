'use strict'

var stampit = require('stampit')

var CypherObject     = require('../../cypher/CypherObject'),
    OperatorDefaults = require('./OperatorDefaults')

var UnaryOperator = stampit()
	.compose(OperatorDefaults)
	.state({
		name: 'isNull'
	})
	.methods({
		applyOn: function(result) {
			return CypherObject.fromString(result.toUnaryConditionString(this.symbol))
		}
	})

module.exports = UnaryOperator
