'use strict'

var _ = require('lodash')

var CypherObject = require('../cypher/CypherObject')

function StepMaker(updatersMap) {
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
		    chain        = updaters.before(encypherState.chain)
		return _.assign({}, encypherState, {
			chain: updaters.after(chain),
			cypherObject: CypherObject(cypherObject).merge(updaters.cypherBuilder(chain))
		})
	}
}


module.exports = StepMaker
