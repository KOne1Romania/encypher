'use strict'

require('chai').should()

var UnaryCondition = require('../UnaryCondition'),
    emptyChain     = require('../../chain/Chain').EMPTY

suite('condition', function() {
	var oneNodeChain  = emptyChain.addNode('User').bind(),
	    twoNodesChain = oneNodeChain.addNode('Post').bind()

	suite('unary', function() {
		suite('isNull', function() {
			var isNullCondition = UnaryCondition({ field: 'name', op: 'isNull' })
			test('on one-node chain', function() {
				isNullCondition(oneNodeChain).toString().should.equal('$main.`name` IS NULL')
			})

			test('on two-nodes chain', function() {
				isNullCondition(twoNodesChain).toString().should.equal('post.`name` IS NULL')
			})
		})
	})
})
