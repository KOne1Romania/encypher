'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../cypher/CypherObject'),
    EMPTY_CHAIN  = require('../chain/Chain').EMPTY

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

		run: function() {
			return this.runOn(EMPTY_CHAIN)
		},

		compose: function(otherStep) {
			return Step({
				transformer: _.compose(otherStep.transformer, this.transformer)
			})
		}
	})

Step.make = function(updatersMap) {
	_.defaults(updatersMap, {
		before: _.identity,
		cypherBuilder: _.constant({ string: '' }),
		after: _.identity
	})
	var transformer = makeTransformer(updatersMap)
	return Step({ transformer: transformer })
}

function makeTransformer(updaters) {
	return function(encypherState) {
		var cypherObject = encypherState.cypherObject,
		    chain        = updaters.before(encypherState.chain)
		return {
			chain: updaters.after(chain),
			cypherObject: CypherObject(cypherObject).merge(updaters.cypherBuilder(chain))
		}
	}
}


module.exports = Step
