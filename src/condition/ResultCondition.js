'use strict'

var stampit = require('stampit')

var ResultMaker  = require('../result/ResultMaker'),
    operators = require('./operators')

var ResultCondition = stampit()
	.state({
		field: 'id'
	})
	.methods({
		applyOn: function(chain) {
			var fieldResult = this.fieldResultMaker(chain)
			return this.operator.applyOn(fieldResult, this.value)
		}
	})
	.enclose(function() {
		this.operator = operators(this.op)
		this.fieldResultMaker = ResultMaker({ select: this.field })
	})

module.exports = ResultCondition
