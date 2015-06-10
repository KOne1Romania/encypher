'use strict'

var _ = require('lodash')

var ResultMaker        = require('../result/ResultMaker'),
    CypherObject       = require('../cypher/CypherObject'),
    getTextForOperator = require('./getTextForOperator'),
    getFieldDecorator  = require('./getFieldDecorator')

function BinaryCondition(conditionOptions) {
	conditionOptions = _.defaults({}, conditionOptions, {
		field: 'id',
		op: 'eq',
		value: null
	})
	var fieldResultMaker = ResultMaker({ select: conditionOptions.field }),
	    textForOperator  = getTextForOperator(conditionOptions.op),
	    fieldDecorator   = getFieldDecorator(conditionOptions.op)

	return function BinaryConditionMaker(chain) {
		var result = fieldResultMaker(chain),
		    fieldName = fieldDecorator(result.key)
		return CypherObject({
			string: result.toValueFollowedBy(textForOperator, '{' + fieldName + '}'),
			params: _.set({}, fieldName, conditionOptions.value)
		})
	}
}

module.exports = BinaryCondition
