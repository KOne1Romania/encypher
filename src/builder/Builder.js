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
		whereId: function(id) {
			return this.where({ op: 'eq', value: id })
		},

		whereIdIn: function(ids) {
			return this.where({ op: 'in', value: ids })
		},

		toString: function() {
			return this.toCypher().toString()
		},

		valueOf: function() {
			return this.toCypher().valueOf()
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
		'match', 'optionalMatch', 'create', 'merge',
		'matchRelation', 'optionalMatchRelation',
		'where',
		'createRelation', 'mergeRelation',
		'return', 'returnExpanded', 'fetch', 'reset',
		'subset', 'order',
		'setNode', 'setLabel', 'removeLabel',
		'delete', 'deleteRelation'
	]))
	.enclose(function() {
		this.step = this.step || steps.EMPTY
	})

Builder.base = Builder()

Builder.compose = function composeBuilders() {
	var builders = _.flatten(_.toArray(arguments))
	return builders.reduce(_composeTwo)
}

function _composeTwo(firstBuilder, secondBuilder) {
	return firstBuilder.addStep(secondBuilder.step)
}

module.exports = Builder
