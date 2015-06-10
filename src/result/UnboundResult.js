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

		toValueFollowedBy: function(suffix) {
			return [this.value, suffix].join(' ')
		},

		bind: function() {
			return BoundResult(_.pick(this, 'key'))
		}
	})


module.exports = UnboundResult
