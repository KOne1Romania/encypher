'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Cloner = require('../../util/stamps').Cloner

var ChainLinkCommon = stampit()
	.methods({
		toString: function() {
			return this.node.toString()
		},

		bind: function() {
			return this.extend({ node: this.node.bind() })
		}
	})
	.compose(Cloner)

module.exports = ChainLinkCommon
