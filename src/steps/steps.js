'use strict'

var _ = require('lodash')

var CypherObject = require('../cypher/CypherObject'),
    step         = require('./step')

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

exports.CreateRelation = makeNewRelationStep('create')
exports.MergeRelation = makeNewRelationStep('merge')

exports.Where = function WhereStep(conditionOptions) {
	return step.store('buildWhereCypher', conditionOptions)
}

exports.MatchRelation = function MatchRelationStep(relationArc, node) {
	return step
		.update('addNode', node)
		.store('buildNewRelationCypher', 'match', relationArc)
		.update('bind')
}

exports.Return = function ReturnStep(resultOptions) {
	return step
		.update('reset')
		.store('buildReturnCypher', resultOptions)
}

exports.ReturnExpanded = function ReturnExpandedStep(fields) {
	return step.store('buildExpandedReturnCypher', fields)
}

exports.Fetch = function(resultOpts) {
	return step
		.update('fetch', resultOpts)
		.store('buildWithCypher')
		.update('resolveResults')
}

exports.Reset = function ResetStep() {
	return step
		.store('buildResetCypher')
		.update('reset')
}

function makeNewRelationStep(action) {
	return function(relationArc) {
		return step.store('buildNewRelationCypher', action, relationArc)
	}
}

function makeInstantiateStep(action) {
	return function _InstantiateStep(node, data) {
		return step
			.update('addNode', node)
			.store('buildInstantiateCypher', action, data)
			.update('bind')
	}

}

exports.EMPTY = step
