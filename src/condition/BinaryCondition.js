'use strict'

var _ = require('lodash')

var ResultMaker        = require('../result/ResultMaker'),
    CypherObject       = require('../cypher/CypherObject'),
    getTextForOperator = require('./getTextForOperator')

function BinaryCondition(conditionOptions) {
	conditionOptions = _.defaults({}, conditionOptions, {
		field: 'id',
		op: 'eq',
		value: null
	})
	var fieldResultMaker = ResultMaker({ select: conditionOptions.field }),
	    textForOperator  = getTextForOperator(conditionOptions.op)

	return function BinaryConditionMaker(chain) {
		var result = fieldResultMaker(chain)
		return CypherObject({
			string: result.toValueFollowedBy(textForOperator, '{' + result.key + '}'),
			params: _.set({}, result.key, conditionOptions.value)
		})
	}
}

module.exports = BinaryCondition
