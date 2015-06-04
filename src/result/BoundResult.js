'use strict'

var stampit = require('stampit')

var BoundResult = stampit()
	.state({
		key: ''
	})
	.methods({
		toString: function() {
			return this.key
		},

		toKeyValue: function() {
			return [this.key, this.key].join(': ')
		}
	})

module.exports = BoundResult
