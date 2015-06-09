'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var ResultMaker    = require('./ResultMaker'),
    Cloner         = require('../util/stamps').Cloner,
    ExpandSelector = require('./selector/ExpandSelector')

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

		expand: function(mainChain, fields) {
			return ExpandSelector({
				fields: fields,
				results: this._allResults()
			})(mainChain)
		},

		toString: function() {
			return this._allResults().join(', ')
		},

		_allResults: function() {
			return _.compact(this.resolvedResults.concat(this.currentResult))
		},

		getStamp: function() {
			return ResultSet
		}
	})
	.compose(Cloner)


var resultSet = module.exports = ResultSet()
