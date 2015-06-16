'use strict'

var ResultCondition  = require('./ResultCondition'),
    NestedCondition  = require('./NestedCondition'),
    NegatedCondition = require('./NegatedCondition'),
    Ensure           = require('../util/stamps').Ensure

NestedCondition = NestedCondition.compose(Ensure({
	conditions: [Condition]
}))

NegatedCondition = NegatedCondition.compose(Ensure({
	not: Condition
}))

function Condition(options) {
	if (options.conditions != null) {
		return NestedCondition(options)
	}
	if (options.not != null) {
		return NegatedCondition(options)
	}
	return ResultCondition(options)
}

module.exports = function makeCondition(options) {
	var condition = Condition(options)
	return function(chain) {
		return condition.applyOn(chain)
	}
}
