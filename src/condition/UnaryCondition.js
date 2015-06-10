'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var ResultMaker        = require('../result/ResultMaker'),
    CypherObject       = require('../cypher/CypherObject'),
    getTextForOperator = require('./getTextForOperator')

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

module.exports = UnaryCondition
