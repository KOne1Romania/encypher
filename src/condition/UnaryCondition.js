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
	var fieldResultMaker = ResultMaker({ select: conditionOptions.field })

	return function UnaryConditionMaker(chain) {
		var result = fieldResultMaker(chain)
		return CypherObject.fromString(result.toValueFollowedBy('IS NULL'))
	}
}

module.exports = UnaryCondition
