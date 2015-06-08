'use strict'

require('chai').should()

var resultAccumulator = require('../resultAccumulator')

suite('resultAccumulator', function() {
	var baseAccumulator       = resultAccumulator.addNode('User'),
	    oneResultAccumulator  = baseAccumulator.addNode('Post').addResult({ select: 'id' }),
	    twoResultsAccumulator = oneResultAccumulator.addNode('Address').addResult({ select: 'name' })
	suite('base', function() {
		test('no fields', function() {
			baseAccumulator.toResult().toString().should.equal('{ id: id($main) } as $main')
		})
		test('with fields', function() {
			baseAccumulator.toResult(['id', 'name']).toString()
				.should.equal('{ id: id($main), name: $main.`name` } as $main')
		})
	})

	suite('after accumulating one result', function() {
		test('#buildWithCypher', function() {
			oneResultAccumulator.buildWithCypher().toString()
				.should.equal('WITH $main, id(post) as postId')
		})
		test('#toResult', function() {
			oneResultAccumulator.toResult().toString()
				.should.equal('{ id: id($main), postId: postId } as $main')
		})
	})

	suite('after accumulating two results', function() {
		test('#buildWithCypher', function() {
			twoResultsAccumulator.buildWithCypher().toString()
				.should.equal('WITH $main, postId as postId, address.`name` as addressName')
		})
		test('#toResult', function() {
			twoResultsAccumulator.toResult().toString()
				.should.equal('{ id: id($main), postId: postId, addressName: addressName } as $main')
		})
	})
})
