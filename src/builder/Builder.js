'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var Cloner = require('../util/stamps').Cloner,
    Chain  = require('../chain/Chain'),
    Step   = require('../step/Step')

var Builder = stampit()
	.state({
		chain: {},
		step: {}
	})
	.methods({
		return: function() {
			return this._record(Step.of({
				cypherBuilder: _.method('buildReturnCypher')
			})).build()
		},

		getStamp: function() {
			return Builder
		},

		build: function() {
			return this.step.runOn(this.chain)
		},

		_record: function(step) {
			return this.extend({
				step: this.step.compose(step)
			})
		}
	})
	.compose(Cloner)

Builder.match = function(label) {
	return Builder({
		chain: Chain.fromNodeLabeled(label),
		step: Step.of({
			chainTransformer: _.method('bind'),
			cypherBuilder: _.method('buildMatchCypher')
		})
	})
}

module.exports = Builder
