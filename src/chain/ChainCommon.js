'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Cloner = require('../util/stamps').Cloner,
    Forwarder = require('../util/stamps').Forwarder

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
			'buildMatchCypher',
			'buildReturnCypher',
			'buildWhereIdCypher',
			'buildWithCypher',
			'buildInstantiateCypher'
		]
	}))

module.exports = ChainCommon
