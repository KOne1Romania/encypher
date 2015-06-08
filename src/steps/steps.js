'use strict'

var _ = require('lodash')

var StepMaker            = require('./StepMaker'),
    AccumulatorStepMaker = require('./AccumulatorStepMaker'),
    CypherObject         = require('../cypher/CypherObject'),
    EMPTY_CHAIN          = require('../chain/Chain').EMPTY,
    baseAccumulator      = require('../result/resultAccumulator')

exports.run = function(step) {
	return step({
		chain: EMPTY_CHAIN,
		accumulator: baseAccumulator,
		cypherObject: CypherObject()
	}).cypherObject
}

exports.compose = _.compose

exports.Match = makeInstantiateStep('match')
exports.Create = makeInstantiateStep('create')
exports.Merge = makeInstantiateStep('merge')

exports.CreateRelation = makeNewRelationStep('create')
exports.MergeRelation = makeNewRelationStep('merge')

exports.MatchRelation = function MatchRelationStep(relationArc, node) {
	var chainStep = StepMaker({
		before: _.method('addNode', node),
		cypherBuilder: _.method('buildNewRelationCypher', 'match', relationArc),
		after: _.method('bind')
	})
	var accumulatorStep = AccumulatorStepMaker({
		after: _.method('addNode', node)
	})
	return _.compose(accumulatorStep, chainStep)
}

exports.Return = function ReturnStep(resultOptions) {
	return StepMaker({
		before: _.method('backToMain'),
		cypherBuilder: _.method('buildReturnCypher', resultOptions)
	})
}

exports.ReturnExpanded = function ReturnExpandedStep(fields) {
	return AccumulatorStepMaker({
		cypherBuilder: _.method('buildReturnCypher', fields)
	})
}

exports.Fetch = function(resultOpts) {
	return _.compose(
		StepMaker({
			after: _.method('backToMain')
		}),
		AccumulatorStepMaker({
			before: _.method('addResult', resultOpts),
			cypherBuilder: _.method('buildWithCypher')
		})
	)
}

exports.Reset = function ResetStep() {
	return StepMaker({
		cypherBuilder: _.method('buildWithCypher'),
		after: _.method('backToMain')
	})
}

exports.WhereId = function WhereIdStep(id) {
	return StepMaker({
		cypherBuilder: _.method('buildWhereIdCypher', id)
	})
}

function makeNewRelationStep(action) {
	return function(relationArc) {
		return StepMaker({
			cypherBuilder: _.method('buildNewRelationCypher', action, relationArc)
		})
	}
}

function makeInstantiateStep(action) {
	return function _InstantiateStep(node, data) {
		var chainStep = StepMaker({
			before: _.method('addNode', node),
			cypherBuilder: _.method('buildInstantiateCypher', action, data),
			after: _.method('bind')
		})
		var accumulatorStep = AccumulatorStepMaker({
			after: _.method('addNode', node)
		})
		return _.compose(accumulatorStep, chainStep)
	}

}

exports.EMPTY = _.identity
