'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Chain  = require('../chain/Chain'),
    steps   = require('../steps')

var Builder = stampit()
	.state({
		step: {}
	})
	.methods({
		match: function(label) {
			return this.addStep(steps.Match(label))
		},

		return: function() {
			return this.addStep(steps.Return())
		},

		continue: function() {
			return this.addStep(steps.Continue())
		},

		whereId: function(id) {
			return this.addStep(steps.WhereId(id))
		},

		toString: function() {
			return this.toCypher().toString()
		},

		toCypher: function() {
			return this.step.run()
		},

		addStep: function(step) {
			return Builder.of(this.step.compose(step))
		},

		compose: function(otherBuilder) {
			return this.addStep(otherBuilder.step)
		}
	})

Builder.of = function(step) {
	return Builder({ step: step })
}

Builder.base = Builder.of(steps.EMPTY)

module.exports = Builder
