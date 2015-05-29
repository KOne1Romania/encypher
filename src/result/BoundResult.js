'use strict'

var stampit = require('stampit')

var BoundResult = stampit()
	.state({
		key: '',
		value: ''
	})
	.methods({
		toString: function() {
			return this.key
		},

		toKeyValue: function() {
			return [this.key, this.value].join(': ')
		}
	})

module.exports = BoundResult
