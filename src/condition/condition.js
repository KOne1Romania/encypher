'use strict'

var ResultCondition = require('./ResultCondition')

module.exports = function makeCondition(options) {
	var condition = ResultCondition(options)
	return function(chain) {
		return condition.applyOn(chain)
	}
}
