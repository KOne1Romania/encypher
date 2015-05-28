'use strict'

var _ = require('lodash')

var Step = require('./Step')

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

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

function makeInstantiateStep(action) {
	return function _InstantiateStep(label, data) {
		return Step.make({
			before: _.method('addNode', { label: label }),
			cypherBuilder: _.method('buildInstantiateCypher', action, data),
			after: _.method('bind')
		})
	}

}

exports.EMPTY = Step()