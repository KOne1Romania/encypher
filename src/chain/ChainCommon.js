'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Cloner       = require('../util/stamps').Cloner,
    Forwarder    = require('../util/stamps').Forwarder,
    ResultMaker  = require('../result/ResultMaker'),
    CypherObject = require('../cypher/CypherObject')

var ChainCommon = stampit()
	.methods({
		bind: function() {
			return this.extend({ node: this.node.bind() })
		},

		backToMain: function() {
			return this.main
		}
	})
	.compose(Cloner)
	.compose(Forwarder({
		node: [
			'toString',
			'buildInstantiateCypher'
		]
	}))

module.exports = ChainCommon
