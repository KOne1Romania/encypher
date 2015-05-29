'use strict'

var _ = require('lodash')

var Step = require('./Step')

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

exports.Return = function ReturnStep() {
	return Step.make({
		before: _.method('backToMain'),
		cypherBuilder: _.method('buildReturnCypher')
	})
}

exports.Reset = function ResetStep() {
	return Step.make({
		cypherBuilder: _.method('buildWithCypher'),
		after: _.method('backToMain')
	})
}

exports.WhereId = function WhereIdStep(id) {
	return Step.make({
		cypherBuilder: _.method('buildWhereIdCypher', id)
	})
}

exports.CreateRelation = function(relationArc) {
	return Step.make({
		cypherBuilder: _.method('buildCreateRelationCypher', relationArc)
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