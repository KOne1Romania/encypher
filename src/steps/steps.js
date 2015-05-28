'use strict'

var _ = require('lodash')

var Step = require('./Step')

exports.Match = function MatchStep(label) {
	return Step.make({
		before: _.method('addNode', { label: label }),
		cypherBuilder: _.method('buildMatchCypher'),
		after: _.method('bind')
	})
}

exports.Return = function ReturnStep() {
	return Step.make({
		cypherBuilder: _.method('buildReturnCypher')
	})
}

exports.Continue = function ContinueStep() {
	return Step.make({
		cypherBuilder: _.method('buildWithCypher'),
		before: _.method('backToMain')
	})
}

exports.WhereId = function WhereIdStep(id) {
	return Step.make({
		cypherBuilder: _.method('buildWhereIdCypher', id)
	})
}

exports.EMPTY = Step()