'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var BoundResult = require('./BoundResult')

var UnboundResult = stampit()
	.state({
		key: '',
		value: ''
	})
	.methods({
		toString: function() {
			return this.value === this.key
				? this.value
				: [this.value, this.key].join(' as ')
		},

		toKeyValue: function() {
			return [this.key, this.value].join(': ')
		},

		toBinaryConditionString: function(operatorSymbol, reverse) {
			var paramToken = surround(this.key, '{', '}'),
			    symbolString = surround(operatorSymbol, ' ')
			if (reverse) {
				return [paramToken, this.value].join(symbolString)
			}
			return [this.value, paramToken].join(symbolString)
		},

		toUnaryConditionString: function(operatorSymbol) {
			return [this.value, operatorSymbol].join(' ')
		},

		toOrderStatement: function(direction) {
			return [this.value, direction.toUpperCase()].join(' ')
		},

		customizeKey: function(keyCustomizer) {
			keyCustomizer = keyCustomizer || _.identity
			return UnboundResult({
				key: keyCustomizer(this.key),
				value: this.value
			})
		},

		buildConditionParams: function(actualValue) {
			return _.set({}, this.key, actualValue)
		},

		bind: function() {
			return BoundResult(_.pick(this, 'key'))
		}
	})

function surround(string, leftWrapper, rightWrapper) {
	return [leftWrapper, string, rightWrapper || leftWrapper].join('')
}

module.exports = UnboundResult
