'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Cloner        = require('../util/stamps').Cloner,
    Forwarder     = require('../util/stamps').Forwarder,
    ResultMaker   = require('../result/ResultMaker'),
    CypherObject  = require('../cypher/CypherObject'),
    DataContainer = require('./data/DataContainer')

var ChainCommon = stampit()
	.methods({
		bind: function() {
			return this.extend({ node: this.node.bind() })
		},

		backToMain: function() {
			return this.main
		},

		getInstantiateNodeCypher: function(data) {
			return DataContainer({ data: data, chain: this }).toCypher()
		},

		getNodeAttributionCypher: function(data) {
			return DataContainer({ data: data, chain: this}).toAttributionCypher()
		}
	})
	.compose(Cloner)
	.compose(Forwarder({
		node: [
			'toString',
			'toStringWithData'
		]
	}))

module.exports = ChainCommon
