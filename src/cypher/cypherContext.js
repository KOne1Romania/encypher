'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var stamps           = require('../util/stamps'),
    Forwarder        = stamps.Forwarder,
    Cloner           = stamps.Cloner,
    Ensure           = stamps.Ensure,
    RelationArc      = require('../chain/RelationArc'),
    CypherObject     = require('./CypherObject'),
    ResultMaker      = require('../result/ResultMaker'),
    subset           = require('../subset'),
    order            = require('../order'),
    makeCondition    = require('../condition'),
    EMPTY_CHAIN      = require('../chain/Chain').EMPTY,
    EMPTY_RESULT_SET = require('../result/resultSet')

var CypherContext = stampit()
	.state({
		chain: null,
		resultSet: null,
		relation: null
	})
	.compose(Forwarder.extend({
		chain: ['addNode', 'bind']
	}))
	.compose(Forwarder({
		chain: [
			'buildResetCypher'
		]
	}))
	.compose(Ensure({
		relation: RelationArc
	}))
	.methods({
		addRelation: function(relationArc) {
			return this.extend({
				relation: relationArc
			})
		},

		reset: function() {
			return this.extend({
				chain: this.chain.backToMain(),
				resultSet: this.resultSet.clear()
			})
		},

		fetch: function(resultOptions) {
			return this.extend({
				chain: this.chain.backToMain(),
				resultSet: this.resultSet.add(resultOptions, this.chain)
			})
		},

		resolveResults: function() {
			return this.extend({
				resultSet: this.resultSet.resolve()
			})
		},

		buildInstantiateCypher: function(action, data) {
			return this.chain.getInstantiateNodeCypher(data).prepend(action.toUpperCase())
		},

		buildRelationCypher: function(action) {
			return this.chain.getRelationCypher(this.relation).prepend(action.toUpperCase())
		},

		buildWithCypher: function() {
			return CypherObject.fromString(this).prepend('WITH')
		},

		buildWhereCypher: function(conditionOptions) {
			var conditionCypher = makeCondition(conditionOptions)(this.chain)
			return conditionCypher.prepend('WHERE')
		},

		buildExpandedReturnCypher: function(fields) {
			var expandedResult = this.resultSet.expand(this.chain, fields)
			return CypherObject.fromString(expandedResult).prepend('RETURN')
		},

		buildSubsetCypher: function(subsetOptions) {
			return subset(subsetOptions).toCypher()
		},

		buildOrderCypher: function(orderParts) {
			return order(orderParts)(this.chain).prepend('ORDER BY')
		},

		buildReturnCypher: function(resultOptions) {
			var result = ResultMaker(resultOptions)(this.chain)
			return CypherObject.fromString(result).prepend('RETURN')
		},

		buildSetNodeCypher: function(data) {
			return this.chain.getNodeAttributionCypher(data).prepend('SET')
		},

		buildLabelRelatedCypher: function(action, label) {
			return this.chain.getLabelRelatedCypher(label).prepend(action.toUpperCase())
		},

		buildDeleteNodeCypher: function() {
			return CypherObject.fromString(this).prepend('DELETE')
		},

		buildDeleteRelationCypher: function() {
			return this.relation.toAliasCypher().prepend('DELETE')
		},

		toString: function() {
			return [this.chain, this.resultSet].join(', ').replace(/,\s$/, '')
		},

		getStamp: function() {
			return CypherContext
		}
	})
	.compose(Cloner)
	.enclose(function() {
		this.chain = this.chain || EMPTY_CHAIN
		this.resultSet = this.resultSet || EMPTY_RESULT_SET
	})


module.exports = CypherContext()
