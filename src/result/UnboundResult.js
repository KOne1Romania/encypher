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

		toValueFollowedBy: function() {
			var args = [].slice.apply(arguments)
			return [this.value].concat(args).join(' ')
		},

		bind: function() {
			return BoundResult(_.pick(this, 'key'))
		}
	})


module.exports = UnboundResult
