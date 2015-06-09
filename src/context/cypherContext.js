'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var stamps           = require('../util/stamps'),
    Forwarder        = stamps.Forwarder,
    Cloner           = stamps.Cloner,
    CypherObject     = require('../cypher/CypherObject'),
    EMPTY_CHAIN      = require('../chain/Chain').EMPTY,
    EMPTY_RESULT_SET = require('../result/resultSet')

var CypherContext = stampit()
	.state({
		chain: null,
		resultSet: null
	})
	.compose(Forwarder.extend({
		chain: ['addNode', 'bind']
	}))
	.compose(Forwarder({
		chain: [
			'buildNewRelationCypher',
			'buildMatchCypher',
			'buildWhereIdCypher',
			'buildInstantiateCypher',
			'buildReturnCypher'
		]
	}))
	.methods({
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

		buildWithCypher: function() {
			return CypherObject.fromString(this).prepend('WITH')
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
