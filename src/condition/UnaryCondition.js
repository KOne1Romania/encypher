'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var ResultMaker  = require('../result/ResultMaker'),
    CypherObject = require('../cypher/CypherObject')

function UnaryCondition(conditionOptions) {
	conditionOptions = _.defaults({}, conditionOptions, {
		op: 'isNull',
		field: ''
	})
	var fieldResultMaker = ResultMaker({ select: conditionOptions.field }),
	    textForOperator  = getTextForOperator(conditionOptions.op)

	return function UnaryConditionMaker(chain) {
		var result = fieldResultMaker(chain)
		return CypherObject.fromString(result.toValueFollowedBy(textForOperator))
	}
}

function getTextForOperator(operator) {
	return operatorsTextsMap[operator] || defaultOperatorText
}

var operatorsTextsMap = {
	isNull: 'IS NULL',
	isNotNull: 'IS NOT NULL'
}
var defaultOperatorText = operatorsTextsMap.isNull

module.exports = UnaryCondition
