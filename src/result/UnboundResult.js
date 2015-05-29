'use strict'

var stampit = require('stampit')

var UnboundResult = stampit()
	.state({
		key: '',
		value: ''
	})
	.methods({
		toString: function() {
			return [this.value, this.key].join(' as ')
		},

		toKeyValue: function() {
			return [this.key, this.value].join(': ')
		}
	})


module.exports = UnboundResult
