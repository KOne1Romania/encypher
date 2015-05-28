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
			return this.compose(steps.Match(label))
		},

		return: function() {
			return this.compose(steps.Return()).build()
		},

		continue: function() {
			return this.compose(steps.Continue())
		},

		whereId: function(id) {
			return this.compose(steps.WhereId(id))
		},

		build: function() {
			return this.step.run()
		},

		compose: function(step) {
			return Builder.of(this.step.compose(step))
		}
	})

Builder.of = function(step) {
	return Builder({ step: step })
}

Builder.base = Builder.of(steps.EMPTY)

module.exports = Builder
