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
		match: function(label, data) {
			return this.reset().addStep(steps.Match(label, data))
		},

		toString: function() {
			return this.toCypher().toString()
		},

		toCypher: function() {
			return steps.run(this.step)
		},

		addStep: function(step) {
			return Builder.of(steps.compose(step, this.step))
		},

		compose: function(otherBuilder) {
			return this.addStep(otherBuilder.step)
		}
	})
	.compose(Stepper([
		'return', 'reset', 'whereId', 'create', 'merge', 'createRelation', 'mergeRelation',
		'matchRelation', 'returnExpanded', 'fetch'
	]))

Builder.of = function(step) {
	return Builder({ step: step })
}

Builder.base = Builder.of(steps.EMPTY)

module.exports = Builder
