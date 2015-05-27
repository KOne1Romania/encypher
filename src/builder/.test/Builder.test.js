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
})