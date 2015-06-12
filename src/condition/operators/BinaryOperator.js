'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../../cypher/CypherObject'),
    OperatorDefaults = require('./OperatorDefaults')

var BinaryOperator = stampit()
	.compose(OperatorDefaults)
	.state({
		name: 'eq',
		symbol: '',
		fieldCustomizer: _.identity,
		valueCustomizer: _.identity
	})
	.methods({
		applyOn: function(result, value) {
			var customResult = result.customizeKey(this.fieldCustomizer),
			    customizedValue = this.valueCustomizer(value)
			return CypherObject({
				string: customResult.toBinaryConditionString(this.symbol),
				params: customResult.buildConditionParams(customizedValue)
			})
		}
	})

module.exports = BinaryOperator
