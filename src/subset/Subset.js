'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../cypher/CypherObject'),
    SubsetPart   = require('./part/SubsetPart')

var Subset = stampit()
	.state({
		skip: 0,
		limit: 0
	})
	.methods({
		toCypher: function() {
			return this.cypherObject
		},

		_createSubsetParts: function() {
			return ['skip', 'limit'].map(function(partName) {
				return SubsetPart({ name: partName, value: this[partName] })
			}, this)
		}
	})
	.enclose(function() {
		var partialCypherObjects = this._createSubsetParts().map(_.method('toCypher'))
		this.cypherObject = CypherObject.merge(partialCypherObjects)
	})

module.exports = Subset
