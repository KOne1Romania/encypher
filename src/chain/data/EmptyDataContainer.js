'use strict'

var stampit = require('stampit')

var EMPTY_CHAIN  = require('../Chain').EMPTY,
    CypherObject = require('../../cypher/CypherObject')

var EmptyDataContainer = stampit()
	.state({
		chain: null
	})
	.methods({
		toCypher: function() {
			return CypherObject.fromString(this.chain)
		}
	})
	.enclose(function() {
		this.chain = this.chain || EMPTY_CHAIN
	})


module.exports = EmptyDataContainer
