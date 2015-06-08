'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var ResultMaker    = require('./ResultMaker'),
    ExpandSelector = require('./selector/ExpandSelector'),
    CypherObject   = require('../cypher/CypherObject'),
    emptyChain     = require('../chain/Chain').EMPTY

var ResultAccumulator = stampit()
	.state({
		chain: null,
		results: []
	})
	.methods({
		addResult: function(resultMakerOpts) {
			var newResult = ResultMaker(resultMakerOpts)(this.chain)
			return ResultAccumulator({
				chain: this.chain.backToMain(),
				results: this.results.concat(newResult)
			})
		},

		addNode: function(node) {
			return ResultAccumulator({
				chain: this.chain.addNode(node).bind(),
				results: bindLastResult(this.results)
			})
		},

		buildWithCypher: function() {
			var allResults = [this.chain].concat(this.results).join(', ')
			return CypherObject.fromString(['WITH', allResults].join(' '))
		},

		buildReturnCypher: function(fields) {
			return CypherObject.fromString(this.toResult(fields)).prepend('RETURN')
		},

		toResult: function(fields) {
			return ExpandSelector({
				fields: fields,
				results: bindLastResult(this.results)
			})(this.chain.backToMain())
		}
	})
	.enclose(function() {
		this.chain = this.chain || emptyChain
	})

function bindLastResult(results) {
	if (_.isEmpty(results)) {
		return results
	}
	var bottomResults = _.initial(results),
	    lastResult    = _.last(results)
	return bottomResults.concat(lastResult.bind())
}

module.exports = ResultAccumulator()
