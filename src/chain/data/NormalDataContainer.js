'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var EMPTY_CHAIN  = require('../Chain').EMPTY,
    CypherObject = require('../../cypher/CypherObject')

var NormalDataContainer = stampit()
	.state({
		chain: null,
		data: {}
	})
	.methods({
		toCypher: function() {
			return CypherObject({
				string: this._getCypherString(),
				params: this._getCypherParams()
			})
		},

		toAttributionCypher: function() {
			return CypherObject({
				string: [this.chain, '{data}'].join(' = '),
				params: this._getCypherParams()
			})
		},

		_getCypherString: function() {
			var dataParamString = '{' + this.dataFieldName + '}'
			return this.chain.toStringWithData(dataParamString)
		},

		_getCypherParams: function() {
			return _.set({}, this.dataFieldName, this.data)
		}
	})
	.enclose(function() {
		this.chain = this.chain || EMPTY_CHAIN
		this.dataFieldName = this.chain.putStringInContext('data')
	})

module.exports = NormalDataContainer
