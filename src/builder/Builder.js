'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Chain   = require('../chain/Chain'),
    Stepper = require('./Stepper'),
    steps   = require('../steps')

var Builder = stampit()
	.state({
		step: {}
	})
	.methods({
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
	.compose(Stepper([
		'match', 'return', 'continue', 'whereId', 'create', 'merge', 'createRelation'
	]))

Builder.of = function(step) {
	return Builder({ step: step })
}

Builder.base = Builder.of(steps.EMPTY)

module.exports = Builder
