'use strict'

require('chai').should()

var resultSet = require('../resultSet'),
    chain     = require('../../chain/Chain').EMPTY

suite('resultSet', function() {
	var baseChain    = chain.addNode('User').bind(),
	    postChain    = baseChain.addNode('Post').bind(),
	    addressChain = baseChain.addNode('Address').bind()

	suite('add', function() {
		test('once', function() {
			resultSet.add({ select: 'id' }, postChain).toString().should.equal('id(post) as postId')
		})

		test('and resolve', function() {
			resultSet.add({ select: 'id' }, postChain).resolve().toString()
				.should.equal('postId')
		})

		test('twice', function() {
			resultSet
				.add({ select: 'id' }, postChain).resolve()
				.add({ select: 'number' }, addressChain).toString()
				.should.equal('postId, address.`number` as addressNumber')
		})
	})

	suite('clear returns empty set', function() {
		test('at first', function() {
			resultSet.clear().should.equal(resultSet)
		})

		test('after adding a result', function() {
			resultSet.add({}, baseChain).clear().should.equal(resultSet)
		})
	})

	test('#expand', function() {
		resultSet.add({ select: 'id' }, postChain).resolve().expand(baseChain).toString()
			.should.equal('{ id: id($main), postId: postId } as $main')
	})
})
