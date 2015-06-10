'use strict'

require('chai').should()

var UnaryCondition  = require('../UnaryCondition'),
    BinaryCondition = require('../BinaryCondition'),
    emptyChain      = require('../../chain/Chain').EMPTY

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

		test('isNotNull', function() {
			var isNotNullCondition = UnaryCondition({ field: 'name', op: 'isNotNull' })
			isNotNullCondition(oneNodeChain).toString().should.equal('$main.`name` IS NOT NULL')
		})
	})

	suite('binary', function() {
		suite('eq', function() {
			var eqCondition = BinaryCondition({ op: 'eq', value: 12 })
			test('on one-node chain', function() {
				eqCondition(oneNodeChain).valueOf().should.eql({
					string: 'id($main) = {id}',
					params: { id: 12 }
				})
			})

			test('on two-nodes chain', function() {
				eqCondition(twoNodesChain).valueOf().should.eql({
					string: 'id(post) = {postId}',
					params: { postId: 12 }
				})
			})
		})

		test('lt', function() {
			var ltCondition = BinaryCondition({ field: 'age', op: 'lt', value: 100 })
			ltCondition(oneNodeChain).valueOf().should.eql({
				string: '$main.`age` < {maxAge}',
				params: { maxAge: 100 }
			})
		})

		test('gt', function() {
			var gtCondition = BinaryCondition({ op: 'gt', value: 5 })
			gtCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) > {minId}',
				params: { minId: 5 }
			})
		})

		test('ne', function() {
			var neCondition = BinaryCondition({ op: 'ne', value: 1 })
			neCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) <> {wrongId}',
				params: { wrongId: 1 }
			})
		})

		test('in', function() {
			var inCondition = BinaryCondition({ op: 'in', value: [15, 16] })
			inCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) IN {ids}',
				params: { ids: [15, 16] }
			})
		})

		test.skip('regex', function() {
			$binary({ field: 'name', op: 'regex', value: ".*" }).queryObject().valueOf().should.eql({
				string: '$main.`name` =~ {nameRegex}',
				params: { nameRegex: '(?i).*' }
			})
		})
	})
})
