'use strict'

require('chai').should()

var steps  = require('..'),
    Chain = require('../../chain/Chain')

var _ = require('lodash')

suite('Step', function() {
	var emptyStep     = steps.EMPTY,
	    matchUserStep = steps.Match('User'),
	    returnStep    = steps.Return()

	test('empty step does nothing', function() {
		emptyStep.run().toString().should.equal('')
	})

	test('match step', function() {
		matchUserStep.run().toString().should.equal('MATCH ($main:User)')
	})

	suite('#compose', function() {
		test('does nothing when composing empty step', function() {
			matchUserStep.compose(emptyStep).run()
				.toString().should.equal('MATCH ($main:User)')
		})

		test('does work for two actual steps', function() {
			matchUserStep.compose(returnStep).run()
				.toString().should.equal('MATCH ($main:User) RETURN $main')
		})
	})
})
