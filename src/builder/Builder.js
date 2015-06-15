'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Chain   = require('../chain/Chain'),
    Stepper = require('./Stepper'),
    steps   = require('../steps')

var Builder = stampit()
	.state({
		step: null
	})
	.methods({
		match: function(label, data) {
			return this.reset().addStep(steps.Match(label, data))
		},

		whereId: function(id) {
			return this.where({ op: 'eq', value: id })
		},

		toString: function() {
			return this.toCypher().toString()
		},

		toCypher: function() {
			return this.step.run()
		},

		addStep: function(step) {
			return Builder({ step: this.step.compose(step) })
		},

		compose: function(otherBuilder) {
			return this.addStep(otherBuilder.step)
		}
	})
	.compose(Stepper([
		'return', 'reset', 'create', 'merge', 'createRelation', 'mergeRelation',
		'matchRelation', 'optionalMatchRelation', 'returnExpanded', 'fetch', 'where',
		'subset'
	]))
	.enclose(function() {
		this.step = this.step || steps.EMPTY
	})

Builder.base = Builder()

module.exports = Builder
