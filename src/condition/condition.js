'use strict'

var ResultCondition = require('./ResultCondition'),
    NestedCondition = require('./NestedCondition'),
    Ensure          = require('../util/stamps').Ensure

NestedCondition = NestedCondition.compose(Ensure({
	conditions: [Condition]
}))

function Condition(options) {
	return options.conditions == null
		? ResultCondition(options)
		: NestedCondition(options)
}

module.exports = function makeCondition(options) {
	var condition = Condition(options)
	return function(chain) {
		return condition.applyOn(chain)
	}
}
