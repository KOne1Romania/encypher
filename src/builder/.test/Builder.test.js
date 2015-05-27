'use strict'

require('chai').should()

var Builder = require('../Builder')

suite('Builder', function() {
	test('#match', function() {
		Builder.match('User').build().toString().should.eql('MATCH ($main:User)')
	})

	test('#return', function() {
		Builder.match('User').return().toString().should.eql('MATCH ($main:User) RETURN $main')
	})

	test('#backToMain', function() {
		Builder.match('User').backToMain().return()
			.toString().should.eql('MATCH ($main:User) WITH distinct $main RETURN $main')
	})

	test('#whereId', function() {
		Builder.match('User').whereId(10).return()
			.toString().should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
	})
})