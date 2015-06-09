'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var ResultMaker = require('./ResultMaker'),
    Cloner = require('../util/stamps').Cloner

var ResultSet = stampit()
	.state({
		resolvedResults: [],
		currentResult: null
	})
	.methods({
		clear: function() {
			return resultSet
		},

		add: function(resultOptions, chain) {
			return this.extend({
				currentResult: ResultMaker(resultOptions)(chain)
			})
		},

		resolve: function() {
			return this.extend({
				resolvedResults: this.resolvedResults.concat(this.currentResult.bind()),
				currentResult: null
			})
		},

		toString: function() {
			var allResults = this.resolvedResults.concat(this.currentResult)
			return _.compact(allResults).join(', ')
		},

		getStamp: function() {
			return ResultSet
		}
	})
	.compose(Cloner)


var resultSet = module.exports = ResultSet()
