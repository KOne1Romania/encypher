'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var operators = require('./operators')

var NestedCondition = stampit()
	.state({
		conditions: [],
		op: 'and'
	})
	.methods({
		applyOn: function(chain) {
			var cypherObjects = this.conditions.map(_.method('applyOn', chain))
			return this.operator.applyOn(cypherObjects)
		}
	})
	.enclose(function() {
		this.operator = operators(this.op)
	})

module.exports = NestedCondition
