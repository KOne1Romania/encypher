'use strict'

var _ = require('lodash')

var CypherObject = require('../cypher/CypherObject'),
    step         = require('./step')

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

exports.CreateRelation = makeNewRelationStep('create')
exports.MergeRelation = makeNewRelationStep('merge')

exports.MatchRelation = makeInstantiateRelationStep('match')
exports.OptionalMatchRelation = makeInstantiateRelationStep('optional match')

exports.Where = function WhereStep(conditionOptions) {
	return step.store('buildWhereCypher', conditionOptions)
}

exports.SetNode = function SetNodeStep(data) {
	return step.store('buildSetNodeCypher', data)
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

exports.Subset = function SubsetStep(subsetOptions) {
	return step.store('buildSubsetCypher', subsetOptions)
}

exports.Order = function OrderStep(orderSteps) {
	return step.store('buildOrderCypher', orderSteps)
}

function makeNewRelationStep(action) {
	return function(relationArc) {
		return step.store('buildNewRelationCypher', action, relationArc)
	}
}

function makeInstantiateRelationStep(action) {
	return function _InstantiateRelationStep(relationArc, node) {
		return step
			.update('addNode', node)
			.store('buildNewRelationCypher', action, relationArc)
			.update('bind')
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
