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
		test.skip('lt', function() {
			$binary({ field: 'age', op: 'lt', value: 15 }).queryObject().valueOf().should.eql({
				string: '$self.`age` < {maxAge}',
				params: { maxAge: 15 }
			})
		})
		test.skip('gt', function() {
			$binary({ op: 'gt', value: 15 }).queryObject().valueOf().should.eql({
				string: 'id($self) > {minId}',
				params: { minId: 15 }
			})
		})
		test.skip('ne', function() {
			$binary({ op: 'ne', value: 15 }).queryObject().valueOf().should.eql({
				string: 'id($self) <> {wrongId}',
				params: { wrongId: 15 }
			})
		})
		test.skip('in', function() {
			$binary({ op: 'in', value: [15, 16] }).queryObject().valueOf().should.eql({
				string: 'id($self) IN {ids}',
				params: { ids: [15, 16] }
			})
		})
		test.skip('regex', function() {
			$binary({ field: 'name', op: 'regex', value: ".*" }).queryObject().valueOf().should.eql({
				string: '$self.`name` =~ {nameRegex}',
				params: { nameRegex: '(?i).*' }
			})
		})
	})
})
