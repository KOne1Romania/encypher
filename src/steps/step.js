'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var emptyContext = require('../cypher/cypherContext'),
    emptyCypher = require('../cypher/CypherObject').EMPTY

var Step = stampit()
	.state({
		transformers: []
	})
	.methods({
		update: function(updateMethodName) {
			return this.updateWith(_.spread(_.method)(arguments))
		},

		updateWith: function(updateFunction) {
			return this._composeTransformer(function updateWithFn(cypherState) {
				return {
					context: updateFunction(cypherState.context),
					cypher: cypherState.cypher
				}
			})
		},

		store: function() {
			return this.storeUsing(_.spread(_.method)(arguments))
		},

		storeUsing: function(builderFunction) {
			return this._composeTransformer(function storeUsingFn(cypherState) {
				var builtCypher = builderFunction(cypherState.context)
				return {
					context: cypherState.context,
					cypher: cypherState.cypher.merge(builtCypher)
				}
			})
		},

		run: function() {
			var composedTransformer = _.spread(_.flow)(this.transformers)
			var finalCypherState = composedTransformer({
				context: emptyContext,
				cypher: emptyCypher
			})
			return finalCypherState.cypher
		},

		compose: function(otherStep) {
			return Step({
				transformers: this.transformers.concat(otherStep.transformers)
			})
		},

		_composeTransformer: function(otherTransformer) {
			return Step({
				transformers: this.transformers.concat(otherTransformer)
			})
		}
	})

module.exports = Step()
