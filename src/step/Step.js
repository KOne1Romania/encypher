'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../cypher/CypherObject')

var Step = stampit()
	.state({
		transformer: _.identity
	})
	.methods({
		runOn: function(chain) {
			return this.transformer({
				chain: chain,
				cypherObject: CypherObject()
			}).cypherObject
		},

		compose: function(otherStep) {
			return Step({
				transformer: _.compose(otherStep.transformer, this.transformer)
			})
		}
	})

Step.of = function(updatersMap) {
	_.defaults(updatersMap, {
		chainTransformer: _.identity,
		cypherBuilder: _.constant({ string: '' })
	})
	var transformer = makeTransformer(updatersMap.chainTransformer, updatersMap.cypherBuilder)
	return Step({ transformer: transformer })
}

function makeTransformer(chainTransformer, cypherBuilder) {
	return function(encypherState) {
		var cypherObject = encypherState.cypherObject,
		    chain        = encypherState.chain
		return {
			chain: chainTransformer(chain),
			cypherObject: CypherObject(cypherObject).merge(cypherBuilder(chain))
		}
	}
}


module.exports = Step
