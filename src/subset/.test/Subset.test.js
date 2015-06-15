'use strict'

require('chai').should()

var Subset = require('../Subset')

suite('Subset', function() {
	test('both skip and limit', function() {
		var subsetParams = { skip: 20, limit: 10 }
		Subset(subsetParams).toCypher().valueOf().should.eql({
			string: 'SKIP {skip} LIMIT {limit}',
			params: subsetParams
		})
	})

	test('only skip', function() {
		Subset({ skip: 20, limit: 0 }).toCypher().valueOf().should.eql({
			string: 'SKIP {skip}',
			params: { skip: 20 }
		})
	})

	test('only limit', function() {
		Subset({ otherStuff: 500, limit: 10 }).toCypher().valueOf().should.eql({
			string: 'LIMIT {limit}',
			params: { limit: 10 }
		})
	})

	test('neither skip nor limit', function() {
		Subset({}).toCypher().isEmpty().should.equal(true)
	})
})
