'use strict'

require('chai').should()

var steps  = require('../steps'),
    Chain  = require('../../chain/Chain')

var _ = require('lodash')

suite('Step', function() {
	var emptyStep     = steps.EMPTY,
	    matchUserStep = steps.Match('User'),
	    returnStep    = steps.Return()

	test('empty step does nothing', function() {
		steps.run(emptyStep).toString().should.equal('')
	})

	test('match step', function() {
		steps.run(matchUserStep).toString().should.equal('MATCH ($main:User)')
	})

	suite('#compose', function() {
		test('does nothing when composing empty step', function() {
			steps.run(steps.compose(emptyStep, matchUserStep))
				.toString().should.equal('MATCH ($main:User)')
		})

		test('does work for two actual steps', function() {
			steps.run(steps.compose(returnStep, matchUserStep))
				.toString().should.equal('MATCH ($main:User) RETURN $main')
		})
	})
})
