'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var CypherObject = require('../../cypher/CypherObject')

var ActualSubsetPart = stampit()
	.state({
		name: 'skip',
		value: 10
	})
	.methods({
		toCypher: function() {
			var lowerCaseName = this.name.toLowerCase()
			return CypherObject({
				string: [this.name.toUpperCase(), '{' + lowerCaseName + '}'].join(' '),
				params: _.set({}, lowerCaseName, this.value)
			})
		}
	})

module.exports = ActualSubsetPart
