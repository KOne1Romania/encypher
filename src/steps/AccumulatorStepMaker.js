'use strict'

var _ = require('lodash')

var CypherObject = require('../cypher/CypherObject')

function AccumulatorStepMaker(updatersMap) {
	return makeTransformer(defaultUpdaters(updatersMap))
}

function defaultUpdaters(updatersMap) {
	return _.defaults({}, updatersMap, {
		before: _.identity,
		cypherBuilder: _.constant({ string: '' }),
		after: _.identity
	})
}

function makeTransformer(updaters) {
	return function(encypherState) {
		var cypherObject = encypherState.cypherObject,
		    accumulator  = updaters.before(encypherState.accumulator)
		return _.assign({}, encypherState, {
			accumulator: updaters.after(accumulator),
			cypherObject: CypherObject(cypherObject).merge(updaters.cypherBuilder(accumulator))
		})
	}
}


module.exports = AccumulatorStepMaker
