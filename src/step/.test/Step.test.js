'use strict'

require('chai').should()

var Step = require('../Step'),
    Chain = require('../../chain/Chain')

var _ = require('lodash')

var mainChain = Chain.fromNodeLabeled('User')

var emptyStep = Step()
var matchStep = Step.of({
	chainTransformer: function(chain) {
		return chain.bind()
	},
	cypherBuilder: function(chain) {
		return chain.buildMatchCypher()
	}
})
var returnStep = Step.of({
	cypherBuilder: function(chain) {
		return chain.buildReturnCypher()
	}
})

suite('Step', function() {
	test('empty step does nothing', function() {
		emptyStep.runOn(mainChain).toString().should.equal('')
	})

	test('match step', function() {
		matchStep.runOn(mainChain).toString().should.equal('MATCH ($main:User)')
	})

	suite('#compose', function() {
		test('does nothing when composing empty step', function() {
			matchStep.compose(emptyStep).runOn(mainChain)
				.toString().should.equal('MATCH ($main:User)')
		})

		test('does work for two actual steps', function() {
			matchStep.compose(returnStep).runOn(mainChain)
				.toString().should.equal('MATCH ($main:User) RETURN $main')
		})
	})
})