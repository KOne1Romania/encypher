'use strict'

require('chai').should()

var condition  = require('../condition'),
    emptyChain = require('../../chain/Chain').EMPTY

suite('condition', function() {
	var oneNodeChain  = emptyChain.addNode('User').bind(),
	    twoNodesChain = oneNodeChain.addNode('Post').bind()

	suite('unary', function() {
		suite('isNull', function() {
			var isNullCondition = condition({ field: 'name', op: 'isNull' })
			test('on one-node chain', function() {
				isNullCondition(oneNodeChain).toString().should.equal('$main.`name` IS NULL')
			})

			test('on two-nodes chain', function() {
				isNullCondition(twoNodesChain).toString().should.equal('post.`name` IS NULL')
			})
		})

		test('isNotNull', function() {
			var isNotNullCondition = condition({ field: 'name', op: 'isNotNull' })
			isNotNullCondition(oneNodeChain).toString().should.equal('$main.`name` IS NOT NULL')
		})
	})

	suite('binary', function() {
		suite('eq', function() {
			var eqCondition = condition({ op: 'eq', value: 12 })
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
			var ltCondition = condition({ field: 'age', op: 'lt', value: 100 })
			ltCondition(oneNodeChain).valueOf().should.eql({
				string: '$main.`age` < {maxAge}',
				params: { maxAge: 100 }
			})
		})

		test('gt', function() {
			var gtCondition = condition({ op: 'gt', value: 5 })
			gtCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) > {minId}',
				params: { minId: 5 }
			})
		})

		test('ne', function() {
			var neCondition = condition({ op: 'ne', value: 1 })
			neCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) <> {wrongId}',
				params: { wrongId: 1 }
			})
		})

		test('in', function() {
			var inCondition = condition({ op: 'in', value: [15, 16] })
			inCondition(oneNodeChain).valueOf().should.eql({
				string: 'id($main) IN {ids}',
				params: { ids: [15, 16] }
			})
		})

		test('regex', function() {
			var regexCondition = condition({ field: 'name', op: 'regex', value: '.*' })
			regexCondition(oneNodeChain).valueOf().should.eql({
				string: '$main.`name` =~ {nameRegex}',
				params: { nameRegex: '(?i).*' }
			})
		})
	})

	suite('nested', function() {
		var idConditions = [
			{ op: 'lt', value: 15 },
			{ op: 'gt', value: 10 }
		]
		var nameConditions = [
			{ field: 'name', op: 'eq', value: 'John' }
		]

		test('and', function() {
			var andCondition = condition({
				conditions: idConditions
			})
			andCondition(oneNodeChain).valueOf().should.eql({
				string: '(id($main) < {maxId} AND id($main) > {minId})',
				params: { maxId: 15, minId: 10 }
			})
		})

		test('or', function() {
			var orCondition = condition({
				conditions: idConditions,
				op: 'or'
			})
			orCondition(oneNodeChain).valueOf().should.eql({
				string: '(id($main) < {maxId} OR id($main) > {minId})',
				params: { maxId: 15, minId: 10 }
			})
		})

		test('one condition array', function() {
			var andForOneCondition = condition({ conditions: nameConditions })
			andForOneCondition(oneNodeChain).valueOf().should.eql({
				string: '($main.`name` = {name})',
				params: { name: 'John' }
			})
		})

		test('nested', function() {
			var nestedCondition = condition({
				op: 'or',
				conditions: [
					{ conditions: idConditions },
					{ conditions: nameConditions }
				]
			})
			nestedCondition(oneNodeChain).valueOf().should.eql({
				string: '((id($main) < {maxId} AND id($main) > {minId}) OR ($main.`name` = {name}))',
				params: { name: 'John', maxId: 15, minId: 10 }
			})
		})
	})

	test('negated', function() {
		var negatedCondition = condition({
			not: { op: 'eq', value: 1 }
		})
		negatedCondition(oneNodeChain).valueOf().should.eql({
			string: 'NOT id($main) = {id}',
			params: { id: 1 }
		})
	})
})
