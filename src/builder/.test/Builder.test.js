'use strict'

require('chai').should()

var builder = require('../Builder').base

suite('builder', function() {
	test('#match', function() {
		builder.match('User').build().toString().should.eql('MATCH ($main:User)')
	})

	test('#return', function() {
		builder.match('User').return().toString().should.eql('MATCH ($main:User) RETURN $main')
	})

	test('#continue', function() {
		builder.match('User').continue().return()
			.toString().should.eql('MATCH ($main:User) WITH distinct $main RETURN $main')
	})

	test('#whereId', function() {
		builder.match('User').whereId(10).return()
			.toString().should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
	})

	test('#continue twice', function() {
		var cypher = builder
			.match('User')
			.continue()
			.whereId(10)
			.continue()
			.return()
		cypher.toString().should.eql([
			'MATCH ($main:User)',
			'WITH distinct $main',
			'WHERE id($main) = 10',
			'WITH distinct $main',
			'RETURN $main'
		].join(' '))
	})
})