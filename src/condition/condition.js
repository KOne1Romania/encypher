'use strict'

var UnaryCondition  = require('./UnaryCondition'),
    BinaryCondition = require('./BinaryCondition')

function Condition(options) {
	if (options.value) {
		return BinaryCondition(options)
	}
	return UnaryCondition(options)
}

module.exports = function makeCondition(options) {
	var condition = Condition(options)
	return function(chain) {
		return condition.applyOn(chain)
	}
}
