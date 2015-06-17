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

exports.SetLabel = makeLabelRelatedStep('set')
exports.RemoveLabel = makeLabelRelatedStep('remove')

exports.Delete = function DeleteStep() {
	return step
		.store('buildDeleteNodeCypher')
		.compose(exports.Reset())
}

exports.DeleteRelation = function DeleteRelationStep() {
	return step
		.store('buildDeleteRelationCypher')
		.compose(exports.Reset())
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
		return step
			.update('addRelation', relationArc)
			.store('buildRelationCypher', action)
			.compose(exports.Reset())
	}
}

function makeInstantiateRelationStep(action) {
	return function _InstantiateRelationStep(relationArc, node) {
		return step
			.update('addNode', node)
			.update('addRelation', relationArc)
			.store('buildRelationCypher', action)
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

function makeLabelRelatedStep(action) {
	return function _LabelRelatedStep(label) {
		return step.store('buildLabelRelatedCypher', action, label)
	}
}

exports.EMPTY = step
