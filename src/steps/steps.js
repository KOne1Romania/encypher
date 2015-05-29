'use strict'

var _ = require('lodash')

var Step = require('./Step')

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

exports.CreateRelation = makeNewRelationStep('create')
exports.MergeRelation = makeNewRelationStep('merge')

exports.MatchRelation = function MatchRelationStep(relationArc, node) {
	return Step.make({
		before: _.method('addNode', node),
		cypherBuilder: _.method('buildNewRelationCypher', 'match', relationArc),
		after: _.method('bind')
	})
}

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

function makeNewRelationStep(action) {
	return function(relationArc) {
		return Step.make({
			cypherBuilder: _.method('buildNewRelationCypher', action, relationArc)
		})
	}
}

function makeInstantiateStep(action) {
	return function _InstantiateStep(node, data) {
		return Step.make({
			before: _.method('addNode', node),
			cypherBuilder: _.method('buildInstantiateCypher', action, data),
			after: _.method('bind')
		})
	}

}

exports.EMPTY = Step()
