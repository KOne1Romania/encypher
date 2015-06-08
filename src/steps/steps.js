'use strict'

var _ = require('lodash')

var StepMaker    = require('./StepMaker'),
    CypherObject = require('../cypher/CypherObject'),
    EMPTY_CHAIN  = require('../chain/Chain').EMPTY

exports.run = function(step) {
	return step({
		chain: EMPTY_CHAIN,
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
	return StepMaker({
		before: _.method('addNode', node),
		cypherBuilder: _.method('buildNewRelationCypher', 'match', relationArc),
		after: _.method('bind')
	})
}

exports.Return = function ReturnStep() {
	return StepMaker({
		before: _.method('backToMain'),
		cypherBuilder: _.method('buildReturnCypher')
	})
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
		return StepMaker({
			before: _.method('addNode', node),
			cypherBuilder: _.method('buildInstantiateCypher', action, data),
			after: _.method('bind')
		})
	}

}

exports.EMPTY = _.identity
