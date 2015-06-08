'use strict'

require('chai').should()

var Result = require('../Result')

suite('Result', function() {
	var result = Result({ value: 'id(user)', key: 'userId' })
	suite('initially', function() {
		test('#toString', function() {
			result.toString().should.equal('id(user) as userId')
		})

		test('#toKeyValue', function() {
			result.toKeyValue().should.equal('userId: id(user)')
		})
	})

	suite('after bind', function() {
		var boundResult = result.bind()
		test('#toString', function() {
			boundResult.toString().should.equal('userId as userId')
		})

		test('#toKeyValue', function() {
			boundResult.toKeyValue().should.equal('userId: userId')
		})
	})
})
