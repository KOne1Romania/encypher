'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var NegatedCondition = stampit()
	.state({
		not: null
	})
	.methods({
		applyOn: function(chain) {
			var conditionToNegate = this.not
			return conditionToNegate.applyOn(chain).prepend('NOT')
		}
	})

module.exports = NegatedCondition
